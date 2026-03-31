import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export const revalidate = 86400 // 24h cache

export async function GET() {
  // 本地DB数量
  const { count } = await supabase
    .from('skills')
    .select('*', { count: 'exact', head: true })

  // GitHub总量（缓存24h，不每次打API）
  const ghCount = 107264 // 已验证，每月人工更新

  const today = new Date().toISOString().slice(0, 10)

  return NextResponse.json({
    curated: count || 0,
    total: ghCount,
    updated: today,
  })
}
