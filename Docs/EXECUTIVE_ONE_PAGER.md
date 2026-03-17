# Executive One-Pager - HolaTacna

## Que es HolaTacna

HolaTacna es un marketplace de servicios en Tacna orientado principalmente a turistas y clientes chilenos. Su modelo actual se centra en captar demanda desde contenido y SEO, convertir esa demanda en leads y derivarla hacia proveedores compatibles con trazabilidad operativa.

Hoy el foco principal esta en turismo medico y servicios relacionados al viaje, pero la arquitectura ya esta preparada para crecer hacia un marketplace multiservicio.

## Problema que resuelve

HolaTacna reduce la friccion entre demanda y oferta confiable en un contexto donde el usuario:

- no conoce proveedores en otra ciudad o pais
- tiene baja confianza para elegir
- compara opciones con poca claridad operativa
- necesita una ruta mas simple para concretar un servicio

Al mismo tiempo, el negocio necesita captar leads, distribuirlos mejor, supervisar asignaciones y aprender de la operacion real.

## Modelo operativo

```txt
Turista chileno
  ->
Contenido / SEO / social
  ->
Landing page / formulario
  ->
Lead capturado
  ->
Routing de proveedores
  ->
Proveedor asignado
  ->
Servicio realizado
```

Este funnel convierte trafico en operacion medible. No solo capta leads; tambien organiza la asignacion, permite supervision manual y genera datos para optimizar el marketplace.

## Como funciona el sistema

### 1. Captacion

La demanda entra desde:

- landings SEO por servicio
- paginas comparativas
- contenido en redes sociales
- flujos conectados a WhatsApp

### 2. Captura de lead

El backend centraliza el ingreso en:

- `app/api/create-lead/route.ts`

Esta capa:

- normaliza el payload
- conserva tracking comercial
- interpreta `service_name` y `service_slug`
- enriquece el lead
- dispara el routing antes de persistir

### 3. Routing de proveedores

El motor principal vive en:

- `lib/provider-routing.ts`

La funcion clave es:

- `selectProviderForLead()`

El motor:

- filtra providers activos y compatibles
- calcula senales observadas recientes
- aplica ranking hibrido
- autoasigna o deja pendiente
- guarda explicacion minima de la decision

### 4. Operacion

La operacion diaria ocurre en:

- `dashboard` de leads
- panel `/providers`
- override manual por parte del admin

Esto permite distinguir entre:

- sugerencia del motor
- asignacion final efectiva
- correccion manual posterior

## Logica de asignacion

El sistema separa tres conceptos:

- `eligibleProviders`: activos y compatibles con servicio y ciudad
- `autoAssignableProviders`: elegibles que ademas tienen `auto_assign = true`
- decision final: autoasignar, dejar pendiente o marcar sin proveedor elegible

Resultados posibles:

- `auto_assigned`
- `pending_review`
- `no_eligible_provider`

## Ranking y aprendizaje

HolaTacna usa un ranking hibrido que combina:

- senales manuales: `priority`, `score`
- senales observadas: volumen asignado, tasa sugerido-asignado, peso de autoasignacion y overrides manuales

Esto permite mantener control de negocio mientras el sistema empieza a aprender de la operacion real sin volver opaca la decision.

## Trazabilidad y datos

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

Estos campos permiten auditar la calidad del routing y separar claramente sugerencia, asignacion efectiva e intervencion manual.

## Propuesta de valor del marketplace

Para el usuario:

- menos friccion para encontrar un proveedor confiable
- mejor claridad sobre servicios disponibles en Tacna
- una ruta mas simple para concretar atencion

Para el negocio:

- captacion estructurada de demanda
- derivacion operable y medible
- mejor uso de proveedores activos
- deteccion de cobertura debil por servicio
- base de datos util para optimizacion futura

## Stack actual

- Next.js App Router
- React 19
- TypeScript
- Tailwind CSS 4
- Supabase
- Vercel

## Estado actual

Capacidades activas:

- captacion desde landings SEO
- captura centralizada de leads
- routing hibrido de providers
- trazabilidad de sugerencia vs asignacion
- override manual
- panel de providers
- metricas operativas iniciales

## Prioridades de evolucion

Siguientes capas naturales:

- metricas persistentes
- ranking adaptativo
- optimizacion de performance
- AI assisted routing
- expansion a nuevas categorias de servicio

## Resumen ejecutivo

HolaTacna ya no debe pensarse solo como un sitio de captacion. Es una capa de orquestacion comercial que conecta trafico, lead capture, routing, operacion y analytics en un solo sistema. El objetivo no es unicamente generar leads, sino construir un marketplace confiable, medible y escalable para turistas chilenos que buscan servicios en Tacna.
