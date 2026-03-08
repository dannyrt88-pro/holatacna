'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function OperacionOjosTacnaVsChilePage() {
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
          service_name: 'oftalmologia',
          landing_path: '/operacion-ojos-tacna-vs-chile',
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
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div className="rounded-[28px] bg-white p-8 shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
              <div className="mb-4 inline-block rounded-full bg-emerald-100 px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-emerald-700">
                Comparativa oftalmológica
              </div>
              <h1 className="mb-4 text-4xl font-bold leading-tight sm:text-5xl">
                Operación de Ojos en Tacna vs Chile
              </h1>
              <p className="mb-6 text-lg leading-8 text-slate-600 sm:text-xl">
                Descubre por qué muchos pacientes de Chile viajan a Tacna para acceder a atención
                oftalmológica más accesible y rápida.
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
              <h2 className="mb-4 text-2xl font-bold">Comparativa rápida</h2>
              <div className="grid gap-4">
                <div className="rounded-2xl border border-rose-100 bg-rose-50 p-4">
                  <div className="mb-2 text-sm font-bold uppercase tracking-[0.08em] text-rose-700">En Chile</div>
                  <p className="text-sm leading-7 text-slate-700">
                    La atención o los procedimientos oftalmológicos suelen tener costos más altos y
                    una coordinación inicial menos flexible.
                  </p>
                </div>

                <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-4">
                  <div className="mb-2 text-sm font-bold uppercase tracking-[0.08em] text-emerald-700">En Tacna</div>
                  <p className="text-sm leading-7 text-slate-700">
                    Los costos pueden ser considerablemente menores, con una alternativa más accesible
                    para pacientes del norte de Chile.
                  </p>
                </div>

                <div className="rounded-2xl border border-sky-100 bg-sky-50 p-4">
                  <div className="mb-2 text-sm font-bold uppercase tracking-[0.08em] text-sky-700">Cercanía</div>
                  <p className="text-sm leading-7 text-slate-700">
                    La cercanía con la frontera facilita la atención y hace más simple coordinar una
                    evaluación rápida por WhatsApp.
                  </p>
                </div>

                <div className="rounded-2xl border border-amber-100 bg-amber-50 p-4">
                  <div className="mb-2 text-sm font-bold uppercase tracking-[0.08em] text-amber-700">Ahorro</div>
                  <p className="text-sm leading-7 text-slate-700">
                    Muchos clientes buscan un ahorro importante frente a Chile y mejores condiciones
                    de acceso comercial antes de viajar.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl grid gap-6 lg:grid-cols-2">
          <div className="rounded-[28px] bg-white p-8 shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
            <h2 className="mb-5 text-3xl font-bold">Beneficios para pacientes de Chile</h2>
            <ul className="grid gap-3 text-base leading-7 text-slate-700">
              <li>• ahorro frente a Chile</li>
              <li>• cercanía con Tacna</li>
              <li>• atención rápida</li>
              <li>• clínicas verificadas</li>
              <li>• coordinación por WhatsApp</li>
            </ul>
          </div>

          <div className="rounded-[28px] bg-white p-8 shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
            <h2 className="mb-5 text-3xl font-bold">Cómo funciona</h2>
            <ol className="grid gap-4 text-base leading-7 text-slate-700">
              <li>
                <strong>1. El paciente deja sus datos</strong>
                <div>
                  Nos comparte su nombre, WhatsApp y una breve explicación de lo que desea consultar.
                </div>
              </li>
              <li>
                <strong>2. HolaTacna orienta el caso</strong>
                <div>
                  Revisamos la solicitud y ordenamos el primer contacto comercial con enfoque en rapidez.
                </div>
              </li>
              <li>
                <strong>3. Se coordina con clínica oftalmológica</strong>
                <div>
                  Cuando corresponde, alineamos la consulta con una clínica verificada dentro del flujo.
                </div>
              </li>
              <li>
                <strong>4. Se agenda evaluación o tratamiento</strong>
                <div>
                  Con la información validada, el cliente puede avanzar a evaluación o al tratamiento que se determine después.
                </div>
              </li>
            </ol>
          </div>
        </div>

        <div className="mx-auto mt-8 max-w-4xl rounded-[28px] border border-emerald-100 bg-emerald-50/80 p-8 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
          <div className="mb-3 inline-block rounded-full bg-white px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-emerald-700">
            Siguiente paso
          </div>
          <h2 className="mb-3 text-3xl font-bold text-slate-950">
            ¿Listo para solicitar tu evaluación oftalmológica?
          </h2>
          <p className="mb-5 text-base leading-8 text-slate-600 sm:text-lg">
            Si esta comparación ya te ayudó a decidir, vuelve a la página principal de ojos en
            Tacna y deja tu solicitud para que el equipo comercial te contacte.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/operacion-ojos-tacna"
              className="inline-flex items-center rounded-xl bg-emerald-500 px-5 py-3 font-bold text-emerald-950 transition hover:bg-emerald-400"
            >
              Solicitar evaluación oftalmológica
            </Link>
            <Link
              href="/operacion-ojos-tacna"
              className="inline-flex items-center rounded-xl border border-slate-300 bg-white px-5 py-3 font-bold text-slate-700 transition hover:border-slate-400 hover:text-slate-950"
            >
              Conocer más sobre atención ocular en Tacna
            </Link>
          </div>
        </div>
      </section>

      <section id="formulario-evaluacion" className="px-5 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl rounded-[28px] bg-white p-8 shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
          <div className="mb-6">
            <div className="mb-3 inline-block rounded-full bg-sky-100 px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-sky-700">
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
                placeholder="Cuéntanos tu caso o tus dudas sobre atención oftalmológica en Tacna."
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

      <section className="px-5 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-[28px] bg-white p-8 shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
          <div className="mb-6">
            <div className="mb-3 inline-block rounded-full bg-emerald-100 px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-emerald-700">
              FAQ breve
            </div>
            <h2 className="text-3xl font-bold">Preguntas frecuentes</h2>
          </div>

          <div className="grid gap-5">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <h3 className="mb-2 text-xl font-bold">¿Vale la pena viajar a Tacna para atención oftalmológica?</h3>
              <p className="text-base leading-7 text-slate-700">
                Para muchos clientes de Chile sí. La combinación de ahorro, cercanía y coordinación previa hace que
                Tacna sea una alternativa atractiva para evaluar atención oftalmológica.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <h3 className="mb-2 text-xl font-bold">¿Se puede ahorrar frente a Chile?</h3>
              <p className="text-base leading-7 text-slate-700">
                En muchos casos sí. Lo relevante es que los costos pueden ser más accesibles y representar una
                alternativa comercialmente conveniente.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <h3 className="mb-2 text-xl font-bold">¿Cómo funciona la evaluación?</h3>
              <p className="text-base leading-7 text-slate-700">
                Primero nos dejas tus datos, luego HolaTacna orienta el caso y coordina el siguiente paso con una
                clínica verificada cuando corresponde.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
