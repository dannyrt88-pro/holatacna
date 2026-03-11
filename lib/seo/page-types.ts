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
      'Revisa información sobre precios de {service} en Tacna para pacientes de {city} y compara opciones antes de viajar desde Chile.',
    ctaContext: 'Solicita orientación para revisar precios aproximados y resolver dudas antes de viajar.',
    copyHints: [
      'Enfatizar comparación de precios y ahorro potencial.',
      'Hablar de orientación previa antes del viaje.',
      'Mantener lenguaje claro para pacientes de Chile.',
    ],
    pageType: 'seo-price',
  },
  {
    slug: 'vs-chile',
    name: 'Vs Chile',
    titlePattern: '{service} en Tacna vs Chile para pacientes de {city}',
    descriptionPattern:
      'Compara {service} en Tacna vs Chile si viajas desde {city} y revisa diferencias de costos, tiempos y orientación previa.',
    ctaContext: 'Solicita una comparación inicial y recibe orientación antes de decidir tu viaje a Tacna.',
    copyHints: [
      'Enfatizar comparación entre Tacna y Chile.',
      'Mencionar costos, tiempos y cercanía.',
      'Mantener foco en información previa para el paciente.',
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
