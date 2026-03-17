# SERVICE ENGINE

Este documento describe la logica central que conecta leads entrantes con providers compatibles dentro del marketplace.

## Proposito

El Service Engine existe para:

1. recibir leads
2. interpretar el servicio solicitado
3. evaluar proveedores elegibles
4. rankear candidatos
5. asignar automaticamente o dejar pendiente

## Punto de entrada

La entrada principal del motor es:

- `app/api/create-lead/route.ts`

Ese endpoint prepara el lead y delega la decision a:

- `lib/provider-routing.ts`

## Motor actual

La funcion central es:

- `selectProviderForLead()`

El motor:

- construye `eligibleProviders`
- identifica `autoAssignableProviders`
- consulta senales observadas recientes
- calcula ranking hibrido
- devuelve una decision operativa con explicacion minima

## Senales consideradas

Senales manuales:

- `priority`
- `score`

Senales observadas:

- `assigned_leads_count`
- `suggested_count`
- `suggested_to_assigned_rate`
- `auto_assignment_share`
- `manual_override_share`

## Regla de decision

Si existe provider elegible y autoasignable con mejor ranking:

- `assignment_mode = auto_assigned`

Si hay providers elegibles pero ninguno autoasignable:

- `assignment_mode = pending_review`

Si no hay providers compatibles:

- `assignment_mode = no_eligible_provider`

## Providers

Los providers pueden pertenecer a multiples verticales de servicio. A nivel operativo importan especialmente:

- `active`
- `auto_assign`
- `priority`
- `score`
- compatibilidad con `service_slug`
- compatibilidad con `city_scope`

## Persistencia de decision

El motor debe dejar trazabilidad en `public.leads` mediante:

- `provider_id`
- `suggested_provider_id`
- `top_provider_ids`
- `assignment_mode`
- `assignment_reason`
- `auto_assigned`

## Operacion posterior

Despues del routing, el equipo puede:

- revisar el lead en dashboard
- mantenerlo pendiente
- cambiar el provider final
- usar `/providers` para ajustar configuracion y cobertura

## Evolucion prevista

- metricas persistentes
- ranking adaptativo
- mayor precision por ciudad
- AI assisted routing
