import { NextResponse } from 'next/server'
import {
  getArticleSitemapShardCount,
  getGithubSkillsSitemapShardCount,
  getSkillsSitemapShardCount,
  getUseCaseSitemapShardCount,
} from '@/lib/sitemap-counts'

export const revalidate = 3600

function sitemapEntry(loc: string, lastmod: string) {
  return `  <sitemap>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </sitemap>`
}

export async function GET() {
  const today = new Date().toISOString().split('T')[0]
  const [skillShards, githubShards, articleShards, useCaseShards] = await Promise.all([
    getSkillsSitemapShardCount(),
    getGithubSkillsSitemapShardCount(),
    getArticleSitemapShardCount(),
    getUseCaseSitemapShardCount(),
  ])

  const entries = [sitemapEntry('https://bytesagain.com/sitemap.xml', today)]

  for (let i = 0; i < articleShards; i++) {
    entries.push(sitemapEntry(`https://bytesagain.com/articles-sitemap/${i}.xml`, today))
  }
  for (let i = 0; i < useCaseShards; i++) {
    entries.push(sitemapEntry(`https://bytesagain.com/use-cases-sitemap/${i}.xml`, today))
  }
  for (let i = 0; i < skillShards; i++) {
    entries.push(sitemapEntry(`https://bytesagain.com/skills-sitemap/${i}.xml`, today))
  }
  for (let i = 0; i < githubShards; i++) {
    entries.push(sitemapEntry(`https://bytesagain.com/github-skills-sitemap/${i}.xml`, today))
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join('\n')}\n</sitemapindex>`
  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
      'X-Sitemap-Count': String(entries.length),
      'X-Skills-Shards': String(skillShards),
      'X-Github-Skills-Shards': String(githubShards),
      'X-Article-Shards': String(articleShards),
      'X-Use-Case-Shards': String(useCaseShards),
    },
  })
}
