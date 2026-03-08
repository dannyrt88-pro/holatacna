import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { selectProviderForLead } from "@/lib/provider-routing"
import { notifyTelegramLead } from "@/lib/telegram"
import { calculateLeadScore } from "@/lib/lead-scoring"
import { getSuggestedPackageSlugForSelection } from "@/lib/package-catalog"
import { services } from "@/lib/service-catalog"

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

    const name = body.name || null
    const tourist_phone = body.tourist_phone || null
    const preferred_date = body.preferred_date || null
    const service_id = body.service_id || null
    const service_name = body.service_name?.trim() || null
    const message = body.message?.trim() || null

    const utm_source = body.utm_source || null
    const utm_medium = body.utm_medium || null
    const utm_campaign = body.utm_campaign || null
    const utm_content = body.utm_content || null
    const utm_term = body.utm_term || null
    const landing_path = body.landing_path || null
    const city_interest = body.city_interest || null
    const service_slug = body.service_slug || resolveServiceSlug(service_name)
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

    const leadPayload = {
      name,
      tourist_phone,
      preferred_date,
      service_id,
      service_name,
      reference_code,
      status: "pending",
      source: "web",
      provider_id: null,
      provider_phone: null,
      commission_rate: 0,
      auto_assigned: false,
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

    let assignedLead = data

    if (data) {
      const provider = await selectProviderForLead({
        service_name: service_name,
        city_interest,
        service_slug,
        lead_score: scoring.score,
      })

      if (provider) {
        const { data: updatedLead, error: updateError } = await supabase
          .from("leads")
          .update({
            provider_id: provider.id,
            provider_phone: provider.whatsapp || null,
            commission_rate: provider.commission_rate || 0,
            auto_assigned: true
          })
          .eq("id", data.id)
          .select()
          .single()

        if (updateError) {
          console.error("Error auto-asignando provider:", updateError)
        } else if (updatedLead) {
          assignedLead = updatedLead
        }
      }
    }

    try {
      await notifyTelegramLead({
        id: assignedLead?.id,
        reference_code: assignedLead?.reference_code,
        name: assignedLead?.name,
        tourist_phone: assignedLead?.tourist_phone,
        service_name: assignedLead?.service_name,
        city_interest: assignedLead?.city_interest,
        landing_path: assignedLead?.landing_path,
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
      message_persisted: Boolean(assignedLead?.message)
    })
  } catch (error) {
    console.error("Server error create-lead:", error)
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    )
  }
}
