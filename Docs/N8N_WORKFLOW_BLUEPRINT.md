# N8N WORKFLOW BLUEPRINT

## Proposito

Este documento define el blueprint tecnico completo de workflows `n8n` para HolaTacna.

Su objetivo es estandarizar la capa de automatizacion previa y posterior al backend para que:

- el intake sea unificado
- la validacion sea automatica
- la deduplicacion ocurra antes de persistir
- el lead llegue enriquecido a `create-lead`
- la operacion humana se reduzca a aprobar o cambiar el provider sugerido

Este documento debe leerse junto con:

- `Docs/MASTER_WORK_ROUTE.md`
- `PROJECT_BRAIN.md`
- `Docs/SERVICE_ENGINE.md`
- `Docs/LEAD_FLOW.md`

## Principio rector

`n8n` no reemplaza la logica central del producto.

`n8n` prepara, valida, clasifica, prioriza, automatiza y orquesta.

El backend sigue siendo el source of truth para:

- `create-lead`
- routing de providers
- persistencia principal
- trazabilidad
- reglas criticas del negocio

## Vista general de workflows

```txt
WF-01 Lead Intake
  ->
WF-02 Lead Validation
  ->
WF-03 Lead Filtering
  ->
WF-04 Lead Deduplication
  ->
WF-05 Lead Scoring
  ->
WF-06 Lead Submission to Backend
  ->
WF-07 Operator Approval Orchestration
  ->
WF-08 Provider Dispatch
  ->
WF-09 Feedback Capture
  ->
WF-10 SLA and Escalation
```

## Convenciones de diseno

### Naming

- `WF-01`, `WF-02`, etc. para workflows
- `FN-xx` para nodos `Function` o `Code`
- `IF-xx` para nodos condicionales
- `HTTP-xx` para integraciones HTTP
- `DB-xx` para consultas a Supabase o store operacional
- `MSG-xx` para notificaciones

### Reglas de integracion

- toda llamada relevante debe incluir `trace_id`
- toda ejecucion debe incluir `workflow_version`
- toda llamada a backend debe ser idempotente
- los fallos no criticos deben degradar a modo seguro, no bloquear toda la operacion

### Campos tecnicos obligatorios

Todo payload interno entre workflows debe incluir:

```json
{
  "trace_id": "uuid",
  "received_at": "ISO_DATE",
  "workflow_version": "2026-03-v1",
  "source_channel": "string",
  "entrypoint_type": "string"
}
```

## Payload canonico intermedio

Este es el payload base que `n8n` debe producir antes de llamar a `create-lead`:

```json
{
  "trace_id": "8b6434c0-8be4-4e7b-9328-31e293c0f5e1",
  "received_at": "2026-03-13T10:30:00.000Z",
  "workflow_version": "2026-03-v1",
  "source_channel": "tiktok",
  "entrypoint_type": "landing_form",
  "source_campaign": "implantes-marzo",
  "utm_source": "tiktok",
  "utm_campaign": "implantes-marzo",
  "utm_medium": "paid_social",
  "name": "Juan Perez",
  "phone_raw": "+56 9 1234 5678",
  "phone_normalized": "+56912345678",
  "country": "CL",
  "origin_city_raw": "Iquique",
  "origin_city_normalized": "iquique",
  "service_raw": "implantes dentales",
  "service_slug_candidate": "implantes-dentales",
  "message": "quiero cotizar para esta semana",
  "urgency_level": "high",
  "travel_window": "7d",
  "validation_status": "valid",
  "filter_status": "accepted",
  "dedupe_status": "unique",
  "lead_quality_score": 78,
  "lead_intent_level": "hot",
  "flags": {
    "possible_duplicate": false,
    "low_quality": false,
    "needs_manual_review": false
  }
}
```

## WF-01 Lead Intake

### Objetivo

Unificar todos los canales de entrada en un payload inicial comun.

### Triggers soportados

- `Webhook` para landing pages
- `Webhook` para formularios incrustados
- `Webhook` para WhatsApp bridge
- `Webhook` para Meta Lead Ads
- `Webhook` para TikTok Lead Ads
- `Webhook` para QR redirects
- `Cron` para polling en canales que no soporten push

### Nodos

1. `TRG-01 Webhook / Poll Trigger`
   - recibe payload original

2. `FN-01 Capture Raw Envelope`
   - guarda payload original en estructura comun:
   - `raw_payload`
   - `received_at`
   - `trace_id`
   - `source_channel`

3. `IF-01 Identify Source`
   - bifurca por:
   - `landing_form`
   - `whatsapp`
   - `meta_lead_ads`
   - `tiktok_lead_ads`
   - `qr_entry`

4. `FN-02 Source Mapper`
   - transforma cada formato de origen al esquema inicial comun

5. `FN-03 UTM Resolver`
   - extrae y normaliza:
   - `utm_source`
   - `utm_medium`
   - `utm_campaign`
   - `utm_content`
   - `utm_term`

6. `FN-04 Trace Metadata`
   - agrega:
   - `workflow_version`
   - `entrypoint_type`
   - `source_campaign`
   - `session_metadata` si existe

7. `EXEC-01 Call WF-02 Lead Validation`

### Salida esperada

Payload comun listo para validacion.

### Errores y fallback

- si el source mapper falla:
  - enviar a `DLQ-intake`
  - alertar por canal interno
- si faltan UTM:
  - continuar con valores nulos
- si el canal no es reconocible:
  - `source_channel = unknown`
  - marcar `needs_manual_review = true`

## WF-02 Lead Validation

### Objetivo

Validar integridad minima del lead antes de seguir procesando.

### Nodos

1. `FN-05 Normalize Name`
   - trim
   - remove repeated spaces

2. `FN-06 Normalize Phone`
   - remover espacios y simbolos
   - inferir prefijo internacional si es Chile
   - producir `phone_normalized`

3. `FN-07 Normalize Geography`
   - mapear pais
   - mapear ciudad origen si existe

4. `FN-08 Normalize Service Raw`
   - limpiar string
   - lowercase
   - remover ruido

5. `IF-02 Validate Required Fields`
   - nombre
   - telefono
   - servicio o mensaje interpretable

6. `IF-03 Validate Phone Quality`
   - longitud minima
   - patron compatible

7. `IF-04 Validate Country Scope`
   - `CL`, `PE` o paises soportados

8. `FN-09 Validation Status Builder`
   - produce:
   - `validation_status`
   - `validation_errors[]`
   - `flags.needs_manual_review`

9. `EXEC-02 Call WF-03 Lead Filtering`

### Reglas

- si faltan campos criticos:
  - `validation_status = rejected`
- si hay ambiguedad pero es recuperable:
  - `validation_status = needs_review`
- si cumple minimos:
  - `validation_status = valid`

### Fallback

- si la validacion geografica falla:
  - continuar con pais/city nulos
  - marcar `needs_manual_review = true`

## WF-03 Lead Filtering

### Objetivo

Separar demanda util de spam, ruido o leads fuera de cobertura.

### Nodos

1. `FN-10 Spam Pattern Check`
   - mensajes vacios
   - URLs sospechosas
   - texto repetitivo

2. `DB-01 Check Phone Blacklist`
   - consulta blacklist operativa

3. `DB-02 Check Service Coverage Rules`
   - valida si el servicio esta dentro del scope actual

4. `IF-05 Filter Decision`
   - `accepted`
   - `low_quality`
   - `rejected`

5. `FN-11 Filter Status Builder`
   - agrega:
   - `filter_status`
   - `filter_reasons[]`

6. `EXEC-03 Call WF-04 Lead Deduplication`

### Regla

- `rejected` si es spam claro o fuera de cobertura absoluta
- `low_quality` si el lead es pobre pero recuperable
- `accepted` si puede seguir

### Fallback

- si falla una consulta de blacklist:
  - continuar
  - agregar `filter_warning = blacklist_unavailable`

## WF-04 Lead Deduplication

### Objetivo

Evitar ensuciar `leads` con registros repetidos o ruido operativo.

### Fuentes para comparar

- `phone_normalized`
- `service_slug_candidate`
- `origin_city_normalized`
- ventana temporal
- nombre similar

### Nodos

1. `DB-03 Find Exact Phone Matches`
   - busca leads recientes por telefono

2. `DB-04 Find Similar Matches`
   - busca combinaciones por telefono parcial, nombre, servicio

3. `FN-12 Dedupe Comparator`
   - calcula:
   - `exact_duplicate`
   - `possible_duplicate`
   - `repeat_valid`

4. `IF-06 Dedupe Decision`
   - `unique`
   - `possible_duplicate`
   - `exact_duplicate`
   - `repeat_valid`

5. `FN-13 Dedupe Status Builder`
   - agrega:
   - `dedupe_status`
   - `dedupe_reference_ids[]`
   - `flags.possible_duplicate`

6. `EXEC-04 Call WF-05 Lead Scoring`

### Reglas recomendadas

- `exact_duplicate`
  - telefono igual
  - servicio igual o equivalente
  - ventana < 7 dias
- `possible_duplicate`
  - telefono igual o similar
  - servicio similar
  - ventana < 3 dias
- `repeat_valid`
  - mismo contacto pero nueva intencion o ventana mayor

### Fallback

- si la consulta de duplicados falla:
  - `dedupe_status = unknown`
  - continuar
  - marcar warning tecnico

## WF-05 Lead Scoring

### Objetivo

Calcular score inicial del lead para priorizacion operativa y enriquecimiento del routing.

### Variables de scoring

- completitud
- claridad del servicio
- claridad del mensaje
- urgencia
- canal
- servicio de alto valor
- ciudad conocida
- historial de duplicados
- estado de validacion
- estado de filtering

### Nodos

1. `FN-14 Service Candidate Mapper`
   - resuelve `service_slug_candidate`
   - mapea sinonimos

2. `FN-15 Urgency Extractor`
   - detecta urgencia desde mensaje o source metadata

3. `FN-16 Completeness Scorer`
   - puntua campos presentes

4. `FN-17 Intent Scorer`
   - puntua calidad del mensaje y claridad de necesidad

5. `FN-18 Channel Weighting`
   - pondera canal segun calidad historica esperada

6. `FN-19 Dedupe Penalty`
   - penaliza si `possible_duplicate` o `low_quality`

7. `FN-20 Final Lead Score`
   - calcula:
   - `lead_quality_score`
   - `lead_intent_level`
   - `priority_queue`

8. `EXEC-05 Call WF-06 Lead Submission to Backend`

### Rango recomendado

- `0-30` low
- `31-60` medium
- `61-80` high
- `81-100` hot

### Fallback

- si falla el scoring:
  - usar score neutro `50`
  - `lead_intent_level = medium`
  - continuar

## WF-06 Lead Submission to Backend

### Objetivo

Enviar el lead enriquecido al backend manteniendo idempotencia y trazabilidad.

### Nodos

1. `FN-21 Build create-lead Payload`
   - traduce payload canonico al contrato del backend

2. `FN-22 Generate Idempotency Key`
   - hash por `trace_id + phone_normalized + service_slug_candidate + received_at_bucket`

3. `HTTP-01 POST create-lead`
   - endpoint:
   - `/api/create-lead`

4. `IF-07 Backend Response OK`
   - bifurca por:
   - `success`
   - `retryable_error`
   - `hard_error`

5. `FN-23 Response Adapter`
   - normaliza respuesta del backend:
   - `lead_id`
   - `provider_id`
   - `suggested_provider_id`
   - `top_provider_ids`
   - `assignment_mode`
   - `assignment_reason`

6. `EXEC-06 Call WF-07 Operator Approval Orchestration`

### Payload minimo al backend

```json
{
  "name": "Juan Perez",
  "phone": "+56912345678",
  "country": "CL",
  "service_name": "implantes dentales",
  "service_slug": "implantes-dentales",
  "message": "quiero cotizar para esta semana",
  "source_channel": "tiktok",
  "entrypoint_type": "landing_form",
  "lead_quality_score": 78,
  "lead_intent_level": "hot",
  "validation_status": "valid",
  "filter_status": "accepted",
  "dedupe_status": "unique",
  "trace_id": "8b6434c0-8be4-4e7b-9328-31e293c0f5e1"
}
```

### Fallback

- retryable error:
  - 3 reintentos con backoff
- hard error:
  - `DLQ-create-lead`
  - alerta tecnica

## WF-07 Operator Approval Orchestration

### Objetivo

Preparar el lead para revision humana minima.

### Nodos

1. `FN-24 Build Operator Card`
   - resume:
   - servicio
   - score
   - provider sugerido
   - top 3
   - razones

2. `MSG-01 Notify Internal Channel`
   - Telegram, Slack o email operacional

3. `DB-05 Create Review Queue Record`
   - guarda en cola operacional

4. `IF-08 Queue by Priority`
   - `hot_queue`
   - `standard_queue`
   - `low_quality_queue`

5. `EXEC-07 Call WF-10 SLA and Escalation`

### Salida

Lead listo para:

- aprobacion
- cambio de provider
- descarte

## WF-08 Provider Dispatch

### Objetivo

Disparar derivacion al provider una vez confirmada la decision humana.

### Trigger

- webhook desde dashboard al aprobar
- webhook desde dashboard al cambiar provider

### Nodos

1. `TRG-02 Approval Trigger`

2. `FN-25 Normalize Approval Action`
   - `approved_suggested_provider`
   - `manual_provider_change`
   - `discarded`

3. `IF-09 Dispatch Decision`
   - si aprobado o cambiado -> dispatch
   - si descartado -> cierre interno

4. `HTTP-02 Send To Provider Channel`
   - webhook provider
   - email
   - WhatsApp provider
   - CRM externo

5. `FN-26 Dispatch Result Builder`
   - `dispatch_status`
   - `dispatch_channel`
   - `dispatch_attempts`

6. `MSG-02 Notify Internal Confirmation`

7. `EXEC-08 Call WF-09 Feedback Capture`

### Fallback

- si falla dispatch:
  - retry con backoff
  - si agota intentos:
  - alerta critica
  - devolver a cola operativa

## WF-09 Feedback Capture

### Objetivo

Capturar feedback post-derivacion para alimentar analytics y futuro `provider_health_score`.

### Triggers

- webhook del provider
- actualizacion manual del operador
- job programado de seguimiento

### Nodos

1. `TRG-03 Feedback Trigger`

2. `FN-27 Normalize Feedback Payload`
   - estados soportados:
   - `received`
   - `contacted`
   - `no_response`
   - `rejected`
   - `qualified`
   - `converted`
   - `lost`

3. `DB-06 Upsert Feedback Event`

4. `FN-28 Provider Metrics Delta`
   - calcula impacto en metricas derivadas

5. `HTTP-03 Send Feedback to Backend`
   - opcional si el backend consolida analytics

6. `MSG-03 Alert on Critical Feedback`
   - rechazo recurrente
   - no respuesta alta
   - saturacion

### Fallback

- si el provider no responde por webhook:
  - usar workflow programado de seguimiento

## WF-10 SLA and Escalation

### Objetivo

Evitar leads sin tratar y obligar tiempos de respuesta operativos.

### Triggers

- ejecucion desde WF-07
- `Cron` cada pocos minutos para barrer colas abiertas

### Nodos

1. `DB-07 Read Pending Review Queue`

2. `FN-29 SLA Classifier`
   - define SLA segun `priority_queue`

3. `IF-10 SLA Breach Check`
   - dentro de SLA
   - proximo a vencer
   - vencido

4. `MSG-04 Reminder Notification`
   - si esta proximo a vencer

5. `MSG-05 Escalation Notification`
   - si ya vencio

6. `DB-08 Escalation Log`

### SLA sugerido

- `hot_queue`: 5 min
- `standard_queue`: 15 min
- `low_quality_queue`: 60 min

## Estructura recomendada de stores auxiliares

`n8n` necesita stores operativos auxiliares, aunque la verdad principal siga en el backend.

### Tablas o colecciones sugeridas

- `lead_ingest_events`
- `lead_validation_logs`
- `lead_dedupe_events`
- `lead_review_queue`
- `lead_dispatch_events`
- `provider_feedback_events`
- `workflow_dead_letter_queue`
- `workflow_alerts`

## Manejo global de errores

### Categorias

- `retryable`
  - timeouts
  - 5xx
  - rate limits
- `hard_error`
  - payload roto
  - endpoint inexistente
  - auth invalida
- `degraded_mode`
  - servicios auxiliares no disponibles

### Reglas

- retryable -> retry con backoff exponencial
- hard_error -> dead letter queue + alerta
- degraded_mode -> continuar con valores neutros si no compromete reglas criticas

## Dead letter queue

Todo error no resuelto debe terminar en:

- `workflow_dead_letter_queue`

Campos minimos:

- `trace_id`
- `workflow_name`
- `node_name`
- `error_type`
- `payload_snapshot`
- `created_at`

## Observabilidad

Cada workflow debe registrar:

- inicio
- fin
- duracion
- numero de reintentos
- decision final
- warnings

KPIs tecnicos recomendados:

- intake success rate
- validation reject rate
- dedupe detect rate
- create-lead success rate
- operator approval latency
- dispatch success rate
- feedback capture rate

## Seguridad y gobernanza

- no guardar secretos en nodos inline
- usar credenciales administradas por `n8n`
- versionar workflows
- congelar versiones estables antes de cambios mayores
- no dejar transformaciones criticas solo en prompts o AI nodes

## Orden recomendado de implementacion

1. `WF-01 Lead Intake`
2. `WF-02 Lead Validation`
3. `WF-04 Lead Deduplication`
4. `WF-05 Lead Scoring`
5. `WF-06 Lead Submission to Backend`
6. `WF-07 Operator Approval Orchestration`
7. `WF-10 SLA and Escalation`
8. `WF-08 Provider Dispatch`
9. `WF-09 Feedback Capture`

## Criterio de aceptacion del blueprint

El blueprint solo se considera bien implementado si logra esto:

- todos los canales entran por una capa comun
- el backend recibe payloads enriquecidos y mas limpios
- los duplicados dejan de contaminar `leads`
- el operador recibe una sugerencia ya contextualizada
- el dispatch queda trazado
- el feedback vuelve al sistema

## Decision arquitectonica final

`n8n` debe ser la capa de orquestacion automatizada.

No debe convertirse en el lugar donde vive la logica critica del marketplace.

La logica critica debe seguir en el backend para que el sistema siga siendo trazable, testeable y escalable.
