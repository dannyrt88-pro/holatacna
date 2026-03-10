export type SeoFaqItem = {
  question: string
  answer: string
}

export type SeoServiceDefinition = {
  slug: string
  name: string
  serviceSlug: string
  serviceName: string
  titleBase: string
  descriptionBase: string
  benefits: string[]
  faq: SeoFaqItem[]
  process: string[]
  commercialBlock: string
  primaryHref: string
  primaryLabel: string
  formHeading: string
  messagePlaceholder: string
  gradientClass: string
}

export const seoServices: SeoServiceDefinition[] = [
  {
    slug: 'dermatologia',
    name: 'Dermatologia',
    serviceSlug: 'dermatologia',
    serviceName: 'Dermatologia',
    titleBase: 'Dermatologia en Tacna para pacientes de Chile',
    descriptionBase: 'Evaluaciones dermatologicas, revision de manchas, acne y cuidado especializado de la piel.',
    benefits: [
      'Comparacion comercial clara entre precios de Chile y Tacna.',
      'Orientacion previa por WhatsApp antes de reservar tu evaluacion.',
      'Derivacion hacia proveedores verificados segun tu necesidad comercial.',
    ],
    faq: [
      {
        question: 'Que tipo de casos se pueden consultar antes de viajar?',
        answer: 'Puedes dejar tu caso, sintomas o fotos de referencia para evaluar si conviene una cita dermatologica en Tacna.',
      },
      {
        question: 'HolaTacna es una clinica?',
        answer: 'No. HolaTacna coordina la captacion comercial y conecta al paciente con proveedores verificados.',
      },
      {
        question: 'Puedo consultar precios antes de viajar?',
        answer: 'Si. El formulario permite dejar tu caso y solicitar una referencia comercial antes de programar la visita.',
      },
    ],
    process: [
      'Dejas tu caso o consulta inicial en el formulario.',
      'El equipo comercial valida el interes y ordena la derivacion.',
      'Recibes coordinacion por WhatsApp antes de viajar a Tacna.',
    ],
    commercialBlock: 'Ideal para pacientes que quieren comparar alternativas dermatologicas en Tacna antes de decidir su viaje.',
    primaryHref: '/dermatologia',
    primaryLabel: 'Ver servicio principal',
    formHeading: 'Solicita una evaluacion dermatologica',
    messagePlaceholder: 'Cuentanos tu caso dermatologico o el tratamiento que deseas consultar.',
    gradientClass: 'bg-[linear-gradient(135deg,#0f172a,#0f766e)]',
  },
  {
    slug: 'estetica',
    name: 'Estetica',
    serviceSlug: 'estetica',
    serviceName: 'Estetica',
    titleBase: 'Tratamientos esteticos en Tacna para pacientes de Chile',
    descriptionBase: 'Tratamientos esteticos con coordinacion comercial, cotizacion previa y soporte por WhatsApp.',
    benefits: [
      'Mayor claridad comercial para comparar opciones esteticas.',
      'Coordinacion previa para resolver dudas antes del viaje.',
      'Derivacion a proveedores que atienden pacientes de Chile.',
    ],
    faq: [
      {
        question: 'Puedo pedir una orientacion antes de elegir tratamiento?',
        answer: 'Si. Puedes dejar tus dudas, objetivos o referencias y el equipo comercial ordena la derivacion.',
      },
      {
        question: 'Se puede coordinar por WhatsApp?',
        answer: 'Si. El flujo de captacion esta preparado para continuar la conversacion por WhatsApp.',
      },
      {
        question: 'Atienden pacientes de distintas ciudades de Chile?',
        answer: 'Si. La pagina esta pensada para captar pacientes de Chile interesados en atenderse en Tacna.',
      },
    ],
    process: [
      'Dejas tus dudas o el tratamiento que deseas consultar.',
      'HolaTacna ordena el lead y confirma si la atencion aplica para tu caso.',
      'Se coordina el contacto comercial por WhatsApp con el proveedor.',
    ],
    commercialBlock: 'Pensado para captar leads que comparan precios, tiempos y opciones esteticas entre Chile y Tacna.',
    primaryHref: '/estetica',
    primaryLabel: 'Ver servicio principal',
    formHeading: 'Solicita una orientacion estetica',
    messagePlaceholder: 'Cuentanos que tratamiento estetico buscas o que dudas quieres resolver.',
    gradientClass: 'bg-[linear-gradient(135deg,#4c1d95,#db2777)]',
  },
  {
    slug: 'operacion-ojos',
    name: 'Operacion de Ojos',
    serviceSlug: 'oftalmologia',
    serviceName: 'Oftalmologia',
    titleBase: 'Operacion de ojos en Tacna para pacientes de Chile',
    descriptionBase: 'Evaluaciones visuales y orientacion comercial para pacientes interesados en oftalmologia en Tacna.',
    benefits: [
      'Comparacion rapida de precios entre Chile y Tacna.',
      'Mayor orden comercial para consultas visuales y tratamientos.',
      'Contacto directo para coordinar evaluacion con anticipacion.',
    ],
    faq: [
      {
        question: 'Puedo consultar antes de viajar si mi caso aplica?',
        answer: 'Si. Puedes dejar tu caso visual o el tipo de evaluacion que deseas y el equipo comercial responde antes de coordinar.',
      },
      {
        question: 'La derivacion incluye seguimiento comercial?',
        answer: 'Si. El lead queda en el CRM para continuar la coordinacion por WhatsApp.',
      },
      {
        question: 'Esta pagina reemplaza la landing principal?',
        answer: 'No. Esta pagina es complementaria y convive con las landings existentes para captar trafico SEO por ciudad.',
      },
    ],
    process: [
      'Dejas tu consulta visual o el tipo de evaluacion que buscas.',
      'HolaTacna ordena el lead y confirma el encaje comercial.',
      'Recibes seguimiento por WhatsApp antes de viajar a Tacna.',
    ],
    commercialBlock: 'En SEO se trabaja con el termino operacion de ojos, pero el lead se deriva usando el servicio canonico de oftalmologia.',
    primaryHref: '/oftalmologia',
    primaryLabel: 'Ver servicio principal',
    formHeading: 'Solicita una evaluacion oftalmologica',
    messagePlaceholder: 'Cuentanos tu caso visual o el tratamiento oftalmologico que deseas consultar.',
    gradientClass: 'bg-[linear-gradient(135deg,#0f172a,#1d4ed8)]',
  },
  {
    slug: 'implantes-dentales',
    name: 'Implantes Dentales',
    serviceSlug: 'implantes-dentales',
    serviceName: 'Implantes Dentales',
    titleBase: 'Implantes dentales en Tacna para pacientes de Chile',
    descriptionBase: 'Implantes dentales y evaluacion odontologica con ahorro comercial para pacientes de Chile.',
    benefits: [
      'Ahorro relevante frente a valores habituales en Chile.',
      'Orientacion previa para evaluar presupuesto y tiempos.',
      'Derivacion a proveedores verificados para implantes y rehabilitacion oral.',
    ],
    faq: [
      {
        question: 'Puedo pedir una evaluacion inicial antes de viajar?',
        answer: 'Si. Puedes dejar tus antecedentes y solicitar contacto comercial para ordenar tu caso antes de programar.',
      },
      {
        question: 'HolaTacna hace el tratamiento directamente?',
        answer: 'No. HolaTacna conecta al paciente con proveedores odontologicos verificados.',
      },
      {
        question: 'Se puede comparar precio estimado con Chile?',
        answer: 'Si. La pagina esta armada para captar leads interesados en comparar implantes dentales entre Chile y Tacna.',
      },
    ],
    process: [
      'Dejas tu caso o tus dudas sobre implantes dentales.',
      'El equipo valida el lead y ordena el contacto comercial.',
      'Se coordina el siguiente paso por WhatsApp con el proveedor.',
    ],
    commercialBlock: 'Orientado a pacientes de Chile que comparan implantes dentales en Tacna y necesitan una derivacion comercial ordenada.',
    primaryHref: '/implantes-dentales',
    primaryLabel: 'Ver servicio principal',
    formHeading: 'Solicita una evaluacion dental',
    messagePlaceholder: 'Cuentanos tu caso o tus dudas sobre implantes dentales en Tacna.',
    gradientClass: 'bg-[linear-gradient(135deg,#111827,#0f766e)]',
  },
]

export const seoServiceBySlug = Object.fromEntries(
  seoServices.map((service) => [service.slug, service])
) as Record<string, SeoServiceDefinition>

export function getSeoServiceBySlug(slug: string) {
  return seoServiceBySlug[slug] || null
}
