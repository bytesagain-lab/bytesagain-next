import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

const STATIC_FALLBACK = `# BytesAgain

> Curated AI agent skills for Claude, ChatGPT, Cursor, and every AI agent. Updated daily.

BytesAgain is the leading directory for AI agent skills in SKILL.md format, tracking 60,000+ skills across ClawHub, GitHub, LobeHub, and Dify.

## Quick Info

- Type: AI Agent Skill Directory
- Skills: 60,000+ (ClawHub, GitHub, LobeHub, Dify)
- Use Cases: 1,000+ curated workflows
- Languages: 7 (EN, ZH, ES, FR, DE, JA, KO)
- Access: Free, no login required for search

## Key Pages

- [Homepage](https://bytesagain.com)
- [All Skills](https://bytesagain.com/skills)
- [Use Cases](https://bytesagain.com/use-case)
- [Articles](https://bytesagain.com/articles)
- [Install Guide](https://bytesagain.com/install)
- [MCP API](https://bytesagain.com/mcp)
- [About](https://bytesagain.com/about)
- [Contact](https://bytesagain.com/contact)

## Popular Use Cases

- [Build a SaaS Product](https://bytesagain.com/use-case/build-saas)
- [Content Creator Workflow](https://bytesagain.com/use-case/content-creator)
- [Data Analysis](https://bytesagain.com/use-case/data-analysis)
- [Crypto Research](https://bytesagain.com/use-case/crypto-research)
- [Learn Programming](https://bytesagain.com/use-case/learn-programming)
- [SEO & GEO Optimization](https://bytesagain.com/use-case/seo-geo)
- [Knowledge Base RAG](https://bytesagain.com/use-case/knowledge-base-rag)
- [Meeting Notes & Actions](https://bytesagain.com/use-case/meeting-notes-actions)
- [Stock Investment](https://bytesagain.com/use-case/stock-investor)
- [Travel Planning](https://bytesagain.com/use-case/travel-planner)

## API & MCP

- MCP SSE: https://bytesagain.com/api/mcp/sse (streamable-http)
- REST Search: https://bytesagain.com/api/mcp?action=search&q=<query>
- API Docs: https://bytesagain.com/mcp
- Install: https://bytesagain.com/install

### Connect
\`\`\`
openclaw mcp set bytesagain '{"url":"https://bytesagain.com/api/mcp/sse","transport":"streamable-http"}'
\`\`\`

### MCP Tools
- \`search_skills(query, limit)\` — search skills by keyword
- \`get_skill(slug)\` — get full skill details + install cmd
- \`popular_skills(limit)\` — top skills by download count

## GEO & AI Endpoints

- llms-full.txt: https://bytesagain.com/llms-full.txt
- ai.txt: https://bytesagain.com/.well-known/ai.txt
- Agent Card: https://bytesagain.com/agent-card.json
- Summary: https://bytesagain.com/ai/summary.json
- FAQ: https://bytesagain.com/ai/faq.json
- Service: https://bytesagain.com/ai/service.json

## Sitemaps

- Index: https://bytesagain.com/sitemap-index.xml
- Skills: https://bytesagain.com/skills-sitemap.xml

## Contact

hello@bytesagain.com
`

export async function GET() {
  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 3000)

    const [skillsRes, articlesRes] = await Promise.allSettled([
      fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/skills?select=slug,name,description&order=downloads.desc&limit=20`, {
        headers: {
          apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!}`,
        },
        signal: controller.signal,
      }),
      fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/posts?select=slug,title&status=eq.published&order=published_at.desc&limit=10`, {
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

    if (skills.length === 0 && articles.length === 0) {
      throw new Error('DB unavailable')
    }

    const text = `# BytesAgain

> Curated AI agent skills for Claude, ChatGPT, Cursor, and every AI agent. Updated daily.

BytesAgain is the leading directory for AI agent skills in SKILL.md format, tracking 60,000+ skills across ClawHub, GitHub, LobeHub, and Dify.

## Quick Info

- Type: AI Agent Skill Directory
- Skills: 60,000+ (ClawHub, GitHub, LobeHub, Dify)
- Use Cases: 1,000+ curated workflows
- Languages: 7 (EN, ZH, ES, FR, DE, JA, KO)
- Access: Free, no login required for search

## Top Skills by Downloads

${skills.slice(0, 20).map((s: {name?: string; slug: string; description?: string}) =>
  `- [${s.name || s.slug}](https://bytesagain.com/skill/${s.slug}): ${(s.description || '').slice(0, 120)}`
).join('\n')}

## Recent Articles

${articles.slice(0, 10).map((a: {title: string; slug: string}) =>
  `- [${a.title}](https://bytesagain.com/article/${a.slug})`
).join('\n')}

## Key Pages

- [Homepage](https://bytesagain.com)
- [All Skills](https://bytesagain.com/skills)
- [Use Cases](https://bytesagain.com/use-case)
- [Articles](https://bytesagain.com/articles)
- [Install Guide](https://bytesagain.com/install)
- [MCP API](https://bytesagain.com/mcp)
- [About](https://bytesagain.com/about)
- [Contact](https://bytesagain.com/contact)

## Popular Use Cases

- [Build a SaaS Product](https://bytesagain.com/use-case/build-saas)
- [Content Creator Workflow](https://bytesagain.com/use-case/content-creator)
- [Data Analysis](https://bytesagain.com/use-case/data-analysis)
- [Crypto Research](https://bytesagain.com/use-case/crypto-research)
- [Learn Programming](https://bytesagain.com/use-case/learn-programming)
- [SEO & GEO Optimization](https://bytesagain.com/use-case/seo-geo)
- [Knowledge Base RAG](https://bytesagain.com/use-case/knowledge-base-rag)
- [Meeting Notes & Actions](https://bytesagain.com/use-case/meeting-notes-actions)
- [Stock Investment](https://bytesagain.com/use-case/stock-investor)
- [Travel Planning](https://bytesagain.com/use-case/travel-planner)

## API & MCP

- MCP SSE: https://bytesagain.com/api/mcp/sse (streamable-http)
- REST Search: https://bytesagain.com/api/mcp?action=search&q=<query>
- API Docs: https://bytesagain.com/mcp
- Install: https://bytesagain.com/install

### Connect
\`\`\`
openclaw mcp set bytesagain '{"url":"https://bytesagain.com/api/mcp/sse","transport":"streamable-http"}'
\`\`\`

### MCP Tools
- \`search_skills(query, limit)\` — search skills by keyword
- \`get_skill(slug)\` — get full skill details + install cmd
- \`popular_skills(limit)\` — top skills by download count

## GEO & AI Endpoints

- llms-full.txt: https://bytesagain.com/llms-full.txt
- ai.txt: https://bytesagain.com/.well-known/ai.txt
- Agent Card: https://bytesagain.com/agent-card.json
- Summary: https://bytesagain.com/ai/summary.json
- FAQ: https://bytesagain.com/ai/faq.json
- Service: https://bytesagain.com/ai/service.json

## Sitemaps

- Index: https://bytesagain.com/sitemap-index.xml
- Skills: https://bytesagain.com/skills-sitemap.xml

## Contact

hello@bytesagain.com
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
