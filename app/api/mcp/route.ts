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

  // Multi-language query translation (ZH/JA/KO/DE/FR/PT/ES -> English)
  // Longer phrases placed first to prevent partial replacement
  const LANG_MAP: [string, string][] = [
    ['微信公众号', 'wechat article'],
    ['数据分析', 'data analysis'],
    ['自动化脚本', 'automation workflow script'],
    ['自动化', 'automation workflow'],
    ['图表', 'chart generator'],
    ['爬虫', 'scraper crawler'],
    ['抖音', 'douyin tiktok video'],
    ['微信', 'wechat'],
    ['公众号', 'wechat'],
    ['写作', 'writing'],
    ['文章', 'article'],
    ['翻译', 'translator'],
    ['代码', 'code'],
    ['简历', 'resume'],
    ['邮件', 'email'],
    ['会议', 'meeting'],
    ['搜索', 'search'],
    ['视频', 'video'],
    ['音频', 'audio'],
    ['密码', 'password'],
    ['日历', 'calendar'],
    ['天气', 'weather'],
    ['新闻', 'news'],
    ['笔记', 'notes'],
    ['データ分析', 'data analysis'],
    ['自動化', 'automation workflow'],
    ['スクレイパー', 'scraper crawler'],
    ['ウェブスクレイピング', 'web scraping'],
    ['翻訳', 'translator'],
    ['コード', 'code developer'],
    ['履歴書', 'resume'],
    ['メール', 'email'],
    ['動画', 'video'],
    ['音声', 'audio'],
    ['パスワード', 'password'],
    ['カレンダー', 'calendar'],
    ['ニュース', 'news'],
    ['メモ', 'notes'],
    ['画像', 'image'],
    ['チャート', 'chart generator'],
    ['ブログ', 'blog writer'],
    ['SNS', 'social media'],
    ['데이터 분석', 'data analysis'],
    ['자동화', 'automation workflow'],
    ['웹 스크래핑', 'web scraping'],
    ['번역', 'translator'],
    ['코드', 'code developer'],
    ['이력서', 'resume'],
    ['이메일', 'email'],
    ['회의', 'meeting notes'],
    ['동영상', 'video'],
    ['오디오', 'audio'],
    ['비밀번호', 'password'],
    ['캘린더', 'calendar'],
    ['날씨', 'weather'],
    ['뉴스', 'news'],
    ['메모', 'notes'],
    ['이미지', 'image'],
    ['차트', 'chart generator'],
    ['블로그', 'blog writer'],
    ['소셜미디어', 'social media'],
    ['Datenanalyse', 'data analysis'],
    ['Automatisierung', 'automation workflow'],
    ['Webscraping', 'web scraping'],
    ['Übersetzung', 'translator'],
    ['Lebenslauf', 'resume'],
    ['Programmierung', 'code developer'],
    ['Passwort', 'password'],
    ['Kalender', 'calendar'],
    ['Wetter', 'weather'],
    ['Nachrichten', 'news'],
    ['Notizen', 'notes'],
    ['Diagramm', 'chart generator'],
    ['Sicherheit', 'security'],
    ['Bild', 'image'],
    ['Blog', 'blog writer'],
    ['analyse de données', 'data analysis'],
    ['automatisation', 'automation workflow'],
    ['extraction web', 'web scraping'],
    ['traduction', 'translator'],
    ['curriculum vitae', 'resume'],
    ['courrier électronique', 'email'],
    ['mot de passe', 'password'],
    ['programmation', 'code developer'],
    ['calendrier', 'calendar'],
    ['météo', 'weather'],
    ['actualités', 'news'],
    ['graphique', 'chart generator'],
    ['sécurité', 'security'],
    ['blog', 'blog writer'],
    ['análise de dados', 'data analysis'],
    ['automação', 'automation workflow'],
    ['raspagem web', 'web scraping'],
    ['tradução', 'translator'],
    ['currículo', 'resume'],
    ['programação', 'code developer'],
    ['senha', 'password'],
    ['calendário', 'calendar'],
    ['notícias', 'news'],
    ['gráfico', 'chart generator'],
    ['segurança', 'security'],
    ['blog', 'blog writer'],
    ['análisis de datos', 'data analysis'],
    ['automatización', 'automation workflow'],
    ['extracción web', 'web scraping'],
    ['traducción', 'translator'],
    ['currículum', 'resume'],
    ['programación', 'code developer'],
    ['contraseña', 'password'],
    ['calendario', 'calendar'],
    ['noticias', 'news'],
    ['seguridad', 'security'],
    ['imagen', 'image'],
  ]
  function translateQuery(q: string): string {
    let r = q
    for (const [src, en] of LANG_MAP) r = r.replace(new RegExp(src, 'gi'), ' ' + en + ' ')
    return r.replace(/  +/g, ' ').trim()
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

      // Hybrid search: full-text first (ts_rank), ilike fallback
      const { data: ftsData } = await supabase.rpc('fts_search_skills', { query_text: effectiveQuery, match_count: limit * 2 })
      const seen = new Map<string, any>()
      for (const row of ftsData || []) seen.set(row.slug, { ...row, _score: row.fts_rank || 0 })
      if (seen.size < limit) {
        const STOPWORDS = new Set(['tool','tools','generator','maker','builder','helper','assistant','app','bot','ai','for','the','and','or','with'])
        const tokens = [...new Set(effectiveQuery.split(/\s+/).filter((t: string) => t.length > 1 && !STOPWORDS.has(t.toLowerCase())))]
        for (const token of tokens.slice(0, 3)) {
          const { data } = await supabase.from('skills_list')
            .select('slug, name, description, category, tags, downloads, owner')
            .or(`name.ilike.%${token}%,description.ilike.%${token}%,slug.ilike.%${token}%`)
            .order('downloads', { ascending: false }).limit(limit)
          for (const row of data || []) { if (!seen.has(row.slug)) seen.set(row.slug, { ...row, _score: 0 }) }
        }
      }
      const local = [...seen.values()]
        .sort((a: any, b: any) => (b._score||0)-(a._score||0)||(b.downloads||0)-(a.downloads||0))
        .slice(0, limit)

      const [ghRes] = await Promise.allSettled([
        fetch(`https://api.github.com/search/repositories?q=${encodeURIComponent(effectiveQuery)}+filename:SKILL.md&sort=stars&per_page=3`,
          { headers: { Authorization: `token ${process.env.GITHUB_TOKEN || ''}`, Accept: 'application/vnd.github.v3+json' }, next: { revalidate: 600 } }),
      ])

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

// ── POST: Streamable HTTP MCP (for Glama / MCP Inspector compatibility) ──────
export async function POST(req: NextRequest) {
  const headers = {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  }

  let body: any
  try { body = await req.json() } catch {
    return NextResponse.json({ jsonrpc: '2.0', id: null, error: { code: -32700, message: 'Parse error' } }, { headers })
  }

  const { id, method, params } = body

  if (method === 'initialize') {
    return NextResponse.json({
      jsonrpc: '2.0', id,
      result: {
        protocolVersion: '2024-11-05',
        capabilities: { tools: {} },
        serverInfo: { name: 'BytesAgain', version: '1.1.0' }
      }
    }, { headers })
  }

  if (method === 'tools/list') {
    return NextResponse.json({
      jsonrpc: '2.0', id,
      result: { tools: [
        { name: 'search_skills',
          description: 'Search 60,000+ AI agent skills by keyword or natural language query. Supports 7 languages (EN/ZH/JA/KO/DE/FR/ES). Returns skills with slug, name, description, category, downloads, stars. Results ranked by relevance then popularity. Use when user wants to find skills for a specific task. Example: "email automation" or "邮件自动化".',
          inputSchema: { type: 'object', properties: {
            query: { type: 'string', description: 'Search keyword in any supported language. Example: "data analysis" or "数据分析".' },
            limit: { type: 'number', description: 'Number of results. Default: 10. Max: 50.' }
          }, required: [] } },
        { name: 'get_skill',
          description: 'Fetch complete details for a single skill by its unique slug. Returns full metadata: name, description, category, tags, version, author, downloads, stars, source URL, and install instructions. Use after search_skills to get more info about a specific skill. Returns error if slug not found.',
          inputSchema: { type: 'object', properties: {
            slug: { type: 'string', description: 'Unique skill slug from search results. Example: "chart-generator" or "email-automation".' }
          }, required: ['slug'] } },
        { name: 'popular_skills',
          description: 'Get the most popular AI agent skills ranked by download count. Returns top skills with slug, name, description, category, downloads, stars. Use when user wants to discover trending skills without a specific topic. Ideal for onboarding. Default returns top 20.',
          inputSchema: { type: 'object', properties: {
            limit: { type: 'number', description: 'Number of top skills to return. Default: 20. Max: 50.' }
          }, required: [] } },
      ]}
    }, { headers })
  }

  if (method === 'tools/call') {
    const name = params?.name
    const args = params?.arguments ?? params?.input ?? {}
    const baseUrl = `${req.nextUrl.protocol}//${req.nextUrl.host}`

    try {
      let apiUrl = ''
      if (name === 'search_skills') {
        const q = encodeURIComponent(args.query || args.q || args.keyword || '')
        const limit = args.limit || 10
        apiUrl = `${baseUrl}/api/mcp?action=search&q=${q}&limit=${limit}`
      } else if (name === 'get_skill') {
        apiUrl = `${baseUrl}/api/mcp?action=get&slug=${encodeURIComponent(args.slug || '')}`
      } else if (name === 'popular_skills') {
        apiUrl = `${baseUrl}/api/mcp?action=popular&limit=${args.limit || 20}`
      } else {
        return NextResponse.json({ jsonrpc: '2.0', id, error: { code: -32601, message: `Unknown tool: ${name}` } }, { headers })
      }

      const res = await fetch(apiUrl)
      const data = await res.json()
      return NextResponse.json({
        jsonrpc: '2.0', id,
        result: { content: [{ type: 'text', text: JSON.stringify(data) }] }
      }, { headers })
    } catch (e: any) {
      return NextResponse.json({ jsonrpc: '2.0', id, error: { code: -32603, message: e.message } }, { headers })
    }
  }

  return NextResponse.json({ jsonrpc: '2.0', id, error: { code: -32601, message: `Method not found: ${method}` } }, { headers })
}

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  }})
}
