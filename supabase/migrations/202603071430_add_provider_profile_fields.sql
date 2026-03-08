alter table public.providers
add column if not exists email text,
add column if not exists website_url text,
add column if not exists photo_url text;
