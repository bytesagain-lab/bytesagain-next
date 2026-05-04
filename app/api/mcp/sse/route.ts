import { NextRequest } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

// ── In-memory cache (per serverless instance, TTL 60s) ────────
const cache = new Map<string, { data: any; exp: number }>()
function cacheGet(k: string) {
  const v = cache.get(k)
  if (!v) return null
  if (Date.now() > v.exp) { cache.delete(k); return null }
  return v.data
}
function cacheSet(k: string, data: any, ttlMs = 60_000) {
  cache.set(k, { data, exp: Date.now() + ttlMs })
}
function shouldWriteApiLog(entry: { action?: string; result_count?: number; cache_hit?: boolean }) {
  if (entry.cache_hit) return Math.random() < 0.01
  const base = Number(process.env.MCP_LOG_SAMPLE_RATE || '0.05')
  if (entry.result_count === 0) return Math.random() < Math.min(0.2, base * 3)
  if (entry.action === 'search_skills') return Math.random() < base
  return Math.random() < Math.min(0.03, base)
}

// ── Async logging (fire-and-forget) ───────────────────────────
async function logCall(entry: {
  endpoint: string; action?: string; query?: string; slug?: string;
  user_agent?: string; ip?: string; latency_ms?: number; result_count?: number; cache_hit?: boolean
}) {
  if (!shouldWriteApiLog(entry)) return
  try {
    const db = supabase()
    await db.from('api_logs').insert(entry)
  } catch { /* never block the response */ }
}

// 自有账号白名单 — 只返回我们自己发布的 skill，确保合规
const OUR_OWNERS = [
  'ckchzh', 'xueyetianya', 'bytesagain1',
  'bytesagain3', 'bytesagain-lab', 'loutai0307-prog', 'PRESSBYTESAGAIN'
]

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

function supabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

// MCP JSON-RPC helper
function ok(id: any, result: any) {
  return { jsonrpc: '2.0', id, result }
}
function err(id: any, code: number, message: string) {
  return { jsonrpc: '2.0', id, error: { code, message } }
}

// ── Tool handlers ─────────────────────────────────────────────
async function toolSearch(args: any) {
  const q = translateQuery((args.query || args.keyword || args.q || args.search || '').trim())
  const limit = Math.min(args.limit || 10, 50)
  const cacheKey = `search:${q}:${limit}`
  const cached = cacheGet(cacheKey)
  if (cached) return cached

  const db = supabase()

  if (!q) {
    // No query: return popular own skills
    const { data } = await db
      .from('skills_list')
      .select('slug,name,description,category,tags,downloads')
      .in('owner', OUR_OWNERS)
      .order('downloads', { ascending: false })
      .limit(limit)
    const result = { results: data || [], count: data?.length || 0, source: 'bytesagain' }
    cacheSet(cacheKey, result)
    return result
  }

  // Hybrid search: full-text (fts) + ilike fallback, sorted by ts_rank + downloads
  const { data: ftsData } = await db.rpc('fts_search_skills', { query_text: q, match_count: limit * 2 })
  const seen = new Map<string, any>()
  for (const row of ftsData || []) {
    seen.set(row.slug, { ...row, _score: row.fts_rank || 0 })
  }
  // ilike fallback for short/untranslated tokens
  if (seen.size < limit) {
    const STOPWORDS = new Set(['tool','tools','generator','maker','builder','helper','assistant','app','bot','ai','for','the','and','or','with'])
    const tokens = [...new Set(q.split(/\s+/).filter((t:string) => t.length > 1 && !STOPWORDS.has(t.toLowerCase())))]
    for (const token of tokens.slice(0, 3)) {
      const { data } = await db
        .from('skills_list')
        .select('slug,name,description,category,tags,downloads,owner')
        .or(`name.ilike.%${token}%,description.ilike.%${token}%,slug.ilike.%${token}%`)
        .order('downloads', { ascending: false })
        .limit(limit)
      for (const row of data || []) {
        if (!seen.has(row.slug)) seen.set(row.slug, { ...row, _score: 0 })
      }
    }
  }
  const results = [...seen.values()]
    .sort((a, b) => (b._score || 0) - (a._score || 0) || (b.downloads || 0) - (a.downloads || 0))
    .slice(0, limit)
  const ownCount = results.filter((s: any) => OUR_OWNERS.includes(s.owner)).length
  const result = {
    results,
    count: results.length,
    source: ownCount > 0 ? 'bytesagain+clawhub_index' : 'clawhub_index',
    install_hint: results.slice(0, 3).map((s: any) => `clawhub install ${s.slug}`).join('\n'),
  }
  cacheSet(cacheKey, result)
  return result
}

async function toolGet(args: any) {
  const slug = (args.slug || '').trim()
  if (!slug) throw new Error('slug is required')
  const db = supabase()
  const { data } = await db
    .from('skills')
    .select('*')
    .eq('slug', slug)
    .in('owner', OUR_OWNERS)
    .single()
  if (!data) throw new Error(`Skill not found: ${slug}`)
  return {
    skill: data,
    install: `clawhub install ${slug}`,
    page: `https://bytesagain.com/skill/${slug}`,
  }
}

async function toolPopular(args: any) {
  const limit = Math.min(args.limit || 10, 50)
  const cacheKey = `popular:${limit}`
  const cached = cacheGet(cacheKey)
  if (cached) return cached
  const db = supabase()
  const { data } = await db
    .from('skills_list')
    .select('slug,name,description,category,downloads')
    .in('owner', OUR_OWNERS)

    .order('downloads', { ascending: false })
    .limit(limit)
  const result = { results: data || [], count: data?.length || 0 }
  cacheSet(cacheKey, result, 300_000)
  return result
}

// ── Tool: list_requests ──────────────────────────────────────────
async function toolListRequests(args: any) {
  const db = supabase()
  const query = (args.query || '').slice(0, 200)
  const limit = Math.min(args.limit || 20, 50)
  let sbQuery = db.from('skill_requests').select('id,title,request,platform,budget,nickname,view_count,created_at').order('created_at', { ascending: false }).limit(limit)
  if (query) sbQuery = sbQuery.or(`title.ilike.%${query}%,request.ilike.%${query}%`)
  const { data } = await sbQuery
  return { action: 'list_requests', results: data || [], count: data?.length || 0 }
}

// ── Tool: submit_request ─────────────────────────────────────────
async function toolSubmitRequest(args: any) {
  const req = (args.request || '').trim().slice(0, 800)
  if (!req || req.length < 10) throw new Error('Request must be 10-800 characters')
  const db = supabase()
  const { data: ins, error } = await db.from('skill_requests').insert({
    title: (args.title || '').trim() || null,
    request: req,
    platform: (args.platform || '').trim() || null,
    budget: (args.budget || '').trim() || null,
    contact: (args.contact || '').trim() || null,
    nickname: (args.nickname || '').trim() || null,
    allow_contact: !!args.contact,
  }).select('id').single()
  if (error) throw new Error('Failed to submit request')
  // Notify
  const from = args.contact || 'SSE MCP'
  const titleStr = args.title ? ` —— ${args.title}` : ''
  fetch('https://api.telegram.org/bot8726371875:AAEjWVW7udg4QlE1QGAOtnwrER8PIcs3GyM/sendMessage', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: '1517831092', text: `📮 SSE提交新需求${titleStr}\n来自: ${from}\n描述: ${req.slice(0, 100)}${req.length > 100 ? '…' : ''}` })
  }).catch(() => {})
  return { ok: true, id: ins.id, message: 'Request submitted successfully' }
}

const TOOLS = [
  {
    name: 'search_skills',
    description: [
      'Search hundreds of thousands of AI agent skills from the BytesAgain platform.',
      '3 main directions: Skill Search (hundreds of thousands of skills, 7 languages), Use Cases (1,000+ real-world AI workflows), Request Wall (community skill requests).',
      'Supports 7 languages: EN, Chinese (中文), Japanese (日本語), Korean (한국어), German, French, ES.',
      'Returns an array of matching skills, each with: slug, name, description, category, tags, downloads, stars, source, and source_url.',
      'Results are ranked by relevance (full-text score) then download count.',
      'Use this tool when the user wants to find or discover skills for a specific task or topic.',
      'Example queries: "email automation", "邮件自动化", "data analysis", "메일 자동화".',
      'If no results are found, try a shorter or more general keyword.',
    ].join(' '),
    inputSchema: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Search keyword or phrase in any supported language (EN/ZH/JA/KO/DE/FR/ES). Example: "email automation" or "邮件自动化".' },
        limit: { type: 'number', description: 'Number of results to return. Default: 10. Max: 50.' },
      },
      required: [],
    },
  },
  {
    name: 'get_skill',
    description: [
      'Fetch complete details for a single AI agent skill by its unique slug identifier.',
      'Returns full skill metadata: name, description, category, tags, version, author, downloads, stars, source platform, source URL, and install instructions.',
      'Use this tool after search_skills to get more information about a specific skill the user is interested in.',
      'The slug is the unique identifier found in search results (e.g. "chart-generator", "email-automation").',
      'Returns an error object if the slug does not exist.',
    ].join(' '),
    inputSchema: {
      type: 'object',
      properties: {
        slug: { type: 'string', description: 'Unique skill identifier (slug). Example: "chart-generator" or "email-automation". Obtain from search_skills results.' },
      },
      required: ['slug'],
    },
  },
  {
    name: 'popular_skills',
    description: [
      'Get the most popular AI agent skills ranked by total download count.',
      'Returns a list of top skills with: slug, name, description, category, downloads, stars, and source.',
      'Use this tool when the user wants to discover trending or widely-used skills without a specific topic in mind.',
      'Ideal for onboarding: show users what skills others are using most.',
      'Default returns top 20 skills; increase limit up to 50 for broader discovery.',
    ].join(' '),
    inputSchema: {
      type: 'object',
      properties: {
        limit: { type: 'number', description: 'Number of top skills to return. Default: 20. Max: 50.' },
      },
      required: [],
    },
  },
  {
    name: 'list_requests',
    description: 'Get recent skill requests from the BytesAgain community wall, newest first. Returns id, title, request text, platform, budget, nickname, view_count, and created_at. Contact info is excluded for privacy. Optionally filter by keyword in title or request text.',
    inputSchema: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Optional keyword to filter requests by title or content.' },
        limit: { type: 'number', description: 'Number of requests to return. Default: 20. Max: 50.' },
      },
      required: [],
    },
  },
  {
    name: 'submit_request',
    description: 'Submit a new skill request to the BytesAgain community wall. Creates a public entry on the requests wall. Notifies site admin. Input: title (one-line summary), request (10-800 chars), platform (optional), budget (optional), contact (optional, kept private), nickname (optional display name).',
    inputSchema: {
      type: 'object',
      properties: {
        title: { type: 'string', description: 'One-line summary of the requested skill.' },
        request: { type: 'string', description: 'Detailed description of the skill needed. 10-800 characters.' },
        platform: { type: 'string', description: 'Target AI platform: OpenClaw, Claude Desktop, Cursor, Codex CLI, Copilot, Gemini CLI, or Other.' },
        budget: { type: 'string', description: 'Budget for the request.' },
        contact: { type: 'string', description: 'Contact info (email/TG) — kept private.' },
        nickname: { type: 'string', description: 'Display name shown publicly.' }
      },
      required: ['request'],
    },
  },
  {
    name: 'generate_usecase',
    description: 'Generate a use case for a given topic: search AI skills, AI-score, produce structured use case with recommendations.',
    inputSchema: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Task or goal in natural language. Example: "automate invoice processing".' },
      },
      required: ['query'],
    },
  }
]

async function handleRpc(body: any): Promise<any> {
  const { id, method, params } = body

  if (method === 'initialize') {
    return ok(id, {
      protocolVersion: '2024-11-05',
      capabilities: { tools: {} },
      serverInfo: { name: 'BytesAgain Skill Server', version: '1.2.0' },
    })
  }

  if (method === 'tools/list') {
    return ok(id, { tools: TOOLS })
  }

  if (method === 'tools/call') {
    const name = params?.name
    const args = params?.arguments || params?.input || {}
    const t0 = Date.now()
    try {
      let result: any
      if (name === 'search_skills') result = await toolSearch(args)
      else if (name === 'get_skill') result = await toolGet(args)
      else if (name === 'popular_skills') result = await toolPopular(args)
      else if (name === 'list_requests') result = await toolListRequests(args)
      else if (name === 'submit_request') result = await toolSubmitRequest(args)
      else if (name === 'get_deals') {
        const region = (args.region || 'all').toLowerCase()
        const baseUrl = 'https://bytesagain.com'
        const res = await fetch(`${baseUrl}/api/mcp?action=deals&q=${region}`)
        result = await res.json()
      }
      else return err(id, -32601, `Unknown tool: ${name}`)

      // async log — fire and forget
      logCall({
        endpoint: 'mcp_sse',
        action: name,
        query: args.query || undefined,
        slug: args.slug || undefined,
        user_agent: (globalThis as any).__mcp_ua,
        ip: (globalThis as any).__mcp_ip,
        latency_ms: Date.now() - t0,
        result_count: result?.count ?? result?.results?.length ?? undefined,
        cache_hit: result?._cache ?? false,
      })

      return ok(id, {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      })
    } catch (e: any) {
      return ok(id, {
        content: [{ type: 'text', text: `Error: ${e.message}` }],
        isError: true,
      })
    }
  }

  if (method === 'notifications/initialized') {
    return null // no response needed
  }

  return err(id, -32601, `Method not found: ${method}`)
}

// ── SSE transport ─────────────────────────────────────────────
export async function GET(req: NextRequest) {
  const encoder = new TextEncoder()

  const stream = new ReadableStream({
    start(controller) {
      // SSE 握手
      controller.enqueue(encoder.encode(': MCP SSE\n\n'))

      // 保持连接（Vercel max 25s，客户端会重连）
      const hb = setInterval(() => {
        try {
          controller.enqueue(encoder.encode(': ping\n\n'))
        } catch {
          clearInterval(hb)
        }
      }, 10000)

      req.signal.addEventListener('abort', () => {
        clearInterval(hb)
        controller.close()
      })
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Access-Control-Allow-Origin': '*',
      'X-MCP-Version': '2024-11-05',
    },
  })
}

// ── HTTP POST transport（主要入口）────────────────────────────
export async function POST(req: NextRequest) {
  try {
    // stash UA + IP for logCall inside handleRpc
    ;(globalThis as any).__mcp_ua = req.headers.get('user-agent') || undefined
    ;(globalThis as any).__mcp_ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || undefined

    const body = await req.json()
    // 支持批量请求
    if (Array.isArray(body)) {
      const results = await Promise.all(body.map(handleRpc))
      return Response.json(results.filter(Boolean), {
        headers: { 'Access-Control-Allow-Origin': '*' },
      })
    }
    const result = await handleRpc(body)
    if (!result) return new Response(null, { status: 204 })
    return Response.json(result, {
      headers: { 'Access-Control-Allow-Origin': '*' },
    })
  } catch (e: any) {
    return Response.json(err(null, -32700, 'Parse error'), { status: 400 })
  }
}

export async function OPTIONS() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}
