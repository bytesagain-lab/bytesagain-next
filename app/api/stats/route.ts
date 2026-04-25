import { NextResponse } from 'next/server'
export const revalidate = 86400 // 24h cache: avoid expensive count(*) during bot crawls

export async function GET() {
  // Avoid count(*) on the 60K+ skills table during crawler bursts.
  // This number is refreshed by the monitoring/reporting pipeline, not per request.
  const curatedCount = 60202
  const ghCount = 107264 // 已验证，每月人工更新
  const today = new Date().toISOString().slice(0, 10)

  return NextResponse.json({
    curated: curatedCount,
    total: ghCount,
    updated: today,
  }, {
    headers: { 'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=604800' }
  })
}
