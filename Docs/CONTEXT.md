# Proyecto

Plataforma digital que conecta pacientes con clínicas o proveedores médicos.

El objetivo es facilitar que pacientes encuentren y contacten clínicas confiables para distintos tratamientos o especialidades.

La plataforma gestiona solicitudes de pacientes y permite derivarlas manual o automáticamente a proveedores.

---

# Objetivo del proyecto

Construir una plataforma escalable que:

- capture solicitudes de pacientes
- permita gestionarlas desde un dashboard
- derive pacientes a clínicas o proveedores confiables
- automatice la derivación cuando sea posible
- permita control manual cuando sea necesario

---

# Flujo principal del usuario

1. El paciente entra a la plataforma.
2. Selecciona una especialidad médica.
3. Completa un formulario.
4. Los datos se envían al backend.
5. La solicitud se guarda en Supabase.
6. Aparece en el dashboard de gestión.
7. Se puede derivar manualmente o automáticamente a una clínica.

---

# Especialidades

Las especialidades se muestran desde la página principal (`app/page.tsx`).

Ejemplos actuales:

- dermatología
- estética
- implantes dentales
- otras especialidades futuras

Cada especialidad tiene su propio formulario o flujo.

---

# Formularios

Los formularios deben:

- capturar datos del paciente
- validar información
- enviar datos a Supabase
- generar una solicitud en el sistema

Campos típicos:

- nombre
- teléfono
- país
- especialidad
- descripción del caso
- fecha de creación

---

# Base de datos (Supabase)

Supabase se usa para:

- almacenar solicitudes de pacientes
- almacenar clínicas/proveedores
- gestionar estados de solicitudes
- activar automatización de derivación

Puntos importantes:

- los IDs deben ser UUID válidos
- no usar slugs donde se espera UUID
- validar correctamente inserts y updates

---

# Dashboard administrativo

El dashboard permite:

- ver solicitudes de pacientes
- revisar información
- asignar solicitudes a clínicas
- activar automatización
- gestionar estados

Columnas principales:

- clínica
- especialidad
- estado
- automático
- fecha de creación

---

# Derivación manual vs automática

## Modo manual

La solicitud aparece en el dashboard.

Un operador decide a qué clínica enviarla.

---

## Modo automático

Si una clínica está marcada como confiable:

- el sistema deriva automáticamente el paciente
- no requiere revisión manual

Esto se controla mediante un **checkbox "Automático" en el dashboard**.

---

# Moneda

La moneda principal del sistema es:

**PEN (soles peruanos)**

Para pacientes chilenos se puede mostrar:

- conversión referencial en CLP

---

# Problemas técnicos que deben evitarse

Errores conocidos:

- enviar strings donde se espera UUID
- formularios que no disparan el submit
- rutas incorrectas de especialidades
- componentes que no cargan formularios
- integraciones incompletas con Supabase

---

# Principios técnicos del proyecto

El proyecto debe priorizar:

- estabilidad
- cambios mínimos
- código claro
- arquitectura simple
- evitar refactors innecesarios
- no romper especialidades existentes

---

# Roadmap del proyecto

Dirección futura del proyecto:

1. sistema estable de captura de pacientes
2. dashboard robusto de gestión
3. derivación automática inteligente
4. escalabilidad a más especialidades
5. integración con más clínicas

---

# Instrucciones para agentes de código (Codex)

Antes de modificar código:

1. entender arquitectura
2. identificar causa raíz del problema
3. aplicar el fix mínimo necesario
4. no romper funcionalidades existentes

Siempre explicar:

- diagnóstico
- causa raíz
- archivos modificados
- cómo probar el cambio