CREATE TABLE IF NOT EXISTS public.creator_registrations (
  id bigint primary key generated always as identity,
  github text not null,
  name text not null,
  contact_method text not null,
  contact_value text not null,
  skills text not null,
  pricing text,
  bio text,
  status text default 'pending',
  created_at timestamptz default now()
);
ALTER TABLE public.creator_registrations ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS service_role_all ON public.creator_registrations;
CREATE POLICY service_role_all ON public.creator_registrations FOR ALL USING (true) WITH CHECK (true);
