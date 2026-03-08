alter table public.leads
add column if not exists utm_source text,
add column if not exists utm_medium text,
add column if not exists utm_campaign text,
add column if not exists landing_path text,
add column if not exists city_interest text;
