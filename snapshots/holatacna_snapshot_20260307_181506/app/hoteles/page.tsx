import { Suspense } from 'react'
import { HotelLeadForm } from '@/components/forms/hotel-lead-form'
import { ServicePageShell } from '@/components/shared/service-page-shell'
import { serviceNameBySlug } from '@/lib/service-catalog'

const serviceName = serviceNameBySlug.hoteles

export default function HotelesPage() {
  return (
    <ServicePageShell
      badge="Turismo y hospedaje"
      title="Hoteles en Tacna con apoyo comercial desde HolaTacna"
      description="Captamos tu necesidad de hospedaje, revisamos disponibilidad y derivamos tu solicitud a hoteles o proveedores de alojamiento compatibles con tu viaje."
      bullets={[
        'Solicitud centralizada de hospedaje',
        'Compatibilidad con gestion manual y futura autoasignacion',
        'Captura comercial con tracking y trazabilidad completa',
      ]}
      formTitle="Solicita opciones de hospedaje"
      gradientClass="bg-[linear-gradient(135deg,#0f766e,#0ea5e9)]"
      backgroundClass="bg-slate-50"
    >
      <Suspense fallback={<div className="text-sm text-slate-500">Cargando formulario...</div>}>
        <HotelLeadForm serviceName={serviceName} />
      </Suspense>
    </ServicePageShell>
  )
}
