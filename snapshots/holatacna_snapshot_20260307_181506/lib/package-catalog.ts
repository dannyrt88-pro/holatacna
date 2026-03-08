import { services } from '@/lib/service-catalog'

export type MedicalPackage = {
  slug: string
  name: string
  primaryServiceSlug: string
  components: string[]
  priority: 'high' | 'normal'
  estimatedValuePen: number
  shortCopy: string
}

export const packageCatalog: MedicalPackage[] = [
  {
    slug: 'implantes-smile-stay-transfer',
    name: 'Implantes + Departamento + Traslado',
    primaryServiceSlug: 'implantes-dentales',
    components: ['Implantes Dentales', 'Alquiler de Departamentos', 'Transporte'],
    priority: 'high',
    estimatedValuePen: 4200,
    shortCopy: 'Tratamiento dental con alojamiento y traslado coordinado para pacientes de Chile.',
  },
  {
    slug: 'oftalmologia-transfer',
    name: 'Oftalmologia + Traslado',
    primaryServiceSlug: 'oftalmologia',
    components: ['Oftalmologia', 'Transporte'],
    priority: 'high',
    estimatedValuePen: 1350,
    shortCopy: 'Evaluacion oftalmologica con movilidad coordinada desde la llegada a Tacna.',
  },
  {
    slug: 'estetica-stay',
    name: 'Estetica + Departamento',
    primaryServiceSlug: 'estetica',
    components: ['Estetica', 'Alquiler de Departamentos'],
    priority: 'high',
    estimatedValuePen: 2200,
    shortCopy: 'Procedimiento estetico con alojamiento temporal y soporte comercial.',
  },
  {
    slug: 'dermatologia-stay-transfer',
    name: 'Dermatologia + Departamento + Traslado',
    primaryServiceSlug: 'dermatologia',
    components: ['Dermatologia', 'Alquiler de Departamentos', 'Transporte'],
    priority: 'normal',
    estimatedValuePen: 1500,
    shortCopy: 'Consulta dermatologica con paquete de movilidad y estadia sugerida.',
  },
]

export function getPackagesForService(serviceSlug: string) {
  return packageCatalog.filter((item) => item.primaryServiceSlug === serviceSlug)
}

export function getPackageBySlug(packageSlug: string | null | undefined) {
  return packageCatalog.find((item) => item.slug === packageSlug) || null
}

export function getSuggestedPackageSlugForService(serviceSlug: string | null | undefined) {
  if (!serviceSlug) return null
  return getPackagesForService(serviceSlug)[0]?.slug || null
}

export function getAddOnOptionsForService(serviceSlug: string) {
  return services
    .filter((service) => service.slug !== serviceSlug)
    .map((service) => service.name)
    .sort((a, b) => a.localeCompare(b))
}

export function getSuggestedPackageSlugForSelection(
  serviceSlug: string | null | undefined,
  additionalServices: string[] | null | undefined
) {
  if (!serviceSlug || !additionalServices?.length) return null

  const normalizedSelected = additionalServices.map((item) => item.trim().toLowerCase())

  const match = getPackagesForService(serviceSlug).find((item) =>
    normalizedSelected.every((selected) =>
      item.components.slice(1).some((component) => component.trim().toLowerCase() === selected)
    )
  )

  return match?.slug || null
}
