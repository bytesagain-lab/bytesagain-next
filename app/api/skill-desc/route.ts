import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get('slug') || ''
  if (!slug) return NextResponse.json({})

  const { data } = await supabase
    .from('skills')
    .select('description')
    .eq('slug', slug)
    .single()

  return NextResponse.json(
    { description: data?.description || null },
    { headers: { 'Cache-Control': 'public, max-age=3600' } }
  )
}
