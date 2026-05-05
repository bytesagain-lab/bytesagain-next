const SB_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://jfpeycpiyayrpjldppzq.supabase.co'
const SB_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

async function sbFetch(path: string) {
  const res = await fetch(`${SB_URL}/rest/v1/${path}`, {
    headers: { apikey: SB_KEY },
    next: { revalidate: 3600 }, // 1h cache to reduce Supabase IO
  })
  if (!res.ok) return []
  return res.json()
}

export interface Skill {
  slug: string
  name: string
  title: string  // alias for name
  description: string
  category: string
  downloads: number
  version: string
  owner: string
  is_ours?: boolean
  tags?: string[]
  source?: string
  evaluation?: SkillEvaluationData
}

export interface SkillEvaluationData {
  safety_score: number
  risk_level: string
  summary: string
  verified_capabilities: string[]
  strengths: string[]
  weaknesses: string[]
  risks: string[]
  quality_grade: string
  recommendation: string
}

export async function getSkillEvaluation(slug: string): Promise<SkillEvaluationData | null> {
  try {
    const res = await fetch(`${SB_URL}/rest/v1/skill_evaluations?slug=eq.${encodeURIComponent(slug)}&select=evaluation&limit=1`, {
      headers: { apikey: SB_KEY },
      next: { revalidate: 60 }, // 1min cache so ISR picks up new data quickly
    })
    if (!res.ok) return null
    const data = await res.json()
    if (data?.[0]?.evaluation) return data[0].evaluation as SkillEvaluationData
  } catch {
    // Table might not exist yet
  }
  return null
}

export interface Article {
  id: number
  title: string
  slug: string
  content: string
  category: string
  author_name: string
  published_at: string
  updated_at?: string
  reviewed_at?: string
  tags?: string[]
  post_type: string
}

export async function getSkills(limit = 50, category?: string): Promise<Skill[]> {
  let q = `skills?select=slug,name,description,category,downloads,version,owner&order=downloads.desc&limit=${limit}`
  if (category) q += `&category=eq.${encodeURIComponent(category)}`
  const data = await sbFetch(q)
  return data.map((d: any) => ({ ...d, title: d.name }))
}

export async function getSkill(slug: string): Promise<Skill | null> {
  const data = await sbFetch(`skills?slug=eq.${slug}&select=*&limit=1`)
  if (!data[0]) return null
  // Skip banned skills entirely
  if (data[0].source === 'banned') return null
  return { ...data[0], title: data[0].name }
}

export async function getArticles(limit = 20): Promise<Article[]> {
  return sbFetch(`posts?select=id,title,slug,category,author_name,published_at,updated_at,reviewed_at&status=eq.published&order=published_at.desc&limit=${limit}`)
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
