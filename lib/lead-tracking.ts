export function getTrackingValue(value: string | null) {
  const trimmed = value?.trim()
  return trimmed ? trimmed : null
}
