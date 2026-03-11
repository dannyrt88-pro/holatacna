import { Suspense } from 'react'
import { MedicalCityLeadForm } from '@/components/forms/medical-city-lead-form'
import { buildMedicalCityMetadata, MedicalCitySeoPage } from '@/components/shared/medical-city-seo-page'
import { getMedicalSeoRoute } from '@/lib/medical-seo-routes'

const route = getMedicalSeoRoute('Antofagasta', 'dermatologia')

export const metadata = buildMedicalCityMetadata(
  `${route?.pageTitle} | HolaTacna`,
  'Dermatologia en Tacna para pacientes de Antofagasta con ahorro frente a Chile, coordinacion por WhatsApp y clinicas verificadas.',
  '/antofagasta/dermatologia'
)

export default function AntofagastaDermatologiaPage() {
  if (!route) return null
  return (
    <MedicalCitySeoPage
      badge={route.badge}
      title={route.pageTitle}
      description="Pacientes de Antofagasta viajan a Tacna para evaluar dermatologia con apoyo previo, clinicas verificadas y una alternativa de ahorro frente a Chile."
      bullets={route.bullets}
      primaryHref={route.primaryHref}
      primaryLabel={route.primaryLabel}
      gradientClass={route.gradientClass}
    >
      <Suspense fallback={<div className="rounded-2xl bg-white p-6 text-slate-500">Cargando formulario...</div>}>
        <MedicalCityLeadForm
          serviceSlug="dermatologia"
          city="Antofagasta"
          heading={route.heading}
          includeMessage={route.includeMessage}
        />
      </Suspense>
    </MedicalCitySeoPage>
  )
}
