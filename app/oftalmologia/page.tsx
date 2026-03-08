import { Suspense } from 'react'
import { MedicalServicePage } from '@/components/forms/medical-service-page'

export default function OftalmologiaPage() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-slate-50 p-8">Cargando...</main>}>
      <MedicalServicePage
        serviceSlug="oftalmologia"
        title="Atencion oftalmologica en Tacna con acompanamiento personalizado"
        description="Resuelve tus dudas, solicita evaluacion y coordina tu atencion en Tacna con apoyo directo de HolaTacna."
        gradientClass="bg-[linear-gradient(135deg,#0f172a,#1d4ed8)]"
        bullets={[
          'Evaluacion oftalmologica con clinicas verificadas',
          'Coordinacion previa para pacientes de Chile',
          'Acompanamiento por WhatsApp antes del viaje',
        ]}
        messageLabel="Cuentanos tu caso"
      />
    </Suspense>
  )
}
