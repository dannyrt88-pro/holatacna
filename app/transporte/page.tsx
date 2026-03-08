import { Suspense } from 'react'
import { TransportLeadForm } from '@/components/forms/transport-lead-form'
import { ServicePageShell } from '@/components/shared/service-page-shell'
import { serviceNameBySlug } from '@/lib/service-catalog'

const serviceName = serviceNameBySlug.transporte

export default function TransportePage() {
  return (
    <ServicePageShell
      badge="Logistica y movilidad"
      title="Transporte en Tacna con coordinacion comercial desde HolaTacna"
      description="Captamos solicitudes de traslados, movilidad turistica y transporte privado para derivarlas a proveedores compatibles con el tipo de viaje y la necesidad del usuario."
      bullets={[
        'Solicitudes de traslado con trazabilidad completa',
        'Compatibilidad con gestion manual y futura autoasignacion',
        'Integracion con el CRM actual sin romper otros servicios',
      ]}
      formTitle="Solicita tu servicio de transporte"
      gradientClass="bg-[linear-gradient(135deg,#0f766e,#14b8a6)]"
      backgroundClass="bg-teal-50"
    >
      <Suspense fallback={<div className="text-sm text-slate-500">Cargando formulario...</div>}>
        <TransportLeadForm serviceName={serviceName} />
      </Suspense>
    </ServicePageShell>
  )
}
