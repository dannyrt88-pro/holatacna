import { createServerClient } from "@supabase/ssr"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { canAccessDashboard, canManageProviders, resolveRoleByEmail } from "@/lib/access-control"

const protectedPrefixes = ["/admin", "/dashboard", "/providers", "/access"]

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request,
  })

  if (
    request.nextUrl.pathname.startsWith("/providers") &&
    request.nextUrl.searchParams.get("register") === "1"
  ) {
    return response
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          response = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const needsAuth = protectedPrefixes.some((prefix) =>
    request.nextUrl.pathname.startsWith(prefix)
  )

  if (!needsAuth) {
    return response
  }

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    const loginUrl = new URL("/login", request.url)
    loginUrl.searchParams.set("error", "Sesion expirada")
    loginUrl.searchParams.set(
      "next",
      `${request.nextUrl.pathname}${request.nextUrl.search}`
    )
    return NextResponse.redirect(loginUrl)
  }

  const role = resolveRoleByEmail(user.email)
  const pathname = request.nextUrl.pathname

  if (pathname.startsWith("/dashboard") && !canAccessDashboard(role)) {
    const loginUrl = new URL("/login", request.url)
    loginUrl.searchParams.set("error", "Sin permisos para dashboard")
    loginUrl.searchParams.set(
      "next",
      `${request.nextUrl.pathname}${request.nextUrl.search}`
    )
    return NextResponse.redirect(loginUrl)
  }

  if ((pathname.startsWith("/providers") || pathname.startsWith("/admin") || pathname.startsWith("/access")) && !canManageProviders(role)) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return response
}

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*", "/providers/:path*", "/access/:path*"],
}
