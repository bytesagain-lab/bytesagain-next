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

// Lightweight response cache + sampled logging to protect Supabase Disk IO budget.
// Vercel/serverless instances do not share memory, but this still absorbs bursts per instance.
const RESPONSE_CACHE = new Map<string, { data: any; exp: number }>()
function getCached(key: string) {
  const hit = RESPONSE_CACHE.get(key)
  if (!hit) return null
  if (Date.now() > hit.exp) { RESPONSE_CACHE.delete(key); return null }
  return hit.data
}
function setCached(key: string, data: any, ttlMs = 300_000) {
  if (RESPONSE_CACHE.size > 500) RESPONSE_CACHE.clear()
  RESPONSE_CACHE.set(key, { data, exp: Date.now() + ttlMs })
}
function shouldWriteApiLog(params: { action?: string; endpoint?: string; result_count?: number | null }) {
  const base = Number(process.env.MCP_LOG_SAMPLE_RATE || '0.08')
  const endpoint = params.endpoint || 'rest'
  const action = params.action || ''
  if (params.result_count === 0) return Math.random() < Math.min(0.25, base * 3)
  if (endpoint === 'mcp_post' || endpoint === 'mcp_sse') return Math.random() < Math.min(0.05, base)
  if (action === 'search') return Math.random() < base
  return Math.random() < Math.min(0.03, base)
}
// ─────────────────────────────────────────────────────────────────────────

type WorkflowSkill = {
  slug: string
  name: string
  role: string
  selection_reason: string
  validation: string
}

type WorkflowTemplate = {
  slug: string
  title: string
  intent_keywords: string[]
  who_is_this_for: string
  user_problem: string
  common_blockers: string[]
  selection_standard: string[]
  recommended_workflow: string[]
  skill_stack: WorkflowSkill[]
  prompt_for_agent: string
  upgrade_path: string[]
}

const WORKFLOW_LIBRARY: WorkflowTemplate[] = [
  {
    slug: 'ai-website-upgrade',
    title: 'Upgrade an AI-built website',
    intent_keywords: ['website', 'seo', 'geo', 'traffic', 'frontend', 'design', 'ai website', 'site upgrade'],
    who_is_this_for: 'Founders and builders who shipped a website with AI, then hit quality, traffic, conversion, or maintainability limits.',
    user_problem: 'The site exists, but the user needs a better answer than generic AI advice: diagnose the blocker, choose proven skills, and run an upgrade workflow.',
    common_blockers: ['Weak homepage positioning', 'SEO/GEO pages not answer-shaped', 'No traffic/source diagnosis', 'No browser verification loop', 'No repeatable upgrade plan'],
    selection_standard: ['Task-fit beats keyword match', 'Each skill must own a distinct workflow stage', 'Prefer public proof signals like downloads/source clarity', 'Every recommendation needs a smoke-test target', 'The stack must be usable by an agent via page, install command, or MCP'],
    recommended_workflow: ['Diagnose traffic, UX, SEO/GEO, crawler, and conversion blockers', 'Redesign the page around user question → answer → workflow → next action', 'Apply SEO/GEO content structure and crawler metadata', 'Verify with browser automation and analytics checks', 'Schedule a weekly skill-stack upgrade review'],
    skill_stack: [
      { slug: 'clawhub-superdesign', name: 'SuperDesign', role: 'UX redesign', selection_reason: 'Strong frontend/design proof signal for turning rough AI pages into polished interfaces.', validation: 'Check whether it can produce page hierarchy, hero structure, sections, and visual polish guidance.' },
      { slug: 'clawhub-seo', name: 'SEO', role: 'Search audit', selection_reason: 'Directly maps to site audit, content gaps, competitor analysis, and SEO fixes.', validation: 'Check title/meta/canonical/content structure and prioritized fixes.' },
      { slug: 'clawhub-geo-content-optimizer', name: 'GEO Content Optimizer', role: 'AI-search visibility', selection_reason: 'Specific to GEO/AI-search packaging rather than generic SEO.', validation: 'Check answer-friendly structure, FAQ, schema, and citation-ready blocks.' },
      { slug: 'clawhub-ga4-analytics', name: 'GA4 Analytics', role: 'Traffic diagnosis', selection_reason: 'Needed when the actual blocker is traffic decline or source/session behavior.', validation: 'Check whether it can turn GA4-style metrics into prioritized actions.' },
      { slug: 'clawhub-playwright-mcp', name: 'Playwright MCP', role: 'Verification', selection_reason: 'Browser-level verification closes the loop after changes.', validation: 'Open pages, verify status, key links, UI states, and screenshots.' },
    ],
    prompt_for_agent: 'Diagnose why my AI-built website is underperforming. Check UX, SEO, GEO, speed, crawler access, and conversion path. Recommend a tested skill stack, explain why each skill is needed, then produce a prioritized 7-day upgrade plan.',
    upgrade_path: ['Replace weak or duplicate skills after testing', 'Add source-specific analytics once traffic grows', 'Turn repeated fixes into a reusable internal workflow', 'Subscribe to weekly skill-stack changes for this use case'],
  },
  {
    slug: 'ecommerce-agent-upgrade',
    title: 'Upgrade an e-commerce agent from content helper to sales workflow',
    intent_keywords: ['ecommerce', 'shopify', 'product listing', 'listing', 'store', 'product copy', 'localization', 'commerce'],
    who_is_this_for: 'Small sellers and e-commerce operators who want an agent that can research products, generate listings, create media briefs, and connect to store operations.',
    user_problem: 'A generic AI can write product copy, but it does not know which skills to combine, what to verify, or how to keep the workflow upgraded.',
    common_blockers: ['Copy is not tied to store fields', 'No product research before listing', 'No media asset workflow', 'Localization is inconsistent', 'No QA before publishing'],
    selection_standard: ['Must map to a real commerce stage', 'Use one skill per workflow responsibility', 'Prefer source-clear or strategically owned skills', 'Output must be observable and testable', 'Keep a replacement path as better commerce skills appear'],
    recommended_workflow: ['Clarify store goal: launch, cleanup, localization, or campaign', 'Pick stack by stage: research → copy → media → store/API → verification', 'Generate listing package with title, bullets, SEO copy, variants, and image brief', 'Verify channel/store requirements', 'Set weekly loop for trend refresh and weak-listing replacement'],
    skill_stack: [
      { slug: 'shopify-helper', name: 'Shopify Helper', role: 'Store operations', selection_reason: 'BytesAgain-owned asset that directly maps to Shopify/product workflow.', validation: 'Produce product/store action checklist and safe execution steps.' },
      { slug: 'clawhub-shopify-admin-api', name: 'Shopify Admin API', role: 'Shopify integration', selection_reason: 'Higher proof signal for Shopify API tasks and admin automation.', validation: 'Explain safe product update and inventory workflow.' },
      { slug: 'clawhub-product-description-generator', name: 'Product Description Generator', role: 'Listing copy', selection_reason: 'Specific to product copy; good fit for listing generation and optimization.', validation: 'Generate title, bullet points, SEO description, and variants.' },
      { slug: 'clawhub-ecommerce-image-asset-generator', name: 'Ecommerce Image Asset Generator', role: 'Product media', selection_reason: 'Complements listing copy with image/asset production.', validation: 'Create image brief, asset checklist, and channel variants.' },
      { slug: 'clawhub-ecommerce-product-picker', name: 'Cross-Border Ecommerce Product Picker', role: 'Product research', selection_reason: 'Useful before listing: product selection and cross-border market fit.', validation: 'Evaluate product opportunities and localization risks.' },
    ],
    prompt_for_agent: 'Build a skill stack for product research, listing copy, localization, product media, Shopify/store operations, and QA. Explain why each skill is selected, what output it should produce, and how to verify the workflow before publishing.',
    upgrade_path: ['Track new commerce skills weekly', 'Replace generic writers with channel-specific tools', 'Add store analytics once conversion data exists', 'Create reusable prompt packs for winning listings'],
  },
]

function findWorkflow(rawQuery: string): WorkflowTemplate {
  const q = rawQuery.toLowerCase()
  let best = WORKFLOW_LIBRARY[0]
  let bestScore = -1
  for (const wf of WORKFLOW_LIBRARY) {
    const score = wf.intent_keywords.reduce((sum, kw) => sum + (q.includes(kw) ? kw.length : 0), 0)
    if (score > bestScore) { best = wf; bestScore = score }
  }
  return best
}

// MCP-compatible endpoint for AI agents
// Supports: search, recommend, get, popular, use_cases, workflow
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
      const cacheKey = `get:search:${effectiveQuery || '_popular'}:${limit}`
      const cached = getCached(cacheKey)
      if (cached) return NextResponse.json({ ...cached, cache: 'hit' }, { headers })
      if (!effectiveQuery) {
        const { data } = await supabase
          .from('skills_list')
          .select('slug, name, description, category, tags, downloads, owner')
          .order('downloads', { ascending: false })
          .limit(limit)
        const payload = { action, query, results: data || [], count: data?.length || 0 }
        setCached(cacheKey, payload, 300_000)
        return NextResponse.json(payload, { headers })
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
      const payload = {
        action, query,
        ...(effectiveQuery !== query ? { translated_query: effectiveQuery } : {}),
        results, count: results.length
      }
      setCached(cacheKey, payload, 300_000)
      return NextResponse.json(payload, { headers })
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
      const cacheKey = `get:popular:${limit}`
      const cached = getCached(cacheKey)
      if (cached) return NextResponse.json({ ...cached, cache: 'hit' }, { headers })
      const { data } = await supabase
        .from('skills_list')
        .select('slug, name, description, category, downloads, owner')
        .order('downloads', { ascending: false })
        .limit(limit)
      const payload = { action, results: data || [], total_in_db: data?.length }
      setCached(cacheKey, payload, 300_000)
      return NextResponse.json(payload, { headers })
    }

    if (action === 'workflow') {
      const t0 = Date.now()
      const wf = findWorkflow(effectiveQuery || query)
      const ua = req.headers.get('user-agent') || ''
      const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || ''
      logMcpCall({ action, query, user_agent: ua, ip, latency_ms: Date.now() - t0, result_count: wf.skill_stack.length })
      return NextResponse.json({
        action,
        query,
        workflow: {
          ...wf,
          url: `https://bytesagain.com/use-case-lab/${wf.slug}`,
          mcp_hint: 'Use this as an agent-ready workflow plan. Call get_skill for a selected slug only when detailed skill metadata is needed.',
        },
      }, { headers })
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
          .select('slug, title, description, skills')
          .or(orClause)
          .limit(ucLimit * 3)
        results = (data || [])
          .filter((uc: any) => Array.isArray(uc.skills) && uc.skills.length >= 3)
          .slice(0, ucLimit)
          .map((uc: any) => ({
            slug: uc.slug,
            title: uc.title,
            description: uc.description,
            url: `https://bytesagain.com/use-case/${uc.slug}`,
          }))
      } else {
        const { data } = await supabase
          .from('use_cases')
          .select('slug, title, description, skills')
          .limit(ucLimit * 3)
        results = (data || [])
          .filter((uc: any) => Array.isArray(uc.skills) && uc.skills.length >= 3)
          .slice(0, ucLimit)
          .map((uc: any) => ({
            slug: uc.slug,
            title: uc.title,
            description: uc.description,
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
        use_cases: '?action=use_cases&q=<task>&limit=10',
        workflow: '?action=workflow&q=<task>',
      },
      mcp_sse: 'https://bytesagain.com/api/mcp/sse',
      homepage: 'https://bytesagain.com',
      llms_txt: 'https://bytesagain.com/llms.txt',
    }, { headers })
  } catch {
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
  if (!shouldWriteApiLog(params)) return
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

  if (method === 'ping') {
    return NextResponse.json({ jsonrpc: '2.0', id, result: {} }, { headers })
  }

  if (method === 'notifications/initialized') {
    return NextResponse.json({ jsonrpc: '2.0', id: null, result: {} }, { headers })
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
          description: 'Fetch full details for one skill by slug. Call AFTER search_skills or popular_skills when a user selects a specific result — do NOT batch-call for every item. Returns: name, description, category, tags, version, author, downloads, stars, install_command, homepage_url, repo_url. Error lifecycle: slug not found → {error: "Skill not found"} → fall back to search_skills with related keyword. Never guess slugs; only use slugs from prior tool results.',
          inputSchema: { type: 'object', properties: {
            slug: { type: 'string', description: 'Exact slug string from a prior search_skills or popular_skills result. Format: lowercase, hyphen-separated (e.g. "chart-generator"). Never guess or modify slugs. Required — no default.' }
          }, required: ['slug'] } },
        { name: 'popular_skills',
          description: 'Return top N AI agent skills ranked by download count. Use for discovery or onboarding when user has no specific task in mind (e.g. "show me popular skills", "what can I do with this"). Do NOT use when user describes a specific task — use search_skills instead. Returns: slug, name, description, category, downloads, stars. On database error returns empty list — do not retry. Default limit 20, max 50. Follow up with get_skill only if user requests details on a specific result.',
          inputSchema: { type: 'object', properties: {
            limit: { type: 'number', description: 'How many top skills to return. Default: 20. Max: 50. Use 5-10 for quick recommendations, 20-50 for browsing.' }
          }, required: [] } },
        { name: 'search_use_cases',
          description: 'Search 1,000+ AI agent use-cases by task or goal description. Use-cases describe real-world workflows like "write a weekly report", "automate email replies", or "analyze sales data". Each use-case links to a dedicated page listing the best AI skills for that task. Use this tool when: (1) user describes a goal or workflow rather than a tool name, (2) user asks "how do I use AI for X", (3) you want to show what tasks AI can help with. Returns use-case slug, title, description, and page URL. Combine with search_skills to find specific tools for each use-case.',
          inputSchema: { type: 'object', properties: {
            query: { type: 'string', description: 'Task or goal in natural language. Example: "write job descriptions", "automate social media", "analyze financial data".' },
            limit: { type: 'number', description: 'Number of use-cases to return. Default: 10. Max: 30.' }
          }, required: ['query'] } },
        { name: 'get_workflow',
          description: 'Return a complete agent-ready workflow for a user goal, including who it is for, common blockers, skill selection standards, recommended steps, tested skill-stack candidates, prompt for the user agent, and upgrade path. Use this when the user asks how to solve a problem or what skill stack their agent should use. Prefer this over raw search when the user arrives with a business/task problem.',
          inputSchema: { type: 'object', properties: {
            query: { type: 'string', description: 'User goal or blocker. Example: "upgrade AI website SEO", "ecommerce product listing agent", "improve my agent workflow".' }
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
      } else if (name === 'get_workflow') {
        const q = encodeURIComponent(sanitize(args.query || args.q || ''))
        apiUrl = `${baseUrl}/api/mcp?action=workflow&q=${q}`
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
