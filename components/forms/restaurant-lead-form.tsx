'use client'

import { useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { getTrackingValue } from '@/lib/lead-tracking'
import type { RestaurantLeadFormData } from '@/types/restaurants'

type RestaurantLeadFormProps = {
  serviceName: string
}

const initialForm: RestaurantLeadFormData = {
  name: '',
  touristPhone: '',
  country: '',
  description: '',
  destinationCity: '',
  desiredDate: '',
  approximateTime: '',
  partySize: '',
  cuisinePreference: '',
  estimatedBudget: ''
}

export function RestaurantLeadForm({ serviceName }: RestaurantLeadFormProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [form, setForm] = useState<RestaurantLeadFormData>(initialForm)
  const [loading, setLoading] = useState(false)
  const [successText, setSuccessText] = useState('')

  function updateField<K extends keyof RestaurantLeadFormData>(
    field: K,
    value: RestaurantLeadFormData[K]
  ) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  function validateForm() {
    if (!form.name || !form.touristPhone || !form.country || !form.description) {
      return 'Completa los datos principales del formulario.'
    }

    if (
      !form.destinationCity ||
      !form.desiredDate ||
      !form.approximateTime ||
      !form.partySize ||
      !form.cuisinePreference ||
      !form.estimatedBudget
    ) {
      return 'Completa todos los datos de la reserva gastronomica.'
    }

    const partySize = Number(form.partySize)
    const budget = Number(form.estimatedBudget)

    if (!Number.isInteger(partySize) || partySize <= 0) {
      return 'El numero de personas debe ser un entero mayor a cero.'
    }

    if (Number.isNaN(budget) || budget <= 0) {
      return 'El presupuesto estimado debe ser mayor a cero.'
    }

    return null
  }

  function buildMessage() {
    return [
      `Pais: ${form.country}`,
      `Descripcion: ${form.description}`,
      `Destino: ${form.destinationCity}`,
      `Fecha deseada: ${form.desiredDate}`,
      `Hora aproximada: ${form.approximateTime}`,
      `Numero de personas: ${form.partySize}`,
      `Preferencia gastronomica: ${form.cuisinePreference}`,
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
          preferred_date: form.desiredDate,
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
        <label>Ciudad o destino</label>
        <input
          required
          value={form.destinationCity}
          onChange={(e) => updateField('destinationCity', e.target.value)}
          style={inputStyle}
        />
      </div>

      <div style={fieldStyle}>
        <label>Fecha deseada</label>
        <input
          required
          type="date"
          value={form.desiredDate}
          onChange={(e) => updateField('desiredDate', e.target.value)}
          style={inputStyle}
        />
      </div>

      <div style={fieldStyle}>
        <label>Hora aproximada</label>
        <input
          required
          type="time"
          value={form.approximateTime}
          onChange={(e) => updateField('approximateTime', e.target.value)}
          style={inputStyle}
        />
      </div>

      <div style={fieldStyle}>
        <label>Numero de personas</label>
        <input
          required
          min="1"
          step="1"
          type="number"
          value={form.partySize}
          onChange={(e) => updateField('partySize', e.target.value)}
          style={inputStyle}
        />
      </div>

      <div style={fieldStyle}>
        <label>Tipo de comida o preferencia gastronomica</label>
        <input
          required
          value={form.cuisinePreference}
          onChange={(e) => updateField('cuisinePreference', e.target.value)}
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
        {loading ? 'Enviando...' : 'Solicitar reserva gastronomica'}
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
  background: '#c2410c',
  color: 'white',
  border: 'none',
  padding: '14px',
  borderRadius: '10px',
  fontWeight: 'bold',
  cursor: 'pointer'
}
