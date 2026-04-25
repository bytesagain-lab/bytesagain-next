import { NextResponse } from 'next/server'
import { buildSkillsSitemapXml, fetchSkillSlugs } from '@/lib/skills-sitemap'

export const revalidate = 86400

export async function GET() {
  const slugs = await fetchSkillSlugs(50_000, 50_000)
  return new NextResponse(buildSkillsSitemapXml(slugs), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
      'X-URL-Count': String(slugs.length),
      'X-Sitemap-Range': '50000-99999',
    },
  })
}
