import { createClient } from '@supabase/supabase-js'
import { services } from '@/lib/service-catalog'
import type { Lead, Provider } from '@/lib/crm-types'
import { getLeadPriorityLabel } from '@/lib/lead-scoring'

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

function getProviderRoutingWeight(
  provider: Provider,
  lead: Pick<Lead, 'service_name' | 'city_interest'> & { service_slug?: string | null; lead_score?: number | null }
) {
  const priorityWeight = Number(provider.priority || 0) * 100
  const scoreWeight = Number(provider.score || 0) * 10
  const commissionWeight = Math.round(Number(provider.commission_rate || 0) * 100)
  const leadPriority = getLeadPriorityLabel(Number(lead.lead_score || 0))
  const premiumBoost = leadPriority === 'Alta' ? 25 : leadPriority === 'Media' ? 10 : 0

  return priorityWeight + scoreWeight + commissionWeight + premiumBoost
}

export async function selectProviderForLead(
  lead: Pick<Lead, 'service_name' | 'city_interest'> & { service_slug?: string | null; lead_score?: number | null }
) {
  const serviceSlug = resolveServiceSlug(lead)
  const serviceName = normalizeValue(lead.service_name)

  const { data, error } = await supabase
    .from('providers')
    .select('*')

  if (error || !data) {
    console.error('Error loading providers for routing:', error)
    return null
  }

  const providers = (data as Provider[])
    .filter((provider) => isProviderActive(provider))
    .filter((provider) => provider.auto_assign === true)
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
    .sort((a, b) => {
      return getProviderRoutingWeight(b, lead) - getProviderRoutingWeight(a, lead)
    })

  return providers[0] || null
}

export const getBestProviderForLead = selectProviderForLead
