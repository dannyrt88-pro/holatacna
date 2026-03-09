import type { MetadataRoute } from 'next'
import { getSiteUrl } from '@/lib/seo/metadata'

const publicRoutes = [
  '/',
  '/alquiler-departamentos',
  '/compras-por-mayor',
  '/dermatologia',
  '/dermatologia-tacna',
  '/dermatologia-tacna-vs-chile',
  '/estetica',
  '/estetica-tacna',
  '/estetica-tacna-vs-chile',
  '/hoteles',
  '/implantes-dentales',
  '/implantes-dentales-tacna',
  '/implantes-dentales-tacna-vs-chile',
  '/oftalmologia',
  '/operacion-ojos-tacna',
  '/operacion-ojos-tacna-vs-chile',
  '/restaurants',
  '/transporte',
  '/antofagasta/dermatologia',
  '/antofagasta/dermatologia-tacna',
  '/antofagasta/estetica-tacna',
  '/antofagasta/implantes-dentales-tacna',
  '/arica/estetica-tacna',
  '/arica/implantes-dentales',
  '/arica/implantes-dentales-tacna',
  '/arica/oftalmologia',
  '/arica/operacion-ojos-tacna',
  '/iquique/dermatologia-tacna',
  '/iquique/estetica',
  '/iquique/estetica-tacna',
  '/iquique/operacion-ojos-tacna',
] as const

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl()
  const lastModified = new Date()

  return publicRoutes.map((path) => ({
    url: new URL(path, siteUrl).toString(),
    lastModified,
  }))
}
