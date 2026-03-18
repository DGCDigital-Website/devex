-- ============================================================
-- Beacon: Add line_items JSONB column to invoices & quotations
-- ============================================================
-- Run this migration in your Supabase SQL editor or via CLI:
--   supabase db push
-- ============================================================

-- 1. Add line_items to invoices
ALTER TABLE public.invoices
  ADD COLUMN IF NOT EXISTS line_items jsonb DEFAULT '[]'::jsonb;

-- 2. Add line_items to quotations
ALTER TABLE public.quotations
  ADD COLUMN IF NOT EXISTS line_items jsonb DEFAULT '[]'::jsonb;

-- ============================================================
-- RLS Policies (ensure authenticated users can manage records)
-- ============================================================

-- contacts
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'contacts' AND policyname = 'beacon_auth_contacts'
  ) THEN
    CREATE POLICY beacon_auth_contacts ON public.contacts
      FOR ALL TO authenticated USING (true) WITH CHECK (true);
  END IF;
END$$;

-- jobs
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'jobs' AND policyname = 'beacon_auth_jobs'
  ) THEN
    CREATE POLICY beacon_auth_jobs ON public.jobs
      FOR ALL TO authenticated USING (true) WITH CHECK (true);
  END IF;
END$$;

-- invoices
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'invoices' AND policyname = 'beacon_auth_invoices'
  ) THEN
    CREATE POLICY beacon_auth_invoices ON public.invoices
      FOR ALL TO authenticated USING (true) WITH CHECK (true);
  END IF;
END$$;

-- quotations
ALTER TABLE public.quotations ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'quotations' AND policyname = 'beacon_auth_quotations'
  ) THEN
    CREATE POLICY beacon_auth_quotations ON public.quotations
      FOR ALL TO authenticated USING (true) WITH CHECK (true);
  END IF;
END$$;

-- calendar_events
ALTER TABLE public.calendar_events ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'calendar_events' AND policyname = 'beacon_auth_calendar'
  ) THEN
    CREATE POLICY beacon_auth_calendar ON public.calendar_events
      FOR ALL TO authenticated USING (true) WITH CHECK (true);
  END IF;
END$$;
