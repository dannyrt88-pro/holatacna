import type { Metadata } from 'next'
import { GuideCardGrid } from '@/components/guide/guide-card-grid'
import { GuideCtaStrip } from '@/components/guide/guide-cta-strip'
import { GuideHero } from '@/components/guide/guide-hero'
import { GuideTrustBlock } from '@/components/guide/guide-trust-block'

const restaurantCategories = [
  {
    title: 'Restaurantes cerca de clínicas',
    description:
      'Opciones útiles para quienes necesitan comer cerca de zonas médicas o después de una consulta en Tacna.',
  },
  {
    title: 'Opciones saludables',
    description:
      'Alternativas pensadas para visitantes que buscan comidas más ligeras o prácticas durante su estadía.',
  },
  {
    title: 'Restaurantes para ir en familia',
    description:
      'Lugares cómodos para pacientes, acompañantes y grupos que visitan Tacna por el día o por una estadía corta.',
  },
  {
    title: 'Lugares recomendados para almorzar en Tacna',
    description:
      'Opciones funcionales para quienes organizan su tiempo entre traslados, consultas y recorridos breves en la ciudad.',
  },
]

export const metadata: Metadata = {
  title: 'Restaurantes en Tacna para visitantes chilenos | HolaTacna',
  description:
    'Descubre restaurantes en Tacna útiles para visitantes chilenos, pacientes y acompañantes durante su visita.',
}

export default function RestaurantesTacnaPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#eff6ff_0%,#f8fafc_42%,#e2e8f0_100%)] px-6 py-10 text-slate-950 sm:px-8 sm:py-14">
      <div className="mx-auto max-w-6xl space-y-6">
        <GuideHero
          badge="Comida útil en Tacna"
          title="Restaurantes en Tacna para visitantes chilenos"
          description="Opciones recomendadas para quienes visitan Tacna por el día, por tratamiento médico o por una estadía corta."
        />

        <GuideCardGrid
          badge="Opciones para tu visita"
          title="Lugares útiles para comer durante tu estadía"
          items={restaurantCategories}
        />

        <GuideTrustBlock
          title="Recomendaciones pensadas para visitas breves y pacientes"
          description="HolaTacna busca recomendar opciones de comida útiles para visitantes chilenos, pacientes, acompañantes y personas que necesitan organizar mejor una visita corta a Tacna."
        />

        <GuideCtaStrip
          title="¿Tienes un restaurante en Tacna?"
          description="Únete a la red de aliados de HolaTacna."
          primaryCtaLabel="Ver alianzas"
          primaryCtaHref="/alianzas"
          secondaryCtaLabel="Registrar restaurante"
          secondaryCtaHref="/registro-proveedores"
        />
      </div>
    </main>
  )
}
