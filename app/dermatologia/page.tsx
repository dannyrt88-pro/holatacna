import { Suspense } from 'react'
import { MedicalServicePage } from '@/components/forms/medical-service-page'

export default function DermatologiaPage() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-slate-50 p-8">Cargando...</main>}>
      <MedicalServicePage
        serviceSlug="dermatologia"
        title="Dermatologia en Tacna para pacientes de Chile"
        description="Evaluacion dermatologica, tratamientos faciales y cuidado de la piel con clinicas verificadas y coordinacion previa desde HolaTacna."
        gradientClass="bg-[linear-gradient(135deg,#065f46,#0ea5e9)]"
        bullets={[
          'Tratamientos dermatologicos especializados',
          'Coordinacion para pacientes de Arica y Chile',
          'Atencion rapida en Tacna',
        ]}
      />
    </Suspense>
  )
}
