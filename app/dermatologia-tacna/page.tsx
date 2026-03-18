'use client'

import Link from 'next/link'
import { useState } from 'react'

const benefits = [
  'Ahorro frente a Chile',
  'Atencion rapida',
  'Cercania con la frontera',
  'Coordinacion por WhatsApp',
  'Clinicas verificadas',
]

const treatments = ['Acne', 'Manchas', 'Rosacea', 'Rejuvenecimiento de piel']

const steps = [
  'Paciente deja sus datos',
  'HolaTacna revisa el caso',
  'Se coordina con clinica dermatologica',
  'Se agenda evaluacion',
]

export default function DermatologiaTacnaPage() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (loading) return

    setLoading(true)

    try {
      const response = await fetch('/api/intake', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          phone,
          tourist_phone: phone,
          message,
          service_name: 'dermatologia',
          landing_path: '/dermatologia-tacna',
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        alert(data.error || 'No se pudo enviar la solicitud.')
        setLoading(false)
        return
      }

      alert('Solicitud enviada. Nuestro equipo te contactara por WhatsApp.')
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
      <section className="bg-[linear-gradient(180deg,#e0f2fe_0%,#f8fafc_100%)] px-5 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div className="rounded-[28px] bg-white p-8 shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
              <div className="mb-4 inline-block rounded-full bg-sky-100 px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-sky-700">
                Dermatologia en Tacna
              </div>
              <h1 className="mb-4 text-4xl font-bold leading-tight sm:text-5xl">
                Dermatologia en Tacna
              </h1>
              <p className="mb-6 text-lg leading-8 text-slate-600 sm:text-xl">
                Pacientes de Chile visitan Tacna para acceder a tratamientos dermatologicos mas
                accesibles y rapidos.
              </p>
              <button
                type="button"
                onClick={() =>
                  document
                    .getElementById('formulario-evaluacion')
                    ?.scrollIntoView({ behavior: 'smooth' })
                }
                className="rounded-xl bg-emerald-500 px-5 py-3 font-bold text-emerald-950 transition hover:bg-emerald-400"
              >
                Solicitar evaluacion
              </button>
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
              <h2 className="mb-4 text-2xl font-bold">Beneficios</h2>
              <ul className="grid gap-3 text-base leading-7 text-slate-700">
                {benefits.map((benefit) => (
                  <li key={benefit} className="rounded-2xl bg-slate-50 px-4 py-3">
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-2">
          <div className="rounded-[28px] bg-white p-8 shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
            <div className="mb-3 inline-block rounded-full bg-emerald-100 px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-emerald-700">
              Consultas frecuentes
            </div>
            <h2 className="mb-5 text-3xl font-bold">Tratamientos que suelen consultar</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {treatments.map((treatment) => (
                <div
                  key={treatment}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-lg font-semibold text-slate-800"
                >
                  {treatment}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] bg-white p-8 shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
            <div className="mb-3 inline-block rounded-full bg-sky-100 px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-sky-700">
              Como funciona
            </div>
            <h2 className="mb-5 text-3xl font-bold">Como funciona</h2>
            <ol className="grid gap-4">
              {steps.map((step, index) => (
                <li
                  key={step}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-base leading-7 text-slate-700"
                >
                  <span className="mb-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 font-bold text-emerald-950">
                    {index + 1}
                  </span>
                  <div className="mt-3 font-semibold text-slate-900">{step}</div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="mx-auto mt-8 max-w-4xl rounded-[28px] border border-sky-100 bg-sky-50/80 p-8 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
          <div className="mb-3 inline-block rounded-full bg-white px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-sky-700">
            Comparativa comercial
          </div>
          <h2 className="mb-3 text-3xl font-bold text-slate-950">
            Quieres comparar Dermatologia en Tacna vs Chile?
          </h2>
          <p className="mb-5 text-base leading-8 text-slate-600 sm:text-lg">
            Si todavia estas evaluando si conviene atenderse en Tacna, revisa la comparacion
            comercial para entender mejor el ahorro frente a Chile, la cercania y la rapidez de
            coordinacion.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/dermatologia-tacna-vs-chile"
              className="inline-flex items-center rounded-xl bg-sky-600 px-5 py-3 font-bold text-white transition hover:bg-sky-500"
            >
              Ver comparacion Tacna vs Chile
            </Link>
            <button
              type="button"
              onClick={() =>
                document
                  .getElementById('formulario-evaluacion')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }
              className="inline-flex items-center rounded-xl border border-slate-300 bg-white px-5 py-3 font-bold text-slate-700 transition hover:border-slate-400 hover:text-slate-950"
            >
              Solicitar evaluacion
            </button>
          </div>
        </div>
      </section>

      <section id="formulario-evaluacion" className="px-5 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl rounded-[28px] bg-white p-8 shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
          <div className="mb-6">
            <div className="mb-3 inline-block rounded-full bg-sky-100 px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-sky-700">
              Solicita informacion
            </div>
            <h2 className="text-3xl font-bold">Solicitar evaluacion</h2>
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
              <span className="font-medium">Mensaje</span>
              <textarea
                required
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                className="min-h-[140px] rounded-xl border border-slate-300 px-4 py-3"
                placeholder="Cuentanos brevemente que deseas consultar."
              />
            </label>

            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-emerald-500 px-5 py-3 font-bold text-emerald-950 transition hover:bg-emerald-400 disabled:opacity-60"
            >
              {loading ? 'Enviando...' : 'Solicitar evaluacion'}
            </button>
          </form>
        </div>
      </section>
    </main>
  )
}
