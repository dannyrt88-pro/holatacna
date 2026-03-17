# PRODUCT ROADMAP

> Este roadmap es tactico y subordinado a `Docs/MASTER_WORK_ROUTE.md`, que define la ruta principal de trabajo del proyecto.

Este roadmap refleja la evolucion del sistema segun la arquitectura actual del marketplace.

## Vision

Convertir HolaTacna en una plataforma de orquestacion comercial que conecte demanda captada digitalmente con proveedores confiables y operables en Tacna.

## Fase 1. Captura y operacion base

Objetivo:

- captar leads desde landings y formularios
- centralizar ingreso en `create-lead`
- operar leads desde dashboard

Estado:

- implementado

## Fase 2. Routing operativo de providers

Objetivo:

- filtrar providers compatibles
- separar elegibilidad de autoasignacion
- dejar leads en `pending_review` cuando aplique

Estado:

- implementado

## Fase 3. Ranking hibrido y trazabilidad

Objetivo:

- combinar `priority` y `score` con senales observadas
- persistir sugerencia, asignacion final y razon
- soportar override manual sin perder historial operativo

Estado:

- implementado

## Fase 4. Analytics del marketplace

Objetivo:

- medir providers sugeridos y asignados
- medir `manual_override_share`
- medir `auto_assignment_share`
- leer cobertura por servicio

Estado:

- parcialmente implementado

## Fase 5. Optimizacion del routing

Objetivo:

- persistir metricas de rendimiento
- mejorar velocidad del motor
- ajustar mejor cobertura por ciudad y servicio

Estado:

- siguiente prioridad tecnica

## Fase 6. Marketplace multiservicio

Objetivo:

- extender el sistema a nuevas categorias sin romper el nucleo
- mantener una capa comun de lead capture, routing y operacion

Estado:

- direccion activa

## Fase 7. AI assisted routing

Objetivo:

- asistir la seleccion de providers
- detectar cobertura debil
- sugerir mejores reglas de distribucion
- ayudar a priorizar leads

Estado:

- futuro

## Metricas de negocio que deben guiar el roadmap

- leads captados por servicio
- pending review rate
- assigned leads por provider
- suggested to assigned rate
- auto assignment share
- manual override share
- cobertura por servicio y ciudad

## Principios de evolucion

- no romper el control manual
- mantener trazabilidad
- medir antes de sofisticar
- crecer por capas pequenas y verificables
