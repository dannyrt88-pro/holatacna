import Link from 'next/link'

const cityServices = [
  {
    name: 'Implantes dentales',
    description:
      'Opciones para pacientes de Arica que buscan implantes dentales en Tacna con orientación previa antes del viaje.',
    href: '/arica/implantes-dentales',
  },
  {
    name: 'Operación de ojos',
    description:
      'Información para pacientes de Arica que desean evaluar atención visual y resolver dudas antes de viajar.',
    href: '/arica/operacion-ojos-tacna',
  },
  {
    name: 'Estética',
    description:
      'Tratamientos estéticos en Tacna para pacientes de Arica con coordinación previa y atención cercana a la frontera.',
    href: '/arica/estetica-tacna',
  },
  {
    name: 'Dermatología',
    description:
      'La página de dermatología para Arica estará disponible próximamente con opciones médicas en Tacna.',
    href: null,
  },
]

export default function AricaHubPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-5 py-14 text-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <section className="rounded-[32px] bg-[linear-gradient(135deg,#082f49_0%,#0f766e_55%,#22c55e_100%)] px-8 py-12 text-white shadow-[0_24px_60px_rgba(15,23,42,0.16)] sm:px-10">
          <div className="mb-4 inline-flex rounded-full bg-white/15 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em]">
            Pacientes desde Arica
          </div>
          <h1 className="max-w-4xl text-4xl font-black leading-tight sm:text-5xl">
            Tratamientos médicos en Tacna para pacientes de Arica
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-white/88 sm:text-lg">
            Revisa opciones médicas en Tacna si viajas desde Arica. Aquí puedes comparar servicios,
            resolver dudas y revisar alternativas antes de coordinar tu atención.
          </p>
        </section>

        <section className="py-14">
          <div className="mb-8 max-w-3xl">
            <h2 className="text-3xl font-bold sm:text-4xl">Opciones principales para pacientes de Arica</h2>
            <p className="mt-3 text-base leading-7 text-slate-600 sm:text-lg">
              Pacientes de Arica suelen consultar por cercanía, tiempos de atención y orientación
              previa antes de viajar a Tacna.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {cityServices.map((service) => (
              <article
                key={service.name}
                className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_14px_28px_rgba(15,23,42,0.06)]"
              >
                <h3 className="mb-3 text-2xl font-bold">{service.name}</h3>
                <p className="mb-6 text-base leading-7 text-slate-600">{service.description}</p>
                {service.href ? (
                  <Link
                    href={service.href}
                    className="inline-flex rounded-xl bg-slate-950 px-4 py-3 font-bold text-white transition hover:bg-slate-800"
                  >
                    Ver opción
                  </Link>
                ) : (
                  <span className="inline-flex rounded-xl bg-slate-100 px-4 py-3 font-bold text-slate-500">
                    Próximamente
                  </span>
                )}
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-[28px] border border-emerald-100 bg-emerald-50 px-8 py-8 text-emerald-950">
          <h2 className="text-2xl font-bold">Orientación antes de viajar</h2>
          <p className="mt-3 max-w-3xl text-base leading-8">
            HolaTacna ayuda a pacientes de Arica a revisar opciones médicas en Tacna con más
            claridad antes de coordinar una atención.
          </p>
        </section>
      </div>
    </main>
  )
}
