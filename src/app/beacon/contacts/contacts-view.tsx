"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import BeaconShell from "@/components/beacon/beacon-shell";
import StatusBadge from "@/components/beacon/status-badge";
import ConfirmDialog from "@/components/beacon/confirm-dialog";
import { deleteContact } from "@/lib/beacon/actions";
import type { BeaconUser, ContactRow } from "@/lib/beacon/types";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  Eye,
  Users,
  Mail,
  Phone,
  Building2,
  X,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// ── helpers ───────────────────────────────────────────────────────────────────

function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((p) => p[0] ?? "")
    .join("")
    .toUpperCase();
}

const AVATAR_PALETTE = [
  "bg-violet-100 text-violet-700",
  "bg-sky-100 text-sky-700",
  "bg-emerald-100 text-emerald-700",
  "bg-amber-100 text-amber-700",
  "bg-rose-100 text-rose-700",
  "bg-indigo-100 text-indigo-700",
];
function avatarColor(name: string) {
  return AVATAR_PALETTE[name.charCodeAt(0) % AVATAR_PALETTE.length];
}

function formatDate(iso: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

const PAGE_SIZE = 15;

// ── types ─────────────────────────────────────────────────────────────────────

type Props = {
  user: BeaconUser;
  contacts: ContactRow[];
};

type SortKey = keyof Pick<ContactRow, "full_name" | "company" | "status" | "created_at">;

// ── component ─────────────────────────────────────────────────────────────────

export default function ContactsView({ user, contacts }: Props) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("created_at");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(1);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  /* filter + sort */
  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return contacts
      .filter(
        (c) =>
          !q ||
          c.full_name.toLowerCase().includes(q) ||
          c.email.toLowerCase().includes(q) ||
          c.company.toLowerCase().includes(q) ||
          c.country.toLowerCase().includes(q)
      )
      .sort((a, b) => {
        const av = String(a[sortKey] ?? "");
        const bv = String(b[sortKey] ?? "");
        return sortDir === "asc"
          ? av.localeCompare(bv)
          : bv.localeCompare(av);
      });
  }, [contacts, search, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function toggleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
    setPage(1);
  }

  /* delete */
  async function handleDelete() {
    if (!deleteId) return;
    setDeleting(true);
    setDeleteError(null);
    const result = await deleteContact(deleteId);
    setDeleting(false);
    if (result.error) {
      setDeleteError(result.error);
      return;
    }
    setDeleteId(null);
    router.refresh();
  }

  /* stat tiles */
  const active = contacts.filter((c) => c.status === "active").length;
  const pending = contacts.filter((c) => c.status === "pending").length;

  /* column header helper */
  const ColHead = ({
    label,
    sortable,
    col,
  }: {
    label: string;
    sortable?: SortKey;
    col?: string;
  }) => (
    <th
      className={`text-left text-gray-400 font-medium text-[11px] uppercase tracking-wide px-5 py-3.5 ${
        col ?? ""
      }`}
    >
      {sortable ? (
        <button
          onClick={() => toggleSort(sortable)}
          className="inline-flex items-center gap-1 hover:text-gray-600 transition-colors"
        >
          {label}
          <ArrowUpDown className="w-3 h-3" />
        </button>
      ) : (
        label
      )}
    </th>
  );

  return (
    <BeaconShell
      user={user}
      title="Contacts"
      subtitle="Manage website enquiries and stakeholder records"
      actions={
        <Link
          href="/beacon/contacts/add"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all shadow-[0_2px_8px_rgba(61,157,217,0.3)] hover:shadow-[0_4px_16px_rgba(61,157,217,0.4)] hover:-translate-y-px"
          style={{ background: "linear-gradient(135deg,#3D9DD9,#177DA6)" }}
        >
          <Plus className="w-4 h-4" />
          Add Contact
        </Link>
      }
    >
      {/* Stats strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          { label: "Total", value: contacts.length, icon: <Users className="w-4 h-4" />, accent: "text-dgc-blue-1", bg: "bg-dgc-blue-1/10" },
          { label: "Active", value: active, icon: <span className="w-2 h-2 rounded-full bg-emerald-500 block" />, accent: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Pending", value: pending, icon: <span className="w-2 h-2 rounded-full bg-amber-400 block" />, accent: "text-amber-600", bg: "bg-amber-50" },
          { label: "Countries", value: new Set(contacts.map((c) => c.country)).size, icon: <span className="text-gray-400 text-xs font-bold">🌍</span>, accent: "text-gray-700", bg: "bg-gray-100" },
        ].map((s) => (
          <div
            key={s.label}
            className="bg-white rounded-xl border border-gray-200/80 px-4 py-3.5 shadow-[0_1px_3px_rgba(0,0,0,0.05)]"
          >
            <div className={`${s.bg} w-7 h-7 rounded-lg flex items-center justify-center mb-2.5 ${s.accent}`}>
              {s.icon}
            </div>
            <p className="text-gray-400 text-[11px] font-medium">{s.label}</p>
            <p className={`text-2xl font-extrabold leading-tight mt-0.5 ${s.accent}`}>
              {s.value}
            </p>
          </div>
        ))}
      </div>

      {/* Table card */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-[0_1px_4px_rgba(0,0,0,0.06)] overflow-hidden">
        {/* Toolbar */}
        <div className="px-5 py-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative max-w-xs w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search contacts…"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="w-full pl-8 pr-8 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-dgc-blue-1/20 focus:border-dgc-blue-1 transition-all placeholder:text-gray-400"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          {filtered.length !== contacts.length && (
            <span className="text-xs text-gray-400 shrink-0">
              {filtered.length} of {contacts.length} contacts
            </span>
          )}
        </div>

        {/* Error */}
        {deleteError && (
          <div className="mx-5 mt-4 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
            {deleteError}
          </div>
        )}

        {/* Table */}
        {contacts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 px-6 text-center">
            <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
              <Users className="w-7 h-7 text-gray-300" />
            </div>
            <p className="text-gray-600 font-semibold">No contacts yet</p>
            <p className="text-gray-400 text-sm mt-1 max-w-xs">
              Add your first contact or wait for website enquiries to come in.
            </p>
            <Link
              href="/beacon/contacts/add"
              className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white"
              style={{ background: "linear-gradient(135deg,#3D9DD9,#177DA6)" }}
            >
              <Plus className="w-4 h-4" /> Add Contact
            </Link>
          </div>
        ) : paginated.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <p className="text-gray-500 font-medium">No results for &ldquo;{search}&rdquo;</p>
            <button onClick={() => setSearch("")} className="mt-2 text-sm text-dgc-blue-1 hover:underline">
              Clear search
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50/80 border-b border-gray-100">
                  <ColHead label="Contact" sortable="full_name" />
                  <ColHead label="Company" sortable="company" col="hidden sm:table-cell" />
                  <ColHead label="Phone" col="hidden md:table-cell" />
                  <ColHead label="Status" sortable="status" />
                  <ColHead label="Joined" sortable="created_at" col="hidden lg:table-cell" />
                  <th className="px-5 py-3.5 w-20" />
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {paginated.map((c) => (
                  <tr
                    key={c.id}
                    className="hover:bg-gray-50/70 transition-colors duration-100 group"
                  >
                    {/* Contact */}
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${avatarColor(c.full_name)}`}
                        >
                          {initials(c.full_name)}
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-gray-800 text-[0.8125rem] leading-tight truncate">
                            {c.full_name}
                          </p>
                          <p className="text-gray-400 text-xs mt-0.5 flex items-center gap-1 truncate">
                            <Mail className="w-3 h-3 shrink-0" />
                            {c.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    {/* Company */}
                    <td className="px-5 py-3.5 hidden sm:table-cell">
                      <div className="flex items-center gap-1.5 text-gray-600 text-[0.8125rem]">
                        <Building2 className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                        <span className="truncate max-w-[160px]">{c.company || "—"}</span>
                      </div>
                    </td>
                    {/* Phone */}
                    <td className="px-5 py-3.5 hidden md:table-cell">
                      <div className="flex items-center gap-1.5 text-gray-500 text-[0.8125rem]">
                        <Phone className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                        {c.contact || "—"}
                      </div>
                    </td>
                    {/* Status */}
                    <td className="px-5 py-3.5">
                      <StatusBadge status={c.status} />
                    </td>
                    {/* Date */}
                    <td className="px-5 py-3.5 text-gray-400 text-[0.8125rem] whitespace-nowrap tabular-nums hidden lg:table-cell">
                      {formatDate(c.created_at)}
                    </td>
                    {/* Actions */}
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link
                          href={`/beacon/contacts/${c.id}/view`}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-dgc-blue-1 hover:bg-dgc-blue-1/10 transition-colors"
                          title="Preview"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </Link>
                        <Link
                          href={`/beacon/contacts/${c.id}/edit`}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-dgc-blue-1 hover:bg-dgc-blue-1/10 transition-colors"
                          title="Edit"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </Link>
                        <button
                          onClick={() => setDeleteId(c.id)}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-5 py-4 border-t border-gray-100 flex items-center justify-between">
            <span className="text-xs text-gray-400">
              Page {page} of {totalPages} · {filtered.length} results
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const p =
                  totalPages <= 5
                    ? i + 1
                    : page <= 3
                    ? i + 1
                    : page >= totalPages - 2
                    ? totalPages - 4 + i
                    : page - 2 + i;
                return (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`w-7 h-7 rounded-lg text-xs font-medium transition-colors ${
                      p === page
                        ? "bg-dgc-blue-1 text-white"
                        : "text-gray-500 hover:bg-gray-100"
                    }`}
                  >
                    {p}
                  </button>
                );
              })}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Delete dialog */}
      <ConfirmDialog
        isOpen={deleteId !== null}
        onClose={() => { setDeleteId(null); setDeleteError(null); }}
        onConfirm={handleDelete}
        loading={deleting}
        title="Delete contact?"
        description="This contact record will be permanently removed. This action cannot be undone."
      />
    </BeaconShell>
  );
}
