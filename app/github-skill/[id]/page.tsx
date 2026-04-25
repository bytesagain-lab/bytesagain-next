import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getGithubSkill, getRelatedGithubSkills } from '@/lib/github-skills'

export const revalidate = 86400

function cleanDescription(value?: string | null) {
  return (value || '').replace(/\s+/g, ' ').trim()
}

function displayName(row: { name?: string | null; repo: string }) {
  return row.name || row.repo
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const row = await getGithubSkill(id)
  if (!row) return { title: 'GitHub Skill Not Found' }

  const name = displayName(row)
  const desc = cleanDescription(row.description) || `GitHub-indexed SKILL.md from ${row.github_owner}/${row.repo}.`
  const metaDesc = desc.length > 160 ? desc.slice(0, 157) + '...' : desc
  const url = `https://bytesagain.com/github-skill/${row.id}`

  return {
    title: `${name} — GitHub Indexed AI Skill | BytesAgain`,
    description: metaDesc,
    alternates: { canonical: url },
    openGraph: {
      title: `${name} — GitHub Indexed AI Skill`,
      description: metaDesc,
      url,
      type: 'website',
      siteName: 'BytesAgain',
      images: [{ url: 'https://bytesagain.com/social-preview.png', width: 1200, height: 630 }],
    },
    twitter: { card: 'summary_large_image', title: `${name} — GitHub Indexed AI Skill`, description: metaDesc },
  }
}

export default async function GithubSkillPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const row = await getGithubSkill(id)
  if (!row) notFound()

  const related = await getRelatedGithubSkills(row, 6)
  const name = displayName(row)
  const desc = cleanDescription(row.description) || `A public GitHub SKILL.md indexed by BytesAgain from ${row.github_owner}/${row.repo}.`
  const tags = row.tags || []
  const updated = row.updated_at ? new Date(row.updated_at).toISOString().slice(0, 10) : null

  return (
    <>
      <style>{`
        .gh-page { max-width: 920px; margin: 0 auto; padding: 32px 20px 90px; color: #e5e7eb; }
        .breadcrumb { font-size: .85em; color: #64748b; margin-bottom: 28px; }
        .breadcrumb a { color: #818cf8; text-decoration: none; }
        .hero { background: radial-gradient(circle at 20% 0%, #1e1b4b55, transparent 36%), #0d0d1f; border: 1px solid #1e1e3f; border-radius: 22px; padding: 34px; }
        .badges { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 18px; }
        .badge { display: inline-flex; align-items: center; gap: 6px; border-radius: 999px; padding: 5px 12px; font-size: .76em; font-weight: 700; border: 1px solid #334155; color: #94a3b8; background: #0f172a66; }
        .badge.gold { color: #fbbf24; border-color: #fbbf2444; background: #fbbf2414; }
        h1 { font-size: clamp(2rem, 5vw, 3.2rem); line-height: 1.04; margin: 0 0 12px; letter-spacing: -0.04em; }
        .repo { color: #94a3b8; margin: 0 0 24px; }
        .repo span { color: #a5b4fc; }
        .desc { color: #cbd5e1; line-height: 1.8; font-size: 1.05rem; margin: 0 0 26px; }
        .meta { display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 12px; margin: 24px 0; }
        .meta-item { background: #070714; border: 1px solid #1e1e3f; border-radius: 12px; padding: 14px; }
        .meta-label { color: #64748b; font-size: .72em; text-transform: uppercase; letter-spacing: .08em; margin-bottom: 4px; }
        .meta-value { color: #f8fafc; font-weight: 800; }
        .actions { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 26px; }
        .btn { display: inline-flex; align-items: center; gap: 8px; padding: 12px 20px; border-radius: 11px; text-decoration: none; font-weight: 800; }
        .btn-primary { background: linear-gradient(135deg, #6366f1, #818cf8); color: white; }
        .btn-secondary { border: 1px solid #334155; color: #cbd5e1; background: #02061722; }
        .notice { margin-top: 20px; padding: 14px 16px; border-radius: 12px; background: #f59e0b10; border: 1px solid #f59e0b30; color: #fcd34d; font-size: .88em; line-height: 1.6; }
        .section { margin-top: 28px; background: #0d0d1f; border: 1px solid #1e1e3f; border-radius: 18px; padding: 24px; }
        .section h2 { margin: 0 0 16px; font-size: 1.2rem; }
        .path { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; color: #67e8f9; background: #020617; border: 1px solid #1e293b; border-radius: 10px; padding: 12px; overflow-wrap: anywhere; }
        .tag-row { display: flex; gap: 8px; flex-wrap: wrap; }
        .tag { color: #a5b4fc; border: 1px solid #6366f140; background: #6366f112; padding: 4px 10px; border-radius: 999px; font-size: .78em; text-decoration: none; }
        .related { display: grid; grid-template-columns: repeat(auto-fit, minmax(230px, 1fr)); gap: 12px; }
        .related-card { display: block; text-decoration: none; color: inherit; background: #070714; border: 1px solid #1e1e3f; border-radius: 13px; padding: 16px; }
        .related-card:hover { border-color: #6366f1; }
        .related-title { color: #f8fafc; font-weight: 800; margin-bottom: 6px; }
        .related-desc { color: #64748b; font-size: .85em; line-height: 1.5; }
      `}</style>

      <main className="gh-page">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'SoftwareSourceCode',
          name,
          description: desc,
          url: `https://bytesagain.com/github-skill/${row.id}`,
          codeRepository: row.github_url,
          programmingLanguage: row.language || 'SKILL.md',
          isBasedOn: row.github_url,
          publisher: { '@type': 'Organization', name: 'BytesAgain', url: 'https://bytesagain.com' },
        }) }} />

        <div className="breadcrumb"><a href="/">BytesAgain</a> › <a href="/skills">Skills</a> › GitHub Indexed › {name}</div>

        <section className="hero">
          <div className="badges">
            <span className="badge gold">⭐ GitHub Indexed</span>
            <span className="badge">Not verified by BytesAgain</span>
            {tags.slice(0, 4).map(t => <span key={t} className="badge">#{t}</span>)}
          </div>
          <h1>{name}</h1>
          <p className="repo">from <span>{row.github_owner}/{row.repo}</span></p>
          <p className="desc">{desc}</p>

          <div className="meta">
            <div className="meta-item"><div className="meta-label">Stars</div><div className="meta-value">{(row.stars || 0).toLocaleString()}</div></div>
            <div className="meta-item"><div className="meta-label">Quality Score</div><div className="meta-value">{row.quality_score || 0}</div></div>
            <div className="meta-item"><div className="meta-label">Updated</div><div className="meta-value">{updated || 'Unknown'}</div></div>
            <div className="meta-item"><div className="meta-label">Source</div><div className="meta-value">GitHub</div></div>
          </div>

          <div className="actions">
            <a className="btn btn-primary" href={row.github_url} target="_blank" rel="noopener noreferrer">View on GitHub →</a>
            {row.skillsmp_url && <a className="btn btn-secondary" href={row.skillsmp_url} target="_blank" rel="noopener noreferrer">View source index</a>}
            <a className="btn btn-secondary" href={`/api/github-skills?q=${encodeURIComponent(name)}&limit=10`}>API results</a>
          </div>

          <div className="notice">
            This page is part of BytesAgain's experimental GitHub Skill Index. It is automatically indexed from public GitHub SKILL.md metadata and is separated from curated/verified ClawHub skills.
          </div>
        </section>

        <section className="section">
          <h2>Indexed path</h2>
          <div className="path">{row.path}</div>
        </section>

        {tags.length > 0 && (
          <section className="section">
            <h2>Tags</h2>
            <div className="tag-row">{tags.map(t => <a key={t} className="tag" href={`/api/github-skills?q=${encodeURIComponent(t)}&limit=20`}>#{t}</a>)}</div>
          </section>
        )}

        {related.length > 0 && (
          <section className="section">
            <h2>Related GitHub indexed skills</h2>
            <div className="related">
              {related.map(r => (
                <a className="related-card" key={r.id} href={`/github-skill/${r.id}`}>
                  <div className="related-title">{r.name || r.repo}</div>
                  <div className="related-desc">{cleanDescription(r.description).slice(0, 120)}{cleanDescription(r.description).length > 120 ? '...' : ''}</div>
                </a>
              ))}
            </div>
          </section>
        )}
      </main>
    </>
  )
}
