import Link from 'next/link'

type LoginPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = (await searchParams) ?? {}
  const rawError = params.error
  const error = Array.isArray(rawError) ? rawError[0] : rawError
  const rawNext = params.next
  const next = Array.isArray(rawNext) ? rawNext[0] : rawNext

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-6">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="mb-2 text-center text-2xl font-bold text-black">
          Iniciar sesion
        </h1>

        <p className="mb-6 text-center text-sm text-slate-600">
          Acceso interno para gestionar leads y proveedores.
        </p>

        <form action="/auth/google" method="post" className="mb-5">
          {next ? <input type="hidden" name="next" value={next} /> : null}
          <button
            type="submit"
            className="w-full rounded-lg border border-slate-300 bg-white p-3 font-semibold text-slate-900"
          >
            Continuar con Google
          </button>
        </form>

        <div className="mb-5 flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-slate-400">
          <span className="h-px flex-1 bg-slate-200" />
          <span>o</span>
          <span className="h-px flex-1 bg-slate-200" />
        </div>

        <form action="/auth" method="post">
          <input
            name="email"
            type="email"
            placeholder="Correo"
            required
            className="mb-3 w-full rounded-lg border p-3 text-black"
          />

          <input
            name="password"
            type="password"
            placeholder="Contrasena"
            required
            className="mb-4 w-full rounded-lg border p-3 text-black"
          />

          {error && (
            <p className="mb-3 text-sm text-red-600">{error}</p>
          )}

          <button className="w-full rounded-lg bg-slate-950 p-3 text-white">
            Entrar con correo
          </button>
        </form>

        <div className="mt-4 text-center">
          <Link href="/forgot-password" className="text-sm font-medium text-sky-700">
            Olvide mi contrasena
          </Link>
        </div>
      </div>
    </main>
  )
}
