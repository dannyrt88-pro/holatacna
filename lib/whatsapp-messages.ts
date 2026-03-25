import { getPackageBySlug } from '@/lib/package-catalog'

type PatientMessageInput = {
  name?: string | null
  referenceCode?: string | null
  serviceName?: string | null
  suggestedPackageSlug?: string | null
}

type ProviderMessageInput = {
  name?: string | null
  touristPhone?: string | null
  serviceName?: string | null
  providerServiceName?: string | null
  referenceCode?: string | null
  cityInterest?: string | null
  suggestedPackageSlug?: string | null
}

function normalizeServiceName(serviceName: string | null | undefined): string {
  const s = (serviceName || '').toLowerCase()
  if (s.includes('implante')) return 'Implantes Dentales'
  if (s.includes('oftalmo') || s.includes('ojos') || s.includes('laser')) return 'Oftalmologia'
  if (s.includes('estet') || s.includes('cosmet')) return 'Estetica'
  if (s.includes('dermato')) return 'Dermatologia'
  if (s.includes('ortodo')) return 'Ortodoncia'
  if (s.includes('carill')) return 'Carillas Dentales'
  return serviceName || 'servicios dentales'
}

function getServiceIntro(serviceName: string | null | undefined) {
  const normalized = normalizeServiceName(serviceName)
  switch (normalized) {
    case 'Implantes Dentales':
      return 'Vi que te interesa colocarte implantes dentales en Tacna. Te puedo ayudar a coordinar todo desde aqui.'
    case 'Oftalmologia':
      return 'Vi que te interesa una consulta oftalmologica en Tacna. Te puedo ayudar a coordinar tu visita.'
    case 'Estetica':
      return 'Vi que te interesan tratamientos esteticos en Tacna. Te puedo ayudar a coordinar todo.'
    case 'Dermatologia':
      return 'Vi que te interesa una consulta dermatologica en Tacna. Te puedo ayudar a coordinar tu visita.'
    case 'Ortodoncia':
      return 'Vi que te interesa ortodoncia en Tacna. Te puedo ayudar a coordinar todo desde aqui.'
    case 'Carillas Dentales':
      return 'Vi que te interesan carillas dentales en Tacna. Te puedo ayudar a coordinar todo.'
    default:
      return `Vi que te interesa ${normalized} en Tacna. Te puedo ayudar a coordinar tu visita.`
  }
}

export function buildInitialPatientWhatsAppMessage(input: PatientMessageInput) {
  const suggestedPackage = getPackageBySlug(input.suggestedPackageSlug)
  const packageLine = suggestedPackage
    ? `Tambien tenemos un paquete sugerido: ${suggestedPackage.name}.`
    : null

  const firstName = (input.name || '').split(' ')[0] || ''

  return [
    firstName ? `Hola ${firstName}! Soy Danny de HolaTacna 😊` : 'Hola! Soy Danny de HolaTacna 😊',
    '',
    getServiceIntro(input.serviceName),
    '',
    'Para darte un presupuesto exacto necesito saber:',
    '1. Cuantos implantes necesitas aproximadamente?',
    '2. Tienes alguna fecha tentativa para venir a Tacna?',
    '',
    input.referenceCode ? `Tu codigo de referencia es ${input.referenceCode}.` : null,
    packageLine,
  ]
    .filter(Boolean)
    .join('\n')
}

export function buildProviderRoutingWhatsAppMessage(input: ProviderMessageInput) {
  const suggestedPackage = getPackageBySlug(input.suggestedPackageSlug)

  return [
    'Nuevo cliente desde HolaTacna',
    '',
    `Nombre: ${input.name || '-'}`,
    `Telefono: ${input.touristPhone || '-'}`,
    `Servicio: ${input.serviceName || '-'}`,
    input.providerServiceName ? `Servicio especifico solicitado al proveedor: ${input.providerServiceName}` : null,
    `Ciudad: ${input.cityInterest || '-'}`,
    `Codigo: ${input.referenceCode || '-'}`,
    suggestedPackage ? `Paquete sugerido: ${suggestedPackage.name}` : null,
    '',
    'Por favor confirmar atencion y hacer seguimiento comercial.',
  ]
    .filter(Boolean)
    .join('\n')
}
