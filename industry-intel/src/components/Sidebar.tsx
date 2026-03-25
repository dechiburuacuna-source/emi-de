'use client'
import type { Article, Category, Location, SourceType } from '@/types/article'
import { ALL_LOCATIONS } from '@/lib/sources'

interface SidebarProps {
  articles: Article[]; filtered: Article[]
  cat: Category | 'all'; locations: Location[]; srcType: SourceType | null; source: string | null
  lang: 'en' | 'es'
  onCat: (c: Category | 'all') => void; onLocation: (l: Location) => void
  onSrcType: (t: SourceType) => void; onSrc: (s: string) => void
}

const TX = {
  en: { nav:'Sections', home:'All News', mining:'Mining', energy:'Energy', dc:'Data Centers',
        filters:'Filter By', loc:'Location', srcType:'Source Type', src:'Source',
        inst:'Institutional', press:'Press', clearAll:'Clear filters' },
  es: { nav:'Secciones', home:'Todas las Noticias', mining:'Minería', energy:'Energía', dc:'Data Centers',
        filters:'Filtrar Por', loc:'Ubicación', srcType:'Tipo de Fuente', src:'Fuente',
        inst:'Institucional', press:'Prensa', clearAll:'Limpiar filtros' },
}

const CAT_COLORS: Record<string, string> = {
  all: 'var(--ink-black)', Mining: 'var(--mining-ink)', Energy: 'var(--energy-ink)', 'Data Centers': 'var(--dc-ink)',
}

export default function Sidebar({ articles, cat, locations, srcType, source, lang, onCat, onLocation, onSrcType, onSrc }: SidebarProps) {
  const t = TX[lang]
  const counts = {
    all: articles.length,
    Mining: articles.filter(a => a.category === 'Mining').length,
    Energy: articles.filter(a => a.category === 'Energy').length,
    'Data Centers': articles.filter(a => a.category === 'Data Centers').length,
  }
  const allSources = Array.from(new Set(articles.map(a => a.source))).sort()
  const hasFilters = locations.length > 0 || srcType !== null || source !== null

  const navItems = [
    { key: 'all', label: t.home },
    { key: 'Mining', label: t.mining },
    { key: 'Energy', label: t.energy },
    { key: 'Data Centers', label: t.dc },
  ]

  return (
    <aside className="flex flex-col overflow-y-auto" style={{ background: 'var(--paper-2)', borderRight: '1px solid var(--rule)', width: '200px', flexShrink: 0 }}>
      {/* Sections */}
      <div className="px-4 pt-4 pb-3" style={{ borderBottom: '2px solid var(--ink-black)' }}>
        <div className="font-sans text-xxs font-semibold tracking-[0.18em] uppercase mb-3" style={{ color: 'var(--ink-muted)' }}>{t.nav}</div>
        {navItems.map(({ key, label }) => {
          const active = cat === key
          return (
            <button key={key} onClick={() => onCat(key as Category | 'all')}
              className="w-full flex items-center justify-between py-1.5 text-left transition-all group"
              style={{ borderLeft: `3px solid ${active ? CAT_COLORS[key] : 'transparent'}`, paddingLeft: '8px' }}>
              <span className="font-display text-sm font-semibold"
                style={{ color: active ? CAT_COLORS[key] : 'var(--ink-dark)', textDecoration: active ? 'none' : 'none' }}>
                {label}
              </span>
              <span className="font-mono text-xxs px-1 rounded" style={{ color: 'var(--ink-faint)', background: 'var(--paper-3)' }}>
                {counts[key as keyof typeof counts] ?? 0}
              </span>
            </button>
          )
        })}
      </div>

      {/* Filters */}
      <div className="px-4 pt-4 pb-3 flex-1" style={{ borderBottom: '1px solid var(--rule)' }}>
        <div className="flex items-center justify-between mb-3">
          <div className="font-sans text-xxs font-semibold tracking-[0.18em] uppercase" style={{ color: 'var(--ink-muted)' }}>{t.filters}</div>
          {hasFilters && (
            <button onClick={() => { locations.forEach(l => onLocation(l)); if (srcType) onSrcType(srcType); if (source) onSrc(source) }}
              className="font-mono text-xxs underline" style={{ color: 'var(--accent-red)' }}>{t.clearAll}</button>
          )}
        </div>

        {/* Location */}
        <div className="mb-4">
          <div className="font-sans text-xxs font-medium tracking-wide uppercase mb-2 pb-1" style={{ color: 'var(--ink-muted)', borderBottom: '1px solid var(--rule)' }}>{t.loc}</div>
          {ALL_LOCATIONS.map(loc => (
            <label key={loc} className="flex items-center gap-2 py-1 cursor-pointer group">
              <input type="checkbox" checked={locations.includes(loc as Location)} onChange={() => onLocation(loc as Location)}
                className="w-3 h-3 cursor-pointer accent-red-700" />
              <span className="font-body text-xs" style={{ color: locations.includes(loc as Location) ? 'var(--ink-black)' : 'var(--ink-muted)' }}>{loc}</span>
            </label>
          ))}
        </div>

        {/* Source Type */}
        <div className="mb-4">
          <div className="font-sans text-xxs font-medium tracking-wide uppercase mb-2 pb-1" style={{ color: 'var(--ink-muted)', borderBottom: '1px solid var(--rule)' }}>{t.srcType}</div>
          {(['Institutional', 'Press'] as SourceType[]).map(st => (
            <label key={st} className="flex items-center gap-2 py-1 cursor-pointer">
              <input type="checkbox" checked={srcType === st} onChange={() => onSrcType(st)} className="w-3 h-3 cursor-pointer accent-red-700" />
              <span className="font-body text-xs" style={{ color: srcType === st ? 'var(--ink-black)' : 'var(--ink-muted)' }}>
                {st === 'Institutional' ? t.inst : t.press}
              </span>
            </label>
          ))}
        </div>

        {/* Source */}
        <div>
          <div className="font-sans text-xxs font-medium tracking-wide uppercase mb-2 pb-1" style={{ color: 'var(--ink-muted)', borderBottom: '1px solid var(--rule)' }}>{t.src}</div>
          <div className="flex flex-col max-h-40 overflow-y-auto">
            {allSources.map(s => (
              <label key={s} className="flex items-center gap-2 py-0.5 cursor-pointer">
                <input type="checkbox" checked={source === s} onChange={() => onSrc(s)} className="w-3 h-3 cursor-pointer accent-red-700" />
                <span className="font-body text-xxs truncate" style={{ color: source === s ? 'var(--ink-black)' : 'var(--ink-muted)' }}>{s}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Footer note */}
      <div className="px-4 py-3">
        <p className="font-mono text-xxs leading-relaxed" style={{ color: 'var(--ink-faint)' }}>
          {lang === 'en' ? 'Updated daily\n08:00 CLT\nAI-summarized' : 'Actualizado\n08:00 CLT\nResumido por IA'}
        </p>
      </div>
    </aside>
  )
}
