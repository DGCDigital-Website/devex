import Link from "next/link";
import { FileText, DollarSign, ClipboardList, Users, ArrowUpRight, CalendarDays } from "lucide-react";
import { ADMIN_INVOICES, ADMIN_QUOTATIONS, ADMIN_CONTACTS, ADMIN_EVENTS } from "@/lib/admin-data";

type InvoiceStatus = "paid" | "unpaid" | "overdue" | "draft";
type QuotationStatus = "accepted" | "pending" | "rejected" | "expired" | "draft";
type AnyStatus = InvoiceStatus | QuotationStatus;

function statusBadge(status: AnyStatus) {
  const map: Record<AnyStatus, string> = {
    paid: "bg-green-50 text-green-700 border border-green-200",
    unpaid: "bg-yellow-50 text-yellow-700 border border-yellow-200",
    overdue: "bg-red-50 text-red-700 border border-red-200",
    draft: "bg-gray-100 text-gray-500 border border-gray-200",
    accepted: "bg-green-50 text-green-700 border border-green-200",
    pending: "bg-blue-50 text-[#3D9DD9] border border-[#3D9DD9]/30",
    rejected: "bg-red-50 text-red-700 border border-red-200",
    expired: "bg-orange-50 text-orange-600 border border-orange-200",
  };
  return map[status] ?? "bg-gray-100 text-gray-500";
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function DashboardPage() {
  const totalInvoices = ADMIN_INVOICES.length;
  const revenueThisYear = ADMIN_INVOICES.filter((inv) => inv.status === "paid").reduce(
    (sum, inv) => sum + inv.total,
    0
  );
  const pendingQuotations = ADMIN_QUOTATIONS.filter((q) => q.status === "pending").length;
  const activeContacts = ADMIN_CONTACTS.filter((c) => c.status === "active").length;

  const recentInvoices = [...ADMIN_INVOICES]
    .sort((a, b) => new Date(b.issueDate).getTime() - new Date(a.issueDate).getTime())
    .slice(0, 4);

  const upcomingEvents = [...ADMIN_EVENTS]
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
    .slice(0, 3);

  const stats = [
    {
      label: "Total Invoices",
      value: totalInvoices,
      icon: FileText,
      color: "text-[#177DA6]",
      bg: "bg-[#177DA6]/10",
      href: "/admin/invoices",
    },
    {
      label: "Revenue This Year",
      value: formatCurrency(revenueThisYear),
      icon: DollarSign,
      color: "text-green-600",
      bg: "bg-green-50",
      href: "/admin/invoices",
    },
    {
      label: "Pending Quotations",
      value: pendingQuotations,
      icon: ClipboardList,
      color: "text-[#3D9DD9]",
      bg: "bg-[#3D9DD9]/10",
      href: "/admin/quotations",
    },
    {
      label: "Active Contacts",
      value: activeContacts,
      icon: Users,
      color: "text-[#0B2D59]",
      bg: "bg-[#0B2D59]/10",
      href: "/admin/contacts",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">
          Overview of DGC operations, finance, and pipeline.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map(({ label, value, icon: Icon, color, bg, href }) => (
          <Link
            key={label}
            href={href}
            className="bg-white rounded-xl border border-gray-200 p-5 flex items-center gap-4 hover:shadow-md hover:border-[#3D9DD9]/40 transition-all group"
          >
            <div className={`w-12 h-12 rounded-xl ${bg} flex items-center justify-center flex-shrink-0`}>
              <Icon size={22} className={color} />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wide truncate">{label}</p>
              <p className="text-2xl font-bold text-gray-900 mt-0.5">{value}</p>
            </div>
            <ArrowUpRight
              size={16}
              className="ml-auto text-gray-300 group-hover:text-[#3D9DD9] flex-shrink-0 transition-colors"
            />
          </Link>
        ))}
      </div>

      {/* Tables row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Invoices */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h2 className="text-sm font-semibold text-gray-800">Recent Invoices</h2>
            <Link
              href="/admin/invoices"
              className="text-xs text-[#3D9DD9] hover:text-[#177DA6] font-medium transition-colors"
            >
              View all →
            </Link>
          </div>
          <div className="divide-y divide-gray-50">
            {recentInvoices.map((inv) => (
              <Link
                key={inv.id}
                href={`/admin/invoices/${inv.id}`}
                className="flex items-center gap-4 px-6 py-3.5 hover:bg-gray-50 transition-colors"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-gray-800 truncate">{inv.invoiceNo}</p>
                  <p className="text-xs text-gray-400 truncate">{inv.clientOrg}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-semibold text-gray-900">{formatCurrency(inv.total)}</p>
                  <p className="text-xs text-gray-400">{formatDate(inv.issueDate)}</p>
                </div>
                <span
                  className={`text-xs font-medium px-2 py-0.5 rounded-full capitalize flex-shrink-0 ${statusBadge(inv.status)}`}
                >
                  {inv.status}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h2 className="text-sm font-semibold text-gray-800">Upcoming Events</h2>
            <Link
              href="/admin/calendar"
              className="text-xs text-[#3D9DD9] hover:text-[#177DA6] font-medium transition-colors"
            >
              View calendar →
            </Link>
          </div>
          <div className="divide-y divide-gray-50">
            {upcomingEvents.map((evt) => (
              <div key={evt.id} className="flex items-start gap-4 px-6 py-3.5">
                <div className="flex-shrink-0 mt-0.5">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: evt.color + "20" }}
                  >
                    <CalendarDays size={16} style={{ color: evt.color }} />
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-gray-800 truncate">{evt.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {formatDate(evt.startDate)}
                    {evt.endDate !== evt.startDate && ` – ${formatDate(evt.endDate)}`}
                  </p>
                  {evt.location && (
                    <p className="text-xs text-gray-400 truncate">{evt.location}</p>
                  )}
                </div>
                <span
                  className="text-xs font-medium px-2 py-0.5 rounded-full capitalize flex-shrink-0"
                  style={{
                    backgroundColor: evt.color + "15",
                    color: evt.color,
                    border: `1px solid ${evt.color}30`,
                  }}
                >
                  {evt.category}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
