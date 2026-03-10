# LEAD FLOW
Flujo de leads, solicitudes y conversión dentro de la plataforma

Este documento define cómo entra, se procesa, se deriva y se monetiza un lead dentro del sistema.

Debe considerarse una referencia principal para diseñar lógica de negocio, dashboard, automatizaciones y métricas.

---

# PROPÓSITO DEL LEAD FLOW

El sistema existe para captar oportunidades de negocio y conectarlas con proveedores adecuados.

Un lead puede representar una persona o empresa interesada en contratar un servicio.

El objetivo del flujo es:

1. captar el lead correctamente
2. clasificarlo
3. almacenarlo
4. asignarlo o derivarlo
5. hacer seguimiento
6. convertirlo en una atención, reserva, venta o servicio cerrado

---

# DEFINICIÓN DE LEAD

Un lead es una solicitud entrante generada por un usuario interesado en un servicio.

Puede provenir de:

- formulario web
- landing page
- campaña publicitaria
- recomendación
- canal externo
- integración futura con APIs o CRMs

Un lead no es todavía una venta.
Es una oportunidad calificada o en proceso de calificación.

---

# TIPOS DE LEADS

La plataforma debe soportar distintos tipos de leads según categoría de servicio.

Ejemplos:

## Leads clínicos
- dermatología
- implantes dentales
- cirugía estética
- tratamientos médicos
- turismo médico

## Leads no clínicos
- hoteles
- Airbnb
- transporte
- compras por mayor
- logística
- servicios profesionales
- otros servicios futuros

El sistema debe tratarlos bajo una lógica común, pero permitiendo reglas específicas por vertical.

---

# FLUJO GENERAL DEL LEAD

Flujo principal:

1. el usuario entra a la plataforma
2. selecciona una categoría o servicio
3. completa un formulario
4. el sistema valida datos
5. se crea el lead
6. se almacena en Supabase
7. se clasifica
8. se envía a revisión manual o derivación automática
9. se asigna a un proveedor
10. se hace seguimiento
11. se registra resultado

---

# ETAPAS DEL LEAD

Se recomienda trabajar con etapas claras.

## 1. Lead nuevo
El lead acaba de entrar al sistema y todavía no ha sido revisado.

## 2. Lead validado
Se verificó que tiene datos mínimos correctos y que corresponde a un servicio real.

## 3. Lead en revisión
Un operador está revisando qué hacer con él.

## 4. Lead asignado
Ya tiene proveedor o destino definido.

## 5. Lead derivado
Fue enviado al proveedor.

## 6. Lead contactado
El proveedor ya hizo contacto o inició atención.

## 7. Lead convertido
Se transformó en reserva, cita, atención, venta o servicio cerrado.

## 8. Lead descartado
No aplica, está duplicado, incompleto o no tiene intención válida.

## 9. Lead cancelado
El usuario desistió o el proceso se detuvo.

---

# DATOS MÍNIMOS DE UN LEAD

Todo lead debería incluir como mínimo:

- id
- nombre
- teléfono
- país
- servicio solicitado
- categoría
- descripción
- origen
- estado
- fecha de creación

Campos opcionales según vertical:

- ciudad
- presupuesto estimado
- urgencia
- fechas de viaje
- número de acompañantes
- tipo de tratamiento
- proveedor preferido

---

# CLASIFICACIÓN DEL LEAD

Después de ingresar, el lead debe clasificarse al menos por:

- categoría de servicio
- subcategoría
- país de origen
- prioridad
- posibilidad de automatización
- proveedor potencial

Ejemplo:

categoría: salud  
subcategoría: dermatología  
país: Chile  
prioridad: alta  
modo: automático

---

# PRIORIZACIÓN DE LEADS

No todos los leads tienen el mismo valor.

La plataforma debe dar prioridad a verticales de mayor ticket promedio, especialmente:

- servicios clínicos
- tratamientos estéticos
- implantes
- turismo médico

Pero sin excluir:

- hoteles
- transporte
- hospedaje
- compras por mayor
- otras categorías rentables

La lógica futura puede incluir scoring por:

- ticket estimado
- urgencia
- calidad del lead
- país de origen
- proveedor disponible
- probabilidad de cierre

---

# DERIVACIÓN DEL LEAD

El sistema debe decidir cómo se deriva cada lead.

## Derivación manual
El lead aparece en el dashboard.
Un operador revisa el caso y decide a qué proveedor enviarlo.

Usar este modo cuando:

- el lead requiere validación
- hay varias opciones posibles
- la categoría necesita revisión humana
- el proveedor no está habilitado para automático

## Derivación automática
El sistema deriva el lead automáticamente a un proveedor confiable.

Usar este modo cuando:

- existe proveedor confiable
- el servicio está claramente definido
- los datos del lead son suficientes
- la regla de negocio lo permite

---

# CRITERIOS PARA DERIVACIÓN AUTOMÁTICA

Un lead puede ir en automático si cumple condiciones como:

- proveedor activo
- proveedor marcado como confiable
- categoría compatible
- datos mínimos completos
- sin inconsistencias graves
- canal apto para automatización

Campo clave sugerido:

`automatico = true`

---

# DASHBOARD DE LEADS

El dashboard debe ser el centro de control operativo.

Debe permitir:

- ver leads entrantes
- filtrar por categoría
- filtrar por país
- filtrar por estado
- filtrar por proveedor
- marcar automático/manual
- asignar proveedor
- cambiar estado
- revisar historial

Columnas sugeridas:

- nombre
- servicio
- categoría
- proveedor
- estado
- automático
- origen
- fecha

---

# RESULTADOS POSIBLES DE UN LEAD

Cada lead debe terminar con un resultado trazable.

Resultados posibles:

- pendiente
- derivado
- atendido
- convertido
- descartado
- cancelado
- sin respuesta
- fuera de cobertura

Esto es clave para medir rentabilidad.

---

# MONETIZACIÓN DEL LEAD

El lead flow debe permitir distintos modelos de monetización.

Ejemplos:

- comisión por venta cerrada
- pago por lead calificado
- fee por derivación
- fee fijo por proveedor
- revenue share

El sistema debe poder registrar en el futuro:

- valor estimado del lead
- valor real cerrado
- comisión esperada
- comisión cobrada

---

# TRAZABILIDAD

Cada lead debe ser rastreable desde su origen hasta su resultado final.

Debe poder saberse:

- cuándo entró
- desde qué canal
- qué servicio pidió
- a qué proveedor fue enviado
- quién lo gestionó
- cuál fue el resultado
- si generó ingreso

La trazabilidad es obligatoria para optimizar conversiones.

---

# DUPLICADOS Y VALIDACIÓN

El sistema debe prevenir leads inválidos o duplicados.

Reglas recomendadas:

- revisar teléfono repetido
- revisar combinación nombre + teléfono
- detectar formularios incompletos
- marcar leads sospechosos
- evitar asignación automática si faltan datos

---

# LEAD FLOW POR PRIORIDAD DE NEGOCIO

La lógica operativa debe priorizar primero las verticales de mayor retorno económico.

Orden inicial sugerido:

1. servicios clínicos y médicos
2. estética y procedimientos
3. turismo médico
4. hoteles y hospedaje
5. transporte
6. compras por mayor
7. otros servicios

Este orden puede ajustarse con datos reales del negocio.

---

# MÉTRICAS CLAVE

El sistema debe permitir medir:

- leads por categoría
- leads por país
- tasa de validación
- tasa de derivación
- tasa de conversión
- tiempo de respuesta
- proveedor con mejor desempeño
- ingresos por lead
- ticket promedio por categoría

Estas métricas deben alimentar decisiones de negocio.

---

# VISIÓN FUTURA DEL LEAD FLOW

El lead flow debe evolucionar hacia un sistema inteligente capaz de:

- clasificar automáticamente leads
- priorizar por valor potencial
- asignar mejor proveedor
- automatizar seguimiento
- detectar fraude o spam
- predecir conversión
- operar múltiples verticales y países

---

# REGLAS PARA AGENTES DE IA

Antes de modificar lógica de leads:

1. entender la categoría del servicio
2. revisar el flujo actual
3. identificar impacto en dashboard y Supabase
4. modificar lo mínimo necesario
5. mantener trazabilidad del lead

Siempre explicar:

- diagnóstico
- causa raíz
- cambio propuesto
- archivos modificados
- cómo probar

---

# RELACIÓN CON OTROS DOCUMENTOS

Este documento debe leerse junto con:

- PROJECT_BRAIN.md
- CONTEXT.md
- ARCHITECTURE.md
- SERVICE_ENGINE.md

LEAD_FLOW.md define específicamente cómo se mueve y se monetiza una oportunidad dentro del sistema.