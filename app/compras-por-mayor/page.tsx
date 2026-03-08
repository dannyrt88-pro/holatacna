import { Suspense } from 'react'
import { WholesaleLeadForm } from '@/components/forms/wholesale-lead-form'
import { ServicePageShell } from '@/components/shared/service-page-shell'
import { serviceNameBySlug } from '@/lib/service-catalog'

const serviceName = serviceNameBySlug['compras-por-mayor']

export default function ComprasPorMayorPage() {
  return (
    <ServicePageShell
      badge="Comercio y abastecimiento"
      title="Compras por mayor con coordinacion comercial desde HolaTacna"
      description="Captamos solicitudes de abastecimiento, compras por volumen y conexion con distribuidores o mayoristas compatibles con el tipo de producto y la escala del comprador."
      bullets={[
        'Solicitudes mayoristas con trazabilidad comercial',
        'Compatibilidad con gestion manual y futura autoasignacion',
        'Integracion con el CRM actual sin romper otros servicios',
      ]}
      formTitle="Solicita conexion con mayoristas"
      gradientClass="bg-[linear-gradient(135deg,#6d28d9,#a855f7)]"
      backgroundClass="bg-violet-50"
    >
      <Suspense fallback={<div className="text-sm text-slate-500">Cargando formulario...</div>}>
        <WholesaleLeadForm serviceName={serviceName} />
      </Suspense>
    </ServicePageShell>
  )
}
