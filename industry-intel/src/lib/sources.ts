import type { Category, Location, SourceType } from '@/types/article'

export interface SourceDef {
  name: string
  location: Location
  source_type: SourceType
  rss: string | null          // null = no public RSS feed
  categories: Category[]
  lang?: 'es' | 'en' | 'it' | 'pl'
}

export const TRUSTED_SOURCES: SourceDef[] = [
  // ─── Chile ─────────────────────────────────────────────
  {
    name: 'Cochilco',
    location: 'Chile',
    source_type: 'Institutional',
    rss: 'https://www.cochilco.cl/rss.xml',
    categories: ['Mining'],
    lang: 'es',
  },
  {
    name: 'Sernageomin',
    location: 'Chile',
    source_type: 'Institutional',
    rss: 'https://www.sernageomin.cl/feed/',
    categories: ['Mining'],
    lang: 'es',
  },
  {
    name: 'Ministerio de Minería',
    location: 'Chile',
    source_type: 'Institutional',
    rss: null,
    categories: ['Mining'],
    lang: 'es',
  },
  {
    name: 'Ministerio de Energía Chile',
    location: 'Chile',
    source_type: 'Institutional',
    rss: 'https://energia.gob.cl/feed/',
    categories: ['Energy'],
    lang: 'es',
  },
  {
    name: 'Comisión Nacional de Energía',
    location: 'Chile',
    source_type: 'Institutional',
    rss: 'https://www.cne.cl/feed/',
    categories: ['Energy'],
    lang: 'es',
  },
  {
    name: 'Coordinador Eléctrico Nacional',
    location: 'Chile',
    source_type: 'Institutional',
    rss: null,
    categories: ['Energy'],
    lang: 'es',
  },
  {
    name: 'Diario Financiero',
    location: 'Chile',
    source_type: 'Press',
    rss: 'https://www.df.cl/noticias/rss.xml',
    categories: ['Mining', 'Energy'],
    lang: 'es',
  },
  {
    name: 'La Tercera',
    location: 'Chile',
    source_type: 'Press',
    rss: 'https://www.latercera.com/feed/',
    categories: ['Mining', 'Energy'],
    lang: 'es',
  },
  {
    name: 'Revista Electricidad',
    location: 'Chile',
    source_type: 'Press',
    rss: 'https://www.revistaei.cl/feed/',
    categories: ['Energy'],
    lang: 'es',
  },
  {
    name: 'BNamericas',
    location: 'Chile',
    source_type: 'Press',
    rss: 'https://www.bnamericas.com/rss/',
    categories: ['Mining', 'Energy'],
    lang: 'en',
  },

  // ─── Italy ─────────────────────────────────────────────
  {
    name: "Ministero dell'Ambiente",
    location: 'Italy',
    source_type: 'Institutional',
    rss: 'https://www.mase.gov.it/rss.xml',
    categories: ['Energy'],
    lang: 'it',
  },
  {
    name: 'Terna',
    location: 'Italy',
    source_type: 'Institutional',
    rss: 'https://www.terna.it/it/media/notizie/rss.xml',
    categories: ['Energy'],
    lang: 'it',
  },
  {
    name: 'Il Sole 24 Ore',
    location: 'Italy',
    source_type: 'Press',
    rss: 'https://www.ilsole24ore.com/rss/notizie.xml',
    categories: ['Energy'],
    lang: 'it',
  },
  {
    name: 'Energia Oltre',
    location: 'Italy',
    source_type: 'Press',
    rss: 'https://www.energiaoltre.it/feed/',
    categories: ['Energy'],
    lang: 'it',
  },

  // ─── Poland ────────────────────────────────────────────
  {
    name: 'Ministry of Climate Poland',
    location: 'Poland',
    source_type: 'Institutional',
    rss: null,
    categories: ['Energy'],
    lang: 'pl',
  },
  {
    name: 'PSE',
    location: 'Poland',
    source_type: 'Institutional',
    rss: null,
    categories: ['Energy'],
    lang: 'pl',
  },
  {
    name: 'BiznesAlert',
    location: 'Poland',
    source_type: 'Press',
    rss: 'https://biznesalert.pl/feed/',
    categories: ['Energy'],
    lang: 'pl',
  },
  {
    name: 'Warsaw Business Journal',
    location: 'Poland',
    source_type: 'Press',
    rss: 'https://wbj.pl/feed',
    categories: ['Energy'],
    lang: 'en',
  },

  // ─── Mexico ────────────────────────────────────────────
  {
    name: 'SENER',
    location: 'Mexico',
    source_type: 'Institutional',
    rss: null,
    categories: ['Energy'],
    lang: 'es',
  },
  {
    name: 'CFE',
    location: 'Mexico',
    source_type: 'Institutional',
    rss: null,
    categories: ['Energy'],
    lang: 'es',
  },
  {
    name: 'El Financiero',
    location: 'Mexico',
    source_type: 'Press',
    rss: 'https://www.elfinanciero.com.mx/arc/outboundfeeds/rss/',
    categories: ['Energy', 'Mining'],
    lang: 'es',
  },
  {
    name: 'Energía Hoy',
    location: 'Mexico',
    source_type: 'Press',
    rss: 'https://energiahoy.com/feed/',
    categories: ['Energy'],
    lang: 'es',
  },

  // ─── Spain ─────────────────────────────────────────────
  {
    name: 'MITECO',
    location: 'Spain',
    source_type: 'Institutional',
    rss: null,
    categories: ['Energy'],
    lang: 'es',
  },
  {
    name: 'Red Eléctrica',
    location: 'Spain',
    source_type: 'Institutional',
    rss: 'https://www.ree.es/es/sala-de-prensa/noticias-y-novedades/rss',
    categories: ['Energy'],
    lang: 'es',
  },
  {
    name: 'El País',
    location: 'Spain',
    source_type: 'Press',
    rss: 'https://feeds.elpais.com/mrss-s/pages/ep/site/elpais.com/portada',
    categories: ['Energy', 'Mining'],
    lang: 'es',
  },
  {
    name: 'Expansión',
    location: 'Spain',
    source_type: 'Press',
    rss: 'https://e00-expansion.uecdn.es/rss/portada.xml',
    categories: ['Energy'],
    lang: 'es',
  },

  // ─── Global ────────────────────────────────────────────
  {
    name: 'IEA',
    location: 'Global',
    source_type: 'Institutional',
    rss: 'https://www.iea.org/api/news/rss',
    categories: ['Energy', 'Mining', 'Data Centers'],
    lang: 'en',
  },
  {
    name: 'World Bank',
    location: 'Global',
    source_type: 'Institutional',
    rss: 'https://blogs.worldbank.org/energy/feed',
    categories: ['Energy', 'Mining'],
    lang: 'en',
  },
  {
    name: 'Reuters',
    location: 'Global',
    source_type: 'Press',
    rss: 'https://feeds.reuters.com/reuters/businessNews',
    categories: ['Mining', 'Energy', 'Data Centers'],
    lang: 'en',
  },
  {
    name: 'Bloomberg',
    location: 'Global',
    source_type: 'Press',
    rss: null,   // Bloomberg no longer offers free RSS
    categories: ['Mining', 'Energy', 'Data Centers'],
    lang: 'en',
  },
  {
    name: 'Mining.com',
    location: 'Global',
    source_type: 'Press',
    rss: 'https://www.mining.com/feed/',
    categories: ['Mining'],
    lang: 'en',
  },
  {
    name: 'Data Center Dynamics',
    location: 'Global',
    source_type: 'Press',
    rss: 'https://www.datacenterdynamics.com/en/rss/',
    categories: ['Data Centers'],
    lang: 'en',
  },
  {
    name: 'TechCrunch',
    location: 'Global',
    source_type: 'Press',
    rss: 'https://techcrunch.com/feed/',
    categories: ['Data Centers'],
    lang: 'en',
  },
]

/** Only sources that have an RSS feed */
export const RSS_SOURCES = TRUSTED_SOURCES.filter(s => s.rss !== null)

/** All unique sources per location */
export const SOURCES_BY_LOCATION = TRUSTED_SOURCES.reduce(
  (acc, s) => {
    if (!acc[s.location]) acc[s.location] = []
    acc[s.location].push(s.name)
    return acc
  },
  {} as Record<string, string[]>
)

export const ALL_LOCATIONS = ['Chile', 'Italy', 'Poland', 'Mexico', 'Spain', 'Global'] as const
export const ALL_CATEGORIES = ['Mining', 'Energy', 'Data Centers'] as const
