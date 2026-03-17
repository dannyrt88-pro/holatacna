export type RoutingObservedLead = {
  provider_id: string | null
  suggested_provider_id: string | null
  assignment_mode: string | null
  created_at?: string | null
}

export type ProviderObservedSignals = {
  assigned_leads_count: number
  suggested_count: number
  auto_assignment_share: number
  manual_override_share: number
  suggested_to_assigned_rate: number
}

export type ProviderObservedSignalsMap = Record<string, ProviderObservedSignals>

function getNeutralSignals(): ProviderObservedSignals {
  return {
    assigned_leads_count: 0,
    suggested_count: 0,
    auto_assignment_share: 0,
    manual_override_share: 0,
    suggested_to_assigned_rate: 0,
  }
}

export function buildProviderObservedSignals(
  providerIds: string[],
  leads: RoutingObservedLead[]
): ProviderObservedSignalsMap {
  const providerIdSet = new Set(providerIds)
  const assignedCounts: Record<string, number> = {}
  const suggestedCounts: Record<string, number> = {}
  const autoAssignedCounts: Record<string, number> = {}
  const manualOverrideCounts: Record<string, number> = {}

  for (const providerId of providerIds) {
    assignedCounts[providerId] = 0
    suggestedCounts[providerId] = 0
    autoAssignedCounts[providerId] = 0
    manualOverrideCounts[providerId] = 0
  }

  for (const lead of leads) {
    if (lead.provider_id && providerIdSet.has(lead.provider_id)) {
      assignedCounts[lead.provider_id] += 1

      if (lead.assignment_mode === 'auto_assigned') {
        autoAssignedCounts[lead.provider_id] += 1
      }

      if (lead.assignment_mode === 'manual_override') {
        manualOverrideCounts[lead.provider_id] += 1
      }
    }

    if (lead.suggested_provider_id && providerIdSet.has(lead.suggested_provider_id)) {
      suggestedCounts[lead.suggested_provider_id] += 1
    }
  }

  const result: ProviderObservedSignalsMap = {}

  for (const providerId of providerIds) {
    const assignedLeadsCount = assignedCounts[providerId] || 0
    const suggestedCount = suggestedCounts[providerId] || 0
    const autoAssignedCount = autoAssignedCounts[providerId] || 0
    const manualOverrideCount = manualOverrideCounts[providerId] || 0

    result[providerId] = {
      assigned_leads_count: assignedLeadsCount,
      suggested_count: suggestedCount,
      auto_assignment_share:
        assignedLeadsCount > 0 ? autoAssignedCount / assignedLeadsCount : 0,
      manual_override_share:
        assignedLeadsCount > 0 ? manualOverrideCount / assignedLeadsCount : 0,
      suggested_to_assigned_rate:
        suggestedCount > 0 ? assignedLeadsCount / suggestedCount : 0,
    }
  }

  return result
}

export function getNeutralObservedSignalsMap(providerIds: string[]): ProviderObservedSignalsMap {
  const result: ProviderObservedSignalsMap = {}

  for (const providerId of providerIds) {
    result[providerId] = getNeutralSignals()
  }

  return result
}
