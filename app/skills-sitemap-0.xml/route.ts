import { NextResponse } from 'next/server'
import { buildSkillsSitemapXml, fetchSkillSlugs } from '@/lib/skills-sitemap'
import { SKILLS_SITEMAP_LIMIT } from '@/lib/sitemap-counts'

export const revalidate = 86400

export async function GET() {
  const slugs = await fetchSkillSlugs(0, SKILLS_SITEMAP_LIMIT)
  return new NextResponse(buildSkillsSitemapXml(slugs), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'no-cache, max-age=0',
      'X-URL-Count': String(slugs.length),
      'X-Sitemap-Range': `0-${SKILLS_SITEMAP_LIMIT - 1}`,
    },
  })
}
