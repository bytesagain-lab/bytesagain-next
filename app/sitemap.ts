import { MetadataRoute } from 'next'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 静态页面
  const staticPages: MetadataRoute.Sitemap = [
    { url: 'https://bytesagain.com', lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: 'https://bytesagain.com/skills', lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: 'https://bytesagain.com/about', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: 'https://bytesagain.com/pro', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: 'https://bytesagain.com/contact', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: 'https://bytesagain.com/privacy-policy', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
    { url: 'https://bytesagain.com/terms', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
  ]

  // 文章页
  const { data: articles } = await supabase
    .from('articles')
    .select('slug, published_at')
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .limit(500)

  const articlePages: MetadataRoute.Sitemap = (articles || []).map(a => ({
    url: `https://bytesagain.com/article/${a.slug}`,
    lastModified: a.published_at ? new Date(a.published_at) : new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // 全量skill页面（分批取，最多50,000条）
  const skillPages: MetadataRoute.Sitemap = []
  const batchSize = 1000
  let offset = 0

  while (skillPages.length < 50000) {
    const { data: skills } = await supabase
      .from('skills')
      .select('slug, downloads')
      .order('downloads', { ascending: false })
      .range(offset, offset + batchSize - 1)

    if (!skills || skills.length === 0) break

    for (const s of skills) {
      skillPages.push({
        url: `https://bytesagain.com/skill/${s.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        // 下载量越高优先级越高
        priority: s.downloads > 1000 ? 0.9 : s.downloads > 100 ? 0.8 : 0.6,
      })
    }

    offset += batchSize
    if (skills.length < batchSize) break
  }

  return [...staticPages, ...articlePages, ...skillPages]
}
