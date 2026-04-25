import { NextResponse } from 'next/server'

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
  const SB_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://jfpeycpiyayrpjldppzq.supabase.co'
  const SB_ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
  const today = new Date().toISOString().split('T')[0]
  const slugs: string[] = []

  if (SB_ANON) {
    // Sitemap protocol allows up to 50,000 URLs per file. Fetch in Supabase ranges.
    for (let offset = 0; offset < 50_000; offset += 1000) {
      const res = await fetch(
        `${SB_URL}/rest/v1/skills_list?select=slug&order=downloads.desc.nullslast&limit=1000&offset=${offset}`,
        {
          headers: { apikey: SB_ANON, Authorization: `Bearer ${SB_ANON}` },
          next: { revalidate: 86400 },
        }
      )
      if (!res.ok) break
      const rows = await res.json() as { slug?: string }[]
      if (!rows.length) break
      for (const row of rows) if (row.slug) slugs.push(row.slug)
      if (rows.length < 1000) break
    }
  }

  const urls = slugs.map(slug => `  <url>
    <loc>https://bytesagain.com/skill/${escapeXml(slug)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`).join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
      'X-URL-Count': String(slugs.length),
    },
  })
}
