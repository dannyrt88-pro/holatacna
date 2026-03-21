'use client'

import { Suspense, useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { buildTrackingPayload } from '@/lib/lead-tracking'
import type { LeadCapturePayload } from '@/lib/crm-types'

type LeadCaptureFormProps = {
  serviceSlug: string
  serviceName: string
  cityInterest?: string | null
  landingPath?: string | null
  pageType?: string | null
  variant?: string | null
  heading?: string
  formHeading?: string
  submitLabel?: string
  messageLabel?: string
  messagePlaceholder?: string
  includeMessage?: boolean
  includePreferredDate?: boolean
  preferredDateLabel?: string
  includeAdditionalServices?: boolean
  additionalServicesLabel?: string
  additionalServicesHelperText?: string
  additionalServicesOptions?: string[]
  successMessage?: string
}

type LeadCaptureFormInnerProps = LeadCaptureFormProps

function LeadCaptureFormInner({
  serviceSlug,
  serviceName,
  cityInterest = null,
  landingPath,
  pageType = 'landing',
  variant = 'default',
  heading = 'Solicitar informacion',
  formHeading,
  submitLabel = 'Solicitar informacion',
  messageLabel = 'Mensaje',
  messagePlaceholder,
  includeMessage = true,
  includePreferredDate = false,
  preferredDateLabel = 'Fecha estimada de viaje',
  includeAdditionalServices = false,
  additionalServicesLabel = 'Servicios adicionales',
  additionalServicesHelperText,
  additionalServicesOptions = [],
  successMessage = '¡Gracias! Te contactamos pronto por WhatsApp',
}: LeadCaptureFormInnerProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [preferredDate, setPreferredDate] = useState('')
  const [message, setMessage] = useState('')
  const [additionalServices, setAdditionalServices] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const shouldShowAdditionalServices =
    includeAdditionalServices && additionalServicesOptions.length > 0

  function sanitizeWhatsapp(value: string) {
    const trimmed = value.replace(/\s+/g, '')
    const hasPlus = trimmed.startsWith('+')
    const digitsOnly = trimmed.replace(/\D/g, '')
    return hasPlus ? `+${digitsOnly}` : digitsOnly
  }

  function toggleAdditionalService(service: string) {
    setAdditionalServices((prev) =>
      prev.includes(service) ? prev.filter((item) => item !== service) : [...prev, service]
    )
  }

  function buildPayload(): LeadCapturePayload & { variant?: string | null; origin_url?: string | null } {
    return {
      name: name.trim() || null,
      phone: phone.trim() || null,
      tourist_phone: phone.trim() || null,
      preferred_date: includePreferredDate ? preferredDate || null : null,
      message: includeMessage ? message.trim() || null : null,
      service_slug: serviceSlug || null,
      service_name: serviceName || null,
      city_interest: cityInterest?.trim() || null,
      landing_path: landingPath || pathname || null,
      origin_url: typeof window !== 'undefined' ? window.location.href : landingPath || pathname || null,
      page_type: pageType?.trim() || null,
      additional_services: shouldShowAdditionalServices ? additionalServices : null,
      ...buildTrackingPayload(searchParams),
      variant: variant?.trim() || null,
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (loading) return

    setLoading(true)

    try {
      const response = await fetch('/api/intake', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(buildPayload()),
      })

      const data = await response.json()

      if (!response.ok) {
        alert(data.error || 'Hubo un error. Escríbenos directo por WhatsApp')
        setLoading(false)
        return
      }

      if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
        ;(window as any).gtag('event', 'conversion', {
          send_to: 'AW-18024620453/0NIqCKKagoscEKXD55JD',
          value: 1.0,
          currency: 'PEN',
        })
      }
      alert(successMessage)
      setName('')
      setPhone('')
      setPreferredDate('')
      setMessage('')
      setAdditionalServices([])
    } catch {
      alert('Hubo un error. Escríbenos directo por WhatsApp')
    }

    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <h2 className="text-3xl font-bold">{formHeading || heading}</h2>

      <label className="grid gap-2">
        <span className="font-medium">Nombre</span>
        <input
          required
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="rounded-xl border border-slate-300 px-4 py-3"
          placeholder="Tu nombre"
        />
      </label>

      <label className="grid gap-2">
        <span className="font-medium">WhatsApp</span>
        <input
          required
          value={phone}
          onChange={(event) => setPhone(sanitizeWhatsapp(event.target.value))}
          className="rounded-xl border border-slate-300 px-4 py-3"
          placeholder="+56 9 ..."
          inputMode="tel"
        />
      </label>

      {includePreferredDate && (
        <label className="grid gap-2">
          <span className="font-medium">{preferredDateLabel}</span>
          <input
            type="date"
            value={preferredDate}
            onChange={(event) => setPreferredDate(event.target.value)}
            className="rounded-xl border border-slate-300 px-4 py-3"
          />
        </label>
      )}

      {shouldShowAdditionalServices && (
        <div className="grid gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <div>
            <div className="font-medium">{additionalServicesLabel}</div>
            {additionalServicesHelperText ? (
              <p className="mt-1 text-sm leading-6 text-slate-600">{additionalServicesHelperText}</p>
            ) : null}
          </div>
          <div className="grid gap-2">
            {additionalServicesOptions.map((option) => (
              <label
                key={option}
                className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-3"
              >
                <input
                  type="checkbox"
                  checked={additionalServices.includes(option)}
                  onChange={() => toggleAdditionalService(option)}
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {includeMessage && (
        <label className="grid gap-2">
          <span className="font-medium">{messageLabel}</span>
          <textarea
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            className="min-h-[140px] rounded-xl border border-slate-300 px-4 py-3"
            placeholder={messagePlaceholder || 'Cuentanos brevemente tu caso'}
          />
        </label>
      )}

      <button
        type="submit"
        disabled={loading}
        className="rounded-xl bg-emerald-500 px-5 py-3 font-bold text-emerald-950 transition hover:bg-emerald-400 disabled:opacity-60"
      >
        {loading ? 'Enviando...' : submitLabel}
      </button>
    </form>
  )
}

export function LeadCaptureForm(props: LeadCaptureFormProps) {
  return (
    <Suspense fallback={<div className="text-sm text-slate-500">Cargando formulario...</div>}>
      <LeadCaptureFormInner {...props} />
    </Suspense>
  )
}
