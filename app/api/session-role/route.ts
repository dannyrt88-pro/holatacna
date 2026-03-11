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

function sanitizeOptionalString(value: string | null | undefined, maxLength = 255) {
  if (typeof value !== "string") return null

  const sanitized = value.trim().slice(0, maxLength)
  return sanitized.length ? sanitized : null
}

function sanitizeNotes(value: string | null | undefined) {
  if (typeof value !== "string") return null

  const sanitized = value.trim().replace(/\s+/g, " ").slice(0, 2000)
  return sanitized.length ? sanitized : null
}

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
      return NextResponse.json({ ok: false, error: "Accion invalida" }, { status: 400 })
    }

    if (body.source !== "admin" && body.source !== "provider-self-service") {
      return NextResponse.json({ ok: false, error: "Origen invalido" }, { status: 400 })
    }

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

    const requesterRole = resolveRoleByEmail(user?.email)
    const isAdminRequest = body.source === "admin" && requesterRole === "admin"
    const effectiveSource = isAdminRequest ? "admin" : "provider-self-service"

    const name = sanitizeOptionalString(body.name, 160)
    const serviceName = sanitizeOptionalString(body.service_name, 160)
    const representedEntity = sanitizeOptionalString(body.represented_entity, 160)
    const serviceSlug = sanitizeOptionalString(body.service_slug, 120)
    const whatsapp = sanitizeOptionalString(body.whatsapp, 40)
    const email = sanitizeOptionalString(body.email, 160)
    const websiteUrl = sanitizeOptionalString(body.website_url, 300)
    const photoUrl = sanitizeOptionalString(body.photo_url, 4000)
    const cityScope = sanitizeOptionalString(body.city_scope, 160)
    const notes = sanitizeNotes(body.notes)

    if (!name) {
      return NextResponse.json({ ok: false, error: "Ingresa el nombre del proveedor" }, { status: 400 })
    }

    if (!serviceName) {
      return NextResponse.json({ ok: false, error: "Ingresa el servicio del proveedor" }, { status: 400 })
    }

    if (effectiveSource === "provider-self-service" && !body.accepts_terms) {
      return NextResponse.json(
        { ok: false, error: "Debes aceptar la declaracion de veracidad y el acuerdo comercial preliminar" },
        { status: 400 }
      )
    }

    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!serviceRoleKey) {
      console.error("Missing SUPABASE_SERVICE_ROLE_KEY for provider registration")
      return NextResponse.json(
        { ok: false, error: "Configuracion incompleta del servidor para registrar proveedores." },
        { status: 500 }
      )
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const urlProjectRef = supabaseUrl?.match(/^https:\/\/([^.]+)\.supabase\.co$/)?.[1] || null
    const keyLooksLikeJwt = serviceRoleKey.split(".").length === 3

    try {
      const [, payloadSegment] = serviceRoleKey.split(".")
      const normalizedPayload = payloadSegment
        .replace(/-/g, "+")
        .replace(/_/g, "/")
        .padEnd(payloadSegment.length + ((4 - (payloadSegment.length % 4)) % 4), "=")
      const decodedPayload = JSON.parse(Buffer.from(normalizedPayload, "base64").toString("utf8")) as {
        ref?: string
        role?: string
      }
      const keyProjectRef = decodedPayload.ref || null
      const keyRole = decodedPayload.role || null

      console.error("Provider register Supabase runtime config", {
        effectiveSource,
        hasSupabaseUrl: Boolean(supabaseUrl),
        hasServiceRoleKey: Boolean(serviceRoleKey),
        urlProjectRef,
        keyProjectRef,
        keyRole,
        keyLooksLikeJwt,
        projectRefMatches:
          Boolean(urlProjectRef) &&
          Boolean(keyProjectRef) &&
          urlProjectRef === keyProjectRef,
      })
    } catch (decodeError) {
      console.error("Provider register Supabase runtime config decode failed", {
        effectiveSource,
        hasSupabaseUrl: Boolean(supabaseUrl),
        hasServiceRoleKey: Boolean(serviceRoleKey),
        urlProjectRef,
        keyLooksLikeJwt,
        decodeError: decodeError instanceof Error ? decodeError.message : "unknown",
      })
    }

    const providerWriteSupabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      serviceRoleKey
    )

    const payload = {
      name,
      service_name: serviceName,
      service_slug: serviceSlug,
      whatsapp,
      email,
      website_url: websiteUrl,
      photo_url: photoUrl,
      commission_rate: isAdminRequest ? Number(body.commission_rate || 0) : 0,
      auto_assign: isAdminRequest ? Boolean(body.auto_assign) : false,
      active: isAdminRequest ? Boolean(body.active ?? body.is_active) : false,
      priority: isAdminRequest ? Number(body.priority || 0) : 0,
      score: isAdminRequest ? Number(body.score || 0) : 0,
      city_scope: cityScope,
      notes,
    }

    const { data, error } = await providerWriteSupabase.from("providers").insert([payload]).select().single()

    if (error) {
      console.error("Error creando proveedor:", {
        effectiveSource,
        payloadKeys: Object.keys(payload),
        hasWhatsapp: Boolean(payload.whatsapp),
        hasEmail: Boolean(payload.email),
        hasWebsiteUrl: Boolean(payload.website_url),
        hasPhotoUrl: Boolean(payload.photo_url),
        hasCityScope: Boolean(payload.city_scope),
        hasNotes: Boolean(payload.notes),
        service_name: payload.service_name,
        service_slug: payload.service_slug,
        active: payload.active,
        auto_assign: payload.auto_assign,
        priority: payload.priority,
        score: payload.score,
        errorMessage: error.message,
        errorCode: error.code,
        errorDetails: error.details,
        errorHint: error.hint,
      })
      return NextResponse.json(
        { ok: false, error: "No se pudo registrar el proveedor. Intenta nuevamente." },
        { status: 400 }
      )
    }

    try {
      await notifyProviderRegistration({
        name: payload.name,
        represented_entity: representedEntity,
        service_name: payload.service_name,
        service_slug: payload.service_slug,
        whatsapp: payload.whatsapp,
        email: payload.email,
        city_scope: payload.city_scope,
        notes: payload.notes,
        accepts_terms: Boolean(body.accepts_terms),
        source: effectiveSource,
      })
    } catch (notificationError) {
      console.error("Error notificando registro de proveedor:", notificationError)
    }

    return NextResponse.json({
      ok: true,
      provider: data,
      message: "Proveedor registrado correctamente para revision.",
    })
  } catch (error) {
    console.error("Server error session-role POST:", error)
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 })
  }
}
