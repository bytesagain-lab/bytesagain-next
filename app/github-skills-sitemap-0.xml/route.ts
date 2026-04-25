import { NextResponse } from 'next/server'
import { getGithubSkillIds } from '@/lib/github-skills'

export const revalidate = 86400

export async function GET() {
  const ids = await getGithubSkillIds(50_000, 0)
  const today = new Date().toISOString().split('T')[0]
  const urls = ids.map(id => `  <url>\n    <loc>https://bytesagain.com/github-skill/${id}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.45</priority>\n  </url>`).join('\n')
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`
  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
      'X-URL-Count': String(ids.length),
      'X-Sitemap-Range': 'github-0-49999',
    },
  })
}
