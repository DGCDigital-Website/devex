"use client";

import Link from "next/link";
import { useState } from "react";
import { Plus, Eye, Pencil, ClipboardList } from "lucide-react";
import type { Quotation } from "@/lib/admin-data";

type StatusFilter = "all" | "accepted" | "pending" | "rejected" | "expired" | "draft";

function statusBadge(status: Quotation["status"]) {
  const map: Record<Quotation["status"], string> = {
    accepted: "bg-green-50 text-green-700 border border-green-200",
    pending: "bg-blue-50 text-[#3D9DD9] border border-[#3D9DD9]/30",
    rejected: "bg-red-50 text-red-700 border border-red-200",
    expired: "bg-orange-50 text-orange-600 border border-orange-200",
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

export default function QuotationsTable({ quotations }: { quotations: Quotation[] }) {
  const [filter, setFilter] = useState<StatusFilter>("all");

  const filtered = filter === "all" ? quotations : quotations.filter((q) => q.status === filter);

  const accepted = quotations.filter((q) => q.status === "accepted");
  const pending = quotations.filter((q) => q.status === "pending");
  const rejected = quotations.filter((q) => q.status === "rejected");

  const tabs: { key: StatusFilter; label: string; count: number }[] = [
    { key: "all", label: "All", count: quotations.length },
    { key: "accepted", label: "Accepted", count: accepted.length },
    { key: "pending", label: "Pending", count: pending.length },
    { key: "rejected", label: "Rejected", count: rejected.length },
    { key: "expired", label: "Expired", count: quotations.filter((q) => q.status === "expired").length },
    { key: "draft", label: "Draft", count: quotations.filter((q) => q.status === "draft").length },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quotations</h1>
          <p className="text-sm text-gray-500 mt-1">Manage proposals and quotations sent to clients.</p>
        </div>
        <Link
          href="/admin/quotations/new"
          className="inline-flex items-center gap-2 bg-[#3D9DD9] hover:bg-[#177DA6] text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors shadow-sm"
        >
          <Plus size={16} />
          New Quotation
        </Link>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Total</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{quotations.length}</p>
          <p className="text-xs text-gray-400 mt-0.5">quotations</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-xs text-green-600 font-medium uppercase tracking-wide">Accepted</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{formatCurrency(accepted.reduce((s, q) => s + q.total, 0))}</p>
          <p className="text-xs text-gray-400 mt-0.5">{accepted.length} quotations</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-xs text-[#3D9DD9] font-medium uppercase tracking-wide">Pending</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{formatCurrency(pending.reduce((s, q) => s + q.total, 0))}</p>
          <p className="text-xs text-gray-400 mt-0.5">{pending.length} quotations</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-xs text-red-600 font-medium uppercase tracking-wide">Rejected</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{rejected.length}</p>
          <p className="text-xs text-gray-400 mt-0.5">quotations</p>
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
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-6 py-3">Quotation #</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-6 py-3">Client / Org</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-6 py-3">Issue Date</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-6 py-3">Valid Until</th>
                <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wide px-6 py-3">Amount</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-6 py-3">Status</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-400">
                    <ClipboardList size={32} className="mx-auto mb-3 opacity-30" />
                    <p>No quotations found.</p>
                  </td>
                </tr>
              )}
              {filtered.map((quo) => (
                <tr key={quo.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="font-mono text-xs text-gray-600 bg-gray-100 px-2 py-0.5 rounded">{quo.quotationNo}</span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-800">{quo.client}</p>
                    <p className="text-xs text-gray-400 truncate max-w-[200px]">{quo.clientOrg}</p>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{formatDate(quo.issueDate)}</td>
                  <td className="px-6 py-4 text-gray-600">{formatDate(quo.validUntil)}</td>
                  <td className="px-6 py-4 text-right font-semibold text-gray-900">{formatCurrency(quo.total)}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full capitalize ${statusBadge(quo.status)}`}>
                      {quo.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/admin/quotations/${quo.id}`}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-[#3D9DD9] hover:bg-[#3D9DD9]/10 transition-colors"
                        title="View quotation"
                      >
                        <Eye size={15} />
                      </Link>
                      <Link
                        href={`/admin/quotations/${quo.id}/edit`}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                        title="Edit quotation"
                      >
                        <Pencil size={15} />
                      </Link>
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
