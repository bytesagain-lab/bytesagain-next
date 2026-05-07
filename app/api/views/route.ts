import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(req: NextRequest) {
  try {
    const { slug } = await req.json()
    if (!slug) return NextResponse.json({ error: 'slug required' }, { status: 400 })
    
    const sb = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )
    
    const { data } = await sb.from('posts').select('view_count').eq('slug', slug).single()
    const current = data?.view_count || 0
    
    await sb.from('posts').update({ view_count: current + 1 }).eq('slug', slug)
    
    return NextResponse.json({ views: current + 1 }, {
      headers: { 'Access-Control-Allow-Origin': '*' }
    })
  } catch {
    return NextResponse.json({ views: 0 }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get('slug')
  if (!slug) return NextResponse.json({ views: 0 })
  
  const sb = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
  
  const { data } = await sb.from('posts').select('view_count').eq('slug', slug).single()
  return NextResponse.json({ views: data?.view_count || 0 }, {
    headers: { 'Access-Control-Allow-Origin': '*' }
  })
}
