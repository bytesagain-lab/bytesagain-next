export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

interface ClawHubSkillResponse {
  skill?: {
    slug?: string
    displayName?: string
    summary?: string
    tags?: string[]
    stats?: { downloads?: number }
  }
  latestVersion?: {
    version?: string
    description?: string
  }
}

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get('slug') || ''
  const source = req.nextUrl.searchParams.get('source') || 'clawhub'
  const fullText = req.nextUrl.searchParams.get('full') === '1'

  if (!slug) return NextResponse.json({})

  // Try ClawHub API for full description (SKILL.md / README content)
  if (source === 'clawhub') {
    try {
      const clawRes = await fetch(`https://clawhub.ai/api/v1/skills/${slug}`, {
        next: { revalidate: 3600 },
      })
      if (clawRes.ok) {
        const clawData: ClawHubSkillResponse = await clawRes.json()
        const summary = clawData?.skill?.summary || ''
        const latestVersion = clawData?.latestVersion
        const versionDesc = latestVersion?.description || ''
        
        // Try to get SKILL.md via raw content endpoint
        let skillmd = ''
        try {
          const mdRes = await fetch(`https://clawhub.ai/api/v1/skills/${slug}/files/SKILL.md`, {
            next: { revalidate: 3600 },
          })
          if (mdRes.ok) {
            const mdData = await mdRes.json()
            skillmd = mdData?.content || ''
          }
        } catch {}

        // Try raw GitHub-style content
        if (!skillmd) {
          try {
            const rawRes = await fetch(`https://clawhub.ai/api/v1/skills/${slug}/readme`, {
              next: { revalidate: 3600 },
            })
            if (rawRes.ok) {
              const rawData = await rawRes.json()
              skillmd = rawData?.content || rawData?.readme || ''
            }
          } catch {}
        }

        return NextResponse.json({
          summary,
          version_description: versionDesc,
          full_description: skillmd || versionDesc || summary || null,
        }, {
          headers: { 'Cache-Control': 'public, max-age=3600' },
        })
      }
    } catch {}
  }

  // Fallback: database description
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
  const { data } = await supabase
    .from('skills')
    .select('description')
    .eq('slug', `clawhub-${slug}`)
    .single()

  return NextResponse.json({
    summary: data?.description || null,
    full_description: data?.description || null,
    version_description: null,
  }, {
    headers: { 'Cache-Control': 'public, max-age=3600' },
  })
}
