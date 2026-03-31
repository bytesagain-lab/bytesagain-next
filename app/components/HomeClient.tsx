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
