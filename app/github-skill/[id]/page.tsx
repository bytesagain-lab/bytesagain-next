import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getGithubSkill, getRelatedGithubSkills } from '@/lib/github-skills'

export const revalidate = 86400

type GithubSkillLike = {
  id?: string
  name?: string | null
  repo: string
  github_owner: string
  description?: string | null
  skill_md_excerpt?: string | null
}

function cleanDescription(value?: string | null) {
  return (value || '').replace(/\s+/g, ' ').trim()
}

function displayName(row: { name?: string | null; repo: string }) {
  return row.name || row.repo
}

function stripFrontmatter(text: string) {
  return text.replace(/^---\s+.+?\s+---\s+/i, '')
}

function skillMdDescription(excerpt?: string | null) {
  const text = cleanDescription(excerpt)
  if (!text) return ''
  const fm = text.match(/description:\s*(.+?)(?:\s+Use when\b|\s+---\s+#|\s+#\s|$)/i)
  return cleanDescription(fm?.[1] || '')
}

function extractSection(excerpt: string | null | undefined, heading: string, max = 900) {
  const text = cleanDescription(excerpt)
  if (!text) return ''
  const escaped = heading.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const pattern = new RegExp(`##\\s+${escaped}\\s+(.+?)(?=\\s+##\\s+|$)`, 'i')
  const match = text.match(pattern)
  return cleanDescription(match?.[1] || '').slice(0, max)
}

function extractBullets(section: string, maxItems = 6) {
  const matches = [...section.matchAll(/(?:^|\s)-\s+(.+?)(?=\s+-\s+|$)/g)]
  const bullets = matches.map(m => cleanDescription(m[1]).replace(/\*\*/g, '')).filter(Boolean)
  return bullets.slice(0, maxItems)
}

function skillMdOverview(excerpt?: string | null) {
  const overview = extractSection(excerpt, 'Overview', 950)
  if (overview) return overview
  const text = stripFrontmatter(cleanDescription(excerpt))
  return text.replace(/^#\s+[^#]+\s+/i, '').slice(0, 950)
}

function skillMdProcess(excerpt?: string | null) {
  return extractSection(excerpt, 'The Process', 1000) || extractSection(excerpt, 'Process', 1000) || extractSection(excerpt, 'Workflow', 1000)
}

function bestDescription(row: GithubSkillLike) {
  return skillMdDescription(row.skill_md_excerpt) || cleanDescription(row.description) || `GitHub-indexed SKILL.md from ${row.github_owner}/${row.repo}.`
}

function sentenceList(text: string, maxItems = 4) {
  return text
    .split(/(?<=[.!?])\s+/)
    .map(s => cleanDescription(s))
    .filter(s => s.length > 35)
    .slice(0, maxItems)
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const row = await getGithubSkill(id)
  if (!row) return { title: 'GitHub Skill Not Found' }

  const name = displayName(row)
  const desc = bestDescription(row)
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
  const desc = bestDescription(row)
  const overview = skillMdOverview(row.skill_md_excerpt)
  const whenToUseSection = extractSection(row.skill_md_excerpt, 'When to Use', 1200)
  const whenToUse = extractBullets(whenToUseSection, 7)
  const process = skillMdProcess(row.skill_md_excerpt)
  const processHighlights = sentenceList(process, 5)
  const isSourceVerified = row.verify_status === 'verified'
  const tags = row.tags || []
  const updated = row.updated_at ? new Date(row.updated_at).toISOString().slice(0, 10) : null
  const sourceUrl = row.github_verified_url || row.github_url

  return (
    <>
      <style>{`
        .gh-shell { min-height: 100vh; background: radial-gradient(circle at 18% 0%, rgba(99,102,241,.22), transparent 32%), radial-gradient(circle at 88% 12%, rgba(34,211,238,.12), transparent 28%), #050611; color: #e5e7eb; }
        .gh-page { max-width: 1180px; margin: 0 auto; padding: 32px 20px 96px; }
        .breadcrumb { font-size: .85em; color: #64748b; margin-bottom: 24px; }
        .breadcrumb a { color: #a5b4fc; text-decoration: none; }
        .hero { position: relative; overflow: hidden; background: linear-gradient(135deg, rgba(15,23,42,.96), rgba(13,13,31,.96)); border: 1px solid rgba(129,140,248,.22); border-radius: 28px; padding: clamp(28px, 5vw, 48px); box-shadow: 0 24px 80px rgba(0,0,0,.35); }
        .hero:before { content: ''; position: absolute; inset: -1px; background: radial-gradient(circle at 20% 0%, rgba(129,140,248,.22), transparent 36%); pointer-events: none; }
        .hero-inner { position: relative; z-index: 1; max-width: 820px; }
        .badges { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 18px; }
        .badge { display: inline-flex; align-items: center; gap: 6px; border-radius: 999px; padding: 6px 12px; font-size: .76em; font-weight: 800; border: 1px solid #334155; color: #cbd5e1; background: rgba(15,23,42,.68); }
        .badge.gold { color: #fbbf24; border-color: #fbbf2444; background: #fbbf2414; }
        .badge.green { color: #86efac; border-color: #22c55e44; background: #22c55e14; }
        h1 { font-size: clamp(2.25rem, 6vw, 4.4rem); line-height: .98; margin: 0 0 14px; letter-spacing: -0.055em; }
        .repo { color: #94a3b8; margin: 0 0 22px; }
        .repo span { color: #a5b4fc; font-weight: 800; }
        .desc { color: #dbeafe; line-height: 1.75; font-size: clamp(1.05rem, 2vw, 1.22rem); margin: 0 0 26px; max-width: 760px; }
        .actions { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 26px; }
        .btn { display: inline-flex; align-items: center; gap: 8px; padding: 12px 20px; min-height: 44px; border-radius: 13px; text-decoration: none; font-weight: 900; transition: transform .18s ease, border-color .18s ease, background .18s ease; }
        .btn:hover { transform: translateY(-1px); }
        .btn-primary { background: linear-gradient(135deg, #6366f1, #22d3ee); color: white; box-shadow: 0 12px 32px rgba(99,102,241,.28); }
        .btn-secondary { border: 1px solid #334155; color: #cbd5e1; background: rgba(2,6,23,.4); }
        .layout { display: grid; grid-template-columns: minmax(0, 1fr) 320px; gap: 24px; margin-top: 26px; align-items: start; }
        .main-col { min-width: 0; }
        .section { background: rgba(13,13,31,.92); border: 1px solid #1e1e3f; border-radius: 22px; padding: 26px; margin-bottom: 18px; }
        .section h2 { margin: 0 0 14px; font-size: 1.15rem; letter-spacing: -.02em; }
        .section-lede { color: #cbd5e1; line-height: 1.8; margin: 0; }
        .bullets { display: grid; gap: 10px; margin: 0; padding: 0; list-style: none; }
        .bullets li { position: relative; padding: 13px 14px 13px 40px; border: 1px solid #1e293b; border-radius: 14px; background: #070714; color: #cbd5e1; line-height: 1.55; }
        .bullets li:before { content: '✓'; position: absolute; left: 14px; top: 13px; color: #22d3ee; font-weight: 900; }
        .process-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(190px, 1fr)); gap: 10px; }
        .process-card { border: 1px solid #1e293b; border-radius: 14px; background: #070714; padding: 14px; color: #cbd5e1; line-height: 1.55; }
        .path { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; color: #67e8f9; background: #020617; border: 1px solid #1e293b; border-radius: 12px; padding: 13px; overflow-wrap: anywhere; font-size: .9rem; }
        .sidebar { position: sticky; top: 20px; display: grid; gap: 14px; }
        .side-card { background: rgba(7,7,20,.95); border: 1px solid #1e1e3f; border-radius: 20px; padding: 18px; }
        .side-card h3 { margin: 0 0 14px; font-size: 1rem; }
        .stat-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .stat { background: #020617; border: 1px solid #1e293b; border-radius: 14px; padding: 12px; }
        .stat-label { color: #64748b; font-size: .72em; text-transform: uppercase; letter-spacing: .08em; margin-bottom: 5px; }
        .stat-value { color: #f8fafc; font-weight: 900; overflow-wrap: anywhere; }
        .notice { padding: 14px; border-radius: 14px; background: #f59e0b10; border: 1px solid #f59e0b30; color: #fcd34d; font-size: .86em; line-height: 1.6; }
        .source-link { color: #93c5fd; text-decoration: none; font-weight: 800; overflow-wrap: anywhere; }
        .tag-row { display: flex; gap: 8px; flex-wrap: wrap; }
        .tag { color: #a5b4fc; border: 1px solid #6366f140; background: #6366f112; padding: 5px 10px; border-radius: 999px; font-size: .78em; text-decoration: none; }
        .related { display: grid; grid-template-columns: repeat(auto-fit, minmax(230px, 1fr)); gap: 12px; }
        .related-card { display: block; text-decoration: none; color: inherit; background: #070714; border: 1px solid #1e1e3f; border-radius: 15px; padding: 16px; transition: border-color .18s ease, transform .18s ease; }
        .related-card:hover { border-color: #6366f1; transform: translateY(-1px); }
        .related-title { color: #f8fafc; font-weight: 900; margin-bottom: 6px; }
        .related-desc { color: #64748b; font-size: .85em; line-height: 1.5; }
        @media (max-width: 900px) { .layout { grid-template-columns: 1fr; } .sidebar { position: static; } .hero { border-radius: 22px; } }
      `}</style>

      <main className="gh-shell">
        <div className="gh-page">
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
            <div className="hero-inner">
              <div className="badges">
                <span className="badge gold">⭐ GitHub Indexed</span>
                <span className={isSourceVerified ? 'badge green' : 'badge'}>{isSourceVerified ? 'Source verified' : 'Not source verified'}</span>
                <span className="badge">Public GitHub source</span>
              </div>
              <h1>{name}</h1>
              <p className="repo">from <span>{row.github_owner}/{row.repo}</span></p>
              <p className="desc">{desc}</p>
              <div className="actions">
                <a className="btn btn-primary" href={row.github_url} target="_blank" rel="noopener noreferrer">View on GitHub →</a>
                {row.github_verified_url && <a className="btn btn-secondary" href={row.github_verified_url} target="_blank" rel="noopener noreferrer">Raw SKILL.md</a>}
                <a className="btn btn-secondary" href={`/api/github-skills?q=${encodeURIComponent(name)}&limit=10`}>Find similar</a>
              </div>
            </div>
          </section>

          <div className="layout">
            <div className="main-col">
              {overview && (
                <section className="section">
                  <h2>What it does</h2>
                  <p className="section-lede">{overview}{cleanDescription(row.skill_md_excerpt).length > overview.length ? '…' : ''}</p>
                </section>
              )}

              {whenToUse.length > 0 && (
                <section className="section">
                  <h2>When to use</h2>
                  <ul className="bullets">
                    {whenToUse.map((item, idx) => <li key={idx}>{item}</li>)}
                  </ul>
                </section>
              )}

              {processHighlights.length > 0 && (
                <section className="section">
                  <h2>Workflow / process</h2>
                  <div className="process-grid">
                    {processHighlights.map((item, idx) => <div className="process-card" key={idx}>{item}</div>)}
                  </div>
                </section>
              )}

              <section className="section">
                <h2>Indexed source</h2>
                <div className="path">{row.path}</div>
              </section>

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
            </div>

            <aside className="sidebar" aria-label="Skill source details">
              <div className="side-card">
                <h3>Quick info</h3>
                <div className="stat-grid">
                  <div className="stat"><div className="stat-label">Stars</div><div className="stat-value">{(row.stars || 0).toLocaleString()}</div></div>
                  <div className="stat"><div className="stat-label">Quality</div><div className="stat-value">{row.quality_score || 0}</div></div>
                  <div className="stat"><div className="stat-label">Updated</div><div className="stat-value">{updated || 'Unknown'}</div></div>
                  <div className="stat"><div className="stat-label">Source</div><div className="stat-value">{isSourceVerified ? 'Verified' : 'Indexed'}</div></div>
                </div>
              </div>

              <div className="side-card">
                <h3>Source</h3>
                <p className="section-lede" style={{ fontSize: '.92rem' }}>{row.github_owner}/{row.repo}</p>
                <p><a className="source-link" href={sourceUrl} target="_blank" rel="noopener noreferrer">Open source file →</a></p>
              </div>

              {tags.length > 0 && (
                <div className="side-card">
                  <h3>Tags</h3>
                  <div className="tag-row">{tags.slice(0, 10).map(t => <a key={t} className="tag" href={`/api/github-skills?q=${encodeURIComponent(t)}&limit=20`}>#{t}</a>)}</div>
                </div>
              )}

              <div className="notice">
                GitHub Indexed pages are generated from public repositories. Source verified means BytesAgain fetched the public SKILL.md successfully; it is still separate from curated ClawHub skills.
              </div>
            </aside>
          </div>
        </div>
      </main>
    </>
  )
}
