'use client'

import { useEffect, useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'

export default function NavBar() {
  const [email, setEmail] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    supabase.auth.getUser().then(({ data }) => {
      setEmail(data.user?.email ?? null)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setEmail(session?.user?.email ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleSignOut = async () => {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  return (
    <header style={{ padding: '14px 0', background: '#0a0a1a', borderBottom: '1px solid #1a1a2e' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <a href="/" style={{ fontSize: '1.5em', fontWeight: 800, textDecoration: 'none', background: 'linear-gradient(135deg,#667eea,#00d4ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          BytesAgain
        </a>
        <nav style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <a href="/articles" style={{ color: '#ccc', textDecoration: 'none', fontSize: '.9em' }}>Articles</a>
          <a href="/use-case" style={{ color: '#ccc', textDecoration: 'none', fontSize: '.9em' }}>Cases</a>
          {!loading && (
            email ? (
              <>
                <a href="/dashboard" style={{ color: '#667eea', fontSize: '.85em', textDecoration: 'none' }}>{email.split('@')[0]}</a>
                <button onClick={handleSignOut} style={{ background: 'none', border: '1px solid #333', color: '#888', borderRadius: 6, padding: '4px 10px', fontSize: '.85em', cursor: 'pointer' }}>
                  Out
                </button>
              </>
            ) : (
              <a href="/login" style={{ color: '#ccc', textDecoration: 'none', fontSize: '.9em' }}>Sign In</a>
            )
          )}
          <a href="/pro" style={{ color: '#00d4ff', textDecoration: 'none', fontSize: '.9em', fontWeight: 600 }}>Pro</a>
        </nav>
      </div>
    </header>
  )
}
