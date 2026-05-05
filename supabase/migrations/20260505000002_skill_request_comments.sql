-- Create skill request comments table for admin to reply to user requests
-- Run this in Supabase Dashboard SQL Editor

CREATE TABLE IF NOT EXISTS public.skill_request_comments (
  id bigint primary key generated always as identity,
  request_id bigint not null references public.skill_requests(id) on delete cascade,
  user_id uuid,
  comment text not null,
  created_at timestamptz default now()
);

ALTER TABLE public.skill_request_comments ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS service_role_all ON public.skill_request_comments;
CREATE POLICY service_role_all ON public.skill_request_comments FOR ALL USING (true) WITH CHECK (true);
CREATE INDEX IF NOT EXISTS idx_comment_request_id ON public.skill_request_comments(request_id);
