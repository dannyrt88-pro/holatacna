'use client'

import Link from 'next/link'
import { Suspense } from 'react'
import { LeadCaptureForm } from '@/components/forms/lead-capture-form'

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
            <LeadCaptureForm
              serviceSlug="implantes-dentales"
              serviceName="Implantes Dentales"
              landingPath="/implantes-dentales-tacna"
              pageType="service"
              variant="primary"
              heading="Solicitar Evaluación"
              submitLabel="Solicitar Evaluación"
              messageLabel="Mensaje (opcional)"
              messagePlaceholder="Cuéntanos qué evaluación buscas o qué dudas tienes."
              successMessage="Solicitud enviada. Nuestro equipo te contactará por WhatsApp."
            />
          </Suspense>
        </div>
      </section>
    </main>
  )
}
