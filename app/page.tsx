import Link from 'next/link'

const premiumMedicalServices = [
  {
    name: 'Implantes Dentales',
    description:
      'Tratamiento dental con ahorro frente a Chile, evaluacion comercial rapida y coordinacion previa antes de viajar a Tacna.',
    href: '/implantes-dentales-tacna',
    cta: 'Solicitar evaluacion',
  },
  {
    name: 'Operacion de Ojos',
    description:
      'Atencion oftalmologica para clientes de Chile con enfoque en ahorro, rapidez y agenda comercial clara en Tacna.',
    href: '/operacion-ojos-tacna',
    cta: 'Solicitar evaluacion',
  },
  {
    name: 'Estetica',
    description:
      'Procedimientos esteticos con coordinacion por WhatsApp, seguimiento comercial y clinicas verificadas en Tacna.',
    href: '/estetica-tacna',
    cta: 'Solicitar evaluacion',
  },
  {
    name: 'Dermatologia en Tacna',
    description:
      'Pacientes de Chile visitan Tacna para acceder a tratamientos dermatologicos mas accesibles.',
    href: '/dermatologia-tacna',
    cta: 'Ver mas',
  },
]

const chileBenefits = [
  'Ahorro frente a Chile en servicios medicos prioritarios',
  'Tacna esta a minutos de la frontera',
  'Coordinacion previa por WhatsApp antes del viaje',
  'Clinicas verificadas y soporte comercial de HolaTacna',
]

const chileCities = [
  {
    city: 'Arica',
    description: 'Acceso rapido por cercania y alta demanda de tratamientos medicos en Tacna.',
  },
  {
    city: 'Iquique',
    description:
      'Interes creciente en atencion visual, estetica y coordinacion previa para viajar con agenda definida.',
  },
  {
    city: 'Antofagasta',
    description: 'Casos que buscan ahorro, soporte comercial y derivacion confiable antes del viaje.',
  },
]

const trustPoints = [
  {
    title: 'Clinicas verificadas',
    description: 'Trabajamos con proveedores y clinicas evaluadas antes de entrar al flujo comercial.',
  },
  {
    title: 'Coordinacion por WhatsApp',
    description: 'La atencion inicial se ordena rapido para acelerar la evaluacion y la respuesta.',
  },
  {
    title: 'Ahorro y cercania',
    description: 'Tacna permite una alternativa mas accesible para clientes chilenos que cruzan la frontera.',
  },
]

const chileSeoAccesses = [
  {
    title: 'Implantes Dentales en Tacna',
    description: 'Landing principal para captar pacientes de Chile que buscan evaluacion dental en Tacna.',
    href: '/implantes-dentales-tacna',
    cta: 'Ver implantes dentales',
  },
  {
    title: 'Implantes Dentales Tacna vs Chile',
    description: 'Comparativa comercial para pacientes que siguen evaluando ahorro, cercania y tiempos.',
    href: '/implantes-dentales-tacna-vs-chile',
    cta: 'Comparar con Chile',
  },
  {
    title: 'Operacion de Ojos en Tacna',
    description: 'Landing principal para consultas oftalmologicas con coordinacion previa.',
    href: '/operacion-ojos-tacna',
    cta: 'Ver operacion de ojos',
  },
  {
    title: 'Operacion de Ojos Tacna vs Chile',
    description: 'Pagina comparativa para ayudar a cerrar la decision comercial antes del viaje.',
    href: '/operacion-ojos-tacna-vs-chile',
    cta: 'Comparar con Chile',
  },
  {
    title: 'Estetica en Tacna',
    description: 'Landing principal de tratamientos esteticos para pacientes de Chile.',
    href: '/estetica-tacna',
    cta: 'Ver estetica',
  },
  {
    title: 'Estetica Tacna vs Chile',
    description: 'Comparativa comercial para pacientes que quieren validar ahorro y cercania.',
    href: '/estetica-tacna-vs-chile',
    cta: 'Comparar con Chile',
  },
  {
    title: 'Dermatologia en Tacna',
    description: 'Landing principal para consultas dermatologicas con clinicas verificadas.',
    href: '/dermatologia-tacna',
    cta: 'Ver dermatologia',
  },
  {
    title: 'Dermatologia Tacna vs Chile',
    description: 'Comparativa pensada para pacientes que quieren decidir con mas claridad.',
    href: '/dermatologia-tacna-vs-chile',
    cta: 'Comparar con Chile',
  },
  {
    title: 'Operacion de Ojos en Tacna para Iquique',
    description:
      'Landing SEO para pacientes de Iquique que buscan atencion oftalmologica mas accesible y coordinacion previa.',
    href: '/iquique/operacion-ojos-tacna',
    cta: 'Ver opcion para Iquique',
  },
  {
    title: 'Estetica en Tacna para Iquique',
    description:
      'Landing SEO para pacientes de Iquique que buscan tratamientos esteticos con alternativa mas accesible y coordinacion por WhatsApp.',
    href: '/iquique/estetica-tacna',
    cta: 'Ver opcion de estetica',
  },
  {
    title: 'Operacion de Ojos en Tacna para Arica',
    description:
      'Landing SEO para pacientes de Arica que buscan atencion oftalmologica mas accesible, rapida y cercana a la frontera.',
    href: '/arica/operacion-ojos-tacna',
    cta: 'Ver opcion de ojos',
  },
  {
    title: 'Estetica en Tacna para Antofagasta',
    description:
      'Landing SEO para pacientes de Antofagasta que buscan tratamientos esteticos con coordinacion previa.',
    href: '/antofagasta/estetica-tacna',
    cta: 'Ver opcion para Antofagasta',
  },
  {
    title: 'Dermatologia en Tacna para Antofagasta',
    description:
      'Landing SEO para pacientes de Antofagasta que buscan tratamientos dermatologicos con coordinacion previa.',
    href: '/antofagasta/dermatologia-tacna',
    cta: 'Ver opcion de dermatologia',
  },
]

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="bg-[linear-gradient(135deg,#07111f_0%,#0f3f8c_55%,#14b8a6_100%)] px-5 py-16 text-white sm:px-6 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div>
            <div className="mb-4 inline-block rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em]">
              HolaTacna | Clientes desde Chile
            </div>
            <h1 className="mb-4 max-w-4xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              Atencion medica en Tacna con ahorro, rapidez y coordinacion previa
            </h1>
            <p className="mb-8 max-w-3xl text-base leading-8 text-white/85 sm:text-lg">
              HolaTacna conecta a clientes chilenos con clinicas verificadas en Tacna. Te ayudamos
              a coordinar por WhatsApp, reducir costos frente a Chile y avanzar con una evaluacion
              clara antes de viajar.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/implantes-dentales-tacna"
                className="rounded-xl bg-emerald-400 px-5 py-3 font-bold text-emerald-950 shadow-[0_14px_30px_rgba(34,197,94,0.24)] transition hover:bg-emerald-300"
              >
                Ver Implantes Dentales en Tacna
              </Link>

              <Link
                href="/operacion-ojos-tacna"
                className="rounded-xl bg-white px-5 py-3 font-bold text-sky-800 shadow-[0_14px_30px_rgba(255,255,255,0.16)] transition hover:bg-sky-50"
              >
                Ver Operacion de Ojos en Tacna
              </Link>

              <Link
                href="/estetica-tacna"
                className="rounded-xl border border-white/20 bg-white/10 px-5 py-3 font-bold text-white transition hover:bg-white/15"
              >
                Ver Estetica en Tacna
              </Link>

              <Link
                href="#servicios-medicos"
                className="rounded-xl border border-white/20 bg-transparent px-5 py-3 font-bold text-white transition hover:bg-white/10"
              >
                Ver servicios medicos
              </Link>
            </div>
          </div>

          <div className="rounded-[28px] border border-white/15 bg-white/10 p-6 backdrop-blur">
            <div className="mb-4 text-xs font-bold uppercase tracking-[0.14em] text-white/75">
              Beneficios para Chile
            </div>
            <div className="grid gap-3">
              {chileBenefits.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-white/10 px-4 py-4 text-sm font-semibold leading-6 text-white/90"
                >
                  {item}
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-2xl border border-emerald-300/20 bg-emerald-300/10 px-4 py-4 text-sm font-semibold leading-6 text-white/90">
              La portada prioriza la captacion medica para clientes de Chile, con foco comercial en
              Implantes Dentales, Operacion de Ojos, Estetica y Dermatologia.
            </div>
          </div>
        </div>
      </section>

      <section id="servicios-medicos" className="px-5 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <div className="mb-4 inline-block rounded-full bg-sky-100 px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-sky-700">
              Servicios medicos destacados
            </div>
            <h2 className="mb-3 text-3xl font-bold sm:text-4xl">
              Cuatro verticales medicas destacadas para clientes de Chile
            </h2>
            <p className="text-base leading-7 text-slate-600 sm:text-lg">
              La home mantiene el enfoque general de la plataforma y muestra con claridad las
              verticales de mayor demanda: Implantes Dentales, Operacion de Ojos, Estetica y
              Dermatologia.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {premiumMedicalServices.map((service) => (
              <div
                key={service.name}
                className="rounded-[24px] border border-emerald-200 bg-[linear-gradient(180deg,#ecfdf5,#ffffff)] p-6 shadow-[0_16px_30px_rgba(15,23,42,0.07)]"
              >
                <div className="mb-4 flex items-center justify-between gap-3">
                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.08em] text-emerald-700">
                    Vertical premium
                  </span>
                </div>

                <h3 className="mb-3 text-2xl font-bold">{service.name}</h3>
                <p className="text-sm leading-7 text-slate-600 sm:text-base">{service.description}</p>

                <Link
                  href={service.href}
                  className="mt-6 inline-block rounded-xl bg-emerald-500 px-4 py-3 font-bold text-emerald-950 transition hover:bg-emerald-400"
                >
                  {service.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[linear-gradient(180deg,#eff6ff,#f8fafc)] px-5 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <div className="mb-4 inline-block rounded-full bg-blue-100 px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-blue-700">
              Pacientes desde Chile
            </div>
            <h2 className="mb-3 text-3xl font-bold sm:text-4xl">Ciudades con mayor interes comercial</h2>
            <p className="text-base leading-7 text-slate-600 sm:text-lg">
              HolaTacna concentra su comunicacion en clientes de Chile que buscan rapidez, confianza
              y una alternativa medica mas accesible en Tacna.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {chileCities.map((item) => (
              <div
                key={item.city}
                className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_14px_28px_rgba(15,23,42,0.06)]"
              >
                <div className="mb-3 inline-block rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.08em] text-emerald-700">
                  {item.city}
                </div>
                <p className="text-base leading-7 text-slate-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <div className="mb-4 inline-block rounded-full bg-emerald-100 px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-emerald-700">
              Pacientes desde Chile
            </div>
            <h2 className="mb-3 text-3xl font-bold sm:text-4xl">Accesos comerciales y paginas SEO activas</h2>
            <p className="text-base leading-7 text-slate-600 sm:text-lg">
              La home mantiene visibles las landings principales, sus comparativas con Chile y un
              acceso especifico para pacientes desde Arica, Iquique y Antofagasta que buscan
              atencion medica en Tacna.
            </p>
          </div>

          <div className="mb-6 grid gap-5 md:grid-cols-2 xl:grid-cols-6">
            <div className="rounded-[28px] border border-sky-100 bg-sky-50/80 p-8 shadow-[0_16px_30px_rgba(15,23,42,0.06)]">
              <div className="mb-3 inline-block rounded-full bg-white px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-sky-700">
                Pacientes desde Arica
              </div>
              <h3 className="mb-3 text-3xl font-bold text-slate-950">Pacientes desde Arica</h3>
              <p className="mb-5 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
                Implantes dentales en Tacna para pacientes de Arica, con atencion rapida, cercania a
                la frontera y coordinacion por WhatsApp.
              </p>
              <Link
                href="/arica/implantes-dentales-tacna"
                className="inline-flex items-center rounded-xl bg-sky-600 px-5 py-3 font-bold text-white transition hover:bg-sky-500"
              >
                Ver opcion para Arica
              </Link>
            </div>

            <div className="rounded-[28px] border border-cyan-100 bg-cyan-50/80 p-8 shadow-[0_16px_30px_rgba(15,23,42,0.06)]">
              <div className="mb-3 inline-block rounded-full bg-white px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-cyan-700">
                Pacientes desde Arica
              </div>
              <h3 className="mb-3 text-3xl font-bold text-slate-950">Pacientes desde Arica</h3>
              <p className="mb-5 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
                Operacion de ojos en Tacna para pacientes de Arica, con atencion rapida, cercania
                con la frontera y coordinacion por WhatsApp.
              </p>
              <Link
                href="/arica/operacion-ojos-tacna"
                className="inline-flex items-center rounded-xl bg-cyan-600 px-5 py-3 font-bold text-white transition hover:bg-cyan-500"
              >
                Ver opcion de ojos
              </Link>
            </div>

            <div className="rounded-[28px] border border-emerald-100 bg-emerald-50/80 p-8 shadow-[0_16px_30px_rgba(15,23,42,0.06)]">
              <div className="mb-3 inline-block rounded-full bg-white px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-emerald-700">
                Pacientes desde Iquique
              </div>
              <h3 className="mb-3 text-3xl font-bold text-slate-950">Pacientes desde Iquique</h3>
              <p className="mb-5 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
                Operacion de ojos en Tacna para pacientes de Iquique, con atencion rapida,
                alternativa mas accesible y coordinacion por WhatsApp.
              </p>
              <Link
                href="/iquique/operacion-ojos-tacna"
                className="inline-flex items-center rounded-xl bg-emerald-500 px-5 py-3 font-bold text-emerald-950 transition hover:bg-emerald-400"
              >
                Ver opcion para Iquique
              </Link>
            </div>

            <div className="rounded-[28px] border border-rose-100 bg-rose-50/80 p-8 shadow-[0_16px_30px_rgba(15,23,42,0.06)]">
              <div className="mb-3 inline-block rounded-full bg-white px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-rose-700">
                Pacientes desde Iquique
              </div>
              <h3 className="mb-3 text-3xl font-bold text-slate-950">Pacientes desde Iquique</h3>
              <p className="mb-5 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
                Tratamientos esteticos en Tacna para pacientes de Iquique, con alternativa mas
                accesible y coordinacion por WhatsApp.
              </p>
              <Link
                href="/iquique/estetica-tacna"
                className="inline-flex items-center rounded-xl bg-rose-500 px-5 py-3 font-bold text-white transition hover:bg-rose-400"
              >
                Ver opcion de estetica
              </Link>
            </div>

            <div className="rounded-[28px] border border-pink-100 bg-pink-50/80 p-8 shadow-[0_16px_30px_rgba(15,23,42,0.06)]">
              <div className="mb-3 inline-block rounded-full bg-white px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-pink-700">
                Pacientes desde Antofagasta
              </div>
              <h3 className="mb-3 text-3xl font-bold text-slate-950">Pacientes desde Antofagasta</h3>
              <p className="mb-5 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
                Tratamientos esteticos en Tacna para pacientes de Antofagasta, con alternativa mas
                accesible y coordinacion por WhatsApp.
              </p>
              <Link
                href="/antofagasta/estetica-tacna"
                className="inline-flex items-center rounded-xl bg-pink-500 px-5 py-3 font-bold text-white transition hover:bg-pink-400"
              >
                Ver opcion para Antofagasta
              </Link>
            </div>

            <div className="rounded-[28px] border border-violet-100 bg-violet-50/80 p-8 shadow-[0_16px_30px_rgba(15,23,42,0.06)]">
              <div className="mb-3 inline-block rounded-full bg-white px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-violet-700">
                Pacientes desde Antofagasta
              </div>
              <h3 className="mb-3 text-3xl font-bold text-slate-950">Pacientes desde Antofagasta</h3>
              <p className="mb-5 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
                Tratamientos dermatologicos en Tacna para pacientes de Antofagasta, con alternativa
                mas accesible y coordinacion por WhatsApp.
              </p>
              <Link
                href="/antofagasta/dermatologia-tacna"
                className="inline-flex items-center rounded-xl bg-violet-600 px-5 py-3 font-bold text-white transition hover:bg-violet-500"
              >
                Ver opcion de dermatologia
              </Link>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {chileSeoAccesses.map((item) => (
              <div
                key={item.href}
                className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_16px_30px_rgba(15,23,42,0.05)]"
              >
                <h3 className="mb-3 text-2xl font-bold">{item.title}</h3>
                <p className="text-sm leading-7 text-slate-600 sm:text-base">{item.description}</p>
                <Link
                  href={item.href}
                  className="mt-6 inline-block rounded-xl bg-slate-950 px-4 py-3 font-bold text-white transition hover:bg-slate-800"
                >
                  {item.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <div className="mb-4 inline-block rounded-full bg-emerald-100 px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-emerald-700">
                Confianza
              </div>
              <h2 className="text-3xl font-bold sm:text-4xl">Por que HolaTacna</h2>
              <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
                La propuesta comercial combina ahorro frente a Chile, cercania con Tacna,
                coordinacion por WhatsApp y una red de clinicas verificadas.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {trustPoints.map((item) => (
                <div
                  key={item.title}
                  className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_14px_28px_rgba(15,23,42,0.06)]"
                >
                  <h3 className="mb-3 text-xl font-bold">{item.title}</h3>
                  <p className="text-sm leading-7 text-slate-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-950 px-5 py-14 text-white sm:px-6 sm:py-16">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 rounded-[28px] border border-white/10 bg-white/5 px-6 py-8 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-2 text-xs font-bold uppercase tracking-[0.12em] text-white/65">
              Acceso interno
            </div>
            <h2 className="text-2xl font-bold">CRM operativo</h2>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-white/75">
              El acceso al CRM se mantiene disponible para la operacion comercial, sin quitar
              protagonismo a la captacion medica desde la home.
            </p>
          </div>

          <Link
            href="/dashboard"
            className="w-fit rounded-xl border border-white/20 bg-white/10 px-5 py-3 font-bold text-white transition hover:bg-white/15"
          >
            Ir al CRM
          </Link>
        </div>
      </section>
    </main>
  )
}
