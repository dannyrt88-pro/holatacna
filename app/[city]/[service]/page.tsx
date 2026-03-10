import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ServiceCityPage } from '@/components/seo/service-city-page'
import { getSeoLanding, getSeoLandingStaticParams } from '@/lib/seo/landing-catalog'
import { buildServiceCityMetadata } from '@/lib/seo/metadata'

type RouteParams = {
  city: string
  service: string
}

function resolveSeoEntry(params: RouteParams) {
  return getSeoLanding(params.city, params.service)
}

export async function generateStaticParams(): Promise<RouteParams[]> {
  return getSeoLandingStaticParams()
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>
}): Promise<Metadata> {
  const resolvedParams = await params
  const entry = resolveSeoEntry(resolvedParams)

  if (!entry) {
    return {}
  }

  return buildServiceCityMetadata({
    cityName: entry.city.name,
    serviceName: entry.service.name,
    title: entry.title,
    description: entry.description,
    path: entry.path,
  })
}

export default async function ServiceCityRoute({
  params,
}: {
  params: Promise<RouteParams>
}) {
  const resolvedParams = await params
  const entry = resolveSeoEntry(resolvedParams)

  if (!entry) {
    notFound()
  }

  return <ServiceCityPage landing={entry} />
}
