# Provider Analytics

## Objetivo

El sistema de analytics de providers convierte operacion diaria en senales utiles para negocio y producto.

Sirve para responder:

- que providers reciben mas leads
- cuales funcionan mejor en autoasignacion
- cuales dependen mas del equipo comercial
- que servicios tienen poca cobertura

## Fase 1: metricas base por provider

### `assigned_leads_count`

Cantidad de leads donde:

- `provider_id = provider.id`

Interpreta:

- volumen final realmente asignado a ese provider

### `auto_assigned_leads_count`

Cantidad de leads donde:

- `provider_id = provider.id`
- `assignment_mode = auto_assigned`

Interpreta:

- cuanto asigna el motor sin intervencion manual

### `manual_override_leads_count`

Cantidad de leads donde:

- `provider_id = provider.id`
- `assignment_mode = manual_override`

Interpreta:

- cuanto termina dependiendo del equipo comercial

### `suggested_count`

Cantidad de leads donde:

- `suggested_provider_id = provider.id`

Interpreta:

- cuantas veces el motor considera a ese provider como mejor sugerencia

## Fase 1: flags operativas

### Alta intervencion manual

Se activa cuando:

- `manual_override_leads_count > auto_assigned_leads_count`

Interpreta:

- el provider depende demasiado de correccion manual

### Sin traccion

Se activa cuando:

- provider activo
- `assigned_leads_count = 0`

Interpreta:

- provider disponible pero sin asignaciones finales

## Fase 2: ratios por provider

### `suggested_to_assigned_rate`

Formula:

```txt
assigned_leads_count / suggested_count
```

Interpreta:

- que tan bien convierte una sugerencia del motor en asignacion final

### `manual_override_share`

Formula:

```txt
manual_override_leads_count / assigned_leads_count
```

Interpreta:

- que porcentaje de sus asignaciones finales depende de override manual

### `auto_assignment_share`

Formula:

```txt
auto_assigned_leads_count / assigned_leads_count
```

Interpreta:

- que porcentaje de sus asignaciones finales viene directo del motor

## Cobertura por servicio

La capa de cobertura por servicio responde:

- cuantos providers activos existen por servicio
- cuantos leads quedan en `pending_review`
- que tasa de pending review tiene cada servicio

### `active_providers_count_by_service`

Cuantos providers activos participan por `service_slug`.

### `pending_review_count_by_service`

Cuantos leads quedan pendientes para ese servicio.

### `pending_review_rate_by_service`

Formula:

```txt
pending_review_count / total_leads_by_service
```

Interpreta:

- donde el sistema tiene cobertura debil o cierre automatico bajo

## Como interpretar metricas

### Provider fuerte

Patron tipico:

- asignados altos
- autoasignacion alta
- manual share bajo
- ratio sugerido a asignado razonable

### Provider dependiente del equipo comercial

Patron tipico:

- manual share alto
- auto share bajo

### Provider visible pero debil

Patron tipico:

- `suggested_count` alto
- `assigned_leads_count` bajo

### Servicio con cobertura debil

Patron tipico:

- pocos providers activos
- pending review alto
- pending review rate alto

## Limitaciones actuales

- los leads legacy pueden no tener todas las senales
- el calculo actual es ligero y operativo, no BI historico completo
- algunas lecturas dependen de la consistencia de `service_slug` y `assignment_mode`

## Evolucion futura

Siguientes pasos razonables:

- metricas persistentes
- agregaciones mas eficientes
- analitica historica mas estable
- alimentacion mas madura del ranking hibrido
