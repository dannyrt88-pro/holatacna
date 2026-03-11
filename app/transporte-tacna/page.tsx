import type { Metadata } from 'next'
import { GuideCardGrid } from '@/components/guide/guide-card-grid'
import { GuideCtaStrip } from '@/components/guide/guide-cta-strip'
import { GuideHero } from '@/components/guide/guide-hero'
import { GuideTrustBlock } from '@/components/guide/guide-trust-block'

const transportCategories = [
  {
    title: 'Transporte desde la frontera',
    description:
      'Opciones pensadas para quienes necesitan llegar a Tacna con una conexión más simple desde el cruce fronterizo.',
  },
  {
    title: 'Traslados hacia clínicas',
    description:
      'Alternativas útiles para pacientes y acompañantes que necesitan llegar a clínicas o centros de atención en la ciudad.',
  },
  {
    title: 'Movilidad desde hoteles',
    description:
      'Opciones de traslado para conectar hospedajes, zonas centrales y distintos puntos útiles durante la visita.',
  },
  {
    title: 'Opciones prácticas para visitas cortas',
    description:
      'Soluciones de movilidad para quienes viajan por el día o necesitan traslados ordenados durante una estadía breve.',
  },
]

export const metadata: Metadata = {
  title: 'Transporte en Tacna para visitantes y pacientes | HolaTacna',
  description:
    'Conoce opciones de transporte en Tacna para visitantes chilenos, pacientes y acompañantes.',
}

export default function TransporteTacnaPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#eff6ff_0%,#f8fafc_42%,#e2e8f0_100%)] px-6 py-10 text-slate-950 sm:px-8 sm:py-14">
      <div className="mx-auto max-w-6xl space-y-6">
        <GuideHero
          badge="Movilidad en Tacna"
          title="Transporte en Tacna para visitantes y pacientes"
          description="Opciones de movilidad útiles para llegar desde la frontera, moverse por la ciudad y conectar clínicas, hoteles y zonas centrales."
        />

        <GuideCardGrid
          badge="Opciones de transporte"
          title="Alternativas para moverte mejor durante tu visita"
          items={transportCategories}
        />

        <GuideTrustBlock
          title="Movilidad pensada para reducir fricción en tu viaje"
          description="HolaTacna busca recomendar opciones de transporte que ayuden a pacientes, acompañantes y visitantes chilenos a organizar mejor sus traslados dentro de Tacna."
        />

        <GuideCtaStrip
          title="¿Ofreces transporte o movilidad en Tacna?"
          description="Únete a la red de aliados de HolaTacna."
          primaryCtaLabel="Ver alianzas"
          primaryCtaHref="/alianzas"
          secondaryCtaLabel="Registrar servicio"
          secondaryCtaHref="/registro-proveedores"
        />
      </div>
    </main>
  )
}
