export type ChileCityDefinition = {
  slug: string
  name: string
  region: string
}

export const chileCities: ChileCityDefinition[] = [
  {
    slug: 'arica',
    name: 'Arica',
    region: 'Arica y Parinacota',
  },
  {
    slug: 'iquique',
    name: 'Iquique',
    region: 'Tarapaca',
  },
  {
    slug: 'antofagasta',
    name: 'Antofagasta',
    region: 'Antofagasta',
  },
]

export const chileCityBySlug = Object.fromEntries(
  chileCities.map((city) => [city.slug, city])
) as Record<string, ChileCityDefinition>

export function getChileCityBySlug(slug: string) {
  return chileCityBySlug[slug] || null
}
