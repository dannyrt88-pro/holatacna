import { Suspense } from 'react'
import { ApartmentRentalLeadForm } from '@/components/forms/apartment-rental-lead-form'
import { ServicePageShell } from '@/components/shared/service-page-shell'
import { serviceNameBySlug } from '@/lib/service-catalog'

const serviceName = serviceNameBySlug['alquiler-departamentos']

export default function AlquilerDepartamentosPage() {
  return (
    <ServicePageShell
      badge="Turismo y estadias"
      title="Alquiler de Departamentos con coordinacion comercial desde HolaTacna"
      description="Captamos solicitudes de departamentos y alojamientos temporales para viajes, turismo o estadias prolongadas y las derivamos a gestores o proveedores adecuados."
      bullets={[
        'Solicitudes de alojamiento con trazabilidad completa',
        'Compatibilidad con gestion manual y futura autoasignacion',
        'Integracion con el CRM actual sin romper otros servicios',
      ]}
      formTitle="Solicita opciones de departamentos"
      gradientClass="bg-[linear-gradient(135deg,#1d4ed8,#60a5fa)]"
      backgroundClass="bg-blue-50"
    >
      <Suspense fallback={<div className="text-sm text-slate-500">Cargando formulario...</div>}>
        <ApartmentRentalLeadForm serviceName={serviceName} />
      </Suspense>
    </ServicePageShell>
  )
}
