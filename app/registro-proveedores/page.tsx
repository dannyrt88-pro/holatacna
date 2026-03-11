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
            Registro de proveedores HolaTacna
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-white/85">
            Si tu clinica, centro medico o servicio quiere formar parte de la red comercial de
            HolaTacna, completa este registro. Evaluaremos tu cobertura, propuesta de valor y
            encaje operativo antes de la activacion.
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

        <ProviderOnboardingForm
          mode="provider-self-service"
          title="Completa tu perfil comercial"
          description="Este formulario nos ayuda a validar tu servicio, ciudad de cobertura, canal de contacto y condiciones preliminares para trabajar contigo cuando activemos la red."
          submitLabel="Enviar registro comercial"
          successMessage="Registro enviado. HolaTacna recibio tu informacion y la revisara para continuar la conversacion comercial."
        />
      </div>
    </main>
  )
}
