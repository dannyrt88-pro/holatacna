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
