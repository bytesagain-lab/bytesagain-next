-- 一次跑完所有 SQL
-- 1. 需求表加新字段
ALTER TABLE public.skill_requests 
  ADD COLUMN IF NOT EXISTS image_url text,
  ADD COLUMN IF NOT EXISTS view_count integer default 0,
  ADD COLUMN IF NOT EXISTS show_contact boolean default false,
  ADD COLUMN IF NOT EXISTS nickname text;

-- 2. 用户昵称表
CREATE TABLE IF NOT EXISTS public.profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  updated_at timestamptz default now()
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "users_crud_own" ON public.profiles;
CREATE POLICY "users_crud_own" ON public.profiles FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- 3. 留言表
CREATE TABLE IF NOT EXISTS public.skill_request_comments (
  id bigint primary key generated always as identity,
  request_id bigint not null references public.skill_requests(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  comment text not null,
  created_at timestamptz default now()
);
ALTER TABLE public.skill_request_comments ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_select" ON public.skill_request_comments;
DROP POLICY IF EXISTS "auth_insert" ON public.skill_request_comments;
CREATE POLICY "anon_select" ON public.skill_request_comments FOR SELECT USING (true);
CREATE POLICY "auth_insert" ON public.skill_request_comments FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 4. 浏览量自增函数
CREATE OR REPLACE FUNCTION public.increment_view(row_id bigint)
 RETURNS void LANGUAGE sql AS $$
  UPDATE public.skill_requests SET view_count = COALESCE(view_count,0) + 1 WHERE id = row_id;
$$;
