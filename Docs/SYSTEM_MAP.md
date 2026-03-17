# SYSTEM MAP - HolaTacna

## 1. Vision general del sistema

HolaTacna conecta turistas chilenos con proveedores de servicios en Tacna mediante un sistema de captacion de demanda, captura de leads, routing inteligente y operacion comercial con trazabilidad.

El sistema no solo busca captar leads. Tambien busca:

- asignarlos mejor
- permitir correccion manual cuando haga falta
- medir la calidad del marketplace
- evolucionar hacia una capa de optimizacion mas inteligente

## 2. Flujo completo del sistema

```txt
Turista chileno
  ->
Contenido en redes sociales
  ->
Landing pages / formularios
  ->
Captura de lead
  ->
create-lead API
  ->
Motor de routing
  ->
Proveedor asignado
  ->
Servicio realizado
```

Este flujo resume el viaje completo desde la intencion del usuario hasta la ejecucion del servicio.

## 3. Capa de trafico

Las principales fuentes de trafico del sistema son:

- TikTok
- Instagram
- Facebook
- Google
- QR en frontera
- recomendaciones

El objetivo de esta capa es generar intencion de servicio y llevar al usuario a una superficie de conversion.

## 4. Capa de captura de leads

Los leads se generan por medio de:

- landing pages
- formularios
- WhatsApp
- integraciones futuras

Todos los leads terminan entrando por un punto central:

- `app/api/create-lead/route.ts`

Esta capa normaliza el lead, conserva tracking y prepara la informacion para el routing.

## 5. Capa de routing

El archivo clave del motor es:

- `lib/provider-routing.ts`

La funcion principal es:

- `selectProviderForLead()`

El motor hace cuatro cosas principales:

1. filtra providers elegibles
2. calcula senales observadas
3. calcula ranking hibrido
4. selecciona proveedor final o deja pendiente

## 6. Senales observadas

El archivo que construye esta capa es:

- `lib/provider-observed-signals.ts`

El sistema analiza leads recientes usando estas columnas:

- `provider_id`
- `suggested_provider_id`
- `assignment_mode`
- `created_at`

Ventana actual:

- ultimos 90 dias

Metricas que genera:

- `assigned_leads_count`
- `suggested_count`
- `auto_assignment_share`
- `manual_override_share`
- `suggested_to_assigned_rate`

Si esta capa falla, el routing puede caer a un modo neutro sin romper el flujo principal.

## 7. Ranking hibrido

El archivo responsable es:

- `lib/provider-hybrid-ranking.ts`

El ranking combina:

### Senales manuales

- `priority`
- `score`

### Senales observadas

- `suggested_to_assigned_rate`
- `auto_assignment_share`
- `manual_override_share`

El resultado final es:

- `hybrid_rank_score`

Ese score se usa para ordenar providers elegibles sin eliminar el control manual del negocio.

## 8. Decision final

El routing puede terminar en estos resultados:

- `auto_assigned`
- `pending_review`
- `no_eligible_provider`

Eso se persiste en `leads` y sirve tanto para operacion diaria como para analytics posteriores.

## 9. Persistencia

La tabla principal de persistencia operativa es:

- `public.leads`

Campos importantes:

- `provider_id`
- `suggested_provider_id`
- `assignment_mode`
- `assignment_reason`
- `auto_assigned`
- `manual_override_at`

Estos campos permiten distinguir entre la sugerencia del sistema y la decision final operativa.

## 10. Operacion del marketplace

Las herramientas operativas principales son:

- Dashboard de leads
- Override manual
- Panel de proveedores (`/providers`)

Desde estas superficies el equipo puede:

- revisar trazabilidad
- reasignar providers
- medir actividad por proveedor
- detectar cobertura debil

## 11. Analytics

### Metricas Fase 1

- `assigned_leads_count`
- `auto_assigned_leads_count`
- `manual_override_leads_count`
- `suggested_count`

### Metricas Fase 2

- `suggested_to_assigned_rate`
- `manual_override_share`
- `auto_assignment_share`

### Cobertura por servicio

La capa de cobertura muestra:

- providers activos por servicio
- pending review por servicio
- pending review rate por servicio

## 12. Arquitectura conceptual

```txt
Traffic Layer
  ->
Lead Capture
  ->
Routing Engine
  ->
Provider Assignment
  ->
Marketplace Operations
  ->
Analytics Layer
```

Este mapa resume la arquitectura de extremo a extremo.

## 13. Futuro del sistema

Las evoluciones mas naturales del sistema son:

- metricas persistentes
- ranking adaptativo
- optimizacion de performance
- AI assisted routing

La idea es evolucionar por capas, sin perder trazabilidad ni control manual.

## Resultado esperado de este mapa

Un desarrollador nuevo deberia poder entender rapidamente:

- por donde entra el trafico
- como se genera un lead
- como funciona el routing
- como se guarda la decision
- como opera el marketplace
- como se mide el rendimiento del sistema
