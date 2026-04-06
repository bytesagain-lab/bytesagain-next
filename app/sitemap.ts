import { MetadataRoute } from 'next'
import { USE_CASES } from '@/lib/use-cases'

export const revalidate = 86400

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 用 REST API + anon key（构建时安全）
  let posts: { slug: string; published_at: string }[] = []
  try {
    const SB_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://jfpeycpiyayrpjldppzq.supabase.co'
    const SB_ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
    const res = await fetch(
      `${SB_URL}/rest/v1/posts?select=slug,published_at&status=eq.published&order=published_at.desc&limit=500`,
      { headers: { apikey: SB_ANON, Authorization: `Bearer ${SB_ANON}` }, next: { revalidate: 86400 } }
    )
    if (res.ok) posts = await res.json()
  } catch {}

  const articlePages: MetadataRoute.Sitemap = posts.map(a => ({
    url: `https://bytesagain.com/article/${a.slug}`,
    lastModified: a.published_at ? new Date(a.published_at) : new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const staticPages: MetadataRoute.Sitemap = [
    { url: 'https://bytesagain.com', lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: 'https://bytesagain.com/skills', lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: 'https://bytesagain.com/use-case', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: 'https://bytesagain.com/articles', lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: 'https://bytesagain.com/about', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: 'https://bytesagain.com/contact', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: 'https://bytesagain.com/privacy-policy', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
    { url: 'https://bytesagain.com/terms', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
    { url: 'https://bytesagain.com/feedback', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
  ]

  const useCasePages: MetadataRoute.Sitemap = USE_CASES.map(uc => ({
    url: `https://bytesagain.com/use-case/${uc.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [...articlePages, ...staticPages, ...useCasePages]
}
