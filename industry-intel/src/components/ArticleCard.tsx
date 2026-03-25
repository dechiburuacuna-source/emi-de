'use client'
import type { Article } from '@/types/article'

interface ArticleCardProps {
  article: Article; selected: boolean; lang: 'en' | 'es'; onClick: () => void; index: number
}

const CAT_COLORS: Record<string, string> = {
  Mining: 'var(--mining-ink)', Energy: 'var(--energy-ink)', 'Data Centers': 'var(--dc-ink)',
}
const CAT_LABELS_ES: Record<string, string> = {
  Mining: 'Minería', Energy: 'Energía', 'Data Centers': 'Data Centers',
}

export default function ArticleCard({ article, selected, lang, onClick, index }: ArticleCardProps) {
  const title = lang === 'es' && article.title_es ? article.title_es : article.title
  const desc = lang === 'es' && article.extended_description_es ? article.extended_description_es : article.extended_description
  const cc = CAT_COLORS[article.category] || 'var(--ink-dark)'
  const catLabel = lang === 'es' ? CAT_LABELS_ES[article.category] : article.category

  const fmtDate = (ds: string) => {
    try {
      return new Date(ds).toLocaleDateString(lang === 'es' ? 'es-CL' : 'en-US', { month: 'short', day: 'numeric' })
    } catch { return ds }
  }

  return (
    <article
      onClick={onClick}
      style={{
        animationDelay: `${index * 30}ms`,
        borderLeft: `3px solid ${selected ? 'var(--accent-red)' : cc}`,
        background: selected ? 'var(--paper-3)' : 'var(--paper)',
        cursor: 'pointer',
        transition: 'all 0.12s ease',
      }}
      className="animate-in pl-3 pr-2 py-3 border-b group hover:bg-paper-3"
      onMouseEnter={e => { if (!selected) (e.currentTarget as HTMLElement).style.background = 'var(--paper-2)' }}
      onMouseLeave={e => { if (!selected) (e.currentTarget as HTMLElement).style.background = 'var(--paper)' }}
    >
      {/* Meta row */}
      <div className="flex items-center gap-2 mb-1.5 flex-wrap">
        <span className="font-sans text-xxs font-semibold tracking-[0.15em] uppercase" style={{ color: cc }}>{catLabel}</span>
        <span style={{ color: 'var(--rule)' }}>·</span>
        <span className="font-sans text-xxs" style={{ color: 'var(--ink-faint)' }}>{article.source}</span>
        <span style={{ color: 'var(--rule)' }}>·</span>
        <span className="font-mono text-xxs" style={{ color: 'var(--ink-faint)' }}>{fmtDate(article.date)}</span>
        <span className="ml-auto">
          <span className="font-mono text-xxs px-1.5 py-0.5 rounded-sm"
            style={{
              color: article.source_type === 'Institutional' ? 'var(--inst-ink)' : 'var(--press-ink)',
              background: article.source_type === 'Institutional' ? 'rgba(61,26,110,0.07)' : 'rgba(110,61,26,0.07)',
              border: `1px solid ${article.source_type === 'Institutional' ? 'rgba(61,26,110,0.2)' : 'rgba(110,61,26,0.2)'}`,
            }}>
            {article.source_type === 'Institutional' ? (lang === 'es' ? 'Inst.' : 'Inst.') : (lang === 'es' ? 'Prensa' : 'Press')}
          </span>
        </span>
      </div>

      {/* Headline */}
      <h3 className="font-display font-bold leading-snug mb-2 line-clamp-3 md:line-clamp-2"
        style={{ color: 'var(--ink-black)', fontSize: 'clamp(0.9rem, 1.5vw, 1.05rem)' }}>
        {title}
      </h3>

      {/* Body text */}
      <p className="font-body text-xs leading-relaxed line-clamp-3 hidden md:block"
        style={{ color: 'var(--ink-body)' }}>
        {desc}
      </p>

      {/* Location tag */}
      <div className="mt-2 hidden md:flex items-center gap-2">
        <span className="font-mono text-xxs px-1.5 py-0.5 rounded-sm"
          style={{ color: 'var(--ink-muted)', background: 'var(--paper-3)', border: '1px solid var(--rule)' }}>
          {article.location}
        </span>
      </div>
    </article>
  )
}
