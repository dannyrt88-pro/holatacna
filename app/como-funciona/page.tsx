import Link from 'next/link'

const steps = [
  'Exploras opciones de tratamiento',
  'Envías tu consulta',
  'Recibes orientación inicial',
  'Coordinas tu atención en Tacna',
  'Organizas tu estadía',
]

const medicalServices = [
  'Implantes dentales',
  'Operación de ojos',
  'Estética',
  'Dermatología',
]

const alliedServices = [
  'Hoteles y alojamientos',
  'Departamentos por día',
  'Transporte',
  'Restaurantes',
]

const commonConcerns = [
  'No saber qué clínica elegir antes de viajar.',
  'No tener claridad sobre cómo organizar la atención en Tacna.',
  'No saber dónde alojarse o cómo moverse durante la estadía.',
]

export default function HowItWorksPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#eff6ff_0%,#f8fafc_42%,#e2e8f0_100%)] px-6 py-10 text-slate-950 sm:px-8 sm:py-14">
      <div className="mx-auto max-w-6xl">
        <section className="mb-6 rounded-[32px] bg-[linear-gradient(135deg,#082f49_0%,#155e75_52%,#15803d_100%)] px-8 py-12 text-white shadow-xl sm:px-10 sm:py-14">
          <div className="mb-4 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em]">
            Cómo funciona
          </div>
          <h1 className="max-w-4xl text-4xl font-bold leading-tight sm:text-5xl">
            ¿Cómo funciona HolaTacna?
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-8 text-white/85 sm:text-lg">
            Ayudamos a pacientes del norte de Chile a encontrar opciones médicas confiables en
            Tacna, con orientación previa y acceso a servicios aliados para su viaje.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/tratamientos"
              className="inline-flex rounded-2xl bg-white px-6 py-4 text-base font-bold text-slate-950 transition hover:bg-slate-100"
            >
              Ver tratamientos
            </Link>
            <Link
              href="/alianzas"
              className="inline-flex rounded-2xl border border-white/20 bg-white/10 px-6 py-4 text-base font-semibold text-white transition hover:bg-white/15"
            >
              Explorar alianzas
            </Link>
          </div>
        </section>

        <section className="mb-6 rounded-[28px] bg-white p-8 shadow-lg sm:p-10">
          <div className="mb-4 inline-flex rounded-full bg-rose-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-rose-700">
            Contexto
          </div>
          <h2 className="text-3xl font-bold sm:text-4xl">
            Viajar por atención médica puede ser confuso
          </h2>
          <p className="mt-4 max-w-4xl text-base leading-8 text-slate-600 sm:text-lg">
            Muchas personas del norte de Chile evalúan atenderse en Tacna, pero antes de viajar
            suelen necesitar más claridad para tomar decisiones con tranquilidad.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {commonConcerns.map((item) => (
              <article
                key={item}
                className="rounded-[24px] border border-slate-200 bg-slate-50 p-5"
              >
                <p className="text-base leading-7 text-slate-700">{item}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-6 rounded-[28px] bg-white p-8 shadow-lg sm:p-10">
          <div className="mb-4 inline-flex rounded-full bg-sky-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-sky-700">
            Proceso
          </div>
          <h2 className="text-3xl font-bold sm:text-4xl">Así funciona HolaTacna</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
            {steps.map((step, index) => (
              <article key={step} className="rounded-[24px] border border-slate-200 bg-slate-50 p-6">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-slate-950 text-sm font-bold text-white">
                  {index + 1}
                </div>
                <p className="text-base font-semibold leading-7 text-slate-800">{step}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-6 rounded-[28px] bg-white p-8 shadow-lg sm:p-10">
          <div className="mb-4 inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-emerald-700">
            Ecosistema
          </div>
          <h2 className="text-3xl font-bold sm:text-4xl">
            Servicios médicos y aliados en un solo ecosistema
          </h2>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-6">
              <h3 className="text-2xl font-bold">Atención médica</h3>
              <div className="mt-5 grid gap-3">
                {medicalServices.map((service) => (
                  <div
                    key={service}
                    className="rounded-2xl border border-slate-200 bg-white px-4 py-4 text-sm font-semibold text-slate-800"
                  >
                    {service}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-6">
              <h3 className="text-2xl font-bold">Servicios aliados</h3>
              <div className="mt-5 grid gap-3">
                {alliedServices.map((service) => (
                  <div
                    key={service}
                    className="rounded-2xl border border-slate-200 bg-white px-4 py-4 text-sm font-semibold text-slate-800"
                  >
                    {service}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mb-6 rounded-[28px] border border-emerald-200 bg-[linear-gradient(180deg,#ecfdf5_0%,#ffffff_100%)] p-8 shadow-lg sm:p-10">
          <div className="mb-4 inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-emerald-700">
            Red de aliados
          </div>
          <h2 className="text-3xl font-bold sm:text-4xl">Una red de servicios confiables en Tacna</h2>
          <p className="mt-4 max-w-4xl text-base leading-8 text-slate-700 sm:text-lg">
            HolaTacna está construyendo una red de clínicas y aliados para ayudar a pacientes y
            visitantes del norte de Chile a organizar mejor su experiencia en la ciudad.
          </p>
        </section>

        <section className="rounded-[32px] bg-slate-950 px-8 py-10 text-white shadow-xl sm:px-10 sm:py-12">
          <h2 className="text-3xl font-bold sm:text-4xl">
            ¿Estás evaluando un tratamiento o quieres conocer la red de aliados?
          </h2>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/tratamientos"
              className="inline-flex rounded-2xl bg-white px-6 py-4 text-base font-bold text-slate-950 transition hover:bg-slate-100"
            >
              Ver tratamientos
            </Link>
            <Link
              href="/alianzas"
              className="inline-flex rounded-2xl border border-white/20 bg-white/10 px-6 py-4 text-base font-semibold text-white transition hover:bg-white/15"
            >
              Explorar alianzas
            </Link>
          </div>
        </section>
      </div>
    </main>
  )
}
