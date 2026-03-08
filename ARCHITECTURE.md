# SYSTEM ARCHITECTURE

Este documento describe la arquitectura técnica del proyecto y cómo están organizados los componentes del sistema.

Debe leerse antes de realizar cambios estructurales importantes.

---

# PROPÓSITO DEL SISTEMA

La plataforma conecta usuarios que buscan servicios con proveedores confiables.

Los servicios pueden ser de distintos tipos, incluyendo:

PRIORIDAD ALTA (mayor ticket promedio)

- servicios médicos
- tratamientos estéticos
- implantes dentales
- dermatología
- otros tratamientos médicos

OTROS SERVICIOS SOPORTADOS

- hoteles
- Airbnb
- transporte
- compras por mayor
- turismo médico
- logística
- cualquier servicio futuro que se agregue

La arquitectura debe permitir que el sistema escale fácilmente a nuevas categorías de servicios.

---

# PRINCIPIOS DE ARQUITECTURA

El sistema sigue estos principios:

1. Modularidad
2. Escalabilidad
3. Separación de responsabilidades
4. Mínimo acoplamiento
5. Integraciones simples
6. Evitar lógica duplicada
7. Código fácil de mantener

---

# STACK TECNOLÓGICO

Frontend:

- Next.js
- React
- TypeScript

Backend / Base de datos:

- Supabase
- PostgreSQL

Funciones del backend:

- almacenamiento de solicitudes
- gestión de proveedores
- control de estados
- automatización de derivaciones

---

# ESTRUCTURA GENERAL DEL PROYECTO

Ejemplo de estructura esperada:



Descripción:

app → páginas principales del sistema  
components → componentes reutilizables  
lib → utilidades y helpers  
services → integración con APIs o Supabase  
dashboard → interfaz de administración  
types → definiciones TypeScript

---

# PÁGINA PRINCIPAL

Archivo clave:



Funciones principales:

- mostrar categorías de servicios
- permitir seleccionar especialidad o servicio
- dirigir al formulario correspondiente

Cada servicio debe poder agregarse sin romper la estructura existente.

---

# SISTEMA DE CATEGORÍAS

El sistema no debe depender de categorías rígidas.

Debe soportar:

- categorías actuales
- nuevas categorías
- subcategorías

Ejemplo:

Servicios médicos  
→ dermatología  
→ implantes  
→ cirugía estética

Turismo  
→ hoteles  
→ Airbnb

Logística  
→ transporte  
→ compras mayoristas

---

# SISTEMA DE FORMULARIOS

Cada servicio puede tener su propio formulario.

Pero el sistema debe compartir una base común.

Flujo:

usuario selecciona servicio  
→ se carga formulario  
→ se validan datos  
→ se envían a Supabase  
→ se crea solicitud

Los formularios deben capturar:

- nombre
- teléfono
- país
- servicio solicitado
- descripción
- fecha

Campos adicionales pueden agregarse según servicio.

---

# BASE DE DATOS

Supabase gestiona:

pacientes / clientes  
proveedores  
solicitudes  
estados  
automatización

Relaciones importantes:

solicitud → servicio  
solicitud → proveedor  
solicitud → estado

Reglas críticas:

usar UUID válidos  
no enviar slugs en campos UUID  
validar inserciones correctamente

---

# DASHBOARD ADMINISTRATIVO

El dashboard permite gestionar solicitudes.

Funciones principales:

ver solicitudes  
revisar información  
derivar a proveedores  
activar automatización

Columnas comunes:

proveedor  
servicio  
estado  
automático  
fecha

---

# DERIVACIÓN DE SOLICITUDES

Existen dos modos.

Modo manual

la solicitud aparece en el dashboard  
un operador decide a qué proveedor enviarla

Modo automático

si el proveedor está marcado como confiable  
el sistema deriva automáticamente

Esto se controla mediante un checkbox "Automático".

---

# SISTEMA MULTISERVICIO

La plataforma está diseñada para soportar múltiples tipos de servicios.

Ejemplos de categorías futuras:

- salud
- turismo
- transporte
- comercio mayorista
- servicios profesionales

La arquitectura debe permitir agregar nuevos servicios sin modificar el núcleo del sistema.

---

# MONEDA

La moneda principal del sistema es:

PEN (soles peruanos)

Puede mostrarse conversión referencial para usuarios extranjeros.

Ejemplo:

CLP para pacientes chilenos.

---

# ERRORES TÉCNICOS CONOCIDOS

Errores que deben evitarse:

invalid input syntax for type uuid  
formularios que no envían submit  
rutas incorrectas de especialidades  
errores en app/page.tsx  
problemas de integración con Supabase

---

# REGLAS PARA AGENTES DE IA

Antes de modificar código:

1. entender la arquitectura
2. identificar causa raíz
3. modificar el mínimo posible
4. no romper funcionalidades existentes

Siempre explicar:

diagnóstico  
causa raíz  
archivos modificados  
cómo probar cambios

---

# EVOLUCIÓN FUTURA

La plataforma evolucionará hacia:

1. marketplace de servicios
2. derivación inteligente
3. automatización avanzada
4. integración con múltiples proveedores
5. expansión internacional


