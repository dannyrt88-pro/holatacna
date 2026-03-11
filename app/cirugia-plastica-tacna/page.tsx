import Link from 'next/link'
import type { Metadata } from 'next'
import { Suspense } from 'react'
import { LeadCaptureForm } from '@/components/forms/lead-capture-form'

const benefits = [
  'Orientación inicial antes de viajar desde Chile.',
  'Información clara para comparar opciones en Tacna.',
  'Coordinación previa por WhatsApp.',
  'Clínicas y especialistas previamente revisados.',
]

const procedures = [
  'Evaluación inicial de cirugía plástica',
  'Consulta sobre procedimientos faciales',
  'Consulta sobre procedimientos corporales',
  'Orientación sobre tiempos, pasos y recuperación',
]

const steps = [
  'Dejas tu consulta y el tratamiento que deseas evaluar.',
  'HolaTacna revisa tu caso y ordena la orientación inicial.',
  'Se coordina el siguiente paso con la clínica o especialista.',
]

export const metadata: Metadata = {
  title: 'Cirugía plástica en Tacna para pacientes de Chile | HolaTacna',
  description:
    'Información sobre cirugía plástica en Tacna para pacientes que viajan desde Chile.',
}

export default function CirugiaPlasticaTacnaPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="bg-[linear-gradient(180deg,#fff7ed_0%,#f8fafc_100%)] px-5 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div className="rounded-[28px] bg-white p-8 shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
              <div className="mb-4 inline-block rounded-full bg-orange-100 px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-orange-700">
                Cirugía plástica en Tacna
              </div>
              <h1 className="mb-4 text-4xl font-bold leading-tight sm:text-5xl">
                Cirugía plástica en Tacna para pacientes de Chile
              </h1>
              <p className="mb-6 text-lg leading-8 text-slate-600 sm:text-xl">
                Información y orientación inicial para pacientes que viajan desde Chile para
                evaluar cirugía plástica en Tacna.
              </p>
              <Link
                href="#formulario-evaluacion"
                className="inline-flex rounded-xl bg-emerald-500 px-5 py-3 font-bold text-emerald-950 transition hover:bg-emerald-400"
              >
                Solicitar evaluación
              </Link>
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
              <h2 className="mb-4 text-2xl font-bold">Beneficios para pacientes de Chile</h2>
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
              Tratamientos
            </div>
            <h2 className="mb-5 text-3xl font-bold">Consultas frecuentes</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {procedures.map((procedure) => (
                <div
                  key={procedure}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-lg font-semibold text-slate-800"
                >
                  {procedure}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] bg-white p-8 shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
            <div className="mb-3 inline-block rounded-full bg-sky-100 px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-sky-700">
              Cómo funciona
            </div>
            <h2 className="mb-5 text-3xl font-bold">Explicación del tratamiento</h2>
            <div className="grid gap-4">
              {steps.map((step, index) => (
                <div
                  key={step}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-base leading-7 text-slate-700"
                >
                  <span className="mb-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 font-bold text-emerald-950">
                    {index + 1}
                  </span>
                  <div className="mt-3 font-semibold text-slate-900">{step}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="formulario-evaluacion" className="px-5 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl rounded-[28px] bg-white p-8 shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
          <div className="mb-6">
            <div className="mb-3 inline-block rounded-full bg-orange-100 px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-orange-700">
              Solicita información
            </div>
          </div>

          <Suspense fallback={<div className="text-sm text-slate-500">Cargando formulario...</div>}>
            <LeadCaptureForm
              serviceSlug="cirugia-plastica"
              serviceName="Cirugía plástica"
              landingPath="/cirugia-plastica-tacna"
              pageType="service"
              variant="primary"
              heading="Solicitar evaluación"
              submitLabel="Solicitar evaluación"
              messageLabel="Mensaje"
              messagePlaceholder="Cuéntanos qué tratamiento deseas evaluar o qué dudas quieres resolver antes de viajar."
              successMessage="Solicitud enviada. Nuestro equipo te contactará por WhatsApp."
            />
          </Suspense>
        </div>
      </section>
    </main>
  )
}
