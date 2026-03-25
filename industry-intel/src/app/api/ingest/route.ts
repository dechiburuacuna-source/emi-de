import { NextResponse } from 'next/server'
import { fetchAllRSSFeeds } from '@/lib/rss'
import { processArticlesBatch } from '@/lib/openai'
import { upsertArticle, articleExistsByUrl, makeId, purgeOldArticles } from '@/lib/storage'
import { RSS_SOURCES } from '@/lib/sources'
import type { Article, IngestResult } from '@/types/article'

export const dynamic = 'force-dynamic'
export const maxDuration = 300

export async function POST(req: Request) {
  const authHeader = req.headers.get('authorization')
  const cronSecret = process.env.CRON_SECRET
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const startTime = Date.now()
  const result: IngestResult = { fetched: 0, new_articles: 0, processed: 0, errors: [], duration_ms: 0 }

  try {
    // 0. Purge articles older than 60 days
    const purged = await purgeOldArticles()
    console.log(`[Ingest] Purged ${purged} old articles`)

    // 1. Fetch RSS feeds (with URL validation built-in)
    console.log(`[Ingest] Fetching ${RSS_SOURCES.length} RSS sources...`)
    const { articles: rawArticles, failed } = await fetchAllRSSFeeds(RSS_SOURCES)
    result.fetched = rawArticles.length
    if (failed.length) result.errors.push(`RSS failed: ${failed.join(', ')}`)
    console.log(`[Ingest] Fetched ${rawArticles.length} items; ${failed.length} sources failed`)

    // 2. Filter new articles
    const newRaw = []
    for (const raw of rawArticles) {
      try {
        if (!(await articleExistsByUrl(raw.url))) newRaw.push(raw)
      } catch { result.errors.push(`URL check failed: ${raw.url}`) }
    }
    result.new_articles = newRaw.length
    console.log(`[Ingest] ${newRaw.length} new articles to process`)

    if (newRaw.length === 0) {
      result.duration_ms = Date.now() - startTime
      return NextResponse.json({ success: true, ...result })
    }

    // 3. Process with OpenAI
    if (!process.env.OPENAI_API_KEY) {
      result.errors.push('OPENAI_API_KEY not set')
      result.duration_ms = Date.now() - startTime
      return NextResponse.json({ success: false, ...result })
    }

    const processed = await processArticlesBatch(newRaw, 3, (done, total) => {
      console.log(`[Ingest] AI: ${done}/${total}`)
    })

    // 4. Store
    for (const { raw, processed: fields } of processed) {
      if (!fields) { result.errors.push(`AI failed: ${raw.url}`); continue }
      const article: Article = {
        id: makeId(), title: raw.title, title_es: fields.title_es,
        source: raw.source, source_type: raw.source_type,
        location: fields.location, category: fields.category,
        date: raw.date, url: raw.url, content: raw.content,
        extended_description: fields.extended_description,
        extended_description_es: fields.extended_description_es,
        short_summary: fields.short_summary, short_summary_es: fields.short_summary_es,
        created_at: new Date().toISOString(), processed: true,
      }
      try { await upsertArticle(article); result.processed++ }
      catch (err) { result.errors.push(`Store failed: ${raw.url}`) }
    }
  } catch (err) {
    const msg = (err as Error).message
    console.error('[Ingest] Fatal:', msg)
    result.errors.push(`Fatal: ${msg}`)
    result.duration_ms = Date.now() - startTime
    return NextResponse.json({ success: false, ...result }, { status: 500 })
  }

  result.duration_ms = Date.now() - startTime
  console.log(`[Ingest] Done in ${result.duration_ms}ms — stored ${result.processed}`)
  return NextResponse.json({ success: true, ...result })
}
