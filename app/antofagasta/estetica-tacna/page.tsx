'use client'

import { useState } from 'react'

const benefits = [
  'Ahorro frente a Chile',
  'Alternativa mas accesible',
  'Atencion rapida',
  'Clinicas verificadas',
  'Coordinacion por WhatsApp',
]

const treatments = ['Botox', 'Acido hialuronico', 'Rejuvenecimiento facial', 'Tratamientos esteticos faciales']

const steps = [
  'Paciente de Antofagasta deja sus datos',
  'HolaTacna revisa el caso',
  'Se coordina con clinica estetica en Tacna',
  'Se agenda evaluacion',
]

export default function AntofagastaEsteticaTacnaPage() {
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
          service_name: 'estetica',
          landing_path: '/antofagasta/estetica-tacna',
          city_interest: 'antofagasta',
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
      <section className="bg-[linear-gradient(180deg,#fdf2f8_0%,#f8fafc_100%)] px-5 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div className="rounded-[28px] bg-white p-8 shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
              <div className="mb-4 inline-block rounded-full bg-pink-100 px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-pink-700">
                Antofagasta y Tacna estetica
              </div>
              <h1 className="mb-4 text-4xl font-bold leading-tight sm:text-5xl">
                Estetica en Tacna para Pacientes de Antofagasta
              </h1>
              <p className="mb-6 text-lg leading-8 text-slate-600 sm:text-xl">
                Muchas pacientes de Antofagasta viajan a Tacna para acceder a tratamientos
                esteticos mas accesibles y rapidos.
              </p>
              <p className="text-base leading-8 text-slate-600 sm:text-lg">
                Esta landing esta pensada para busquedas como estetica Tacna Antofagasta, botox
                Tacna para pacientes de Antofagasta y tratamientos esteticos Tacna Antofagasta,
                con enfoque comercial claro y coordinacion por WhatsApp.
              </p>
              <button
                type="button"
                onClick={() =>
                  document
                    .getElementById('formulario-evaluacion')
                    ?.scrollIntoView({ behavior: 'smooth' })
                }
                className="mt-6 rounded-xl bg-emerald-500 px-5 py-3 font-bold text-emerald-950 transition hover:bg-emerald-400"
              >
                Solicitar evaluacion
              </button>
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
              <h2 className="mb-4 text-2xl font-bold">Por que pacientes de Antofagasta eligen Tacna</h2>
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
              Tratamientos consultados
            </div>
            <h2 className="mb-5 text-3xl font-bold">Consultas esteticas frecuentes</h2>
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
            <h2 className="mb-5 text-3xl font-bold">Como funciona el proceso</h2>
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
      </section>

      <section id="formulario-evaluacion" className="px-5 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl rounded-[28px] bg-white p-8 shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
          <div className="mb-6">
            <div className="mb-3 inline-block rounded-full bg-pink-100 px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-pink-700">
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
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                className="min-h-[140px] rounded-xl border border-slate-300 px-4 py-3"
                placeholder="Cuentanos que tratamiento estetico deseas consultar o que dudas tienes."
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
