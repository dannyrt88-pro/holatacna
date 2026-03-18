import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ n8n_configured: !!process.env.N8N_WEBHOOK_URL })
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const n8nUrl = process.env.N8N_WEBHOOK_URL

  if (!n8nUrl) {
    const baseUrl = request.nextUrl.origin
    const res = await fetch(`${baseUrl}/api/create-lead`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    const data = await res.json()
    return NextResponse.json(data, { status: res.status })
  }

  try {
    const n8nRes = await fetch(n8nUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    console.log('[intake] n8n status:', n8nRes.status)
    const n8nBody = await n8nRes.text()
    console.log('[intake] n8n response:', n8nBody)
    return NextResponse.json({ ok: true, n8n_status: n8nRes.status })
  } catch (err) {
    console.error('[intake] n8n fetch error:', err)
    return NextResponse.json({ error: 'Error al procesar el lead' }, { status: 500 })
  }
}
