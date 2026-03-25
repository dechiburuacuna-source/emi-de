'use client'

import { useState } from 'react'

interface HeaderProps {
  lang: 'en' | 'es'
  onLangChange: (l: 'en' | 'es') => void
  onRefresh: () => void
  isRefreshing: boolean
  lastUpdated: string | null
}

const TX = {
  en: { updated: 'Updated', refresh: 'Refresh' },
  es: { updated: 'Actualizado', refresh: 'Actualizar' },
}

export default function Header({ lang, onLangChange, onRefresh, isRefreshing, lastUpdated }: HeaderProps) {
  const t = TX[lang]

  return (
    <header className="h-13 flex-shrink-0 bg-bg-2 border-b border-border flex items-center justify-between px-5"
      style={{ height: '52px' }}>
      {/* Left */}
      <div className="flex items-center gap-3.5">
        <div className="flex items-center gap-2">
          <div className="flex gap-0.5 items-center">
            <div className="w-2 h-2 rounded-sm bg-dc" />
            <div className="w-2 h-2 rounded-sm bg-mining" />
            <div className="w-2 h-2 rounded-sm bg-energy" />
            <div className="w-2 h-2 rounded-sm bg-institutional" />
          </div>
          <span className="font-condensed text-base font-extrabold tracking-widest uppercase text-ink">
            Industry <span className="text-dc">Intel</span>
          </span>
        </div>
        <div className="w-px h-5 bg-border" />
        <div className="flex items-center gap-1.5 font-mono text-[10px] text-ink-3">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-energy shadow-[0_0_6px_#1FBF6A] animate-pulse-dot" />
          {lastUpdated ? `${t.updated} ${lastUpdated}` : '—'}
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2.5">
        <button
          onClick={onRefresh}
          disabled={isRefreshing}
          className="flex items-center gap-1.5 px-2.5 py-1.5 bg-transparent border border-border rounded text-ink-2 font-mono text-[10px] hover:border-dc hover:text-dc transition-colors disabled:opacity-50"
        >
          <svg
            width="11" height="11" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5"
            className={isRefreshing ? 'animate-spin' : ''}
          >
            <path d="M23 4v6h-6M1 20v-6h6" />
            <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
          </svg>
          {t.refresh}
        </button>

        <div className="flex bg-bg border border-border rounded overflow-hidden">
          {(['en', 'es'] as const).map(l => (
            <button
              key={l}
              onClick={() => onLangChange(l)}
              className={`px-3 py-1 font-mono text-[10px] font-medium tracking-wide transition-colors ${
                lang === l ? 'bg-dc text-bg' : 'text-ink-3 hover:text-ink-2'
              }`}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    </header>
  )
}
