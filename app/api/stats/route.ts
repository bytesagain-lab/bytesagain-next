export const dynamic = 'force-dynamic'
import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const revalidate = 3600 // 1h cache（原来24h，改短让数字及时更新）

export async function GET() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
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
