alter table public.providers
add column if not exists auto_assign boolean default false,
add column if not exists priority integer default 0,
add column if not exists active boolean default true,
add column if not exists service_slug text,
add column if not exists commission_rate numeric,
add column if not exists notes text,
add column if not exists city_scope text,
add column if not exists score integer default 0;
