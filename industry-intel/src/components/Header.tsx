'use client'

const TX = {
  en: { updated: 'Updated', refresh: 'Refresh', mining: 'Mining', energy: 'Energy', dc: 'Data Centers' },
  es: { updated: 'Actualizado', refresh: 'Actualizar', mining: 'Minería', energy: 'Energía', dc: 'Data Centers' },
}

interface HeaderProps {
  lang: 'en' | 'es'; onLangChange: (l: 'en' | 'es') => void
  onRefresh: () => void; isRefreshing: boolean; lastUpdated: string | null
}

export default function Header({ lang, onLangChange, onRefresh, isRefreshing, lastUpdated }: HeaderProps) {
  const t = TX[lang]
  const today = new Date().toLocaleDateString(lang === 'es' ? 'es-CL' : 'en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  })

  return (
    <header style={{ background: 'var(--paper)', borderBottom: '1px solid var(--rule)' }}>
      {/* Top utility bar */}
      <div style={{ borderBottom: '1px solid var(--rule)', background: 'var(--ink-black)' }}
        className="px-4 md:px-6 3xl:px-10 py-1 flex items-center justify-between">
        <span className="font-mono text-xxs tracking-widest uppercase" style={{ color: 'var(--rule)' }}>
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400 mr-1.5 align-middle"
            style={{ boxShadow: '0 0 4px #4ade80', animation: 'blink 2s infinite' }} />
          {lastUpdated ? `${t.updated} ${lastUpdated}` : 'Live'}
        </span>
        <div className="flex items-center gap-3">
          <button onClick={onRefresh} disabled={isRefreshing}
            className="font-mono text-xxs tracking-widest uppercase transition-colors disabled:opacity-40"
            style={{ color: 'var(--rule)' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'white')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--rule)')}>
            {isRefreshing ? '...' : t.refresh}
          </button>
          <div className="h-3 w-px" style={{ background: 'var(--rule-dark)' }} />
          <div className="flex gap-0">
            {(['en', 'es'] as const).map(l => (
              <button key={l} onClick={() => onLangChange(l)}
                className="font-mono text-xxs px-2 py-0.5 tracking-widest uppercase transition-all"
                style={{ color: lang === l ? 'var(--ink-black)' : 'var(--rule)', background: lang === l ? 'white' : 'transparent' }}>
                {l.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Masthead */}
      <div className="px-4 md:px-6 3xl:px-10 py-3 md:py-4 3xl:py-6 text-center border-b-4"
        style={{ borderBottomColor: 'var(--ink-black)' }}>
        <div className="flex items-center justify-center gap-4 md:gap-8 mb-2">
          <div className="hidden md:block flex-1 h-px" style={{ background: 'var(--rule)' }} />
          <h1 className="font-display font-black tracking-tight leading-none select-none"
            style={{ color: 'var(--ink-black)', fontSize: 'clamp(1.75rem, 4vw, 4rem)' }}>
            Industry<span style={{ color: 'var(--accent-red)' }}>·</span>Intelligence
          </h1>
          <div className="hidden md:block flex-1 h-px" style={{ background: 'var(--rule)' }} />
        </div>
        <p className="font-sans text-xxs md:text-xs tracking-[0.2em] uppercase" style={{ color: 'var(--ink-muted)' }}>
          {today}
          <span className="mx-2" style={{ color: 'var(--rule)' }}>·</span>
          {lang === 'en' ? 'Mining · Energy · Data Centers' : 'Minería · Energía · Data Centers'}
        </p>
      </div>

      {/* Section nav — desktop only */}
      <div className="hidden md:flex items-center px-4 md:px-6 3xl:px-10 py-1.5 gap-6 border-b"
        style={{ borderBottomColor: 'var(--rule)' }}>
        {[
          { key: 'mining', label: t.mining, color: 'var(--mining-ink)' },
          { key: 'energy', label: t.energy, color: 'var(--energy-ink)' },
          { key: 'dc',     label: t.dc,     color: 'var(--dc-ink)' },
        ].map(s => (
          <span key={s.key} className="font-sans text-xs font-semibold tracking-wide uppercase cursor-default"
            style={{ color: s.color }}>
            {s.label}
          </span>
        ))}
        <div className="flex-1" />
        <span className="font-mono text-xxs" style={{ color: 'var(--ink-faint)' }}>
          {lang === 'en' ? 'Trusted sources · AI-summarized · Auto-updated 08:00 CLT' : 'Fuentes confiables · Resumidas por IA · Actualización automática 08:00 CLT'}
        </span>
      </div>
    </header>
  )
}
