import { escapeXml } from './skills-sitemap'

const SB_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://jfpeycpiyayrpjldppzq.supabase.co'
const SB_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

type ArticleSitemapRow = { slug?: string; published_at?: string; updated_at?: string; reviewed_at?: string }
type UseCaseSitemapRow = { slug?: string; created_at?: string; updated_at?: string; reviewed_at?: string }

async function sbRows<T>(path: string, revalidate = 86400): Promise<T[]> {
  if (!SB_KEY) return []
  const res = await fetch(`${SB_URL}/rest/v1/${path}`, {
    headers: { apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}` },
    next: { revalidate },
  })
  if (!res.ok) return []
  return res.json()
}

export async function fetchArticleSitemapRows(offset = 0, maxUrls = 50_000): Promise<ArticleSitemapRow[]> {
  const rows: ArticleSitemapRow[] = []
  for (let localOffset = 0; localOffset < maxUrls; localOffset += 1000) {
    const page = await sbRows<ArticleSitemapRow>(
      `posts?select=slug,published_at,updated_at,reviewed_at&status=eq.published&order=published_at.desc&limit=1000&offset=${offset + localOffset}`
    )
    if (!page.length) break
    rows.push(...page.filter(row => row.slug))
    if (page.length < 1000) break
  }
  return rows
}

export async function fetchUseCaseSitemapRows(offset = 0, maxUrls = 50_000): Promise<UseCaseSitemapRow[]> {
  const rows: UseCaseSitemapRow[] = []
  for (let localOffset = 0; localOffset < maxUrls; localOffset += 1000) {
    const page = await sbRows<UseCaseSitemapRow>(
      `use_cases?select=slug,created_at,updated_at,reviewed_at&order=id.asc&limit=1000&offset=${offset + localOffset}`
    )
    if (!page.length) break
    rows.push(...page.filter(row => row.slug))
    if (page.length < 1000) break
  }
  return rows
}

function dateOnly(value?: string) {
  if (!value) return new Date().toISOString().split('T')[0]
  return new Date(value).toISOString().split('T')[0]
}

export function buildArticleSitemapXml(rows: ArticleSitemapRow[]) {
  const urls = rows.map(row => `  <url>\n    <loc>https://bytesagain.com/article/${escapeXml(row.slug || '')}</loc>\n    <lastmod>${dateOnly(row.updated_at || row.reviewed_at || row.published_at)}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>`).join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`
}

export function buildUseCaseSitemapXml(rows: UseCaseSitemapRow[]) {
  const urls = rows.map(row => `  <url>\n    <loc>https://bytesagain.com/use-case/${escapeXml(row.slug || '')}</loc>\n    <lastmod>${dateOnly(row.updated_at || row.reviewed_at || row.created_at)}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>`).join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`
}
