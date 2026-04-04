import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// 中文关键词 → 英文搜索词扩展
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
}

// 英文场景词 → 更通用搜索词映射
const EN_EXPAND: Record<string, string> = {
  'claims processing': 'insurance document automation',
  'claims processor': 'insurance document automation',
  'loan processing': 'finance document automation',
  'loan processor': 'finance document automation',
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
  'bug bounty': 'security scanner',
  'architecture design': 'diagram generator',
  'cold calling': 'sales automation crm',
  'helpdesk': 'support ticket automation',
  'jira': 'project management ticket',
  'knowledge management': 'wiki note organizer',
  'learn programming': 'coding tutorial',
  'learn to code': 'coding tutorial',
  'learn python': 'python coding',
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
  'nlp': 'text analysis automation',
  'photography': 'image generation ai',
  'real estate': 'property document automation',
  'construction': 'project management automation',
}

function expandQuery(q: string): string {
  const lower = q.toLowerCase().trim()
  // 英文场景词映射（优先检查）
  for (const [term, expanded] of Object.entries(EN_EXPAND)) {
    if (lower.includes(term)) return expanded
  }
  // 中文映射
  let expanded = q
  for (const [zh, en] of Object.entries(ZH_MAP)) {
    if (q.includes(zh)) {
      expanded = en
      break
    }
  }
  return expanded
}

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get('q') || ''
  if (!q || q.length < 2) return NextResponse.json([])

  // 中文查询扩展为英文
  const searchQ = expandQuery(q)

  // 多词查询：取最长的词单独搜（避免 AND 过严），或用 websearch 模式
  const words = searchQ.trim().split(/\s+/)
  const primaryWord = words.reduce((a, b) => a.length >= b.length ? a : b, words[0] || searchQ)
  // websearch 模式支持自然语言，比 & 宽松
  const tsQuery = searchQ.trim()

  try {
    const [ftsRes, ilikeRes, chRes] = await Promise.allSettled([
      // 1. 全文搜索（快，准）
      supabase
        .from('skills')
        .select('slug, name, description, category, downloads, installs_current, stars, owner, source, source_url, tags')
        .textSearch('fts', tsQuery, { type: 'websearch', config: 'english' })
        .order('downloads', { ascending: false })
        .limit(6),

      // 2. ilike fallback — 用主要词搜，覆盖多词查询漏网
      supabase
        .from('skills')
        .select('slug, name, description, category, downloads, installs_current, stars, owner, source, source_url, tags')
        .or(`name.ilike.%${primaryWord}%,description.ilike.%${primaryWord}%`)
        .order('downloads', { ascending: false })
        .limit(6),

      // 3. ClawHub语义搜索（补充没入库的新skill）
      fetch(`https://clawhub.ai/api/v1/search?q=${encodeURIComponent(searchQ)}&limit=6`, {
        headers: { 'User-Agent': 'Mozilla/5.0' },
        next: { revalidate: 300 },
      }),
    ])

    const fts = ftsRes.status === 'fulfilled' ? (ftsRes.value.data || []) : []
    const ilike = ilikeRes.status === 'fulfilled' ? (ilikeRes.value.data || []) : []

    // 合并去重（全文优先）
    const seen = new Set<string>()
    const local: any[] = []
    for (const s of [...fts, ...ilike]) {
      if (!seen.has(s.slug)) {
        seen.add(s.slug)
        local.push({ ...s, _source: s.source || 'clawhub' })
      }
    }

    // ClawHub语义补充（本地没有的）
    let chExtra: any[] = []
    if (chRes.status === 'fulfilled' && (chRes.value as Response).ok) {
      const chData = await (chRes.value as Response).json()
      chExtra = (chData.results || [])
        .filter((s: any) => {
          const slug = `clawhub-${s.slug}`
          return !seen.has(slug) && !seen.has(s.slug)
        })
        .slice(0, 3)
        .map((s: any) => ({
          slug: `clawhub-${s.slug}`,
          name: s.displayName || s.slug,
          description: s.summary || '',
          category: '',
          downloads: 0,
          stars: 0,
          owner: s.ownerHandle || '',
          _source: 'clawhub',
        }))
    }

    // 本地结果太少时，向量搜索补充
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

    // 加权排序：向量相似度×10 + log(downloads+1)×0.5 + log(installs+1)×0.8 + stars×0.3
    const scored = combined.map((s: any) => {
      const dl = s.downloads || 0
      const inst = s.installs_current || 0
      const st = s.stars || 0
      const sim = s.similarity || 0
      const score = sim * 10 + Math.log(dl + 1) * 0.5 + Math.log(inst + 1) * 0.8 + st * 0.3
      return { ...s, _score: score }
    }).sort((a: any, b: any) => b._score - a._score)

    const results = scored.slice(0, 10)
    return NextResponse.json(results)
  } catch {
    return NextResponse.json([])
  }
}
