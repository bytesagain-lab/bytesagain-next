export function escapeXml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export async function fetchSkillSlugs(offset = 0, maxUrls = 50_000) {
  const SB_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://jfpeycpiyayrpjldppzq.supabase.co'
  const SB_ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
  const slugs: string[] = []

  if (!SB_ANON) return slugs

  for (let localOffset = 0; localOffset < maxUrls; localOffset += 1000) {
    const res = await fetch(
      `${SB_URL}/rest/v1/skills_list?select=slug&order=downloads.desc.nullslast&limit=1000&offset=${offset + localOffset}`,
      {
        headers: { apikey: SB_ANON, Authorization: `Bearer ${SB_ANON}` },
        next: { revalidate: 86400 },
      }
    )
    if (!res.ok) break
    const rows = await res.json() as { slug?: string }[]
    if (!rows.length) break
    for (const row of rows) if (row.slug) slugs.push(row.slug)
    // Continue until an empty page so large ordered scans do not stop early on a partial page.
  }

  return slugs
}

export function buildSkillsSitemapXml(slugs: string[]) {
  const today = new Date().toISOString().split('T')[0]
  const urls = slugs.map(slug => `  <url>
    <loc>https://bytesagain.com/skill/${escapeXml(slug)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`).join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`
}
