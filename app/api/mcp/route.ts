export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import toolsConfig from './tools-config.json'

// ── Security: input sanitization & rate limiting ──────────────────────────
// Whitelists driven by tools-config.json (managed via mcp-manager skill)
const ALLOWED_METHODS = new Set(toolsConfig.allowed_methods)
const ALLOWED_TOOLS = new Set(
  toolsConfig.allowed_tools.filter(t => t.status === 'active').map(t => t.name)
)

// Strip characters that could be used in prompt injection or SQL injection.
// Keeps letters, numbers, spaces, common punctuation — removes control chars,
// angle brackets, backticks, and common prompt-injection openers.
function sanitize(raw: string, maxLen = 200): string {
  if (typeof raw !== 'string') return ''
  return raw
    .slice(0, maxLen)                        // hard length cap
    .replace(/[\x00-\x1f\x7f]/g, ' ')        // control characters → space
    .replace(/[<>`;{}\[\]\\]/g, '')           // remove injection-prone chars
    .replace(/ignore\s+(previous|above|all|prior)/gi, '') // prompt injection phrases
    .replace(/system\s*prompt/gi, '')         // prompt injection phrases
    .replace(/\[\[.*?\]\]/g, '')              // [[instruction]] patterns
    .replace(/  +/g, ' ')                    // collapse spaces
    .trim()
}

// Slug validation: only lowercase alphanum + hyphen, max 80 chars
function sanitizeSlug(raw: string): string {
  return raw.replace(/[^a-z0-9-]/gi, '').slice(0, 80).toLowerCase()
}

// Simple in-memory rate limiter: max 60 req / 60s per IP
const RL_MAP = new Map<string, { count: number; reset: number }>()
function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = RL_MAP.get(ip)
  if (!entry || now > entry.reset) {
    RL_MAP.set(ip, { count: 1, reset: now + 60_000 })
    return true
  }
  entry.count++
  if (entry.count > 60) return false
  return true
}
// Cleanup old entries every 5 minutes to avoid memory leak
setInterval(() => {
  const now = Date.now()
  for (const [k, v] of RL_MAP) if (now > v.reset) RL_MAP.delete(k)
}, 300_000)
// ─────────────────────────────────────────────────────────────────────────

// MCP-compatible endpoint for AI agents
// Supports: search, recommend, get, popular
export async function GET(req: NextRequest) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
  const { searchParams } = req.nextUrl
  const action = searchParams.get('action') || 'search'
  const query = sanitize(searchParams.get('q') || '')
  const role = sanitize(searchParams.get('role') || '', 50)
  const slug = sanitizeSlug(searchParams.get('slug') || '')
  const limit = Math.min(parseInt(searchParams.get('limit') || '10'), 50)

  const headers = {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'X-Provider': 'BytesAgain (bytesagain.com)',
  }

  // Rate limit check
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown'
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: 'Rate limit exceeded. Max 60 requests/minute.' }, { status: 429, headers })
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

    if (action === 'use_cases') {
      const ucLimit = Math.min(limit, 30)
      let results: any[] = []
      if (query) {
        // 关键词匹配（title ilike）
        const tokens = query.split(/\s+/).filter((t: string) => t.length > 1).slice(0, 3)
        const orClause = tokens.map((t: string) => `title.ilike.%${t}%`).join(',')
        const { data } = await supabase
          .from('use_cases')
          .select('slug, title, description')
          .or(orClause)
          .limit(ucLimit)
        results = (data || []).map((uc: any) => ({
          ...uc,
          url: `https://bytesagain.com/use-case/${uc.slug}`,
        }))
      } else {
        const { data } = await supabase
          .from('use_cases')
          .select('slug, title, description')
          .limit(ucLimit)
        results = (data || []).map((uc: any) => ({
          ...uc,
          url: `https://bytesagain.com/use-case/${uc.slug}`,
        }))
      }
      return NextResponse.json({ action, query, results, count: results.length,
        hint: 'Use search_skills with the use-case title to find matching AI skills.'
      }, { headers })
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
  query?: string | null
  role?: string
  user_agent?: string
  ip?: string
  latency_ms?: number
  result_count?: number | null
  endpoint?: string
}) {
  const sb = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
  try {
    await sb.from('api_logs').insert({
      endpoint: params.endpoint || 'rest',
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

  // Rate limit check
  const postIp = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown'
  if (!checkRateLimit(postIp)) {
    return NextResponse.json({ jsonrpc: '2.0', id: body?.id ?? null, error: { code: -32000, message: 'Rate limit exceeded. Max 60 requests/minute.' } }, { status: 429, headers })
  }

  const { id, method, params } = body

  // Method whitelist
  if (!method || !ALLOWED_METHODS.has(method)) {
    return NextResponse.json({ jsonrpc: '2.0', id: id ?? null, error: { code: -32601, message: `Method not found: ${String(method).slice(0,50)}` } }, { status: 404, headers })
  }

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
          description: 'Fetch complete details for a single skill by its exact slug identifier. Returns full metadata including: name, description, category, tags array, version (semver), author/owner, download count, star count, source repository URL, homepage URL, and clawhub install command. Use this tool AFTER search_skills when the user wants to inspect a specific skill in depth — do NOT call this for every result in a list, only when the user selects one. Returns a structured error with message "Skill not found" if the slug does not exist; in that case, suggest calling search_skills with a related keyword instead. Do not guess slugs — always use slugs returned from search_skills or popular_skills.',
          inputSchema: { type: 'object', properties: {
            slug: { type: 'string', description: 'Exact skill slug as returned by search_skills or popular_skills. Slugs are lowercase hyphenated strings. Example: "chart-generator", "email-automation", "python-cookbook". Do not modify or guess slugs.' }
          }, required: ['slug'] } },
        { name: 'popular_skills',
          description: 'Get the most-downloaded AI agent skills on BytesAgain, ranked by total download count descending. Returns each skill with: slug, name, description, category, download count, star count. Use this tool when: (1) user wants to discover trending or popular skills without a specific topic, (2) user asks "what are the best AI skills", (3) during onboarding to show what is available. Do NOT use this when the user has a specific task in mind — use search_skills instead. Results are global across all categories. Combine with get_skill to fetch full details on any result.',
          inputSchema: { type: 'object', properties: {
            limit: { type: 'number', description: 'How many top skills to return. Default: 20. Max: 50. Use 5-10 for quick recommendations, 20-50 for browsing.' }
          }, required: [] } },
        { name: 'search_use_cases',
          description: 'Search 1,000+ AI agent use-cases by task or goal description. Use-cases describe real-world workflows like "write a weekly report", "automate email replies", or "analyze sales data". Each use-case links to a dedicated page listing the best AI skills for that task. Use this tool when: (1) user describes a goal or workflow rather than a tool name, (2) user asks "how do I use AI for X", (3) you want to show what tasks AI can help with. Returns use-case slug, title, description, and page URL. Combine with search_skills to find specific tools for each use-case.',
          inputSchema: { type: 'object', properties: {
            query: { type: 'string', description: 'Task or goal in natural language. Example: "write job descriptions", "automate social media", "analyze financial data".' },
            limit: { type: 'number', description: 'Number of use-cases to return. Default: 10. Max: 30.' }
          }, required: ['query'] } },
      ]}
    }, { headers })
  }

  if (method === 'tools/call') {
    const name = params?.name
    // Tool name whitelist
    if (!name || !ALLOWED_TOOLS.has(name)) {
      return NextResponse.json({ jsonrpc: '2.0', id, error: { code: -32601, message: `Unknown tool: ${String(name).slice(0,50)}` } }, { status: 404, headers })
    }
    const args = params?.arguments ?? params?.input ?? {}
    const baseUrl = `${req.nextUrl.protocol}//${req.nextUrl.host}`

    try {
      let apiUrl = ''
      if (name === 'search_skills') {
        const q = encodeURIComponent(sanitize(args.query || args.q || args.keyword || ''))
        const limit = Math.min(parseInt(args.limit) || 10, 50)
        apiUrl = `${baseUrl}/api/mcp?action=search&q=${q}&limit=${limit}`
      } else if (name === 'get_skill') {
        apiUrl = `${baseUrl}/api/mcp?action=get&slug=${encodeURIComponent(sanitizeSlug(args.slug || ''))}`
      } else if (name === 'popular_skills') {
        const limit = Math.min(parseInt(args.limit) || 20, 50)
        apiUrl = `${baseUrl}/api/mcp?action=popular&limit=${limit}`
      } else if (name === 'search_use_cases') {
        const q = encodeURIComponent(sanitize(args.query || ''))
        const limit = Math.min(parseInt(args.limit) || 10, 30)
        apiUrl = `${baseUrl}/api/mcp?action=use_cases&q=${q}&limit=${limit}`
      } else {
      }

      const res = await fetch(apiUrl)
      const data = await res.json()

      // 记录 MCP POST 调用日志
      const ua3 = req.headers.get('user-agent') || ''
      const ip3 = req.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
                  req.headers.get('x-real-ip') || ''
      const toolQuery = args.query || args.q || args.keyword || args.slug || ''
      logMcpCall({
        action: name,
        query: toolQuery || null,
        user_agent: ua3,
        ip: ip3,
        result_count: data?.count ?? data?.results?.length ?? null,
        endpoint: 'mcp_post',
      })

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
