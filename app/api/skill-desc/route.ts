export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { fetchSkillDesc } from '@/lib/skill-desc'

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get('slug') || ''
  if (!slug) return NextResponse.json({ summary: null, full_description: null, sections: { examples: null, configuration: null, tips: null, script: null } })

  const data = await fetchSkillDesc(slug)
  return NextResponse.json(data)
}
