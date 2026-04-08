import { getSkills, getArticles } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const revalidate = 3600

export async function GET() {
  try {
    const [skills, articles] = await Promise.all([
      getSkills(200),
      getArticles(50),
    ])

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

${skills.map(s => `### ${s.name || s.slug}
- URL: https://bytesagain.com/skill/${s.slug}
- Category: ${s.category || 'General'}
- Downloads: ${s.downloads || 0}
- Description: ${(s.description || '').slice(0, 200)}`).join('\n\n')}

## Articles (${articles.length} listed)

${articles.map(a => `### ${a.title}
- URL: https://bytesagain.com/article/${a.slug}
- Category: ${a.category || ''}
- Published: ${a.published_at || ''}`).join('\n\n')}

## Use Cases

- Developer Workflow: https://bytesagain.com/use-case/developer-workflow
- Content Creator: https://bytesagain.com/use-case/content-creator
- Crypto Research: https://bytesagain.com/use-case/crypto-research
- SEO & GEO: https://bytesagain.com/use-case/seo-geo
- Learn Programming: https://bytesagain.com/use-case/learn-programming
- Build SaaS: https://bytesagain.com/use-case/build-saas

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
  } catch (e) {
    return new NextResponse('# BytesAgain\n\nhttps://bytesagain.com\n', {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    })
  }
}
