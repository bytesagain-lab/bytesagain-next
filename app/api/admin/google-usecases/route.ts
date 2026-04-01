import { NextRequest, NextResponse } from 'next/server'

const ADMIN_SECRET = process.env.ADMIN_SECRET || 'bytesagain-admin-2026'

export async function POST(req: NextRequest) {
  const secret = req.headers.get('x-admin-secret')
  if (secret !== ADMIN_SECRET) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { terms = [], existingSlugs = [] } = await req.json().catch(() => ({}))
  if (!terms.length) return NextResponse.json({ error: 'no terms' }, { status: 400 })

  const DASHSCOPE_KEY = process.env.DASHSCOPE_API_KEY
  if (!DASHSCOPE_KEY) return NextResponse.json({ error: 'no key' }, { status: 500 })

  const termsText = terms.map((t: string) => `- ${t}`).join('\n')
  const skipList = existingSlugs.slice(0, 60).join(', ')

  const prompt = `Convert these user search queries into BytesAgain use cases.

Search queries:
${termsText}

Skip if slug duplicates: ${skipList}

Return JSON array (one per query, skip duplicates):
[{"slug":"kebab","title":"3-5 words","description":"one sentence","icon":"emoji","searchLink":"/skills?q=terms","skills":[{"slug":"s","name":"n","reason":"r"},{"slug":"s","name":"n","reason":"r"},{"slug":"s","name":"n","reason":"r"},{"slug":"s","name":"n","reason":"r"},{"slug":"s","name":"n","reason":"r"}]}]

Skill slugs: email-assistant,task-planner,data-analysis,chart-generator,report-generator,code-reviewer,web-scraper,api-tester,sql-assistant,pdf-reader,invoice-parser,slack-notifier,crm-manager,lead-generator,support-bot,social-poster,security-scanner,note-taker,scheduler,translator-pro,github-assistant,notion-assistant,crypto-tracker,excel-formula,shell,story-writer

Output ONLY the JSON array, nothing else.`

  const res = await fetch('https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${DASHSCOPE_KEY}` },
    body: JSON.stringify({
      model: 'qwen-plus',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.6,
      max_tokens: 2000,
    }),
    signal: AbortSignal.timeout(25000),
  })

  const data = await res.json()
  const content = data?.choices?.[0]?.message?.content || ''
  const match = content.match(/\[[\s\S]*\]/)
  if (!match) return NextResponse.json({ useCases: [], raw: content })

  try {
    const useCases = JSON.parse(match[0])
    // 过滤重复 slug
    const filtered = useCases.filter((uc: any) =>
      uc.slug && uc.title && uc.skills?.length && !existingSlugs.includes(uc.slug)
    )
    return NextResponse.json({ useCases: filtered, total: filtered.length })
  } catch {
    return NextResponse.json({ useCases: [], raw: content })
  }
}

export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret')
  if (secret !== ADMIN_SECRET) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  return NextResponse.json({ status: 'ok', endpoint: 'google-usecases' })
}
