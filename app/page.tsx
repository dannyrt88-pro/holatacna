import Link from 'next/link'

function HolaTacnaLogo() {
  return (
    <div className="flex items-center gap-4">
      <svg
        aria-hidden="true"
        viewBox="0 0 120 120"
        className="h-20 w-20 drop-shadow-[0_12px_24px_rgba(14,116,144,0.24)] sm:h-24 sm:w-24"
      >
        <defs>
          <linearGradient id="holatacna-blue" x1="0%" x2="100%" y1="0%" y2="100%">
            <stop offset="0%" stopColor="#1d4ed8" />
            <stop offset="100%" stopColor="#0f766e" />
          </linearGradient>
          <linearGradient id="holatacna-green" x1="0%" x2="100%" y1="0%" y2="100%">
            <stop offset="0%" stopColor="#84cc16" />
            <stop offset="100%" stopColor="#16a34a" />
          </linearGradient>
        </defs>
        <g fill="none" strokeWidth="6">
          <path
            d="M28 28 L56 18 L78 34 L88 58 L74 84 L46 92 L24 72 L20 46 Z"
            stroke="url(#holatacna-blue)"
            opacity="0.95"
          />
          <path
            d="M56 18 L84 20 L100 42 L96 72 L74 84"
            stroke="url(#holatacna-green)"
            opacity="0.9"
          />
          <path
            d="M24 72 L10 52 L18 28 L40 16"
            stroke="url(#holatacna-green)"
            opacity="0.9"
          />
          <path d="M24 72 L56 18" stroke="url(#holatacna-blue)" opacity="0.65" />
          <path d="M78 34 L46 92" stroke="url(#holatacna-green)" opacity="0.65" />
          <path d="M20 46 L88 58" stroke="url(#holatacna-blue)" opacity="0.45" />
        </g>
        <g>
          <circle cx="20" cy="46" r="9" fill="#2563eb" />
          <circle cx="40" cy="16" r="10" fill="#0f766e" />
          <circle cx="56" cy="18" r="8" fill="#1d4ed8" />
          <circle cx="84" cy="20" r="8" fill="#65a30d" />
          <circle cx="100" cy="42" r="9" fill="#22c55e" />
          <circle cx="88" cy="58" r="8" fill="#0ea5e9" />
          <circle cx="74" cy="84" r="10" fill="#16a34a" />
          <circle cx="46" cy="92" r="9" fill="#2563eb" />
          <circle cx="24" cy="72" r="8" fill="#84cc16" />
        </g>
      </svg>

      <div className="text-4xl font-black tracking-[-0.05em] sm:text-6xl">
        <span className="text-sky-700">Hola</span>
        <span className="text-green-600">Tacna</span>
      </div>
    </div>
  )
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#eff6ff_0%,#f8fafc_42%,#e2e8f0_100%)] px-6 py-10 text-slate-950 sm:px-8 sm:py-14">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-5xl items-center justify-center">
        <section className="w-full rounded-[36px] border border-white/70 bg-white/80 px-8 py-12 text-center shadow-[0_30px_80px_rgba(15,23,42,0.12)] backdrop-blur sm:px-12 sm:py-16">
          <div className="mb-8 flex justify-center">
            <HolaTacnaLogo />
          </div>

          <div className="mx-auto mb-4 inline-flex rounded-full border border-sky-200 bg-sky-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-sky-800">
            Pre lanzamiento comercial
          </div>

          <h1 className="mx-auto max-w-3xl text-3xl font-black leading-tight tracking-[-0.04em] sm:text-5xl">
            Muy pronto: El puente digital entre Chile y lo mejor de Tacna
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
            Estamos cerrando acuerdos con proveedores y afinando la apertura oficial de
            HolaTacna para conectar demanda desde Chile con servicios medicos y comerciales de alto
            valor en Tacna.
          </p>

          <div className="mt-10 flex justify-center">
            <Link
              href="/registro-proveedores"
              className="rounded-2xl bg-[linear-gradient(135deg,#0f766e_0%,#1d4ed8_100%)] px-7 py-4 text-base font-bold text-white shadow-[0_18px_40px_rgba(29,78,216,0.22)] transition hover:scale-[1.01] hover:shadow-[0_22px_46px_rgba(15,118,110,0.28)]"
            >
              Eres un proveedor? Contacta aqui
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3 text-sm">
            <Link
              href="/home-completa"
              className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Ver home actual
            </Link>
            <Link
              href="/dashboard"
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Ingresar al panel
            </Link>
          </div>

          <p className="mt-6 text-sm leading-7 text-slate-500">
            Si ya estas evaluando una alianza comercial con HolaTacna, deja tus datos y te
            contactaremos para revisar cobertura, condiciones y activacion.
          </p>
        </section>
      </div>
    </main>
  )
}
