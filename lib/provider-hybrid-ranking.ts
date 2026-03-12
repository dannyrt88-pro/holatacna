type HybridRankingInput = {
  priority?: number | null
  score?: number | null
  assigned_leads_count?: number | null
  suggested_count?: number | null
  suggested_to_assigned_rate?: number | null
  auto_assignment_share?: number | null
  manual_override_share?: number | null
}

function normalizeNumber(value: number | null | undefined) {
  return typeof value === 'number' && Number.isFinite(value) ? value : 0
}

export function getManualBase(input: HybridRankingInput) {
  const priority = normalizeNumber(input.priority)
  const score = normalizeNumber(input.score)

  return priority * 10 + score * 3
}

export function getConfidenceFactor(input: HybridRankingInput) {
  const assignedLeadsCount = normalizeNumber(input.assigned_leads_count)
  const suggestedCount = normalizeNumber(input.suggested_count)
  const volume = Math.max(assignedLeadsCount, suggestedCount)

  return Math.min(1, volume / 10)
}

export function getRawObservedBonus(input: HybridRankingInput) {
  const suggestedToAssignedRate = normalizeNumber(input.suggested_to_assigned_rate)
  const autoAssignmentShare = normalizeNumber(input.auto_assignment_share)
  const manualOverrideShare = normalizeNumber(input.manual_override_share)

  return suggestedToAssignedRate * 25 + autoAssignmentShare * 15 - manualOverrideShare * 10
}

export function getObservedBonus(input: HybridRankingInput) {
  const rawObservedBonus = getRawObservedBonus(input)
  const confidenceFactor = getConfidenceFactor(input)
  const weightedObservedBonus = rawObservedBonus * confidenceFactor

  return Math.min(Math.max(weightedObservedBonus, -12), 12)
}

export function getHybridRankScore(input: HybridRankingInput) {
  return getManualBase(input) + getObservedBonus(input)
}

export type { HybridRankingInput }
