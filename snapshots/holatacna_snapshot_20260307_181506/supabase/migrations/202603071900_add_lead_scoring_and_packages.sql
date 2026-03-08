alter table public.leads
add column if not exists lead_score integer default 0;

alter table public.leads
add column if not exists lead_priority text default 'Baja';

alter table public.leads
add column if not exists suggested_package_slug text;
