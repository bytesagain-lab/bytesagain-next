const SB_URL = 'https://jfpeycpiyayrpjldppzq.supabase.co'
const SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpmcGV5Y3BpeWF5cnBqbGRwcHpxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQyMzgxMTIsImV4cCI6MjA4OTgxNDExMn0.KnRmNBKeUPmJQz3m46uNx5kvBf_ZXBVWSUTXOLjW4Ps'

async function sbFetch(path: string) {
  const res = await fetch(`${SB_URL}/rest/v1/${path}`, {
    headers: { apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}` },
    next: { revalidate: 300 }, // 5min cache
  })
  if (!res.ok) return []
  return res.json()
}

export interface Skill {
  slug: string
  title: string
  description: string
  category: string
  downloads: number
  version: string
  owner: string
}

export interface Article {
  id: number
  title: string
  slug: string
  content: string
  category: string
  author_name: string
  published_at: string
  post_type: string
}

export async function getSkills(limit = 50, category?: string): Promise<Skill[]> {
  let q = `skills?select=slug,title,description,category,downloads,version,owner&order=downloads.desc&limit=${limit}`
  if (category) q += `&category=eq.${encodeURIComponent(category)}`
  return sbFetch(q)
}

export async function getSkill(slug: string): Promise<Skill | null> {
  const data = await sbFetch(`skills?slug=eq.${slug}&select=*&limit=1`)
  return data[0] ?? null
}

export async function getArticles(limit = 20): Promise<Article[]> {
  return sbFetch(`posts?select=id,title,slug,category,author_name,published_at&status=eq.published&order=published_at.desc&limit=${limit}`)
}

export async function getArticle(slug: string): Promise<Article | null> {
  const data = await sbFetch(`posts?slug=eq.${slug}&status=eq.published&select=*&limit=1`)
  return data[0] ?? null
}

export async function getCategories(): Promise<string[]> {
  const data = await sbFetch(`skills?select=category`)
  const cats = [...new Set(data.map((d: any) => d.category).filter(Boolean))] as string[]
  return cats.sort()
}
