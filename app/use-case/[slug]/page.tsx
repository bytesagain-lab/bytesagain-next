import { USE_CASES } from '@/lib/use-cases'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import UseCaseClient from './UseCaseClient'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return USE_CASES.map(uc => ({ slug: uc.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const uc = USE_CASES.find(u => u.slug === slug)
  if (!uc) return { title: 'Not Found' }
  return {
    title: `${uc.title} | BytesAgain`,
    description: uc.description,
    alternates: { canonical: `https://bytesagain.com/use-case/${slug}` },
  }
}

export default async function UseCasePage({ params }: Props) {
  const { slug } = await params
  const uc = USE_CASES.find(u => u.slug === slug)
  if (!uc) notFound()

  return (
    <div style={{ maxWidth: 800, margin: '40px auto', padding: '0 20px' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": uc.title,
        "description": uc.description,
        "url": `https://bytesagain.com/use-case/${slug}`,
        "step": uc.skills.map((s, i) => ({
          "@type": "HowToStep",
          "position": i + 1,
          "name": s.name,
          "text": s.reason,
          "url": `https://bytesagain.com/skill/${s.slug}`,
        })),
        "publisher": { "@type": "Organization", "name": "BytesAgain", "url": "https://bytesagain.com" },
      }) }} />

      <p style={{ margin: '0 0 16px' }}>
        <a href="/use-case" style={{ color: '#667eea', textDecoration: 'none', fontSize: '.85em' }}>← All Use Cases</a>
      </p>

      <div style={{ fontSize: '3em', marginBottom: 16 }}>{uc.icon}</div>
      <h1 style={{ fontSize: '2em', fontWeight: 800, margin: '0 0 12px' }}>{uc.title}</h1>
      <p style={{ color: '#888', fontSize: '1.05em', lineHeight: 1.7, marginBottom: 40 }}>{uc.description}</p>

      <h2 style={{ fontSize: '1.1em', color: '#888', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 20 }}>
        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span>Recommended Skills</span>
          <a
            href={uc.searchLink || `/skills?q=${encodeURIComponent(uc.title)}`}
            style={{ fontSize: '.8em', color: '#667eea', textDecoration: 'none', fontWeight: 600, letterSpacing: 0, textTransform: 'none' }}
          >
            Browse all →
          </a>
        </span>
      </h2>

      {/* Client Component: hover描述 + 展开更多 */}
      <UseCaseClient uc={uc} slug={slug} />

      {/* Other use cases */}
      <h2 style={{ fontSize: '1.1em', color: '#888', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 16 }}>
        Other Use Cases
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: 10 }}>
        {USE_CASES.filter(u => u.slug !== slug).slice(0, 6).map(u => (
          <a key={u.slug} href={`/use-case/${u.slug}`} style={{
            display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px',
            background: '#0f0f23', border: '1px solid #1a1a3e', borderRadius: 10,
            textDecoration: 'none', color: '#ccc', fontSize: '.9em',
          }}>
            <span>{u.icon}</span><span>{u.title}</span>
          </a>
        ))}
      </div>
    </div>
  )
}
