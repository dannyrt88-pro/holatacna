import { createServerClient } from "@supabase/ssr"
import type { CookieOptions } from "@supabase/ssr"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { resolveRoleByEmail } from "@/lib/access-control"
import { createClient } from "@supabase/supabase-js"
import { notifyProviderRegistration } from "@/lib/provider-notifications"

type ProviderRegisterPayload = {
  action?: string
  source?: "admin" | "provider-self-service"
  name?: string
  represented_entity?: string | null
  service_name?: string
  service_slug?: string | null
  whatsapp?: string | null
  email?: string | null
  website_url?: string | null
  photo_url?: string | null
  commission_rate?: number
  auto_assign?: boolean
  active?: boolean
  is_active?: boolean
  priority?: number
  score?: number
  city_scope?: string | null
  notes?: string | null
  accepts_terms?: boolean
}

const writeSupabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function GET() {
  const cookieStore = await cookies()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (name: string) => cookieStore.get(name)?.value,
        set: (name: string, value: string, options: CookieOptions) => {
          cookieStore.set({ name, value, ...options })
        },
        remove: (name: string, options: CookieOptions) => {
          cookieStore.set({ name, value: "", ...options })
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ role: "none" }, { status: 401 })
  }

  return NextResponse.json({
    role: resolveRoleByEmail(user.email),
    email: user.email,
  })
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ProviderRegisterPayload

    if (body.action !== "provider-register") {
      return NextResponse.json({ error: "Accion invalida" }, { status: 400 })
    }

    if (!body.name?.trim()) {
      return NextResponse.json({ error: "Ingresa el nombre del proveedor" }, { status: 400 })
    }

    if (!body.service_name?.trim()) {
      return NextResponse.json({ error: "Ingresa el servicio del proveedor" }, { status: 400 })
    }

    if (body.source === "provider-self-service" && !body.accepts_terms) {
      return NextResponse.json(
        { error: "Debes aceptar la declaracion de veracidad y el acuerdo comercial preliminar" },
        { status: 400 }
      )
    }

    const isAdminSource = body.source === "admin"

    const payload = {
      name: body.name.trim(),
      service_name: body.service_name.trim(),
      service_slug: body.service_slug?.trim() || null,
      whatsapp: body.whatsapp?.trim() || null,
      email: body.email?.trim() || null,
      website_url: body.website_url?.trim() || null,
      photo_url: body.photo_url?.trim() || null,
      commission_rate: Number(body.commission_rate || 0),
      auto_assign: isAdminSource ? Boolean(body.auto_assign) : false,
      active: isAdminSource ? Boolean(body.active) : false,
      is_active: isAdminSource ? Boolean(body.is_active ?? body.active) : false,
      priority: isAdminSource ? Number(body.priority || 0) : 0,
      score: isAdminSource ? Number(body.score || 0) : 0,
      city_scope: body.city_scope?.trim() || null,
      notes: body.notes?.trim() || null,
    }

    const { data, error } = await writeSupabase.from("providers").insert([payload]).select().single()

    if (error) {
      console.error("Error creando proveedor:", error)
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    try {
      await notifyProviderRegistration({
        name: payload.name,
        represented_entity: body.represented_entity?.trim() || null,
        service_name: payload.service_name,
        service_slug: payload.service_slug,
        whatsapp: payload.whatsapp,
        email: payload.email,
        city_scope: payload.city_scope,
        notes: payload.notes,
        accepts_terms: Boolean(body.accepts_terms),
        source: body.source === "admin" ? "admin" : "provider-self-service",
      })
    } catch (notificationError) {
      console.error("Error notificando registro de proveedor:", notificationError)
    }

    return NextResponse.json({ ok: true, provider: data })
  } catch (error) {
    console.error("Server error session-role POST:", error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
