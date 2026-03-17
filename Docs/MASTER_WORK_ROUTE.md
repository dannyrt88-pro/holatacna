# MASTER WORK ROUTE

## Documento rector actual

Este documento define la ruta principal de trabajo para la evolucion de HolaTacna.

Su prioridad es superior a los documentos tacticos y debe leerse antes de tomar decisiones de:

- arquitectura
- automatizacion
- routing
- operacion
- roadmap
- analytics
- expansion del marketplace

Si otro documento entra en conflicto con este, este documento prevalece hasta que ambos sean alineados.

## North star del sistema

Convertir HolaTacna en una maquina automatizada de generacion, clasificacion y distribucion de leads.

El operador humano solo debe intervenir para:

- aprobar el provider sugerido
- cambiar el provider final cuando sea necesario

Todo lo demas debe tender a automatizarse.

## Tesis operativa

HolaTacna no debe seguir evolucionando como un simple captador de leads con dashboard.

Debe evolucionar como un sistema de orquestacion comercial con cinco capacidades centrales:

1. captar demanda con alta conversion
2. limpiar y calificar leads automaticamente
3. sugerir el mejor provider con trazabilidad
4. permitir confirmacion humana en un solo paso
5. aprender de la operacion real para mejorar cada ciclo

## Regla de diseno principal

Cada nueva decision del producto debe acercar al sistema a este estado:

```txt
Canal de trafico
  ->
Captura automatizada
  ->
Validacion y deduplicacion
  ->
Lead scoring
  ->
Routing contextual de providers
  ->
Confirmacion humana
  ->
Derivacion
  ->
Feedback
  ->
Mejora continua
```

Si una iniciativa no reduce friccion, no mejora la calidad del lead, no mejora la sugerencia del provider o no aumenta aprendizaje del sistema, no es prioridad alta.

## Arquitectura objetivo

```txt
Traffic Sources
  ->
n8n Intake Layer
  ->
Validation Layer
  ->
Filtering + Deduplication
  ->
Lead Scoring + Initial Classification
  ->
create-lead
  ->
Provider Routing Engine
  ->
Suggested Provider + Top Alternatives
  ->
Operator Approval
  ->
Provider Dispatch
  ->
Feedback Capture
  ->
Analytics + Optimization
```

## Reparto de responsabilidades

### n8n

n8n debe encargarse de:

- intake multicanal
- validacion inicial
- limpieza de payload
- deduplicacion
- clasificacion inicial
- scoring inicial del lead
- colas operativas
- automatizaciones y alertas
- follow-ups operativos

### Backend

El backend debe encargarse de:

- logica central del producto
- routing de providers
- persistencia principal
- trazabilidad
- reglas criticas del negocio
- analytics estructural
- explicacion auditable de decisiones

### Operacion humana

La operacion humana debe reducirse a:

- aprobar el provider sugerido
- cambiarlo por una alternativa
- descartar un lead claramente invalido o fuera de cobertura

## Orden de prioridades

La prioridad estrategica del proyecto queda asi:

### Prioridad 1. Intake industrializado

- unificar todas las entradas
- normalizar payloads
- validar antes de persistir
- deduplicar antes de ensuciar `leads`

### Prioridad 2. Calidad del lead

- clasificacion automatica
- `lead_quality_score`
- deteccion de spam o duplicados
- colas por prioridad

### Prioridad 3. Routing contextual

- mejorar elegibilidad
- mejorar ranking hibrido
- incorporar contexto de servicio, ciudad, canal y urgencia
- devolver top alternativas explicables

### Prioridad 4. Feedback loop

- medir respuesta del provider
- medir contacto real
- medir conversion
- medir rechazos y tiempos

### Prioridad 5. Automatizacion operativa

- alertas
- SLA
- escalados
- dispatch asistido

### Prioridad 6. Expansion del marketplace

- nuevas categorias
- nuevas ciudades
- nuevas fuentes de trafico
- mayor densidad de providers

## Requisitos obligatorios de producto

Toda iniciativa nueva debe responder positivamente a la mayor cantidad posible de estas preguntas:

1. reduce friccion del usuario
2. aumenta conversion
3. mejora calidad del lead
4. mejora trazabilidad
5. mejora precision del routing
6. reduce trabajo manual del operador
7. aumenta capacidad de escalar a mas leads y providers

Si no mejora al menos uno de esos puntos, no debe competir por prioridad con esta ruta.

## Sistema objetivo de scores

El sistema debe converger a dos scores separados:

### `lead_quality_score`

Debe medir:

- completitud
- claridad del servicio
- urgencia
- canal
- intencion explicita
- contexto comercial
- historial de duplicados

### `provider_health_score`

Debe medir:

- conversion de leads
- velocidad de respuesta
- calidad del servicio
- confiabilidad operativa
- necesidad de override manual

El routing futuro debe combinar ambos scores sin perder explicabilidad.

## Regla de evolucion del routing

El motor de routing no debe evolucionar hacia opacidad.

Debe evolucionar hacia:

- mayor contexto
- mejor ranking
- mas trazabilidad
- mas top alternatives
- mejores metricas observadas

Nunca hacia:

- decisiones no explicables
- automatizacion sin feedback
- dependencia de un solo booleano

## Principios operativos

- el operador no debe limpiar leads
- el operador no debe clasificar leads
- el operador no debe deduplicar leads
- el operador no debe interpretar manualmente cada caso
- el operador debe validar una sugerencia ya preparada por el sistema

## Workstreams oficiales

Los workstreams oficiales del proyecto quedan definidos asi:

1. Traffic and Funnel Optimization
2. Lead Intake Automation
3. Lead Validation and Deduplication
4. Lead Scoring
5. Provider Routing Optimization
6. Provider Performance Scoring
7. Operator Approval Experience
8. Feedback and Analytics Loop
9. Marketplace Expansion

Documento tecnico rector del workstream de automatizacion:

- `Docs/N8N_WORKFLOW_BLUEPRINT.md`
  - blueprint tecnico completo de workflows `n8n` nodo por nodo

## Roadmap ejecutivo

### Fase 1. Intake unificado con n8n

- capturar todos los canales en una sola capa
- definir payload canonico
- validar y limpiar antes de `create-lead`

### Fase 2. Lead quality engine

- scoring inicial
- deteccion de duplicados
- filtros de calidad
- colas operativas

### Fase 3. Routing engine 2.0

- contextualizar ranking
- agregar top 3 providers
- explicar mejor la sugerencia

### Fase 4. Feedback loop de providers

- contacto
- respuesta
- conversion
- rechazo
- calidad del servicio

### Fase 5. Dispatch asistido y SLA

- aprobacion en un clic
- escalado automatico
- seguimiento de leads no tratados

### Fase 6. Marketplace intelligence

- cobertura por servicio y ciudad
- gaps de oferta
- performance por canal
- expansion guiada por demanda real

## Regla documental

Este documento debe ser tratado como la ruta de trabajo principal del proyecto.

Por lo tanto:

- `Docs/ROADMAP.md` debe leerse como roadmap subordinado
- los demas documentos deben alinearse con esta direccion
- cualquier cambio de norte estrategico debe reflejarse primero aqui

## Decision ejecutiva

HolaTacna no debe optimizarse para que el operador trabaje mas rapido.

Debe optimizarse para que el operador piense menos.

Ese es el criterio rector de arquitectura, operaciones y producto.
