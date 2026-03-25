import Parser from 'rss-parser'
import type { SourceDef } from './sources'

const parser = new Parser({
  timeout: 10_000,
  headers: {
    'User-Agent':
      'Mozilla/5.0 (compatible; IndustryIntelBot/1.0; +https://industryintel.app)',
  },
  customFields: {
    item: [
      ['content:encoded', 'contentEncoded'],
      ['description', 'summary'],
    ],
  },
})

export interface RawArticle {
  title: string
  url: string
  source: string
  source_type: 'Institutional' | 'Press'
  location: string
  categories: string[]
  date: string
  content: string
  lang: string
}

/**
 * Fetches a single RSS feed and returns normalized raw articles.
 * Returns empty array on any error (network, parse, etc.)
 */
export async function fetchRSSFeed(source: SourceDef): Promise<RawArticle[]> {
  if (!source.rss) return []

  try {
    const feed = await parser.parseURL(source.rss)
    const items = feed.items.slice(0, 20) // max 20 per source

    return items
      .filter(item => item.title && item.link)
      .map(item => {
        const content = [
          item.contentEncoded,
          item.content,
          item.summary,
          item.title,
        ]
          .filter(Boolean)
          .join(' ')
          .replace(/<[^>]+>/g, ' ')   // strip HTML tags
          .replace(/\s+/g, ' ')
          .trim()
          .slice(0, 2000)              // cap at 2000 chars for OpenAI

        return {
          title: (item.title || '').trim(),
          url: item.link || '',
          source: source.name,
          source_type: source.source_type,
          location: source.location,
          categories: source.categories,
          date: parseDate(item.pubDate || item.isoDate),
          content,
          lang: source.lang || 'en',
        } satisfies RawArticle
      })
  } catch (err) {
    console.warn(`[RSS] Failed to fetch ${source.name} (${source.rss}):`, (err as Error).message)
    return []
  }
}

/**
 * Fetch all RSS sources concurrently (with concurrency limit).
 */
export async function fetchAllRSSFeeds(
  sources: SourceDef[],
  concurrency = 6
): Promise<RawArticle[]> {
  const results: RawArticle[] = []
  const withRSS = sources.filter(s => s.rss)

  // Process in batches
  for (let i = 0; i < withRSS.length; i += concurrency) {
    const batch = withRSS.slice(i, i + concurrency)
    const batchResults = await Promise.all(batch.map(s => fetchRSSFeed(s)))
    batchResults.forEach(r => results.push(...r))
  }

  // Deduplicate by URL
  const seen = new Set<string>()
  return results.filter(a => {
    if (!a.url || seen.has(a.url)) return false
    seen.add(a.url)
    return true
  })
}

function parseDate(raw: string | undefined): string {
  if (!raw) return new Date().toISOString().split('T')[0]
  try {
    return new Date(raw).toISOString().split('T')[0]
  } catch {
    return new Date().toISOString().split('T')[0]
  }
}
