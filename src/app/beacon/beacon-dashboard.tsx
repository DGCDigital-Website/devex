"use client";

import Link from "next/link";
import BeaconShell from "@/components/beacon/beacon-shell";
import type { BeaconUser } from "@/lib/beacon/types";
import {
  Users,
  Briefcase,
  FileText,
  Receipt,
  CalendarDays,
  TrendingUp,
  Clock,
  CheckCircle2,
  ArrowUpRight,
  ExternalLink,
  ChevronRight,
  Plus,
} from "lucide-react";

/* ── types ──────────────────────────────────────────────────────────────── */

type RecentContact = {
  id: number;
  full_name: string;
  email: string;
  role: string;
  status: string;
  created_at: string | null;
};

type Stats = {
  contacts: number;
  jobs: number;
  invoiceCount: number;
  invoiceTotal: number;
  pendingInvoices: number;
  quotationCount: number;
  quotationTotal: number;
  recentContacts: RecentContact[];
};

type Props = { user: BeaconUser; stats: Stats };

/* ── helpers ─────────────────────────────────────────────────────────────── */

function fmtKES(n: number) {
  if (n === 0) return "KES 0";
  if (n >= 1_000_000)
    return `KES ${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000)
    return `KES ${(n / 1_000).toFixed(0)}K`;
  return new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
    minimumFractionDigits: 0,
  }).format(n);
}

function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((p) => p[0] ?? "")
    .join("")
    .toUpperCase();
}

function avatarColor(name: string) {
  const palette = [
    "bg-violet-100 text-violet-700",
    "bg-sky-100 text-sky-700",
    "bg-emerald-100 text-emerald-700",
    "bg-amber-100 text-amber-700",
    "bg-rose-100 text-rose-700",
    "bg-indigo-100 text-indigo-700",
  ];
  return palette[name.charCodeAt(0) % palette.length];
}

function statusStyle(status: string) {
  const map: Record<string, { dot: string; text: string; bg: string }> = {
    active:   { dot: "bg-emerald-500", text: "text-emerald-700", bg: "bg-emerald-50 border-emerald-200" },
    pending:  { dot: "bg-amber-400",   text: "text-amber-700",   bg: "bg-amber-50 border-amber-200"   },
    inactive: { dot: "bg-gray-400",    text: "text-gray-500",    bg: "bg-gray-100 border-gray-200"    },
  };
  return map[status] ?? { dot: "bg-dgc-blue-1", text: "text-dgc-blue-2", bg: "bg-blue-50 border-blue-200" };
}

function formatDate(iso: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric", month: "short", year: "numeric",
  });
}

function greeting(email: string) {
  const hour = new Date().getHours();
  const time = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  const name = email.split("@")[0].replace(/[._-]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  return { time, name };
}

/* ── component ───────────────────────────────────────────────────────────── */

export default function BeaconDashboard({ user, stats }: Props) {
  const { time, name } = greeting(user.email);

  /* Primary KPI cards */
  const kpiCards = [
    {
      label: "Total Contacts",
      value: stats.contacts,
      sub: "registered stakeholders",
      icon: Users,
      accent: "text-dgc-blue-1",
      iconBg: "bg-dgc-blue-1/10",
      border: "border-dgc-blue-1/20",
      href: "/beacon/contacts",
    },
    {
      label: "Open Roles",
      value: stats.jobs,
      sub: "active job postings",
      icon: Briefcase,
      accent: "text-emerald-600",
      iconBg: "bg-emerald-50",
      border: "border-emerald-200/60",
      href: "/beacon/jobs",
    },
    {
      label: "Invoices",
      value: stats.invoiceCount,
      sub: `${stats.pendingInvoices} pending · ${fmtKES(stats.invoiceTotal)} total`,
      icon: FileText,
      accent: "text-violet-600",
      iconBg: "bg-violet-50",
      border: "border-violet-200/60",
      href: "/beacon/invoices",
    },
    {
      label: "Quotations",
      value: stats.quotationCount,
      sub: `${fmtKES(stats.quotationTotal)} pipeline value`,
      icon: Receipt,
      accent: "text-amber-600",
      iconBg: "bg-amber-50",
      border: "border-amber-200/60",
      href: "/beacon/quotations",
    },
  ];

  /* Quick-action rows */
  const quickActions = [
    {
      group: "Operations",
      items: [
        { label: "Add contact",   href: "/beacon/contacts/add",    icon: Users,        color: "text-dgc-blue-1",  bg: "bg-dgc-blue-1/8" },
        { label: "Post a job",    href: "/beacon/jobs/add",         icon: Briefcase,    color: "text-emerald-600", bg: "bg-emerald-50"   },
        { label: "Open calendar", href: "/beacon/calendar",         icon: CalendarDays, color: "text-indigo-600",  bg: "bg-indigo-50"    },
      ],
    },
    {
      group: "Finance",
      items: [
        { label: "New invoice",    href: "/beacon/invoices/add",    icon: FileText, color: "text-violet-600", bg: "bg-violet-50" },
        { label: "New quotation",  href: "/beacon/quotations/add",  icon: Receipt,  color: "text-amber-600",  bg: "bg-amber-50"  },
      ],
    },
  ];

  /* Finance summary row */
  const financeSummary = [
    {
      label: "Total Invoiced",
      value: fmtKES(stats.invoiceTotal),
      icon: TrendingUp,
      color: "text-dgc-blue-1",
      bg: "bg-dgc-blue-1/10",
    },
    {
      label: "Pending Invoices",
      value: stats.pendingInvoices,
      icon: Clock,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
    {
      label: "Quotation Pipeline",
      value: fmtKES(stats.quotationTotal),
      icon: CheckCircle2,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
  ];

  return (
    <BeaconShell user={user} title="Overview" subtitle="DGC Beacon — internal operations dashboard">
      <div className="space-y-7 max-w-[1100px]">

        {/* Welcome banner */}
        <div
          className="relative rounded-2xl overflow-hidden px-7 py-6"
          style={{ background: "linear-gradient(135deg,#0B2D59 0%,#177DA6 100%)" }}
        >
          {/* subtle grid texture */}
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(61,157,217,1) 1px,transparent 1px),linear-gradient(90deg,rgba(61,157,217,1) 1px,transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          <div className="relative z-10 flex items-center justify-between gap-4 flex-wrap">
            <div>
              <p className="text-white/50 text-sm font-medium mb-0.5">DGC Beacon</p>
              <h1 className="text-white text-2xl font-bold tracking-tight">
                {time}, {name} 👋
              </h1>
              <p className="text-white/55 text-sm mt-1 max-w-lg">
                Here&apos;s an overview of your operations — contacts, jobs, invoices, and more.
              </p>
            </div>
            <div className="flex items-center gap-1.5 bg-emerald-500/20 border border-emerald-400/30 rounded-full px-3.5 py-1.5 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-emerald-300 text-xs font-semibold">All systems operational</span>
            </div>
          </div>
        </div>

        {/* KPI cards */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          {kpiCards.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.label}
                href={card.href}
                className={`bg-white rounded-2xl border ${card.border} p-5 shadow-[0_1px_4px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.09)] hover:-translate-y-0.5 transition-all duration-200 group block`}
              >
                <div className={`${card.iconBg} ${card.accent} w-9 h-9 rounded-xl flex items-center justify-center mb-4`}>
                  <Icon className="w-4.5 h-4.5" />
                </div>
                <p className="text-gray-400 text-xs font-medium tracking-wide mb-1">{card.label}</p>
                <p className={`text-[1.875rem] font-extrabold leading-none ${card.accent} mb-1.5`}>
                  {card.value}
                </p>
                <p className="text-gray-400 text-[11px] leading-snug">{card.sub}</p>
                <div className="flex items-center gap-1 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className={`text-[11px] font-semibold ${card.accent}`}>View all</span>
                  <ArrowUpRight className={`w-3 h-3 ${card.accent}`} />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Finance summary + Quick actions — two column layout */}
        <div className="grid lg:grid-cols-[1fr_320px] gap-6">

          {/* Finance summary */}
          <div className="bg-white rounded-2xl border border-gray-200/80 shadow-[0_1px_4px_rgba(0,0,0,0.06)] overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h2 className="text-gray-900 font-semibold text-sm">Finance Summary</h2>
                <p className="text-gray-400 text-xs mt-0.5">Invoices & quotation pipeline at a glance</p>
              </div>
              <Link
                href="/beacon/invoices"
                className="text-dgc-blue-1 text-xs font-semibold hover:underline flex items-center gap-1"
              >
                All invoices <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="p-6 grid sm:grid-cols-3 gap-4">
              {financeSummary.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="flex items-start gap-3">
                    <div className={`${item.bg} ${item.color} w-9 h-9 rounded-xl flex items-center justify-center shrink-0`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-[11px] font-medium leading-tight">{item.label}</p>
                      <p className={`text-gray-900 font-bold text-base mt-0.5 ${item.color}`}>
                        {item.value}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            {/* Divider */}
            <div className="border-t border-gray-100 px-6 py-4 flex items-center gap-4">
              <Link
                href="/beacon/invoices/add"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-white shadow-[0_2px_8px_rgba(61,157,217,0.25)] hover:-translate-y-px transition-all"
                style={{ background: "linear-gradient(135deg,#3D9DD9,#177DA6)" }}
              >
                <Plus className="w-3.5 h-3.5" /> New Invoice
              </Link>
              <Link
                href="/beacon/quotations/add"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" /> New Quotation
              </Link>
            </div>
          </div>

          {/* Quick actions */}
          <div className="bg-white rounded-2xl border border-gray-200/80 shadow-[0_1px_4px_rgba(0,0,0,0.06)] overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100">
              <h2 className="text-gray-900 font-semibold text-sm">Quick Actions</h2>
              <p className="text-gray-400 text-xs mt-0.5">Jump straight into common tasks</p>
            </div>
            <div className="p-5 space-y-5">
              {quickActions.map((group) => (
                <div key={group.group}>
                  <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-[0.1em] mb-2">
                    {group.group}
                  </p>
                  <div className="space-y-1.5">
                    {group.items.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.label}
                          href={item.href}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors group"
                        >
                          <div className={`${item.bg} ${item.color} w-7 h-7 rounded-lg flex items-center justify-center shrink-0`}>
                            <Icon className="w-3.5 h-3.5" />
                          </div>
                          <span className="text-gray-700 text-sm font-medium group-hover:text-gray-900 transition-colors flex-1">
                            {item.label}
                          </span>
                          <ChevronRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-gray-400 group-hover:translate-x-0.5 transition-all" />
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}

              {/* External link */}
              <div className="pt-1 border-t border-gray-100">
                <a
                  href="/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors group"
                >
                  <div className="bg-gray-100 text-gray-500 w-7 h-7 rounded-lg flex items-center justify-center shrink-0">
                    <ExternalLink className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-gray-500 text-sm font-medium group-hover:text-gray-700 transition-colors flex-1">
                    View public site
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-gray-400 group-hover:translate-x-0.5 transition-all" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Recent contacts table */}
        <div className="bg-white rounded-2xl border border-gray-200/80 shadow-[0_1px_4px_rgba(0,0,0,0.06)] overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h2 className="text-gray-900 font-semibold text-[0.9375rem]">Recent Contacts</h2>
              <p className="text-gray-400 text-xs mt-0.5">Latest entries in the contacts database</p>
            </div>
            <Link
              href="/beacon/contacts"
              className="text-dgc-blue-1 text-xs font-semibold hover:underline flex items-center gap-1"
            >
              View all <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {stats.recentContacts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
              <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-gray-300" />
              </div>
              <p className="text-gray-500 font-medium text-sm">No contacts yet</p>
              <p className="text-gray-400 text-xs mt-1 max-w-xs">
                Contacts from the website form or added manually will appear here.
              </p>
              <Link
                href="/beacon/contacts/add"
                className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-white shadow-[0_2px_8px_rgba(61,157,217,0.25)] hover:-translate-y-px transition-all"
                style={{ background: "linear-gradient(135deg,#3D9DD9,#177DA6)" }}
              >
                <Plus className="w-3.5 h-3.5" /> Add first contact
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50/80 border-b border-gray-100">
                    {["Contact", "Role", "Status", "Added"].map((h) => (
                      <th key={h} className="text-left text-gray-400 font-medium text-xs px-6 py-3.5 tracking-wide uppercase">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {stats.recentContacts.map((c) => {
                    const s = statusStyle(c.status);
                    return (
                      <tr key={c.id} className="hover:bg-gray-50/70 transition-colors duration-100 group">
                        {/* Avatar + name */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${avatarColor(c.full_name)}`}>
                              {initials(c.full_name)}
                            </div>
                            <div>
                              <p className="font-semibold text-gray-800 text-[0.8125rem] leading-tight">{c.full_name}</p>
                              <p className="text-gray-400 text-xs mt-0.5">{c.email}</p>
                            </div>
                          </div>
                        </td>
                        {/* Role */}
                        <td className="px-6 py-4 text-gray-500 text-[0.8125rem] capitalize whitespace-nowrap">
                          {c.role || "—"}
                        </td>
                        {/* Status */}
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold capitalize border ${s.bg} ${s.text}`}>
                            <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${s.dot}`} />
                            {c.status || "new"}
                          </span>
                        </td>
                        {/* Date */}
                        <td className="px-6 py-4 text-gray-400 text-[0.8125rem] whitespace-nowrap tabular-nums">
                          {formatDate(c.created_at)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </BeaconShell>
  );
}
