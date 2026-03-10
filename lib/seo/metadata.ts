import type { Metadata } from 'next'

const DEFAULT_SITE_URL = 'https://www.holatacna.com'
const SITE_NAME = 'HolaTacna'
const DEFAULT_LOCALE = 'es_PE'

function normalizePath(path: string | undefined) {
  if (!path || path === '/') return '/'
  return path.startsWith('/') ? path : `/${path}`
}

export function getSiteUrl() {
  const configuredUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.trim() || process.env.SITE_URL?.trim() || DEFAULT_SITE_URL

  try {
    return new URL(configuredUrl)
  } catch {
    return new URL(DEFAULT_SITE_URL)
  }
}

export function buildSeoMetadata({
  title,
  description,
  path,
  type = 'website',
  noIndex = false,
}: {
  title: string
  description: string
  path?: string
  type?: 'website' | 'article'
  noIndex?: boolean
}): Metadata {
  const siteUrl = getSiteUrl()
  const normalizedPath = normalizePath(path)
  const canonicalUrl = new URL(normalizedPath, siteUrl).toString()

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      locale: DEFAULT_LOCALE,
      type,
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
        },
  }
}

export function buildServiceCityMetadata({
  cityName,
  serviceName,
  title,
  description,
  path,
}: {
  cityName: string
  serviceName: string
  title?: string
  description: string
  path: string
}): Metadata {
  return buildSeoMetadata({
    title: title || `${serviceName} en Tacna para pacientes de ${cityName} | HolaTacna`,
    description,
    path,
  })
}
