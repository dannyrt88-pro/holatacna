import type { Metadata } from 'next'
import Link from 'next/link'
import { ProviderOnboardingForm } from '@/components/forms/provider-onboarding-form'

export const metadata: Metadata = {
  title: 'Registro de Proveedores',
  description:
    'Formulario de contacto y registro comercial para proveedores interesados en operar con HolaTacna.',
}

export default function ProviderRegistrationPage() {
  return (
    <main className="min-h-screen bg-slate-100 px-6 py-10 text-slate-950">
      <div className="mx-auto max-w-6xl">
        <section className="mb-6 rounded-[32px] bg-[linear-gradient(135deg,#082f49_0%,#155e75_50%,#15803d_100%)] p-8 text-white shadow-xl">
          <div className="mb-3 inline-block rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em]">
            Alianzas comerciales
          </div>
          <h1 className="max-w-3xl text-4xl font-bold leading-tight">
            Unete como proveedor aliado de HolaTacna
          </h1>
          <p className="mt-3 max-w-3xl text-base leading-8 text-white/85">
            Si representas una clinica, alojamiento, transporte, restaurante u otro servicio en
            Tacna, puedes enviarnos tu informacion para evaluar una posible incorporacion a la red.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/"
              className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/15"
            >
              Volver a HolaTacna
            </Link>
          </div>
        </section>

        <section className="mb-6 grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[28px] bg-white p-6 shadow-lg">
            <div className="mb-4 inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-emerald-700">
              Beneficios
            </div>
            <div className="grid gap-4">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <h2 className="text-lg font-bold">Mayor visibilidad</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Presenta tu negocio ante personas que buscan opciones confiables en Tacna.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <h2 className="text-lg font-bold">Contactos con potencial real</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Acercate a pacientes y visitantes de Chile que necesitan orientacion antes de
                  decidir su viaje o atencion.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <h2 className="text-lg font-bold">Proceso claro y profesional</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Revisamos cada postulacion para construir una red ordenada, confiable y alineada
                  con la experiencia que queremos ofrecer.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-5">
            <div className="rounded-[28px] bg-white p-6 shadow-lg">
              <div className="mb-4 inline-flex rounded-full bg-sky-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-sky-700">
                Proceso
              </div>
              <div className="grid gap-4">
                {[
                  'Completa tu registro con la informacion principal de tu negocio.',
                  'Revisamos tus datos y evaluamos si existe encaje con la red.',
                  'Si hay afinidad, te contactamos para continuar la conversacion.',
                ].map((step, index) => (
                  <div key={step} className="flex gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-950 font-bold text-white">
                      {index + 1}
                    </div>
                    <p className="text-sm font-semibold leading-6 text-slate-800">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[28px] border border-emerald-200 bg-emerald-50 p-6 shadow-lg">
              <div className="mb-2 text-sm font-bold uppercase tracking-[0.14em] text-emerald-700">
                Confianza
              </div>
              <p className="text-sm leading-7 text-emerald-950">
                Esta postulacion llega directamente al equipo de HolaTacna. Revisamos cada perfil
                de forma manual antes de avanzar a una posible incorporacion.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-6 rounded-[24px] border border-slate-200 bg-white p-6 shadow-lg sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
                Informacion institucional
              </div>
              <p className="text-base font-semibold text-slate-900">
                Quieres entender mejor como funciona la red antes de postular?
              </p>
            </div>
            <Link
              href="/red"
              className="inline-flex rounded-xl border border-slate-300 bg-slate-50 px-5 py-3 font-semibold text-slate-800 transition hover:bg-slate-100"
            >
              Conocer la red
            </Link>
          </div>
        </section>

        <ProviderOnboardingForm
          mode="provider-self-service"
          title="Comparte la informacion principal de tu negocio"
          description="Completa este formulario para que podamos conocer tu servicio, tu zona de cobertura y la mejor forma de contactarte."
          submitLabel="Enviar postulacion"
          successMessage="Hemos recibido tu postulacion. El equipo de HolaTacna revisara tu informacion y, si tu perfil encaja con la red que estamos construyendo, nos pondremos en contacto contigo."
        />
      </div>
    </main>
  )
}
