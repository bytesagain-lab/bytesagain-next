import { getSkill, getSkills } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import InstallCommand from '@/app/components/InstallCommand'
import RelatedSkills from '@/app/components/RelatedSkills'
import SkillActions from '@/app/components/SkillActions'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const skill = await getSkill(slug)
  if (!skill) return { title: 'Not Found' }
  // 低质量 slug 加 noindex：仅 -old 后缀
  const noindex = slug.endsWith('-old')
  return {
    title: skill.name || slug,
    description: skill.description?.slice(0, 160),
    alternates: { canonical: `https://bytesagain.com/skill/${slug}` },
    ...(noindex ? { robots: { index: false, follow: false } } : {}),
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

  // 后台异步刷新 ClawHub 下载量（不阻塞渲染，fire-and-forget）
  if ((skill as any).source === 'clawhub' || !(skill as any).source) {
    fetch(`https://clawhub.ai/api/v1/skills/${slug}`, { next: { revalidate: 0 } })
      .then(r => r.ok ? r.json() : null)
      .then(d => {
        if (!d) return
        const dl = d.skill?.stats?.downloads || d.downloads || 0
        if (dl > 0) {
          // 写回 DB（用 service role key 的 REST API）
          const SB_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
          const SB_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
          if (SB_URL && SB_KEY) {
            fetch(`${SB_URL}/rest/v1/skills?slug=eq.${slug}`, {
              method: 'PATCH',
              headers: { apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}`, 'Content-Type': 'application/json' },
              body: JSON.stringify({ downloads: dl }),
            }).catch(() => {})
          }
        }
      }).catch(() => {})
  }

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
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <SkillActions slug={slug} />
        </div>
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

        {/* 外链按钮 */}
        <a href={externalUrl} target="_blank" rel="noopener"
          style={{ display: 'inline-block', padding: '12px 28px', background: 'linear-gradient(135deg,#667eea,#00d4ff)', borderRadius: 8, color: '#fff', textDecoration: 'none', fontWeight: 700, fontSize: '1em' }}>
          {externalLabel}
        </a>

        {/* 安全免责 */}
        <p style={{ margin: '10px 0 0', fontSize: '.78em', color: '#555' }}>
          ⚠️ BytesAgain does not review or verify third-party content. Proceed at your own risk.
        </p>

        {/* 来源声明 */}
        <div style={{ marginTop: 20, padding: '12px 16px', background: '#0a0a18', borderRadius: 8, border: '1px solid #1a1a2e' }}>
          <p style={{ margin: 0, fontSize: '.78em', color: '#555', lineHeight: 1.6 }}>
            {source === 'clawhub' && (
              <>📋 This skill is indexed from <a href={externalUrl} target="_blank" rel="noopener" style={{ color: '#667eea' }}>ClawHub</a> and is available under its original license. BytesAgain is an independent directory — we do not host or own this content. All rights belong to the original author.</>
            )}
            {source === 'mcp' && (
              <>📋 This MCP server is sourced from an open-source Awesome list on GitHub. BytesAgain is an independent index — we do not host or own this content. All rights belong to the original author.</>
            )}
            {source === 'github' && (
              <>📋 This tool is indexed from a curated open-source list on GitHub. BytesAgain is an independent directory — we do not host or own this content. All rights belong to the original author.</>
            )}
            {(source === 'lobehub' || source === 'dify') && (
              <>📋 This agent is sourced from <a href={externalUrl} target="_blank" rel="noopener" style={{ color: '#667eea' }}>{badge.label}</a>. BytesAgain is an independent directory — we do not host or own this content. All rights belong to the original author.</>
            )}
          </p>
        </div>
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
