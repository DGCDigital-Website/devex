"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import type {
  ContactInsert,
  ContactUpdate,
  JobInsert,
  JobUpdate,
  InvoiceInsert,
  InvoiceUpdate,
  QuotationInsert,
  QuotationUpdate,
  CalendarEventInsert,
  CalendarEventUpdate,
} from "./types";

// ── Auth guard ────────────────────────────────────────────────────────────────

async function requireAuth() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error || !user) redirect("/beacon/login");
  return { supabase, user };
}

type ActionResult<T = unknown> = { data?: T; error?: string };

// ═══════════════════════════════════════════════════════════════════════════════
// CONTACTS
// ═══════════════════════════════════════════════════════════════════════════════

export async function getContacts() {
  const { supabase } = await requireAuth();
  const { data, error } = await supabase
    .from("contacts")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) return { data: [], error: error.message };
  return { data: data ?? [] };
}

export async function getContact(id: number) {
  const { supabase } = await requireAuth();
  const { data, error } = await supabase
    .from("contacts")
    .select("*")
    .eq("id", id)
    .single();
  if (error) return { data: null, error: error.message };
  return { data };
}

export async function createContact(
  payload: ContactInsert
): Promise<ActionResult> {
  const { supabase } = await requireAuth();
  const { error } = await supabase.from("contacts").insert(payload);
  if (error) return { error: error.message };
  revalidatePath("/beacon/contacts");
  return {};
}

export async function updateContact(
  id: number,
  payload: ContactUpdate
): Promise<ActionResult> {
  const { supabase } = await requireAuth();
  const { error } = await supabase
    .from("contacts")
    .update(payload)
    .eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/beacon/contacts");
  return {};
}

export async function deleteContact(id: number): Promise<ActionResult> {
  const { supabase } = await requireAuth();
  const { error } = await supabase.from("contacts").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/beacon/contacts");
  return {};
}

// ═══════════════════════════════════════════════════════════════════════════════
// JOBS
// ═══════════════════════════════════════════════════════════════════════════════

export async function getJobs() {
  const { supabase } = await requireAuth();
  const { data, error } = await supabase
    .from("jobs")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) return { data: [], error: error.message };
  return { data: data ?? [] };
}

export async function getJob(id: string) {
  const { supabase } = await requireAuth();
  const { data, error } = await supabase
    .from("jobs")
    .select("*")
    .eq("id", id)
    .single();
  if (error) return { data: null, error: error.message };
  return { data };
}

export async function createJob(payload: JobInsert): Promise<ActionResult> {
  const { supabase } = await requireAuth();
  const { error } = await supabase.from("jobs").insert(payload);
  if (error) return { error: error.message };
  revalidatePath("/beacon/jobs");
  return {};
}

export async function updateJob(
  id: string,
  payload: JobUpdate
): Promise<ActionResult> {
  const { supabase } = await requireAuth();
  const { error } = await supabase.from("jobs").update(payload).eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/beacon/jobs");
  return {};
}

export async function deleteJob(id: string): Promise<ActionResult> {
  const { supabase } = await requireAuth();
  const { error } = await supabase.from("jobs").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/beacon/jobs");
  return {};
}

// ═══════════════════════════════════════════════════════════════════════════════
// INVOICES
// ═══════════════════════════════════════════════════════════════════════════════

export async function getInvoices() {
  const { supabase } = await requireAuth();
  const { data, error } = await supabase
    .from("invoices")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) return { data: [], error: error.message };
  return { data: data ?? [] };
}

export async function getInvoice(id: string) {
  const { supabase } = await requireAuth();
  const { data, error } = await supabase
    .from("invoices")
    .select("*")
    .eq("id", id)
    .single();
  if (error) return { data: null, error: error.message };
  return { data };
}

export async function createInvoice(
  payload: InvoiceInsert
): Promise<ActionResult> {
  const { supabase } = await requireAuth();
  const { error } = await supabase.from("invoices").insert(payload);
  if (error) return { error: error.message };
  revalidatePath("/beacon/invoices");
  return {};
}

export async function updateInvoice(
  id: string,
  payload: InvoiceUpdate
): Promise<ActionResult> {
  const { supabase } = await requireAuth();
  const { error } = await supabase
    .from("invoices")
    .update(payload)
    .eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/beacon/invoices");
  return {};
}

export async function deleteInvoice(id: string): Promise<ActionResult> {
  const { supabase } = await requireAuth();
  const { error } = await supabase.from("invoices").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/beacon/invoices");
  return {};
}

// ═══════════════════════════════════════════════════════════════════════════════
// QUOTATIONS
// ═══════════════════════════════════════════════════════════════════════════════

export async function getQuotations() {
  const { supabase } = await requireAuth();
  const { data, error } = await supabase
    .from("quotations")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) return { data: [], error: error.message };
  return { data: data ?? [] };
}

export async function getQuotation(id: string) {
  const { supabase } = await requireAuth();
  const { data, error } = await supabase
    .from("quotations")
    .select("*")
    .eq("id", id)
    .single();
  if (error) return { data: null, error: error.message };
  return { data };
}

export async function createQuotation(
  payload: QuotationInsert
): Promise<ActionResult> {
  const { supabase } = await requireAuth();
  const { error } = await supabase.from("quotations").insert(payload);
  if (error) return { error: error.message };
  revalidatePath("/beacon/quotations");
  return {};
}

export async function updateQuotation(
  id: string,
  payload: QuotationUpdate
): Promise<ActionResult> {
  const { supabase } = await requireAuth();
  const { error } = await supabase
    .from("quotations")
    .update(payload)
    .eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/beacon/quotations");
  return {};
}

export async function deleteQuotation(id: string): Promise<ActionResult> {
  const { supabase } = await requireAuth();
  const { error } = await supabase.from("quotations").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/beacon/quotations");
  return {};
}

// ═══════════════════════════════════════════════════════════════════════════════
// CALENDAR EVENTS
// ═══════════════════════════════════════════════════════════════════════════════

export async function getCalendarEvents() {
  const { supabase } = await requireAuth();
  const { data, error } = await supabase
    .from("calendar_events")
    .select("*")
    .order("start_at", { ascending: true });
  if (error) return { data: [], error: error.message };
  return { data: data ?? [] };
}

export async function createCalendarEvent(
  payload: CalendarEventInsert
): Promise<ActionResult> {
  const { supabase } = await requireAuth();
  const { error } = await supabase.from("calendar_events").insert(payload);
  if (error) return { error: error.message };
  revalidatePath("/beacon/calendar");
  return {};
}

export async function updateCalendarEvent(
  id: string,
  payload: CalendarEventUpdate
): Promise<ActionResult> {
  const { supabase } = await requireAuth();
  const { error } = await supabase
    .from("calendar_events")
    .update(payload)
    .eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/beacon/calendar");
  return {};
}

export async function deleteCalendarEvent(id: string): Promise<ActionResult> {
  const { supabase } = await requireAuth();
  const { error } = await supabase
    .from("calendar_events")
    .delete()
    .eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/beacon/calendar");
  return {};
}

// ═══════════════════════════════════════════════════════════════════════════════
// DASHBOARD STATS
// ═══════════════════════════════════════════════════════════════════════════════

export async function getDashboardStats() {
  const { supabase } = await requireAuth();
  const [contacts, jobs, invoices, quotations, recentContacts] =
    await Promise.all([
      supabase
        .from("contacts")
        .select("*", { count: "exact", head: true }),
      supabase.from("jobs").select("*", { count: "exact", head: true }),
      supabase
        .from("invoices")
        .select("total, invoice_status"),
      supabase
        .from("quotations")
        .select("total, quotation_status"),
      supabase
        .from("contacts")
        .select("id, full_name, email, role, status, created_at")
        .order("created_at", { ascending: false })
        .limit(10),
    ]);

  const invoiceTotal = (invoices.data ?? []).reduce(
    (s, i) => s + (i.total ?? 0),
    0
  );
  const pendingInvoices = (invoices.data ?? []).filter(
    (i) => i.invoice_status !== "Paid"
  ).length;
  const quotationTotal = (quotations.data ?? []).reduce(
    (s, q) => s + (q.total ?? 0),
    0
  );

  return {
    contacts: contacts.count ?? 0,
    jobs: jobs.count ?? 0,
    invoiceCount: (invoices.data ?? []).length,
    invoiceTotal,
    pendingInvoices,
    quotationCount: (quotations.data ?? []).length,
    quotationTotal,
    recentContacts: recentContacts.data ?? [],
  };
}
