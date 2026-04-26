import { NextResponse } from 'next/server'
import { buildArticleSitemapXml, fetchArticleSitemapRows } from '@/lib/content-sitemap'
import { SITEMAP_PAGE_SIZE } from '@/lib/sitemap-counts'

export const revalidate = 86400

export async function GET(_request: Request, { params }: { params: Promise<{ shard: string }> }) {
  const { shard } = await params
  const shardIndex = Math.max(0, Number.parseInt(shard, 10) || 0)
  const offset = shardIndex * SITEMAP_PAGE_SIZE
  const rows = await fetchArticleSitemapRows(offset, SITEMAP_PAGE_SIZE)

  return new NextResponse(buildArticleSitemapXml(rows), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
      'X-URL-Count': String(rows.length),
      'X-Sitemap-Range': `articles-${offset}-${offset + SITEMAP_PAGE_SIZE - 1}`,
      'X-Sitemap-Shard': String(shardIndex),
    },
  })
}
