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
