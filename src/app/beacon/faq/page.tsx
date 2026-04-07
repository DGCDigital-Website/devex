import { requireBeaconAuth } from "@/utils/supabase/beacon";
import BeaconShell from "@/components/beacon/beacon-shell";
import {
  Users,
  Briefcase,
  CalendarDays,
  FileText,
  ClipboardList,
  Palette,
  ChevronDown,
  LayoutDashboard,
  LogIn,
  Shield,
} from "lucide-react";

export const dynamic = "force-dynamic";

// ── FAQ data ──────────────────────────────────────────────────────────────────

const SECTIONS = [
  {
    id: "getting-started",
    label: "Getting Started",
    Icon: LayoutDashboard,
    color: "bg-dgc-blue-1/10 text-dgc-blue-1",
    faqs: [
      {
        q: "How do I log in to DGC Beacon?",
        a: "Go to /beacon/login and enter your administrator email and password. Beacon uses Supabase email/password authentication. If you have forgotten your password, contact your system administrator to reset it from the Supabase dashboard.",
      },
      {
        q: "What is DGC Beacon?",
        a: "DGC Beacon is the internal administration portal for Devex Global Consult. It allows authorised administrators to manage contacts, job postings, calendar events, invoices, quotations, and the DGC brand manual — all in one place.",
      },
      {
        q: "Who can access Beacon?",
        a: "Only authenticated users with an active Supabase account in the DGC project can access Beacon. All routes under /beacon/* are protected by server-side middleware that verifies the session on every request.",
      },
      {
        q: "How do I navigate between modules?",
        a: "Use the Apps dropdown in the top navigation bar. It lists all available modules: Contacts, Jobs, Calendar, Invoices, Quotations, and Brand Manual. You can also click the Dashboard button to return to the overview at any time.",
      },
    ],
  },
  {
    id: "contacts",
    label: "Contacts",
    Icon: Users,
    color: "bg-violet-100 text-violet-700",
    faqs: [
      {
        q: "How do I add a new contact?",
        a: "Navigate to Apps → Contacts, then click the 'Add Contact' button in the top-right corner. Fill in the required fields (Full Name, Email, Phone, Company, Country) and click 'Save Contact'. The record is immediately pushed to Supabase.",
      },
      {
        q: "How do I edit an existing contact?",
        a: "From the Contacts list, hover over any row to reveal the action icons. Click the pencil (Edit) icon to open the edit form. Make your changes and click 'Update Contact'.",
      },
      {
        q: "How do I preview a contact's full record?",
        a: "Hover over a contact row and click the eye (Preview) icon. This opens a detailed view showing all contact information, account settings, and timestamps.",
      },
      {
        q: "How do I delete a contact?",
        a: "Hover over the contact row and click the trash (Delete) icon. A confirmation dialog will appear. Click 'Delete' to permanently remove the record from Supabase. This action cannot be undone.",
      },
      {
        q: "Can I search and filter contacts?",
        a: "Yes. Use the search box at the top of the Contacts table to filter by name, email, company, or country in real time. You can also sort by column headers.",
      },
    ],
  },
  {
    id: "jobs",
    label: "Jobs",
    Icon: Briefcase,
    color: "bg-amber-100 text-amber-700",
    faqs: [
      {
        q: "How do I post a new job listing?",
        a: "Go to Apps → Jobs and click 'Add Job'. Complete the form with the job title, department, location, type, deadline, description, and requirements. Requirements should be entered one per line. Click 'Save Job' to publish to Supabase.",
      },
      {
        q: "Where do job listings appear on the public website?",
        a: "Published jobs are automatically pulled from Supabase and displayed on the public /jobs page. There is no separate publish step — all saved jobs are visible to website visitors.",
      },
      {
        q: "How do I edit or remove a job posting?",
        a: "From the Jobs list, hover over the row and click the pencil icon to edit or the trash icon to delete. Changes are pushed to Supabase immediately and reflected on the public website after revalidation.",
      },
      {
        q: "How do I preview a job posting?",
        a: "Click the eye (Preview) icon on any job row to see the full job details including description and requirements, as they will appear to applicants.",
      },
    ],
  },
  {
    id: "calendar",
    label: "Calendar",
    Icon: CalendarDays,
    color: "bg-emerald-100 text-emerald-700",
    faqs: [
      {
        q: "How do I add an event to the calendar?",
        a: "Go to Apps → Calendar. Click any date cell on the calendar grid to open the 'Add Event' modal. Fill in the event title, start/end date, category, and optional description or URL. Click 'Save Event' to persist it to Supabase.",
      },
      {
        q: "Can I edit or delete an event?",
        a: "Yes. Click on any existing event on the calendar to open the View modal. From there you can switch to Edit mode or click Delete to remove it. All changes are saved to Supabase in real time.",
      },
      {
        q: "Where do calendar events appear publicly?",
        a: "Events appear on the public /events page, which reads directly from Supabase. Only events with a start date in the current or future months are typically shown.",
      },
      {
        q: "What event categories are available?",
        a: "The available categories are: Training, Conference, Workshop, Webinar, Community, Other. Each category is colour-coded on the calendar grid.",
      },
    ],
  },
  {
    id: "invoices",
    label: "Invoices",
    Icon: FileText,
    color: "bg-sky-100 text-sky-700",
    faqs: [
      {
        q: "How do I create a new invoice?",
        a: "Go to Apps → Invoices and click 'New Invoice'. Fill in the client details (name, company, email, address, country), select the service type, set the issued and due dates, and add line items. The system calculates subtotals, discount, and tax automatically. Click 'Create Invoice' to save.",
      },
      {
        q: "How do I preview and print an invoice?",
        a: "From the Invoices list, click the eye (Preview) icon on any invoice. This opens a printable invoice preview with the DGC logo. Use the Print or Download PDF button on the preview page.",
      },
      {
        q: "How do I update the status of an invoice?",
        a: "Open the invoice edit form and change the Status field to Draft, Sent, Paid, or Downloaded. Click 'Update Invoice' to save. The status is immediately reflected in the Invoices list.",
      },
      {
        q: "What currency does Beacon use for invoices?",
        a: "Invoices are denominated in KES (Kenyan Shillings) by default, as DGC is headquartered in Nairobi. This can be extended by editing the invoice form if other currencies are required.",
      },
    ],
  },
  {
    id: "quotations",
    label: "Quotations",
    Icon: ClipboardList,
    color: "bg-rose-100 text-rose-700",
    faqs: [
      {
        q: "How are quotations different from invoices?",
        a: "Quotations are pre-payment estimates sent to prospective clients. Invoices are formal billing documents sent after work is agreed or completed. Both share a similar structure in Beacon and are stored separately in Supabase.",
      },
      {
        q: "How do I create a quotation?",
        a: "Go to Apps → Quotations and click 'New Quotation'. The form is identical to the invoice form. Add client details, line items, and validity date. Click 'Create Quotation' to save.",
      },
      {
        q: "Can I convert a quotation to an invoice?",
        a: "This is not yet automated. You can manually copy the details from a quotation into a new invoice. A one-click conversion feature is planned for a future Beacon update.",
      },
    ],
  },
  {
    id: "brand",
    label: "Brand Manual",
    Icon: Palette,
    color: "bg-indigo-100 text-indigo-700",
    faqs: [
      {
        q: "What is in the Brand Manual?",
        a: "The Brand Manual section contains DGC's official brand guidelines: logo usage, colour palette (Primary Blue #3D9DD9, Dark Blue #0B2D59, etc.), typography specifications (Neometric font family), and tone of voice guidance.",
      },
      {
        q: "Where can I download the DGC logos?",
        a: "The Brand Manual page includes download links for the primary logo (dark), white/light logo, and favicon in SVG and PNG formats.",
      },
    ],
  },
  {
    id: "security",
    label: "Security & Access",
    Icon: Shield,
    color: "bg-gray-100 text-gray-600",
    faqs: [
      {
        q: "Is Beacon protected from unauthorised access?",
        a: "Yes. Every /beacon/* route is protected by Next.js middleware (src/middleware.ts) which calls Supabase's getUser() on every request. Unauthenticated users are immediately redirected to /beacon/login. There is no way to access Beacon pages without a valid session.",
      },
      {
        q: "Are database writes protected?",
        a: "All write operations use Supabase Row Level Security (RLS) policies. Server actions include an auth guard (requireAuth) that verifies the session before any insert, update, or delete is executed.",
      },
      {
        q: "How do I sign out?",
        a: "Click 'Sign out' in the top navigation bar (desktop) or in the mobile menu. You will be redirected to the main DGC website. Your session is invalidated on the Supabase side.",
      },
      {
        q: "What happens if I leave Beacon idle?",
        a: "Supabase sessions expire after the configured timeout (typically 1 hour of inactivity). You will be automatically redirected to /beacon/login when you next try to access a protected page.",
      },
    ],
  },
  {
    id: "auth-beacon-login",
    label: "Login & Authentication",
    Icon: LogIn,
    color: "bg-teal-100 text-teal-700",
    faqs: [
      {
        q: "I cannot log in — what should I check?",
        a: "1) Ensure you are using the correct email address registered in the DGC Supabase project. 2) Check that NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are correctly set in .env.local. 3) Verify the user exists in the Supabase Auth → Users table. 4) If the password was recently changed, try a fresh login.",
      },
      {
        q: "How do I add a new administrator?",
        a: "Go to your Supabase project dashboard → Authentication → Users → Invite User. Enter the new admin's email address. They will receive an invitation email with a link to set their password.",
      },
      {
        q: "How do I reset a user's password?",
        a: "In the Supabase dashboard, go to Authentication → Users, find the user, and click 'Send reset password email'. Alternatively, the user can request a reset from the Supabase-provided reset flow.",
      },
    ],
  },
];

// ── Component ──────────────────────────────────────────────────────────────────

export default async function BeaconFaqPage() {
  const { user } = await requireBeaconAuth();

  const beaconUser = { email: user.email ?? "", id: user.id };

  return (
    <BeaconShell
      user={beaconUser}
      title="Help & FAQs"
      subtitle="How to use DGC Beacon — answers to common questions"
    >
      {/* Quick nav */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white border border-gray-200 text-gray-600 hover:border-dgc-blue-1/40 hover:text-dgc-blue-1 transition-colors shadow-sm"
            >
              <s.Icon className="w-3.5 h-3.5" />
              {s.label}
            </a>
          ))}
        </div>
      </div>

      {/* FAQ sections */}
      <div className="space-y-8">
        {SECTIONS.map((section) => (
          <div
            key={section.id}
            id={section.id}
            className="bg-white rounded-2xl border border-gray-200/80 shadow-[0_1px_4px_rgba(0,0,0,0.06)] overflow-hidden scroll-mt-32"
          >
            {/* Section header */}
            <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3">
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${section.color}`}>
                <section.Icon className="w-4 h-4" />
              </div>
              <h2 className="text-gray-900 font-bold text-base">{section.label}</h2>
              <span className="ml-auto text-gray-400 text-xs font-medium">{section.faqs.length} questions</span>
            </div>

            {/* FAQ items */}
            <div className="divide-y divide-gray-50">
              {section.faqs.map((faq, i) => (
                <FaqItem key={i} q={faq.q} a={faq.a} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom help CTA */}
      <div className="mt-10 p-6 rounded-2xl border border-dgc-blue-1/20 bg-dgc-blue-1/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <p className="text-gray-900 font-semibold">Still need help?</p>
          <p className="text-gray-500 text-sm mt-0.5">
            Contact the DGC technical team at{" "}
            <a href="mailto:info@devexglobal.com" className="text-dgc-blue-1 hover:underline font-medium">
              info@devexglobal.com
            </a>
          </p>
        </div>
        <a
          href="mailto:info@devexglobal.com"
          className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-semibold transition-all shadow-[0_2px_8px_rgba(61,157,217,0.3)] hover:shadow-[0_4px_16px_rgba(61,157,217,0.4)] hover:-translate-y-px"
          style={{ background: "linear-gradient(135deg,#3D9DD9,#177DA6)" }}
        >
          Email Support
        </a>
      </div>
    </BeaconShell>
  );
}

// ── Accordion item (client component logic via details/summary) ────────────────

function FaqItem({ q, a }: { q: string; a: string }) {
  return (
    <details className="group px-6 py-4 cursor-pointer list-none">
      <summary className="flex items-start justify-between gap-4 text-gray-800 font-semibold text-sm leading-snug list-none marker:hidden cursor-pointer select-none">
        <span>{q}</span>
        <ChevronDown className="w-4 h-4 text-gray-400 shrink-0 mt-0.5 transition-transform duration-200 group-open:rotate-180" />
      </summary>
      <p className="mt-3 text-gray-600 text-sm leading-relaxed">{a}</p>
    </details>
  );
}
