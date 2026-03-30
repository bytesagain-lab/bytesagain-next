import { NextRequest, NextResponse } from 'next/server'

const SB_URL = 'https://jfpeycpiyayrpjldppzq.supabase.co'
const SB_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpmcGV5Y3BpeWF5cnBqbGRwcHpxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NDIzODExMiwiZXhwIjoyMDg5ODE0MTEyfQ.lD7IcVeN47mUlrP43DFhY8-BAzn_gJAqfOBBBjteA0I'

export async function POST(req: NextRequest) {
  const { email } = await req.json()
  if (!email || !email.includes('@')) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
  }

  const res = await fetch(`${SB_URL}/rest/v1/subscribers`, {
    method: 'POST',
    headers: {
      apikey: SB_SERVICE_KEY,
      Authorization: `Bearer ${SB_SERVICE_KEY}`,
      'Content-Type': 'application/json',
      Prefer: 'resolution=ignore-duplicates',
    },
    body: JSON.stringify({ email, source: 'homepage', status: 'pending' }),
  })

  if (!res.ok && res.status !== 409) {
    return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
