import { escapeXml } from './skills-sitemap'
import { getGithubSkillIds } from './github-skills'

export async function buildGithubSkillsSitemapXml(offset = 0, limit = 50_000) {
  const ids = await getGithubSkillIds(limit, offset)
  const today = new Date().toISOString().split('T')[0]
  const urls = ids.map(id => `  <url>\n    <loc>https://bytesagain.com/github-skill/${escapeXml(id)}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.45</priority>\n  </url>`).join('\n')
  return {
    ids,
    xml: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`,
  }
}
