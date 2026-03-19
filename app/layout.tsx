import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import Script from 'next/script'
import { buildSeoMetadata, getSiteUrl } from '@/lib/seo/metadata'
import WhatsAppButton from '@/components/WhatsAppButton'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  title: {
    default: 'HolaTacna',
    template: '%s | HolaTacna',
  },
  ...buildSeoMetadata({
    title: 'HolaTacna',
    description:
      'HolaTacna capta y coordina leads para servicios medicos y esteticos en Tacna, conectando pacientes de Chile con clinicas verificadas, coordinacion por WhatsApp y rutas comerciales claras.',
    path: '/',
  }),
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-18024620453"
          strategy="afterInteractive"
        />
        <Script id="google-ads-tag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-18024620453');
          `}
        </Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <WhatsAppButton />
      </body>
    </html>
  )
}
