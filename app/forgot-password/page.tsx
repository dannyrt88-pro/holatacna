'use client'

import Link from 'next/link'
import { FormEvent, useState } from 'react'
import { createClient } from '@/utils/supabase/client'

export default function ForgotPasswordPage() {
  const supabase = createClient()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setError('')
    setMessage('')

    const redirectTo =
      typeof window !== 'undefined' ? `${window.location.origin}/reset-password` : undefined

    const { error: requestError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo,
    })

    if (requestError) {
      setError('No se pudo enviar el enlace de recuperacion')
      setLoading(false)
      return
    }

    setMessage('Revisa tu correo para continuar con el cambio de contrasena')
    setLoading(false)
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-6">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="mb-2 text-center text-2xl font-bold text-black">
          Recuperar contrasena
        </h1>

        <p className="mb-6 text-center text-sm text-slate-600">
          Ingresa tu correo y te enviaremos un enlace para restablecer el acceso.
        </p>

        <form onSubmit={handleSubmit}>
          <input
            name="email"
            type="email"
            placeholder="Correo"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="mb-4 w-full rounded-lg border p-3 text-black"
          />

          {error ? <p className="mb-3 text-sm text-red-600">{error}</p> : null}
          {message ? <p className="mb-3 text-sm text-emerald-700">{message}</p> : null}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-slate-950 p-3 text-white disabled:opacity-60"
          >
            {loading ? 'Enviando...' : 'Enviar enlace'}
          </button>
        </form>

        <div className="mt-4 text-center">
          <Link href="/login" className="text-sm font-medium text-sky-700">
            Volver a login
          </Link>
        </div>
      </div>
    </main>
  )
}
