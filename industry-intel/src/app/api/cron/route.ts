import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

/**
 * Called by Vercel Cron every 6 hours (see vercel.json).
 * Vercel sets the Authorization header automatically when CRON_SECRET is configured.
 */
export async function GET(req: Request) {
  const authHeader = req.headers.get('authorization')
  const secret = process.env.CRON_SECRET

  // Protect in production
  if (process.env.NODE_ENV === 'production' && secret) {
    if (authHeader !== `Bearer ${secret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
  }

  try {
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    const response = await fetch(`${appUrl}/api/ingest`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${secret || ''}`,
      },
    })

    const data = await response.json()
    console.log('[Cron] Ingest completed:', data)

    return NextResponse.json({
      triggered: true,
      timestamp: new Date().toISOString(),
      ...data,
    })
  } catch (err) {
    console.error('[Cron] Failed to trigger ingest:', err)
    return NextResponse.json(
      { triggered: false, error: (err as Error).message },
      { status: 500 }
    )
  }
}
