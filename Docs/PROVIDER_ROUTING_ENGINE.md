# Provider Routing Engine

## Archivo principal

- `lib/provider-routing.ts`

## Flujo del motor

```txt
create-lead
  ->
selectProviderForLead
  ->
filtro de elegibilidad
  ->
senales observadas
  ->
ranking hibrido
  ->
seleccion final
```

## Objetivo del motor

El motor de routing decide como ordenar, sugerir y eventualmente autoasignar proveedores para un lead sin perder:

- control manual del negocio
- trazabilidad
- fallback seguro

## Entrada al motor

El motor trabaja con un subconjunto de datos del lead:

- `service_name`
- `service_slug`
- `city_interest`

Cuando hace falta, usa fallback por nombre de servicio para mantener compatibilidad con datos legacy.

## Filtro de elegibilidad

Solo pasan a ranking los providers que cumplan:

- `active = true`
- `service_slug` compatible
- `city_scope` compatible

### active

El provider debe estar activo para participar.

### service_slug

El servicio del lead debe coincidir con el del provider:

- primero por `service_slug`
- fallback por `service_name` cuando sea necesario

### city_scope

El provider debe cubrir la ciudad del lead o declarar un scope amplio.

## Autoasignables

Dentro de los elegibles, el motor separa los providers con:

- `auto_assign = true`

Eso crea dos conjuntos:

- providers elegibles
- providers elegibles y autoasignables

## Senales observadas

La Fase 3B del routing usa una sola query a `leads` por ejecucion.

Campos minimos consultados:

- `provider_id`
- `suggested_provider_id`
- `assignment_mode`
- `created_at`

Ventana observada:

- ultimos 90 dias

Si la query falla:

- el routing no se rompe
- se usa un mapa de senales neutras
- el motor sigue funcionando con la base manual

## Ranking hibrido

La base manual es:

```txt
manual_base =
  (priority * 10) +
  (score * 3)
```

El bonus observado es:

```txt
raw_observed_bonus =
  (suggested_to_assigned_rate * 25) +
  (auto_assignment_share * 15) -
  (manual_override_share * 10)
```

Factor de confianza:

```txt
confidence_factor =
  min(1, max(assigned_leads_count, suggested_count) / 10)
```

Cap del bonus:

```txt
observed_bonus =
  min(max(raw_observed_bonus * confidence_factor, -12), 12)
```

Score final:

```txt
hybrid_rank_score =
  manual_base + observed_bonus
```

## Reglas especiales

### Providers nuevos

Si un provider no tiene asignaciones ni sugerencias:

- `assigned_leads_count = 0`
- `suggested_count = 0`
- `observed_bonus = 0`

Entonces el orden depende solo de:

- `priority`
- `score`

### Bajo volumen

El `confidence_factor` reduce el peso de las senales observadas cuando el volumen es bajo.

## Desempate

Orden final:

1. `hybrid_rank_score desc`
2. `priority desc`
3. `score desc`
4. `created_at asc`
5. `id asc`

## Resultados posibles

### `auto_assigned`

Sucede cuando:

- hay elegibles
- existe al menos un autoasignable

Resultado:

- se persiste `provider_id`
- `assignment_mode = auto_assigned`
- `assignment_reason = ranked_auto_assign`

### `pending_review`

Sucede cuando:

- hay providers elegibles
- no hay ninguno autoasignable

Resultado:

- se guarda sugerencia
- no se asigna provider final automaticamente

### `no_eligible_provider`

Sucede cuando:

- no existe ningun provider elegible

Resultado:

- el lead queda pendiente
- el motor devuelve razon explicita de no elegibilidad

## Persistencia resultante en leads

El motor alimenta estos campos en `public.leads`:

- `provider_id`
- `suggested_provider_id`
- `top_provider_ids`
- `assignment_mode`
- `assignment_reason`
- `auto_assigned`

## Principio operativo

El motor puede sugerir y autoasignar, pero nunca elimina la posibilidad de correccion manual desde dashboard.
