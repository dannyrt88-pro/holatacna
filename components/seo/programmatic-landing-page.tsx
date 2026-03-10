import { Suspense } from 'react'
import Link from 'next/link'
import { LeadCaptureForm } from '@/components/forms/lead-capture-form'
import type { SeoIntentLandingEntry } from '@/lib/seo/landing-catalog'

type ProgrammaticLandingPageProps = {
  landing: SeoIntentLandingEntry
}

function getIntentHeading(intentSlug: string, cityName: string, serviceName: string) {
  if (intentSlug === 'precio') {
    return `Precios de ${serviceName} en Tacna para pacientes de ${cityName}`
  }

  return `${serviceName} en Tacna vs Chile para pacientes de ${cityName}`
}

function getIntentBody(intentSlug: string, cityName: string, serviceName: string) {
  if (intentSlug === 'precio') {
    return [
      `Muchos pacientes de ${cityName} buscan informacion de precios antes de decidir si viajar a Tacna.`,
      `Esta pagina ayuda a entender mejor costos aproximados, factores que influyen en el presupuesto y como solicitar orientacion inicial para ${serviceName}.`,
    ]
  }

  return [
    `Pacientes de ${cityName} comparan ${serviceName} en Tacna vs Chile para entender diferencias de costos, tiempos y cercania.`,
    `Aqui puedes revisar una comparacion general y solicitar orientacion antes de planificar tu viaje.`,
  ]
}

function getIntentFaq(intentSlug: string, cityName: string, serviceName: string) {
  if (intentSlug === 'precio') {
    return [
      {
        question: `Se puede consultar el precio de ${serviceName} antes de viajar desde ${cityName}?`,
        answer:
          'Si. Puedes dejar tu consulta y recibir una orientacion inicial para entender valores referenciales y pasos previos.',
      },
      {
        question: 'El precio final se confirma de inmediato?',
        answer:
          'No siempre. El valor puede variar segun evaluacion medica, diagnostico y alcance exacto del tratamiento.',
      },
      {
        question: 'Puedo resolver dudas por WhatsApp antes del viaje?',
        answer:
          'Si. La orientacion inicial ayuda a ordenar tu caso antes de coordinar una atencion en Tacna.',
      },
    ]
  }

  return [
    {
      question: `${serviceName} en Tacna vs Chile: que suelen comparar los pacientes de ${cityName}?`,
      answer:
        'Generalmente comparan precios, tiempos de atencion, cercania con la frontera y claridad de la orientacion previa.',
    },
    {
      question: 'HolaTacna reemplaza la evaluacion medica?',
      answer:
        'No. HolaTacna orienta al paciente y ayuda a entender opciones antes de coordinar una atencion.',
    },
    {
      question: 'Puedo solicitar una comparacion inicial antes de decidir?',
      answer:
        'Si. Puedes dejar tu consulta para recibir una orientacion general antes de viajar.',
    },
  ]
}

export function ProgrammaticLandingPage({ landing }: ProgrammaticLandingPageProps) {
  const { city, service, intent, path, title, description } = landing
  const intentBody = getIntentBody(intent.slug, city.name, service.name)
  const faqItems = getIntentFaq(intent.slug, city.name, service.name)

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className={`${service.gradientClass} px-5 py-14 text-white sm:px-6 lg:px-8 lg:py-20`}>
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div>
            <div className="mb-5 inline-flex rounded-full bg-white/15 px-4 py-2 text-sm font-semibold uppercase tracking-[0.24em]">
              {intent.name} | Pacientes de {city.name}
            </div>
            <h1 className="mb-4 text-4xl font-bold leading-tight sm:text-5xl">{title}</h1>
            <p className="mb-6 max-w-3xl text-lg leading-8 text-white/90">{description}</p>

            <div className="grid gap-3 text-base leading-7 text-white/90 sm:text-lg">
              {intentBody.map((paragraph) => (
                <div key={paragraph}>{paragraph}</div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={`/${city.slug}/${service.slug}`}
                className="rounded-xl bg-white px-5 py-3 font-bold text-slate-950 transition hover:bg-slate-100"
              >
                Ver pagina principal
              </Link>
              <Link
                href={service.primaryHref}
                className="rounded-xl border border-white/20 bg-white/10 px-5 py-3 font-bold text-white transition hover:bg-white/15"
              >
                {service.primaryLabel}
              </Link>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 text-slate-950 shadow-xl">
            <Suspense fallback={<div className="min-h-[320px] rounded-2xl bg-slate-50" />}>
              <LeadCaptureForm
                serviceSlug={service.serviceSlug}
                serviceName={service.serviceName}
                cityInterest={city.name}
                landingPath={path}
                pageType={intent.pageType}
                heading={getIntentHeading(intent.slug, city.name, service.name)}
                submitLabel="Solicitar orientacion"
                messagePlaceholder={intent.ctaContext}
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
              {service.benefits.map((benefit) => (
                <div key={benefit} className="rounded-2xl bg-slate-50 p-4">
                  {benefit}
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="mb-5 text-3xl font-bold">
              {intent.slug === 'precio' ? 'Que revisar sobre precios' : 'Comparacion general con Chile'}
            </h2>
            <div className="grid gap-4">
              {intent.copyHints.map((hint) => (
                <div key={hint} className="rounded-2xl border border-slate-200 p-4 text-slate-700">
                  {hint}
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="px-5 pb-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl rounded-3xl bg-emerald-50 p-8 text-emerald-950">
          <h2 className="mb-4 text-3xl font-bold">Orientacion para pacientes de {city.name}</h2>
          <p className="text-lg leading-8">
            {intent.ctaContext} HolaTacna ayuda a pacientes de Chile a entender mejor sus opciones
            de {service.name.toLowerCase()} en Tacna antes de tomar una decision.
          </p>
        </div>
      </section>

      <section className="bg-slate-900 px-5 py-14 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-6 text-3xl font-bold">Preguntas frecuentes</h2>
          <div className="grid gap-4 lg:grid-cols-3">
            {faqItems.map((faq) => (
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
