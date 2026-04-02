import { getSkill, getSkills } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import InstallCommand from '@/app/components/InstallCommand'
import RelatedSkills from '@/app/components/RelatedSkills'

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

export const dynamic = 'force-dynamic'
export const revalidate = 3600

export async function generateStaticParams() {
  return [] // Don't pre-render, serve on-demand
}

export default async function SkillPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  let skill = await getSkill(slug)

  // Fallback: fetch from ClawHub API if not in our DB
  if (!skill) {
    try {
      const res = await fetch(`https://clawhub.ai/api/v1/skills/${slug}`, {
        next: { revalidate: 3600 }
      })
      if (res.ok) {
        const d = await res.json()
        const s = d.skill || {}
        skill = {
          slug,
          name: s.displayName || slug,
          title: s.displayName || slug,
          description: s.summary || '',
          category: (s.tags?.[0] || 'General'),
          downloads: s.stats?.downloads || 0,
          version: d.latestVersion?.version || '1.0.0',
          owner: d.owner?.handle || '',
        }
      }
    } catch {}
  }

  if (!skill) notFound()

  // 根据来源确定外链和badge
  const source = (skill as any).source || 'clawhub'
  const sourceUrl = (skill as any).source_url || ''

  const sourceBadge: Record<string, { label: string; color: string; emoji: string }> = {
    clawhub:  { label: 'ClawHub',  color: '#667eea', emoji: '🦀' },
    github:   { label: 'GitHub',   color: '#333',    emoji: '⭐' },
    lobehub:  { label: 'LobeHub',  color: '#7c3aed', emoji: '🤖' },
    dify:     { label: 'Dify',     color: '#f59e0b', emoji: '🔧' },
    official: { label: 'Official', color: '#10b981', emoji: '✅' },
  }
  const badge = sourceBadge[source] || sourceBadge.clawhub

  // 外链：优先用source_url，ClawHub fallback
  const externalUrl = sourceUrl || (source === 'github'
    ? `https://github.com/${skill.owner}/${skill.slug?.replace('github-','')}`
    : `https://clawhub.ai/${skill.owner}/${skill.slug?.replace('clawhub-','')}`)

  const externalLabel = source === 'github' ? 'View on GitHub →'
    : source === 'lobehub' ? 'View on LobeHub →'
    : source === 'dify' ? 'View on Dify →'
    : 'View on ClawHub →'

  // 只有自己的skill（is_ours）才显示安装命令
  const isOurs = (skill as any).is_ours === true || source === 'clawhub' && !(skill as any).source

  return (
    <div style={{ maxWidth: 800, margin: '40px auto', padding: '0 20px' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": skill.name || slug,
        "description": skill.description,
        "url": `https://bytesagain.com/skill/${slug}`,
        "applicationCategory": skill.category,
        "operatingSystem": "Any",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
        "publisher": { "@type": "Organization", "name": "BytesAgain", "url": "https://bytesagain.com" },
      }) }} />
      <p style={{ color: '#667eea', fontSize: '.85em', margin: '0 0 16px' }}>
        <a href="/" style={{ color: '#667eea', textDecoration: 'none' }}>← Back</a>
      </p>
      <div style={{ background: '#0f0f23', border: '1px solid #1a1a3e', borderRadius: 16, padding: '32px' }}>
        {/* Source badge + category */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <span style={{ fontSize: '.75em', color: '#fff', background: badge.color, borderRadius: 20, padding: '2px 10px', fontWeight: 600 }}>
            {badge.emoji} {badge.label}
          </span>
          <span style={{ fontSize: '.8em', color: '#667eea', textTransform: 'uppercase', letterSpacing: 1 }}>{skill.category}</span>
        </div>

        <h1 style={{ fontSize: '2em', margin: '0 0 12px', color: '#e0e0e0' }}>{skill.name || slug}</h1>
        <p style={{ color: '#888', margin: '0 0 24px', lineHeight: 1.7 }}>
          {skill.description || `${skill.name || slug} is an AI agent skill. Install it to supercharge your AI workflow.`}
        </p>

        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 24 }}>
          <span style={{ fontSize: '.85em', color: '#555' }}>v{skill.version}</span>
          {(skill.downloads ?? 0) > 0 && <span style={{ fontSize: '.85em', color: '#555' }}>{skill.downloads?.toLocaleString()} downloads</span>}
          {(skill as any).stars > 0 && <span style={{ fontSize: '.85em', color: '#555' }}>⭐ {(skill as any).stars?.toLocaleString()}</span>}
          {skill.owner && <span style={{ fontSize: '.85em', color: '#555' }}>by {skill.owner}</span>}
        </div>

        {/* 安装命令：只对ClawHub/自有skill显示 */}
        {source === 'clawhub' || source === 'official' ? <InstallCommand slug={slug.replace('clawhub-','')} /> : null}

        {/* 外链按钮 */}
        <a href={externalUrl} target="_blank" rel="noopener"
          style={{ display: 'inline-block', padding: '10px 24px', background: 'linear-gradient(135deg,#667eea,#00d4ff)', borderRadius: 8, color: '#fff', textDecoration: 'none', fontWeight: 600 }}>
          {externalLabel}
        </a>
      </div>

      <RelatedSkills category={skill.category} currentSlug={slug} name={skill.name} />

      {/* Install banner */}
      <div style={{
        margin: '32px 0', padding: '20px 24px',
        background: 'linear-gradient(135deg,#0f0f23,#1a1a3e)',
        border: '1px solid #667eea44', borderRadius: 12,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12,
      }}>
        <div>
          <div style={{ fontWeight: 700, color: '#e0e0e0', marginBottom: 4 }}>🔍 Can&apos;t find the right skill?</div>
          <div style={{ color: '#666', fontSize: '.88em' }}>Install our skill and let your agent search 43,000+ skills for you.</div>
        </div>
        <a href="/install" style={{
          padding: '9px 20px', background: 'linear-gradient(135deg,#667eea,#00d4ff)',
          borderRadius: 8, color: '#fff', fontWeight: 700, textDecoration: 'none', fontSize: '.88em', whiteSpace: 'nowrap',
        }}>
          Install Free →
        </a>
      </div>
    </div>
  )

}
