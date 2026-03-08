'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function ImplantesDentalesTacnaPage() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (loading) return

    setLoading(true)

    try {
      const response = await fetch('/api/create-lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          phone,
          tourist_phone: phone,
          message: message || null,
          service_name: 'implantes-dentales',
          landing_path: '/implantes-dentales-tacna',
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        alert(data.error || 'No se pudo enviar la solicitud.')
        setLoading(false)
        return
      }

      alert('Solicitud enviada. Nuestro equipo te contactará por WhatsApp.')
      setName('')
      setPhone('')
      setMessage('')
    } catch {
      alert('No se pudo enviar la solicitud.')
    }

    setLoading(false)
  }

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
                Muchos clientes chilenos viajan a Tacna para realizar tratamientos dentales
                con especialistas, reducir costos y coordinar su atención antes de cruzar la
                frontera. HolaTacna te ayuda a dejar lista la evaluación comercial inicial por
                WhatsApp.
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
            Si todavía estás comparando opciones, revisa la diferencia entre Tacna y Chile
            antes de solicitar tu evaluación. Te ayudará a entender mejor el ahorro, la
            cercanía y la rapidez de coordinación.
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
            <h2 className="text-3xl font-bold">Solicitar Evaluación</h2>
          </div>

          <form onSubmit={handleSubmit} className="grid gap-4">
            <label className="grid gap-2">
              <span className="font-medium">Nombre</span>
              <input
                required
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="rounded-xl border border-slate-300 px-4 py-3"
                placeholder="Tu nombre"
              />
            </label>

            <label className="grid gap-2">
              <span className="font-medium">WhatsApp</span>
              <input
                required
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                className="rounded-xl border border-slate-300 px-4 py-3"
                placeholder="+56 9 ..."
              />
            </label>

            <label className="grid gap-2">
              <span className="font-medium">Mensaje (opcional)</span>
              <textarea
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                className="min-h-[140px] rounded-xl border border-slate-300 px-4 py-3"
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
        </div>
      </section>
    </main>
  )
}
