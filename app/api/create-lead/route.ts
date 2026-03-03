import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

function generateReference() {
  const random = Math.floor(1000 + Math.random() * 9000)
  const year = new Date().getFullYear()
  return `HT-${year}-${random}`
}

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const reference_code = generateReference()

    const { error } = await supabase.from("leads").insert([
      {
        service_id: body.service_id,
        provider_id: body.provider_id,
        tourist_phone: body.tourist_phone,
        preferred_date: body.preferred_date,
        reference_code,
        source: "web"
      }
    ])

    if (error) {
      return NextResponse.json({ error }, { status: 400 })
    }

    return NextResponse.json({ reference_code })
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}