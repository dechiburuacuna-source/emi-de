'use client'

import type { Article, Category, Location, SourceType, Metrics } from '@/types/article'

interface RightPanelProps {
  selected: Article | null
  filtered: Article[]
  lang: 'en' | 'es'
}

const TX = {
  en: {
    panel: 'Summary & Metrics',
    noSel: 'Select an article to view its AI-generated summary',
    keyIns: 'Key Insights',
    readMore: 'Read full article',
    aggMet: 'Aggregated Metrics',
    byCat: 'By Category',
    byLoc: 'By Location',
    bySrcType: 'By Source Type',
    srcBreak: 'Source Breakdown',
    inst: 'Institutional',
    press: 'Press',
    dc: 'Data Centers',
  },
  es: {
    panel: 'Resumen y Métricas',
    noSel: 'Selecciona un artículo para ver su resumen generado por IA',
    keyIns: 'Puntos Clave',
    readMore: 'Leer artículo completo',
    aggMet: 'Métricas Agregadas',
    byCat: 'Por Categoría',
    byLoc: 'Por Ubicación',
    bySrcType: 'Por Tipo de Fuente',
    srcBreak: 'Desglose por Fuente',
    inst: 'Institucional',
    press: 'Prensa',
    dc: 'Data Centers',
  },
}

const LOCATIONS: Location[] = ['Chile', 'Italy', 'Poland', 'Mexico', 'Spain', 'Global']
const CATEGORIES: Category[] = ['Mining', 'Energy', 'Data Centers']
const LOC_COLORS = ['#00C8F0', '#1FBF6A', '#F5A623', '#F26B3A', '#EF4444', '#9D7BF8']
const CAT_COLORS: Record<Category, string> = {
  Mining: '#F5A623',
  Energy: '#1FBF6A',
  'Data Centers': '#00C8F0',
}

function MetricBar({ label, value, max, color }: { label: string; value: number; max: number; color: string }) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0
  return (
    <div className="flex items-center gap-2 mb-1.5">
      <span className="font-mono text-[9px] text-ink-2 w-[72px] flex-shrink-0 truncate">{label}</span>
      <div className="flex-1 h-[3px] bg-bg rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, background: color }}
        />
      </div>
      <span className="font-mono text-[9px] text-ink-3 w-4 text-right">{value}</span>
    </div>
  )
}

export default function RightPanel({ selected, filtered, lang }: RightPanelProps) {
  const t = TX[lang]

  // Compute metrics from filtered articles
  const catC = Object.fromEntries(CATEGORIES.map(c => [c, 0])) as Record<Category, number>
  const locC = Object.fromEntries(LOCATIONS.map(l => [l, 0])) as Record<Location, number>
  const stC: Record<SourceType, number> = { Institutional: 0, Press: 0 }
  const srcC: Record<string, number> = {}

  filtered.forEach(a => {
    if (catC[a.category] !== undefined) catC[a.category]++
    if (locC[a.location] !== undefined) locC[a.location]++
    if (stC[a.source_type] !== undefined) stC[a.source_type]++
    srcC[a.source] = (srcC[a.source] || 0) + 1
  })

  const mxCat = Math.max(...Object.values(catC), 1)
  const mxLoc = Math.max(...Object.values(locC), 1)
  const mxSt  = Math.max(...Object.values(stC), 1)
  const sortedSrc = Object.entries(srcC).sort(([, a], [, b]) => b - a)

  const bullets = selected
    ? (lang === 'es' && selected.short_summary_es?.length
        ? selected.short_summary_es
        : selected.short_summary)
    : []

  const selTitle = selected
    ? (lang === 'es' && selected.title_es ? selected.title_es : selected.title)
    : ''

  return (
    <aside className="w-[300px] flex-shrink-0 bg-bg-2 border-l border-border flex flex-col overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3.5 border-b border-border flex-shrink-0">
        <span className="font-mono text-[10px] tracking-[1.5px] uppercase text-ink-3">
          {t.panel}
        </span>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-3.5 space-y-0">
        {/* Article summary */}
        {!selected ? (
          <div className="flex flex-col items-center justify-center py-8 text-center mb-4 border-b border-border">
            <div className="text-2xl opacity-10 mb-3">◈</div>
            <p className="text-[11px] text-ink-3 leading-relaxed">{t.noSel}</p>
          </div>
        ) : (
          <div className="mb-4 pb-4 border-b border-border">
            <div className="font-mono text-[9px] tracking-[1.4px] uppercase text-ink-3 pb-2 border-b border-border mb-3">
              {t.keyIns}
            </div>
            <h4 className="font-condensed text-[13px] font-bold leading-snug text-ink mb-3">
              {selTitle}
            </h4>
            <ul className="space-y-2 mb-3.5">
              {bullets.map((b, i) => (
                <li key={i} className="flex gap-2 text-[11px] text-ink-2 leading-relaxed">
                  <span className="text-dc flex-shrink-0 mt-0.5 text-[9px]">▸</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <a
              href={selected.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-[9px] text-dc border border-dc/20 rounded px-2.5 py-1.5 hover:bg-dc/10 transition-colors"
            >
              {t.readMore} →
            </a>
          </div>
        )}

        {/* Aggregated Metrics */}
        {filtered.length > 0 && (
          <>
            <div className="font-mono text-[9px] tracking-[1.4px] uppercase text-ink-3 pb-2 border-b border-border mb-3">
              {t.aggMet}
            </div>

            {/* By Category */}
            <div className="mb-4">
              <div className="font-mono text-[9px] tracking-[.8px] uppercase text-ink-3 mb-2">{t.byCat}</div>
              {CATEGORIES.map(c => (
                <MetricBar key={c} label={c === 'Data Centers' ? 'DC' : c} value={catC[c]} max={mxCat} color={CAT_COLORS[c]} />
              ))}
            </div>

            {/* By Location */}
            <div className="mb-4">
              <div className="font-mono text-[9px] tracking-[.8px] uppercase text-ink-3 mb-2">{t.byLoc}</div>
              {LOCATIONS.map((l, i) => (
                <MetricBar key={l} label={l} value={locC[l]} max={mxLoc} color={LOC_COLORS[i]} />
              ))}
            </div>

            {/* By Source Type */}
            <div className="mb-4">
              <div className="font-mono text-[9px] tracking-[.8px] uppercase text-ink-3 mb-2">{t.bySrcType}</div>
              <MetricBar label={t.inst} value={stC.Institutional} max={mxSt} color="#9D7BF8" />
              <MetricBar label={t.press} value={stC.Press} max={mxSt} color="#F26B3A" />
            </div>

            {/* Divider */}
            <div className="h-px bg-border mb-3" />

            {/* Source breakdown */}
            <div className="font-mono text-[9px] tracking-[1.4px] uppercase text-ink-3 pb-2 border-b border-border mb-2">
              {t.srcBreak}
            </div>
            <div>
              {sortedSrc.map(([src, cnt]) => (
                <div key={src} className="flex justify-between items-center py-1.5 border-b border-border last:border-0">
                  <span className="font-mono text-[9px] text-ink-2 truncate mr-2">{src}</span>
                  <span className="font-mono text-[9px] text-ink-3 bg-bg px-1.5 py-px rounded flex-shrink-0">{cnt}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </aside>
  )
}
