export type ProviderRegistrationFormState = {
  name: string
  represented_entity: string
  service_name: string
  service_slug: string
  offered_services: ProviderOfferedService[]
  whatsapp: string
  email: string
  website_url: string
  photo_url: string
  commission_rate: string
  auto_assign: boolean
  active: boolean
  priority: string
  score: string
  city_scope: string
  notes: string
  accepts_terms: boolean
}

export type ProviderOfferedService = {
  enabled: boolean
  name: string
  description: string
}

export function getEmptyProviderOfferedService(): ProviderOfferedService {
  return {
    enabled: false,
    name: '',
    description: '',
  }
}

function getEnabledOfferedServices(services: ProviderOfferedService[]) {
  return services
    .map((service) => ({
      enabled: Boolean(service.enabled),
      name: service.name.trim(),
      description: service.description.trim(),
    }))
    .filter((service) => service.enabled && service.name)
}

export function buildProviderNotesWithServices(
  baseNotes: string,
  offeredServices: ProviderOfferedService[]
) {
  const noteParts = [baseNotes.trim()]
  const enabledServices = getEnabledOfferedServices(offeredServices)

  if (enabledServices.length) {
    noteParts.push(
      [
        'Servicios habilitados del proveedor:',
        ...enabledServices.map((service, index) => {
          const descriptionLine = service.description ? ` | Descripcion: ${service.description}` : ''
          return `${index + 1}. ${service.name}${descriptionLine}`
        }),
      ].join('\n')
    )
  }

  return noteParts.filter(Boolean).join('\n\n') || null
}

export function parseProviderOfferedServicesFromNotes(notes: string | null | undefined) {
  if (!notes) return []

  const lines = notes.split(/\r?\n/)
  const headerIndex = lines.findIndex((line) => line.trim() === 'Servicios habilitados del proveedor:')

  if (headerIndex === -1) return []

  return lines
    .slice(headerIndex + 1)
    .map((line) => line.trim())
    .filter((line) => /^\d+\.\s+/.test(line))
    .map((line) => {
      const cleaned = line.replace(/^\d+\.\s+/, '')
      const [namePart, descriptionPart] = cleaned.split(' | Descripcion: ')

      return {
        name: namePart?.trim() || '',
        description: descriptionPart?.trim() || '',
      }
    })
    .filter((service) => service.name)
}

export function getEmptyProviderRegistrationForm(): ProviderRegistrationFormState {
  return {
    name: '',
    represented_entity: '',
    service_name: '',
    service_slug: '',
    offered_services: [getEmptyProviderOfferedService()],
    whatsapp: '',
    email: '',
    website_url: '',
    photo_url: '',
    commission_rate: '0',
    auto_assign: false,
    active: true,
    priority: '0',
    score: '0',
    city_scope: '',
    notes: '',
    accepts_terms: false,
  }
}

export function buildProviderRegistrationPayload(
  form: ProviderRegistrationFormState,
  source: 'admin' | 'provider-self-service'
) {
  const isAdminSource = source === 'admin'
  const notes = buildProviderNotesWithServices(form.notes, form.offered_services)
  const representedEntityNote = form.represented_entity.trim()

  return {
    name: form.name.trim(),
    represented_entity: form.represented_entity.trim() || null,
    service_name: form.service_name.trim(),
    service_slug: form.service_slug.trim() || null,
    whatsapp: form.whatsapp.trim() || null,
    email: form.email.trim() || null,
    website_url: form.website_url.trim() || null,
    photo_url: form.photo_url.trim() || null,
    commission_rate: Number(form.commission_rate || 0),
    auto_assign: isAdminSource ? form.auto_assign : false,
    active: isAdminSource ? form.active : false,
    priority: isAdminSource ? Number(form.priority || 0) : 0,
    score: isAdminSource ? Number(form.score || 0) : 0,
    city_scope: form.city_scope.trim() || null,
    notes: [notes, representedEntityNote ? `Representada declarada: ${representedEntityNote}` : null]
      .filter(Boolean)
      .join('\n\n') || null,
    accepts_terms: Boolean(form.accepts_terms),
  }
}
