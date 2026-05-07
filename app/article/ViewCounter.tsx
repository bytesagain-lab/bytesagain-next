'use client'
import { useEffect, useState } from 'react'

export default function ViewCounter({ slug }: { slug: string }) {
  const [views, setViews] = useState<number | null>(null)

  useEffect(() => {
    // Increment view
    fetch('/api/views', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug }),
    }).then(r => r.json()).then(d => setViews(d.views)).catch(() => {})
  }, [slug])

  if (views === null) return null
  return <span>{views} reads</span>
}
