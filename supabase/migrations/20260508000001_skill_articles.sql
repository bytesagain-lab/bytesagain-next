-- Create skill_articles association table for linking skills to articles
-- Auto-populated by scanning article content for skill slug mentions

CREATE TABLE IF NOT EXISTS public.skill_articles (
  id bigint primary key generated always as identity,
  skill_slug text not null,
  article_slug text not null,
  created_at timestamptz default now(),
  UNIQUE(skill_slug, article_slug)
);

-- Index for fast lookup
CREATE INDEX IF NOT EXISTS idx_skill_articles_skill_slug ON public.skill_articles(skill_slug);
CREATE INDEX IF NOT EXISTS idx_skill_articles_article_slug ON public.skill_articles(article_slug);

-- Allow service_role full access
ALTER TABLE public.skill_articles ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS service_role_all ON public.skill_articles;
CREATE POLICY service_role_all ON public.skill_articles FOR ALL USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS anon_select ON public.skill_articles;
CREATE POLICY anon_select ON public.skill_articles FOR SELECT USING (true);
