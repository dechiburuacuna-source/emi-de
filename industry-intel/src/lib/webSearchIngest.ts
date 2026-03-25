import OpenAI from 'openai'
import type { Category, Location } from '@/types/article'
import type { RawArticle } from './rss'

let _client: OpenAI | null = null
function getClient() {
  if (!_client) _client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  return _client
}

export interface WebSearchSource {
  name: string
  location: Location
  source_type: 'Institutional' | 'Press'
  categories: Category[]
  lang: string
  domain: string
  topics: string
}

// Chilean press sources that need web-search based ingestion
export const WEB_SEARCH_SOURCES: WebSearchSource[] = [
  {
    name: 'Emol',
    location: 'Chile', source_type: 'Press', categories: ['Energy', 'Mining'],
    lang: 'es', domain: 'emol.com',
    topics: 'energía eléctrica, renovables, minería, cobre, litio, electricidad Chile',
  },
  {
    name: 'Economia y Negocios',
    location: 'Chile', source_type: 'Press', categories: ['Energy', 'Mining', 'Data Centers'],
    lang: 'es', domain: 'economiaynegocios.cl',
    topics: 'energía, tarifas eléctricas, minería, inversión, data centers Chile',
  },
  {
    name: 'Revista Electricidad',
    location: 'Chile', source_type: 'Press', categories: ['Energy'],
    lang: 'es', domain: 'revistaei.cl',
    topics: 'energía eléctrica, renovables, transmisión, generación, regulación eléctrica Chile',
  },
  {
    name: 'Diario Financiero',
    location: 'Chile', source_type: 'Press', categories: ['Mining', 'Energy'],
    lang: 'es', domain: 'df.cl',
    topics: 'minería cobre litio, energía, inversión extranjera, Codelco, SQM Chile',
  },
  {
    name: 'La Tercera',
    location: 'Chile', source_type: 'Press', categories: ['Mining', 'Energy'],
    lang: 'es', domain: 'latercera.com',
    topics: 'energía, minería, cobre, litio, electricidad, medioambiente Chile',
  },
]

function buildPrompt(source: WebSearchSource): string {
  const today = new Date().toISOString().split('T')[0]
  return `You are an industry intelligence analyst. Today is ${today}.

Search the web right now and find 4 recent news articles published in the last 14 days from the Chilean newspaper/magazine "${source.name}" (domain: ${source.domain}).

Topics to search for: ${source.topics}

Return ONLY a JSON array (no markdown, no explanation) with this exact structure:
[
  {
    "title": "exact article headline from ${source.name}",
    "url": "https://${source.domain}/...",
    "date": "YYYY-MM-DD",
    "content": "2-3 sentence summary of the article content"
  }
]

Rules:
- All URLs must start with https://${source.domain}/
- Dates must be within the last 14 days
- Return [] if you cannot find real, recent articles from this specific source
- Do NOT invent articles`
}

export async function searchArticlesBySource(source: WebSearchSource): Promise<RawArticle[]> {
  const client = getClient()
  try {
    const response = await client.chat.completions.create({
      model: 'gpt-4o',
      max_tokens: 1500,
      temperature: 0.1,
      messages: [
        {
          role: 'system',
          content: 'You have access to current web information. Search for real, recent news articles and return structured JSON only. Never invent articles.',
        },
        { role: 'user', content: buildPrompt(source) },
      ],
    })

    const text = response.choices[0]?.message?.content || ''
    const match = text.match(/\[[\s\S]*\]/)
    if (!match) return []

    const items = JSON.parse(match[0]) as Array<{
      title: string; url: string; date: string; content: string
    }>

    return items
      .filter(item =>
        item.title &&
        item.url &&
        item.url.startsWith('http') &&
        item.url.includes(source.domain)
      )
      .slice(0, 5)
      .map(item => ({
        title: item.title.trim(),
        url: item.url.trim(),
        source: source.name,
        source_type: source.source_type,
        location: source.location,
        categories: source.categories,
        date: item.date || new Date().toISOString().split('T')[0],
        content: item.content || item.title,
        lang: source.lang,
      } satisfies RawArticle))

  } catch (err) {
    console.warn(`[WebSearch] Failed for ${source.name}:`, (err as Error).message)
    return []
  }
}

export async function searchAllWebSources(
  sources: WebSearchSource[] = WEB_SEARCH_SOURCES,
  concurrency = 2
): Promise<{ articles: RawArticle[]; failed: string[] }> {
  const allArticles: RawArticle[] = []
  const failed: string[] = []

  for (let i = 0; i < sources.length; i += concurrency) {
    const batch = sources.slice(i, i + concurrency)
    const results = await Promise.all(batch.map(async s => {
      const arts = await searchArticlesBySource(s)
      if (arts.length === 0) failed.push(s.name)
      console.log(`[WebSearch] ${s.name}: ${arts.length} articles found`)
      return arts
    }))
    results.forEach(r => allArticles.push(...r))
    if (i + concurrency < sources.length) await new Promise(r => setTimeout(r, 800))
  }

  const seen = new Set<string>()
  return {
    articles: allArticles.filter(a => {
      if (!a.url || seen.has(a.url)) return false
      seen.add(a.url)
      return true
    }),
    failed,
  }
}
