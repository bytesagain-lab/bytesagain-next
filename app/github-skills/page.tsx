import type { Metadata } from 'next'
import Link from 'next/link'
import { getGithubSkillsPage } from '@/lib/github-skills'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'GitHub Indexed AI Skills | BytesAgain',
  description: 'Browse public GitHub-indexed AI agent skills discovered by BytesAgain. Search source-verified SKILL.md files and long-tail agent skill repositories.',
  alternates: { canonical: 'https://bytesagain.com/github-skills' },
}

function clean(value?: string | null) {
  return (value || '').replace(/\s+/g, ' ').trim()
}

function pageHref(page: number, q: string, tag: string) {
  const params = new URLSearchParams()
  if (q) params.set('q', q)
  if (tag) params.set('tag', tag)
  if (page > 1) params.set('page', String(page))
  const qs = params.toString()
  return `/github-skills${qs ? `?${qs}` : ''}`
}

export default async function GithubSkillsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; tag?: string; page?: string }>
}) {
  const sp = await searchParams
  const q = (sp.q || '').trim().slice(0, 120)
  const tag = (sp.tag || '').trim().slice(0, 60)
  const page = Math.max(1, Number.parseInt(sp.page || '1', 10) || 1)
  const pageSize = 48
  const { rows, total } = await getGithubSkillsPage({ q, tag, page, pageSize })
  const totalPages = Math.max(1, Math.ceil(total / pageSize))

  return (
    <main className="gh-list-shell">
      <style>{`
        .gh-list-shell { min-height: 100vh; background: radial-gradient(circle at 18% 0%, rgba(99,102,241,.20), transparent 32%), #050611; color: #e5e7eb; padding: 34px 20px 90px; }
        .wrap { max-width: 1180px; margin: 0 auto; }
        .breadcrumb { font-size: .85em; color: #64748b; margin-bottom: 22px; }
        .breadcrumb a { color: #a5b4fc; text-decoration: none; }
        .hero { background: linear-gradient(135deg, rgba(15,23,42,.96), rgba(13,13,31,.96)); border: 1px solid rgba(129,140,248,.22); border-radius: 28px; padding: clamp(28px, 5vw, 44px); margin-bottom: 22px; }
        .eyebrow { color: #fbbf24; font-weight: 900; font-size: .82rem; letter-spacing: .08em; text-transform: uppercase; margin-bottom: 10px; }
        h1 { font-size: clamp(2.1rem, 6vw, 4.2rem); line-height: .98; margin: 0 0 14px; letter-spacing: -0.055em; }
        .lede { color: #cbd5e1; line-height: 1.75; max-width: 760px; font-size: 1.08rem; }
        .searchbar { display: flex; gap: 10px; margin: 22px 0 10px; max-width: 760px; }
        .searchbar input { flex: 1; min-width: 0; background: #070714; border: 1px solid #1e1e3f; border-radius: 13px; color: #f8fafc; padding: 13px 15px; font-size: 1rem; }
        .searchbar button, .clear { border: 0; border-radius: 13px; padding: 13px 18px; font-weight: 900; color: white; background: linear-gradient(135deg, #6366f1, #22d3ee); text-decoration: none; cursor: pointer; }
        .clear { background: #0f172a; border: 1px solid #334155; color: #cbd5e1; }
        .summary { color: #94a3b8; margin: 12px 0 24px; }
        .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(270px, 1fr)); gap: 14px; }
        .card { display: block; height: 100%; color: inherit; text-decoration: none; background: rgba(13,13,31,.92); border: 1px solid #1e1e3f; border-radius: 18px; padding: 18px; transition: transform .18s ease, border-color .18s ease; }
        .card:hover { transform: translateY(-2px); border-color: #6366f1; }
        .badges { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 12px; }
        .badge { border: 1px solid #334155; color: #cbd5e1; background: #0f172a99; border-radius: 999px; padding: 4px 9px; font-size: .72rem; font-weight: 800; }
        .badge.green { color: #86efac; border-color: #22c55e44; background: #22c55e14; }
        .title { font-weight: 950; color: #f8fafc; font-size: 1.05rem; margin-bottom: 7px; overflow-wrap: anywhere; }
        .repo { color: #a5b4fc; font-size: .86rem; margin-bottom: 10px; overflow-wrap: anywhere; }
        .desc { color: #94a3b8; font-size: .9rem; line-height: 1.6; min-height: 58px; }
        .meta { display: flex; justify-content: space-between; gap: 10px; margin-top: 14px; color: #64748b; font-size: .82rem; }
        .tag-row { display: flex; gap: 6px; flex-wrap: wrap; margin-top: 12px; }
        .tag { color: #a5b4fc; border: 1px solid #6366f140; background: #6366f112; padding: 3px 8px; border-radius: 999px; font-size: .74rem; text-decoration: none; }
        .pager { display: flex; gap: 10px; justify-content: center; align-items: center; margin-top: 28px; }
        .page-link { color: #cbd5e1; text-decoration: none; border: 1px solid #334155; border-radius: 12px; padding: 10px 14px; background: #070714; }
        .page-text { color: #64748b; }
        @media (max-width: 640px) { .searchbar { flex-direction: column; } }
      `}</style>
      <div className="wrap">
        <div className="breadcrumb"><Link href="/">BytesAgain</Link> › GitHub Indexed Skills</div>
        <section className="hero">
          <div className="eyebrow">GitHub Indexed</div>
          <h1>Public AI agent skills from GitHub</h1>
          <p className="lede">Browse public SKILL.md files and agent skill repositories indexed by BytesAgain. These are discovery results from GitHub, separate from curated ClawHub skills.</p>
          <form className="searchbar" method="GET">
            <input name="q" defaultValue={q} placeholder="Search GitHub indexed skills…" />
            {tag && <input type="hidden" name="tag" value={tag} />}
            <button type="submit">Search</button>
            {(q || tag) && <Link className="clear" href="/github-skills">Clear</Link>}
          </form>
        </section>

        <div className="summary">
          {total.toLocaleString()} GitHub indexed skills{q ? ` matching “${q}”` : ''}{tag ? ` tagged #${tag}` : ''}
        </div>

        <div className="grid">
          {rows.map(row => {
            const name = row.name || row.repo
            const tags = row.tags || []
            return (
              <Link className="card" key={row.id} href={`/github-skill/${row.id}`}>
                <div className="badges">
                  <span className="badge">GitHub Indexed</span>
                  {row.verify_status === 'verified' && <span className="badge green">Verified</span>}
                </div>
                <div className="title">{name}</div>
                <div className="repo">{row.github_owner}/{row.repo}</div>
                <div className="desc">{clean(row.description).slice(0, 170)}{clean(row.description).length > 170 ? '…' : ''}</div>
                <div className="tag-row">
                  {tags.slice(0, 4).map(t => <span className="tag" key={t}>#{t}</span>)}
                </div>
                <div className="meta"><span>⭐ {(row.stars || 0).toLocaleString()}</span><span>Q {row.quality_score || 0}</span></div>
              </Link>
            )
          })}
        </div>

        <div className="pager">
          {page > 1 && <Link className="page-link" href={pageHref(page - 1, q, tag)}>← Previous</Link>}
          <span className="page-text">Page {page} / {totalPages.toLocaleString()}</span>
          {page < totalPages && <Link className="page-link" href={pageHref(page + 1, q, tag)}>Next →</Link>}
        </div>
      </div>
    </main>
  )
}
