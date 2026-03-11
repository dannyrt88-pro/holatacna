import Link from 'next/link'

const allyCategories = [
  {
    title: 'Clinicas dentales',
    description: 'Buscamos clinicas con experiencia, buena atencion y capacidad de coordinacion previa.',
  },
  {
    title: 'Oftalmologia',
    description: 'Valoramos centros y especialistas que puedan atender a pacientes del norte de Chile con claridad y confianza.',
  },
  {
    title: 'Estetica y dermatologia',
    description: 'Queremos sumar negocios que ofrezcan una experiencia profesional, ordenada y bien comunicada.',
  },
  {
    title: 'Hoteles y alojamientos',
    description: 'Nos interesa trabajar con hospedajes confiables para estancias medicas o visitas cortas en Tacna.',
  },
  {
    title: 'Departamentos por dia',
    description: 'Buscamos opciones practicas y bien ubicadas para personas que requieren flexibilidad en su estadia.',
  },
  {
    title: 'Transporte',
    description: 'Queremos aliados que puedan apoyar traslados seguros y coordinados dentro de la experiencia del visitante.',
  },
  {
    title: 'Restaurantes',
    description: 'Nos interesa conectar con negocios que puedan atender visitantes con una experiencia clara y confiable.',
  },
]

function HolaTacnaLogo() {
  return (
    <div className="text-5xl font-black tracking-[-0.05em] sm:text-7xl">
      <div>
        <span className="text-sky-700">Hola</span>
        <span className="text-green-600">Tacna</span>
      </div>
    </div>
  )
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#eff6ff_0%,#f8fafc_42%,#e2e8f0_100%)] px-6 py-10 text-slate-950 sm:px-8 sm:py-14">
      <div className="mx-auto max-w-6xl">
        <section className="mb-6 rounded-[36px] border border-white/70 bg-white/80 px-8 py-12 text-center shadow-[0_30px_80px_rgba(15,23,42,0.12)] backdrop-blur sm:px-12 sm:py-16">
          <div className="mb-8 flex justify-center">
            <HolaTacnaLogo />
          </div>

          <div className="mx-auto mb-4 inline-flex rounded-full border border-sky-200 bg-sky-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-sky-800">
            Red de aliados en construccion
          </div>

          <h1 className="mx-auto max-w-4xl text-3xl font-black leading-tight tracking-[-0.04em] sm:text-5xl">
            HolaTacna esta construyendo una red de servicios confiables en Tacna
          </h1>

          <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
            Estamos construyendo una red de clinicas y servicios aliados en Tacna para atender
            mejor a pacientes y visitantes provenientes del norte de Chile.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link
              href="/registro-proveedores"
              className="rounded-2xl bg-[linear-gradient(135deg,#0f766e_0%,#1d4ed8_100%)] px-7 py-4 text-base font-bold text-white shadow-[0_18px_40px_rgba(29,78,216,0.22)] transition hover:scale-[1.01] hover:shadow-[0_22px_46px_rgba(15,118,110,0.28)]"
            >
              Postular como proveedor aliado
            </Link>
            <Link
              href="/dashboard"
              className="rounded-2xl border border-slate-200 bg-white px-6 py-4 text-base font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Acceso del equipo
            </Link>
          </div>
        </section>

        <section className="mb-6 rounded-[32px] bg-white px-8 py-10 shadow-[0_18px_50px_rgba(15,23,42,0.08)] sm:px-10">
          <div className="mx-auto mb-8 max-w-3xl text-center">
            <div className="mb-4 inline-flex rounded-full bg-sky-100 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-sky-700">
              Tipos de aliados
            </div>
            <h2 className="text-3xl font-bold sm:text-4xl">Tipos de aliados que buscamos</h2>
            <p className="mt-3 text-base leading-7 text-slate-600 sm:text-lg">
              Estamos sumando negocios y servicios que puedan aportar una experiencia confiable y bien coordinada en Tacna.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {allyCategories.map((category) => (
              <article
                key={category.title}
                className="rounded-[24px] border border-slate-200 bg-slate-50 p-6"
              >
                <h3 className="mb-3 text-2xl font-bold">{category.title}</h3>
                <p className="text-base leading-7 text-slate-600">{category.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-[32px] border border-emerald-200 bg-[linear-gradient(180deg,#ecfdf5_0%,#ffffff_100%)] px-8 py-10 shadow-[0_18px_50px_rgba(15,23,42,0.08)] sm:px-10">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-4 inline-flex rounded-full bg-emerald-100 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-emerald-700">
              Confianza
            </div>
            <h2 className="text-3xl font-bold sm:text-4xl">Una red construida con criterio y revision previa</h2>
            <p className="mt-4 text-base leading-8 text-slate-700 sm:text-lg">
              HolaTacna esta construyendo una red de proveedores confiables en Tacna para pacientes
              que visitan la ciudad desde el norte de Chile.
            </p>
            <p className="mt-3 text-base leading-8 text-slate-600 sm:text-lg">
              Los negocios aliados son revisados antes de ser incorporados a la red.
            </p>

            <div className="mt-8">
              <Link
                href="/registro-proveedores"
                className="inline-flex rounded-2xl bg-slate-950 px-7 py-4 text-base font-bold text-white transition hover:bg-slate-800"
              >
                Postular como proveedor aliado
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
