import type { MetadataRoute } from 'next'
import { getSiteUrl } from '@/lib/seo/metadata'

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl()

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin',
          '/dashboard',
          '/providers',
          '/access',
          '/api',
          '/auth',
          '/login',
          '/logout',
          '/forgot-password',
          '/reset-password',
        ],
      },
    ],
    sitemap: siteUrl ? `${siteUrl.toString().replace(/\/$/, '')}/sitemap.xml` : undefined,
  }
}
