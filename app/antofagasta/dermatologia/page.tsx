import { notFound } from 'next/navigation'
import { ServiceCityPage } from '@/components/seo/service-city-page'
import { getSeoLanding } from '@/lib/seo/landing-catalog'
import { buildServiceCityMetadata } from '@/lib/seo/metadata'

const entry = getSeoLanding('antofagasta', 'dermatologia')

export const metadata = entry
  ? buildServiceCityMetadata({
      cityName: entry.city.name,
      serviceName: entry.service.name,
      title: entry.title,
      description: entry.description,
      path: entry.path,
    })
  : {}

export default function AntofagastaDermatologiaPage() {
  if (!entry) {
    notFound()
  }

  return <ServiceCityPage landing={entry} />
}
