import { getSkill, getSkills } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import InstallCommand from '@/app/components/InstallCommand'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const skill = await getSkill(slug)
  if (!skill) return { title: 'Not Found' }
  return {
    title: skill.name || slug,
    description: skill.description?.slice(0, 160),
    alternates: { canonical: `https://bytesagain.com/skill/${slug}` },
  }
}

export async function generateStaticParams() {
  const skills = await getSkills(500)
  return skills.map(s => ({ slug: s.slug }))
}

export default async function SkillPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const skill = await getSkill(slug)
  if (!skill) notFound()

  return (
    <div style={{ maxWidth: 800, margin: '40px auto', padding: '0 20px' }}>
      <p style={{ color: '#667eea', fontSize: '.85em', margin: '0 0 16px' }}>
        <a href="/" style={{ color: '#667eea', textDecoration: 'none' }}>← Back</a>
      </p>
      <div style={{ background: '#0f0f23', border: '1px solid #1a1a3e', borderRadius: 16, padding: '32px' }}>
        <div style={{ fontSize: '.8em', color: '#667eea', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>{skill.category}</div>
        <h1 style={{ fontSize: '2em', margin: '0 0 12px', color: '#e0e0e0' }}>{skill.name || slug}</h1>
        <p style={{ color: '#888', margin: '0 0 24px', lineHeight: 1.7 }}>
          {skill.description || `${skill.name || slug} is an AI agent skill available on ClawHub. Install it to supercharge your AI workflow.`}
        </p>

        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 24 }}>
          <span style={{ fontSize: '.85em', color: '#555' }}>v{skill.version}</span>
          <span style={{ fontSize: '.85em', color: '#555' }}>{skill.downloads?.toLocaleString()} downloads</span>
          <span style={{ fontSize: '.85em', color: '#555' }}>by {skill.owner}</span>
        </div>

        {/* Install command — login required */}
        <InstallCommand slug={slug} />

        <a href={`https://clawhub.ai/${skill.owner}/${slug}`} target="_blank" rel="noopener"
          style={{ display: 'inline-block', padding: '10px 24px', background: 'linear-gradient(135deg,#667eea,#00d4ff)', borderRadius: 8, color: '#fff', textDecoration: 'none', fontWeight: 600 }}>
          View on ClawHub →
        </a>
      </div>
    </div>
  )
}
