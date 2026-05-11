import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

/**
 * POST /api/revalidate
 *
 * On-demand ISR cache purge.
 *
 * Usage (from server-side code, e.g. after publishing an article):
 *   fetch('https://bytesagain.com/api/revalidate', {
 *     method: 'POST',
 *     headers: { 'Content-Type': 'application/json' },
 *     body: JSON.stringify({
 *       secret: 'YOUR_REVALIDATION_SECRET',
 *       path: '/article/my-new-article',
 *     }),
 *   })
 *
 * You can also pass paths as an array to purge multiple pages at once.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { secret, path, paths } = body

    // Validate secret
    if (secret !== process.env.REVALIDATION_SECRET) {
      return NextResponse.json(
        { revalidated: false, message: 'Invalid secret' },
        { status: 401 },
      )
    }

    if (!path && !paths) {
      return NextResponse.json(
        { revalidated: false, message: 'Missing path or paths' },
        { status: 400 },
      )
    }

    const targetPaths = paths || [path]

    for (const p of targetPaths) {
      revalidatePath(p)
    }

    return NextResponse.json({
      revalidated: true,
      paths: targetPaths,
      now: Date.now(),
    })
  } catch (error) {
    return NextResponse.json(
      { revalidated: false, message: 'Invalid request body' },
      { status: 400 },
    )
  }
}
