-- Create skill evaluations table for storing evaluation results
-- Run this in Supabase Dashboard SQL Editor

CREATE TABLE IF NOT EXISTS public.skill_evaluations (
  id bigint primary key generated always as identity,
  slug text not null unique,
  evaluation jsonb not null,
  safety_score integer default 0,
  risk_level text default 'unknown',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Allow service_role full access
ALTER TABLE public.skill_evaluations ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS service_role_all ON public.skill_evaluations;
CREATE POLICY service_role_all ON public.skill_evaluations FOR ALL USING (true) WITH CHECK (true);

-- Index for fast lookup by slug
CREATE INDEX IF NOT EXISTS idx_skill_evaluations_slug ON public.skill_evaluations(slug);
