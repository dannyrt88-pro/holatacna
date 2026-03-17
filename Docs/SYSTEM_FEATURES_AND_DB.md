# SYSTEM FEATURES AND DATABASE STRUCTURE

Este documento resume las funcionalidades actuales del sistema y su relacion con la capa de datos.

## Proposito del sistema

HolaTacna es un motor de captacion, routing y operacion de leads para un marketplace de servicios en Tacna.

## Modulos principales

### 1. Captura de leads

- landings SEO
- formularios web
- comparativas
- flujos comerciales
- entrada central en `app/api/create-lead/route.ts`

### 2. Normalizacion y enriquecimiento

El backend:

- limpia payloads
- conserva tracking comercial
- interpreta `service_name` y `service_slug`
- prepara contexto para el routing

### 3. Routing de providers

Componentes:

- `lib/provider-routing.ts`
- `lib/provider-observed-signals.ts`
- `lib/provider-hybrid-ranking.ts`

### 4. Operacion del marketplace

- dashboard de leads
- panel `/providers`
- override manual

### 5. Analytics

- metricas por provider
- trazabilidad sugerido vs asignado
- cobertura por servicio

## Tabla operativa principal: `public.leads`

Campos conceptuales mas importantes:

- `id`
- `name`
- `phone`
- `country`
- `service_name`
- `service_slug`
- `provider_id`
- `suggested_provider_id`
- `top_provider_ids`
- `assignment_mode`
- `assignment_reason`
- `auto_assigned`
- `manual_override_at`
- `created_at`

## Entidad operativa: providers

Campos y conceptos clave:

- `id`
- `name`
- `active`
- `auto_assign`
- `priority`
- `score`
- `city_scope`
- cobertura por servicios

## Relaciones principales

- lead -> provider final
- lead -> provider sugerido
- lead -> servicio solicitado
- provider -> servicios soportados
- provider -> ciudad o ambito de cobertura

## Features actuales

- captacion desde landings SEO
- create-lead como punto unico de entrada
- routing hibrido
- autoasignacion cuando aplica
- pending review cuando requiere operacion manual
- panel de providers
- override manual con trazabilidad
- metricas iniciales por provider

## Features futuras

- persistencia de metricas
- ranking adaptativo
- optimizacion de performance
- AI assisted routing
- expansion multiservicio

## Reglas de base de datos

- usar UUID validos en relaciones
- no enviar slugs en campos UUID
- mantener coherencia entre `provider_id` y `suggested_provider_id`
- nunca perder trazabilidad de `assignment_mode` y `assignment_reason`
- registrar `manual_override_at` cuando corresponda
