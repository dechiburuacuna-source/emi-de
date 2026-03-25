'use client'
import { useState, useEffect, useCallback, useMemo } from 'react'
import type { Article, Category, Location, SourceType } from '@/types/article'
import Header from './Header'
import Sidebar from './Sidebar'
import MainFeed from './MainFeed'
import RightPanel from './RightPanel'
import LoadingScreen from './LoadingScreen'

export default function Dashboard() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading]   = useState(true)
  const [loadMsg, setLoadMsg]   = useState('Loading intelligence feed')
  const [loadPct, setLoadPct]   = useState(10)
  const [refreshing, setRefreshing] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<string | null>(null)
  const [selected, setSelected] = useState<Article | null>(null)
  const [lang, setLang]         = useState<'en' | 'es'>('en')
  const [cat, setCat]           = useState<Category | 'all'>('all')
  const [locations, setLocations] = useState<Location[]>([])
  const [srcType, setSrcType]   = useState<SourceType | null>(null)
  const [source, setSource]     = useState<string | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const fetchArticles = useCallback(async () => {
    const params = new URLSearchParams()
    if (cat !== 'all') params.set('category', cat)
    locations.forEach(l => params.append('location', l))
    if (srcType) params.set('sourceType', srcType)
    if (source)  params.set('source', source)
    const res  = await fetch(`/api/articles?${params}`)
    const data = await res.json()
    return (data.articles || []) as Article[]
  }, [cat, locations, srcType, source])

  useEffect(() => {
    let cancelled = false
    setLoading(true); setLoadMsg('Loading intelligence feed'); setLoadPct(20)
    const timer = setTimeout(async () => {
      setLoadMsg('Connecting trusted sources'); setLoadPct(55)
      try {
        const arts = await fetchArticles()
        if (!cancelled) {
          setLoadPct(90); setLoadMsg('Composing front page')
          setTimeout(() => {
            if (!cancelled) {
              setArticles(arts)
              setLastUpdated(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))
              setLoading(false)
            }
          }, 350)
        }
      } catch { if (!cancelled) setLoading(false) }
    }, 500)
    return () => { cancelled = true; clearTimeout(timer) }
  }, []) // eslint-disable-line

  useEffect(() => {
    if (loading) return
    fetchArticles().then(arts => { setArticles(arts); setSelected(null) })
  }, [cat, locations, srcType, source]) // eslint-disable-line

  const handleRefresh = async () => {
    setRefreshing(true)
    try {
      const arts = await fetchArticles()
      setArticles(arts)
      setLastUpdated(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))
      setSelected(null)
    } finally { setRefreshing(false) }
  }

  const handleLocation = (l: Location) =>
    setLocations(prev => prev.includes(l) ? prev.filter(x => x !== l) : [...prev, l])
  const handleSrcType  = (t: SourceType) => setSrcType(prev => prev === t ? null : t)
  const handleSrc      = (s: string)     => setSource(prev => prev === s ? null : s)

  if (loading) return <LoadingScreen message={loadMsg} progress={loadPct} />

  return (
    <div className="flex flex-col h-screen overflow-hidden" style={{ background: 'var(--paper)' }}>
      <Header lang={lang} onLangChange={setLang} onRefresh={handleRefresh} isRefreshing={refreshing} lastUpdated={lastUpdated} />

      {/* Mobile filter toggle */}
      <div className="md:hidden flex items-center gap-3 px-4 py-2 border-b" style={{ borderColor: 'var(--rule)', background: 'var(--paper-2)' }}>
        <button onClick={() => setSidebarOpen(!sidebarOpen)}
          className="font-sans text-xs font-medium px-3 py-1 rounded border"
          style={{ borderColor: 'var(--rule-dark)', color: 'var(--ink-dark)' }}>
          {sidebarOpen ? '✕ Close' : '☰ Filters'}
        </button>
        <div className="flex gap-2 flex-wrap flex-1">
          {(['all', 'Mining', 'Energy', 'Data Centers'] as const).map(c => (
            <button key={c} onClick={() => setCat(c)}
              className="font-sans text-xxs px-2 py-1 rounded border transition-all"
              style={{
                borderColor: cat === c ? 'var(--ink-dark)' : 'var(--rule)',
                background: cat === c ? 'var(--ink-black)' : 'transparent',
                color: cat === c ? 'white' : 'var(--ink-muted)',
              }}>
              {c === 'all' ? (lang === 'es' ? 'Todas' : 'All') : c === 'Mining' ? (lang === 'es' ? 'Minería' : 'Mining') : c === 'Energy' ? (lang === 'es' ? 'Energía' : 'Energy') : 'DC'}
            </button>
          ))}
        </div>
      </div>

      {/* Main layout */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Sidebar — hidden on mobile unless open */}
        <div className={`${sidebarOpen ? 'flex' : 'hidden'} md:flex flex-col absolute md:relative z-20 h-full`}
          style={{ background: 'var(--paper-2)' }}>
          <Sidebar
            articles={articles} filtered={articles} cat={cat}
            locations={locations} srcType={srcType} source={source} lang={lang}
            onCat={c => { setCat(c); setSidebarOpen(false) }}
            onLocation={handleLocation} onSrcType={handleSrcType} onSrc={handleSrc}
          />
        </div>

        {/* Center feed */}
        <MainFeed articles={articles} selected={selected} cat={cat} lang={lang} onSelect={setSelected} />

        {/* Right panel — hidden on small screens */}
        <div className="hidden lg:flex">
          <RightPanel selected={selected} filtered={articles} lang={lang} />
        </div>
      </div>

      {/* Mobile: selected article drawer */}
      {selected && (
        <div className="lg:hidden fixed bottom-0 inset-x-0 z-30 max-h-64 overflow-y-auto border-t shadow-xl"
          style={{ background: 'var(--paper-2)', borderColor: 'var(--rule)' }}>
          <div className="flex items-center justify-between px-4 py-2 sticky top-0" style={{ background: 'var(--paper-3)', borderBottom: '1px solid var(--rule)' }}>
            <span className="font-sans text-xxs font-semibold uppercase tracking-wide" style={{ color: 'var(--ink-muted)' }}>
              {lang === 'es' ? 'Puntos Clave' : 'Key Insights'}
            </span>
            <button onClick={() => setSelected(null)} className="font-sans text-xs" style={{ color: 'var(--ink-muted)' }}>✕</button>
          </div>
          <div className="px-4 py-3">
            <ul className="space-y-2 mb-3">
              {(lang === 'es' && selected.short_summary_es?.length ? selected.short_summary_es : selected.short_summary).map((b, i) => (
                <li key={i} className="flex gap-2">
                  <span className="flex-shrink-0" style={{ color: 'var(--accent-red)' }}>◆</span>
                  <span className="font-body text-xs leading-snug" style={{ color: 'var(--ink-body)' }}>{b}</span>
                </li>
              ))}
            </ul>
            <a href={selected.url} target="_blank" rel="noopener noreferrer"
              className="font-sans text-xxs font-semibold underline" style={{ color: 'var(--accent-red)' }}>
              {lang === 'es' ? 'Leer artículo completo →' : 'Read full article →'}
            </a>
          </div>
        </div>
      )}
    </div>
  )
}
