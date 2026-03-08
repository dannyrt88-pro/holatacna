alter table public.leads
add column if not exists additional_services text[] default '{}';

alter table public.leads
add column if not exists direct_provider_ids text[] default '{}';
