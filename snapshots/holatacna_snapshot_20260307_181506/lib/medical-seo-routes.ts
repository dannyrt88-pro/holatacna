export type MedicalSeoRoute = {
  city: 'Arica' | 'Iquique' | 'Antofagasta'
  serviceSlug: 'implantes-dentales' | 'oftalmologia' | 'estetica' | 'dermatologia'
  title: string
  description: string
  href: string
  badge: string
  pageTitle: string
  bullets: string[]
  primaryHref: string
  primaryLabel: string
  gradientClass: string
  heading: string
  includeMessage?: boolean
  messageLabel?: string
}

export const medicalSeoRoutes: MedicalSeoRoute[] = [
  {
    city: 'Arica',
    serviceSlug: 'implantes-dentales',
    title: 'Arica + Implantes Dentales',
    description: 'Pacientes de Arica que viajan a Tacna para implantes dentales con ahorro y coordinacion previa.',
    href: '/arica/implantes-dentales',
    badge: 'SEO Arica + Implantes Dentales',
    pageTitle: 'Implantes dentales en Tacna para pacientes de Arica',
    bullets: [
      'Ahorro economico frente a tratamientos similares en Chile',
      'Coordinacion previa por WhatsApp antes del viaje',
      'Clinicas verificadas y apoyo comercial desde HolaTacna',
      'Orientacion para resolver dudas antes de agendar',
    ],
    primaryHref: '/implantes-dentales',
    primaryLabel: 'Ver landing principal',
    gradientClass: 'bg-[linear-gradient(135deg,#0f172a,#1d4ed8)]',
    heading: 'Solicita tu evaluacion desde Arica',
  },
  {
    city: 'Arica',
    serviceSlug: 'oftalmologia',
    title: 'Arica + Oftalmologia',
    description: 'Evaluacion oftalmologica en Tacna para pacientes de Arica con apoyo de HolaTacna.',
    href: '/arica/oftalmologia',
    badge: 'SEO Arica + Oftalmologia',
    pageTitle: 'Oftalmologia en Tacna para pacientes de Arica',
    bullets: [
      'Ahorro economico en evaluaciones y procedimientos oftalmologicos',
      'Coordinacion por WhatsApp antes de viajar desde Arica',
      'Clinicas verificadas y mejor orientacion comercial',
      'Informacion clara para evaluar el viaje medico a Tacna',
    ],
    primaryHref: '/oftalmologia',
    primaryLabel: 'Ver landing principal',
    gradientClass: 'bg-[linear-gradient(135deg,#0f172a,#1d4ed8)]',
    heading: 'Solicita tu evaluacion desde Arica',
  },
  {
    city: 'Iquique',
    serviceSlug: 'estetica',
    title: 'Iquique + Estetica',
    description: 'Tratamientos esteticos en Tacna para pacientes de Iquique con clinicas verificadas.',
    href: '/iquique/estetica',
    badge: 'SEO Iquique + Estetica',
    pageTitle: 'Estetica en Tacna para pacientes de Iquique',
    bullets: [
      'Ahorro economico frente a opciones equivalentes en Chile',
      'Coordinacion previa por WhatsApp antes de viajar desde Iquique',
      'Clinicas verificadas y acompanamiento comercial',
      'Orientacion para procedimientos y tiempos estimados',
    ],
    primaryHref: '/estetica',
    primaryLabel: 'Ver landing principal',
    gradientClass: 'bg-[linear-gradient(135deg,#4c1d95,#ec4899)]',
    heading: 'Solicita tu evaluacion desde Iquique',
    messageLabel: 'Cuentanos que tratamiento buscas',
  },
  {
    city: 'Antofagasta',
    serviceSlug: 'dermatologia',
    title: 'Antofagasta + Dermatologia',
    description: 'Dermatologia en Tacna para pacientes de Antofagasta con coordinacion premium.',
    href: '/antofagasta/dermatologia',
    badge: 'SEO Antofagasta + Dermatologia',
    pageTitle: 'Dermatologia en Tacna para pacientes de Antofagasta',
    bullets: [
      'Ahorro economico frente a tratamientos dermatologicos en Chile',
      'Coordinacion previa por WhatsApp antes del viaje a Tacna',
      'Clinicas verificadas y apoyo comercial desde HolaTacna',
      'Orientacion para revisar opciones de evaluacion y tratamiento',
    ],
    primaryHref: '/dermatologia',
    primaryLabel: 'Ver landing principal',
    gradientClass: 'bg-[linear-gradient(135deg,#065f46,#0ea5e9)]',
    heading: 'Solicita tu evaluacion desde Antofagasta',
    includeMessage: false,
  },
]

export function getMedicalSeoRoute(city: string, serviceSlug: string) {
  return (
    medicalSeoRoutes.find(
      (route) => route.city.toLowerCase() === city.toLowerCase() && route.serviceSlug === serviceSlug
    ) || null
  )
}
