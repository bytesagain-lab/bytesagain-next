import Link from 'next/link'
import type { Metadata } from 'next'
import { USE_CASES } from '@/lib/use-cases'

export const metadata: Metadata = {
  title: 'Work Hubs — AI Agent SEO/GEO Use Case Collections | BytesAgain',
  description: 'Work Hubs are the layer above use cases: content/SEO creators, ecommerce sellers, and developer automation builders with AI-agent workflows, skill stacks, and answer pages.',
  alternates: { canonical: 'https://bytesagain.com/work-hubs' },
}

type Hub = {
  slug: string
  title: string
  audience: string
  icon: string
  seoIntent: string
  aioAnswer: string
  summary: string
  blocker: string
  outcome: string
  useCaseSlugs: string[]
  searchHref: string
}

const HUBS: Hub[] = [
  {
    slug: 'content-seo-creators',
    title: 'Content & SEO Creators',
    audience: '内容 / SEO 创作者',
    icon: '✍️',
    seoIntent: 'AI tools for SEO creators, GEO content workflow, AI agent for content marketing',
    aioAnswer: 'Use an AI agent to research topics, structure answer-first content, optimize for Google and AI search, repurpose assets, and refresh pages based on analytics.',
    summary: 'Plan, write, optimize, repurpose, and measure content that can be found by Google, ChatGPT-style answers, Perplexity, and AI search results.',
    blocker: 'A writing tool alone is not enough. Creators need topic strategy, SEO/GEO structure, publishing workflow, analytics, and refresh loops.',
    outcome: 'A content agent that can research, draft, optimize, publish, and improve content over time.',
    useCaseSlugs: ['seo-geo', 'content-writing', 'content-creator', 'marketing-automation', 'content-creator-studio', 'newsletter-content-engine', 'short-form-video-clips'],
    searchHref: '/skills?q=content+seo+geo+writing+marketing',
  },
  {
    slug: 'ecommerce-sellers',
    title: 'E-commerce Sellers',
    audience: '电商卖家',
    icon: '🛒',
    seoIntent: 'AI tools for ecommerce sellers, AI product listing optimizer, Shopify AI agent',
    aioAnswer: 'Use an AI agent to research products, generate listings, improve marketplace SEO, localize copy, create asset briefs, and verify store workflow quality.',
    summary: 'Turn product ideas into listings, localized copy, product-page SEO, image briefs, marketplace workflows, and store operations.',
    blocker: 'Generic AI can write product copy, but sellers need a workflow that connects research, listing quality, marketplace SEO, media, and operations.',
    outcome: 'An ecommerce agent that can pick products, create listings, localize assets, and keep store workflows moving.',
    useCaseSlugs: ['product-listing-optimization', 'ecommerce', 'ecommerce-ops', 'ecommerce-ai-agent', 'ai-agent-for-ecommerce', 'shopify-store-automation', 'marketplace-listings'],
    searchHref: '/skills?q=ecommerce+shopify+product+listing+marketplace',
  },
  {
    slug: 'developer-automation-builders',
    title: 'Developer & Automation Builders',
    audience: '开发者 / 自动化玩家',
    icon: '🛠️',
    seoIntent: 'AI automation tools for developers, AI agent workflow automation, DevOps AI agent',
    aioAnswer: 'Use an AI agent to plan code changes, call tools, automate browser/API workflows, test output, deploy, and monitor the result.',
    summary: 'Build, test, deploy, automate, and operate software or internal workflows with agent-ready skill stacks.',
    blocker: 'Code generation is only one step. Builders need API wiring, browser control, tests, deployment, verification, and recurring automation.',
    outcome: 'A builder agent that can plan implementation, call tools, automate workflows, test output, and improve the stack.',
    useCaseSlugs: ['developer-workflow', 'workflow-automation', 'devops-automation-hub', 'automation-testing-agent', 'test-automation-ai', 'vercel-supabase-stack', 'build-saas'],
    searchHref: '/skills?q=developer+automation+devops+testing+workflow',
  },
]

function findUseCases(slugs: string[]) {
  const map = new Map(USE_CASES.map(uc => [uc.slug, uc]))
  return slugs
    .map(slug => map.get(slug))
    .filter((uc): uc is NonNullable<typeof uc> => !!uc && Array.isArray(uc.skills) && uc.skills.length >= 3)
}

export default function WorkHubsPage() {
  return (
    <main className="hub-shell">
      <style>{`
        .hub-shell{min-height:100vh;background:radial-gradient(circle at 16% 0%,rgba(99,102,241,.22),transparent 33%),radial-gradient(circle at 86% 6%,rgba(34,211,238,.16),transparent 28%),#050611;color:#e5e7eb}.hub-page{max-width:1180px;margin:0 auto;padding:56px 20px 92px}.breadcrumb{color:#64748b;font-size:.86rem;margin-bottom:24px}.breadcrumb a{color:#a5b4fc;text-decoration:none}.hero{border:1px solid rgba(148,163,184,.16);background:linear-gradient(135deg,rgba(15,23,42,.9),rgba(2,6,23,.86));border-radius:32px;padding:clamp(30px,6vw,56px);margin-bottom:22px}.eyebrow{display:inline-flex;padding:7px 12px;border:1px solid rgba(34,211,238,.26);background:rgba(34,211,238,.10);color:#a5f3fc;border-radius:999px;font-weight:900;font-size:.78rem;margin-bottom:18px}h1{font-size:clamp(2.4rem,6vw,5rem);line-height:.95;letter-spacing:-.065em;margin:0 0 18px;color:#fff}.lede{color:#b6c2d9;font-size:1.1rem;line-height:1.75;max-width:880px;margin:0}.model{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin:22px 0 42px}.model-card{background:rgba(15,23,42,.72);border:1px solid rgba(148,163,184,.14);border-radius:22px;padding:20px}.model-card strong{display:block;color:#fff;font-size:1.05rem;margin-bottom:6px}.model-card span{color:#94a3b8;line-height:1.55;font-size:.92rem}.hub-stack{display:grid;gap:24px}.hub-card{border:1px solid rgba(148,163,184,.16);background:rgba(15,23,42,.76);border-radius:30px;overflow:hidden}.hub-head{display:grid;grid-template-columns:minmax(0,1fr)320px;gap:22px;padding:28px;border-bottom:1px solid rgba(148,163,184,.12)}.hub-title{display:flex;align-items:center;gap:12px;margin-bottom:10px}.hub-icon{width:46px;height:46px;display:inline-grid;place-items:center;border-radius:16px;font-size:1.5rem;background:rgba(34,211,238,.10);border:1px solid rgba(34,211,238,.22)}.hub-title h2{color:#fff;font-size:clamp(1.55rem,3vw,2.35rem);margin:0;letter-spacing:-.04em}.audience{color:#a5b4fc;font-weight:900;font-size:.88rem;margin-bottom:12px}.summary{color:#cbd5e1;line-height:1.72;margin:0}.hub-side{background:rgba(2,6,23,.56);border:1px solid rgba(148,163,184,.12);border-radius:20px;padding:18px}.side-label{color:#64748b;text-transform:uppercase;letter-spacing:.08em;font-size:.72rem;font-weight:900;margin-bottom:7px}.side-text{color:#cbd5e1;line-height:1.6;font-size:.92rem;margin:0 0 13px}.intent-box{margin-top:16px;display:grid;grid-template-columns:1fr 1fr;gap:10px}.intent{background:rgba(2,6,23,.44);border:1px solid rgba(148,163,184,.10);border-radius:16px;padding:14px}.intent b{display:block;color:#a5f3fc;font-size:.78rem;text-transform:uppercase;letter-spacing:.08em;margin-bottom:6px}.intent span{color:#cbd5e1;font-size:.9rem;line-height:1.55}.usecase-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:12px;padding:22px 28px 28px}.uc-card{display:block;text-decoration:none;color:inherit;background:rgba(2,6,23,.52);border:1px solid rgba(148,163,184,.12);border-radius:18px;padding:16px;transition:border-color .15s,transform .15s}.uc-card:hover{border-color:rgba(34,211,238,.45);transform:translateY(-1px)}.uc-title{color:#f8fafc;font-weight:900;margin-bottom:7px;line-height:1.28}.uc-desc{color:#94a3b8;font-size:.84rem;line-height:1.5;margin-bottom:12px}.uc-meta{color:#67e8f9;font-size:.78rem;font-weight:850}.actions{display:flex;gap:10px;flex-wrap:wrap;margin-top:16px}.btn{display:inline-flex;padding:11px 15px;border-radius:13px;text-decoration:none;font-weight:900;font-size:.88rem}.btn-primary{color:white;background:linear-gradient(135deg,#6366f1,#06b6d4)}.btn-secondary{color:#cbd5e1;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.14)}@media(max-width:860px){.model,.hub-head,.intent-box{grid-template-columns:1fr}.hub-page{padding-top:36px}}
      `}</style>
      <div className="hub-page">
        <div className="breadcrumb"><Link href="/home-lab">Home Lab</Link> › Work Hubs</div>
        <section className="hero">
          <div className="eyebrow">Work Hubs · the SEO/GEO layer above use cases</div>
          <h1>One hub for each major work area.</h1>
          <p className="lede">A Work Hub catches broad search demand, explains the full problem space, then routes users to specific use cases and skill stacks. It is the “部位/器官” layer between homepage and use cases.</p>
        </section>
        <section className="model" aria-label="BytesAgain content hierarchy">
          <div className="model-card"><strong>Skill = cell</strong><span>One installable or callable capability.</span></div>
          <div className="model-card"><strong>Use Case = tissue</strong><span>A workflow composed of several skills.</span></div>
          <div className="model-card"><strong>Work Hub = organ</strong><span>A work area that owns many use cases, keywords, and answer blocks.</span></div>
        </section>
        <section className="hub-stack">
          {HUBS.map(hub => {
            const cases = findUseCases(hub.useCaseSlugs)
            return <article className="hub-card" key={hub.slug} id={hub.slug}>
              <div className="hub-head">
                <div>
                  <div className="hub-title"><span className="hub-icon">{hub.icon}</span><h2>{hub.title}</h2></div>
                  <div className="audience">{hub.audience}</div>
                  <p className="summary">{hub.summary}</p>
                  <div className="intent-box">
                    <div className="intent"><b>SEO intent</b><span>{hub.seoIntent}</span></div>
                    <div className="intent"><b>GEO/AI-search answer</b><span>{hub.aioAnswer}</span></div>
                  </div>
                  <div className="actions"><Link className="btn btn-primary" href={`#${hub.slug}`}>View use cases</Link><Link className="btn btn-secondary" href={hub.searchHref}>Browse skills</Link></div>
                </div>
                <div className="hub-side"><div className="side-label">Blocker</div><p className="side-text">{hub.blocker}</p><div className="side-label">Outcome</div><p className="side-text">{hub.outcome}</p></div>
              </div>
              <div className="usecase-grid">
                {cases.map(uc => <Link className="uc-card" key={uc.slug} href={`/use-case/${uc.slug}`}><div className="uc-title">{uc.icon} {uc.title}</div><div className="uc-desc">{uc.description.slice(0,112)}{uc.description.length>112?'…':''}</div><div className="uc-meta">{uc.skills.length} skills · open workflow →</div></Link>)}
              </div>
            </article>
          })}
        </section>
      </div>
    </main>
  )
}
