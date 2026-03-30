'use client'

import { useState } from 'react'

const ROLES = [
  { id: 'developer', icon: '⚡', label: 'Developer', desc: 'Code, APIs, DevOps' },
  { id: 'creator', icon: '🎬', label: 'Creator', desc: 'Content, video, writing' },
  { id: 'trader', icon: '🪙', label: 'Trader', desc: 'Crypto, finance, data' },
  { id: 'marketer', icon: '📣', label: 'Marketer', desc: 'SEO, GEO, campaigns' },
  { id: 'student', icon: '📚', label: 'Student', desc: 'Learning, research' },
  { id: 'ecommerce', icon: '🛍️', label: 'E-commerce', desc: 'Store, products, sales' },
]

const SKILL_PACKS: Record<string, { slug: string; name: string; reason: string }[]> = {
  developer: [
    { slug: 'shell', name: 'Shell Toolkit', reason: 'CLI automation & scripting' },
    { slug: 'debugger', name: 'Debugger', reason: 'Root cause any error instantly' },
    { slug: 'code-generator', name: 'Code Generator', reason: 'Stop writing boilerplate' },
    { slug: 'database-design', name: 'Database Design', reason: 'Schema & query optimization' },
    { slug: 'geo-seo', name: 'GEO SEO', reason: 'Get your project discovered by AI' },
  ],
  creator: [
    { slug: 'story-writer', name: 'Story Writer', reason: 'Scripts, posts, narratives' },
    { slug: 'translator-pro', name: 'Translator Pro', reason: 'Reach global audiences' },
    { slug: 'task-planner', name: 'Task Planner', reason: 'Content calendar & schedule' },
    { slug: 'geo-seo', name: 'GEO SEO', reason: 'Get cited by ChatGPT & Perplexity' },
  ],
  trader: [
    { slug: 'black-scholes', name: 'Black-Scholes', reason: 'Options pricing & volatility' },
    { slug: 'monte-carlo', name: 'Monte Carlo', reason: 'Risk simulation & forecasting' },
    { slug: 'npv', name: 'NPV Calculator', reason: 'DeFi protocol valuation' },
    { slug: 'utxo', name: 'UTXO Tracker', reason: 'Bitcoin on-chain mechanics' },
  ],
  marketer: [
    { slug: 'geo-seo', name: 'GEO SEO', reason: 'Rank in AI search answers' },
    { slug: 'story-writer', name: 'Story Writer', reason: 'Ad copy, emails, blog posts' },
    { slug: 'task-planner', name: 'Task Planner', reason: 'Campaign management' },
    { slug: 'translator-pro', name: 'Translator Pro', reason: 'Localize for global markets' },
  ],
  student: [
    { slug: 'code-generator', name: 'Code Generator', reason: 'See working examples instantly' },
    { slug: 'debugger', name: 'Debugger', reason: 'Understand why code breaks' },
    { slug: 'shell', name: 'Shell Toolkit', reason: 'Get comfortable with terminal' },
    { slug: 'database-design', name: 'Database Design', reason: 'Learn SQL with real examples' },
  ],
  ecommerce: [
    { slug: 'story-writer', name: 'Story Writer', reason: 'Product descriptions that convert' },
    { slug: 'excel-formula', name: 'Excel Formula', reason: 'Inventory & sales tracking' },
    { slug: 'translator-pro', name: 'Translator Pro', reason: 'Sell in multiple languages' },
    { slug: 'task-planner', name: 'Task Planner', reason: 'Coordinate launches & promos' },
  ],
}

export default function RoleSelector() {
  const [selected, setSelected] = useState<string | null>(null)
  const skills = selected ? SKILL_PACKS[selected] : null

  return (
    <div>
      {/* Role cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(150px,1fr))', gap: 10, marginBottom: 32 }}>
        {ROLES.map(r => (
          <button key={r.id} onClick={() => setSelected(selected === r.id ? null : r.id)}
            style={{
              padding: '16px 12px', borderRadius: 12, cursor: 'pointer', textAlign: 'center',
              background: selected === r.id ? 'linear-gradient(135deg,#667eea22,#00d4ff22)' : '#0f0f23',
              border: selected === r.id ? '1px solid #667eea' : '1px solid #1a1a3e',
              transition: 'all .2s', color: selected === r.id ? '#e0e0e0' : '#aaa',
            }}>
            <div style={{ fontSize: '1.6em', marginBottom: 6 }}>{r.icon}</div>
            <div style={{ fontWeight: 700, fontSize: '.9em', marginBottom: 2 }}>{r.label}</div>
            <div style={{ fontSize: '.75em', color: '#666' }}>{r.desc}</div>
          </button>
        ))}
      </div>

      {/* Skill pack */}
      {skills && (
        <div style={{ animation: 'fadeIn .3s ease' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <h3 style={{ margin: 0, fontSize: '1em', color: '#888', textTransform: 'uppercase', letterSpacing: 1 }}>
              Your Starter Pack
            </h3>
            <a href={`/use-case/${selected === 'developer' ? 'developer-workflow' : selected === 'trader' ? 'crypto-research' : selected === 'creator' ? 'content-creator' : selected === 'marketer' ? 'seo-geo' : selected === 'student' ? 'learn-programming' : 'ecommerce'}`}
              style={{ color: '#667eea', fontSize: '.82em', textDecoration: 'none' }}>
              See full pack →
            </a>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {skills.map((s, i) => (
              <a key={s.slug} href={`/skill/${s.slug}`} style={{
                display: 'flex', alignItems: 'center', gap: 14, padding: '12px 16px',
                background: '#0f0f23', border: '1px solid #1a1a3e', borderRadius: 10,
                textDecoration: 'none',
              }}>
                <div style={{
                  width: 24, height: 24, borderRadius: '50%', flexShrink: 0,
                  background: 'linear-gradient(135deg,#667eea,#00d4ff)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '.75em', fontWeight: 800, color: '#fff',
                }}>{i + 1}</div>
                <div style={{ flex: 1 }}>
                  <span style={{ fontWeight: 600, color: '#e0e0e0', fontSize: '.92em' }}>{s.name}</span>
                  <span style={{ color: '#555', fontSize: '.82em', marginLeft: 8 }}>{s.reason}</span>
                </div>
                <span style={{ color: '#333', fontSize: '1em' }}>→</span>
              </a>
            ))}
          </div>
        </div>
      )}

      {!selected && (
        <p style={{ textAlign: 'center', color: '#444', fontSize: '.88em', margin: 0 }}>
          ↑ Select your role to get personalized skill recommendations
        </p>
      )}
    </div>
  )
}
