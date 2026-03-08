import { promises as fs } from "fs"
import path from "path"
import { createServerClient } from "@supabase/ssr"
import type { CookieOptions } from "@supabase/ssr"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import {
  getAccessConfig,
  resolveRoleByEmail,
  serializeEmailList,
} from "@/lib/access-control"

type RoleUpdatePayload = {
  email?: string
  role?: "admin" | "monitor"
}

const envPath = path.join(process.cwd(), ".env.local")

async function getAdminUser() {
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
    return { error: NextResponse.json({ error: "Sesion expirada" }, { status: 401 }) }
  }

  const role = resolveRoleByEmail(user.email)

  if (role !== "admin") {
    return { error: NextResponse.json({ error: "Sin permisos" }, { status: 403 }) }
  }

  return { user }
}

async function readEnvLocal() {
  const raw = await fs.readFile(envPath, "utf8")
  return raw
}

function replaceOrAppendEnv(source: string, key: string, value: string) {
  const line = `${key}=${value}`
  const pattern = new RegExp(`^${key}=.*$`, "m")

  if (pattern.test(source)) {
    return source.replace(pattern, line)
  }

  return `${source.trimEnd()}\n${line}\n`
}

function buildResponse(currentEmail: string | null | undefined) {
  return {
    role: "admin" as const,
    currentEmail: currentEmail || null,
    ...getAccessConfig(),
  }
}

export async function GET() {
  const adminCheck = await getAdminUser()

  if (adminCheck.error) {
    return adminCheck.error
  }

  return NextResponse.json(buildResponse(adminCheck.user.email))
}

export async function POST(request: Request) {
  const adminCheck = await getAdminUser()

  if (adminCheck.error) {
    return adminCheck.error
  }

  const body = (await request.json()) as RoleUpdatePayload
  const email = (body.email || "").trim().toLowerCase()
  const nextRole = body.role

  if (!email || (nextRole !== "admin" && nextRole !== "monitor")) {
    return NextResponse.json({ error: "Payload invalido" }, { status: 400 })
  }

  const currentConfig = getAccessConfig()
  const adminEmails = currentConfig.adminEmails.filter((item) => item !== email)
  const monitorEmails = currentConfig.monitorEmails.filter((item) => item !== email)

  if (nextRole === "admin") {
    adminEmails.push(email)
  } else {
    monitorEmails.push(email)
  }

  let envRaw = await readEnvLocal()
  envRaw = replaceOrAppendEnv(envRaw, "ADMIN_EMAILS", serializeEmailList(adminEmails))
  envRaw = replaceOrAppendEnv(envRaw, "MONITOR_EMAILS", serializeEmailList(monitorEmails))

  await fs.writeFile(envPath, envRaw, "utf8")

  process.env.ADMIN_EMAILS = serializeEmailList(adminEmails)
  process.env.MONITOR_EMAILS = serializeEmailList(monitorEmails)

  return NextResponse.json(buildResponse(adminCheck.user.email))
}
