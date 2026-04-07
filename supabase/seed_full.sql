-- =============================================================
-- DGC Beacon — Full seed: 30 contacts, 30 invoices, 30 quotations,
--              30 calendar events, 10 jobs, blog_posts table + 15 posts
-- Run in: Supabase Dashboard → SQL Editor → Run
-- =============================================================

-- ── BLOG POSTS TABLE ──────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id            text        PRIMARY KEY,
  title         text        NOT NULL,
  slug          text        UNIQUE NOT NULL,
  excerpt       text,
  content       text,
  cover_image   text,
  category      text        NOT NULL DEFAULT 'General',
  tags          text[]      DEFAULT '{}',
  author        text        NOT NULL DEFAULT 'DGC Team',
  status        text        NOT NULL DEFAULT 'draft',  -- draft | published
  reading_time  int         DEFAULT 5,
  published_at  timestamptz,
  created_at    timestamptz DEFAULT now(),
  updated_at    timestamptz DEFAULT now()
);

ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='blog_posts' AND policyname='blog_anon_select') THEN
    CREATE POLICY blog_anon_select  ON public.blog_posts FOR SELECT TO anon USING (status = 'published');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='blog_posts' AND policyname='blog_auth_all') THEN
    CREATE POLICY blog_auth_all     ON public.blog_posts FOR ALL   TO authenticated USING (true) WITH CHECK (true);
  END IF;
END $$;

GRANT ALL ON public.blog_posts TO anon, authenticated;

-- ── ADDITIONAL CONTACTS (top up to 30) ───────────────────────────────────────
INSERT INTO public.contacts (full_name, username, email, company, country, contact, role, status, billing, current_plan)
VALUES
  ('Amara Diallo',       'amarad',     'amara.diallo@unicef.org',        'UNICEF',                  'Senegal',      '+221 77 123 4567',  'partner',    'active',   'annual',    'pro'),
  ('Nguyen Van Minh',    'vminh',      'v.minh@adb.org',                 'Asian Development Bank',  'Vietnam',      '+84 90 234 5678',   'client',     'active',   'annual',    'enterprise'),
  ('Fatima Al-Rashid',   'fatimar',    'f.rashid@worldbank.org',         'World Bank',              'Jordan',       '+962 7 987 6543',   'partner',    'active',   'annual',    'enterprise'),
  ('Carlos Mendoza',     'cmendoza',   'c.mendoza@idb.org',              'IDB',                     'Colombia',     '+57 310 456 7890',  'subscriber', 'active',   'manual',    'basic'),
  ('Priya Sharma',       'priyas',     'p.sharma@unfpa.org',             'UNFPA',                   'India',        '+91 98765 43210',   'client',     'active',   'annual',    'pro'),
  ('Yusuf Hassan',       'yusufh',     'y.hassan@ifad.org',              'IFAD',                    'Somalia',      '+252 61 234 5678',  'partner',    'active',   'annual',    'pro'),
  ('Elena Volkov',       'elenav',     'e.volkov@unhabitat.org',         'UN-Habitat',              'Ukraine',      '+380 67 890 1234',  'client',     'inactive', 'manual',    'basic'),
  ('Kwame Asante',       'kwamea',     'k.asante@giz.de',                'GIZ',                     'Ghana',        '+233 24 567 8901',  'partner',    'active',   'annual',    'pro'),
  ('Marie Leblanc',      'mariel',     'm.leblanc@afd.fr',               'AFD',                     'DRC',          '+243 81 234 5678',  'client',     'active',   'annual',    'enterprise'),
  ('Ibrahim Toure',      'ibrahimt',   'i.toure@ecowas.int',             'ECOWAS',                  'Ivory Coast',  '+225 07 123 4567',  'subscriber', 'pending',  'manual',    'basic'),
  ('Ana Rodrigues',      'anar',       'a.rodrigues@camoes.pt',          'Camões Institute',        'Mozambique',   '+258 82 345 6789',  'client',     'active',   'annual',    'pro'),
  ('Tobias Bauer',       'tobiasb',    't.bauer@bmz.de',                 'BMZ',                     'Tanzania',     '+255 71 456 7890',  'partner',    'active',   'annual',    'enterprise'),
  ('Chioma Obi',         'chiomao',    'c.obi@actionaid.org',            'ActionAid',               'Nigeria',      '+234 801 234 5678', 'client',     'active',   'manual',    'basic'),
  ('Rania Mostafa',      'raniam',     'r.mostafa@care.org',             'CARE International',      'Egypt',        '+20 101 234 5678',  'partner',    'active',   'annual',    'pro'),
  ('David Ochieng',      'davido',     'd.ochieng@savethechildren.org',  'Save the Children',       'Kenya',        '+254 722 345 678',  'client',     'active',   'annual',    'enterprise'),
  ('Sophie Martin',      'sophiem',    's.martin@msf.org',               'MSF',                     'France',       '+33 6 12 34 56 78', 'subscriber', 'active',   'manual',    'pro'),
  ('Ahmed Ababio',       'ahmedab',    'a.ababio@oxfam.org',             'Oxfam',                   'Ghana',        '+233 20 678 9012',  'partner',    'inactive', 'manual',    'basic'),
  ('Nadia Petrov',       'nadiap',     'n.petrov@unhcr.org',             'UNHCR',                   'Ethiopia',     '+251 91 234 5678',  'client',     'active',   'annual',    'pro'),
  ('James Wangari',      'jamesw',     'j.wangari@kenyared.or.ke',       'Kenya Red Cross',         'Kenya',        '+254 733 456 789',  'partner',    'active',   'annual',    'basic'),
  ('Adaeze Nwosu',       'adaezen',    'a.nwosu@mercycorps.org',         'Mercy Corps',             'Nigeria',      '+234 802 345 6789', 'client',     'pending',  'manual',    'basic')
ON CONFLICT DO NOTHING;

-- ── ADDITIONAL JOBS (total 10) ────────────────────────────────────────────────
INSERT INTO public.jobs (id, title, department, location, type, description, deadline, requirements, thematic)
VALUES
  ('job-006', 'Financial Analyst',            'Finance',          'Nairobi, Kenya',       'Full-time',   'Lead financial analysis, budgeting and reporting for DGC projects across East Africa.', '2025-09-30', ARRAY['CPA/ACCA qualification','5+ years finance experience','NGO sector background','Advanced Excel/Power BI'], 'Finance'),
  ('job-007', 'Communications Specialist',    'Communications',   'Kampala, Uganda',      'Full-time',   'Develop and implement DGC communications strategy, manage social media, produce knowledge products.', '2025-08-15', ARRAY['Degree in communications/journalism','3+ years in development sector','Strong writing skills','Photography/videography a plus'], 'Communications'),
  ('job-008', 'WASH Programme Manager',       'Programmes',       'Juba, South Sudan',    'Full-time',   'Lead WASH programming across South Sudan, providing technical oversight and capacity building.', '2025-07-31', ARRAY['Engineering/public health background','5+ years WASH experience','Experience in fragile states','Fluent Arabic preferred'], 'WASH'),
  ('job-009', 'Research Consultant',          'Research',         'Remote',               'Consultancy', 'Conduct comprehensive baseline study for a food security programme in the Horn of Africa.', '2025-07-15', ARRAY['PhD in relevant field','10+ years research experience','Published work in food security','Swahili or Amharic advantage'], 'Food Security'),
  ('job-010', 'Finance & Admin Officer',      'Administration',   'Addis Ababa, Ethiopia','Full-time',   'Support financial management and administrative functions for DGC Ethiopia country office.', '2025-08-31', ARRAY['Bachelor in accounting/business','3+ years NGO finance experience','Knowledge of USAID/EU reporting requirements','Amharic required'], 'Administration')
ON CONFLICT DO NOTHING;

-- ── ADDITIONAL INVOICES (top up to 30) ───────────────────────────────────────
INSERT INTO public.invoices (id, name, company, company_email, address, country, contact, service, issued_date, due_date, invoice_status, total, subtotal, tax_amount)
VALUES
  ('INV-011', 'Amara Diallo',    'UNICEF',              'amara.diallo@unicef.org',       '3 UN Plaza',         'Senegal',      '+221 77 123 4567', 'Capacity Building Workshop', '2025-01-10', '2025-01-31', 'Paid',    850000, 750000, 100000),
  ('INV-012', 'Nguyen Van Minh', 'Asian Development Bank','v.minh@adb.org',              'ADB HQ',             'Vietnam',      '+84 90 234 5678',  'Economic Analysis',          '2025-01-20', '2025-02-10', 'Paid',    1200000, 1050000, 150000),
  ('INV-013', 'Fatima Al-Rashid','World Bank',          'f.rashid@worldbank.org',        '1818 H St NW',       'Jordan',       '+962 7 987 6543',  'Evaluation Services',        '2025-02-05', '2025-02-28', 'Pending', 950000, 850000, 100000),
  ('INV-014', 'Carlos Mendoza',  'IDB',                 'c.mendoza@idb.org',             'IDB Bogota',         'Colombia',     '+57 310 456 7890', 'Policy Research',            '2025-02-15', '2025-03-07', 'Paid',    675000, 600000, 75000),
  ('INV-015', 'Priya Sharma',    'UNFPA',               'p.sharma@unfpa.org',            'UNFPA New Delhi',    'India',        '+91 98765 43210',  'Training Facilitation',      '2025-02-22', '2025-03-14', 'Paid',    425000, 375000, 50000),
  ('INV-016', 'Yusuf Hassan',    'IFAD',                'y.hassan@ifad.org',             'IFAD Rome',          'Somalia',      '+252 61 234 5678', 'Field Research',             '2025-03-01', '2025-03-22', 'Pending', 780000, 700000, 80000),
  ('INV-017', 'Elena Volkov',    'UN-Habitat',          'e.volkov@unhabitat.org',        'UN Ave',             'Ukraine',      '+380 67 890 1234', 'Urban Planning Study',       '2025-03-10', '2025-03-31', 'Overdue', 620000, 560000, 60000),
  ('INV-018', 'Kwame Asante',    'GIZ',                 'k.asante@giz.de',              'GIZ Accra',          'Ghana',        '+233 24 567 8901', 'Skills Development Programme','2025-03-18', '2025-04-08', 'Paid',    1100000, 980000, 120000),
  ('INV-019', 'Marie Leblanc',   'AFD',                 'm.leblanc@afd.fr',              'AFD Paris',          'DRC',          '+243 81 234 5678', 'Project Evaluation',         '2025-04-02', '2025-04-23', 'Paid',    890000, 800000, 90000),
  ('INV-020', 'Ibrahim Toure',   'ECOWAS',              'i.toure@ecowas.int',            'ECOWAS Secretariat', 'Ivory Coast',  '+225 07 123 4567', 'Regional Study',             '2025-04-10', '2025-05-01', 'Pending', 720000, 650000, 70000),
  ('INV-021', 'Ana Rodrigues',   'Camões Institute',    'a.rodrigues@camoes.pt',         'Lisbon',             'Mozambique',   '+258 82 345 6789', 'Livelihoods Assessment',     '2025-04-20', '2025-05-11', 'Paid',    550000, 490000, 60000),
  ('INV-022', 'Tobias Bauer',    'BMZ',                 't.bauer@bmz.de',                'BMZ Bonn',           'Tanzania',     '+255 71 456 7890', 'Baseline Survey',            '2025-05-05', '2025-05-26', 'Paid',    980000, 870000, 110000),
  ('INV-023', 'Chioma Obi',      'ActionAid',           'c.obi@actionaid.org',           'ActionAid Lagos',    'Nigeria',      '+234 801 234 5678','Rights-Based Training',      '2025-05-12', '2025-06-02', 'Pending', 430000, 390000, 40000),
  ('INV-024', 'Rania Mostafa',   'CARE International',  'r.mostafa@care.org',            'CARE Cairo',         'Egypt',        '+20 101 234 5678', 'Gender Assessment',          '2025-05-20', '2025-06-10', 'Paid',    760000, 680000, 80000),
  ('INV-025', 'David Ochieng',   'Save the Children',   'd.ochieng@savethechildren.org', 'SCI Nairobi',        'Kenya',        '+254 722 345 678', 'Child Protection Evaluation','2025-06-01', '2025-06-22', 'Paid',    1050000, 940000, 110000),
  ('INV-026', 'Sophie Martin',   'MSF',                 's.martin@msf.org',              'MSF Paris',          'France',       '+33 6 12 34 56 78','Humanitarian Assessment',    '2025-06-08', '2025-06-29', 'Pending', 680000, 610000, 70000),
  ('INV-027', 'Ahmed Ababio',    'Oxfam',               'a.ababio@oxfam.org',            'Oxfam Accra',        'Ghana',        '+233 20 678 9012', 'Poverty Analysis',           '2025-06-15', '2025-07-06', 'Draft',   530000, 470000, 60000),
  ('INV-028', 'Nadia Petrov',    'UNHCR',               'n.petrov@unhcr.org',            'UNHCR Addis',        'Ethiopia',     '+251 91 234 5678', 'Refugee Livelihoods Study',  '2025-07-01', '2025-07-22', 'Pending', 870000, 780000, 90000),
  ('INV-029', 'James Wangari',   'Kenya Red Cross',     'j.wangari@kenyared.or.ke',      'KRCS HQ',            'Kenya',        '+254 733 456 789', 'Disaster Risk Assessment',   '2025-07-10', '2025-07-31', 'Draft',   640000, 570000, 70000),
  ('INV-030', 'Adaeze Nwosu',    'Mercy Corps',         'a.nwosu@mercycorps.org',        'MC Lagos',           'Nigeria',      '+234 802 345 6789','Food Security Mapping',      '2025-07-18', '2025-08-08', 'Draft',   920000, 820000, 100000)
ON CONFLICT DO NOTHING;

-- ── ADDITIONAL QUOTATIONS (top up to 30) ─────────────────────────────────────
INSERT INTO public.quotations (id, name, company, company_email, address, country, contact, service, issued_date, valid_until, quotation_status, total, subtotal, tax_amount)
VALUES
  ('QUO-011', 'Amara Diallo',    'UNICEF',              'amara.diallo@unicef.org',       '3 UN Plaza',          'Senegal',     '+221 77 123 4567', 'Organisational Capacity Review',    '2025-01-12', '2025-02-12', 'Accepted',  900000,  810000,  90000),
  ('QUO-012', 'Nguyen Van Minh', 'Asian Development Bank','v.minh@adb.org',              'ADB HQ',              'Vietnam',     '+84 90 234 5678',  'Impact Evaluation Design',          '2025-01-25', '2025-02-25', 'Sent',      1350000, 1200000, 150000),
  ('QUO-013', 'Fatima Al-Rashid','World Bank',          'f.rashid@worldbank.org',        '1818 H St NW',        'Jordan',      '+962 7 987 6543',  'Social Risk Assessment',            '2025-02-08', '2025-03-08', 'Accepted',  1100000, 990000,  110000),
  ('QUO-014', 'Carlos Mendoza',  'IDB',                 'c.mendoza@idb.org',             'IDB Bogota',          'Colombia',    '+57 310 456 7890', 'Financial Inclusion Study',         '2025-02-18', '2025-03-18', 'Draft',     700000,  630000,  70000),
  ('QUO-015', 'Priya Sharma',    'UNFPA',               'p.sharma@unfpa.org',            'UNFPA New Delhi',     'India',       '+91 98765 43210',  'Reproductive Health Evaluation',    '2025-02-25', '2025-03-25', 'Sent',      480000,  430000,  50000),
  ('QUO-016', 'Yusuf Hassan',    'IFAD',                'y.hassan@ifad.org',             'IFAD Rome',           'Somalia',     '+252 61 234 5678', 'Rural Livelihoods Survey',          '2025-03-03', '2025-04-03', 'Accepted',  850000,  760000,  90000),
  ('QUO-017', 'Elena Volkov',    'UN-Habitat',          'e.volkov@unhabitat.org',        'UN Ave',              'Ukraine',     '+380 67 890 1234', 'Housing Policy Review',             '2025-03-12', '2025-04-12', 'Rejected',  670000,  600000,  70000),
  ('QUO-018', 'Kwame Asante',    'GIZ',                 'k.asante@giz.de',              'GIZ Accra',           'Ghana',       '+233 24 567 8901', 'Vocational Training Needs Assessment','2025-03-20', '2025-04-20', 'Accepted', 1200000, 1070000, 130000),
  ('QUO-019', 'Marie Leblanc',   'AFD',                 'm.leblanc@afd.fr',              'AFD Paris',           'DRC',         '+243 81 234 5678', 'Post-conflict Reconstruction Plan', '2025-04-04', '2025-05-04', 'Sent',      960000,  860000,  100000),
  ('QUO-020', 'Ibrahim Toure',   'ECOWAS',              'i.toure@ecowas.int',            'ECOWAS Secretariat',  'Ivory Coast', '+225 07 123 4567', 'Trade Policy Analysis',             '2025-04-12', '2025-05-12', 'Draft',     780000,  700000,  80000),
  ('QUO-021', 'Ana Rodrigues',   'Camões Institute',    'a.rodrigues@camoes.pt',         'Lisbon',              'Mozambique',  '+258 82 345 6789', 'Community Development Plan',        '2025-04-22', '2025-05-22', 'Accepted',  600000,  540000,  60000),
  ('QUO-022', 'Tobias Bauer',    'BMZ',                 't.bauer@bmz.de',                'BMZ Bonn',            'Tanzania',    '+255 71 456 7890', 'Climate Resilience Programme',      '2025-05-07', '2025-06-07', 'Sent',      1050000, 940000,  110000),
  ('QUO-023', 'Chioma Obi',      'ActionAid',           'c.obi@actionaid.org',           'ActionAid Lagos',     'Nigeria',     '+234 801 234 5678','Women Empowerment Initiative',      '2025-05-14', '2025-06-14', 'Accepted',  470000,  420000,  50000),
  ('QUO-024', 'Rania Mostafa',   'CARE International',  'r.mostafa@care.org',            'CARE Cairo',          'Egypt',       '+20 101 234 5678', 'SGBV Programme Evaluation',        '2025-05-22', '2025-06-22', 'Sent',      820000,  730000,  90000),
  ('QUO-025', 'David Ochieng',   'Save the Children',   'd.ochieng@savethechildren.org', 'SCI Nairobi',         'Kenya',       '+254 722 345 678', 'Education in Emergencies Review',   '2025-06-03', '2025-07-03', 'Accepted',  1130000, 1010000, 120000),
  ('QUO-026', 'Sophie Martin',   'MSF',                 's.martin@msf.org',              'MSF Paris',           'France',      '+33 6 12 34 56 78','Health System Analysis',           '2025-06-10', '2025-07-10', 'Draft',     730000,  650000,  80000),
  ('QUO-027', 'Ahmed Ababio',    'Oxfam',               'a.ababio@oxfam.org',            'Oxfam Accra',         'Ghana',       '+233 20 678 9012', 'Market Systems Study',              '2025-06-17', '2025-07-17', 'Sent',      570000,  510000,  60000),
  ('QUO-028', 'Nadia Petrov',    'UNHCR',               'n.petrov@unhcr.org',            'UNHCR Addis',         'Ethiopia',    '+251 91 234 5678', 'Durable Solutions Framework',      '2025-07-03', '2025-08-03', 'Accepted',  940000,  840000,  100000),
  ('QUO-029', 'James Wangari',   'Kenya Red Cross',     'j.wangari@kenyared.or.ke',      'KRCS HQ',             'Kenya',       '+254 733 456 789', 'Community Resilience Programme',    '2025-07-12', '2025-08-12', 'Draft',     690000,  620000,  70000),
  ('QUO-030', 'Adaeze Nwosu',    'Mercy Corps',         'a.nwosu@mercycorps.org',        'MC Lagos',            'Nigeria',     '+234 802 345 6789','Agri-food Value Chain Study',       '2025-07-20', '2025-08-20', 'Sent',      990000,  880000,  110000)
ON CONFLICT DO NOTHING;

-- ── ADDITIONAL CALENDAR EVENTS (top up to 30) ────────────────────────────────
-- Matches schema from supabase.ts and seed.sql:
-- columns: id, title, start_at, end_at, all_day, calendar, description, url
INSERT INTO public.calendar_events (id, title, start_at, end_at, all_day, calendar, description, url)
VALUES
  ('evt-013', 'USAID Annual Review',             '2025-08-05 09:00:00+00','2025-08-05 17:00:00+00', false, 'Client Meeting', 'Annual programme review with USAID East Africa team', 'https://devexglobal.com/events'),
  ('evt-014', 'UN Women Partnership Forum',      '2025-08-12 10:00:00+00','2025-08-12 12:30:00+00', false, 'Client Meeting', 'Strategic partnership discussion with UN Women ESARO', 'https://devexglobal.com/events'),
  ('evt-015', 'DGC Staff Retreat',               '2025-08-18 08:00:00+00','2025-08-20 17:00:00+00', false, 'Internal',       'Annual staff planning and team-building retreat', null),
  ('evt-016', 'Climate Finance Workshop',        '2025-08-26 09:00:00+00','2025-08-26 16:00:00+00', false, 'Workshops',      'Workshop on accessing climate finance for African CSOs', 'https://devexglobal.com/events'),
  ('evt-017', 'INGO Coordination Meeting',       '2025-09-02 14:00:00+00','2025-09-02 15:30:00+00', false, 'Client Meeting', 'Monthly coordination meeting with INGO consortium members', null),
  ('evt-018', 'GBV Response Training',           '2025-09-08 08:30:00+00','2025-09-10 16:30:00+00', false, 'Workshops',      'Training for frontline workers on GBV case management', null),
  ('evt-019', 'Invoice Submission Deadline',     '2025-09-15 17:00:00+00','2025-09-15 17:00:00+00', true,  'Other',          'Deadline for Q3 invoice submissions to partner organisations', null),
  ('evt-020', 'Food Security Conference',        '2025-09-22 09:00:00+00','2025-09-24 17:00:00+00', false, 'Client Meeting', 'Annual conference on food security and nutrition in East Africa', 'https://devexglobal.com/events'),
  ('evt-021', 'Proposal Writing Sprint',         '2025-10-06 08:00:00+00','2025-10-08 17:00:00+00', false, 'Internal',       'Intensive 3-day proposal writing for upcoming donor calls', null),
  ('evt-022', 'M&E Systems Review',              '2025-10-14 09:00:00+00','2025-10-15 16:00:00+00', false, 'Internal',       'Internal review of DGC monitoring and evaluation systems', null),
  ('evt-023', 'East Africa Civil Society Forum', '2025-10-20 09:00:00+00','2025-10-21 17:00:00+00', false, 'Client Meeting', 'Annual civil society forum on governance and accountability', 'https://devexglobal.com/events'),
  ('evt-024', 'Q3 Financial Audit',              '2025-10-27 09:00:00+00','2025-10-29 16:00:00+00', false, 'Internal',       'External audit of Q3 financial records', null),
  ('evt-025', 'DGC Board Meeting',               '2025-11-04 10:00:00+00','2025-11-04 14:00:00+00', false, 'Internal',       'Quarterly board of directors meeting', null),
  ('evt-026', 'WASH Technical Forum',            '2025-11-11 09:00:00+00','2025-11-12 17:00:00+00', false, 'Workshops',      'Technical forum on water, sanitation and hygiene innovations', 'https://devexglobal.com/events'),
  ('evt-027', 'Annual Gala Dinner',              '2025-11-28 18:30:00+00','2025-11-28 22:30:00+00', false, 'Other',          'DGC anniversary celebration gala with partners and stakeholders', null),
  ('evt-028', 'World AIDS Day Event',            '2025-12-01 09:00:00+00','2025-12-01 17:00:00+00', false, 'Client Meeting', 'Panel discussion and community awareness on HIV/AIDS', 'https://devexglobal.com/events'),
  ('evt-029', 'Year-end Staff Appraisals',       '2025-12-08 09:00:00+00','2025-12-12 17:00:00+00', false, 'Internal',       'Annual staff performance reviews and appraisals', null),
  ('evt-030', 'Budget Planning FY2026',          '2025-12-15 09:00:00+00','2025-12-16 16:00:00+00', false, 'Internal',       'Strategic planning and budgeting for financial year 2026', null)
ON CONFLICT DO NOTHING;

-- ── BLOG POSTS ────────────────────────────────────────────────────────────────
INSERT INTO public.blog_posts (id, title, slug, excerpt, content, cover_image, category, tags, author, status, reading_time, published_at)
VALUES
  ('blog-001',
   'Strengthening M&E Systems in Fragile Contexts',
   'strengthening-me-systems-fragile-contexts',
   'Robust monitoring and evaluation systems are the backbone of accountable development programmes. This article explores adaptive M&E approaches proven in fragile and conflict-affected settings.',
   'Effective monitoring and evaluation (M&E) in fragile and conflict-affected settings requires a departure from conventional approaches. Traditional log-frame-based systems often struggle in environments where assumptions shift rapidly and access is constrained.

DGC has developed an adaptive M&E framework informed by years of work across Somalia, South Sudan, and the DRC. Central to this approach is the principle of "light-touch" data collection — reducing respondent burden while maintaining analytical rigour.

Key elements of our approach include participatory outcome harvesting, real-time mobile data collection using KoBoToolbox, and regular sense-making workshops with community stakeholders. This combination allows us to capture intended and unintended changes, track contribution rather than attribution, and course-correct rapidly.

The results speak for themselves: programmes monitored under this framework demonstrated 34% higher target achievement compared to those using conventional M&E systems. More importantly, communities report greater ownership of the data and the decisions it informs.

As the development sector grapples with increasing complexity, adaptive M&E is no longer optional — it is essential infrastructure for learning and accountability.',
   '/images/blog/me-systems.jpg',
   'Research & Evaluation', ARRAY['M&E','Fragile Contexts','Learning'], 'Dr. Albino Luciani', 'published', 7,
   '2025-03-15 08:00:00+00'),

  ('blog-002',
   'Gender-Responsive Budgeting: A Practitioner''s Guide',
   'gender-responsive-budgeting-guide',
   'Budget allocations that ignore gender dynamics perpetuate inequality. This practitioner guide outlines how governments and NGOs can institutionalise gender-responsive budgeting across programme cycles.',
   'Gender-responsive budgeting (GRB) is not about creating separate budgets for women — it is about analysing the gender impact of existing budget allocations and redistributing resources where necessary.

DGC has supported GRB implementation in six African countries over the past decade. Our experience reveals three critical success factors: political will at senior levels, technical capacity within finance ministries, and meaningful participation of women''s organisations in budget consultations.

In Rwanda, working alongside the Ministry of Finance, DGC helped establish a GRB tracking system that now monitors 18 line ministries. The system uses simple indicators that finance officers can apply without specialised training, ensuring sustainability beyond the project lifecycle.

The most common pitfall we observe is treating GRB as a compliance exercise. Organisations that succeed embed gender analysis into existing budget preparation timelines and link it to performance management frameworks.

This guide provides practical tools including a GRB assessment checklist, sample gender marker codes, and a template for gender budget statements.',
   '/images/blog/gender-budgeting.jpg',
   'Policy & Advocacy', ARRAY['Gender','Finance','Policy'], 'Manon de Courten', 'published', 9,
   '2025-03-28 08:00:00+00'),

  ('blog-003',
   'Digital Tools Transforming Development Data Collection',
   'digital-tools-development-data-collection',
   'From ODK to machine learning, digital tools are reshaping how development organisations collect, manage and analyse data. We review the most impactful innovations of the past five years.',
   'The data revolution in international development has moved from aspiration to reality. Mobile penetration across sub-Saharan Africa has crossed 50%, creating unprecedented opportunities for real-time data collection at scale.

Open Data Kit (ODK) and its successors — KoBoToolbox, SurveyCTO, and ODK Collect — have democratised mobile data collection. A field officer in rural Uganda can now submit a structured survey in real time from a device costing less than $100.

Beyond data collection, analysis tools have transformed what organisations can do with the data they gather. R and Python have replaced Excel for complex statistical analysis, while Power BI and Tableau have made visualisation accessible to non-technical staff.

Perhaps most transformative is the emergence of natural language processing tools for analysing qualitative data. What once required weeks of manual coding can now be processed in hours, allowing evaluators to analyse far larger datasets than before.

Challenges remain. Digital exclusion, data sovereignty, and the risk of "data for data''s sake" are real concerns. The best-performing organisations pair digital tools with strong theory of change thinking and community-centred approaches.',
   '/images/blog/digital-tools.jpg',
   'Technology & Innovation', ARRAY['Technology','Data','Digital Transformation'], 'Gilbert Onyango', 'published', 8,
   '2025-04-05 08:00:00+00'),

  ('blog-004',
   'Climate Adaptation Finance: Navigating the Access Gap',
   'climate-adaptation-finance-access-gap',
   'Despite record climate finance commitments, most funding fails to reach the communities most vulnerable to climate change. DGC examines the systemic barriers and practical solutions.',
   'The Green Climate Fund, Adaptation Fund, and bilateral climate finance channels collectively hold billions of dollars earmarked for climate adaptation. Yet a significant share of this funding continues to flow to large international organisations, bypassing the local actors closest to climate-vulnerable communities.

The access gap is structural. Accreditation requirements for direct access to multilateral funds demand financial management systems that few national NGOs possess. Project development costs — feasibility studies, environmental and social impact assessments — run into tens of thousands of dollars before a cent of project funding arrives.

DGC has piloted a simplified access model in three East African countries, working with national climate change units to develop pre-accreditation capacity building programmes. The model focuses on three areas: financial management system strengthening, project development coaching, and results framework design.

Early results are promising. Two partner organisations in Kenya and Uganda have successfully completed accreditation processes that previously eluded them, unlocking direct access to adaptation finance for the first time.',
   '/images/blog/climate-finance.jpg',
   'Climate & Environment', ARRAY['Climate','Finance','Adaptation'], 'Habtamu Adane', 'published', 10,
   '2025-04-18 08:00:00+00'),

  ('blog-005',
   'Community-Led Accountability: Beyond Feedback Mechanisms',
   'community-led-accountability-beyond-feedback',
   'Feedback boxes and hotlines represent accountability theatre unless they are connected to decision-making. This article argues for genuinely community-led accountability systems.',
   'Accountability to affected populations (AAP) has become a near-universal commitment among humanitarian and development organisations. Most have installed suggestion boxes, set up hotlines, and recruited community liaison officers. Yet genuine accountability — where community feedback meaningfully shapes programme decisions — remains the exception rather than the rule.

The gap between accountability infrastructure and accountability practice reflects a power imbalance that is rarely acknowledged. Organisations design feedback mechanisms; communities use them. Data flows upwards; decisions flow downwards. This is consultation, not accountability.

DGC''s community-led accountability model inverts this dynamic. Community accountability committees are constituted at programme inception with genuine authority — not just advisory roles — over key programme decisions: targeting criteria, activity selection, complaint adjudication.

In northern Kenya, where DGC piloted this model across a livelihoods programme, communities used their accountability authority to redirect 15% of programme resources from activities that looked good on paper to priorities that matched local realities. Programme completion rates increased by 28%.',
   '/images/blog/community-accountability.jpg',
   'Governance & Accountability', ARRAY['Accountability','Community','Participation'], 'Karin van den Belt', 'published', 8,
   '2025-05-02 08:00:00+00'),

  ('blog-006',
   'Psychosocial Support in Humanitarian Response: Lessons from the Field',
   'psychosocial-support-humanitarian-response',
   'Mental health and psychosocial support (MHPSS) remains systematically underfunded in humanitarian responses. DGC shares lessons from integrating MHPSS into multi-sector programming.',
   'Humanitarian actors have long recognised that displacement, violence, and loss cause profound psychological harm. Yet MHPSS consistently represents less than 1% of humanitarian budgets and is among the first activities cut when funding tightens.

The integration of MHPSS into primary healthcare, nutrition, and livelihood programmes offers a cost-effective pathway to scale. DGC has developed a competency-based training model that equips health workers, nutrition counsellors, and livelihoods officers with basic MHPSS skills — active listening, psychological first aid, referral pathways — without requiring specialist mental health qualifications.

Field experience in South Sudan and the DRC demonstrates that integrated MHPSS improves outcomes across all programme areas. Nutrition programme beneficiaries who received MHPSS support alongside food assistance showed 23% better dietary diversity outcomes. Livelihood programme participants with MHPSS support demonstrated higher business survival rates at 12-month follow-up.',
   '/images/blog/psychosocial-support.jpg',
   'Health & Wellbeing', ARRAY['MHPSS','Humanitarian','Health'], 'Moses Lusih', 'published', 9,
   '2025-05-16 08:00:00+00'),

  ('blog-007',
   'Building Locally Led Development: From Rhetoric to Reality',
   'locally-led-development-rhetoric-to-reality',
   'The shift to locally led development requires more than budget transfers — it demands a fundamental renegotiation of power between international actors and local partners.',
   'The Grand Bargain commitments of 2016, renewed and strengthened through the localisation agenda, set ambitious targets for channelling humanitarian funding directly to local and national organisations. Progress has been slow.

DGC has observed a consistent pattern in localisation initiatives: international actors commit to passing funding and decision-making to local partners, but retain the administrative and programmatic frameworks within which local partners must operate. This is localisation of implementation, not of leadership.

Genuine local leadership requires international actors to accept uncertainty — uncertainty about whether local partners will make the same choices they would make, uncertainty about reporting formats and timelines, uncertainty about risk.

Our experience suggests three preconditions for successful locally led development: multi-year unrestricted funding that allows local organisations to plan and adapt; investment in organisational development rather than project delivery capacity; and honest power-sharing agreements that transfer real decision-making authority.',
   '/images/blog/locally-led.jpg',
   'Partnerships & Localisation', ARRAY['Localisation','Partnerships','Aid Reform'], 'Habiba Bahati', 'published', 11,
   '2025-06-01 08:00:00+00'),

  ('blog-008',
   'Scaling Social Enterprise in East Africa: What the Evidence Shows',
   'scaling-social-enterprise-east-africa',
   'Social enterprises offer promising pathways to sustainable development outcomes, but scaling remains elusive. A new DGC evidence synthesis examines what drives — and prevents — scale.',
   'Social enterprise has attracted significant investment and interest as a pathway to development impact that does not depend on donor funding cycles. Yet the evidence on scaling social enterprises in low-income settings remains thin and frequently contradictory.

DGC conducted a systematic review of 47 social enterprise scaling studies across East Africa, examining what factors distinguished enterprises that achieved significant scale from those that plateaued or failed.

Five factors emerged consistently: market validation before scale-up investment; access to patient capital willing to absorb losses during the growth phase; human capital depth beyond founder-dependent leadership; adaptive management systems that enabled rapid product and business model iteration; and integration with existing market systems rather than parallel structure creation.

Significantly, the review found no correlation between social impact measurement sophistication and scaling success — a finding that challenges prevailing assumptions in impact investing.',
   '/images/blog/social-enterprise.jpg',
   'Livelihoods & Economic Development', ARRAY['Social Enterprise','Scale','East Africa'], 'Dr. Albino Luciani', 'published', 12,
   '2025-06-15 08:00:00+00'),

  ('blog-009',
   'DGC at 25: Reflecting on a Quarter Century of Development Work',
   'dgc-at-25-quarter-century-reflection',
   'As Devex Global Consult marks 25 years of operations, we reflect on how the development sector has changed — and what has stubbornly remained the same.',
   'Twenty-five years ago, Devex Global Consult was founded on a simple proposition: that rigorous, contextually grounded research and evaluation could improve the quality and accountability of development programmes in Africa.

The development landscape has changed immeasurably since 1999. The Millennium Development Goals gave way to the Sustainable Development Goals. The humanitarian system was reshaped by the Grand Bargain. Digital technology transformed data collection, communication, and programme delivery. Climate change moved from a peripheral concern to the central organising challenge of our era.

What has changed less is the fundamental challenge of translating resources and goodwill into lasting improvement in people''s lives. The cycle of promising innovation, rapid scale-up, disappointing evidence, and retreat remains as prevalent as ever.

Our 25 years have taught us several enduring lessons: change is slower than funders want and faster than communities can absorb; context is not a constraint to be managed but the medium in which change happens; and relationships — with communities, governments, and partners — are the infrastructure on which everything else depends.',
   '/images/blog/dgc-25-years.jpg',
   'Organisation Updates', ARRAY['Anniversary','Reflection','Development'], 'Lowie Rosales', 'published', 13,
   '2025-07-01 08:00:00+00'),

  ('blog-010',
   'Protection Mainstreaming in Development Programming',
   'protection-mainstreaming-development-programming',
   'Conflict, displacement, and exploitation are not aberrations in the development contexts where DGC works — they are persistent features that every programme must address.',
   'Protection mainstreaming — the process of incorporating protection principles and promoting meaningful access, safety, and dignity in humanitarian and development programmes — has gained significant traction over the past decade.

Yet implementation quality varies enormously. In many organisations, protection mainstreaming amounts to adding a protection checklist to an existing project design process. Boxes are ticked; protection remains marginal.

DGC has developed a protection mainstreaming approach that integrates protection analysis into programme design at three levels: context analysis (understanding the protection landscape), programme design (adapting activities to avoid harm and support protection), and monitoring (tracking protection outcomes alongside sector-specific results).

A practical example: in a food security programme in Somalia, protection analysis identified that conventional distribution modalities exposed women to harassment and violence during distribution events. A redesigned system using female-only distribution points and mobile distribution teams reduced reported incidents by 67% and increased female-headed household participation by 34%.',
   '/images/blog/protection-mainstreaming.jpg',
   'Protection & Safety', ARRAY['Protection','Mainstreaming','Gender'], 'Manon de Courten', 'published', 9,
   '2025-07-10 08:00:00+00'),

  ('blog-011',
   'Decolonising Research: Practical Steps for Development Organisations',
   'decolonising-research-practical-steps',
   'The decolonisation of research is often framed in abstract theoretical terms. This article offers concrete, practical steps that development organisations can take immediately.',
   'The call to decolonise international development research is gaining momentum, but the conversation often remains at the level of principle rather than practice. What does decolonisation actually look like in a terms of reference for a baseline study?

DGC has been grappling with these questions for several years, informed by sustained engagement with African academic institutions and community researchers. We offer five practical steps:

First, commission local researchers as principal investigators, not data collectors. Second, conduct co-design workshops with community stakeholders before finalising research questions. Third, share preliminary findings with research communities before external publication. Fourth, ensure intellectual outputs — including unpublished datasets — are owned and accessible by research partners. Fifth, pay equitable rates that reflect the full value of local knowledge contributions.

None of these steps is revolutionary. All require choices about power, money, and acknowledgement that many organisations have not yet been willing to make.',
   '/images/blog/decolonising-research.jpg',
   'Research & Evaluation', ARRAY['Decolonisation','Research','Ethics'], 'Habtamu Adane', 'published', 10,
   '2025-07-18 08:00:00+00'),

  ('blog-012',
   'Child-Sensitive Social Protection in Sub-Saharan Africa',
   'child-sensitive-social-protection-africa',
   'Social protection systems rarely centre children''s specific needs and vulnerabilities. DGC examines how governments and NGOs can make social protection genuinely child-sensitive.',
   'Social protection has expanded significantly across sub-Saharan Africa over the past two decades. Cash transfer programmes, social pension schemes, and public works programmes now reach tens of millions of households. Yet most of these systems were not designed with children''s needs at their centre.

Child-sensitive social protection goes beyond providing support to households with children. It addresses the specific risks children face at different developmental stages, from early childhood nutrition through adolescent education and youth employment transitions.

DGC''s work with the Government of Malawi on their social cash transfer programme identified four gaps in the existing child-sensitivity framework: irregular payment schedules that disrupted school attendance, conditionalities that inadvertently excluded the most vulnerable children, lack of linkages to child protection services, and insufficient focus on adolescent girls'' specific vulnerabilities.

A redesigned programme incorporating child-sensitive adjustments demonstrated significant improvements: school attendance among beneficiary children increased by 18 percentage points, and child labour rates in beneficiary households fell by 22%.',
   '/images/blog/child-social-protection.jpg',
   'Social Protection', ARRAY['Children','Social Protection','Africa'], 'Karin van den Belt', 'published', 10,
   '2025-07-25 08:00:00+00'),

  ('blog-013',
   'Urban Informality and Service Delivery: Lessons from Nairobi',
   'urban-informality-service-delivery-nairobi',
   'More than half of Nairobi''s population lives in informal settlements. DGC''s urban research programme examines the service delivery innovations emerging from these communities.',
   'Informal settlements are often portrayed as problems to be solved — spaces of deficit, disorder, and danger. This framing obscures the extraordinary innovation, organisation, and resilience that characterises communities like Kibera, Mathare, and Mukuru.

DGC''s urban research programme spent three years embedded in these communities, documenting how residents organise to access and deliver services that the state fails to provide. The findings challenge conventional development orthodoxy in several important ways.

Community-based organisations in informal settlements have developed sophisticated governance structures for managing water kiosks, solid waste collection, and community health worker networks. These structures are not perfect — corruption and exclusion are real challenges — but they represent a form of institutional capacity that external actors consistently underestimate.

The most effective service delivery interventions we observed were those that worked with and strengthened existing community structures rather than creating parallel systems. Partnerships that recognised and supported community organisations as genuine service delivery actors, rather than implementing partners for externally designed programmes, consistently outperformed more conventional approaches.',
   '/images/blog/urban-informality.jpg',
   'Urban Development', ARRAY['Urban','Nairobi','Service Delivery'], 'Gilbert Onyango', 'published', 11,
   '2025-08-01 08:00:00+00'),

  ('blog-014',
   'The Future of Impact Investing in East Africa',
   'future-impact-investing-east-africa',
   'Impact investing in East Africa has matured significantly but structural challenges persist. DGC assesses the landscape and identifies opportunities for the next decade.',
   'Impact investing in East Africa has evolved from a niche experiment to a recognised asset class. The region''s impact investing market was valued at over $4 billion in 2024, with Kenya, Uganda, and Tanzania attracting the majority of capital flows.

Yet the market remains concentrated in a handful of sectors — fintech, agriculture, energy — and at a particular stage of enterprise development. Early-stage enterprises and sectors with less clear revenue models continue to struggle for capital.

More fundamentally, the impact measurement ecosystem has not kept pace with capital deployment. Many impact investors rely on output metrics — numbers of customers reached, loans disbursed, kilowatt-hours generated — rather than genuine outcome measurement. This makes it difficult to compare impact performance across portfolio companies and limits learning.

DGC sees three priorities for the next phase of impact investing development in East Africa: standardised outcome measurement frameworks for key sectors; dedicated catalytic capital vehicles for early-stage and underserved sectors; and authentic integration of African investment expertise into fund management structures.',
   '/images/blog/impact-investing.jpg',
   'Livelihoods & Economic Development', ARRAY['Impact Investing','East Africa','Finance'], 'Lowie Rosales', 'published', 12,
   '2025-08-08 08:00:00+00'),

  ('blog-015',
   'Conflict Sensitivity in Development Programming',
   'conflict-sensitivity-development-programming',
   'Well-intentioned development programmes can inadvertently exacerbate conflict. DGC''s conflict sensitivity framework guides practitioners in contexts where the risk is highest.',
   'The "do no harm" principle is well established in humanitarian action but unevenly applied in development programming. Yet the development interventions — livelihoods support, infrastructure, governance strengthening — can have profound effects on conflict dynamics.

Resource transfers that favour one community over another can intensify inter-community competition. Infrastructure projects that benefit one area while others are neglected create grievances that become political fuel. Governance strengthening initiatives that empower one level of government over another can undermine the balance of power in ways that have violent consequences.

DGC''s conflict sensitivity framework applies analysis at three stages: context analysis before programme design; "do no harm" review during implementation planning; and regular conflict sensitivity monitoring throughout. The framework uses a practical tool we call the Conflict Impact Matrix — a structured way of mapping how each programme activity intersects with key conflict drivers.

The framework has been applied in Somalia, South Sudan, Ethiopia, and northern Uganda. In each context, it has led to substantive programme adaptations that reduced the risk of harm and, in several cases, enabled programmes to actively contribute to peacebuilding objectives.',
   '/images/blog/conflict-sensitivity.jpg',
   'Governance & Accountability', ARRAY['Conflict','Peacebuilding','Fragile States'], 'Moses Lusih', 'published', 10,
   '2025-08-15 08:00:00+00')
ON CONFLICT DO NOTHING;

SELECT
  (SELECT COUNT(*) FROM public.contacts)        AS contacts,
  (SELECT COUNT(*) FROM public.jobs)            AS jobs,
  (SELECT COUNT(*) FROM public.invoices)        AS invoices,
  (SELECT COUNT(*) FROM public.quotations)      AS quotations,
  (SELECT COUNT(*) FROM public.calendar_events) AS calendar_events,
  (SELECT COUNT(*) FROM public.blog_posts)      AS blog_posts;
