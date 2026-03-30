import { USE_CASES } from '@/lib/use-cases'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

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
      <p style={{ margin: '0 0 16px' }}>
        <a href="/use-case" style={{ color: '#667eea', textDecoration: 'none', fontSize: '.85em' }}>← All Use Cases</a>
      </p>

      <div style={{ fontSize: '3em', marginBottom: 16 }}>{uc.icon}</div>
      <h1 style={{ fontSize: '2em', fontWeight: 800, margin: '0 0 12px' }}>{uc.title}</h1>
      <p style={{ color: '#888', fontSize: '1.05em', lineHeight: 1.7, marginBottom: 40 }}>{uc.description}</p>

      <h2 style={{ fontSize: '1.1em', color: '#888', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 20 }}>
        Recommended Skills
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 48 }}>
        {uc.skills.map((skill, i) => (
          <a key={skill.slug} href={`/skill/${skill.slug}`} style={{
            display: 'flex', gap: 16, padding: '18px 20px',
            background: '#0f0f23', border: '1px solid #1a1a3e', borderRadius: 12,
            textDecoration: 'none', alignItems: 'flex-start',
          }}>
            <div style={{
              width: 28, height: 28, borderRadius: '50%', flexShrink: 0, marginTop: 2,
              background: 'linear-gradient(135deg,#667eea,#00d4ff)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '.8em', fontWeight: 800, color: '#fff',
            }}>{i + 1}</div>
            <div>
              <div style={{ fontWeight: 700, color: '#e0e0e0', marginBottom: 4 }}>{skill.name}</div>
              <div style={{ color: '#667', fontSize: '.88em', lineHeight: 1.5 }}>{skill.reason}</div>
            </div>
            <div style={{ marginLeft: 'auto', color: '#333', fontSize: '1.2em', flexShrink: 0 }}>→</div>
          </a>
        ))}
      </div>

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
