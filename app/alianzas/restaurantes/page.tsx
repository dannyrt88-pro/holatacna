import Link from 'next/link'

const benefitCards = [
  {
    title: 'Visibilidad frente a visitantes de Chile',
    description:
      'HolaTacna puede acercar restaurantes de Tacna a personas que buscan opciones confiables para comer durante su estadia.',
  },
  {
    title: 'Posibilidad de ser recomendado dentro de una red confiable',
    description:
      'Un restaurante bien valorado puede formar parte de una experiencia mas ordenada para visitantes y acompanantes.',
  },
  {
    title: 'Presencia ante personas que buscan donde comer durante su estadia',
    description:
      'Una red institucional ayuda a que los negocios tengan mejor presencia frente a quienes aun no conocen Tacna.',
  },
  {
    title: 'Oportunidad de atraer nuevos clientes en Tacna',
    description:
      'Una recomendacion confiable puede abrir nuevas oportunidades para negocios con buena atencion y experiencia consistente.',
  },
]

const allyTypes = ['Restaurantes', 'Cafeterias', 'Opciones saludables', 'Atencion familiar']
const criteria = [
  'Claridad en la informacion',
  'Atencion profesional',
  'Informacion verificable',
  'Buena experiencia',
  'Disposicion para atender visitantes de Chile',
]
const processSteps = ['Postulacion', 'Revision', 'Incorporacion a la red']

export default function RestaurantsPartnershipsPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#eff6ff_0%,#f8fafc_42%,#e2e8f0_100%)] px-6 py-10 text-slate-950 sm:px-8 sm:py-14">
      <div className="mx-auto max-w-6xl">
        <section className="mb-6 rounded-[32px] bg-[linear-gradient(135deg,#082f49_0%,#155e75_50%,#15803d_100%)] px-8 py-12 text-white shadow-xl sm:px-10 sm:py-14">
          <div className="mb-4 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em]">
            Alianzas institucionales
          </div>
          <h1 className="max-w-4xl text-4xl font-bold leading-tight sm:text-5xl">
            Alianzas con restaurantes en Tacna
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-8 text-white/85 sm:text-lg">
            HolaTacna busca conectar visitantes que buscan opciones confiables para
            comer durante su estadia. Si representas un restaurante, cafeteria u otra propuesta
            gastronomica, puedes postular para formar parte de la red.
          </p>
          <div className="mt-8">
            <Link href="/registro-proveedores" className="inline-flex rounded-2xl bg-white px-6 py-4 text-base font-bold text-slate-950 transition hover:bg-slate-100">
              Postular como aliado
            </Link>
          </div>
        </section>

        <section className="mb-6 rounded-[28px] bg-white p-8 shadow-lg sm:p-10">
          <div className="mb-4 inline-flex rounded-full bg-sky-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-sky-700">Contexto</div>
          <h2 className="text-3xl font-bold sm:text-4xl">Opciones confiables para comer en Tacna</h2>
          <p className="mt-4 max-w-4xl text-base leading-8 text-slate-600 sm:text-lg">
            Visitantes y acompanantes del norte de Chile suelen buscar lugares confiables
            para comer durante su estadia. Una buena recomendacion gastronomica puede formar parte de una experiencia mas ordenada y agradable en la ciudad.
          </p>
        </section>

        <section className="mb-6 rounded-[28px] bg-white p-8 shadow-lg sm:p-10">
          <div className="mb-4 inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-emerald-700">Beneficios</div>
          <h2 className="text-3xl font-bold sm:text-4xl">Por que participar en la red</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {benefitCards.map((benefit) => (
              <article key={benefit.title} className="rounded-[24px] border border-slate-200 bg-slate-50 p-5">
                <h3 className="text-xl font-bold">{benefit.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{benefit.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-6 grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-[28px] bg-white p-8 shadow-lg sm:p-10">
            <div className="mb-4 inline-flex rounded-full bg-violet-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-violet-700">Tipos de aliados</div>
            <h2 className="text-3xl font-bold sm:text-4xl">Restaurantes que pueden postular</h2>
            <div className="mt-6 grid gap-3">
              {allyTypes.map((item) => (
                <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm font-semibold text-slate-800">{item}</div>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] bg-white p-8 shadow-lg sm:p-10">
            <div className="mb-4 inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-amber-700">Que buscamos</div>
            <h2 className="text-3xl font-bold sm:text-4xl">Criterios para una alianza</h2>
            <p className="mt-4 text-base leading-8 text-slate-600">
              Buscamos restaurantes que puedan ofrecer una experiencia clara, ordenada y agradable para visitantes de Chile.
            </p>
            <div className="mt-6 grid gap-3">
              {criteria.map((item) => (
                <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm font-semibold text-slate-800">{item}</div>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-6 rounded-[28px] bg-white p-8 shadow-lg sm:p-10">
          <div className="mb-4 inline-flex rounded-full bg-sky-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-sky-700">Proceso</div>
          <h2 className="text-3xl font-bold sm:text-4xl">Como funciona</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {processSteps.map((step, index) => (
              <div key={step} className="rounded-[24px] border border-slate-200 bg-slate-50 p-6">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-slate-950 text-sm font-bold text-white">{index + 1}</div>
                <p className="text-base font-semibold leading-7 text-slate-800">{step}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-6 rounded-[28px] border border-emerald-200 bg-[linear-gradient(180deg,#ecfdf5_0%,#ffffff_100%)] p-8 shadow-lg sm:p-10">
          <div className="mb-4 inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-emerald-700">Confianza</div>
          <h2 className="text-3xl font-bold sm:text-4xl">Revision previa antes de incorporarse a la red</h2>
          <p className="mt-4 max-w-4xl text-base leading-8 text-slate-700 sm:text-lg">
            HolaTacna revisa previamente la informacion de los restaurantes interesados antes de incorporarlos a la red. El objetivo es construir una base de aliados confiables y consistentes para visitantes del norte de Chile.
          </p>
        </section>

        <section className="rounded-[32px] bg-slate-950 px-8 py-10 text-white shadow-xl sm:px-10 sm:py-12">
          <h2 className="text-3xl font-bold sm:text-4xl">Representas un restaurante en Tacna?</h2>
          <p className="mt-4 max-w-3xl text-base leading-8 text-white/80 sm:text-lg">Postula para formar parte de la red de aliados de HolaTacna.</p>
          <div className="mt-8">
            <Link href="/registro-proveedores" className="inline-flex rounded-2xl bg-white px-6 py-4 text-base font-bold text-slate-950 transition hover:bg-slate-100">
              Postular como aliado
            </Link>
          </div>
        </section>
      </div>
    </main>
  )
}
