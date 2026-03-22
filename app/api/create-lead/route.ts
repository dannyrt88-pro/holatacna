import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { selectProviderForLead } from "@/lib/provider-routing"
import { notifyTelegramLead } from "@/lib/telegram"
import { calculateLeadScore } from "@/lib/lead-scoring"
import { getSuggestedPackageSlugForSelection } from "@/lib/package-catalog"
import { services } from "@/lib/service-catalog"
import { getTrackingValue } from "@/lib/lead-tracking"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

function generateReference() {
  const random = Math.floor(1000 + Math.random() * 9000)
  const year = new Date().getFullYear()
  return `HT-${year}-${random}`
}

function normalizeValue(value: string | null | undefined) {
  return (value || '')
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

function resolveServiceSlug(serviceName: string | null | undefined) {
  const normalized = normalizeValue(serviceName)
  return services.find((service) => normalizeValue(service.name) === normalized)?.slug || null
}

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const reference_code = generateReference()

    const name = body.name?.trim() || null
    const tourist_phone = body.tourist_phone?.trim() || body.phone?.trim() || null
    const phone = body.phone?.trim() || tourist_phone
    const preferred_date = body.preferred_date || null
    const service_id = body.service_id || null
    const service_name = body.service_name?.trim() || null
    const service_slug = body.service_slug?.trim() || resolveServiceSlug(service_name)
    const message = body.message?.trim() || null
    const email = body.email?.trim() || null

    const utm_source = getTrackingValue(body.utm_source)
    const utm_medium = getTrackingValue(body.utm_medium)
    const utm_campaign = getTrackingValue(body.utm_campaign)
    const utm_content = getTrackingValue(body.utm_content)
    const utm_term = getTrackingValue(body.utm_term)
    const landing_path = body.landing_path?.trim() || null
    const origin_url = body.origin_url?.trim() || landing_path
    const city_interest = body.city_interest?.trim() || null
    const additional_services = Array.isArray(body.additional_services)
      ? body.additional_services.map((item: unknown) => String(item || '').trim()).filter(Boolean)
      : []
    const scoring = calculateLeadScore({
      tourist_phone,
      service_name,
      city_interest,
      message,
      direct_mode: false,
    })
    const suggested_package_slug = getSuggestedPackageSlugForSelection(service_slug, additional_services)
    const assignment = await selectProviderForLead({
      service_name,
      city_interest,
      service_slug,
    })

    const leadPayload = {
      name,
      tourist_phone,
      email,
      preferred_date,
      service_id,
      service_name,
      reference_code,
      status: "pending",
      source: "web",
      provider_id: assignment.provider_id,
      provider_phone: assignment.provider_phone,
      commission_rate: assignment.commission_rate,
      auto_assigned: assignment.auto_assigned,
      direct_mode: false,
      utm_source,
      utm_medium,
      utm_campaign,
      utm_content,
      utm_term,
      landing_path,
      city_interest,
      additional_services,
      message,
      lead_score: scoring.score,
      lead_priority: scoring.priority,
      suggested_package_slug,
      suggested_provider_id: assignment.suggested_provider_id,
      top_provider_ids: assignment.top_provider_ids,
      assignment_mode: assignment.assignment_mode,
      assignment_reason: assignment.assignment_reason,
      direct_provider_ids: []
    }

    const { data, error } = await supabase
      .from("leads")
      .insert([leadPayload])
      .select()
      .single()

    if (error) {
      console.error("Error insertando lead:", error)
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }

    const assignedLead = data

    try {
      await notifyTelegramLead({
        id: assignedLead?.id,
        reference_code: assignedLead?.reference_code,
        name: assignedLead?.name,
        tourist_phone: assignedLead?.tourist_phone,
        email: assignedLead?.email,
        service_name: assignedLead?.service_name,
        city_interest: assignedLead?.city_interest,
        origin_url,
        landing_path: assignedLead?.landing_path,
        lead_score: assignedLead?.lead_score ?? scoring.score,
        created_at: assignedLead?.created_at,
        preferred_date: assignedLead?.preferred_date,
        provider_phone: assignedLead?.provider_phone,
        message: assignedLead?.message,
      })
    } catch (telegramError) {
      console.error("Error enviando lead a Telegram:", telegramError)
    }

    return NextResponse.json({
      ok: true,
      lead: assignedLead,
      auto_assigned: Boolean(assignedLead?.auto_assigned),
      lead_score: assignedLead?.lead_score ?? scoring.score,
      lead_priority: assignedLead?.lead_priority ?? scoring.priority,
      suggested_package_slug: assignedLead?.suggested_package_slug ?? suggested_package_slug,
      suggested_provider_id: assignedLead?.suggested_provider_id ?? assignment.suggested_provider_id,
      top_provider_ids: assignedLead?.top_provider_ids ?? assignment.top_provider_ids,
      assignment_mode: assignedLead?.assignment_mode ?? assignment.assignment_mode,
      assignment_reason: assignedLead?.assignment_reason ?? assignment.assignment_reason,
      message_persisted: Boolean(assignedLead?.message),
      phone_persisted: Boolean(phone)
    })
  } catch (error) {
    console.error("Server error create-lead:", error)
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    )
  }
}
