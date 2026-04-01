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
  '翻译': 'translation',
  '写作': 'writing',
  '文案': 'copywriting',
  '营销': 'marketing',
  '邮件': 'email',
  '数据分析': 'data analysis',
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
  '旅游': 'travel planning',
  '食谱': 'recipe cooking',
  '学英语': 'english learning',
  '论文': 'academic paper research',
  '法律': 'legal contract',
}

function expandQuery(q: string): string {
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

  try {
    // 全文搜索（Postgres tsvector）+ fallback ilike
    const tsQuery = searchQ.trim().split(/\s+/).join(' & ')

    const [ftsRes, ilikeRes, chRes] = await Promise.allSettled([
      // 1. 全文搜索（快，准）
      supabase
        .from('skills')
        .select('slug, name, description, category, downloads, stars, owner, source, source_url, tags')
        .textSearch('fts', tsQuery, { type: 'websearch', config: 'english' })
        .order('downloads', { ascending: false })
        .limit(6),

      // 2. ilike fallback（兜底，捕捉全文搜索漏掉的）
      supabase
        .from('skills')
        .select('slug, name, description, category, downloads, stars, owner, source, source_url, tags')
        .or(`name.ilike.%${searchQ}%,description.ilike.%${searchQ}%`)
        .order('downloads', { ascending: false })
        .limit(4),

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

    const results = [...local, ...chExtra].slice(0, 10)
    return NextResponse.json(results)
  } catch {
    return NextResponse.json([])
  }
}
