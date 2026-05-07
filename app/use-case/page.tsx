export const revalidate = 3600  // revalidate every hour

import { createClient } from '@supabase/supabase-js'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Use Cases',
  description: 'Find the right AI skills for your specific use case — from building SaaS to content creation, crypto research, and more.',
  alternates: { canonical: 'https://bytesagain.com/use-case' },
  openGraph: { url: 'https://bytesagain.com/use-case', type: 'website', siteName: 'BytesAgain' },
}

async function getUseCases() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
  const { data } = await supabase
    .from('use_cases')
    .select('slug, title, description, icon, skills')
    .order('id', { ascending: true })
    .limit(500)
  return (data || []).filter((uc: any) => {
    const skills = Array.isArray(uc.skills) ? uc.skills : []
    if (skills.length < 3) return false
    return !skills.some((s: any) =>
      s?.slug === 'system-data-intelligence-skill' ||
      String(s?.name || '').includes('It is designed for scenarios')
    )
  })
}

export default async function UseCasesPage() {
  const useCases = await getUseCases()

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: '40px 20px' }}>
      <h1 style={{ fontSize: '2.2em', fontWeight: 800, marginBottom: 12 }}>Browse by Use Case</h1>
      <p style={{ color: '#888', marginBottom: 8, fontSize: '1.05em' }}>
        Find the right AI skill stack for what you're trying to accomplish.
      </p>
      <p style={{ color: '#555', marginBottom: 40, fontSize: '.88em' }}>
        {useCases.length} use cases · updated daily
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 16 }}>
        {useCases.map(uc => (
          <a key={uc.slug} href={`/use-case/${uc.slug}`} style={{
            display: 'block', padding: 24,
            background: '#0f0f23', border: '1px solid #1a1a3e', borderRadius: 14,
            textDecoration: 'none', transition: 'border-color .2s',
          }}>
            <div style={{ fontSize: '2em', marginBottom: 12 }}>{uc.icon || '🤖'}</div>
            <h2 style={{ fontSize: '1.05em', fontWeight: 700, color: '#e0e0e0', margin: '0 0 8px' }}>{uc.title}</h2>
            <p style={{ color: '#666', fontSize: '.85em', lineHeight: 1.6, margin: '0 0 16px' }}>
              {(uc.description || '').slice(0, 90)}{uc.description?.length > 90 ? '…' : ''}
            </p>
            <div style={{ color: '#667eea', fontSize: '.8em' }}>
              {Array.isArray(uc.skills) ? `${uc.skills.length} skills` : 'View skills'} →
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
