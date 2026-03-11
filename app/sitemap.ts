import type { MetadataRoute } from 'next'
import { getSiteUrl } from '@/lib/seo/metadata'

const publicRoutes = [
  '/',
  '/alquiler-departamentos',
  '/compras-por-mayor',
  '/dermatologia-tacna',
  '/dermatologia-tacna-vs-chile',
  '/estetica-tacna',
  '/estetica-tacna-vs-chile',
  '/hoteles',
  '/implantes-dentales-tacna',
  '/implantes-dentales-tacna-vs-chile',
  '/operacion-ojos-tacna',
  '/operacion-ojos-tacna-vs-chile',
  '/restaurants',
  '/transporte',
  '/antofagasta/dermatologia',
  '/arica/dermatologia',
  '/antofagasta/estetica',
  '/antofagasta/implantes-dentales',
  '/antofagasta/operacion-ojos',
  '/arica/estetica',
  '/arica/implantes-dentales',
  '/arica/operacion-ojos',
  '/iquique/dermatologia',
  '/iquique/estetica',
  '/iquique/implantes-dentales',
  '/iquique/operacion-ojos',
] as const

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl()
  const lastModified = new Date()

  return publicRoutes.map((path) => ({
    url: new URL(path, siteUrl).toString(),
    lastModified,
  }))
}
