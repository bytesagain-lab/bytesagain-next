'use client'

import { useEffect, useState } from 'react'

interface Article {
  slug: string
  title: string
  category: string
  published_at: string
}

const ROLE_CATEGORIES: Record<string, string[]> = {
  developer: ['Developer Tools', 'DevOps', 'Automation', 'Programming'],
  designer: ['Design', 'Productivity', 'Content Creation'],
  product: ['Productivity', 'Business', 'Automation'],
  marketer: ['Marketing', 'SEO', 'Content Creation'],
  sales: ['Business', 'Productivity', 'Marketing'],
  hr: ['Productivity', 'Business'],
  ecommerce: ['E-commerce', 'Marketing', 'Business'],
  freelancer: ['Productivity', 'Business', 'Marketing'],
  blogger: ['Content Creation', 'SEO', 'Writing'],
  youtuber: ['Content Creation', 'Video', 'Marketing'],
  podcaster: ['Content Creation', 'Productivity'],
  social: ['Marketing', 'Content Creation', 'SEO'],
  creator: ['Content Creation', 'Marketing', 'Writing'],
  student: ['Education', 'Developer Tools', 'Productivity'],
  'self-taught': ['Developer Tools', 'Education', 'Programming'],
  researcher: ['Research', 'Productivity', 'Data Analysis'],
  teacher: ['Education', 'Productivity'],
  trader: ['Crypto', 'Finance', 'Data Analysis'],
  investor: ['Finance', 'Data Analysis', 'Business'],
  analyst: ['Data Analysis', 'Finance', 'Research'],
}

// skill mentions in articles — 手动策划的关键词→skill映射
const SKILL_MENTIONS: Record<string, { slug: string; name: string }> = {
  'shell': { slug: 'shell', name: 'Shell Toolkit' },
  'git': { slug: 'shell', name: 'Shell Toolkit' },
  'debug': { slug: 'debugger', name: 'Debugger' },
  'seo': { slug: 'geo-seo', name: 'GEO SEO' },
  'geo': { slug: 'geo-seo', name: 'GEO SEO' },
  'database': { slug: 'database-design', name: 'Database Design' },
  'sql': { slug: 'database-design', name: 'Database Design' },
  'code': { slug: 'code-generator', name: 'Code Generator' },
  'api': { slug: 'code-generator', name: 'Code Generator' },
  'chart': { slug: 'bytesagain-chart-generator', name: 'Chart Generator' },
  'translate': { slug: 'translator-pro', name: 'Translator Pro' },
  'write': { slug: 'story-writer', name: 'Story Writer' },
  'content': { slug: 'story-writer', name: 'Story Writer' },
  'task': { slug: 'task-planner', name: 'Task Planner' },
  'plan': { slug: 'task-planner', name: 'Task Planner' },
  'crypto': { slug: 'black-scholes', name: 'Black-Scholes' },
  'excel': { slug: 'excel-formula', name: 'Excel Formula' },
}

function getRelatedSkills(role: string) {
  const skills: { slug: string; name: string }[] = []
  const seen = new Set<string>()
  const keywords = Object.keys(SKILL_MENTIONS)
  
  // 根据角色推断相关关键词
  const roleKeywords: Record<string, string[]> = {
    developer: ['shell', 'debug', 'code', 'api', 'database'],
    marketer: ['seo', 'geo', 'content', 'write'],
    trader: ['crypto', 'chart', 'excel'],
    creator: ['write', 'content', 'translate'],
    student: ['code', 'debug', 'database'],
    analyst: ['chart', 'excel', 'database'],
  }
  
  const relevant = roleKeywords[role] || keywords.slice(0, 4)
  for (const kw of relevant) {
    const skill = SKILL_MENTIONS[kw]
    if (skill && !seen.has(skill.slug)) {
      seen.add(skill.slug)
      skills.push(skill)
    }
  }
  return skills.slice(0, 3)
}

export default function RoleArticles({ role, allArticles }: { role: string | null; allArticles: Article[] }) {
  const [articles, setArticles] = useState<Article[]>(allArticles.slice(0, 4))

  useEffect(() => {
    if (!role) {
      setArticles(allArticles.slice(0, 4))
      return
    }
    // 按角色分类过滤文章
    const cats = ROLE_CATEGORIES[role] || []
    const filtered = allArticles.filter(a =>
      cats.some(c => a.category?.toLowerCase().includes(c.toLowerCase()))
    )
    setArticles((filtered.length >= 2 ? filtered : allArticles).slice(0, 4))
  }, [role, allArticles])

  const relatedSkills = role ? getRelatedSkills(role) : []

  return (
    <section style={{ marginBottom: 60 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h2 style={{ margin: 0, fontSize: '1.2em', fontWeight: 700 }}>
          📖 {role ? 'Articles For You' : 'Latest Articles'}
        </h2>
        <a href="/articles" style={{ color: '#667eea', textDecoration: 'none', fontSize: '.85em' }}>View all →</a>
      </div>

      {/* Related skills pill bar */}
      {relatedSkills.length > 0 && (
        <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
          <span style={{ color: '#555', fontSize: '.8em', alignSelf: 'center' }}>Recommended skills:</span>
          {relatedSkills.map(s => (
            <a key={s.slug} href={`/skill/${s.slug}`} style={{
              padding: '4px 12px', borderRadius: 20, fontSize: '.8em', fontWeight: 600,
              background: '#667eea18', border: '1px solid #667eea44', color: '#667eea',
              textDecoration: 'none',
            }}>
              {s.name} →
            </a>
          ))}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))', gap: 12 }}>
        {articles.map(a => (
          <a key={a.slug} href={`/article/${a.slug}`} style={{
            display: 'block', padding: '18px 20px',
            background: '#0f0f23', border: '1px solid #1a1a3e', borderRadius: 12,
            textDecoration: 'none',
          }}>
            <div style={{ fontSize: '.72em', color: '#48bb78', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>
              {a.category}
            </div>
            <h3 style={{ margin: '0 0 8px', fontSize: '.92em', fontWeight: 600, color: '#e0e0e0', lineHeight: 1.4 }}>
              {a.title}
            </h3>
            <div style={{ fontSize: '.75em', color: '#444' }}>
              {a.published_at ? new Date(a.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : ''}
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
