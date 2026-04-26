const SB_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://jfpeycpiyayrpjldppzq.supabase.co'
const SB_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const SITEMAP_PAGE_SIZE = 50_000

async function fetchCount(path: string): Promise<number> {
  if (!SB_KEY) return 0
  try {
    const res = await fetch(`${SB_URL}/rest/v1/${path}`, {
      method: 'HEAD',
      headers: {
        apikey: SB_KEY,
        Authorization: `Bearer ${SB_KEY}`,
        Prefer: 'count=exact',
      },
      next: { revalidate: 3600 },
    })
    const range = res.headers.get('content-range') || ''
    const match = range.match(/\/(\d+)$/)
    return match ? Number(match[1]) : 0
  } catch {
    return 0
  }
}

export async function getSkillsSitemapShardCount() {
  const count = await fetchCount('skills_list?select=slug')
  return Math.max(1, Math.ceil(count / SITEMAP_PAGE_SIZE))
}

export async function getGithubSkillsSitemapShardCount() {
  const count = await fetchCount('github_skill_index?select=id')
  return Math.max(1, Math.ceil(count / SITEMAP_PAGE_SIZE))
}

export async function getArticleSitemapShardCount() {
  const count = await fetchCount('posts?select=slug&status=eq.published')
  return Math.max(1, Math.ceil(count / SITEMAP_PAGE_SIZE))
}

export async function getUseCaseSitemapShardCount() {
  const count = await fetchCount('use_cases?select=slug')
  return Math.max(1, Math.ceil(count / SITEMAP_PAGE_SIZE))
}
