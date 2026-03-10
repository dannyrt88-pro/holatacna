import { chileCities } from '@/lib/seo/chile-cities'
import { applyIntentPattern, seoPageTypes } from '@/lib/seo/page-types'
import { seoServices } from '@/lib/seo/services'

export type SeoLandingEntry = {
  city: (typeof chileCities)[number]
  service: (typeof seoServices)[number]
  path: string
  title: string
  description: string
}

export type SeoIntentLandingEntry = {
  city: (typeof chileCities)[number]
  service: (typeof seoServices)[number]
  intent: (typeof seoPageTypes)[number]
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

export const seoIntentLandingCatalog: SeoIntentLandingEntry[] = chileCities.flatMap((city) =>
  seoServices.flatMap((service) =>
    seoPageTypes.map((intent) => ({
      city,
      service,
      intent,
      path: `/${city.slug}/${service.slug}/${intent.slug}`,
      title: applyIntentPattern(intent.titlePattern, {
        cityName: city.name,
        serviceName: service.name,
      }),
      description: applyIntentPattern(intent.descriptionPattern, {
        cityName: city.name,
        serviceName: service.name,
      }),
    }))
  )
)

const seoLandingByKey = Object.fromEntries(
  seoLandingCatalog.map((entry) => [`${entry.city.slug}::${entry.service.slug}`, entry])
) as Record<string, SeoLandingEntry>

const seoIntentLandingByKey = Object.fromEntries(
  seoIntentLandingCatalog.map((entry) => [
    `${entry.city.slug}::${entry.service.slug}::${entry.intent.slug}`,
    entry,
  ])
) as Record<string, SeoIntentLandingEntry>

export function getSeoLanding(citySlug: string, serviceSlug: string) {
  return seoLandingByKey[`${citySlug}::${serviceSlug}`] || null
}

export function getSeoIntentLanding(citySlug: string, serviceSlug: string, intentSlug: string) {
  return seoIntentLandingByKey[`${citySlug}::${serviceSlug}::${intentSlug}`] || null
}

export function getSeoLandingStaticParams() {
  return seoLandingCatalog.map((entry) => ({
    city: entry.city.slug,
    service: entry.service.slug,
  }))
}

export function getSeoIntentLandingStaticParams() {
  return seoIntentLandingCatalog.map((entry) => ({
    city: entry.city.slug,
    service: entry.service.slug,
    intent: entry.intent.slug,
  }))
}
