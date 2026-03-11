import Link from 'next/link'
import { Suspense } from 'react'
import { LeadCaptureForm } from '@/components/forms/lead-capture-form'
import type { SeoLandingEntry } from '@/lib/seo/landing-catalog'

type ServiceCityPageProps = {
  landing: SeoLandingEntry
}

export function ServiceCityPage({ landing }: ServiceCityPageProps) {
  const { city, service, path } = landing
  const formOverride = service.cityFormOverrides?.[city.slug]
  const resolvedBenefits = service.cityBenefitsOverrides?.[city.slug] || service.benefits
  const resolvedContextCopy =
    service.cityContextOverrides?.[city.slug] ||
    (service.slug === 'operacion-ojos'
      ? `Muchos pacientes de ${city.name} viajan a Tacna para cirugia ocular o evaluacion visual especializada. Puedes solicitar una evaluacion inicial y recibir orientacion antes de viajar.`
      : service.commercialBlock)
  const commercialCopy =
    resolvedContextCopy

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className={`${service.gradientClass} px-5 py-14 text-white sm:px-6 lg:px-8 lg:py-20`}>
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div>
            <div className="mb-5 inline-flex rounded-full bg-white/15 px-4 py-2 text-sm font-semibold tracking-[0.24em] uppercase">
              Atencion medica en Tacna para pacientes de {city.name}
            </div>
            <h1 className="mb-4 text-4xl font-bold leading-tight sm:text-5xl">
              {service.name} en Tacna para pacientes de {city.name}
            </h1>
            <p className="mb-6 max-w-3xl text-lg leading-8 text-white/90">
              {landing.description}
            </p>

            <div className="grid gap-3 text-base leading-7 text-white/90 sm:text-lg">
              <div>Atendemos consultas de pacientes de {city.name} y otras ciudades del norte de Chile.</div>
              <div>Recibe orientacion antes del viaje y resuelve tus dudas antes de viajar a Tacna.</div>
              <div>Te ayudamos a entender tus opciones con informacion clara antes de tomar una decision.</div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={service.primaryHref}
                className="rounded-xl bg-white px-5 py-3 font-bold text-slate-950 transition hover:bg-slate-100"
              >
                {service.primaryLabel}
              </Link>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 text-slate-950 shadow-xl ring-1 ring-slate-200/80">
            <Suspense fallback={<div className="min-h-[320px] rounded-2xl bg-slate-50" />}>
              <LeadCaptureForm
                serviceSlug={service.serviceSlug}
                serviceName={service.serviceName}
                cityInterest={city.name}
                landingPath={path}
                pageType="seo"
                formHeading={formOverride?.formHeading}
                heading={service.formHeading}
                submitLabel="Solicitar informacion"
                messageLabel={formOverride?.messageLabel}
                messagePlaceholder={formOverride?.messagePlaceholder || service.messagePlaceholder}
                includePreferredDate={formOverride?.includePreferredDate}
                preferredDateLabel={formOverride?.preferredDateLabel}
                includeAdditionalServices={formOverride?.includeAdditionalServices}
                additionalServicesLabel={formOverride?.additionalServicesLabel}
                additionalServicesHelperText={formOverride?.additionalServicesHelperText}
                additionalServicesOptions={formOverride?.additionalServicesOptions}
              />
            </Suspense>
          </div>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_1fr]">
          <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="mb-5 text-3xl font-bold">Beneficios para pacientes de {city.name}</h2>
            <div className="grid gap-4 text-slate-700">
              {resolvedBenefits.map((benefit) => (
                <div key={benefit} className="rounded-2xl bg-slate-50 p-4">
                  {benefit}
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="mb-5 text-3xl font-bold">Como funciona el proceso</h2>
            <div className="grid gap-4">
              {service.process.map((step) => (
                <div key={step} className="rounded-2xl border border-slate-200 p-4">
                  <p className="text-slate-700">{step}</p>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="px-5 pb-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl rounded-3xl bg-emerald-50 p-8 text-emerald-950">
          <h2 className="mb-4 text-3xl font-bold">
            {service.slug === 'operacion-ojos'
              ? `Evaluacion oftalmologica para pacientes de ${city.name}`
              : `Atencion para pacientes de ${city.name}`}
          </h2>
          <p className="text-lg leading-8">{commercialCopy}</p>
        </div>
      </section>

      <section className="bg-slate-900 px-5 py-14 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-6 text-3xl font-bold">Preguntas frecuentes</h2>
          <div className="grid gap-4 lg:grid-cols-3">
            {service.faq.map((faq) => (
              <article key={faq.question} className="rounded-3xl bg-white/5 p-6">
                <h3 className="mb-3 text-xl font-semibold">{faq.question}</h3>
                <p className="text-white/80">{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
