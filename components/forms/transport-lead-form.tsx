'use client'

import { useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { getTrackingValue } from '@/lib/lead-tracking'
import type { TransportLeadFormData } from '@/types/transporte'

type TransportLeadFormProps = {
  serviceName: string
}

const initialForm: TransportLeadFormData = {
  name: '',
  touristPhone: '',
  country: '',
  description: '',
  serviceArea: '',
  originPoint: '',
  destinationPoint: '',
  serviceDate: '',
  approximateTime: '',
  passengerCount: '',
  transportType: ''
}

export function TransportLeadForm({ serviceName }: TransportLeadFormProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [form, setForm] = useState<TransportLeadFormData>(initialForm)
  const [loading, setLoading] = useState(false)
  const [successText, setSuccessText] = useState('')

  function updateField<K extends keyof TransportLeadFormData>(
    field: K,
    value: TransportLeadFormData[K]
  ) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  function validateForm() {
    if (!form.name || !form.touristPhone || !form.country || !form.description) {
      return 'Completa los datos principales del formulario.'
    }

    if (
      !form.serviceArea ||
      !form.originPoint ||
      !form.destinationPoint ||
      !form.serviceDate ||
      !form.approximateTime ||
      !form.passengerCount ||
      !form.transportType
    ) {
      return 'Completa todos los datos del servicio de transporte.'
    }

    const passengerCount = Number(form.passengerCount)

    if (!Number.isInteger(passengerCount) || passengerCount <= 0) {
      return 'El numero de pasajeros debe ser un entero mayor a cero.'
    }

    return null
  }

  function buildMessage() {
    return [
      `Pais: ${form.country}`,
      `Descripcion: ${form.description}`,
      `Ciudad o zona: ${form.serviceArea}`,
      `Punto de origen: ${form.originPoint}`,
      `Punto de destino: ${form.destinationPoint}`,
      `Fecha del servicio: ${form.serviceDate}`,
      `Hora aproximada: ${form.approximateTime}`,
      `Numero de pasajeros: ${form.passengerCount}`,
      `Tipo de transporte requerido: ${form.transportType}`
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
      const response = await fetch('/api/create-lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: form.name,
          tourist_phone: form.touristPhone,
          preferred_date: form.serviceDate,
          service_id: null,
          service_name: serviceName,
          city_interest: form.serviceArea,
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
        <label>Ciudad o zona</label>
        <input
          required
          value={form.serviceArea}
          onChange={(e) => updateField('serviceArea', e.target.value)}
          style={inputStyle}
        />
      </div>

      <div style={fieldStyle}>
        <label>Punto de origen</label>
        <input
          required
          value={form.originPoint}
          onChange={(e) => updateField('originPoint', e.target.value)}
          style={inputStyle}
        />
      </div>

      <div style={fieldStyle}>
        <label>Punto de destino</label>
        <input
          required
          value={form.destinationPoint}
          onChange={(e) => updateField('destinationPoint', e.target.value)}
          style={inputStyle}
        />
      </div>

      <div style={fieldStyle}>
        <label>Fecha del servicio</label>
        <input
          required
          type="date"
          value={form.serviceDate}
          onChange={(e) => updateField('serviceDate', e.target.value)}
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
        <label>Numero de pasajeros</label>
        <input
          required
          min="1"
          step="1"
          type="number"
          value={form.passengerCount}
          onChange={(e) => updateField('passengerCount', e.target.value)}
          style={inputStyle}
        />
      </div>

      <div style={fieldStyle}>
        <label>Tipo de transporte requerido</label>
        <input
          required
          value={form.transportType}
          onChange={(e) => updateField('transportType', e.target.value)}
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
        {loading ? 'Enviando...' : 'Solicitar transporte'}
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
