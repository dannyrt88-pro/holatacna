# Tech Roadmap

## Fase actual

El sistema ya tiene una base operativa real en produccion.

### Routing hibrido

Existe:

- filtro de elegibilidad
- autoasignacion
- pending review
- trazabilidad en leads
- ranking hibrido con senales observadas recientes

### Analytics

Existe:

- metricas Fase 1 por provider
- metricas Fase 2 por provider
- cobertura por servicio

### Panel providers

Existe:

- alta y edicion de providers
- configuracion operativa
- metricas visibles en `/providers`

## Fase futura 1: persisted metrics

Objetivo:

- bajar costo de calculo en cliente y routing
- centralizar metricas reutilizables

Posibles entregables:

- tablas resumen
- vistas o materialized views
- jobs de refresco

## Fase futura 2: ranking adaptativo

Objetivo:

- mejorar el ranking hibrido con metricas mas estables
- calibrar pesos con evidencia real

Posibles entregables:

- ajuste de pesos
- reglas por volumen
- reglas por servicio

## Fase futura 3: optimizacion de performance

Objetivo:

- reducir latencia del routing
- reducir trabajo repetido

Posibles caminos:

- agregaciones persistidas
- cache operacional
- consultas mas acotadas

## Fase futura 4: AI assisted routing

Objetivo:

- incorporar apoyo inteligente sin reemplazar control comercial

Posibles casos:

- sugerencias de tuning del ranking
- alertas de cobertura debil
- recomendaciones operativas por servicio o provider

## Principios del roadmap

- no romper el flujo actual
- mantener override manual
- preservar trazabilidad
- evolucionar por capas pequenas y medibles
- separar operacion critica de experimentacion
