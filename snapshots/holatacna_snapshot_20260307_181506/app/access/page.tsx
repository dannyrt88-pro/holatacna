'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

type AccessPayload = {
  role: 'admin'
  currentEmail: string | null
  adminEmails: string[]
  monitorEmails: string[]
}

export default function AccessPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<AccessPayload | null>(null)
  const [error, setError] = useState('')
  const [savingEmail, setSavingEmail] = useState('')

  useEffect(() => {
    let active = true

    async function run() {
      const response = await fetch('/api/access-control')

      if (!active) return

      if (!response.ok) {
        router.push('/dashboard')
        return
      }

      const payload = (await response.json()) as AccessPayload
      setData(payload)
      setLoading(false)
    }

    void run().catch(() => {
      if (active) {
        setError('No se pudo cargar la configuracion de accesos')
        setLoading(false)
      }
    })

    return () => {
      active = false
    }
  }, [router])

  async function changeRole(email: string, role: 'admin' | 'monitor') {
    setSavingEmail(email)
    setError('')

    const response = await fetch('/api/access-control', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, role }),
    })

    const payload = (await response.json()) as AccessPayload | { error?: string }

    if (!response.ok) {
      setError(('error' in payload && payload.error) || 'No se pudo actualizar el rol')
      setSavingEmail('')
      return
    }

    setData(payload as AccessPayload)
    setSavingEmail('')
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-100 px-6 py-10">
        <div className="mx-auto max-w-4xl rounded-3xl bg-white p-8 shadow-lg">
          Cargando accesos...
        </div>
      </main>
    )
  }

  if (error) {
    return (
      <main className="min-h-screen bg-slate-100 px-6 py-10">
        <div className="mx-auto max-w-4xl rounded-3xl bg-white p-8 shadow-lg text-red-600">
          {error}
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-10 text-slate-950">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 rounded-3xl bg-slate-950 p-8 text-white shadow-xl">
          <div className="mb-3 inline-block rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em]">
            Gestion de accesos
          </div>
          <h1 className="mb-2 text-4xl font-bold">Roles por correo</h1>
          <p className="max-w-2xl text-sm text-slate-200">
            Esta pantalla muestra que correos tienen acceso como admin o monitor.
            La fuente de verdad actual sigue siendo `.env.local`.
          </p>
        </div>

        <div className="mb-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-5 shadow-md">
            <div className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-sky-700">
              Tu sesion
            </div>
            <div className="font-semibold">{data?.currentEmail || '-'}</div>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-md">
            <div className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-emerald-700">
              Admins
            </div>
            <div className="text-3xl font-bold">{data?.adminEmails.length || 0}</div>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-md">
            <div className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-violet-700">
              Monitores
            </div>
            <div className="text-3xl font-bold">{data?.monitorEmails.length || 0}</div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <section className="rounded-3xl bg-white p-6 shadow-md">
            <h2 className="mb-4 text-2xl font-bold">Admins</h2>
            <div className="grid gap-3">
              {data?.adminEmails.length ? (
                data.adminEmails.map((email) => (
                  <div
                    key={email}
                    className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3"
                  >
                    <span className="font-medium">{email}</span>
                    {email !== data.currentEmail ? (
                      <button
                        onClick={() => changeRole(email, 'monitor')}
                        disabled={savingEmail === email}
                        className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 disabled:opacity-60"
                      >
                        Pasar a monitor
                      </button>
                    ) : (
                      <span className="text-xs font-semibold uppercase tracking-[0.16em] text-sky-700">
                        tu cuenta
                      </span>
                    )}
                  </div>
                ))
              ) : (
                <div className="rounded-xl border border-dashed border-slate-300 px-4 py-3 text-slate-500">
                  No hay admins configurados.
                </div>
              )}
            </div>
          </section>

          <section className="rounded-3xl bg-white p-6 shadow-md">
            <h2 className="mb-4 text-2xl font-bold">Monitores</h2>
            <div className="grid gap-3">
              {data?.monitorEmails.length ? (
                data.monitorEmails.map((email) => (
                  <div
                    key={email}
                    className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3"
                  >
                    <span className="font-medium">{email}</span>
                    <button
                      onClick={() => changeRole(email, 'admin')}
                      disabled={savingEmail === email}
                      className="rounded-lg bg-slate-950 px-3 py-2 text-sm font-semibold text-white disabled:opacity-60"
                    >
                      Pasar a admin
                    </button>
                  </div>
                ))
              ) : (
                <div className="rounded-xl border border-dashed border-slate-300 px-4 py-3 text-slate-500">
                  No hay monitores configurados.
                </div>
              )}
            </div>
          </section>
        </div>

        <div className="mt-6 rounded-3xl bg-white p-6 shadow-md">
          <h2 className="mb-3 text-xl font-bold">Como actualizar accesos</h2>
          {error ? <p className="mb-3 text-sm text-red-600">{error}</p> : null}
          <div className="space-y-2 text-sm text-slate-700">
            <p>1. Edita `.env.local`</p>
            <p>2. Agrega correos en `ADMIN_EMAILS` o `MONITOR_EMAILS` separados por coma</p>
            <p>3. Tambien puedes mover un monitor a admin desde esta pantalla</p>
            <p>4. Reinicia `npm run dev` si quieres asegurar persistencia completa en todos los procesos</p>
          </div>

          <div className="mt-4 rounded-2xl bg-slate-950 p-4 font-mono text-sm text-white">
            ADMIN_EMAILS=danny.rt88@gmail.com{'\n'}
            MONITOR_EMAILS=persona1@gmail.com,persona2@gmail.com
          </div>

          <button
            onClick={() => router.push('/dashboard')}
            className="mt-5 rounded-xl bg-sky-700 px-4 py-3 font-semibold text-white"
          >
            Volver al dashboard
          </button>
        </div>
      </div>
    </main>
  )
}
