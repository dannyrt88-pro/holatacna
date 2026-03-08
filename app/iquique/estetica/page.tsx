import { Suspense } from 'react'
import { MedicalCityLeadForm } from '@/components/forms/medical-city-lead-form'
import { buildMedicalCityMetadata, MedicalCitySeoPage } from '@/components/shared/medical-city-seo-page'
import { getMedicalSeoRoute } from '@/lib/medical-seo-routes'

const route = getMedicalSeoRoute('Iquique', 'estetica')

export const metadata = buildMedicalCityMetadata(
  `${route?.pageTitle} | HolaTacna`,
  'Tratamientos de estetica en Tacna para pacientes de Iquique con ahorro frente a Chile, coordinacion por WhatsApp y clinicas verificadas.'
)

export default function IquiqueEsteticaPage() {
  if (!route) return null
  return (
    <MedicalCitySeoPage
      badge={route.badge}
      title={route.pageTitle}
      description="Muchas personas de Iquique buscan tratamientos esteticos en Tacna para ahorrar, coordinar por WhatsApp antes del viaje y atenderse con clinicas verificadas."
      bullets={route.bullets}
      primaryHref={route.primaryHref}
      primaryLabel={route.primaryLabel}
      gradientClass={route.gradientClass}
    >
      <Suspense fallback={<div className="rounded-2xl bg-white p-6 text-slate-500">Cargando formulario...</div>}>
        <MedicalCityLeadForm
          serviceSlug="estetica"
          city="Iquique"
          heading={route.heading}
          messageLabel={route.messageLabel}
        />
      </Suspense>
    </MedicalCitySeoPage>
  )
}
