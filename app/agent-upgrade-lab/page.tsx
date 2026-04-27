import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Agent Upgrade Lab — BytesAgain', robots: { index: false, follow: false } }

const fields = [
  ['1', 'What agent are you upgrading?', 'Claude, Cursor, OpenClaw, Manus, custom MCP client…'],
  ['2', 'What real work should it do?', 'Website SEO, ecommerce listings, data dashboards, content ops…'],
  ['3', 'Where is it blocked?', 'Bad output, missing tools, weak verification, no workflow memory…'],
  ['4', 'What should BytesAgain return?', 'Workflow, tested skill stack, prompt, MCP actions, weekly upgrade path.'],
]

export default function AgentUpgradeLab() {
  return <main style={{minHeight:'100vh',background:'radial-gradient(circle at 20% 0%,rgba(99,102,241,.22),transparent 34%),#050611',color:'#e5e7eb'}}>
    <section style={{maxWidth:980,margin:'0 auto',padding:'52px 20px 90px'}}>
      <Link href="/home-lab" style={{color:'#a5b4fc',textDecoration:'none',fontWeight:800}}>← Home lab</Link>
      <div style={{marginTop:24,padding:'38px clamp(22px,5vw,48px)',borderRadius:30,border:'1px solid rgba(99,102,241,.22)',background:'rgba(15,23,42,.75)'}}>
        <span style={{display:'inline-flex',padding:'7px 11px',borderRadius:999,background:'rgba(99,102,241,.16)',color:'#c4b5fd',fontWeight:850,fontSize:12}}>Conversion concept</span>
        <h1 style={{fontSize:'clamp(2.3rem,6vw,4.8rem)',lineHeight:1,letterSpacing:'-.06em',margin:'18px 0',color:'#fff'}}>Plan your agent upgrade</h1>
        <p style={{fontSize:'1.08rem',lineHeight:1.75,color:'#b6c2d9',maxWidth:760}}>This is the future subscription entry: users describe their agent, goal, and blocker; BytesAgain returns a capability upgrade plan with tested skills and workflows.</p>
      </div>
      <div style={{display:'grid',gap:14,marginTop:20}}>{fields.map(([n,t,d])=><div key={n} style={{display:'grid',gridTemplateColumns:'48px 1fr',gap:16,padding:20,borderRadius:20,border:'1px solid rgba(148,163,184,.16)',background:'rgba(15,23,42,.68)'}}><b style={{width:38,height:38,borderRadius:999,display:'inline-flex',alignItems:'center',justifyContent:'center',background:'rgba(34,211,238,.12)',color:'#a5f3fc'}}>{n}</b><div><h2 style={{margin:'0 0 6px',fontSize:20,color:'#fff'}}>{t}</h2><p style={{margin:0,color:'#94a3b8',lineHeight:1.55}}>{d}</p></div></div>)}</div>
      <div style={{marginTop:22,display:'flex',gap:12,flexWrap:'wrap'}}>
        <Link href="/api/mcp?action=workflow&q=upgrade%20AI%20website" style={btn}>Try website workflow JSON</Link>
        <Link href="/api/mcp?action=workflow&q=ecommerce%20product%20listing" style={btn2}>Try ecommerce workflow JSON</Link>
      </div>
    </section>
  </main>
}
const btn={display:'inline-flex',padding:'12px 16px',borderRadius:14,background:'linear-gradient(135deg,#6366f1,#06b6d4)',color:'#fff',textDecoration:'none',fontWeight:850} as const
const btn2={...btn,background:'rgba(255,255,255,.08)',border:'1px solid rgba(255,255,255,.16)'} as const
