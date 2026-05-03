import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function GET() {
  const sb = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
  const { data, error } = await sb
    .from('skill_requests')
    .select('id, request, contact, created_at')
    .order('created_at', { ascending: false })
    .limit(50)
  if (error) return NextResponse.json([], { status: 500 })
  return NextResponse.json(data || [])
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { request, contact } = body
  if (!request || request.trim().length < 5) {
    return NextResponse.json({ error: 'Request too short' }, { status: 400 })
  }
  if (request.length > 500) {
    return NextResponse.json({ error: 'Request too long' }, { status: 400 })
  }

  const sb = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
  const { error } = await sb.from('skill_requests').insert({
    request: request.trim(),
    contact: contact?.trim() || null,
  })
  if (error) {
    console.error('[skill_requests] insert failed:', error)
    return NextResponse.json({ error: 'Failed to save' }, { status: 500 })
  }
  return NextResponse.json({ ok: true })
}
