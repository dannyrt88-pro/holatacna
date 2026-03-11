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
      `Muchos pacientes de ${cityName} buscan información de precios antes de decidir si viajar a Tacna.`,
      `Esta página ayuda a entender mejor costos aproximados, factores que influyen en el valor final y cómo solicitar orientación inicial para ${serviceName}.`,
    ]
  }

  return [
    `Pacientes de ${cityName} comparan ${serviceName} en Tacna vs Chile para entender diferencias de costos, tiempos y cercanía.`,
    `Aquí puedes revisar una comparación general y solicitar orientación antes de planificar tu viaje.`,
  ]
}

function getPriceComparisonRows(serviceName: string) {
  return [
    {
      label: `Precio de ${serviceName.toLowerCase()}`,
      chile: 'Suele percibirse como más alto o menos claro antes de la evaluación.',
      tacna: 'Suele consultarse como una alternativa más accesible para pacientes de Chile.',
    },
    {
      label: 'Orientación antes del viaje',
      chile: 'No siempre se resuelven dudas antes de agendar.',
      tacna: 'Se puede pedir orientación inicial y ordenar el caso antes del viaje.',
    },
    {
      label: 'Planificación del viaje',
      chile: 'Muchas veces el paciente necesita resolver dudas de costos y tiempos antes de decidir su viaje.',
      tacna: 'Permite coordinar tiempos, costos referenciales y dudas antes de cruzar la frontera.',
    },
  ]
}

function getPriceFactors(serviceName: string) {
  return [
    `Evaluación médica inicial para ${serviceName}.`,
    'Complejidad del caso y necesidades específicas del paciente.',
    'Exámenes previos o imágenes de apoyo cuando corresponda.',
    'Cantidad de sesiones, etapas o procedimientos requeridos.',
    'Materiales, tecnología o alcance del tratamiento.',
  ]
}

function getComparisonRows() {
  return [
    {
      label: 'Costos',
      chile: 'Muchos pacientes perciben costos más altos en varias consultas o tratamientos.',
      tacna: 'Tacna suele evaluarse como una alternativa más conveniente para pacientes del norte de Chile.',
    },
    {
      label: 'Tiempos de atención',
      chile: 'En algunos casos puede existir mayor espera para evaluación o coordinación.',
      tacna: 'Muchos pacientes valoran una coordinación más rápida antes del viaje.',
    },
    {
      label: 'Cercanía',
      chile: 'Depende de la ciudad y de la disponibilidad local.',
      tacna: 'La cercanía con la frontera facilita la comparación para Arica, Iquique y Antofagasta.',
    },
    {
      label: 'Orientación previa',
      chile: 'No siempre hay una guía clara antes de decidir.',
      tacna: 'HolaTacna ayuda a resolver dudas y ordenar la consulta antes de viajar.',
    },
  ]
}

function getComparisonCases(cityName: string) {
  return [
    `Pacientes de ${cityName} que quieren comparar alternativas antes de viajar.`,
    'Pacientes que buscan más claridad sobre costos y tiempos.',
    'Pacientes que desean orientación antes de decidir.',
  ]
}

function getIntentSummaryCards(intentSlug: string) {
  if (intentSlug === 'precio') {
    return [
      {
        title: 'Factores que influyen en el precio',
        description:
          'Revisa qué elementos pueden cambiar el valor final de un tratamiento según evaluación, complejidad y pasos previos.',
      },
      {
        title: 'Comparación referencial Chile vs Tacna',
        description:
          'Entiende por qué muchos pacientes comparan Tacna como una alternativa más accesible antes de viajar.',
      },
      {
        title: 'Orientación previa antes del viaje',
        description:
          'Aclara dudas por WhatsApp y ordena tu caso antes de coordinar una atención en Tacna.',
      },
    ]
  }

  return [
    {
      title: 'Tabla comparativa Chile vs Tacna',
      description:
        'Compara costos, tiempos de atención, cercanía y orientación previa en un solo bloque claro.',
    },
    {
      title: 'Beneficios de Tacna',
      description:
        'Revisa por qué pacientes del norte de Chile consideran Tacna para evaluar tratamientos médicos.',
    },
    {
      title: 'Casos comunes de pacientes de Chile',
      description:
        'Descubre qué tipo de pacientes suelen comparar alternativas antes de tomar una decisión.',
    },
  ]
}

function getIntentFaq(intentSlug: string, cityName: string, serviceName: string) {
  if (intentSlug === 'precio') {
    return [
      {
        question: `¿Se puede consultar el precio de ${serviceName} antes de viajar desde ${cityName}?`,
        answer:
          'Sí. Puedes dejar tu consulta y recibir una orientación inicial para entender valores referenciales y pasos previos.',
      },
      {
        question: '¿El precio final se confirma de inmediato?',
        answer:
          'No siempre. El valor puede variar según evaluación médica, diagnóstico y alcance exacto del tratamiento.',
      },
      {
        question: '¿Puedo resolver dudas por WhatsApp antes del viaje?',
        answer:
          'Sí. La orientación inicial ayuda a ordenar tu caso antes de coordinar una atención en Tacna.',
      },
    ]
  }

  return [
    {
      question: `${serviceName} en Tacna vs Chile: ¿qué suelen comparar los pacientes de ${cityName}?`,
      answer:
        'Generalmente comparan precios, tiempos de atención, cercanía con la frontera y claridad de la orientación previa.',
    },
    {
      question: '¿HolaTacna reemplaza la evaluación médica?',
      answer:
        'No. HolaTacna orienta al paciente y ayuda a entender opciones antes de coordinar una atención.',
    },
    {
      question: '¿Puedo solicitar una comparación inicial antes de decidir?',
      answer:
        'Sí. Puedes dejar tu consulta para recibir una orientación general antes de viajar.',
    },
  ]
}

export function ProgrammaticLandingPage({ landing }: ProgrammaticLandingPageProps) {
  const { city, service, intent, path, title, description } = landing
  const intentBody = getIntentBody(intent.slug, city.name, service.name)
  const faqItems = getIntentFaq(intent.slug, city.name, service.name)
  const isPriceIntent = intent.slug === 'precio'
  const priceComparisonRows = getPriceComparisonRows(service.name)
  const priceFactors = getPriceFactors(service.name)
  const comparisonRows = getComparisonRows()
  const comparisonCases = getComparisonCases(city.name)
  const intentSummaryCards = getIntentSummaryCards(intent.slug)

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
                Ver página principal
              </Link>
              <Link
                href={service.primaryHref}
                className="rounded-xl border border-white/20 bg-white/10 px-5 py-3 font-bold text-white transition hover:bg-white/15"
              >
                {service.primaryLabel}
              </Link>
            </div>
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
            <h2 className="mb-3 text-3xl font-bold">
              {isPriceIntent ? 'Precios y factores que influyen en el costo' : 'Compara Tacna y Chile con más claridad'}
            </h2>
            <p className="mb-5 text-slate-600">
              {isPriceIntent
                ? 'El valor de un tratamiento puede variar según evaluación médica, complejidad del caso y pasos necesarios antes del viaje.'
                : 'Muchos pacientes del norte de Chile revisan diferencias de costos, tiempos de atención y coordinación antes de decidir.'}
            </p>
            <div className="grid gap-4">
              {intentSummaryCards.map((card) => (
                <div key={card.title} className="rounded-2xl border border-slate-200 p-4">
                  <h3 className="mb-2 text-lg font-semibold text-slate-900">{card.title}</h3>
                  <p className="text-slate-700">{card.description}</p>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      {isPriceIntent ? (
        <>
          <section className="px-5 pb-14 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="mb-6 text-3xl font-bold">Comparación de precios Chile vs Tacna</h2>
              <div className="grid gap-4">
                {priceComparisonRows.map((row) => (
                  <div key={row.label} className="grid gap-4 rounded-2xl border border-slate-200 p-5 lg:grid-cols-3">
                    <div className="font-semibold text-slate-900">{row.label}</div>
                    <div className="rounded-2xl bg-rose-50 p-4 text-slate-700">
                      <div className="mb-2 text-sm font-bold uppercase tracking-[0.12em] text-rose-700">
                        Chile
                      </div>
                      {row.chile}
                    </div>
                    <div className="rounded-2xl bg-emerald-50 p-4 text-slate-700">
                      <div className="mb-2 text-sm font-bold uppercase tracking-[0.12em] text-emerald-700">
                        Tacna
                      </div>
                      {row.tacna}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="px-5 pb-14 sm:px-6 lg:px-8">
            <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_1fr]">
              <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                <h2 className="mb-5 text-3xl font-bold">Factores que afectan el precio</h2>
                <div className="grid gap-4">
                  {priceFactors.map((factor) => (
                    <div key={factor} className="rounded-2xl border border-slate-200 p-4 text-slate-700">
                      {factor}
                    </div>
                  ))}
                </div>
              </article>

              <article className="rounded-3xl bg-amber-50 p-8 text-amber-950 shadow-sm">
                <h2 className="mb-5 text-3xl font-bold">Ahorro estimado con enfoque referencial</h2>
                <div className="grid gap-4 text-lg leading-8">
                  <p>
                    Muchos pacientes de {city.name} revisan {service.name.toLowerCase()} en Tacna
                    porque buscan una alternativa más accesible que en Chile.
                  </p>
                  <p>
                    El ahorro puede variar según evaluación médica, alcance del tratamiento y
                    necesidades específicas de cada caso.
                  </p>
                  <p>
                    La mejor forma de entender tu situación es solicitar orientación inicial y
                    revisar qué factores pueden influir en tu caso antes de viajar.
                  </p>
                </div>
              </article>
            </div>
          </section>
        </>
      ) : (
        <>
          <section className="px-5 pb-14 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="mb-6 text-3xl font-bold">Tabla comparativa Chile vs Tacna</h2>
              <div className="grid gap-4">
                {comparisonRows.map((row) => (
                  <div key={row.label} className="grid gap-4 rounded-2xl border border-slate-200 p-5 lg:grid-cols-3">
                    <div className="font-semibold text-slate-900">{row.label}</div>
                    <div className="rounded-2xl bg-slate-100 p-4 text-slate-700">
                      <div className="mb-2 text-sm font-bold uppercase tracking-[0.12em] text-slate-700">
                        Chile
                      </div>
                      {row.chile}
                    </div>
                    <div className="rounded-2xl bg-emerald-50 p-4 text-slate-700">
                      <div className="mb-2 text-sm font-bold uppercase tracking-[0.12em] text-emerald-700">
                        Tacna
                      </div>
                      {row.tacna}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="px-5 pb-14 sm:px-6 lg:px-8">
            <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_1fr]">
              <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                <h2 className="mb-5 text-3xl font-bold">Beneficios de Tacna</h2>
                <div className="grid gap-4">
                  {service.benefits.map((benefit) => (
                    <div key={`benefit-${benefit}`} className="rounded-2xl bg-emerald-50 p-4 text-slate-700">
                      {benefit}
                    </div>
                  ))}
                </div>
              </article>

              <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                <h2 className="mb-5 text-3xl font-bold">Casos comunes de pacientes de Chile</h2>
                <div className="grid gap-4">
                  {comparisonCases.map((item) => (
                    <div key={item} className="rounded-2xl border border-slate-200 p-4 text-slate-700">
                      {item}
                    </div>
                  ))}
                </div>
              </article>
            </div>
          </section>
        </>
      )}

      <section className="px-5 pb-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl rounded-3xl bg-emerald-50 p-8 text-emerald-950">
          <h2 className="mb-4 text-3xl font-bold">Orientación para pacientes de {city.name}</h2>
          <p className="text-lg leading-8">
            {intent.ctaContext} HolaTacna ayuda a pacientes de Chile a entender mejor sus opciones
            de {service.name.toLowerCase()} en Tacna antes de tomar una decisión.
          </p>
        </div>
      </section>

      <section className="bg-white px-5 pb-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-sm">
          <div className="mb-6 max-w-3xl">
            <h2 className="mb-3 text-3xl font-bold text-slate-950">
              {isPriceIntent
                ? 'Solicita orientación inicial sobre precios en Tacna'
                : 'Solicita orientación para comparar alternativas'}
            </h2>
            <p className="text-lg leading-8 text-slate-600">
              {isPriceIntent
                ? 'Solicita orientación inicial y conoce qué factores pueden influir en tu caso.'
                : 'Recibe orientación antes de decidir y compara alternativas con más claridad si estás evaluando viajar a Tacna.'}
            </p>
          </div>

          <div className="rounded-3xl bg-white p-6 text-slate-950 shadow-sm">
            <Suspense fallback={<div className="min-h-[320px] rounded-2xl bg-slate-50" />}>
              <LeadCaptureForm
                serviceSlug={service.serviceSlug}
                serviceName={service.serviceName}
                cityInterest={city.name}
                landingPath={path}
                pageType={intent.pageType}
                heading={getIntentHeading(intent.slug, city.name, service.name)}
                submitLabel="Solicitar orientación"
                messagePlaceholder={isPriceIntent
                  ? 'Solicita orientación para revisar precios aproximados y resolver dudas antes de viajar.'
                  : 'Solicita una comparación inicial y recibe orientación antes de decidir tu viaje a Tacna.'}
              />
            </Suspense>
          </div>
        </div>
      </section>

      <section className="bg-slate-900 px-5 py-14 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-6 text-3xl font-bold">
            {isPriceIntent ? 'Preguntas frecuentes sobre costos' : 'Preguntas frecuentes comparativas'}
          </h2>
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
