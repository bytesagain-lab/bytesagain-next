'use client'

import { useState } from 'react'
import RoleSelector from './RoleSelector'
import RoleArticles from './RoleArticles'

interface Article {
  slug: string
  title: string
  category: string
  published_at: string
}

export default function HomeClient({ articles }: { articles: Article[] }) {
  const [role, setRole] = useState<string | null>(null)

  return (
    <>
      <section style={{ marginBottom: 48 }}>
        <h2 style={{ textAlign: 'center', fontSize: '1.2em', fontWeight: 700, marginBottom: 24, color: '#ccc' }}>
          What do you do?
        </h2>
        <RoleSelector onRoleChange={setRole} />
      </section>

      <div style={{ borderTop: '1px solid #1a1a3e', marginBottom: 48 }} />

      <RoleArticles role={role} allArticles={articles} />
    </>
  )
}
