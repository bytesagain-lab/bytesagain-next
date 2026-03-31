import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const GH_TOKEN = process.env.GITHUB_TOKEN || ''

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get('q') || ''
  if (!q || q.length < 2) return NextResponse.json([])

  try {
    // 并行查三个来源
    const [localRes, chRes, ghRes] = await Promise.allSettled([
      // 1. 本地Supabase DB
      supabase
        .from('skills')
        .select('slug, name, description, category, downloads, owner')
        .or(`name.ilike.%${q}%,description.ilike.%${q}%`)
        .order('downloads', { ascending: false })
        .limit(4),

      // 2. ClawHub语义搜索（4万个审核过的skill）
      fetch(`https://clawhub.ai/api/v1/search?q=${encodeURIComponent(q)}&limit=10`,
        { next: { revalidate: 300 } }),

      // 3. GitHub SKILL.md搜索（10万+开源skill）
      fetch(`https://api.github.com/search/repositories?q=${encodeURIComponent(q)}+filename:SKILL.md&sort=stars&per_page=5`,
        { headers: { Authorization: `token ${GH_TOKEN}`, Accept: 'application/vnd.github.v3+json' }, next: { revalidate: 600 } }),
    ])

    const local = localRes.status === 'fulfilled' ? (localRes.value.data || []) : []
    const seenSlugs = new Set(local.map((s: any) => s.slug))

    // ClawHub结果
    let clawResults: any[] = []
    if (chRes.status === 'fulfilled' && chRes.value.ok) {
      const chData = await chRes.value.json()
      clawResults = (chData.results || [])
        .filter((s: any) => !seenSlugs.has(s.slug))
        .slice(0, 3)
        .map((s: any) => {
          seenSlugs.add(s.slug)
          return { slug: s.slug, name: s.displayName || s.slug, description: s.summary || '', category: '', downloads: 0, owner: '', _source: 'clawhub' }
        })
    }

    // GitHub结果
    let ghResults: any[] = []
    if (ghRes.status === 'fulfilled' && ghRes.value.ok) {
      const ghData = await ghRes.value.json()
      ghResults = (ghData.items || [])
        .slice(0, 3)
        .map((repo: any) => {
          const slug = repo.name.toLowerCase().replace(/[^a-z0-9-]/g, '-')
          if (seenSlugs.has(slug)) return null
          seenSlugs.add(slug)
          return {
            slug,
            name: repo.name,
            description: repo.description || '',
            category: 'GitHub',
            downloads: repo.stargazers_count || 0,
            owner: repo.owner?.login || '',
            _source: 'github',
            _url: repo.html_url,
          }
        })
        .filter(Boolean)
    }

    const results = [...local, ...clawResults, ...ghResults].slice(0, 8)
    return NextResponse.json(results)
  } catch {
    return NextResponse.json([])
  }
}
