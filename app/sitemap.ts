import { MetadataRoute } from 'next'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { data: articles } = await supabase
    .from('articles')
    .select('slug, published_at')
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .limit(500)

  const staticPages: MetadataRoute.Sitemap = [
    { url: 'https://bytesagain.com', lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: 'https://bytesagain.com/skills', lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: 'https://bytesagain.com/about', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: 'https://bytesagain.com/pro', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: 'https://bytesagain.com/contact', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: 'https://bytesagain.com/privacy-policy', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
    { url: 'https://bytesagain.com/terms', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
  ]

  const articlePages: MetadataRoute.Sitemap = (articles || []).map(a => ({
    url: `https://bytesagain.com/article/${a.slug}`,
    lastModified: a.published_at ? new Date(a.published_at) : new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // Skill pages在 /skills-sitemap.xml (静态预生成，43k条)
  return [...staticPages, ...articlePages]
}
