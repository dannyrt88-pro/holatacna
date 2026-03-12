export type AssignmentMode = 'auto_assigned' | 'pending_review' | 'manual_override'

export type AssignmentReason =
  | 'ranked_auto_assign'
  | 'no_auto_assignable_provider'
  | 'no_eligible_provider'
  | 'routing_unavailable'
  | 'manual_admin_override'

export type ProviderSuggestion = {
  id: string
  name: string
  service_slug: string | null
  city_scope: string | null
  priority: number
  score: number
  auto_assign: boolean
}

export type LeadAssignmentResult = {
  suggested_provider_id: string | null
  top_provider_ids: string[]
  provider_id: string | null
  provider_phone: string | null
  commission_rate: number
  auto_assigned: boolean
  assignment_mode: AssignmentMode
  assignment_reason: AssignmentReason
  suggested_provider: ProviderSuggestion | null
  top_providers: ProviderSuggestion[]
}
