'use client'

import { useState } from 'react'
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
  submitLabel?: string
  messageLabel?: string
  messagePlaceholder?: string
  includeMessage?: boolean
  successMessage?: string
}

export function LeadCaptureForm({
  serviceSlug,
  serviceName,
  cityInterest = null,
  landingPath,
  pageType = 'landing',
  variant = 'default',
  heading = 'Solicitar informacion',
  submitLabel = 'Solicitar informacion',
  messageLabel = 'Mensaje',
  messagePlaceholder,
  includeMessage = true,
  successMessage = 'Solicitud enviada. Nuestro equipo te contactara por WhatsApp.',
}: LeadCaptureFormProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  function buildPayload(): LeadCapturePayload & { variant?: string | null } {
    return {
      name: name.trim() || null,
      phone: phone.trim() || null,
      tourist_phone: phone.trim() || null,
      message: includeMessage ? message.trim() || null : null,
      service_slug: serviceSlug || null,
      service_name: serviceName || null,
      city_interest: cityInterest?.trim() || null,
      landing_path: landingPath || pathname || null,
      page_type: pageType?.trim() || null,
      ...buildTrackingPayload(searchParams),
      variant: variant?.trim() || null,
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (loading) return

    setLoading(true)

    try {
      const response = await fetch('/api/create-lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(buildPayload()),
      })

      const data = await response.json()

      if (!response.ok) {
        alert(data.error || 'No se pudo enviar la solicitud.')
        setLoading(false)
        return
      }

      alert(successMessage)
      setName('')
      setPhone('')
      setMessage('')
    } catch {
      alert('No se pudo enviar la solicitud.')
    }

    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <h2 className="text-3xl font-bold">{heading}</h2>

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
          onChange={(event) => setPhone(event.target.value)}
          className="rounded-xl border border-slate-300 px-4 py-3"
          placeholder="+56 9 ..."
        />
      </label>

      {includeMessage && (
        <label className="grid gap-2">
          <span className="font-medium">{messageLabel}</span>
          <textarea
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            className="min-h-[140px] rounded-xl border border-slate-300 px-4 py-3"
            placeholder={messagePlaceholder || 'Cuéntanos brevemente tu caso'}
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
