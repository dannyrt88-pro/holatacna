# Excalidraw Provider Routing Blueprint

## Titulo

Blueprint visual del modulo de routing de providers de HolaTacna.

## Proposito del diagrama

Este documento sirve como base para dibujar la arquitectura del routing en Excalidraw u Obsidian sin improvisar el layout ni el contenido.

Debe permitir:

- entender el flujo completo del lead
- distinguir que ya esta implementado
- ver capas operativas, analiticas y futuras
- reutilizar el diseño como blueprint tecnico permanente

## A. Vista general del canvas

Usar un canvas horizontal con cinco zonas:

1. columna izquierda
   - entrada del lead
2. columna central
   - routing y ranking
3. columna derecha
   - persistencia y operacion
4. franja inferior
   - analytics y metricas
5. franja final
   - roadmap futuro

Layout sugerido:

```txt
| ENTRADA | ROUTING ENGINE | PERSISTENCIA + OPERACION |
|--------------------------------------------------------|
|      ANALYTICS / METRICAS OPERATIVAS                   |
|--------------------------------------------------------|
|      FUTURO / ROADMAP                                  |
```

## B. Bloques del lado izquierdo

- Landings SEO [IMPLEMENTADO]
- Formularios [IMPLEMENTADO]
- `create-lead` [IMPLEMENTADO]

## C. Bloques centrales

- `selectProviderForLead` [IMPLEMENTADO]
- Filtro de elegibilidad [IMPLEMENTADO]
- `active` [IMPLEMENTADO]
- `service_slug` [IMPLEMENTADO]
- `city_scope` [IMPLEMENTADO]
- `auto_assign` [IMPLEMENTADO]
- Base manual `priority + score` [IMPLEMENTADO]
- Senales observadas 90 dias [IMPLEMENTADO]
- Fallback neutro [IMPLEMENTADO]
- `confidence_factor` [IMPLEMENTADO]
- `hybrid_rank_score` [IMPLEMENTADO]
- Decision final [IMPLEMENTADO]

## D. Bloques del lado derecho

- Persistencia en `leads` [IMPLEMENTADO]
- `provider_id` [IMPLEMENTADO]
- `suggested_provider_id` [IMPLEMENTADO]
- `top_provider_ids` [IMPLEMENTADO]
- `assignment_mode` [IMPLEMENTADO]
- `assignment_reason` [IMPLEMENTADO]
- `auto_assigned` [IMPLEMENTADO]
- `manual_override_at` [IMPLEMENTADO]
- Dashboard [IMPLEMENTADO]
- Providers panel [IMPLEMENTADO]
- Manual override [IMPLEMENTADO]

## E. Capa inferior de analytics

- Metricas Fase 1 [IMPLEMENTADO]
  - asignados
  - auto
  - override
  - sugerido
- Metricas Fase 2 [IMPLEMENTADO]
  - suggested_to_assigned_rate
  - manual_override_share
  - auto_assignment_share
- Cobertura por servicio [IMPLEMENTADO]
  - providers activos
  - pending review
  - pending review rate

## F. Capa futura / roadmap

- Metricas persistentes [FUTURO]
- Ranking hibrido mas inteligente [PARCIAL]
- Reglas comerciales por provider o plan [FUTURO]
- Capa adaptativa futura [FUTURO]

## G. Lista exacta de flechas / conexiones

1. Landings SEO -> Formularios
2. Formularios -> create-lead
3. create-lead -> selectProviderForLead
4. selectProviderForLead -> Filtro de elegibilidad
5. Filtro de elegibilidad -> Base manual
6. Filtro de elegibilidad -> Senales observadas
7. Base manual -> hybrid_rank_score
8. Senales observadas -> confidence_factor
9. confidence_factor -> hybrid_rank_score
10. hybrid_rank_score -> Decision final
11. Decision final -> Persistencia en leads
12. Persistencia en leads -> Dashboard
13. Persistencia en leads -> Providers panel
14. Dashboard -> Manual override
15. Manual override -> Persistencia en leads
16. Persistencia en leads -> Metricas Fase 1
17. Persistencia en leads -> Metricas Fase 2
18. Persistencia en leads -> Cobertura por servicio
19. Analytics -> Roadmap futuro

## H. Paleta de colores sugerida

- azul = entrada
- violeta = routing y ranking
- verde = persistencia
- naranja = operacion manual
- gris = analytics
- amarillo = futuro y roadmap

Estados visuales:

- `[IMPLEMENTADO]` = borde solido
- `[PARCIAL]` = borde punteado
- `[FUTURO]` = borde discontinuo fino

## I. Como dibujarlo en Excalidraw paso a paso

1. dibujar tres columnas principales
2. agregar la franja inferior de analytics
3. agregar la franja final de roadmap
4. colocar bloques por zona
5. aplicar colores por tipo de bloque
6. marcar cada bloque con su estado
7. conectar usando la lista exacta de flechas
8. mantener texto corto dentro de cada rectangulo

## Resultado esperado

Al final del dibujo debe ser facil explicar:

- por donde entra el lead
- como se decide el provider final
- donde pesa el control manual
- donde pesan las senales observadas
- que se guarda en leads
- como opera el admin
- que metricas ya existen
- hacia donde evoluciona el sistema
