import type { Lead, Provider } from '@/lib/crm-types'

export type ProviderMetrics = {
  provider_id: string
  assigned_leads_count: number
  auto_assigned_leads_count: number
  manual_override_leads_count: number
  suggested_count: number
  high_manual_intervention: boolean
  no_traction: boolean
}

export function buildProviderMetrics(
  providers: Provider[],
  leads: Pick<
    Lead,
    'provider_id' | 'suggested_provider_id' | 'assignment_mode'
  >[]
): Record<string, ProviderMetrics> {
  const metricsByProvider: Record<string, ProviderMetrics> = {}

  for (const provider of providers) {
    const assigned_leads_count = leads.filter((lead) => lead.provider_id === provider.id).length
    const auto_assigned_leads_count = leads.filter(
      (lead) => lead.provider_id === provider.id && lead.assignment_mode === 'auto_assigned'
    ).length
    const manual_override_leads_count = leads.filter(
      (lead) => lead.provider_id === provider.id && lead.assignment_mode === 'manual_override'
    ).length
    const suggested_count = leads.filter((lead) => lead.suggested_provider_id === provider.id).length
    const isActive =
      typeof provider.active === 'boolean'
        ? provider.active
        : typeof provider.is_active === 'boolean'
          ? provider.is_active
          : true

    metricsByProvider[provider.id] = {
      provider_id: provider.id,
      assigned_leads_count,
      auto_assigned_leads_count,
      manual_override_leads_count,
      suggested_count,
      high_manual_intervention: manual_override_leads_count > auto_assigned_leads_count,
      no_traction: isActive && assigned_leads_count === 0,
    }
  }

  return metricsByProvider
}
