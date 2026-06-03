'use client'
import { useState } from 'react'
import Link from 'next/link'

const PAGE = 48

const SOURCE_BADGE: Record<string, { label: string; color: string; emoji: string }> = {
  clawhub:    { label: 'ClawHub',    color: '#667eea', emoji: '🦀' },
  github:     { label: 'GitHub',     color: 'var(--text-muted4)',    emoji: '⭐' },
  bytesagain: { label: 'BytesAgain', color: '#00d4ff', emoji: '✦' },
  lobehub:    { label: 'LobeHub',    color: '#7c3aed', emoji: '🤖' },
  dify:       { label: 'Dify',       color: '#f59e0b', emoji: '🔧' },
  mcp:      { label: 'MCP',      color: '#00c853', emoji: '🔌' },
  skillssh:    { label: 'Skills.sh', color: '#7c3aed', emoji: '🛠️' },
  official:   { label: 'Official',   color: '#10b981', emoji: '✅' },
}

export default function SkillSearchResults({ initialSkills, query }: {
  initialSkills: any[]
  query: string
}) {
  const [skills, setSkills] = useState(initialSkills.slice(0, PAGE))
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const hasMore = initialSkills.length > skills.length

  const loadMore = () => {
    const next = initialSkills.slice(0, (page + 1) * PAGE)
    setSkills(next)
    setPage(p => p + 1)
  }

  // 如果初始数据不够，从 API 再拉
  const loadMoreFromApi = async () => {
    setLoading(true)
    try {
      const offset = skills.length
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}&limit=48&offset=${offset}`)
      const data = await res.json()
      const more = data.results || []
      setSkills(prev => [...prev, ...more])
    } catch {}
    setLoading(false)
  }

  return (
    <>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: 16,
        marginBottom: 32,
      }}>
        {skills.map((skill: any) => {
          const isGithub = skill._source === 'github' || skill.source === 'github'
          const isOurs = skill.is_ours
          // Determine source: FTS results may not have source field, default to clawhub
          const src = (skill.source || skill._source || 'clawhub') as string
          const badge = SOURCE_BADGE[src] || SOURCE_BADGE.clawhub
          const skillLink = isGithub 
            ? (skill.github_url || `https://github.com/${skill.github_owner}/${skill.github_repo}`)
            : `/skill/${skill.slug}`
          return (
            <a key={skill.slug} href={skillLink} target={isGithub ? '_blank' : undefined} rel={isGithub ? 'noopener noreferrer' : undefined} style={{ textDecoration: 'none' }}>
              <div className="skill-card" style={{
                background: 'var(--bg-card)',
                border: isOurs ? '1px solid #00d4ff44' : '1px solid #1a1a3e',
                borderRadius: 12,
                padding: '20px',
                height: '100%',
                transition: 'border-color .2s',
              }}>
                {/* Source badge row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontSize: '.72em', background: badge.color, color: '#fff', borderRadius: 20, padding: '2px 8px', fontWeight: 600 }}>
                    {badge.emoji} {badge.label}
                  </span>
                  {(skill.downloads ?? 0) > 0 && !isGithub && (
                    <span style={{ fontSize: '.75em', color: 'var(--text-muted3)' }}>
                      {Number(skill.downloads) >= 1000
                        ? `${(Number(skill.downloads) / 1000).toFixed(1)}k`
                        : skill.downloads} dl
                    </span>
                  )}
                  {isGithub && (skill.stars ?? 0) > 0 && (
                    <span style={{ fontSize: '.75em', color: 'var(--text-muted3)' }}>
                      ⭐ {(skill.stars >= 1000 ? `${(skill.stars/1000).toFixed(1)}k` : skill.stars)}
                    </span>
                  )}
                </div>
                <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '.95em', marginBottom: 6, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {skill.name || skill.slug}
                  {isOurs && (
                    <span style={{ fontSize: '.68em', color: '#00d4ff', background: '#00d4ff18', border: '1px solid #00d4ff33', borderRadius: 20, padding: '1px 7px', fontWeight: 600, marginLeft: 8 }}>
                      ✦ BytesAgain
                    </span>
                  )}
                </div>
                <div style={{ color: 'var(--text-muted3)', fontSize: '.82em', lineHeight: 1.5, marginBottom: 10, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {skill.description || '—'}
                </div>
              </div>
            </a>
          )
        })}
      </div>

      {(hasMore || initialSkills.length === PAGE) && (
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <button
            onClick={hasMore ? loadMore : loadMoreFromApi}
            disabled={loading}
            style={{
              padding: '12px 40px', borderRadius: 10, border: '1px solid #667eea',
              background: 'transparent', color: '#667eea', fontWeight: 700,
              fontSize: '.95em', cursor: loading ? 'wait' : 'pointer',
              transition: 'all .15s',
            }}
          >
            {loading ? 'Loading…' : `Load more`}
          </button>
        </div>
      )}
    </>
  )
}
