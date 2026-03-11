import Link from 'next/link'

const treatmentClusters = [
  {
    title: 'Odontología',
    description:
      'Tratamientos dentales frecuentes para pacientes chilenos que comparan evaluación, tiempos y opciones antes de viajar a Tacna.',
    services: [
      {
        title: 'Implantes dentales',
        description:
          'Conoce opciones de implantes dentales en Tacna con información clara y orientación antes de viajar.',
        href: '/implantes-dentales-tacna',
      },
      {
        title: 'Ortodoncia',
        description:
          'Revisa alternativas de brackets y alineadores en Tacna con orientación previa para pacientes de Chile.',
        href: '/ortodoncia-tacna',
      },
      {
        title: 'Carillas dentales',
        description:
          'Explora opciones de carillas dentales y diseño de sonrisa en Tacna antes de coordinar tu viaje.',
        href: '/carillas-dentales-tacna',
      },
    ],
  },
  {
    title: 'Oftalmología',
    description:
      'Opciones para pacientes que buscan evaluación visual y cirugía ocular en Tacna con una orientación más clara antes de viajar.',
    services: [
      {
        title: 'Operación de ojos',
        description:
          'Encuentra información sobre operación de ojos en Tacna y compara alternativas antes de coordinar tu atención.',
        href: '/operacion-ojos-tacna',
      },
    ],
  },
  {
    title: 'Dermatología',
    description:
      'Tratamientos y evaluaciones dermatológicas para pacientes que desean revisar opciones en Tacna antes de viajar desde Chile.',
    services: [
      {
        title: 'Dermatología',
        description:
          'Revisa opciones de dermatología en Tacna con información útil para comparar antes de viajar.',
        href: '/dermatologia-tacna',
      },
    ],
  },
  {
    title: 'Estética y cirugía plástica',
    description:
      'Alternativas para pacientes que buscan tratamientos estéticos o cirugía plástica con orientación previa y mayor claridad antes del viaje.',
    services: [
      {
        title: 'Estética',
        description:
          'Explora tratamientos estéticos en Tacna pensados para pacientes que buscan orientación previa y cercanía.',
        href: '/estetica-tacna',
      },
      {
        title: 'Cirugía plástica',
        description:
          'Conoce opciones de cirugía plástica en Tacna con información inicial antes de coordinar una evaluación.',
        href: '/cirugia-plastica-tacna',
      },
    ],
  },
]

const cityLinks = [
  { city: 'Arica', href: '/arica' },
  { city: 'Iquique', href: '/iquique' },
  { city: 'Antofagasta', href: '/antofagasta' },
]

export default function TreatmentsPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#eff6ff_0%,#f8fafc_42%,#e2e8f0_100%)] px-6 py-10 text-slate-950 sm:px-8 sm:py-14">
      <div className="mx-auto max-w-6xl">
        <section className="mb-6 rounded-[32px] bg-[linear-gradient(135deg,#082f49_0%,#155e75_52%,#15803d_100%)] px-8 py-12 text-white shadow-xl sm:px-10 sm:py-14">
          <div className="mb-4 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em]">
            Tratamientos
          </div>
          <h1 className="max-w-4xl text-4xl font-bold leading-tight sm:text-5xl">
            Tratamientos médicos en Tacna para pacientes chilenos
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-8 text-white/85 sm:text-lg">
            Explora tratamientos médicos organizados por especialidad y encuentra opciones para
            evaluar tu atención en Tacna con mayor claridad.
          </p>
          <div className="mt-8">
            <Link
              href="/como-funciona"
              className="inline-flex rounded-xl bg-white px-5 py-3 font-bold text-sky-800 transition hover:bg-sky-50"
            >
              ¿Cómo funciona?
            </Link>
          </div>
        </section>

        <section className="mb-6 rounded-[28px] bg-white p-8 shadow-lg sm:p-10">
          <div className="mb-4 inline-flex rounded-full bg-sky-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-sky-700">
            Portafolio médico
          </div>
          <p className="max-w-4xl text-base leading-8 text-slate-600 sm:text-lg">
            Muchos pacientes comparan tratamientos por especialidad antes de viajar a Tacna. Este
            hub te ayuda a explorar opciones médicas con una estructura más clara y ordenada.
          </p>
        </section>

        <div className="grid gap-6">
          {treatmentClusters.map((cluster) => (
            <section
              key={cluster.title}
              className="rounded-[28px] bg-white p-8 shadow-lg sm:p-10"
            >
              <h2 className="text-3xl font-bold sm:text-4xl">{cluster.title}</h2>
              <p className="mt-3 max-w-4xl text-base leading-8 text-slate-600 sm:text-lg">
                {cluster.description}
              </p>

              <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {cluster.services.map((service) => (
                  <article
                    key={service.title}
                    className="rounded-[24px] border border-slate-200 bg-slate-50 p-6"
                  >
                    <h3 className="text-2xl font-bold">{service.title}</h3>
                    <p className="mt-3 text-base leading-7 text-slate-600">{service.description}</p>
                    <Link
                      href={service.href}
                      className="mt-6 inline-flex rounded-xl bg-slate-950 px-4 py-3 font-bold text-white transition hover:bg-slate-800"
                    >
                      Ver información
                    </Link>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>

        <section className="mt-6 rounded-[28px] border border-sky-200 bg-[linear-gradient(180deg,#eff6ff_0%,#ffffff_100%)] p-8 shadow-lg sm:p-10">
          <h2 className="text-3xl font-bold sm:text-4xl">
            ¿Quieres explorar opciones según tu ciudad de origen?
          </h2>
          <p className="mt-4 max-w-4xl text-base leading-8 text-slate-700 sm:text-lg">
            Si viajas desde Arica, Iquique o Antofagasta, también puedes revisar páginas
            específicas por ciudad y tratamiento antes de coordinar tu viaje.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            {cityLinks.map((item) => (
              <Link
                key={item.city}
                href={item.href}
                className="inline-flex rounded-xl border border-sky-200 bg-white px-4 py-3 font-bold text-sky-800 transition hover:bg-sky-50"
              >
                {item.city}
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-6 rounded-[28px] border border-emerald-200 bg-[linear-gradient(180deg,#ecfdf5_0%,#ffffff_100%)] p-8 shadow-lg sm:p-10">
          <div className="mb-4 inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-emerald-700">
            Confianza
          </div>
          <h2 className="text-3xl font-bold sm:text-4xl">Orientación antes de viajar</h2>
          <p className="mt-4 max-w-4xl text-base leading-8 text-slate-700 sm:text-lg">
            HolaTacna ayuda a pacientes de Chile a revisar opciones médicas en Tacna con mayor
            claridad, orientación previa y una red confiable antes de coordinar su atención.
          </p>
        </section>
      </div>
    </main>
  )
}
