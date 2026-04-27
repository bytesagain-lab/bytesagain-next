import { NextResponse } from 'next/server'
import sitemap from '../sitemap'

export const revalidate = 86400

function escapeXml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export async function GET() {
  const urls = await sitemap()
  const entries = urls.map(item => {
    const lastmod = item.lastModified
      ? new Date(item.lastModified as string | Date).toISOString()
      : new Date().toISOString()
    return [
      '  <url>',
      `    <loc>${escapeXml(item.url)}</loc>`,
      `    <lastmod>${lastmod}</lastmod>`,
      item.changeFrequency ? `    <changefreq>${item.changeFrequency}</changefreq>` : '',
      typeof item.priority === 'number' ? `    <priority>${item.priority.toFixed(1)}</priority>` : '',
      '  </url>',
    ].filter(Boolean).join('\n')
  })

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join('\n')}\n</urlset>`

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=86400',
      'Access-Control-Allow-Origin': '*',
    },
  })
}
