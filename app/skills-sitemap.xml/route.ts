import { NextResponse } from 'next/server'
import { buildSkillsSitemapXml, fetchSkillSlugs } from '@/lib/skills-sitemap'
import { SITEMAP_PAGE_SIZE, SKILLS_SITEMAP_LIMIT } from '@/lib/sitemap-counts'

export const revalidate = 86400

export async function GET(request: Request) {
  const shardIndex = Math.max(0, Number.parseInt(new URL(request.url).searchParams.get('shard') || '0', 10) || 0)
  const offset = shardIndex * SITEMAP_PAGE_SIZE
  const slugs = await fetchSkillSlugs(offset, SITEMAP_PAGE_SIZE)
  const maxShards = Math.ceil(SKILLS_SITEMAP_LIMIT / SITEMAP_PAGE_SIZE)

  return new NextResponse(buildSkillsSitemapXml(slugs), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
      'X-URL-Count': String(slugs.length),
      'X-Sitemap-Range': `${offset}-${offset + SKILLS_SITEMAP_LIMIT - 1}`,
      'X-Sitemap-Shard': String(shardIndex),
    },
  })
}
