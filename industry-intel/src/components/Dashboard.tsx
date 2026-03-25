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
  const [loading, setLoading] = useState(true)
  const [loadMsg, setLoadMsg] = useState('Loading intelligence feed')
  const [loadPct, setLoadPct] = useState(10)
  const [refreshing, setRefreshing] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<string | null>(null)
  const [selected, setSelected] = useState<Article | null>(null)
  const [lang, setLang] = useState<'en' | 'es'>('en')
  const [cat, setCat] = useState<Category | 'all'>('all')
  const [locations, setLocations] = useState<Location[]>([])
  const [srcType, setSrcType] = useState<SourceType | null>(null)
  const [source, setSource] = useState<string | null>(null)

  const fetchArticles = useCallback(async () => {
    const params = new URLSearchParams()
    if (cat !== 'all') params.set('category', cat)
    locations.forEach(l => params.append('location', l))
    if (srcType) params.set('sourceType', srcType)
    if (source) params.set('source', source)

    const res = await fetch(`/api/articles?${params}`)
    const data = await res.json()
    return (data.articles || []) as Article[]
  }, [cat, locations, srcType, source])

  // Initial load
  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setLoadMsg('Initializing intelligence feed')
    setLoadPct(20)

    const timer = setTimeout(async () => {
      setLoadMsg('Fetching trusted sources')
      setLoadPct(55)
      try {
        const arts = await fetchArticles()
        if (!cancelled) {
          setLoadPct(90)
          setLoadMsg('Rendering dashboard')
          setTimeout(() => {
            if (!cancelled) {
              setArticles(arts)
              setLastUpdated(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))
              setLoading(false)
            }
          }, 400)
        }
      } catch {
        if (!cancelled) setLoading(false)
      }
    }, 600)

    return () => { cancelled = true; clearTimeout(timer) }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Refetch when filters change (after initial load)
  useEffect(() => {
    if (loading) return
    fetchArticles().then(arts => {
      setArticles(arts)
      setSelected(null)
    })
  }, [cat, locations, srcType, source, fetchArticles, loading])

  const handleRefresh = async () => {
    setRefreshing(true)
    try {
      const arts = await fetchArticles()
      setArticles(arts)
      setLastUpdated(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))
      setSelected(null)
    } finally {
      setRefreshing(false)
    }
  }

  const handleLocation = (l: Location) => {
    setLocations(prev =>
      prev.includes(l) ? prev.filter(x => x !== l) : [...prev, l]
    )
  }

  const handleSrcType = (t: SourceType) => {
    setSrcType(prev => prev === t ? null : t)
  }

  const handleSrc = (s: string) => {
    setSource(prev => prev === s ? null : s)
  }

  const filtered = useMemo(() => articles, [articles])

  if (loading) {
    return <LoadingScreen message={loadMsg} progress={loadPct} />
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-bg text-ink font-sans">
      <Header
        lang={lang}
        onLangChange={setLang}
        onRefresh={handleRefresh}
        isRefreshing={refreshing}
        lastUpdated={lastUpdated}
      />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          articles={articles}
          filtered={filtered}
          cat={cat}
          locations={locations}
          srcType={srcType}
          source={source}
          lang={lang}
          onCat={setCat}
          onLocation={handleLocation}
          onSrcType={handleSrcType}
          onSrc={handleSrc}
        />
        <MainFeed
          articles={filtered}
          selected={selected}
          cat={cat}
          lang={lang}
          onSelect={setSelected}
        />
        <RightPanel
          selected={selected}
          filtered={filtered}
          lang={lang}
        />
      </div>
    </div>
  )
}
