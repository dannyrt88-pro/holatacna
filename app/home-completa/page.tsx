import Link from 'next/link'

const medicalServices = [
  {
    name: 'Implantes Dentales',
    description:
      'Tratamientos dentales en Tacna con clinicas revisadas y orientacion previa para pacientes de Chile.',
    href: '/implantes-dentales-tacna',
  },
  {
    name: 'Operacion de Ojos',
    description:
      'Evalua opciones de operacion de ojos en Tacna con informacion clara antes de viajar desde Chile.',
    href: '/operacion-ojos-tacna',
  },
  {
    name: 'Estetica',
    description:
      'Tratamientos esteticos en Tacna con acompanamiento inicial para pacientes de Arica, Iquique y Antofagasta.',
    href: '/estetica-tacna',
  },
  {
    name: 'Dermatologia',
    description:
      'Consultas y tratamientos dermatologicos en Tacna para pacientes de Chile que buscan cercania y orientacion previa.',
    href: '/dermatologia-tacna',
  },
]

const travelBenefits = [
  'Ahorro frente a alternativas en Chile',
  'Cercania con la frontera',
  'Atencion rapida',
  'Orientacion previa por WhatsApp',
  'Clinicas y especialistas previamente revisados',
]

const cityAccess = [
  {
    city: 'Arica',
    description:
      'Pacientes de Arica consultan tratamientos en Tacna por cercania, rapidez y coordinacion previa.',
    href: '/arica',
  },
  {
    city: 'Iquique',
    description:
      'Pacientes de Iquique revisan opciones medicas en Tacna para resolver dudas antes de viajar.',
    href: '/iquique',
  },
  {
    city: 'Antofagasta',
    description:
      'Pacientes de Antofagasta buscan tratamientos medicos en Tacna con mas claridad y orientacion.',
    href: '/antofagasta',
  },
]

const steps = [
  'Elige el tratamiento que te interesa',
  'Envia tu consulta',
  'Recibe orientacion inicial',
  'Coordinamos contigo antes del viaje',
]

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="bg-[linear-gradient(135deg,#082f49_0%,#0f3f8c_58%,#14b8a6_100%)] px-5 py-16 text-white sm:px-6 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <div className="mb-4 inline-block rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em]">
              HolaTacna | Pacientes de Chile
            </div>
            <h1 className="mb-4 max-w-4xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              Tratamientos medicos en Tacna para pacientes de Chile
            </h1>
            <p className="mb-8 max-w-3xl text-base leading-8 text-white/85 sm:text-lg">
              Compara opciones medicas, resuelve tus dudas y recibe orientacion antes de viajar
              desde Arica, Iquique, Antofagasta u otras ciudades de Chile.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href="#servicios-medicos"
                className="rounded-xl bg-emerald-400 px-5 py-3 font-bold text-emerald-950 shadow-[0_14px_30px_rgba(34,197,94,0.24)] transition hover:bg-emerald-300"
              >
                Ver servicios disponibles
              </Link>
              <Link
                href="#cta-final"
                className="rounded-xl bg-white px-5 py-3 font-bold text-sky-800 shadow-[0_14px_30px_rgba(255,255,255,0.16)] transition hover:bg-sky-50"
              >
                Solicitar orientacion
              </Link>
            </div>
          </div>

          <div className="rounded-[28px] border border-white/15 bg-white/10 p-6 backdrop-blur">
            <div className="mb-4 text-xs font-bold uppercase tracking-[0.14em] text-white/75">
              Informacion para pacientes
            </div>
            <div className="grid gap-3">
              {travelBenefits.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-white/10 px-4 py-4 text-sm font-semibold leading-6 text-white/90"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="servicios-medicos" className="px-5 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <div className="mb-4 inline-block rounded-full bg-sky-100 px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-sky-700">
              Tratamientos medicos
            </div>
            <h2 className="mb-3 text-3xl font-bold sm:text-4xl">
              Servicios medicos mas consultados
            </h2>
            <p className="text-base leading-7 text-slate-600 sm:text-lg">
              Revisa las principales consultas de pacientes de Chile que evaluan atenderse en
              Tacna.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {medicalServices.map((service) => (
              <article
                key={service.name}
                className="rounded-[24px] border border-emerald-200 bg-[linear-gradient(180deg,#ecfdf5,#ffffff)] p-6 shadow-[0_16px_30px_rgba(15,23,42,0.07)]"
              >
                <h3 className="mb-3 text-2xl font-bold">{service.name}</h3>
                <p className="text-sm leading-7 text-slate-600 sm:text-base">{service.description}</p>
                <Link
                  href={service.href}
                  className="mt-6 inline-block rounded-xl bg-emerald-500 px-4 py-3 font-bold text-emerald-950 transition hover:bg-emerald-400"
                >
                  Ver tratamiento
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[linear-gradient(180deg,#eff6ff,#f8fafc)] px-5 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <div className="mb-4 inline-block rounded-full bg-blue-100 px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-blue-700">
              Pacientes de Chile
            </div>
            <h2 className="mb-3 text-3xl font-bold sm:text-4xl">
              Por que pacientes de Chile consultan tratamientos en Tacna?
            </h2>
            <p className="text-base leading-7 text-slate-600 sm:text-lg">
              Muchos pacientes de Arica, Iquique y Antofagasta buscan tratamientos medicos en
              Tacna para comparar opciones con mas claridad antes de viajar.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {travelBenefits.map((item) => (
              <div
                key={item}
                className="rounded-[24px] border border-slate-200 bg-white p-5 text-center shadow-[0_14px_28px_rgba(15,23,42,0.06)]"
              >
                <p className="text-sm font-semibold leading-7 text-slate-700 sm:text-base">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <div className="mb-4 inline-block rounded-full bg-emerald-100 px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-emerald-700">
              Ciudades de Chile
            </div>
            <h2 className="mb-3 text-3xl font-bold sm:text-4xl">
              Pacientes desde Arica, Iquique y Antofagasta
            </h2>
            <p className="text-base leading-7 text-slate-600 sm:text-lg">
              Cada vez mas pacientes del norte de Chile consultan tratamientos medicos en Tacna
              buscando cercania, rapidez y orientacion antes de viajar.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {cityAccess.map((item) => (
              <article
                key={item.city}
                className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_14px_28px_rgba(15,23,42,0.06)]"
              >
                <div className="mb-3 inline-block rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.08em] text-emerald-700">
                  {item.city}
                </div>
                <p className="mb-5 text-base leading-7 text-slate-600">{item.description}</p>
                <Link
                  href={item.href}
                  className="inline-flex items-center rounded-xl bg-slate-950 px-4 py-3 font-bold text-white transition hover:bg-slate-800"
                >
                  Ver opciones desde {item.city}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[linear-gradient(180deg,#f8fafc,#eef2ff)] px-5 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <div className="mb-4 inline-block rounded-full bg-indigo-100 px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-indigo-700">
              Proceso
            </div>
            <h2 className="mb-3 text-3xl font-bold sm:text-4xl">Como funciona HolaTacna?</h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {steps.map((step, index) => (
              <div
                key={step}
                className="rounded-[24px] border border-indigo-100 bg-white p-6 shadow-[0_14px_28px_rgba(15,23,42,0.06)]"
              >
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white">
                  {index + 1}
                </div>
                <p className="text-base font-semibold leading-7 text-slate-800">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-5xl rounded-[28px] border border-slate-200 bg-white p-8 shadow-[0_16px_30px_rgba(15,23,42,0.06)] sm:p-10">
          <div className="mb-4 inline-block rounded-full bg-emerald-100 px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-emerald-700">
            Confianza
          </div>
          <h2 className="text-3xl font-bold sm:text-4xl">Orientacion medica antes de viajar a Tacna</h2>
          <p className="mt-4 text-base leading-8 text-slate-600 sm:text-lg">
            HolaTacna ayuda a pacientes de Chile a encontrar opciones medicas en Tacna con mayor
            claridad, comparacion y orientacion antes de coordinar una atencion.
          </p>
        </div>
      </section>

      <section id="cta-final" className="bg-slate-950 px-5 py-14 text-white sm:px-6 sm:py-16">
        <div className="mx-auto max-w-6xl rounded-[28px] border border-white/10 bg-white/5 px-6 py-8 sm:px-8">
          <h2 className="text-2xl font-bold sm:text-3xl">
            Estas evaluando un tratamiento en Tacna?
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-white/75 sm:text-base">
            Revisa nuestras paginas principales o envianos tu consulta para recibir orientacion
            antes de viajar.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="#servicios-medicos"
              className="rounded-xl bg-emerald-400 px-5 py-3 font-bold text-emerald-950 transition hover:bg-emerald-300"
            >
              Ver servicios
            </Link>
            <Link
              href="/implantes-dentales-tacna"
              className="rounded-xl border border-white/20 bg-white/10 px-5 py-3 font-bold text-white transition hover:bg-white/15"
            >
              Enviar consulta
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
