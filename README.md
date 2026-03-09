# HolaTacna

HolaTacna es una plataforma web enfocada en captar leads y convertir pacientes o clientes interesados en servicios medicos y esteticos entre Tacna y ciudades del norte de Chile, especialmente Arica, Iquique y Antofagasta.

## Stack actual

- Next.js App Router
- React 19
- TypeScript
- Tailwind CSS 4
- Supabase
- Vercel

## Objetivo del producto

- captar leads comerciales desde landings SEO
- coordinar atencion por WhatsApp
- derivar casos hacia clinicas y proveedores verificados
- operar un dashboard interno para seguimiento comercial

## Areas principales del proyecto

- `app/`
  - paginas publicas
  - landings medicas y comparativas SEO
  - auth, dashboard y rutas API
- `components/`
  - formularios y shells reutilizables
- `lib/`
  - tracking UTM, scoring, routing de proveedores, metadata y utilidades
- `supabase/migrations/`
  - cambios de esquema de base de datos

## Rutas clave

- Home: `/`
- Landings principales:
  - `/implantes-dentales-tacna`
  - `/operacion-ojos-tacna`
  - `/estetica-tacna`
  - `/dermatologia-tacna`
- Comparativas:
  - `/implantes-dentales-tacna-vs-chile`
  - `/operacion-ojos-tacna-vs-chile`
  - `/estetica-tacna-vs-chile`
  - `/dermatologia-tacna-vs-chile`
- SEO por ciudad:
  - rutas en `/arica/*`
  - rutas en `/iquique/*`
  - rutas en `/antofagasta/*`
- Operacion interna:
  - `/dashboard`
  - `/providers`
  - `/admin`
  - `/access`

## Flujo de leads

1. el usuario llega desde una landing SEO o pagina comercial
2. completa un formulario
3. la app envia el lead a `/api/create-lead`
4. se persiste en Supabase
5. se calculan prioridad, score y sugerencias comerciales
6. se intenta asignacion automatica de proveedor cuando aplica
7. se notifica por Telegram y se gestiona desde el dashboard

## Comandos utiles

```bash
npm run dev
npm run build
npm run lint
```

## Variables de entorno esperadas

Minimas para funcionamiento base:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Usadas por operaciones e integraciones:

- `NEXT_PUBLIC_SITE_URL` o `SITE_URL`
- `ADMIN_EMAILS`
- `MONITOR_EMAILS`
- `TELEGRAM_BOT_TOKEN`
- `TELEGRAM_CHAT_ID`
- `DATABASE_URL`
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `PROVIDER_ALERT_EMAIL_TO`
- `WHATSAPP_ALERT_WEBHOOK_URL`

## SEO tecnico base

El proyecto usa:

- metadata global en `app/layout.tsx`
- helper reusable en `lib/seo/metadata.ts`
- `app/robots.ts`
- `app/sitemap.ts`

## Despliegue

El proyecto esta pensado para desplegarse en Vercel.

Recomendaciones:

- mantener las variables de entorno sincronizadas entre local y produccion
- validar `npm run build` antes de subir cambios
- no indexar rutas privadas ni paneles internos
