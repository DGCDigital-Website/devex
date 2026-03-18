"use client";

import React, { useState, useRef } from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Paperclip, X, CaretDown, ChatCircle, Buildings } from "@phosphor-icons/react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { COMPANY } from "@/lib/data";

/* ─── Contact info ──────────────────────────────────────────────────────────── */
const CONTACT_INFO = [
  { Icon: MapPin, label: "Address", value: COMPANY.addressLines.join(", ") },
  { Icon: Phone,  label: "Phone",   value: COMPANY.phone,  href: `tel:${COMPANY.phone}` },
  { Icon: Mail,   label: "Email",   value: COMPANY.email,  href: `mailto:${COMPANY.email}` },
  { Icon: Clock,  label: "Hours",   value: COMPANY.hours },
];

/* ─── Services ───────────────────────────────────────────────────────────────── */
const SERVICES = [
  { value: "org-strengthening",      label: "Organisational Strengthening" },
  { value: "capacity-strengthening", label: "Capacity Strengthening" },
  { value: "system-strengthening",   label: "System Strengthening" },
  { value: "safety-security",        label: "Safety & Security" },
  { value: "other",                  label: "Other" },
];
const CO_CREATE_SERVICES = SERVICES.map((s) => s.label);

/* ─── File upload config ─────────────────────────────────────────────────────── */
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
const MAX_FILES     = 5;
const ALLOWED_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "text/plain",
  "image/jpeg", "image/png", "image/gif", "image/webp",
];

interface UploadedFile { id: string; name: string; size: number; type: string }

/* ─── Helpers ────────────────────────────────────────────────────────────────── */
function formatFileSize(bytes: number) {
  if (!bytes) return "0 Bytes";
  const k = 1024, sizes = ["Bytes", "KB", "MB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

const Field = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={cn("flex w-full flex-col space-y-1.5", className)}>{children}</div>
);

const inputCls =
  "h-12 px-4 border-2 bg-white focus:ring-2 focus:ring-dgc-blue-1 focus:border-dgc-blue-1 transition-all duration-200 rounded-lg hover:border-dgc-blue-1/40 text-sm";
const textareaCls =
  "min-h-[140px] w-full rounded-lg border-2 bg-white px-4 py-3 text-sm resize-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dgc-blue-1 focus-visible:ring-offset-2 hover:border-dgc-blue-1/40 transition-all duration-200";

/* ══════════════════════════════════════════════════════════════════════════════ */
export default function ContactPage() {
  const [tab, setTab]         = useState<"contact" | "engage">("contact");
  const [dropdown, setDropdown] = useState(false);

  /* Contact Us state */
  const [contact, setContact] = useState({ name: "", email: "", service: "", message: "" });
  const [contactErrors, setContactErrors] = useState<Record<string, string>>({});
  const [contactSubmitting, setContactSubmitting] = useState(false);
  const [contactSuccess, setContactSuccess]       = useState("");
  const [contactError, setContactError]           = useState("");

  /* Engage DGC state */
  const [engage, setEngage] = useState({ name: "", email: "", selectedServices: [] as string[], message: "" });
  const [engageErrors, setEngageErrors] = useState<Record<string, string>>({});
  const [engageSubmitting, setEngageSubmitting] = useState(false);
  const [engageSuccess, setEngageSuccess]       = useState("");
  const [engageError, setEngageError]           = useState("");
  const [files, setFiles]   = useState<UploadedFile[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);

  /* ── Handlers: Contact Us ─────────────────────────────────────────────── */
  const setC = (k: keyof typeof contact) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setContact((p) => ({ ...p, [k]: e.target.value }));

  const validateContact = () => {
    const e: Record<string, string> = {};
    if (!contact.name.trim())    e.name    = "Name is required";
    if (!contact.email.trim())   e.email   = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)) e.email = "Enter a valid email";
    if (!contact.service)        e.service = "Please select a service";
    if (!contact.message.trim()) e.message = "Message is required";
    else if (contact.message.trim().length < 10) e.message = "Message must be at least 10 characters";
    setContactErrors(e);
    return !Object.keys(e).length;
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateContact()) return;
    setContactSubmitting(true); setContactSuccess(""); setContactError("");
    try {
      const res = await fetch(`/api/email/contact?v=${Date.now()}`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contact),
      });
      const data = await res.json();
      if (res.ok) {
        setContactSuccess("Thank you! We'll get back to you within 1–2 business days.");
        setContact({ name: "", email: "", service: "", message: "" });
        setContactErrors({});
      } else { setContactError(data.error || "Failed to send. Please try again."); }
    } catch { setContactError("Failed to send. Please try again."); }
    finally { setContactSubmitting(false); }
  };

  /* ── Handlers: Engage DGC ─────────────────────────────────────────────── */
  const setE = (k: keyof Pick<typeof engage, "name" | "email" | "message">) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setEngage((p) => ({ ...p, [k]: e.target.value }));

  const toggleService = (s: string) =>
    setEngage((p) => ({
      ...p,
      selectedServices: p.selectedServices.includes(s)
        ? p.selectedServices.filter((x) => x !== s)
        : [...p.selectedServices, s],
    }));

  const validateEngage = () => {
    const e: Record<string, string> = {};
    if (!engage.name.trim())    e.name     = "Name is required";
    if (!engage.email.trim())   e.email    = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(engage.email)) e.email = "Enter a valid email";
    if (!engage.selectedServices.length) e.services = "Select at least one service";
    if (!engage.message.trim()) e.message  = "Please describe your assignment";
    setEngageErrors(e);
    return !Object.keys(e).length;
  };

  const handleEngageSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEngage()) return;
    setEngageSubmitting(true); setEngageSuccess(""); setEngageError("");
    try {
      const res = await fetch(`/api/email/co-create?v=${Date.now()}`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(engage),
      });
      const data = await res.json();
      if (res.ok) {
        setEngageSuccess("Engagement request sent! We'll be in touch shortly.");
        setEngage({ name: "", email: "", selectedServices: [], message: "" });
        setFiles([]);
        setEngageErrors({});
      } else { setEngageError(data.error || "Failed to send. Please try again."); }
    } catch { setEngageError("Failed to send. Please try again."); }
    finally { setEngageSubmitting(false); }
  };

  /* ── File upload ──────────────────────────────────────────────────────── */
  const handleFiles = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const picked = ev.target.files;
    if (!picked) return;
    if (files.length + picked.length > MAX_FILES) {
      setEngageError(`Maximum ${MAX_FILES} files allowed.`); return;
    }
    const newFiles: UploadedFile[] = [];
    const errs: string[] = [];
    Array.from(picked).forEach((f) => {
      if (f.size > MAX_FILE_SIZE) { errs.push(`${f.name} exceeds 10 MB`); return; }
      if (!ALLOWED_TYPES.includes(f.type)) { errs.push(`${f.name}: unsupported type`); return; }
      const bad = [".exe", ".bat", ".cmd", ".vbs", ".js"];
      if (bad.some((ext) => f.name.toLowerCase().endsWith(ext))) { errs.push(`${f.name}: not allowed`); return; }
      newFiles.push({ id: Math.random().toString(36).slice(2), name: f.name, size: f.size, type: f.type });
    });
    if (errs.length) setEngageError(errs.join(" · "));
    if (newFiles.length) setFiles((p) => [...p, ...newFiles]);
    if (fileRef.current) fileRef.current.value = "";
  };

  /* ═══════════════════════════════════════════════════════════════════════ */
  return (
    <main className="min-h-screen bg-white text-gray-900">

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="pt-28 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-dgc-dark-blue-1/8 via-blue-50/50 to-white" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_70%_at_0%_50%,rgba(61,157,217,0.06),transparent)]" />

        <div className="relative max-w-5xl mx-auto px-6 sm:px-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">

            {/* ── Left — info ─────────────────────────────────────────────── */}
            <div className="space-y-8">
              <div>
                <p className="text-dgc-blue-1 text-xs font-semibold tracking-[0.18em] uppercase mb-4">
                  Contact Us
                </p>
                <h1
                  className="font-extrabold text-gray-900 leading-tight mb-4"
                  style={{ fontSize: "clamp(2rem,4vw,3.5rem)" }}
                >
                  Get in <span className="text-dgc-blue-1">Touch</span>
                </h1>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Ready to strengthen your organisation or evaluate your programmes?
                  Whether you need expert consultancy or want to engage DGC for a
                  specific assignment, we&apos;re here to help you achieve your goals.
                </p>
              </div>

              {/* Feature points */}
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-dgc-blue-1 to-dgc-blue-2 flex items-center justify-center shrink-0">
                    <ChatCircle className="w-5 h-5 text-white" weight="fill" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Let&apos;s Start a Conversation</h3>
                    <p className="text-gray-600 text-sm mt-0.5 leading-relaxed">
                      Tell us about your organisation&apos;s needs or the assignment you have in mind.
                      We&apos;ll get back to you within 24 hours with tailored advice.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-dgc-blue-1 to-dgc-blue-2 flex items-center justify-center shrink-0">
                    <Buildings className="w-5 h-5 text-white" weight="fill" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Expert Consultancy Across Africa</h3>
                    <p className="text-gray-600 text-sm mt-0.5 leading-relaxed">
                      From organisational strengthening to MEL systems and safety &amp; security —
                      DGC delivers high-quality consultancy in 22 African countries.
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact details */}
              <div className="pt-5 border-t border-gray-100 space-y-3">
                {CONTACT_INFO.map(({ Icon, label, value, href }) => (
                  <div key={label} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-dgc-blue-1" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs">{label}</p>
                      {href ? (
                        <a href={href} className="text-gray-700 text-sm hover:text-dgc-blue-1 transition-colors">
                          {value}
                        </a>
                      ) : (
                        <p className="text-gray-700 text-sm">{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Right — tabbed form ──────────────────────────────────────── */}
            <div className="rounded-2xl bg-white border border-gray-200 shadow-sm p-6 md:p-8">

              {/* Tab toggle */}
              <div className="flex mb-7 bg-gray-100 rounded-xl p-1.5">
                {(["contact", "engage"] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTab(t)}
                    className={cn(
                      "flex-1 py-2.5 px-4 rounded-lg text-sm font-semibold transition-all duration-200",
                      tab === t
                        ? "bg-white text-gray-900 shadow"
                        : "text-gray-500 hover:text-gray-800"
                    )}
                  >
                    {t === "contact" ? "Contact Us" : "Engage DGC"}
                  </button>
                ))}
              </div>

              {/* ── Tab 1: Contact Us ──────────────────────────────────────── */}
              {tab === "contact" && (
                <form onSubmit={handleContactSubmit} className="space-y-5">
                  <Field>
                    <Label htmlFor="c-name" className="text-sm font-semibold text-gray-700">Name *</Label>
                    <Input
                      id="c-name" name="name" type="text" placeholder="Dr. Jane Doe"
                      value={contact.name}
                      onChange={setC("name")}
                      className={cn(inputCls, contactErrors.name && "border-red-400")}
                    />
                    {contactErrors.name && <Err>{contactErrors.name}</Err>}
                  </Field>

                  <Field>
                    <Label htmlFor="c-email" className="text-sm font-semibold text-gray-700">Email Address *</Label>
                    <Input
                      id="c-email" name="email" type="email" placeholder="you@organisation.com"
                      value={contact.email}
                      onChange={setC("email")}
                      className={cn(inputCls, contactErrors.email && "border-red-400")}
                    />
                    {contactErrors.email && <Err>{contactErrors.email}</Err>}
                  </Field>

                  {/* Service dropdown */}
                  <Field>
                    <Label className="text-sm font-semibold text-gray-700">Service Interest *</Label>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setDropdown((v) => !v)}
                        className={cn(
                          "w-full h-12 flex items-center justify-between px-4 text-sm border-2 bg-white rounded-lg hover:border-dgc-blue-1/40 focus:ring-2 focus:ring-dgc-blue-1 focus:border-dgc-blue-1 transition-all duration-200",
                          contactErrors.service && "border-red-400"
                        )}
                      >
                        <span className={contact.service ? "text-gray-900" : "text-gray-400"}>
                          {contact.service
                            ? SERVICES.find((s) => s.value === contact.service)?.label
                            : "Select a service…"}
                        </span>
                        <CaretDown className={cn("w-4 h-4 text-gray-400 transition-transform", dropdown && "rotate-180")} />
                      </button>
                      {dropdown && (
                        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden">
                          {SERVICES.map((s) => (
                            <button
                              key={s.value} type="button"
                              onClick={() => { setContact((p) => ({ ...p, service: s.value })); setDropdown(false); setContactErrors((p) => ({ ...p, service: "" })); }}
                              className="w-full px-4 py-2.5 text-left text-sm hover:bg-blue-50 hover:text-dgc-blue-1 transition-colors"
                            >
                              {s.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    {contactErrors.service && <Err>{contactErrors.service}</Err>}
                  </Field>

                  <Field>
                    <Label htmlFor="c-msg" className="text-sm font-semibold text-gray-700">Message *</Label>
                    <textarea
                      id="c-msg" name="message"
                      placeholder="Tell us about your challenge, context, and what you need…"
                      value={contact.message}
                      onChange={setC("message")}
                      className={cn(textareaCls, contactErrors.message && "border-red-400")}
                    />
                    {contactErrors.message && <Err>{contactErrors.message}</Err>}
                  </Field>

                  <SubmitBtn loading={contactSubmitting} label="Send Message →" />

                  {contactSuccess && <SuccessBox>{contactSuccess}</SuccessBox>}
                  {contactError   && <ErrorBox>{contactError}</ErrorBox>}
                </form>
              )}

              {/* ── Tab 2: Engage DGC ─────────────────────────────────────── */}
              {tab === "engage" && (
                <form onSubmit={handleEngageSubmit} className="space-y-5">
                  <Field>
                    <Label htmlFor="e-name" className="text-sm font-semibold text-gray-700">Name *</Label>
                    <Input
                      id="e-name" name="name" type="text" placeholder="Your name"
                      value={engage.name}
                      onChange={setE("name")}
                      className={cn(inputCls, engageErrors.name && "border-red-400")}
                    />
                    {engageErrors.name && <Err>{engageErrors.name}</Err>}
                  </Field>

                  <Field>
                    <Label htmlFor="e-email" className="text-sm font-semibold text-gray-700">Email *</Label>
                    <Input
                      id="e-email" name="email" type="email" placeholder="Email address"
                      value={engage.email}
                      onChange={setE("email")}
                      className={cn(inputCls, engageErrors.email && "border-red-400")}
                    />
                    {engageErrors.email && <Err>{engageErrors.email}</Err>}
                  </Field>

                  <Field>
                    <Label className="text-sm font-semibold text-gray-700">Services required *</Label>
                    <div className={cn(
                      "grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 bg-gray-50 rounded-xl border-2",
                      engageErrors.services ? "border-red-400" : "border-gray-200"
                    )}>
                      {CO_CREATE_SERVICES.map((s) => (
                        <label key={s} className="flex items-center gap-2.5 cursor-pointer group">
                          <input
                            type="checkbox"
                            checked={engage.selectedServices.includes(s)}
                            onChange={() => toggleService(s)}
                            className="w-4 h-4 rounded border-2 border-gray-300 text-dgc-blue-1 focus:ring-dgc-blue-1"
                          />
                          <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">{s}</span>
                        </label>
                      ))}
                    </div>
                    {engageErrors.services && <Err>{engageErrors.services}</Err>}
                  </Field>

                  <Field>
                    <Label htmlFor="e-msg" className="text-sm font-semibold text-gray-700">
                      Tell us about your assignment
                    </Label>
                    <textarea
                      id="e-msg" name="message"
                      placeholder="Describe the scope, objectives, and timeline of your assignment…"
                      value={engage.message}
                      onChange={setE("message")}
                      className={cn(textareaCls, engageErrors.message && "border-red-400")}
                    />
                    {engageErrors.message && <Err>{engageErrors.message}</Err>}
                  </Field>

                  {/* File attachment */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-semibold text-gray-700">
                        Attach files <span className="font-normal text-gray-400">(ToR, ToS, etc.)</span>
                      </Label>
                      <span className="text-xs text-gray-400">Max {MAX_FILES} files · 10 MB each</span>
                    </div>
                    <input ref={fileRef} type="file" multiple accept=".pdf,.doc,.docx,.xls,.xlsx,.txt,.jpg,.jpeg,.png,.gif,.webp" onChange={handleFiles} className="hidden" />
                    <button
                      type="button"
                      onClick={() => fileRef.current?.click()}
                      className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl border border-dashed border-gray-300 hover:border-dgc-blue-1 text-dgc-blue-1 hover:bg-blue-50 text-sm font-medium transition-colors"
                    >
                      <Paperclip className="w-4 h-4" /> Choose files
                    </button>
                    {files.length > 0 && (
                      <div className="space-y-1.5">
                        {files.map((f) => (
                          <div key={f.id} className="flex items-center justify-between px-3 py-2 bg-gray-50 rounded-lg border border-gray-100">
                            <div className="flex items-center gap-2">
                              <Paperclip className="w-3.5 h-3.5 text-gray-400" />
                              <span className="text-sm text-gray-700 truncate max-w-[200px]">{f.name}</span>
                              <span className="text-xs text-gray-400">{formatFileSize(f.size)}</span>
                            </div>
                            <button type="button" onClick={() => setFiles((p) => p.filter((x) => x.id !== f.id))} className="text-gray-400 hover:text-red-500 transition-colors">
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <p className="text-xs text-gray-400 leading-relaxed">
                    By sending this request you agree to your information being stored by us in relation to dealing with your enquiry. See our{" "}
                    <a href="#" className="underline hover:text-dgc-blue-1 transition-colors">Privacy Policy</a>.
                  </p>

                  <SubmitBtn loading={engageSubmitting} label="Engage DGC →" />

                  {engageSuccess && <SuccessBox>{engageSuccess}</SuccessBox>}
                  {engageError   && <ErrorBox>{engageError}</ErrorBox>}
                </form>
              )}
            </div>
            {/* end right col */}

          </div>
        </div>
      </section>
    </main>
  );
}

/* ─── Mini sub-components ───────────────────────────────────────────────────── */
function Err({ children }: { children: React.ReactNode }) {
  return <p className="text-red-500 text-xs mt-0.5 flex items-center gap-1"><span className="w-1 h-1 bg-red-500 rounded-full" />{children}</p>;
}
function SuccessBox({ children }: { children: React.ReactNode }) {
  return <div className="p-4 bg-green-50 border border-green-200 rounded-xl text-sm text-green-800">{children}</div>;
}
function ErrorBox({ children }: { children: React.ReactNode }) {
  return <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-800">{children}</div>;
}
function SubmitBtn({ loading, label }: { loading: boolean; label: string }) {
  return (
    <button
      type="submit" disabled={loading}
      className="w-full h-12 rounded-xl bg-gradient-to-br from-dgc-blue-1 to-dgc-blue-2 text-white font-semibold text-sm shadow hover:shadow-md transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {loading ? <span className="animate-pulse">Sending…</span> : label}
    </button>
  );
}
