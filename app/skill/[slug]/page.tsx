export const revalidate = 86400
import { getSkill, getSkills, getSkillEvaluation } from '@/lib/supabase'
import { fetchSkillDesc } from '@/lib/skill-desc'
import type { SkillEvaluationData } from '@/lib/supabase'
import { notFound, redirect } from 'next/navigation'
import type { Metadata } from 'next'
import RelatedContent from '@/app/components/RelatedContent'
import SkillActions from '@/app/components/SkillActions'
import { renderMarkdown, renderWhenToUse, renderCoreTypes, renderConstraints } from '@/lib/render-md'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  let skill = await getSkill(slug)
  // Fallback: strip clawhub- prefix for backward-compat
  if (!skill && slug.startsWith('clawhub-')) {
    skill = await getSkill(slug.slice('clawhub-'.length))
  }
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

  // Fallback: strip clawhub- prefix for backward-compat after DB cleanup
  if (!skill && slug.startsWith('clawhub-')) {
    const cleanSlug = slug.slice('clawhub-'.length)
    skill = await getSkill(cleanSlug)
    // If found via fallback, redirect to canonical slug to prevent duplicate pages
    if (skill) {
      redirect(`/skill/${cleanSlug}`)
    }
  }

  if (!skill) {
    try {
      const apiSlug = slug.startsWith('clawhub-') ? slug.slice('clawhub-'.length) : slug
      const res = await fetch(`https://clawhub.ai/api/v1/skills/${apiSlug}`, { next: { revalidate: 3600 } })
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

  // Banned skills: show 404
  if ((skill as any).source === 'banned') notFound()

  const source = (skill as any).source || 'clawhub'
  const sourceUrl = (skill as any).source_url || ''
  const tags: string[] = (skill as any).tags || []

  const sourceMeta: Record<string, { label: string; color: string; bg: string; emoji: string }> = {
    clawhub:  { label: 'ClawHub',  color: '#818cf8', bg: '#818cf822', emoji: '🦀' },
    github:   { label: 'GitHub',   color: '#94a3b8', bg: '#94a3b822', emoji: '⭐' },
    lobehub:  { label: 'LobeHub',  color: '#a78bfa', bg: '#a78bfa22', emoji: '🤖' },
    dify:     { label: 'Dify',     color: '#fbbf24', bg: '#fbbf2422', emoji: '🔧' },
    mcp:        { label: 'MCP',      color: '#34d399', bg: '#34d39922', emoji: '⚡' },
    skillssh:   { label: 'Skills.sh', color: '#7c3aed', bg: '#7c3aed22', emoji: '🛠️' },
    wechat:   { label: 'WeChat',   color: '#4ade80', bg: '#4ade8022', emoji: '💬' },
  }
  const sm = sourceMeta[source] || sourceMeta.clawhub

  const externalUrl = sourceUrl || (source === 'github'
    ? `https://github.com/${skill.owner}/${slug}`
    : `https://clawhub.ai/${skill.owner}/${slug}`)

  const OUR_ACCOUNTS = ['ckchzh', 'xueyetianya', 'bytesagain3', 'bytesagain-lab', 'loutai0307-prog', 'bytesagain1']
  const isOurs = (skill as any).is_ours === true || OUR_ACCOUNTS.includes(skill.owner || '')

  const installSlug = slug
  const installCmd = `clawhub install ${installSlug}`
  const canInstallWithClawHub = source !== 'github'

  // Fetch evaluation if it exists
  const evaluation = await getSkillEvaluation(slug)

  // Fetch SKILL.md structured data + script
  const skillDesc = await fetchSkillDesc(slug)

  // Fetch skill articles
  let skillArticles: any[] = []
  try {
    const articlesRes = await fetch(`https://bytesagain.com/api/skill-articles?slug=${encodeURIComponent(slug)}`, { next: { revalidate: 3600 } })
    if (articlesRes.ok) {
      skillArticles = await articlesRes.json()
    }
  } catch {}

  const hasScript = !!skillDesc.sections.script
  const hasArticles = skillArticles.length > 0

  return (
    <>
      <style>{`
        .skill-page { max-width: 1100px; margin: 0 auto; padding: 32px 20px 80px; }
        .two-col { display: flex; gap: 32px; align-items: flex-start; }
        .two-col-main { flex: 1; min-width: 0; }
        .two-col-side { width: 300px; flex-shrink: 0; }
        @media (max-width: 860px) {
          .two-col { flex-direction: column; }
          .two-col-side { width: 100%; }
        }
        .breadcrumb { font-size: .82em; color: var(--text-muted2); margin-bottom: 28px; }
        .breadcrumb a { color: #818cf8; text-decoration: none; }
        .breadcrumb a:hover { text-decoration: underline; }
        .skill-card { background: var(--bg-card); border: 1px solid var(--border-card); border-radius: 20px; padding: 28px; margin-bottom: 24px; }
        .skill-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; margin-bottom: 20px; flex-wrap: wrap; }
        .skill-badges { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
        .skill-top-actions { display: flex; align-items: center; gap: 10px; margin-left: auto; }
        .badge { display: inline-flex; align-items: center; gap: 5px; font-size: .75em; font-weight: 600; padding: 4px 12px; border-radius: 999px; border: 1px solid transparent; }
        .skill-title { font-size: 1.6em; font-weight: 800; color: var(--text-primary); margin: 0 0 4px; line-height: 1.2; }
        .skill-owner { font-size: .82em; color: var(--text-muted2); margin: 0 0 14px; }
        .skill-owner span { color: #818cf8; }
        .skill-desc { font-size: .92em; color: var(--text-secondary); line-height: 1.65; margin: 0 0 16px; }
        .skill-meta { display: flex; gap: 16px; flex-wrap: wrap; margin-bottom: 18px; padding-bottom: 16px; border-bottom: 1px solid var(--border-card); }
        .meta-item { display: flex; flex-direction: column; gap: 2px; }
        .meta-label { font-size: .7em; color: var(--text-muted5); text-transform: uppercase; letter-spacing: 1px; font-weight: 600; }
        .meta-value { font-size: .92em; color: var(--text-muted2); font-weight: 600; }
        .tags-row { display: flex; gap: 6px; flex-wrap: wrap; }
        .tag { font-size: .75em; color: #6366f1; background: #6366f115; border: 1px solid #6366f130; border-radius: 6px; padding: 3px 10px; text-decoration: none; }
        .tag:hover { background: #6366f125; }
        .install-box { background: var(--bg-deep); border: 1px solid var(--border-card); border-radius: 12px; overflow: hidden; margin-bottom: 24px; }
        .install-header { display: flex; align-items: center; justify-content: space-between; padding: 10px 16px; border-bottom: 1px solid var(--border-card); }
        .install-dots { display: flex; gap: 6px; }
        .dot { width: 10px; height: 10px; border-radius: 50%; }
        .install-label { font-size: .72em; color: var(--text-muted5); font-family: monospace; letter-spacing: 1px; }
        .install-body { padding: 16px 20px; display: flex; align-items: center; justify-content: space-between; gap: 12px; }
        .install-cmd { color: var(--text-code);
 font-family: 'Courier New', monospace; font-size: 1em; }
        .copy-btn { font-size: .75em; color: #6366f1; background: #6366f115; border: 1px solid #6366f130; border-radius: 6px; padding: 5px 12px; cursor: pointer; white-space: nowrap; transition: all .15s; }
        .copy-btn:hover { background: #6366f125; }
        .btn-secondary { display: inline-flex; align-items: center; gap: 8px; padding: 13px 24px; background: transparent; border: 1px solid var(--border-card); border-radius: 10px; color: #6b7280; text-decoration: none; font-weight: 600; font-size: .95em; transition: all .15s; }
        .btn-secondary:hover { border-color: #818cf8; color: #818cf8; }
        .ours-badge { display: inline-flex; align-items: center; gap: 6px; font-size: .72em; font-weight: 700; color: #22d3ee; background: #22d3ee10; border: 1px solid #22d3ee30; border-radius: 999px; padding: 4px 14px; }
        .section-card { background: var(--bg-card); border: 1px solid var(--border-card); border-radius: 16px; padding: 22px 24px; margin-bottom: 20px; }
        .section-title { color: var(--text-primary); font-size: 1.08em; font-weight: 800; margin: 0 0 12px; display: flex; align-items: center; gap: 8px; }
        /* Script box */
        .script-header { display: flex; align-items: center; justify-content: space-between; padding: 8px 14px; background: var(--bg-input); border-bottom: 1px solid var(--border-card); }
        .script-filename { font-size: .72em; color: var(--text-muted2); font-family: 'Courier New', monospace; }
        .script-copy-btn { font-size: .72em; color: #6366f1; background: none; border: 1px solid #6366f130; border-radius: 4px; padding: 2px 10px; cursor: pointer; }
        .script-copy-btn:hover { background: #6366f115; }
        .script-body { padding: 14px 16px; font-family: 'Courier New', monospace; font-size: .82em; line-height: 1.6; color: var(--text-code); overflow-x: auto; max-height: 420px; overflow-y: auto; white-space: pre; }
        /* Articles */
        .article-card { display: block; background: var(--bg-secondary); border: 1px solid var(--border-primary); border-radius: 10px; padding: 14px 16px; text-decoration: none; transition: border-color .15s; }
        .article-card:hover { border-color: #6366f1; }
        @media (max-width: 600px) {
          .skill-card { padding: 20px; }
          .skill-title { font-size: 1.5em; }
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

        {/* TWO-COLUMN LAYOUT: main content (left) + sidebar (right) */}
        <div className="two-col">
          {/* --- LEFT: Main content --- */}
          <div className="two-col-main">
            {/* 1. Skill 主卡片 */}
            <div className="skill-card">
              {/* Header: badge + actions */}
              <div className="skill-header">
                <div className="skill-badges">
                  <span className="badge" style={{ color: sm.color, background: sm.bg, borderColor: sm.color + '44' }}>
                    {sm.emoji} {sm.label}
                  </span>
                  {isOurs && (
                    <span className="ours-badge">✦ BytesAgain</span>
                  )}
                </div>
                <div className="skill-top-actions">
                  <SkillActions slug={slug} />
                </div>
              </div>

              {/* Title + owner */}
              <h1 className="skill-title">{skill.name || slug}</h1>
              {skill.owner && (
                <p className="skill-owner">by <span>@{skill.owner}</span></p>
              )}

              {/* Description */}
              <p className="skill-desc">
                {skill.description || `${skill.name || slug} is an AI agent skill. Install it to supercharge your AI workflow.`}
              </p>

              {/* Meta row + tags */}
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
                {((skill as any).installs_all_time ?? 0) > 0 && (
                  <div className="meta-item">
                    <span className="meta-label">Installs</span>
                    <span className="meta-value">{(skill as any).installs_all_time?.toLocaleString()}</span>
                  </div>
                )}
                {(skill as any).stars > 0 && (
                  <div className="meta-item">
                    <span className="meta-label">Stars</span>
                    <span className="meta-value">⭐ {(skill as any).stars?.toLocaleString()}</span>
                  </div>
                )}
                {((skill as any).comment_count ?? 0) > 0 && (
                  <div className="meta-item">
                    <span className="meta-label">Comments</span>
                    <span className="meta-value">{(skill as any).comment_count?.toLocaleString()}</span>
                  </div>
                )}
                {tags.length > 0 && (
                  <div className="meta-item" style={{ flexDirection: 'row', gap: 6, alignItems: 'center' }}>
                    {tags.slice(0, 5).map(t => (
                      <a key={t} href={`/?q=${encodeURIComponent(t)}`} className="tag">#{t}</a>
                    ))}
                  </div>
                )}
              </div>

              {/* Quick source link */}
              <div style={{ marginTop: 6 }}>
                <a href={externalUrl} target="_blank" rel="noopener" className="btn-secondary" style={{
                  padding: '6px 12px', fontSize: '.82em', borderRadius: 8, background: 'transparent',
                  border: '1px solid var(--border-card)', color: 'var(--text-muted2)', textDecoration: 'none', whiteSpace: 'nowrap'
                }}>
                  View on {sm.label} →
                </a>
              </div>
            </div>

            {/* 2. Install Box (prominent standalone) */}
            {canInstallWithClawHub && (
              <div className="install-box">
                <div className="install-header">
                  <div className="install-dots">
                    <div className="dot" style={{ background: '#ef4444' }} />
                    <div className="dot" style={{ background: '#eab308' }} />
                    <div className="dot" style={{ background: '#22c55e' }} />
                  </div>
                  <span className="install-label">TERMINAL</span>
                </div>
                <div className="install-body" style={{ flexWrap: 'wrap' }}>
                  <code className="install-cmd">{installCmd}</code>
                  <button className="copy-btn" data-cmd={installCmd} style={{ fontWeight: 700 }}>
                    Copy
                  </button>
                </div>
              </div>
            )}

            {/* SKILL.md Full Content — server-rendered for SEO */}
            {skillDesc.full_description && (
              <section className="skill-card" style={{ marginBottom: 20 }}>
                <h2 style={{ color: '#f8fafc', fontSize: '1.2em', fontWeight: 800, margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
                  📖 About This Skill
                </h2>
                <div style={{ fontSize: '.92em', color: '#94a3b8', lineHeight: 1.75 }}
                  dangerouslySetInnerHTML={{ __html: renderMarkdown(skillDesc.full_description) }} />
              </section>
            )}

            {skillDesc.sections.when_to_use && (
              <section className="skill-card" style={{ marginBottom: 20 }}>
                <h2 style={{ color: '#f8fafc', fontSize: '1.2em', fontWeight: 800, margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
                  ⚡ When to Use
                </h2>
                <div dangerouslySetInnerHTML={{ __html: renderWhenToUse(skillDesc.sections.when_to_use) }} />
              </section>
            )}

            {skillDesc.sections.examples && (
              <section className="skill-card" style={{ marginBottom: 20 }}>
                <h2 style={{ color: '#f8fafc', fontSize: '1.2em', fontWeight: 800, margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
                  💡 Examples
                </h2>
                <div style={{ fontSize: '.92em', color: '#94a3b8', lineHeight: 1.75 }}
                  dangerouslySetInnerHTML={{ __html: renderMarkdown(skillDesc.sections.examples) }} />
              </section>
            )}

            {skillDesc.sections.configuration && (
              <section className="skill-card" style={{ marginBottom: 20 }}>
                <h2 style={{ color: '#f8fafc', fontSize: '1.2em', fontWeight: 800, margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
                  ⚙️ Configuration
                </h2>
                <div style={{ fontSize: '.92em', color: '#94a3b8', lineHeight: 1.75 }}
                  dangerouslySetInnerHTML={{ __html: renderMarkdown(skillDesc.sections.configuration) }} />
              </section>
            )}

            {skillDesc.sections.tips && (
              <section className="skill-card" style={{ marginBottom: 20 }}>
                <h2 style={{ color: '#f8fafc', fontSize: '1.2em', fontWeight: 800, margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
                  📋 Tips & Best Practices
                </h2>
                <div style={{ fontSize: '.92em', color: '#94a3b8', lineHeight: 1.75 }}
                  dangerouslySetInnerHTML={{ __html: renderMarkdown(skillDesc.sections.tips) }} />
              </section>
            )}

            {skillDesc.sections.core_types && (
              <section className="skill-card" style={{ marginBottom: 20 }}>
                <h2 style={{ color: '#f8fafc', fontSize: '1.2em', fontWeight: 800, margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
                  📦 Core Types
                </h2>
                <div dangerouslySetInnerHTML={{ __html: renderCoreTypes(skillDesc.sections.core_types) }} />
              </section>
            )}

            {skillDesc.sections.constraints && (
              <section className="skill-card" style={{ marginBottom: 20 }}>
                <h2 style={{ color: '#f8fafc', fontSize: '1.2em', fontWeight: 800, margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
                  🔒 Constraints
                </h2>
                <div style={{ fontSize: '.92em', color: '#94a3b8', lineHeight: 1.75 }}
                  dangerouslySetInnerHTML={{ __html: renderConstraints(skillDesc.sections.constraints) }} />
              </section>
            )}

            {/* 3. Security & Quality Evaluation — summary only */}
            {evaluation && (
              <div className="skill-card" style={{ borderColor: evaluation.safety_score >= 80 ? '#22c55e44' : evaluation.safety_score >= 50 ? '#eab30844' : '#ef444444', marginBottom: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                  <span style={{
                    fontSize: '.78em', fontWeight: 700, padding: '6px 16px', borderRadius: 999,
                    background: evaluation.safety_score >= 80 ? '#22c55e22' : evaluation.safety_score >= 50 ? '#eab30822' : '#ef444422',
                    color: evaluation.safety_score >= 80 ? '#22c55e' : evaluation.safety_score >= 50 ? '#eab308' : '#ef4444',
                    border: '1px solid ' + (evaluation.safety_score >= 80 ? '#22c55e44' : evaluation.safety_score >= 50 ? '#eab30844' : '#ef444444'),
                  }}>
                    {evaluation.safety_score >= 80 ? '✅ Safe' : evaluation.safety_score >= 50 ? '⚠️ Suspicious' : '🚫 Dangerous'}
                  </span>
                  <span style={{ fontSize: '.8em', color: '#94a3b8', fontWeight: 600 }}>
                    Security Score: {evaluation.safety_score}/100
                  </span>
                  <span style={{ fontSize: '.8em', color: '#94a3b8', fontWeight: 600 }}>
                    Quality: {evaluation.quality_grade}
                  </span>
                  {evaluation.summary && (
                    <span style={{ fontSize: '.8em', color: '#64748b', flexBasis: '100%', marginTop: 4 }}>
                      {evaluation.summary}
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* 4. Script source */}
            {hasScript && (
              <div className="section-card" style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ padding: '18px 24px 0' }}>
                  <h2 className="section-title" style={{ marginBottom: 0 }}>💻 Source Code</h2>
                </div>
                <div className="script-box" style={{ margin: '14px 24px 20px', border: '1px solid var(--border-card)', borderRadius: 10 }}>
                  <div className="script-header">
                    <span className="script-filename">📄 script.sh</span>
                    <button
                      className="script-copy-btn"
                      data-cmd={skillDesc.sections.script || ''}
                      style={{ fontSize: '.72em', color: '#6366f1', background: 'none', border: '1px solid #6366f130', borderRadius: 4, padding: '2px 10px', cursor: 'pointer' }}
                    >
                      Copy
                    </button>
                  </div>
                  <pre className="script-body">{skillDesc.sections.script}</pre>
                </div>
              </div>
            )}

            {/* 5. Related Articles */}
            {hasArticles && (
              <div className="section-card">
                <h2 className="section-title">📖 Related Articles</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {skillArticles.map((article: any) => (
                    <a
                      key={article.slug}
                      href={`/article/${article.slug}`}
                      className="article-card"
                    >
                      <div style={{ fontWeight: 600, color: '#e0e0e0', fontSize: '.88em', marginBottom: 4 }}>
                        {article.title}
                      </div>
                      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', fontSize: '.72em', color: '#4b5563' }}>
                        {article.category && <span>{article.category}</span>}
                        {article.author_name && <span>by {article.author_name}</span>}
                        {article.published_at && <span>{new Date(article.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>}
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* --- RIGHT: Sidebar --- */}
          <div className="two-col-side">
            <RelatedContent category={skill.category} currentSlug={slug} name={skill.name} tags={tags} />
          </div>
        </div>
      </div>

      <script dangerouslySetInnerHTML={{ __html: `
        document.querySelectorAll('.copy-btn, .script-copy-btn').forEach(btn => {
          btn.addEventListener('click', () => {
            const cmd = btn.getAttribute('data-cmd');
            if (!cmd) return;
            navigator.clipboard.writeText(cmd).then(() => {
              const orig = btn.textContent;
              btn.textContent = 'Copied!';
              setTimeout(() => btn.textContent = orig, 1500);
            }).catch(() => {});
          });
        });
      `}} />
    </>
  )
}
