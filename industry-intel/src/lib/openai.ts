import OpenAI from 'openai'
import type { Category, Location } from '@/types/article'
import type { RawArticle } from './rss'

let _client: OpenAI | null = null
function getClient() {
  if (!_client) {
    _client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  }
  return _client
}

export interface ProcessedFields {
  title_es: string
  category: Category
  location: Location
  extended_description: string
  extended_description_es: string
  short_summary: string[]
  short_summary_es: string[]
}

const SYSTEM_PROMPT = `You are an industry intelligence analyst specializing in Mining, Energy, and Data Centers.
Your task is to classify and summarize news articles for a professional intelligence dashboard.
Always respond with valid JSON only — no markdown, no explanation, just the JSON object.`

function buildUserPrompt(raw: RawArticle): string {
  return `Article to process:
Title: ${raw.title}
Source: ${raw.source} (${raw.location}, ${raw.source_type})
Date: ${raw.date}
Language: ${raw.lang}
Content: ${raw.content.slice(0, 1500)}

Relevant categories this source covers: ${raw.categories.join(', ')}

Return a JSON object with EXACTLY these fields:
{
  "title_es": "Article title translated to Spanish (if already Spanish, return as-is)",
  "category": "Mining" | "Energy" | "Data Centers",
  "location": "Chile" | "Italy" | "Poland" | "Mexico" | "Spain" | "Global",
  "extended_description": "3-5 sentence paragraph in English that adds context, background, and significance beyond the title. Write for a professional audience.",
  "extended_description_es": "Same paragraph in Spanish.",
  "short_summary": ["Bullet 1 (EN, start with action verb, key fact)", "Bullet 2 (EN)", "Bullet 3 (EN)"],
  "short_summary_es": ["Bullet 1 (ES)", "Bullet 2 (ES)", "Bullet 3 (ES)"]
}

Rules:
- category must be the best single match from the three options
- location should reflect the GEOGRAPHIC FOCUS of the article (use "Global" if multiple regions or not specific)
- Each bullet is 15-25 words, high-signal, no fluff
- DO NOT mention impact level or severity
`
}

/**
 * Process a single raw article with OpenAI.
 * Returns null if processing fails.
 */
export async function processArticle(
  raw: RawArticle
): Promise<ProcessedFields | null> {
  const client = getClient()

  try {
    const response = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      response_format: { type: 'json_object' },
      temperature: 0.3,
      max_tokens: 1000,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: buildUserPrompt(raw) },
      ],
    })

    const text = response.choices[0]?.message?.content || ''
    const parsed = JSON.parse(text) as ProcessedFields

    // Validate and sanitize
    const validCategories: Category[] = ['Mining', 'Energy', 'Data Centers']
    const validLocations: Location[] = ['Chile', 'Italy', 'Poland', 'Mexico', 'Spain', 'Global']

    return {
      title_es: String(parsed.title_es || raw.title),
      category: validCategories.includes(parsed.category)
        ? parsed.category
        : (raw.categories[0] as Category) || 'Energy',
      location: validLocations.includes(parsed.location)
        ? parsed.location
        : (raw.location as Location),
      extended_description: String(parsed.extended_description || ''),
      extended_description_es: String(parsed.extended_description_es || ''),
      short_summary: Array.isArray(parsed.short_summary)
        ? parsed.short_summary.slice(0, 3).map(String)
        : [],
      short_summary_es: Array.isArray(parsed.short_summary_es)
        ? parsed.short_summary_es.slice(0, 3).map(String)
        : [],
    }
  } catch (err) {
    console.error('[OpenAI] Failed to process article:', raw.url, (err as Error).message)
    return null
  }
}

/**
 * Process articles in batches with rate-limit-friendly concurrency.
 */
export async function processArticlesBatch(
  articles: RawArticle[],
  concurrency = 3,
  onProgress?: (done: number, total: number) => void
): Promise<Array<{ raw: RawArticle; processed: ProcessedFields | null }>> {
  const results: Array<{ raw: RawArticle; processed: ProcessedFields | null }> = []

  for (let i = 0; i < articles.length; i += concurrency) {
    const batch = articles.slice(i, i + concurrency)
    const batchResults = await Promise.all(
      batch.map(async raw => ({ raw, processed: await processArticle(raw) }))
    )
    results.push(...batchResults)
    onProgress?.(Math.min(i + concurrency, articles.length), articles.length)

    // Small delay to avoid rate limiting
    if (i + concurrency < articles.length) {
      await sleep(500)
    }
  }

  return results
}

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
