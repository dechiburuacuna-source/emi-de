'use client'
import type { Article, Category } from '@/types/article'
import ArticleCard from './ArticleCard'

interface MainFeedProps {
  articles: Article[]; selected: Article | null
  cat: Category | 'all'; lang: 'en' | 'es'; onSelect: (a: Article) => void
}

const TX = {
  en: { all: 'All Intelligence', mining: 'Mining', energy: 'Energy', dc: 'Data Centers',
        articles: 'articles', empty: 'No articles match the current filters.' },
  es: { all: 'Toda la Inteligencia', mining: 'Minería', energy: 'Energía', dc: 'Data Centers',
        articles: 'artículos', empty: 'No hay artículos con los filtros actuales.' },
}
const CAT_COLORS: Record<string, string> = {
  all: 'var(--ink-black)', Mining: 'var(--mining-ink)', Energy: 'var(--energy-ink)', 'Data Centers': 'var(--dc-ink)',
}

export default function MainFeed({ articles, selected, cat, lang, onSelect }: MainFeedProps) {
  const t = TX[lang]
  const title = cat === 'all' ? t.all : cat === 'Mining' ? t.mining : cat === 'Energy' ? t.energy : t.dc
  const cc = CAT_COLORS[cat]

  return (
    <main className="flex flex-col overflow-hidden flex-1" style={{ background: 'var(--paper)', borderRight: '1px solid var(--rule)' }}>
      {/* Feed header */}
      <div className="px-4 py-3 flex-shrink-0" style={{ borderBottom: `3px solid ${cc}`, background: 'var(--paper-2)' }}>
        <div className="flex items-baseline justify-between gap-3">
          <h2 className="font-display font-black tracking-tight" style={{ color: cc, fontSize: 'clamp(1rem, 2vw, 1.4rem)' }}>
            {title}
          </h2>
          <span className="font-mono text-xxs" style={{ color: 'var(--ink-faint)' }}>
            {articles.length} {t.articles}
          </span>
        </div>
      </div>

      {/* Cards list */}
      <div className="flex-1 overflow-y-auto">
        {articles.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
            <div className="font-display text-4xl mb-3" style={{ color: 'var(--rule)' }}>§</div>
            <p className="font-body text-sm" style={{ color: 'var(--ink-muted)' }}>{t.empty}</p>
          </div>
        ) : (
          articles.map((a, i) => (
            <ArticleCard key={a.id} article={a} selected={selected?.id === a.id} lang={lang} onClick={() => onSelect(a)} index={i} />
          ))
        )}
      </div>
    </main>
  )
}
