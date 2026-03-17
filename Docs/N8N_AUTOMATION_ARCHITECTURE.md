# N8N_AUTOMATION_ARCHITECTURE
## HolaTacna

### 1. Proposito del documento

Este documento define la arquitectura de automatizacion con `n8n` para el intake y procesamiento operativo de leads en HolaTacna.

Su objetivo es dejar una referencia clara, estable y reutilizable para implementar una capa de automatizacion que prepare los leads antes de entrar al backend actual, sin reemplazar el cerebro del negocio.

Este archivo debe servir como blueprint de implementacion futura para desarrolladores, operadores y agentes de IA.

### 2. Objetivo de automatizacion

La meta de automatizacion es mover fuera de la operacion manual todo lo que ocurra antes de la decision final del provider.

El sistema debe tender a automatizar:

- captacion
- validacion
- filtrado
- clasificacion
- scoring inicial
- dispatch al backend
- alertas
- reintentos

La unica intervencion humana deseada es:

- confirmar el provider sugerido
- cambiarlo si hace falta

### 3. Principio de arquitectura

La arquitectura debe seguir esta separacion estricta:

- `n8n` = capa operativa y de automatizacion
- backend = logica central y cerebro del producto

`n8n` debe encargarse de:

- intake de leads
- validacion
- limpieza
- normalizacion
- deduplicacion
- filtrado de basura
- scoring inicial
- clasificacion inicial
- dispatch al backend
- automatizaciones operativas
- alertas y reintentos

El backend debe seguir encargandose de:

- `create-lead`
- routing de providers
- persistencia principal
- logica critica de negocio
- trazabilidad
- analytics del sistema

Regla central:

`n8n` prepara y orquesta. El backend decide y persiste.

### 4. Flujo general del lead

```txt
Canal
  ->
n8n intake
  ->
validacion
  ->
normalizacion
  ->
deduplicacion
  ->
scoring inicial
  ->
dispatch a create-lead
  ->
routing
  ->
proveedor sugerido
  ->
confirmacion humana
```

Canales tipicos de entrada:

- landing pages
- formularios web
- WhatsApp
- TikTok
- Instagram
- Facebook
- Google
- QR en frontera

### 5. Workflows propuestos

#### Workflow 1 - Lead Intake Core

Proposito:

- recibir leads desde todos los canales
- unificarlos bajo un formato comun
- registrar metadata del origen

Triggers:

- webhooks de formularios
- webhooks de landing pages
- webhooks de integraciones sociales
- WhatsApp bridge
- QR redirect capture
- polling programado si algun canal no soporta push

Entradas:

- payload crudo del canal
- metadata de origen
- UTM y campaign data si existen

Salidas:

- lead crudo unificado
- metadata de tracking
- `trace_id`

Canales soportados:

- landing form
- WhatsApp
- Meta lead ads
- TikTok lead ads
- formularios externos
- QR entry

#### Workflow 2 - Lead Validation & Filtering

Proposito:

- validar que el lead sea operable
- filtrar basura o spam
- normalizar campos criticos
- detectar duplicados iniciales

Debe cubrir:

- validacion de campos minimos
- telefono
- servicio valido
- city normalization
- spam o basura
- deduplicacion

#### Workflow 3 - Lead Enrichment & Scoring

Proposito:

- enriquecer el lead antes del backend
- clasificarlo comercialmente
- calcular score inicial

Debe cubrir:

- clasificacion por servicio
- scoring inicial
- urgencia
- valor estimado
- calidad del lead

#### Workflow 4 - Lead Dispatch & Follow-up

Proposito:

- enviar el lead enriquecido al backend
- manejar reintentos
- generar alertas
- dejar trazabilidad operativa

Debe cubrir:

- envio a `create-lead`
- fallback si falla
- logging
- alerta interna
- reintentos

### 6. Diseno workflow por workflow

#### Workflow 1 - Lead Intake Core

Proposito:

- centralizar todas las entradas en una sola capa de automatizacion

Trigger:

- `Webhook`
- `Cron` para polling cuando aplique

Nodos exactos en orden:

1. `Webhook Trigger / Poll Trigger`
2. `Set - Capture Source Metadata`
3. `Function - Generate trace_id`
4. `Switch - Detect Channel Type`
5. `Function - Raw Payload Mapper`
6. `Set - Attach UTM and campaign context`
7. `Function - Build intake envelope`
8. `Execute Workflow - Workflow 2`

Payload de entrada:

```json
{
  "raw_payload": {},
  "source_channel": "tiktok",
  "entrypoint_type": "landing_form",
  "utm_source": "tiktok",
  "utm_campaign": "implantes-marzo"
}
```

Payload de salida:

```json
{
  "trace_id": "uuid",
  "source_channel": "tiktok",
  "entrypoint_type": "landing_form",
  "raw_payload_reference": "intake:2026-03-13:abc123",
  "received_at": "2026-03-13T10:30:00.000Z",
  "campaign": "implantes-marzo",
  "raw_payload": {}
}
```

Ramas de decision:

- formulario web
- WhatsApp
- paid social
- QR
- unknown source

Errores comunes:

- payload vacio
- canal no identificado
- campos de tracking ausentes

Fallback recomendado:

- continuar con source parcial si el canal es reconocible
- marcar `entrypoint_type = unknown` si no se puede identificar
- enviar a cola de revision tecnica si el payload es inutilizable

#### Workflow 2 - Lead Validation & Filtering

Proposito:

- validar si el lead puede procesarse
- normalizar datos minimos
- separar demanda util de basura

Trigger:

- `Execute Workflow` desde Workflow 1

Nodos exactos en orden:

1. `Function - Normalize name`
2. `Function - Normalize whatsapp/phone`
3. `Function - Normalize service_name`
4. `Function - Normalize city_interest`
5. `IF - Required fields present`
6. `IF - Phone format valid`
7. `IF - Service allowed`
8. `IF - City recognized or nullable`
9. `Function - Spam heuristics`
10. `Supabase / DB Query - Search possible duplicates`
11. `Function - Build validation result`
12. `Execute Workflow - Workflow 3`

Payload de entrada:

```json
{
  "trace_id": "uuid",
  "source_channel": "meta",
  "campaign": "dermatologia-abril",
  "raw_payload": {
    "name": "Juan Perez",
    "phone": "+56 9 1234 5678",
    "service": "Implantes dentales",
    "city": "Iquique"
  }
}
```

Payload de salida:

```json
{
  "trace_id": "uuid",
  "source_channel": "meta",
  "campaign": "dermatologia-abril",
  "name": "Juan Perez",
  "whatsapp": "+56912345678",
  "service_name": "Implantes dentales",
  "service_slug": "implantes-dentales",
  "city_interest": "iquique",
  "lead_quality_status": "valid",
  "dedupe_status": "unique",
  "validation_errors": [],
  "filter_flags": {
    "is_spam": false,
    "is_low_quality": false,
    "needs_manual_review": false
  }
}
```

Ramas de decision:

- lead valido
- lead invalido
- lead incompleto
- lead spam
- lead duplicado
- lead de revision manual

Errores comunes:

- telefono ilegible
- servicio ambiguo
- ciudad mal escrita
- payload parcial

Fallback recomendado:

- si falta ciudad, continuar si el servicio sigue siendo interpretable
- si el servicio no puede mapearse, marcar `needs_manual_review`
- si el telefono no es valido, no despachar al backend
- si es spam claro, descartar y loguear

#### Workflow 3 - Lead Enrichment & Scoring

Proposito:

- enriquecer comercialmente el lead
- clasificar su prioridad
- dejarlo listo para dispatch

Trigger:

- `Execute Workflow` desde Workflow 2

Nodos exactos en orden:

1. `Function - Service classifier`
2. `Function - Urgency extractor`
3. `Function - Estimated value classifier`
4. `Function - Data quality scorer`
5. `Function - Intent scorer`
6. `Function - Initial lead score builder`
7. `Set - Priority and queue metadata`
8. `Execute Workflow - Workflow 4`

Payload de entrada:

```json
{
  "trace_id": "uuid",
  "name": "Juan Perez",
  "whatsapp": "+56912345678",
  "service_name": "Implantes dentales",
  "service_slug": "implantes-dentales",
  "city_interest": "iquique",
  "campaign": "implantes-marzo",
  "lead_quality_status": "valid",
  "dedupe_status": "unique"
}
```

Payload de salida:

```json
{
  "trace_id": "uuid",
  "name": "Juan Perez",
  "whatsapp": "+56912345678",
  "service_name": "Implantes dentales",
  "service_slug": "implantes-dentales",
  "city_interest": "iquique",
  "urgency": "high",
  "estimated_value_tier": "high",
  "lead_score_initial": 78,
  "lead_quality_status": "valid",
  "lead_priority_bucket": "hot",
  "dedupe_status": "unique",
  "campaign": "implantes-marzo"
}
```

Ramas de decision:

- hot lead
- standard lead
- low quality lead
- manual review lead

Errores comunes:

- urgencia no interpretable
- servicio con mapping parcial
- scoring incompleto

Fallback recomendado:

- usar score neutro si falla una parte del enrichment
- no bloquear dispatch si el lead es valido y el scoring solo esta incompleto

#### Workflow 4 - Lead Dispatch & Follow-up

Proposito:

- enviar lead limpio al backend
- manejar errores y reintentos
- crear trazabilidad operativa

Trigger:

- `Execute Workflow` desde Workflow 3

Nodos exactos en orden:

1. `Function - Build canonical backend payload`
2. `Function - Generate dedupe_key / idempotency key`
3. `HTTP Request - POST create-lead`
4. `IF - Response success`
5. `Set - Dispatch success payload`
6. `IF - Retryable error`
7. `Wait - Backoff retry`
8. `HTTP Request - Retry create-lead`
9. `Function - Build failure event`
10. `Telegram / Slack / Email - Internal alert`
11. `Supabase / DB Insert - Dispatch log`
12. `Optional Webhook / Notification - Operator queue`

Payload de entrada:

```json
{
  "trace_id": "uuid",
  "source": "tiktok",
  "campaign": "implantes-marzo",
  "name": "Juan Perez",
  "whatsapp": "+56912345678",
  "service_name": "Implantes dentales",
  "service_slug": "implantes-dentales",
  "city_interest": "iquique",
  "urgency": "high",
  "lead_score_initial": 78,
  "lead_quality_status": "valid",
  "dedupe_status": "unique",
  "received_at": "2026-03-13T10:30:00.000Z"
}
```

Payload de salida:

```json
{
  "trace_id": "uuid",
  "dispatch_status": "success",
  "lead_backend_id": "uuid",
  "assignment_mode": "pending_review",
  "suggested_provider_id": "uuid",
  "top_provider_ids": ["uuid1", "uuid2", "uuid3"],
  "dispatch_attempts": 1,
  "logged_at": "2026-03-13T10:30:04.000Z"
}
```

Ramas de decision:

- success
- retryable error
- hard error
- dead-letter/manual review

Errores comunes:

- timeout de `create-lead`
- 5xx del backend
- payload invalido
- error de autenticacion

Fallback recomendado:

- reintentar 3 veces con backoff exponencial
- si persiste, enviar a cola temporal/manual review
- alertar internamente
- no perder el payload original ni el `trace_id`

### 7. Payload estandar del lead

Payload canonico recomendado entre `n8n` y el backend:

```json
{
  "trace_id": "uuid",
  "source": "tiktok",
  "campaign": "implantes-marzo",
  "name": "Juan Perez",
  "whatsapp": "+56912345678",
  "service_name": "Implantes dentales",
  "service_slug": "implantes-dentales",
  "city_interest": "iquique",
  "urgency": "high",
  "lead_score_initial": 78,
  "lead_quality_status": "valid",
  "raw_channel": "landing_form",
  "raw_payload_reference": "intake:2026-03-13:abc123",
  "dedupe_key": "sha256-hash",
  "received_at": "2026-03-13T10:30:00.000Z"
}
```

Campos recomendados adicionales:

- `dedupe_status`
- `estimated_value_tier`
- `lead_priority_bucket`
- `utm_source`
- `utm_medium`
- `utm_campaign`
- `validation_errors`
- `filter_flags`

### 8. Reglas de validacion y filtrado

#### Campos obligatorios

- `name`
- `whatsapp`
- `service_name` o `service_slug`
- `received_at`
- `source`

#### Formato de telefono

- normalizar a formato internacional
- preferencia por E.164
- rechazar si no cumple longitud minima ni patron base

#### Servicio permitido

- debe existir mapping a un `service_slug` conocido
- si el texto es ambiguo pero recuperable, marcar `needs_manual_review`
- si es completamente ajeno al marketplace, descartar

#### Ciudad valida

- normalizar si coincide con una ciudad conocida
- aceptar nulo si el servicio sigue siendo operable
- marcar warning si el texto no puede mapearse

#### Lead duplicado

- mismo `whatsapp`
- mismo `service_slug`
- misma ventana temporal
- mismo source o source similar

#### Lead incompleto

- si faltan campos no criticos, continuar con flag
- si faltan campos criticos, no despachar

#### Lead basura

Ejemplos:

- texto sin intencion
- spam
- numeros evidentemente falsos
- mensajes genericos vacios
- servicios fuera de cobertura

Accion:

- descartar
- loguear
- no crear lead en backend

#### Lead prioritario

Debe marcarse como prioritario si combina:

- servicio de alto valor
- urgencia alta
- datos completos
- intencion clara
- duplicado no detectado

### 9. Dedupe strategy

La deduplicacion inicial debe usar una combinacion de:

- `whatsapp`
- `service_slug`
- ventana temporal
- `source`

Regla recomendada:

- duplicado exacto:
  - mismo `whatsapp`
  - mismo `service_slug`
  - ventana < 7 dias

- duplicado probable:
  - mismo `whatsapp`
  - servicio similar
  - fuente distinta
  - ventana < 3 dias

Que hacer si detecta duplicado:

- `merge`
  - si es repeticion clara del mismo lead en muy corto plazo
- `descartar`
  - si el duplicado es basura repetida
- `marcar`
  - si puede ser un nuevo intento valido pero necesita contexto
- `alertar`
  - si la repeticion es anomala o revela problema de canal

Regla operativa segura:

- no crear multiples leads identicos por error de formularios o reenvios
- no bloquear reintentos genuinos del usuario sin criterio temporal

### 10. Lead scoring inicial

El scoring en `n8n` debe ser simple, operativo y explicable.

No reemplaza el routing.

Solo prepara mejor el input hacia el backend.

Componentes sugeridos:

#### Score por servicio

- alto valor: implantologia, oftalmologia, cirugia, estetica
- medio valor: dermatologia, procedimientos intermedios
- variable: turismo, restaurantes, compras

#### Score por urgencia

- alta: quiere atencion inmediata o esta en viaje
- media: esta cotizando en corto plazo
- baja: solo exploracion o curiosidad

#### Score por calidad del dato

- nombre real aparente
- telefono valido
- servicio interpretable
- ciudad interpretable
- mensaje util

#### Score por intencion

- mensaje directo de compra o atencion
- solicitud de contacto
- comparacion vaga
- simple curiosidad

Modelo inicial simple:

```txt
lead_score_initial =
service_score
+
urgency_score
+
data_quality_score
+
intent_score
-
duplicate_penalty
-
spam_penalty
```

Rangos sugeridos:

- `0-30`: bajo
- `31-60`: medio
- `61-80`: alto
- `81-100`: hot

### 11. Integracion con backend

`n8n` debe conectarse con:

#### `create-lead`

- via `Webhook` o `HTTP Request`
- envio de payload canonico
- uso de idempotency key o `dedupe_key`

#### Supabase

- para consultas auxiliares operativas
- para revisar duplicados
- para loguear eventos de intake
- para guardar colas de error o revision

#### Paneles internos

- para alimentar cola de aprobacion o seguimiento
- no para mover logica critica de negocio al panel

#### WhatsApp / alertas

- para notificacion interna
- para alertas de fallo
- para seguimiento operativo

Que debe ir por webhook/API:

- dispatch a `create-lead`
- alertas internas
- intake desde canales externos

Que no debe mover la fuente de verdad fuera del backend:

- asignacion final del routing
- logica de providers
- decisiones de negocio criticas
- persistencia principal del lead

### 12. Manejo de errores y fallback

#### Si falla `create-lead`

- reintentar hasta 3 veces
- usar backoff exponencial
- guardar payload en cola temporal
- alertar internamente

#### Si falla Supabase

- continuar si era una consulta auxiliar no critica
- marcar warning operativo
- si el fallo impide dedupe o logs, degradar en modo seguro

#### Si falla enriquecimiento

- usar valores neutros
- no bloquear el dispatch si el lead sigue siendo valido

#### Si el payload viene roto

- no enviarlo al backend
- guardarlo en cola de error
- loguear referencia y causa

#### Politica de retries

- solo para errores transitorios
- no reintentar payloads estructuralmente invalidos

#### Politica de cola temporal / manual review

Mandar a revision manual cuando:

- el payload es recuperable pero ambiguo
- falla repetidamente el dispatch
- el dedupe no puede resolverse
- el servicio no es interpretable con seguridad

### 13. Observabilidad y logs

`n8n` debe loguear:

- status del workflow
- payload normalizado
- validaciones fallidas
- decisiones de dedupe
- dispatch success/failure
- reintentos
- alertas criticas

Tambien debe registrar:

- `trace_id`
- timestamp de inicio
- timestamp de fin
- duracion
- nodo de fallo
- tipo de error

Regla de privacidad:

- no exponer datos sensibles innecesarios en notificaciones
- usar referencias parciales en alertas
- mantener payload completo solo en logs controlados

### 14. Roadmap de implementacion

#### Fase 1

Webhook simple + validacion + dispatch

Objetivo:

- recibir leads por webhook
- normalizar campos basicos
- validar minimos
- enviar a `create-lead`

#### Fase 2

Deduplicacion + scoring inicial + alertas

Objetivo:

- detectar duplicados
- scorear leads
- separar prioridades
- alertar fallos automaticamente

#### Fase 3

WhatsApp intake + enrichment + colas de error

Objetivo:

- sumar intake por WhatsApp
- enriquecer mejor servicio y urgencia
- crear colas de error y manual review

#### Fase 4

Automatizacion madura + multi canal + metricas operativas de intake

Objetivo:

- soportar alto volumen
- consolidar todos los canales
- medir performance de intake
- estabilizar retries, logging y observabilidad

### 15. Riesgos

Principales riesgos:

- exceso de logica en `n8n`
- duplicar reglas de negocio
- flujos demasiado grandes
- dificultad de debugging
- falta de observabilidad
- dependencia de workflows fragiles

Riesgo estructural principal:

si `n8n` empieza a decidir negocio en vez de orquestar operacion, el sistema se vuelve dificil de auditar y mantener.

### 16. Regla de diseno

Regla final del sistema:

- `n8n` automatiza operacion
- backend decide negocio
- `create-lead` y routing siguen siendo fuente de verdad

Toda evolucion futura debe respetar esta frontera.
