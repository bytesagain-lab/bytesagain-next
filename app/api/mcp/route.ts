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

// ── AliExpress Deals / Coupon Codes ───────────────────────────────
const ALIEXPRESS_DEALS = {
  global: { label: 'Global Codes', valid_until: '2026-05-07 23:59 PST', codes: [
    { code: 'AFMC2', desc: '$2 off $15', threshold: '$15' },
    { code: 'AFMC4', desc: '$4 off $30', threshold: '$30' },
    { code: 'AFMC7', desc: '$7 off $49', threshold: '$49' },
    { code: 'AFMC12', desc: '$12 off $89', threshold: '$89' },
    { code: 'AFMC18', desc: '$18 off $149', threshold: '$149' },
    { code: 'AFMC25', desc: '$25 off $209', threshold: '$209' },
    { code: 'AFMC40', desc: '$40 off $329', threshold: '$329' },
    { code: 'AFMC55', desc: '$55 off $449', threshold: '$449' },
  ]},
  us: { label: 'US Choice Day', valid_until: '2026-05-07 PST', codes: [
    { code: 'USAFF02', desc: '$18-$2' }, { code: 'USAFF5', desc: '$39-$5' },
    { code: 'USAFF8', desc: '$59-$8' }, { code: 'USAFF015', desc: '$109-$15' },
    { code: 'USAFF23', desc: '$169-$23' }, { code: 'USAFF30', desc: '$239-$30' },
    { code: 'USAFF045', desc: '$359-$45' }, { code: 'USAFF060', desc: '$479-$60' },
  ]},
  us_newuser: { label: 'US New User', valid_until: '2026-06-30', codes: [
    { code: 'NEWUSOFF3', desc: '$10-$3' }, { code: 'NEWUSOFF5', desc: '$20-$5' },
    { code: 'NEWUSOFF12', desc: '$80-$12' },
  ]},
  br: { label: 'Brazil Mother\'s Day', valid_until: '2026-05-07 BRT', codes: [
    { code: 'MAES1', desc: 'R$80-R$10' }, { code: 'MAES2', desc: 'R$160-R$20' },
    { code: 'MAES3', desc: 'R$260-R$35' }, { code: 'MAES4', desc: 'R$480-R$65' },
    { code: 'MAES5', desc: 'R$800-R$95' }, { code: 'MAES6', desc: 'R$1150-R$140' },
    { code: 'MAES7', desc: 'R$1770-R$220' }, { code: 'MAES8', desc: 'R$2450-R$300' },
  ]},
  kr: { label: 'Korea 5월 Choice Day', valid_until: '2026-05-07 KST', codes: [
    { code: 'CHOICEKR03', desc: '$22-$3' }, { code: 'CHOICEKR04', desc: '$34-$4' },
    { code: 'CHOICEKR07', desc: '$56-$7' }, { code: 'CHOICEKR10', desc: '$86-$10' },
    { code: 'CHOICEKR16', desc: '$139-$16' }, { code: 'CHOICEKR27', desc: '$239-$27' },
    { code: 'CHOICEKR38', desc: '$349-$38' },
  ]},
  fr: { label: 'France Choice Day', valid_until: '2026-05-07 CET', codes: [
    { code: 'FRFW02', desc: '€18-€2' }, { code: 'FRFW05', desc: '€39-€5' },
    { code: 'FRFW08', desc: '€59-€8' }, { code: 'FRFW15', desc: '€109-€15' },
    { code: 'FRFW23', desc: '€169-€23' }, { code: 'FRFW30', desc: '€239-€30' },
    { code: 'FRFW45', desc: '€359-€45' }, { code: 'FRFW60', desc: '€479-€60' },
  ]},
  es: { label: 'Spain Listos para verano', valid_until: '2026-05-07', codes: [
    { code: 'CDES02', desc: '€15-€2', alt: 'ESCD02' },
    { code: 'CDES04', desc: '€30-€4', alt: 'ESCD04' },
    { code: 'CDES07', desc: '€49-€7', alt: 'ESCD07' },
    { code: 'CDES12', desc: '€89-€12', alt: 'ESCD12' },
    { code: 'CDES18', desc: '€149-€18', alt: 'ESCD18' },
    { code: 'CDES25', desc: '€209-€25', alt: 'ESCD25' },
    { code: 'CDES40', desc: '€329-€40', alt: 'ESCD40' },
    { code: 'CDES55', desc: '€449-€55', alt: 'ESCD55' },
  ]},
  de: { label: 'Germany Choice Day', valid_until: '2026-05-07 CEST', codes: [
    { code: 'DECD02', desc: '€18-€2' }, { code: 'DECD05', desc: '€39-€5' },
    { code: 'DECD08', desc: '€59-€8' }, { code: 'DECD15', desc: '€109-€15' },
    { code: 'DECD23', desc: '€169-€23' }, { code: 'DECD30', desc: '€239-€30' },
    { code: 'DECD45', desc: '€359-€45' }, { code: 'DECD60', desc: '€479-€60' },
  ]},
  de_weekly: { label: 'DE Sparschwein wöchentlich', valid_until: 'weekly Sun 23:59 CET', codes: [] },
  pl: { label: 'Poland Summer Ready', valid_until: '2026-05-07 CET', codes: [
    { code: 'AEPLL02', desc: '€18-€2' }, { code: 'AEPLL05', desc: '€39-€5' },
    { code: 'AEPLL08', desc: '€59-€8' }, { code: 'AEPLL15', desc: '€109-€15' },
    { code: 'AEPLL23', desc: '€169-€23' }, { code: 'AEPLL30', desc: '€239-€30' },
    { code: 'AEPLL45', desc: '€359-€45' }, { code: 'AEPLL60', desc: '€479-€60' },
  ]},
  ua: { label: 'Ukraine Summer Ready', valid_until: '2026-05-07 CET', codes: [
    { code: 'AEUA01', desc: '$10-$1' }, { code: 'AEUA03', desc: '$25-$3' },
    { code: 'AEUA05', desc: '$40-$5' }, { code: 'AEUA08', desc: '$65-$8' },
    { code: 'AEUA13', desc: '$99-$13' }, { code: 'AEUA25', desc: '$189-$25' },
    { code: 'AEUA30', desc: '$229-$30' }, { code: 'AEUA50', desc: '$379-$50' },
  ]},
  jp: { label: 'Japan 5月Choice Day', valid_until: '2026-05-08 15:59 JST', codes: [
    { code: 'AFMC2', desc: '$2 off $15' }, { code: 'AFMC4', desc: '$4 off $30' },
    { code: 'AFMC7', desc: '$7 off $49' }, { code: 'AFMC12', desc: '$12 off $89' },
    { code: 'AFMC18', desc: '$18 off $149' }, { code: 'AFMC25', desc: '$25 off $209' },
    { code: 'AFMC40', desc: '$40 off $329' }, { code: 'AFMC55', desc: '$55 off $449' },
  ]},
  euro_multi: { label: 'AT/BE/CH/CZ/DK/FI/HU/IE/PT/SE Summer Ready', valid_until: '2026-05-07 23:59', codes: [
    { code: 'CD02VIO', desc: '€18-€2' }, { code: 'CD05VIO', desc: '€39-€5' },
    { code: 'CD08VIO', desc: '€59-€8' }, { code: 'CD15VIO', desc: '€109-€15' },
    { code: 'CD23VIO', desc: '€169-€23' }, { code: 'CD30VIO', desc: '€239-€30' },
    { code: 'CD45VIO', desc: '€359-€45' }, { code: 'CD60VIO', desc: '€479-€60' },
  ]},
  uk: { label: 'UK Summer Ready', valid_until: '2026-05-07 22:59 BST', codes: [
    { code: 'AEUKCDX2', desc: '£15-£2' }, { code: 'AEUKCDX4', desc: '£30-£4' },
    { code: 'AEUKCDX7', desc: '£49-£7' }, { code: 'AEUKCD12', desc: '£89-£12' },
    { code: 'AEUKCD18', desc: '£149-£18' }, { code: 'AEUKCD25', desc: '£209-£25' },
    { code: 'AEUKCD40', desc: '£329-£40' }, { code: 'AEUKCD55', desc: '£449-£55' },
  ]},
  uk_newuser: { label: 'UK New User', valid_until: '2026-07-09', codes: [
    { code: 'UKNEW03', desc: '£7-£3' }, { code: 'UKNEW04', desc: '£15-£4' },
  ]},
  au: { label: 'Australia Winter Ready', valid_until: '2026-05-07 23:59 PST', codes: [
    { code: 'AFFAU03', desc: 'A$23-A$3' }, { code: 'AFFAU06', desc: 'A$45-A$6' },
    { code: 'AFFAU10', desc: 'A$70-A$10' }, { code: 'AFFAU16', desc: 'A$120-A$16' },
    { code: 'AFFAU28', desc: 'A$230-A$28' }, { code: 'AFFAU35', desc: 'A$290-A$35' },
    { code: 'AFFAU56', desc: 'A$460-A$56' }, { code: 'AFFAU78', desc: 'A$630-A$78' },
  ]},
  ca: { label: 'Canada Choice Day', valid_until: '2026-05-07 23:59 PDT', codes: [
    { code: 'CDCA23', desc: 'C$23-C$3' }, { code: 'CDCA45', desc: 'C$45-C$6' },
    { code: 'CDCA70', desc: 'C$70-C$7' }, { code: 'CDCA120', desc: 'C$120-C$16' },
    { code: 'CDCA230', desc: 'C$230-C$28' }, { code: 'CDCA290', desc: 'C$290-C$35' },
    { code: 'CDCA460', desc: 'C$460-C$56' }, { code: 'CDCA630', desc: 'C$630-C$78' },
  ]},
  mx: { label: 'Mexico Choice Day', valid_until: '2026-05-07 23:59 CT', codes: [
    { code: 'CDMX1', desc: 'MX$320-MX$35' }, { code: 'CDMX2', desc: 'MX$700-MX$90' },
    { code: 'CDMX3', desc: 'MX$1000-MX$140' }, { code: 'CDMX4', desc: 'MX$1900-MX$260' },
    { code: 'CDMX5', desc: 'MX$2900-MX$400' }, { code: 'CDMX6', desc: 'MX$4200-MX$530' },
    { code: 'CDMX7', desc: 'MX$6300-MX$800' }, { code: 'CDMX8', desc: 'MX$8400-MX$1050' },
  ]},
  gcc: { label: 'GCC (SA/AE/KW/OM/BH/QA)', valid_until: '2026-05-07 PST', codes: [
    { code: 'GCCCD01', desc: '70SAR-8SAR' }, { code: 'GCCCD02', desc: '155SAR-20SAR' },
    { code: 'GCCCD03', desc: '225SAR-27SAR' }, { code: 'GCCCD04', desc: '350SAR-48SAR' },
    { code: 'GCCCD05', desc: '575SAR-75SAR' }, { code: 'GCCCD06', desc: '920SAR-115SAR' },
    { code: 'GCCCD07', desc: '1430SAR-175SAR' }, { code: 'GCCCD08', desc: '1885SAR-230SAR' },
  ]},
}

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
function escapeXml(s: string): string {
  if (!s) return ''
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&apos;')
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
      { slug: 'superdesign', name: 'SuperDesign', role: 'UX redesign', selection_reason: 'Strong frontend/design proof signal for turning rough AI pages into polished interfaces.', validation: 'Check whether it can produce page hierarchy, hero structure, sections, and visual polish guidance.' },
      { slug: 'seo', name: 'SEO', role: 'Search audit', selection_reason: 'Directly maps to site audit, content gaps, competitor analysis, and SEO fixes.', validation: 'Check title/meta/canonical/content structure and prioritized fixes.' },
      { slug: 'geo-content-optimizer', name: 'GEO Content Optimizer', role: 'AI-search visibility', selection_reason: 'Specific to GEO/AI-search packaging rather than generic SEO.', validation: 'Check answer-friendly structure, FAQ, schema, and citation-ready blocks.' },
      { slug: 'ga4-analytics', name: 'GA4 Analytics', role: 'Traffic diagnosis', selection_reason: 'Needed when the actual blocker is traffic decline or source/session behavior.', validation: 'Check whether it can turn GA4-style metrics into prioritized actions.' },
      { slug: 'playwright-mcp', name: 'Playwright MCP', role: 'Verification', selection_reason: 'Browser-level verification closes the loop after changes.', validation: 'Open pages, verify status, key links, UI states, and screenshots.' },
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
      { slug: 'shopify-admin-api', name: 'Shopify Admin API', role: 'Shopify integration', selection_reason: 'Higher proof signal for Shopify API tasks and admin automation.', validation: 'Explain safe product update and inventory workflow.' },
      { slug: 'product-description-generator', name: 'Product Description Generator', role: 'Listing copy', selection_reason: 'Specific to product copy; good fit for listing generation and optimization.', validation: 'Generate title, bullet points, SEO description, and variants.' },
      { slug: 'ecommerce-image-asset-generator', name: 'Ecommerce Image Asset Generator', role: 'Product media', selection_reason: 'Complements listing copy with image/asset production.', validation: 'Create image brief, asset checklist, and channel variants.' },
      { slug: 'ecommerce-product-picker', name: 'Cross-Border Ecommerce Product Picker', role: 'Product research', selection_reason: 'Useful before listing: product selection and cross-border market fit.', validation: 'Evaluate product opportunities and localization risks.' },
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

    if (action === 'list_requests') {
      const rLimit = Math.min(limit, 50)
      let sbQuery = supabase.from('skill_requests').select('id,title,request,platform,budget,nickname,view_count,created_at').order('created_at', { ascending: false }).limit(rLimit)
      if (query) {
        sbQuery = sbQuery.or(`title.ilike.%${query}%,request.ilike.%${query}%`)
      }
      const { data: reqs } = await sbQuery
      return NextResponse.json({ action, results: reqs || [], count: reqs?.length || 0 }, { headers })
    }

    if (action === 'deals') {
      const region = (query || 'all').toLowerCase()
      let deals: any
      if (region === 'all') {
        deals = ALIEXPRESS_DEALS
      } else if (ALIEXPRESS_DEALS[region as keyof typeof ALIEXPRESS_DEALS]) {
        deals = { [region]: ALIEXPRESS_DEALS[region as keyof typeof ALIEXPRESS_DEALS] }
      } else {
        deals = { error: `Unknown region "${region}". Available: global, us, br, kr, fr, es, de` }
      }
      return NextResponse.json({ action, query: region, deals }, { headers })
    }

    if (action === 'generate_usecase') {
      // Forward to POST handler via fetch + return
      const baseUrl = `${req.nextUrl.protocol}//${req.nextUrl.host}`
      const res = await fetch(`${baseUrl}/api/mcp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'tools/call', params: { name: 'generate_usecase', arguments: { query } } }),
      })
      const data = await res.json()
      return NextResponse.json({ action, query, result: data?.result?.content?.[0]?.text ? JSON.parse(data.result.content[0].text) : null }, { headers })
    }

    // Default: API info
    return NextResponse.json({
      name: 'BytesAgain Agent API',
      description: 'The BytesAgain AI Skills Platform — 3 directions: 1️⃣ Skill Search (hundreds of thousands of AI agent skills, 7 languages), 2️⃣ Use Cases (1,000+ real-world AI workflows), 3️⃣ Request Wall (community skill requests). Free, no auth required.',
      version: '1.2',
      actions: {
        search: '?action=search&q=<query>&limit=10',
        recommend: '?action=recommend&role=<developer|creator|trader|marketer|student|ecommerce>&limit=10',
        get: '?action=get&slug=<slug>',
        popular: '?action=popular&limit=20',
        use_cases: '?action=use_cases&q=<task>&limit=10',
        workflow: '?action=workflow&q=<task>',
        list_requests: '?action=list_requests&q=<keyword>&limit=20',
        deals: '?action=deals&q=<region>',
        generate_usecase: '?action=generate_usecase&q=<topic>',
        submit_request: 'POST /api/mcp (JSON-RPC)',
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
        serverInfo: { name: 'BytesAgain', version: '1.2.0' }
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
          description: [
            'Search hundreds of thousands of AI agent skills from the BytesAgain platform.',
            '3 main directions: Skill Search (hundreds of thousands of skills, 7 languages), Use Cases (1,000+ real-world AI workflows), Request Wall (community skill requests).',
            'Supports 7 languages: EN, Chinese (中文), Japanese (日本語), Korean (한국어), German, French, ES.',
            'Returns skills with slug, name, description, category, tags, downloads, stars, source, and source_url.',
            'Results ranked by relevance (full-text score) then download count.',
            'Use when user wants to find or discover skills for a specific task or topic.',
            'Example queries: "email automation", "邮件自动化", "data analysis", "메일 자동화".',
          ].join(' '),
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
        { name: 'submit_request',
          description: 'Submit a new skill request to the BytesAgain community wall. Use when a user asks to publish a request for an AI skill they need. Creates a public entry on the requests wall. Sends notification to site admin. Input: title (one-line summary), request (10-800 chars), platform (optional), budget (optional), contact (optional, kept private), nickname (optional display name).',
          inputSchema: { type: 'object', properties: {
            title: { type: 'string', description: 'One-line summary of the requested skill.' },
            request: { type: 'string', description: 'Detailed description of the skill needed — features, use case, and requirements. 10-800 characters.' },
            platform: { type: 'string', description: 'Target AI platform: OpenClaw, Claude Desktop, Cursor, Codex CLI, Copilot, Gemini CLI, or Other.' },
            budget: { type: 'string', description: 'Budget for the request, e.g. "$50" or "议价".' },
            contact: { type: 'string', description: 'Contact info (email/TG) — kept private, not shown publicly.' },
            nickname: { type: 'string', description: 'Display name shown publicly on the wall.' }
          }, required: ['request'] } },
        { name: 'list_requests',
          description: 'Get recent skill requests from the BytesAgain community wall, newest first. Returns id, title, request text, platform, budget, nickname, view_count, and created_at. Contact info is excluded for privacy. Optionally filter by keyword in title or request text.',
          inputSchema: { type: 'object', properties: {
            query: { type: 'string', description: 'Optional keyword to filter requests by title or content.' },
            limit: { type: 'number', description: 'Number of requests to return. Default: 20. Max: 50.' }
          }, required: [] } },
        { name: 'get_deals',
          description: 'Get active AliExpress coupon codes and promotion deals. Returns region-specific coupon codes with discount thresholds and validity dates. Supported regions: global codes, US, Brazil, Korea, France, Spain, Germany. Each region has its own set of coupon codes. Use when the user asks about AliExpress discounts, coupon codes, or promotions.',
          inputSchema: { type: 'object', properties: {
            region: { type: 'string', description: 'Optional region filter: "global", "us", "br", "kr", "fr", "es", "de", or "all". Default: "all".' },
          }, required: [] } },
        { name: 'generate_usecase',
          description: 'Generate a use case for a given topic or goal. The process: 1) search 60,000+ AI skills by keyword, 2) AI-score top results for relevance, 3) select best 5 skills for the task, 4) generate structured use case with skill recommendations. Use when a user describes a task and wants a curated AI skill stack.',
          inputSchema: { type: 'object', properties: {
            query: { type: 'string', description: 'Task or goal in natural language. Example: "automate invoice processing", "write social media content", "analyze customer feedback". Required.' },
          }, required: ['query'] } },
        { name: 'score_skills',
          description: 'Six-dimension skill scoring engine. Given a topic, searches skills and scores each on: downloads (25pts), stars (15pts), category relevance to topic (20pts, AI-evaluated), description quality (15pts), source diversity (15pts), name match (10pts). Use when you want to see how well skills rank for a task. Returns scored list sorted by total.',
          inputSchema: { type: 'object', properties: {
            query: { type: 'string', description: 'Topic or task to score skills against. Example: "email automation", "data analysis". Required.' },
            limit: { type: 'number', description: 'Number of skills to return scored. Default: 20. Max: 50.' },
          }, required: ['query'] } },
        { name: 'run_pipeline',
          description: [
            'Full automated content pipeline. Given a topic, it:',
            '1) Discovers relevant skills from 60,000+ database (search + rank)',
            '2) Scores each on 6 dimensions (downloads, stars, category relevance, description quality, source diversity, name match)',
            '3) Uses AI to select the best 5-8 skills that genuinely fit the topic',
            '4) Generates a structured use case (title, description, skill stack with reasons)',
            '5) Writes a full 800+ word article in markdown',
            '6) Creates 3 tweet drafts promoting the use case',
            '7) Saves article to Supabase posts table and use case to use_cases table',
            '8) Generates a 1792x1024 cover image and uploads to Supabase Storage',
            '9) Returns everything in one response',
            'Set publish=true to auto-publish. Set publish=false (default) for draft-only.',
          ].join(' '),
          inputSchema: { type: 'object', properties: {
            query: { type: 'string', description: 'Topic for the full pipeline. Example: "automate invoice processing", "write code documentation". Required.' },
            publish: { type: 'boolean', description: 'Auto-publish to live site. Default: false (draft). Set true to set status=published.' },
          }, required: ['query'] } },
        { name: 'install_stack',
          description: [
            'Return a curated skill stack (bundle) for bulk pre-installation.',
            'Each stack groups 5-15 skills for a common use case.',
            'Returns: stack name, description, skills with slugs, install commands.',
            'Available stacks: developer-starter, content-creator, data-analyst, crypto-trader, devops-engineer, ai-agent-developer, security-auditor, homework-helper, startup-founders, marketing-team',
          ].join(' '),
          inputSchema: { type: 'object', properties: {
            name: { type: 'string', description: 'Stack name. Available: developer-starter, content-creator, data-analyst, crypto-trader, devops-engineer, ai-agent-developer, security-auditor, homework-helper, startup-founders, marketing-team. Default: "developer-starter".' },
          }, required: [] } },
        { name: 'scan_skill',
          description: 'Security scanner for AI agent skills. Fetches the skill\'s script, runs static analysis checking 30+ dangerous patterns: sensitive file reads (.env, .ssh, $HOME), remote code execution (curl|bash, base64 decode + exec), obfuscation signals, reverse shells, credential leaks, affiliate link abuse. Uses pattern matching for fast results and optional DeepSeek AI for deeper review. Returns safety score 0-100, flagged violations, and recommendations.',
          inputSchema: { type: 'object', properties: {
            slug: { type: 'string', description: 'ClawHub skill slug to scan. Example: "shell", "task-planner". Required.' },
            deep: { type: 'boolean', description: 'Run DeepSeek AI analysis on the script content for deeper inspection. Default: true.' },
          }, required: ['slug'] } },
        { name: 'evaluate_skill',
          description: [
            'Full skill evaluation lab.',
            'Static analysis (23 patterns: sensitive file reads, remote exec, reverse shells, obfuscation)',
            'Docker sandbox execution (install skill, run with strace, monitor syscalls, file access, network)',
            'AI evaluation (strengths, weaknesses, risks, quality grade, verified capabilities)',
            'Returns: safety_score, risk_level, execution_report, evaluation (summary + verified_capabilities + strengths + weaknesses + risks + quality_grade + recommendation)',
          ].join(' '),
          inputSchema: { type: 'object', properties: {
            slug: { type: 'string', description: 'ClawHub skill slug to evaluate. Example: "shell", "invoice-pdf". Required.' },
            test_input: { type: 'string', description: 'Test input to pass to the skill. Default: "hello world".' },
          }, required: ['slug'] } },
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
      } else if (name === 'submit_request') {
        const request = sanitize(args.request || '', 800)
        if (!request || request.length < 10) {
          return NextResponse.json({ jsonrpc: '2.0', id, error: { code: -32602, message: 'Request must be 10-800 characters' } }, { status: 400, headers })
        }
        const title = sanitize(args.title || '', 200)
        const platform = sanitize(args.platform || '', 50)
        const budget = sanitize(args.budget || '', 50)
        const contact = sanitize(args.contact || '', 100)
        const nickname = sanitize(args.nickname || '', 50)
        const sb2 = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
        const { data: ins, error: insErr } = await sb2.from('skill_requests').insert({
          title: title || null, request, platform: platform || null, budget: budget || null,
          contact: contact || null, nickname: nickname || null,
          allow_contact: !!contact,
        }).select('id').single()
        if (insErr) {
          return NextResponse.json({ jsonrpc: '2.0', id, error: { code: -32603, message: 'Failed to submit request' } }, { status: 500, headers })
        }
        // Notification (async, don't block response)
        const notifFrom = contact || 'MCP API'
        fetch('https://api.telegram.org/bot8726371875:AAEjWVW7udg4QlE1QGAOtnwrER8PIcs3GyM/sendMessage', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ chat_id: '1517831092', text: `📮 MCP提交新需求${title ? ` —— ${title}` : ''}\n来自: ${notifFrom}\n描述: ${request.slice(0, 100)}${request.length > 100 ? '…' : ''}` })
        }).catch(() => {})
        logMcpCall({ action: 'submit_request', query: (title || request).slice(0,100), user_agent: req.headers.get('user-agent')||'', ip: req.headers.get('x-forwarded-for')?.split(',')[0].trim()||req.headers.get('x-real-ip')||'', result_count: 1, endpoint: 'mcp_post' })
        return NextResponse.json({
          jsonrpc: '2.0', id,
          result: { content: [{ type: 'text', text: JSON.stringify({ ok: true, id: ins.id, message: 'Request submitted successfully' }) }] }
        }, { headers })
      } else if (name === 'list_requests') {
        const sb2 = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
        const query = sanitize(args.query || '', 200)
        const limit = Math.min(parseInt(args.limit) || 20, 50)
        let sbQuery = sb2.from('skill_requests').select('id,title,request,platform,budget,nickname,view_count,created_at').order('created_at', { ascending: false }).limit(limit)
        if (query) {
          sbQuery = sbQuery.or(`title.ilike.%${query}%,request.ilike.%${query}%`)
        }
        const { data: requests } = await sbQuery
        logMcpCall({ action: 'list_requests', query: query||null, user_agent: req.headers.get('user-agent')||'', ip: req.headers.get('x-forwarded-for')?.split(',')[0].trim()||req.headers.get('x-real-ip')||'', result_count: requests?.length||0, endpoint: 'mcp_post' })
        return NextResponse.json({
          jsonrpc: '2.0', id,
          result: { content: [{ type: 'text', text: JSON.stringify(requests || []) }] }
        }, { headers })
      } else if (name === 'get_deals') {
        const region = (args.region || 'all').toLowerCase()
        let deals: any
        if (region === 'all') {
          deals = ALIEXPRESS_DEALS
        } else if (ALIEXPRESS_DEALS[region as keyof typeof ALIEXPRESS_DEALS]) {
          deals = { [region]: ALIEXPRESS_DEALS[region as keyof typeof ALIEXPRESS_DEALS] }
        } else {
          deals = { error: `Unknown region "${region}". Available: global, us, br, kr, fr, es, de` }
        }
        logMcpCall({ action: 'get_deals', query: region, user_agent: req.headers.get('user-agent')||'', ip: req.headers.get('x-forwarded-for')?.split(',')[0].trim()||req.headers.get('x-real-ip')||'', result_count: Object.keys(deals).length, endpoint: 'mcp_post' })
        return NextResponse.json({
          jsonrpc: '2.0', id,
          result: { content: [{ type: 'text', text: JSON.stringify(deals) }] }
        }, { headers })
      } else if (name === 'generate_usecase') {
        const query = sanitize(args.query || '', 200)
        if (!query) {
          return NextResponse.json({ jsonrpc: '2.0', id, error: { code: -32602, message: 'query is required' } }, { status: 400, headers })
        }
        try {
          const sb3 = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
          const { data: skills } = await sb3.from('skills').select('slug,name,description,category,downloads,stars').or(`name.ilike.%${query}%,description.ilike.%${query}%`).order('downloads', { ascending: false }).limit(20)
          const skillList = skills || []
          const prompt = `You are a skill selection expert. Given the user goal "${query}", evaluate these ${skillList.length} skills and select the BEST 5 for the task.\n\nFor each, provide: slug (exact), reason (1 sentence).\n\nRules: Only select genuinely relevant skills. Prefer higher-downloads.\nOutput valid JSON array ONLY: [{slug,reason}]. No markdown.\n\nSkills:${JSON.stringify(skillList.slice(0,20).map(s=>({slug:s.slug,name:s.name,category:s.category,downloads:s.downloads})))}`
          const dsKey = process.env.DEEPSEEK_API_KEY || ''
          let selected: any[] = []
          if (dsKey) {
            const controller = new AbortController()
            setTimeout(() => controller.abort(), 30000);
            const aiRes = await fetch('https://api.deepseek.com/v1/chat/completions', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${dsKey}` },
              body: JSON.stringify({ model: 'deepseek-chat', messages: [{ role: 'user', content: prompt }], max_tokens: 2000, temperature: 0.5 }),
              signal: controller.signal,
            })
            const aiData = await aiRes.json()
            let aiText = aiData?.choices?.[0]?.message?.content || ''
            aiText = aiText.replace(/<think>[\s\S]*?<\/think>/g, '').trim()
            const jsonMatch = aiText.match(/\[[\s\S]*\]/)
            if (jsonMatch) {
              try { selected = JSON.parse(jsonMatch[0]) } catch {}
            }
          }
          if (!selected.length) selected = skillList.slice(0,5).map(s=>({slug:s.slug,reason:`Top ${s.category||'general'} skill with ${s.downloads} downloads`}))
          const topSlugs = selected.map((s:any)=>s.slug)
          const details = skillList.filter((s:any)=>topSlugs.includes(s.slug))
          const result = {
            title: `AI-Powered ${query.charAt(0).toUpperCase()+query.slice(1)}`,
            description: `Use AI to ${query}. Essential skills to automate and optimize your workflow.`,
            skills: selected.map((s:any)=>{const d=details.find((x:any)=>x.slug===s.slug);return{slug:s.slug,name:d?.name||s.slug,reason:s.reason,downloads:d?.downloads||0}}),
            total_skills_evaluated: skillList.length,
          }
          logMcpCall({action:'generate_usecase',query,user_agent:req.headers.get('user-agent')||'',ip:req.headers.get('x-forwarded-for')?.split(',')[0].trim()||req.headers.get('x-real-ip')||'',result_count:selected.length,endpoint:'mcp_post'})
          return NextResponse.json({jsonrpc:'2.0',id,result:{content:[{type:'text',text:JSON.stringify(result,null,2)}]}},{headers})
        } catch(e:any) {
          return NextResponse.json({jsonrpc:'2.0',id,error:{code:-32603,message:e.message}},{status:500,headers})
        }
      } else if (name === 'score_skills') {
        const query = sanitize(args.query || args.q || '', 200)
        if (!query) {
          return NextResponse.json({jsonrpc:'2.0',id,error:{code:-32602,message:'query is required'}},{status:400,headers})
        }
        const sLeft = Math.min(parseInt(args.limit) || 20, 50)
        try {
          const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
          const { data: skills } = await sb.from('skills').select('slug,name,description,category,downloads,stars')
            .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
            .order('downloads', { ascending: false }).limit(sLeft)
          const list = skills || []
          // Six-dimension scoring
          const maxDl = Math.max(...list.map(s=>s.downloads||0), 1)
          const maxStars = Math.max(...list.map(s=>s.stars||0), 1)
          const qTokens = query.toLowerCase().split(/\s+/).filter(t=>t.length>1)
          const scored = list.map(s => {
            const dlScore = Math.min(25, Math.round(25 * (s.downloads||0) / maxDl))
            const starScore = Math.min(15, Math.round(15 * (s.stars||0) / maxStars))
            const catMatch = s.category ? (qTokens.some(t=>s.category.toLowerCase().includes(t)) ? 15 : qTokens.some(t=>s.description?.toLowerCase().includes(t)) ? 10 : 5) : 5
            const descQuality = s.description ? Math.min(15, Math.round(15 * Math.min(s.description.length, 500) / 500)) : 0
            const srcScore = s.stars > 0 ? 15 : 10 // has stars = active community
            const nameMatch = qTokens.reduce((sum,t)=>sum + (s.name?.toLowerCase().includes(t)?1:0)*(s.slug?.toLowerCase().includes(t)?2:0), 0)
            const nameScore = Math.min(10, nameMatch)
            const total = dlScore + starScore + catMatch + descQuality + srcScore + nameScore
            return {
              slug: s.slug, name: s.name, category: s.category, downloads: s.downloads, stars: s.stars,
              description: s.description?.slice(0,200),
              scores: { downloads: dlScore, stars: starScore, category_relevance: catMatch, description_quality: descQuality, source_community: srcScore, name_match: nameScore, total }
            }
          }).sort((a,b)=>b.scores.total-a.scores.total)
          logMcpCall({action:'score_skills',query,user_agent:req.headers.get('user-agent')||'',ip:req.headers.get('x-forwarded-for')?.split(',')[0].trim()||req.headers.get('x-real-ip')||'',result_count:scored.length,endpoint:'mcp_post'})
          return NextResponse.json({jsonrpc:'2.0',id,result:{content:[{type:'text',text:JSON.stringify({query,count:scored.length,results:scored},null,2)}]}},{headers})
        } catch(e:any) {
          return NextResponse.json({jsonrpc:'2.0',id,error:{code:-32603,message:e.message}},{status:500,headers})
        }
      } else if (name === 'run_pipeline') {
        // ── New run_pipeline ──
        // 1. Search ClawHub GitHub for skills → cross-ref Supabase → import missing ones
        // 2. Six-dimension scoring with full report per skill
        // 3. DeepSeek selects best 5-8 skills
        // 4. AI generates cover image (SVG design → sharp PNG → Supabase Storage)
        // 5. AI generates use case + article (references image + use case URL) + 3 tweets
        // 6. Save to Supabase (posts + use_cases), publish if requested
        // 7. Return full result
        const query = sanitize(args.query || '', 200)
        if (!query) {
          return NextResponse.json({jsonrpc:'2.0',id,error:{code:-32602,message:'query is required'}},{status:400,headers})
        }
        const publish = args.publish === true
        const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
        const dsKey = process.env.DEEPSEEK_API_KEY || ''
        const BLOG_AUTHOR = process.env.BLOG_AUTHOR || 'BytesAgain Team'

        try {
          // ─── Step 1: Discover from ClawHub + import missing skills ───
          // Search ClawHub API for skills matching the topic
          let importedSlugs: string[] = []
          try {
            const chRes = await fetch(`https://clawhub.ai/api/v1/packages?family=skill&q=${encodeURIComponent(query)}&limit=30`, {
              headers: { 'User-Agent': 'Mozilla/5.0 (compatible; BytesAgain/1.0)' },
              signal: AbortSignal.timeout(10000),
            })
            if (chRes.ok) {
              const chData = await chRes.json()
              const chItems: any[] = chData.items || chData.data || []
              // Build rows using same logic as fetch-clawhub admin route
              const rows: any[] = []
              for (const item of chItems) {
                const pkgSlug = (item.name || '').toLowerCase()
                if (!pkgSlug) continue
                const summary = (item.summary || '').replace(/\\u0000/g,'').replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g,'').slice(0,500)
                const displayName = (item.displayName || pkgSlug).replace(/\\u0000/g,'').replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g,'').slice(0,200)
                const owner = item.ownerHandle || ''
                const capTags: string[] = item.capabilityTags || []
                rows.push({
                  slug: pkgSlug,
                  name: displayName,
                  description: summary,
                  category: capTags[0] || 'clawhub',
                  tags: [...new Set([...capTags, 'clawhub'])],
                  downloads: 0,
                  stars: 0,
                  source: 'clawhub',
                  source_url: `https://clawhub.ai/${owner}/${pkgSlug}`,
                  owner,
                  version: item.latestVersion || '1.0.0',
                })
              }
              if (rows.length > 0) {
                const { data: existing } = await sb.from('skills').select('slug').in('slug', rows.map(r=>r.slug))
                const existingSet = new Set((existing||[]).map((e:any)=>e.slug))
                const newRows = rows.filter(r => !existingSet.has(r.slug))
                if (newRows.length > 0) {
                  const { error: upsertErr } = await sb.from('skills').upsert(newRows, { onConflict: 'slug', ignoreDuplicates: false })
                  if (!upsertErr) importedSlugs = newRows.map(r=>r.slug)
                }
              }
            }
          } catch (chErr) {
            console.error('ClawHub search failed, falling back to Supabase-only:', chErr)
          }

          // ─── Step 2: Combined search (Supabase + newly imported) + 6-dim scoring ───
          const { data: rawSkills } = await sb.from('skills').select('slug,name,description,category,downloads,stars,source')
            .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
            .order('downloads', { ascending: false }).limit(40)
          let skillPool = (rawSkills || []).filter((s:any) => s.source !== 'banned')
          if (!skillPool.length) {
            return NextResponse.json({jsonrpc:'2.0',id,error:{code:-32000,message:'No skills found for this topic'}},{status:404,headers})
          }

          const maxDl = Math.max(...skillPool.map((s:any)=>s.downloads||0), 1)
          const maxStars = Math.max(...skillPool.map((s:any)=>s.stars||0), 1)
          const qTokens = query.toLowerCase().split(/\s+/).filter((t:string)=>t.length>1)
          const scored = skillPool.map((s:any) => {
            const dlScore = Math.min(25, Math.round(25*(s.downloads||0)/maxDl))
            const starScore = Math.min(15, Math.round(15*(s.stars||0)/maxStars))
            const catMatch = s.category ? (
              qTokens.some((t:string)=>s.category.toLowerCase().includes(t)) ? 15 :
              qTokens.some((t:string)=>s.description?.toLowerCase().includes(t)) ? 10 : 5
            ) : 5
            const descQ = s.description ? Math.min(15, Math.round(15*Math.min(s.description.length,500)/500)) : 0
            const srcScore = s.source === 'clawhub' || (s.stars||0) > 0 ? 15 : 10
            const nmScore = Math.min(10, qTokens.reduce((sum:number,t:string)=>sum+(s.name?.toLowerCase().includes(t)?1:0)+(s.slug?.toLowerCase().includes(t)?2:0),0))
            return {
              slug: s.slug, name: s.name, category: s.category, downloads: s.downloads,
              stars: s.stars, description: s.description?.slice(0,200), source: s.source,
              _scores: { downloads: dlScore, stars: starScore, category_relevance: catMatch, description_quality: descQ, source_diversity: srcScore, name_match: nmScore },
              _score: dlScore + starScore + catMatch + descQ + srcScore + nmScore
            }
          }).sort((a:any,b:any)=>b._score-a._score)

          // ─── Step 3: DeepSeek selects best 5-8 ───
          const topScored = scored.slice(0, 15)
          let selected: {slug:string;reason:string}[] = []
          if (dsKey) {
            const selPrompt = `You are a skill curation expert. User goal: "${query}".

Evaluate these ${topScored.length} AI skills. Select the 5-8 BEST for the task.

CRITICAL RULES:
- Only select genuinely relevant skills (must help achieve the goal)
- Prefer higher-download skills when relevance is equal
- Give each selected skill a 1-sentence, specific reason (not generic)
- Reject skills that are tangentially related or irrelevant

Output ONLY valid JSON array — no markdown, no preamble:
[{"slug": "exact-slug", "reason": "why this skill helps with this specific goal (max 15 words)"}]

Skills:
${JSON.stringify(topScored.map((s:any)=>({slug:s.slug,name:s.name,category:s.category,downloads:s.downloads,score:s._score,description:s.description?.slice(0,200)})))}`

            const selRes = await fetch('https://api.deepseek.com/v1/chat/completions',{
              method:'POST',
              headers:{'Content-Type':'application/json','Authorization':`Bearer ${dsKey}`},
              body:JSON.stringify({model:'deepseek-chat',messages:[{role:'user',content:selPrompt}],max_tokens:2000,temperature:0.4}),
              signal:AbortSignal.timeout(30000),
            })
            let selText = (await selRes.json())?.choices?.[0]?.message?.content || ''
            selText = selText.replace(/<think>[\s\S]*?<\/think>/g,'').trim()
            const jm = selText.match(/\[[\s\S]*\]/)
            if (jm) { try { selected = JSON.parse(jm[0]) } catch {} }
          }
          if (!selected.length) selected = topScored.slice(0,5).map((s:any)=>({slug:s.slug,reason:`Top ${s.category||'general'} skill with ${s.downloads||0} downloads`}))

          // Build full + scoring details for selected skills
          const selectedSlugs = new Set(selected.map(s=>s.slug))
          const skillDetails = selected.map((s:any)=>{
            const d = scored.find((x:any)=>x.slug===s.slug)
            return {
              slug: s.slug, name: d?.name||s.slug, category: d?.category||'',
              downloads: d?.downloads||0, stars: d?.stars||0, source: d?.source||'',
              scores: d?._scores||{},
              total_score: d?._score||0,
              reason: s.reason
            }
          })

          // ─── Step 4: Generate cover image (AI designs SVG, sharp renders) ───
          const now = new Date().toISOString()
          const postSlug = query.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,60) + '-' + Math.random().toString(36).slice(2,6)
          let coverImageUrl: string | null = null
          let coverSvgDesign: string = ''
          try {
            if (dsKey) {
              const imgDesignPrompt = `Design a 1792×1024 hero image for an article about "${query}". 
The article features these AI skills: ${skillDetails.map((s:any)=>s.name).join(', ')}.

Respond with ONLY valid JSON (no markdown, no explanation):
{
  "gradient_start": "dark color hex",
  "gradient_end": "dark color hex",
  "accent_color": "vibrant accent hex",
  "secondary_accent": "secondary accent hex",
  "emoji_icon": "single emoji representing the topic",
  "layout_style": "one of: center-title, left-title-with-list, grid-style",
  "text_color_primary": "hex for title",
  "text_color_secondary": "hex for subtitle"
}

Make it look professional, dark theme tech blog style. Use colors that fit the topic.`
              const designRes = await fetch('https://api.deepseek.com/v1/chat/completions',{
                method:'POST',
                headers:{'Content-Type':'application/json','Authorization':`Bearer ${dsKey}`},
                body:JSON.stringify({model:'deepseek-chat',messages:[{role:'user',content:imgDesignPrompt}],max_tokens:500,temperature:0.7}),
                signal:AbortSignal.timeout(15000),
              })
              let designText = (await designRes.json())?.choices?.[0]?.message?.content || ''
              designText = designText.replace(/<think>[\s\S]*?<\/think>/g,'').trim()
              designText = designText.replace(/^\\\`\\\`\\\`json?/gm,'').replace(/\\\`\\\`\\\`$/gm,'').trim()
              const dm = designText.match(/\{[\s\S]*\}/)
              if (dm) { try { coverSvgDesign = JSON.parse(dm[0]); coverSvgDesign = typeof coverSvgDesign === 'string' ? coverSvgDesign : JSON.stringify(coverSvgDesign) } catch {} }
            }
          } catch (designErr) {
            console.error('Image design prompt failed, using defaults:', designErr)
          }

          // Parse or default SVG design
          let design: any = {}
          try { design = JSON.parse(typeof coverSvgDesign === 'string' ? coverSvgDesign : '{}') } catch {}
          const bg1 = design.gradient_start || '#0f172a'
          const bg2 = design.gradient_end || '#1e1b4b'
          const acc = design.accent_color || '#6366f1'
          const acc2 = design.secondary_accent || '#a855f7'
          const icon = escapeXml(design.emoji_icon || '\u{1F916}')
          const textMain = design.text_color_primary || '#e2e8f0'
          const textSec = design.text_color_secondary || '#94a3b8'

          try {
            const titleSafe = escapeXml(query.slice(0, 60).charAt(0).toUpperCase() + query.slice(1))
            const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1792" height="1024" viewBox="0 0 1792 1024">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${bg1}"/>
      <stop offset="100%" style="stop-color:${bg2}"/>
    </linearGradient>
    <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:${acc}"/>
      <stop offset="100%" style="stop-color:${acc2}"/>
    </linearGradient>
  </defs>
  <rect width="1792" height="1024" fill="url(#bg)"/>
  <rect x="0" y="0" width="14" height="1024" fill="url(#accent)"/>
  <text x="100" y="200" font-family="system-ui,sans-serif" font-size="64" font-weight="700" fill="${textMain}">${titleSafe}</text>
  <text x="100" y="280" font-family="system-ui,sans-serif" font-size="40" fill="${textSec}">AI-Powered Skill Stack</text>
  <text x="100" y="400" font-family="system-ui,sans-serif" font-size="80">${icon}</text>
  <rect x="100" y="500" width="400" height="4" fill="${acc}"/>
  <text x="100" y="560" font-family="system-ui,sans-serif" font-size="28" fill="${textSec}">Selected Skills:</text>
  ${skillDetails.slice(0,6).map((s:any,i:number) => `<text x="100" y="${620+i*56}" font-family="system-ui,sans-serif" font-size="26" fill="${textMain}">\u2022 ${escapeXml(s.name)}</text>`).join('\n')}
  <text x="100" y="950" font-family="system-ui,sans-serif" font-size="24" fill="#64748b">bytesagain.com</text>
  <text x="1692" y="950" font-family="system-ui,sans-serif" font-size="24" fill="#64748b" text-anchor="end">AI Skills Platform</text>
</svg>`

            const sharpMod = await import('sharp')
            const sharp = sharpMod.default
            const pngBuf = await sharp(Buffer.from(svg)).resize(1792,1024).png().toBuffer()

            const { data: uploadData } = await sb.storage
              .from('article-images')
              .upload(`${postSlug}.png`, pngBuf, { contentType: 'image/png', upsert: true })
            if (uploadData) {
              const { data: { publicUrl } } = sb.storage.from('article-images').getPublicUrl(`${postSlug}.png`)
              coverImageUrl = publicUrl
            }
          } catch (imgErr) {
            console.error('Cover image generation failed:', imgErr)
          }

          // ─── Step 5: Generate use case + article + tweets ───
          const ucUrl = `https://bytesagain.com/use-case/${postSlug}`
          const imgUrl = coverImageUrl || `https://jfpeycpiyayrpjldppzq.supabase.co/storage/v1/object/public/article-images/${postSlug}.png`

          let usecase: any = null
          let article: any = null
          let tweets: any[] = []

          if (dsKey) {
            const genPrompt = `You are a content strategist. Generate a complete content package for "${query}".

Selected AI skills:
${JSON.stringify(skillDetails,null,2)}

Cover image URL (reference in article): ${imgUrl}
Use case URL (reference in article): ${ucUrl}

Output valid JSON ONLY — no markdown, no explanation, exactly this structure:
{
  "usecase": {
    "slug": "${postSlug}",
    "title": "Action-Oriented Title (3-6 words) for ${query}",
    "description": "One sentence: what task can users automate? Be specific and practical. Include the specific topic.",
    "icon": "single emoji representing the topic",
    "searchLink": "/skills?q=${encodeURIComponent(query)}"
  },
  "article": {
    "title": "Compelling blog post title for ${query} (6-12 words)",
    "content": "Full 800-1200 word article in markdown. Structure: ## Executive Summary (2-3 sentences), ## Why This Matters (2-3 paragraphs), ## The Skill Stack (for EACH selected skill: ### [Skill name] — 1-line intro + 2-3 paragraphs of setup/usage/results + > **Tip:** callout), ## Getting Started (\\`clawhub install <slug>\\` for each skill), ## Real-World Results (1-2 paragraphs with specific metrics), ## Next Steps (call to action).\n\nIMPORTANT: In the article, include this image at the start: ![${query} cover image](${imgUrl})\nAlso link to the use case page: [View the complete use case for ${query}](${ucUrl})\nUse natural helpful tone, not salesy."
  },
  "tweets": [
    {"tweet": "Tweet draft 1 for ${query} — promotional, includes key benefit, emojis. Max 280 chars. Include link: ${ucUrl}"},
    {"tweet": "Tweet draft 2 — tip/insight angle. Max 280 chars."},
    {"tweet": "Tweet draft 3 — use case story / social proof. Max 280 chars."}
  ]
}

ALL fields required. DO NOT wrap in markdown. Output ONLY the JSON.`

            const genRes = await fetch('https://api.deepseek.com/v1/chat/completions',{
              method:'POST',
              headers:{'Content-Type':'application/json','Authorization':`Bearer ${dsKey}`},
              body:JSON.stringify({model:'deepseek-chat',messages:[{role:'user',content:genPrompt}],max_tokens:4000,temperature:0.6}),
              signal:AbortSignal.timeout(60000),
            })
            let genText = (await genRes.json())?.choices?.[0]?.message?.content || ''
            genText = genText.replace(/<think>[\s\S]*?<\/think>/g,'').trim()
            genText = genText.replace(/^\\\`\\\`\\\`json?/gm,'').replace(/\\\`\\\`\\\`$/gm,'').trim()
            const jm = genText.match(/\{[\s\S]*\}/)
            if (jm) {
              try {
                const parsed = JSON.parse(jm[0])
                usecase = parsed.usecase
                article = parsed.article
                tweets = parsed.tweets || []
              } catch {}
            }
          }

          // Fallbacks
          if (!usecase) {
            usecase = { slug: postSlug, title: `AI for ${query.charAt(0).toUpperCase()+query.slice(1)}`, description: `Use AI to ${query}. Essential skills to automate your workflow.`, icon: '\u{1F916}', searchLink: `/skills?q=${encodeURIComponent(query)}` }
          }
          if (!article) {
            article = {
              title: `How to Use AI for ${query.charAt(0).toUpperCase()+query.slice(1)}`,
              content: `# ${query.charAt(0).toUpperCase()+query.slice(1)}\n\n![${query} cover](${imgUrl})\n\nAI can help you automate **${query}**. Here are the essential skills.\n\n## The Skill Stack\n\n${skillDetails.map((s:any,i:number)=>`### ${i+1}. ${s.name}\n${s.reason}\n\nInstall: \\`clawhub install ${s.slug}\\``).join('\n\n')}\n\n## Getting Started\n\nCheck out the [complete use case for ${query}](${ucUrl}).\n\nStart using these skills today.`
            }
          }
          if (!tweets.length) {
            tweets = skillDetails.slice(0,3).map((s:any)=>({tweet:`Try ${s.name} for ${query}! ${s.reason.slice(0,60)} ${ucUrl}`}))
          }

          // ─── Step 6: Save to Supabase ───
          let savedArticle: any = null
          let savedUseCase: any = null

          const { data: insPost, error: postErr } = await sb.from('posts').insert({
            title: article.title,
            slug: postSlug,
            content: article.content,
            category: 'AI Skills',
            author_name: BLOG_AUTHOR,
            tags: [query, ...skillDetails.map((s:any)=>s.name)],
            post_type: 'article',
            status: publish ? 'published' : 'draft',
            published_at: publish ? now : null,
          }).select('id').single()

          if (postErr) {
            console.error('Failed to save article:', postErr)
          } else {
            savedArticle = { id: insPost?.id, slug: postSlug, status: publish ? 'published' : 'draft' }
          }

          const { data: insUc, error: ucErr } = await sb.from('use_cases').insert({
            slug: postSlug,
            title: usecase.title,
            description: usecase.description,
            icon: usecase.icon || '\u{1F916}',
            searchLink: usecase.searchLink || `/skills?q=${encodeURIComponent(query)}`,
            skills: skillDetails.map((s:any)=>({slug:s.slug,name:s.name,reason:s.reason})),
            status: publish ? 'published' : 'draft',
            created_at: now,
          }).select('id').single()

          if (ucErr) {
            console.error('Failed to save use case:', ucErr)
          } else {
            savedUseCase = { id: insUc?.id, slug: postSlug }
          }

          // ─── Step 7: Return full result ───
          const pipelineResult = {
            query,
            publish,
            clawhub_imported: importedSlugs,
            scoring_report: {
              total_evaluated: skillPool.length,
              scoring_formula: {
                downloads: '25pts (relative to max)',
                stars: '15pts (relative to max)',
                category_relevance: '15pts (direct match) / 10pts (desc match) / 5pts (default)',
                description_quality: '15pts (proportional to length, cap 500 chars)',
                source_diversity: '15pts (clawhub/community) / 10pts (basic)',
                name_match: '10pts (name + slug keyword hits)',
              },
              top_scored: scored.slice(0,10).map((s:any)=>({
                slug: s.slug, name: s.name, total: s._score,
                scores: s._scores
              })),
            },
            selected_skills: {
              count: skillDetails.length,
              skills: skillDetails,
            },
            usecase: {
              ...usecase,
              url: ucUrl,
            },
            article: {
              title: article.title,
              slug: postSlug,
              word_count: article.content.split(/\s+/).length,
              url: `https://bytesagain.com/article/${postSlug}`,
              saved: !!savedArticle,
              status: savedArticle?.status || 'error',
            },
            usecase_saved: !!savedUseCase,
            tweets,
            cover_image: coverImageUrl,
          }

          logMcpCall({action:'run_pipeline',query,user_agent:req.headers.get('user-agent')||'',ip:req.headers.get('x-forwarded-for')?.split(',')[0].trim()||req.headers.get('x-real-ip')||'',result_count:skillDetails.length,endpoint:'mcp_post'})
          return NextResponse.json({jsonrpc:'2.0',id,result:{content:[{type:'text',text:JSON.stringify(pipelineResult,null,2)}]}},{headers})
        } catch(e:any) {
          return NextResponse.json({jsonrpc:'2.0',id,error:{code:-32603,message:e.message}},{status:500,headers})
        }
      } else if (name === 'install_stack') {
        // ── Skill Dock: curated pre-install bundles ──
        const STACKS: Record<string,{title:string;description:string;icon:string;skills:{slug:string;name:string;why:string}[]}> = {
          'developer-starter': {
            title: 'Developer Starter Pack', icon: '🛠️',
            description: 'Essential dev tools: shell, git, code review, debug, CI/CD — start coding smarter with AI.',
            skills: [
              {slug:'shell',name:'Shell Scripting',why:'Write, debug, and automate shell commands'},
              {slug:'code-generator',name:'Code Generator',why:'Generate boilerplate and production code'},
              {slug:'code-reviewer',name:'Code Reviewer',why:'Review pull requests with AI-driven analysis'},
              {slug:'git-commit',name:'Git Commit Assistant',why:'Write meaningful git commits'},
              {slug:'api-tester',name:'API Tester',why:'Test and debug API endpoints'},
              {slug:'debug',name:'Debug Assistant',why:'Diagnose and fix code issues'},
              {slug:'json',name:'JSON Processor',why:'Validate, format, and transform JSON'},
              {slug:'regex-helper',name:'Regex Helper',why:'Build and test regular expressions'},
            ]
          },
          'content-creator': {
            title: 'Content Creator Pack', icon: '✍️',
            description: 'Write better content: blog posts, social media, emails, ad copy, SEO-optimized text.',
            skills: [
              {slug:'blog-post-writer',name:'Blog Post Writer',why:'Generate full blog posts from outline'},
              {slug:'seo-content-optimizer',name:'SEO Content Optimizer',why:'Optimize content for search ranking'},
              {slug:'ad-copywriter',name:'Ad Copywriter',why:'Write compelling ad copy'},
              {slug:'email-marketing',name:'Email Marketing Assistant',why:'Draft marketing and transactional emails'},
              {slug:'social-poster',name:'Social Media Poster',why:'Create and schedule social content'},
              {slug:'translator-pro',name:'Translator Pro',why:'Translate content with context awareness'},
              {slug:'plagiarism-checker',name:'Plagiarism Checker',why:'Check content originality'},
            ]
          },
          'data-analyst': {
            title: 'Data Analyst Pack', icon: '📊',
            description: 'Crunch numbers: SQL queries, data visualization, spreadsheet automation, chart generation.',
            skills: [
              {slug:'sql-assistant',name:'SQL Assistant',why:'Write and optimize SQL queries'},
              {slug:'data-analysis',name:'Data Analysis Tool',why:'Analyze datasets and extract insights'},
              {slug:'chart-generator',name:'Chart Generator',why:'Generate charts and visualizations'},
              {slug:'excel-formula',name:'Excel Formula Builder',why:'Build complex Excel formulas'},
              {slug:'report-generator',name:'Report Generator',why:'Auto-generate data reports'},
              {slug:'csv',name:'CSV Processor',why:'Parse and transform CSV data'},
            ]
          },
          'crypto-trader': {
            title: 'Crypto Trader Pack', icon: '₿',
            description: 'Trade smarter: market analysis, portfolio tracking, price alerts, DeFi research.',
            skills: [
              {slug:'crypto-tracker',name:'Crypto Portfolio Tracker',why:'Track portfolio performance'},
              {slug:'defi-helper',name:'DeFi Helper',why:'Research DeFi protocols and yields'},
              {slug:'market-analysis',name:'Market Analysis Tool',why:'Analyze market trends and sentiment'},
              {slug:'chart-generator',name:'Chart Generator',why:'Generate trading charts'},
              {slug:'news-summarizer',name:'News Summarizer',why:'Stay updated on crypto news'},
            ]
          },
          'devops-engineer': {
            title: 'DevOps Engineer Pack', icon: '🐳',
            description: 'Infrastructure and deployment: Docker, k8s, terraform, CI/CD, monitoring.',
            skills: [
              {slug:'dockerfile-builder',name:'Dockerfile Builder',why:'Generate optimized Dockerfiles'},
              {slug:'k8s',name:'Kubernetes Helper',why:'Manage k8s resources and manifests'},
              {slug:'iac-scanner',name:'IaC Security Scanner',why:'Scan Terraform/CloudFormation for vulnerabilities'},
              {slug:'ci-cd',name:'CI/CD Pipeline Builder',why:'Design and debug CI/CD pipelines'},
              {slug:'log-analyzer',name:'Log Analyzer',why:'Analyze logs and system metrics'},
              {slug:'monitor',name:'Monitoring Setup',why:'Configure monitoring and alerting'},
            ]
          },
          'startup-founders': {
            title: 'Startup Founder Pack', icon: '🚀',
            description: 'Ship faster: pitch deck, landing page, product roadmaps, legal docs, user research.',
            skills: [
              {slug:'pitch-deck',name:'Pitch Deck Creator',why:'Create compelling investor pitch decks'},
              {slug:'startup-tools',name:'Startup Toolkit',why:'Essential toolkit for launching a startup'},
              {slug:'product-roadmap',name:'Product Roadmap',why:'Plan and communicate product vision'},
              {slug:'landing-page',name:'Landing Page Builder',why:'Build high-converting landing pages'},
              {slug:'legal-advisor',name:'Legal Document Advisor',why:'Draft and review legal documents'},
              {slug:'user-research',name:'User Research Assistant',why:'Conduct and analyze user research'},
            ]
          },
          'marketing-team': {
            title: 'Marketing Team Pack', icon: '📣',
            description: 'Campaigns, analytics, SEO, social media — full marketing stack.',
            skills: [
              {slug:'seo-audit',name:'SEO Audit Tool',why:'Audit website for SEO improvements'},
              {slug:'social-poster',name:'Social Media Poster',why:'Create and schedule social media posts'},
              {slug:'email-campaign',name:'Email Campaign Builder',why:'Design and automate email campaigns'},
              {slug:'competitor-analysis',name:'Competitor Analysis',why:'Analyze competitor strategies'},
              {slug:'analytics',name:'Analytics Dashboard',why:'Track campaign performance metrics'},
              {slug:'keyword-research',name:'Keyword Research Tool',why:'Research high-value keywords'},
            ]
          },
          'ai-agent-developer': {
            title: 'AI Agent Developer Pack', icon: '🤖',
            description: 'Build AI agents: prompt engineering, memory, tool integration, testing, deployment.',
            skills: [
              {slug:'prompt-optimizer',name:'Prompt Optimizer',why:'Craft and optimize AI prompts'},
              {slug:'vector-store',name:'Vector DB Helper',why:'Manage vector databases for RAG'},
              {slug:'memory-system',name:'Memory System',why:'Implement agent memory systems'},
              {slug:'agent-test',name:'Agent Testing Framework',why:'Test and validate agent behaviors'},
              {slug:'mcp-toolkit',name:'MCP Integration Toolkit',why:'Integrate MCP tools with agents'},
              {slug:'task-planner',name:'Task Planner',why:'Plan and decompose complex agent tasks'},
            ]
          },
          'security-auditor': {
            title: 'Security Auditor Pack', icon: '🔒',
            description: 'Security analysis: vulnerability scanning, penetration testing, compliance checks, threat intel.',
            skills: [
              {slug:'vuln-scanner',name:'Vulnerability Scanner',why:'Scan systems for known vulnerabilities'},
              {slug:'network-audit',name:'Network Security Auditor',why:'Audit network configurations'},
              {slug:'compliance',name:'Compliance Checker',why:'Check compliance with standards'},
              {slug:'threat-intel',name:'Threat Intelligence',why:'Analyze threat intelligence data'},
              {slug:'log-analyzer',name:'Security Log Analyzer',why:'Analyze security logs for incidents'},
            ]
          },
          'homework-helper': {
            title: 'Homework Helper Pack', icon: '📚',
            description: 'Study smarter: math solver, essay writer, research assistant, flashcard maker.',
            skills: [
              {slug:'math-solver',name:'Math Problem Solver',why:'Solve math problems step by step'},
              {slug:'essay-writer',name:'Essay Writer',why:'Write well-structured essays'},
              {slug:'research-assistant',name:'Research Assistant',why:'Find and summarize academic sources'},
              {slug:'flashcard',name:'Flashcard Generator',why:'Create study flashcards'},
              {slug:'note-taker',name:'Smart Note Taker',why:'Take and organize study notes'},
              {slug:'quiz-generator',name:'Quiz Generator',why:'Generate practice quizzes'},
            ]
          },
        }

        const stackName = sanitize(args.name || 'developer-starter', 50)
        const stack = STACKS[stackName]
        if (!stack) {
          return NextResponse.json({jsonrpc:'2.0',id,error:{code:-32602,message:`Unknown stack "${stackName}". Available: ${Object.keys(STACKS).join(', ')}`}},{status:400,headers})
        }

        const installCmds = stack.skills.map(s => `clawhub install ${s.slug}`)
        const batchScript = `#!/usr/bin/env bash\n# ${stack.title}\n# ${stack.description}\nset -e\n\n${installCmds.join('\n')}\n\necho "✅ ${stack.title} installed!"`

        logMcpCall({action:'install_stack',query:stackName,user_agent:req.headers.get('user-agent')||'',ip:req.headers.get('x-forwarded-for')?.split(',')[0].trim()||req.headers.get('x-real-ip')||'',result_count:stack.skills.length,endpoint:'mcp_post'})
        return NextResponse.json({jsonrpc:'2.0',id,result:{content:[{type:'text',text:JSON.stringify({
          stack: stackName,
          title: stack.title,
          icon: stack.icon,
          description: stack.description,
          skill_count: stack.skills.length,
          skills: stack.skills,
          install_commands: installCmds,
          install_all: `for s in ${stack.skills.map(s=>s.slug).join(' ')}; do clawhub install \"$s\"; done`,
          batch_script: batchScript,
        },null,2)}]}},{headers})
      } else if (name === 'scan_skill') {
        // ── Virus Scanner: static analysis + AI for skill safety ──
        const slug = sanitizeSlug(args.slug || '')
        if (!slug) {
          return NextResponse.json({jsonrpc:'2.0',id,error:{code:-32602,message:'slug is required'}},{status:400,headers})
        }
        const deepScan = args.deep !== false
        const dsKey = process.env.DEEPSEEK_API_KEY || ''

        try {
          // Fetch skill metadata
          const metaRes = await fetch(`https://clawhub.ai/api/v1/skills/${slug}`, {
            headers: { 'User-Agent': 'Mozilla/5.0 (compatible; BytesAgain/1.0)' },
            signal: AbortSignal.timeout(10000),
          })
          if (!metaRes.ok) {
            return NextResponse.json({jsonrpc:'2.0',id,error:{code:-32000,message:`Skill "${slug}" not found on ClawHub (HTTP ${metaRes.status})`}},{status:404,headers})
          }
          const meta = await metaRes.json()

          // Fetch the actual script content
          const pkgRes = await fetch(`https://clawhub.ai/api/v1/packages/${slug}`, {
            headers: { 'User-Agent': 'Mozilla/5.0 (compatible; BytesAgain/1.0)' },
            signal: AbortSignal.timeout(10000),
          })
          let scriptContent = ''
          if (pkgRes.ok) {
            const pkg = await pkgRes.json()
            scriptContent = pkg.files?.script || pkg.files?.main || pkg.files?.['script.sh'] || pkg.content || ''
          }

          // ── Static Analysis: pattern matching ──
          const violations: {severity:string;pattern:string;match:string;score:number;line?:number}[] = []
          let safetyScore = 100

          const patterns: {pattern:RegExp;severity:'critical'|'high'|'medium'|'low';name:string;deduction:number}[] = [
            // Critical: sensitive file reads
            {pattern:/cat\s+(\$HOME|~[\/]|\.env|\/etc\/shadow|\/etc\/passwd|~\/\.ssh|\/var\/log)/gi,severity:'critical',name:'Sensitive file read',deduction:100},
            {pattern:/(\$HOME|\/root|\/home\/[^\/]+)\/\.env/gi,severity:'critical',name:'HOME/.env access',deduction:100},
            {pattern:/cat.*~\/\.\w+.*(?:api.?key|token|secret|password)/gi,severity:'critical',name:'Credential file read',deduction:100},
            // Critical: remote code execution
            {pattern:/curl[^\n]*\|[\s]*(?:ba[sd]h|sh)/gi,severity:'critical',name:'Remote code execution (curl|bash)',deduction:100},
            {pattern:/wget[^\n]*\|[\s]*(?:ba[sd]h|sh)/gi,severity:'critical',name:'Remote code execution (wget|sh)',deduction:100},
            {pattern:/curl[^\n]*--output[^\n]*&&[\s]*(?:ba[sd]h|sh|chmod|\/)/gi,severity:'critical',name:'Remote download + execute',deduction:100},
            {pattern:/base64[^\n]*--decode[^\n]*\|[\s]*(?:ba[sd]h|sh|python|perl)/gi,severity:'critical',name:'Obfuscated script decode + exec',deduction:100},
            {pattern:/base64[^\n]*-d[^\n]*\|[\s]*(?:ba[sd]h|sh|python|perl)/gi,severity:'critical',name:'Obfuscated script decode + exec',deduction:100},
            // Critical: reverse shell
            {pattern:/\/dev\/tcp\//gi,severity:'critical',name:'Reverse shell (dev/tcp)',deduction:100},
            {pattern:/bash[\s]*-i[\s]*>/gi,severity:'critical',name:'Interactive shell',deduction:100},
            {pattern:/nc[\s]+-e/gi,severity:'critical',name:'Netcat reverse shell',deduction:100},
            {pattern:/python[\s]+-c[\s]*['"].*reverse/gi,severity:'critical',name:'Python reverse shell',deduction:100},
            // High: dangerous commands
            {pattern:/eval[\s]+/gi,severity:'high',name:'Unsafe eval() usage',deduction:50},
            {pattern:/rm[\s]+-rf[\s]+[\/\s]/gi,severity:'high',name:'Destructive rm -rf /',deduction:50},
            {pattern:/chmod[\s]+777/gi,severity:'high',name:'Excessive permissions (chmod 777)',deduction:40},
            {pattern:/>(?:\s*)\/(?:etc|usr|boot|dev|proc)/gi,severity:'high',name:'Write to system directory',deduction:50},
            // Medium: obfuscation & risks
            {pattern:/[A-Za-z0-9+/]{100,}={0,2}/gi,severity:'medium',name:'Long base64 payload (obfuscation signal)',deduction:25},
            {pattern:/sudo[\s]+/gi,severity:'medium',name:'Unsafe sudo usage',deduction:20},
            {pattern:/\$\{[^}]+\}|\$[a-zA-Z_][a-zA-Z0-9_]*={/g,severity:'medium',name:'Complex variable expansion',deduction:10},
            {pattern:/~\/\.(?:ssh|aws|gcloud|kube|docker|npmrc|gitconfig)/gi,severity:'medium',name:'Home directory service config access',deduction:25},
            // Low: spam & hygiene
            {pattern:/(?:affiliate|ref|referral|tagname|tag_id|utm_source)[\s=]/gi,severity:'low',name:'Possible referral/affiliate link',deduction:5},
            {pattern:/openclaw\.ai\/skills\/[a-z-]+-skill-[a-z0-9]+/gi,severity:'low',name:'Sponsored/generated skill name',deduction:5},
          ]

          const lines = scriptContent.split('\n')
          for (let li = 0; li < lines.length; li++) {
            const line = lines[li]
            for (const p of patterns) {
              if (p.pattern.test(line)) {
                p.pattern.lastIndex = 0
                const match = line.slice(0,120).trim()
                // Avoid duplicate pattern on same line
                if (violations.some(v => v.pattern === p.name && v.line === li+1)) continue
                violations.push({
                  severity: p.severity,
                  pattern: p.name,
                  match,
                  score: Math.max(0, safetyScore - p.deduction),
                  line: li+1,
                })
                safetyScore = Math.max(0, safetyScore - p.deduction)
              }
            }
          }

          // Bonus checks
          if (scriptContent.length > 50000) safetyScore -= 15 // oversized script
          const readme = meta.summary || meta.description || ''
          const refLinks = (readme.match(/(?:https?:\/\/)?(?:www\.)?(?:okx|binance|coinbase|crypto\.com)[^\s]*/gi) || []).length
          if (refLinks > 3) safetyScore -= 10

          // ── AI Deep Analysis ──
          let aiReview: string | null = null
          if (deepScan && dsKey && (safetyScore < 80 || violations.length > 0 || scriptContent.length > 2000)) {
            try {
              const scanPrompt = `You are a cybersecurity expert reviewing an AI agent skill for malicious behavior.

Skill: ${meta.displayName || slug} (${slug})
Owner: ${meta.ownerHandle || 'unknown'}

Script content (${scriptContent.length} chars):
\`\`\`bash\n${scriptContent.slice(0,3000)}\n\`\`\`

Static analysis found ${violations.length} violation(s):
${violations.map(v=>`- [${v.severity.toUpperCase()}] Line ${v.line}: ${v.pattern} — "${v.match.slice(0,100)}"`).join('\n')}

Tasks:
1. Is this skill malicious, safe, or suspicious? Give ONE word: SAFE / SUSPICIOUS / MALICIOUS
2. Are there any patterns the static scanner missed? (max 3)
3. What is the overall risk assessment? (one sentence)

Respond ONLY with valid JSON:
{"verdict": "SAFE|SUSPICIOUS|MALICIOUS", "missed_patterns": ["..."], "risk_assessment": "...", "recommendation": "install-ok|investigate|block"}`

              const aiRes = await fetch('https://api.deepseek.com/v1/chat/completions',{
                method:'POST',
                headers:{'Content-Type':'application/json','Authorization':`Bearer ${dsKey}`},
                body:JSON.stringify({model:'deepseek-chat',messages:[{role:'user',content:scanPrompt}],max_tokens:1000,temperature:0.2}),
                signal:AbortSignal.timeout(20000),
              })
              let aiText = (await aiRes.json())?.choices?.[0]?.message?.content || ''
              aiText = aiText.replace(/<think>[\s\S]*?<\/think>/g,'').trim()
              const jm = aiText.match(/\{[\s\S]*\}/)
              if (jm) {
                try {
                  const parsed = JSON.parse(jm[0])
                  aiReview = JSON.stringify(parsed)
                  // Adjust score based on AI verdict
                  if (parsed.verdict === 'MALICIOUS') safetyScore = Math.min(safetyScore, 20)
                  else if (parsed.verdict === 'SUSPICIOUS') safetyScore = Math.min(safetyScore, 60)
                } catch {}
              }
              if (!aiReview) aiReview = aiText.slice(0,500)
            } catch (aiErr) {
              console.error('AI scan failed:', aiErr)
            }
          }

          // Risk level
          const riskLevel = safetyScore >= 80 ? 'safe' : safetyScore >= 50 ? 'suspicious' : safetyScore >= 20 ? 'dangerous' : 'malicious'
          const recommendation = safetyScore >= 80 ? '✅ Safe to install' : safetyScore >= 50 ? '⚠️ Review violations before installing' : '🚫 Do not install — high risk'

          const result = {
            skill: { slug, name: meta.displayName || slug, owner: meta.ownerHandle || 'unknown', source: 'clawhub' },
            summary: (meta.summary || meta.description || '').slice(0,200),
            script_size: scriptContent.length,
            safety_score: Math.max(0, Math.min(100, safetyScore)),
            risk_level: riskLevel,
            recommendation,
            violations_found: violations.length,
            violations: violations.slice(0,20).map(v=>({severity:v.severity,pattern:v.pattern,match:v.match.slice(0,100),line:v.line})),
            ai_review: aiReview ? (()=>{try{return JSON.parse(aiReview)}catch{return aiReview}})() : null,
          }

          logMcpCall({action:'scan_skill',query:slug,user_agent:req.headers.get('user-agent')||'',ip:req.headers.get('x-forwarded-for')?.split(',')[0].trim()||req.headers.get('x-real-ip')||'',result_count:violations.length,endpoint:'mcp_post'})
          return NextResponse.json({jsonrpc:'2.0',id,result:{content:[{type:'text',text:JSON.stringify(result,null,2)}]}},{headers})
        } catch(e:any) {
          return NextResponse.json({jsonrpc:'2.0',id,error:{code:-32603,message:e.message}},{status:500,headers})
        }
      } else if (name === 'evaluate_skill') {
        // ── evaluate_skill: Full evaluation lab ──
        // 1. Static analysis (pattern matching)
        // 2. Docker sandbox execution (install + run + strace + log collection)
        // 3. AI evaluation (strengths, weaknesses, risks, quality grade)
        const slug = sanitizeSlug(args.slug || '')
        if (!slug) {
          return NextResponse.json({jsonrpc:'2.0',id,error:{code:-32602,message:'slug is required'}},{status:400,headers})
        }
        const testInput = sanitize(args.test_input || 'help', 200)
        const dsKey = process.env.DEEPSEEK_API_KEY || ''

        try {
          // ── Phase 1: Fetch skill metadata from ClawHub ──
          const metaRes = await fetch(`https://clawhub.ai/api/v1/skills/${slug}`, {
            headers: { 'User-Agent': 'Mozilla/5.0 (compatible; BytesAgain/1.0)' },
            signal: AbortSignal.timeout(10000),
          })
          if (!metaRes.ok) {
            return NextResponse.json({jsonrpc:'2.0',id,error:{code:-32000,message:`Skill "${slug}" not found (HTTP ${metaRes.status})`}},{status:404,headers})
          }
          const meta = await metaRes.json()

          // Fetch full package for script content
          const pkgRes = await fetch(`https://clawhub.ai/api/v1/packages/${slug}`, {
            headers: { 'User-Agent': 'Mozilla/5.0 (compatible; BytesAgain/1.0)' },
            signal: AbortSignal.timeout(10000),
          })
          let scriptContent = ''
          if (pkgRes.ok) {
            const pkg = await pkgRes.json()
            scriptContent = pkg.files?.script || pkg.files?.main || pkg.files?.['script.sh'] || pkg.content || ''
          }

          const skillInfo = {
            slug, name: meta.displayName || slug,
            owner: meta.ownerHandle || 'unknown',
            summary: (meta.summary || '').slice(0,300),
            version: meta.latestVersion || '1.0.0',
            downloads: meta.downloads || 0,
            scriptSize: scriptContent.length,
          }

          // ── Phase 2: Static analysis (reuse scan_skill logic) ──
          const violations: {severity:string;pattern:string;match:string}[] = []
          let safetyScore = 100
          const patterns: {pattern:RegExp;severity:'critical'|'high'|'medium'|'low';name:string;deduction:number}[] = [
            {pattern:/cat\s+(\$HOME|~[\/]|\.env|\/etc\/shadow|\/etc\/passwd|~\/\.ssh|\/var\/log)/gi,severity:'critical',name:'Sensitive file read',deduction:100},
            {pattern:/curl[^\n]*\|[\s]*(?:ba[sd]h|sh)/gi,severity:'critical',name:'curl|bash remote exec',deduction:100},
            {pattern:/base64[^\n]*(?:--decode|-d)[^\n]*\|[\s]*(?:ba[sd]h|sh|python|perl)/gi,severity:'critical',name:'Obfuscated exec',deduction:100},
            {pattern:/\/dev\/tcp\//gi,severity:'critical',name:'Reverse shell (dev/tcp)',deduction:100},
            {pattern:/bash[\s]*-i[\s]*>/gi,severity:'critical',name:'Interactive shell',deduction:100},
            {pattern:/nc[\s]+-e/gi,severity:'critical',name:'Netcat reverse shell',deduction:100},
            {pattern:/eval[\s]+/gi,severity:'high',name:'Unsafe eval()',deduction:50},
            {pattern:/rm[\s]+-rf[\s]+[\/\s]/gi,severity:'high',name:'Destructive rm -rf',deduction:50},
            {pattern:/chmod[\s]+777/gi,severity:'high',name:'Excessive chmod 777',deduction:40},
            {pattern:/>(?:\s*)\/(?:etc|usr|boot|dev|proc)/gi,severity:'high',name:'System dir write',deduction:50},
            {pattern:/[A-Za-z0-9+/]{100,}={0,2}/gi,severity:'medium',name:'Long base64 payload',deduction:25},
            {pattern:/sudo[\s]+/gi,severity:'medium',name:'Unsafe sudo',deduction:20},
            {pattern:/~\/\.(?:ssh|aws|gcloud|kube|docker|npmrc|gitconfig)/gi,severity:'medium',name:'Config file access',deduction:25},
            {pattern:/(?:affiliate|ref|referral|tagname|tag_id|utm_source)[\s=]/gi,severity:'low',name:'Affiliate/spam links',deduction:5},
          ]
          for (const p of patterns) {
            if (p.pattern.test(scriptContent)) {
              p.pattern.lastIndex = 0
              const match = scriptContent.match(p.pattern)?.[0]?.slice(0,80) || ''
              violations.push({severity:p.severity,pattern:p.name,match})
              safetyScore = Math.max(0, safetyScore - p.deduction)
            }
          }
          const riskLevel = safetyScore >= 80 ? 'safe' : safetyScore >= 50 ? 'suspicious' : safetyScore >= 20 ? 'dangerous' : 'malicious'

          // ── Phase 3: Docker sandbox execution ──
          let sandboxResult: any = null
          try {
            const { execSync } = require('child_process')
            const safeInput = testInput.replace(/"/g,'\\"')
            const cmd = `sudo docker run --rm skill-evaluator:latest "${slug}" "${safeInput}" 2>&1`
            const rawJson = execSync(cmd, { timeout: 60000, encoding: 'utf-8', maxBuffer: 1024*1024 })
            // Extract JSON from output (strip stderr noise)
            const jsonStart = rawJson.indexOf('{')
            const jsonEnd = rawJson.lastIndexOf('}') + 1
            if (jsonStart >= 0 && jsonEnd > jsonStart) {
              sandboxResult = JSON.parse(rawJson.slice(jsonStart, jsonEnd))
            }
          } catch (sbErr) {
            console.error('Sandbox execution failed:', sbErr)
          }

          // ── Phase 4: AI evaluation ──
          let evaluation: any = null
          if (dsKey) {
            const evalPrompt = `You are a senior AI skills evaluator. Evaluate this ClawHub skill.

SKILL: ${meta.displayName || slug} (${slug})
OWNER: ${meta.ownerHandle || 'unknown'}
SUMMARY: ${(meta.summary || '').slice(0,500)}

STATIC ANALYSIS:
- Safety score: ${safetyScore}/100
- Risk level: ${riskLevel}
- Violations found: ${violations.length} (${violations.map(v=>v.pattern).join(', ') || 'none'})

SCRIPT SIZE: ${scriptContent.length} chars

` + (sandboxResult ? `
SANDBOX EXECUTION:
- Install success: ${sandboxResult.install?.success}
- Execution success: ${sandboxResult.execution?.success}
- Exit code: ${sandboxResult.execution?.exit_code}
- Duration: ${sandboxResult.execution?.duration_ms}ms
- Output preview: ${(sandboxResult.execution?.output_preview || '').slice(0,300)}
- Syscalls: ${sandboxResult.syscall_analysis?.total_syscalls || 0} total, ${sandboxResult.syscall_analysis?.fork_clone_count || 0} forks, ${sandboxResult.syscall_analysis?.execve_count || 0} execs
` : '\nSANDBOX EXECUTION: Failed or unavailable\n') + `
Output valid JSON ONLY — no markdown, no explanation. Schema:
{
  "summary": "1-2 sentence overall assessment",
  "verified_capabilities": ["what the skill actually does — max 7 items"],
  "strengths": ["strength 1 (specific)", "strength 2 (specific)"],
  "weaknesses": ["weakness 1 (specific)", "weakness 2 (specific)"],
  "risks": ["risk 1 (if any)", "risk 2 (if any)"],
  "quality_grade": "A|B|C|D|F",
  "recommendation": "install-ok|investigate|block"
}

Be thorough, specific, and honest. If a skill seems incomplete or broken, say so.`

            try {
              const aiRes = await fetch('https://api.deepseek.com/v1/chat/completions',{
                method:'POST',
                headers:{'Content-Type':'application/json','Authorization':`Bearer ${dsKey}`},
                body:JSON.stringify({model:'deepseek-chat',messages:[{role:'user',content:evalPrompt}],max_tokens:2000,temperature:0.3}),
                signal:AbortSignal.timeout(30000),
              })
              let aiText = (await aiRes.json())?.choices?.[0]?.message?.content || ''
              aiText = aiText.replace(/<think>[\s\S]*?<\/think>/g,'').trim()
              const jm = aiText.match(/\{[\s\S]*\}/)
              if (jm) { try { evaluation = JSON.parse(jm[0]) } catch {} }
            } catch {}
          }

          // Fallback evaluation
          if (!evaluation) {
            evaluation = {
              summary: sandboxResult ? 'Skill installed and ran. See sandbox report for details.' : 'Static analysis completed. Sandbox execution unavailable.',
              verified_capabilities: ['Check sandbox output for details'],
              strengths: safetyScore >= 80 ? ['No dangerous patterns detected'] : [],
              weaknesses: violations.length > 0 ? [`Found ${violations.length} pattern violations (${violations.map(v=>v.pattern).join(', ')})`] : [],
              risks: [],
              quality_grade: safetyScore >= 80 ? 'B' : 'D',
              recommendation: safetyScore >= 80 ? 'install-ok' : 'investigate',
            }
          }

          const result = {
            skill: skillInfo,
            static_analysis: {
              safety_score: safetyScore,
              risk_level: riskLevel,
              violations_found: violations.length,
              violations,
            },
            sandbox_execution: sandboxResult ? {
              install_success: sandboxResult.install?.success,
              execution_exit_code: sandboxResult.execution?.exit_code,
              execution_duration_ms: sandboxResult.execution?.duration_ms,
              output_preview: (sandboxResult.execution?.output_preview || '').slice(0,500),
              syscall_count: sandboxResult.syscall_analysis?.total_syscalls,
              fork_count: sandboxResult.syscall_analysis?.fork_clone_count,
              exec_count: sandboxResult.syscall_analysis?.execve_count,
              strace_log: 'Available on server (docker logs)',
            } : null,
            evaluation,
          }

          logMcpCall({action:'evaluate_skill',query:slug,user_agent:req.headers.get('user-agent')||'',ip:req.headers.get('x-forwarded-for')?.split(',')[0].trim()||req.headers.get('x-real-ip')||'',result_count:violations.length,endpoint:'mcp_post'})
          return NextResponse.json({jsonrpc:'2.0',id,result:{content:[{type:'text',text:JSON.stringify(result,null,2)}]}},{headers})
        } catch(e:any) {
          return NextResponse.json({jsonrpc:'2.0',id,error:{code:-32603,message:e.message}},{status:500,headers})
        }
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
