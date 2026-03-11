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
  cityFormOverrides?: Record<
    string,
    {
      formHeading?: string
      includePreferredDate?: boolean
      preferredDateLabel?: string
      includeAdditionalServices?: boolean
      additionalServicesLabel?: string
      additionalServicesHelperText?: string
      additionalServicesOptions?: string[]
      messageLabel?: string
      messagePlaceholder?: string
    }
  >
  cityContextOverrides?: Record<string, string>
  cityBenefitsOverrides?: Record<string, string[]>
}

export const seoServices: SeoServiceDefinition[] = [
  {
    slug: 'cirugia-plastica',
    name: 'Cirugía plástica',
    serviceSlug: 'cirugia-plastica',
    serviceName: 'Cirugía plástica',
    titleBase: 'Cirugía plástica en Tacna para pacientes de Chile',
    descriptionBase:
      'Información sobre cirugía plástica en Tacna para pacientes que viajan desde Chile.',
    benefits: [
      'Orientación inicial para entender opciones antes de viajar a Tacna.',
      'Información clara para comparar alternativas desde Chile.',
      'Contacto con clínicas y especialistas previamente revisados.',
    ],
    faq: [
      {
        question: '¿Puedo resolver dudas antes de viajar?',
        answer:
          'Sí. Puedes dejar tu consulta para recibir orientación inicial antes de coordinar una evaluación en Tacna.',
      },
      {
        question: '¿HolaTacna realiza la cirugía?',
        answer:
          'No. HolaTacna ayuda a ordenar el primer contacto con clínicas o especialistas que atienden pacientes de Chile.',
      },
      {
        question: '¿Puedo consultar tiempos y pasos del proceso?',
        answer:
          'Sí. La idea es que tengas una visión más clara del tratamiento antes de programar tu viaje.',
      },
    ],
    process: [
      'Dejas tu consulta y el tipo de tratamiento que deseas evaluar.',
      'Revisamos tu caso y te orientamos antes del viaje.',
      'Se coordina el siguiente paso por WhatsApp con la clínica o especialista.',
    ],
    commercialBlock:
      'Ideal para pacientes de Chile que quieren evaluar cirugía plástica en Tacna con mayor claridad antes de viajar.',
    primaryHref: '/cirugia-plastica-tacna',
    primaryLabel: 'Ver servicio principal',
    formHeading: 'Solicita una evaluación de cirugía plástica',
    messagePlaceholder:
      'Cuéntanos qué tratamiento de cirugía plástica deseas evaluar o qué dudas quieres resolver antes de viajar.',
    gradientClass: 'bg-[linear-gradient(135deg,#3f1d2e,#c2410c)]',
    cityFormOverrides: {
      default: {
        includeAdditionalServices: true,
        additionalServicesLabel: 'Servicios útiles para tu visita en Tacna',
        additionalServicesHelperText:
          'Si lo deseas, también podemos orientarte sobre opciones útiles durante tu visita.',
        additionalServicesOptions: [
          'Hoteles cercanos a la clínica',
          'Restaurantes recomendados',
          'Transporte desde la frontera',
        ],
      },
    },
  },
  {
    slug: 'dermatologia',
    name: 'Dermatologia',
    serviceSlug: 'dermatologia',
    serviceName: 'Dermatologia',
    titleBase: 'Dermatologia en Tacna para pacientes de Chile',
    descriptionBase: 'Evaluaciones dermatologicas, revision de manchas, acne y cuidado especializado de la piel.',
    benefits: [
      'Información clara para comparar opciones entre Chile y Tacna.',
      'Orientación previa por WhatsApp antes de reservar tu evaluación.',
      'Contacto con clínicas y especialistas previamente revisados.',
    ],
    faq: [
      {
        question: 'Que tipo de casos se pueden consultar antes de viajar?',
        answer: 'Puedes dejar tu caso, sintomas o fotos de referencia para evaluar si conviene una cita dermatologica en Tacna.',
      },
      {
        question: 'HolaTacna es una clinica?',
        answer: 'No. HolaTacna ayuda a coordinar el primer contacto con una clinica o especialista.',
      },
      {
        question: 'Puedo consultar precios antes de viajar?',
        answer: 'Si. El formulario permite dejar tu caso y solicitar una orientacion inicial antes de programar la visita.',
      },
    ],
    process: [
      'Dejas tu caso o consulta inicial en el formulario.',
      'Revisamos tu consulta y te orientamos antes del viaje.',
      'Recibes coordinacion por WhatsApp antes de viajar a Tacna.',
    ],
    commercialBlock: 'Ideal para pacientes que quieren comparar alternativas dermatologicas en Tacna antes de decidir su viaje.',
    primaryHref: '/dermatologia-tacna',
    primaryLabel: 'Ver servicio principal',
    formHeading: 'Solicita una evaluacion dermatologica',
    messagePlaceholder: 'Cuentanos tu caso dermatologico o el tratamiento que deseas consultar.',
    gradientClass: 'bg-[linear-gradient(135deg,#0f172a,#0f766e)]',
    cityFormOverrides: {
      default: {
        includeAdditionalServices: true,
        additionalServicesLabel: 'Servicios útiles para tu visita en Tacna',
        additionalServicesHelperText:
          'Si lo deseas, también podemos orientarte sobre opciones útiles durante tu visita.',
        additionalServicesOptions: [
          'Hoteles cercanos a la clínica',
          'Restaurantes recomendados',
          'Transporte desde la frontera',
        ],
      },
      antofagasta: {
        formHeading: 'Solicita tu evaluacion desde Antofagasta',
        includePreferredDate: true,
        preferredDateLabel: 'Fecha estimada de viaje',
        includeAdditionalServices: true,
        additionalServicesLabel: 'Servicios útiles para tu visita en Tacna',
        additionalServicesHelperText:
          'Si lo deseas, también podemos orientarte sobre opciones útiles durante tu visita.',
        additionalServicesOptions: [
          'Hoteles cercanos a la clínica',
          'Restaurantes recomendados',
          'Transporte desde la frontera',
        ],
        messageLabel: 'Cuentanos tu caso',
        messagePlaceholder:
          'Cuentanos tu caso dermatologico, tus dudas y cualquier antecedente importante antes de viajar.',
      },
    },
    cityContextOverrides: {
      antofagasta:
        'Pacientes de Antofagasta viajan a Tacna para evaluar dermatologia con apoyo previo, clinicas verificadas y una alternativa de ahorro frente a Chile.',
    },
  },
  {
    slug: 'estetica',
    name: 'Estetica',
    serviceSlug: 'estetica',
    serviceName: 'Estetica',
    titleBase: 'Tratamientos esteticos en Tacna para pacientes de Chile',
    descriptionBase: 'Tratamientos esteticos con coordinacion previa, cotizacion inicial y soporte por WhatsApp.',
    benefits: [
      'Más claridad para comparar opciones estéticas.',
      'Coordinación previa para resolver dudas antes del viaje.',
      'Contacto con clínicas o especialistas que atienden pacientes de Chile.',
    ],
    faq: [
      {
        question: 'Puedo pedir una orientacion antes de elegir tratamiento?',
        answer: 'Si. Puedes dejar tus dudas, objetivos o referencias y recibir una orientacion inicial antes de viajar.',
      },
      {
        question: 'Se puede coordinar por WhatsApp?',
        answer: 'Si. El proceso de atencion inicial esta preparado para continuar la conversacion por WhatsApp.',
      },
      {
        question: 'Atienden pacientes de distintas ciudades de Chile?',
        answer: 'Si. La pagina entrega informacion a pacientes de Chile interesados en atenderse en Tacna.',
      },
    ],
    process: [
      'Dejas tus dudas o el tratamiento que deseas consultar.',
      'HolaTacna revisa tu consulta y confirma si la atencion aplica para tu caso.',
      'Se coordina el contacto inicial por WhatsApp con la clinica o especialista.',
    ],
    commercialBlock: 'Ideal para pacientes que quieren comparar precios, tiempos y alternativas esteticas antes de viajar.',
    primaryHref: '/estetica-tacna',
    primaryLabel: 'Ver servicio principal',
    formHeading: 'Solicita una orientacion estetica',
    messagePlaceholder: 'Cuentanos que tratamiento estetico buscas o que dudas quieres resolver.',
    gradientClass: 'bg-[linear-gradient(135deg,#4c1d95,#db2777)]',
    cityFormOverrides: {
      default: {
        includeAdditionalServices: true,
        additionalServicesLabel: 'Servicios útiles para tu visita en Tacna',
        additionalServicesHelperText:
          'Si lo deseas, también podemos orientarte sobre opciones útiles durante tu visita.',
        additionalServicesOptions: [
          'Hoteles cercanos a la clínica',
          'Restaurantes recomendados',
          'Transporte desde la frontera',
        ],
      },
      iquique: {
        formHeading: 'Solicita tu orientacion desde Iquique',
        includePreferredDate: true,
        preferredDateLabel: 'Fecha estimada de viaje',
        includeAdditionalServices: true,
        additionalServicesLabel: 'Servicios útiles para tu visita en Tacna',
        additionalServicesHelperText:
          'Si lo deseas, también podemos orientarte sobre opciones útiles durante tu visita.',
        additionalServicesOptions: [
          'Hoteles cercanos a la clínica',
          'Restaurantes recomendados',
          'Transporte desde la frontera',
        ],
        messageLabel: 'Cuentanos que buscas',
        messagePlaceholder:
          'Cuentanos que tratamiento estetico buscas, tus dudas y cualquier antecedente importante antes de viajar.',
      },
    },
    cityContextOverrides: {
      iquique:
        'Muchas personas de Iquique buscan tratamientos esteticos en Tacna para ahorrar, coordinar por WhatsApp antes del viaje y atenderse con clinicas verificadas.',
    },
  },
  {
    slug: 'operacion-ojos',
    name: 'Operacion de Ojos',
    serviceSlug: 'oftalmologia',
    serviceName: 'Oftalmologia',
    titleBase: 'Operacion de ojos en Tacna para pacientes de Chile',
    descriptionBase: 'Evaluaciones visuales y orientacion inicial para pacientes interesados en oftalmologia en Tacna.',
    benefits: [
      'Comparación clara de precios entre Chile y Tacna.',
      'Orientación inicial para resolver dudas sobre consultas visuales y tratamientos.',
      'Contacto directo para coordinar una evaluación con anticipación.',
    ],
    faq: [
      {
        question: 'Puedo consultar antes de viajar si mi caso aplica?',
        answer: 'Si. Puedes dejar tu caso visual o el tipo de evaluacion que deseas y el equipo comercial responde antes de coordinar.',
      },
      {
        question: 'Puedo recibir seguimiento despues de enviar mi consulta?',
        answer: 'Si. Tu consulta queda registrada para continuar la coordinacion por WhatsApp.',
      },
      {
        question: 'Esta pagina reemplaza la landing principal?',
        answer: 'No. Esta pagina es complementaria y convive con las landings existentes para informar a pacientes de distintas ciudades.',
      },
    ],
    process: [
      'Dejas tu consulta visual o el tipo de evaluacion que buscas.',
      'HolaTacna revisa tu consulta y confirma si la atencion es adecuada para tu caso.',
      'Recibes seguimiento por WhatsApp antes de viajar a Tacna.',
    ],
    commercialBlock: 'Muchos pacientes de Chile viajan a Tacna para cirugia ocular o evaluacion visual especializada. Puedes solicitar una evaluacion inicial y recibir orientacion antes de viajar.',
    primaryHref: '/operacion-ojos-tacna',
    primaryLabel: 'Ver servicio principal',
    formHeading: 'Solicita una evaluacion oftalmologica',
    messagePlaceholder: 'Cuentanos tu caso visual o el tratamiento oftalmologico que deseas consultar.',
    gradientClass: 'bg-[linear-gradient(135deg,#0f172a,#1d4ed8)]',
    cityFormOverrides: {
      default: {
        includeAdditionalServices: true,
        additionalServicesLabel: 'Servicios útiles para tu visita en Tacna',
        additionalServicesHelperText:
          'Si lo deseas, también podemos orientarte sobre opciones útiles durante tu visita.',
        additionalServicesOptions: [
          'Hoteles cercanos a la clínica',
          'Restaurantes recomendados',
          'Transporte desde la frontera',
        ],
      },
    },
  },
  {
    slug: 'implantes-dentales',
    name: 'Implantes Dentales',
    serviceSlug: 'implantes-dentales',
    serviceName: 'Implantes Dentales',
    titleBase: 'Implantes dentales en Tacna para pacientes de Chile',
    descriptionBase: 'Implantes dentales y evaluacion odontologica con ahorro frente a alternativas en Chile.',
    benefits: [
      'Muchos pacientes comparan Tacna porque buscan una alternativa más accesible que en Chile.',
      'Orientación previa para entender tiempos, pasos y costos referenciales.',
      'Contacto con clínicas odontológicas revisadas previamente.',
    ],
    faq: [
      {
        question: 'Puedo pedir una evaluacion inicial antes de viajar?',
        answer: 'Si. Puedes dejar tus antecedentes y solicitar contacto inicial para ordenar tu caso antes de programar.',
      },
      {
        question: 'HolaTacna hace el tratamiento directamente?',
        answer: 'No. HolaTacna conecta al paciente con proveedores odontologicos verificados.',
      },
      {
        question: 'Se puede comparar precio estimado con Chile?',
        answer: 'Si. La pagina esta pensada para pacientes interesados en comparar implantes dentales entre Chile y Tacna.',
      },
    ],
    process: [
      'Dejas tu caso o tus dudas sobre implantes dentales.',
      'El equipo revisa tu consulta y ordena el contacto inicial.',
      'Se coordina el siguiente paso por WhatsApp con el proveedor.',
    ],
    commercialBlock: 'Ideal para pacientes de Chile que comparan implantes dentales en Tacna y necesitan informacion clara antes de viajar.',
    primaryHref: '/implantes-dentales-tacna',
    primaryLabel: 'Ver servicio principal',
    formHeading: 'Solicita una evaluacion dental',
    messagePlaceholder: 'Cuentanos tu caso o tus dudas sobre implantes dentales en Tacna.',
    gradientClass: 'bg-[linear-gradient(135deg,#111827,#0f766e)]',
    cityFormOverrides: {
      default: {
        includeAdditionalServices: true,
        additionalServicesLabel: 'Servicios útiles para tu visita en Tacna',
        additionalServicesHelperText:
          'Si lo deseas, también podemos orientarte sobre opciones útiles durante tu visita.',
        additionalServicesOptions: [
          'Hoteles cercanos a la clínica',
          'Restaurantes recomendados',
          'Transporte desde la frontera',
        ],
      },
      arica: {
        formHeading: 'Solicita tu evaluacion desde Arica',
        includePreferredDate: true,
        preferredDateLabel: 'Fecha estimada de viaje',
        includeAdditionalServices: true,
        additionalServicesLabel: 'Servicios útiles para tu visita en Tacna',
        additionalServicesHelperText:
          'Si lo deseas, también podemos orientarte sobre opciones útiles durante tu visita.',
        additionalServicesOptions: [
          'Hoteles cercanos a la clínica',
          'Restaurantes recomendados',
          'Transporte desde la frontera',
        ],
        messageLabel: 'Cuentanos tu caso',
        messagePlaceholder:
          'Cuentanos tu caso, tus dudas sobre implantes dentales y cualquier antecedente importante antes de viajar.',
      },
    },
    cityContextOverrides: {
      arica:
        'Muchos pacientes de Arica viajan a Tacna para evaluar implantes dentales con clinicas verificadas, menor costo frente a Chile y coordinacion previa por WhatsApp.',
    },
  },
]

export const seoServiceBySlug = Object.fromEntries(
  seoServices.map((service) => [service.slug, service])
) as Record<string, SeoServiceDefinition>

export function getSeoServiceBySlug(slug: string) {
  return seoServiceBySlug[slug] || null
}
