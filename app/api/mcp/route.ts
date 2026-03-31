import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// MCP-compatible endpoint for AI agents
// Supports: search, recommend, get, popular
export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const action = searchParams.get('action') || 'search'
  const query = searchParams.get('q') || ''
  const role = searchParams.get('role') || ''
  const slug = searchParams.get('slug') || ''
  const limit = Math.min(parseInt(searchParams.get('limit') || '10'), 50)

  const headers = {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'X-MCP-Version': '1.0',
    'X-Provider': 'BytesAgain (bytesagain.com)',
  }

  try {
    if (action === 'search') {
      if (!query) {
        // 空query返回热门
        const { data } = await supabase
          .from('skills')
          .select('slug, name, description, category, tags, downloads, owner')
          .order('downloads', { ascending: false })
          .limit(limit)
        return NextResponse.json({ action, query, results: data || [], count: data?.length || 0 }, { headers })
      }

      // 并行：本地精确匹配 + ClawHub语义搜索 + GitHub
      const [localRes, chRes, ghRes] = await Promise.allSettled([
        supabase
          .from('skills')
          .select('slug, name, description, category, tags, downloads, owner')
          .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
          .order('downloads', { ascending: false })
          .limit(Math.ceil(limit * 0.5)),
        fetch(`https://clawhub.ai/api/v1/search?q=${encodeURIComponent(query)}&limit=${limit}`,
          { next: { revalidate: 300 } }),
        fetch(`https://api.github.com/search/repositories?q=${encodeURIComponent(query)}+filename:SKILL.md&sort=stars&per_page=5`,
          { headers: { Authorization: `token ${process.env.GITHUB_TOKEN || ''}`, Accept: 'application/vnd.github.v3+json' }, next: { revalidate: 600 } }),
      ])

      const local = localRes.status === 'fulfilled' ? (localRes.value.data || []) : []
      const seenSlugs = new Set(local.map((s: any) => s.slug))

      let remote: any[] = []
      if (chRes.status === 'fulfilled' && chRes.value.ok) {
        const chData = await chRes.value.json()
        remote = (chData.results || [])
          .filter((s: any) => !seenSlugs.has(s.slug))
          .slice(0, 3)
          .map((s: any) => {
            seenSlugs.add(s.slug)
            return { slug: s.slug, name: s.displayName || s.slug, description: s.summary || '', category: '', downloads: 0, owner: '', _source: 'clawhub' }
          })
      }

      let ghResults: any[] = []
      if (ghRes.status === 'fulfilled' && ghRes.value.ok) {
        const ghData = await ghRes.value.json()
        ghResults = (ghData.items || []).slice(0, 2).map((repo: any) => {
          const slug = repo.name.toLowerCase().replace(/[^a-z0-9-]/g, '-')
          if (seenSlugs.has(slug)) return null
          seenSlugs.add(slug)
          return { slug, name: repo.name, description: repo.description || '', category: 'github', downloads: repo.stargazers_count || 0, owner: repo.owner?.login || '', _source: 'github', _url: repo.html_url }
        }).filter(Boolean)
      }

      const results = [...local, ...remote, ...ghResults].slice(0, limit)
      const ua = req.headers.get('user-agent') || ''
      logMcpCall({ action, query, user_agent: ua, result_count: results.length, results_slugs: results.map((s:any) => s.slug) })
      return NextResponse.json({ action, query, results, count: results.length }, { headers })
    }

    if (action === 'recommend') {
      const ROLE_TAGS: Record<string, string[]> = {
        developer: ['devtools', 'developer', 'api', 'sysops', 'frontend', 'general'],
        creator: ['writing', 'general', 'productivity'],
        trader: ['finance', 'blockchain', 'data', 'general'],
        marketer: ['seo', 'writing', 'productivity', 'general'],
        student: ['devtools', 'developer', 'productivity', 'general'],
        ecommerce: ['general', 'logistics', 'finance', 'productivity'],
        analyst: ['data', 'finance', 'general'],
      }
      const tags = ROLE_TAGS[role] || ROLE_TAGS['developer']
      const { data } = await supabase
        .from('skills')
        .select('slug, name, description, category, tags, downloads, owner')
        .overlaps('tags', tags)
        .order('downloads', { ascending: false })
        .limit(limit)
      const ua2 = req.headers.get('user-agent') || ''
      logMcpCall({ action, role, user_agent: ua2, result_count: (data||[]).length, results_slugs: (data||[]).map((s:any) => s.slug) })
      return NextResponse.json({
        action, role,
        results: data || [],
        install_hint: `clawhub install ${(data || []).slice(0, 3).map((s: any) => s.slug).join(' ')}`,
        browse_more: `https://bytesagain.com/use-case`,
      }, { headers })
    }

    if (action === 'get') {
      const { data } = await supabase
        .from('skills')
        .select('*')
        .eq('slug', slug)
        .single()
      if (!data) return NextResponse.json({ error: 'Skill not found', slug }, { status: 404, headers })
      return NextResponse.json({
        action, skill: data,
        install: `clawhub install ${slug}`,
        page: `https://bytesagain.com/skill/${slug}`,
      }, { headers })
    }

    if (action === 'popular') {
      const { data } = await supabase
        .from('skills')
        .select('slug, name, description, category, downloads, owner')
        .order('downloads', { ascending: false })
        .limit(limit)
      return NextResponse.json({ action, results: data || [], total_in_db: data?.length }, { headers })
    }

    // Default: API info
    return NextResponse.json({
      name: 'BytesAgain MCP API',
      description: 'AI-readable skill recommendation API. Curated from 100,000+ skills worldwide.',
      version: '1.0',
      actions: {
        search: '?action=search&q=<query>&limit=10',
        recommend: '?action=recommend&role=<developer|creator|trader|marketer|student|ecommerce>&limit=10',
        get: '?action=get&slug=<slug>',
        popular: '?action=popular&limit=20',
      },
      homepage: 'https://bytesagain.com',
      llms_txt: 'https://bytesagain.com/llms.txt',
    }, { headers })
  } catch (e) {
    return NextResponse.json({ error: 'Internal error' }, { status: 500, headers })
  }
}

// 异步写日志，不阻塞响应
async function logMcpCall(params: {
  action: string
  query?: string
  role?: string
  user_agent?: string
  result_count?: number
  results_slugs?: string[]
}) {
  try {
    await supabase.from('mcp_logs').insert({
      action: params.action,
      query: params.query || null,
      role: params.role || null,
      user_agent: params.user_agent || null,
      result_count: params.result_count || 0,
      results_slugs: params.results_slugs || [],
    })
  } catch { /* 日志失败不影响主流程 */ }
}
