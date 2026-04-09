import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

const STATIC_FALLBACK = `# BytesAgain

> Discover AI agent skills for Claude, ChatGPT, Cursor, and every AI agent. Curated daily.

BytesAgain is a curated directory of AI agent skills (SKILL.md format), tracking downloads, quality, and new releases across ClawHub and beyond.

## What We Do

We index 50,000+ AI agent skills from ClawHub, GitHub, LobeHub, and Dify — helping developers, creators, traders, and learners find the right skills for their workflow.

## Key Pages

- [Homepage](https://bytesagain.com)
- [All Skills](https://bytesagain.com/skills)
- [Use Cases](https://bytesagain.com/use-case)
- [All Articles](https://bytesagain.com/articles)
- [Install Skills](https://bytesagain.com/install)
- [About](https://bytesagain.com/about)
- [Contact](https://bytesagain.com/contact)

## Popular Use Cases

- [Build a SaaS Product](https://bytesagain.com/use-case/build-saas)
- [Content Creator](https://bytesagain.com/use-case/content-creator)
- [Data Analysis](https://bytesagain.com/use-case/data-analysis)
- [Crypto Research](https://bytesagain.com/use-case/crypto-research)
- [Learn Programming](https://bytesagain.com/use-case/learn-programming)
- [SEO & GEO Optimization](https://bytesagain.com/use-case/seo-geo)
- [Knowledge Base](https://bytesagain.com/use-case/knowledge-base-rag)
- [Meeting Notes](https://bytesagain.com/use-case/meeting-notes-actions)

## Contact

hello@bytesagain.com
`

export async function GET() {
  try {
    // 3秒超时，避免 Vercel Edge 10s 限制
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

> Discover AI agent skills for Claude, ChatGPT, Cursor, and every AI agent. Curated daily.

BytesAgain is a curated directory of AI agent skills (SKILL.md format), tracking downloads, quality, and new releases across ClawHub and beyond.

## Top Skills

${skills.slice(0, 20).map((s: {name?: string; slug: string; description?: string}) =>
  `- [${s.name || s.slug}](https://bytesagain.com/skill/${s.slug}): ${(s.description || '').slice(0, 100)}`
).join('\n')}

## Recent Articles

${articles.slice(0, 10).map((a: {title: string; slug: string}) =>
  `- [${a.title}](https://bytesagain.com/article/${a.slug})`
).join('\n')}

## Pages

- [Homepage](https://bytesagain.com)
- [All Skills](https://bytesagain.com/skills)
- [Use Cases](https://bytesagain.com/use-case)
- [All Articles](https://bytesagain.com/articles)
- [About](https://bytesagain.com/about)
- [Contact](https://bytesagain.com/contact)

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
