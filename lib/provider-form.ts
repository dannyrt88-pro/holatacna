export type ProviderRegistrationFormState = {
  name: string
  represented_entity: string
  service_name: string
  service_slug: string
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

export function getEmptyProviderRegistrationForm(): ProviderRegistrationFormState {
  return {
    name: '',
    represented_entity: '',
    service_name: '',
    service_slug: '',
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
  const noteParts = [form.notes.trim()]

  if (form.represented_entity.trim()) {
    noteParts.push(`Representada declarada: ${form.represented_entity.trim()}`)
  }

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
    is_active: isAdminSource ? form.active : false,
    priority: isAdminSource ? Number(form.priority || 0) : 0,
    score: isAdminSource ? Number(form.score || 0) : 0,
    city_scope: form.city_scope.trim() || null,
    notes: noteParts.filter(Boolean).join('\n') || null,
    accepts_terms: Boolean(form.accepts_terms),
  }
}
