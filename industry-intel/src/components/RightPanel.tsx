'use client'
import type { Article, Category, Location, SourceType, Metrics } from '@/types/article'

interface RightPanelProps { selected: Article | null; filtered: Article[]; lang: 'en' | 'es' }

const TX = {
  en: { panel: 'Summary', noSel: 'Select a headline to read the AI-generated analysis',
        keyIns: 'Key Insights', read: 'Read full article →',
        aggMet: 'Feed Metrics', byCat: 'By Section', byLoc: 'By Region',
        bySrcType: 'By Source Type', srcBreak: 'Sources', inst: 'Institutional', press: 'Press',
        dc: 'Data Centers', mining: 'Mining', energy: 'Energy' },
  es: { panel: 'Resumen', noSel: 'Selecciona un titular para leer el análisis generado por IA',
        keyIns: 'Puntos Clave', read: 'Leer artículo completo →',
        aggMet: 'Métricas del Feed', byCat: 'Por Sección', byLoc: 'Por Región',
        bySrcType: 'Por Tipo de Fuente', srcBreak: 'Fuentes', inst: 'Institucional', press: 'Prensa',
        dc: 'Data Centers', mining: 'Minería', energy: 'Energía' },
}

const LOCATIONS: Location[] = ['Chile','Italy','Poland','Mexico','Spain','Global']
const CATEGORIES: Category[] = ['Mining','Energy','Data Centers']
const LOC_COLORS = ['#7D5A00','#1A5C3A','#1A3A5C','#922B21','#3D1A6E','#2C2C2C']
const CAT_COLORS: Record<Category, string> = { Mining: 'var(--mining-ink)', Energy: 'var(--energy-ink)', 'Data Centers': 'var(--dc-ink)' }

function Bar({ label, val, max, color }: { label: string; val: number; max: number; color: string }) {
  const pct = max > 0 ? Math.round((val/max)*100) : 0
  return (
    <div className="flex items-center gap-2 mb-1.5">
      <span className="font-mono text-xxs w-16 flex-shrink-0 truncate" style={{ color: 'var(--ink-muted)' }}>{label}</span>
      <div className="flex-1 h-1 rounded-full overflow-hidden" style={{ background: 'var(--paper-3)' }}>
        <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, background: color }} />
      </div>
      <span className="font-mono text-xxs w-4 text-right" style={{ color: 'var(--ink-faint)' }}>{val}</span>
    </div>
  )
}

export default function RightPanel({ selected, filtered, lang }: RightPanelProps) {
  const t = TX[lang]
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
  const sortedSrc = Object.entries(srcC).sort(([,a],[,b]) => b - a)

  const bullets = selected
    ? (lang === 'es' && selected.short_summary_es?.length ? selected.short_summary_es : selected.short_summary)
    : []
  const selTitle = selected ? (lang === 'es' && selected.title_es ? selected.title_es : selected.title) : ''

  return (
    <aside style={{ width: '260px', flexShrink: 0, background: 'var(--paper-2)', borderLeft: '1px solid var(--rule)' }}
      className="flex flex-col overflow-hidden">

      {/* Panel header */}
      <div className="px-4 py-2 flex-shrink-0" style={{ borderBottom: '3px solid var(--ink-black)', background: 'var(--paper-3)' }}>
        <span className="font-sans text-xxs font-semibold tracking-[0.18em] uppercase" style={{ color: 'var(--ink-muted)' }}>
          {t.panel}
        </span>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Article summary */}
        {!selected ? (
          <div className="px-4 py-6 border-b" style={{ borderBottomColor: 'var(--rule)' }}>
            <div className="font-display text-3xl mb-3 text-center" style={{ color: 'var(--rule)' }}>¶</div>
            <p className="font-body text-xs text-center leading-relaxed" style={{ color: 'var(--ink-muted)' }}>{t.noSel}</p>
          </div>
        ) : (
          <div className="px-4 py-4 border-b" style={{ borderBottomColor: 'var(--rule)' }}>
            <div className="font-sans text-xxs font-semibold tracking-[0.18em] uppercase mb-2 pb-1"
              style={{ color: 'var(--ink-muted)', borderBottom: '1px solid var(--rule)' }}>{t.keyIns}</div>
            <h4 className="font-display font-bold leading-snug mb-3" style={{ color: 'var(--ink-black)', fontSize: '0.9rem' }}>
              {selTitle}
            </h4>
            <ul className="space-y-2 mb-3">
              {bullets.map((b, i) => (
                <li key={i} className="flex gap-2">
                  <span className="flex-shrink-0 mt-1 font-display font-bold" style={{ color: 'var(--accent-red)', fontSize: '0.6rem' }}>◆</span>
                  <span className="font-body text-xs leading-snug" style={{ color: 'var(--ink-body)' }}>{b}</span>
                </li>
              ))}
            </ul>
            <a href={selected.url} target="_blank" rel="noopener noreferrer"
              className="font-sans text-xxs font-semibold underline" style={{ color: 'var(--accent-red)' }}>
              {t.read}
            </a>
          </div>
        )}

        {/* Metrics */}
        {filtered.length > 0 && (
          <div className="px-4 py-4">
            <div className="font-sans text-xxs font-semibold tracking-[0.18em] uppercase mb-3 pb-1"
              style={{ color: 'var(--ink-muted)', borderBottom: '2px solid var(--ink-black)' }}>{t.aggMet}</div>

            <div className="mb-3">
              <div className="font-mono text-xxs uppercase tracking-wide mb-2" style={{ color: 'var(--ink-faint)' }}>{t.byCat}</div>
              {CATEGORIES.map(c => <Bar key={c} label={c === 'Data Centers' ? 'DC' : c} val={catC[c]} max={mxCat} color={CAT_COLORS[c]} />)}
            </div>

            <div className="mb-3" style={{ borderTop: '1px solid var(--rule)', paddingTop: '8px' }}>
              <div className="font-mono text-xxs uppercase tracking-wide mb-2" style={{ color: 'var(--ink-faint)' }}>{t.byLoc}</div>
              {LOCATIONS.map((l, i) => <Bar key={l} label={l} val={locC[l]} max={mxLoc} color={LOC_COLORS[i]} />)}
            </div>

            <div className="mb-3" style={{ borderTop: '1px solid var(--rule)', paddingTop: '8px' }}>
              <div className="font-mono text-xxs uppercase tracking-wide mb-2" style={{ color: 'var(--ink-faint)' }}>{t.bySrcType}</div>
              <Bar label={t.inst} val={stC.Institutional} max={mxSt} color="var(--inst-ink)" />
              <Bar label={t.press} val={stC.Press} max={mxSt} color="var(--press-ink)" />
            </div>

            <div style={{ borderTop: '2px solid var(--ink-black)', paddingTop: '8px' }}>
              <div className="font-mono text-xxs uppercase tracking-wide mb-2" style={{ color: 'var(--ink-faint)' }}>{t.srcBreak}</div>
              {sortedSrc.map(([src, cnt]) => (
                <div key={src} className="flex justify-between items-center py-1" style={{ borderBottom: '1px solid var(--rule)' }}>
                  <span className="font-body text-xxs truncate mr-2" style={{ color: 'var(--ink-body)' }}>{src}</span>
                  <span className="font-mono text-xxs px-1 rounded" style={{ color: 'var(--ink-faint)', background: 'var(--paper-3)' }}>{cnt}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </aside>
  )
}
