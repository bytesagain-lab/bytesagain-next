'use client'

import { useState } from 'react'
import RoleSelector from './RoleSelector'
import RoleArticles from './RoleArticles'
import SearchBox from './SearchBox'

interface Article {
  slug: string
  title: string
  category: string
  published_at: string
}

export default function HomeClient({ articles, searchAbove }: { articles: Article[]; searchAbove?: boolean }) {
  const [role, setRole] = useState<string | null>(null)

  return (
    <>
      {/* Install skill banner */}
      <div style={{
        marginBottom: 24, padding: '12px 20px',
        background: '#0f0f23', border: '1px solid #1a1a3e',
        borderRadius: 10, display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', flexWrap: 'wrap', gap: 8,
      }}>
        <span style={{ color: '#888', fontSize: '.88em' }}>
          🤖 Let your AI agent find skills for you
        </span>
        <a href="/install" style={{
          color: '#667eea', fontSize: '.85em', fontWeight: 600,
          textDecoration: 'none', whiteSpace: 'nowrap',
        }}>
          Install BytesAgain Skill →
        </a>
      </div>

      {/* Role selector */}
      <div style={{ marginBottom: searchAbove ? 16 : 0, textAlign: 'left' }}>
        <RoleSelector onRoleChange={setRole} />
      </div>

      {/* Search box below role selector */}
      {searchAbove && (
        <div style={{ marginBottom: 0 }}>
          <SearchBox />
        </div>
      )}

      {!searchAbove && (
        <>
          <div style={{ borderTop: '1px solid #1a1a3e', marginBottom: 48 }} />
          <RoleArticles role={role} allArticles={articles} />
        </>
      )}

      {searchAbove && (
        <>
          <div style={{ borderTop: '1px solid #1a1a3e', margin: '48px 0' }} />
          <RoleArticles role={role} allArticles={articles} />
        </>
      )}
    </>
  )
}
