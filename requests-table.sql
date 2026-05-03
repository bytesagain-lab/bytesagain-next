-- 在 Supabase SQL Editor 执行: https://supabase.com/dashboard/project/jfpeycpiyayrpjldppzq/sql/new
CREATE TABLE IF NOT EXISTS public.skill_requests (
  id bigint primary key generated always as identity,
  request text not null,
  contact text,
  created_at timestamptz default now()
);

ALTER TABLE public.skill_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anon_select" ON public.skill_requests FOR SELECT USING (true);
CREATE POLICY "anon_insert" ON public.skill_requests FOR INSERT WITH CHECK (true);
