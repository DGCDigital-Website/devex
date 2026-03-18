"use client";

import Link from "next/link";
import { useState } from "react";
import { Plus, Eye, Pencil, FileText } from "lucide-react";
import { ADMIN_INVOICES, Invoice } from "@/lib/admin-data";

type StatusFilter = "all" | "paid" | "unpaid" | "overdue" | "draft";

function statusBadge(status: Invoice["status"]) {
  const map: Record<Invoice["status"], string> = {
    paid: "bg-green-50 text-green-700 border border-green-200",
    unpaid: "bg-yellow-50 text-yellow-700 border border-yellow-200",
    overdue: "bg-red-50 text-red-700 border border-red-200",
    draft: "bg-gray-100 text-gray-500 border border-gray-200",
  };
  return map[status];
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

export default function InvoicesPage() {
  const [filter, setFilter] = useState<StatusFilter>("all");

  const filtered = filter === "all" ? ADMIN_INVOICES : ADMIN_INVOICES.filter((i) => i.status === filter);

  const total = ADMIN_INVOICES.length;
  const paid = ADMIN_INVOICES.filter((i) => i.status === "paid");
  const unpaid = ADMIN_INVOICES.filter((i) => i.status === "unpaid");
  const overdue = ADMIN_INVOICES.filter((i) => i.status === "overdue");

  const totalPaidAmount = paid.reduce((s, i) => s + i.total, 0);
  const totalUnpaidAmount = unpaid.reduce((s, i) => s + i.total, 0);
  const totalOverdueAmount = overdue.reduce((s, i) => s + i.total, 0);

  const tabs: { key: StatusFilter; label: string; count: number }[] = [
    { key: "all", label: "All", count: total },
    { key: "paid", label: "Paid", count: paid.length },
    { key: "unpaid", label: "Unpaid", count: unpaid.length },
    { key: "overdue", label: "Overdue", count: overdue.length },
    { key: "draft", label: "Draft", count: ADMIN_INVOICES.filter((i) => i.status === "draft").length },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Invoices</h1>
          <p className="text-sm text-gray-500 mt-1">Manage and track all client invoices.</p>
        </div>
        <Link
          href="/admin/invoices/new"
          className="inline-flex items-center gap-2 bg-[#3D9DD9] hover:bg-[#177DA6] text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors shadow-sm"
        >
          <Plus size={16} />
          New Invoice
        </Link>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Total</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{total}</p>
          <p className="text-xs text-gray-400 mt-0.5">invoices</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-xs text-green-600 font-medium uppercase tracking-wide">Paid</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{formatCurrency(totalPaidAmount)}</p>
          <p className="text-xs text-gray-400 mt-0.5">{paid.length} invoices</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-xs text-yellow-600 font-medium uppercase tracking-wide">Unpaid</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{formatCurrency(totalUnpaidAmount)}</p>
          <p className="text-xs text-gray-400 mt-0.5">{unpaid.length} invoices</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-xs text-red-600 font-medium uppercase tracking-wide">Overdue</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{formatCurrency(totalOverdueAmount)}</p>
          <p className="text-xs text-gray-400 mt-0.5">{overdue.length} invoices</p>
        </div>
      </div>

      {/* Table card */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {/* Filter tabs */}
        <div className="flex items-center gap-1 px-4 pt-4 border-b border-gray-100 overflow-x-auto">
          {tabs.map(({ key, label, count }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`px-4 py-2 text-sm font-medium rounded-t-lg whitespace-nowrap transition-colors ${
                filter === key
                  ? "bg-[#3D9DD9]/10 text-[#3D9DD9] border-b-2 border-[#3D9DD9]"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              }`}
            >
              {label}
              <span
                className={`ml-2 text-xs px-1.5 py-0.5 rounded-full ${
                  filter === key ? "bg-[#3D9DD9]/20 text-[#3D9DD9]" : "bg-gray-100 text-gray-400"
                }`}
              >
                {count}
              </span>
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-6 py-3">
                  Invoice #
                </th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-6 py-3">
                  Client / Org
                </th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-6 py-3">
                  Issue Date
                </th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-6 py-3">
                  Due Date
                </th>
                <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wide px-6 py-3">
                  Amount
                </th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-6 py-3">
                  Status
                </th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-400">
                    <FileText size={32} className="mx-auto mb-3 opacity-30" />
                    <p>No invoices found.</p>
                  </td>
                </tr>
              )}
              {filtered.map((inv) => (
                <tr key={inv.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="font-mono text-xs text-gray-600 bg-gray-100 px-2 py-0.5 rounded">
                      {inv.invoiceNo}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-800">{inv.client}</p>
                    <p className="text-xs text-gray-400 truncate max-w-[200px]">{inv.clientOrg}</p>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{formatDate(inv.issueDate)}</td>
                  <td className="px-6 py-4 text-gray-600">{formatDate(inv.dueDate)}</td>
                  <td className="px-6 py-4 text-right font-semibold text-gray-900">
                    {formatCurrency(inv.total)}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-xs font-medium px-2.5 py-1 rounded-full capitalize ${statusBadge(
                        inv.status
                      )}`}
                    >
                      {inv.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/admin/invoices/${inv.id}`}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-[#3D9DD9] hover:bg-[#3D9DD9]/10 transition-colors"
                        title="View invoice"
                      >
                        <Eye size={15} />
                      </Link>
                      <button
                        className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                        title="Edit invoice"
                      >
                        <Pencil size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
