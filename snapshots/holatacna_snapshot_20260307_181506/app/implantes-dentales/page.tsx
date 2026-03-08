import { Suspense } from 'react'
import { MedicalServicePage } from '@/components/forms/medical-service-page'

export default function ImplantesDentalesPage() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-slate-50 p-8">Cargando...</main>}>
      <MedicalServicePage
        serviceSlug="implantes-dentales"
        title="Implantes dentales en Tacna con atencion personalizada"
        description="Cotiza tu tratamiento, resuelve dudas por WhatsApp y recibe apoyo completo para evaluar tu viaje medico a Tacna."
        gradientClass="bg-[linear-gradient(135deg,#0f172a,#1d4ed8)]"
        bullets={[
          'Cotizacion previa y ahorro frente a Chile',
          'Coordinacion de agenda con proveedores verificados',
          'Soporte comercial de HolaTacna durante el proceso',
        ]}
        messageLabel="Cuentanos tu caso"
      />
    </Suspense>
  )
}
