import Link from 'next/link'

const cityServices = [
  {
    name: 'Implantes dentales',
    description:
      'La información de implantes dentales para pacientes de Iquique estará disponible próximamente.',
    href: null,
  },
  {
    name: 'Operación de ojos',
    description:
      'Información para pacientes de Iquique que buscan atención visual en Tacna con orientación antes del viaje.',
    href: '/iquique/operacion-ojos-tacna',
  },
  {
    name: 'Estética',
    description:
      'Tratamientos estéticos en Tacna para pacientes de Iquique con información clara antes de coordinar su atención.',
    href: '/iquique/estetica',
  },
  {
    name: 'Dermatología',
    description:
      'Opciones dermatológicas en Tacna para pacientes de Iquique que desean comparar alternativas antes de viajar.',
    href: '/iquique/dermatologia-tacna',
  },
]

export default function IquiqueHubPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#eff6ff_0%,#f8fafc_42%,#e2e8f0_100%)] px-6 py-10 text-slate-950 sm:px-8 sm:py-14">
      <div className="mx-auto max-w-6xl">
        <section className="mb-6 rounded-[32px] bg-[linear-gradient(135deg,#082f49_0%,#1d4ed8_55%,#0ea5e9_100%)] px-8 py-12 text-white shadow-xl sm:px-10 sm:py-14">
          <div className="mb-4 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em]">
            Pacientes desde Iquique
          </div>
          <h1 className="max-w-4xl text-4xl font-bold leading-tight sm:text-5xl">
            Tratamientos médicos en Tacna para pacientes de Iquique
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-8 text-white/85 sm:text-lg">
            Pacientes de Iquique y otras ciudades del norte de Chile viajan a Tacna para evaluar
            tratamientos médicos con atención rápida y opciones accesibles.
          </p>
          <div className="mt-8">
            <Link
              href="/tratamientos"
              className="inline-flex rounded-2xl bg-white px-6 py-4 text-base font-bold text-slate-950 transition hover:bg-slate-100"
            >
              Ver tratamientos disponibles
            </Link>
          </div>
        </section>

        <section className="mb-6 rounded-[28px] bg-white p-8 shadow-lg sm:p-10">
          <div className="mb-4 inline-flex rounded-full bg-sky-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-sky-700">
            Introducción
          </div>
          <p className="max-w-4xl text-base leading-8 text-slate-600 sm:text-lg">
            Muchos pacientes de Iquique revisan alternativas en Tacna para buscar atención médica,
            evaluaciones especializadas y tratamientos que requieren varias sesiones. Tener una
            visión previa ayuda a organizar mejor el viaje.
          </p>
        </section>

        <section className="mb-6 rounded-[28px] bg-white p-8 shadow-lg sm:p-10">
          <div className="mb-4 inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-emerald-700">
            Tratamientos
          </div>
          <h2 className="text-3xl font-bold sm:text-4xl">Opciones médicas para pacientes de Iquique</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {cityServices.map((service) => (
              <article
                key={service.name}
                className="rounded-[24px] border border-slate-200 bg-slate-50 p-6"
              >
                <h3 className="mb-3 text-2xl font-bold">{service.name}</h3>
                <p className="mb-6 text-base leading-7 text-slate-600">{service.description}</p>
                {service.href ? (
                  <Link
                    href={service.href}
                    className="inline-flex rounded-xl bg-slate-950 px-4 py-3 font-bold text-white transition hover:bg-slate-800"
                  >
                    Ver información
                  </Link>
                ) : (
                  <span className="inline-flex cursor-default rounded-xl border border-slate-200 bg-slate-100 px-4 py-3 font-bold text-slate-500">
                    Próximamente
                  </span>
                )}
              </article>
            ))}
          </div>
        </section>

        <section className="mb-6 rounded-[28px] bg-white p-8 shadow-lg sm:p-10">
          <div className="mb-4 inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-blue-700">
            Contexto
          </div>
          <h2 className="text-3xl font-bold sm:text-4xl">
            ¿Por qué pacientes de Iquique evalúan tratamientos en Tacna?
          </h2>
          <p className="mt-4 max-w-4xl text-base leading-8 text-slate-600 sm:text-lg">
            La búsqueda de cercanía, tiempos de atención más ágiles y la posibilidad de comparar
            opciones antes de viajar hacen que muchos pacientes de Iquique consideren Tacna para
            evaluar tratamientos médicos.
          </p>
        </section>

        <section className="rounded-[28px] border border-sky-200 bg-[linear-gradient(180deg,#eff6ff_0%,#ffffff_100%)] p-8 shadow-lg sm:p-10">
          <h2 className="text-2xl font-bold sm:text-3xl">Orientación antes de viajar</h2>
          <p className="mt-4 max-w-4xl text-base leading-8 text-slate-700 sm:text-lg">
            Si estás evaluando un tratamiento, puedes revisar información específica y enviar una
            consulta antes de viajar.
          </p>
          <div className="mt-8">
            <Link
              href="/tratamientos"
              className="inline-flex rounded-2xl bg-slate-950 px-6 py-4 text-base font-bold text-white transition hover:bg-slate-800"
            >
              Explorar tratamientos
            </Link>
          </div>
        </section>
      </div>
    </main>
  )
}
