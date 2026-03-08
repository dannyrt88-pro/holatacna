import { Suspense } from 'react'
import { MedicalCityLeadForm } from '@/components/forms/medical-city-lead-form'
import { buildMedicalCityMetadata, MedicalCitySeoPage } from '@/components/shared/medical-city-seo-page'
import { getMedicalSeoRoute } from '@/lib/medical-seo-routes'

const route = getMedicalSeoRoute('Arica', 'oftalmologia')

export const metadata = buildMedicalCityMetadata(
  `${route?.pageTitle} | HolaTacna`,
  'Oftalmologia en Tacna para pacientes de Arica con ahorro frente a Chile, coordinacion por WhatsApp y clinicas verificadas.'
)

export default function AricaOftalmologiaPage() {
  if (!route) return null
  return (
    <MedicalCitySeoPage
      badge={route.badge}
      title={route.pageTitle}
      description="Pacientes de Arica viajan a Tacna para atenderse en oftalmologia con apoyo previo, clinicas verificadas y una alternativa de ahorro frente a Chile."
      bullets={route.bullets}
      primaryHref={route.primaryHref}
      primaryLabel={route.primaryLabel}
      gradientClass={route.gradientClass}
    >
      <Suspense fallback={<div className="rounded-2xl bg-white p-6 text-slate-500">Cargando formulario...</div>}>
        <MedicalCityLeadForm
          serviceSlug="oftalmologia"
          city="Arica"
          heading={route.heading}
        />
      </Suspense>
    </MedicalCitySeoPage>
  )
}
