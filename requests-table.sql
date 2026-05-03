-- 在 Supabase SQL Editor 执行
ALTER TABLE public.skill_requests 
  ADD COLUMN IF NOT EXISTS user_id uuid references auth.users(id),
  ADD COLUMN IF NOT EXISTS allow_contact boolean default false;

-- 删除 use_case 列（如果存在）
ALTER TABLE public.skill_requests DROP COLUMN IF EXISTS use_case;
