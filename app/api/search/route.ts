import { NextRequest, NextResponse } from 'next/server'

const SB_URL = 'https://jfpeycpiyayrpjldppzq.supabase.co'
const SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpmcGV5Y3BpeWF5cnBqbGRwcHpxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQyMzgxMTIsImV4cCI6MjA4OTgxNDExMn0.KnRmNBKeUPmJQz3m46uNx5kvBf_ZXBVWSUTXOLjW4Ps'

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get('q')?.trim()
  if (!q || q.length < 2) return NextResponse.json([])

  const encoded = encodeURIComponent(q)
  // Search by name or description (ilike)
  const url = `${SB_URL}/rest/v1/skills?or=(name.ilike.*${encoded}*,description.ilike.*${encoded}*)&select=slug,name,description,category,downloads&order=downloads.desc&limit=8`

  const res = await fetch(url, {
    headers: { apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}` },
  })
  if (!res.ok) return NextResponse.json([])
  return NextResponse.json(await res.json())
}
