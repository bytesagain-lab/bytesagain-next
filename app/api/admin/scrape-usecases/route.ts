import { NextRequest, NextResponse } from 'next/server'

const ADMIN_SECRET = process.env.ADMIN_SECRET || 'bytesagain-admin-2026'

// 抓外部平台数据
async function fetchPlatformSignals(): Promise<string[]> {
  const signals: string[] = []

  // 1. HN: AI agent 相关帖子
  try {
    const hnRes = await fetch(
      'https://hn.algolia.com/api/v1/search?query=AI+agent+automate+skill+workflow&tags=story&hitsPerPage=20',
      { signal: AbortSignal.timeout(8000) }
    )
    const hn = await hnRes.json()
    for (const h of hn.hits || []) {
      if (h.title) signals.push(h.title)
    }
  } catch {}

  // 2. n8n community: Built with n8n 分类（真实用例）
  try {
    const n8nRes = await fetch(
      'https://community.n8n.io/c/built-with-n8n/15.json?page=0',
      { signal: AbortSignal.timeout(8000) }
    )
    const n8n = await n8nRes.json()
    const topics = n8n?.topic_list?.topics || []
    for (const t of topics.slice(0, 30)) {
      if (t.title) signals.push(t.title)
    }
  } catch {}

  // 3. Reddit r/productivity via JSON API
  try {
    const rdRes = await fetch(
      'https://www.reddit.com/r/productivity/search.json?q=AI+automate&sort=top&t=week&limit=20',
      {
        headers: { 'User-Agent': 'bytesagain-research/1.0' },
        signal: AbortSignal.timeout(8000)
      }
    )
    const rd = await rdRes.json()
    const posts = rd?.data?.children || []
    for (const p of posts) {
      if (p.data?.title) signals.push(p.data.title)
    }
  } catch {}

  // 4. Reddit r/artificial
  try {
    const rdRes2 = await fetch(
      'https://www.reddit.com/r/artificial/search.json?q=AI+agent+help+automate&sort=top&t=week&limit=15',
      {
        headers: { 'User-Agent': 'bytesagain-research/1.0' },
        signal: AbortSignal.timeout(8000)
      }
    )
    const rd2 = await rdRes2.json()
    const posts2 = rd2?.data?.children || []
    for (const p of posts2) {
      if (p.data?.title) signals.push(p.data.title)
    }
  } catch {}

  return signals
}

// 用 Dashscope 分析信号，生成 use case
async function generateUseCases(signals: string[]): Promise<any[]> {
  const DEEPSEEK_KEY = process.env.DEEPSEEK_API_KEY
  if (!DEEPSEEK_KEY || signals.length < 5) return []

  const prompt = `You are analyzing user requests from Reddit, HackerNews, and n8n community to identify high-demand AI agent use cases that are NOT yet covered.

Here are ${signals.length} real user posts/titles:
${signals.slice(0, 40).map((s, i) => `${i + 1}. ${s}`).join('\n')}

Our existing use case slugs (DO NOT duplicate these):
weekly-report, project-manager, remote-work, startup-founder, hr-recruiting, content-creator, social-media-manager, video-creator, podcast-creator, language-learner, academic-researcher, student-homework, crypto-investor, stock-trader, personal-finance, travel-planner, home-cooking, fitness-coach, smart-home, legal-documents, crm-sales, workflow-automation, customer-support, database-management, security-audit, content-writing, data-analysis, seo-growth, ecommerce-ops, translation-localization, health-wellness, developer-workflow

Identify 3-5 NEW high-demand use cases NOT in the list above. For each, output JSON:
{
  "slug": "kebab-case-unique-slug",
  "title": "Short Action Title (max 5 words)",
  "description": "One sentence: what task does this solve? Start with an action verb.",
  "icon": "single emoji",
  "searchLink": "/skills?q=relevant+keywords",
  "skills": [
    {"slug": "existing-clawhub-slug", "name": "Display Name", "reason": "Why this skill helps (max 10 words)"}
  ]
}

Rules:
- Each use case needs 5-6 skills
- Use real ClawHub skill slugs (common ones: story-writer, email-assistant, task-planner, scheduler, note-taker, data-analysis, shell, excel-formula, translator-pro, api-tester, sql-assistant, chart-generator, code-reviewer)
- slug must be unique and not in existing list
- Focus on tasks people actually want to automate
- Output ONLY a JSON array, no markdown, no explanation`

  try {
    const res = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEEPSEEK_KEY}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 2000,
      }),
      signal: AbortSignal.timeout(30000),
    })
    const data = await res.json()
    const content = data?.choices?.[0]?.message?.content || ''
    // 提取 JSON
    const match = content.match(/\[[\s\S]*\]/)
    if (match) {
      return JSON.parse(match[0])
    }
  } catch (e) {
    console.error('AI generation failed:', e)
  }
  return []
}

export async function POST(req: NextRequest) {
  const secret = req.headers.get('x-admin-secret')
  if (secret !== ADMIN_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    // Step 1: 抓外部信号
    const signals = await fetchPlatformSignals()
    console.log(`Fetched ${signals.length} signals`)

    if (signals.length < 5) {
      return NextResponse.json({
        success: false,
        message: 'Not enough signals',
        signalCount: signals.length,
      })
    }

    // Step 2: AI 生成 use case
    const newUseCases = await generateUseCases(signals)

    if (!newUseCases || newUseCases.length === 0) {
      return NextResponse.json({
        success: false,
        message: 'AI generated no use cases',
        signalCount: signals.length,
        sampleSignals: signals.slice(0, 5),
      })
    }

    // Step 3: 返回结果（写入文件由 cron 脚本在服务器端完成）
    return NextResponse.json({
      success: true,
      signalCount: signals.length,
      newUseCases,
      sampleSignals: signals.slice(0, 5),
    })

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret')
  if (secret !== ADMIN_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  return NextResponse.json({ status: 'ok', endpoint: 'scrape-usecases', method: 'POST' })
}
