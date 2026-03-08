import { services } from '@/lib/service-catalog'

export type LeadPriorityLevel = 'Alta' | 'Media' | 'Baja'

type LeadScoringInput = {
  tourist_phone?: string | null
  service_name?: string | null
  city_interest?: string | null
  message?: string | null
  direct_mode?: boolean | null
}

function normalizeValue(value: string | null | undefined) {
  return (value || '')
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

export function isChileanPhone(phone: string | null | undefined) {
  if (!phone) return false
  const normalized = phone.replace(/\s+/g, '')
  return normalized.startsWith('+56') || normalized.startsWith('56')
}

function getServiceWeight(serviceName: string | null | undefined) {
  const normalized = normalizeValue(serviceName)

  if (normalized === 'implantes dentales') return 45
  if (normalized === 'oftalmologia') return 35
  if (normalized === 'estetica') return 35
  if (normalized === 'dermatologia') return 35

  const match = services.find((service) => normalizeValue(service.name) === normalized)
  if (!match) return 8

  if (match.priority === 'high') return 28
  if (match.category === 'turismo') return 14
  if (match.category === 'logistica') return 10
  if (match.category === 'comercio') return 12
  return 8
}

export function getLeadPriorityLabel(score: number): LeadPriorityLevel {
  if (score >= 70) return 'Alta'
  if (score >= 40) return 'Media'
  return 'Baja'
}

export function calculateLeadScore(input: LeadScoringInput) {
  let score = 0

  if (isChileanPhone(input.tourist_phone)) {
    score += 30
  }

  score += getServiceWeight(input.service_name)

  if (input.city_interest) {
    score += 10
  }

  const messageLength = input.message?.trim().length || 0
  if (messageLength >= 120) {
    score += 12
  } else if (messageLength >= 40) {
    score += 8
  } else if (messageLength > 0) {
    score += 4
  }

  if (input.direct_mode) {
    score += 5
  }

  const clampedScore = Math.min(score, 100)

  return {
    score: clampedScore,
    priority: getLeadPriorityLabel(clampedScore),
  }
}
