import Link from 'next/link'

const medicalServices = [
  {
    name: 'Implantes dentales',
    description:
      'Conoce opciones de implantes dentales en Tacna con información clara y orientación antes de viajar.',
    href: '/implantes-dentales-tacna',
  },
  {
    name: 'Operación de ojos',
    description:
      'Revisa alternativas para la operación de ojos en Tacna con una visión más clara antes de coordinar tu atención.',
    href: '/operacion-ojos-tacna',
  },
  {
    name: 'Estética',
    description:
      'Explora tratamientos estéticos en Tacna pensados para pacientes que buscan orientación previa y cercanía.',
    href: '/estetica-tacna',
  },
  {
    name: 'Dermatología',
    description:
      'Encuentra opciones de dermatología en Tacna con información útil para comparar antes de viajar.',
    href: '/dermatologia-tacna',
  },
]

const cityAccess = [
  {
    city: 'Arica',
    description:
      'Pacientes de Arica consultan tratamientos en Tacna por cercanía, rapidez y orientación antes de viajar.',
    href: '/arica',
  },
  {
    city: 'Iquique',
    description:
      'Pacientes de Iquique revisan opciones médicas en Tacna para organizar mejor su atención antes del viaje.',
    href: '/iquique',
  },
  {
    city: 'Antofagasta',
    description:
      'Pacientes de Antofagasta evalúan tratamientos en Tacna buscando más claridad, comparación y cercanía.',
    href: '/antofagasta',
  },
]

const steps = [
  'Exploras tratamientos',
  'Envías tu consulta',
  'Recibes orientación inicial',
  'Coordinas tu atención en Tacna',
  'Organizas tu estadía',
]

const alliedServices = [
  'Hoteles y alojamientos',
  'Departamentos por día',
  'Transporte',
  'Restaurantes',
]

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#eff6ff_0%,#f8fafc_42%,#e2e8f0_100%)] px-6 py-10 text-slate-950 sm:px-8 sm:py-14">
      <div className="mx-auto max-w-6xl">
        <section className="mb-6 rounded-[32px] bg-[linear-gradient(135deg,#082f49_0%,#0f3f8c_58%,#14b8a6_100%)] px-8 py-12 text-white shadow-xl sm:px-10 sm:py-14">
          <div className="mb-4 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em]">
            HolaTacna | Pacientes del norte de Chile
          </div>
          <h1 className="max-w-4xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            Tratamientos médicos en Tacna para pacientes del norte de Chile
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-8 text-white/85 sm:text-lg">
            Explora opciones médicas, compara tratamientos y recibe orientación antes de viajar
            desde Arica, Iquique, Antofagasta y otras ciudades de Chile.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/tratamientos" className="rounded-2xl bg-emerald-400 px-6 py-4 font-bold text-emerald-950 shadow-[0_14px_30px_rgba(34,197,94,0.24)] transition hover:bg-emerald-300">Ver tratamientos</Link>
            <Link href="/como-funciona" className="rounded-2xl bg-white px-6 py-4 font-bold text-sky-800 shadow-[0_14px_30px_rgba(255,255,255,0.16)] transition hover:bg-sky-50">¿Cómo funciona?</Link>
          </div>
        </section>

        <section className="mb-6 rounded-[28px] bg-white p-8 shadow-lg sm:p-10">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <div className="mb-4 inline-flex rounded-full bg-sky-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-sky-700">Tratamientos médicos</div>
            <h2 className="text-3xl font-bold sm:text-4xl">Servicios médicos más consultados</h2>
            <p className="mt-3 text-base leading-7 text-slate-600 sm:text-lg">Revisa las principales opciones médicas que pacientes del norte de Chile evalúan en Tacna antes de viajar.</p>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">{medicalServices.map((service) => (<article key={service.name} className="rounded-[24px] border border-emerald-200 bg-[linear-gradient(180deg,#ecfdf5,#ffffff)] p-6 shadow-[0_16px_30px_rgba(15,23,42,0.07)]"><h3 className="mb-3 text-2xl font-bold">{service.name}</h3><p className="text-base leading-7 text-slate-600">{service.description}</p><Link href={service.href} className="mt-6 inline-flex rounded-xl bg-emerald-500 px-4 py-3 font-bold text-emerald-950 transition hover:bg-emerald-400">Ver información</Link></article>))}</div>
        </section>

        <section className="mb-6 rounded-[28px] bg-white p-8 shadow-lg sm:p-10"><div className="mx-auto mb-10 max-w-3xl text-center"><div className="mb-4 inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-emerald-700">Ciudades de origen</div><h2 className="text-3xl font-bold sm:text-4xl">Explora tratamientos por ciudad de origen</h2><p className="mt-3 text-base leading-7 text-slate-600 sm:text-lg">Revisa opciones pensadas para pacientes que viajan desde Arica, Iquique y Antofagasta.</p></div><div className="grid gap-5 md:grid-cols-3">{cityAccess.map((item) => (<article key={item.city} className="rounded-[24px] border border-slate-200 bg-slate-50 p-6"><div className="mb-3 inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.08em] text-emerald-700">{item.city}</div><p className="mb-5 text-base leading-7 text-slate-600">{item.description}</p><Link href={item.href} className="inline-flex rounded-xl bg-slate-950 px-4 py-3 font-bold text-white transition hover:bg-slate-800">Ver opciones</Link></article>))}</div></section>

        <section className="mb-6 rounded-[28px] bg-[linear-gradient(180deg,#f8fafc,#eef2ff)] p-8 shadow-lg sm:p-10"><div className="mx-auto mb-10 max-w-3xl text-center"><div className="mb-4 inline-flex rounded-full bg-indigo-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-indigo-700">Proceso</div><h2 className="text-3xl font-bold sm:text-4xl">¿Cómo funciona HolaTacna?</h2></div><div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">{steps.map((step, index) => (<article key={step} className="rounded-[24px] border border-indigo-100 bg-white p-6 shadow-[0_14px_28px_rgba(15,23,42,0.06)]"><div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white">{index + 1}</div><p className="text-base font-semibold leading-7 text-slate-800">{step}</p></article>))}</div><div className="mt-8 text-center"><Link href="/como-funciona" className="inline-flex rounded-2xl bg-slate-950 px-6 py-4 font-bold text-white transition hover:bg-slate-800">Conocer cómo funciona</Link></div></section>

        <section className="mb-6 rounded-[28px] bg-white p-8 shadow-lg sm:p-10"><div className="mx-auto mb-10 max-w-3xl text-center"><div className="mb-4 inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-amber-700">Servicios aliados</div><h2 className="text-3xl font-bold sm:text-4xl">Servicios aliados para tu viaje a Tacna</h2><p className="mt-3 text-base leading-8 text-slate-600 sm:text-lg">Además de la atención médica, HolaTacna está construyendo una red de servicios aliados para ayudar a pacientes y visitantes a organizar mejor su estadía en Tacna.</p></div><div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">{alliedServices.map((service) => (<article key={service} className="rounded-[24px] border border-slate-200 bg-slate-50 p-6"><h3 className="text-xl font-bold">{service}</h3></article>))}</div><div className="mt-8 text-center"><Link href="/alianzas" className="inline-flex rounded-2xl bg-slate-950 px-6 py-4 font-bold text-white transition hover:bg-slate-800">Explorar aliados</Link></div></section>

        <section className="mb-6 rounded-[28px] border border-slate-200 bg-white p-8 shadow-lg sm:p-10"><div className="mx-auto max-w-3xl text-center"><div className="mb-4 inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-slate-700">Red HolaTacna</div><h2 className="text-2xl font-bold sm:text-3xl">¿Tienes un negocio en Tacna?</h2><p className="mt-3 text-base leading-7 text-slate-600 sm:text-lg">Conoce la red de aliados de HolaTacna.</p><div className="mt-6"><Link href="/red" className="inline-flex rounded-xl border border-slate-300 bg-slate-50 px-5 py-3 font-semibold text-slate-800 transition hover:bg-slate-100">Conocer la red</Link></div></div></section>

        <section className="mb-6 rounded-[28px] border border-emerald-200 bg-[linear-gradient(180deg,#ecfdf5_0%,#ffffff_100%)] p-8 shadow-lg sm:p-10"><div className="mb-4 inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-emerald-700">Confianza</div><h2 className="text-3xl font-bold sm:text-4xl">Una red de servicios confiables en Tacna</h2><p className="mt-4 max-w-4xl text-base leading-8 text-slate-700 sm:text-lg">HolaTacna está construyendo una red de clínicas y servicios aliados para ayudar a pacientes del norte de Chile a organizar mejor su experiencia en la ciudad.</p></section>

        <section className="rounded-[32px] bg-slate-950 px-8 py-10 text-white shadow-xl sm:px-10 sm:py-12"><h2 className="text-3xl font-bold sm:text-4xl">¿Estás evaluando un tratamiento en Tacna?</h2><div className="mt-8 flex flex-wrap gap-3"><Link href="/tratamientos" className="inline-flex rounded-2xl bg-emerald-400 px-6 py-4 font-bold text-emerald-950 transition hover:bg-emerald-300">Ver tratamientos</Link><Link href="/como-funciona" className="inline-flex rounded-2xl border border-white/20 bg-white/10 px-6 py-4 font-bold text-white transition hover:bg-white/15">¿Cómo funciona?</Link></div></section>
      </div>
    </main>
  )
}
