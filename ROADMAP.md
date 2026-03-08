# PRODUCT ROADMAP

Este documento define las fases de desarrollo y evolución del proyecto.

Sirve como guía estratégica para el desarrollo técnico, crecimiento del negocio y expansión de la plataforma.

Debe actualizarse a medida que el proyecto evoluciona.

---

# VISIÓN DEL PRODUCTO

Construir una plataforma capaz de conectar usuarios que buscan servicios con proveedores confiables.

La plataforma debe funcionar como un **motor de generación y distribución de oportunidades (leads)**.

Debe soportar múltiples verticales de servicios, priorizando inicialmente los servicios clínicos debido a su mayor ticket promedio.

---

# CATEGORÍAS PRINCIPALES DE SERVICIOS

El sistema debe soportar múltiples verticales.

Prioridad inicial:

Servicios clínicos

- dermatología
- implantes dentales
- estética
- cirugía
- tratamientos médicos
- turismo médico

Servicios complementarios

- hoteles
- Airbnb
- transporte
- turismo
- compras por mayor
- logística
- otros servicios futuros

La arquitectura debe permitir agregar nuevas categorías sin cambios estructurales grandes.

---

# FASE 1 — FUNDACIÓN DEL SISTEMA

Objetivo: construir la base funcional de la plataforma.

Componentes clave:

captura de leads mediante formularios  
página principal con selección de servicios  
almacenamiento de solicitudes en Supabase  
dashboard básico de gestión  
visualización de leads entrantes  

Funciones mínimas:

crear solicitud  
guardar datos  
mostrar solicitudes  
revisar información del usuario  

Resultado esperado:

plataforma funcional capaz de capturar y gestionar solicitudes.

---

# FASE 2 — GESTIÓN DE LEADS

Objetivo: mejorar el manejo de solicitudes.

Funciones:

estados de leads  
clasificación por categoría  
filtros en dashboard  
asignación manual de proveedores  
visualización por prioridad  

Mejoras en dashboard:

filtrar por categoría  
filtrar por país  
filtrar por estado  
filtrar por proveedor  

Resultado esperado:

sistema claro para gestionar leads manualmente.

---

# FASE 3 — DERIVACIÓN AUTOMÁTICA

Objetivo: automatizar la distribución de solicitudes.

Funciones:

proveedores confiables  
checkbox "automático"  
reglas de derivación automática  
asignación automática de leads  

Ejemplo de lógica:

si proveedor confiable → derivación automática  
si no → revisión manual

Resultado esperado:

reducir intervención manual y acelerar respuesta a usuarios.

---

# FASE 4 — MULTI-CATEGORÍA DE SERVICIOS

Objetivo: ampliar la plataforma a más tipos de servicios.

El sistema debe soportar verticales como:

salud  
turismo  
hospedaje  
transporte  
comercio mayorista  
servicios profesionales  

Cambios esperados:

categorías dinámicas  
formularios adaptables  
dashboard multi-servicio  

Resultado esperado:

plataforma multiservicio.

---

# FASE 5 — OPTIMIZACIÓN DE CONVERSIÓN

Objetivo: mejorar la calidad y rentabilidad de los leads.

Funciones futuras:

lead scoring  
priorización automática  
detección de duplicados  
mejor validación de formularios  
ranking de proveedores  

Métricas a medir:

tasa de conversión  
ticket promedio  
tiempo de respuesta  
leads por categoría  
proveedores con mejor desempeño  

Resultado esperado:

sistema optimizado para generar ingresos.

---

# FASE 6 — AUTOMATIZACIÓN INTELIGENTE

Objetivo: automatizar decisiones dentro del sistema.

Funciones posibles:

asignación inteligente de proveedores  
geolocalización  
prioridad por país  
matching automático de servicios  

Ejemplo:

usuario de Chile + dermatología → proveedor especializado en ese país.

Resultado esperado:

derivación más eficiente.

---

# FASE 7 — ESCALAMIENTO

Objetivo: convertir la plataforma en un marketplace completo de servicios.

Expansiones posibles:

múltiples países  
múltiples monedas  
integración con APIs externas  
integración con CRM  
integración con sistemas de reserva  

Resultado esperado:

plataforma escalable internacionalmente.

---

# MÉTRICAS CLAVE DEL NEGOCIO

El sistema debe permitir medir:

leads generados  
leads derivados  
leads convertidos  
ticket promedio  
ingresos por proveedor  
categorías más rentables  

Estas métricas deben guiar decisiones futuras.

---

# PRINCIPIOS DE DESARROLLO

Durante todas las fases el proyecto debe respetar:

estabilidad del sistema  
cambios mínimos y seguros  
arquitectura clara  
evitar refactors innecesarios  
mantener compatibilidad con la base de datos  

---

# RELACIÓN CON OTROS DOCUMENTOS

Este roadmap debe leerse junto con:

PROJECT_BRAIN.md  
CONTEXT.md  
ARCHITECTURE.md  
SERVICE_ENGINE.md  
LEAD_FLOW.md  

Cada documento cubre un aspecto distinto del proyecto.