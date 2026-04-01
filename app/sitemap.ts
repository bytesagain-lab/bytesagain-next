import { MetadataRoute } from 'next'
import { createClient } from '@supabase/supabase-js'
import { USE_CASES } from '@/lib/use-cases'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { data: posts } = await supabase
    .from('posts')
    .select('slug, published_at')
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .limit(500)

  const staticPages: MetadataRoute.Sitemap = [
    { url: 'https://bytesagain.com', lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: 'https://bytesagain.com/skills', lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: 'https://bytesagain.com/use-case', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: 'https://bytesagain.com/articles', lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: 'https://bytesagain.com/about', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: 'https://bytesagain.com/pro', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: 'https://bytesagain.com/contact', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: 'https://bytesagain.com/privacy-policy', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
    { url: 'https://bytesagain.com/terms', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
    { url: 'https://bytesagain.com/feedback', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
  ]

  // 30个 use case 详情页
  const useCasePages: MetadataRoute.Sitemap = USE_CASES.map(uc => ({
    url: `https://bytesagain.com/use-case/${uc.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // 文章页
  const articlePages: MetadataRoute.Sitemap = (posts || []).map(a => ({
    url: `https://bytesagain.com/article/${a.slug}`,
    lastModified: a.published_at ? new Date(a.published_at) : new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // Skill pages 在 /skills-sitemap.xml（静态预生成，43k条）
  // 文章页放在 use-case 之前，确保 GEO 工具取样到正确的 Article schema 页
  return [...staticPages, ...articlePages, ...useCasePages]
}
