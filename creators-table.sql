-- 在 Supabase SQL Editor 执行: https://supabase.com/dashboard/project/jfpeycpiyayrpjldppzq/sql/new
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

-- 开启 RLS 但允许 service_role 写入
ALTER TABLE public.creator_registrations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "service_role_all" ON public.creator_registrations
  FOR ALL USING (true) WITH CHECK (true);
