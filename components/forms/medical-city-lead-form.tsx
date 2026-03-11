'use client'

import { useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { getTrackingValue } from '@/lib/lead-tracking'
import { serviceNameBySlug } from '@/lib/service-catalog'
import { getAddOnOptionsForService } from '@/lib/package-catalog'

type MedicalCityLeadFormProps = {
  serviceSlug: 'implantes-dentales' | 'oftalmologia' | 'estetica' | 'dermatologia'
  city: string
  messageLabel?: string
  includeMessage?: boolean
  heading: string
}

export function MedicalCityLeadForm({
  serviceSlug,
  city,
  messageLabel = 'Cuentanos tu caso',
  includeMessage = true,
  heading
}: MedicalCityLeadFormProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [name, setName] = useState('')
  const [touristPhone, setTouristPhone] = useState('')
  const [preferredDate, setPreferredDate] = useState('')
  const [message, setMessage] = useState('')
  const [additionalServices, setAdditionalServices] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [successText, setSuccessText] = useState('')

  const serviceName = serviceNameBySlug[serviceSlug]
  const addOnOptions = getAddOnOptionsForService(serviceSlug)

  function toggleAdditionalService(service: string) {
    setAdditionalServices((prev) =>
      prev.includes(service) ? prev.filter((item) => item !== service) : [...prev, service]
    )
  }

  function sanitizeWhatsapp(value: string) {
    const trimmed = value.replace(/\s+/g, '')
    const hasPlus = trimmed.startsWith('+')
    const digitsOnly = trimmed.replace(/\D/g, '')
    return hasPlus ? `+${digitsOnly}` : digitsOnly
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (loading) return

    setLoading(true)
    setSuccessText('')

    try {
      const response = await fetch('/api/create-lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          tourist_phone: touristPhone,
          preferred_date: preferredDate || null,
          service_id: null,
          service_name: serviceName,
          city_interest: city,
          utm_source: getTrackingValue(searchParams.get('utm_source')),
          utm_medium: getTrackingValue(searchParams.get('utm_medium')),
          utm_campaign: getTrackingValue(searchParams.get('utm_campaign')),
          utm_content: getTrackingValue(searchParams.get('utm_content')),
          utm_term: getTrackingValue(searchParams.get('utm_term')),
          landing_path: pathname,
          additional_services: additionalServices,
          message: includeMessage ? message : null
        })
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
      setMessage('')
      setAdditionalServices([])
    } catch {
      alert('Error enviando solicitud')
    }

    setLoading(false)
  }

  return (
    <div style={formCardStyle}>
      <h2 style={{ marginBottom: '18px' }}>{heading}</h2>

      <form onSubmit={handleSubmit}>
        <div style={fieldStyle}>
          <label>Nombre</label>
          <input required value={name} onChange={(e) => setName(e.target.value)} style={inputStyle} />
        </div>

        <div style={fieldStyle}>
          <label>WhatsApp</label>
          <input
            required
            value={touristPhone}
            onChange={(e) => setTouristPhone(sanitizeWhatsapp(e.target.value))}
            style={inputStyle}
            inputMode="tel"
          />
        </div>

        <div style={fieldStyle}>
          <label>Fecha estimada de viaje</label>
          <input type="date" value={preferredDate} onChange={(e) => setPreferredDate(e.target.value)} style={inputStyle} />
        </div>

        <div style={fieldStyle}>
          <label>Ciudad de origen en Chile</label>
          <input value={city} readOnly style={{ ...inputStyle, background: '#f3f4f6' }} />
        </div>

        {addOnOptions.length > 0 && (
          <div style={{ ...fieldStyle, ...cardFieldStyle }}>
            <div style={{ marginBottom: '8px', fontWeight: 700 }}>Servicios adicionales</div>
            <div style={{ marginBottom: '10px', color: '#475569', fontSize: '14px' }}>
              Marca todas las opciones que tambien te interesan para que HolaTacna detecte mejor tu necesidad y, si
              corresponde, sugiera un paquete comercial.
            </div>
            <div style={checkboxGridStyle}>
              {addOnOptions.map((option) => (
                <label key={option} style={checkboxOptionStyle}>
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
          <div style={fieldStyle}>
            <label>{messageLabel}</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              style={{ ...inputStyle, minHeight: '110px', resize: 'vertical' }}
            />
          </div>
        )}

        <button type="submit" disabled={loading} style={submitStyle}>
          {loading ? 'Enviando...' : 'Solicitar informacion'}
        </button>

        {successText && (
          <p style={{ marginTop: '14px', color: '#166534', fontWeight: 'bold' }}>
            {successText}
          </p>
        )}
      </form>
    </div>
  )
}

const formCardStyle: React.CSSProperties = {
  background: 'white',
  color: '#111827',
  borderRadius: '14px',
  padding: '24px',
  boxShadow: '0 10px 30px rgba(0,0,0,0.15)'
}

const fieldStyle: React.CSSProperties = {
  marginBottom: '12px'
}

const cardFieldStyle: React.CSSProperties = {
  border: '1px solid #e2e8f0',
  borderRadius: '12px',
  padding: '14px',
  background: '#f8fafc',
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  marginTop: '6px',
  padding: '12px',
  borderRadius: '8px',
  border: '1px solid #d1d5db',
  fontSize: '15px',
  boxSizing: 'border-box'
}

const checkboxGridStyle: React.CSSProperties = {
  display: 'grid',
  gap: '8px',
}

const checkboxOptionStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  padding: '10px 12px',
  borderRadius: '10px',
  background: '#ffffff',
  border: '1px solid #dbe4ee',
}

const submitStyle: React.CSSProperties = {
  width: '100%',
  background: '#16a34a',
  color: 'white',
  border: 'none',
  padding: '14px',
  borderRadius: '10px',
  fontWeight: 'bold',
  cursor: 'pointer'
}
