# AI AGENT PLAYBOOK
Manual de operación para agentes de inteligencia artificial dentro del proyecto.

Este documento define cómo deben trabajar agentes de IA como Codex o asistentes técnicos al analizar, modificar o crear código en este repositorio.

Su objetivo es permitir desarrollo asistido por IA sin comprometer la arquitectura, la lógica del negocio o la estabilidad del sistema.

---

# PROPÓSITO DEL PLAYBOOK

Este repositorio está diseñado para ser desarrollado parcialmente con ayuda de IA.

Los agentes deben comportarse como miembros disciplinados del equipo técnico.

Esto significa que deben:

- entender el negocio
- entender la arquitectura
- entender el flujo de leads
- modificar código de forma segura
- evitar cambios impulsivos o destructivos

---

# DOCUMENTOS QUE LOS AGENTES DEBEN LEER SIEMPRE

Antes de analizar el código, los agentes deben leer:

PROJECT_BRAIN.md  
CONTEXT.md  
ARCHITECTURE.md  
SERVICE_ENGINE.md  
LEAD_FLOW.md  
ROADMAP.md  
CODEX_RULES.md  
SYSTEM_FEATURES_AND_DB.md  

Estos documentos contienen el contexto funcional, estratégico y técnico del proyecto.

El código por sí solo no refleja toda la intención del sistema.

---

# PRINCIPIO CENTRAL DE TRABAJO

Todo agente debe seguir este flujo:

1. entender el contexto del problema
2. analizar el módulo afectado
3. identificar la causa raíz
4. evaluar impacto del cambio
5. aplicar la solución mínima segura
6. explicar claramente qué cambió

Nunca comenzar modificando archivos sin diagnóstico previo.

---

# MODOS DE OPERACIÓN DE LOS AGENTES

Los agentes deben poder trabajar en distintos modos.

---

# MODO ANÁLISIS

Usar cuando:

- se investiga un bug
- se analiza arquitectura
- se revisa rendimiento
- se audita código

En este modo el agente debe:

- analizar módulos
- identificar riesgos
- explicar el problema
- NO modificar código todavía

Salida esperada:

diagnóstico técnico claro.

---

# MODO IMPLEMENTACIÓN

Usar cuando ya existe diagnóstico.

El agente debe:

- modificar el mínimo número de archivos
- respetar arquitectura existente
- mantener compatibilidad con base de datos
- evitar duplicar lógica
- escribir código limpio

Debe explicar cada cambio.

---

# MODO AUDITORÍA

Usar para revisar calidad del proyecto.

El agente debe buscar:

- bugs ocultos
- problemas de integración
- queries defectuosas
- errores de tipado
- duplicación de lógica
- dependencias innecesarias
- problemas de estado en UI

No debe modificar código en este modo.

---

# MODO CONSTRUCTOR DE FEATURES

Cuando se solicite una nueva funcionalidad, el agente debe:

1. entender el objetivo del negocio
2. revisar dónde encaja en la arquitectura
3. identificar archivos involucrados
4. proponer solución limpia
5. implementar
6. explicar cómo probar

Debe evitar introducir complejidad innecesaria.

---

# REGLAS PARA TRABAJAR CON LEADS

El flujo de leads es el núcleo del negocio.

Antes de modificar cualquier parte del sistema de leads, el agente debe revisar:

- LEAD_FLOW.md
- SERVICE_ENGINE.md

Debe verificar que el cambio no rompa:

captura de leads  
clasificación  
derivación manual  
derivación automática  
dashboard  

---

# REGLAS PARA SERVICIOS MULTICATEGORÍA

La plataforma es multiservicio.

Puede manejar:

servicios clínicos  
tratamientos estéticos  
implantes  
dermatología  
hoteles  
Airbnb  
transporte  
compras por mayor  
turismo  
otros servicios

Sin embargo, los servicios clínicos tienen prioridad por su mayor ticket promedio.

Los agentes deben mantener la arquitectura abierta para nuevas verticales.

---

# REGLAS PARA SUPABASE

Al trabajar con Supabase, los agentes deben validar:

- UUID correctos
- relaciones entre tablas
- inserts correctos
- updates correctos
- selects con campos necesarios
- manejo de errores

Errores comunes a evitar:

invalid input syntax for type uuid  
payloads incompletos  
campos incorrectos  

---

# REGLAS PARA FORMULARIOS

Los formularios son el punto de entrada del lead.

Cada vez que se modifiquen formularios, el agente debe revisar:

onSubmit  
validaciones  
payload enviado  
persistencia en base de datos  
respuesta del backend  

Debe revisar el flujo completo:

UI → lógica → base de datos.

---

# REGLAS PARA DASHBOARD

El dashboard es el centro de control del sistema.

Los agentes deben asegurar que cualquier cambio preserve:

visualización de leads  
filtros  
estados  
proveedores  
automatización  

Columnas críticas:

proveedor  
servicio  
categoría  
estado  
automático  
fecha  

---

# REGLAS PARA AUTOMATIZACIÓN

La automatización permite escalar la plataforma.

Regla principal:

si existe provider elegible y autoasignable con mejor ranking  
-> `assignment_mode = auto_assigned`

si existen providers elegibles pero ninguno autoasignable  
-> `assignment_mode = pending_review`

si no existe provider compatible  
-> `assignment_mode = no_eligible_provider`

Los agentes no deben romper este flujo ni la trazabilidad entre provider sugerido y provider final.

---

# FORMATO DE RESPUESTA PARA CAMBIOS

Cada implementación debe explicarse así:

Diagnóstico  
Causa raíz  
Solución  
Archivos modificados  
Riesgos o impacto  
Cómo probar  

Esto permite trazabilidad técnica.

---

# SEGURIDAD DEL REPOSITORIO

Los agentes no deben:

eliminar archivos críticos  
cambiar configuración sensible  
alterar estructura de base de datos sin indicarlo  
introducir dependencias innecesarias  

Si un cambio requiere migración de base de datos, debe indicarse claramente.

---

# OBJETIVO FINAL

Los agentes deben ayudar a evolucionar este proyecto hacia:

una plataforma escalable de captación y distribución de servicios.

Capaz de:

gestionar múltiples verticales  
automatizar derivación de leads  
conectar proveedores con usuarios  
operar en múltiples países  

Los agentes no solo deben entender el código.

Deben entender el negocio.
