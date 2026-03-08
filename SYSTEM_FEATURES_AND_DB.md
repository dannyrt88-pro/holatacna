# SYSTEM FEATURES AND DATABASE STRUCTURE

Este documento combina:

- descripción de funcionalidades del sistema
- estructura conceptual de la base de datos
- relación entre módulos del sistema
- evolución futura de features

Debe leerse junto con:

PROJECT_BRAIN.md  
ARCHITECTURE.md  
SERVICE_ENGINE.md  
LEAD_FLOW.md  
ROADMAP.md  
CODEX_RULES.md  

Este documento sirve como referencia para cualquier agente de IA o desarrollador que necesite entender cómo se conectan las funcionalidades del sistema con la base de datos.

---

# PROPÓSITO DEL SISTEMA

La plataforma es un **motor de captación, gestión y derivación de oportunidades (leads)** para múltiples categorías de servicios.

Aunque soporta múltiples verticales, se da prioridad inicial a:

- servicios clínicos
- tratamientos estéticos
- implantes
- dermatología
- turismo médico

También soporta:

- hoteles
- Airbnb
- transporte
- compras por mayor
- turismo
- logística
- otros servicios futuros

La arquitectura debe permitir agregar nuevas categorías sin modificar el núcleo del sistema.

---

# MÓDULOS PRINCIPALES DEL SISTEMA

El sistema se compone de varios módulos funcionales.

---

# 1 CAPTURA DE LEADS

Responsabilidad:

Capturar solicitudes de usuarios.

Origen del lead:

- formulario web
- landing page
- campaña publicitaria
- referencia externa
- integración futura con APIs

Campos básicos:

- nombre
- teléfono
- país
- servicio solicitado
- categoría
- descripción
- fecha

Resultado:

Creación de una solicitud en la base de datos.

---

# 2 CLASIFICACIÓN DE SERVICIOS

El sistema debe clasificar cada solicitud.

Estructura conceptual:

Categoría  
→ Subcategoría  
→ Servicio

Ejemplo:

Salud  
→ Dermatología  
→ Tratamiento de piel

Salud  
→ Implantes dentales  
→ Implantes unitarios

Turismo  
→ Hoteles  
→ Reserva de hospedaje

Logística  
→ Transporte  
→ Traslado aeropuerto

Esta estructura debe poder crecer dinámicamente.

---

# 3 GESTIÓN DE LEADS

Después de capturarse, los leads pasan por distintas etapas.

Estados posibles:

nuevo  
validado  
en revisión  
asignado  
derivado  
contactado  
convertido  
descartado  
cancelado  

Estos estados deben almacenarse en la base de datos.

---

# 4 DASHBOARD ADMINISTRATIVO

El dashboard permite operar el sistema.

Funciones principales:

ver leads entrantes  
filtrar por categoría  
filtrar por estado  
filtrar por país  
asignar proveedores  
activar modo automático  
cambiar estados  

Columnas recomendadas:

nombre  
servicio  
categoría  
proveedor  
estado  
automático  
fecha  

---

# 5 GESTIÓN DE PROVEEDORES

Los proveedores son empresas o profesionales que atienden los leads.

Ejemplos:

clínicas  
consultorios  
hoteles  
transportistas  
distribuidores  
agencias  

Cada proveedor debe tener atributos como:

id  
nombre  
categoría de servicio  
ubicación  
estado  
automatico (boolean)

---

# 6 DERIVACIÓN DE SOLICITUDES

El sistema debe decidir cómo manejar cada lead.

Modo manual:

el lead aparece en el dashboard  
un operador lo revisa y asigna proveedor

Modo automático:

si proveedor automatico = true  
el sistema puede derivar automáticamente

Esto permite escalar el sistema sin intervención humana constante.

---

# 7 TRAZABILIDAD DEL LEAD

Cada lead debe ser completamente rastreable.

Debe registrarse:

origen del lead  
fecha de entrada  
servicio solicitado  
proveedor asignado  
estado actual  
resultado final  

Esto permite medir rendimiento del sistema.

---

# MODELO CONCEPTUAL DE BASE DE DATOS

El sistema se basa en varias entidades principales.

---

# TABLA: LEADS

Representa una solicitud de servicio.

Campos conceptuales:

id (UUID)  
nombre  
telefono  
pais  
categoria  
servicio  
descripcion  
estado  
proveedor_id  
origen  
automatico  
fecha_creacion  

---

# TABLA: SERVICIOS

Define los servicios disponibles.

Campos conceptuales:

id  
nombre  
categoria_id  
descripcion  
activo  

Ejemplo:

dermatologia  
implantes  
hotel  
transporte  

---

# TABLA: CATEGORIAS

Agrupa servicios.

Campos conceptuales:

id  
nombre  
descripcion  

Ejemplo:

salud  
turismo  
logistica  
comercio  

---

# TABLA: PROVEEDORES

Define empresas o profesionales que reciben leads.

Campos conceptuales:

id  
nombre  
categoria_servicio  
ubicacion  
automatico  
activo  
fecha_creacion  

---

# TABLA: ESTADOS_LEAD

Define los estados posibles del lead.

Campos conceptuales:

id  
nombre_estado  

Ejemplo:

nuevo  
en_revision  
derivado  
convertido  
cancelado  

---

# RELACIONES PRINCIPALES

lead → servicio  
lead → proveedor  
lead → estado  

servicio → categoria  

proveedor → categoria_servicio  

---

# REGLAS IMPORTANTES DE BASE DE DATOS

Siempre usar UUID para relaciones principales.

Nunca enviar slugs en campos que esperan UUID.

Validar siempre:

- inserts
- updates
- relaciones entre tablas

Errores conocidos a evitar:

invalid input syntax for type uuid

---

# FEATURES ACTUALES DEL SISTEMA

Las funcionalidades actuales incluyen:

captura de leads  
formularios por servicio  
almacenamiento en Supabase  
dashboard de gestión  
gestión manual de solicitudes  
clasificación por categoría  

---

# FEATURES EN DESARROLLO

Funciones que están en proceso o en implementación.

derivación automática  
checkbox automático en dashboard  
mejor clasificación de servicios  
mejor visualización de leads  

---

# FEATURES FUTURAS

Funciones previstas en roadmap.

lead scoring  
ranking de proveedores  
geolocalización  
priorización automática  
matching inteligente proveedor-cliente  
automatización avanzada  

---

# MÉTRICAS QUE EL SISTEMA DEBERÁ MEDIR

leads generados  
leads derivados  
leads convertidos  
ingresos por categoría  
proveedores más eficientes  
tiempo promedio de respuesta  
ticket promedio  

---

# ESCALABILIDAD DEL SISTEMA

El sistema debe poder crecer hacia:

marketplace de servicios  
automatización avanzada  
múltiples países  
múltiples monedas  
integraciones con CRMs  
integraciones con sistemas externos  

---

# REGLAS PARA AGENTES DE IA

Antes de modificar código relacionado con base de datos:

1 entender entidades involucradas  
2 revisar relaciones existentes  
3 validar impacto en dashboard  
4 validar impacto en automatización  
5 aplicar cambios mínimos seguros  

Siempre explicar:

diagnóstico  
causa raíz  
archivos modificados  
impacto del cambio  
cómo probar