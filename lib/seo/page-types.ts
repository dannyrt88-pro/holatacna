export type SeoIntentDefinition = {
  slug: 'precio' | 'vs-chile'
  name: string
  titlePattern: string
  descriptionPattern: string
  ctaContext: string
  copyHints: string[]
  pageType: 'seo-price' | 'seo-comparison'
}

export const seoPageTypes: SeoIntentDefinition[] = [
  {
    slug: 'precio',
    name: 'Precio',
    titlePattern: '{service} en Tacna: precios para pacientes de {city}',
    descriptionPattern:
      'Revisa informacion sobre precios de {service} en Tacna para pacientes de {city} y compara opciones antes de viajar desde Chile.',
    ctaContext: 'Solicita orientacion para revisar precios aproximados y resolver dudas antes de viajar.',
    copyHints: [
      'Enfatizar comparacion de precios y presupuesto estimado.',
      'Hablar de orientacion previa antes del viaje.',
      'Mantener lenguaje claro para pacientes de Chile.',
    ],
    pageType: 'seo-price',
  },
  {
    slug: 'vs-chile',
    name: 'Vs Chile',
    titlePattern: '{service} en Tacna vs Chile para pacientes de {city}',
    descriptionPattern:
      'Compara {service} en Tacna vs Chile si viajas desde {city} y revisa diferencias de costos, tiempos y orientacion previa.',
    ctaContext: 'Solicita una comparacion inicial y recibe orientacion antes de decidir tu viaje a Tacna.',
    copyHints: [
      'Enfatizar comparacion entre Tacna y Chile.',
      'Mencionar costos, tiempos y cercania.',
      'Mantener foco en informacion previa para el paciente.',
    ],
    pageType: 'seo-comparison',
  },
]

export const seoPageTypeBySlug = Object.fromEntries(
  seoPageTypes.map((intent) => [intent.slug, intent])
) as Record<SeoIntentDefinition['slug'], SeoIntentDefinition>

export function getSeoIntentBySlug(slug: string) {
  return seoPageTypeBySlug[slug as SeoIntentDefinition['slug']] || null
}

export function applyIntentPattern(
  pattern: string,
  {
    cityName,
    serviceName,
  }: {
    cityName: string
    serviceName: string
  }
) {
  return pattern.replaceAll('{city}', cityName).replaceAll('{service}', serviceName)
}
