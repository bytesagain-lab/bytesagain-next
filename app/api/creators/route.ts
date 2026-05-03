import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'

export async function POST(req: NextRequest) {
  // Auth check
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll() { return req.cookies.getAll() }, setAll() {} } }
  )
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Login required' }, { status: 401 })

  const body = await req.json()
  const { github, name, contact, contact_value, skills, pricing, bio } = body

  if (!github || !name || !contact || !contact_value || !skills) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const sb = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  // Check for duplicate: same user_id already registered
  const { data: existing } = await sb.from('creator_registrations').select('id').eq('user_id', user.id).limit(1)
  if (existing?.length) {
    return NextResponse.json({ error: 'Already registered' }, { status: 409 })
  }

  const { error } = await sb.from('creator_registrations').insert({
    user_id: user.id,
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
