PROVIDER ROUTING ARCHITECTURE
HolaTacna
1. Propósito del documento
Este documento describe la arquitectura completa del sistema de routing de proveedores de HolaTacna.
Su objetivo es:
documentar cómo funciona el motor de asignación
explicar decisiones de diseño
describir las fases evolutivas del sistema
facilitar mantenimiento y evolución del módulo
permitir a nuevos desarrolladores entender el sistema rápidamente
Este documento cubre:
arquitectura
flujo de datos
ranking híbrido
métricas operativas
evolución futura del sistema
2. Rol del módulo en el sistema
El módulo de routing es uno de los componentes centrales de HolaTacna.
Responsabilidad principal:
decidir qué proveedor recibe cada lead entrante.
Este módulo conecta:
Copiar código

Lead intake
↓
Proveedor matching
↓
Asignación automática o revisión manual
Impacta directamente:
experiencia del cliente
distribución de leads
conversión de servicios
calidad del marketplace
3. Flujo general del sistema
El flujo de asignación es el siguiente:
Copiar código

Lead creation
      ↓
create-lead API
      ↓
provider-routing
      ↓
selectProviderForLead()
      ↓
Ranking híbrido
      ↓
Decisión final
      ↓
Auto-assign | Pending review | No eligible provider
4. Componentes principales del módulo
4.1 provider-routing
Archivo:
Copiar código

lib/provider-routing.ts
Responsable de:
filtrar proveedores elegibles
obtener señales observadas
calcular ranking
seleccionar proveedor final
devolver resultado de asignación
4.2 ranking híbrido
Archivo:
Copiar código

lib/provider-hybrid-ranking.ts
Contiene:
Copiar código

getManualBase()
getConfidenceFactor()
getRawObservedBonus()
getObservedBonus()
getHybridRankScore()
Este módulo encapsula la fórmula de ranking.
4.3 señales observadas
Archivo:
Copiar código

lib/provider-observed-signals.ts
Responsable de:
agregar datos desde leads
calcular métricas por proveedor
devolver mapa de señales
5. Filtrado de proveedores elegibles
Antes de aplicar ranking, el sistema filtra proveedores.
Un proveedor es elegible si:
activo
Copiar código

provider.active = true
servicio compatible
Copiar código

provider.service_slug === lead.service_slug
ciudad compatible
Copiar código

provider.city_scope cubre lead.city_interest
autoassign permitido (si aplica)
Copiar código

provider.auto_assign = true
6. Estados posibles de asignación
El sistema puede producir tres resultados.
Auto asignado
Copiar código

assignment_mode = auto_assigned
El proveedor recibe el lead automáticamente.
Revisión manual
Copiar código

assignment_mode = pending_review
Se produce cuando:
no hay proveedores autoassignables
reglas operativas requieren intervención humana
Sin proveedor elegible
Copiar código

assignment_reason = no_eligible_provider
Indica falta de cobertura en el marketplace.
7. Evolución del sistema
El módulo ha evolucionado en fases.
FASE 1 — Ranking manual
Versión inicial del sistema.
Ordenaba proveedores usando control manual.
Fórmula:
Copiar código

manual_base =
(priority * 10) +
(score * 3)
Variables:
priority
control estratégico del negocio.
score
afinidad comercial.
FASE 2 — Métricas operativas
Se introdujeron métricas para entender rendimiento real.
Datos provenientes de:
Copiar código

leads table
Campos utilizados:
Copiar código

provider_id
suggested_provider_id
assignment_mode
Métricas calculadas
assigned_leads_count
Copiar código

leads donde provider_id = provider.id
suggested_count
Copiar código

leads donde suggested_provider_id = provider.id
auto_assignment_share
Copiar código

auto_assigned / assigned
manual_override_share
Copiar código

manual_override / assigned
suggested_to_assigned_rate
Copiar código

assigned / suggested
FASE 3 — Ranking híbrido
El ranking actual combina:
control manual
señales observadas
Fórmula del ranking
Copiar código

manual_base =
(priority * 10) +
(score * 3)

raw_observed_bonus =
(suggested_to_assigned_rate * 25) +
(auto_assignment_share * 15) -
(manual_override_share * 10)

confidence_factor =
min(1, max(assigned_leads_count, suggested_count) / 10)

observed_bonus =
clamp(raw_observed_bonus * confidence_factor, -12, 12)

hybrid_rank_score =
manual_base + observed_bonus
8. Protección contra bajo volumen
Para evitar ruido estadístico:
Copiar código

confidence_factor =
min(1, max(assigned_leads_count, suggested_count) / 10)
Esto significa:
volumen
influencia
0
0
3
0.3
5
0.5
10+
1
Providers nuevos no reciben penalización ni bonus.
9. Ventana temporal de señales
Las señales observadas se calculan usando:
Copiar código

últimos 90 días de leads
Query:
Copiar código

created_at >= now() - interval '90 days'
Esto evita que el histórico antiguo distorsione el ranking actual.
10. Observabilidad del sistema
Durante despliegue del ranking híbrido se introdujo logging temporal.
Log:
Copiar código

Provider routing ranking debug
Incluye:
Copiar código

priority
score
assigned_leads_count
suggested_count
auto_assignment_share
manual_override_share
suggested_to_assigned_rate
hybrid_rank_score
Esto permite validar comportamiento del ranking en producción.
11. Riesgos actuales
crecimiento de leads
La query de señales observadas puede crecer.
Mitigación futura:
Copiar código

materialized metrics table
calibración del ranking
Los pesos actuales:
Copiar código

25 / 15 / -10
cap [-12,12]
Podrían ajustarse con datos reales.
12. Evolución futura
Fase 4 — métricas persistentes
Evitar agregación en runtime.
Crear tabla:
Copiar código

provider_performance_metrics
Actualizada diariamente.
Fase 5 — aprendizaje adaptativo
El ranking podría incorporar:
tasa de conversión
tiempo de respuesta
satisfacción del cliente
Fase 6 — reglas comerciales
El negocio podrá definir niveles de proveedor:
Copiar código

premium
preferred
backup
Esto afectará el ranking.
13. Arquitectura objetivo
El sistema evolucionará hacia:
Copiar código

Lead Intake
↓
Provider Eligibility Engine
↓
Provider Performance Metrics
↓
Hybrid Ranking Engine
↓
Assignment Decision
↓
Feedback Loop
Esto crea un motor de optimización continua.
14. Objetivo final del módulo
El objetivo del sistema es convertirse en:
un motor inteligente de asignación que maximice conversión, calidad y eficiencia operativa.
Debe permitir:
distribución justa de leads
aprendizaje continuo
control estratégico del negocio
mínima intervención manual
15. Resumen
Actualmente el sistema ya implementa:
✔ filtrado de elegibilidad
✔ ranking híbrido
✔ señales observadas
✔ protección estadística
✔ trazabilidad de decisiones
Las próximas mejoras se enfocarán en:
performance
calibración
reglas comerciales
aprendizaje adaptativo.