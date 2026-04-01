import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/dashboard/', '/login/', '/register/'],
      },
      {
        userAgent: 'GPTBot',
        allow: '/',
      },
      {
        userAgent: 'ClaudeBot',
        allow: '/',
      },
    ],
    sitemap: [
      'https://bytesagain.com/sitemap-index.xml',
      'https://bytesagain.com/sitemap.xml',
      'https://bytesagain.com/skills-sitemap.xml',
    ],
    host: 'https://bytesagain.com',
  }
}
