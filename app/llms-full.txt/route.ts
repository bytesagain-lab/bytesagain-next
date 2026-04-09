import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

const STATIC_FALLBACK = `# BytesAgain — Full Content Index

> Curated AI agent skills for Claude, ChatGPT, Cursor, and every AI agent.

BytesAgain is the skill recommendation platform for the open SKILL.md ecosystem.
We curate, categorize, and recommend skills from 50,000+ sources worldwide.

## About

BytesAgain helps users find the right AI skills for their role and goals.
Features: role-based recommendations, semantic search, use-case packs, MCP API.

API: https://bytesagain.com/api/mcp
MCP endpoint: https://bytesagain.com/api/mcp?action=search&q=<query>

## Use Cases

- Build SaaS: https://bytesagain.com/use-case/build-saas
- Content Creator: https://bytesagain.com/use-case/content-creator
- Data Analysis: https://bytesagain.com/use-case/data-analysis
- Crypto Research: https://bytesagain.com/use-case/crypto-research
- Learn Programming: https://bytesagain.com/use-case/learn-programming
- SEO & GEO Optimization: https://bytesagain.com/use-case/seo-geo
- Knowledge Base: https://bytesagain.com/use-case/knowledge-base-rag
- Meeting Notes: https://bytesagain.com/use-case/meeting-notes-actions
- Travel Planning: https://bytesagain.com/use-case/travel-planner
- Health & Fitness: https://bytesagain.com/use-case/health-fitness
- Startup Founder: https://bytesagain.com/use-case/startup-founder
- Stock Investor: https://bytesagain.com/use-case/stock-investor

## Pages

- Homepage: https://bytesagain.com
- All Skills: https://bytesagain.com/skills
- Use Cases: https://bytesagain.com/use-case
- Articles: https://bytesagain.com/articles
- Install: https://bytesagain.com/install
- About: https://bytesagain.com/about

## Contact

hello@bytesagain.com
https://bytesagain.com
`

export async function GET() {
  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 3000)

    const [skillsRes, articlesRes] = await Promise.allSettled([
      fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/skills?select=slug,name,description,category,downloads&order=downloads.desc&limit=200`, {
        headers: {
          apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!}`,
        },
        signal: controller.signal,
      }),
      fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/posts?select=slug,title,category,published_at&status=eq.published&order=published_at.desc&limit=50`, {
        headers: {
          apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!}`,
        },
        signal: controller.signal,
      }),
    ])
    clearTimeout(timeout)

    const skills = skillsRes.status === 'fulfilled' && skillsRes.value.ok
      ? await skillsRes.value.json() : []
    const articles = articlesRes.status === 'fulfilled' && articlesRes.value.ok
      ? await articlesRes.value.json() : []

    if (skills.length === 0 && articles.length === 0) throw new Error('DB unavailable')

    const text = `# BytesAgain — Full Content Index

> Curated AI agent skills for Claude, ChatGPT, Cursor, and every AI agent.

BytesAgain is the skill recommendation platform for the open SKILL.md ecosystem.
We curate, categorize, and recommend skills from 50,000+ sources worldwide.

## About

BytesAgain helps users find the right AI skills for their role and goals.
Features: role-based recommendations, semantic search, use-case packs, MCP API.

API: https://bytesagain.com/api/mcp
MCP endpoint: https://bytesagain.com/api/mcp?action=search&q=<query>

## All Skills (${skills.length} listed)

${skills.map((s: {name?: string; slug: string; category?: string; downloads?: number; description?: string}) =>
  `### ${s.name || s.slug}
- URL: https://bytesagain.com/skill/${s.slug}
- Category: ${s.category || 'General'}
- Downloads: ${s.downloads || 0}
- Description: ${(s.description || '').slice(0, 200)}`
).join('\n\n')}

## Articles (${articles.length} listed)

${articles.map((a: {title: string; slug: string; category?: string; published_at?: string}) =>
  `### ${a.title}
- URL: https://bytesagain.com/article/${a.slug}
- Category: ${a.category || ''}
- Published: ${a.published_at || ''}`
).join('\n\n')}

## Contact

hello@bytesagain.com
https://bytesagain.com
`
    return new NextResponse(text, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'public, max-age=3600',
      },
    })
  } catch {
    return new NextResponse(STATIC_FALLBACK, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'public, max-age=600',
      },
    })
  }
}
