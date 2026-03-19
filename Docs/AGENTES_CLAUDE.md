# Agentes Claude — HolaTacna
## Documentación Operativa

---

## Resumen del sistema

HolaTacna opera 5 agentes de inteligencia artificial construidos sobre Claude claude-sonnet-4-6, integrados en n8n Cloud y conectados a Supabase, Telegram y WhatsApp. Cada agente tiene una responsabilidad única dentro del pipeline comercial.

**Stack:** Claude API (Anthropic) + n8n Cloud + Supabase + Telegram Bot + WhatsApp Business

---

## WF6 — Agente Asesor WhatsApp
**Prioridad comercial: #1 — Monetización inmediata**

### ¿Qué hace?
Genera el primer mensaje de WhatsApp personalizado para cada lead que entra al sistema. Analiza el nombre, servicio de interés, ciudad y mensaje del paciente para crear un texto que maximice la probabilidad de respuesta.

### Trigger
Webhook POST en `/wf6-asesor-whatsapp` — llamado desde WF1 después de que el lead es guardado en Supabase.

### Flujo
1. Recibe datos del lead vía webhook
2. Envía a Claude el perfil completo del lead
3. Claude genera un mensaje WhatsApp personalizado (máx 110 palabras)
4. Extrae el mensaje generado
5. Envía el mensaje al equipo vía Telegram para que lo copie y envíe al lead

### Prompt clave
Claude actúa como Asesor Comercial de HolaTacna. Recibe: nombre, servicio, ciudad, mensaje del lead y fuente. Genera un mensaje cálido, específico, con el ahorro concreto del servicio y UN solo próximo paso. Máximo 2 emojis. Español chileno.

### Output en Telegram
```
🤖 Mensaje WhatsApp sugerido por IA

👤 [Nombre del lead]
📱 [Teléfono]
🏥 [Servicio]
🌆 [Ciudad]

━━━ MENSAJE SUGERIDO ━━━
[Texto generado por Claude]
━━━━━━━━━━━━━━━━━━━━

Copia este mensaje y envíalo al lead por WhatsApp.
```

### Impacto esperado
- Primer mensaje enviado en segundos vs minutos/horas manual
- Personalización por servicio y ciudad
- Consistencia en el tono y propuesta de valor
- El equipo solo copia y envía — sin redactar desde cero

### Variables de entrada requeridas
| Campo | Descripción |
|-------|-------------|
| name | Nombre completo del lead |
| phone | Número WhatsApp |
| service_name | Servicio solicitado |
| city_interest | Ciudad en Chile |
| message | Mensaje libre del formulario |
| utm_source | Fuente de captación |

---

## WF7 — Agente Clasificador de Leads
**Prioridad comercial: #2 — Base de inteligencia**

### ¿Qué hace?
Analiza cada lead entrante y lo clasifica en múltiples dimensiones: urgencia, intención de compra, calidad, y prioridad de atención. Guarda la clasificación en Supabase y notifica al equipo con un resumen ejecutivo y acción recomendada.

### Trigger
Webhook POST en `/wf7-clasificador` — llamado desde WF1 en paralelo con WF6.

### Flujo
1. Recibe datos del lead vía webhook
2. Claude analiza señales de urgencia, intención y calidad
3. Devuelve clasificación estructurada en JSON
4. Guarda clasificación en Supabase (columnas ai_*)
5. Envía reporte de clasificación al equipo vía Telegram

### Prompt clave
Claude actúa como sistema de inteligencia comercial. Analiza señales en el mensaje del lead (fecha de viaje, urgencia, especificidad del servicio, ciudad). Retorna JSON con: urgencia, intención, calidad, prioridad, señales positivas/negativas, resumen y acción recomendada.

### Clasificaciones posibles

**Urgencia:**
- `hot` — menciona fecha, quiere coordinar ahora, ya decidió viajar
- `warm` — interesado pero sin fecha, necesita más información
- `cold` — solo cotizando, sin intención clara de viajar pronto

**Intención:**
- `listo_viajar` — sabe qué quiere, busca coordinar la visita
- `investigando` — entiende el proceso antes de decidir
- `comparando_precio` — foco principal en el precio vs Chile

**Calidad:**
- `alta` — servicio específico, ciudad cercana, mensaje detallado
- `media` — servicio general o ciudad lejana o mensaje vago
- `baja` — sin servicio claro, mensaje muy corto, datos incompletos

**Prioridad (1-5):**
- `1` → Responder en 30 minutos
- `2` → Responder en 1 hora
- `3` → Responder en 3 horas
- `4` → Responder en 24 horas
- `5` → Responder en 48 horas

### Columnas guardadas en Supabase
| Columna | Valor |
|---------|-------|
| ai_urgencia | hot / warm / cold |
| ai_intencion | listo_viajar / investigando / comparando_precio |
| ai_calidad | alta / media / baja |
| ai_prioridad | 1 a 5 |
| ai_resumen | Resumen ejecutivo |
| ai_accion | Acción recomendada |
| ai_classified_at | Timestamp de clasificación |

### Output en Telegram
```
🧠 Lead Clasificado por IA

👤 [Nombre] | 📱 [Teléfono]
🏥 [Servicio] | 🌆 [Ciudad]

🔥 Urgencia: HOT
🎯 Intención: listo viajar
💎 Calidad: ALTA
⚡ Prioridad: 1/5

📋 Resumen: [resumen ejecutivo]
✅ Acción recomendada: [acción específica]
```

### Impacto esperado
- El equipo sabe exactamente a quién llamar primero
- Los leads hot nunca se enfrían por falta de atención
- Base de datos enriquecida con inteligencia para análisis futuros
- Posibilidad de automatizar routing basado en clasificación

---

## WF8 — Agente Generador SEO
**Prioridad comercial: #3 — Crecimiento orgánico**

### ¿Qué hace?
Genera contenido SEO completo para nuevas páginas de HolaTacna. A partir del nombre del servicio y parámetros básicos, produce todo el contenido necesario para publicar una landing page optimizada para Google y orientada a conversión.

### Trigger
Webhook POST en `/wf8-generador-seo` — llamado manualmente cuando se necesita crear una nueva página.

### Flujo
1. Recibe: nombre del servicio, slug sugerido, ahorro estimado, keywords, ciudades target
2. Claude genera el contenido SEO completo en JSON
3. Parsea y valida el JSON generado
4. Envía resumen por Telegram con los datos clave de la página
5. Retorna el JSON completo para implementación en Next.js

### Contenido generado
| Campo | Descripción |
|-------|-------------|
| slug | URL slug optimizado para SEO |
| meta_title | Título SEO (máx 60 caracteres) |
| meta_description | Meta descripción (máx 155 caracteres) |
| h1 | Título principal de la página |
| badge_text | Etiqueta visual del servicio |
| hero_headline | Titular hero impactante |
| hero_subheadline | Subtítulo con propuesta de valor |
| hero_description | Párrafo hero 2-3 líneas |
| savings_hook | Frase de ahorro |
| benefits | Array de 4 beneficios |
| treatment_scope | Array de 4 ítems de tratamiento |
| how_it_works | Array de 3 pasos del proceso |
| faq | Array de 3 preguntas frecuentes |
| form_placeholder | Placeholder del textarea del formulario |
| form_success_message | Mensaje de éxito al enviar |
| cta_text | Texto del botón CTA |
| color_scheme | Esquema de color de la página |
| seo_keywords | Array de 5 keywords principales |

### Variables de entrada
| Campo | Requerido | Ejemplo |
|-------|-----------|---------|
| service_name | Sí | "Blanqueamiento dental" |
| slug | No | "blanqueamiento-dental-tacna" |
| savings | No | "hasta 50%" |
| keywords | No | "blanqueamiento Tacna Chile" |
| target_cities | No | "Arica, Iquique" |
| extra_details | No | "Información adicional" |

### Cómo usar el output
El JSON generado se copia directamente en el archivo `page.tsx` de Next.js, siguiendo la misma estructura de las páginas existentes (ortodoncia-tacna, carillas-dentales-tacna).

### Impacto esperado
- Nueva página SEO en 5 minutos vs 2-3 horas manual
- Contenido optimizado para búsquedas de pacientes chilenos
- Consistencia en tono y estructura entre todas las páginas
- Escalabilidad: se pueden generar 10+ páginas por semana

---

## WF9 — Agente Router de Proveedores
**Prioridad comercial: #4 — Optimización a escala**

### ¿Qué hace?
Cuando HolaTacna tenga múltiples proveedores activos, este agente selecciona automáticamente el mejor proveedor para cada lead según: especialidad, disponibilidad, perfil del paciente y carga actual de trabajo.

### Trigger
Webhook POST en `/wf9-router-proveedores` — llamado desde WF1 o WF7 después de la clasificación.

### Flujo
1. Recibe datos del lead + clasificación de WF7
2. Obtiene lista de proveedores activos desde Supabase
3. Claude evalúa el match entre lead y proveedores disponibles
4. Selecciona el proveedor óptimo con score de match
5. Guarda asignación en Supabase
6. Notifica al equipo vía Telegram

### Criterios de matching (orden de prioridad)
1. **Especialidad** — el proveedor debe ofrecer el servicio solicitado
2. **Disponibilidad** — preferir proveedores con capacidad actual
3. **Perfil del paciente** — precio sensible → proveedor económico; calidad exigente → proveedor premium
4. **Carga actual** — balancear distribución de leads
5. **Historial** — proveedores con mejor tasa de conversión tienen preferencia

### Columnas guardadas en Supabase
| Columna | Valor |
|---------|-------|
| ai_provider_id | ID del proveedor asignado |
| ai_provider_name | Nombre del proveedor |
| ai_match_score | Score de match 0-100 |
| ai_routed_at | Timestamp de routing |

### Nota de activación
Este agente cobra mayor valor cuando existan 3+ proveedores activos en el sistema. Actualmente funciona con MonteCarlo como proveedor único por defecto. Activar cuando se sumen nuevos convenios.

### Impacto esperado
- Cada lead va al proveedor más adecuado para su perfil
- Balance de carga equitativo entre proveedores
- Mejor tasa de conversión por mejor match servicio-proveedor
- Base para liquidaciones automáticas por proveedor

---

## WF10 — Agente Monitor de Calidad
**Prioridad comercial: #5 — Observabilidad operativa**

### ¿Qué hace?
Ejecuta automáticamente cada 6 horas un análisis del estado del pipeline de leads. Detecta leads en riesgo por tiempo de espera, identifica cuellos de botella y genera un reporte de salud operativa con acciones prioritarias.

### Trigger
Schedule: cada 6 horas automáticamente (00:00, 06:00, 12:00, 18:00).

### Flujo
1. Se activa automáticamente cada 6 horas
2. Obtiene todos los leads con status `pending_review` desde Supabase
3. Si no hay leads → envía "Pipeline limpio" a Telegram
4. Si hay leads → Claude analiza tiempo de espera, urgencia y riesgos
5. Genera reporte JSON con métricas de calidad
6. Envía reporte detallado a Telegram

### Métricas del reporte
| Métrica | Descripción |
|---------|-------------|
| total_pendientes | Número de leads sin atender |
| criticos | Leads hot con más de 2h de espera |
| moderados | Leads warm con más de 6h de espera |
| salud_pipeline | buena / regular / crítica |
| score_operativo | Score 0-100 del pipeline |
| tendencias | Patrones detectados en el período |
| acciones_prioritarias | Lista ordenada de acciones inmediatas |
| alerta_principal | Alerta crítica si existe |
| resumen_ejecutivo | Resumen en 2-3 líneas |

### Criterios de alerta
- **Pipeline bueno** — todos los leads atendidos en tiempo
- **Pipeline regular** — 1-3 leads moderados sin atender
- **Pipeline crítico** — algún lead hot sin atender más de 2 horas

### Output en Telegram
```
📊 Reporte de Calidad — HolaTacna
[fecha y hora]

✅ Salud del pipeline: BUENA
📈 Score operativo: 87/100
📋 Leads pendientes: 2

🔴 Críticos (1):
  • Juan Pérez — Implantes (3h sin contacto)

✅ Acciones ahora:
1. Contactar a Juan Pérez por WhatsApp urgente
2. Revisar leads de ayer sin respuesta
3. ...

💬 El pipeline está operando bien con 1 caso crítico...
```

### Impacto esperado
- Ningún lead hot se pierde por falta de seguimiento
- El equipo recibe alertas proactivas sin tener que revisar el dashboard
- Visibilidad total del estado operativo 4 veces al día
- Datos para optimizar tiempos de respuesta del equipo

---

## Integración entre agentes

```
Lead entra por formulario
        ↓
      WF1 (captura + Supabase + WhatsApp bienvenida)
        ↓
   ┌────┴────┐
   ↓         ↓
  WF6       WF7
(mensaje   (clasifica
WhatsApp)   lead)
              ↓
             WF9
           (routing
          proveedor)

              ↑ cada 6h
             WF10
           (monitor
           calidad)

              ↑ manual
             WF8
          (genera SEO)
```

---

## API key Anthropic
- **Modelo usado:** claude-sonnet-4-6
- **Costo estimado por lead procesado:** ~$0.003 USD (WF6 + WF7 combinados)
- **Costo estimado WF10 diario:** ~$0.05 USD (4 ejecuciones × análisis de pipeline)
- **Costo WF8 por página:** ~$0.02 USD

---

## Mantenimiento

### Para mejorar los prompts
Los prompts están en el campo `system` dentro del body del nodo `Claude — ...` en cada workflow. Se pueden editar directamente en n8n haciendo clic en el nodo → campo `body`.

### Para agregar nuevos servicios a WF6
En el system prompt de WF6 hay una sección `SERVICIOS Y AHORROS VERIFICADOS`. Agregar ahí el nuevo servicio con el porcentaje de ahorro correspondiente.

### Para agregar nuevos proveedores a WF9
Insertar el proveedor en la tabla `providers` de Supabase con `status = 'active'`. El agente lo considerará automáticamente en el siguiente routing.

### Para cambiar frecuencia de WF10
En el nodo `Trigger cada 6 horas` → cambiar `hoursInterval` al valor deseado.
