import { NextRequest, NextResponse } from 'next/server'

const ADMIN_SECRET = process.env.ADMIN_SECRET || 'bytesagain-admin-2026'

const N8N_CATEGORIES = [
  { id: 25, name: 'AI', desc: 'Build AI agents that automate complex multi-step tasks using LLMs' },
  { id: 47, name: 'AI Chatbot', desc: 'Deploy chatbots that answer questions from your knowledge base' },
  { id: 48, name: 'AI RAG', desc: 'Chat with documents, PDFs, and knowledge bases using RAG' },
  { id: 49, name: 'AI Summarization', desc: 'Auto-summarize emails, documents, meeting notes, and web pages' },
  { id: 31, name: 'Content Creation', desc: 'Auto-generate blog posts, newsletters, social content from templates' },
  { id: 39, name: 'CRM', desc: 'Sync contacts, update deals, log activities across HubSpot, Salesforce' },
  { id: 44, name: 'Crypto Trading', desc: 'Monitor crypto prices, execute trades, track portfolio and send alerts' },
  { id: 16, name: 'DevOps', desc: 'Automate CI/CD pipelines, monitor deployments, handle GitHub webhooks' },
  { id: 35, name: 'Document Extraction', desc: 'Extract structured data from PDFs, invoices, receipts automatically' },
  { id: 30, name: 'Document Ops', desc: 'Convert, merge, split, process documents across cloud storage' },
  { id: 36, name: 'File Management', desc: 'Organize, rename, move, backup files automatically across cloud services' },
  { id: 17, name: 'HR', desc: 'Automate job posting, candidate screening, onboarding document workflows' },
  { id: 42, name: 'Internal Wiki', desc: 'Build team knowledge bases, auto-update docs from Notion and Confluence' },
  { id: 34, name: 'Invoice Processing', desc: 'Extract invoice data, reconcile payments, sync to accounting software' },
  { id: 28, name: 'IT Ops', desc: 'Monitor servers, auto-respond to alerts, manage infrastructure incidents' },
  { id: 37, name: 'Lead Generation', desc: 'Scrape leads, enrich contact data, auto-qualify prospects into CRM' },
  { id: 38, name: 'Lead Nurturing', desc: 'Send personalized email sequences and score leads automatically' },
  { id: 27, name: 'Marketing', desc: 'Automate social posting, track campaigns, sync marketing analytics' },
  { id: 32, name: 'Market Research', desc: 'Monitor competitors, track industry news, aggregate market data' },
  { id: 51, name: 'Multimodal AI', desc: 'Process images, audio, video with AI — transcription and analysis' },
  { id: 43, name: 'Personal Productivity', desc: 'Automate task management, email triage, calendar and reminders' },
  { id: 46, name: 'Project Management', desc: 'Sync tasks across Jira/Linear/Asana, generate status reports' },
  { id: 2,  name: 'Sales', desc: 'Automate outreach sequences, track deals, generate proposals automatically' },
  { id: 29, name: 'SecOps', desc: 'Monitor security alerts, automate incident response, scan vulnerabilities' },
  { id: 33, name: 'Social Media', desc: 'Schedule posts, monitor mentions, auto-reply across social platforms' },
  { id: 13, name: 'Support', desc: 'Route tickets, generate replies, escalate urgent issues automatically' },
  { id: 40, name: 'Support Chatbot', desc: 'Deploy AI support chatbots with knowledge base integration' },
  { id: 41, name: 'Ticket Management', desc: 'Auto-create, prioritize, assign support tickets from multiple channels' },
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
  catDesc: string,
  existingSlugs: string[]
): Promise<any | null> {
  const DASHSCOPE_KEY = process.env.DASHSCOPE_API_KEY
  if (!DASHSCOPE_KEY) return null

  const prompt = `Create a BytesAgain use case for this automation category.

Category: ${catName}
What users automate: ${catDesc}

Existing slugs (DO NOT use): ${existingSlugs.slice(0, 80).join(', ')}

Output ONLY valid JSON (no markdown):
{
  "slug": "unique-kebab-case",
  "title": "Short Action Title (3-5 words)",
  "description": "One sentence: what task can users automate? Be specific and practical.",
  "icon": "single emoji",
  "searchLink": "/skills?q=keyword1+keyword2",
  "skills": [
    {"slug": "skill-slug", "name": "Display Name", "reason": "why helpful (8 words max)"},
    {"slug": "skill-slug", "name": "Display Name", "reason": "why helpful (8 words max)"},
    {"slug": "skill-slug", "name": "Display Name", "reason": "why helpful (8 words max)"},
    {"slug": "skill-slug", "name": "Display Name", "reason": "why helpful (8 words max)"},
    {"slug": "skill-slug", "name": "Display Name", "reason": "why helpful (8 words max)"}
  ]
}

Use real ClawHub skill slugs: story-writer, email-assistant, task-planner, scheduler, note-taker, data-analysis, shell, excel-formula, translator-pro, api-tester, sql-assistant, chart-generator, code-reviewer, report-generator, crm-manager, web-scraper, lead-generator, support-bot, invoice-parser, pdf-reader, slack-notifier, github-assistant, notion-assistant, hubspot-sync, crypto-tracker, security-scanner, social-poster, ticket-manager, document-processor`

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
      const uc = await generateUseCaseForCategory(cat.name, cat.desc || cat.name, usedSlugs)
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
