"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import BeaconShell from "@/components/beacon/beacon-shell";
import { createContact } from "@/lib/beacon/actions";
import { CONTACT_ROLES, CONTACT_STATUSES, COUNTRIES } from "@/lib/beacon/types";
import { createClient } from "@/utils/supabase/client";
import {
  User,
  Building2,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  Loader2,
  ArrowLeft,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import type { BeaconUser } from "@/lib/beacon/types";

// ── field component ───────────────────────────────────────────────────────────

function Field({
  label,
  required,
  children,
  hint,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-gray-700 text-sm font-medium">
        {label}{" "}
        {required && <span className="text-red-400">*</span>}
      </label>
      {children}
      {hint && <p className="text-gray-400 text-xs">{hint}</p>}
    </div>
  );
}

const INPUT_CLS =
  "w-full bg-white border border-gray-200 rounded-xl px-3.5 py-2.5 text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-dgc-blue-1/20 focus:border-dgc-blue-1 transition-all";

const SELECT_CLS =
  "w-full bg-white border border-gray-200 rounded-xl px-3.5 py-2.5 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-dgc-blue-1/20 focus:border-dgc-blue-1 transition-all appearance-none";

// ── page ──────────────────────────────────────────────────────────────────────

export default function AddContactPage() {
  const router = useRouter();
  const [user, setUser] = useState<BeaconUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    company: "",
    contact: "",
    country: "Kenya",
    username: "",
    role: "subscriber",
    status: "active",
    current_plan: "basic",
    billing: "Manual",
  });

  useEffect(() => {
    createClient().auth.getUser().then(({ data }) => {
      if (data.user) setUser({ email: data.user.email ?? "", id: data.user.id });
      else router.push("/beacon/login");
    });
  }, [router]);

  function update(field: string, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const username = form.username || form.email.split("@")[0];
    const result = await createContact({ ...form, username, avatar: null, avatar_color: null });
    setLoading(false);
    if (result.error) { setError(result.error); return; }
    router.push("/beacon/contacts");
    router.refresh();
  }

  if (!user) return null;

  return (
    <BeaconShell user={user} title="Add Contact">
      <div className="max-w-2xl">
        {/* Back */}
        <Link
          href="/beacon/contacts"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Contacts
        </Link>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Section: Personal */}
          <div className="bg-white rounded-2xl border border-gray-200/80 shadow-[0_1px_4px_rgba(0,0,0,0.06)] overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-dgc-blue-1/10 flex items-center justify-center">
                <User className="w-3.5 h-3.5 text-dgc-blue-1" />
              </div>
              <h2 className="text-gray-800 font-semibold text-sm">Personal Information</h2>
            </div>
            <div className="px-6 py-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Full Name" required>
                <input type="text" required placeholder="Dr. Jane Mwangi" value={form.full_name} onChange={(e) => update("full_name", e.target.value)} className={INPUT_CLS} />
              </Field>
              <Field label="Email Address" required>
                <input type="email" required placeholder="jane@example.com" value={form.email} onChange={(e) => update("email", e.target.value)} className={INPUT_CLS} />
              </Field>
              <Field label="Phone Number" required>
                <input type="tel" required placeholder="+254 700 000 000" value={form.contact} onChange={(e) => update("contact", e.target.value)} className={INPUT_CLS} />
              </Field>
              <Field label="Username" hint="Auto-generated from email if left blank">
                <input type="text" placeholder="jane_mwangi" value={form.username} onChange={(e) => update("username", e.target.value)} className={INPUT_CLS} />
              </Field>
            </div>
          </div>

          {/* Section: Organisation */}
          <div className="bg-white rounded-2xl border border-gray-200/80 shadow-[0_1px_4px_rgba(0,0,0,0.06)] overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-violet-50 flex items-center justify-center">
                <Building2 className="w-3.5 h-3.5 text-violet-600" />
              </div>
              <h2 className="text-gray-800 font-semibold text-sm">Organisation</h2>
            </div>
            <div className="px-6 py-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Company / Organisation" required>
                <input type="text" required placeholder="UNHCR Kenya" value={form.company} onChange={(e) => update("company", e.target.value)} className={INPUT_CLS} />
              </Field>
              <Field label="Country" required>
                <select value={form.country} onChange={(e) => update("country", e.target.value)} className={SELECT_CLS}>
                  {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </Field>
            </div>
          </div>

          {/* Section: Account Settings */}
          <div className="bg-white rounded-2xl border border-gray-200/80 shadow-[0_1px_4px_rgba(0,0,0,0.06)] overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-emerald-50 flex items-center justify-center">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              </div>
              <h2 className="text-gray-800 font-semibold text-sm">Account Settings</h2>
            </div>
            <div className="px-6 py-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Role">
                <select value={form.role} onChange={(e) => update("role", e.target.value)} className={SELECT_CLS}>
                  {CONTACT_ROLES.map((r) => <option key={r} value={r} className="capitalize">{r.charAt(0).toUpperCase() + r.slice(1)}</option>)}
                </select>
              </Field>
              <Field label="Status">
                <select value={form.status} onChange={(e) => update("status", e.target.value)} className={SELECT_CLS}>
                  {CONTACT_STATUSES.map((s) => <option key={s} value={s} className="capitalize">{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                </select>
              </Field>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-start gap-2.5 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
              <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-3 pb-4">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all shadow-[0_2px_8px_rgba(61,157,217,0.3)] disabled:opacity-60 disabled:shadow-none"
              style={{ background: "linear-gradient(135deg,#3D9DD9,#177DA6)" }}
            >
              {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving…</> : "Save Contact"}
            </button>
            <Link href="/beacon/contacts" className="px-5 py-2.5 rounded-xl text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </BeaconShell>
  );
}
