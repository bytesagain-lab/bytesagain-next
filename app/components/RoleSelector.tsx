'use client'

import { useState } from 'react'

const CATEGORIES = [
  {
    id: 'work',
    icon: '💼',
    label: 'Work',
    roles: [
      { id: 'developer', icon: '⚡', label: 'Developer' },
      { id: 'designer', icon: '🎨', label: 'Designer' },
      { id: 'product', icon: '🗺️', label: 'Product Manager' },
      { id: 'marketer', icon: '📣', label: 'Marketer' },
      { id: 'sales', icon: '🤝', label: 'Sales' },
      { id: 'hr', icon: '👥', label: 'HR' },
      { id: 'ecommerce', icon: '🛍️', label: 'E-commerce' },
      { id: 'freelancer', icon: '🧳', label: 'Freelancer' },
    ],
  },
  {
    id: 'create',
    icon: '🎬',
    label: 'Create',
    roles: [
      { id: 'blogger', icon: '✍️', label: 'Blogger' },
      { id: 'youtuber', icon: '▶️', label: 'YouTuber' },
      { id: 'podcaster', icon: '🎙️', label: 'Podcaster' },
      { id: 'social', icon: '📱', label: 'Social Media' },
      { id: 'creator', icon: '✨', label: 'Creator' },
    ],
  },
  {
    id: 'learn',
    icon: '📚',
    label: 'Learn',
    roles: [
      { id: 'student', icon: '🎓', label: 'Student' },
      { id: 'self-taught', icon: '💡', label: 'Self-taught' },
      { id: 'researcher', icon: '🔬', label: 'Researcher' },
      { id: 'teacher', icon: '🏫', label: 'Teacher' },
    ],
  },
  {
    id: 'invest',
    icon: '📈',
    label: 'Invest',
    roles: [
      { id: 'trader', icon: '🪙', label: 'Crypto Trader' },
      { id: 'investor', icon: '📊', label: 'Investor' },
      { id: 'analyst', icon: '🔍', label: 'Analyst' },
    ],
  },
]

const SKILL_PACKS: Record<string, { slug: string; name: string; reason: string }[]> = {
  developer:   [{ slug: 'shell', name: 'Shell Toolkit', reason: 'CLI automation' }, { slug: 'debugger', name: 'Debugger', reason: 'Root cause any error' }, { slug: 'code-generator', name: 'Code Generator', reason: 'Stop writing boilerplate' }, { slug: 'database-design', name: 'Database Design', reason: 'Schema & queries' }, { slug: 'geo-seo', name: 'GEO SEO', reason: 'Get discovered by AI' }],
  designer:    [{ slug: 'story-writer', name: 'Story Writer', reason: 'Copy & UX writing' }, { slug: 'task-planner', name: 'Task Planner', reason: 'Project management' }, { slug: 'translator-pro', name: 'Translator Pro', reason: 'Multi-language assets' }],
  product:     [{ slug: 'task-planner', name: 'Task Planner', reason: 'Roadmap & prioritization' }, { slug: 'story-writer', name: 'Story Writer', reason: 'PRDs & specs' }, { slug: 'database-design', name: 'Database Design', reason: 'Data modeling' }],
  marketer:    [{ slug: 'geo-seo', name: 'GEO SEO', reason: 'Rank in AI search' }, { slug: 'story-writer', name: 'Story Writer', reason: 'Ad copy & emails' }, { slug: 'task-planner', name: 'Task Planner', reason: 'Campaign management' }, { slug: 'translator-pro', name: 'Translator Pro', reason: 'Global campaigns' }],
  sales:       [{ slug: 'story-writer', name: 'Story Writer', reason: 'Proposals & outreach' }, { slug: 'task-planner', name: 'Task Planner', reason: 'Pipeline management' }, { slug: 'translator-pro', name: 'Translator Pro', reason: 'International clients' }],
  hr:          [{ slug: 'story-writer', name: 'Story Writer', reason: 'Job descriptions & emails' }, { slug: 'task-planner', name: 'Task Planner', reason: 'Hiring pipeline' }, { slug: 'legal-advisor', name: 'Legal Advisor', reason: 'Contract basics' }],
  ecommerce:   [{ slug: 'story-writer', name: 'Story Writer', reason: 'Product descriptions' }, { slug: 'excel-formula', name: 'Excel Formula', reason: 'Inventory tracking' }, { slug: 'translator-pro', name: 'Translator Pro', reason: 'Sell globally' }],
  freelancer:  [{ slug: 'story-writer', name: 'Story Writer', reason: 'Proposals & pitches' }, { slug: 'task-planner', name: 'Task Planner', reason: 'Client management' }, { slug: 'legal-advisor', name: 'Legal Advisor', reason: 'Contracts & invoices' }],
  blogger:     [{ slug: 'story-writer', name: 'Story Writer', reason: 'Articles & posts' }, { slug: 'geo-seo', name: 'GEO SEO', reason: 'AI search visibility' }, { slug: 'translator-pro', name: 'Translator Pro', reason: 'Multilingual content' }],
  youtuber:    [{ slug: 'story-writer', name: 'Story Writer', reason: 'Scripts & hooks' }, { slug: 'task-planner', name: 'Task Planner', reason: 'Content calendar' }, { slug: 'translator-pro', name: 'Translator Pro', reason: 'Subtitles & localization' }],
  podcaster:   [{ slug: 'story-writer', name: 'Story Writer', reason: 'Episode outlines' }, { slug: 'task-planner', name: 'Task Planner', reason: 'Guest & schedule mgmt' }],
  social:      [{ slug: 'story-writer', name: 'Story Writer', reason: 'Captions & threads' }, { slug: 'task-planner', name: 'Task Planner', reason: 'Posting schedule' }, { slug: 'geo-seo', name: 'GEO SEO', reason: 'AI discoverability' }],
  creator:     [{ slug: 'story-writer', name: 'Story Writer', reason: 'Any format content' }, { slug: 'translator-pro', name: 'Translator Pro', reason: 'Global reach' }, { slug: 'task-planner', name: 'Task Planner', reason: 'Production pipeline' }],
  student:     [{ slug: 'code-generator', name: 'Code Generator', reason: 'See working examples' }, { slug: 'debugger', name: 'Debugger', reason: 'Understand errors' }, { slug: 'shell', name: 'Shell Toolkit', reason: 'Learn the terminal' }],
  'self-taught':[{ slug: 'code-generator', name: 'Code Generator', reason: 'Learn by example' }, { slug: 'debugger', name: 'Debugger', reason: 'Fix your own bugs' }, { slug: 'database-design', name: 'Database Design', reason: 'SQL foundations' }],
  researcher:  [{ slug: 'story-writer', name: 'Story Writer', reason: 'Papers & reports' }, { slug: 'task-planner', name: 'Task Planner', reason: 'Literature tracking' }, { slug: 'translator-pro', name: 'Translator Pro', reason: 'Multi-language sources' }],
  teacher:     [{ slug: 'story-writer', name: 'Story Writer', reason: 'Lesson plans & materials' }, { slug: 'task-planner', name: 'Task Planner', reason: 'Curriculum planning' }],
  trader:      [{ slug: 'black-scholes', name: 'Black-Scholes', reason: 'Options pricing' }, { slug: 'monte-carlo', name: 'Monte Carlo', reason: 'Risk simulation' }, { slug: 'npv', name: 'NPV Calculator', reason: 'Protocol valuation' }],
  investor:    [{ slug: 'monte-carlo', name: 'Monte Carlo', reason: 'Portfolio simulation' }, { slug: 'npv', name: 'NPV Calculator', reason: 'Project valuation' }, { slug: 'excel-formula', name: 'Excel Formula', reason: 'Financial modeling' }],
  analyst:     [{ slug: 'bytesagain-chart-generator', name: 'Chart Generator', reason: 'Data visualization' }, { slug: 'excel-formula', name: 'Excel Formula', reason: 'Complex formulas' }, { slug: 'database-design', name: 'Database Design', reason: 'SQL queries' }],
}

export default function RoleSelector({ onRoleChange }: { onRoleChange?: (role: string | null) => void }) {
  const [cat, setCat] = useState<string | null>(null)
  const [role, setRole] = useState<string | null>(null)

  const handleRoleSelect = (r: string) => {
    const newRole = role === r ? null : r
    setRole(newRole)
    onRoleChange?.(newRole)
  }

  const handleCatSelect = (c: string) => {
    setCat(cat === c ? null : c)
    setRole(null)
    onRoleChange?.(null)
  }

  const selectedCat = CATEGORIES.find(c => c.id === cat)
  const skills = role ? SKILL_PACKS[role] : null

  return (
    <div>
      {/* Layer 1: Big categories */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 24 }}>
        {CATEGORIES.map(c => (
          <button key={c.id} onClick={() => handleCatSelect(c.id)}
            style={{
              padding: '20px 12px', borderRadius: 14, cursor: 'pointer', textAlign: 'center',
              background: cat === c.id ? 'linear-gradient(135deg,#667eea22,#00d4ff22)' : '#0f0f23',
              border: cat === c.id ? '1px solid #667eea' : '1px solid #1a1a3e',
              transition: 'all .2s', color: cat === c.id ? '#e0e0e0' : '#aaa',
            }}>
            <div style={{ fontSize: '1.8em', marginBottom: 8 }}>{c.icon}</div>
            <div style={{ fontWeight: 700, fontSize: '.95em' }}>{c.label}</div>
          </button>
        ))}
      </div>

      {/* Layer 2: Roles within category */}
      {selectedCat && (
        <div style={{ marginBottom: 28, padding: '20px', background: '#0a0a1a', borderRadius: 14, border: '1px solid #1a1a3e' }}>
          <div style={{ color: '#555', fontSize: '.8em', marginBottom: 14, textTransform: 'uppercase', letterSpacing: 1 }}>
            I am a...
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {selectedCat.roles.map(r => (
              <button key={r.id} onClick={() => handleRoleSelect(r.id)}
                style={{
                  padding: '8px 16px', borderRadius: 20, cursor: 'pointer',
                  background: role === r.id ? 'linear-gradient(135deg,#667eea,#00d4ff)' : '#111128',
                  border: role === r.id ? '1px solid transparent' : '1px solid #1a1a3e',
                  color: role === r.id ? '#fff' : '#aaa',
                  fontSize: '.88em', fontWeight: role === r.id ? 700 : 400,
                  transition: 'all .15s',
                }}>
                {r.icon} {r.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Skill pack result */}
      {skills && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <div style={{ color: '#888', fontSize: '.82em', textTransform: 'uppercase', letterSpacing: 1 }}>
              Your Starter Pack
            </div>
            <a href="/use-case" style={{ color: '#667eea', fontSize: '.82em', textDecoration: 'none' }}>
              See all packs →
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
                <span style={{ color: '#333' }}>→</span>
              </a>
            ))}
          </div>
        </div>
      )}

      {!cat && (
        <p style={{ textAlign: 'center', color: '#333', fontSize: '.88em', margin: 0 }}>
        </p>
      )}
      {cat && !role && (
        <p style={{ textAlign: 'center', color: '#333', fontSize: '.88em', margin: 0 }}>
          ↑ Now pick your role
        </p>
      )}
    </div>
  )
}
