import { NextRequest, NextResponse } from 'next/server'

const FB_VERIFY_TOKEN = process.env.CLAVE_SECRETA_DE_LA_APP_FB || 'holatacna2026'
const FB_ACCESS_TOKEN = process.env.TOKEN_DE_ACCESO_API_GRAPH!
const N8N_WF1_URL = process.env.N8N_WEBHOOK_URL! // https://daroste.app.n8n.cloud/webhook/lead-intake

// GET — verificación de webhook por Facebook
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const mode = searchParams.get('hub.mode')
  const token = searchParams.get('hub.verify_token')
  const challenge = searchParams.get('hub.challenge')

  if (mode === 'subscribe' && token === FB_VERIFY_TOKEN) {
    return new Response(challenge, { status: 200 })
  }

  return new Response('Forbidden', { status: 403 })
}

// POST — lead nuevo desde Facebook Lead Ads
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    if (!body?.entry?.[0]?.changes?.[0]) {
      return NextResponse.json({ ok: true }) // ignorar pings vacíos
    }

    const change = body.entry[0].changes[0]
    if (change.field !== 'leadgen') {
      return NextResponse.json({ ok: true }) // ignorar otros eventos
    }

    const { leadgen_id, ad_name } = change.value

    // Obtener datos del lead desde Graph API
    const graphRes = await fetch(
      `https://graph.facebook.com/v22.0/${leadgen_id}?access_token=${FB_ACCESS_TOKEN}&fields=field_data,ad_name,form_id,created_time`
    )
    if (!graphRes.ok) {
      console.error('Error Graph API:', await graphRes.text())
      return NextResponse.json({ ok: true }) // no fallar — FB reintentará
    }

    const leadData = await graphRes.json()
    const fields = leadData.field_data || []

    const fm: Record<string, string> = {}
    for (const f of fields) {
      fm[f.name] = f.values?.[0] || ''
    }

    const name = fm['full_name'] || fm['name'] || fm['nombre'] || 'Sin nombre'
    const phone = (fm['phone_number'] || fm['phone'] || fm['telefono'] || '').replace(/\s/g, '')
    const email = fm['email'] || fm['correo'] || ''
    const service_name = fm['cual_servicio'] || fm['service'] || fm['tratamiento'] || ad_name || leadData.ad_name || 'Facebook Lead Ads'
    const message = fm['mensaje'] || fm['message'] || fm['comentarios'] || ''
    const city_interest = fm['ciudad'] || fm['city'] || fm['ciudad_origen'] || ''

    if (!phone) {
      console.error('Lead FB sin teléfono. Campos:', Object.keys(fm))
      return NextResponse.json({ ok: true })
    }

    // Enviar a WF1 (igual que los leads del formulario web)
    await fetch(N8N_WF1_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        phone,
        email,
        service_name,
        message,
        city_interest,
        utm_source: 'facebook_lead_ads',
        utm_medium: 'paid_social',
        utm_campaign: leadData.ad_name || '',
        leadgen_id,
      }),
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Error fb-webhook:', err)
    return NextResponse.json({ ok: true }) // siempre 200 a Facebook
  }
}
