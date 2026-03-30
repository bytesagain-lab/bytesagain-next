'use client'

import { useEffect, useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'

export default function InstallCommand({ slug }: { slug: string }) {
  const [loggedIn, setLoggedIn] = useState<boolean | null>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
    supabase.auth.getUser().then(({ data }) => {
      setLoggedIn(!!data.user)
    })
  }, [])

  const cmd = `clawhub install ${slug}`

  const handleCopy = () => {
    navigator.clipboard.writeText(cmd)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (loggedIn === null) return null // loading

  if (!loggedIn) {
    return (
      <div style={{ marginBottom: 24, background: '#0a0a1a', borderRadius: 10, padding: '20px', border: '1px solid #1a1a2e' }}>
        <div style={{ color: '#888', fontSize: '.9em', marginBottom: 12 }}>
          🔒 <strong style={{ color: '#ccc' }}>Sign in to view install command</strong>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <a href="/login" style={{ padding: '8px 18px', background: 'linear-gradient(135deg,#667eea,#00d4ff)', borderRadius: 7, color: '#fff', fontWeight: 600, fontSize: '.85em', textDecoration: 'none' }}>
            Sign In
          </a>
          <a href="/register" style={{ padding: '8px 18px', border: '1px solid #333', borderRadius: 7, color: '#888', fontSize: '.85em', textDecoration: 'none' }}>
            Create Account
          </a>
        </div>
      </div>
    )
  }

  return (
    <div style={{ marginBottom: 24, position: 'relative' }}>
      <div style={{ background: '#0a0a1a', borderRadius: 10, padding: '16px 20px', fontFamily: 'monospace', fontSize: '.9em', color: '#00d4ff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>{cmd}</span>
        <button onClick={handleCopy} style={{ background: 'none', border: '1px solid #1a1a3e', borderRadius: 6, color: copied ? '#3ecf8e' : '#555', fontSize: '.8em', padding: '4px 10px', cursor: 'pointer', marginLeft: 12, whiteSpace: 'nowrap' }}>
          {copied ? '✓ Copied' : 'Copy'}
        </button>
      </div>
    </div>
  )
}
