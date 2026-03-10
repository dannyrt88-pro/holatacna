# SERVICE ENGINE
Motor de gestión y derivación de servicios

Este documento describe la lógica central del sistema que conecta solicitudes de usuarios con proveedores de servicios.

Debe ser considerado la referencia principal para implementar lógica de negocio relacionada con solicitudes, servicios y derivaciones.

---

# PROPÓSITO DEL SERVICE ENGINE

El Service Engine es el núcleo del sistema.

Su función es:

1. recibir solicitudes de usuarios
2. clasificar el tipo de servicio solicitado
3. registrar la solicitud en el sistema
4. determinar si la solicitud se gestiona manualmente o automáticamente
5. derivarla a un proveedor adecuado

---

# TIPOS DE SERVICIOS

La plataforma es **multiservicio**.

Debe soportar múltiples categorías.

Servicios de prioridad alta (mayor ticket promedio):

- tratamientos médicos
- dermatología
- implantes dentales
- cirugía estética
- turismo médico

Otros servicios soportados:

- hoteles
- Airbnb
- transporte
- compras por mayor
- logística
- turismo
- servicios profesionales
- cualquier servicio que se agregue en el futuro

El sistema debe poder escalar a nuevos servicios sin cambios estructurales.

---

# FLUJO DEL SERVICE ENGINE

Flujo completo del sistema:

1. usuario entra a la plataforma
2. selecciona un servicio
3. completa un formulario
4. el sistema valida los datos
5. se crea una solicitud
6. la solicitud se guarda en Supabase
7. el Service Engine decide el modo de gestión
8. se deriva manualmente o automáticamente

---

# ESTRUCTURA DE UNA SOLICITUD

Una solicitud representa una intención de contratar un servicio.

Campos típicos:

- id (UUID)
- nombre
- teléfono
- país
- servicio
- descripción
- estado
- proveedor asignado
- fecha de creación

---

# ESTADOS DE SOLICITUD

Las solicitudes pueden tener estados como:

nuevo  
en revisión  
asignado  
derivado  
completado  
cancelado

Estos estados permiten gestionar el flujo dentro del dashboard.

---

# PROVEEDORES

Los proveedores son empresas o profesionales que ofrecen servicios.

Ejemplos:

clínicas  
consultorios  
hoteles  
transportistas  
distribuidores mayoristas

Cada proveedor puede tener atributos como:

- id
- nombre
- servicio que ofrece
- ubicación
- estado
- confiable (boolean)

---

# MODO DE DERIVACIÓN

El sistema tiene dos modos.

---

## DERIVACIÓN MANUAL

La solicitud aparece en el dashboard.

Un operador humano revisa la información y decide a qué proveedor derivarla.

Esto permite control total sobre cada solicitud.

---

## DERIVACIÓN AUTOMÁTICA

Si el proveedor está marcado como confiable:

- el sistema puede asignar automáticamente la solicitud
- no requiere intervención humana

Esto se controla mediante un campo booleano:

`automatico`

---

# LÓGICA DE DERIVACIÓN

El Service Engine debe seguir esta lógica:

si proveedor automatico = true  
→ derivación automática

si proveedor automatico = false  
→ revisión manual en dashboard

En el futuro esta lógica puede evolucionar a:

- ranking de proveedores
- geolocalización
- disponibilidad
- prioridad de servicio

---

# DASHBOARD

El dashboard es la interfaz de control del sistema.

Debe permitir:

ver solicitudes  
filtrar solicitudes  
asignar proveedores  
activar automatización  
cambiar estados

Columnas recomendadas:

proveedor  
servicio  
estado  
automático  
fecha

---

# AUTOMATIZACIÓN FUTURA

El Service Engine debe poder evolucionar a:

- asignación inteligente de proveedores
- priorización por calidad
- distribución automática de leads
- integración con APIs externas
- scoring de proveedores

---

# REGLAS TÉCNICAS IMPORTANTES

Los agentes que modifiquen el código deben respetar estas reglas:

1. identificar la causa raíz antes de modificar código
2. modificar el mínimo número de archivos
3. no romper funcionalidades existentes
4. validar integraciones con Supabase
5. usar UUID correctamente

---

# ERRORES COMUNES

Errores detectados anteriormente:

invalid input syntax for type uuid  
formularios que no envían submit  
problemas en rutas de servicios  
componentes que no cargan correctamente  
inserciones incorrectas en Supabase

El sistema debe validar estos casos.

---

# VISIÓN A FUTURO

El Service Engine evolucionará hacia un sistema completo de:

Marketplace de servicios.

Capaz de:

gestionar múltiples categorías  
derivar solicitudes automáticamente  
integrar proveedores de distintos sectores  
operar en múltiples países