import { getSkills, getArticles } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const revalidate = 3600

export async function GET() {
  try {
    const [skills, articles] = await Promise.all([
      getSkills(50),
      getArticles(20),
    ])

    const text = `# BytesAgain

> Discover AI agent skills for Claude, ChatGPT, Cursor, and every AI agent. Curated daily.

BytesAgain is a curated directory of AI agent skills (SKILL.md format), tracking downloads, quality, and new releases across ClawHub and beyond.

## Top Skills

${skills.slice(0, 20).map(s => `- [${s.name || s.slug}](https://bytesagain.com/skill/${s.slug}): ${(s.description || '').slice(0, 100)}`).join('\n')}

## Recent Articles

${articles.slice(0, 10).map(a => `- [${a.title}](https://bytesagain.com/article/${a.slug})`).join('\n')}

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
  } catch (e) {
    return new NextResponse('# BytesAgain\n\nhttps://bytesagain.com\n', {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    })
  }
}
