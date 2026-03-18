"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import BeaconShell from "@/components/beacon/beacon-shell";
import { updateJob } from "@/lib/beacon/actions";
import { JOB_TYPES, JOB_DEPARTMENTS } from "@/lib/beacon/types";
import type { BeaconUser, JobRow } from "@/lib/beacon/types";
import { Briefcase, Tag, Loader2, ArrowLeft, AlertCircle, Plus, X as XIcon } from "lucide-react";

const INPUT_CLS = "w-full bg-white border border-gray-200 rounded-xl px-3.5 py-2.5 text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-dgc-blue-1/20 focus:border-dgc-blue-1 transition-all";
const SELECT_CLS = "w-full bg-white border border-gray-200 rounded-xl px-3.5 py-2.5 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-dgc-blue-1/20 focus:border-dgc-blue-1 transition-all appearance-none";
const TEXTAREA_CLS = "w-full bg-white border border-gray-200 rounded-xl px-3.5 py-2.5 text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-dgc-blue-1/20 focus:border-dgc-blue-1 transition-all resize-none";

function Field({ label, required, children, hint }: { label: string; required?: boolean; children: React.ReactNode; hint?: string }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-gray-700 text-sm font-medium">{label}{required && <span className="text-red-400 ml-0.5">*</span>}</label>
      {children}
      {hint && <p className="text-gray-400 text-xs">{hint}</p>}
    </div>
  );
}

export default function EditJobForm({ user, job }: { user: BeaconUser; job: JobRow }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reqInput, setReqInput] = useState("");

  const [form, setForm] = useState({
    title: job.title,
    department: job.department,
    location: job.location,
    type: job.type,
    description: job.description ?? "",
    thematic: job.thematic ?? "",
    deadline: job.deadline ?? "",
    requirements: job.requirements ?? [],
  });

  function update(field: string, value: string) { setForm((f) => ({ ...f, [field]: value })); }
  function addReq() { const v = reqInput.trim(); if (!v) return; setForm((f) => ({ ...f, requirements: [...f.requirements, v] })); setReqInput(""); }
  function removeReq(i: number) { setForm((f) => ({ ...f, requirements: f.requirements.filter((_, idx) => idx !== i) })); }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const result = await updateJob(job.id, {
      ...form,
      requirements: form.requirements.length ? form.requirements : null,
      thematic: form.thematic || null,
      deadline: form.deadline || null,
      description: form.description || null,
    });
    setLoading(false);
    if (result.error) { setError(result.error); return; }
    router.push("/beacon/jobs");
    router.refresh();
  }

  return (
    <BeaconShell user={user} title="Edit Job Posting">
      <div className="max-w-2xl">
        <Link href="/beacon/jobs" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to Jobs
        </Link>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white rounded-2xl border border-gray-200/80 shadow-[0_1px_4px_rgba(0,0,0,0.06)] overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-dgc-blue-1/10 flex items-center justify-center"><Briefcase className="w-3.5 h-3.5 text-dgc-blue-1" /></div>
              <h2 className="text-gray-800 font-semibold text-sm">Role Details</h2>
            </div>
            <div className="px-6 py-5 space-y-4">
              <Field label="Job Title" required>
                <input type="text" required value={form.title} onChange={(e) => update("title", e.target.value)} className={INPUT_CLS} />
              </Field>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Department" required>
                  <select value={form.department} onChange={(e) => update("department", e.target.value)} className={SELECT_CLS}>
                    {JOB_DEPARTMENTS.map((d) => <option key={d} value={d}>{d}</option>)}
                  </select>
                </Field>
                <Field label="Employment Type" required>
                  <select value={form.type} onChange={(e) => update("type", e.target.value)} className={SELECT_CLS}>
                    {JOB_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </Field>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Location">
                  <input type="text" value={form.location} onChange={(e) => update("location", e.target.value)} className={INPUT_CLS} />
                </Field>
                <Field label="Application Deadline">
                  <input type="date" value={form.deadline} onChange={(e) => update("deadline", e.target.value)} className={INPUT_CLS} />
                </Field>
              </div>
              <Field label="Thematic Area">
                <input type="text" value={form.thematic} onChange={(e) => update("thematic", e.target.value)} className={INPUT_CLS} />
              </Field>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200/80 shadow-[0_1px_4px_rgba(0,0,0,0.06)] overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-violet-50 flex items-center justify-center"><Tag className="w-3.5 h-3.5 text-violet-600" /></div>
              <h2 className="text-gray-800 font-semibold text-sm">Description & Requirements</h2>
            </div>
            <div className="px-6 py-5 space-y-4">
              <Field label="Job Description">
                <textarea rows={5} value={form.description} onChange={(e) => update("description", e.target.value)} className={TEXTAREA_CLS} />
              </Field>
              <Field label="Key Requirements">
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <input type="text" placeholder="Add a requirement…" value={reqInput} onChange={(e) => setReqInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addReq(); } }} className={INPUT_CLS} />
                    <button type="button" onClick={addReq} className="shrink-0 w-10 h-10 rounded-xl bg-dgc-blue-1/10 text-dgc-blue-1 hover:bg-dgc-blue-1/20 transition-colors flex items-center justify-center">
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  {form.requirements.length > 0 && (
                    <ul className="space-y-1.5">
                      {form.requirements.map((r, i) => (
                        <li key={i} className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700">
                          <span>• {r}</span>
                          <button type="button" onClick={() => removeReq(i)} className="text-gray-400 hover:text-red-500 transition-colors ml-2 shrink-0"><XIcon className="w-3.5 h-3.5" /></button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </Field>
            </div>
          </div>

          {error && (
            <div className="flex items-start gap-2.5 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
              <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <div className="flex items-center gap-3 pb-4">
            <button type="submit" disabled={loading} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all shadow-[0_2px_8px_rgba(61,157,217,0.3)] disabled:opacity-60 disabled:shadow-none" style={{ background: "linear-gradient(135deg,#3D9DD9,#177DA6)" }}>
              {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving…</> : "Update Job"}
            </button>
            <Link href="/beacon/jobs" className="px-5 py-2.5 rounded-xl text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors">Cancel</Link>
          </div>
        </form>
      </div>
    </BeaconShell>
  );
}
