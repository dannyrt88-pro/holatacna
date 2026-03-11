'use client'

import { ChangeEvent, useEffect, useMemo, useState } from 'react'
import { services } from '@/lib/service-catalog'
import { buildProviderAgreementFilename, buildProviderAgreementHtml } from '@/lib/provider-agreement'
import {
  buildProviderRegistrationPayload,
  getEmptyProviderOfferedService,
  getEmptyProviderRegistrationForm,
  type ProviderOfferedService,
  type ProviderRegistrationFormState,
} from '@/lib/provider-form'

type ProviderOnboardingFormProps = {
  mode: 'admin' | 'provider-self-service'
  title: string
  description: string
  submitLabel: string
  successMessage: string
}

export function ProviderOnboardingForm({
  mode,
  title,
  description,
  submitLabel,
  successMessage,
}: ProviderOnboardingFormProps) {
  const [form, setForm] = useState<ProviderRegistrationFormState>(getEmptyProviderRegistrationForm())
  const [saving, setSaving] = useState(false)
  const [feedback, setFeedback] = useState('')
  const [agreementDownloadUrl, setAgreementDownloadUrl] = useState<string | null>(null)
  const [agreementFilename, setAgreementFilename] = useState('acuerdo-preliminar-proveedor.html')

  const serviceOptions = useMemo(
    () => services.map((service) => ({ slug: service.slug, name: service.name })),
    []
  )
  const isPublicRegistration = mode === 'provider-self-service'

  function getPublicServiceLabel(slug: string, name: string) {
    switch (slug) {
      case 'implantes-dentales':
        return 'Clinica dental'
      case 'oftalmologia':
        return 'Oftalmologia'
      case 'estetica':
        return 'Estetica'
      case 'dermatologia':
        return 'Dermatologia'
      case 'hoteles':
        return 'Hotel / alojamiento'
      case 'alquiler-departamentos':
        return 'Departamento por dia'
      case 'transporte':
        return 'Transporte'
      case 'restaurants':
        return 'Restaurante'
      default:
        return name
    }
  }

  useEffect(() => {
    return () => {
      if (agreementDownloadUrl) {
        URL.revokeObjectURL(agreementDownloadUrl)
      }
    }
  }, [agreementDownloadUrl])

  function handleFormChange<K extends keyof ProviderRegistrationFormState>(
    field: K,
    value: ProviderRegistrationFormState[K]
  ) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  function handleOfferedServiceChange(
    index: number,
    field: keyof ProviderOfferedService,
    value: string | boolean
  ) {
    setForm((prev) => ({
      ...prev,
      offered_services: prev.offered_services.map((service, serviceIndex) =>
        serviceIndex === index
          ? {
              ...service,
              [field]: value,
              ...(field === 'name' || field === 'description' ? { enabled: true } : {}),
            }
          : service
      ),
    }))
  }

  function addOfferedService() {
    setForm((prev) => ({
      ...prev,
      offered_services: [
        ...prev.offered_services,
        {
          ...getEmptyProviderOfferedService(),
          enabled: true,
        },
      ],
    }))
  }

  function removeOfferedService(index: number) {
    setForm((prev) => ({
      ...prev,
      offered_services:
        prev.offered_services.length === 1
          ? [getEmptyProviderOfferedService()]
          : prev.offered_services.filter((_, serviceIndex) => serviceIndex !== index),
    }))
  }

  function handleServiceSelect(value: string) {
    const selected = serviceOptions.find((service) => service.slug === value)

    setForm((prev) => ({
      ...prev,
      service_slug: value,
      service_name: selected?.name || prev.service_name,
    }))
  }

  function handlePhotoUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]

    if (!file) return

    if (file.size > 1_500_000) {
      alert('La foto debe pesar menos de 1.5 MB')
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      const result = reader.result
      if (typeof result === 'string') {
        setForm((prev) => ({ ...prev, photo_url: result }))
      }
    }
    reader.readAsDataURL(file)
  }

  async function submitProvider() {
    if (!form.name.trim()) {
      alert('Ingresa el nombre del proveedor')
      return
    }

    if (!form.service_name.trim()) {
      alert('Ingresa el servicio principal del proveedor')
      return
    }

    if (isPublicRegistration && !form.accepts_terms) {
      alert('Debes aceptar la declaracion de veracidad y el acuerdo comercial preliminar')
      return
    }

    setSaving(true)
    setFeedback('')
    const snapshot = { ...form }

    const response = await fetch('/api/session-role', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'provider-register',
        ...buildProviderRegistrationPayload(form, mode),
        source: mode,
      }),
    })

    const data = await response.json()
    setSaving(false)

    if (!response.ok) {
      alert(data.error || 'Error registrando proveedor')
      return
    }

    if (isPublicRegistration) {
      const html = buildProviderAgreementHtml({
        createdAt: new Date().toLocaleString('es-PE'),
        providerName: snapshot.name,
        representedEntity: snapshot.represented_entity,
        serviceName: snapshot.service_name,
        whatsapp: snapshot.whatsapp,
        email: snapshot.email,
        cityScope: snapshot.city_scope,
        commissionRate: Number(snapshot.commission_rate || 0),
        notes: snapshot.notes,
      })
      const blob = new Blob([html], { type: 'text/html;charset=utf-8' })
      const nextUrl = URL.createObjectURL(blob)
      setAgreementDownloadUrl((current) => {
        if (current) {
          URL.revokeObjectURL(current)
        }
        return nextUrl
      })
      setAgreementFilename(buildProviderAgreementFilename(snapshot.name))
    }

    setFeedback(successMessage)
    setForm(getEmptyProviderRegistrationForm())
  }

  return (
    <section className="rounded-[28px] bg-white p-6 shadow-lg">
      <div className="mb-6">
        <div className="mb-2 inline-block rounded-full bg-sky-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-sky-700">
          Registro de proveedor
        </div>
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="mt-2 max-w-3xl text-sm text-slate-600">{description}</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="grid gap-4 md:grid-cols-2">
          {isPublicRegistration ? (
            <div className="md:col-span-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
              <div className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
                Datos del negocio
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Queremos entender quien eres, que servicio ofreces y bajo que nombre operas.
              </p>
            </div>
          ) : null}

          <label className="grid gap-2">
            <span className="text-sm font-semibold">
              {isPublicRegistration ? 'Nombre del negocio o marca' : 'Nombre'}
            </span>
            <input
              value={form.name}
              onChange={(event) => handleFormChange('name', event.target.value)}
              className="rounded-xl border border-slate-300 px-4 py-3"
              placeholder={isPublicRegistration ? 'Clinica, hotel, transporte o negocio' : 'Clinica o proveedor'}
            />
          </label>

          {isPublicRegistration ? (
            <label className="grid gap-2">
              <span className="text-sm font-semibold">Empresa o representada</span>
              <input
                value={form.represented_entity}
                onChange={(event) => handleFormChange('represented_entity', event.target.value)}
                className="rounded-xl border border-slate-300 px-4 py-3"
                placeholder="Razon social o nombre comercial"
              />
            </label>
          ) : null}

          <label className="grid gap-2">
            <span className="text-sm font-semibold">
              {isPublicRegistration ? 'Servicio principal' : 'Servicio'}
            </span>
            <input
              value={form.service_name}
              onChange={(event) => handleFormChange('service_name', event.target.value)}
              className="rounded-xl border border-slate-300 px-4 py-3"
              placeholder={isPublicRegistration ? 'Describe tu servicio principal' : 'Implantes Dentales'}
            />
          </label>

          {isPublicRegistration ? (
            <label className="grid gap-2">
              <span className="text-sm font-semibold">Categoria principal</span>
              <select
                value={form.service_slug}
                onChange={(event) => handleServiceSelect(event.target.value)}
                className="rounded-xl border border-slate-300 px-4 py-3"
              >
                <option value="">Selecciona la categoria que mejor te representa</option>
                {serviceOptions.map((service) => (
                  <option key={service.slug} value={service.slug}>
                    {getPublicServiceLabel(service.slug, service.name)}
                  </option>
                ))}
              </select>
            </label>
          ) : (
            <label className="grid gap-2">
              <span className="text-sm font-semibold">Service slug</span>
              <select
                value={form.service_slug}
                onChange={(event) => handleServiceSelect(event.target.value)}
                className="rounded-xl border border-slate-300 px-4 py-3"
              >
                <option value="">Seleccionar slug</option>
                {serviceOptions.map((service) => (
                  <option key={service.slug} value={service.slug}>
                    {service.name} · {service.slug}
                  </option>
                ))}
              </select>
            </label>
          )}

          {isPublicRegistration ? (
            <div className="md:col-span-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
              <div className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
                Servicios
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Indicanos tu categoria principal y, si corresponde, otros servicios que tambien
                ofreces.
              </p>
            </div>
          ) : null}

          <div className="md:col-span-2 grid gap-4 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="text-sm font-semibold text-slate-900">Servicios que brinda</div>
                <div className="text-sm text-slate-600">
                  {isPublicRegistration
                    ? 'Si ofreces mas de un servicio, puedes agregarlo aqui para que tengamos una vision mas completa de tu propuesta.'
                    : 'Puedes habilitar uno o varios servicios adicionales y describir cada uno sin afectar el servicio principal del sistema.'}
                </div>
              </div>

              <button
                type="button"
                onClick={addOfferedService}
                className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900"
              >
                Agregar servicio
              </button>
            </div>

            <div className="grid gap-4">
              {form.offered_services.map((service, index) => (
                <div key={`offered-service-${index}`} className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="text-sm font-semibold text-slate-900">Servicio {index + 1}</div>
                    {form.offered_services.length > 1 ? (
                      <button
                        type="button"
                        onClick={() => removeOfferedService(index)}
                        className="rounded-lg bg-rose-50 px-3 py-2 text-sm font-semibold text-rose-700"
                      >
                        Quitar
                      </button>
                    ) : null}
                  </div>

                  <div className="grid gap-3 md:grid-cols-2">
                    <label className="grid gap-2">
                      <span className="text-sm font-semibold">Nombre del servicio</span>
                      <input
                        value={service.name}
                        onChange={(event) =>
                          handleOfferedServiceChange(index, 'name', event.target.value)
                        }
                        className="w-full rounded-xl border border-slate-300 px-4 py-3"
                        placeholder={`Servicio ${index + 1}`}
                      />
                    </label>

                    <label className="grid gap-2">
                      <span className="text-sm font-semibold">Descripción</span>
                      <input
                        value={service.description}
                        onChange={(event) =>
                          handleOfferedServiceChange(index, 'description', event.target.value)
                        }
                        className="rounded-xl border border-slate-300 px-4 py-3"
                        placeholder="Describe brevemente este servicio"
                      />
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {isPublicRegistration ? (
            <div className="md:col-span-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
              <div className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
                Contacto
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Comparte los canales por donde podamos ubicarte si tu perfil avanza en la
                revision.
              </p>
            </div>
          ) : null}

          <label className="grid gap-2">
            <span className="text-sm font-semibold">WhatsApp</span>
            <input
              value={form.whatsapp}
              onChange={(event) => handleFormChange('whatsapp', event.target.value)}
              className="rounded-xl border border-slate-300 px-4 py-3"
              placeholder="+51999999999"
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-semibold">Correo</span>
            <input
              value={form.email}
              onChange={(event) => handleFormChange('email', event.target.value)}
              className="rounded-xl border border-slate-300 px-4 py-3"
              placeholder="contacto@proveedor.com"
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-semibold">
              {isPublicRegistration ? 'Sitio web o red principal' : 'Website'}
            </span>
            <input
              value={form.website_url}
              onChange={(event) => handleFormChange('website_url', event.target.value)}
              className="rounded-xl border border-slate-300 px-4 py-3"
              placeholder="https://tu-sitio.com"
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-semibold">
              {isPublicRegistration ? 'Zona de cobertura' : 'Scope de ciudad'}
            </span>
            <input
              value={form.city_scope}
              onChange={(event) => handleFormChange('city_scope', event.target.value)}
              className="rounded-xl border border-slate-300 px-4 py-3"
              placeholder={isPublicRegistration ? 'Tacna, Arica, todo Tacna, etc.' : 'arica, tacna, all'}
            />
          </label>

          {mode === 'admin' ? (
            <label className="grid gap-2">
              <span className="text-sm font-semibold">Comision esperada</span>
              <input
                type="number"
                min="0"
                max="1"
                step="0.01"
                value={form.commission_rate}
                onChange={(event) => handleFormChange('commission_rate', event.target.value)}
                className="rounded-xl border border-slate-300 px-4 py-3"
              />
            </label>
          ) : null}

          {mode === 'admin' ? (
            <>
              <label className="grid gap-2">
                <span className="text-sm font-semibold">Prioridad comercial</span>
                <input
                  type="number"
                  min="0"
                  value={form.priority}
                  onChange={(event) => handleFormChange('priority', event.target.value)}
                  className="rounded-xl border border-slate-300 px-4 py-3"
                />
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-semibold">Score</span>
                <input
                  type="number"
                  min="0"
                  value={form.score}
                  onChange={(event) => handleFormChange('score', event.target.value)}
                  className="rounded-xl border border-slate-300 px-4 py-3"
                />
              </label>
            </>
          ) : (
            <div className="md:col-span-2 rounded-2xl border border-sky-200 bg-sky-50 px-4 py-4 text-sm text-sky-900">
              Tu postulacion sera revisada por el equipo de HolaTacna. Si tu perfil encaja con la
              red que estamos construyendo, nos pondremos en contacto contigo para continuar.
            </div>
          )}

          {mode === 'admin' ? (
            <>
              <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <input
                  type="checkbox"
                  checked={form.auto_assign}
                  onChange={(event) => handleFormChange('auto_assign', event.target.checked)}
                />
                <span className="font-semibold">Disponible para auto derivacion</span>
              </label>

              <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <input
                  type="checkbox"
                  checked={form.active}
                  onChange={(event) => handleFormChange('active', event.target.checked)}
                />
                <span className="font-semibold">Proveedor activo</span>
              </label>
            </>
          ) : (
            <div className="md:col-span-2 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-4 text-sm text-amber-900">
              Completar este formulario no implica incorporacion automatica. Primero revisaremos tu
              informacion y evaluaremos si hay encaje con la red de aliados de HolaTacna.
            </div>
          )}

          <label className="md:col-span-2 grid gap-2">
            <span className="text-sm font-semibold">
              {isPublicRegistration ? 'Descripcion de tu negocio o servicio' : 'Notas internas / descripcion'}
            </span>
            <textarea
              value={form.notes}
              onChange={(event) => handleFormChange('notes', event.target.value)}
              className="min-h-[120px] rounded-xl border border-slate-300 px-4 py-3"
              placeholder={
                isPublicRegistration
                  ? 'Cuentanos que servicio ofreces, en que zona trabajas, tus horarios y cualquier dato util para revisar tu postulacion.'
                  : 'Servicios, horarios, fortalezas, cobertura, observaciones...'
              }
            />
          </label>

          {isPublicRegistration ? (
            <label className="md:col-span-2 flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-4 text-sm text-emerald-950">
              <input
                type="checkbox"
                checked={form.accepts_terms}
                onChange={(event) => handleFormChange('accepts_terms', event.target.checked)}
                className="mt-1"
              />
              <span>
                Declaro que la informacion ingresada es real y autorizo a HolaTacna a revisarla para
                evaluar mi postulacion, contactarme y considerar una posible incorporacion a su red
                de aliados.
              </span>
            </label>
          ) : null}
        </div>

        <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-5">
          <div className="mb-4">
            <h3 className="text-xl font-bold">
              {isPublicRegistration ? 'Presencia visual' : 'Foto y preview'}
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              {isPublicRegistration
                ? 'Puedes compartir una foto o imagen representativa de tu negocio para que podamos identificar mejor tu perfil.'
                : 'Puedes pegar una URL o subir una imagen. La foto se guardara como `photo_url`.'}
            </p>
          </div>

          <div className="mb-4 flex h-56 items-center justify-center overflow-hidden rounded-[24px] bg-slate-200">
            {form.photo_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={form.photo_url} alt="Preview proveedor" className="h-full w-full object-cover" />
            ) : (
              <span className="text-sm font-semibold text-slate-500">Sin foto cargada</span>
            )}
          </div>

          <div className="grid gap-3">
            <input
              value={form.photo_url}
              onChange={(event) => handleFormChange('photo_url', event.target.value)}
              className="rounded-xl border border-slate-300 px-4 py-3"
              placeholder="https://... o data:image/..."
            />

            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="rounded-xl border border-slate-300 bg-white px-4 py-3"
            />

            <button
              onClick={submitProvider}
              disabled={saving}
              className="rounded-xl bg-slate-950 px-4 py-3 font-semibold text-white disabled:opacity-60"
            >
              {saving ? 'Guardando proveedor...' : submitLabel}
            </button>

            {feedback ? (
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-4 text-sm font-semibold leading-6 text-emerald-800">
                {feedback}
              </div>
            ) : null}

            {agreementDownloadUrl ? (
              <a
                href={agreementDownloadUrl}
                download={agreementFilename}
                className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-center font-semibold text-slate-900"
              >
                Descargar acuerdo preliminar
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}
