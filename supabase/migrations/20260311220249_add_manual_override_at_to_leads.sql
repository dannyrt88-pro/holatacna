alter table public.leads
add column if not exists manual_override_at timestamptz null;
