import type { ProviderMetrics } from '@/lib/provider-metrics'

export type ProviderPhase2Metrics = {
  provider_id: string
  suggested_to_assigned_rate: number | null
  manual_override_share: number | null
  auto_assignment_share: number | null
}

export function buildProviderPhase2Metrics(
  providerMetrics: Record<string, ProviderMetrics>
): Record<string, ProviderPhase2Metrics> {
  const result: Record<string, ProviderPhase2Metrics> = {}

  for (const [providerId, metrics] of Object.entries(providerMetrics)) {
    result[providerId] = {
      provider_id: providerId,
      suggested_to_assigned_rate:
        metrics.suggested_count > 0
          ? metrics.assigned_leads_count / metrics.suggested_count
          : null,
      manual_override_share:
        metrics.assigned_leads_count > 0
          ? metrics.manual_override_leads_count / metrics.assigned_leads_count
          : null,
      auto_assignment_share:
        metrics.assigned_leads_count > 0
          ? metrics.auto_assigned_leads_count / metrics.assigned_leads_count
          : null,
    }
  }

  return result
}
