import { NextRequest, NextResponse } from 'next/server'

const ADMIN_SECRET = process.env.ADMIN_SECRET || 'bytesagain-admin-2026'

const N8N_CATEGORIES = [
  { id: 25, name: 'AI' },
  { id: 47, name: 'AI Chatbot' },
  { id: 48, name: 'AI RAG' },
  { id: 49, name: 'AI Summarization' },
  { id: 31, name: 'Content Creation' },
  { id: 39, name: 'CRM' },
  { id: 44, name: 'Crypto Trading' },
  { id: 16, name: 'DevOps' },
  { id: 35, name: 'Document Extraction' },
  { id: 30, name: 'Document Ops' },
  { id: 36, name: 'File Management' },
  { id: 17, name: 'HR' },
  { id: 42, name: 'Internal Wiki' },
  { id: 34, name: 'Invoice Processing' },
  { id: 28, name: 'IT Ops' },
  { id: 37, name: 'Lead Generation' },
  { id: 38, name: 'Lead Nurturing' },
  { id: 27, name: 'Marketing' },
  { id: 32, name: 'Market Research' },
  { id: 51, name: 'Multimodal AI' },
  { id: 43, name: 'Personal Productivity' },
  { id: 46, name: 'Project Management' },
  { id: 2,  name: 'Sales' },
  { id: 29, name: 'SecOps' },
  { id: 33, name: 'Social Media' },
  { id: 13, name: 'Support' },
  { id: 40, name: 'Support Chatbot' },
  { id: 41, name: 'Ticket Management' },
]

async function fetchCategoryTemplates(catId: number, catName: string, limit = 6) {
  const url = `https://api.n8n.io/api/templates/search?limit=${limit}&categories=${catId}&sort=views`
  const res = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; bytesagain-research/1.0)' },
    signal: AbortSignal.timeout(8000),
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const data = await res.json()
  const items: any[] = data.workflows || []
  return items.map(t => ({
    name: t.name || '',
    description: (t.description || '').slice(0, 150),
    views: t.totalViews || 0,
  }))
}

async function generateUseCaseForCategory(
  catName: string,
  templates: any[],
  existingSlugs: string[]
): Promise<any | null> {
  const DASHSCOPE_KEY = process.env.DASHSCOPE_API_KEY
  if (!DASHSCOPE_KEY) return null

  const templateList = templates.map(t =>
    `- ${t.name} (${t.views} views): ${t.description}`
  ).join('\n')

  const prompt = `Convert this n8n automation category into a BytesAgain use case JSON.

Category: ${catName}
Top templates:
${templateList}

Existing slugs (DO NOT duplicate): ${existingSlugs.slice(0, 60).join(', ')}

Output ONLY valid JSON (no markdown, no explanation):
{
  "slug": "unique-kebab-case",
  "title": "Short Action Title (3-5 words)",
  "description": "One sentence: what task does this automate? Be specific.",
  "icon": "emoji",
  "searchLink": "/skills?q=keywords",
  "skills": [
    {"slug": "skill-slug", "name": "Name", "reason": "why helpful (8 words max)"},
    {"slug": "skill-slug", "name": "Name", "reason": "why helpful (8 words max)"},
    {"slug": "skill-slug", "name": "Name", "reason": "why helpful (8 words max)"},
    {"slug": "skill-slug", "name": "Name", "reason": "why helpful (8 words max)"},
    {"slug": "skill-slug", "name": "Name", "reason": "why helpful (8 words max)"}
  ]
}

Use real ClawHub skill slugs: story-writer, email-assistant, task-planner, scheduler, note-taker, data-analysis, shell, excel-formula, translator-pro, api-tester, sql-assistant, chart-generator, code-reviewer, report-generator, crm-manager, web-scraper, lead-generator, support-bot, invoice-parser, pdf-reader, slack-notifier, github-assistant, notion-assistant`

  const res = await fetch('https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${DASHSCOPE_KEY}`,
    },
    body: JSON.stringify({
      model: 'qwen-plus',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.6,
      max_tokens: 600,
    }),
    signal: AbortSignal.timeout(20000),
  })

  const data = await res.json()
  const content = data?.choices?.[0]?.message?.content || ''
  const match = content.match(/\{[\s\S]*\}/)
  if (!match) return null

  try {
    const uc = JSON.parse(match[0])
    if (!uc.slug || !uc.title || !uc.skills?.length) return null
    if (existingSlugs.includes(uc.slug)) return null
    return uc
  } catch {
    return null
  }
}

export async function POST(req: NextRequest) {
  const secret = req.headers.get('x-admin-secret')
  if (secret !== ADMIN_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json().catch(() => ({}))
  const existingSlugs: string[] = body.existingSlugs || []
  const catIds: number[] = body.catIds || N8N_CATEGORIES.map(c => c.id)

  const results: any[] = []
  const errors: string[] = []
  const usedSlugs = [...existingSlugs]

  // 按批次处理，避免超时
  const cats = N8N_CATEGORIES.filter(c => catIds.includes(c.id))

  for (const cat of cats) {
    try {
      const templates = await fetchCategoryTemplates(cat.id, cat.name)
      if (!templates.length) {
        errors.push(`${cat.name}: no templates`)
        continue
      }

      const uc = await generateUseCaseForCategory(cat.name, templates, usedSlugs)
      if (uc) {
        results.push({ ...uc, _category: cat.name })
        usedSlugs.push(uc.slug)
      } else {
        errors.push(`${cat.name}: AI failed`)
      }
    } catch (e: any) {
      errors.push(`${cat.name}: ${e.message}`)
    }
  }

  return NextResponse.json({
    success: true,
    generated: results.length,
    useCases: results,
    errors,
  })
}

export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret')
  if (secret !== ADMIN_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  return NextResponse.json({ status: 'ok', categories: N8N_CATEGORIES.length })
}
