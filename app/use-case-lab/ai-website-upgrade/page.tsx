import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Use Case Lab — SEO/GEO/AIO Website Upgrade Workflow',
  description: 'A BytesAgain test use case page for upgrading an AI-built website with SEO, GEO, AIO, UX, analytics, and verification skills.',
  robots: { index: false, follow: false },
}

const skills = [
  { slug: 'clawhub-seo', name: 'SEO', downloads: 10665, role: 'Google visibility', reason: 'Audits title, meta, internal links, content gaps, keyword intent, and crawlability.', test: 'Check title/meta/canonical/H1/internal links and output prioritized fixes.' },
  { slug: 'clawhub-geo-content-optimizer', name: 'GEO Content Optimizer', downloads: 2080, role: 'AI-search visibility', reason: 'Packages content so AI search engines can quote, summarize, and cite it.', test: 'Create answer-first blocks, FAQs, source-like summaries, and structured snippets.' },
  { slug: 'clawhub-superdesign', name: 'SuperDesign', downloads: 29879, role: 'UX trust and conversion', reason: 'Turns rough AI-generated pages into credible, modern landing pages.', test: 'Inspect page hierarchy and produce improved sections, visual rhythm, and CTA structure.' },
  { slug: 'clawhub-ga4-analytics', name: 'GA4 Analytics', downloads: 5932, role: 'Traffic diagnosis', reason: 'Validates whether traffic, sources, engagement, and landing pages are actually improving.', test: 'Read GA4-style metrics and recommend the next SEO/GEO experiments.' },
  { slug: 'clawhub-playwright-mcp', name: 'Playwright MCP', downloads: 34130, role: 'Browser verification', reason: 'Closes the loop by opening pages, checking links, UI, status codes, and screenshots.', test: 'Verify page loads, CTA links, visible text, mobile layout, and key SEO elements.' },
]

const workflow = [
  ['Diagnose intent', 'Decide what the page should rank for, what AI answer it should satisfy, and which Work Hub it belongs to.'],
  ['Rewrite as an answer', 'Lead with the user problem, short answer, who it is for, blocker, workflow, tools, and next action.'],
  ['Build the skill stack', 'Select 3-5 skills with distinct roles and proof signals; avoid keyword-only recommendations.'],
  ['Add GEO/AIO blocks', 'Create quotable summaries, FAQs, comparison snippets, schema, and MCP-readable workflow output.'],
  ['Verify and refresh', 'Use browser + analytics checks to confirm speed, links, visibility, and next iteration.'],
]

export default function Page() {
  return <main className="uc-lab">
    <style>{`
      .uc-lab{min-height:100vh;background:radial-gradient(circle at 15% 0%,rgba(99,102,241,.22),transparent 32%),#050611;color:#e5e7eb}.wrap{max-width:1120px;margin:0 auto;padding:42px 20px 88px}.back{color:#a5b4fc;text-decoration:none;font-weight:800;font-size:14px}.hero{margin-top:20px;padding:38px clamp(22px,5vw,46px);border:1px solid rgba(99,102,241,.25);border-radius:30px;background:rgba(15,23,42,.78)}.badge{display:inline-flex;padding:7px 11px;border-radius:999px;background:rgba(34,211,238,.12);color:#a5f3fc;font-weight:850;font-size:12px}h1{font-size:clamp(2.1rem,5vw,4.4rem);line-height:1;letter-spacing:-.055em;margin:18px 0 16px;color:#fff}.sub{font-size:1.08rem;line-height:1.7;color:#b6c2d9;max-width:850px}.callout{margin-top:20px;padding:18px;border-radius:18px;background:rgba(245,158,11,.10);border:1px solid rgba(245,158,11,.25);color:#fde68a}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(310px,1fr));gap:16px;margin:18px 0}.panel{padding:24px;border-radius:24px;border:1px solid rgba(148,163,184,.16);background:rgba(15,23,42,.72);margin-top:18px}h2{font-size:1.55rem;margin:0 0 16px;color:#fff}.rule,.step{color:#cbd5e1;line-height:1.65}.rule{display:grid;grid-template-columns:32px 1fr;gap:12px}.rule b,.step b{color:#a5f3fc}.step{padding:14px;border-radius:16px;background:rgba(2,6,23,.46);border:1px solid rgba(148,163,184,.10)}.skill-grid{display:grid;gap:12px}.skill-card{display:block;text-decoration:none;padding:18px;border-radius:18px;background:rgba(2,6,23,.58);border:1px solid rgba(148,163,184,.14);color:#e5e7eb}.skill-card strong{display:block;color:#fff;font-size:1.04rem}.skill-card span{display:block;color:#67e8f9;font-size:.82rem;font-weight:850;margin:5px 0 10px}.skill-card p{color:#cbd5e1;line-height:1.55;margin:0 0 8px}.skill-card small{color:#94a3b8;line-height:1.5}.pre{white-space:pre-wrap;background:#020617;border:1px solid rgba(148,163,184,.16);border-radius:16px;padding:18px;color:#dbeafe;line-height:1.6}.btn{display:inline-flex;margin-top:14px;padding:12px 16px;border-radius:14px;background:linear-gradient(135deg,#6366f1,#06b6d4);color:#fff;text-decoration:none;font-weight:850}.answer{display:grid;grid-template-columns:1fr 1fr;gap:12px}.answer div{background:rgba(2,6,23,.48);border:1px solid rgba(148,163,184,.10);border-radius:16px;padding:16px;color:#cbd5e1;line-height:1.58}.answer b{display:block;color:#fff;margin-bottom:6px}@media(max-width:760px){.answer{grid-template-columns:1fr}}
    `}</style>
    <section className="wrap">
      <Link href="/home-lab" className="back">← Home lab</Link>
      <div className="hero"><span className="badge">Use Case test · SEO/GEO/AIO workflow</span><h1>Upgrade an AI-built website so it can win search and AI answers.</h1><p className="sub">This page is the “组织” layer: a concrete workflow that belongs to a Work Hub, selects a tested skill stack, and gives both humans and agents the next action.</p><div className="callout"><b>Core blocker:</b> The website exists, but traffic is weak because the page is not structured as a useful search answer, an AI-citable answer, or an agent-executable workflow.</div></div>

      <section className="grid"><div className="panel"><h2>Search intent this page should catch</h2><div className="answer"><div><b>SEO query</b>How to improve an AI-built website SEO</div><div><b>GEO/AIO query</b>How to make my website appear in AI search answers</div></div></div><div className="panel"><h2>Where this page sits</h2><div className="answer"><div><b>Work Hub</b>Content & SEO Creators</div><div><b>Conversion</b>Save stack, copy prompt, open MCP workflow</div></div></div></section>

      <section className="grid"><div className="panel"><h2>Skill selection standard</h2>{['Task fit: solves one workflow step, not just keyword match.','Proof signal: downloads/source quality/BytesAgain validation.','Composable role: each skill has a different job.','Agent usability: clear output an agent can use.','Verification: every recommendation has a smoke-test target.'].map((x,i)=><p className="rule" key={x}><b>{i+1}</b><span>{x}</span></p>)}</div><div className="panel"><h2>Recommended workflow</h2>{workflow.map(([title,desc],i)=><p className="step" key={title}><b>Step {i+1}: {title}</b><br />{desc}</p>)}</div></section>

      <section className="panel"><h2>Tested skill stack candidate</h2><div className="skill-grid">{skills.map(s=><Link key={s.slug} href={`/skill/${s.slug}`} className="skill-card"><strong>{s.name}</strong><span>{s.role} · {s.downloads.toLocaleString()} downloads</span><p>{s.reason}</p><small>Smoke test: {s.test}</small></Link>)}</div></section>
      <section className="panel"><h2>Prompt to give your agent</h2><pre className="pre">{`You are my SEO/GEO/AIO website upgrade agent. Audit my website as a search answer and an AI-citable answer. Identify the Work Hub and use case, recommend a 3-5 skill stack with reasons, rewrite the page structure, add FAQ/schema suggestions, then verify links, speed, and conversion path.`}</pre><Link href="/api/mcp?action=workflow&q=upgrade%20AI%20website%20SEO%20GEO%20AIO" className="btn">Open MCP workflow JSON</Link></section>
    </section>
  </main>
}
