import { createClient } from '@supabase/supabase-js'
import type { LeadAssignmentResult, ProviderSuggestion } from '@/lib/assignment-types'
import { services } from '@/lib/service-catalog'
import type { Lead, Provider } from '@/lib/crm-types'
import { getHybridRankScore } from '@/lib/provider-hybrid-ranking'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

function normalizeValue(value: string | null | undefined) {
  return (value || '')
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

function resolveServiceSlug(lead: Pick<Lead, 'service_name'> & { service_slug?: string | null }) {
  if (lead.service_slug) {
    return normalizeValue(lead.service_slug)
  }

  const targetName = normalizeValue(lead.service_name)
  const match = services.find((service) => normalizeValue(service.name) === targetName)
  return match?.slug || null
}

function isProviderActive(provider: Provider) {
  if (typeof provider.active === 'boolean') {
    return provider.active
  }

  if (typeof provider.is_active === 'boolean') {
    return provider.is_active
  }

  return true
}

function matchesCityScope(provider: Provider, cityInterest: string | null | undefined) {
  const scope = normalizeValue(provider.city_scope)

  if (!scope || scope === 'all' || scope === '*') {
    return true
  }

  const city = normalizeValue(cityInterest)
  if (!city) {
    return true
  }

  return scope
    .split(',')
    .map((item) => item.trim())
    .includes(city)
}

function getObservedSignalsForProvider(_provider: Provider) {
  return {
    assigned_leads_count: 0,
    suggested_count: 0,
    suggested_to_assigned_rate: 0,
    auto_assignment_share: 0,
    manual_override_share: 0,
  }
}

function compareProvidersForAssignment(a: Provider, b: Provider) {
  const aHybridRankScore = getHybridRankScore({
    priority: Number(a.priority || 0),
    score: Number(a.score || 0),
    ...getObservedSignalsForProvider(a),
  })
  const bHybridRankScore = getHybridRankScore({
    priority: Number(b.priority || 0),
    score: Number(b.score || 0),
    ...getObservedSignalsForProvider(b),
  })

  const hybridDiff = bHybridRankScore - aHybridRankScore
  if (hybridDiff !== 0) return hybridDiff

  const priorityDiff = Number(b.priority || 0) - Number(a.priority || 0)
  if (priorityDiff !== 0) return priorityDiff

  const scoreDiff = Number(b.score || 0) - Number(a.score || 0)
  if (scoreDiff !== 0) return scoreDiff

  const createdAtDiff = new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
  if (!Number.isNaN(createdAtDiff) && createdAtDiff !== 0) return createdAtDiff

  return String(a.id).localeCompare(String(b.id))
}

function toProviderSuggestion(provider: Provider): ProviderSuggestion {
  return {
    id: provider.id,
    name: provider.name,
    service_slug: provider.service_slug || null,
    city_scope: provider.city_scope || null,
    priority: Number(provider.priority || 0),
    score: Number(provider.score || 0),
    auto_assign: provider.auto_assign === true,
  }
}

function buildAssignmentResult(
  eligibleProviders: Provider[],
  autoAssignableProviders: Provider[],
  assignmentReason: LeadAssignmentResult['assignment_reason']
): LeadAssignmentResult {
  const topProviders = eligibleProviders.slice(0, 3).map(toProviderSuggestion)
  const topProviderIds = topProviders.map((provider) => provider.id)
  const suggestedProvider = (autoAssignableProviders[0] || eligibleProviders[0]) ?? null

  if (!eligibleProviders.length) {
    return {
      suggested_provider_id: null,
      top_provider_ids: [],
      provider_id: null,
      provider_phone: null,
      commission_rate: 0,
      auto_assigned: false,
      assignment_mode: 'pending_review',
      assignment_reason: assignmentReason,
      suggested_provider: null,
      top_providers: [],
    }
  }

  if (!autoAssignableProviders.length) {
    return {
      suggested_provider_id: suggestedProvider?.id || null,
      top_provider_ids: topProviderIds,
      provider_id: null,
      provider_phone: null,
      commission_rate: 0,
      auto_assigned: false,
      assignment_mode: 'pending_review',
      assignment_reason: assignmentReason,
      suggested_provider: suggestedProvider ? toProviderSuggestion(suggestedProvider) : null,
      top_providers: topProviders,
    }
  }

  return {
    suggested_provider_id: suggestedProvider?.id || null,
    top_provider_ids: topProviderIds,
    provider_id: suggestedProvider?.id || null,
    provider_phone: suggestedProvider?.whatsapp || null,
    commission_rate: Number(suggestedProvider?.commission_rate || 0),
    auto_assigned: true,
    assignment_mode: 'auto_assigned',
    assignment_reason: assignmentReason,
    suggested_provider: suggestedProvider ? toProviderSuggestion(suggestedProvider) : null,
    top_providers: topProviders,
  }
}

export async function selectProviderForLead(
  lead: Pick<Lead, 'service_name' | 'city_interest'> & { service_slug?: string | null }
): Promise<LeadAssignmentResult> {
  const serviceSlug = resolveServiceSlug(lead)
  const serviceName = normalizeValue(lead.service_name)

  const { data, error } = await supabase
    .from('providers')
    .select('*')

  if (error || !data) {
    console.error('Error loading providers for routing:', error)
    return buildAssignmentResult([], [], 'routing_unavailable')
  }

  const eligibleProviders = (data as Provider[])
    .filter((provider) => isProviderActive(provider))
    .filter((provider) => {
      const providerSlug = normalizeValue(provider.service_slug)
      const providerServiceName = normalizeValue(provider.service_name)

      if (serviceSlug && providerSlug) {
        return providerSlug === serviceSlug
      }

      if (serviceSlug && providerServiceName) {
        const service = services.find((item) => item.slug === serviceSlug)
        return normalizeValue(service?.name) === providerServiceName
      }

      return providerServiceName === serviceName
    })
    .filter((provider) => matchesCityScope(provider, lead.city_interest))
    .sort(compareProvidersForAssignment)

  if (!eligibleProviders.length) {
    return buildAssignmentResult([], [], 'no_eligible_provider')
  }

  const autoAssignableProviders = eligibleProviders.filter((provider) => provider.auto_assign === true)

  if (!autoAssignableProviders.length) {
    return buildAssignmentResult(eligibleProviders, [], 'no_auto_assignable_provider')
  }

  return buildAssignmentResult(eligibleProviders, autoAssignableProviders, 'ranked_auto_assign')
}

export const getBestProviderForLead = selectProviderForLead
