import { NextResponse } from 'next/server'
import { buildGithubSkillsSitemapXml } from '@/lib/github-sitemap'
import { SITEMAP_PAGE_SIZE } from '@/lib/sitemap-counts'

export const revalidate = 86400

export async function GET(request: Request) {
  const shardIndex = Math.max(0, Number.parseInt(new URL(request.url).searchParams.get('shard') || '0', 10) || 0)
  const offset = shardIndex * SITEMAP_PAGE_SIZE
  const { ids, xml } = await buildGithubSkillsSitemapXml(offset, SITEMAP_PAGE_SIZE)

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
      'X-URL-Count': String(ids.length),
      'X-Sitemap-Range': `github-${offset}-${offset + SITEMAP_PAGE_SIZE - 1}`,
      'X-Sitemap-Shard': String(shardIndex),
    },
  })
}
