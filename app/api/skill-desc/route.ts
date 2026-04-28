export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://jfpeycpiyayrpjldppzq.supabase.co'
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

interface ClawSkill {
  slug: string
  owner: string
  description: string
}

/** Try to find the GitHub repo for a clawhub skill */
function clawhubGithubRepos(owner: string, skillName: string): string[] {
  // Common patterns for ClawHub skill repos on GitHub
  const possibilities = [
    `${owner}/${skillName}`,
    `${owner}/skills/${skillName}`,
    `clawhub/${owner}-${skillName}`,
    `${owner}/claude-code-skills`,
    `${owner}/ai-skills/${skillName}`,
    `${owner}/agent-skills/${skillName}`,
  ]
  return possibilities.map(p => `https://api.github.com/repos/${p}/contents/SKILL.md`)
}

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get('slug') || ''
  const source = req.nextUrl.searchParams.get('source') || 'clawhub'

  if (!slug) return NextResponse.json({ summary: null, full_description: null })

  // 1) Try our own skills-repo on GitHub first (bytesagain/ai-skills)
  if (source === 'bytesagain' || source === 'official') {
    try {
      const ghRes = await fetch(
        `https://api.github.com/repos/bytesagain/ai-skills/contents/${slug}/SKILL.md`,
        { next: { revalidate: 3600 } }
      )
      if (ghRes.ok) {
        const ghData = await ghRes.json()
        const buf = Buffer.from(ghData.content, 'base64')
        const fullMd = buf.toString('utf-8')
        // Extract YAML frontmatter description
        const descMatch = fullMd.match(/description:\s*"([^"]+)"/)
        const summary = descMatch ? descMatch[1] : ''
        return NextResponse.json({ summary, full_description: fullMd }, {
          headers: { 'Cache-Control': 'public, max-age=86400' }
        })
      }
    } catch {}
  }

  // 2) For clawhub skills, find owner + try GitHub
  if (supabaseKey) {
    const supabase = createClient(supabaseUrl, supabaseKey)
    let owner = ''
    let name = slug  // raw slug (without clawhub- prefix)

    // Look up the skill in our DB for owner info
    const { data } = await supabase
      .from('skills')
      .select('owner,description')
      .eq('slug', `clawhub-${slug}`)
      .single()

    const dbDesc = (data as ClawSkill | null)?.description || ''
    owner = (data as ClawSkill | null)?.owner || ''

    // Try owner/name on GitHub
    if (owner && name) {
      const repos = [
        `${owner}/${name}`,
        `${owner}/ai-skills`,
        `${owner}/claude-code-skills`,
        `${owner}/agent-skills`,
      ]
      for (const repo of repos) {
        try {
          const path = repo.endsWith(name) ? 'SKILL.md' : `${name}/SKILL.md`
          const ghRes = await fetch(
            `https://api.github.com/repos/${repo}/contents/${path}`,
            { next: { revalidate: 3600 } }
          )
          if (ghRes.ok) {
            const ghData = await ghRes.json()
            const buf = Buffer.from(ghData.content, 'base64')
            const fullMd = buf.toString('utf-8')
            const descMatch = fullMd.match(/description:\s*"([^"]+)"/)
            const summary = descMatch ? descMatch[1] : dbDesc
            return NextResponse.json({ summary, full_description: fullMd }, {
              headers: { 'Cache-Control': 'public, max-age=86400' }
            })
          }
        } catch {}
      }
    }

    // Fallback: return short description from DB
    return NextResponse.json({
      summary: dbDesc,
      full_description: null,
    }, { headers: { 'Cache-Control': 'public, max-age=3600' } })
  }

  return NextResponse.json({ summary: null, full_description: null })
}
