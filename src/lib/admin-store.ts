/**
 * Mutable in-memory store for the /admin section.
 * Seeded from the static admin-data arrays on first import; mutations persist
 * for the lifetime of the Next.js server process (i.e. until `npm run dev` is
 * restarted).  This is intentional — the admin section is a prototype backed
 * by static data.  For full persistence use the Beacon section (/beacon) which
 * writes to Supabase.
 */
import type { Invoice, Quotation } from "./admin-data";
import { ADMIN_INVOICES, ADMIN_QUOTATIONS } from "./admin-data";

const _invoices = new Map<string, Invoice>(
  ADMIN_INVOICES.map((i) => [i.id, { ...i }])
);
const _quotations = new Map<string, Quotation>(
  ADMIN_QUOTATIONS.map((q) => [q.id, { ...q }])
);

/* ── Invoices ──────────────────────────────────────────────────────────────── */

export function getAdminInvoices(): Invoice[] {
  return Array.from(_invoices.values());
}

export function getAdminInvoice(id: string): Invoice | undefined {
  return _invoices.get(id);
}

export function setAdminInvoice(id: string, data: Invoice): void {
  _invoices.set(id, data);
}

/* ── Quotations ────────────────────────────────────────────────────────────── */

export function getAdminQuotations(): Quotation[] {
  return Array.from(_quotations.values());
}

export function getAdminQuotation(id: string): Quotation | undefined {
  return _quotations.get(id);
}

export function setAdminQuotation(id: string, data: Quotation): void {
  _quotations.set(id, data);
}
