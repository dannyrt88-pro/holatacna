alter table public.leads
add column if not exists attended_at timestamptz,
add column if not exists derivation_type text,
add column if not exists derivation_at timestamptz,
add column if not exists last_status_at timestamptz;
