alter table public.leads
add column if not exists suggested_provider_id text,
add column if not exists top_provider_ids text[],
add column if not exists assignment_mode text,
add column if not exists assignment_reason text;

create index if not exists leads_suggested_provider_id_idx
  on public.leads (suggested_provider_id);
