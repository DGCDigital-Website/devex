-- =============================================================
-- DGC Beacon — Fix table permissions & RLS policies
-- Run this in: Supabase Dashboard → SQL Editor → Run
-- =============================================================

-- ── 1. GRANT table access to anon + authenticated roles ──────────────────────
-- "permission denied for table X" means the role lacks GRANT, not just RLS.

GRANT ALL ON public.contacts        TO anon, authenticated;
GRANT ALL ON public.jobs            TO anon, authenticated;
GRANT ALL ON public.invoices        TO anon, authenticated;
GRANT ALL ON public.quotations      TO anon, authenticated;
GRANT ALL ON public.calendar_events TO anon, authenticated;
GRANT ALL ON public.blog_posts      TO anon, authenticated;

-- Grant sequence usage for auto-increment columns (contacts uses bigserial)
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;

-- ── 2. Enable RLS on all tables ───────────────────────────────────────────────

ALTER TABLE public.contacts        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jobs            ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoices        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quotations      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.calendar_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts      ENABLE ROW LEVEL SECURITY;

-- ── 3. Drop any stale policies and recreate cleanly ───────────────────────────

-- contacts
DROP POLICY IF EXISTS allow_anon_read_contacts    ON public.contacts;
DROP POLICY IF EXISTS allow_anon_insert_contacts  ON public.contacts;
DROP POLICY IF EXISTS allow_auth_all_contacts     ON public.contacts;
DROP POLICY IF EXISTS beacon_auth_contacts        ON public.contacts;
DROP POLICY IF EXISTS contacts_anon_select        ON public.contacts;
DROP POLICY IF EXISTS contacts_anon_insert        ON public.contacts;
DROP POLICY IF EXISTS contacts_auth_all           ON public.contacts;

CREATE POLICY contacts_anon_select   ON public.contacts FOR SELECT  TO anon          USING (true);
CREATE POLICY contacts_anon_insert   ON public.contacts FOR INSERT  TO anon          WITH CHECK (true);
CREATE POLICY contacts_auth_all      ON public.contacts FOR ALL     TO authenticated USING (true) WITH CHECK (true);

-- jobs
DROP POLICY IF EXISTS allow_anon_read_jobs  ON public.jobs;
DROP POLICY IF EXISTS allow_auth_all_jobs   ON public.jobs;
DROP POLICY IF EXISTS beacon_auth_jobs      ON public.jobs;
DROP POLICY IF EXISTS jobs_anon_select      ON public.jobs;
DROP POLICY IF EXISTS jobs_auth_all         ON public.jobs;

CREATE POLICY jobs_anon_select  ON public.jobs FOR SELECT  TO anon          USING (true);
CREATE POLICY jobs_auth_all     ON public.jobs FOR ALL     TO authenticated USING (true) WITH CHECK (true);

-- invoices
DROP POLICY IF EXISTS allow_auth_all_invoices  ON public.invoices;
DROP POLICY IF EXISTS beacon_auth_invoices     ON public.invoices;
DROP POLICY IF EXISTS invoices_auth_all        ON public.invoices;

CREATE POLICY invoices_auth_all ON public.invoices FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- quotations
DROP POLICY IF EXISTS allow_auth_all_quotations  ON public.quotations;
DROP POLICY IF EXISTS beacon_auth_quotations     ON public.quotations;
DROP POLICY IF EXISTS quotations_auth_all        ON public.quotations;

CREATE POLICY quotations_auth_all ON public.quotations FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- calendar_events
DROP POLICY IF EXISTS allow_anon_read_events     ON public.calendar_events;
DROP POLICY IF EXISTS allow_auth_all_events      ON public.calendar_events;
DROP POLICY IF EXISTS beacon_auth_calendar       ON public.calendar_events;
DROP POLICY IF EXISTS events_anon_select         ON public.calendar_events;
DROP POLICY IF EXISTS events_auth_all            ON public.calendar_events;

CREATE POLICY events_anon_select ON public.calendar_events FOR SELECT  TO anon          USING (true);
CREATE POLICY events_auth_all    ON public.calendar_events FOR ALL     TO authenticated USING (true) WITH CHECK (true);

-- blog_posts
DROP POLICY IF EXISTS blog_anon_select   ON public.blog_posts;
DROP POLICY IF EXISTS blog_auth_all      ON public.blog_posts;

CREATE POLICY blog_anon_select ON public.blog_posts
  FOR SELECT TO anon USING (status = 'published');
CREATE POLICY blog_auth_all ON public.blog_posts
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- ── Done ──────────────────────────────────────────────────────────────────────
SELECT 'Permissions and RLS policies applied successfully.' AS result;
