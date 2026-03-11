import Link from 'next/link'

const cityServices = [
  {
    name: 'Implantes dentales',
    description:
      'La opción de implantes dentales para pacientes de Iquique estará disponible próximamente.',
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
      'Tratamientos estéticos en Tacna para pacientes de Iquique con coordinación previa y atención orientada a pacientes de Chile.',
    href: '/iquique/estetica',
  },
  {
    name: 'Dermatología',
    description:
      'Opciones dermatológicas en Tacna para pacientes de Iquique que buscan cercanía y orientación previa.',
    href: '/iquique/dermatologia-tacna',
  },
]

export default function IquiqueHubPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-5 py-14 text-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <section className="rounded-[32px] bg-[linear-gradient(135deg,#082f49_0%,#1d4ed8_55%,#0ea5e9_100%)] px-8 py-12 text-white shadow-[0_24px_60px_rgba(15,23,42,0.16)] sm:px-10">
          <div className="mb-4 inline-flex rounded-full bg-white/15 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em]">
            Pacientes desde Iquique
          </div>
          <h1 className="max-w-4xl text-4xl font-black leading-tight sm:text-5xl">
            Tratamientos médicos en Tacna para pacientes de Iquique
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-white/88 sm:text-lg">
            Revisa las principales opciones médicas disponibles para pacientes de Iquique que
            desean comparar tratamientos en Tacna antes de viajar.
          </p>
        </section>

        <section className="py-14">
          <div className="mb-8 max-w-3xl">
            <h2 className="text-3xl font-bold sm:text-4xl">Opciones principales para pacientes de Iquique</h2>
            <p className="mt-3 text-base leading-7 text-slate-600 sm:text-lg">
              Muchos pacientes de Iquique consultan por tiempos, orientación y cercanía antes de
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

        <section className="rounded-[28px] border border-sky-100 bg-sky-50 px-8 py-8 text-sky-950">
          <h2 className="text-2xl font-bold">Orientación antes de viajar</h2>
          <p className="mt-3 max-w-3xl text-base leading-8">
            HolaTacna ayuda a pacientes de Iquique a revisar opciones médicas en Tacna con más
            claridad antes de coordinar una atención.
          </p>
        </section>
      </div>
    </main>
  )
}
