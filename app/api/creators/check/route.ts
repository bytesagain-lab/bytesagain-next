import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'

export async function GET(req: NextRequest) {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll() { return req.cookies.getAll() }, setAll() {} } }
  )
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

  // Match by user_id first, then fallback to email/contact
  const { data: byUser } = await sb.from('creator_registrations').select('*').eq('user_id', user.id).limit(1)
  if (byUser?.length) return NextResponse.json({ data: byUser[0] })

  // Fallback: match by email in contact_value
  const email = user.email
  if (!email) return NextResponse.json({ data: null })

  const { data: all } = await sb.from('creator_registrations').select('*').order('created_at', { ascending: false }).limit(50)
  const match = (all || []).find((r: any) =>
    r.contact_value?.includes(email) || r.github?.toLowerCase() === email?.split('@')[0]?.toLowerCase()
  )
  return NextResponse.json({ data: match || null })
}
