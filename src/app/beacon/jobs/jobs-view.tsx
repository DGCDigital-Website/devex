"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import BeaconShell from "@/components/beacon/beacon-shell";
import ConfirmDialog from "@/components/beacon/confirm-dialog";
import { deleteJob } from "@/lib/beacon/actions";
import type { BeaconUser, JobRow } from "@/lib/beacon/types";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  Eye,
  Briefcase,
  MapPin,
  Clock,
  Building2,
  X,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// ── helpers ───────────────────────────────────────────────────────────────────

function formatDate(iso: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

const TYPE_STYLES: Record<string, string> = {
  "Full-time":  "bg-emerald-50 text-emerald-700 border-emerald-200",
  "Part-time":  "bg-amber-50 text-amber-700 border-amber-200",
  "Contract":   "bg-violet-50 text-violet-700 border-violet-200",
  "Consultancy":"bg-sky-50 text-sky-700 border-sky-200",
};

const PAGE_SIZE = 15;

// ── types ─────────────────────────────────────────────────────────────────────

type Props = {
  user: BeaconUser;
  jobs: JobRow[];
};

// ── component ─────────────────────────────────────────────────────────────────

export default function JobsView({ user, jobs }: Props) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return jobs.filter(
      (j) =>
        !q ||
        j.title.toLowerCase().includes(q) ||
        j.department.toLowerCase().includes(q) ||
        j.location.toLowerCase().includes(q) ||
        (j.thematic ?? "").toLowerCase().includes(q)
    );
  }, [jobs, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  async function handleDelete() {
    if (!deleteId) return;
    setDeleting(true);
    setDeleteError(null);
    const result = await deleteJob(deleteId);
    setDeleting(false);
    if (result.error) { setDeleteError(result.error); return; }
    setDeleteId(null);
    router.refresh();
  }

  const byDept = useMemo(() => {
    const map: Record<string, number> = {};
    jobs.forEach((j) => { map[j.department] = (map[j.department] ?? 0) + 1; });
    return map;
  }, [jobs]);
  const deptCount = Object.keys(byDept).length;
  const byType = useMemo(() => {
    const map: Record<string, number> = {};
    jobs.forEach((j) => { map[j.type] = (map[j.type] ?? 0) + 1; });
    return map;
  }, [jobs]);

  return (
    <BeaconShell
      user={user}
      title="Jobs"
      subtitle="Manage open roles and career postings on the DGC website"
      actions={
        <Link
          href="/beacon/jobs/add"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all shadow-[0_2px_8px_rgba(61,157,217,0.3)] hover:shadow-[0_4px_16px_rgba(61,157,217,0.4)] hover:-translate-y-px"
          style={{ background: "linear-gradient(135deg,#3D9DD9,#177DA6)" }}
        >
          <Plus className="w-4 h-4" />
          Add Role
        </Link>
      }
    >
      {/* Stats strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          { label: "Open Roles", value: jobs.length, icon: <Briefcase className="w-4 h-4" />, accent: "text-dgc-blue-1", bg: "bg-dgc-blue-1/10" },
          { label: "Departments", value: deptCount, icon: <Building2 className="w-4 h-4" />, accent: "text-violet-600", bg: "bg-violet-50" },
          { label: "Full-time", value: byType["Full-time"] ?? 0, icon: <Clock className="w-4 h-4" />, accent: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Contract", value: (byType["Contract"] ?? 0) + (byType["Consultancy"] ?? 0), icon: <CalendarDays className="w-4 h-4" />, accent: "text-amber-600", bg: "bg-amber-50" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-200/80 px-4 py-3.5 shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
            <div className={`${s.bg} w-7 h-7 rounded-lg flex items-center justify-center mb-2.5 ${s.accent}`}>{s.icon}</div>
            <p className="text-gray-400 text-[11px] font-medium">{s.label}</p>
            <p className={`text-2xl font-extrabold leading-tight mt-0.5 ${s.accent}`}>{s.value}</p>
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
              placeholder="Search roles…"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="w-full pl-8 pr-8 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-dgc-blue-1/20 focus:border-dgc-blue-1 transition-all placeholder:text-gray-400"
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          {filtered.length !== jobs.length && (
            <span className="text-xs text-gray-400 shrink-0">{filtered.length} of {jobs.length}</span>
          )}
        </div>

        {deleteError && (
          <div className="mx-5 mt-4 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">{deleteError}</div>
        )}

        {/* Table */}
        {jobs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 px-6 text-center">
            <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
              <Briefcase className="w-7 h-7 text-gray-300" />
            </div>
            <p className="text-gray-600 font-semibold">No job postings yet</p>
            <p className="text-gray-400 text-sm mt-1">Post your first role to the DGC careers page.</p>
            <Link href="/beacon/jobs/add" className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white" style={{ background: "linear-gradient(135deg,#3D9DD9,#177DA6)" }}>
              <Plus className="w-4 h-4" /> Add Role
            </Link>
          </div>
        ) : paginated.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <p className="text-gray-500 font-medium">No results for &ldquo;{search}&rdquo;</p>
            <button onClick={() => setSearch("")} className="mt-2 text-sm text-dgc-blue-1 hover:underline">Clear search</button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50/80 border-b border-gray-100">
                  {["Role", "Department", "Location", "Type", "Deadline", ""].map((h) => (
                    <th key={h} className={`text-left text-gray-400 font-medium text-[11px] uppercase tracking-wide px-5 py-3.5 ${h === "Location" ? "hidden md:table-cell" : h === "Deadline" ? "hidden lg:table-cell" : ""}`}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {paginated.map((j) => (
                  <tr key={j.id} className="hover:bg-gray-50/70 transition-colors duration-100 group">
                    {/* Role */}
                    <td className="px-5 py-3.5">
                      <div>
                        <p className="font-semibold text-gray-800 text-[0.8125rem] leading-tight">{j.title}</p>
                        {j.thematic && (
                          <p className="text-gray-400 text-xs mt-0.5">{j.thematic}</p>
                        )}
                      </div>
                    </td>
                    {/* Department */}
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-1.5 text-gray-600 text-[0.8125rem]">
                        <Building2 className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                        {j.department}
                      </div>
                    </td>
                    {/* Location */}
                    <td className="px-5 py-3.5 hidden md:table-cell">
                      <div className="flex items-center gap-1.5 text-gray-500 text-[0.8125rem]">
                        <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                        {j.location}
                      </div>
                    </td>
                    {/* Type */}
                    <td className="px-5 py-3.5">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold border ${TYPE_STYLES[j.type] ?? "bg-gray-100 text-gray-600 border-gray-200"}`}>
                        {j.type}
                      </span>
                    </td>
                    {/* Deadline */}
                    <td className="px-5 py-3.5 text-gray-400 text-[0.8125rem] whitespace-nowrap tabular-nums hidden lg:table-cell">
                      <div className="flex items-center gap-1.5">
                        <CalendarDays className="w-3.5 h-3.5" />
                        {j.deadline ? formatDate(j.deadline) : "Open"}
                      </div>
                    </td>
                    {/* Actions */}
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link href={`/beacon/jobs/${j.id}/view`} className="p-1.5 rounded-lg text-gray-400 hover:text-dgc-blue-1 hover:bg-dgc-blue-1/10 transition-colors" title="Preview">
                          <Eye className="w-3.5 h-3.5" />
                        </Link>
                        <Link href={`/beacon/jobs/${j.id}/edit`} className="p-1.5 rounded-lg text-gray-400 hover:text-dgc-blue-1 hover:bg-dgc-blue-1/10 transition-colors" title="Edit">
                          <Pencil className="w-3.5 h-3.5" />
                        </Link>
                        <button onClick={() => setDeleteId(j.id)} className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors" title="Delete">
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
            <span className="text-xs text-gray-400">Page {page} of {totalPages}</span>
            <div className="flex items-center gap-1">
              <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
                <ChevronLeft className="w-4 h-4" />
              </button>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const p = totalPages <= 5 ? i + 1 : page <= 3 ? i + 1 : page >= totalPages - 2 ? totalPages - 4 + i : page - 2 + i;
                return <button key={p} onClick={() => setPage(p)} className={`w-7 h-7 rounded-lg text-xs font-medium transition-colors ${p === page ? "bg-dgc-blue-1 text-white" : "text-gray-500 hover:bg-gray-100"}`}>{p}</button>;
              })}
              <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      <ConfirmDialog
        isOpen={deleteId !== null}
        onClose={() => { setDeleteId(null); setDeleteError(null); }}
        onConfirm={handleDelete}
        loading={deleting}
        title="Delete job posting?"
        description="This role will be removed from the DGC careers page immediately."
      />
    </BeaconShell>
  );
}
