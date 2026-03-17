'use client'

import Link from 'next/link'
import { LeadCaptureForm } from '@/components/forms/lead-capture-form'

export default function OperacionOjosTacnaPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="bg-[linear-gradient(180deg,#e0f2fe_0%,#f8fafc_100%)] px-5 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div className="rounded-[28px] bg-white p-8 shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
              <div className="mb-4 inline-block rounded-full bg-sky-100 px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-sky-700">
                Oftalmología en Tacna
              </div>
              <h1 className="mb-4 text-4xl font-bold leading-tight sm:text-5xl">
                Operación de Ojos en Tacna
              </h1>
              <p className="mb-6 text-lg leading-8 text-slate-600 sm:text-xl">
                Pacientes de Chile viajan a Tacna para acceder a atención oftalmológica más
                accesible y rápida.
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
                <li>• ahorro frente a Chile</li>
                <li>• cercanía con la frontera</li>
                <li>• atención rápida</li>
                <li>• apoyo por WhatsApp</li>
                <li>• clínicas verificadas</li>
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
          <h2 className="mb-3 text-3xl font-bold text-slate-950">¿Conviene atenderse en Tacna?</h2>
          <p className="mb-5 text-base leading-8 text-slate-600 sm:text-lg">
            Si todavía estás comparando opciones, revisa la comparación entre Tacna y Chile para
            entender mejor el ahorro, la cercanía y la velocidad de coordinación.
          </p>
          <Link
            href="/operacion-ojos-tacna-vs-chile"
            className="inline-flex items-center rounded-xl bg-sky-600 px-5 py-3 font-bold text-white transition hover:bg-sky-500"
          >
            Ver comparación Tacna vs Chile
          </Link>
        </div>

        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-2">
          <div className="rounded-[28px] bg-white p-8 shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
            <div className="mb-3 inline-block rounded-full bg-emerald-100 px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-emerald-700">
              Qué suelen consultar
            </div>
            <h2 className="mb-5 text-3xl font-bold">Consultas oftalmológicas frecuentes</h2>
            <div className="grid gap-4">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="mb-2 text-xl font-bold">Cirugía láser</h3>
                <p className="text-base leading-7 text-slate-700">
                  Muchas personas consultan por alternativas oftalmológicas orientadas a mejorar su
                  visión con evaluación previa y orientación profesional.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="mb-2 text-xl font-bold">Evaluación oftalmológica</h3>
                <p className="text-base leading-7 text-slate-700">
                  También recibimos solicitudes de clientes que quieren revisar su caso con una
                  clínica oftalmológica antes de decidir el siguiente paso.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="mb-2 text-xl font-bold">Problemas visuales frecuentes</h3>
                <p className="text-base leading-7 text-slate-700">
                  La página está pensada para personas que buscan una orientación inicial segura
                  sobre atención oftalmológica en Tacna.
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
                <strong>1. El cliente deja sus datos</strong>
                <div>
                  Nos comparte su nombre, WhatsApp y una breve explicación de lo que desea
                  consultar.
                </div>
              </li>
              <li>
                <strong>2. HolaTacna orienta el caso</strong>
                <div>
                  Revisamos la solicitud y ordenamos el primer contacto comercial con enfoque en
                  rapidez y claridad.
                </div>
              </li>
              <li>
                <strong>3. Se coordina con clínica oftalmológica</strong>
                <div>
                  Cuando corresponde, alineamos la consulta con una clínica verificada dentro del
                  flujo de atención.
                </div>
              </li>
              <li>
                <strong>4. Se agenda evaluación o tratamiento</strong>
                <div>
                  Con la información validada, el cliente puede avanzar hacia evaluación o al
                  tratamiento que se determine posteriormente.
                </div>
              </li>
            </ol>
          </div>
        </div>
      </section>

      <section id="formulario-evaluacion" className="px-5 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl rounded-[28px] bg-white p-8 shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
          <div className="mb-6">
            <div className="mb-3 inline-block rounded-full bg-emerald-100 px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-emerald-700">
              Solicita información
            </div>
          </div>

          <LeadCaptureForm
            serviceSlug="operacion-ojos"
            serviceName="Operación de Ojos"
            landingPath="/operacion-ojos-tacna"
            pageType="service"
            variant="primary"
            heading="Solicitar evaluación"
            submitLabel="Solicitar evaluación"
            messageLabel="Mensaje"
            messagePlaceholder="Cuéntanos qué tipo de evaluación visual o tratamiento deseas consultar."
            successMessage="¡Gracias! Te contactamos pronto por WhatsApp"
          />
        </div>
      </section>

      <section className="px-5 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-[28px] bg-[linear-gradient(135deg,#0f172a_0%,#0f766e_100%)] p-8 text-white shadow-[0_18px_40px_rgba(15,23,42,0.16)]">
          <div className="mb-3 inline-block rounded-full bg-white/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-emerald-100">
            Confianza comercial
          </div>
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
            Atención oftalmológica en Tacna con orientación clara desde el primer contacto
          </h2>
          <p className="max-w-3xl text-base leading-8 text-slate-100 sm:text-lg">
            Si estás evaluando atención oftalmológica en Tacna, deja tu solicitud. El equipo
            comercial de HolaTacna te ayudará a ordenar el caso y coordinar el siguiente paso por
            WhatsApp.
          </p>
        </div>
      </section>
    </main>
  )
}
