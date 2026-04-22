export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const DASHSCOPE_KEY = process.env.DASHSCOPE_EMBEDDING_KEY!

// 中文关键词 → 英文搜索词扩展（快速词表）
const ZH_MAP: Record<string, string> = {
  '周报': 'weekly report',
  '日报': 'daily report',
  '月报': 'monthly report',
  '汇报': 'report summary',
  '工作总结': 'work summary report',
  '述职': 'performance review',
  '简历': 'resume cv',
  '求职': 'job hunting',
  '面试': 'interview',
  '招聘': 'recruiting hiring',
  '翻译': 'translation localization',
  '写作': 'writing content',
  '文案': 'copywriting content writing',
  '写文章': 'article blog writing',
  '写文案': 'copywriting advertising copy',
  '内容创作': 'content creation writing',
  '营销': 'marketing',
  '邮件': 'email',
  '数据分析': 'data analysis',
  '数据可视化': 'data visualization chart',
  '表格': 'spreadsheet excel',
  '项目管理': 'project management',
  '代码': 'coding',
  '爬虫': 'web scraper',
  '自动化': 'automation',
  '股票': 'stock market',
  '加密货币': 'cryptocurrency',
  '比特币': 'bitcoin',
  '健身': 'fitness workout',
  '减肥': 'weight loss diet',
  '电商': 'ecommerce product listing',
  '淘宝': 'ecommerce marketplace product',
  'seo优化': 'seo keyword ranking',
  '关键词': 'keyword research seo',
  '旅游': 'travel planning',
  '食谱': 'recipe cooking meal',
  '学英语': 'english learning',
  '论文': 'academic paper research',
  '法律': 'legal contract',
  '商业策划': 'business plan startup',
  '商业计划': 'business plan startup',
  '创业': 'startup entrepreneur',
  '学python': 'python programming tutorial',
  '学编程': 'programming coding tutorial',
  '学代码': 'coding programming tutorial',
  '策划书': 'business plan proposal',
  '报告': 'report generator',
  '设计': 'design tool ui',
  '视频': 'video creation',
  '直播': 'live stream',
  '运营': 'operations marketing',
  '财务': 'finance accounting',
  '会计': 'accounting finance',
}

// 英文场景词 → 更通用搜索词映射
const EN_EXPAND: Record<string, string> = {
  'claims processing': 'insurance document automation',
  'loan processing': 'finance document automation',
  'property management': 'real estate automation',
  'drug discovery': 'medical research ai',
  'clinical trials': 'medical research data',
  'medical diagnosis': 'healthcare ai assistant',
  'due diligence': 'document review legal',
  'risk assessment': 'analysis report generator',
  'content moderation': 'text analysis automation',
  'sentiment analysis': 'text analysis nlp',
  'patent search': 'research document search',
  'price optimization': 'data analysis ecommerce',
  'sales forecasting': 'data analysis sales',
  'lead scoring': 'crm data analysis',
  'customer feedback': 'analysis report automation',
  'employee training': 'knowledge management',
  'supply chain': 'logistics automation',
  'contract management': 'document legal automation',
  'compliance': 'document audit automation',
  'financial reporting': 'finance report generator',
  'fraud detection': 'security analysis automation',
  'image processing': 'image generation ai',
  'game development': 'coding assistant developer',
  'cloud infrastructure': 'devops automation',
  'network security': 'security scanner',
  'api integration': 'api tester automation',
  'ux design': 'design productivity',
  'product management': 'project management automation',
  'talent': 'recruiting hiring',
  'onboarding': 'hr automation workflow',
  'bookkeeping': 'finance accounting automation',
  'architecture design': 'diagram generator',
  'cold calling': 'sales automation crm',
  'helpdesk': 'support ticket automation',
  'jira': 'project management ticket',
  'knowledge management': 'wiki note organizer',
  'learn programming': 'coding tutorial',
  'learn to code': 'coding tutorial',
  'learn python': 'python coding tutorial',
  'learn javascript': 'javascript coding',
  'learn excel': 'excel spreadsheet',
  'learn sql': 'sql database',
  'learn data science': 'data analysis python',
  'learn machine learning': 'machine learning ai',
  'learn english': 'english language learning',
  'language learning': 'translation language',
  'study helper': 'note study assistant',
  'homework help': 'education study assistant',
  'programming tutorial': 'coding tutorial',
  'coding practice': 'coding assistant',
  'software development': 'coding developer assistant',
  'manufacturing': 'workflow automation',
  'photography': 'image generation ai',
  'real estate': 'property document automation',
  'construction': 'project management automation',
  'write a business plan': 'business plan startup pitch',
  'business proposal': 'business plan proposal generator',
}

function expandQuery(q: string): string {
  const lower = q.toLowerCase().trim()
  for (const [term, expanded] of Object.entries(EN_EXPAND)) {
    if (lower.includes(term)) return expanded
  }
  for (const [zh, en] of Object.entries(ZH_MAP)) {
    if (q.includes(zh)) return en
  }
  return q
}

// 判断是否需要 LLM 扩展
function needsLLM(q: string, expanded: string): boolean {
  if (expanded !== q) return false // 词表已命中
  const words = q.trim().split(/\s+/)
  if (words.length <= 2 && /^[a-zA-Z\s]+$/.test(q)) return false // 短英文不需要
  return q.length > 8 || /[\u4e00-\u9fa5]/.test(q) // 长句或中文需要
}

// LLM 意图扩展：qwen-turbo 把自然语言转成最优英文搜索词
async function llmExpandQuery(q: string): Promise<string> {
  try {
    const resp = await fetch('https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${DASHSCOPE_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'qwen-turbo',
        input: {
          messages: [{
            role: 'user',
            content: `You are a search query optimizer for an AI agent skill directory.
Convert the user's natural language intent into 3-5 concise English keywords for searching AI skills.
Output ONLY the keywords space-separated. No explanation, no punctuation, no quotes.

Examples:
"我要写商业策划书" → business plan startup pitch deck
"帮我分析股票" → stock analysis market investment
"I want to learn Python" → python coding tutorial programming
"写周报" → weekly report writing automation
"我想做一个网站" → website builder development tool

User query: "${q}"
Keywords:`
          }]
        },
        parameters: { max_tokens: 20, temperature: 0.1 }
      }),
    })
    const data = await resp.json()
    const result = data?.output?.choices?.[0]?.message?.content?.trim()
    if (result && result.length > 2 && result.length < 80) return result
  } catch { /* ignore */ }
  return q
}

export async function GET(req: NextRequest) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
  const q = req.nextUrl.searchParams.get('q') || ''
  if (!q || q.length < 2) return NextResponse.json([])

  // 1. 词表快速扩展
  let searchQ = expandQuery(q)

  // 2. 词表未命中 → LLM 意图扩展（3秒超时）
  if (needsLLM(q, searchQ)) {
    searchQ = await Promise.race([
      llmExpandQuery(q),
      new Promise<string>(resolve => setTimeout(() => resolve(q), 3000)),
    ]) as string
  }

  const words = searchQ.trim().split(/\s+/)
  const primaryWord = words.reduce((a, b) => a.length >= b.length ? a : b, words[0] || searchQ)

  try {
    const [ftsRes, ilikeRes, chRes] = await Promise.allSettled([
      // 1. 全文搜索
      supabase
        .from('skills')
        .select('slug, name, description, category, downloads, installs_current, stars, owner, source, source_url, tags, is_ours')
        .textSearch('fts', searchQ.trim(), { type: 'websearch', config: 'english' })
        .order('downloads', { ascending: false })
        .limit(6),

      // 2. ilike fallback
      supabase
        .from('skills')
        .select('slug, name, description, category, downloads, installs_current, stars, owner, source, source_url, tags, is_ours')
        .or(`name.ilike.%${primaryWord}%,description.ilike.%${primaryWord}%`)
        .order('downloads', { ascending: false })
        .limit(6),

      // 3. ClawHub disabled
      Promise.resolve(null),
    ])

    const fts = ftsRes.status === 'fulfilled' ? (ftsRes.value.data || []) : []
    const ilike = ilikeRes.status === 'fulfilled' ? (ilikeRes.value.data || []) : []

    const seen = new Set<string>()
    const local: any[] = []
    for (const s of [...fts, ...ilike]) {
      if (!seen.has(s.slug)) {
        seen.add(s.slug)
        local.push({ ...s, _source: s.source || 'clawhub' })
      }
    }

    const chExtra: any[] = [] // ClawHub disabled

    // 向量搜索补充（结果太少时）
    let vsearchExtra: any[] = []
    if (local.length < 3) {
      try {
        const vsRes = await fetch(
          `https://bytesagain.com/api/vsearch?q=${encodeURIComponent(searchQ)}`,
          { next: { revalidate: 300 } }
        )
        if (vsRes.ok) {
          const vsData = await vsRes.json()
          vsearchExtra = (vsData || [])
            .filter((s: any) => !seen.has(s.slug))
            .slice(0, 5)
            .map((s: any) => ({ ...s, _source: s.source || 'clawhub', _vsearch: true }))
        }
      } catch { /* ignore */ }
    }

    const combined = [...local, ...vsearchExtra, ...chExtra]

    // 加权排序：向量相似度 + 下载量 + 安装量 + 星标 + 自有skill加权
    const scored = combined.map((s: any) => {
      const dl = s.downloads || 0
      const inst = s.installs_current || 0
      const st = s.stars || 0
      const sim = s.similarity || 0
      const ours = s.is_ours ? 15.0 : 0  // 自有skill固定加15分
      const score = sim * 10 + Math.log(dl + 1) * 0.5 + Math.log(inst + 1) * 0.8 + st * 0.3 + ours
      return { ...s, _score: score }
    }).sort((a: any, b: any) => b._score - a._score)

    const results = scored.slice(0, 10)

    // 异步写搜索日志（不阻塞响应）
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
      || req.headers.get('x-real-ip')
      || 'unknown'
    const ua = req.headers.get('user-agent') || ''
    supabase.from('api_logs').insert({
      action: 'search',
      query: q,
      user_agent: ua,
      ip,
      result_count: results.length,
      endpoint: '/api/search',
      cache_hit: false,
    }).then(undefined, () => {})

    return NextResponse.json(results)
  } catch {
    return NextResponse.json([])
  }
}
