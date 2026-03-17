import type { Lead, Provider } from '@/lib/crm-types'

export type ServiceCoverageMetric = {
  service_key: string
  service_label: string
  active_providers_count: number
  pending_review_count: number
  pending_review_rate: number | null
}

function normalizeValue(value: string | null | undefined) {
  return (value || '')
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

function resolveServiceKey(serviceSlug: string | null | undefined, serviceName: string | null | undefined) {
  const normalizedSlug = normalizeValue(serviceSlug)
  if (normalizedSlug) return normalizedSlug

  return normalizeValue(serviceName)
}

function resolveServiceLabel(serviceSlug: string | null | undefined, serviceName: string | null | undefined) {
  return (serviceName || serviceSlug || 'sin-servicio').trim()
}

function isProviderActive(provider: Provider) {
  if (typeof provider.active === 'boolean') return provider.active
  if (typeof provider.is_active === 'boolean') return provider.is_active
  return true
}

export function buildServiceCoverageMetrics(
  providers: Provider[],
  leads: Pick<Lead, 'service_slug' | 'service_name' | 'assignment_mode'>[]
): ServiceCoverageMetric[] {
  const coverage = new Map<string, ServiceCoverageMetric & { total_leads: number }>()

  for (const provider of providers) {
    if (!isProviderActive(provider)) continue

    const serviceKey = resolveServiceKey(provider.service_slug, provider.service_name)
    if (!serviceKey) continue

    const existing = coverage.get(serviceKey)
    if (existing) {
      existing.active_providers_count += 1
    } else {
      coverage.set(serviceKey, {
        service_key: serviceKey,
        service_label: resolveServiceLabel(provider.service_slug, provider.service_name),
        active_providers_count: 1,
        pending_review_count: 0,
        pending_review_rate: null,
        total_leads: 0,
      })
    }
  }

  for (const lead of leads) {
    const serviceKey = resolveServiceKey(lead.service_slug, lead.service_name)
    if (!serviceKey) continue

    const existing = coverage.get(serviceKey)
    const record =
      existing ||
      ({
        service_key: serviceKey,
        service_label: resolveServiceLabel(lead.service_slug, lead.service_name),
        active_providers_count: 0,
        pending_review_count: 0,
        pending_review_rate: null,
        total_leads: 0,
      } satisfies ServiceCoverageMetric & { total_leads: number })

    record.total_leads += 1

    if (lead.assignment_mode === 'pending_review') {
      record.pending_review_count += 1
    }

    coverage.set(serviceKey, record)
  }

  return Array.from(coverage.values())
    .map(({ total_leads, ...item }) => ({
      ...item,
      pending_review_rate: total_leads > 0 ? item.pending_review_count / total_leads : null,
    }))
    .sort((a, b) => {
      const rateDiff = Number(b.pending_review_rate || 0) - Number(a.pending_review_rate || 0)
      if (rateDiff !== 0) return rateDiff

      return a.service_label.localeCompare(b.service_label)
    })
}
