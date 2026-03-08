alter table public.leads
add column if not exists utm_content text,
add column if not exists utm_term text;
