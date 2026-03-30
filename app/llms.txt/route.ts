import { getSkills, getArticles } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function GET() {
  const [skills, articles] = await Promise.all([
    getSkills(50),
    getArticles(20),
  ])

  const text = `# BytesAgain

> Discover 900+ AI agent skills for Claude, ChatGPT, Cursor, and every AI agent. Curated daily.

BytesAgain is a curated directory of AI agent skills (SKILL.md format), tracking downloads, quality, and new releases across ClawHub and beyond.

## Top Skills

${skills.slice(0, 20).map(s => `- [${s.name || s.slug}](https://bytesagain.com/skill/${s.slug}): ${(s.description || '').slice(0, 100)}`).join('\n')}

## Recent Articles

${articles.slice(0, 10).map(a => `- [${a.title}](https://bytesagain.com/article/${a.slug})`).join('\n')}

## Pages

- [Homepage](https://bytesagain.com)
- [All Articles](https://bytesagain.com/articles)
- [Pro Plan](https://bytesagain.com/pro)
- [About](https://bytesagain.com/about)
- [Contact](https://bytesagain.com/contact)

## Contact

hello@bytesagain.com
`

  return new NextResponse(text, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
