"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import BeaconShell from "@/components/beacon/beacon-shell";
import { createJob } from "@/lib/beacon/actions";
import { JOB_TYPES, JOB_DEPARTMENTS } from "@/lib/beacon/types";
import { createClient } from "@/utils/supabase/client";
import type { BeaconUser } from "@/lib/beacon/types";
import { Briefcase, MapPin, Tag, Loader2, ArrowLeft, AlertCircle, Plus, X as XIcon } from "lucide-react";

const INPUT_CLS = "w-full bg-white border border-gray-200 rounded-xl px-3.5 py-2.5 text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-dgc-blue-1/20 focus:border-dgc-blue-1 transition-all";
const SELECT_CLS = "w-full bg-white border border-gray-200 rounded-xl px-3.5 py-2.5 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-dgc-blue-1/20 focus:border-dgc-blue-1 transition-all appearance-none";
const TEXTAREA_CLS = "w-full bg-white border border-gray-200 rounded-xl px-3.5 py-2.5 text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-dgc-blue-1/20 focus:border-dgc-blue-1 transition-all resize-none";

function genId() {
  return `JOB-${Date.now().toString(36).toUpperCase()}`;
}

function Field({ label, required, children, hint }: { label: string; required?: boolean; children: React.ReactNode; hint?: string }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-gray-700 text-sm font-medium">{label}{required && <span className="text-red-400 ml-0.5">*</span>}</label>
      {children}
      {hint && <p className="text-gray-400 text-xs">{hint}</p>}
    </div>
  );
}

export default function AddJobPage() {
  const router = useRouter();
  const [user, setUser] = useState<BeaconUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reqInput, setReqInput] = useState("");

  const [form, setForm] = useState({
    id: genId(),
    title: "",
    department: "Consulting",
    location: "Nairobi, Kenya",
    type: "Full-time",
    description: "",
    thematic: "",
    deadline: "",
    requirements: [] as string[],
  });

  useEffect(() => {
    createClient().auth.getUser().then(({ data }) => {
      if (data.user) setUser({ email: data.user.email ?? "", id: data.user.id });
      else router.push("/beacon/login");
    });
  }, [router]);

  function update(field: string, value: string) { setForm((f) => ({ ...f, [field]: value })); }

  function addReq() {
    const v = reqInput.trim();
    if (!v) return;
    setForm((f) => ({ ...f, requirements: [...(f.requirements ?? []), v] }));
    setReqInput("");
  }

  function removeReq(idx: number) {
    setForm((f) => ({ ...f, requirements: f.requirements?.filter((_, i) => i !== idx) ?? [] }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const result = await createJob({
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

  if (!user) return null;

  return (
    <BeaconShell user={user} title="Add Job Posting">
      <div className="max-w-2xl">
        <Link href="/beacon/jobs" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to Jobs
        </Link>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Role details */}
          <div className="bg-white rounded-2xl border border-gray-200/80 shadow-[0_1px_4px_rgba(0,0,0,0.06)] overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-dgc-blue-1/10 flex items-center justify-center"><Briefcase className="w-3.5 h-3.5 text-dgc-blue-1" /></div>
              <h2 className="text-gray-800 font-semibold text-sm">Role Details</h2>
            </div>
            <div className="px-6 py-5 space-y-4">
              <Field label="Job Title" required>
                <input type="text" required placeholder="Senior M&E Consultant" value={form.title} onChange={(e) => update("title", e.target.value)} className={INPUT_CLS} />
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
                  <input type="text" placeholder="Nairobi, Kenya" value={form.location} onChange={(e) => update("location", e.target.value)} className={INPUT_CLS} />
                </Field>
                <Field label="Application Deadline" hint="Leave blank for rolling applications">
                  <input type="date" value={form.deadline} onChange={(e) => update("deadline", e.target.value)} className={INPUT_CLS} />
                </Field>
              </div>
              <Field label="Thematic Area" hint="e.g. Health Systems, Education, Governance">
                <input type="text" placeholder="M&E, Health Systems" value={form.thematic} onChange={(e) => update("thematic", e.target.value)} className={INPUT_CLS} />
              </Field>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-2xl border border-gray-200/80 shadow-[0_1px_4px_rgba(0,0,0,0.06)] overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-violet-50 flex items-center justify-center"><Tag className="w-3.5 h-3.5 text-violet-600" /></div>
              <h2 className="text-gray-800 font-semibold text-sm">Description & Requirements</h2>
            </div>
            <div className="px-6 py-5 space-y-4">
              <Field label="Job Description">
                <textarea rows={5} placeholder="Describe the role, responsibilities, and context…" value={form.description} onChange={(e) => update("description", e.target.value)} className={TEXTAREA_CLS} />
              </Field>
              <Field label="Key Requirements" hint="Press Enter or click + to add each requirement">
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. 5+ years M&E experience"
                      value={reqInput}
                      onChange={(e) => setReqInput(e.target.value)}
                      onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addReq(); } }}
                      className={INPUT_CLS}
                    />
                    <button type="button" onClick={addReq} className="shrink-0 w-10 h-10 rounded-xl bg-dgc-blue-1/10 text-dgc-blue-1 hover:bg-dgc-blue-1/20 transition-colors flex items-center justify-center">
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  {form.requirements && form.requirements.length > 0 && (
                    <ul className="space-y-1.5">
                      {form.requirements.map((r, i) => (
                        <li key={i} className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700">
                          <span>• {r}</span>
                          <button type="button" onClick={() => removeReq(i)} className="text-gray-400 hover:text-red-500 transition-colors ml-2 shrink-0">
                            <XIcon className="w-3.5 h-3.5" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </Field>
            </div>
          </div>

          {/* Location section */}
          <div className="bg-white rounded-2xl border border-gray-200/80 shadow-[0_1px_4px_rgba(0,0,0,0.06)] overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-amber-50 flex items-center justify-center"><MapPin className="w-3.5 h-3.5 text-amber-600" /></div>
              <h2 className="text-gray-800 font-semibold text-sm">Reference ID</h2>
            </div>
            <div className="px-6 py-5">
              <Field label="Job ID" hint="Auto-generated — you can override it">
                <input type="text" value={form.id} onChange={(e) => update("id", e.target.value)} className={INPUT_CLS} />
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
              {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Posting…</> : "Post Job"}
            </button>
            <Link href="/beacon/jobs" className="px-5 py-2.5 rounded-xl text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors">Cancel</Link>
          </div>
        </form>
      </div>
    </BeaconShell>
  );
}
