import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get('q') || ''
  if (!q || q.length < 2) return NextResponse.json([])

  try {
    // 全文搜索（Postgres tsvector）+ fallback ilike
    const tsQuery = q.trim().split(/\s+/).join(' & ')

    const [ftsRes, ilikeRes, chRes] = await Promise.allSettled([
      // 1. 全文搜索（快，准）
      supabase
        .from('skills')
        .select('slug, name, description, category, downloads, stars, owner, source, source_url, tags')
        .textSearch('fts', tsQuery, { type: 'websearch', config: 'english' })
        .order('downloads', { ascending: false })
        .limit(6),

      // 2. ilike fallback（兜底，捕捉全文搜索漏掉的）
      supabase
        .from('skills')
        .select('slug, name, description, category, downloads, stars, owner, source, source_url, tags')
        .or(`name.ilike.%${q}%,description.ilike.%${q}%`)
        .order('downloads', { ascending: false })
        .limit(4),

      // 3. ClawHub语义搜索（补充没入库的新skill）
      fetch(`https://clawhub.ai/api/v1/search?q=${encodeURIComponent(q)}&limit=6`, {
        headers: { 'User-Agent': 'Mozilla/5.0' },
        next: { revalidate: 300 },
      }),
    ])

    const fts = ftsRes.status === 'fulfilled' ? (ftsRes.value.data || []) : []
    const ilike = ilikeRes.status === 'fulfilled' ? (ilikeRes.value.data || []) : []

    // 合并去重（全文优先）
    const seen = new Set<string>()
    const local: any[] = []
    for (const s of [...fts, ...ilike]) {
      if (!seen.has(s.slug)) {
        seen.add(s.slug)
        local.push({ ...s, _source: s.source || 'clawhub' })
      }
    }

    // ClawHub语义补充（本地没有的）
    let chExtra: any[] = []
    if (chRes.status === 'fulfilled' && (chRes.value as Response).ok) {
      const chData = await (chRes.value as Response).json()
      chExtra = (chData.results || [])
        .filter((s: any) => {
          const slug = `clawhub-${s.slug}`
          return !seen.has(slug) && !seen.has(s.slug)
        })
        .slice(0, 3)
        .map((s: any) => ({
          slug: `clawhub-${s.slug}`,
          name: s.displayName || s.slug,
          description: s.summary || '',
          category: '',
          downloads: 0,
          stars: 0,
          owner: s.ownerHandle || '',
          _source: 'clawhub',
        }))
    }

    const results = [...local, ...chExtra].slice(0, 10)
    return NextResponse.json(results)
  } catch {
    return NextResponse.json([])
  }
}
