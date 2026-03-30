import { getArticle, getArticles } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { marked } from 'marked'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticle(slug)
  if (!article) return { title: 'Not Found' }
  const desc = article.content?.replace(/<[^>]+>/g, '').slice(0, 160)
  return {
    title: article.title,
    description: desc,
    openGraph: {
      title: article.title,
      description: desc,
      type: 'article',
      url: `https://bytesagain.com/article/${slug}`,
      publishedTime: article.published_at,
      authors: [article.author_name || 'BytesAgain'],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: desc,
    },
    alternates: { canonical: `https://bytesagain.com/article/${slug}` },
  }
}

export async function generateStaticParams() {
  const articles = await getArticles(100)
  return articles.map(a => ({ slug: a.slug }))
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = await getArticle(slug)
  if (!article) notFound()

  const date = article.published_at
    ? new Date(article.published_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    : ''

  // Detect HTML vs Markdown, convert markdown to HTML
  const isHtml = /<(h[1-6]|p|ul|ol|table|div|strong|em|a)[\s>]/i.test(article.content)
  const content = isHtml ? article.content : marked(article.content) as string

  return (
    <article style={{ maxWidth: 750, margin: '40px auto', padding: '0 20px' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": article.title,
        "description": article.content?.replace(/<[^>]+>/g, '').slice(0, 160),
        "author": { "@type": "Person", "name": article.author_name || "BytesAgain" },
        "publisher": { "@type": "Organization", "name": "BytesAgain", "url": "https://bytesagain.com" },
        "datePublished": article.published_at,
        "dateModified": article.published_at,
        "url": `https://bytesagain.com/article/${slug}`,
        "mainEntityOfPage": `https://bytesagain.com/article/${slug}`,
      }) }} />
      <p style={{ color: '#667eea', fontSize: '.85em', margin: '0 0 16px' }}>
        <a href="/articles" style={{ color: '#667eea', textDecoration: 'none' }}>← Back to Articles</a>
      </p>
      <h1 style={{ fontSize: '2em', margin: '0 0 12px', color: '#e0e0e0', lineHeight: 1.3 }}>{article.title}</h1>
      <p style={{ color: '#666', margin: '0 0 30px', fontSize: '.9em' }}>
        By <strong style={{ color: '#ccc' }}>{article.author_name || 'BytesAgain'}</strong> · {date}
      </p>
      <div
        style={{ lineHeight: 1.8, fontSize: '1.05em', background: '#111133', borderRadius: 16, padding: '30px 36px', border: '1px solid #1a1a3e' }}
        className="article-content"
        dangerouslySetInnerHTML={{ __html: content }}
      />
      <div style={{ marginTop: 40, padding: '24px', background: '#0f0f23', borderRadius: 12, border: '1px solid #1a1a3e', textAlign: 'center' }}>
        <p style={{ margin: '0 0 12px', color: '#ccc' }}>Browse 900+ AI agent skills on BytesAgain</p>
        <a href="/" style={{ display: 'inline-block', padding: '10px 24px', background: 'linear-gradient(135deg,#667eea,#00d4ff)', borderRadius: 8, color: '#fff', textDecoration: 'none', fontWeight: 600 }}>
          Explore Skills →
        </a>
      </div>
    </article>
  )
}
