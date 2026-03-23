import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dentista en Tacna para Chilenos — Implantes hasta 70% más baratos | HolaTacna',
  description:
    'Encuentra un dentista en Tacna especializado en implantes dentales, carillas y ortodoncia. Pacientes chilenos ahorran hasta 70% vs Chile. Coordinación por WhatsApp sin costo.',
  keywords: [
    'dentista tacna',
    'dentista en tacna',
    'implantes dentales tacna',
    'implantes en tacna',
    'clinica dental tacna chile',
    'dentista tacna para chilenos',
  ],
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
