'use client'

import Link from 'next/link'
import { useState } from 'react'

const comparisonItems = [
  {
    title: 'En Chile',
    description:
      'Las consultas y tratamientos dermatologicos suelen costar mucho mas y la coordinacion inicial puede ser menos flexible para pacientes que buscan rapidez.',
    tone: 'border-rose-100 bg-rose-50 text-rose-700',
  },
  {
    title: 'En Tacna',
    description:
      'Muchos pacientes encuentran costos mas accesibles, un ahorro importante frente a Chile y una alternativa cercana para pacientes del norte de Chile.',
    tone: 'border-emerald-100 bg-emerald-50 text-emerald-700',
  },
  {
    title: 'Cercania',
    description:
      'La cercania con la frontera facilita la atencion, simplifica la coordinacion previa por WhatsApp y permite ordenar una evaluacion con mas rapidez.',
    tone: 'border-sky-100 bg-sky-50 text-sky-700',
  },
]

const benefits = [
  'ahorro frente a Chile',
  'cercania con Tacna',
  'atencion rapida',
  'clinicas verificadas',
  'coordinacion por WhatsApp',
]

const treatments = [
  {
    title: 'Acne',
    description:
      'Muchas consultas buscan orientacion inicial para tratamiento acne Tacna con una evaluacion previa y orden comercial claro.',
  },
  {
    title: 'Manchas',
    description:
      'Tambien existe interes por consultas sobre piel y manchas en una clinica dermatologica Tacna antes de decidir viajar.',
  },
  {
    title: 'Rosacea',
    description:
      'Pacientes de Chile comparan opciones de atencion dermatologica buscando una alternativa mas accesible y cercana.',
  },
  {
    title: 'Rejuvenecimiento de piel',
    description:
      'La pagina mantiene un enfoque general y seguro, sin prometer procedimientos especificos no confirmados.',
  },
]

const steps = [
  'La paciente deja sus datos',
  'HolaTacna orienta el caso',
  'Se coordina con clinica dermatologica',
  'Se agenda evaluacion o tratamiento',
]

const faqs = [
  {
    question: 'Vale la pena viajar a Tacna para dermatologia?',
    answer:
      'Para muchos pacientes de Chile si. La combinacion de ahorro importante frente a Chile, cercania y coordinacion previa hace que Tacna sea una alternativa atractiva para evaluar dermatologia.',
  },
  {
    question: 'Se puede ahorrar frente a Chile?',
    answer:
      'En muchos casos si. Lo importante es que los costos pueden ser mas accesibles sin inventar precios exactos ni prometer un resultado fijo.',
  },
  {
    question: 'Como funciona la evaluacion?',
    answer:
      'Primero dejas tus datos, luego HolaTacna orienta el caso y coordina el siguiente paso con una clinica dermatologica verificada cuando corresponde.',
  },
]

export default function DermatologiaTacnaVsChilePage() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (loading) return

    setLoading(true)

    try {
      const searchParams = new URLSearchParams(window.location.search)
      const response = await fetch('/api/intake', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          phone,
          tourist_phone: phone,
          message: message || null,
          service_name: 'dermatologia',
          landing_path: '/dermatologia-tacna-vs-chile',
          city_interest: searchParams.get('city_interest') || null,
          utm_source: searchParams.get('utm_source') || null,
          utm_medium: searchParams.get('utm_medium') || null,
          utm_campaign: searchParams.get('utm_campaign') || null,
          utm_content: searchParams.get('utm_content') || null,
          utm_term: searchParams.get('utm_term') || null,
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
                Comparativa dermatologica
              </div>
              <h1 className="mb-4 text-4xl font-bold leading-tight sm:text-5xl">
                Dermatologia en Tacna vs Chile
              </h1>
              <p className="mb-6 text-lg leading-8 text-slate-600 sm:text-xl">
                Descubre por que pacientes de Chile viajan a Tacna para acceder a tratamientos
                dermatologicos mas accesibles y rapidos.
              </p>
              <div className="flex flex-wrap gap-3">
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
                <Link
                  href="/dermatologia-tacna"
                  className="rounded-xl border border-slate-300 bg-white px-5 py-3 font-bold text-slate-700 transition hover:border-slate-400 hover:text-slate-950"
                >
                  Conocer mas sobre dermatologia en Tacna
                </Link>
              </div>
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
              <h2 className="mb-4 text-2xl font-bold">Comparativa</h2>
              <div className="grid gap-4">
                {comparisonItems.map((item) => (
                  <div key={item.title} className={`rounded-2xl border p-4 ${item.tone}`}>
                    <div className="mb-2 text-sm font-bold uppercase tracking-[0.08em]">
                      {item.title}
                    </div>
                    <p className="text-sm leading-7 text-slate-700">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-2">
          <div className="rounded-[28px] bg-white p-8 shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
            <div className="mb-3 inline-block rounded-full bg-emerald-100 px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-emerald-700">
              Beneficios
            </div>
            <h2 className="mb-5 text-3xl font-bold">Por que muchos pacientes comparan Tacna vs Chile</h2>
            <ul className="grid gap-3 text-base leading-7 text-slate-700">
              {benefits.map((benefit) => (
                <li key={benefit} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                  {benefit}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[28px] bg-white p-8 shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
            <div className="mb-3 inline-block rounded-full bg-sky-100 px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-sky-700">
              Tratamientos consultados
            </div>
            <h2 className="mb-5 text-3xl font-bold">
              Dermatologo Tacna para chilenos y consultas frecuentes
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {treatments.map((item) => (
                <div key={item.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <h3 className="mb-2 text-xl font-bold">{item.title}</h3>
                  <p className="text-base leading-7 text-slate-700">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[28px] bg-white p-8 shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
            <div className="mb-3 inline-block rounded-full bg-sky-100 px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-sky-700">
              Como funciona
            </div>
            <h2 className="mb-5 text-3xl font-bold">Proceso comercial</h2>
            <ol className="grid gap-4">
              {steps.map((step, index) => (
                <li key={step} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 font-bold text-emerald-950">
                    {index + 1}
                  </span>
                  <div className="mt-3 text-base font-semibold leading-7 text-slate-900">{step}</div>
                </li>
              ))}
            </ol>
          </div>

          <div className="rounded-[28px] border border-sky-100 bg-sky-50/70 p-8 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
            <div className="mb-3 inline-block rounded-full bg-white px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-sky-700">
              Clinica dermatologica Tacna
            </div>
            <h2 className="mb-4 text-3xl font-bold">Contenido orientado a pacientes chilenos</h2>
            <p className="mb-4 text-base leading-8 text-slate-700 sm:text-lg">
              Esta pagina esta pensada para busquedas como dermatologia Tacna vs Chile,
              dermatologo Tacna para chilenos, tratamiento acne Tacna y clinica dermatologica
              Tacna. El foco es explicar por que existe un ahorro importante frente a Chile y por
              que Tacna puede ser una alternativa cercana para pacientes del norte de Chile.
            </p>
            <p className="text-base leading-8 text-slate-700 sm:text-lg">
              No prometemos procedimientos especificos ni resultados cerrados. Primero orientamos el
              caso y luego coordinamos con una clinica dermatologica verificada cuando corresponde.
            </p>
          </div>
        </div>

        <div className="mx-auto mt-8 max-w-4xl rounded-[28px] border border-emerald-100 bg-emerald-50/80 p-8 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
          <div className="mb-3 inline-block rounded-full bg-white px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-emerald-700">
            Siguiente paso
          </div>
          <h2 className="mb-3 text-3xl font-bold text-slate-950">
            Lista para volver a la pagina principal de dermatologia?
          </h2>
          <p className="mb-5 text-base leading-8 text-slate-600 sm:text-lg">
            Si esta comparacion ya te ayudo a decidir, vuelve a la landing principal para conocer
            mejor la propuesta comercial y solicitar tu evaluacion dermatologica.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/dermatologia-tacna"
              className="inline-flex items-center rounded-xl bg-emerald-500 px-5 py-3 font-bold text-emerald-950 transition hover:bg-emerald-400"
            >
              Solicitar evaluacion dermatologica
            </Link>
            <Link
              href="/dermatologia-tacna"
              className="inline-flex items-center rounded-xl border border-slate-300 bg-white px-5 py-3 font-bold text-slate-700 transition hover:border-slate-400 hover:text-slate-950"
            >
              Volver a la pagina principal de dermatologia
            </Link>
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
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                className="min-h-[140px] rounded-xl border border-slate-300 px-4 py-3"
                placeholder="Cuentanos tu caso o tus dudas sobre dermatologia en Tacna."
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

      <section className="px-5 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-[28px] bg-white p-8 shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
          <div className="mb-6">
            <div className="mb-3 inline-block rounded-full bg-emerald-100 px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-emerald-700">
              FAQ breve
            </div>
            <h2 className="text-3xl font-bold">Preguntas frecuentes</h2>
          </div>

          <div className="grid gap-5">
            {faqs.map((item) => (
              <div key={item.question} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="mb-2 text-xl font-bold">{item.question}</h3>
                <p className="text-base leading-7 text-slate-700">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
