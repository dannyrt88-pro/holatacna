import Link from 'next/link'

const treatments = [
  {
    title: 'Implantes dentales',
    description:
      'Conoce opciones de implantes dentales en Tacna con información clara y orientación antes de viajar.',
    href: '/implantes-dentales-tacna',
  },
  {
    title: 'Operación de ojos',
    description:
      'Revisa alternativas para operación de ojos en Tacna con una visión más clara antes de coordinar tu atención.',
    href: '/operacion-ojos-tacna',
  },
  {
    title: 'Estética',
    description:
      'Explora tratamientos estéticos en Tacna pensados para pacientes que buscan orientación previa y cercanía.',
    href: '/estetica-tacna',
  },
  {
    title: 'Dermatología',
    description:
      'Encuentra opciones de dermatología en Tacna con información útil para comparar antes de viajar.',
    href: '/dermatologia-tacna',
  },
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
            Tratamientos médicos en Tacna para pacientes de Chile
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-8 text-white/85 sm:text-lg">
            Explora tratamientos médicos en Tacna con orientación previa para resolver dudas antes
            de viajar desde Arica, Iquique, Antofagasta u otras ciudades del norte de Chile.
          </p>
        </section>

        <section className="mb-6 rounded-[28px] bg-white p-8 shadow-lg sm:p-10">
          <div className="mb-4 inline-flex rounded-full bg-sky-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-sky-700">
            Opciones médicas
          </div>
          <p className="max-w-4xl text-base leading-8 text-slate-600 sm:text-lg">
            Cada vez más pacientes del norte de Chile comparan tratamientos en Tacna buscando
            cercanía, claridad y una mejor orientación antes de tomar una decisión.
          </p>

          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {treatments.map((treatment) => (
              <article
                key={treatment.title}
                className="rounded-[24px] border border-slate-200 bg-slate-50 p-6"
              >
                <h2 className="text-2xl font-bold">{treatment.title}</h2>
                <p className="mt-3 text-base leading-7 text-slate-600">{treatment.description}</p>
                <Link
                  href={treatment.href}
                  className="mt-6 inline-flex rounded-xl bg-slate-950 px-4 py-3 font-bold text-white transition hover:bg-slate-800"
                >
                  Ver tratamiento
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-[28px] border border-emerald-200 bg-[linear-gradient(180deg,#ecfdf5_0%,#ffffff_100%)] p-8 shadow-lg sm:p-10">
          <div className="mb-4 inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-emerald-700">
            Confianza
          </div>
          <h2 className="text-3xl font-bold sm:text-4xl">Orientación antes de viajar</h2>
          <p className="mt-4 max-w-4xl text-base leading-8 text-slate-700 sm:text-lg">
            HolaTacna ayuda a pacientes de Chile a revisar opciones médicas en Tacna con una
            visión más ordenada antes de coordinar su atención y su viaje.
          </p>
        </section>
      </div>
    </main>
  )
}
