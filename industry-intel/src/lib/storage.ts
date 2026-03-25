import { promises as fs } from 'fs'
import path from 'path'
import { randomUUID } from 'crypto'
import type { Article, ArticleFilters } from '@/types/article'
import { getSupabaseClient, isSupabaseConfigured } from './supabase'

// ─────────────────────────────────────────────────────────────
// JSON file storage (local dev fallback)
// ─────────────────────────────────────────────────────────────

const DATA_FILE = path.join(process.cwd(), 'data', 'articles.json')

async function readJSON(): Promise<Article[]> {
  try {
    const raw = await fs.readFile(DATA_FILE, 'utf8')
    return JSON.parse(raw)
  } catch {
    return []
  }
}

async function writeJSON(articles: Article[]): Promise<void> {
  await fs.mkdir(path.dirname(DATA_FILE), { recursive: true })
  await fs.writeFile(DATA_FILE, JSON.stringify(articles, null, 2))
}

// ─────────────────────────────────────────────────────────────
// Public API
// ─────────────────────────────────────────────────────────────

export async function getArticles(filters?: ArticleFilters): Promise<Article[]> {
  if (isSupabaseConfigured()) {
    return getArticlesSupabase(filters)
  }
  return getArticlesJSON(filters)
}

export async function upsertArticle(article: Article): Promise<void> {
  if (isSupabaseConfigured()) {
    return upsertArticleSupabase(article)
  }
  return upsertArticleJSON(article)
}

export async function articleExistsByUrl(url: string): Promise<boolean> {
  if (isSupabaseConfigured()) {
    const sb = getSupabaseClient()
    const { data } = await sb
      .from('articles')
      .select('id')
      .eq('url', url)
      .maybeSingle()
    return !!data
  }
  const all = await readJSON()
  return all.some(a => a.url === url)
}

export async function getArticleCount(): Promise<number> {
  if (isSupabaseConfigured()) {
    const sb = getSupabaseClient()
    const { count } = await sb.from('articles').select('id', { count: 'exact', head: true })
    return count || 0
  }
  const all = await readJSON()
  return all.length
}

export function makeId(): string {
  return randomUUID()
}

// ─────────────────────────────────────────────────────────────
// Supabase implementations
// ─────────────────────────────────────────────────────────────

async function getArticlesSupabase(filters?: ArticleFilters): Promise<Article[]> {
  const sb = getSupabaseClient()
  let query = sb
    .from('articles')
    .select('*')
    .eq('processed', true)
    .order('date', { ascending: false })
    .limit(200)

  if (filters?.category && filters.category !== 'all') {
    query = query.eq('category', filters.category)
  }
  if (filters?.locations?.length) {
    query = query.in('location', filters.locations)
  }
  if (filters?.sourceType) {
    query = query.eq('source_type', filters.sourceType)
  }
  if (filters?.source) {
    query = query.eq('source', filters.source)
  }

  const { data, error } = await query
  if (error) throw error
  return (data || []) as Article[]
}

async function upsertArticleSupabase(article: Article): Promise<void> {
  const sb = getSupabaseClient()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error } = await sb
    .from('articles')
    .upsert(article as any, { onConflict: 'url' })
  if (error) throw error
}

// ─────────────────────────────────────────────────────────────
// JSON file implementations
// ─────────────────────────────────────────────────────────────

function applyFilters(articles: Article[], filters?: ArticleFilters): Article[] {
  return articles.filter(a => {
    if (!a.processed) return false
    if (filters?.category && filters.category !== 'all' && a.category !== filters.category) return false
    if (filters?.locations?.length && !filters.locations.includes(a.location)) return false
    if (filters?.sourceType && a.source_type !== filters.sourceType) return false
    if (filters?.source && a.source !== filters.source) return false
    return true
  })
}

async function getArticlesJSON(filters?: ArticleFilters): Promise<Article[]> {
  const all = await readJSON()
  return applyFilters(all, filters).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  ).slice(0, 200)
}

async function upsertArticleJSON(article: Article): Promise<void> {
  const all = await readJSON()
  const idx = all.findIndex(a => a.url === article.url)
  if (idx >= 0) {
    all[idx] = article
  } else {
    all.unshift(article)
  }
  // Keep max 500 articles
  await writeJSON(all.slice(0, 500))
}
