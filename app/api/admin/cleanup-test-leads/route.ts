import { createServerClient } from "@supabase/ssr"
import type { CookieOptions } from "@supabase/ssr"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

const ALLOWED_CLEANUP_EMAIL = "danny.rt88@gmail.com"

export async function POST(request: Request) {
  const cookieStore = await cookies()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.set({ name, value: "", ...options })
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  if ((user.email || "").trim().toLowerCase() !== ALLOWED_CLEANUP_EMAIL) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  const body = (await request.json().catch(() => ({}))) as { lead_ids?: string[] }
  const leadIds = Array.isArray(body.lead_ids)
    ? [...new Set(body.lead_ids.map((id) => String(id || "").trim()).filter(Boolean))]
    : []

  if (leadIds.length === 0) {
    return NextResponse.json({ error: "Selecciona al menos un lead de prueba" }, { status: 400 })
  }

  const { data, error } = await supabase
    .from("leads")
    .delete()
    .in("id", leadIds)
    .select("id")

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  return NextResponse.json({
    ok: true,
    deleted: data?.length || 0,
  })
}
