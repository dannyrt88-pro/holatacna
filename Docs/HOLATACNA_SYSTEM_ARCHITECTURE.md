# HolaTacna System Architecture

## Que es HolaTacna

HolaTacna es una plataforma de captacion, clasificacion, routing y operacion de leads enfocada en turismo medico y servicios aliados conectados al viaje hacia Tacna.

El sistema combina:

- landings SEO por servicio y ciudad
- captura estructurada de leads
- motor de routing de proveedores
- operacion comercial desde dashboard
- panel de proveedores
- metricas operativas para mejorar cobertura y asignacion

## Problema que resuelve

HolaTacna resuelve cuatro problemas a la vez:

- captar demanda con intencion comercial clara
- enrutar leads al proveedor mas adecuado
- permitir intervencion manual cuando el negocio lo necesita
- convertir operacion diaria en senales utiles para mejorar el sistema

## Flujo general del sistema

1. el usuario entra por SEO, contenido o redes
2. llega a una landing o formulario
3. el frontend envia el lead a `app/api/create-lead/route.ts`
4. el lead se normaliza y enriquece
5. `lib/provider-routing.ts` selecciona o sugiere proveedores
6. el resultado se persiste en `public.leads`
7. dashboard y `/providers` operan sobre esa trazabilidad
8. el admin puede hacer override manual sin borrar la sugerencia original

## Capas del sistema

### 1. Entrada de trafico

- landings `/<service>-tacna`
- rutas dinamicas `/<city>/<service>`
- contenido organico y social
- paginas guia del viaje

### 2. Captura de leads

- formularios medicos
- formularios de servicios aliados
- payload normalizado con servicio, ciudad y tracking

### 3. Decision y routing

- scoring comercial del lead
- sugerencia de paquete
- filtro de elegibilidad de providers
- ranking hibrido
- decision entre autoasignacion y pending review

### 4. Persistencia

Tablas principales:

- `public.leads`
- `public.providers`

Campos de trazabilidad en `leads`:

- `provider_id`
- `suggested_provider_id`
- `top_provider_ids`
- `assignment_mode`
- `assignment_reason`
- `auto_assigned`
- `manual_override_at`

### 5. Operacion del marketplace

- dashboard CRM
- panel `/providers`
- override manual de asignacion
- supervision comercial del flujo

### 6. Analytics operativo

- metricas Fase 1 por provider
- ratios Fase 2 por provider
- cobertura por servicio
- base para evolucion futura del ranking

## Entrada de trafico

La capa de entrada existe para convertir descubrimiento en intencion comercial.

Fuentes principales:

- SEO por servicio
- SEO por ciudad
- contenido social
- comparativas de precio, ciudad y tratamiento

## Captura de leads

`create-lead` recibe y normaliza campos como:

- `name`
- `tourist_phone`
- `service_name`
- `service_slug`
- `city_interest`
- `message`
- UTMs
- servicios adicionales

Esta capa tambien calcula score comercial y llama al motor de routing.

## Motor de routing

El motor vive en `lib/provider-routing.ts`.

Su responsabilidad es:

- filtrar providers elegibles
- leer senales observadas recientes
- calcular ranking hibrido
- decidir si autoasigna o deja pendiente
- devolver trazabilidad minima para persistencia

## Asignacion de proveedores

El sistema distingue entre:

- `provider_id`
  - asignacion final efectiva
- `suggested_provider_id`
  - sugerencia principal del motor
- `top_provider_ids`
  - shortlist de providers sugeridos

Esto permite separar:

- la recomendacion del sistema
- la decision final operativa

## Persistencia

`public.leads` conserva tanto la asignacion final como la explicacion de como se llego a ella.

Eso permite:

- auditar decisiones del motor
- medir calidad de autoasignacion
- detectar overrides manuales
- alimentar analytics operativos

## Operacion del marketplace

### Dashboard

Permite:

- ver leads y su trazabilidad
- ver asignado vs sugerido
- hacer override manual
- revisar modo y motivo de asignacion

### Providers Panel

Permite:

- alta y edicion de providers
- configurar `active`, `auto_assign`, `priority`, `score`
- ver metricas por provider
- ver cobertura por servicio

## Analytics

### Fase 1

- `assigned_leads_count`
- `auto_assigned_leads_count`
- `manual_override_leads_count`
- `suggested_count`

### Fase 2

- `suggested_to_assigned_rate`
- `manual_override_share`
- `auto_assignment_share`
- cobertura por servicio

### Fase 3

- ranking hibrido usando base manual mas senales observadas

## Roadmap futuro

Direcciones tecnicas naturales:

- metricas persistentes para reducir calculo en tiempo real
- ranking adaptativo mejor calibrado
- reglas comerciales por provider o plan
- optimizacion de performance del routing
- capa analitica y asistida mas avanzada

## Resumen para nuevos desarrolladores

Si entras al proyecto por primera vez, el orden recomendado es:

1. leer `app/api/create-lead/route.ts`
2. leer `lib/provider-routing.ts`
3. entender la tabla `leads` como fuente de trazabilidad
4. revisar `app/dashboard/page.tsx`
5. revisar `app/providers/page.tsx`
6. leer la documentacion del routing y analytics
