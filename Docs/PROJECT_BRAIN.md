# PROJECT BRAIN

Este archivo resume la memoria operativa del proyecto dentro de `Docs/`. La referencia canonica y mas completa sigue siendo `PROJECT_BRAIN.md` en la raiz.

## Vision

HolaTacna es un marketplace inteligente de servicios en Tacna. Captura demanda, la convierte en leads estructurados y la conecta con proveedores compatibles mediante routing, supervision manual y aprendizaje progresivo.

## Problema que resuelve

El usuario necesita encontrar proveedores confiables en otra ciudad con menos friccion y menos incertidumbre. El negocio necesita distribuir demanda, controlar calidad de asignacion y construir un marketplace medible.

## Flujo del sistema

```txt
Trafico / SEO / social
  ->
Landing / formulario
  ->
create-lead
  ->
Provider routing
  ->
Asignacion o pending review
  ->
Operacion comercial
  ->
Servicio realizado
```

## Componentes clave

- `app/api/create-lead/route.ts`
  - entrada central de leads
- `lib/provider-routing.ts`
  - seleccion de provider
- `lib/provider-observed-signals.ts`
  - senales observadas recientes
- `lib/provider-hybrid-ranking.ts`
  - ranking manual + observado

## Reglas actuales

- un provider debe estar activo y ser compatible por servicio y ciudad
- la autoasignacion solo aplica si `auto_assign = true`
- la sugerencia original no se pierde cuando hay override manual
- el sistema debe mantener trazabilidad en `public.leads`

## Campos de trazabilidad

- `provider_id`
- `suggested_provider_id`
- `top_provider_ids`
- `assignment_mode`
- `assignment_reason`
- `auto_assigned`
- `manual_override_at`

## Estado actual

- landings SEO y captacion comercial activas
- create-lead como punto unico de entrada
- routing hibrido implementado
- panel de providers operativo
- dashboard con override manual
- metricas iniciales por provider y por servicio

## Direccion futura

- metricas persistentes
- optimizacion del ranking
- mejor lectura de cobertura
- AI assisted routing
- expansion a nuevas verticales de servicio
