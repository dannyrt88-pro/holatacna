# PROJECT_BRAIN.md
## HolaTacna - Core Project Memory

### 1. Proposito del archivo
Este archivo es la memoria central del proyecto HolaTacna. Su objetivo es concentrar la comprension arquitectonica, operativa y evolutiva del sistema en un solo punto de referencia para desarrolladores, Codex, GPT, agentes futuros y cualquier persona que necesite onboardearse rapidamente en el proyecto.

Este documento debe mantenerse actualizado cada vez que cambie la arquitectura, el routing, la operacion del marketplace, la capa analitica o el roadmap tecnico.

Documento rector estrategico actual:

- `Docs/MASTER_WORK_ROUTE.md`
  - define la ruta principal de trabajo por encima del roadmap tactico

### 2. Que es HolaTacna
HolaTacna es un marketplace inteligente de servicios en Tacna orientado principalmente a turistas y clientes chilenos. Su funcion es captar demanda, clasificarla, enrutarla a proveedores compatibles y permitir operacion comercial con trazabilidad, supervision manual y aprendizaje progresivo del sistema.

Hoy el foco principal esta en turismo medico y servicios relacionados al viaje, pero la arquitectura ya esta pensada para operar como una plataforma multiservicio.

### 3. Problema que resuelve
HolaTacna resuelve varios problemas del viaje y la contratacion de servicios en un contexto de confianza limitada:

- falta de confianza para elegir proveedores en otra ciudad o pais
- perdida de tiempo comparando opciones sin claridad operativa
- dificultad para saber que proveedor realmente conviene para cada necesidad
- necesidad del negocio de conectar demanda con oferta confiable y operable

El sistema busca reducir friccion tanto para el turista como para el equipo comercial y los proveedores.

### 4. Modelo del sistema
El flujo base del negocio es:

```txt
Turista chileno
  ->
Contenido / trafico
  ->
Landing / formulario
  ->
Lead capturado
  ->
Motor de routing
  ->
Proveedor asignado
  ->
Servicio realizado
```

Este flujo no solo conecta oferta y demanda; tambien convierte interacciones operativas en datos utiles para mejorar el sistema.

### 5. Arquitectura general
La arquitectura del sistema puede entenderse en seis capas:

- Traffic Layer
  - SEO, contenido, social y discovery
- Lead Capture Layer
  - formularios, payload, tracking y `create-lead`
- Provider Routing Engine
  - elegibilidad, senales observadas, ranking y decision
- Provider Assignment
  - autoasignacion, pending review y override manual
- Marketplace Operations
  - dashboard, panel `/providers`, operacion comercial
- Analytics & Optimization
  - metricas por provider, cobertura por servicio, evolucion del ranking

### 6. Captura de leads
La captura de leads ocurre principalmente desde:

- landing pages SEO por servicio
- rutas dinamicas por ciudad
- formularios de contacto y conversion
- flujos conectados a WhatsApp

El punto central de entrada al backend es:

- `app/api/create-lead/route.ts`

Esta capa se encarga de:

- normalizar el payload
- conservar tracking comercial
- interpretar `service_name` y `service_slug`
- enriquecer el lead
- invocar el motor de routing antes de persistir

### 7. Motor de routing de proveedores
El archivo principal del motor es:

- `lib/provider-routing.ts`

La funcion central es:

- `selectProviderForLead()`

Su responsabilidad es:

- cargar y filtrar providers elegibles
- calcular senales observadas recientes
- aplicar ranking hibrido
- decidir si autoasigna o deja pendiente
- devolver una explicacion minima de la decision para persistencia

### 8. Filtro de elegibilidad
Antes de rankear, el sistema crea el conjunto `eligibleProviders`.

Para entrar a ese conjunto, el provider debe cumplir:

- `provider.active`
- compatibilidad de `service_slug`
- compatibilidad de `city_scope`

Y luego, para autoasignacion:

- `auto_assign = true`

En resumen:

- `eligibleProviders` = providers activos y compatibles
- `autoAssignableProviders` = elegibles que ademas permiten autoasignacion

### 9. Senales observadas
El archivo que construye la capa observada es:

- `lib/provider-observed-signals.ts`

La implementacion actual usa una sola query a `leads` por ejecucion del routing y trabaja con estas columnas:

- `provider_id`
- `suggested_provider_id`
- `assignment_mode`
- `created_at`

Ventana observada actual:

- ultimos 90 dias

Metricas calculadas por provider:

- `assigned_leads_count`
- `suggested_count`
- `auto_assignment_share`
- `manual_override_share`
- `suggested_to_assigned_rate`

Si esta capa falla, el routing no se rompe; usa un fallback neutro y mantiene el flujo operativo.

### 10. Ranking hibrido
El archivo principal del ranking es:

- `lib/provider-hybrid-ranking.ts`

Senales manuales:

- `priority`
- `score`

Senales observadas:

- `suggested_to_assigned_rate`
- `auto_assignment_share`
- `manual_override_share`

Formula actual:

```txt
manual_base =
(priority * 10) +
(score * 3)

observed_bonus =
(suggested_to_assigned_rate * 25)
+
(auto_assignment_share * 15)
-
(manual_override_share * 10)

confidence_factor =
min(1, max(assigned_leads_count, suggested_count) / 10)

observed_bonus *= confidence_factor

observed_bonus = clamp(observed_bonus, -12, 12)

hybrid_rank_score =
manual_base + observed_bonus
```

Esta formula permite que el negocio mantenga control manual mientras el sistema empieza a incorporar rendimiento real observado.

### 11. Decision final
El motor puede terminar en tres resultados principales:

- `auto_assigned`
  - hay provider elegible y autoasignable
- `pending_review`
  - hay providers elegibles pero no autoasignables
- `no_eligible_provider`
  - no hay providers compatibles para ese lead

Cada resultado queda explicado por `assignment_mode` y `assignment_reason`.

### 12. Persistencia de datos
La tabla central de persistencia operativa es:

- `public.leads`

Campos clave de asignacion y trazabilidad:

- `provider_id`
- `suggested_provider_id`
- `top_provider_ids`
- `assignment_mode`
- `assignment_reason`
- `auto_assigned`
- `manual_override_at`

Estos campos permiten separar:

- la sugerencia del motor
- la asignacion final efectiva
- la intervencion manual posterior

### 13. Operacion del sistema
La operacion se concentra en dos superficies:

#### Dashboard de leads
- visualizacion de leads
- trazabilidad de asignado vs sugerido
- lectura de modo y motivo
- override manual del provider final

#### Override manual
Cuando el admin cambia el provider:

- se actualiza `provider_id`
- se actualizan campos operativos relacionados
- `auto_assigned` pasa a `false`
- `assignment_mode` pasa a `manual_override`
- `assignment_reason` pasa a `manual_admin_override`
- `manual_override_at` guarda la fecha del cambio

La sugerencia original no se borra.

#### `/providers`
- alta y edicion de providers
- configuracion de `active`, `auto_assign`, `priority`, `score`
- lectura de metricas operativas
- cobertura por servicio

### 14. Analytics del sistema
Actualmente existen dos fases principales de metricas:

#### Fase 1
- `assigned_leads_count`
- `auto_assigned_leads_count`
- `manual_override_leads_count`
- `suggested_count`

#### Fase 2
- `suggested_to_assigned_rate`
- `manual_override_share`
- `auto_assignment_share`
- cobertura por servicio

La cobertura por servicio permite leer:

- cuantos providers activos existen por servicio
- cuantos leads quedan en `pending_review`
- que tan debil o fuerte es la cobertura operativa

### 15. Vision del proyecto
HolaTacna busca convertirse en la plataforma que conecta turistas chilenos con servicios confiables en Tacna, usando una combinacion de captacion inteligente, routing operativo, supervision comercial y aprendizaje progresivo del sistema.

La vision no es solo captar leads, sino operar un marketplace confiable, medible y escalable.

### 16. Roadmap tecnico
#### Fase actual
- routing hibrido
- analytics
- panel providers

#### Fase futura
- metricas persistentes
- ranking adaptativo
- optimizacion de performance
- AI assisted routing

La evolucion prevista es por capas pequenas, medibles y sin romper el control manual del negocio.

### 17. Regla de evolucion del proyecto
Cualquier cambio importante del sistema debe reflejarse en `PROJECT_BRAIN.md`.

Eso incluye, como minimo:

- cambios de arquitectura
- cambios del motor de routing
- nuevas reglas de asignacion
- cambios en trazabilidad
- nuevas metricas relevantes
- nuevas capas operativas o analiticas

Este archivo no es decorativo. Es parte del mantenimiento tecnico del proyecto.
