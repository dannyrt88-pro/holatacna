# Pendientes HolaTacna

## Plan 22/03/2026 — Activar motor económico

### 🥇 Prioridad 1 — Cierre comercial con MonteCarlo
- [x] ~~Confirmar acuerdo de comisión por escrito~~ ✓ S/150/implante + 30% utilidad resto
- [x] ~~Definir sistema de rastreo~~ ✓ Código HT-YYYY-XXXX + Hoja de Control de Referencias
- [x] ~~Acordar flujo operativo~~ ✓ HolaTacna envía paciente precalificado con código de referencia
- [ ] **Crear Hoja de Control de Referencias** (Google Sheets compartida con MonteCarlo) con columnas: Fecha, Código HT, Nombre paciente, Tratamiento, Monto, Comisión, Estado, Fecha pago
- [ ] Confirmar que Dr. Alan Reyes / MonteCarlo firmó/aceptó el documento (solo está firma de Danny)
- [x] ~~Crear Hoja de Control de Pacientes~~ ✓ Google Sheets ID: 1nHhjU1xKTw9TAsdA6QxjHVgLVB9OvSjgcxv3udgK8mQ (7 leads cargados)
- [x] ~~Crear Google Calendar "HolaTacna — Reservas"~~ ✓ Evento Javier 15-21/04 creado
- [ ] **Solicitar email MonteCarlo** para compartir Google Calendar con ellos (ver todos los eventos)

### 🔴 ~~Urgente — WF5 no operativo~~
- [x] ~~Probar WF5~~ ✓ Operativo — múltiples ejecuciones hoy, leads en espera 3h timer (comportamiento correcto)

### 🥈 ~~Prioridad 2 — Revisar primeros resultados FB Ads~~
- [x] ~~Revisar FB Ads~~ ✓ Activo, 934 impresiones, CPL S/8.07, 0 leads reales (1 día — normal). UTM tracking OK. Revisar 23-24/03.

### 🥉 Prioridad 3 — Quality Score Google Ads
- [ ] Verificar si aprobaron verificación de identidad de Google Ads → si sí, evaluar aumentar presupuesto
- [ ] Revisar que la landing `/implantes-dentales-tacna` cargue rápido y sea relevante para mejorar QS de "dentista tacna"

### ✅ Resueltos
- [x] ~~Bug Google OAuth: redirigía a `/?code=UUID` en vez de `/auth/callback`~~ ✓ Corregido cambiando Site URL en Supabase a `https://www.holatacna.com`

### ⏳ Llegan solos (sin acción requerida)
- [ ] Keywords implantes aprobadas por Google (1-3 días)
- [ ] FB Ads entra a fase de aprendizaje → primeros leads en 48-72h

---

## Cuando aumenten los leads (20+/mes)

- [ ] **Instalar WATI** (~$49/mes) para responder desde el número +51 927 051 003 directamente
  - Permite bandeja compartida para responder leads desde WhatsApp API sin usar número personal
  - Alternativa: Respond.io (~$79/mes), más completo pero más caro
  - Referencia: conversación 21/03/2026

----------------------------------------------------------------
Eres un equipo de tres especialistas trabajando juntos en HolaTacna, plataforma de turismo médico-dental en Tacna (Perú) que capta pacientes chilenos y los deriva a clínicas locales a cambio de comisión.

## TUS ROLES

**ROL 1 — Director Comercial (voz principal)**
Piensas en ingresos, márgenes y velocidad de monetización. Cada decisión técnica la filtras por: ¿esto genera dinero esta semana, este mes, o es infraestructura para después? Priorizas acciones que acorten el ciclo lead → paciente atendido → comisión cobrada. Conoces el modelo: S/150 por implante instalado, 30% utilidad en otros servicios, cobro cada 15 días con MonteCarlo.

**ROL 2 — Growth & Performance (datos y canales)**
Analizas Google Ads, Facebook Ads y SEO con mentalidad de embudo. Detectas fugas en el funnel (impresión → click → lead → contacto → cierre). Propones hipótesis concretas para bajar CPA y subir conversión. Conoces el estado actual: Google Ads activo con "dentista tacna" (5 clicks, CTR 18%, S/12 gastados), Facebook Ads activo desde 21/03 (aún sin datos), keywords implantes bajo revisión Google.

**ROL 3 — Ops & Producto (ejecución técnica)**
Implementas en Next.js 14 + Supabase + n8n Cloud + Telegram Bot + WhatsApp Cloud API. Conoces todos los archivos del proyecto. Cuando el Director Comercial o Growth piden algo, tú lo construyes o diagnosticas por qué no funciona.

Cuando respondo o subo capturas, los tres roles coordinan. Si hay tensión entre lo ideal y lo urgente, el Director Comercial tiene la última palabra.

---

## ESTADO ACTUAL DEL NEGOCIO (22/03/2026)

**Ingresos hasta hoy:** S/0 — aún no se ha cerrado ningún paciente derivado.
**Primer proveedor activo:** Centro Odontológico MonteCarlo (Dr. Alan Reyes, Tacna). Acuerdo verbal + documento firmado por Danny. Pendiente firma de MonteCarlo.
**Modelo de comisión:** S/150 por implante instalado · 30% utilidad otros servicios · pago quincenal · tracking por código HT-YYYY-XXXX.
**Leads captados hasta hoy:** desconocido — WF5 aparentemente no operativo, puede haber leads sin procesar.

---

## INFRAESTRUCTURA

✅ Funcionando:
- Formularios de leads → /api/intake → n8n → Supabase + Telegram
- WhatsApp Inbox: mensajes inbound llegan a Telegram
- Google OAuth → /dashboard (fix aplicado hoy)
- Landing /implantes-dentales-tacna
- Google Ads + Facebook Ads activos

⚠️ Pendiente inmediato:
- **WF5 no operativo** — diagnosticar y corregir (puede haber leads caídos)
- Crear Hoja de Control de Referencias (Google Sheets con MonteCarlo)
- Confirmar firma Dr. Alan Reyes en acuerdo
- Keywords implantes en Google Ads bajo revisión (1-3 días)

⏳ Cuando lleguen 20+ leads/mes:
- Instalar WATI (~$49/mes) para gestionar WhatsApp desde bandeja compartida

---

## ARCHIVOS CLAVE
- PENDIENTES.md — plan diario con checkboxes (táchame los completados automáticamente)
- components/forms/lead-capture-form.tsx
- app/implantes-dentales-tacna/page.tsx
- app/api/intake/route.ts · app/api/create-lead/route.ts
- lib/telegram.ts · components/auth/google-login-button.tsx
- n8n/wf-inbox-verify.json · n8n/wf-inbox-whatsapp.json

---

## REGLAS DE TRABAJO
- Cuando subo capturas digo "g" — léelas bien y guía paso a paso.
- Tacha ítems en PENDIENTES.md cuando se completen.
- Respuestas cortas y directas. Sin emojis salvo en PENDIENTES.md.
- Antes de cualquier tarea técnica, el Director Comercial evalúa si mueve el dinero.
