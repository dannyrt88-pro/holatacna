# Implementation Log

Date: 2026-03-07

## Goal

Stabilize the current platform with the minimum safe set of changes, following this order:

1. Restore `app/page.tsx` as the public home.
2. Consolidate authentication around Supabase Auth.
3. Align public forms with the lead API to reduce data loss.
4. Leave traceability for each change.

## Root Cause Summary

- `app/page.tsx` and the public services lacked a shared source of truth.
- Authentication mixed Supabase password auth, Supabase OAuth, and a dormant `next-auth` route.
- Public services existed only as duplicated strings spread across pages.
- Forms captured fields that the lead API did not persist consistently.

## Changes

### Step 1. Home restored

- Added a shared service catalog in `lib/service-catalog.ts`.
- Rewired `app/page.tsx` to render the current specialties from the shared catalog instead of hardcoding service cards independently.

### Step 2. Auth consolidated

- Replaced the login page with a server-rendered form that posts to `/auth`.
- Updated `/auth` to keep a single password-based Supabase login flow and redirect to `/dashboard`.
- Updated `middleware.ts` to validate Supabase sessions for `/admin`, `/dashboard`, and `/providers`.
- Replaced the unused `next-auth` route with a safe `410` response to prevent accidental runtime issues.

### Step 3. Lead flow aligned

- Updated `app/api/create-lead/route.ts` to align strictly with the current `leads` schema.
- Updated specialty pages to send the canonical service name from the shared catalog.
- Added `landing_path` to public form submissions for traceability.
- Updated the Estetica form to send its textarea content instead of discarding it.

### Step 4. Verification

- Ran lint to catch syntax and typing issues after the changes.

## Follow-up Stabilization

### Step 5. Dashboard and providers lint cleanup

- Added shared CRM types in `lib/crm-types.ts`.
- Removed `any` usage from `app/dashboard/page.tsx` and `app/providers/page.tsx`.
- Stabilized `useEffect` dependencies with callbacks to satisfy lint without changing business flow.

### Step 6. Admin consolidation

- Redirected `app/admin/page.tsx` to `/dashboard` so the project uses a single operational panel.

### Step 7. Lead schema alignment

- Removed the temporary `message` insert attempt from `app/api/create-lead/route.ts` because the `leads` table does not have that column.
- Kept `message_persisted: false` in the API response so the omission is explicit and traceable.

## Schema Change

### Step 8. Add `message` to leads

- Added a SQL migration in `supabase/migrations/20260307_add_message_to_leads.sql`.
- Re-enabled `message` persistence in `app/api/create-lead/route.ts`.
- Extended `lib/crm-types.ts` so the lead shape can represent the new field.
- Applied the migration remotely through `supabase db push`.
- Re-ran `supabase db push` and confirmed the remote database is up to date.

### Step 9. Dashboard visibility for `message`

- Added a `Mensaje` column to `app/dashboard/page.tsx`.
- The dashboard now renders the stored lead message directly from Supabase.

### Step 10. Safe cleanup for test leads

- Added a protected route in `app/api/admin/cleanup-test-leads/route.ts`.
- The route deletes only leads with `utm_source = 'codex-test'`.
- Added a `Limpiar leads de prueba` button in `app/dashboard/page.tsx` to execute the cleanup from the CRM.

### Step 11. Remote cleanup for minimal test leads

- The cleanup targeted only leads marked with `utm_source = 'codex-test'`, which correspond to the low-data terminal tests created during validation.
- This preserved real leads and kept the cleanup criterion explicit and auditable.
- Executed the cleanup directly against Postgres and removed the two low-data Codex test leads.
- Verified through the Supabase REST API that no `codex-test` leads remain visible.

### Step 12. Responsive hardening

- Reworked the public home into a responsive layout for mobile, tablet, and desktop.
- Added shared responsive shells for service landings and SEO city pages to avoid rigid duplicated grids.
- Wrapped client forms that use `useSearchParams` in `Suspense` so production build remains stable.
- Revalidated the project with `npm run lint` and `npm run build`.

### Step 12. Provider creation and profile management

- Extended the `providers` shape to support `email`, `website_url`, and `photo_url`.
- Added a migration to store those provider profile fields in Supabase.
- Rebuilt `app/providers/page.tsx` so admins can create providers directly from the UI.
- The provider screen now supports photo preview, optional image upload as data URL, and inline editing of all operational provider fields used by routing and CRM assignment.

## Commercial Tracking

### Step 12. Lead attribution support

- Added `utm_source`, `utm_medium`, `utm_campaign`, `landing_path` and `city_interest` to the shared `Lead` type.
- Added a safe migration in `supabase/migrations/202603071030_add_lead_tracking_fields.sql` using `add column if not exists`.
- Kept `app/api/create-lead/route.ts` aligned with the existing commercial flow while persisting the new attribution fields.

### Step 13. Medical landing capture

- Updated the four medical landings to read `utm_source`, `utm_medium` and `utm_campaign` from the URL.
- Added a Chile city selector to each landing.
- Sent `city_interest`, UTM values and `landing_path` to the lead endpoint while preserving `service_name`, `service_id` and `message`.

### Step 14. Dashboard visibility and filtering

- Added dashboard columns for `Ciudad`, `Landing`, `Fuente` and `Campaña`.
- Added a city filter while keeping existing service, status and premium filters.
- Preserved message visibility, provider assignment, direct/manual mode and revenue/commission behavior.

## Files Touched

- `IMPLEMENTATION_LOG.md`
- `lib/service-catalog.ts`
- `lib/crm-types.ts`
- `app/page.tsx`
- `app/hoteles/page.tsx`
- `app/restaurants/page.tsx`
- `app/transporte/page.tsx`
- `app/alquiler-departamentos/page.tsx`
- `app/compras-por-mayor/page.tsx`
- `app/login/page.tsx`
- `app/auth/route.ts`
- `middleware.ts`
- `app/api/create-lead/route.ts`
- `supabase/migrations/20260307_add_message_to_leads.sql`
- `supabase/migrations/202603071030_add_lead_tracking_fields.sql`
- `app/api/auth/[...nextauth]/route.ts`
- `app/api/admin/cleanup-test-leads/route.ts`
- `lib/chile-cities.ts`
- `lib/lead-tracking.ts`
- `app/dermatologia/page.tsx`
- `app/estetica/page.tsx`
- `app/oftalmologia/page.tsx`
- `app/implantes-dentales/page.tsx`
- `app/arica/implantes-dentales/page.tsx`
- `app/arica/oftalmologia/page.tsx`
- `app/iquique/estetica/page.tsx`
- `app/antofagasta/dermatologia/page.tsx`
- `components/forms/medical-service-page.tsx`
- `components/shared/service-page-shell.tsx`
- `components/shared/medical-city-seo-page.tsx`

## Hotels Service

### Step 15. New tourism service module

- Added `Hoteles` to the shared service catalog so the home shows the new service without hardcoding a separate card.
- Created a dedicated route in `app/hoteles/page.tsx` following the current top-level service pattern already used by the medical services.
- Added a dedicated form component in `components/forms/hotel-lead-form.tsx` with validation for country, destination city, dates, guests and estimated budget.
- Reused the existing `create-lead` endpoint to preserve dashboard, Supabase and manual/automatic assignment compatibility.
- Persisted the hotel-specific details safely through the current schema by storing structured request details in `message`, using `preferred_date` for check-in and `city_interest` for destination city.

### Step 16. Restaurants tourism module

- Added `Restaurants` to the shared service catalog so the home exposes the new tourism vertical automatically.
- Created `app/restaurants/page.tsx` following the current top-level route pattern used by existing services.
- Added `components/forms/restaurant-lead-form.tsx` with validation for destination, date, time, party size, cuisine preference and estimated budget.
- Reused the existing `create-lead` flow to keep Supabase, dashboard visibility and manual/automatic assignment compatibility intact.
- Persisted the restaurant-specific details safely through `message`, using `preferred_date` for the desired date and `city_interest` for destination.

### Step 17. Transporte logistics module

- Added `Transporte` to the shared service catalog so the home exposes the new logistics vertical automatically.
- Created `app/transporte/page.tsx` following the current top-level route pattern used by existing services.
- Added `components/forms/transport-lead-form.tsx` with validation for area, origin, destination, service date, approximate time, passenger count and transport type.
- Reused the existing `create-lead` flow to keep Supabase, dashboard visibility and manual/automatic assignment compatibility intact.
- Persisted the transport-specific details safely through `message`, using `preferred_date` for the service date and `city_interest` for the city or zone.

### Step 18. Compras por mayor commerce module

- Added `Compras por mayor` to the shared service catalog so the home exposes the new commerce vertical automatically.
- Created `app/compras-por-mayor/page.tsx` following the current top-level route pattern used by existing services.
- Added `components/forms/wholesale-lead-form.tsx` with validation for product type, estimated quantity, purchase frequency, delivery location, estimated budget and buyer type.
- Reused the existing `create-lead` flow to keep Supabase, dashboard visibility and manual/automatic assignment compatibility intact.
- Persisted the wholesale-specific details safely through `message`, using `city_interest` for the delivery city or country.

### Step 19. Alquiler de Departamentos tourism module

- Added `Alquiler de Departamentos` to the shared service catalog so the home exposes the new temporary lodging vertical automatically.
- Created `app/alquiler-departamentos/page.tsx` following the current top-level route pattern used by existing services.
- Added `components/forms/apartment-rental-lead-form.tsx` with validation for destination city, check-in, check-out, guest count, accommodation type and estimated budget.
- Reused the existing `create-lead` flow to keep Supabase, dashboard visibility and manual/automatic assignment compatibility intact.
- Persisted the apartment-rental-specific details safely through `message`, using `preferred_date` for check-in and `city_interest` for destination city.

### Step 20. Telegram lead notifications

- Added `lib/telegram.ts` to send optional Telegram notifications using `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID`.
- Integrated Telegram delivery into `app/api/create-lead/route.ts` after lead creation and optional provider selection.
- Kept the integration non-blocking so Telegram failures never break lead capture.

### Step 21. Commercial acceleration and intelligent routing

- Added `lib/whatsapp-messages.ts` to centralize reusable commercial copy for patient follow-up and provider routing without breaking the existing WhatsApp buttons in the dashboard.
- Added `lib/lead-scoring.ts` to calculate a numeric lead score and a business priority level based on Chile, premium medical services, city intent, case detail and direct/manual context.
- Added `lib/package-catalog.ts` to prepare the platform for high-value medical bundles that combine treatment, lodging and transport.
- Added `lib/medical-seo-routes.ts` to centralize the existing city-plus-service SEO pages and avoid duplicated route definitions.
- Added `supabase/migrations/202603071900_add_lead_scoring_and_packages.sql` so `leads` can persist `lead_score`, `lead_priority` and `suggested_package_slug`.
- Updated `app/api/create-lead/route.ts` to persist scoring and suggested packages, and to keep provider auto-assignment aligned with the strengthened routing logic.
- Updated `lib/provider-routing.ts` so automatic provider selection considers active providers, service fit, auto-assign, provider priority, provider score, commission and lead quality.
- Updated `app/dashboard/page.tsx` to show lead score, commercial priority, suggested package and auto-assignment visibility while keeping manual/direct workflow intact.

### Step 22. Complementary services and multi-provider direct mode

- Added `additional_services` and `direct_provider_ids` to `leads` through a safe migration so the CRM can capture upsell intent and direct routing lists without breaking the existing provider slot.
- Updated the public medical forms to let the patient mark complementary services before submitting the lead.
- Changed package suggestion so it is only attached to the lead when the form includes complementary services that match a configured package.
- Extended the dashboard so manual assignment still uses `provider_id`, while direct mode can store and send the lead to multiple selected providers.

### Step 23. Provider self-service onboarding

- Reused the existing `/providers` screen with a public mode enabled by `?register=1`, so providers can complete their profile without seeing the internal provider list.
- Added a shared onboarding form for provider registration and connected both the public flow and the admin creation flow to the same registration backend.
- Added internal alerts for provider registration with Telegram active and email/WhatsApp hooks ready through environment variables.
- Added a direct share link and QR code in the admin provider panel to distribute the self-service registration flow.

### Step 24. Provider declaration and internal qualification control

- Hid `priority` and `score` from the external provider self-registration flow.
- Forced self-service registrations to remain pending, with provider qualification and operational routing controlled internally by HolaTacna.
- Added a required declaration checkbox so the provider confirms the entered data are real and acknowledges the preliminary commercial commission agreement.
- Added an auto-generated downloadable preliminary agreement after successful external registration.
- Corrected the external onboarding submit flow to use the existing registration API route.
