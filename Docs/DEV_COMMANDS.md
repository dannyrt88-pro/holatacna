# DEV COMMANDS
Biblioteca de comandos y prompts para trabajar con agentes de IA en este proyecto.

Este archivo contiene instrucciones estándar que pueden enviarse a Codex u otros agentes para ejecutar tareas comunes de desarrollo.

Debe utilizarse junto con:

PROJECT_BRAIN.md  
CONTEXT.md  
ARCHITECTURE.md  
SERVICE_ENGINE.md  
LEAD_FLOW.md  
ROADMAP.md  
CODEX_RULES.md  
SYSTEM_FEATURES_AND_DB.md  
AI_AGENT_PLAYBOOK.md  

Todos los comandos asumen que el agente ha leído esos documentos primero.

---

# COMANDO BASE (SIEMPRE USAR PRIMERO)

Antes de cualquier tarea compleja:

Lee PROJECT_BRAIN.md, CONTEXT.md, ARCHITECTURE.md, SERVICE_ENGINE.md, LEAD_FLOW.md, ROADMAP.md, CODEX_RULES.md, SYSTEM_FEATURES_AND_DB.md y AI_AGENT_PLAYBOOK.md antes de analizar el proyecto. Trabaja como desarrollador senior. Antes de modificar cualquier archivo identifica la causa raíz del problema y aplica la solución mínima segura.

---

# COMANDOS DE ANÁLISIS

## Auditar todo el proyecto

Analiza todo el proyecto abierto en esta carpeta.

Identifica:

- arquitectura actual
- flujo de leads
- flujo de formularios
- integración con Supabase
- módulos principales
- puntos frágiles
- posibles bugs ocultos

No modifiques código todavía. Entrega solo el diagnóstico técnico.

---

## Encontrar bugs ocultos

Audita el proyecto completo en busca de bugs potenciales.

Revisa especialmente:

- formularios
- envíos de datos
- integración con Supabase
- manejo de UUID
- rutas en app/page.tsx
- estados del dashboard
- derivación automática vs manual

Entrega una lista priorizada de problemas posibles.

---

## Analizar rendimiento

Analiza el rendimiento del proyecto.

Identifica:

- renders innecesarios
- queries duplicadas
- componentes pesados
- consultas repetidas a Supabase

Propón mejoras sin modificar código todavía.

---

# COMANDOS PARA BUGS

## Arreglar un bug

Investiga el siguiente problema en el proyecto.

Antes de modificar código:

1. identifica la causa raíz
2. enumera los archivos involucrados
3. explica por qué ocurre el problema

Luego aplica la solución mínima segura.

Explica:

- diagnóstico
- causa raíz
- archivos modificados
- cómo probar el fix.

---

## Revisar un formulario que no envía datos

Revisa por qué este formulario no envía datos correctamente.

Analiza:

- onSubmit
- validaciones
- payload enviado
- llamada a Supabase
- manejo de errores

Encuentra la causa raíz y corrígela sin romper otros formularios.

---

# COMANDOS PARA BASE DE DATOS

## Auditar integración con Supabase

Audita toda la integración con Supabase.

Revisa:

- inserts
- updates
- selects
- relaciones entre tablas
- uso de UUID

Identifica posibles errores o malas prácticas.

No modifiques código todavía.

---

## Revisar errores de UUID

Revisa todas las consultas a Supabase donde se envían IDs.

Asegúrate de que:

- se utilicen UUID válidos
- no se envíen slugs en campos UUID
- las relaciones estén bien definidas

Corrige donde sea necesario.

---

# COMANDOS PARA FEATURES

## Crear una nueva funcionalidad

Quiero implementar la siguiente funcionalidad.

Antes de programar:

1. analiza dónde encaja en la arquitectura
2. identifica archivos involucrados
3. propone la solución más limpia

Luego implementa manteniendo compatibilidad con el sistema actual.

---

## Crear nuevo servicio o categoría

Agrega soporte para una nueva categoría de servicio.

Debe integrarse con:

- captura de leads
- formularios
- base de datos
- dashboard
- derivación automática/manual

No rompas servicios existentes.

---

# COMANDOS PARA DASHBOARD

## Mejorar dashboard

Refactoriza el dashboard para mejorar claridad y organización.

Mantén:

- visualización de leads
- filtros
- columnas principales
- lógica manual/automática

No cambies funcionalidad actual.

---

## Agregar columna al dashboard

Agrega una nueva columna al dashboard.

Debe:

- mostrarse correctamente
- integrarse con los datos existentes
- actualizarse en tiempo real

No rompas filtros ni estados existentes.

---

# COMANDOS PARA AUTOMATIZACIÓN

## Implementar derivación automática

Implementa lógica de derivación automática.

Reglas:

si existe provider elegible y autoasignable con mejor ranking  
-> autoasignar

si hay providers elegibles pero no autoasignables  
-> `pending_review`

si no hay providers compatibles  
-> `no_eligible_provider`

Asegúrate de que el cambio se refleje en el dashboard.

---

# COMANDOS PARA REFACTORIZACIÓN

## Refactorizar módulo

Refactoriza este módulo para mejorar legibilidad y mantenimiento.

Reglas:

- no cambiar comportamiento
- no romper dependencias
- mantener compatibilidad con base de datos
- mantener integración con el resto del sistema

Explica qué cambió.

---

# COMANDOS DE ESCALAMIENTO

## Preparar sistema para nuevas categorías

Analiza el proyecto y asegúrate de que la arquitectura soporte nuevas categorías de servicios.

Si detectas partes rígidas, sugiere mejoras para permitir:

- nuevas verticales
- nuevos formularios
- nuevos proveedores

No implementes cambios todavía.

---

# COMANDO DE VALIDACIÓN FINAL

Después de implementar cambios importantes:

Revisa el proyecto completo para detectar posibles efectos secundarios del cambio.

Verifica:

- formularios
- dashboard
- base de datos
- derivación automática
- estados de leads

Reporta cualquier problema detectado.

---

# PRINCIPIO GENERAL

Cada comando debe producir siempre esta estructura de respuesta:

Diagnóstico  
Causa raíz  
Solución  
Archivos modificados  
Riesgos  
Cómo probar
