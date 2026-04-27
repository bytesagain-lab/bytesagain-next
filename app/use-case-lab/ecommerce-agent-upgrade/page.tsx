import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Use Case Lab — E-commerce Agent Upgrade', robots: { index: false, follow: false } }

const skills = [
  { slug: 'shopify-helper', name: 'Shopify Helper', downloads: 1661, role: 'Store operations', reason: 'BytesAgain-owned asset; directly maps to Shopify storefront/product workflow.', tested: 'Smoke target: produce product/store action checklist and safe execution steps.' },
  { slug: 'clawhub-shopify-admin-api', name: 'Shopify Admin API', downloads: 4753, role: 'Shopify integration', reason: 'Higher proof signal for Shopify API tasks and admin automation.', tested: 'Smoke target: explain API-safe product update and inventory workflow.' },
  { slug: 'clawhub-product-description-generator', name: 'Product Description Generator', downloads: 1740, role: 'Listing copy', reason: 'Specific to product copy; good fit for listing generation and optimization.', tested: 'Smoke target: generate title, bullet points, SEO description, and variants.' },
  { slug: 'clawhub-ecommerce-image-asset-generator', name: 'Ecommerce Image Asset Generator', downloads: 784, role: 'Product media', reason: 'Complements listing copy with image/asset production.', tested: 'Smoke target: create image brief, asset checklist, and channel variants.' },
  { slug: 'clawhub-ecommerce-product-picker', name: 'Cross-Border Ecommerce Product Picker', downloads: 704, role: 'Product research', reason: 'Useful before listing: product selection and cross-border market fit.', tested: 'Smoke target: evaluate product opportunities and localization risks.' },
]

const workflow = [
  'Clarify store goal: new product launch, listing cleanup, cross-border localization, or social commerce campaign.',
  'Pick the skill stack by workflow stage: research → copy → media → store/API → verification.',
  'Generate listing package: title, bullets, SEO copy, localized variants, image brief, and QA checklist.',
  'Verify channel fit: Shopify fields, marketplace requirements, language/currency/local compliance.',
  'Set weekly upgrade loop: detect new product trends, refresh weak listings, replace low-performing skills.'
]

export default function Page() { return <main style={shell}><section style={wrap}>
  <Link href="/home-lab" style={back}>← Home lab</Link>
  <div style={hero}><span style={badgeStyle}>Test use case #2</span><h1 style={h1}>Upgrade an e-commerce agent from content helper to sales workflow</h1><p style={sub}>For sellers who want an agent that can research products, generate listings, localize copy, create media briefs, and connect the work back to store operations.</p><div style={callout}><b>Core blocker:</b> A generic AI can write product copy, but it does not know which skills to combine, what to verify, or how to keep the workflow upgraded.</div></div>
  <section style={grid}><div style={panel}><h2 style={h2}>Skill selection standard</h2>{['Must map to a real commerce stage: research, copy, media, store ops, or QA.','Prefer verified/source-clear skills; BytesAgain-owned skills can be used when strategically important.','Avoid duplicate copywriters; one skill per workflow responsibility.','Require an observable output: listing fields, image brief, API checklist, localization diff.','Keep replacement path: if a better Shopify/listing skill appears, the use case should be upgradable.'].map((x,i)=><p key={x} style={rule}><b>{i+1}</b>{x}</p>)}</div><div style={panel}><h2 style={h2}>Recommended workflow</h2>{workflow.map((x,i)=><p key={x} style={step}><b>Step {i+1}</b>{x}</p>)}</div></section>
  <section style={panel}><h2 style={h2}>Tested skill stack candidate</h2><div style={{display:'grid',gap:12}}>{skills.map(s=><Link key={s.slug} href={`/skill/${s.slug}`} style={skillCard}><div><strong>{s.name}</strong><span>{s.role} · {s.downloads.toLocaleString()} downloads</span></div><p>{s.reason}</p><small>{s.tested}</small></Link>)}</div></section>
  <section style={panel}><h2 style={h2}>Prompt to give your agent</h2><pre style={pre}>You are my e-commerce agent upgrade planner. Build a skill stack for product research, listing copy, localization, product media, Shopify/store operations, and QA. Explain why each skill is selected, what output it should produce, and how to verify the workflow before publishing.</pre><Link href="/api/mcp?action=workflow&q=ecommerce%20agent%20product%20listing" style={btn}>Open MCP workflow JSON</Link></section>
</section></main> }

const shell={minHeight:'100vh',background:'radial-gradient(circle at 15% 0%,rgba(16,185,129,.20),transparent 32%),#050611',color:'#e5e7eb'} as const
const wrap={maxWidth:1120,margin:'0 auto',padding:'42px 20px 88px'} as const
const back={color:'#a5b4fc',textDecoration:'none',fontWeight:800,fontSize:14} as const
const hero={marginTop:20,padding:'38px clamp(22px,5vw,46px)',border:'1px solid rgba(16,185,129,.25)',borderRadius:30,background:'rgba(15,23,42,.78)'} as const
const badgeStyle={display:'inline-flex',padding:'7px 11px',borderRadius:999,background:'rgba(16,185,129,.12)',color:'#bbf7d0',fontWeight:850,fontSize:12} as const
const h1={fontSize:'clamp(2.1rem,5vw,4.4rem)',lineHeight:1,letterSpacing:'-.055em',margin:'18px 0 16px',color:'#fff'} as const
const sub={fontSize:'1.08rem',lineHeight:1.7,color:'#b6c2d9',maxWidth:820} as const
const callout={marginTop:20,padding:18,borderRadius:18,background:'rgba(34,197,94,.10)',border:'1px solid rgba(34,197,94,.25)',color:'#dcfce7'} as const
const grid={display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(320px,1fr))',gap:16,margin:'18px 0'} as const
const panel={padding:24,borderRadius:24,border:'1px solid rgba(148,163,184,.16)',background:'rgba(15,23,42,.72)',marginTop:18} as const
const h2={fontSize:'1.55rem',margin:'0 0 16px',color:'#fff'} as const
const rule={display:'flex',gap:12,color:'#cbd5e1',lineHeight:1.55} as const
const step={color:'#cbd5e1',lineHeight:1.65} as const
const skillCard={display:'block',textDecoration:'none',padding:18,borderRadius:18,background:'rgba(2,6,23,.58)',border:'1px solid rgba(148,163,184,.14)',color:'#e5e7eb'} as const
const pre={whiteSpace:'pre-wrap',background:'#020617',border:'1px solid rgba(148,163,184,.16)',borderRadius:16,padding:18,color:'#dbeafe',lineHeight:1.6} as const
const btn={display:'inline-flex',marginTop:14,padding:'12px 16px',borderRadius:14,background:'linear-gradient(135deg,#10b981,#06b6d4)',color:'#fff',textDecoration:'none',fontWeight:850} as const
