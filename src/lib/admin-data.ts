export interface InvoiceItem {
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

export interface Invoice {
  id: string;
  invoiceNo: string;
  client: string;
  clientEmail: string;
  clientOrg: string;
  country: string;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: "paid" | "unpaid" | "overdue" | "draft";
  issueDate: string;
  dueDate: string;
  notes?: string;
}

export interface Quotation {
  id: string;
  quotationNo: string;
  client: string;
  clientEmail: string;
  clientOrg: string;
  country: string;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: "accepted" | "pending" | "rejected" | "expired" | "draft";
  issueDate: string;
  validUntil: string;
  notes?: string;
}

export interface AdminContact {
  id: string;
  name: string;
  email: string;
  phone: string;
  organisation: string;
  role: string;
  type: "client" | "donor" | "partner" | "government";
  status: "active" | "inactive";
  country: string;
  addedDate: string;
  avatar?: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  category: "project" | "deadline" | "meeting" | "training" | "conference" | "internal";
  description?: string;
  location?: string;
  color: string;
}

// ─── INVOICES ────────────────────────────────────────────────────────────────

export const ADMIN_INVOICES: Invoice[] = [
  {
    id: "inv-001",
    invoiceNo: "DGC-INV-2025-001",
    client: "James Omondi",
    clientEmail: "j.omondi@wfp.org",
    clientOrg: "World Food Programme (WFP)",
    country: "Kenya",
    items: [
      { description: "Food Security Assessment – Turkana County", quantity: 1, rate: 18500, amount: 18500 },
      { description: "Data Analysis & Report Writing", quantity: 1, rate: 6500, amount: 6500 },
      { description: "Stakeholder Engagement Workshop (2 days)", quantity: 2, rate: 2000, amount: 4000 },
    ],
    subtotal: 29000,
    tax: 4640,
    total: 33640,
    status: "paid",
    issueDate: "2025-01-10",
    dueDate: "2025-02-10",
    notes: "Payment received via wire transfer. Reference: WFP-KEN-2025-0042.",
  },
  {
    id: "inv-002",
    invoiceNo: "DGC-INV-2025-002",
    client: "Amara Diallo",
    clientEmail: "a.diallo@undp.org",
    clientOrg: "United Nations Development Programme (UNDP)",
    country: "Senegal",
    items: [
      { description: "Governance Capacity Building Programme – Phase 1", quantity: 1, rate: 22000, amount: 22000 },
      { description: "Training Materials Development", quantity: 1, rate: 4500, amount: 4500 },
      { description: "Field Coordination (5 weeks)", quantity: 5, rate: 1200, amount: 6000 },
    ],
    subtotal: 32500,
    tax: 5200,
    total: 37700,
    status: "paid",
    issueDate: "2025-02-05",
    dueDate: "2025-03-05",
    notes: "Final invoice for Phase 1 deliverables as per contract UNDP-SEN-2025-117.",
  },
  {
    id: "inv-003",
    invoiceNo: "DGC-INV-2025-003",
    client: "Sarah Mitchell",
    clientEmail: "s.mitchell@rescue.org",
    clientOrg: "International Rescue Committee (IRC)",
    country: "South Sudan",
    items: [
      { description: "Livelihood Programme Evaluation", quantity: 1, rate: 15000, amount: 15000 },
      { description: "Key Informant Interviews (30 sessions)", quantity: 30, rate: 150, amount: 4500 },
      { description: "Final Evaluation Report", quantity: 1, rate: 5000, amount: 5000 },
    ],
    subtotal: 24500,
    tax: 3920,
    total: 28420,
    status: "unpaid",
    issueDate: "2025-03-01",
    dueDate: "2025-04-01",
    notes: "Awaiting purchase order confirmation from IRC finance department.",
  },
  {
    id: "inv-004",
    invoiceNo: "DGC-INV-2025-004",
    client: "David Kweku",
    clientEmail: "d.kweku@usaid.gov",
    clientOrg: "USAID Kenya",
    country: "Kenya",
    items: [
      { description: "WASH Programme Baseline Study", quantity: 1, rate: 28000, amount: 28000 },
      { description: "Community Surveys (200 households)", quantity: 200, rate: 45, amount: 9000 },
      { description: "GIS Mapping Services", quantity: 1, rate: 6000, amount: 6000 },
    ],
    subtotal: 43000,
    tax: 6880,
    total: 49880,
    status: "overdue",
    issueDate: "2024-12-15",
    dueDate: "2025-01-15",
    notes: "Payment overdue. Multiple follow-up emails sent. Escalated to USAID contracting officer.",
  },
  {
    id: "inv-005",
    invoiceNo: "DGC-INV-2025-005",
    client: "Fatima Nkemelu",
    clientEmail: "f.nkemelu@fairtrade.net",
    clientOrg: "Fairtrade Africa",
    country: "Ghana",
    items: [
      { description: "Smallholder Farmer Impact Assessment", quantity: 1, rate: 12000, amount: 12000 },
      { description: "Value Chain Analysis", quantity: 1, rate: 8000, amount: 8000 },
    ],
    subtotal: 20000,
    tax: 3200,
    total: 23200,
    status: "paid",
    issueDate: "2025-01-20",
    dueDate: "2025-02-20",
    notes: "Assessment covered cocoa and shea butter value chains in Brong-Ahafo Region.",
  },
  {
    id: "inv-006",
    invoiceNo: "DGC-INV-2025-006",
    client: "Peter Mwangi",
    clientEmail: "p.mwangi@africog.org",
    clientOrg: "Africa Centre for Open Governance (AfriCOG)",
    country: "Kenya",
    items: [
      { description: "Public Finance Management Training", quantity: 3, rate: 5000, amount: 15000 },
      { description: "Training Facilitation (3 days)", quantity: 3, rate: 1500, amount: 4500 },
    ],
    subtotal: 19500,
    tax: 3120,
    total: 22620,
    status: "unpaid",
    issueDate: "2025-03-10",
    dueDate: "2025-04-10",
  },
  {
    id: "inv-007",
    invoiceNo: "DGC-INV-2025-007",
    client: "Helen Achola",
    clientEmail: "h.achola@oxfam.org",
    clientOrg: "Oxfam Kenya",
    country: "Kenya",
    items: [
      { description: "Gender & Social Inclusion Audit", quantity: 1, rate: 9500, amount: 9500 },
      { description: "Focus Group Discussions (8 groups)", quantity: 8, rate: 600, amount: 4800 },
    ],
    subtotal: 14300,
    tax: 2288,
    total: 16588,
    status: "draft",
    issueDate: "2025-03-15",
    dueDate: "2025-04-15",
    notes: "Draft pending client review before finalisation.",
  },
  {
    id: "inv-008",
    invoiceNo: "DGC-INV-2025-008",
    client: "Kofi Mensah",
    clientEmail: "k.mensah@africanunion.org",
    clientOrg: "African Union Commission",
    country: "Ethiopia",
    items: [
      { description: "Institutional Capacity Assessment – AU Agenda 2063", quantity: 1, rate: 35000, amount: 35000 },
      { description: "Policy Brief Development (5 briefs)", quantity: 5, rate: 2500, amount: 12500 },
      { description: "Technical Advisory (2 months)", quantity: 2, rate: 8000, amount: 16000 },
    ],
    subtotal: 63500,
    tax: 10160,
    total: 73660,
    status: "overdue",
    issueDate: "2024-11-01",
    dueDate: "2024-12-01",
    notes: "Second overdue notice sent. Refer to legal team if no response by end of March 2025.",
  },
];

// ─── QUOTATIONS ──────────────────────────────────────────────────────────────

export const ADMIN_QUOTATIONS: Quotation[] = [
  {
    id: "quo-001",
    quotationNo: "DGC-QUO-2025-001",
    client: "Maria Kamau",
    clientEmail: "m.kamau@worldbank.org",
    clientOrg: "World Bank Group",
    country: "Kenya",
    items: [
      { description: "Education Sector Review – Arid & Semi-Arid Lands", quantity: 1, rate: 40000, amount: 40000 },
      { description: "Primary Data Collection (Schools Survey)", quantity: 1, rate: 12000, amount: 12000 },
      { description: "Final Report & Presentation", quantity: 1, rate: 6000, amount: 6000 },
    ],
    subtotal: 58000,
    tax: 9280,
    total: 67280,
    status: "pending",
    issueDate: "2025-03-01",
    validUntil: "2025-04-01",
    notes: "Quotation submitted in response to World Bank EOI dated 18 Feb 2025.",
  },
  {
    id: "quo-002",
    quotationNo: "DGC-QUO-2025-002",
    client: "Thomas Adeyemi",
    clientEmail: "t.adeyemi@ifc.org",
    clientOrg: "International Finance Corporation (IFC)",
    country: "Nigeria",
    items: [
      { description: "SME Climate Finance Readiness Assessment", quantity: 1, rate: 25000, amount: 25000 },
      { description: "Market Landscape Analysis", quantity: 1, rate: 9000, amount: 9000 },
    ],
    subtotal: 34000,
    tax: 5440,
    total: 39440,
    status: "accepted",
    issueDate: "2025-02-10",
    validUntil: "2025-03-10",
    notes: "Client accepted quotation on 24 Feb 2025. Contract negotiation underway.",
  },
  {
    id: "quo-003",
    quotationNo: "DGC-QUO-2025-003",
    client: "Linda Otieno",
    clientEmail: "l.otieno@kcb.co.ke",
    clientOrg: "KCB Foundation",
    country: "Kenya",
    items: [
      { description: "Youth Employment Programme Design", quantity: 1, rate: 18000, amount: 18000 },
      { description: "Stakeholder Consultations (Nairobi, Mombasa, Kisumu)", quantity: 3, rate: 2500, amount: 7500 },
    ],
    subtotal: 25500,
    tax: 4080,
    total: 29580,
    status: "pending",
    issueDate: "2025-03-08",
    validUntil: "2025-04-08",
  },
  {
    id: "quo-004",
    quotationNo: "DGC-QUO-2025-004",
    client: "Yusuf Hassan",
    clientEmail: "y.hassan@mof.go.ke",
    clientOrg: "Ministry of Finance – Kenya",
    country: "Kenya",
    items: [
      { description: "Public Investment Management Review", quantity: 1, rate: 55000, amount: 55000 },
      { description: "Workshops (National Treasury Staff)", quantity: 4, rate: 3000, amount: 12000 },
    ],
    subtotal: 67000,
    tax: 10720,
    total: 77720,
    status: "rejected",
    issueDate: "2025-01-15",
    validUntil: "2025-02-15",
    notes: "Rejected due to budget constraints. Ministry requested a revised, scaled-down proposal.",
  },
  {
    id: "quo-005",
    quotationNo: "DGC-QUO-2025-005",
    client: "Irene Waweru",
    clientEmail: "i.waweru@giz.de",
    clientOrg: "GIZ Kenya",
    country: "Kenya",
    items: [
      { description: "Renewable Energy Access Feasibility Study – Off-grid Communities", quantity: 1, rate: 30000, amount: 30000 },
      { description: "Technical Consultancy (3 months)", quantity: 3, rate: 7000, amount: 21000 },
    ],
    subtotal: 51000,
    tax: 8160,
    total: 59160,
    status: "expired",
    issueDate: "2024-11-10",
    validUntil: "2024-12-10",
    notes: "Quotation expired. GIZ requested reissuance with updated 2025 rates.",
  },
  {
    id: "quo-006",
    quotationNo: "DGC-QUO-2025-006",
    client: "Charles Njoroge",
    clientEmail: "c.njoroge@ke.britishcouncil.org",
    clientOrg: "British Council Kenya",
    country: "Kenya",
    items: [
      { description: "Cultural Diplomacy & Soft Power Research Study", quantity: 1, rate: 22000, amount: 22000 },
      { description: "Literature Review & Desk Research", quantity: 1, rate: 5000, amount: 5000 },
    ],
    subtotal: 27000,
    tax: 4320,
    total: 31320,
    status: "draft",
    issueDate: "2025-03-14",
    validUntil: "2025-04-14",
    notes: "Internal draft – not yet shared with client.",
  },
];

// ─── CONTACTS ─────────────────────────────────────────────────────────────────

export const ADMIN_CONTACTS: AdminContact[] = [
  {
    id: "con-001",
    name: "James Omondi",
    email: "j.omondi@wfp.org",
    phone: "+254 700 123 456",
    organisation: "World Food Programme (WFP)",
    role: "Country Director",
    type: "client",
    status: "active",
    country: "Kenya",
    addedDate: "2024-08-15",
  },
  {
    id: "con-002",
    name: "Amara Diallo",
    email: "a.diallo@undp.org",
    phone: "+221 77 456 7890",
    organisation: "United Nations Development Programme (UNDP)",
    role: "Programme Specialist",
    type: "client",
    status: "active",
    country: "Senegal",
    addedDate: "2024-09-03",
  },
  {
    id: "con-003",
    name: "Sarah Mitchell",
    email: "s.mitchell@rescue.org",
    phone: "+211 912 345 678",
    organisation: "International Rescue Committee (IRC)",
    role: "Head of Programmes",
    type: "client",
    status: "active",
    country: "South Sudan",
    addedDate: "2024-10-20",
  },
  {
    id: "con-004",
    name: "David Kweku",
    email: "d.kweku@usaid.gov",
    phone: "+254 722 987 654",
    organisation: "USAID Kenya",
    role: "Agreement Officer Representative",
    type: "donor",
    status: "active",
    country: "Kenya",
    addedDate: "2024-07-11",
  },
  {
    id: "con-005",
    name: "Fatima Nkemelu",
    email: "f.nkemelu@fairtrade.net",
    phone: "+233 24 765 4321",
    organisation: "Fairtrade Africa",
    role: "Monitoring & Evaluation Manager",
    type: "partner",
    status: "active",
    country: "Ghana",
    addedDate: "2024-11-08",
  },
  {
    id: "con-006",
    name: "Yusuf Hassan",
    email: "y.hassan@mof.go.ke",
    phone: "+254 710 234 567",
    organisation: "Ministry of Finance – Kenya",
    role: "Director of Budget",
    type: "government",
    status: "active",
    country: "Kenya",
    addedDate: "2024-06-22",
  },
  {
    id: "con-007",
    name: "Maria Kamau",
    email: "m.kamau@worldbank.org",
    phone: "+254 733 654 321",
    organisation: "World Bank Group",
    role: "Senior Education Specialist",
    type: "donor",
    status: "active",
    country: "Kenya",
    addedDate: "2025-01-14",
  },
  {
    id: "con-008",
    name: "Thomas Adeyemi",
    email: "t.adeyemi@ifc.org",
    phone: "+234 803 456 789",
    organisation: "International Finance Corporation (IFC)",
    role: "Investment Officer",
    type: "donor",
    status: "active",
    country: "Nigeria",
    addedDate: "2025-02-01",
  },
  {
    id: "con-009",
    name: "Irene Waweru",
    email: "i.waweru@giz.de",
    phone: "+254 716 543 210",
    organisation: "GIZ Kenya",
    role: "Technical Advisor – Energy",
    type: "partner",
    status: "inactive",
    country: "Kenya",
    addedDate: "2024-05-30",
  },
  {
    id: "con-010",
    name: "Kofi Mensah",
    email: "k.mensah@africanunion.org",
    phone: "+251 911 234 567",
    organisation: "African Union Commission",
    role: "Head of Planning & Coordination",
    type: "client",
    status: "active",
    country: "Ethiopia",
    addedDate: "2024-08-02",
  },
];

// ─── CALENDAR EVENTS ──────────────────────────────────────────────────────────

export const ADMIN_EVENTS: CalendarEvent[] = [
  {
    id: "evt-001",
    title: "WFP Food Security Report Deadline",
    startDate: "2025-04-05",
    endDate: "2025-04-05",
    category: "deadline",
    description: "Final submission of the Turkana County food security assessment report to WFP.",
    location: "Nairobi (remote submission)",
    color: "#ef4444",
  },
  {
    id: "evt-002",
    title: "UNDP Governance Workshop – Dakar",
    startDate: "2025-04-14",
    endDate: "2025-04-16",
    category: "training",
    description: "3-day capacity building workshop for UNDP Senegal governance programme beneficiaries.",
    location: "Dakar, Senegal",
    color: "#f59e0b",
  },
  {
    id: "evt-003",
    title: "USAID WASH Baseline Kick-off Meeting",
    startDate: "2025-04-22",
    endDate: "2025-04-22",
    category: "meeting",
    description: "Inception meeting with USAID Kenya team and county government partners.",
    location: "USAID Kenya Offices, Nairobi",
    color: "#3D9DD9",
  },
  {
    id: "evt-004",
    title: "IRC Livelihood Evaluation – Field Visit",
    startDate: "2025-05-06",
    endDate: "2025-05-10",
    category: "project",
    description: "Five-day field data collection exercise in Juba and surrounding communities.",
    location: "Juba, South Sudan",
    color: "#177DA6",
  },
  {
    id: "evt-005",
    title: "DGC Quarterly Strategy Review",
    startDate: "2025-04-30",
    endDate: "2025-04-30",
    category: "internal",
    description: "Internal team quarterly review: pipeline, financials, HR, and strategic priorities.",
    location: "DGC Offices, Westlands, Nairobi",
    color: "#0B2D59",
  },
  {
    id: "evt-006",
    title: "Africa Evaluation Week Conference",
    startDate: "2025-05-19",
    endDate: "2025-05-23",
    category: "conference",
    description: "Annual continental conference on evaluation practice and evidence use in Africa.",
    location: "Kigali, Rwanda",
    color: "#8b5cf6",
  },
  {
    id: "evt-007",
    title: "World Bank Education Proposal Deadline",
    startDate: "2025-04-01",
    endDate: "2025-04-01",
    category: "deadline",
    description: "Submission deadline for the World Bank education sector review proposal.",
    location: "Nairobi (online submission)",
    color: "#ef4444",
  },
  {
    id: "evt-008",
    title: "GIZ Renewable Energy Reissue – Client Call",
    startDate: "2025-04-10",
    endDate: "2025-04-10",
    category: "meeting",
    description: "Virtual meeting with GIZ Kenya team to discuss updated quotation for RE feasibility study.",
    location: "Video call (MS Teams)",
    color: "#3D9DD9",
  },
];
