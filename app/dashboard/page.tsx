'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import type { Lead, LeadStatus, Provider } from '@/lib/crm-types'
import type { AppRole } from '@/lib/access-control'
import { calculateLeadScore } from '@/lib/lead-scoring'
import { getPackageBySlug } from '@/lib/package-catalog'
import { parseProviderOfferedServicesFromNotes } from '@/lib/provider-form'
import {
  buildInitialPatientWhatsAppMessage,
  buildProviderRoutingWhatsAppMessage,
} from '@/lib/whatsapp-messages'

export default function Dashboard() {
  const router = useRouter()
  const supabase = createClient()
  const topScrollRef = useRef<HTMLDivElement | null>(null)
  const bottomScrollRef = useRef<HTMLDivElement | null>(null)
  const syncingScrollRef = useRef<'top' | 'bottom' | null>(null)

  const [leads, setLeads] = useState<Lead[]>([])
  const [filtered, setFiltered] = useState<Lead[]>([])
  const [providers, setProviders] = useState<Provider[]>([])
  const [selectedProviderServices, setSelectedProviderServices] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)
  const [role, setRole] = useState<AppRole>('none')
  const [currentEmail, setCurrentEmail] = useState('')
  const [selectedTestLeadIds, setSelectedTestLeadIds] = useState<string[]>([])

  const [search, setSearch] = useState('')
  const [serviceFilter, setServiceFilter] = useState('')
  const [cityFilter, setCityFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [premiumOnly, setPremiumOnly] = useState(false)

  const [todayLeads, setTodayLeads] = useState(0)
  const [contacted, setContacted] = useState(0)
  const [sold, setSold] = useState(0)
  const [lost, setLost] = useState(0)
  const [revenuePen, setRevenuePen] = useState(0)
  const [commissionsPen, setCommissionsPen] = useState(0)
  const isCleanupOwner = currentEmail === 'danny.rt88@gmail.com'

  const CLP_PER_PEN = 260
  const DASHBOARD_TIME_ZONE = 'America/Lima'

  const checkSession = useCallback(async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      router.push('/')
    }
  }, [router, supabase])

  const loadProviders = useCallback(async () => {
    const { data, error } = await supabase.from('providers').select('*').order('name', { ascending: true })

    if (!error && data) {
      setProviders(
        (data as Provider[]).filter((provider) => {
          if (typeof provider.active === 'boolean') {
            return provider.active
          }

          if (typeof provider.is_active === 'boolean') {
            return provider.is_active
          }

          return true
        })
      )
    }
  }, [supabase])

  const loadLeads = useCallback(async () => {
    const { data, error } = await supabase.from('leads').select('*').order('created_at', { ascending: false })

    if (!data || error) {
      setLoading(false)
      return
    }

    const typedLeads = data as Lead[]
    setLeads(typedLeads)

    const today = getDateKey(new Date())

    let todayCount = 0
    let contactCount = 0
    let soldCount = 0
    let lostCount = 0
    let totalRevenue = 0
    let totalCommissions = 0

    typedLeads.forEach((lead) => {
      const created = getDateKey(lead.created_at)

      if (created === today) {
        todayCount++
      }

      if (lead.status === 'contactado') {
        contactCount++
      }

      if (lead.status === 'vendido') {
        soldCount++

        if (lead.treatment_value) {
          totalRevenue += Number(lead.treatment_value)
        }

        if (lead.commission_amount) {
          totalCommissions += Number(lead.commission_amount)
        }
      }

      if (lead.status === 'descartado') {
        lostCount++
      }
    })

    setTodayLeads(todayCount)
    setContacted(contactCount)
    setSold(soldCount)
    setLost(lostCount)
    setRevenuePen(totalRevenue)
    setCommissionsPen(totalCommissions)
    setLoading(false)
  }, [supabase])

  const isChileanLead = useCallback((phone: string) => {
    if (!phone) return false
    return phone.startsWith('+56') || phone.startsWith('56')
  }, [])

  const getLeadScoring = useCallback((lead: Lead) => {
    if (typeof lead.lead_score === 'number' && typeof lead.lead_priority === 'string' && lead.lead_priority) {
      return {
        score: lead.lead_score,
        priority: lead.lead_priority,
      }
    }

    return calculateLeadScore({
      tourist_phone: lead.tourist_phone,
      service_name: lead.service_name,
      city_interest: lead.city_interest,
      message: lead.message,
      direct_mode: lead.direct_mode,
    })
  }, [])

  const getLeadPriority = useCallback(
    (lead: Lead) => {
      return getLeadScoring(lead).priority
    },
    [getLeadScoring]
  )

  const applyFilters = useCallback(() => {
    let temp = [...leads]

    if (search) {
      temp = temp.filter(
        (lead) =>
          (lead.name || '').toLowerCase().includes(search.toLowerCase()) ||
          (lead.tourist_phone || '').includes(search) ||
          (lead.reference_code || '').toLowerCase().includes(search.toLowerCase())
      )
    }

    if (serviceFilter) {
      temp = temp.filter((lead) => lead.service_name === serviceFilter)
    }

    if (cityFilter) {
      temp = temp.filter((lead) => lead.city_interest === cityFilter)
    }

    if (statusFilter) {
      temp = temp.filter((lead) => lead.status === statusFilter)
    }

    if (dateFrom) {
      temp = temp.filter((lead) => {
        const created = getDateKey(lead.created_at)
        return created ? created >= dateFrom : false
      })
    }

    if (dateTo) {
      temp = temp.filter((lead) => {
        const created = getDateKey(lead.created_at)
        return created ? created <= dateTo : false
      })
    }

    if (premiumOnly) {
      temp = temp.filter((lead) => getLeadPriority(lead) === 'Alta')
    }

    setFiltered(temp)
  }, [cityFilter, dateFrom, dateTo, getLeadPriority, leads, premiumOnly, search, serviceFilter, statusFilter])

  const init = useCallback(async () => {
    await checkSession()
    const roleResponse = await fetch('/api/session-role')

    if (!roleResponse.ok) {
      router.push('/login?error=Sin+permisos')
      return
    }

    const roleData = (await roleResponse.json()) as { role: AppRole; email?: string }
    setRole(roleData.role)
    setCurrentEmail((roleData.email || '').trim().toLowerCase())

    await Promise.all([loadLeads(), loadProviders()])
  }, [checkSession, loadLeads, loadProviders, router])

  useEffect(() => {
    init()
  }, [init])

  useEffect(() => {
    applyFilters()
  }, [applyFilters])

  function getCountryFlag(phone: string) {
    if (!phone) return ''
    if (phone.startsWith('+56') || phone.startsWith('56')) return 'CL'
    if (phone.startsWith('+51') || phone.startsWith('51')) return 'PE'
    return ''
  }

  function formatPen(value: number | string | null | undefined) {
    const amount = Number(value || 0)
    return `S/ ${amount.toFixed(2)}`
  }

  function formatClpReferenceFromPen(value: number | string | null | undefined) {
    const amountPen = Number(value || 0)
    const amountClp = amountPen * CLP_PER_PEN
    return `CLP ${Math.round(amountClp).toLocaleString()}`
  }

  function getDateParts(value: string | Date) {
    const parsed = parseDashboardTimestamp(value)

    if (Number.isNaN(parsed.getTime())) return null

    const formatter = new Intl.DateTimeFormat('en-CA', {
      timeZone: DASHBOARD_TIME_ZONE,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })

    const parts = formatter.formatToParts(parsed)
    const year = parts.find((part) => part.type === 'year')?.value
    const month = parts.find((part) => part.type === 'month')?.value
    const day = parts.find((part) => part.type === 'day')?.value

    if (!year || !month || !day) return null

    return { year, month, day }
  }

  function getDateKey(value: string | Date | null | undefined) {
    if (!value) return null

    const parts = getDateParts(value)

    if (!parts) return null

    return `${parts.year}-${parts.month}-${parts.day}`
  }

  function formatDateTime(value: string | null | undefined) {
    if (!value) return '-'

    const parsed = parseDashboardTimestamp(value)

    if (Number.isNaN(parsed.getTime())) return '-'

    return parsed.toLocaleString('es-PE', {
      timeZone: DASHBOARD_TIME_ZONE,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    })
  }

  function parseDashboardTimestamp(value: string | Date) {
    if (value instanceof Date) return value

    const normalizedValue =
      typeof value === 'string' && !/[zZ]|[+-]\d{2}:\d{2}$/.test(value) ? `${value}+00:00` : value

    return new Date(normalizedValue)
  }

  function getDerivationLabel(type: string | null | undefined) {
    switch (type) {
      case 'whatsapp_interno':
        return 'WhatsApp interno'
      case 'proveedor_directo':
        return 'Directo al proveedor'
      case 'proveedor_manual':
        return 'Proveedor asignado'
      default:
        return '-'
    }
  }

  async function persistLeadTracking(id: string, payload: Partial<Lead>) {
    const { error } = await supabase.from('leads').update(payload).eq('id', id)

    if (error) {
      console.error('Error actualizando trazabilidad del lead:', error)
    }
  }

  async function assignProvider(leadId: string, providerId: string) {
    if (role !== 'admin') return

    if (!providerId) {
      const { error } = await supabase
        .from('leads')
        .update({
          provider_id: null,
          provider_phone: null,
          commission_rate: 0,
        })
        .eq('id', leadId)

      if (error) {
        alert('Error limpiando proveedor')
        return
      }

      setSelectedProviderServices((prev) => {
        const next = { ...prev }
        Object.keys(next).forEach((key) => {
          if (key.startsWith(`${leadId}:`)) {
            delete next[key]
          }
        })
        return next
      })

      await loadLeads()
      return
    }

    const provider = providers.find((candidate) => candidate.id === providerId)

    if (!provider) return

    const { error } = await supabase
      .from('leads')
      .update({
        provider_id: provider.id,
        provider_phone: provider.whatsapp,
        commission_rate: provider.commission_rate,
      })
      .eq('id', leadId)

    if (error) {
      alert('Error asignando proveedor')
      return
    }

    await loadLeads()
  }

  async function assignDirectProviders(leadId: string, providerIds: string[]) {
    if (role !== 'admin') return

    const { error } = await supabase
      .from('leads')
      .update({
        direct_provider_ids: providerIds,
      })
      .eq('id', leadId)

    if (error) {
      alert('Error asignando proveedores directos')
      return
    }

    await loadLeads()
  }

  function toggleDirectProviderSelection(lead: Lead, providerId: string, checked: boolean) {
    const selected = new Set(lead.direct_provider_ids || [])

    if (checked) {
      selected.add(providerId)
    } else {
      selected.delete(providerId)
    }

    void assignDirectProviders(lead.id, Array.from(selected))

    if (!checked) {
      setSelectedProviderServices((prev) => {
        const next = { ...prev }
        delete next[`${lead.id}:${providerId}`]
        return next
      })
    }
  }

  function getProviderServiceOptions(provider: Provider) {
    const services = parseProviderOfferedServicesFromNotes(provider.notes)
    const primaryService = provider.service_name?.trim()

    if (primaryService && !services.some((service) => service.name === primaryService)) {
      return [{ name: primaryService, description: '' }, ...services]
    }

    return services
  }

  function getProviderServiceSelectionKey(leadId: string, providerId: string) {
    return `${leadId}:${providerId}`
  }

  function getSelectedProviderService(leadId: string, providerId: string) {
    return selectedProviderServices[getProviderServiceSelectionKey(leadId, providerId)] || ''
  }

  function updateSelectedProviderService(leadId: string, providerId: string, serviceName: string) {
    setSelectedProviderServices((prev) => ({
      ...prev,
      [getProviderServiceSelectionKey(leadId, providerId)]: serviceName,
    }))
  }

  async function toggleDirectMode(leadId: string, checked: boolean) {
    if (role !== 'admin') return

    const { error } = await supabase
      .from('leads')
      .update({
        direct_mode: checked,
      })
      .eq('id', leadId)

    if (error) {
      alert('Error actualizando modo')
      return
    }

    setLeads((prev) => prev.map((lead) => (lead.id === leadId ? { ...lead, direct_mode: checked } : lead)))

    if (checked) {
      const lead = leads.find((item) => item.id === leadId)
      const provider = providers.find((item) => item.id === lead?.provider_id)

      if (lead) {
        try {
          await fetch('/api/telegram/direct-confirmation', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              reference_code: lead.reference_code,
              name: lead.name,
              tourist_phone: lead.tourist_phone,
              service_name: lead.service_name,
              city_interest: lead.city_interest,
              landing_path: lead.landing_path,
              provider_name: provider?.name || null,
              provider_phone: lead.provider_phone || provider?.whatsapp || null,
            }),
          })
        } catch (telegramError) {
          console.error('Error notificando modo directo en Telegram:', telegramError)
        }
      }
    }
  }

  async function updateStatus(id: string, status: LeadStatus) {
    if (role !== 'admin') return

    const lead = leads.find((item) => item.id === id)

    if (!lead) return

    let treatmentValue = lead.treatment_value || null
    const commissionRate = Number(lead.commission_rate || 0)
    let commissionAmount = Number(lead.commission_amount || 0)

    if (status === 'vendido') {
      const input = prompt('Valor del tratamiento en soles (PEN)')

      if (!input) return

      treatmentValue = parseFloat(input)

      if (Number.isNaN(treatmentValue)) {
        alert('Valor invalido')
        return
      }

      commissionAmount = treatmentValue * commissionRate
    }

    const managementAt = new Date().toISOString()
    const payload: Partial<Lead> = {
      status,
      last_status_at: managementAt,
    }

    if (!lead.attended_at && status !== 'pending' && status !== 'descartado') {
      payload.attended_at = managementAt
    }

    if (status === 'vendido') {
      payload.treatment_value = treatmentValue
      payload.commission_amount = commissionAmount
    }

    const { error } = await supabase.from('leads').update(payload).eq('id', id)

    if (error) {
      console.error(error)
      alert('Error actualizando lead')
      return
    }

    await loadLeads()
  }

  async function cleanupTestLeads() {
    if (role !== 'admin' || currentEmail !== 'danny.rt88@gmail.com') return

    if (selectedTestLeadIds.length === 0) {
      alert('Selecciona al menos un lead de prueba para eliminar')
      return
    }

    const confirmed = window.confirm(
      `Esto eliminara ${selectedTestLeadIds.length} lead(s) de prueba seleccionados. Continuar?`
    )

    if (!confirmed) return

    const response = await fetch('/api/admin/cleanup-test-leads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        lead_ids: selectedTestLeadIds,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      alert(data.error || 'Error eliminando leads de prueba')
      return
    }

    alert(`Leads de prueba eliminados: ${data.deleted}`)
    setSelectedTestLeadIds([])
    await loadLeads()
  }

  function isTestLeadSelected(leadId: string) {
    return selectedTestLeadIds.includes(leadId)
  }

  function toggleTestLeadSelection(leadId: string, checked: boolean) {
    setSelectedTestLeadIds((prev) =>
      checked ? [...new Set([...prev, leadId])] : prev.filter((id) => id !== leadId)
    )
  }

  function toggleVisibleTestLeads(checked: boolean) {
    const visibleLeadIds = filtered.map((lead) => lead.id)

    setSelectedTestLeadIds((prev) => {
      if (checked) {
        return [...new Set([...prev, ...visibleLeadIds])]
      }

      return prev.filter((id) => !visibleLeadIds.includes(id))
    })
  }

  const selectableVisibleLeadCount = filtered.length

  function openWhatsApp(lead: Lead) {
    const phone = lead.tourist_phone
    const message = buildInitialPatientWhatsAppMessage({
      referenceCode: lead.reference_code,
      serviceName: lead.service_name,
      suggestedPackageSlug: lead.suggested_package_slug,
    })
    const cleanPhone = String(phone || '').replace(/\D/g, '')
    const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`

    const managementAt = new Date().toISOString()
    void persistLeadTracking(lead.id, {
      attended_at: lead.attended_at || managementAt,
      derivation_type: 'whatsapp_interno',
      derivation_at: managementAt,
    })

    window.open(url, '_blank')
  }

  function sendToProvider(lead: Lead) {
    if (role !== 'admin') return

    const directProviders = providers.filter((provider) => (lead.direct_provider_ids || []).includes(provider.id))

    if (directProviders.length > 0) {
      const managementAt = new Date().toISOString()

      void persistLeadTracking(lead.id, {
        attended_at: lead.attended_at || managementAt,
        derivation_type: lead.direct_mode ? 'proveedor_directo' : 'proveedor_manual',
        derivation_at: managementAt,
      })

      directProviders.forEach((provider, index) => {
        const selectedProviderService = getSelectedProviderService(lead.id, provider.id)
        const message = buildProviderRoutingWhatsAppMessage({
          name: lead.name,
          touristPhone: lead.tourist_phone,
          serviceName: lead.service_name,
          providerServiceName: selectedProviderService || null,
          referenceCode: lead.reference_code,
          cityInterest: lead.city_interest,
          suggestedPackageSlug: lead.suggested_package_slug,
        })
        const cleanPhone = String(provider.whatsapp || '').replace(/\D/g, '')
        if (!cleanPhone) return

        window.setTimeout(() => {
          window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`, '_blank')
        }, index * 250)
      })
      return
    }

    if (!lead.provider_phone) {
      alert('Este lead no tiene proveedor asignado')
      return
    }

    const managementAt = new Date().toISOString()
    const selectedProviderService = lead.provider_id
      ? getSelectedProviderService(lead.id, lead.provider_id)
      : ''

    void persistLeadTracking(lead.id, {
      attended_at: lead.attended_at || managementAt,
      derivation_type: lead.direct_mode ? 'proveedor_directo' : 'proveedor_manual',
      derivation_at: managementAt,
    })

    const message = buildProviderRoutingWhatsAppMessage({
      name: lead.name,
      touristPhone: lead.tourist_phone,
      serviceName: lead.service_name,
      providerServiceName: selectedProviderService || null,
      referenceCode: lead.reference_code,
      cityInterest: lead.city_interest,
      suggestedPackageSlug: lead.suggested_package_slug,
    })
    const cleanPhone = String(lead.provider_phone).replace(/\D/g, '')
    const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`
    window.open(url, '_blank')
  }

  function canSendDirect(lead: Lead) {
    return !!lead.provider_phone || Boolean(lead.direct_provider_ids?.length)
  }

  function getLeadMode(lead: Lead) {
    return lead.direct_mode ? 'Directo' : 'Manual'
  }

  function getLeadAssignment(lead: Lead) {
    return lead.direct_mode ? 'directa' : 'manual'
  }

  function getSelectedDirectProviders(lead: Lead) {
    return providers.filter((provider) => (lead.direct_provider_ids || []).includes(provider.id))
  }

  function syncScroll(source: 'top' | 'bottom') {
    const top = topScrollRef.current
    const bottom = bottomScrollRef.current

    if (!top || !bottom) return

    if (syncingScrollRef.current && syncingScrollRef.current !== source) {
      syncingScrollRef.current = null
      return
    }

    syncingScrollRef.current = source

    if (source === 'top') {
      bottom.scrollLeft = top.scrollLeft
    } else {
      top.scrollLeft = bottom.scrollLeft
    }
  }

  function getPriorityStyle(priority: string): CSSProperties {
    if (priority === 'Alta') return priorityPillStyles.high
    if (priority === 'Media') return priorityPillStyles.medium
    return priorityPillStyles.normal
  }

  function getStatusStyle(status: string | null | undefined): CSSProperties {
    switch (status) {
      case 'contactado':
        return statusPillStyles.contactado
      case 'evaluacion':
        return statusPillStyles.evaluacion
      case 'cotizado':
        return statusPillStyles.cotizado
      case 'reservado':
        return statusPillStyles.reservado
      case 'vendido':
        return statusPillStyles.vendido
      case 'descartado':
        return statusPillStyles.descartado
      default:
        return statusPillStyles.pending
    }
  }

  const services = useMemo(() => {
    return [...new Set(leads.map((lead) => lead.service_name).filter(Boolean))] as string[]
  }, [leads])

  const cities = useMemo(() => {
    return [...new Set(leads.map((lead) => lead.city_interest).filter(Boolean))] as string[]
  }, [leads])

  const summaryCards = [
    { label: 'Leads hoy', value: String(todayLeads), accent: '#0f766e' },
    { label: 'Contactados', value: String(contacted), accent: '#1d4ed8' },
    { label: 'Vendidos', value: String(sold), accent: '#166534' },
    { label: 'Perdidos', value: String(lost), accent: '#991b1b' },
    {
      label: 'Ingresos',
      value: formatPen(revenuePen),
      subvalue: `Ref. ${formatClpReferenceFromPen(revenuePen)}`,
      accent: '#7c3aed',
    },
    {
      label: 'Comisiones HolaTacna',
      value: formatPen(commissionsPen),
      subvalue: `Ref. ${formatClpReferenceFromPen(commissionsPen)}`,
      accent: '#b45309',
    },
  ]

  if (loading) {
    return (
      <div style={loadingShellStyle}>
        <div style={loadingCardStyle}>Cargando dashboard...</div>
      </div>
    )
  }

  return (
    <main style={pageStyle}>
      <section style={heroSectionStyle}>
        <div style={heroGlowStyle} />

        <div style={containerStyle}>
          <div style={heroCardStyle}>
            <div style={heroHeaderRowStyle}>
              <div>
                <div style={eyebrowStyle}>CRM operativo</div>
                <h1 style={heroTitleStyle}>Dashboard HolaTacna</h1>
                <p style={heroCopyStyle}>
                  Gestiona leads, prioriza casos premium desde Chile y decide el paso directo solo cuando corresponda.
                </p>
                <div style={roleBadgeStyle}>
                  Rol actual: {role === 'admin' ? 'admin' : role === 'monitor' ? 'monitor' : 'sin acceso'}
                </div>
              </div>

              <div style={heroButtonRowStyle}>
                {role === 'admin' ? (
                  <>
                    {isCleanupOwner ? (
                      <button onClick={cleanupTestLeads} style={ghostButtonStyle}>
                        Limpiar pruebas seleccionadas ({selectedTestLeadIds.length})
                      </button>
                    ) : null}

                    <button onClick={() => router.push('/access')} style={ghostButtonStyle}>
                      Gestion de accesos
                    </button>

                    <button onClick={() => router.push('/providers')} style={primaryButtonStyle}>
                      Ir a proveedores
                    </button>
                  </>
                ) : (
                  <div style={monitorNoticeStyle}>
                    Modo monitor: solo lectura del dashboard
                  </div>
                )}
              </div>
            </div>

            <div style={summaryGridStyle}>
              {summaryCards.map((card) => (
                <div key={card.label} style={{ ...summaryCardStyle, borderTopColor: card.accent }}>
                  <span style={summaryLabelStyle}>{card.label}</span>
                  <strong style={summaryValueStyle}>{card.value}</strong>
                  {card.subvalue ? <span style={summarySubvalueStyle}>{card.subvalue}</span> : null}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section style={contentSectionStyle}>
        <div style={containerStyle}>
          <div style={filterCardStyle}>
            <div style={filterHeaderStyle}>
              <div>
                <div style={sectionTagStyle}>Filtros</div>
                <h2 style={sectionTitleStyle}>Vista comercial del pipeline</h2>
              </div>

              <div style={resultsBadgeStyle}>{filtered.length} leads visibles</div>
            </div>

            <div style={filterGridStyle}>
              <input
                placeholder="Buscar nombre, telefono o codigo"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={inputStyle}
              />

              <select value={serviceFilter} onChange={(e) => setServiceFilter(e.target.value)} style={inputStyle}>
                <option value="">Todos los servicios</option>
                {services.map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </select>

              <select value={cityFilter} onChange={(e) => setCityFilter(e.target.value)} style={inputStyle}>
                <option value="">Todas las ciudades</option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>

              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} style={inputStyle}>
                <option value="">Todos los estados</option>
                <option value="pending">Pendientes</option>
                <option value="contactado">Contactados</option>
                <option value="evaluacion">Evaluacion</option>
                <option value="cotizado">Cotizado</option>
                <option value="reservado">Reservado</option>
                <option value="vendido">Vendidos</option>
                <option value="descartado">Perdidos</option>
              </select>

              <input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                style={inputStyle}
              />

              <input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                style={inputStyle}
              />

              <label style={checkboxCardStyle}>
                <input type="checkbox" checked={premiumOnly} onChange={(e) => setPremiumOnly(e.target.checked)} />
                Solo premium
              </label>
            </div>
          </div>

          <div style={tableShellStyle}>
            <div style={tableHeaderStyle}>
              <div>
                <div style={sectionTagStyle}>Operaciones</div>
                <h2 style={sectionTitleStyle}>Leads activos en CRM</h2>
                {isCleanupOwner ? (
                  <p style={cleanupHelpTextStyle}>
                    Solo tu cuenta puede eliminar leads desde esta columna. Selecciona fila por fila y confirma el borrado.
                  </p>
                ) : null}
              </div>
            </div>

            <div style={scrollHintWrapStyle}>
              <span style={scrollHintStyle}>Desliza hacia los lados para ver todas las columnas</span>
              <div ref={topScrollRef} style={topScrollbarStyle} onScroll={() => syncScroll('top')}>
                <div style={topScrollbarInnerStyle} />
              </div>
            </div>

            <div
              ref={bottomScrollRef}
              style={tableScrollStyle}
              onScroll={() => syncScroll('bottom')}
            >
              <table style={tableStyle}>
                <thead>
                  <tr>
                    <th style={thStyle}>
                      {isCleanupOwner ? (
                        <div style={cleanupCheckboxWrapStyle}>
                          <input
                            type="checkbox"
                            checked={
                              selectableVisibleLeadCount > 0 &&
                              filtered.every((lead) => selectedTestLeadIds.includes(lead.id))
                            }
                            disabled={selectableVisibleLeadCount === 0}
                            onChange={(e) => toggleVisibleTestLeads(e.target.checked)}
                          />
                        </div>
                      ) : (
                        ''
                      )}
                    </th>
                    <th style={thStyle}>Ingreso</th>
                    <th style={thStyle}>Atendido</th>
                    <th style={thStyle}>Derivacion</th>
                    <th style={thStyle}>Prioridad</th>
                    <th style={thStyle}>Score</th>
                    <th style={thStyle}>Nombre</th>
                    <th style={thStyle}>Telefono</th>
                    <th style={thStyle}>Asignacion</th>
                    <th style={thStyle}>Ciudad</th>
                    <th style={thStyle}>Fecha estimada</th>
                    <th style={thStyle}>Servicios extra</th>
                    <th style={thStyle}>Paquete</th>
                    <th style={thStyle}>Mensaje</th>
                    <th style={thStyle}>Landing</th>
                    <th style={thStyle}>Fuente</th>
                    <th style={thStyle}>Campana</th>
                    <th style={thStyle}>Servicio</th>
                    <th style={thStyle}>Codigo</th>
                    <th style={thStyle}>Proveedor</th>
                    <th style={thStyle}>Envio a varios</th>
                    <th style={thStyle}>Directo</th>
                    <th style={thStyle}>Modo</th>
                    <th style={thStyle}>% Comision</th>
                    <th style={thStyle}>Valor tratamiento</th>
                    <th style={thStyle}>Comision</th>
                    <th style={thStyle}>Estado</th>
                    <th style={thStyle}>Acciones</th>
                  </tr>
                </thead>

                <tbody>
                  {filtered.map((lead) => {
                    const { priority, score } = getLeadScoring(lead)
                    const showDirectButton = canSendDirect(lead)
                    const suggestedPackage = getPackageBySlug(lead.suggested_package_slug)
                    const selectedDirectProviders = getSelectedDirectProviders(lead)
                    const directProviderCount = selectedDirectProviders.length

                    return (
                      <tr key={lead.id} style={rowStyle}>
                        <td style={tdStyle}>
                          {isCleanupOwner ? (
                            <div style={cleanupCheckboxWrapStyle}>
                              <input
                                type="checkbox"
                                checked={isTestLeadSelected(lead.id)}
                                onChange={(e) => toggleTestLeadSelection(lead.id, e.target.checked)}
                                title="Seleccionar lead"
                              />
                            </div>
                          ) : (
                            '-'
                          )}
                        </td>
                        <td style={tdStyle}>
                          <div>{formatDateTime(lead.created_at)}</div>
                        </td>
                        <td style={tdStyle}>
                          <div>{formatDateTime(lead.attended_at)}</div>
                        </td>
                        <td style={tdStyle}>
                          <div>{getDerivationLabel(lead.derivation_type)}</div>
                          <small style={smallMutedStyle}>{formatDateTime(lead.derivation_at)}</small>
                        </td>
                        <td style={tdStyle}>
                          <div style={priorityCellStyle}>
                            <span style={getPriorityStyle(priority)}>{priority}</span>
                            {lead.auto_assigned ? <span style={autoAssignmentHintStyle}>Auto</span> : null}
                          </div>
                        </td>
                        <td style={tdStyle}>
                          <span style={scorePillStyle}>{score}</span>
                        </td>
                        <td style={tdStyle}>
                          <strong>{lead.name || '-'}</strong>
                        </td>
                        <td style={tdStyle}>
                          <div>{lead.tourist_phone || '-'}</div>
                          <small style={smallMutedStyle}>{getCountryFlag(lead.tourist_phone || '') || '-'}</small>
                        </td>
                        <td style={tdStyle}>
                          <span style={lead.direct_mode ? assignmentPillStyles.direct : assignmentPillStyles.manual}>
                            {getLeadAssignment(lead)}
                          </span>
                        </td>
                        <td style={tdStyle}>{lead.city_interest || '-'}</td>
                        <td style={tdStyle}>{lead.preferred_date || '-'}</td>
                        <td style={tdStyle}>
                          {lead.additional_services?.length ? (
                            <div style={tagWrapStyle}>
                              {lead.additional_services.map((service) => (
                                <span key={service} style={serviceTagStyle}>
                                  {service}
                                </span>
                              ))}
                            </div>
                          ) : (
                            '-'
                          )}
                        </td>
                        <td style={tdStyle}>
                          {suggestedPackage ? (
                            <div>
                              <div style={packageNameStyle}>{suggestedPackage.name}</div>
                              <small style={smallMutedStyle}>{suggestedPackage.shortCopy}</small>
                            </div>
                          ) : (
                            '-'
                          )}
                        </td>
                        <td style={{ ...tdStyle, ...messageCellStyle }}>{lead.message || '-'}</td>
                        <td style={tdStyle}>
                          <span style={monoPillStyle}>{lead.landing_path || '-'}</span>
                        </td>
                        <td style={tdStyle}>{lead.utm_source || '-'}</td>
                        <td style={tdStyle}>{lead.utm_campaign || '-'}</td>
                        <td style={tdStyle}>{lead.service_name || '-'}</td>
                        <td style={tdStyle}>
                          <span style={monoPillStyle}>{lead.reference_code}</span>
                        </td>
                        <td style={tdStyle}>
                          <div style={directProvidersCellStyle}>
                            <select value={lead.provider_id || ''} onChange={(e) => assignProvider(lead.id, e.target.value)} style={selectStyle}>
                              <option value="">Sin asignar</option>
                              {providers.map((provider) => (
                                <option key={provider.id} value={provider.id}>
                                  {provider.name}
                                  {provider.service_name ? ` - ${provider.service_name}` : ''}
                                </option>
                              ))}
                            </select>

                            {lead.provider_id ? (() => {
                              const assignedProvider = providers.find((provider) => provider.id === lead.provider_id)
                              if (!assignedProvider) return null

                              const providerServices = getProviderServiceOptions(assignedProvider)

                              if (!providerServices.length) {
                                return (
                                  <small style={smallMutedStyle}>
                                    Este proveedor no tiene servicios especificos cargados.
                                  </small>
                                )
                              }

                              return (
                                <select
                                  value={getSelectedProviderService(lead.id, assignedProvider.id)}
                                  onChange={(e) =>
                                    updateSelectedProviderService(lead.id, assignedProvider.id, e.target.value)
                                  }
                                  style={selectStyle}
                                >
                                  <option value="">Servicio especifico del proveedor</option>
                                  {providerServices.map((service) => (
                                    <option key={`${assignedProvider.id}-${service.name}`} value={service.name}>
                                      {service.name}
                                    </option>
                                  ))}
                                </select>
                              )
                            })() : null}
                          </div>
                        </td>
                        <td style={tdStyle}>
                          <div style={directProvidersCellStyle}>
                            <div style={multiProviderListStyle}>
                              {providers.map((provider) => {
                                const isChecked = (lead.direct_provider_ids || []).includes(provider.id)
                                const providerServices = getProviderServiceOptions(provider)

                                return (
                                  <div key={provider.id} style={multiProviderOptionStyle}>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1 }}>
                                      <input
                                        type="checkbox"
                                        checked={isChecked}
                                        disabled={role !== 'admin'}
                                        onChange={(e) =>
                                          toggleDirectProviderSelection(lead, provider.id, e.target.checked)
                                        }
                                      />
                                      <span>
                                        {provider.name}
                                        {provider.service_name ? ` - ${provider.service_name}` : ''}
                                      </span>
                                    </label>

                                    {isChecked && providerServices.length ? (
                                      <select
                                        value={getSelectedProviderService(lead.id, provider.id)}
                                        disabled={role !== 'admin'}
                                        onChange={(e) =>
                                          updateSelectedProviderService(lead.id, provider.id, e.target.value)
                                        }
                                        style={{ ...selectStyle, width: '220px' }}
                                      >
                                        <option value="">Servicio especifico</option>
                                        {providerServices.map((service) => (
                                          <option key={`${provider.id}-${service.name}`} value={service.name}>
                                            {service.name}
                                          </option>
                                        ))}
                                      </select>
                                    ) : null}
                                  </div>
                                )
                              })}
                            </div>

                            {selectedDirectProviders.length ? (
                              <div style={tagWrapStyle}>
                                {selectedDirectProviders.map((provider) => (
                                  <span key={provider.id} style={providerChipStyle}>
                                    {provider.name}
                                  </span>
                                ))}
                              </div>
                            ) : (
                              <small style={smallMutedStyle}>
                                Selecciona uno o varios proveedores para envio manual o directo.
                              </small>
                            )}
                          </div>
                        </td>
                        <td style={tdStyle}>
                          <label style={toggleWrapStyle}>
                            <input type="checkbox" checked={!!lead.direct_mode} disabled={role !== 'admin'} onChange={(e) => toggleDirectMode(lead.id, e.target.checked)} />
                            <span>{lead.direct_mode ? 'On' : 'Off'}</span>
                          </label>
                        </td>
                        <td style={tdStyle}>
                          <span style={lead.direct_mode ? modePillStyles.direct : modePillStyles.manual}>{getLeadMode(lead)}</span>
                        </td>
                        <td style={tdStyle}>
                          {lead.commission_rate ? `${(Number(lead.commission_rate) * 100).toFixed(0)}%` : '-'}
                        </td>
                        <td style={tdStyle}>
                          {lead.treatment_value ? (
                            <div>
                              <div>{formatPen(lead.treatment_value)}</div>
                              {isChileanLead(lead.tourist_phone || '') && (
                                <small style={smallMutedStyle}>{formatClpReferenceFromPen(lead.treatment_value)}</small>
                              )}
                            </div>
                          ) : (
                            '-'
                          )}
                        </td>
                        <td style={tdStyle}>
                          {lead.commission_amount ? (
                            <div>
                              <div>{formatPen(lead.commission_amount)}</div>
                              {isChileanLead(lead.tourist_phone || '') && (
                                <small style={smallMutedStyle}>{formatClpReferenceFromPen(lead.commission_amount)}</small>
                              )}
                            </div>
                          ) : (
                            '-'
                          )}
                        </td>
                        <td style={tdStyle}>
                          <div>
                            <span style={getStatusStyle(lead.status)}>{lead.status || 'pending'}</span>
                          </div>
                          <small style={smallMutedStyle}>{formatDateTime(lead.last_status_at)}</small>
                        </td>
                        <td style={tdStyle}>
                          <div style={actionWrapStyle}>
                            <button onClick={() => openWhatsApp(lead)} style={actionButtonStyles.whatsapp}>
                              WhatsApp
                            </button>
                            <button disabled={role !== 'admin'} onClick={() => updateStatus(lead.id, 'contactado')} style={role === 'admin' ? actionButtonStyles.secondary : disabledActionButtonStyle}>
                              Contactado
                            </button>
                            <button disabled={role !== 'admin'} onClick={() => updateStatus(lead.id, 'evaluacion')} style={role === 'admin' ? actionButtonStyles.secondary : disabledActionButtonStyle}>
                              Evaluacion
                            </button>
                            <button disabled={role !== 'admin'} onClick={() => updateStatus(lead.id, 'cotizado')} style={role === 'admin' ? actionButtonStyles.secondary : disabledActionButtonStyle}>
                              Cotizado
                            </button>
                            <button disabled={role !== 'admin'} onClick={() => updateStatus(lead.id, 'reservado')} style={role === 'admin' ? actionButtonStyles.secondary : disabledActionButtonStyle}>
                              Reservado
                            </button>
                            <button disabled={role !== 'admin'} onClick={() => updateStatus(lead.id, 'vendido')} style={role === 'admin' ? actionButtonStyles.success : disabledActionButtonStyle}>
                              Vendido
                            </button>
                            <button disabled={role !== 'admin'} onClick={() => updateStatus(lead.id, 'descartado')} style={role === 'admin' ? actionButtonStyles.danger : disabledActionButtonStyle}>
                              Descartar
                            </button>
                            <button disabled={role !== 'admin'} onClick={() => sendToProvider(lead)} style={role === 'admin' ? actionButtonStyles.primary : disabledActionButtonStyle}>
                              {showDirectButton
                                ? directProviderCount > 1
                                  ? lead.direct_mode
                                    ? `Enviar directo a ${directProviderCount}`
                                    : `Enviar manual a ${directProviderCount}`
                                  : lead.direct_mode
                                    ? 'Enviar directo'
                                    : lead.direct_provider_ids?.length
                                      ? 'Enviar manual'
                                      : 'Enviar a proveedor'
                                : 'Enviar a proveedor'}
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

const pageStyle: CSSProperties = {
  minHeight: '100vh',
  background: 'linear-gradient(180deg, #f8fafc 0%, #eef2ff 38%, #f8fafc 100%)',
  color: '#0f172a',
  fontFamily: 'Arial, sans-serif',
}

const containerStyle: CSSProperties = {
  maxWidth: '1440px',
  margin: '0 auto',
  padding: '0 24px',
}

const heroSectionStyle: CSSProperties = {
  position: 'relative',
  overflow: 'hidden',
  padding: '38px 0 24px',
}

const heroGlowStyle: CSSProperties = {
  position: 'absolute',
  inset: 0,
  background:
    'radial-gradient(circle at 15% 20%, rgba(59,130,246,0.14), transparent 28%), radial-gradient(circle at 85% 10%, rgba(16,185,129,0.12), transparent 24%)',
  pointerEvents: 'none',
}

const heroCardStyle: CSSProperties = {
  position: 'relative',
  background: 'linear-gradient(135deg, #0f172a 0%, #1d4ed8 55%, #0f766e 100%)',
  borderRadius: '30px',
  padding: '28px',
  color: 'white',
  boxShadow: '0 24px 60px rgba(15,23,42,0.18)',
}

const heroHeaderRowStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  gap: '18px',
  flexWrap: 'wrap',
  alignItems: 'flex-start',
  marginBottom: '24px',
}

const eyebrowStyle: CSSProperties = {
  display: 'inline-block',
  background: 'rgba(255,255,255,0.14)',
  border: '1px solid rgba(255,255,255,0.2)',
  borderRadius: '999px',
  padding: '8px 12px',
  fontSize: '12px',
  fontWeight: 700,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  marginBottom: '14px',
}

const heroTitleStyle: CSSProperties = {
  margin: '0 0 10px',
  fontSize: '40px',
  lineHeight: 1.08,
}

const heroCopyStyle: CSSProperties = {
  margin: 0,
  maxWidth: '760px',
  color: 'rgba(255,255,255,0.86)',
  fontSize: '17px',
  lineHeight: 1.6,
}

const roleBadgeStyle: CSSProperties = {
  display: 'inline-block',
  marginTop: '14px',
  background: 'rgba(255,255,255,0.12)',
  border: '1px solid rgba(255,255,255,0.16)',
  borderRadius: '999px',
  padding: '8px 12px',
  fontSize: '12px',
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
}

const heroButtonRowStyle: CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '10px',
}

const monitorNoticeStyle: CSSProperties = {
  background: 'rgba(255,255,255,0.12)',
  border: '1px solid rgba(255,255,255,0.16)',
  borderRadius: '14px',
  padding: '13px 18px',
  color: 'white',
  fontWeight: 700,
}

const primaryButtonStyle: CSSProperties = {
  border: 'none',
  borderRadius: '14px',
  padding: '13px 18px',
  background: '#f8fafc',
  color: '#0f172a',
  fontWeight: 700,
  cursor: 'pointer',
}

const ghostButtonStyle: CSSProperties = {
  border: '1px solid rgba(255,255,255,0.22)',
  borderRadius: '14px',
  padding: '13px 18px',
  background: 'rgba(255,255,255,0.1)',
  color: 'white',
  fontWeight: 700,
  cursor: 'pointer',
}

const summaryGridStyle: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
  gap: '14px',
}

const summaryCardStyle: CSSProperties = {
  background: 'rgba(255,255,255,0.12)',
  border: '1px solid rgba(255,255,255,0.12)',
  borderTop: '4px solid #fff',
  borderRadius: '20px',
  padding: '18px',
  backdropFilter: 'blur(10px)',
}

const summaryLabelStyle: CSSProperties = {
  display: 'block',
  fontSize: '13px',
  color: 'rgba(255,255,255,0.76)',
  marginBottom: '8px',
}

const summaryValueStyle: CSSProperties = {
  display: 'block',
  fontSize: '28px',
  marginBottom: '6px',
}

const summarySubvalueStyle: CSSProperties = {
  display: 'block',
  color: 'rgba(255,255,255,0.8)',
  fontSize: '13px',
}

const contentSectionStyle: CSSProperties = {
  padding: '24px 0 42px',
}

const filterCardStyle: CSSProperties = {
  background: '#ffffff',
  border: '1px solid #dbe4ee',
  borderRadius: '26px',
  padding: '24px',
  boxShadow: '0 16px 42px rgba(15,23,42,0.08)',
  marginBottom: '22px',
}

const filterHeaderStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  gap: '16px',
  flexWrap: 'wrap',
  alignItems: 'center',
  marginBottom: '18px',
}

const sectionTagStyle: CSSProperties = {
  display: 'inline-block',
  background: '#dbeafe',
  color: '#1d4ed8',
  padding: '7px 11px',
  borderRadius: '999px',
  fontSize: '12px',
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
  marginBottom: '10px',
}

const sectionTitleStyle: CSSProperties = {
  margin: 0,
  fontSize: '28px',
}

const resultsBadgeStyle: CSSProperties = {
  background: '#0f172a',
  color: 'white',
  borderRadius: '999px',
  padding: '10px 14px',
  fontWeight: 700,
}

const cleanupHelpTextStyle: CSSProperties = {
  margin: '10px 0 0',
  color: '#64748b',
  fontSize: '13px',
  lineHeight: 1.6,
}

const filterGridStyle: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
  gap: '12px',
}

const inputStyle: CSSProperties = {
  width: '100%',
  minHeight: '48px',
  borderRadius: '14px',
  border: '1px solid #cbd5e1',
  background: '#f8fafc',
  color: '#0f172a',
  padding: '0 14px',
  fontSize: '15px',
}

const checkboxCardStyle: CSSProperties = {
  minHeight: '48px',
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  borderRadius: '14px',
  border: '1px solid #cbd5e1',
  background: '#f8fafc',
  padding: '0 14px',
  fontWeight: 700,
}

const cleanupCheckboxWrapStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '24px',
}

const tableShellStyle: CSSProperties = {
  background: '#ffffff',
  border: '1px solid #dbe4ee',
  borderRadius: '26px',
  boxShadow: '0 16px 42px rgba(15,23,42,0.08)',
  overflow: 'hidden',
}

const tableHeaderStyle: CSSProperties = {
  padding: '24px 24px 0',
}

const tableScrollStyle: CSSProperties = {
  overflowX: 'scroll',
  overflowY: 'hidden',
  padding: '20px 24px 24px',
  scrollbarGutter: 'stable',
}

const scrollHintWrapStyle: CSSProperties = {
  padding: '0 24px',
}

const scrollHintStyle: CSSProperties = {
  display: 'inline-block',
  background: '#eff6ff',
  color: '#1d4ed8',
  border: '1px solid #bfdbfe',
  borderRadius: '999px',
  padding: '8px 12px',
  fontSize: '12px',
  fontWeight: 700,
}

const topScrollbarStyle: CSSProperties = {
  overflowX: 'scroll',
  overflowY: 'hidden',
  marginTop: '12px',
  paddingBottom: '4px',
  scrollbarGutter: 'stable',
}

const topScrollbarInnerStyle: CSSProperties = {
  width: '2120px',
  height: '1px',
}

const tableStyle: CSSProperties = {
  width: '100%',
  borderCollapse: 'separate',
  borderSpacing: 0,
  minWidth: '2120px',
}

const thStyle: CSSProperties = {
  position: 'sticky',
  top: 0,
  background: '#eff6ff',
  color: '#1e3a8a',
  fontSize: '12px',
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
  padding: '14px 12px',
  textAlign: 'left',
  borderBottom: '1px solid #bfdbfe',
}

const tdStyle: CSSProperties = {
  padding: '14px 12px',
  borderBottom: '1px solid #e2e8f0',
  verticalAlign: 'top',
  fontSize: '14px',
}

const rowStyle: CSSProperties = {
  background: '#ffffff',
}

const messageCellStyle: CSSProperties = {
  minWidth: '240px',
  maxWidth: '280px',
  whiteSpace: 'pre-wrap',
  lineHeight: 1.55,
  color: '#334155',
}

const selectStyle: CSSProperties = {
  ...inputStyle,
  minHeight: '40px',
  fontSize: '14px',
  background: '#ffffff',
}

const toggleWrapStyle: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '8px',
  padding: '8px 10px',
  borderRadius: '999px',
  background: '#f8fafc',
  border: '1px solid #cbd5e1',
  fontWeight: 700,
}

const smallMutedStyle: CSSProperties = {
  color: '#64748b',
}

const packageNameStyle: CSSProperties = {
  fontWeight: 700,
  color: '#0f172a',
  marginBottom: '4px',
}

const scorePillStyle: CSSProperties = {
  display: 'inline-block',
  minWidth: '44px',
  textAlign: 'center',
  background: '#e0f2fe',
  color: '#075985',
  borderRadius: '999px',
  padding: '6px 10px',
  fontWeight: 700,
}

const priorityCellStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
  alignItems: 'flex-start',
}

const autoAssignmentHintStyle: CSSProperties = {
  display: 'inline-block',
  background: '#dcfce7',
  color: '#166534',
  borderRadius: '999px',
  padding: '4px 8px',
  fontSize: '11px',
  fontWeight: 700,
}

const tagWrapStyle: CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '6px',
}

const serviceTagStyle: CSSProperties = {
  display: 'inline-block',
  background: '#ecfeff',
  color: '#155e75',
  borderRadius: '999px',
  padding: '4px 9px',
  fontSize: '12px',
  fontWeight: 700,
}

const providerChipStyle: CSSProperties = {
  display: 'inline-block',
  background: '#ede9fe',
  color: '#5b21b6',
  borderRadius: '999px',
  padding: '4px 9px',
  fontSize: '12px',
  fontWeight: 700,
}

const directProvidersCellStyle: CSSProperties = {
  display: 'grid',
  gap: '10px',
  minWidth: '280px',
}

const multiProviderListStyle: CSSProperties = {
  display: 'grid',
  gap: '8px',
  maxHeight: '180px',
  overflowY: 'auto',
  border: '1px solid #dbe4ee',
  borderRadius: '12px',
  padding: '10px',
  background: '#f8fafc',
}

const multiProviderOptionStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  padding: '8px 10px',
  borderRadius: '10px',
  background: '#ffffff',
  border: '1px solid #e2e8f0',
}

const monoPillStyle: CSSProperties = {
  display: 'inline-block',
  background: '#f1f5f9',
  border: '1px solid #cbd5e1',
  color: '#0f172a',
  borderRadius: '999px',
  padding: '6px 10px',
  fontFamily: 'monospace',
  fontSize: '12px',
}

const actionWrapStyle: CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
}

const actionButtonBaseStyle: CSSProperties = {
  border: 'none',
  borderRadius: '10px',
  padding: '9px 11px',
  fontSize: '12px',
  fontWeight: 700,
  cursor: 'pointer',
}

const actionButtonStyles: Record<string, CSSProperties> = {
  whatsapp: {
    ...actionButtonBaseStyle,
    background: '#dcfce7',
    color: '#166534',
  },
  secondary: {
    ...actionButtonBaseStyle,
    background: '#e2e8f0',
    color: '#0f172a',
  },
  success: {
    ...actionButtonBaseStyle,
    background: '#d1fae5',
    color: '#065f46',
  },
  danger: {
    ...actionButtonBaseStyle,
    background: '#fee2e2',
    color: '#991b1b',
  },
  primary: {
    ...actionButtonBaseStyle,
    background: '#dbeafe',
    color: '#1d4ed8',
  },
}

const disabledActionButtonStyle: CSSProperties = {
  ...actionButtonBaseStyle,
  background: '#e2e8f0',
  color: '#94a3b8',
  cursor: 'not-allowed',
}

const loadingShellStyle: CSSProperties = {
  minHeight: '100vh',
  display: 'grid',
  placeItems: 'center',
  background: 'linear-gradient(180deg, #f8fafc 0%, #eef2ff 100%)',
}

const loadingCardStyle: CSSProperties = {
  padding: '20px 24px',
  borderRadius: '18px',
  background: '#ffffff',
  border: '1px solid #dbe4ee',
  boxShadow: '0 16px 42px rgba(15,23,42,0.08)',
  fontWeight: 700,
}

const priorityPillStyles: Record<string, CSSProperties> = {
  high: {
    background: '#fee2e2',
    color: '#991b1b',
    padding: '6px 10px',
    borderRadius: '999px',
    fontWeight: 700,
    display: 'inline-block',
  },
  medium: {
    background: '#fef3c7',
    color: '#92400e',
    padding: '6px 10px',
    borderRadius: '999px',
    fontWeight: 700,
    display: 'inline-block',
  },
  normal: {
    background: '#e2e8f0',
    color: '#334155',
    padding: '6px 10px',
    borderRadius: '999px',
    fontWeight: 700,
    display: 'inline-block',
  },
}

const assignmentPillStyles = {
  direct: {
    background: '#dcfce7',
    color: '#166534',
    padding: '6px 10px',
    borderRadius: '999px',
    fontWeight: 700,
    display: 'inline-block',
  } satisfies CSSProperties,
  manual: {
    background: '#e2e8f0',
    color: '#334155',
    padding: '6px 10px',
    borderRadius: '999px',
    fontWeight: 700,
    display: 'inline-block',
  } satisfies CSSProperties,
}

const modePillStyles = {
  direct: {
    background: '#ccfbf1',
    color: '#0f766e',
    padding: '6px 10px',
    borderRadius: '999px',
    fontWeight: 700,
    display: 'inline-block',
  } satisfies CSSProperties,
  manual: {
    background: '#ede9fe',
    color: '#6d28d9',
    padding: '6px 10px',
    borderRadius: '999px',
    fontWeight: 700,
    display: 'inline-block',
  } satisfies CSSProperties,
}

const statusPillStyles: Record<string, CSSProperties> = {
  pending: {
    background: '#e2e8f0',
    color: '#334155',
    padding: '6px 10px',
    borderRadius: '999px',
    fontWeight: 700,
    display: 'inline-block',
  },
  contactado: {
    background: '#dbeafe',
    color: '#1d4ed8',
    padding: '6px 10px',
    borderRadius: '999px',
    fontWeight: 700,
    display: 'inline-block',
  },
  evaluacion: {
    background: '#ede9fe',
    color: '#6d28d9',
    padding: '6px 10px',
    borderRadius: '999px',
    fontWeight: 700,
    display: 'inline-block',
  },
  cotizado: {
    background: '#fef3c7',
    color: '#92400e',
    padding: '6px 10px',
    borderRadius: '999px',
    fontWeight: 700,
    display: 'inline-block',
  },
  reservado: {
    background: '#fde68a',
    color: '#92400e',
    padding: '6px 10px',
    borderRadius: '999px',
    fontWeight: 700,
    display: 'inline-block',
  },
  vendido: {
    background: '#dcfce7',
    color: '#166534',
    padding: '6px 10px',
    borderRadius: '999px',
    fontWeight: 700,
    display: 'inline-block',
  },
  descartado: {
    background: '#fee2e2',
    color: '#991b1b',
    padding: '6px 10px',
    borderRadius: '999px',
    fontWeight: 700,
    display: 'inline-block',
  },
}
