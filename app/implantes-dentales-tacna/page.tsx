'use client'

import Link from 'next/link'
import { Suspense, useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { buildTrackingPayload } from '@/lib/lead-tracking'

function ImplantesDentalesTacnaForm() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [implantCount, setImplantCount] = useState('')
  const [hasDiagnosis, setHasDiagnosis] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  function sanitizeWhatsapp(value: string) {
    const trimmed = value.replace(/\s+/g, '')
    const hasPlus = trimmed.startsWith('+')
    const digitsOnly = trimmed.replace(/\D/g, '')
    return hasPlus ? `+${digitsOnly}` : digitsOnly
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (loading) return
    setLoading(true)

    const parts: string[] = []
    if (implantCount) parts.push(`Implantes: ${implantCount}`)
    if (hasDiagnosis) parts.push(`Diagnóstico previo: ${hasDiagnosis}`)
    const qualification = parts.join(' | ')
    const freeText = message.trim()
    const fullMessage = qualification && freeText
      ? `${qualification}\n\n${freeText}`
      : qualification || freeText || null

    try {
      const res = await fetch('/api/intake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          tourist_phone: phone.trim(),
          service_slug: 'implantes-dentales',
          service_name: 'Implantes Dentales',
          landing_path: pathname,
          origin_url: typeof window !== 'undefined' ? window.location.href : pathname,
          page_type: 'service',
          message: fullMessage,
          ...buildTrackingPayload(searchParams),
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        alert(data.error || 'Hubo un error. Escríbenos directo por WhatsApp')
        setLoading(false)
        return
      }

      if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
        ;(window as any).gtag('event', 'conversion', {
          send_to: 'AW-18024620453/0NIqCKKagcscEKXD55JD',
          value: 1.0,
          currency: 'PEN',
        })
      }
      alert('¡Gracias! Te contactamos pronto por WhatsApp')
      setName('')
      setPhone('')
      setImplantCount('')
      setHasDiagnosis('')
      setMessage('')
    } catch {
      alert('Hubo un error. Escríbenos directo por WhatsApp')
    }

    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <h2 className="text-2xl font-bold">Solicitar Evaluación</h2>

      <label className="grid gap-2">
        <span className="font-medium">Nombre</span>
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="rounded-xl border border-slate-300 px-4 py-3"
          placeholder="Tu nombre"
        />
      </label>

      <label className="grid gap-2">
        <span className="font-medium">WhatsApp</span>
        <input
          required
          value={phone}
          onChange={(e) => setPhone(sanitizeWhatsapp(e.target.value))}
          className="rounded-xl border border-slate-300 px-4 py-3"
          placeholder="+56 9 ..."
          inputMode="tel"
        />
      </label>

      <div className="grid gap-2">
        <span className="font-medium">¿Cuántos implantes necesitas?</span>
        <div className="flex flex-wrap gap-2">
          {['1 implante', '2-3 implantes', '4 o más', 'Boca completa', 'No sé aún'].map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => setImplantCount(opt)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                implantCount === opt
                  ? 'border-emerald-600 bg-emerald-600 text-white'
                  : 'border-slate-300 bg-white text-slate-700 hover:border-emerald-400'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-2">
        <span className="font-medium">¿Tienes diagnóstico o radiografías previas?</span>
        <div className="flex flex-wrap gap-2">
          {['Sí, tengo', 'No tengo', 'Puedo conseguirlas'].map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => setHasDiagnosis(opt)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                hasDiagnosis === opt
                  ? 'border-emerald-600 bg-emerald-600 text-white'
                  : 'border-slate-300 bg-white text-slate-700 hover:border-emerald-400'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      <label className="grid gap-2">
        <span className="font-medium">Mensaje</span>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="min-h-[120px] rounded-xl border border-slate-300 px-4 py-3"
          placeholder="Cuéntanos qué evaluación buscas o qué dudas tienes."
        />
      </label>

      <button
        type="submit"
        disabled={loading}
        className="rounded-xl bg-emerald-500 px-5 py-3 font-bold text-emerald-950 transition hover:bg-emerald-400 disabled:opacity-60"
      >
        {loading ? 'Enviando...' : 'Solicitar Evaluación'}
      </button>
    </form>
  )
}

export default function ImplantesDentalesTacnaPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="bg-[linear-gradient(180deg,#dbeafe_0%,#f8fafc_100%)] px-5 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div className="rounded-[28px] bg-white p-8 shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
              <div className="mb-4 inline-block rounded-full bg-emerald-100 px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-emerald-700">
                Tacna dental
              </div>
              <h1 className="mb-4 text-4xl font-bold leading-tight sm:text-5xl">
                Implantes Dentales en Tacna
              </h1>
              <p className="mb-4 text-xl font-semibold text-emerald-700">
                Ahorra hasta 70% en comparación con Chile.
              </p>
              <p className="text-base leading-8 text-slate-600 sm:text-lg">
                Muchos clientes chilenos viajan a Tacna para realizar tratamientos dentales con
                especialistas, reducir costos y coordinar su atención antes de cruzar la frontera.
                HolaTacna te ayuda a dejar lista la evaluación comercial inicial por WhatsApp.
              </p>
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
              <h2 className="mb-4 text-2xl font-bold">Beneficios</h2>
              <ul className="grid gap-3 text-base leading-7 text-slate-700">
                <li>• Tratamiento con especialistas</li>
                <li>• Atención rápida</li>
                <li>• Costos mucho menores que en Chile</li>
                <li>• Tacna está a minutos de la frontera</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto mb-8 max-w-3xl rounded-[28px] border border-sky-100 bg-sky-50/80 p-8 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
          <div className="mb-3 inline-block rounded-full bg-white px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-sky-700">
            Comparativa comercial
          </div>
          <h2 className="mb-3 text-3xl font-bold text-slate-950">
            ¿Conviene hacerse implantes en Tacna?
          </h2>
          <p className="mb-5 text-base leading-8 text-slate-600 sm:text-lg">
            Si todavía estás comparando opciones, revisa la diferencia entre Tacna y Chile antes de
            solicitar tu evaluación. Te ayudará a entender mejor el ahorro, la cercanía y la
            rapidez de coordinación.
          </p>
          <Link
            href="/implantes-dentales-tacna-vs-chile"
            className="inline-flex items-center rounded-xl bg-sky-600 px-5 py-3 font-bold text-white transition hover:bg-sky-500"
          >
            Ver comparación Tacna vs Chile
          </Link>
        </div>

        <div className="mx-auto max-w-3xl rounded-[28px] bg-white p-8 shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
          <div className="mb-6">
            <div className="mb-3 inline-block rounded-full bg-sky-100 px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-sky-700">
              Solicita información
            </div>
          </div>
          <Suspense fallback={<div className="text-sm text-slate-500">Cargando formulario...</div>}>
            <ImplantesDentalesTacnaForm />
          </Suspense>
        </div>
      </section>
    </main>
  )
}
