export const revalidate = 86400
import { getSkill, getSkills } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import RelatedContent from '@/app/components/RelatedContent'
import SkillActions from '@/app/components/SkillActions'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const skill = await getSkill(slug)
  if (!skill) return { title: 'Not Found' }
  const noindex = slug.endsWith('-old')
  const displayName = skill.name || slug
  const title = `${displayName} — AI Agent Skill | BytesAgain`
  const rawDesc = skill.description || ''
  let metaDesc = rawDesc
  if (rawDesc.length > 160) {
    const cutoff = rawDesc.lastIndexOf('.', 158)
    metaDesc = cutoff > 80 ? rawDesc.slice(0, cutoff + 1) : rawDesc.slice(0, 157) + '...'
  }
  const pageUrl = `https://bytesagain.com/skill/${slug}`
  return {
    title,
    description: metaDesc,
    alternates: { canonical: pageUrl },
    openGraph: { title, description: metaDesc, url: pageUrl, type: 'website', siteName: 'BytesAgain', images: [{ url: 'https://bytesagain.com/social-preview.png', width: 1200, height: 630 }] },
    twitter: { card: 'summary_large_image', title, description: metaDesc },
    ...(noindex ? { robots: { index: false, follow: false } } : {}),
  }
}

export async function generateStaticParams() {
  return []
}

export default async function SkillPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  let skill = await getSkill(slug)

  if (!skill) {
    try {
      const res = await fetch(`https://clawhub.ai/api/v1/skills/${slug}`, { next: { revalidate: 3600 } })
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

  const source = (skill as any).source || 'clawhub'
  const sourceUrl = (skill as any).source_url || ''
  const tags: string[] = (skill as any).tags || []

  const sourceMeta: Record<string, { label: string; color: string; bg: string; emoji: string }> = {
    clawhub:  { label: 'ClawHub',  color: '#818cf8', bg: '#818cf822', emoji: '🦀' },
    github:   { label: 'GitHub',   color: '#94a3b8', bg: '#94a3b822', emoji: '⭐' },
    lobehub:  { label: 'LobeHub',  color: '#a78bfa', bg: '#a78bfa22', emoji: '🤖' },
    dify:     { label: 'Dify',     color: '#fbbf24', bg: '#fbbf2422', emoji: '🔧' },
    mcp:      { label: 'MCP',      color: '#34d399', bg: '#34d39922', emoji: '⚡' },
    wechat:   { label: 'WeChat',   color: '#4ade80', bg: '#4ade8022', emoji: '💬' },
  }
  const sm = sourceMeta[source] || sourceMeta.clawhub

  const externalUrl = sourceUrl || (source === 'github'
    ? `https://github.com/${skill.owner}/${slug}`
    : `https://clawhub.ai/${skill.owner}/${slug}`)

  const OUR_ACCOUNTS = ['ckchzh', 'xueyetianya', 'bytesagain3', 'bytesagain-lab', 'loutai0307-prog', 'bytesagain1']
  const isOurs = (skill as any).is_ours === true || OUR_ACCOUNTS.includes(skill.owner || '')

  const installCmd = `clawhub install ${slug}`

  return (
    <>
      <style>{`
        .skill-page { max-width: 820px; margin: 0 auto; padding: 32px 20px 80px; }
        .breadcrumb { font-size: .82em; color: #4b5563; margin-bottom: 28px; }
        .breadcrumb a { color: #818cf8; text-decoration: none; }
        .breadcrumb a:hover { text-decoration: underline; }
        .skill-card { background: #0d0d1f; border: 1px solid #1e1e3f; border-radius: 20px; padding: 36px; margin-bottom: 24px; }
        .skill-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; margin-bottom: 20px; flex-wrap: wrap; }
        .skill-badges { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
        .badge { display: inline-flex; align-items: center; gap: 5px; font-size: .75em; font-weight: 600; padding: 4px 12px; border-radius: 999px; border: 1px solid transparent; }
        .skill-title { font-size: 2em; font-weight: 800; color: #f1f5f9; margin: 0 0 8px; line-height: 1.2; }
        .skill-owner { font-size: .88em; color: #4b5563; margin: 0 0 20px; }
        .skill-owner span { color: #818cf8; }
        .skill-desc { font-size: 1em; color: #94a3b8; line-height: 1.8; margin: 0 0 24px; }
        .skill-meta { display: flex; gap: 20px; flex-wrap: wrap; margin-bottom: 28px; padding-bottom: 24px; border-bottom: 1px solid #1e1e3f; }
        .meta-item { display: flex; flex-direction: column; gap: 2px; }
        .meta-label { font-size: .7em; color: #374151; text-transform: uppercase; letter-spacing: 1px; font-weight: 600; }
        .meta-value { font-size: .92em; color: #94a3b8; font-weight: 600; }
        .tags-row { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 28px; }
        .tag { font-size: .75em; color: #6366f1; background: #6366f115; border: 1px solid #6366f130; border-radius: 6px; padding: 3px 10px; text-decoration: none; }
        .tag:hover { background: #6366f125; }
        .install-box { background: #070714; border: 1px solid #1e1e3f; border-radius: 12px; overflow: hidden; margin-bottom: 24px; }
        .install-header { display: flex; align-items: center; justify-content: space-between; padding: 10px 16px; border-bottom: 1px solid #1e1e3f; }
        .install-dots { display: flex; gap: 6px; }
        .dot { width: 10px; height: 10px; border-radius: 50%; }
        .install-label { font-size: .72em; color: #374151; font-family: monospace; letter-spacing: 1px; }
        .install-body { padding: 16px 20px; display: flex; align-items: center; justify-content: space-between; gap: 12px; }
        .install-cmd { font-family: 'Courier New', monospace; font-size: 1em; color: #a5f3fc; }
        .copy-btn { font-size: .75em; color: #6366f1; background: #6366f115; border: 1px solid #6366f130; border-radius: 6px; padding: 5px 12px; cursor: pointer; white-space: nowrap; transition: all .15s; }
        .copy-btn:hover { background: #6366f125; }
        .btn-primary { display: inline-flex; align-items: center; gap: 8px; padding: 13px 28px; background: linear-gradient(135deg, #6366f1, #818cf8); border-radius: 10px; color: #fff; text-decoration: none; font-weight: 700; font-size: .95em; transition: opacity .15s; }
        .btn-primary:hover { opacity: .88; }
        .btn-secondary { display: inline-flex; align-items: center; gap: 8px; padding: 13px 24px; background: transparent; border: 1px solid #1e1e3f; border-radius: 10px; color: #6b7280; text-decoration: none; font-weight: 600; font-size: .95em; transition: all .15s; }
        .btn-secondary:hover { border-color: #818cf8; color: #818cf8; }
        .actions-row { display: flex; gap: 12px; flex-wrap: wrap; }
        .disclaimer { margin-top: 20px; padding: 14px 18px; background: #070714; border: 1px solid #1a1a3a; border-radius: 10px; font-size: .78em; color: #374151; line-height: 1.7; }
        .disclaimer a { color: #6366f1; }
        .ours-badge { display: inline-flex; align-items: center; gap: 6px; font-size: .72em; font-weight: 700; color: #22d3ee; background: #22d3ee10; border: 1px solid #22d3ee30; border-radius: 999px; padding: 4px 14px; }
        .cta-banner { background: linear-gradient(135deg, #0d0d1f, #13103a); border: 1px solid #6366f133; border-radius: 16px; padding: 24px 28px; display: flex; align-items: center; justify-content: space-between; gap: 16px; flex-wrap: wrap; margin-top: 8px; }
        .cta-title { font-weight: 700; color: #e2e8f0; margin: 0 0 4px; }
        .cta-sub { color: #4b5563; font-size: .86em; }
        @media (max-width: 600px) {
          .skill-card { padding: 22px; }
          .skill-title { font-size: 1.5em; }
          .cta-banner { flex-direction: column; align-items: flex-start; }
        }
      `}</style>

      <div className="skill-page">
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

        {/* Breadcrumb */}
        <div className="breadcrumb">
          <a href="/">BytesAgain</a> › <a href="/skills">Skills</a> › {skill.name || slug}
        </div>

        {/* Main card */}
        <div className="skill-card">
          {/* Header badges */}
          <div className="skill-header">
            <div className="skill-badges">
              <span className="badge" style={{ color: sm.color, background: sm.bg, borderColor: sm.color + '44' }}>
                {sm.emoji} {sm.label}
              </span>
              {skill.category && (
                <span className="badge" style={{ color: '#94a3b8', background: '#94a3b810', borderColor: '#94a3b820' }}>
                  {skill.category}
                </span>
              )}
            </div>
            {isOurs && (
              <span className="ours-badge">✦ BytesAgain</span>
            )}
          </div>

          {/* Title */}
          <h1 className="skill-title">{skill.name || slug}</h1>
          {skill.owner && (
            <p className="skill-owner">by <span>@{skill.owner}</span></p>
          )}

          {/* Description */}
          <p className="skill-desc">
            {skill.description || `${skill.name || slug} is an AI agent skill. Install it to supercharge your AI workflow.`}
          </p>

          {/* Meta row */}
          <div className="skill-meta">
            {skill.version && (
              <div className="meta-item">
                <span className="meta-label">Version</span>
                <span className="meta-value">v{skill.version}</span>
              </div>
            )}
            {(skill.downloads ?? 0) > 0 && (
              <div className="meta-item">
                <span className="meta-label">Downloads</span>
                <span className="meta-value">{skill.downloads?.toLocaleString()}</span>
              </div>
            )}
            {(skill as any).stars > 0 && (
              <div className="meta-item">
                <span className="meta-label">Stars</span>
                <span className="meta-value">⭐ {(skill as any).stars?.toLocaleString()}</span>
              </div>
            )}

          </div>

          {/* Tags */}
          {tags.length > 0 && (
            <div className="tags-row">
              {tags.slice(0, 8).map(t => (
                <a key={t} href={`/?q=${encodeURIComponent(t)}`} className="tag">#{t}</a>
              ))}
            </div>
          )}

          {/* Install command */}
          {isOurs && (
            <div className="install-box">
              <div className="install-header">
                <div className="install-dots">
                  <div className="dot" style={{ background: '#ff5f57' }} />
                  <div className="dot" style={{ background: '#febc2e' }} />
                  <div className="dot" style={{ background: '#28c840' }} />
                </div>
                <span className="install-label">TERMINAL</span>
                <span style={{ width: 52 }} />
              </div>
              <div className="install-body">
                <code className="install-cmd">$ {installCmd}</code>
                <button className="copy-btn" onClick={undefined}
                  data-cmd={installCmd}>
                  Copy
                </button>
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="actions-row">
            <a href={`/skills?q=${encodeURIComponent(skill.name || slug)}`} className="btn-primary">
              🔍 Find Similar Skills →
            </a>
            <a href="/skills" className="btn-secondary">
              Browse Skills
            </a>
            <a href={externalUrl} target="_blank" rel="noopener" className="btn-secondary">
              Original source
            </a>
          </div>

          {/* Disclaimer */}
          <div className="disclaimer">
            📋 Indexed summary from <a href={externalUrl} target="_blank" rel="noopener">{sm.label}</a>.
            {' '}BytesAgain keeps discovery and comparison on-site, while source ownership remains with the listed author/platform.
            {' '}We are independent and not affiliated with or endorsed by {sm.label}.
          </div>
        </div>

        {/* Related */}
        <RelatedContent category={skill.category} currentSlug={slug} name={skill.name} tags={tags} />

        {/* CTA banner */}
        <div className="cta-banner">
          <div>
            <p className="cta-title">🔍 Can&apos;t find the right skill?</p>
            <p className="cta-sub">Search 60,000+ AI agent skills — free, no login needed.</p>
          </div>
          <a href="/" className="btn-primary" style={{ fontSize: '.88em', padding: '10px 22px' }}>
            Search Skills →
          </a>
        </div>
      </div>

      <script dangerouslySetInnerHTML={{ __html: `
        document.querySelectorAll('.copy-btn').forEach(btn => {
          btn.addEventListener('click', () => {
            const cmd = btn.getAttribute('data-cmd');
            navigator.clipboard.writeText(cmd).then(() => {
              btn.textContent = 'Copied!';
              setTimeout(() => btn.textContent = 'Copy', 1500);
            });
          });
        });
      `}} />
    </>
  )
}
