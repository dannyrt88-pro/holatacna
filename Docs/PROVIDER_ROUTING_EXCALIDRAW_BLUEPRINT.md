# Provider Routing Excalidraw Blueprint

## 1. Proposito del diagrama

Este blueprint sirve como base visual para dibujar en Excalidraw u Obsidian la arquitectura completa del modulo de routing de proveedores de HolaTacna.

Debe permitir:

- entender el flujo completo del lead hasta la asignacion final
- distinguir que ya existe hoy en produccion
- mostrar las capas operativas y analiticas ya activas
- dejar visible la evolucion futura del sistema

## 2. Vista general del canvas

Usar un canvas horizontal con 5 zonas:

1. columna izquierda
   entradas del lead

2. columna central
   motor de routing y decision

3. columna derecha
   persistencia y operacion

4. franja inferior
   analytics y metricas operativas

5. franja futura separada
   roadmap y evolucion del sistema

Layout recomendado:

```txt
| ENTRADA | ROUTING + RANKING | PERSISTENCIA + OPERACION |
|--------------------------------------------------------|
|         ANALYTICS / METRICAS OPERATIVAS                |
|--------------------------------------------------------|
|         FUTURO / ROADMAP                               |
```

---

## A. Vista general del canvas

### Columna izquierda: Entradas

- Landings medicas SEO [IMPLEMENTADO]
- Formularios / Lead capture [IMPLEMENTADO]
- `app/api/create-lead/route.ts` [IMPLEMENTADO]

### Columna central: Motor / decision

- `selectProviderForLead(...)` [IMPLEMENTADO]
- Filtro de elegibilidad [IMPLEMENTADO]
- Ranking manual base [IMPLEMENTADO]
- Ranking hibrido Fase 3A [IMPLEMENTADO]
- Senales observadas Fase 3B [IMPLEMENTADO]

### Columna derecha: Persistencia y operacion

- Persistencia en `public.leads` [IMPLEMENTADO]
- Dashboard CRM [IMPLEMENTADO]
- Providers Panel [IMPLEMENTADO]
- Manual override [IMPLEMENTADO]

### Franja inferior: Analytics

- Metricas Fase 1 por provider [IMPLEMENTADO]
- Metricas Fase 2 por provider [IMPLEMENTADO]
- Cobertura por servicio [IMPLEMENTADO]

### Franja futura: Roadmap

- Metricas persistentes [FUTURO]
- Ranking hibrido con optimizacion adaptativa [FUTURO]
- Reglas comerciales por provider/plan [FUTURO]
- Capa de decision mas inteligente [FUTURO]

---

## B. Bloques del lado izquierdo

### Bloque 1
**Landings SEO y guias**
Estado: [IMPLEMENTADO]

Contenido sugerido dentro del bloque:
- `/<service>-tacna`
- `/<city>/<service>`
- formularios
- paginas guia conectadas al viaje

### Bloque 2
**Formulario / Lead Capture**
Estado: [IMPLEMENTADO]

Contenido sugerido:
- nombre
- telefono
- service_name
- service_slug
- city_interest
- tracking UTM

### Bloque 3
**create-lead**
Estado: [IMPLEMENTADO]

Contenido sugerido:
- normalizacion del payload
- scoring comercial
- package suggestion
- invoca routing

---

## C. Bloques centrales

### Bloque 4
**Provider Routing**
Estado: [IMPLEMENTADO]

Etiqueta interna:
- `selectProviderForLead(...)`

Subbloques internos:

#### 4.1 Filtro de elegibilidad
Estado: [IMPLEMENTADO]

Elementos:
- `active = true`
- `service_slug` compatible
- `city_scope` compatible

#### 4.2 Filtro de autoasignables
Estado: [IMPLEMENTADO]

Elementos:
- elegibles
- `auto_assign = true`

#### 4.3 Ranking manual base
Estado: [IMPLEMENTADO]

Elementos:
- `priority`
- `score`

#### 4.4 Senales observadas
Estado: [IMPLEMENTADO]

Elementos:
- ventana de 90 dias
- una sola query a `leads`
- `provider_id`
- `suggested_provider_id`
- `assignment_mode`
- fallback neutro si falla

#### 4.5 Ranking hibrido
Estado: [IMPLEMENTADO]

Elementos:
- `manual_base`
- `raw_observed_bonus`
- `confidence_factor`
- `observed_bonus`
- `hybrid_rank_score`

#### 4.6 Decision final
Estado: [IMPLEMENTADO]

Elementos:
- `auto_assigned`
- `pending_review`
- `no_eligible_provider`

---

## D. Bloques del lado derecho

### Bloque 5
**Persistencia en leads**
Estado: [IMPLEMENTADO]

Campos a listar dentro del bloque:
- `provider_id`
- `suggested_provider_id`
- `top_provider_ids`
- `assignment_mode`
- `assignment_reason`
- `auto_assigned`
- `manual_override_at`

### Bloque 6
**Dashboard**
Estado: [IMPLEMENTADO]

Elementos:
- lead final asignado
- sugerencia original
- top providers
- modo / motivo
- override manual

### Bloque 7
**Providers Panel**
Estado: [IMPLEMENTADO]

Elementos:
- configuracion provider
- active / auto_assign
- priority / score
- metricas provider
- cobertura por servicio

### Bloque 8
**Manual Override**
Estado: [IMPLEMENTADO]

Elementos:
- cambia `provider_id`
- actualiza `provider_phone`
- actualiza `commission_rate`
- `assignment_mode = manual_override`
- `assignment_reason = manual_admin_override`
- conserva sugerencia original

---

## E. Capa inferior de analytics

### Bloque 9
**Metricas Fase 1**
Estado: [IMPLEMENTADO]

Elementos:
- assigned_leads_count
- auto_assigned_leads_count
- manual_override_leads_count
- suggested_count

### Bloque 10
**Metricas Fase 2**
Estado: [IMPLEMENTADO]

Elementos:
- suggested_to_assigned_rate
- manual_override_share
- auto_assignment_share

### Bloque 11
**Cobertura por servicio**
Estado: [IMPLEMENTADO]

Elementos:
- active_providers_count_by_service
- pending_review_count_by_service
- pending_review_rate_by_service

---

## F. Capa futura / roadmap

### Bloque 12
**Metricas persistentes**
Estado: [FUTURO]

Objetivo:
- reducir costo de agregacion en tiempo real
- dejar base mas estable para ranking y reporting

### Bloque 13
**Ranking hibrido mas inteligente**
Estado: [PARCIAL]

Ya existe:
- arquitectura
- formula base
- senales observadas recientes

Falta:
- calibracion continua
- reglas mas finas por servicio
- validacion sistematica de pesos

### Bloque 14
**Reglas comerciales por provider / plan**
Estado: [FUTURO]

Objetivo:
- capas de preferencia por convenio
- priorizacion por estrategia comercial

### Bloque 15
**Capa adaptativa futura**
Estado: [FUTURO]

Objetivo:
- optimizacion mas dinamica
- recomendaciones comerciales asistidas
- sin llegar aun a ML complejo

---

## G. Lista exacta de flechas / conexiones

Dibujar estas flechas en este orden:

1. `Landings SEO y guias` -> `Formulario / Lead Capture`
2. `Formulario / Lead Capture` -> `create-lead`
3. `create-lead` -> `Provider Routing`
4. `Provider Routing` -> `Filtro de elegibilidad`
5. `Filtro de elegibilidad` -> `Filtro de autoasignables`
6. `Filtro de elegibilidad` -> `Ranking manual base`
7. `Filtro de elegibilidad` -> `Senales observadas`
8. `Ranking manual base` -> `Ranking hibrido`
9. `Senales observadas` -> `Ranking hibrido`
10. `Ranking hibrido` -> `Decision final`
11. `Decision final` -> `Persistencia en leads`
12. `Persistencia en leads` -> `Dashboard`
13. `Persistencia en leads` -> `Providers Panel`
14. `Dashboard` -> `Manual Override`
15. `Manual Override` -> `Persistencia en leads`
16. `Persistencia en leads` -> `Metricas Fase 1`
17. `Persistencia en leads` -> `Metricas Fase 2`
18. `Persistencia en leads` -> `Cobertura por servicio`
19. `Metricas Fase 1` -> `Ranking hibrido mas inteligente`
20. `Metricas Fase 2` -> `Ranking hibrido mas inteligente`
21. `Cobertura por servicio` -> `Ranking hibrido mas inteligente`
22. `Ranking hibrido mas inteligente` -> `Reglas comerciales por provider / plan`
23. `Reglas comerciales por provider / plan` -> `Capa adaptativa futura`

Flechas secundarias sugeridas:

- `Providers Panel` -> `Ranking manual base`
- `Providers Panel` -> `Filtro de elegibilidad`
- `Manual Override` -> `Metricas Fase 1`

---

## H. Paleta de colores sugerida

Usar colores por tipo de bloque:

- Azul = entrada
  - landings
  - formularios
  - create-lead

- Violeta = routing / ranking
  - selectProviderForLead
  - elegibilidad
  - senales observadas
  - ranking hibrido

- Verde = persistencia
  - leads
  - campos persistidos

- Naranja = operacion manual
  - dashboard
  - override manual
  - providers panel operativo

- Gris = analytics
  - metricas
  - cobertura por servicio

- Amarillo = futuro / roadmap
  - metricas persistentes
  - capa adaptativa
  - reglas comerciales futuras

Estado visual sugerido:

- [IMPLEMENTADO] borde solido
- [PARCIAL] borde punteado
- [FUTURO] borde discontinuo fino

---

## I. Leyenda visual

Usar una mini-leyenda en una esquina del canvas:

- rectangulo azul = entrada
- rectangulo violeta = motor de decision
- rectangulo verde = persistencia
- rectangulo naranja = operacion humana
- rectangulo gris = analytics actual
- rectangulo amarillo = roadmap

Estados:

- `[IMPLEMENTADO]` = activo en produccion
- `[PARCIAL]` = existe base, falta evolucion
- `[FUTURO]` = no implementado aun

---

## J. Como dibujarlo en Excalidraw paso a paso

1. Crear un canvas horizontal ancho.
2. Dividir el canvas en 3 columnas verticales:
   - izquierda
   - centro
   - derecha
3. Dibujar una franja inferior gris para analytics.
4. Dibujar una franja inferior adicional amarilla para roadmap.
5. Colocar los bloques de entrada en la columna izquierda.
6. Colocar el motor de routing y ranking en la columna central.
7. Colocar persistencia y operacion en la columna derecha.
8. Dibujar debajo los bloques de metricas actuales.
9. Dibujar al final la capa futura.
10. Conectar con flechas siguiendo exactamente la lista de conexiones.
11. Marcar cada bloque con:
    - `[IMPLEMENTADO]`
    - `[PARCIAL]`
    - `[FUTURO]`
12. Mantener texto corto dentro de cada bloque y detalles en notas laterales si hace falta.

## Resultado esperado del blueprint

Al terminar el dibujo, el lector debe poder responder rapidamente:

- por donde entra un lead
- como se decide el provider final
- donde pesa la configuracion manual
- donde pesan las senales observadas
- que se guarda en leads
- como opera el admin
- que metricas ya existen
- hacia donde evoluciona la arquitectura
