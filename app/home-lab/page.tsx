import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'BytesAgain Home Lab v2 — Agent Capability Answers',
  description: 'A test homepage concept for BytesAgain: turn user problems into tested AI agent workflows and skill stacks.',
  robots: { index: false, follow: false },
}

const questionCards = [
  { q: 'My AI-built website has traffic dropping. What should I fix?', a: 'Website upgrade workflow', href: '/use-case-lab/ai-website-upgrade', tag: 'SEO/GEO + UX' },
  { q: 'I want my agent to run ecommerce listings, not just write copy.', a: 'Commerce agent stack', href: '/use-case-lab/ecommerce-agent-upgrade', tag: 'Shopify + listings' },
  { q: 'Which tools should my agent add next for this task?', a: 'Agent upgrade plan', href: '/agent-upgrade-lab', tag: 'Skill stack' },
]

const answerPieces = [
  ['Who it is for', 'So the user knows whether the answer fits them.'],
  ['Common blockers', 'So we diagnose the real problem before recommending tools.'],
  ['Tested skill stack', 'Each skill has a role, selection reason, and smoke-test target.'],
  ['Workflow steps', 'The agent gets an executable sequence, not a random list.'],
  ['Upgrade path', 'The stack can improve over time as better skills appear.'],
]

const proof = [
  ['60K+', 'AI skills indexed'],
  ['367+', 'workflow use cases'],
  ['MCP', 'agent-readable answers'],
  ['250K+', 'skill downloads tracked'],
]

const mcpSnippet = `{
  "tool": "get_workflow",
  "query": "upgrade AI website SEO",
  "returns": ["blockers", "workflow", "tested skill_stack", "agent prompt", "upgrade_path"]
}`

export default function HomeLabPage() {
  return (
    <main style={shell}>
      <section style={heroWrap}>
        <div style={eyebrow}>🧪 Home v2 test · answer engine positioning</div>
        <div style={heroGrid} className="lab-hero-grid">
          <div>
            <h1 style={h1}>Users bring the problem. <span style={grad}>BytesAgain gives the answer.</span></h1>
            <p style={lede}>
              Turn messy AI-agent questions into tested workflows, skill stacks, prompts, and upgrade paths your agent can actually use.
            </p>
            <div style={ctaRow}>
              <Link href="/agent-upgrade-lab" style={primaryBtn}>Get an agent upgrade plan</Link>
              <Link href="/use-case-lab/ai-website-upgrade" style={secondaryBtn}>See a workflow answer</Link>
              <Link href="/api/mcp?action=workflow&q=upgrade%20AI%20website" style={ghostBtn}>View MCP JSON</Link>
            </div>
            <p style={micro}>Positioning: not a directory, not Google, not a generic chatbot — an agent capability answer layer.</p>
          </div>

          <div style={answerBox}>
            <div style={boxTitle}>Example answer</div>
            <div style={userBubble}>“I used AI to build a site, but it still doesn’t feel good and traffic is down.”</div>
            <div style={answerCard}>
              <div style={answerHeader}>BytesAgain returns</div>
              {['Diagnose: UX + SEO + GEO + analytics', 'Recommended workflow: 5 steps', 'Tested stack: SuperDesign + SEO + GEO + GA4 + Playwright', 'Prompt for your agent', 'Weekly upgrade path'].map(x => <div key={x} style={checkLine}>✓ {x}</div>)}
            </div>
          </div>
        </div>
      </section>

      <section style={section}>
        <div style={proofGrid} className="lab-proof-grid">
          {proof.map(([n, d]) => <div key={n} style={statCard}><strong>{n}</strong><span>{d}</span></div>)}
        </div>
      </section>

      <section style={section}>
        <div style={sectionHead}>
          <div>
            <h2 style={h2}>Start from the user’s blocker.</h2>
            <p style={muted}>The homepage should feel like: “Tell us what your agent cannot do yet — we’ll show the stack to fix it.”</p>
          </div>
          <Link href="/skills" style={smallLink}>Browse raw skills only if needed →</Link>
        </div>
        <div style={questionGrid} className="lab-question-grid">
          {questionCards.map(card => (
            <Link key={card.q} href={card.href} style={questionCard}>
              <span style={tag}>{card.tag}</span>
              <h3>{card.q}</h3>
              <p>{card.a} →</p>
            </Link>
          ))}
        </div>
      </section>

      <section style={section}>
        <div style={twoCol} className="lab-two-col">
          <div style={panel}>
            <h2 style={h2}>What an answer contains</h2>
            <div style={{ display: 'grid', gap: 12, marginTop: 18 }}>
              {answerPieces.map(([title, desc], i) => (
                <div key={title} style={answerPiece}>
                  <b>{i + 1}</b>
                  <div><strong>{title}</strong><span>{desc}</span></div>
                </div>
              ))}
            </div>
          </div>
          <div style={panel}>
            <h2 style={h2}>Made for humans and agents</h2>
            <p style={muted}>Humans need confidence and explanation. Agents need structured data, install paths, and next actions. BytesAgain should serve both from the same use-case asset.</p>
            <pre style={pre}>{mcpSnippet}</pre>
            <Link href="/mcp" style={secondaryBtn}>Connect your agent via MCP</Link>
          </div>
        </div>
      </section>

      <section style={{ ...section, paddingBottom: 90 }}>
        <div style={closingPanel}>
          <div>
            <h2 style={h2}>Subscription wedge: continuous agent upgrades.</h2>
            <p style={{ ...muted, marginBottom: 0 }}>Free users search answers. Pro users save their agent stack, track weak skills, and receive weekly upgrade recommendations for their workflows.</p>
          </div>
          <Link href="/agent-upgrade-lab" style={primaryBtn}>Open upgrade concept</Link>
        </div>
      </section>

      <style>{`@media(max-width:860px){.lab-hero-grid,.lab-two-col{grid-template-columns:1fr!important}.lab-proof-grid{grid-template-columns:repeat(2,1fr)!important}.lab-question-grid{grid-template-columns:1fr!important}}`}</style>
    </main>
  )
}

const shell = { minHeight: '100vh', background: 'radial-gradient(circle at 14% 0%, rgba(99,102,241,.30), transparent 31%), radial-gradient(circle at 88% 8%, rgba(34,211,238,.20), transparent 30%), #050611', color: '#e5e7eb' } as const
const heroWrap = { maxWidth: 1200, margin: '0 auto', padding: '74px 20px 50px' } as const
const eyebrow = { display: 'inline-flex', padding: '8px 13px', borderRadius: 999, background: 'rgba(15,23,42,.78)', border: '1px solid rgba(129,140,248,.35)', color: '#c4b5fd', fontSize: 13, fontWeight: 850, marginBottom: 22 } as const
const heroGrid = { display: 'grid', gridTemplateColumns: 'minmax(0,1.05fr) minmax(340px,.95fr)', gap: 34, alignItems: 'center' } as const
const h1 = { fontSize: 'clamp(2.8rem,7vw,5.9rem)', lineHeight: .9, letterSpacing: '-.075em', margin: '0 0 24px', color: '#fff', fontWeight: 950 } as const
const grad = { background: 'linear-gradient(135deg,#a78bfa,#22d3ee,#34d399)', WebkitBackgroundClip: 'text', color: 'transparent' } as const
const lede = { maxWidth: 720, color: '#bac7dc', fontSize: '1.2rem', lineHeight: 1.72, margin: '0 0 28px' } as const
const ctaRow = { display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 18 } as const
const micro = { color: '#64748b', fontSize: 13, margin: 0 } as const
const answerBox = { borderRadius: 30, padding: 22, border: '1px solid rgba(148,163,184,.18)', background: 'linear-gradient(180deg,rgba(15,23,42,.9),rgba(2,6,23,.9))', boxShadow: '0 32px 100px rgba(0,0,0,.42)' } as const
const boxTitle = { color: '#94a3b8', fontSize: 12, fontWeight: 900, letterSpacing: '.10em', textTransform: 'uppercase', marginBottom: 14 } as const
const userBubble = { padding: 17, borderRadius: 18, background: 'rgba(99,102,241,.18)', border: '1px solid rgba(129,140,248,.24)', color: '#e0e7ff', fontWeight: 800, lineHeight: 1.5, marginBottom: 14 } as const
const answerCard = { padding: 18, borderRadius: 20, background: 'rgba(2,6,23,.72)', border: '1px solid rgba(34,211,238,.18)' } as const
const answerHeader = { color: '#a5f3fc', fontWeight: 900, marginBottom: 12 } as const
const checkLine = { color: '#cbd5e1', padding: '8px 0', borderBottom: '1px solid rgba(148,163,184,.10)', fontSize: 14 } as const
const section = { maxWidth: 1200, margin: '0 auto', padding: '0 20px 68px' } as const
const proofGrid = { display: 'grid', gridTemplateColumns: 'repeat(4,minmax(0,1fr))', gap: 12 } as const
const statCard = { padding: 20, borderRadius: 22, background: 'rgba(15,23,42,.72)', border: '1px solid rgba(148,163,184,.14)' } as const
const sectionHead = { display: 'flex', justifyContent: 'space-between', alignItems: 'end', gap: 20, flexWrap: 'wrap', marginBottom: 18 } as const
const h2 = { color: '#fff', fontSize: 'clamp(1.7rem,3.4vw,2.55rem)', margin: '0 0 10px', letterSpacing: '-.045em', lineHeight: 1.05 } as const
const muted = { color: '#a7b3c7', lineHeight: 1.72, fontSize: 15 } as const
const smallLink = { color: '#93c5fd', textDecoration: 'none', fontWeight: 850, fontSize: 14 } as const
const questionGrid = { display: 'grid', gridTemplateColumns: 'repeat(3,minmax(0,1fr))', gap: 14 } as const
const questionCard = { display: 'block', textDecoration: 'none', padding: 22, borderRadius: 24, background: 'rgba(15,23,42,.76)', border: '1px solid rgba(148,163,184,.14)', color: '#e5e7eb' } as const
const tag = { display: 'inline-flex', color: '#a5f3fc', background: 'rgba(34,211,238,.10)', border: '1px solid rgba(34,211,238,.20)', borderRadius: 999, padding: '5px 9px', fontSize: 12, fontWeight: 850, marginBottom: 14 } as const
const twoCol = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 } as const
const panel = { border: '1px solid rgba(148,163,184,.16)', background: 'rgba(15,23,42,.72)', borderRadius: 28, padding: 28 } as const
const answerPiece = { display: 'grid', gridTemplateColumns: '34px 1fr', gap: 13, alignItems: 'start', padding: 14, borderRadius: 16, background: 'rgba(2,6,23,.48)', border: '1px solid rgba(148,163,184,.10)' } as const
const pre = { whiteSpace: 'pre-wrap', background: '#020617', border: '1px solid rgba(148,163,184,.16)', borderRadius: 16, padding: 18, color: '#dbeafe', lineHeight: 1.6, margin: '18px 0' } as const
const closingPanel = { display: 'flex', justifyContent: 'space-between', gap: 22, flexWrap: 'wrap', alignItems: 'center', border: '1px solid rgba(99,102,241,.24)', background: 'linear-gradient(135deg,rgba(15,23,42,.86),rgba(49,46,129,.32))', borderRadius: 30, padding: 30 } as const
const primaryBtn = { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '13px 18px', borderRadius: 14, background: 'linear-gradient(135deg,#6366f1,#06b6d4)', color: 'white', textDecoration: 'none', fontWeight: 850 } as const
const secondaryBtn = { ...primaryBtn, background: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.16)' } as const
const ghostBtn = { ...primaryBtn, background: 'transparent', border: '1px solid rgba(99,102,241,.36)', color: '#a5b4fc' } as const
