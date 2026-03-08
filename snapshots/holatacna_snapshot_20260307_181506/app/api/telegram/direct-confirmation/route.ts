import { NextResponse } from "next/server"
import { notifyTelegramDirectLead } from "@/lib/telegram"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    await notifyTelegramDirectLead({
      reference_code: body.reference_code || null,
      name: body.name || null,
      tourist_phone: body.tourist_phone || null,
      service_name: body.service_name || null,
      city_interest: body.city_interest || null,
      landing_path: body.landing_path || null,
      provider_name: body.provider_name || null,
      provider_phone: body.provider_phone || null,
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("Error enviando confirmacion directa a Telegram:", error)
    return NextResponse.json({ error: "Telegram error" }, { status: 500 })
  }
}
