import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Capability Lab — GEO Content Optimizer as an AI Agent Cell | BytesAgain',
  description: 'A test skill page showing how a single AI agent skill should connect to Work Hubs, Use Cases, SEO/GEO/AIO intent, and agent actions.',
  robots: { index: false, follow: false },
}

const useCases = [
  ['SEO/GEO Website Upgrade', '/use-case-lab/ai-website-upgrade', 'Use this skill to turn normal pages into answer-first, AI-citable pages.'],
  ['Content Writing Workflow', '/use-case/content-writing', 'Use this skill after drafting to improve structure, FAQ, snippets, and entity clarity.'],
  ['Marketing Automation', '/use-case/marketing-automation', 'Use this skill to package campaign pages for both search engines and AI assistants.'],
]

const outputs = [
  'Answer-first page outline',
  'GEO/AIO summary block',
  'FAQ and schema suggestions',
  'Internal link recommendations',
  'Agent-ready rewrite prompt',
]

export default function SkillLabPage() {
  return <main className="skill-lab">
    <style>{`
      .skill-lab{min-height:100vh;background:radial-gradient(circle at 14% 0%,rgba(99,102,241,.24),transparent 32%),radial-gradient(circle at 88% 8%,rgba(34,211,238,.15),transparent 30%),#050611;color:#e5e7eb}.wrap{max-width:1080px;margin:0 auto;padding:46px 20px 90px}.breadcrumb{color:#64748b;font-size:.86rem;margin-bottom:24px}.breadcrumb a{color:#a5b4fc;text-decoration:none}.hero{border:1px solid rgba(148,163,184,.16);background:linear-gradient(135deg,rgba(15,23,42,.88),rgba(2,6,23,.86));border-radius:32px;padding:clamp(28px,5vw,48px);margin-bottom:20px}.badge-row{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:18px}.badge{display:inline-flex;padding:6px 11px;border-radius:999px;border:1px solid rgba(34,211,238,.26);background:rgba(34,211,238,.10);color:#a5f3fc;font-weight:900;font-size:.76rem}h1{font-size:clamp(2.2rem,5.5vw,4.8rem);line-height:.95;letter-spacing:-.065em;margin:0 0 16px;color:#fff}.lede{color:#b6c2d9;font-size:1.08rem;line-height:1.75;max-width:850px}.grid{display:grid;grid-template-columns:1.05fr .95fr;gap:18px;margin-top:18px}.panel{border:1px solid rgba(148,163,184,.15);background:rgba(15,23,42,.72);border-radius:26px;padding:24px}h2{color:#fff;font-size:1.55rem;margin:0 0 16px;letter-spacing:-.03em}.muted{color:#a7b3c7;line-height:1.7}.list{display:grid;gap:10px}.item{padding:14px;border-radius:16px;background:rgba(2,6,23,.48);border:1px solid rgba(148,163,184,.10);color:#cbd5e1;line-height:1.55}.item b{color:#a5f3fc}.uc{display:block;text-decoration:none;color:inherit;padding:16px;border-radius:17px;background:rgba(2,6,23,.52);border:1px solid rgba(148,163,184,.12);margin-bottom:10px}.uc strong{display:block;color:#fff;margin-bottom:6px}.uc span{color:#94a3b8;line-height:1.55;font-size:.9rem}.pre{white-space:pre-wrap;background:#020617;border:1px solid rgba(148,163,184,.16);border-radius:16px;padding:18px;color:#dbeafe;line-height:1.6}.btn-row{display:flex;gap:10px;flex-wrap:wrap;margin-top:16px}.btn{display:inline-flex;padding:12px 16px;border-radius:14px;text-decoration:none;font-weight:900}.primary{color:#fff;background:linear-gradient(135deg,#6366f1,#06b6d4)}.secondary{color:#cbd5e1;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.15)}.flow{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-top:18px}.flow div{padding:15px;border-radius:16px;background:rgba(2,6,23,.45);border:1px solid rgba(148,163,184,.10);color:#cbd5e1;line-height:1.5}.flow b{display:block;color:#fff;margin-bottom:6px}@media(max-width:820px){.grid,.flow{grid-template-columns:1fr}}
    `}</style>
    <div className="wrap">
      <div className="breadcrumb"><Link href="/home-lab">Home Lab</Link> › <Link href="/work-hubs">Work Hubs</Link> › Capability Lab</div>
      <section className="hero">
        <div className="badge-row"><span className="badge">Skill test · cell layer</span><span className="badge">SEO/GEO/AIO</span><span className="badge">Agent action ready</span></div>
        <h1>GEO Content Optimizer is a cell, not the whole answer.</h1>
        <p className="lede">A skill page should explain one capability clearly, then connect it upward to Work Hubs and Use Cases. This lets long-tail SEO traffic convert into workflows instead of stopping at a dead-end detail page.</p>
        <div className="btn-row"><Link className="btn primary" href="/skill/clawhub-geo-content-optimizer">Open real skill</Link><Link className="btn secondary" href="/use-case-lab/ai-website-upgrade">See parent use case</Link></div>
      </section>

      <section className="flow"><div><b>Work Hub</b>Content & SEO Creators</div><div><b>Use Case</b>SEO/GEO Website Upgrade</div><div><b>Skill</b>GEO Content Optimizer</div><div><b>Agent Action</b>Copy prompt / install / MCP</div></section>

      <section className="grid">
        <div className="panel"><h2>What this skill does</h2><p className="muted">It restructures content so both search engines and AI answer engines can understand, summarize, and cite the page. The user should instantly know the input, output, and when to use it.</p><div className="list">{outputs.map(x=><div className="item" key={x}>✓ {x}</div>)}</div></div>
        <div className="panel"><h2>When to use it</h2><div className="list"><div className="item"><b>After drafting:</b> improve answer structure before publishing.</div><div className="item"><b>After traffic drops:</b> rewrite weak pages around search and AI intent.</div><div className="item"><b>Before building a hub:</b> create concise answer blocks that can be reused by Work Hub and Use Case pages.</div></div></div>
      </section>

      <section className="grid">
        <div className="panel"><h2>Related use cases</h2>{useCases.map(([title,href,desc])=><Link className="uc" href={href} key={title}><strong>{title}</strong><span>{desc}</span></Link>)}</div>
        <div className="panel"><h2>Prompt to run this cell</h2><pre className="pre">{`Use the GEO Content Optimizer skill on this page. First identify the user question and search intent. Then rewrite the page into: short answer, workflow steps, FAQ, schema suggestions, internal links, and an AI-citable summary block. Keep the output practical for a website editor and structured enough for an AI agent.`}</pre><div className="btn-row"><Link className="btn primary" href="/install">Use with OpenClaw</Link><Link className="btn secondary" href="/mcp">Connect via MCP</Link></div></div>
      </section>
    </div>
  </main>
}
