export const revalidate = 3600
import { createClient } from '@supabase/supabase-js'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import UseCaseClient from './UseCaseClient'

type Props = { params: Promise<{ slug: string }> }

async function getUseCase(slug: string) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
  const { data } = await supabase
    .from('use_cases')
    .select('slug, title, description, icon, skills, search_link')
    .eq('slug', slug)
    .single()
  return data
}

async function getRelatedUseCases(excludeSlug: string) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
  const { data } = await supabase
    .from('use_cases')
    .select('slug, title, icon')
    .neq('slug', excludeSlug)
    .limit(6)
  return data || []
}

export async function generateStaticParams() {
  return [] // serve on-demand, new use-cases appear automatically
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const uc = await getUseCase(slug)
  if (!uc) return { title: 'Not Found' }
  return {
    title: `${uc.title} | BytesAgain`,
    description: uc.description,
    alternates: { canonical: `https://bytesagain.com/use-case/${slug}` },
    openGraph: {
      title: `${uc.title} | BytesAgain`,
      description: uc.description,
      url: `https://bytesagain.com/use-case/${slug}`,
      type: 'website',
      siteName: 'BytesAgain',
    },
  }
}

export default async function UseCasePage({ params }: Props) {
  const { slug } = await params
  const uc = await getUseCase(slug)
  if (!uc) notFound()

  const related = await getRelatedUseCases(slug)
  const skills = Array.isArray(uc.skills) ? uc.skills : []

  return (
    <div style={{ maxWidth: 800, margin: '40px auto', padding: '0 20px' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": uc.title,
        "description": uc.description,
        "url": `https://bytesagain.com/use-case/${slug}`,
        "step": skills.map((s: any, i: number) => ({
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

      <div style={{ fontSize: '3em', marginBottom: 16 }}>{uc.icon || '🤖'}</div>
      <h1 style={{ fontSize: '2em', fontWeight: 800, margin: '0 0 12px' }}>{uc.title}</h1>
      <p style={{ color: '#888', fontSize: '1.05em', lineHeight: 1.7, marginBottom: 40 }}>{uc.description}</p>

      <h2 style={{ fontSize: '1.1em', color: '#888', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 20 }}>
        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span>Recommended Skills</span>
          <a
            href={uc.search_link || `/skills?q=${encodeURIComponent(uc.title)}`}
            style={{ fontSize: '.8em', color: '#667eea', textDecoration: 'none', fontWeight: 600, letterSpacing: 0, textTransform: 'none' }}
          >
            Browse all →
          </a>
        </span>
      </h2>

      <UseCaseClient uc={{ ...uc, skills, searchLink: uc.search_link }} slug={slug} />

      <h2 style={{ fontSize: '1.1em', color: '#888', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 16 }}>
        Other Use Cases
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: 10 }}>
        {related.map((u: any) => (
          <a key={u.slug} href={`/use-case/${u.slug}`} style={{
            display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px',
            background: '#0f0f23', border: '1px solid #1a1a3e', borderRadius: 10,
            textDecoration: 'none', color: '#ccc', fontSize: '.9em',
          }}>
            <span>{u.icon || '🤖'}</span><span>{u.title}</span>
          </a>
        ))}
      </div>
    </div>
  )
}
