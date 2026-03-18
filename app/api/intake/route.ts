import { NextRequest, NextResponse } from 'next/server'

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
    await fetch(n8nUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Error al procesar el lead' }, { status: 500 })
  }
}
