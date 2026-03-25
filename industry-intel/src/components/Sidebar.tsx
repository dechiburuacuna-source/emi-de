'use client'

import type { Article, Category, Location, SourceType } from '@/types/article'
import { ALL_LOCATIONS, ALL_CATEGORIES } from '@/lib/sources'

interface SidebarProps {
  articles: Article[]
  filtered: Article[]
  cat: Category | 'all'
  locations: Location[]
  srcType: SourceType | null
  source: string | null
  lang: 'en' | 'es'
  onCat: (c: Category | 'all') => void
  onLocation: (l: Location) => void
  onSrcType: (t: SourceType) => void
  onSrc: (s: string) => void
}

const TX = {
  en: { nav: 'Navigation', home: 'Home', filters: 'Filters', loc: 'Location', srcType: 'Source Type', src: 'Source', inst: 'Institutional', press: 'Press', dc: 'Data Centers', mining: 'Mining', energy: 'Energy' },
  es: { nav: 'Navegación', home: 'Inicio', filters: 'Filtros', loc: 'Ubicación', srcType: 'Tipo de Fuente', src: 'Fuente', inst: 'Institucional', press: 'Prensa', dc: 'Data Centers', mining: 'Minería', energy: 'Energía' },
}

const CAT_DOTS: Record<string, string> = {
  all: '#00C8F0',
  Mining: '#F5A623',
  Energy: '#1FBF6A',
  'Data Centers': '#00C8F0',
}

export default function Sidebar({
  articles, filtered, cat, locations, srcType, source, lang,
  onCat, onLocation, onSrcType, onSrc
}: SidebarProps) {
  const t = TX[lang]

  const counts = {
    all: articles.length,
    Mining: articles.filter(a => a.category === 'Mining').length,
    Energy: articles.filter(a => a.category === 'Energy').length,
    'Data Centers': articles.filter(a => a.category === 'Data Centers').length,
  }

  const allSources = Array.from(new Set(articles.map(a => a.source))).sort()

  const navItems = [
    { key: 'all', label: t.home },
    { key: 'Mining', label: t.mining },
    { key: 'Energy', label: t.energy },
    { key: 'Data Centers', label: t.dc },
  ]

  return (
    <aside className="w-52 flex-shrink-0 bg-bg-2 border-r border-border flex flex-col overflow-y-auto overflow-x-hidden">
      {/* Navigation */}
      <div className="border-b border-border py-3.5">
        <div className="font-mono text-[9px] tracking-[1.8px] uppercase text-ink-3 px-3.5 pb-2">
          {t.nav}
        </div>
        {navItems.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => onCat(key as Category | 'all')}
            className={`w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium border-l-2 transition-all ${
              cat === key
                ? 'bg-cyan-dim text-dc border-dc'
                : 'text-ink-2 border-transparent hover:bg-bg-3 hover:text-ink'
            }`}
          >
            <span
              className="w-2 h-2 rounded-sm flex-shrink-0"
              style={{ background: CAT_DOTS[key] }}
            />
            <span className="flex-1 text-left">{label}</span>
            <span className="font-mono text-[10px] text-ink-3 bg-bg px-1.5 py-px rounded">
              {counts[key as keyof typeof counts]}
            </span>
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="border-b border-border py-3">
        <div className="font-mono text-[9px] tracking-[1.8px] uppercase text-ink-3 px-3.5 pb-1.5">
          {t.filters}
        </div>

        {/* Location */}
        <div className="px-3.5 py-2.5">
          <div className="font-mono text-[9px] tracking-[1.2px] uppercase text-ink-3 mb-2">{t.loc}</div>
          <div className="flex flex-col gap-1">
            {ALL_LOCATIONS.map(loc => (
              <label key={loc} className="flex items-center gap-2 text-[11px] text-ink-2 cursor-pointer hover:text-ink transition-colors">
                <input
                  type="checkbox"
                  checked={locations.includes(loc as Location)}
                  onChange={() => onLocation(loc as Location)}
                  className="w-3 h-3 accent-dc cursor-pointer"
                />
                {loc}
              </label>
            ))}
          </div>
        </div>

        {/* Source Type */}
        <div className="px-3.5 py-2">
          <div className="font-mono text-[9px] tracking-[1.2px] uppercase text-ink-3 mb-2">{t.srcType}</div>
          <div className="flex gap-1.5">
            {(['Institutional', 'Press'] as SourceType[]).map(st => (
              <button
                key={st}
                onClick={() => onSrcType(st)}
                className={`flex-1 py-1.5 font-mono text-[9px] font-medium rounded border transition-all text-center ${
                  srcType === st
                    ? st === 'Institutional'
                      ? 'border-institutional text-institutional bg-institutional/10'
                      : 'border-press text-press bg-press/10'
                    : 'border-border text-ink-3 hover:border-border-2 hover:text-ink-2'
                }`}
              >
                {st === 'Institutional' ? t.inst : t.press}
              </button>
            ))}
          </div>
        </div>

        {/* Source */}
        <div className="px-3.5 py-2">
          <div className="font-mono text-[9px] tracking-[1.2px] uppercase text-ink-3 mb-2">{t.src}</div>
          <div className="flex flex-col gap-1 max-h-32 overflow-y-auto pr-1">
            {allSources.map(s => (
              <label key={s} className={`flex items-center gap-2 text-[10px] cursor-pointer hover:text-ink transition-colors ${source === s ? 'text-dc' : 'text-ink-2'}`}>
                <input
                  type="checkbox"
                  checked={source === s}
                  onChange={() => onSrc(s)}
                  className="w-3 h-3 accent-dc cursor-pointer"
                />
                <span className="truncate">{s}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </aside>
  )
}
