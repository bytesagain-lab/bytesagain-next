import { NextResponse } from 'next/server'
import { buildUseCaseSitemapXml, fetchUseCaseSitemapRows } from '@/lib/content-sitemap'
import { SITEMAP_PAGE_SIZE } from '@/lib/sitemap-counts'

export const revalidate = 86400

export async function GET(request: Request) {
  const shardIndex = Math.max(0, Number.parseInt(new URL(request.url).searchParams.get('shard') || '0', 10) || 0)
  const offset = shardIndex * SITEMAP_PAGE_SIZE
  const rows = await fetchUseCaseSitemapRows(offset, SITEMAP_PAGE_SIZE)

  return new NextResponse(buildUseCaseSitemapXml(rows), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
      'X-URL-Count': String(rows.length),
      'X-Sitemap-Range': `use-cases-${offset}-${offset + SITEMAP_PAGE_SIZE - 1}`,
      'X-Sitemap-Shard': String(shardIndex),
    },
  })
}
