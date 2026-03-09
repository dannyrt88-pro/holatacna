import { getPackageBySlug } from '@/lib/package-catalog'

type PatientMessageInput = {
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

function getServiceIntro(serviceName: string | null | undefined) {
  switch (serviceName) {
    case 'Implantes Dentales':
      return 'Recibimos tu solicitud para implantes dentales en Tacna.'
    case 'Oftalmologia':
      return 'Recibimos tu solicitud para atencion oftalmologica en Tacna.'
    case 'Estetica':
      return 'Recibimos tu solicitud para tratamientos esteticos en Tacna.'
    case 'Dermatologia':
      return 'Recibimos tu solicitud para dermatologia en Tacna.'
    default:
      return `Recibimos tu solicitud para ${serviceName || 'un servicio en HolaTacna'}.`
  }
}

export function buildInitialPatientWhatsAppMessage(input: PatientMessageInput) {
  const suggestedPackage = getPackageBySlug(input.suggestedPackageSlug)
  const packageLine = suggestedPackage
    ? `Tambien tenemos un paquete sugerido: ${suggestedPackage.name}.`
    : null

  return [
    'Hola, gracias por contactar HolaTacna.',
    '',
    getServiceIntro(input.serviceName),
    input.referenceCode ? `Tu codigo de referencia es ${input.referenceCode}.` : null,
    'Un asesor comercial revisara tu caso y te respondera pronto por este medio.',
    'Si deseas, puedes enviarnos mas detalles para acelerar la evaluacion.',
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
