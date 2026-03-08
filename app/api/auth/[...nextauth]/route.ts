import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json(
    {
      error: "next-auth disabled",
      detail: "Authentication was consolidated around Supabase Auth.",
    },
    { status: 410 }
  )
}

export async function POST() {
  return GET()
}
