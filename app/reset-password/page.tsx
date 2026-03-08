'use client'

import Link from 'next/link'
import { FormEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'

export default function ResetPasswordPage() {
  const router = useRouter()
  const supabase = createClient()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [ready, setReady] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    let mounted = true

    async function checkRecoverySession() {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!mounted) return

      if (!session) {
        setError('El enlace no es valido o ya expiro')
      } else {
        setReady(true)
      }
    }

    void checkRecoverySession()

    return () => {
      mounted = false
    }
  }, [supabase])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (password.length < 8) {
      setError('La nueva contrasena debe tener al menos 8 caracteres')
      return
    }

    if (password !== confirmPassword) {
      setError('Las contrasenas no coinciden')
      return
    }

    setLoading(true)
    setError('')
    setMessage('')

    const { error: updateError } = await supabase.auth.updateUser({
      password,
    })

    if (updateError) {
      setError('No se pudo actualizar la contrasena')
      setLoading(false)
      return
    }

    setMessage('Contrasena actualizada. Redirigiendo a login...')
    setLoading(false)

    setTimeout(() => {
      router.push('/login')
    }, 1200)
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-6">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="mb-2 text-center text-2xl font-bold text-black">
          Nueva contrasena
        </h1>

        <p className="mb-6 text-center text-sm text-slate-600">
          Define una nueva contrasena para tu acceso al dashboard.
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Nueva contrasena"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mb-3 w-full rounded-lg border p-3 text-black"
          />

          <input
            type="password"
            placeholder="Confirmar contrasena"
            required
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            className="mb-4 w-full rounded-lg border p-3 text-black"
          />

          {error ? <p className="mb-3 text-sm text-red-600">{error}</p> : null}
          {message ? <p className="mb-3 text-sm text-emerald-700">{message}</p> : null}

          <button
            type="submit"
            disabled={loading || !ready}
            className="w-full rounded-lg bg-slate-950 p-3 text-white disabled:opacity-60"
          >
            {loading ? 'Guardando...' : 'Guardar nueva contrasena'}
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
