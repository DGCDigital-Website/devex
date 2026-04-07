import { notFound } from "next/navigation";
import { requireBeaconAuth } from "@/utils/supabase/beacon";
import Link from "next/link";
import BeaconShell from "@/components/beacon/beacon-shell";
import {
  ArrowLeft,
  Pencil,
  Briefcase,
  MapPin,
  Clock,
  Calendar,
  Tag,
  AlignLeft,
  CheckCircle2,
} from "lucide-react";

export const dynamic = "force-dynamic";

function formatDate(iso: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

const TYPE_STYLES: Record<string, string> = {
  "Full-time":   "bg-emerald-50 text-emerald-700 border border-emerald-200",
  "Part-time":   "bg-amber-50 text-amber-700 border border-amber-200",
  "Contract":    "bg-violet-50 text-violet-700 border border-violet-200",
  "Consultancy": "bg-sky-50 text-sky-700 border border-sky-200",
  "Internship":  "bg-pink-50 text-pink-700 border border-pink-200",
};

export default async function JobViewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { db: supabase, user } = await requireBeaconAuth();

  const { data: job } = await supabase
    .from("jobs")
    .select("*")
    .eq("id", id)
    .single();

  if (!job) notFound();

  const beaconUser = { email: user.email ?? "", id: user.id };
  const typeStyle = TYPE_STYLES[job.type] ?? "bg-gray-100 text-gray-600 border border-gray-200";

  return (
    <BeaconShell
      user={beaconUser}
      title="Job Details"
      subtitle={job.title}
      actions={
        <Link
          href={`/beacon/jobs/${id}/edit`}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all shadow-[0_2px_8px_rgba(61,157,217,0.3)] hover:shadow-[0_4px_16px_rgba(61,157,217,0.4)] hover:-translate-y-px"
          style={{ background: "linear-gradient(135deg,#3D9DD9,#177DA6)" }}
        >
          <Pencil className="w-4 h-4" />
          Edit Job
        </Link>
      }
    >
      <Link
        href="/beacon/jobs"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Jobs
      </Link>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Summary card */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white rounded-2xl border border-gray-200/80 shadow-[0_1px_4px_rgba(0,0,0,0.06)] overflow-hidden">
            <div
              className="h-24 w-full flex items-end px-6 pb-4"
              style={{ background: "linear-gradient(135deg,#0B2D59,#177DA6)" }}
            >
              <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="px-6 py-5 space-y-4">
              <div>
                <h2 className="text-gray-900 font-bold text-lg leading-tight">{job.title}</h2>
                <p className="text-gray-500 text-sm mt-1">{job.department || "—"}</p>
              </div>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${typeStyle}`}>
                {job.type}
              </span>
            </div>
          </div>

          {/* Meta */}
          <div className="bg-white rounded-2xl border border-gray-200/80 shadow-[0_1px_4px_rgba(0,0,0,0.06)] p-5 space-y-3">
            <p className="text-gray-400 text-[11px] font-semibold uppercase tracking-wider">Quick Info</p>
            <div className="flex items-center gap-2.5 text-sm">
              <MapPin className="w-4 h-4 text-dgc-blue-1 shrink-0" />
              <span className="text-gray-700">{job.location || "—"}</span>
            </div>
            <div className="flex items-center gap-2.5 text-sm">
              <Clock className="w-4 h-4 text-dgc-blue-1 shrink-0" />
              <span className="text-gray-700">{job.type}</span>
            </div>
            <div className="flex items-center gap-2.5 text-sm">
              <Calendar className="w-4 h-4 text-dgc-blue-1 shrink-0" />
              <span className="text-gray-700">Deadline: {formatDate(job.deadline)}</span>
            </div>
            {job.thematic && (
              <div className="flex items-center gap-2.5 text-sm">
                <Tag className="w-4 h-4 text-dgc-blue-1 shrink-0" />
                <span className="text-gray-700 capitalize">{job.thematic.replace(/-/g, " ")}</span>
              </div>
            )}
            <div className="flex items-center gap-2.5 text-sm pt-1 border-t border-gray-50">
              <Calendar className="w-4 h-4 text-gray-400 shrink-0" />
              <span className="text-gray-500">Posted: {formatDate(job.created_at)}</span>
            </div>
          </div>
        </div>

        {/* Description + requirements */}
        <div className="lg:col-span-2 space-y-5">
          {job.description && (
            <div className="bg-white rounded-2xl border border-gray-200/80 shadow-[0_1px_4px_rgba(0,0,0,0.06)] overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-dgc-blue-1/10 flex items-center justify-center">
                  <AlignLeft className="w-3.5 h-3.5 text-dgc-blue-1" />
                </div>
                <h3 className="text-gray-800 font-semibold text-sm">Job Description</h3>
              </div>
              <div className="px-6 py-5">
                <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">{job.description}</p>
              </div>
            </div>
          )}

          {Array.isArray(job.requirements) && job.requirements.length > 0 && (
            <div className="bg-white rounded-2xl border border-gray-200/80 shadow-[0_1px_4px_rgba(0,0,0,0.06)] overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-emerald-50 flex items-center justify-center">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                </div>
                <h3 className="text-gray-800 font-semibold text-sm">Requirements</h3>
              </div>
              <ul className="px-6 py-5 space-y-2.5">
                {(job.requirements as string[]).map((req, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    {req}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </BeaconShell>
  );
}
