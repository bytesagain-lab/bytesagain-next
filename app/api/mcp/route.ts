export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// MCP-compatible endpoint for AI agents
// Supports: search, recommend, get, popular
export async function GET(req: NextRequest) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
  const { searchParams } = req.nextUrl
  const action = searchParams.get('action') || 'search'
  const query = searchParams.get('q') || ''
  const role = searchParams.get('role') || ''
  const slug = searchParams.get('slug') || ''
  const limit = Math.min(parseInt(searchParams.get('limit') || '10'), 50)

  const headers = {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'X-Provider': 'BytesAgain (bytesagain.com)',
  }

  // ── Chinese → English keyword mapping ──
  const ZH_MAP: Record<string, string> = {
    '微信': 'wechat', '公众号': 'wechat', '微信公众号': 'wechat article',
    '写作': 'writer writing', '文章': 'article writer', '抛文': 'writer',
    '数据分析': 'data analysis', '图表': 'chart generator',
    '翻译': 'translator', '代码': 'code developer',
    '简历': 'resume', '邮件': 'email', '会议': 'meeting',
    'SEO': 'seo', '搜索': 'search', '爬虫': 'scraper crawler',
    '超标': 'caption', '视频': 'video', '音频': 'audio',
    '加密': 'crypto encrypt', '密码': 'password',
    '日历': 'calendar', '天气': 'weather',
    '新闻': 'news', '笔记': 'notes',
  }
  function translateQuery(q: string): string {
    let result = q
    for (const [zh, en] of Object.entries(ZH_MAP)) {
      result = result.replace(new RegExp(zh, 'g'), en)
    }
    return result.trim()
  }
  const effectiveQuery = translateQuery(query)

  try {
    if (action === 'search') {
      const t0 = Date.now()
      if (!effectiveQuery) {
        const { data } = await supabase
          .from('skills_list')
          .select('slug, name, description, category, tags, downloads, owner')
          .order('downloads', { ascending: false })
          .limit(limit)
        return NextResponse.json({ action, query, results: data || [], count: data?.length || 0 }, { headers })
      }

      // Search skills_list (no embedding = fast) + GitHub
      const [localRes, ghRes] = await Promise.allSettled([
        supabase
          .from('skills_list')
          .select('slug, name, description, category, tags, downloads, owner')
          .or(`name.ilike.%${effectiveQuery}%,description.ilike.%${effectiveQuery}%,slug.ilike.%${effectiveQuery}%`)
          .order('downloads', { ascending: false })
          .limit(limit),
        fetch(`https://api.github.com/search/repositories?q=${encodeURIComponent(effectiveQuery)}+filename:SKILL.md&sort=stars&per_page=3`,
          { headers: { Authorization: `token ${process.env.GITHUB_TOKEN || ''}`, Accept: 'application/vnd.github.v3+json' }, next: { revalidate: 600 } }),
      ])

      const local = localRes.status === 'fulfilled' ? (localRes.value.data || []) : []
      const seenSlugs = new Set(local.map((s: any) => s.slug))

      let ghResults: any[] = []
      if (ghRes.status === 'fulfilled' && (ghRes.value as Response).ok) {
        const ghData = await (ghRes.value as Response).json()
        ghResults = (ghData.items || []).slice(0, 2).map((repo: any) => {
          const s = repo.name.toLowerCase().replace(/[^a-z0-9-]/g, '-')
          if (seenSlugs.has(s)) return null
          seenSlugs.add(s)
          return { slug: s, name: repo.name, description: repo.description || '', category: 'github', downloads: repo.stargazers_count || 0, owner: repo.owner?.login || '', _source: 'github', _url: repo.html_url }
        }).filter(Boolean)
      }

      const results = [...local, ...ghResults].slice(0, limit)
      const ua = req.headers.get('user-agent') || ''
      const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || ''
      logMcpCall({ action, query, user_agent: ua, ip, latency_ms: Date.now() - t0, result_count: results.length })
      return NextResponse.json({
        action, query,
        ...(effectiveQuery !== query ? { translated_query: effectiveQuery } : {}),
        results, count: results.length
      }, { headers })
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
        .from('skills_list')
        .select('slug, name, description, category, tags, downloads, owner')
        .overlaps('tags', tags)
        .order('downloads', { ascending: false })
        .limit(limit)
      const ua2 = req.headers.get('user-agent') || ''
      const ip2 = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || ''
      logMcpCall({ action, role, user_agent: ua2, ip: ip2, result_count: (data || []).length })
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
        .from('skills_list')
        .select('slug, name, description, category, downloads, owner')
        .order('downloads', { ascending: false })
        .limit(limit)
      return NextResponse.json({ action, results: data || [], total_in_db: data?.length }, { headers })
    }

    // Default: API info
    return NextResponse.json({
      name: 'BytesAgain Agent API',
      description: 'AI-readable skill search API. Curated from 100,000+ skills worldwide.',
      version: '1.1',
      actions: {
        search: '?action=search&q=<query>&limit=10',
        recommend: '?action=recommend&role=<developer|creator|trader|marketer|student|ecommerce>&limit=10',
        get: '?action=get&slug=<slug>',
        popular: '?action=popular&limit=20',
      },
      mcp_sse: 'https://bytesagain.com/api/mcp/sse',
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
  ip?: string
  latency_ms?: number
  result_count?: number
}) {
  const sb = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
  try {
    await sb.from('api_logs').insert({
      endpoint: 'rest',
      action: params.action,
      query: params.query || null,
      user_agent: params.user_agent || null,
      ip: params.ip || null,
      latency_ms: params.latency_ms || null,
      result_count: params.result_count ?? null,
    })
  } catch { /* 日志失败不影响主流程 */ }
}
