-- ============================================================
-- DGC Beacon — full schema + seed data
-- Run this once in: Supabase Dashboard → SQL Editor → Run
-- ============================================================

-- ─── CONTACTS ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.contacts (
  id            bigserial PRIMARY KEY,
  full_name     text NOT NULL,
  username      text NOT NULL,
  email         text NOT NULL,
  company       text NOT NULL,
  country       text NOT NULL,
  contact       text NOT NULL,
  role          text NOT NULL DEFAULT 'subscriber',
  status        text NOT NULL DEFAULT 'active',
  billing       text NOT NULL DEFAULT 'manual',
  current_plan  text NOT NULL DEFAULT 'basic',
  avatar        text,
  avatar_color  text,
  created_at    timestamptz DEFAULT now()
);

ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='contacts' AND policyname='allow_anon_read_contacts') THEN
    CREATE POLICY allow_anon_read_contacts ON public.contacts FOR SELECT TO anon, authenticated USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='contacts' AND policyname='allow_anon_insert_contacts') THEN
    CREATE POLICY allow_anon_insert_contacts ON public.contacts FOR INSERT TO anon, authenticated WITH CHECK (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='contacts' AND policyname='allow_auth_all_contacts') THEN
    CREATE POLICY allow_auth_all_contacts ON public.contacts FOR ALL TO authenticated USING (true) WITH CHECK (true);
  END IF;
END $$;

-- ─── JOBS ─────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.jobs (
  id          text PRIMARY KEY,
  title       text NOT NULL,
  department  text NOT NULL DEFAULT 'General',
  location    text NOT NULL DEFAULT 'Remote',
  type        text NOT NULL DEFAULT 'Full-time',
  description text,
  deadline    text,
  requirements text[] DEFAULT '{}',
  thematic    text DEFAULT 'general',
  created_at  timestamptz DEFAULT now()
);

ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='jobs' AND policyname='allow_anon_read_jobs') THEN
    CREATE POLICY allow_anon_read_jobs ON public.jobs FOR SELECT TO anon, authenticated USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='jobs' AND policyname='allow_auth_all_jobs') THEN
    CREATE POLICY allow_auth_all_jobs ON public.jobs FOR ALL TO authenticated USING (true) WITH CHECK (true);
  END IF;
END $$;

-- ─── INVOICES ─────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.invoices (
  id               text PRIMARY KEY,
  name             text NOT NULL,
  company          text NOT NULL,
  company_email    text NOT NULL,
  address          text NOT NULL,
  country          text NOT NULL,
  contact          text NOT NULL,
  service          text NOT NULL,
  issued_date      text NOT NULL,
  due_date         text NOT NULL,
  invoice_status   text NOT NULL DEFAULT 'Draft',
  total            numeric NOT NULL DEFAULT 0,
  subtotal         numeric,
  tax_amount       numeric,
  discount_amount  numeric,
  discount_percent numeric,
  balance          text,
  line_items       jsonb DEFAULT '[]',
  avatar           text,
  avatar_color     text,
  created_at       timestamptz DEFAULT now()
);

ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='invoices' AND policyname='allow_auth_all_invoices') THEN
    CREATE POLICY allow_auth_all_invoices ON public.invoices FOR ALL TO authenticated USING (true) WITH CHECK (true);
  END IF;
END $$;

-- ─── QUOTATIONS ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.quotations (
  id                text PRIMARY KEY,
  name              text NOT NULL,
  company           text NOT NULL,
  company_email     text NOT NULL,
  address           text NOT NULL,
  country           text NOT NULL,
  contact           text NOT NULL,
  service           text NOT NULL,
  issued_date       text NOT NULL,
  valid_until       text NOT NULL,
  quotation_status  text NOT NULL DEFAULT 'Draft',
  total             numeric NOT NULL DEFAULT 0,
  subtotal          numeric,
  tax_amount        numeric,
  discount_amount   numeric,
  discount_percent  numeric,
  balance           text,
  line_items        jsonb DEFAULT '[]',
  avatar            text,
  avatar_color      text,
  created_at        timestamptz DEFAULT now()
);

ALTER TABLE public.quotations ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='quotations' AND policyname='allow_auth_all_quotations') THEN
    CREATE POLICY allow_auth_all_quotations ON public.quotations FOR ALL TO authenticated USING (true) WITH CHECK (true);
  END IF;
END $$;

-- ─── CALENDAR EVENTS ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.calendar_events (
  id          text PRIMARY KEY,
  title       text NOT NULL,
  start_at    timestamptz NOT NULL,
  end_at      timestamptz NOT NULL,
  all_day     boolean NOT NULL DEFAULT false,
  calendar    text,
  description text,
  url         text,
  created_at  timestamptz DEFAULT now()
);

ALTER TABLE public.calendar_events ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='calendar_events' AND policyname='allow_anon_read_events') THEN
    CREATE POLICY allow_anon_read_events ON public.calendar_events FOR SELECT TO anon, authenticated USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='calendar_events' AND policyname='allow_auth_all_events') THEN
    CREATE POLICY allow_auth_all_events ON public.calendar_events FOR ALL TO authenticated USING (true) WITH CHECK (true);
  END IF;
END $$;

-- ─── BLOG POSTS ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id            text PRIMARY KEY,
  title         text NOT NULL,
  slug          text UNIQUE NOT NULL,
  excerpt       text,
  content       text,
  cover_image   text,
  category      text NOT NULL DEFAULT 'General',
  tags          text[] DEFAULT '{}',
  author        text NOT NULL DEFAULT 'DGC Team',
  status        text NOT NULL DEFAULT 'draft',
  reading_time  int DEFAULT 5,
  published_at  timestamptz,
  created_at    timestamptz DEFAULT now(),
  updated_at    timestamptz DEFAULT now()
);

ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='blog_posts' AND policyname='blog_anon_select') THEN
    CREATE POLICY blog_anon_select ON public.blog_posts FOR SELECT TO anon USING (status = 'published');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='blog_posts' AND policyname='blog_auth_all') THEN
    CREATE POLICY blog_auth_all ON public.blog_posts FOR ALL TO authenticated USING (true) WITH CHECK (true);
  END IF;
END $$;

-- ============================================================
-- SEED DATA
-- ============================================================

-- ─── CONTACTS (10) ────────────────────────────────────────────
INSERT INTO public.contacts (full_name, username, email, company, country, contact, role, status, billing, current_plan, avatar_color) VALUES
  ('Amara Osei',    'amara.osei',    'amara.osei@niletech.org',        'Nile Tech Solutions',     'Kenya',    '+254 712 345 678', 'client',     'active',   'auto',   'enterprise', '#0B2D59'),
  ('Lena Müller',   'lena.muller',   'lena.muller@eurodevelopment.eu', 'Euro Development Agency', 'Germany',  '+49 151 23456789', 'partner',    'active',   'auto',   'pro',        '#177DA6'),
  ('Kwame Asante',  'kwame.asante',  'kwame@horizonimpact.org',        'Horizon Impact Group',    'Ghana',    '+233 24 456 7890', 'client',     'inactive', 'manual', 'basic',      '#0e3a6e'),
  ('Priya Nair',    'priya.nair',    'priya.nair@southasiadx.com',     'South Asia Dev Exchange', 'India',    '+91 98765 43210',  'subscriber', 'active',   'auto',   'pro',        '#0B2D59'),
  ('Carlos Mendez', 'c.mendez',      'cmendez@andesconsult.pe',        'Andes Consult Group',     'Peru',     '+51 987 654 321',  'client',     'active',   'auto',   'enterprise', '#177DA6'),
  ('Fatou Diallo',  'fatou.diallo',  'fatou@saheltrust.org',           'Sahel Trust Foundation',  'Senegal',  '+221 77 234 5678', 'partner',    'active',   'manual', 'pro',        '#0e3a6e'),
  ('James Waweru',  'j.waweru',      'james.waweru@eastafrica.co.ke',  'East Africa Consultants', 'Kenya',    '+254 733 876 543', 'client',     'active',   'auto',   'enterprise', '#0B2D59'),
  ('Nina Kovač',    'nina.kovac',    'nina@balkanrelief.org',          'Balkan Relief Network',   'Croatia',  '+385 91 234 5678', 'subscriber', 'inactive', 'manual', 'basic',      '#177DA6'),
  ('Samuel Otieno', 's.otieno',      'sotieno@nairobi-innov.org',      'Nairobi Innovation Hub',  'Kenya',    '+254 722 111 222', 'client',     'active',   'auto',   'pro',        '#0e3a6e'),
  ('Marie Leclerc', 'marie.leclerc', 'marie@francophonecso.fr',        'Francophone CSO Network', 'France',   '+33 6 12 34 56 78','partner',    'active',   'auto',   'pro',        '#0B2D59')
ON CONFLICT (id) DO NOTHING;

-- ─── JOBS (6) ─────────────────────────────────────────────────
INSERT INTO public.jobs (id, title, department, location, type, description, deadline, requirements, thematic) VALUES
  ('job-001', 'Senior M&E Specialist',
   'Monitoring & Evaluation', 'Nairobi, Kenya', 'Full-time',
   'Lead the design and implementation of M&E frameworks across DGC project portfolio. You will build data collection tools, conduct field assessments, and present findings to senior management and donors.',
   '2026-04-30',
   ARRAY['5+ years M&E experience','Proficiency in KOBO/ODK','Strong report writing skills','French advantageous'],
   'mel'),
  ('job-002', 'Capacity Building Consultant',
   'Capacity Strengthening', 'Remote / East Africa', 'Contract',
   'Design and deliver tailored capacity-building programmes for civil society organisations across East Africa, focusing on governance, financial management, and programme delivery.',
   '2026-04-15',
   ARRAY['Organisational development background','Facilitation & training skills','Experience with NGOs','Swahili preferred'],
   'capacity'),
  ('job-003', 'Digital Transformation Advisor',
   'Technology & Innovation', 'Hybrid – Nairobi', 'Full-time',
   'Support DGC clients in adopting digital tools for programme management, data analytics, and communications. Conduct digital readiness assessments and co-create roadmaps.',
   '2026-05-15',
   ARRAY['ICT4D experience','Project management certification','Data analytics skills','Experience in the development sector'],
   'digital'),
  ('job-004', 'Communications & Knowledge Management Officer',
   'Communications', 'Nairobi, Kenya', 'Full-time',
   'Develop and implement DGC''s communications strategy, manage social media channels, produce knowledge products (briefs, case studies, reports), and support business development.',
   '2026-04-20',
   ARRAY['Degree in Communications / Journalism','3+ years in a similar role','Content creation skills','Graphic design experience a plus'],
   'general'),
  ('job-005', 'Grants & Finance Manager',
   'Finance', 'Nairobi, Kenya', 'Full-time',
   'Oversee DGC''s grants portfolio, ensure compliance with donor requirements, manage financial reporting, and provide capacity support to partner organisations on financial management.',
   '2026-05-01',
   ARRAY['CPA or equivalent','Donor reporting experience (EU, USAID, FCDO)','Knowledge of QuickBooks / Sage','5+ years experience'],
   'finance'),
  ('job-006', 'Safety & Security Consultant',
   'Safety & Security', 'Remote / Field', 'Contract',
   'Conduct security assessments, develop safety protocols, and deliver security awareness training for DGC staff and partner organisations operating in fragile and conflict-affected settings.',
   '2026-04-10',
   ARRAY['Security management certification (HEAT/SSAP)','Field experience in fragile states','Risk assessment methodology','UNDSS/NGO safety frameworks'],
   'safety')
ON CONFLICT (id) DO NOTHING;

-- ─── INVOICES (10) — line_items use {id, item, description, cost, qty} ──────
INSERT INTO public.invoices (id, name, company, company_email, address, country, contact, service, issued_date, due_date, invoice_status, total, subtotal, tax_amount, discount_amount, discount_percent, balance, line_items, avatar_color) VALUES
  ('INV-0001','Amara Osei','Nile Tech Solutions','amara.osei@niletech.org','14 Westlands Rd, Nairobi','Kenya','+254 712 345 678',
   'M&E Framework Design','2026-01-10','2026-02-10','Paid',8500,7327.59,1172.41,0,0,'0',
   '[{"id":"1","item":"M&E Framework Development","description":"Full M&E framework with indicators and data flows","cost":5000,"qty":1},{"id":"2","item":"Data Collection Tools","description":"KOBO Toolbox forms and survey instruments","cost":2327.59,"qty":1}]',
   '#0B2D59'),
  ('INV-0002','Lena Müller','Euro Development Agency','lena.muller@eurodevelopment.eu','Unter den Linden 10, Berlin','Germany','+49 151 23456789',
   'Organisational Assessment','2026-01-15','2026-02-15','Paid',12000,10344.83,1655.17,0,0,'0',
   '[{"id":"1","item":"Organisational Assessment Report","description":"In-depth institutional assessment and recommendations","cost":9000,"qty":1},{"id":"2","item":"Stakeholder Workshops","description":"Half-day facilitated workshops with key staff","cost":448.28,"qty":3}]',
   '#177DA6'),
  ('INV-0003','Kwame Asante','Horizon Impact Group','kwame@horizonimpact.org','Osu, Accra','Ghana','+233 24 456 7890',
   'Capacity Building Programme','2026-01-20','2026-02-20','Overdue',6200,5344.83,855.17,0,0,'6200',
   '[{"id":"1","item":"Training Module Design","description":"Five customised training modules","cost":2500,"qty":1},{"id":"2","item":"Facilitation","description":"Full-day in-person facilitation sessions","cost":711.21,"qty":4}]',
   '#0e3a6e'),
  ('INV-0004','Priya Nair','South Asia Dev Exchange','priya.nair@southasiadx.com','Connaught Place, New Delhi','India','+91 98765 43210',
   'Digital Transformation Advisory','2026-02-01','2026-03-01','Sent',9800,8448.28,1351.72,0,0,'9800',
   '[{"id":"1","item":"Digital Readiness Assessment","description":"Comprehensive ICT4D readiness review","cost":3500,"qty":1},{"id":"2","item":"Roadmap Development","description":"12-month digital transformation roadmap","cost":4948.28,"qty":1}]',
   '#0B2D59'),
  ('INV-0005','Carlos Mendez','Andes Consult Group','cmendez@andesconsult.pe','Av. Larco 345, Miraflores','Peru','+51 987 654 321',
   'Safety & Security Training','2026-02-05','2026-03-05','Paid',4500,3879.31,620.69,0,0,'0',
   '[{"id":"1","item":"Security Awareness Training","description":"HEAT-based security awareness course","cost":1500,"qty":2},{"id":"2","item":"Safety Protocol Documentation","description":"Written SOPs and emergency procedures","cost":879.31,"qty":1}]',
   '#177DA6'),
  ('INV-0006','Fatou Diallo','Sahel Trust Foundation','fatou@saheltrust.org','Plateau, Dakar','Senegal','+221 77 234 5678',
   'Grants Management Support','2026-02-10','2026-03-10','Paid',7300,6293.10,1006.90,0,0,'0',
   '[{"id":"1","item":"Grants Compliance Review","description":"Donor compliance audit across active grants","cost":3500,"qty":1},{"id":"2","item":"Financial Reporting Templates","description":"Tailored Excel-based reporting tools","cost":2793.10,"qty":1}]',
   '#0e3a6e'),
  ('INV-0007','James Waweru','East Africa Consultants','james.waweru@eastafrica.co.ke','Upper Hill, Nairobi','Kenya','+254 733 876 543',
   'MEL System Setup','2026-02-15','2026-03-15','Sent',11000,9482.76,1517.24,0,0,'11000',
   '[{"id":"1","item":"MEL System Design","description":"Theory of change and results framework design","cost":6000,"qty":1},{"id":"2","item":"KOBO Toolbox Setup & Training","description":"Full platform setup and 2-day training","cost":3482.76,"qty":1}]',
   '#0B2D59'),
  ('INV-0008','Nina Kovač','Balkan Relief Network','nina@balkanrelief.org','Ilica 50, Zagreb','Croatia','+385 91 234 5678',
   'Programme Evaluation','2026-03-01','2026-04-01','Draft',5500,4741.38,758.62,0,0,'5500',
   '[{"id":"1","item":"Mid-term Evaluation","description":"Mixed-methods programme evaluation","cost":4000,"qty":1},{"id":"2","item":"Evaluation Report & Presentation","description":"Full report and board presentation deck","cost":741.38,"qty":1}]',
   '#177DA6'),
  ('INV-0009','Samuel Otieno','Nairobi Innovation Hub','sotieno@nairobi-innov.org','Kilimani, Nairobi','Kenya','+254 722 111 222',
   'Knowledge Management','2026-03-05','2026-04-05','Sent',3800,3275.86,524.14,0,0,'3800',
   '[{"id":"1","item":"Knowledge Product Design","description":"Brief, case study, and infographic design","cost":1000,"qty":3},{"id":"2","item":"Dissemination Strategy","description":"Distribution plan and partner engagement","cost":275.86,"qty":1}]',
   '#0e3a6e'),
  ('INV-0010','Marie Leclerc','Francophone CSO Network','marie@francophonecso.fr','Rue de Rivoli 12, Paris','France','+33 6 12 34 56 78',
   'Strategic Planning Facilitation','2026-03-10','2026-04-10','Sent',14000,12068.97,1931.03,0,0,'14000',
   '[{"id":"1","item":"Strategic Planning Workshop","description":"Three-day intensive planning workshop","cost":3000,"qty":3},{"id":"2","item":"Strategy Document & Report","description":"Final strategy document and facilitation report","cost":3068.97,"qty":1}]',
   '#0B2D59')
ON CONFLICT (id) DO NOTHING;

-- ─── QUOTATIONS (10) — line_items use {id, item, description, cost, qty} ─────
INSERT INTO public.quotations (id, name, company, company_email, address, country, contact, service, issued_date, valid_until, quotation_status, total, subtotal, tax_amount, discount_amount, discount_percent, balance, line_items, avatar_color) VALUES
  ('QUO-0001','Amara Osei','Nile Tech Solutions','amara.osei@niletech.org','14 Westlands Rd, Nairobi','Kenya','+254 712 345 678',
   'Annual MEL Retainer','2026-01-08','2026-02-08','Accepted',18000,15517.24,2482.76,0,0,'0',
   '[{"id":"1","item":"Quarterly M&E Support","description":"Dedicated M&E consultant support per quarter","cost":3879.31,"qty":4}]',
   '#0B2D59'),
  ('QUO-0002','Lena Müller','Euro Development Agency','lena.muller@eurodevelopment.eu','Unter den Linden 10, Berlin','Germany','+49 151 23456789',
   'Multi-country Evaluation','2026-01-12','2026-02-12','Sent',22000,18965.52,3034.48,0,0,'22000',
   '[{"id":"1","item":"Country Evaluation","description":"Full programme evaluation per country","cost":6000,"qty":3},{"id":"2","item":"Synthesis Report","description":"Cross-country synthesis and recommendations","cost":965.52,"qty":1}]',
   '#177DA6'),
  ('QUO-0003','Kwame Asante','Horizon Impact Group','kwame@horizonimpact.org','Osu, Accra','Ghana','+233 24 456 7890',
   'Leadership Development Programme','2026-01-18','2026-02-18','Draft',9500,8189.66,1310.34,0,0,'9500',
   '[{"id":"1","item":"Leadership Modules","description":"Customised leadership development modules","cost":1600,"qty":5},{"id":"2","item":"Executive Coaching Sessions","description":"One-to-one coaching with senior leaders","cost":97.41,"qty":4}]',
   '#0e3a6e'),
  ('QUO-0004','Priya Nair','South Asia Dev Exchange','priya.nair@southasiadx.com','Connaught Place, New Delhi','India','+91 98765 43210',
   'ICT4D Strategy','2026-01-25','2026-02-25','Accepted',13500,11637.93,1862.07,0,0,'0',
   '[{"id":"1","item":"ICT4D Landscape Analysis","description":"Sector scan and benchmarking study","cost":5000,"qty":1},{"id":"2","item":"Strategy & Implementation Plan","description":"ICT4D strategy and 18-month implementation roadmap","cost":6637.93,"qty":1}]',
   '#0B2D59'),
  ('QUO-0005','Carlos Mendez','Andes Consult Group','cmendez@andesconsult.pe','Av. Larco 345, Miraflores','Peru','+51 987 654 321',
   'Security Risk Assessment','2026-02-02','2026-03-02','Sent',7000,6034.48,965.52,0,0,'7000',
   '[{"id":"1","item":"Field Security Assessment","description":"On-site security risk assessment visit","cost":4000,"qty":1},{"id":"2","item":"Risk Register & Mitigation Plan","description":"Full risk register with mitigation actions","cost":2034.48,"qty":1}]',
   '#177DA6'),
  ('QUO-0006','Fatou Diallo','Sahel Trust Foundation','fatou@saheltrust.org','Plateau, Dakar','Senegal','+221 77 234 5678',
   'Donor Reporting Framework','2026-02-08','2026-03-08','Accepted',5800,5000.00,800.00,0,0,'0',
   '[{"id":"1","item":"Reporting Template Suite","description":"Customised donor reporting templates","cost":2500,"qty":1},{"id":"2","item":"Staff Training on Reporting","description":"Half-day capacity building on donor reporting","cost":1250.00,"qty":2}]',
   '#0e3a6e'),
  ('QUO-0007','James Waweru','East Africa Consultants','james.waweru@eastafrica.co.ke','Upper Hill, Nairobi','Kenya','+254 733 876 543',
   'Data Management System','2026-02-12','2026-03-12','Sent',16000,13793.10,2206.90,0,0,'16000',
   '[{"id":"1","item":"System Requirements & Design","description":"Functional requirements and system architecture","cost":5000,"qty":1},{"id":"2","item":"System Build & Testing","description":"Full build, UAT and bug fixing","cost":8000,"qty":1},{"id":"3","item":"User Training","description":"Two-day staff training on system use","cost":793.10,"qty":1}]',
   '#0B2D59'),
  ('QUO-0008','Nina Kovač','Balkan Relief Network','nina@balkanrelief.org','Ilica 50, Zagreb','Croatia','+385 91 234 5678',
   'Baseline Survey','2026-02-20','2026-03-20','Draft',8200,7068.97,1131.03,0,0,'8200',
   '[{"id":"1","item":"Survey Design & Tool Development","description":"Survey methodology and KOBO tool design","cost":3000,"qty":1},{"id":"2","item":"Data Collection & Analysis","description":"Field data collection, cleaning, and statistical analysis","cost":4068.97,"qty":1}]',
   '#177DA6'),
  ('QUO-0009','Samuel Otieno','Nairobi Innovation Hub','sotieno@nairobi-innov.org','Kilimani, Nairobi','Kenya','+254 722 111 222',
   'Communications Strategy','2026-03-02','2026-04-02','Sent',6500,5603.45,896.55,0,0,'6500',
   '[{"id":"1","item":"Communications Audit","description":"Review of existing comms channels and materials","cost":2000,"qty":1},{"id":"2","item":"Strategy Document","description":"Three-year communications strategy","cost":3603.45,"qty":1}]',
   '#0e3a6e'),
  ('QUO-0010','Marie Leclerc','Francophone CSO Network','marie@francophonecso.fr','Rue de Rivoli 12, Paris','France','+33 6 12 34 56 78',
   'Institutional Strengthening','2026-03-08','2026-04-08','Accepted',19500,16810.34,2689.66,0,0,'0',
   '[{"id":"1","item":"Institutional Assessment","description":"Comprehensive organisational health assessment","cost":6000,"qty":1},{"id":"2","item":"Strengthening Action Plan","description":"Costed action plan with milestones","cost":5000,"qty":1},{"id":"3","item":"Implementation Support","description":"Quarterly implementation support visits","cost":1936.78,"qty":3}]',
   '#0B2D59')
ON CONFLICT (id) DO NOTHING;

-- ─── CALENDAR EVENTS (12) — categories match CALENDAR_CATEGORIES constant ────
-- Valid categories: Workshops · Certification · Internal · Client Meeting · Field Work · Other
INSERT INTO public.calendar_events (id, title, start_at, end_at, all_day, calendar, description, url) VALUES
  ('evt-001','Regional MEL Workshop','2026-04-07 08:00:00+03','2026-04-09 17:00:00+03',false,'Workshops',
   'Three-day intensive workshop on Monitoring, Evaluation, and Learning for East African NGOs. Covers results frameworks, data collection, and learning loops.','https://devexglobal.com/events'),
  ('evt-002','DGC Annual Planning Retreat','2026-04-14 09:00:00+03','2026-04-16 16:00:00+03',false,'Internal',
   'Annual internal strategy and planning session for DGC staff and senior consultants. Review 2025 performance and set 2026 objectives.',null),
  ('evt-003','Capacity Strengthening Forum — Nairobi','2026-04-22 09:00:00+03','2026-04-22 17:00:00+03',true,'Client Meeting',
   'One-day forum bringing together civil society leaders to share lessons on organisational capacity strengthening in the East Africa region.','https://devexglobal.com/events'),
  ('evt-004','Digital Transformation Masterclass','2026-05-06 10:00:00+03','2026-05-06 16:00:00+03',false,'Workshops',
   'Half-day masterclass on leveraging digital tools — KOBO, Power BI, and Salesforce — for development programme management.','https://devexglobal.com/events'),
  ('evt-005','Safety & Security Awareness Training','2026-05-12 08:30:00+03','2026-05-13 17:00:00+03',false,'Workshops',
   'Two-day HEAT (Hostile Environment Awareness Training) for field staff operating in complex and fragile environments.',null),
  ('evt-006','Mid-year Client Review Meetings','2026-05-19 09:00:00+03','2026-05-23 17:00:00+03',false,'Client Meeting',
   'Week of structured mid-year review meetings with key clients across the portfolio.',null),
  ('evt-007','West Africa CSO Leadership Summit','2026-06-03 09:00:00+00','2026-06-05 18:00:00+00',false,'Client Meeting',
   'Regional summit in Accra bringing together civil society leaders, donors, and government partners to advance the CSO leadership agenda in West Africa.','https://devexglobal.com/events'),
  ('evt-008','Grants Management Bootcamp','2026-06-10 09:00:00+03','2026-06-12 17:00:00+03',false,'Workshops',
   'Intensive three-day bootcamp on donor grants compliance, financial reporting, and grants management best practices for partner organisations.','https://devexglobal.com/events'),
  ('evt-009','Knowledge Management Webinar — Session 1','2026-06-17 14:00:00+03','2026-06-17 16:00:00+03',false,'Workshops',
   'First in a four-part series on knowledge management for development organisations. This session covers knowledge product design and dissemination.','https://devexglobal.com/events'),
  ('evt-010','DGC 10th Anniversary Gala','2026-07-04 18:00:00+03','2026-07-04 22:00:00+03',false,'Other',
   'Celebratory gala dinner marking 10 years of Devex Global Consult. Open to clients, partners, alumni, and stakeholders.','https://devexglobal.com/events'),
  ('evt-011','Systems Strengthening Symposium','2026-07-14 09:00:00+03','2026-07-15 17:00:00+03',false,'Client Meeting',
   'Two-day symposium exploring systems-thinking approaches to health, education, and governance strengthening in sub-Saharan Africa.','https://devexglobal.com/events'),
  ('evt-012','Year-end Learning & Reflection Session','2026-11-24 09:00:00+03','2026-11-24 17:00:00+03',true,'Internal',
   'Annual learning and reflection session for DGC staff, reviewing programme outcomes, organisational learnings, and strategic priorities for the coming year.',null)
ON CONFLICT (id) DO NOTHING;
