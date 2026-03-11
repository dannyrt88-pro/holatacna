import Link from 'next/link'

const allianceCategories = [
  {
    title: 'Clínicas',
    description:
      'Para clínicas dentales, oftalmológicas, estéticas y centros médicos que deseen formar parte de la red.',
    href: '/alianzas/clinicas',
  },
  {
    title: 'Hoteles y alojamientos',
    description:
      'Para hoteles, hostales y hospedajes que puedan recibir visitantes y acompañantes durante su estancia en Tacna.',
    href: '/alianzas/hoteles',
  },
  {
    title: 'Transporte',
    description:
      'Para servicios de traslado que puedan apoyar la movilidad entre frontera, terminales, hospedajes y centros de atención.',
    href: '/alianzas/transporte',
  },
  {
    title: 'Restaurantes',
    description:
      'Para negocios gastronómicos que quieran formar parte de una red confiable para visitantes de Chile.',
    href: '/alianzas/restaurantes',
  },
  {
    title: 'Departamentos por día',
    description:
      'Para opciones de alojamiento temporal que puedan ofrecer una estadía práctica y ordenada durante el viaje.',
    href: '/alianzas/departamentos',
  },
]

export default function AlliancesHubPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#eff6ff_0%,#f8fafc_42%,#e2e8f0_100%)] px-6 py-10 text-slate-950 sm:px-8 sm:py-14">
      <div className="mx-auto max-w-6xl">
        <section className="mb-6 rounded-[32px] bg-[linear-gradient(135deg,#082f49_0%,#155e75_50%,#15803d_100%)] px-8 py-12 text-white shadow-xl sm:px-10 sm:py-14">
          <div className="mb-4 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em]">Alianzas institucionales</div>
          <h1 className="max-w-4xl text-4xl font-bold leading-tight sm:text-5xl">Alianzas con proveedores y aliados en Tacna</h1>
          <p className="mt-4 max-w-3xl text-base leading-8 text-white/85 sm:text-lg">HolaTacna está construyendo una red de servicios confiables en Tacna para pacientes y visitantes del norte de Chile. Si tienes un negocio en la ciudad, puedes conocer cómo formar parte de la red de aliados.</p>
          <div className="mt-8"><Link href="/registro-proveedores" className="inline-flex rounded-2xl bg-white px-6 py-4 text-base font-bold text-slate-950 transition hover:bg-slate-100">Postular como proveedor</Link></div>
        </section>
        <section className="mb-6 rounded-[28px] bg-white p-8 shadow-lg sm:p-10"><div className="mb-4 inline-flex rounded-full bg-sky-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-sky-700">Categorías</div><h2 className="text-3xl font-bold sm:text-4xl">Explora alianzas por categoría</h2><div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">{allianceCategories.map((category) => (<article key={category.title} className="rounded-[24px] border border-slate-200 bg-slate-50 p-6"><h3 className="text-2xl font-bold">{category.title}</h3><p className="mt-3 text-sm leading-7 text-slate-600">{category.description}</p><Link href={category.href} className="mt-6 inline-flex rounded-xl bg-slate-950 px-4 py-3 font-semibold text-white transition hover:bg-slate-800">Ver alianza</Link></article>))}</div></section>
        <section className="mb-6 rounded-[28px] bg-white p-8 shadow-lg sm:p-10"><div className="mb-4 inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-emerald-700">Contexto</div><h2 className="text-3xl font-bold sm:text-4xl">Una red de servicios para visitantes del norte de Chile</h2><p className="mt-4 max-w-4xl text-base leading-8 text-slate-600 sm:text-lg">Cada año muchas personas del norte de Chile viajan a Tacna por atención médica, estadías breves y distintos servicios de apoyo durante su visita.</p><p className="mt-3 max-w-4xl text-base leading-8 text-slate-600 sm:text-lg">HolaTacna busca organizar ese flujo conectando visitantes con servicios confiables en la ciudad.</p></section>
        <section className="mb-6 rounded-[24px] border border-slate-200 bg-white p-6 shadow-lg sm:p-8"><div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><div><div className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-slate-500">Apoyo institucional</div><p className="text-base font-semibold text-slate-900">Conoce la visión general de la red HolaTacna</p></div><Link href="/red" className="inline-flex rounded-xl border border-slate-300 bg-slate-50 px-5 py-3 font-semibold text-slate-800 transition hover:bg-slate-100">Ver la red</Link></div></section>
        <section className="mb-6 rounded-[28px] border border-emerald-200 bg-[linear-gradient(180deg,#ecfdf5_0%,#ffffff_100%)] p-8 shadow-lg sm:p-10"><div className="mb-4 inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-emerald-700">Confianza</div><p className="max-w-4xl text-base leading-8 text-slate-700 sm:text-lg">Nuestro objetivo es construir una red de aliados clara y confiable. Cada proveedor comparte información básica para poder ser considerado dentro de la red.</p></section>
        <section className="rounded-[32px] bg-slate-950 px-8 py-10 text-white shadow-xl sm:px-10 sm:py-12"><h2 className="text-3xl font-bold sm:text-4xl">¿Tienes un negocio en Tacna?</h2><p className="mt-4 max-w-3xl text-base leading-8 text-white/80 sm:text-lg">Puedes postular para formar parte de la red de aliados de HolaTacna.</p><div className="mt-8"><Link href="/registro-proveedores" className="inline-flex rounded-2xl bg-white px-6 py-4 text-base font-bold text-slate-950 transition hover:bg-slate-100">Postular como proveedor</Link></div></section>
      </div>
    </main>
  )
}
