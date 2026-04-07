// ─────────────────────────────────────────────────────────────────────────────
// Beacon — Shared TypeScript types
// ─────────────────────────────────────────────────────────────────────────────

export type BeaconUser = {
  email: string;
  id: string;
};

// ── Contacts ─────────────────────────────────────────────────────────────────

export type ContactRow = {
  id: number;
  full_name: string;
  email: string;
  company: string;
  contact: string;
  country: string;
  username: string;
  role: string;
  status: string;
  current_plan: string;
  billing: string;
  avatar: string | null;
  avatar_color: string | null;
  created_at: string | null;
};

export type ContactInsert = Omit<ContactRow, "id" | "created_at">;
export type ContactUpdate = Partial<ContactInsert>;

// ── Jobs ─────────────────────────────────────────────────────────────────────

export type JobRow = {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string | null;
  thematic: string | null;
  deadline: string | null;
  requirements: string[] | null;
  created_at: string | null;
};

export type JobInsert = Omit<JobRow, "created_at">;
export type JobUpdate = Partial<Omit<JobInsert, "id">>;

// ── Line Items (form state only — aggregated totals persist to DB) ────────────

export type LineItem = {
  id: string;
  item: string;
  description: string;
  cost: number;
  qty: number;
};

// ── Invoices ──────────────────────────────────────────────────────────────────

export type InvoiceRow = {
  id: string;
  name: string;
  company: string;
  company_email: string;
  contact: string;
  address: string;
  country: string;
  service: string;
  issued_date: string;
  due_date: string;
  invoice_status: string;
  total: number;
  subtotal: number | null;
  discount_percent: number | null;
  discount_amount: number | null;
  tax_amount: number | null;
  balance: string | null;
  avatar: string | null;
  avatar_color: string | null;
  line_items: LineItem[] | null;
  created_at: string | null;
};

export type InvoiceInsert = Omit<InvoiceRow, "created_at">;
export type InvoiceUpdate = Partial<Omit<InvoiceInsert, "id">>;

export const INVOICE_STATUSES = ["Draft", "Sent", "Paid", "Downloaded"] as const;
export type InvoiceStatus = (typeof INVOICE_STATUSES)[number];

// ── Quotations ────────────────────────────────────────────────────────────────

export type QuotationRow = {
  id: string;
  name: string;
  company: string;
  company_email: string;
  contact: string;
  address: string;
  country: string;
  service: string;
  issued_date: string;
  valid_until: string;
  quotation_status: string;
  total: number;
  subtotal: number | null;
  discount_percent: number | null;
  discount_amount: number | null;
  tax_amount: number | null;
  balance: string | null;
  avatar: string | null;
  avatar_color: string | null;
  line_items: LineItem[] | null;
  created_at: string | null;
};

export type QuotationInsert = Omit<QuotationRow, "created_at">;
export type QuotationUpdate = Partial<Omit<QuotationInsert, "id">>;

export const QUOTATION_STATUSES = ["Draft", "Sent", "Accepted", "Declined"] as const;
export type QuotationStatus = (typeof QUOTATION_STATUSES)[number];

// ── Calendar Events ───────────────────────────────────────────────────────────

export type CalendarEventRow = {
  id: string;
  title: string;
  start_at: string;
  end_at: string;
  all_day: boolean;
  url: string | null;
  calendar: string | null;
  description: string | null;
  created_at: string | null;
};

export type CalendarEventInsert = Omit<CalendarEventRow, "created_at">;
export type CalendarEventUpdate = Partial<Omit<CalendarEventInsert, "id">>;

export const CALENDAR_CATEGORIES = [
  "Workshops",
  "Certification",
  "Internal",
  "Client Meeting",
  "Field Work",
  "Other",
] as const;
export type CalendarCategory = (typeof CALENDAR_CATEGORIES)[number];

export const CATEGORY_COLORS: Record<string, string> = {
  Workshops: "#3D9DD9",
  Certification: "#177DA6",
  Internal: "#50D4F2",
  "Client Meeting": "#7ED1F2",
  "Field Work": "#0B2D59",
  Other: "#6b7280",
};

// ── Shared helpers ────────────────────────────────────────────────────────────

export const CONTACT_ROLES = ["subscriber", "author", "editor", "maintainer"] as const;
export const CONTACT_STATUSES = ["active", "inactive", "pending"] as const;

export const JOB_TYPES = ["Full-time", "Part-time", "Contract", "Consultancy"] as const;
export const JOB_DEPARTMENTS = [
  "Consulting",
  "Training",
  "Business Development",
  "Operations",
  "Finance",
  "Communications",
  "General",
] as const;

export const COUNTRIES = [
  "Kenya",
  "Uganda",
  "Tanzania",
  "Rwanda",
  "Ethiopia",
  "Somalia",
  "South Sudan",
  "DRC",
  "Nigeria",
  "Ghana",
  "Mozambique",
  "Zimbabwe",
  "Zambia",
  "Malawi",
  "Other",
] as const;

export const DGC_SERVICES = [
  "Organisational Strengthening",
  "Capacity Strengthening",
  "System Strengthening",
  "Safety & Security",
  "M&E Consultancy",
  "Training & Facilitation",
  "Research & Analysis",
  "Programme Delivery",
  "Other",
] as const;

// ── Blog Posts ────────────────────────────────────────────────────────────────

export type BlogPostRow = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  cover_image: string | null;
  category: string;
  tags: string[];
  author: string;
  status: string;
  reading_time: number | null;
  published_at: string | null;
  created_at: string | null;
  updated_at: string | null;
};

export type BlogPostInsert = Omit<BlogPostRow, "created_at" | "updated_at">;
export type BlogPostUpdate = Partial<BlogPostInsert>;

export const BLOG_CATEGORIES = [
  "Research & Evaluation",
  "Policy & Advocacy",
  "Technology & Innovation",
  "Climate & Environment",
  "Governance & Accountability",
  "Health & Wellbeing",
  "Partnerships & Localisation",
  "Livelihoods & Economic Development",
  "Social Protection",
  "Urban Development",
  "Protection & Safety",
  "Organisation Updates",
  "General",
] as const;
