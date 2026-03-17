'use client'

import { usePathname } from 'next/navigation'

const DEFAULT_MESSAGE = 'Hola, quiero información sobre tratamientos médicos en Tacna'

const ROUTE_MESSAGES: Record<string, string> = {
  '/implantes-dentales-tacna': 'Hola, me interesa información sobre implantes dentales en Tacna',
  '/operacion-ojos-tacna': 'Hola, me interesa información sobre operación de ojos en Tacna',
  '/estetica-tacna': 'Hola, me interesa información sobre estética en Tacna',
  '/dermatologia-tacna': 'Hola, me interesa información sobre dermatología en Tacna',
  '/arica': 'Hola, soy de Arica y quiero información sobre tratamientos en Tacna',
  '/iquique': 'Hola, soy de Iquique y quiero información sobre tratamientos en Tacna',
  '/antofagasta': 'Hola, soy de Antofagasta y quiero información sobre tratamientos en Tacna',
}

function resolveWhatsappMessage(pathname: string | null) {
  if (!pathname) return DEFAULT_MESSAGE
  return ROUTE_MESSAGES[pathname] || DEFAULT_MESSAGE
}

function normalizeWhatsappNumber(value: string | undefined) {
  return (value || '').replace(/\D/g, '')
}

export default function WhatsAppButton() {
  const pathname = usePathname()
  const phone = normalizeWhatsappNumber(process.env.NEXT_PUBLIC_PROVIDER_WHATSAPP_NUMBER)

  if (!phone) return null

  const message = resolveWhatsappMessage(pathname)
  const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Abrir WhatsApp"
      className="fixed bottom-6 right-6 z-50 inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105 sm:h-14 sm:w-14"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-full border-4 border-[#25D366]/40"
        style={{ animation: 'ping 3s cubic-bezier(0, 0, 0.2, 1) infinite' }}
      />
      <svg
        aria-hidden="true"
        viewBox="0 0 32 32"
        className="relative h-8 w-8 fill-current sm:h-7 sm:w-7"
      >
        <path d="M19.11 17.39c-.29-.15-1.73-.85-1.99-.95-.27-.1-.46-.15-.66.15-.2.29-.76.95-.94 1.14-.17.2-.35.22-.64.07-.29-.15-1.24-.46-2.36-1.48-.87-.78-1.46-1.75-1.63-2.04-.17-.29-.02-.45.13-.6.13-.13.29-.35.44-.51.15-.17.2-.29.29-.49.1-.2.05-.37-.02-.52-.07-.15-.66-1.58-.9-2.17-.24-.57-.48-.49-.66-.5h-.56c-.2 0-.52.07-.79.37-.27.29-1.04 1.02-1.04 2.48 0 1.46 1.07 2.87 1.22 3.07.15.2 2.1 3.2 5.09 4.49.71.31 1.27.49 1.71.63.72.23 1.38.2 1.9.12.58-.09 1.73-.71 1.97-1.39.24-.68.24-1.27.17-1.39-.08-.12-.27-.2-.56-.34Z" />
        <path d="M16.02 3.2c-7.02 0-12.73 5.7-12.73 12.71 0 2.24.59 4.42 1.7 6.35L3.2 28.8l6.7-1.75a12.8 12.8 0 0 0 6.1 1.56h.01c7 0 12.79-5.7 12.79-12.72 0-3.4-1.33-6.6-3.73-9-2.4-2.4-5.6-3.7-9.01-3.69Zm0 23.27h-.01a10.6 10.6 0 0 1-5.4-1.48l-.39-.23-3.98 1.04 1.06-3.88-.25-.4a10.54 10.54 0 0 1-1.63-5.62c0-5.83 4.75-10.58 10.6-10.58 2.83 0 5.49 1.1 7.49 3.09a10.5 10.5 0 0 1 3.09 7.49c0 5.84-4.76 10.58-10.58 10.58Z" />
      </svg>
    </a>
  )
}
