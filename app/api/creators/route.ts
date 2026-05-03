import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { github, name, contact, contact_value, skills, pricing, bio } = body

  if (!github || !name || !contact || !contact_value || !skills) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const sb = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { error } = await sb.from('creator_registrations').insert({
    github,
    name,
    contact_method: contact,
    contact_value,
    skills,
    pricing: pricing || null,
    bio: bio || null,
    status: 'pending',
  })

  if (error) {
    console.error('[creators] insert failed:', error)
    return NextResponse.json({ error: 'Failed to save' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
