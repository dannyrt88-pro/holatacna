# CODEX RULES

Reglas operativas para trabajar en este repositorio sin romper la arquitectura actual del marketplace.

## Objetivo

Codex debe actuar como:

- desarrollador senior cuidadoso
- revisor de calidad
- operador tecnico alineado con el negocio

Su trabajo debe proteger la operacion real del sistema, no solo producir codigo.

## Documentos que debe leer primero

Antes de tocar codigo, revisar:

- `PROJECT_BRAIN.md`
- `Docs/MASTER_WORK_ROUTE.md`
- `Docs/EXECUTIVE_ONE_PAGER.md`
- `Docs/CONTEXT.md`
- `Docs/ARCHITECTURE.md`
- `Docs/LEAD_FLOW.md`
- `Docs/SERVICE_ENGINE.md`
- `Docs/ROADMAP.md`

## Regla general de trabajo

Antes de cambiar cualquier archivo:

1. entender el flujo de negocio
2. identificar la capa afectada
3. encontrar la causa raiz
4. aplicar el cambio minimo seguro
5. verificar impacto en routing, dashboard y trazabilidad

## Prioridad del sistema

HolaTacna ya no debe tratarse como un sitio vertical aislado. Es un marketplace multiservicio con foco actual en:

- turismo medico
- estetica
- implantes dentales
- dermatologia
- servicios aliados al viaje

## Reglas para modificar codigo

Codex debe:

- tocar el menor numero posible de archivos
- reutilizar la arquitectura existente
- preservar trazabilidad en `leads`
- respetar la separacion entre provider sugerido y provider final
- mantener operativo el flujo manual

Codex no debe:

- reescribir modulos completos sin necesidad
- reemplazar el routing por heuristicas opacas
- eliminar campos de trazabilidad sin pedirlo
- asumir que `auto_assign` es la unica regla de decision

## Reglas para bugs

Cuando se reporte un bug, revisar primero:

- `app/api/create-lead/route.ts`
- `lib/provider-routing.ts`
- `lib/provider-observed-signals.ts`
- `lib/provider-hybrid-ranking.ts`
- dashboard y surfaces de override manual
- integracion con Supabase y payloads UUID

## Reglas para Supabase

Cada cambio en datos debe validar:

- UUID reales en relaciones
- inserts y updates coherentes con el esquema actual
- consistencia entre `provider_id` y `suggested_provider_id`
- persistencia correcta de `assignment_mode` y `assignment_reason`
- registro de `manual_override_at` cuando aplique

## Reglas para formularios

Cuando modifique formularios o captacion:

- validar `onSubmit`
- revisar payload enviado a `create-lead`
- asegurar `service_name` y `service_slug`
- mantener tracking comercial
- verificar que el lead sigue apareciendo en dashboard

## Reglas para dashboard

Cuando modifique operacion:

- no romper filtros ni trazabilidad
- mostrar claramente provider sugerido y provider final
- preservar lectura de `assignment_mode`
- mantener override manual funcional

## Reglas para routing

La logica actual no es un booleano simple.

Antes de tocarla, revisar:

- elegibilidad por servicio y ciudad
- `active`
- `auto_assign`
- `priority`
- `score`
- senales observadas
- resultado final: `auto_assigned`, `pending_review` o `no_eligible_provider`

Nunca debe romperse el flujo manual al mejorar el automatico.

## Reglas para nuevas features

Separar siempre el impacto en:

- captura
- routing
- persistencia
- dashboard
- analytics

Si la feature cambia comportamiento del marketplace, actualizar tambien la documentacion base.

## Formato de respuesta recomendado

Cuando implemente cambios, responder con:

- diagnostico
- causa raiz
- solucion
- archivos modificados
- riesgos
- como probar

## Regla final

El sistema debe seguir siendo explicable. Si un cambio mejora sofisticacion pero reduce trazabilidad o control operativo, no esta alineado con la arquitectura actual.
