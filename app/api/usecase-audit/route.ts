import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const cmd = req.nextUrl.searchParams.get('cmd') || 'check'
  const secret = req.nextUrl.searchParams.get('secret')
  const ADMIN_KEY = process.env.ADMIN_SECRET || 'bytesagain-admin-2026'

  if (secret !== ADMIN_KEY) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (!['check', 'stats'].includes(cmd)) {
    return NextResponse.json({ error: 'Invalid cmd' }, { status: 400 })
  }

  try {
    const { execSync } = require('child_process')
    const result = execSync(`python3 /home/admin/crons/usecase-audit.py ${cmd}`, {
      timeout: 60000,
      encoding: 'utf-8',
    })
    return NextResponse.json({ success: true, output: result })
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e.message, stderr: e.stderr }, { status: 500 })
  }
}
