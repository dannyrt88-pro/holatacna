'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'

type GoogleLoginButtonProps = {
  next?: string | null
}

export default function GoogleLoginButton({ next }: GoogleLoginButtonProps) {
  const [loading, setLoading] = useState(false)

  async function handleGoogleLogin() {
    const supabase = createClient()
    const base = process.env.NEXT_PUBLIC_SITE_URL || window.location.origin
    const redirectTo = new URL('/auth/callback', base)

    if (next && next.startsWith('/')) {
      redirectTo.searchParams.set('next', next)
    }

    setLoading(true)

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: redirectTo.toString(),
      },
    })

    if (error) {
      setLoading(false)
      window.location.href = `/login?error=${encodeURIComponent('No se pudo iniciar sesion con Google')}`
    }
  }

  return (
    <button
      type="button"
      onClick={() => void handleGoogleLogin()}
      disabled={loading}
      className="w-full rounded-lg border border-slate-300 bg-white p-3 font-semibold text-slate-900 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {loading ? 'Redirigiendo a Google...' : 'Continuar con Google'}
    </button>
  )
}
