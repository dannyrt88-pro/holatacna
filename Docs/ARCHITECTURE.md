# SYSTEM ARCHITECTURE

Este documento describe la arquitectura actual de HolaTacna como marketplace de servicios con captura de demanda, routing de providers, operacion comercial y analytics.

## Proposito del sistema

La plataforma conecta usuarios que buscan servicios en Tacna con proveedores confiables configurados operativamente en el sistema.

La arquitectura debe soportar:

- captacion desde SEO, social y canales comerciales
- captura centralizada de leads
- routing inteligente de proveedores
- operacion manual y autoasignacion
- trazabilidad completa de decisiones
- evolucion a nuevas categorias sin romper el nucleo

## Capas del sistema

```txt
Traffic Layer
  ->
Lead Capture Layer
  ->
Provider Routing Engine
  ->
Provider Assignment
  ->
Marketplace Operations
  ->
Analytics Layer
```

## Stack tecnologico

Frontend:

- Next.js App Router
- React 19
- TypeScript
- Tailwind CSS 4

Backend y datos:

- Supabase
- PostgreSQL

Despliegue:

- Vercel

## Estructura general

- `app`
  - paginas publicas, landings, APIs, dashboard y providers
- `components`
  - formularios y componentes reutilizables
- `lib`
  - routing, ranking, observed signals, metadata, tracking y helpers
- `types`
  - tipos TypeScript
- `supabase/migrations`
  - cambios de esquema y trazabilidad

## Lead Capture Layer

Todos los leads deben converger en:

- `app/api/create-lead/route.ts`

Responsabilidades:

- recibir payloads de formularios
- normalizar campos
- preservar tracking comercial
- mapear servicio y contexto
- llamar al motor de routing
- persistir el lead con su resultado operativo

## Provider Routing Engine

Archivos clave:

- `lib/provider-routing.ts`
- `lib/provider-observed-signals.ts`
- `lib/provider-hybrid-ranking.ts`

Responsabilidades:

- construir `eligibleProviders`
- separar `autoAssignableProviders`
- calcular senales observadas de los ultimos 90 dias
- combinar senales manuales y observadas
- devolver el provider sugerido o final con razon minima

## Regla de elegibilidad

Un provider entra a `eligibleProviders` si cumple:

- `active = true`
- compatibilidad con `service_slug`
- compatibilidad con `city_scope`

Para autoasignacion, ademas debe tener:

- `auto_assign = true`

## Resultados de asignacion

El routing puede producir:

- `auto_assigned`
- `pending_review`
- `no_eligible_provider`

Estos resultados se persisten en `leads` y alimentan operacion y analytics.

## Persistencia

La tabla operativa central es:

- `public.leads`

Campos importantes:

- `provider_id`
- `suggested_provider_id`
- `top_provider_ids`
- `assignment_mode`
- `assignment_reason`
- `auto_assigned`
- `manual_override_at`

## Operacion del marketplace

Las dos superficies mas importantes son:

- dashboard de leads
- panel `/providers`

Desde ahi el equipo puede:

- revisar leads y trazabilidad
- reasignar providers
- mantener parametros manuales como `priority` y `score`
- activar o desactivar providers
- detectar cobertura debil por servicio

## Analytics

Metricas activas o previstas:

- `assigned_leads_count`
- `auto_assigned_leads_count`
- `manual_override_leads_count`
- `suggested_count`
- `suggested_to_assigned_rate`
- `manual_override_share`
- `auto_assignment_share`
- cobertura por servicio

## Reglas tecnicas criticas

- usar UUID validos en relaciones
- no usar slugs donde se esperan UUID
- no romper la trazabilidad del lead
- mantener separadas sugerencia y asignacion efectiva
- preservar el flujo manual cuando cambie el routing

## Evolucion esperada

- metricas persistentes
- mejor performance del routing
- ranking adaptativo
- AI assisted routing
- expansion multiservicio
