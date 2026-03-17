# LEAD FLOW

Este documento describe como entra, se procesa, se enruta y se opera un lead dentro de HolaTacna.

## Proposito

El objetivo del lead flow es convertir trafico en operacion comercial medible:

1. captar el lead
2. normalizarlo
3. enrutarlo
4. asignarlo o dejarlo pendiente
5. operarlo desde dashboard
6. medir resultado y cobertura

## Definicion de lead

Un lead es una oportunidad comercial generada por una persona interesada en un servicio. Puede venir de:

- landing SEO
- formulario web
- comparativa por ciudad o precio
- social
- WhatsApp
- integraciones futuras

## Flujo actual

1. el usuario llega a una landing
2. completa un formulario
3. el lead entra a `app/api/create-lead/route.ts`
4. el payload se normaliza y enriquece
5. se determina `service_slug` y contexto comercial
6. se ejecuta `selectProviderForLead()`
7. el lead se guarda en `public.leads`
8. queda `auto_assigned`, `pending_review` o `no_eligible_provider`
9. el equipo lo opera desde dashboard

## Datos minimos utiles

- nombre
- telefono
- pais
- ciudad de origen o contexto
- `service_name`
- `service_slug`
- descripcion o necesidad
- tracking comercial disponible

## Clasificacion del lead

Despues de ingresar, el lead debe quedar clasificado al menos por:

- servicio
- ciudad o cobertura
- prioridad comercial
- provider sugerido
- modo de asignacion

## Routing y asignacion

El routing no es una regla binaria simple. El sistema:

- filtra providers elegibles
- considera `active`, servicio y `city_scope`
- calcula senales observadas recientes
- aplica ranking hibrido
- decide si asigna o deja pendiente

Resultados posibles:

- `auto_assigned`
- `pending_review`
- `no_eligible_provider`

## Derivacion manual y override

El flujo manual sigue siendo parte esencial del sistema.

Cuando un admin corrige la asignacion:

- cambia `provider_id`
- `auto_assigned` pasa a `false`
- `assignment_mode` pasa a `manual_override`
- `assignment_reason` pasa a `manual_admin_override`
- `manual_override_at` registra la fecha

La sugerencia original del sistema se mantiene en `suggested_provider_id`.

## Dashboard operativo

El dashboard debe permitir:

- ver leads nuevos y pendientes
- entender provider sugerido y provider final
- leer `assignment_mode` y `assignment_reason`
- reasignar providers manualmente
- filtrar por servicio, ciudad, estado y provider

## Trazabilidad

Todo lead debe permitir responder:

- de donde vino
- que servicio pidio
- que provider sugirio el motor
- quien quedo asignado finalmente
- si hubo override manual
- en que estado operativo esta

## Metricas clave

- leads por servicio
- pending review por servicio
- assigned leads por provider
- auto assignment share
- manual override share
- suggested to assigned rate
- cobertura por servicio y ciudad

## Futuro del lead flow

- mejor scoring comercial
- persistencia de metricas
- priorizacion adaptativa
- deteccion de cobertura debil
- AI assisted routing
