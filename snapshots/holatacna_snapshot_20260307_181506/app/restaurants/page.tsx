import { Suspense } from 'react'
import { RestaurantLeadForm } from '@/components/forms/restaurant-lead-form'
import { ServicePageShell } from '@/components/shared/service-page-shell'
import { serviceNameBySlug } from '@/lib/service-catalog'

const serviceName = serviceNameBySlug.restaurants

export default function RestaurantsPage() {
  return (
    <ServicePageShell
      badge="Turismo gastronomico"
      title="Restaurants en Tacna con apoyo comercial desde HolaTacna"
      description="Captamos solicitudes de reservas, experiencias gastronomicas y recomendaciones para viajeros o visitantes que buscan opciones de alimentacion durante su estadia."
      bullets={[
        'Reservas y coordinacion de experiencias gastronomicas',
        'Compatibilidad con gestion manual y futura autoasignacion',
        'Trazabilidad completa desde campana hasta dashboard',
      ]}
      formTitle="Solicita apoyo para tu reserva"
      gradientClass="bg-[linear-gradient(135deg,#9a3412,#f97316)]"
      backgroundClass="bg-orange-50"
    >
      <Suspense fallback={<div className="text-sm text-slate-500">Cargando formulario...</div>}>
        <RestaurantLeadForm serviceName={serviceName} />
      </Suspense>
    </ServicePageShell>
  )
}
