export const dynamic = 'force-dynamic'

import { notFound, redirect } from 'next/navigation'
import type { Metadata } from 'next'
import UseCaseClient, { UseCaseSaveButton } from './UseCaseClient'

type Props = { params: Promise<{ slug: string }> }

type SkillItem = { slug: string; name?: string; reason?: string }

type UseCaseRow = {
  slug: string
  title: string
  description?: string | null
  icon?: string | null
  skills?: SkillItem[] | null
  search_link?: string | null
}

const SB_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://jfpeycpiyayrpjldppzq.supabase.co'
const SB_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || ''
const STORAGE_URL = 'https://jfpeycpiyayrpjldppzq.supabase.co/storage/v1/object/public/article-images'

async function fetchArticle(slug: string) {
  if (!SB_KEY) return null
  const res = await fetch(`${SB_URL}/rest/v1/posts?slug=eq.${encodeURIComponent(slug)}&select=title,slug,content&limit=1`, {
    headers: { apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}` },
    cache: 'no-store',
  })
  if (!res.ok) return null
  const data = await res.json()
  return data[0] || null
}

// Extract article slug from search_link (/article/xxx or /xxx)
function getArticleSlug(uc: UseCaseRow): string | null {
  const link = uc.search_link || ''
  const m = link.match(/\/article\/([a-z0-9-]+)/)
  return m ? m[1] : null
}
const SB_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

async function sbFetch(path: string) {
  const res = await fetch(`${SB_URL}/rest/v1/${path}`, {
    headers: { apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}` },
    cache: 'no-store',
  })
  if (!res.ok) return []
  return res.json()
}

function clean(value?: string | null) {
  return (value || '').replace(/\s+/g, ' ').trim()
}

function safeToken(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9-]+/g, '').slice(0, 48)
}

function skillSlugs(uc: UseCaseRow) {
  return Array.isArray(uc.skills) ? uc.skills.map(s => s.slug).filter(Boolean).slice(0, 6) : []
}

function keywordTokens(uc: UseCaseRow) {
  const base = `${uc.title} ${uc.description || ''}`
    .split(/\s+/)
    .map(safeToken)
    .filter(t => t.length > 3 && !['with', 'your', 'from', 'this', 'that', 'skills', 'skill', 'agent', 'using'].includes(t))
    .slice(0, 4)
  return Array.from(new Set([...base, ...skillSlugs(uc).slice(0, 3)]))
}

async function getUseCase(slug: string): Promise<UseCaseRow | null> {
  const safeSlug = encodeURIComponent(slug)
  const data = await sbFetch(`use_cases?select=slug,title,description,icon,skills,search_link&slug=eq.${safeSlug}&limit=1`)
  return data[0] || null
}

async function getRelatedUseCases(uc: UseCaseRow) {
  const safeSlug = encodeURIComponent(uc.slug)
  const rows = await sbFetch(`use_cases?select=slug,title,icon,skills&slug=neq.${safeSlug}&limit=24`)
  return rows.filter((u: any) => Array.isArray(u.skills) && u.skills.length >= 3).slice(0, 6)
}

async function getRelatedArticles(uc: UseCaseRow) {
  const tokens = keywordTokens(uc).slice(0, 5)
  if (!tokens.length) return []
  const orClause = tokens
    .map(t => `title.ilike.*${encodeURIComponent(t)}*,content.ilike.*${encodeURIComponent(t)}*`)
    .join(',')
  const rows = await sbFetch(`posts?select=slug,title,category,published_at&post_type=eq.article&status=eq.published&or=(${orClause})&order=published_at.desc&limit=8`)
  return rows.slice(0, 4)
}

export async function generateStaticParams() {
  return []
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const uc = await getUseCase(slug)
  if (!uc) return { title: 'Not Found' }
  return {
    title: `${uc.title} — AI Skill Stack | BytesAgain`,
    description: uc.description || `Recommended AI agent skills for ${uc.title}.`,
    alternates: { canonical: `https://bytesagain.com/use-case/${slug}` },
    openGraph: {
      title: `${uc.title} — AI Skill Stack`,
      description: uc.description || `Recommended AI agent skills for ${uc.title}.`,
      url: `https://bytesagain.com/use-case/${slug}`,
      type: 'website',
      siteName: 'BytesAgain',
    },
  }
}

export default async function UseCasePage({ params }: Props) {
  const { slug } = await params
  const uc = await getUseCase(slug)
  if (!uc) redirect('/use-case')

  const skills = (Array.isArray(uc.skills) ? uc.skills : [])
    .filter((s: any) => s?.slug)
    .map((s: any) => ({
      slug: s.slug,
      name: s.name || s.slug.replace(/-/g, ' '),
      reason: s.reason || `Useful for ${uc.title}`,
      description: s.description,
    }))
  const [related, articles] = await Promise.all([getRelatedUseCases(uc), getRelatedArticles(uc)])
  const description = clean(uc.description) || `A curated AI skill stack for ${uc.title}.`

  // Fetch evaluation article if linked
  const articleSlug = getArticleSlug(uc)
  const evaluationArticle = articleSlug ? await fetchArticle(articleSlug) : null

  return (
    <main className="uc-shell">
      <style>{`
        .uc-shell { min-height: 100vh; background: radial-gradient(circle at 15% 0%, rgba(52,211,153,.16), transparent 30%), #050611; color: #e5e7eb; padding: 34px 20px 90px; }
        .uc-page { max-width: 1120px; margin: 0 auto; }
        .breadcrumb { font-size: .85rem; color: #64748b; margin-bottom: 22px; }
        .breadcrumb a { color: #a5b4fc; text-decoration: none; }
        .hero { background: linear-gradient(135deg, rgba(15,23,42,.96), rgba(13,13,31,.96)); border: 1px solid rgba(52,211,153,.22); border-radius: 28px; padding: clamp(28px,5vw,46px); margin-bottom: 22px; }
        .hero-top { display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; flex-wrap: wrap; margin-bottom: 16px; }
        .badge { display: inline-flex; border: 1px solid #34d39944; background: #34d39914; color: #86efac; border-radius: 999px; padding: 6px 12px; font-weight: 900; font-size: .78rem; }
        h1 { font-size: clamp(2.1rem,6vw,4rem); line-height: 1; letter-spacing: -.055em; margin: 0 0 14px; }
        .lede { color: #cbd5e1; line-height: 1.75; font-size: 1.08rem; max-width: 780px; }
        .actions { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 24px; }
        .btn { display: inline-flex; padding: 12px 18px; border-radius: 13px; text-decoration: none; font-weight: 900; }
        .btn-primary { color: white; background: linear-gradient(135deg,#34d399,#22d3ee); }
        .btn-secondary { color: #cbd5e1; border: 1px solid #334155; background: #02061766; }
        .layout { display: grid; grid-template-columns: minmax(0,1fr) 330px; gap: 22px; align-items: start; }
        .card { background: rgba(13,13,31,.94); border: 1px solid #1e1e3f; border-radius: 22px; padding: 24px; margin-bottom: 16px; }
        .card h2 { margin: 0 0 13px; font-size: 1.12rem; }
        .muted { color: #94a3b8; line-height: 1.7; }
        .steps { display: grid; gap: 10px; margin: 0; padding: 0; list-style: none; }
        .steps li { display: grid; grid-template-columns: 28px 1fr; gap: 10px; color: #cbd5e1; background: #070714; border: 1px solid #1e293b; border-radius: 14px; padding: 13px; line-height: 1.55; }
        .num { width: 28px; height: 28px; display: inline-grid; place-items: center; border-radius: 999px; background: #34d39922; color: #86efac; font-weight: 900; }
        .article-list, .related-grid { display: grid; gap: 10px; }
        .article-link, .related-link { display: block; text-decoration: none; color: inherit; background: #070714; border: 1px solid #1e293b; border-radius: 14px; padding: 14px; }
        .article-link:hover, .related-link:hover { border-color: #34d39988; }
        .article-title, .related-title { color: #f8fafc; font-weight: 900; margin-bottom: 5px; }
        .article-meta, .related-meta { color: #64748b; font-size: .82rem; }
        .sidebar { position: sticky; top: 18px; }
        .stat { display: flex; justify-content: space-between; gap: 12px; padding: 10px 0; border-bottom: 1px solid #1e293b; color: #94a3b8; }
        .stat strong { color: #f8fafc; }
        .disclaimer { color: #fbbf24; background: #f59e0b10; border: 1px solid #f59e0b30; border-radius: 14px; padding: 13px; font-size: .86rem; line-height: 1.6; }
        @media (max-width: 900px) { .layout { grid-template-columns: 1fr; } .sidebar { position: static; } }
      `}</style>

      <div className="uc-page">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'HowTo',
          name: uc.title,
          description,
          url: `https://bytesagain.com/use-case/${slug}`,
          step: skills.map((s: any, i: number) => ({
            '@type': 'HowToStep',
            position: i + 1,
            name: s.name,
            text: s.reason,
            url: `https://bytesagain.com/skill/${s.slug}`,
          })),
          publisher: { '@type': 'Organization', name: 'BytesAgain', url: 'https://bytesagain.com' },
        }) }} />

        <div className="breadcrumb"><a href="/">BytesAgain</a> › <a href="/use-case">Use Cases</a> › {uc.title}</div>

        <section className="hero">
          <div className="hero-top">
            <div className="badge">{uc.icon || '🗺️'} Use Case Guide</div>
            <UseCaseSaveButton slug={slug} />
          </div>
          <h1>{uc.title}</h1>
          <p className="lede">{description}</p>
          <div className="actions">
            <a className="btn btn-primary" href={uc.search_link || `/skills?q=${encodeURIComponent(uc.title)}`}>Browse matching skills →</a>
            <a className="btn btn-secondary" href="#recommended-skills">View stack</a>
            {articles[0] && <a className="btn btn-secondary" href={`/article/${articles[0].slug}`}>Read article</a>}
          </div>
        </section>

        <div className="layout">
          <div>
            {evaluationArticle ? (
              <section className="card">
                <h2>📊 Evaluation Report</h2>
                {articleSlug && (
                  <img
                    src={`${STORAGE_URL}/${articleSlug}.png`}
                    alt={evaluationArticle.title}
                    style={{ width: '100%', borderRadius: 12, marginBottom: 16, border: '1px solid #1a1a3e' }}
                  />
                )}
                <div
                  className="eval-content"
                  dangerouslySetInnerHTML={{ __html: evaluationArticle.content
                    .replace(/<h2/g, '<h3')
                    .replace(/<\/h2>/g, '<\/h3>') }}
                />
                <div style={{ marginTop: 16, textAlign: 'center' }}>
                  <a href={`/article/${articleSlug}`} className="btn btn-primary" style={{ display: 'inline-flex' }}>
                    Read full analysis →
                  </a>
                </div>
              </section>
            ) : (
              <section className="card">
                <h2>What this workflow covers</h2>
                <p className="muted">This page groups multiple AI agent skills into one practical workflow. Use it when you care about the outcome, not just a single tool name. Start with the recommended stack below, then open the related articles for examples and implementation ideas.</p>
              </section>
            )}

            <section className="card">
              <h2>Suggested workflow</h2>
              <ol className="steps">
                <li><span className="num">1</span><span>Clarify the task and success criteria for <strong>{uc.title}</strong>.</span></li>
                <li><span className="num">2</span><span>Pick 3–5 complementary skills instead of relying on one generic tool.</span></li>
                <li><span className="num">3</span><span>Run the workflow, review output quality, and replace weak skills with better matches.</span></li>
              </ol>
            </section>

            <section className="card" id="recommended-skills">
              <h2>Recommended skills</h2>
              <UseCaseClient uc={{ ...uc, description, icon: uc.icon || '🗺️', skills, searchLink: uc.search_link || undefined }} slug={slug} />
            </section>

            {articles.length > 0 && (
              <section className="card">
                <h2>Related articles</h2>
                <div className="article-list">
                  {articles.map((a: any) => (
                    <a className="article-link" key={a.slug} href={`/article/${a.slug}`}>
                      <div className="article-title">{a.title}</div>
                      <div className="article-meta">{a.category || 'article'}{a.published_at ? ` · ${new Date(a.published_at).toISOString().slice(0, 10)}` : ''}</div>
                    </a>
                  ))}
                </div>
              </section>
            )}
          </div>

          <aside className="sidebar">
            <section className="card">
              <h2>Quick summary</h2>
              <div className="stat"><span>Skill stack</span><strong>{skills.length}</strong></div>
              <div className="stat"><span>Related articles</span><strong>{articles.length}</strong></div>
              <div className="stat"><span>Source</span><strong>BytesAgain index</strong></div>
            </section>

            <section className="card">
              <h2>Other use cases</h2>
              <div className="related-grid">
                {related.map((u: any) => (
                  <a className="related-link" key={u.slug} href={`/use-case/${u.slug}`}>
                    <div className="related-title">{u.icon || '🤖'} {u.title}</div>
                    <div className="related-meta">View workflow →</div>
                  </a>
                ))}
              </div>
            </section>

            <div className="disclaimer">Use cases are curated workflow pages. Third-party skills remain owned by their original authors; BytesAgain provides discovery, summaries, and links.</div>
          </aside>
        </div>
      </div>
    </main>
  )
}
