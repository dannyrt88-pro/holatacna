import { Suspense } from 'react'
import { MedicalCityLeadForm } from '@/components/forms/medical-city-lead-form'
import { buildMedicalCityMetadata, MedicalCitySeoPage } from '@/components/shared/medical-city-seo-page'
import { getMedicalSeoRoute } from '@/lib/medical-seo-routes'

const route = getMedicalSeoRoute('Arica', 'implantes-dentales')

export const metadata = buildMedicalCityMetadata(
  `${route?.pageTitle} | HolaTacna`,
  'Implantes dentales en Tacna para pacientes de Arica con ahorro frente a Chile, coordinacion por WhatsApp y clinicas verificadas.'
)

export default function AricaImplantesDentalesPage() {
  if (!route) return null
  return (
    <MedicalCitySeoPage
      badge={route.badge}
      title={route.pageTitle}
      description="Muchos pacientes de Arica viajan a Tacna para evaluar implantes dentales con clinicas verificadas, menor costo frente a Chile y coordinacion previa por WhatsApp."
      bullets={route.bullets}
      primaryHref={route.primaryHref}
      primaryLabel={route.primaryLabel}
      gradientClass={route.gradientClass}
    >
      <Suspense fallback={<div className="rounded-2xl bg-white p-6 text-slate-500">Cargando formulario...</div>}>
        <MedicalCityLeadForm
          serviceSlug="implantes-dentales"
          city="Arica"
          heading={route.heading}
        />
      </Suspense>
    </MedicalCitySeoPage>
  )
}
