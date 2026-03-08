import { createServerClient } from "@supabase/ssr"
import type { CookieOptions } from "@supabase/ssr"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

async function startGoogleAuth(request: Request) {
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

  const origin = new URL(request.url).origin
  const redirectTo = `${origin}/auth/callback`

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo,
    },
  })

  if (error || !data.url) {
    return NextResponse.redirect(
      new URL("/login?error=No+se+pudo+iniciar+sesion+con+Google", request.url),
      { status: 303 }
    )
  }

  return NextResponse.redirect(data.url, { status: 303 })
}

export async function GET(request: Request) {
  return startGoogleAuth(request)
}

export async function POST(request: Request) {
  return startGoogleAuth(request)
}
