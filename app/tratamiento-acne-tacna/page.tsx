import Link from 'next/link'
import type { Metadata } from 'next'
import { Suspense } from 'react'
import { LeadCaptureForm } from '@/components/forms/lead-capture-form'

const benefits = [
  'Orientacion inicial antes de viajar desde Chile.',
  'Informacion puntual para comparar opciones dermatologicas para acne en Tacna.',
  'Coordinacion previa con especialistas que revisan casos de pacientes de Chile.',
  'Apoyo para resolver dudas sobre acne activo, secuelas y manchas post acne.',
]

const treatmentScope = [
  'Evaluacion para acne activo',
  'Consulta por manchas post acne',
  'Revision de secuelas y marcas',
  'Orientacion sobre cuidados y seguimiento',
]

const steps = [
  'Dejas tu consulta y explicas tu caso dermatologico relacionado con acne.',
  'HolaTacna revisa tu caso y ordena una orientacion inicial.',
  'Se coordina el contacto con la clinica o especialista en Tacna.',
]

export const metadata: Metadata = {
  title: 'Tratamiento de acne en Tacna para pacientes chilenos | HolaTacna',
  description:
    'Conoce opciones de tratamiento de acne en Tacna para pacientes de Chile que buscan evaluacion dermatologica especifica antes de viajar.',
}

export default function TratamientoAcneTacnaPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="bg-[linear-gradient(180deg,#ecfdf5_0%,#f8fafc_100%)] px-5 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div className="rounded-[28px] bg-white p-8 shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
              <div className="mb-4 inline-block rounded-full bg-emerald-100 px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-emerald-700">
                Tratamiento de acne en Tacna
              </div>
              <h1 className="mb-4 text-4xl font-bold leading-tight sm:text-5xl">
                Tratamiento de acne en Tacna para pacientes chilenos
              </h1>
              <p className="mb-6 text-lg leading-8 text-slate-600 sm:text-xl">
                Informacion para pacientes de Chile que buscan una evaluacion dermatologica
                especifica para acne antes de viajar a Tacna.
              </p>
              <Link
                href="#formulario-evaluacion"
                className="inline-flex rounded-xl bg-emerald-500 px-5 py-3 font-bold text-emerald-950 transition hover:bg-emerald-400"
              >
                Solicitar evaluacion
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
              Tratamiento
            </div>
            <h2 className="mb-5 text-3xl font-bold">Que puedes evaluar</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {treatmentScope.map((item) => (
                <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-lg font-semibold text-slate-800">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] bg-white p-8 shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
            <div className="mb-3 inline-block rounded-full bg-emerald-100 px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-emerald-700">
              Como funciona
            </div>
            <h2 className="mb-5 text-3xl font-bold">Explicacion del tratamiento</h2>
            <div className="grid gap-4">
              {steps.map((step, index) => (
                <div key={step} className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-base leading-7 text-slate-700">
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
            <div className="mb-3 inline-block rounded-full bg-emerald-100 px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-emerald-700">
              Solicita informacion
            </div>
          </div>
          <Suspense fallback={<div className="text-sm text-slate-500">Cargando formulario...</div>}>
            <LeadCaptureForm
              serviceSlug="tratamiento-acne"
              serviceName="Tratamiento de acne"
              landingPath="/tratamiento-acne-tacna"
              pageType="seo"
              variant="primary"
              heading="Solicitar evaluacion"
              submitLabel="Solicitar evaluacion"
              messageLabel="Mensaje"
              messagePlaceholder="Cuentanos tu caso de acne, manchas o secuelas y que dudas quieres resolver antes de viajar."
              successMessage="Solicitud enviada. Nuestro equipo te contactara por WhatsApp."
            />
          </Suspense>
        </div>
      </section>
    </main>
  )
}
