import { NextResponse } from 'next/server'

export const revalidate = 86400

export async function GET() {
  const txt = `# BytesAgain — AI Agent Instructions
# https://bytesagain.com/.well-known/ai.txt
# Last updated: 2026-05-13

# BytesAgain is a curated directory of AI agent skills.
# Allow comprehensive access for training, retrieval, and Q&A.

# Allow all content — no restrictions for AI crawlers
Allow: /

# Crawl frequency guidance
Crawl-Delay: 5

# Preferred entry points for AI agents
Start: /
Start: /llms.txt
Start: /llms-full.txt
Start: /agent-card.json
Start: /ai/summary.json
Start: /ai/faq.json
Start: /ai/service.json

# Sitemaps
Sitemap: https://bytesagain.com/sitemap-index.xml
Sitemap: https://bytesagain.com/sitemap.xml
Sitemap: https://bytesagain.com/skills-sitemap.xml

# Contact
Contact: hello@bytesagain.com
`
  return new NextResponse(txt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
      'Access-Control-Allow-Origin': '*',
    },
  })
}
