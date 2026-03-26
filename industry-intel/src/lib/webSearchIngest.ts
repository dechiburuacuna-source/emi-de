import OpenAI from 'openai'
import type { Category, Location, SourceType } from '@/types/article'
import type { RawArticle } from './rss'

let _client: OpenAI | null = null
function getClient() {
  if (!_client) _client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  return _client
}

export interface WebSearchSource {
  name: string
  location: Location
  source_type: SourceType
  categories: Category[]
  lang: string
  domain: string
  topics: string
}

export const WEB_SEARCH_SOURCES: WebSearchSource[] = [
  // ── Chile Press ────────────────────────────────────────────────────────────
  { name: 'Emol',                location: 'Chile', source_type: 'Press',          categories: ['Energy', 'Mining'],              lang: 'es', domain: 'emol.com',                topics: 'energía eléctrica, renovables, minería, cobre, litio, electricidad Chile' },
  { name: 'Economia y Negocios', location: 'Chile', source_type: 'Press',          categories: ['Energy', 'Mining', 'Data Centers'],lang:'es', domain: 'economiaynegocios.cl',  topics: 'energía, tarifas eléctricas, minería, inversión, data centers Chile' },
  { name: 'Revista Electricidad',location: 'Chile', source_type: 'Press',          categories: ['Energy'],                        lang: 'es', domain: 'revistaei.cl',           topics: 'energía eléctrica, renovables, transmisión, generación, regulación eléctrica Chile' },
  { name: 'Diario Financiero',   location: 'Chile', source_type: 'Press',          categories: ['Mining', 'Energy'],              lang: 'es', domain: 'df.cl',                  topics: 'minería cobre litio, energía, inversión extranjera, Codelco, SQM Chile' },
  { name: 'La Tercera',          location: 'Chile', source_type: 'Press',          categories: ['Mining', 'Energy'],              lang: 'es', domain: 'latercera.com',          topics: 'energía, minería, cobre, litio, electricidad, medioambiente Chile' },

  // ── Chile Conglomerados ────────────────────────────────────────────────────
  { name: 'ACERA',  location: 'Chile', source_type: 'Conglomerado', categories: ['Energy'],           lang: 'es', domain: 'acera.cl',    topics: 'energías renovables Chile, asociación gremial energía, ACERA noticias solar eólica' },
  { name: 'ACENOR', location: 'Chile', source_type: 'Conglomerado', categories: ['Energy'],           lang: 'es', domain: 'acenor.cl',   topics: 'energías renovables no convencionales Chile, ACENOR noticias' },
  { name: 'ACEN',   location: 'Chile', source_type: 'Conglomerado', categories: ['Energy', 'Mining'], lang: 'es', domain: 'acen.cl',     topics: 'energía nuclear Chile, ACEN noticias, generación nuclear' },
  { name: 'SOFOFA', location: 'Chile', source_type: 'Conglomerado', categories: ['Mining', 'Energy'], lang: 'es', domain: 'sofofa.cl',   topics: 'industria chilena, minería, energía, SOFOFA noticias, sector productivo Chile' },

  // ── Global Market Advisors ─────────────────────────────────────────────────
  { name: 'Aurora Energy Research', location: 'Global', source_type: 'Market Advisor', categories: ['Energy', 'Data Centers'], lang: 'en', domain: 'auroraer.com',      topics: 'energy market outlook, power price forecasts, renewables capacity, data center power demand' },
  { name: 'Afry',                   location: 'Global', source_type: 'Market Advisor', categories: ['Energy', 'Mining'],       lang: 'en', domain: 'afry.com',           topics: 'energy transition, power systems, mining consulting, renewable energy analysis' },
  { name: 'DNV',                    location: 'Global', source_type: 'Market Advisor', categories: ['Energy', 'Data Centers'], lang: 'en', domain: 'dnv.com',            topics: 'energy transition outlook, offshore wind, technology qualification, data center energy' },
  { name: 'Ember',                  location: 'Global', source_type: 'Market Advisor', categories: ['Energy'],                 lang: 'en', domain: 'ember-energy.org',   topics: 'global electricity data, coal phase-out, clean power, emissions energy analysis' },
  { name: 'Lazard',                 location: 'Global', source_type: 'Market Advisor', categories: ['Energy', 'Mining'],       lang: 'en', domain: 'lazard.com',         topics: 'levelized cost of energy LCOE, energy storage, clean energy investment, Lazard energy report' },
  { name: 'Wood Mackenzie',         location: 'Global', source_type: 'Market Advisor', categories: ['Energy', 'Mining', 'Data Centers'], lang: 'en', domain: 'woodmac.com', topics: 'energy market research, mining outlook, data center power, commodity prices forecast' },
  { name: 'BloombergNEF',           location: 'Global', source_type: 'Market Advisor', categories: ['Energy', 'Mining', 'Data Centers'], lang: 'en', domain: 'about.bnef.com', topics: 'clean energy investment, EV battery metals, power market outlook, BloombergNEF research' },

  // ── Italy ──────────────────────────────────────────────────────────────────
  { name: "Ministero dell'Ambiente", location: 'Italy',  source_type: 'Institutional', categories: ['Energy'],           lang: 'it', domain: 'mase.gov.it',      topics: 'energia rinnovabile, transizione energetica, politica energetica Italia' },
  { name: 'Terna',                   location: 'Italy',  source_type: 'Institutional', categories: ['Energy'],           lang: 'it', domain: 'terna.it',          topics: 'rete elettrica, trasmissione, energia rinnovabile, sistema elettrico Italia' },
  { name: 'Il Sole 24 Ore',          location: 'Italy',  source_type: 'Press',         categories: ['Energy'],           lang: 'it', domain: 'ilsole24ore.com',   topics: 'energia, rinnovabili, gas, elettricita, transizione energetica Italia' },
  { name: 'Energia Oltre',           location: 'Italy',  source_type: 'Press',         categories: ['Energy'],           lang: 'it', domain: 'energiaoltre.it',   topics: 'energia solare, eolico, rinnovabili, efficienza energetica, mercato elettrico Italia' },

  // ── Poland ─────────────────────────────────────────────────────────────────
  { name: 'Ministry of Climate Poland', location: 'Poland', source_type: 'Institutional', categories: ['Energy'], lang: 'pl', domain: 'gov.pl',           topics: 'energy policy Poland, climate transformation, coal phase-out, renewable energy Poland' },
  { name: 'PSE',                        location: 'Poland', source_type: 'Institutional', categories: ['Energy'], lang: 'pl', domain: 'pse.pl',            topics: 'Polish power grid, electricity transmission, energy security, balancing market Poland' },
  { name: 'BiznesAlert',                location: 'Poland', source_type: 'Press',         categories: ['Energy'], lang: 'pl', domain: 'biznesalert.pl',    topics: 'energia, gaz, wegiel, odnawialne, transformacja energetyczna Polska' },
  { name: 'Warsaw Business Journal',    location: 'Poland', source_type: 'Press',         categories: ['Energy'], lang: 'en', domain: 'wbj.pl',             topics: 'Poland energy sector, offshore wind, coal mining, power market Warsaw' },

  // ── Mexico ─────────────────────────────────────────────────────────────────
  { name: 'SENER',         location: 'Mexico', source_type: 'Institutional', categories: ['Energy'],           lang: 'es', domain: 'gob.mx',                 topics: 'politica energetica Mexico, generacion electrica, energias renovables, SENER' },
  { name: 'CFE',           location: 'Mexico', source_type: 'Institutional', categories: ['Energy'],           lang: 'es', domain: 'cfe.mx',                 topics: 'CFE generacion electrica, tarifas, energia renovable, proyectos Mexico' },
  { name: 'El Financiero', location: 'Mexico', source_type: 'Press',         categories: ['Energy', 'Mining'], lang: 'es', domain: 'elfinanciero.com.mx',    topics: 'energia, mineria, inversion, CFE, petroleo, renovables, industria Mexico' },
  { name: 'Energia Hoy',   location: 'Mexico', source_type: 'Press',         categories: ['Energy'],           lang: 'es', domain: 'energiahoy.com',         topics: 'energia electrica, renovables, gas, petroleo, sector energetico Mexico' },

  // ── Spain ──────────────────────────────────────────────────────────────────
  { name: 'MITECO',        location: 'Spain', source_type: 'Institutional', categories: ['Energy'],           lang: 'es', domain: 'miteco.gob.es',  topics: 'transicion energetica Espana, energias renovables, politica climatica, MITECO' },
  { name: 'Red Electrica', location: 'Spain', source_type: 'Institutional', categories: ['Energy'],           lang: 'es', domain: 'ree.es',          topics: 'red electrica Espana, renovables, sistema electrico, REE, balances energeticos' },
  { name: 'El Pais',       location: 'Spain', source_type: 'Press',         categories: ['Energy', 'Mining'], lang: 'es', domain: 'elpais.com',      topics: 'energia Espana, renovables, mineria, gas, electricidad, transicion energetica' },
  { name: 'Expansion',     location: 'Spain', source_type: 'Press',         categories: ['Energy'],           lang: 'es', domain: 'expansion.com',   topics: 'energia Espana, inversion, renovables, electricidad, sector energetico' },

  // ── Global Institutional & Press ───────────────────────────────────────────
  { name: 'IEA',                  location: 'Global', source_type: 'Institutional', categories: ['Energy', 'Mining', 'Data Centers'], lang: 'en', domain: 'iea.org',                   topics: 'global energy transition, renewables investment, electricity demand, IEA reports' },
  { name: 'World Bank',           location: 'Global', source_type: 'Institutional', categories: ['Energy', 'Mining'],                  lang: 'en', domain: 'worldbank.org',              topics: 'energy access, mining sector, energy transition, developing countries World Bank' },
  { name: 'Data Center Dynamics', location: 'Global', source_type: 'Press',         categories: ['Data Centers'],                      lang: 'en', domain: 'datacenterdynamics.com',    topics: 'data centers, hyperscalers, AI infrastructure, colocation, energy efficiency' },
  { name: 'Mining.com',           location: 'Global', source_type: 'Press',         categories: ['Mining'],                            lang: 'en', domain: 'mining.com',                topics: 'copper gold lithium mining, major miners, commodity prices, mining projects' },
]

function buildPrompt(source: WebSearchSource): string {
  const today = new Date().toISOString().split('T')[0]
  const typeDesc = source.source_type === 'Conglomerado'
    ? `trade association / industry group`
    : source.source_type === 'Market Advisor'
    ? `market research and advisory firm`
    : source.source_type
  const langNote = source.lang !== 'en'
    ? `Articles are in ${source.lang === 'es' ? 'Spanish' : source.lang === 'it' ? 'Italian' : source.lang === 'pl' ? 'Polish' : 'the source language'}.`
    : ''
  return `You are an industry intelligence analyst. Today is ${today}.

Find 4 real, recent articles or reports published in the last 21 days from "${source.name}" — a ${typeDesc} — at domain: ${source.domain}.
${langNote}

Topics: ${source.topics}

Return ONLY a valid JSON array (no markdown, no code fences):
[
  {
    "title": "exact article or report title",
    "url": "https://${source.domain}/actual-path",
    "date": "YYYY-MM-DD",
    "content": "2-3 sentence description"
  }
]

Rules:
- Every URL must contain "${source.domain.replace('www.', '').split('.')[0]}"
- Dates within the last 21 days from ${today}
- Return [] if you cannot find verified recent content
- Never fabricate URLs or titles`
}

export async function searchArticlesBySource(source: WebSearchSource): Promise<RawArticle[]> {
  const client = getClient()
  try {
    const response = await client.chat.completions.create({
      model: 'gpt-4o',
      max_tokens: 1500,
      temperature: 0.1,
      messages: [
        { role: 'system', content: 'You have broad knowledge of recent publications. Return ONLY valid JSON arrays. Never invent content.' },
        { role: 'user',   content: buildPrompt(source) },
      ],
    })
    const text  = response.choices[0]?.message?.content?.trim() || ''
    const match = text.match(/\[[\s\S]*\]/)
    if (!match) return []

    const items = JSON.parse(match[0]) as Array<{
      title: string; url: string; date: string; content: string
    }>
    const domainKey = source.domain.replace('www.', '').split('.')[0]

    return items
      .filter(item =>
        item.title &&
        item.url &&
        typeof item.url === 'string' &&
        item.url.startsWith('http') &&
        item.url.toLowerCase().includes(domainKey)
      )
      .slice(0, 4)
      .map(item => ({
        title:       item.title.trim(),
        url:         item.url.trim(),
        source:      source.name,
        source_type: source.source_type,
        location:    source.location,
        categories:  source.categories,
        date:        isValidDate(item.date) ? item.date : new Date().toISOString().split('T')[0],
        content:     item.content?.trim() || item.title,
        lang:        source.lang,
      } satisfies RawArticle))
  } catch (err) {
    console.warn(`[WebSearch] Failed for ${source.name}:`, (err as Error).message)
    return []
  }
}

export async function searchAllWebSources(
  sources: WebSearchSource[] = WEB_SEARCH_SOURCES,
  concurrency = 3
): Promise<{ articles: RawArticle[]; failed: string[] }> {
  const allArticles: RawArticle[] = []
  const failed: string[] = []

  for (let i = 0; i < sources.length; i += concurrency) {
    const batch = sources.slice(i, i + concurrency)
    const results = await Promise.all(batch.map(async s => {
      const arts = await searchArticlesBySource(s)
      if (arts.length === 0) failed.push(s.name)
      console.log(`[WebSearch] ${s.name} (${s.location}, ${s.source_type}): ${arts.length} articles`)
      return arts
    }))
    results.forEach(r => allArticles.push(...r))
    if (i + concurrency < sources.length) await new Promise(r => setTimeout(r, 600))
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

function isValidDate(s: string): boolean {
  if (!s || !/^\d{4}-\d{2}-\d{2}$/.test(s)) return false
  return !isNaN(new Date(s).getTime())
}
