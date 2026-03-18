'use client'

import { useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { chileCities } from '@/lib/chile-cities'
import { getTrackingValue } from '@/lib/lead-tracking'
import { serviceNameBySlug } from '@/lib/service-catalog'
import { getAddOnOptionsForService, getPackagesForService } from '@/lib/package-catalog'

type MedicalServicePageProps = {
  serviceSlug: 'dermatologia' | 'estetica' | 'oftalmologia' | 'implantes-dentales'
  title: string
  description: string
  gradientClass: string
  bullets: string[]
  messageLabel?: string
}

export function MedicalServicePage({
  serviceSlug,
  title,
  description,
  gradientClass,
  bullets,
  messageLabel,
}: MedicalServicePageProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [name, setName] = useState('')
  const [touristPhone, setTouristPhone] = useState('')
  const [preferredDate, setPreferredDate] = useState('')
  const [cityInterest, setCityInterest] = useState('')
  const [message, setMessage] = useState('')
  const [additionalServices, setAdditionalServices] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [successText, setSuccessText] = useState('')

  const serviceName = serviceNameBySlug[serviceSlug]
  const suggestedPackages = getPackagesForService(serviceSlug)
  const addOnOptions = getAddOnOptionsForService(serviceSlug)
  const messageEnabled = Boolean(messageLabel)

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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (loading) return

    setLoading(true)
    setSuccessText('')

    try {
      const response = await fetch('/api/intake', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          tourist_phone: touristPhone,
          preferred_date: preferredDate || null,
          service_id: null,
          service_slug: serviceSlug,
          service_name: serviceName,
          city_interest: cityInterest || null,
          utm_source: getTrackingValue(searchParams.get('utm_source')),
          utm_medium: getTrackingValue(searchParams.get('utm_medium')),
          utm_campaign: getTrackingValue(searchParams.get('utm_campaign')),
          utm_content: getTrackingValue(searchParams.get('utm_content')),
          utm_term: getTrackingValue(searchParams.get('utm_term')),
          additional_services: additionalServices,
          message: messageEnabled ? message : null,
          landing_path: pathname,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        alert(data.error || 'Error enviando solicitud')
        setLoading(false)
        return
      }

      setSuccessText(`Solicitud enviada correctamente. Codigo: ${data.lead.reference_code}`)
      setName('')
      setTouristPhone('')
      setPreferredDate('')
      setCityInterest('')
      setMessage('')
      setAdditionalServices([])
    } catch {
      alert('Error enviando solicitud')
    }

    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-slate-50 font-sans">
      <section className={`${gradientClass} px-5 py-14 text-white sm:px-6 lg:px-8 lg:py-20`}>
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <div>
            <div className="mb-5 inline-block rounded-full bg-green-600 px-4 py-2 text-sm font-bold">
              Clientes de Chile
            </div>
            <h1 className="mb-4 text-4xl font-bold leading-tight sm:text-5xl">
              {title}
            </h1>
            <p className="mb-6 text-lg leading-8 text-white/90 sm:text-xl">
              {description}
            </p>
            <div className="grid gap-3 text-base leading-7 sm:text-lg">
              {bullets.map((bullet) => (
                <div key={bullet}>{bullet}</div>
              ))}
            </div>

            {suggestedPackages.length ? (
              <div className="mt-6 rounded-2xl bg-white/10 p-4">
                <div className="mb-3 text-sm font-bold uppercase tracking-[0.08em] text-white/80">
                  Paquetes medicos sugeridos
                </div>
                <div className="grid gap-3">
                  {suggestedPackages.map((item) => (
                    <div key={item.slug} className="rounded-xl border border-white/15 bg-white/10 p-4">
                      <div className="font-bold">{item.name}</div>
                      <div className="mt-1 text-sm text-white/85">{item.shortCopy}</div>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          <div className="rounded-2xl bg-white p-5 text-slate-900 shadow-[0_10px_30px_rgba(0,0,0,0.15)] sm:p-6">
            <h2 className="mb-5 text-2xl font-bold">Solicita tu evaluacion</h2>

            <form onSubmit={handleSubmit} className="grid gap-4">
              <label className="grid gap-2">
                <span className="font-medium">Nombre</span>
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="rounded-lg border border-slate-300 px-4 py-3"
                  placeholder="Ej: Daniela Soto"
                />
              </label>

              <label className="grid gap-2">
                <span className="font-medium">WhatsApp</span>
                <input
                  required
                  value={touristPhone}
                  onChange={(e) => setTouristPhone(sanitizeWhatsapp(e.target.value))}
                  className="rounded-lg border border-slate-300 px-4 py-3"
                  placeholder="+56912345678"
                  inputMode="tel"
                />
              </label>

              <label className="grid gap-2">
                <span className="font-medium">Fecha estimada de viaje</span>
                <input
                  type="date"
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="rounded-lg border border-slate-300 px-4 py-3"
                />
              </label>

              <label className="grid gap-2">
                <span className="font-medium">Ciudad en Chile</span>
                <select
                  value={cityInterest}
                  onChange={(e) => setCityInterest(e.target.value)}
                  className="rounded-lg border border-slate-300 px-4 py-3"
                >
                  <option value="">Selecciona tu ciudad</option>
                  {chileCities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </label>

              {addOnOptions.length ? (
                <div className="grid gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-4">
                  <div>
                    <div className="font-medium">Servicios adicionales</div>
                    <div className="text-sm text-slate-600">
                      Marca todas las opciones que tambien te interesan para entender mejor tu necesidad y, si aplica,
                      sugerir un paquete comercial.
                    </div>
                  </div>

                  <div className="grid gap-2 sm:grid-cols-2">
                    {addOnOptions.map((option) => (
                      <label key={option} className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-3 py-3">
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
              ) : null}

              {messageEnabled ? (
                <label className="grid gap-2">
                  <span className="font-medium">{messageLabel}</span>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="min-h-[120px] rounded-lg border border-slate-300 px-4 py-3"
                  />
                </label>
              ) : null}

              <button
                disabled={loading}
                type="submit"
                className="rounded-xl bg-green-600 px-4 py-3 font-bold text-white transition hover:bg-green-500 disabled:opacity-60"
              >
                {loading ? 'Enviando...' : 'Solicitar informacion'}
              </button>

              {successText ? (
                <p className="font-bold text-green-700">{successText}</p>
              ) : null}
            </form>
          </div>
        </div>
      </section>
    </main>
  )
}
