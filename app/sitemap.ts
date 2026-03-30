import { MetadataRoute } from 'next'
import { getSkills, getArticles } from '@/lib/supabase'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [skills, articles] = await Promise.all([
    getSkills(1000),
    getArticles(500),
  ])

  const staticPages: MetadataRoute.Sitemap = [
    { url: 'https://bytesagain.com', lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: 'https://bytesagain.com/articles', lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: 'https://bytesagain.com/about', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: 'https://bytesagain.com/pro', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: 'https://bytesagain.com/contact', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: 'https://bytesagain.com/privacy-policy', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
    { url: 'https://bytesagain.com/terms', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
  ]

  const skillPages: MetadataRoute.Sitemap = skills.map(s => ({
    url: `https://bytesagain.com/skill/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const articlePages: MetadataRoute.Sitemap = articles.map(a => ({
    url: `https://bytesagain.com/article/${a.slug}`,
    lastModified: a.published_at ? new Date(a.published_at) : new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticPages, ...skillPages, ...articlePages]
}
