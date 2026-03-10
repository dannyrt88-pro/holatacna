import { chileCities } from '@/lib/seo/chile-cities'
import { seoServices } from '@/lib/seo/services'

export type SeoLandingEntry = {
  city: (typeof chileCities)[number]
  service: (typeof seoServices)[number]
  path: string
  title: string
  description: string
}

export const seoLandingCatalog: SeoLandingEntry[] = chileCities.flatMap((city) =>
  seoServices.map((service) => ({
    city,
    service,
    path: `/${city.slug}/${service.slug}`,
    title: `${service.name} en Tacna para pacientes de ${city.name}`,
    description: `${service.descriptionBase} Pacientes de ${city.name} pueden comparar opciones en Tacna y dejar su lead antes de viajar.`,
  }))
)

const seoLandingByKey = Object.fromEntries(
  seoLandingCatalog.map((entry) => [`${entry.city.slug}::${entry.service.slug}`, entry])
) as Record<string, SeoLandingEntry>

export function getSeoLanding(citySlug: string, serviceSlug: string) {
  return seoLandingByKey[`${citySlug}::${serviceSlug}`] || null
}

export function getSeoLandingStaticParams() {
  return seoLandingCatalog.map((entry) => ({
    city: entry.city.slug,
    service: entry.service.slug,
  }))
}
