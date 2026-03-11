import Link from 'next/link'

const cityServices = [
  {
    name: 'Implantes dentales',
    description:
      'Opciones para pacientes de Antofagasta que buscan implantes dentales en Tacna con orientación previa antes del viaje.',
    href: '/antofagasta/implantes-dentales-tacna',
  },
  {
    name: 'Operación de ojos',
    description:
      'La opción de operación de ojos para pacientes de Antofagasta estará disponible próximamente.',
    href: null,
  },
  {
    name: 'Estética',
    description:
      'Tratamientos estéticos en Tacna para pacientes de Antofagasta con coordinación previa y atención orientada a pacientes de Chile.',
    href: '/antofagasta/estetica-tacna',
  },
  {
    name: 'Dermatología',
    description:
      'Opciones dermatológicas en Tacna para pacientes de Antofagasta que buscan cercanía y orientación previa.',
    href: '/antofagasta/dermatologia',
  },
]

export default function AntofagastaHubPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-5 py-14 text-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <section className="rounded-[32px] bg-[linear-gradient(135deg,#172554_0%,#7c3aed_55%,#ec4899_100%)] px-8 py-12 text-white shadow-[0_24px_60px_rgba(15,23,42,0.16)] sm:px-10">
          <div className="mb-4 inline-flex rounded-full bg-white/15 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em]">
            Pacientes desde Antofagasta
          </div>
          <h1 className="max-w-4xl text-4xl font-black leading-tight sm:text-5xl">
            Tratamientos médicos en Tacna para pacientes de Antofagasta
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-white/88 sm:text-lg">
            Revisa las principales opciones médicas disponibles para pacientes de Antofagasta que
            desean comparar tratamientos en Tacna antes de viajar.
          </p>
        </section>

        <section className="py-14">
          <div className="mb-8 max-w-3xl">
            <h2 className="text-3xl font-bold sm:text-4xl">Opciones principales para pacientes de Antofagasta</h2>
            <p className="mt-3 text-base leading-7 text-slate-600 sm:text-lg">
              Muchos pacientes de Antofagasta consultan por orientación, costos y tiempos antes de
              coordinar su viaje a Tacna.
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

        <section className="rounded-[28px] border border-fuchsia-100 bg-fuchsia-50 px-8 py-8 text-fuchsia-950">
          <h2 className="text-2xl font-bold">Orientación antes de viajar</h2>
          <p className="mt-3 max-w-3xl text-base leading-8">
            HolaTacna ayuda a pacientes de Antofagasta a revisar opciones médicas en Tacna con más
            claridad antes de coordinar una atención.
          </p>
        </section>
      </div>
    </main>
  )
}
