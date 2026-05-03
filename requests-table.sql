-- 追加新字段（如果表已存在，跑这个）：
ALTER TABLE public.skill_requests 
  ADD COLUMN IF NOT EXISTS title text,
  ADD COLUMN IF NOT EXISTS use_case text,
  ADD COLUMN IF NOT EXISTS platform text,
  ADD COLUMN IF NOT EXISTS budget text;

-- 或者删了重建（会清空已有数据）：
-- DROP TABLE IF EXISTS public.skill_requests;
-- CREATE TABLE public.skill_requests (
--   id bigint primary key generated always as identity,
--   title text,
--   request text not null,
--   use_case text,
--   platform text,
--   budget text,
--   contact text,
--   created_at timestamptz default now()
-- );
