'use client'

import { useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { getTrackingValue } from '@/lib/lead-tracking'
import type { WholesaleLeadFormData } from '@/types/compras-por-mayor'

type WholesaleLeadFormProps = {
  serviceName: string
}

const initialForm: WholesaleLeadFormData = {
  name: '',
  touristPhone: '',
  country: '',
  description: '',
  productType: '',
  estimatedQuantity: '',
  purchaseFrequency: '',
  deliveryLocation: '',
  estimatedBudget: '',
  buyerType: ''
}

export function WholesaleLeadForm({ serviceName }: WholesaleLeadFormProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [form, setForm] = useState<WholesaleLeadFormData>(initialForm)
  const [loading, setLoading] = useState(false)
  const [successText, setSuccessText] = useState('')

  function updateField<K extends keyof WholesaleLeadFormData>(
    field: K,
    value: WholesaleLeadFormData[K]
  ) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  function validateForm() {
    if (!form.name || !form.touristPhone || !form.country || !form.description) {
      return 'Completa los datos principales del formulario.'
    }

    if (
      !form.productType ||
      !form.estimatedQuantity ||
      !form.purchaseFrequency ||
      !form.deliveryLocation ||
      !form.estimatedBudget ||
      !form.buyerType
    ) {
      return 'Completa todos los datos de compra mayorista.'
    }

    const quantity = Number(form.estimatedQuantity)
    const budget = Number(form.estimatedBudget)

    if (Number.isNaN(quantity) || quantity <= 0) {
      return 'La cantidad estimada debe ser mayor a cero.'
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
      `Tipo de producto: ${form.productType}`,
      `Cantidad estimada: ${form.estimatedQuantity}`,
      `Frecuencia de compra: ${form.purchaseFrequency}`,
      `Ciudad o pais de entrega: ${form.deliveryLocation}`,
      `Presupuesto estimado: ${form.estimatedBudget}`,
      `Tipo de comprador: ${form.buyerType}`
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
          preferred_date: null,
          service_id: null,
          service_name: serviceName,
          city_interest: form.deliveryLocation,
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
        <label>Tipo de producto buscado</label>
        <input
          required
          value={form.productType}
          onChange={(e) => updateField('productType', e.target.value)}
          style={inputStyle}
        />
      </div>

      <div style={fieldStyle}>
        <label>Cantidad estimada</label>
        <input
          required
          min="1"
          step="0.01"
          type="number"
          value={form.estimatedQuantity}
          onChange={(e) => updateField('estimatedQuantity', e.target.value)}
          style={inputStyle}
        />
      </div>

      <div style={fieldStyle}>
        <label>Frecuencia de compra</label>
        <input
          required
          value={form.purchaseFrequency}
          onChange={(e) => updateField('purchaseFrequency', e.target.value)}
          style={inputStyle}
        />
      </div>

      <div style={fieldStyle}>
        <label>Ciudad o pais de entrega</label>
        <input
          required
          value={form.deliveryLocation}
          onChange={(e) => updateField('deliveryLocation', e.target.value)}
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
        <label>Tipo de comprador</label>
        <select
          required
          value={form.buyerType}
          onChange={(e) => updateField('buyerType', e.target.value)}
          style={inputStyle}
        >
          <option value="">Selecciona una opcion</option>
          <option value="persona">Persona</option>
          <option value="negocio">Negocio</option>
          <option value="empresa">Empresa</option>
        </select>
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
        {loading ? 'Enviando...' : 'Solicitar conexion mayorista'}
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
  background: '#7c3aed',
  color: 'white',
  border: 'none',
  padding: '14px',
  borderRadius: '10px',
  fontWeight: 'bold',
  cursor: 'pointer'
}
