'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function EsteticaTacnaPage() {
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
          landing_path: '/estetica-tacna',
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
      <section className="bg-[linear-gradient(180deg,#fdf2f8_0%,#f8fafc_100%)] px-5 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div className="rounded-[28px] bg-white p-8 shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
              <div className="mb-4 inline-block rounded-full bg-pink-100 px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-pink-700">
                Estética en Tacna
              </div>
              <h1 className="mb-4 text-4xl font-bold leading-tight sm:text-5xl">
                Tratamientos Estéticos en Tacna
              </h1>
              <p className="mb-6 text-lg leading-8 text-slate-600 sm:text-xl">
                Pacientes de Chile visitan Tacna para acceder a tratamientos estéticos más
                accesibles y rápidos.
              </p>
              <button
                onClick={() =>
                  document
                    .getElementById('formulario-evaluacion')
                    ?.scrollIntoView({ behavior: 'smooth' })
                }
                className="rounded-xl bg-emerald-500 px-5 py-3 font-bold text-emerald-950 transition hover:bg-emerald-400"
              >
                Solicitar evaluación
              </button>
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
              <h2 className="mb-4 text-2xl font-bold">Beneficios para clientes de Chile</h2>
              <ul className="grid gap-3 text-base leading-7 text-slate-700">
                <li>• Ahorro frente a Chile</li>
                <li>• Atención rápida</li>
                <li>• Cercanía con la frontera</li>
                <li>• Coordinación por WhatsApp</li>
                <li>• Clínicas verificadas</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl grid gap-6 lg:grid-cols-2">
          <div className="rounded-[28px] bg-white p-8 shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
            <div className="mb-3 inline-block rounded-full bg-emerald-100 px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-emerald-700">
              Qué suelen consultar
            </div>
            <h2 className="mb-5 text-3xl font-bold">Tratamientos estéticos frecuentes</h2>
            <div className="grid gap-4">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="mb-2 text-xl font-bold">Botox</h3>
                <p className="text-base leading-7 text-slate-700">
                  Muchas consultas llegan buscando orientación inicial sobre alternativas
                  estéticas con evaluación previa.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="mb-2 text-xl font-bold">Ácido hialurónico</h3>
                <p className="text-base leading-7 text-slate-700">
                  También recibimos interés por procedimientos faciales que requieren una
                  evaluación profesional antes de definir el siguiente paso.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="mb-2 text-xl font-bold">Rejuvenecimiento facial</h3>
                <p className="text-base leading-7 text-slate-700">
                  Los clientes suelen comparar opciones de atención estética en Tacna frente a
                  Chile antes de tomar una decisión.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="mb-2 text-xl font-bold">Tratamientos dermatológicos estéticos</h3>
                <p className="text-base leading-7 text-slate-700">
                  La página mantiene un enfoque general y seguro, pensado para ordenar la
                  consulta comercial y orientar el caso.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[28px] bg-white p-8 shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
            <div className="mb-3 inline-block rounded-full bg-sky-100 px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-sky-700">
              Proceso comercial
            </div>
            <h2 className="mb-5 text-3xl font-bold">Cómo funciona</h2>
            <ol className="grid gap-4 text-base leading-7 text-slate-700">
              <li>
                <strong>1. Paciente deja sus datos</strong>
                <div>Nos comparte su nombre, WhatsApp y una breve explicación de su interés.</div>
              </li>
              <li>
                <strong>2. HolaTacna revisa el caso</strong>
                <div>Ordenamos la solicitud y definimos el mejor siguiente paso comercial.</div>
              </li>
              <li>
                <strong>3. Se coordina con clínica estética</strong>
                <div>Cuando corresponde, alineamos el caso con una clínica verificada.</div>
              </li>
              <li>
                <strong>4. Se agenda evaluación</strong>
                <div>Con la información clara, el cliente puede avanzar a la evaluación.</div>
              </li>
            </ol>
          </div>
        </div>

        <div className="mx-auto mt-8 max-w-4xl rounded-[28px] border border-pink-100 bg-pink-50/80 p-8 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
          <div className="mb-3 inline-block rounded-full bg-white px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-pink-700">
            Comparativa comercial
          </div>
          <h2 className="mb-3 text-3xl font-bold text-slate-950">
            Quieres comparar Estetica en Tacna vs Chile?
          </h2>
          <p className="mb-5 text-base leading-8 text-slate-600 sm:text-lg">
            Si todavia estas evaluando si conviene atenderse en Tacna, revisa la comparacion
            comercial para entender mejor el ahorro frente a Chile, la cercania y la rapidez de
            coordinacion.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/estetica-tacna-vs-chile"
              className="inline-flex items-center rounded-xl bg-pink-500 px-5 py-3 font-bold text-white transition hover:bg-pink-400"
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
            <div className="mb-3 inline-block rounded-full bg-pink-100 px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-pink-700">
              Solicita información
            </div>
            <h2 className="text-3xl font-bold">Solicitar evaluación</h2>
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
                placeholder="Cuéntanos qué tratamiento estético deseas consultar o qué dudas tienes."
              />
            </label>

            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-emerald-500 px-5 py-3 font-bold text-emerald-950 transition hover:bg-emerald-400 disabled:opacity-60"
            >
              {loading ? 'Enviando...' : 'Solicitar evaluación'}
            </button>
          </form>
        </div>
      </section>
    </main>
  )
}
