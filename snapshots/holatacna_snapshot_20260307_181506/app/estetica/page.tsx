import { Suspense } from 'react'
import { MedicalServicePage } from '@/components/forms/medical-service-page'

export default function EsteticaPage() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-slate-50 p-8">Cargando...</main>}>
      <MedicalServicePage
        serviceSlug="estetica"
        title="Tratamientos esteticos en Tacna con acompanamiento personalizado"
        description="Solicita informacion, resuelve dudas y coordina tu atencion estetica con apoyo directo de HolaTacna."
        gradientClass="bg-[linear-gradient(135deg,#4c1d95,#ec4899)]"
        bullets={[
          'Clinicas verificadas con coordinacion comercial',
          'Ahorro frente a Chile con seguimiento previo',
          'Atencion estetica con apoyo directo por WhatsApp',
        ]}
        messageLabel="Cuentanos que tratamiento buscas"
      />
    </Suspense>
  )
}
