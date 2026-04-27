import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Use Case Lab — Upgrade an AI-built Website', robots: { index: false, follow: false } }

const skills = [
  { slug: 'clawhub-superdesign', name: 'SuperDesign', downloads: 29879, role: 'UX redesign', reason: 'High-signal frontend/design skill for turning rough AI pages into polished interfaces.', tested: 'Smoke target: inspect page hierarchy, propose layout, produce visual sections.' },
  { slug: 'clawhub-seo', name: 'SEO', downloads: 10665, role: 'Search audit', reason: 'Directly matches site audit, content gaps, competitor analysis, and SEO fixes.', tested: 'Smoke target: audit title/meta/canonical/content structure and output fixes.' },
  { slug: 'clawhub-geo-content-optimizer', name: 'GEO Content Optimizer', downloads: 2080, role: 'AI-search visibility', reason: 'Specific to AI-search/GEO content packaging, not generic SEO.', tested: 'Smoke target: generate AI-answer friendly structure, FAQ, schema suggestions.' },
  { slug: 'clawhub-ga4-analytics', name: 'GA4 Analytics', downloads: 5932, role: 'Traffic diagnosis', reason: 'Needed when the blocker is traffic decline, source quality, or landing-page behavior.', tested: 'Smoke target: read GA4-style metrics and produce prioritized actions.' },
  { slug: 'clawhub-playwright-mcp', name: 'Playwright MCP', downloads: 34130, role: 'Verification', reason: 'Browser-level verification closes the loop after design/SEO changes.', tested: 'Smoke target: open pages, verify status, links, core UI, and screenshots.' },
]

const workflow = [
  'Diagnose the blocker: traffic drop, weak page intent, missing crawler endpoints, slow page, or unclear CTA.',
  'Audit the page with SEO + GEO criteria: title, answer structure, schema, llms.txt/sitemap discoverability, and user path.',
  'Redesign the page around the user question: who, problem, blocker, recommended workflow, tested skills, next action.',
  'Implement and verify with browser automation: status 200, HTML visible, links valid, CTA measurable.',
  'Create an upgrade loop: weekly check for new skills, broken recommendations, and conversion changes.'
]

export default function Page() { return <UseCaseLab
  badge="Test use case #1"
  title="Upgrade an AI-built website when it stops meeting your needs"
  subtitle="For founders and builders who used AI to ship a website, then hit the real wall: quality, traffic, conversion, and continuous improvement."
  blocker="The user does not need another generic answer. They need a tested skill stack and a step-by-step upgrade workflow their agent can run."
  skills={skills}
  workflow={workflow}
  prompt={`You are my website upgrade agent. Diagnose why my AI-built site is underperforming. Check UX, SEO, GEO, speed, crawler access, and conversion path. Recommend a skill stack, explain why each skill is needed, then produce a prioritized 7-day upgrade plan.`}
/> }

type SkillCandidate = { slug: string; name: string; downloads: number; role: string; reason: string; tested: string }
type UseCaseLabProps = { badge: string; title: string; subtitle: string; blocker: string; skills: SkillCandidate[]; workflow: string[]; prompt: string }

function UseCaseLab({ badge, title, subtitle, blocker, skills, workflow, prompt }: UseCaseLabProps) {
  return <main style={shell}><section style={wrap}>
    <Link href="/home-lab" style={back}>← Home lab</Link>
    <div style={hero}><span style={badgeStyle}>{badge}</span><h1 style={h1}>{title}</h1><p style={sub}>{subtitle}</p><div style={callout}><b>Core blocker:</b> {blocker}</div></div>
    <section style={grid}><div style={panel}><h2 style={h2}>Skill selection standard</h2>{['Task fit: directly solves one step in the workflow, not just keyword match.','Proof signal: downloads/stars/source quality or BytesAgain-owned verified implementation.','Composable role: each skill has a distinct job; no duplicate recommendations.','Agent usability: clear install/use path and output an agent can act on.','Verification: smoke test plan exists before it becomes a production recommendation.'].map((x:string,i:number)=><p key={x} style={rule}><b>{i+1}</b>{x}</p>)}</div><div style={panel}><h2 style={h2}>Recommended workflow</h2>{workflow.map((x:string,i:number)=><p key={x} style={step}><b>Step {i+1}</b>{x}</p>)}</div></section>
    <section style={panel}><h2 style={h2}>Tested skill stack candidate</h2><div style={{display:'grid',gap:12}}>{skills.map((s)=><Link key={s.slug} href={`/skill/${s.slug}`} style={skillCard}><div><strong>{s.name}</strong><span>{s.role} · {s.downloads.toLocaleString()} downloads</span></div><p>{s.reason}</p><small>{s.tested}</small></Link>)}</div></section>
    <section style={panel}><h2 style={h2}>Prompt to give your agent</h2><pre style={pre}>{prompt}</pre><Link href="/api/mcp?action=workflow&q=upgrade%20AI%20website" style={btn}>Open MCP workflow JSON</Link></section>
  </section></main>
}
const shell={minHeight:'100vh',background:'radial-gradient(circle at 15% 0%,rgba(99,102,241,.22),transparent 32%),#050611',color:'#e5e7eb'} as const
const wrap={maxWidth:1120,margin:'0 auto',padding:'42px 20px 88px'} as const
const back={color:'#a5b4fc',textDecoration:'none',fontWeight:800,fontSize:14} as const
const hero={marginTop:20,padding:'38px clamp(22px,5vw,46px)',border:'1px solid rgba(99,102,241,.25)',borderRadius:30,background:'rgba(15,23,42,.78)'} as const
const badgeStyle={display:'inline-flex',padding:'7px 11px',borderRadius:999,background:'rgba(34,211,238,.12)',color:'#a5f3fc',fontWeight:850,fontSize:12} as const
const h1={fontSize:'clamp(2.1rem,5vw,4.4rem)',lineHeight:1,letterSpacing:'-.055em',margin:'18px 0 16px',color:'#fff'} as const
const sub={fontSize:'1.08rem',lineHeight:1.7,color:'#b6c2d9',maxWidth:800} as const
const callout={marginTop:20,padding:18,borderRadius:18,background:'rgba(245,158,11,.10)',border:'1px solid rgba(245,158,11,.25)',color:'#fde68a'} as const
const grid={display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(320px,1fr))',gap:16,margin:'18px 0'} as const
const panel={padding:24,borderRadius:24,border:'1px solid rgba(148,163,184,.16)',background:'rgba(15,23,42,.72)',marginTop:18} as const
const h2={fontSize:'1.55rem',margin:'0 0 16px',color:'#fff'} as const
const rule={display:'flex',gap:12,color:'#cbd5e1',lineHeight:1.55} as const
const step={color:'#cbd5e1',lineHeight:1.65} as const
const skillCard={display:'block',textDecoration:'none',padding:18,borderRadius:18,background:'rgba(2,6,23,.58)',border:'1px solid rgba(148,163,184,.14)',color:'#e5e7eb'} as const
const pre={whiteSpace:'pre-wrap',background:'#020617',border:'1px solid rgba(148,163,184,.16)',borderRadius:16,padding:18,color:'#dbeafe',lineHeight:1.6} as const
const btn={display:'inline-flex',marginTop:14,padding:'12px 16px',borderRadius:14,background:'linear-gradient(135deg,#6366f1,#06b6d4)',color:'#fff',textDecoration:'none',fontWeight:850} as const
