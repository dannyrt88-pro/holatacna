export type LeadStatus =
  | "pending"
  | "contactado"
  | "evaluacion"
  | "cotizado"
  | "reservado"
  | "vendido"
  | "descartado"
  | string

export type Lead = {
  id: string
  created_at: string
  attended_at?: string | null
  derivation_type?: string | null
  derivation_at?: string | null
  last_status_at?: string | null
  name: string | null
  tourist_phone: string | null
  preferred_date?: string | null
  message?: string | null
  auto_assigned?: boolean | null
  utm_source?: string | null
  utm_medium?: string | null
  utm_campaign?: string | null
  utm_content?: string | null
  utm_term?: string | null
  landing_path?: string | null
  page_type?: string | null
  city_interest?: string | null
  service_slug?: string | null
  additional_services?: string[] | null
  lead_score?: number | null
  lead_priority?: string | null
  suggested_package_slug?: string | null
  service_name: string | null
  reference_code: string | null
  status: LeadStatus | null
  provider_id: string | null
  provider_phone: string | null
  direct_provider_ids?: string[] | null
  commission_rate: number | null
  direct_mode: boolean | null
  treatment_value: number | string | null
  commission_amount: number | string | null
}

export type Provider = {
  id: string
  name: string
  service_name: string | null
  service_slug?: string | null
  whatsapp: string | null
  email?: string | null
  website_url?: string | null
  photo_url?: string | null
  commission_rate: number | null
  auto_assign: boolean | null
  priority?: number | null
  active?: boolean | null
  is_active: boolean | null
  notes: string | null
  score?: number | null
  city_scope?: string | null
}

export type LeadCapturePayload = {
  name: string | null
  phone: string | null
  tourist_phone: string | null
  message: string | null
  service_slug: string | null
  service_name: string | null
  city_interest: string | null
  landing_path: string | null
  page_type: string | null
  utm_source: string | null
  utm_medium: string | null
  utm_campaign: string | null
  utm_content: string | null
  utm_term: string | null
}
