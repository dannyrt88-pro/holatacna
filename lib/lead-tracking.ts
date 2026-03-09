type TrackingParamsLike = {
  get(name: string): string | null
}

export type LeadTrackingPayload = {
  utm_source: string | null
  utm_medium: string | null
  utm_campaign: string | null
  utm_content: string | null
  utm_term: string | null
}

export function getTrackingValue(value: string | null | undefined) {
  const trimmed = value?.trim()
  return trimmed ? trimmed : null
}

export function buildTrackingPayload(searchParams: TrackingParamsLike | null | undefined): LeadTrackingPayload {
  return {
    utm_source: getTrackingValue(searchParams?.get('utm_source')),
    utm_medium: getTrackingValue(searchParams?.get('utm_medium')),
    utm_campaign: getTrackingValue(searchParams?.get('utm_campaign')),
    utm_content: getTrackingValue(searchParams?.get('utm_content')),
    utm_term: getTrackingValue(searchParams?.get('utm_term')),
  }
}
