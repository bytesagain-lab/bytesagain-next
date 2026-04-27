import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'BytesAgain Home Lab v3 — SEO/GEO/AIO Answer Engine',
  description: 'A test homepage concept for BytesAgain as an SEO, GEO, and AIO answer engine for AI-agent workflows.',
  robots: { index: false, follow: false },
}

const hubs = [
  {
    title: 'Content & SEO Creators',
    cn: '内容 / SEO 创作者',
    icon: '✍️',
    href: '/work-hubs#content-seo-creators',
    query: '“How do I build an AI content workflow that ranks in Google and AI search?”',
    useCases: ['SEO / GEO optimization', 'Content writing', 'Newsletter engine', 'Short-form repurposing'],
  },
  {
    title: 'E-commerce Sellers',
    cn: '电商卖家',
    icon: '🛒',
    href: '/work-hubs#ecommerce-sellers',
    query: '“How do I make my AI agent create listings, optimize products, and run store workflows?”',
    useCases: ['Product listing optimization', 'Shopify automation', 'Marketplace selling', 'Product page SEO'],
  },
  {
    title: 'Developer & Automation Builders',
    cn: '开发者 / 自动化玩家',
    icon: '🛠️',
    href: '/work-hubs#developer-automation-builders',
    query: '“How do I upgrade my agent from chatting to coding, testing, deploying, and automating?”',
    useCases: ['Developer workflow', 'Browser automation', 'DevOps automation', 'Test automation'],
  },
]

const seoLayers = [
  ['SEO', 'Rank in Google with clear search intent, internal links, schema, fast pages, and useful workflows.'],
  ['GEO', 'Become quotable by AI search with answer-first sections, concise facts, FAQs, and source-like structure.'],
  ['AIO', 'Optimize for AI overviews by packaging each page as a complete answer: problem, workflow, tools, prompt, next action.'],
]

const hierarchy = [
  ['Work Hub', '部位 / 器官', 'Broad work area for a user group. It catches big SEO terms like “AI agents for ecommerce sellers”.'],
  ['Use Case', '组织', 'Specific workflow. It catches mid-tail searches like “optimize Amazon product listings with AI”.'],
  ['Skill', '细胞', 'Single capability. It catches long-tail searches and gives agents an installable/actionable unit.'],
]

export default function HomeLabPage() {
  return (
    <main className="home-lab">
      <style>{`
        .home-lab { min-height:100vh; color:#e5e7eb; background: radial-gradient(circle at 14% 0%, rgba(99,102,241,.28), transparent 34%), radial-gradient(circle at 88% 8%, rgba(34,211,238,.18), transparent 30%), #050611; }
        .wrap { max-width:1200px; margin:0 auto; padding:64px 20px 92px; }
        .eyebrow { display:inline-flex; padding:8px 13px; border-radius:999px; color:#a5f3fc; background:rgba(34,211,238,.10); border:1px solid rgba(34,211,238,.25); font-weight:900; font-size:.78rem; margin-bottom:20px; }
        .hero { display:grid; grid-template-columns:1.05fr .95fr; gap:34px; align-items:center; margin-bottom:42px; }
        h1 { color:#fff; font-size:clamp(2.7rem,7vw,6rem); line-height:.9; letter-spacing:-.075em; margin:0 0 22px; }
        .grad { color:#22d3ee; text-shadow:0 0 34px rgba(34,211,238,.25); }
        .lede { color:#bac7dc; font-size:1.18rem; line-height:1.76; max-width:760px; margin:0 0 24px; }
        .cta-row { display:flex; gap:12px; flex-wrap:wrap; margin:26px 0 16px; }
        .btn { display:inline-flex; align-items:center; justify-content:center; padding:13px 17px; border-radius:14px; text-decoration:none; font-weight:900; }
        .primary { color:#fff; background:linear-gradient(135deg,#6366f1,#06b6d4); }
        .secondary { color:#cbd5e1; background:rgba(255,255,255,.07); border:1px solid rgba(255,255,255,.15); }
        .micro { color:#64748b; font-size:.9rem; }
        .answer-box { border:1px solid rgba(148,163,184,.16); background:linear-gradient(180deg,rgba(15,23,42,.88),rgba(2,6,23,.9)); border-radius:30px; padding:24px; box-shadow:0 28px 90px rgba(0,0,0,.40); }
        .box-label { color:#94a3b8; font-size:.72rem; text-transform:uppercase; letter-spacing:.10em; font-weight:900; margin-bottom:14px; }
        .search-card { padding:17px; border-radius:19px; background:rgba(99,102,241,.16); border:1px solid rgba(129,140,248,.24); color:#e0e7ff; font-weight:850; line-height:1.55; margin-bottom:14px; }
        .return-card { padding:18px; border-radius:20px; background:rgba(2,6,23,.70); border:1px solid rgba(34,211,238,.18); }
        .return-card div { padding:8px 0; color:#cbd5e1; border-bottom:1px solid rgba(148,163,184,.10); }
        .grid3 { display:grid; grid-template-columns:repeat(3,1fr); gap:14px; margin-bottom:42px; }
        .panel { background:rgba(15,23,42,.74); border:1px solid rgba(148,163,184,.14); border-radius:26px; padding:24px; }
        .panel h3 { color:#fff; margin:0 0 10px; font-size:1.25rem; }
        .panel p, .panel li { color:#a7b3c7; line-height:1.62; }
        .hub-card { display:block; text-decoration:none; color:inherit; background:rgba(15,23,42,.74); border:1px solid rgba(148,163,184,.14); border-radius:28px; padding:24px; transition:transform .15s,border-color .15s; }
        .hub-card:hover { transform:translateY(-2px); border-color:rgba(34,211,238,.45); }
        .hub-top { display:flex; gap:13px; align-items:center; margin-bottom:14px; }
        .hub-icon { width:46px; height:46px; display:grid; place-items:center; border-radius:16px; background:rgba(34,211,238,.10); font-size:1.45rem; }
        .hub-card h3 { color:#fff; margin:0; font-size:1.25rem; }
        .cn { color:#a5b4fc; font-size:.86rem; font-weight:900; margin-top:3px; }
        .query { color:#f8fafc; line-height:1.55; margin:14px 0; font-weight:800; }
        .chips { display:flex; gap:8px; flex-wrap:wrap; }
        .chip { color:#67e8f9; background:rgba(34,211,238,.08); border:1px solid rgba(34,211,238,.16); border-radius:999px; padding:5px 9px; font-size:.75rem; font-weight:800; }
        .section-head { margin:56px 0 18px; }
        h2 { color:#fff; font-size:clamp(1.8rem,3.8vw,3rem); line-height:1.02; letter-spacing:-.055em; margin:0 0 10px; }
        .muted { color:#94a3b8; line-height:1.72; margin:0; max-width:820px; }
        .path { border:1px solid rgba(99,102,241,.24); background:linear-gradient(135deg,rgba(15,23,42,.86),rgba(49,46,129,.30)); border-radius:30px; padding:28px; margin-top:24px; display:grid; grid-template-columns:repeat(4,1fr); gap:12px; }
        .path-step { background:rgba(2,6,23,.46); border:1px solid rgba(148,163,184,.12); border-radius:18px; padding:16px; }
        .path-step b { display:block; color:#fff; margin-bottom:6px; }
        .path-step span { color:#94a3b8; font-size:.88rem; line-height:1.5; }
        @media(max-width:900px){.hero,.grid3,.path{grid-template-columns:1fr}.wrap{padding-top:38px}}
      `}</style>
      <div className="wrap">
        <section className="hero">
          <div>
            <div className="eyebrow">🧪 Home v3 test · SEO/GEO/AIO answer engine</div>
            <h1>Find the AI agent workflow for <span className="grad">your work.</span></h1>
            <p className="lede">BytesAgain should not feel like a directory. It should feel like an answer engine: users arrive with a work problem, and we return the right Work Hub, Use Case, Skill Stack, prompt, and agent action.</p>
            <div className="cta-row">
              <Link className="btn primary" href="/work-hubs">Choose a Work Hub</Link>
              <Link className="btn secondary" href="/use-case-lab/ai-website-upgrade">View use case test</Link>
              <Link className="btn secondary" href="/skill-lab">View skill test</Link>
            </div>
            <p className="micro">SEO catches demand. GEO/AIO packages each page so AI search can cite and summarize us.</p>
          </div>
          <div className="answer-box">
            <div className="box-label">Example user intent</div>
            <div className="search-card">“I run an ecommerce store. How can an AI agent help me improve product listings and sales workflows?”</div>
            <div className="return-card">
              <div>→ Work Hub: E-commerce Sellers</div>
              <div>→ Use Case: Product Listing Optimization</div>
              <div>→ Skill Stack: listing, SEO, image, marketplace, verification</div>
              <div>→ Agent prompt + MCP workflow JSON</div>
            </div>
          </div>
        </section>

        <section className="grid3">
          {seoLayers.map(([name, desc]) => <div className="panel" key={name}><h3>{name}</h3><p>{desc}</p></div>)}
        </section>

        <section>
          <div className="section-head"><h2>Start with three Work Hubs.</h2><p className="muted">These are not generic roles. They are high-intent work areas that can hold many SEO landing pages, GEO answer blocks, and agent-ready use cases.</p></div>
          <div className="grid3">
            {hubs.map(hub => (
              <Link className="hub-card" href={hub.href} key={hub.title}>
                <div className="hub-top"><span className="hub-icon">{hub.icon}</span><div><h3>{hub.title}</h3><div className="cn">{hub.cn}</div></div></div>
                <div className="query">{hub.query}</div>
                <div className="chips">{hub.useCases.map(x => <span className="chip" key={x}>{x}</span>)}</div>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <div className="section-head"><h2>The page path should be obvious.</h2><p className="muted">Every SEO page should push users and crawlers down the same hierarchy: broad work area → concrete workflow → installable skill → agent action.</p></div>
          <div className="path">
            {hierarchy.map(([name, cn, desc]) => <div className="path-step" key={name}><b>{name}</b><span>{cn}</span><p>{desc}</p></div>)}
            <div className="path-step"><b>Agent Action</b><span>MCP / prompt / install</span><p>Final conversion: copy prompt, install skill, open MCP workflow, or save stack.</p></div>
          </div>
        </section>
      </div>
    </main>
  )
}
