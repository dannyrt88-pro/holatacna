import Link from 'next/link'
import { services } from '@/lib/service-catalog'
import { medicalSeoRoutes } from '@/lib/medical-seo-routes'

const highlights = [
  { value: 'Chile -> Tacna', label: 'Captacion orientada a clientes transfronterizos' },
  { value: 'CRM + Routing', label: 'Gestion de leads y derivacion de proveedores' },
  { value: 'WhatsApp', label: 'Coordinacion comercial previa al viaje' },
]

const trustPoints = [
  'Clinicas verificadas',
  'Atencion por WhatsApp',
  'Acompanamiento previo al viaje',
  'Soporte comercial para clientes chilenos',
]

const providerRegistrationLink = '/providers?register=1'
const providerWhatsAppText =
  'Hola, represento un servicio y quiero evaluar una alianza comercial con HolaTacna para afiliarme como proveedor.'

export default function HomePage() {
  const providerWhatsAppNumber = process.env.NEXT_PUBLIC_PROVIDER_WHATSAPP_NUMBER?.replace(/\D/g, '') || ''
  const providerWhatsAppLink = providerWhatsAppNumber
    ? `https://wa.me/${providerWhatsAppNumber}?text=${encodeURIComponent(providerWhatsAppText)}`
    : providerRegistrationLink

  return (
    <main className="min-h-screen bg-slate-100 text-slate-950">
      <section className="relative overflow-hidden bg-[linear-gradient(135deg,#07111f_0%,#0f3f8c_55%,#14b8a6_100%)] px-5 py-16 text-white sm:px-6 sm:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(255,255,255,0.18),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(34,197,94,0.18),transparent_28%)]" />

        <div className="relative mx-auto max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-stretch">
            <div>
              <div className="mb-4 inline-block rounded-full border border-white/20 bg-white/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] sm:px-4">
                HolaTacna | Captacion internacional
              </div>

              <h1 className="mb-4 max-w-4xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                Tratamientos y servicios en Tacna para clientes chilenos
              </h1>

              <p className="mb-7 max-w-3xl text-base leading-7 text-white/85 sm:text-lg">
                Ahorra frente a Chile, coordina por WhatsApp antes de viajar y conecta con
                proveedores verificados desde un solo punto comercial.
              </p>

              <div className="flex flex-wrap gap-3">
                {services.slice(0, 4).map((service) => (
                  <Link
                    key={service.slug}
                    href={service.href}
                    className="rounded-xl bg-emerald-500 px-5 py-3 font-bold text-emerald-950 shadow-[0_14px_30px_rgba(34,197,94,0.28)] transition hover:bg-emerald-400"
                  >
                    Ver {service.name}
                  </Link>
                ))}

                <Link
                  href="/dashboard"
                  className="rounded-xl border border-white/25 bg-white/10 px-5 py-3 font-bold text-white transition hover:bg-white/15"
                >
                  Ir al CRM
                </Link>
              </div>
            </div>

            <div className="rounded-[24px] border border-white/15 bg-slate-950/25 p-5 backdrop-blur xl:p-6">
              <div className="mb-4 text-xs uppercase tracking-[0.16em] text-white/70">
                Operacion comercial
              </div>

              <div className="grid gap-3">
                {highlights.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-white/10 bg-white/10 p-4"
                  >
                    <strong className="mb-1 block text-xl sm:text-2xl">{item.value}</strong>
                    <span className="block text-sm leading-6 text-white/80">{item.label}</span>
                  </div>
                ))}
              </div>

              <div className="mt-4 rounded-2xl border border-emerald-400/20 bg-emerald-400/15 p-4 text-sm font-bold leading-6">
                Flujo actual: landing - formulario - Supabase - dashboard - proveedor.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <div className="mb-4 inline-block rounded-full bg-blue-100 px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-blue-700">
              Servicios
            </div>
            <h2 className="mb-3 text-3xl font-bold sm:text-4xl">Verticales activas en HolaTacna</h2>
            <p className="text-base leading-7 text-slate-600 sm:text-lg">
              La capa comercial ya soporta servicios clinicos prioritarios y nuevas verticales
              de turismo, logistica y comercio sin romper el CRM.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {services.map((service) => (
              <div
                key={service.slug}
                className="rounded-[22px] border border-slate-200 bg-[linear-gradient(180deg,#ffffff,#f8fafc)] p-6 shadow-[0_16px_30px_rgba(15,23,42,0.07)]"
              >
                <div className="mb-4 flex flex-wrap justify-between gap-2">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.08em] ${
                      service.category === 'clinico'
                        ? 'bg-emerald-100 text-emerald-700'
                        : service.category === 'turismo'
                          ? 'bg-blue-100 text-blue-700'
                          : service.category === 'logistica'
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-violet-100 text-violet-700'
                    }`}
                  >
                    {service.category}
                  </span>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.08em] ${
                      service.priority === 'high'
                        ? 'bg-rose-100 text-rose-700'
                        : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {service.priority === 'high' ? 'alta prioridad' : 'expansion'}
                  </span>
                </div>

                <h3 className="mb-3 text-2xl font-bold">{service.name}</h3>
                <p className="text-sm leading-7 text-slate-600 sm:text-base">
                  {service.shortDescription}
                </p>

                <Link
                  href={service.href}
                  className="mt-5 inline-block rounded-xl bg-slate-950 px-4 py-3 font-bold text-white transition hover:bg-slate-800"
                >
                  Solicitar informacion
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="overflow-hidden rounded-[30px] border border-emerald-200 bg-[linear-gradient(135deg,#f0fdf4_0%,#ecfeff_55%,#dbeafe_100%)] shadow-[0_20px_40px_rgba(15,23,42,0.08)]">
            <div className="grid gap-8 px-6 py-8 sm:px-8 sm:py-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
              <div>
                <div className="mb-4 inline-block rounded-full bg-emerald-100 px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-emerald-700">
                  Red de proveedores
                </div>
                <h2 className="mb-4 max-w-3xl text-3xl font-bold leading-tight sm:text-4xl">
                  Quieres ser parte de nuestra red de proveedores afiliados?
                </h2>
                <p className="max-w-3xl text-base leading-7 text-slate-700 sm:text-lg">
                  Si representas una clinica, hotel, restaurante, servicio de transporte o cualquier vertical
                  activa en HolaTacna, dejanos tu informacion comercial y conversemos por WhatsApp para evaluar
                  tu incorporacion.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  {providerWhatsAppNumber ? (
                    <Link
                      href={providerWhatsAppLink}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-xl bg-emerald-500 px-5 py-3 font-bold text-emerald-950 shadow-[0_14px_30px_rgba(34,197,94,0.22)] transition hover:bg-emerald-400"
                    >
                      Hablar por WhatsApp
                    </Link>
                  ) : (
                    <span className="rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-3 font-bold text-emerald-800">
                      WhatsApp de afiliaciones pendiente de configurar
                    </span>
                  )}

                  <Link
                    href={providerRegistrationLink}
                    className="rounded-xl border border-slate-300 bg-white px-5 py-3 font-bold text-slate-900 transition hover:bg-slate-50"
                  >
                    Completar registro de proveedor
                  </Link>
                </div>

                <div className="mt-5 rounded-2xl border border-white/60 bg-white/70 px-4 py-4 text-sm leading-6 text-slate-700">
                  HolaTacna revisa cada perfil internamente. La activacion, prioridad comercial y derivacion de
                  clientes se definen segun el flujo operativo, la calidad del servicio y la calificacion del caso.
                </div>
              </div>

              <div className="grid gap-4">
                <div className="rounded-[24px] border border-white/70 bg-white/80 p-5 shadow-[0_16px_30px_rgba(15,23,42,0.08)]">
                  <div className="mb-2 text-xs font-bold uppercase tracking-[0.12em] text-sky-700">
                    Beneficios de afiliacion
                  </div>
                  <ul className="grid gap-3 text-sm leading-6 text-slate-700">
                    <li>Ingreso a un flujo comercial con leads calificados</li>
                    <li>Coordinacion inicial por WhatsApp y CRM centralizado</li>
                    <li>Evaluacion interna antes de activar derivacion y visibilidad operativa</li>
                  </ul>
                </div>

                <div className="rounded-[24px] border border-slate-200 bg-slate-950 p-5 text-white shadow-[0_16px_30px_rgba(15,23,42,0.2)]">
                  <div className="mb-2 text-xs font-bold uppercase tracking-[0.12em] text-emerald-300">
                    Mensaje directo
                  </div>
                  <p className="text-sm leading-7 text-white/85">
                    &quot;{providerWhatsAppText}&quot;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[linear-gradient(180deg,#e0f2fe,#f8fafc)] px-5 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <div className="mb-4 inline-block rounded-full bg-blue-100 px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-blue-700">
              SEO Chile
            </div>
            <h2 className="mb-3 text-3xl font-bold sm:text-4xl">Paginas comerciales por ciudad + servicio</h2>
            <p className="text-base leading-7 text-slate-600 sm:text-lg">
              Entradas orientadas a trafico desde Chile para capturar demanda con contexto local,
              ahorro frente a Chile y coordinacion premium desde HolaTacna.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {medicalSeoRoutes.map((route) => (
              <div
                key={route.href}
                className="rounded-[22px] border border-slate-200/70 bg-white/80 p-6 shadow-[0_12px_28px_rgba(14,116,144,0.1)]"
              >
                <h3 className="mb-3 text-2xl font-bold">{route.title}</h3>
                <p className="text-sm leading-7 text-slate-600 sm:text-base">
                  {route.description}
                </p>
                <Link
                  href={route.href}
                  className="mt-5 inline-block rounded-xl bg-sky-600 px-4 py-3 font-bold text-white transition hover:bg-sky-500"
                >
                  Abrir pagina SEO
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-950 px-5 py-16 text-white sm:px-6 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <div className="mb-4 inline-block rounded-full bg-white/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-white/80">
                Propuesta de valor
              </div>
              <h2 className="text-3xl font-bold sm:text-4xl">
                Por que clientes chilenos eligen Tacna
              </h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {trustPoints.map((point) => (
                <div
                  key={point}
                  className="rounded-2xl border border-white/10 bg-white/10 p-5 font-bold"
                >
                  {point}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
