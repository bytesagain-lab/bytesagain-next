import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'BytesAgain Home Lab — Agent Capability Layer',
  description: 'A test homepage concept for BytesAgain: help humans and agents discover, choose, and upgrade AI skills for real-world work.',
  robots: { index: false, follow: false },
}

const personas = [
  { name: 'AI Website Builder', pain: 'My AI-built site works, but SEO, design, speed, and conversion are messy.', href: '/use-case-lab/ai-website-upgrade', icon: '🌐' },
  { name: 'E-commerce Seller', pain: 'I need listings, localization, product media, and store workflows that do not break.', href: '/use-case-lab/ecommerce-agent-upgrade', icon: '🛒' },
  { name: 'Developer / Automator', pain: 'My agent needs better tools for browser, files, APIs, MCP, and QA.', href: '/skills?q=automation', icon: '🛠️' },
]

const proof = [
  ['60K+', 'skills indexed across ClawHub, GitHub, Dify, LobeHub'],
  ['367+', 'workflow use cases for real-world work'],
  ['MCP', 'agent-readable API for search, use cases, and upgrade plans'],
  ['250K+', 'downloads across active BytesAgain skill assets'],
]

const questions = [
  'Who is trying to get work done?',
  'What is their task and current blocker?',
  'Which skills are proven enough to recommend?',
  'How should the agent use them together?',
  'What should be upgraded next week?'
]

export default function HomeLabPage() {
  return (
    <main style={{ minHeight: '100vh', background: 'radial-gradient(circle at 18% 0%, rgba(99,102,241,.25), transparent 32%), radial-gradient(circle at 88% 12%, rgba(20,184,166,.18), transparent 30%), #050611', color: '#e5e7eb' }}>
      <section style={{ maxWidth: 1180, margin: '0 auto', padding: '72px 20px 48px' }}>
        <div style={{ display: 'inline-flex', gap: 8, alignItems: 'center', border: '1px solid rgba(129,140,248,.35)', background: 'rgba(15,23,42,.76)', borderRadius: 999, padding: '8px 13px', color: '#a5b4fc', fontSize: 13, fontWeight: 700, marginBottom: 22 }}>
          🧪 Test page · new positioning draft
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.18fr) minmax(320px, .82fr)', gap: 32, alignItems: 'center' }} className="lab-hero-grid">
          <div>
            <h1 style={{ fontSize: 'clamp(2.6rem, 7vw, 5.7rem)', lineHeight: .92, letterSpacing: '-.07em', margin: '0 0 22px', fontWeight: 950 }}>
              Upgrade what your <span style={{ background: 'linear-gradient(135deg,#8b5cf6,#22d3ee,#34d399)', WebkitBackgroundClip: 'text', color: 'transparent' }}>AI agent</span> can do.
            </h1>
            <p style={{ maxWidth: 680, color: '#b6c2d9', fontSize: '1.18rem', lineHeight: 1.75, margin: '0 0 28px' }}>
              BytesAgain helps humans and agents discover, choose, and continuously upgrade the AI skills, workflows, and MCP tools needed for real-world work.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 22 }}>
              <Link href="/agent-upgrade-lab" style={primaryBtn}>Plan my agent upgrade</Link>
              <Link href="/use-case-lab/ai-website-upgrade" style={secondaryBtn}>View test use case</Link>
              <Link href="/mcp" style={ghostBtn}>Connect via MCP</Link>
            </div>
            <p style={{ color: '#64748b', fontSize: 13, margin: 0 }}>Core promise: not another directory — a decision layer for agent capability.</p>
          </div>
          <div style={{ border: '1px solid rgba(148,163,184,.18)', borderRadius: 28, padding: 22, background: 'linear-gradient(180deg,rgba(15,23,42,.86),rgba(2,6,23,.88))', boxShadow: '0 30px 90px rgba(0,0,0,.35)' }}>
            <div style={{ color: '#94a3b8', fontSize: 13, fontWeight: 800, letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 14 }}>User arrives with a blocker</div>
            {['I used AI to build a website, but traffic is dropping.', 'Which skills should my agent add next?', 'How do I make this workflow reliable?'].map((q, i) => (
              <div key={q} style={{ padding: 15, borderRadius: 16, marginBottom: 10, background: i === 0 ? 'rgba(99,102,241,.18)' : 'rgba(15,23,42,.9)', border: '1px solid rgba(148,163,184,.12)', color: i === 0 ? '#e0e7ff' : '#cbd5e1', fontWeight: 700 }}>{q}</div>
            ))}
            <div style={{ height: 1, background: 'rgba(148,163,184,.16)', margin: '18px 0' }} />
            <div style={{ color: '#94a3b8', fontSize: 13, fontWeight: 800, letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 12 }}>BytesAgain returns</div>
            {['Recommended workflow', 'Tested skill stack', 'Install/MCP instructions', 'Upgrade path'].map(x => <span key={x} style={pill}>{x}</span>)}
          </div>
        </div>
      </section>

      <section style={{ maxWidth: 1180, margin: '0 auto', padding: '10px 20px 64px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 12 }} className="lab-proof-grid">
          {proof.map(([n, d]) => (
            <div key={n} style={statCard}><strong style={{ display: 'block', fontSize: 28, color: '#fff', marginBottom: 5 }}>{n}</strong><span style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.45 }}>{d}</span></div>
          ))}
        </div>
      </section>

      <section style={{ maxWidth: 1180, margin: '0 auto', padding: '0 20px 72px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }} className="lab-two-col">
          <div style={panel}>
            <h2 style={h2}>Built around questions, not keywords.</h2>
            <p style={muted}>A user does not come here to browse. They come because their agent hit a wall. The homepage should route that question into a workflow answer.</p>
            <div style={{ display: 'grid', gap: 10, marginTop: 20 }}>
              {questions.map((q, i) => <div key={q} style={{ display: 'flex', gap: 12, alignItems: 'center', color: '#dbeafe' }}><b style={num}>{i + 1}</b>{q}</div>)}
            </div>
          </div>
          <div style={panel}>
            <h2 style={h2}>Three entry paths.</h2>
            <div style={{ display: 'grid', gap: 12, marginTop: 18 }}>
              {personas.map(p => (
                <Link key={p.name} href={p.href} style={{ display: 'block', textDecoration: 'none', padding: 18, borderRadius: 18, background: 'rgba(15,23,42,.76)', border: '1px solid rgba(148,163,184,.14)' }}>
                  <div style={{ color: '#fff', fontWeight: 850, marginBottom: 6 }}>{p.icon} {p.name}</div>
                  <div style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.55 }}>{p.pain}</div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section style={{ maxWidth: 1180, margin: '0 auto', padding: '0 20px 90px' }}>
        <div style={{ ...panel, padding: 28 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap', alignItems: 'center' }}>
            <div>
              <h2 style={h2}>What makes BytesAgain different from the user&apos;s own AI?</h2>
              <p style={{ ...muted, marginBottom: 0 }}>Their AI has reasoning. BytesAgain supplies the live capability map: tested skills, source signals, use-case workflows, install paths, and upgrade recommendations.</p>
            </div>
            <Link href="/api/mcp?action=workflow&q=build%20AI%20website" style={primaryBtn}>Try MCP workflow JSON</Link>
          </div>
        </div>
      </section>
      <style>{`@media(max-width:800px){.lab-hero-grid,.lab-two-col{grid-template-columns:1fr!important}.lab-proof-grid{grid-template-columns:repeat(2,1fr)!important}}`}</style>
    </main>
  )
}

const primaryBtn = { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '13px 18px', borderRadius: 14, background: 'linear-gradient(135deg,#6366f1,#06b6d4)', color: 'white', textDecoration: 'none', fontWeight: 850 } as const
const secondaryBtn = { ...primaryBtn, background: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.16)' } as const
const ghostBtn = { ...primaryBtn, background: 'transparent', border: '1px solid rgba(99,102,241,.36)', color: '#a5b4fc' } as const
const pill = { display: 'inline-flex', margin: '0 8px 8px 0', padding: '8px 10px', borderRadius: 999, background: 'rgba(34,211,238,.1)', border: '1px solid rgba(34,211,238,.22)', color: '#a5f3fc', fontSize: 12, fontWeight: 800 } as const
const statCard = { padding: 20, borderRadius: 20, background: 'rgba(15,23,42,.76)', border: '1px solid rgba(148,163,184,.14)' } as const
const panel = { border: '1px solid rgba(148,163,184,.16)', background: 'rgba(15,23,42,.72)', borderRadius: 26, padding: 26 } as const
const h2 = { color: '#fff', fontSize: 'clamp(1.55rem,3vw,2.25rem)', margin: '0 0 12px', letterSpacing: '-.035em', lineHeight: 1.1 } as const
const muted = { color: '#a7b3c7', lineHeight: 1.7, fontSize: 15 } as const
const num = { width: 28, height: 28, borderRadius: 999, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(99,102,241,.2)', color: '#c4b5fd', flexShrink: 0 } as const
