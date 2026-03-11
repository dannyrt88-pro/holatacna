import type { Metadata } from 'next'
import { GuideCardGrid } from '@/components/guide/guide-card-grid'
import { GuideCtaStrip } from '@/components/guide/guide-cta-strip'
import { GuideHero } from '@/components/guide/guide-hero'
import { GuideTrustBlock } from '@/components/guide/guide-trust-block'

const hotelCategories = [
  {
    title: 'Hoteles cerca de clínicas',
    description:
      'Opciones de alojamiento pensadas para quienes buscan cercanía con clínicas y traslados más simples.',
  },
  {
    title: 'Hoteles en el centro de Tacna',
    description:
      'Alternativas bien ubicadas para visitantes que necesitan acceso práctico a zonas centrales y servicios útiles.',
  },
  {
    title: 'Departamentos amoblados',
    description:
      'Opciones de estadía más cómodas para visitantes que prefieren mayor privacidad o viajes familiares.',
  },
  {
    title: 'Hoteles para estadías cortas',
    description:
      'Alojamientos funcionales para evaluaciones médicas, consultas puntuales o visitas breves a Tacna.',
  },
]

export const metadata: Metadata = {
  title: 'Hoteles en Tacna para visitantes y pacientes | HolaTacna',
  description:
    'Encuentra hoteles y alojamientos recomendados en Tacna para visitantes chilenos, cerca de clínicas y zonas centrales.',
}

export default function HotelesTacnaPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#eff6ff_0%,#f8fafc_42%,#e2e8f0_100%)] px-6 py-10 text-slate-950 sm:px-8 sm:py-14">
      <div className="mx-auto max-w-6xl space-y-6">
        <GuideHero
          badge="Alojamientos en Tacna"
          title="Hoteles en Tacna para visitantes y pacientes"
          description="Opciones de alojamiento cercanas a clínicas, transporte y zonas centrales de Tacna."
        />

        <GuideCardGrid
          badge="Categorías de alojamiento"
          title="Opciones de estadía para organizar mejor tu visita"
          items={hotelCategories}
        />

        <GuideTrustBlock
          title="Alojamientos pensados para visitantes chilenos"
          description="HolaTacna recomienda alojamientos que pueden ser útiles para pacientes, acompañantes y visitantes chilenos que necesitan una estadía práctica, ordenada y cercana a zonas clave de Tacna."
        />

        <GuideCtaStrip
          title="¿Tienes un hotel o alojamiento en Tacna?"
          description="Únete a la red de aliados de HolaTacna."
          primaryCtaLabel="Ver alianzas"
          primaryCtaHref="/alianzas"
          secondaryCtaLabel="Postular como proveedor"
          secondaryCtaHref="/registro-proveedores"
        />
      </div>
    </main>
  )
}
