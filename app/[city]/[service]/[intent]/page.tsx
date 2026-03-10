import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ProgrammaticLandingPage } from '@/components/seo/programmatic-landing-page'
import { getSeoIntentLanding, getSeoIntentLandingStaticParams } from '@/lib/seo/landing-catalog'
import { buildServiceCityIntentMetadata } from '@/lib/seo/metadata'

type RouteParams = {
  city: string
  service: string
  intent: string
}

function resolveSeoIntentEntry(params: RouteParams) {
  return getSeoIntentLanding(params.city, params.service, params.intent)
}

export async function generateStaticParams(): Promise<RouteParams[]> {
  return getSeoIntentLandingStaticParams()
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>
}): Promise<Metadata> {
  const resolvedParams = await params
  const entry = resolveSeoIntentEntry(resolvedParams)

  if (!entry) {
    return {}
  }

  return buildServiceCityIntentMetadata({
    title: entry.title,
    description: entry.description,
    path: entry.path,
  })
}

export default async function ServiceCityIntentRoute({
  params,
}: {
  params: Promise<RouteParams>
}) {
  const resolvedParams = await params
  const entry = resolveSeoIntentEntry(resolvedParams)

  if (!entry) {
    notFound()
  }

  return <ProgrammaticLandingPage landing={entry} />
}
