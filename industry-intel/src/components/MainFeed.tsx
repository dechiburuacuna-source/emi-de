'use client'

import type { Article, Category } from '@/types/article'
import ArticleCard from './ArticleCard'

interface MainFeedProps {
  articles: Article[]
  selected: Article | null
  cat: Category | 'all'
  lang: 'en' | 'es'
  onSelect: (a: Article) => void
}

const TX = {
  en: {
    feed: 'Intelligence Feed',
    mining: 'Mining',
    energy: 'Energy',
    dc: 'Data Centers',
    articles: 'articles',
    empty: 'No articles match current filters',
  },
  es: {
    feed: 'Feed de Inteligencia',
    mining: 'Minería',
    energy: 'Energía',
    dc: 'Data Centers',
    articles: 'artículos',
    empty: 'No hay artículos con los filtros actuales',
  },
}

export default function MainFeed({ articles, selected, cat, lang, onSelect }: MainFeedProps) {
  const t = TX[lang]

  const title =
    cat === 'all' ? t.feed :
    cat === 'Mining' ? t.mining :
    cat === 'Energy' ? t.energy : t.dc

  return (
    <main className="flex-1 flex flex-col overflow-hidden bg-bg">
      {/* Feed header */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-border flex-shrink-0">
        <h2 className="font-condensed text-lg font-bold tracking-wide">{title}</h2>
        <span className="font-mono text-[10px] text-ink-3">
          {articles.length} {t.articles}
        </span>
      </div>

      {/* Cards */}
      <div className="flex-1 overflow-y-auto px-5 py-3.5 flex flex-col gap-2.5">
        {articles.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="text-3xl opacity-10 mb-3">◈</div>
            <p className="font-condensed text-sm text-ink-3">{t.empty}</p>
          </div>
        ) : (
          articles.map((a, i) => (
            <ArticleCard
              key={a.id}
              article={a}
              selected={selected?.id === a.id}
              lang={lang}
              onClick={() => onSelect(a)}
              index={i}
            />
          ))
        )}
      </div>
    </main>
  )
}
