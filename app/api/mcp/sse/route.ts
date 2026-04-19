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

// ── Async logging (fire-and-forget) ───────────────────────────
async function logCall(entry: {
  endpoint: string; action?: string; query?: string; slug?: string;
  user_agent?: string; ip?: string; latency_ms?: number; result_count?: number; cache_hit?: boolean
}) {
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
  const q = translateQuery((args.query || '').trim())
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

  // Split translated query into tokens, search each, merge by downloads
  const STOPWORDS = new Set(['tool','tools','generator','maker','builder','helper','assistant','app','bot','ai','for','the','and','or','with'])
  const tokens = [...new Set(q.split(/\s+/).filter(t => t.length > 1 && !STOPWORDS.has(t.toLowerCase())))]
  const seen = new Map<string, any>()

  await Promise.all(tokens.map(async token => {
    const { data } = await db
      .from('skills_list')
      .select('slug,name,description,category,tags,downloads,owner')
      .or(`name.ilike.%${token}%,description.ilike.%${token}%,slug.ilike.%${token}%`)
      .order('downloads', { ascending: false })
      .limit(limit)
    for (const row of data || []) {
      if (!seen.has(row.slug)) seen.set(row.slug, row)
    }
  }))

  const results = [...seen.values()].sort((a, b) => (b.downloads || 0) - (a.downloads || 0)).slice(0, limit)
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
  cacheSet(cacheKey, result, 300_000) // 5min TTL
  return result
}

// ── MCP protocol ──────────────────────────────────────────────
const TOOLS = [
  {
    name: 'search_skills',
    description: 'Search BytesAgain skills by keyword. Returns name, slug, description, category, downloads.',
    inputSchema: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Search keyword' },
        limit: { type: 'number', description: 'Max results (default 10, max 50)' },
      },
      required: [],
    },
  },
  {
    name: 'get_skill',
    description: 'Get full details for a single skill by slug, including install command.',
    inputSchema: {
      type: 'object',
      properties: {
        slug: { type: 'string', description: 'Skill slug, e.g. chart-generator' },
      },
      required: ['slug'],
    },
  },
  {
    name: 'popular_skills',
    description: 'Get top skills ranked by download count.',
    inputSchema: {
      type: 'object',
      properties: {
        limit: { type: 'number', description: 'Max results (default 10, max 50)' },
      },
      required: [],
    },
  },
]

async function handleRpc(body: any): Promise<any> {
  const { id, method, params } = body

  if (method === 'initialize') {
    return ok(id, {
      protocolVersion: '2024-11-05',
      capabilities: { tools: {} },
      serverInfo: { name: 'BytesAgain Skill Server', version: '1.0.0' },
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
