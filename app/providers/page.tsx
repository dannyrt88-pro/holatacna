'use client'

import { ChangeEvent, Suspense, useCallback, useEffect, useMemo, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import type { Provider } from '@/lib/crm-types'
import type { AppRole } from '@/lib/access-control'
import { services } from '@/lib/service-catalog'
import { ProviderOnboardingForm } from '@/components/forms/provider-onboarding-form'
import {
  buildProviderNotesWithServices,
  getEmptyProviderOfferedService,
  type ProviderOfferedService,
} from '@/lib/provider-form'

type ProviderEditableField =
  | 'name'
  | 'service_name'
  | 'service_slug'
  | 'whatsapp'
  | 'email'
  | 'website_url'
  | 'photo_url'
  | 'auto_assign'
  | 'is_active'
  | 'active'
  | 'notes'
  | 'priority'
  | 'commission_rate'
  | 'score'
  | 'city_scope'

type ProviderEditableValue = boolean | string | number

type ProviderFormState = {
  name: string
  service_name: string
  service_slug: string
  offered_services: ProviderOfferedService[]
  whatsapp: string
  email: string
  website_url: string
  photo_url: string
  commission_rate: string
  auto_assign: boolean
  active: boolean
  priority: string
  score: string
  city_scope: string
  notes: string
}

function getEmptyProviderForm(): ProviderFormState {
  return {
    name: '',
    service_name: '',
    service_slug: '',
    offered_services: [getEmptyProviderOfferedService()],
    whatsapp: '',
    email: '',
    website_url: '',
    photo_url: '',
    commission_rate: '0',
    auto_assign: false,
    active: true,
    priority: '0',
    score: '0',
    city_scope: '',
    notes: '',
  }
}

function ProvidersPageInner() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createClient()

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [providers, setProviders] = useState<Provider[]>([])
  const [role, setRole] = useState<AppRole>('none')
  const [form, setForm] = useState<ProviderFormState>(getEmptyProviderForm())
  const [editingId, setEditingId] = useState<string | null>(null)
  const isPublicRegistration = searchParams.get('register') === '1'
  const providerRegistrationLink = 'http://localhost:3000/providers?register=1'

  const serviceOptions = useMemo(
    () => services.map((service) => ({ slug: service.slug, name: service.name })),
    []
  )

  const loadProviders = useCallback(async () => {
    const { data, error } = await supabase
      .from('providers')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error(error)
      return
    }

    setProviders((data || []) as Provider[])
  }, [supabase])

  useEffect(() => {
    let active = true

    async function run() {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!active) return

      if (isPublicRegistration) {
        setLoading(false)
        return
      }

      if (!session) {
        router.push('/')
        return
      }

      const roleResponse = await fetch('/api/session-role')

      if (!roleResponse.ok) {
        router.push('/login?error=Sin+permisos')
        return
      }

      const roleData = (await roleResponse.json()) as { role: AppRole }

      if (roleData.role !== 'admin') {
        router.push('/dashboard')
        return
      }

      setRole(roleData.role)

      await loadProviders()

      if (active) {
        setLoading(false)
      }
    }

    void run()

    return () => {
      active = false
    }
  }, [isPublicRegistration, loadProviders, router, supabase])

  async function updateProvider(
    id: string,
    field: ProviderEditableField,
    value: ProviderEditableValue
  ) {
    if (role !== 'admin') return

    const payload =
      field === 'active'
        ? { active: value, is_active: value }
        : { [field]: value }

    const { error } = await supabase
      .from('providers')
      .update(payload)
      .eq('id', id)

    if (error) {
      console.error(error)
      alert('Error actualizando proveedor')
      return
    }

    setProviders((prev) =>
      prev.map((provider) =>
        provider.id === id
          ? field === 'active'
            ? { ...provider, active: Boolean(value), is_active: Boolean(value) }
            : { ...provider, [field]: value }
          : provider
      )
    )
  }

  function handleFormChange<K extends keyof ProviderFormState>(
    field: K,
    value: ProviderFormState[K]
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
        serviceIndex === index ? { ...service, [field]: value } : service
      ),
    }))
  }

  function addOfferedService() {
    setForm((prev) => ({
      ...prev,
      offered_services: [...prev.offered_services, getEmptyProviderOfferedService()],
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

  async function handlePhotoUpload(event: ChangeEvent<HTMLInputElement>) {
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

  async function createProvider() {
    if (role !== 'admin') return

    if (!form.name.trim()) {
      alert('Ingresa el nombre del proveedor')
      return
    }

    if (!form.service_name.trim()) {
      alert('Ingresa el servicio del proveedor')
      return
    }

    setSaving(true)

    const notes = buildProviderNotesWithServices(form.notes, form.offered_services)

    const response = await fetch('/api/session-role', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'provider-register',
        source: 'admin',
        name: form.name,
        service_name: form.service_name,
        service_slug: form.service_slug,
        whatsapp: form.whatsapp,
        email: form.email,
        website_url: form.website_url,
        photo_url: form.photo_url,
        commission_rate: Number(form.commission_rate || 0),
        auto_assign: form.auto_assign,
        active: form.active,
        is_active: form.active,
        priority: Number(form.priority || 0),
        score: Number(form.score || 0),
        city_scope: form.city_scope,
        notes,
      }),
    })

    const data = await response.json()

    setSaving(false)

    if (!response.ok) {
      console.error(data)
      alert(data.error || 'Error creando proveedor')
      return
    }

    if (data.provider) {
      setProviders((prev) => [data.provider as Provider, ...prev])
    }

    setForm(getEmptyProviderForm())
  }

  async function deleteProvider(id: string) {
    if (role !== 'admin') return

    const confirmed = window.confirm(
      'Esto eliminara el proveedor de forma permanente. Si tiene leads relacionados, la base puede bloquear la accion. Continuar?'
    )

    if (!confirmed) return

    const { error } = await supabase.from('providers').delete().eq('id', id)

    if (error) {
      console.error(error)
      alert('No se pudo eliminar el proveedor. Revisa si tiene leads vinculados.')
      return
    }

    setProviders((prev) => prev.filter((provider) => provider.id !== id))
  }

  function formatPercent(rate: number | null | undefined) {
    const value = Number(rate || 0)
    return `${(value * 100).toFixed(0)}%`
  }

  function getProviderActive(provider: Provider) {
    if (typeof provider.active === 'boolean') {
      return provider.active
    }

    if (typeof provider.is_active === 'boolean') {
      return provider.is_active
    }

    return true
  }

  if (loading) {
    return <p className="p-10">Cargando proveedores...</p>
  }

  if (isPublicRegistration) {
    return (
      <main className="min-h-screen bg-slate-100 px-6 py-10 text-slate-950">
        <div className="mx-auto max-w-6xl">
          <section className="mb-6 rounded-[28px] bg-slate-950 p-8 text-white shadow-xl">
            <div className="mb-3 inline-block rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em]">
              Registro externo
            </div>
            <h1 className="mb-2 text-4xl font-bold">Registro de proveedores HolaTacna</h1>
            <p className="max-w-3xl text-sm text-slate-200">
              Completa tu informacion comercial y operativa. El equipo de HolaTacna revisara el perfil, validara los
              datos y definira la activacion segun flujo interno, disponibilidad y calificacion del cliente.
            </p>
          </section>

          <ProviderOnboardingForm
            mode="provider-self-service"
            title="Completa tu perfil"
            description="Esta vista permite registrar nuevos proveedores sin acceso al listado interno ni a la relacion comercial actual. La prioridad y el score se definen internamente, no por el proveedor."
            submitLabel="Enviar registro formal"
            successMessage="Registro enviado. HolaTacna recibio tu informacion, revisara el perfil y dejo listo tu acuerdo preliminar descargable."
          />
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-10 text-slate-950">
      <div className="mx-auto max-w-7xl">
        <section className="mb-6 rounded-[28px] bg-slate-950 p-8 text-white shadow-xl">
          <div className="mb-3 inline-block rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em]">
            Operacion de proveedores
          </div>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="mb-2 text-4xl font-bold">Panel de Proveedores</h1>
              <p className="max-w-2xl text-sm text-slate-200">
                Crea proveedores nuevos, carga foto, datos de contacto y ajusta las
                reglas de derivacion automatica desde una sola pantalla.
              </p>
            </div>

            <button
              onClick={() => router.push('/dashboard')}
              className="rounded-xl bg-white px-4 py-3 font-semibold text-slate-950"
            >
              Volver al dashboard
            </button>
          </div>
        </section>

        <section className="mb-6 rounded-[28px] bg-white p-6 shadow-lg">
          <div className="mb-5">
            <div className="mb-2 inline-block rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-emerald-700">
              Onboarding externo
            </div>
            <h2 className="text-2xl font-bold">Link y QR para proveedores</h2>
            <p className="mt-2 text-sm text-slate-600">
              Comparte este acceso para que el proveedor complete su perfil sin ver el listado interno.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div className="grid gap-3">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
                <div className="mb-2 text-sm font-semibold text-slate-700">Link directo</div>
                <div className="break-all rounded-xl bg-white px-4 py-3 font-mono text-sm text-slate-900">
                  {providerRegistrationLink}
                </div>
              </div>

              <button
                onClick={() => navigator.clipboard.writeText(providerRegistrationLink)}
                className="w-fit rounded-xl bg-slate-950 px-4 py-3 font-semibold text-white"
              >
                Copiar link
              </button>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <div className="mb-3 text-sm font-semibold text-slate-700">QR de registro</div>
              <div className="flex items-center justify-center rounded-2xl bg-white p-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/qr-provider-register.svg"
                  alt="QR registro de proveedores"
                  className="h-56 w-56 object-contain"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="mb-6 rounded-[28px] bg-white p-6 shadow-lg">
          <div className="mb-6">
            <div className="mb-2 inline-block rounded-full bg-sky-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-sky-700">
              Nuevo proveedor
            </div>
            <h2 className="text-2xl font-bold">Alta y perfil comercial</h2>
          </div>

          <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="grid gap-4 md:grid-cols-2">
              <label className="grid gap-2">
                <span className="text-sm font-semibold">Nombre</span>
                <input
                  value={form.name}
                  onChange={(event) => handleFormChange('name', event.target.value)}
                  className="rounded-xl border border-slate-300 px-4 py-3"
                  placeholder="Clinica o proveedor"
                />
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-semibold">Servicio</span>
                <input
                  value={form.service_name}
                  onChange={(event) => handleFormChange('service_name', event.target.value)}
                  className="rounded-xl border border-slate-300 px-4 py-3"
                  placeholder="Implantes Dentales"
                />
              </label>

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

              <div className="md:col-span-2 grid gap-4 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="text-sm font-semibold text-slate-900">Servicios que brinda</div>
                    <div className="text-sm text-slate-600">
                      Habilita los servicios que ofrece el proveedor, agrega nombre y descripción,
                      y suma más filas si maneja varias líneas de servicio.
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
                    <div
                      key={`admin-offered-service-${index}`}
                      className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4"
                    >
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
                          <div className="flex items-center gap-3">
                            <input
                              type="checkbox"
                              checked={service.enabled}
                              onChange={(event) =>
                                handleOfferedServiceChange(index, 'enabled', event.target.checked)
                              }
                            />
                            <input
                              value={service.name}
                              onChange={(event) =>
                                handleOfferedServiceChange(index, 'name', event.target.value)
                              }
                              className="w-full rounded-xl border border-slate-300 px-4 py-3"
                              placeholder={`Servicio ${index + 1}`}
                              disabled={!service.enabled}
                            />
                          </div>
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
                            disabled={!service.enabled}
                          />
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

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
                <span className="text-sm font-semibold">Website</span>
                <input
                  value={form.website_url}
                  onChange={(event) => handleFormChange('website_url', event.target.value)}
                  className="rounded-xl border border-slate-300 px-4 py-3"
                  placeholder="https://proveedor.com"
                />
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-semibold">Scope de ciudad</span>
                <input
                  value={form.city_scope}
                  onChange={(event) => handleFormChange('city_scope', event.target.value)}
                  className="rounded-xl border border-slate-300 px-4 py-3"
                  placeholder="arica, tacna, all"
                />
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-semibold">Comision</span>
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

              <label className="grid gap-2">
                <span className="text-sm font-semibold">Prioridad</span>
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

              <label className="md:col-span-2 grid gap-2">
                <span className="text-sm font-semibold">Notas internas</span>
                <textarea
                  value={form.notes}
                  onChange={(event) => handleFormChange('notes', event.target.value)}
                  className="min-h-[120px] rounded-xl border border-slate-300 px-4 py-3"
                  placeholder="Observaciones, horarios, fortalezas, restricciones..."
                />
              </label>
            </div>

            <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-5">
              <div className="mb-4">
                <h3 className="text-xl font-bold">Foto y preview</h3>
                <p className="mt-1 text-sm text-slate-600">
                  Puedes pegar una URL o subir una imagen. La foto se guardara en la tabla
                  como `photo_url`.
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
                  onClick={createProvider}
                  disabled={saving}
                  className="rounded-xl bg-slate-950 px-4 py-3 font-semibold text-white disabled:opacity-60"
                >
                  {saving ? 'Guardando proveedor...' : 'Crear proveedor'}
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="overflow-hidden rounded-[28px] bg-white shadow-lg">
          <div className="border-b border-slate-200 px-6 py-5">
            <h2 className="text-2xl font-bold">Proveedores actuales</h2>
            <p className="mt-1 text-sm text-slate-600">
              Edicion inline de todos los campos operativos y de perfil. Solo los proveedores activos aparecen en las
              opciones del dashboard para asignacion.
            </p>
          </div>

          <div className="overflow-x-auto px-6 py-6">
            <table className="min-w-[1820px] border-collapse text-sm">
              <thead>
                <tr className="bg-sky-50 text-left text-xs uppercase tracking-[0.12em] text-sky-900">
                  <th className="border-b border-sky-100 px-3 py-3">Foto</th>
                  <th className="border-b border-sky-100 px-3 py-3">Nombre</th>
                  <th className="border-b border-sky-100 px-3 py-3">Servicio</th>
                  <th className="border-b border-sky-100 px-3 py-3">Slug</th>
                  <th className="border-b border-sky-100 px-3 py-3">WhatsApp</th>
                  <th className="border-b border-sky-100 px-3 py-3">Correo</th>
                  <th className="border-b border-sky-100 px-3 py-3">Website</th>
                  <th className="border-b border-sky-100 px-3 py-3">Ciudad scope</th>
                  <th className="border-b border-sky-100 px-3 py-3">Prioridad</th>
                  <th className="border-b border-sky-100 px-3 py-3">Score</th>
                  <th className="border-b border-sky-100 px-3 py-3">Comision</th>
                  <th className="border-b border-sky-100 px-3 py-3">Auto</th>
                  <th className="border-b border-sky-100 px-3 py-3">Activo en dashboard</th>
                  <th className="border-b border-sky-100 px-3 py-3">Notas</th>
                  <th className="border-b border-sky-100 px-3 py-3">Acciones</th>
                </tr>
              </thead>

              <tbody>
                {providers.map((provider) => {
                  const isEditing = editingId === provider.id

                  return (
                  <tr key={provider.id} className="align-top even:bg-slate-50">
                    <td className="border-b border-slate-200 px-3 py-3">
                      <div className="grid gap-2">
                        <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl bg-slate-200">
                          {provider.photo_url ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={provider.photo_url} alt={provider.name} className="h-full w-full object-cover" />
                          ) : (
                            <span className="text-[10px] font-semibold text-slate-500">Sin foto</span>
                          )}
                        </div>
                        <input
                          type="text"
                          value={provider.photo_url || ''}
                          disabled={!isEditing}
                          onChange={(event) => updateProvider(provider.id, 'photo_url', event.target.value)}
                          className="w-48 rounded-lg border border-slate-300 px-3 py-2 disabled:cursor-not-allowed disabled:bg-slate-100"
                          placeholder="URL foto"
                        />
                      </div>
                    </td>
                    <td className="border-b border-slate-200 px-3 py-3">
                      <input
                        type="text"
                        value={provider.name}
                        disabled={!isEditing}
                        onChange={(event) => updateProvider(provider.id, 'name', event.target.value)}
                        className="w-44 rounded-lg border border-slate-300 px-3 py-2 disabled:cursor-not-allowed disabled:bg-slate-100"
                      />
                    </td>
                    <td className="border-b border-slate-200 px-3 py-3">
                      <input
                        type="text"
                        value={provider.service_name || ''}
                        disabled={!isEditing}
                        onChange={(event) => updateProvider(provider.id, 'service_name', event.target.value)}
                        className="w-44 rounded-lg border border-slate-300 px-3 py-2 disabled:cursor-not-allowed disabled:bg-slate-100"
                      />
                    </td>
                    <td className="border-b border-slate-200 px-3 py-3">
                      <input
                        type="text"
                        value={provider.service_slug || ''}
                        disabled={!isEditing}
                        onChange={(event) => updateProvider(provider.id, 'service_slug', event.target.value)}
                        className="w-40 rounded-lg border border-slate-300 px-3 py-2 disabled:cursor-not-allowed disabled:bg-slate-100"
                      />
                    </td>
                    <td className="border-b border-slate-200 px-3 py-3">
                      <input
                        type="text"
                        value={provider.whatsapp || ''}
                        disabled={!isEditing}
                        onChange={(event) => updateProvider(provider.id, 'whatsapp', event.target.value)}
                        className="w-40 rounded-lg border border-slate-300 px-3 py-2 disabled:cursor-not-allowed disabled:bg-slate-100"
                      />
                    </td>
                    <td className="border-b border-slate-200 px-3 py-3">
                      <input
                        type="email"
                        value={provider.email || ''}
                        disabled={!isEditing}
                        onChange={(event) => updateProvider(provider.id, 'email', event.target.value)}
                        className="w-52 rounded-lg border border-slate-300 px-3 py-2 disabled:cursor-not-allowed disabled:bg-slate-100"
                      />
                    </td>
                    <td className="border-b border-slate-200 px-3 py-3">
                      <input
                        type="text"
                        value={provider.website_url || ''}
                        disabled={!isEditing}
                        onChange={(event) => updateProvider(provider.id, 'website_url', event.target.value)}
                        className="w-52 rounded-lg border border-slate-300 px-3 py-2 disabled:cursor-not-allowed disabled:bg-slate-100"
                      />
                    </td>
                    <td className="border-b border-slate-200 px-3 py-3">
                      <input
                        type="text"
                        value={provider.city_scope || ''}
                        disabled={!isEditing}
                        onChange={(event) => updateProvider(provider.id, 'city_scope', event.target.value)}
                        className="w-36 rounded-lg border border-slate-300 px-3 py-2 disabled:cursor-not-allowed disabled:bg-slate-100"
                      />
                    </td>
                    <td className="border-b border-slate-200 px-3 py-3">
                      <input
                        type="number"
                        value={provider.priority ?? 0}
                        disabled={!isEditing}
                        onChange={(event) => updateProvider(provider.id, 'priority', Number(event.target.value))}
                        className="w-24 rounded-lg border border-slate-300 px-3 py-2 disabled:cursor-not-allowed disabled:bg-slate-100"
                      />
                    </td>
                    <td className="border-b border-slate-200 px-3 py-3">
                      <input
                        type="number"
                        value={provider.score ?? 0}
                        disabled={!isEditing}
                        onChange={(event) => updateProvider(provider.id, 'score', Number(event.target.value))}
                        className="w-24 rounded-lg border border-slate-300 px-3 py-2 disabled:cursor-not-allowed disabled:bg-slate-100"
                      />
                    </td>
                    <td className="border-b border-slate-200 px-3 py-3">
                      <div className="grid gap-2">
                        <span className="font-semibold">{formatPercent(provider.commission_rate)}</span>
                        <input
                          type="number"
                          min="0"
                          max="1"
                          step="0.01"
                          value={provider.commission_rate ?? 0}
                          disabled={!isEditing}
                          onChange={(event) =>
                            updateProvider(provider.id, 'commission_rate', Number(event.target.value))
                          }
                          className="w-24 rounded-lg border border-slate-300 px-3 py-2 disabled:cursor-not-allowed disabled:bg-slate-100"
                        />
                      </div>
                    </td>
                    <td className="border-b border-slate-200 px-3 py-3">
                      <input
                        type="checkbox"
                        checked={!!provider.auto_assign}
                        disabled={!isEditing}
                        onChange={(event) => updateProvider(provider.id, 'auto_assign', event.target.checked)}
                      />
                    </td>
                    <td className="border-b border-slate-200 px-3 py-3">
                      <label className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2">
                        <input
                          type="checkbox"
                          checked={getProviderActive(provider)}
                          disabled={!isEditing}
                          onChange={(event) => updateProvider(provider.id, 'active', event.target.checked)}
                        />
                        <span className="font-semibold">{getProviderActive(provider) ? 'Activo' : 'Inactivo'}</span>
                      </label>
                    </td>
                    <td className="border-b border-slate-200 px-3 py-3">
                      <textarea
                        value={provider.notes || ''}
                        disabled={!isEditing}
                        onChange={(event) => updateProvider(provider.id, 'notes', event.target.value)}
                        className="min-h-[88px] w-56 rounded-lg border border-slate-300 px-3 py-2 disabled:cursor-not-allowed disabled:bg-slate-100"
                        placeholder="Notas internas"
                      />
                    </td>
                    <td className="border-b border-slate-200 px-3 py-3">
                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => setEditingId(isEditing ? null : provider.id)}
                          className={`rounded-lg px-3 py-2 font-semibold transition ${
                            isEditing
                              ? 'bg-slate-900 text-white hover:bg-slate-800'
                              : 'bg-sky-50 text-sky-700 hover:bg-sky-100'
                          }`}
                        >
                          {isEditing ? 'Cerrar edicion' : 'Editar'}
                        </button>
                        <button
                          onClick={() => deleteProvider(provider.id)}
                          className="rounded-lg bg-rose-50 px-3 py-2 font-semibold text-rose-700 transition hover:bg-rose-100"
                        >
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                )})}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  )
}

export default function ProvidersPage() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-slate-100 p-10 text-slate-950">Cargando proveedores...</main>}>
      <ProvidersPageInner />
    </Suspense>
  )
}
