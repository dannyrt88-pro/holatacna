# CONTEXT

HolaTacna es un marketplace de servicios en Tacna orientado principalmente a turistas y clientes chilenos. Su objetivo es captar demanda, convertirla en leads operables y conectarla con proveedores compatibles mediante un sistema de routing con trazabilidad.

## Objetivo del proyecto

Construir una plataforma escalable que:

- capture leads desde landings SEO, contenido y canales comerciales
- permita gestionarlos desde un dashboard operativo
- enrute leads a proveedores compatibles
- combine autoasignacion con supervision manual
- mida cobertura, calidad de asignacion y rendimiento del marketplace

## Flujo principal

1. el usuario llega desde SEO, social o un canal comercial
2. entra a una landing o formulario
3. envia sus datos a `app/api/create-lead/route.ts`
4. el backend normaliza el payload y preserva tracking
5. el motor de routing evalua proveedores compatibles
6. el lead se persiste en Supabase con sugerencia o asignacion
7. el equipo opera el lead desde dashboard o `/providers`

## Superficies principales

- `app/`
  - paginas publicas, landings, dashboard, providers y APIs
- `components/`
  - formularios y shells reutilizables
- `lib/`
  - routing, observed signals, ranking, tracking y utilidades
- `supabase/migrations/`
  - cambios de esquema

## Punto critico de backend

El punto central de captura es:

- `app/api/create-lead/route.ts`

Esta capa:

- normaliza datos del lead
- interpreta `service_name` y `service_slug`
- conserva contexto comercial
- invoca el motor de routing
- persiste el resultado final

## Motor de routing

El archivo principal es:

- `lib/provider-routing.ts`

La funcion clave es:

- `selectProviderForLead()`

El routing:

- filtra providers activos y compatibles
- considera servicio y ciudad
- calcula senales observadas recientes
- aplica ranking hibrido
- decide `auto_assigned`, `pending_review` o `no_eligible_provider`

## Trazabilidad operativa

La tabla operativa central es:

- `public.leads`

Campos clave:

- `provider_id`
- `suggested_provider_id`
- `top_provider_ids`
- `assignment_mode`
- `assignment_reason`
- `auto_assigned`
- `manual_override_at`

Esto permite separar sugerencia del motor, asignacion efectiva y override manual posterior.

## Operacion diaria

Las superficies operativas son:

- dashboard de leads
- panel `/providers`
- override manual por parte del admin

El sistema debe permitir:

- revisar leads nuevos
- entender por que se sugirio un provider
- corregir asignaciones sin perder trazabilidad
- detectar cobertura debil por servicio

## Prioridades actuales

- turismo medico
- estetica
- implantes dentales
- dermatologia
- servicios aliados al viaje

La arquitectura, sin embargo, ya esta pensada para un marketplace multiservicio.

## Principios tecnicos

- estabilidad primero
- cambios pequenos y seguros
- trazabilidad de decisiones
- no romper la operacion manual
- mantener alineacion entre docs, codigo y base de datos

## Direccion futura

- metricas persistentes
- ranking adaptativo
- mejor cobertura por servicio y ciudad
- AI assisted routing
- expansion a nuevas categorias
