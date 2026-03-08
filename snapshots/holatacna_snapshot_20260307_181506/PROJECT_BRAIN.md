# PROJECT BRAIN
Cerebro central del proyecto

Este documento define la visión, arquitectura y reglas técnicas de la plataforma.
Debe leerse antes de modificar el código o agregar funcionalidades.

---

# VISIÓN DEL PROYECTO

Construir una plataforma digital que conecte pacientes con clínicas o proveedores médicos.

La plataforma permite:

- capturar solicitudes de pacientes
- gestionarlas desde un dashboard
- derivarlas manualmente o automáticamente a clínicas
- escalar a múltiples especialidades

El objetivo final es crear un sistema eficiente de generación y distribución de pacientes para clínicas.

---

# PROBLEMA QUE RESUELVE

Muchos pacientes buscan tratamientos médicos o estéticos pero no saben a qué clínica acudir.

Las clínicas necesitan pacientes pero no tienen sistemas eficientes de captación.

La plataforma actúa como intermediario inteligente.

---

# MODELO DE NEGOCIO

La plataforma captura solicitudes de pacientes y las deriva a clínicas.

El modelo puede incluir:

- comisión por paciente derivado
- pago por lead
- acuerdos con clínicas confiables

El sistema debe permitir gestionar estas derivaciones eficientemente.

---

# FLUJO PRINCIPAL DEL SISTEMA

Flujo completo:

1. paciente entra al sitio
2. selecciona una especialidad
3. completa un formulario
4. datos se envían al backend
5. se guardan en Supabase
6. la solicitud aparece en el dashboard
7. puede derivarse manualmente o automáticamente

---

# ESPECIALIDADES

Las especialidades se muestran en la página principal:

`app/page.tsx`

Ejemplos actuales:

- dermatología
- estética
- implantes dentales

Cada especialidad puede tener su propio formulario.

---

# FORMULARIOS

Los formularios deben:

- capturar datos del paciente
- validar información
- enviar datos al backend
- crear un registro en Supabase

Campos típicos:

- nombre
- teléfono
- país
- especialidad
- descripción
- fecha

---

# BASE DE DATOS

La base de datos usa **Supabase (PostgreSQL)**.

Se utiliza para:

- almacenar pacientes
- almacenar clínicas
- almacenar solicitudes
- gestionar estados
- controlar automatización

Reglas importantes:

- usar UUID correctamente
- no enviar slugs donde se esperan UUID
- validar inserts y updates

---

# DASHBOARD

El dashboard es la herramienta principal de gestión.

Debe permitir:

- ver solicitudes
- revisar datos del paciente
- derivar pacientes
- activar automatización

Columnas típicas:

- clínica
- especialidad
- estado
- automático
- fecha

---

# DERIVACIÓN DE PACIENTES

El sistema tiene dos modos:

## Manual

La solicitud aparece en el dashboard.

Un operador decide a qué clínica derivarla.

---

## Automático

Si una clínica está marcada como confiable:

- el sistema deriva automáticamente
- no requiere intervención humana

Esto se controla con un checkbox:

`Automático`

---

# MONEDA

La plataforma trabaja principalmente con:

PEN (soles peruanos)

Para pacientes chilenos se puede mostrar conversión referencial en:

CLP

---

# PRINCIPIOS TÉCNICOS

El proyecto debe seguir estos principios:

- estabilidad primero
- cambios mínimos
- arquitectura simple
- evitar romper funcionalidades existentes
- mantener consistencia del código
- identificar causa raíz antes de aplicar fixes

---

# ERRORES COMUNES A EVITAR

Errores detectados anteriormente:

- invalid input syntax for type uuid
- formularios que no envían submit
- rutas incorrectas de especialidades
- problemas en app/page.tsx
- integración incompleta con Supabase

Los agentes deben revisar estos puntos.

---

# DIRECCIÓN FUTURA DEL PROYECTO

Evolución esperada:

1. sistema estable de captura de pacientes
2. dashboard robusto
3. automatización inteligente
4. integración con más clínicas
5. expansión a más especialidades

---

# INSTRUCCIONES PARA AGENTES (CODEX)

Antes de modificar código:

1. entender arquitectura
2. encontrar causa raíz
3. aplicar fix mínimo necesario
4. no romper funcionalidades existentes

Siempre explicar:

- diagnóstico
- causa raíz
- archivos modificados
- cómo probar

---

# OBJETIVO A LARGO PLAZO

Convertir la plataforma en un sistema escalable de gestión de pacientes que conecte múltiples clínicas y especialidades en distintos países.