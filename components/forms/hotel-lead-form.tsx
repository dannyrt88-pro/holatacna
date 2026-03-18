'use client'

import { useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { getTrackingValue } from '@/lib/lead-tracking'
import type { HotelLeadFormData } from '@/types/hotels'

type HotelLeadFormProps = {
  serviceName: string
}

const initialForm: HotelLeadFormData = {
  name: '',
  touristPhone: '',
  country: '',
  description: '',
  destinationCity: '',
  checkIn: '',
  checkOut: '',
  guests: '',
  estimatedBudget: ''
}

export function HotelLeadForm({ serviceName }: HotelLeadFormProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [form, setForm] = useState<HotelLeadFormData>(initialForm)
  const [loading, setLoading] = useState(false)
  const [successText, setSuccessText] = useState('')

  function updateField<K extends keyof HotelLeadFormData>(
    field: K,
    value: HotelLeadFormData[K]
  ) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  function validateForm() {
    if (!form.name || !form.touristPhone || !form.country || !form.description) {
      return 'Completa los datos principales del formulario.'
    }

    if (
      !form.destinationCity ||
      !form.checkIn ||
      !form.checkOut ||
      !form.guests ||
      !form.estimatedBudget
    ) {
      return 'Completa todos los datos de hospedaje.'
    }

    const guests = Number(form.guests)
    const budget = Number(form.estimatedBudget)

    if (!Number.isInteger(guests) || guests <= 0) {
      return 'El numero de huespedes debe ser un entero mayor a cero.'
    }

    if (Number.isNaN(budget) || budget <= 0) {
      return 'El presupuesto estimado debe ser mayor a cero.'
    }

    if (new Date(form.checkOut) < new Date(form.checkIn)) {
      return 'La fecha de salida no puede ser menor que la fecha de ingreso.'
    }

    return null
  }

  function buildMessage() {
    return [
      `Pais: ${form.country}`,
      `Descripcion: ${form.description}`,
      `Ciudad destino: ${form.destinationCity}`,
      `Fecha ingreso: ${form.checkIn}`,
      `Fecha salida: ${form.checkOut}`,
      `Huespedes: ${form.guests}`,
      `Presupuesto estimado: ${form.estimatedBudget}`
    ].join('\n')
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (loading) return

    const validationError = validateForm()

    if (validationError) {
      alert(validationError)
      return
    }

    setLoading(true)
    setSuccessText('')

    try {
      const response = await fetch('/api/intake', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: form.name,
          tourist_phone: form.touristPhone,
          preferred_date: form.checkIn,
          service_id: null,
          service_name: serviceName,
          city_interest: form.destinationCity,
          utm_source: getTrackingValue(searchParams.get('utm_source')),
          utm_medium: getTrackingValue(searchParams.get('utm_medium')),
          utm_campaign: getTrackingValue(searchParams.get('utm_campaign')),
          landing_path: pathname,
          message: buildMessage()
        })
      })

      const data = await response.json()

      if (!response.ok) {
        alert(data.error || 'Error enviando solicitud')
        setLoading(false)
        return
      }

      setSuccessText(`Solicitud enviada correctamente. Codigo: ${data.lead.reference_code}`)
      setForm(initialForm)
    } catch {
      alert('Error enviando solicitud')
    }

    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div style={fieldStyle}>
        <label>Nombre</label>
        <input
          required
          value={form.name}
          onChange={(e) => updateField('name', e.target.value)}
          style={inputStyle}
        />
      </div>

      <div style={fieldStyle}>
        <label>Telefono</label>
        <input
          required
          value={form.touristPhone}
          onChange={(e) => updateField('touristPhone', e.target.value)}
          style={inputStyle}
        />
      </div>

      <div style={fieldStyle}>
        <label>Pais</label>
        <input
          required
          value={form.country}
          onChange={(e) => updateField('country', e.target.value)}
          style={inputStyle}
        />
      </div>

      <div style={fieldStyle}>
        <label>Ciudad de destino</label>
        <input
          required
          value={form.destinationCity}
          onChange={(e) => updateField('destinationCity', e.target.value)}
          style={inputStyle}
        />
      </div>

      <div style={fieldStyle}>
        <label>Fecha de ingreso</label>
        <input
          required
          type="date"
          value={form.checkIn}
          onChange={(e) => updateField('checkIn', e.target.value)}
          style={inputStyle}
        />
      </div>

      <div style={fieldStyle}>
        <label>Fecha de salida</label>
        <input
          required
          type="date"
          value={form.checkOut}
          onChange={(e) => updateField('checkOut', e.target.value)}
          style={inputStyle}
        />
      </div>

      <div style={fieldStyle}>
        <label>Numero de huespedes</label>
        <input
          required
          min="1"
          step="1"
          type="number"
          value={form.guests}
          onChange={(e) => updateField('guests', e.target.value)}
          style={inputStyle}
        />
      </div>

      <div style={fieldStyle}>
        <label>Presupuesto estimado</label>
        <input
          required
          min="1"
          step="0.01"
          type="number"
          value={form.estimatedBudget}
          onChange={(e) => updateField('estimatedBudget', e.target.value)}
          style={inputStyle}
        />
      </div>

      <div style={fieldStyle}>
        <label>Descripcion</label>
        <textarea
          required
          value={form.description}
          onChange={(e) => updateField('description', e.target.value)}
          style={{ ...inputStyle, minHeight: '110px', resize: 'vertical' }}
        />
      </div>

      <button type="submit" disabled={loading} style={submitStyle}>
        {loading ? 'Enviando...' : 'Solicitar hospedaje'}
      </button>

      {successText && (
        <p style={{ marginTop: '14px', color: '#166534', fontWeight: 'bold' }}>
          {successText}
        </p>
      )}
    </form>
  )
}

const fieldStyle: React.CSSProperties = {
  marginBottom: '12px'
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

const submitStyle: React.CSSProperties = {
  width: '100%',
  background: '#0f766e',
  color: 'white',
  border: 'none',
  padding: '14px',
  borderRadius: '10px',
  fontWeight: 'bold',
  cursor: 'pointer'
}
