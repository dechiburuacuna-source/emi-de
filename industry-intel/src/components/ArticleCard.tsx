'use client'

import type { Article } from '@/types/article'

interface ArticleCardProps {
  article: Article
  selected: boolean
  lang: 'en' | 'es'
  onClick: () => void
  index: number
}

const CAT_COLORS: Record<string, string> = {
  Mining: '#F5A623',
  Energy: '#1FBF6A',
  'Data Centers': '#00C8F0',
}

const CAT_BG: Record<string, string> = {
  Mining: 'rgba(245,166,35,0.10)',
  Energy: 'rgba(31,191,106,0.10)',
  'Data Centers': 'rgba(0,200,240,0.10)',
}

export default function ArticleCard({ article, selected, lang, onClick, index }: ArticleCardProps) {
  const title = lang === 'es' && article.title_es ? article.title_es : article.title
  const desc = lang === 'es' && article.extended_description_es
    ? article.extended_description_es
    : article.extended_description

  const cc = CAT_COLORS[article.category] || '#1A2540'
  const cb = CAT_BG[article.category] || 'transparent'

  const fmtDate = (ds: string) => {
    try {
      return new Date(ds).toLocaleDateString(lang === 'es' ? 'es-CL' : 'en-US', {
        month: 'short', day: 'numeric', year: 'numeric',
      })
    } catch { return ds }
  }

  return (
    <div
      onClick={onClick}
      style={{
        animationDelay: `${index * 35}ms`,
        borderLeft: `3px solid ${selected ? '#00C8F0' : cc}`,
      }}
      className={`relative rounded-sm p-3.5 cursor-pointer transition-all duration-150 animate-fade-up border ${
        selected
          ? 'border-dc bg-cyan-dim'
          : 'border-border bg-bg-3 hover:bg-bg-4 hover:border-border-2 hover:translate-x-0.5'
      }`}
    >
      {/* Top row */}
      <div className="flex items-start justify-between gap-3 mb-2">
        <h3 className="font-condensed text-sm font-semibold leading-snug tracking-wide text-ink">
          {title}
        </h3>
        <span className="font-mono text-[9px] text-ink-3 flex-shrink-0 mt-0.5">
          {fmtDate(article.date)}
        </span>
      </div>

      {/* Description */}
      <p className="text-[11px] text-ink-2 leading-relaxed mb-3 line-clamp-3">
        {desc}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {/* Category */}
        <span
          className="font-mono text-[9px] font-medium px-1.5 py-0.5 rounded-sm uppercase tracking-wide border"
          style={{ color: cc, borderColor: `${cc}40`, background: cb }}
        >
          {article.category}
        </span>

        {/* Source */}
        <span className="font-mono text-[9px] px-1.5 py-0.5 rounded-sm bg-white/[0.04] text-ink-2">
          {article.source}
        </span>

        {/* Source type */}
        <span
          className={`font-mono text-[9px] px-1.5 py-0.5 rounded-sm border uppercase tracking-wide ${
            article.source_type === 'Institutional'
              ? 'text-institutional border-institutional/30 bg-institutional/10'
              : 'text-press border-press/30 bg-press/10'
          }`}
        >
          {article.source_type === 'Institutional'
            ? (lang === 'es' ? 'Inst.' : 'Inst.')
            : (lang === 'es' ? 'Prensa' : 'Press')}
        </span>

        {/* Location */}
        <span className="font-mono text-[9px] px-1.5 py-0.5 rounded-sm bg-white/[0.03] text-ink-3">
          {article.location}
        </span>
      </div>
    </div>
  )
}
