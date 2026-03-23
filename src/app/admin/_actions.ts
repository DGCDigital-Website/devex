"use server";

import { revalidatePath } from "next/cache";
import {
  getAdminInvoice,
  setAdminInvoice,
  getAdminQuotation,
  setAdminQuotation,
} from "@/lib/admin-store";
import type { Invoice, Quotation, InvoiceItem } from "@/lib/admin-data";

export interface LineItemInput {
  description: string;
  quantity: number;
  rate: number;
}

function buildItems(inputs: LineItemInput[]): InvoiceItem[] {
  return inputs.map((it) => ({
    description: it.description,
    quantity: it.quantity,
    rate: it.rate,
    amount: it.quantity * it.rate,
  }));
}

/* ── Invoices ─────────────────────────────────────────────────────────────── */

export async function updateAdminInvoice(
  id: string,
  fields: {
    client: string;
    clientEmail: string;
    clientOrg: string;
    country: string;
    dueDate: string;
    status: Invoice["status"];
    notes: string;
    items: LineItemInput[];
  }
) {
  const existing = getAdminInvoice(id);
  if (!existing) return { error: "Invoice not found" };

  const items = buildItems(fields.items);
  const subtotal = items.reduce((s, it) => s + it.amount, 0);
  const tax = subtotal * 0.16;
  const total = subtotal + tax;

  setAdminInvoice(id, {
    ...existing,
    client: fields.client,
    clientEmail: fields.clientEmail,
    clientOrg: fields.clientOrg,
    country: fields.country,
    dueDate: fields.dueDate,
    status: fields.status,
    notes: fields.notes,
    items,
    subtotal,
    tax,
    total,
  });

  revalidatePath(`/admin/invoices/${id}`);
  revalidatePath("/admin/invoices");
  return { success: true };
}

/* ── Quotations ───────────────────────────────────────────────────────────── */

export async function updateAdminQuotation(
  id: string,
  fields: {
    client: string;
    clientEmail: string;
    clientOrg: string;
    country: string;
    validUntil: string;
    status: Quotation["status"];
    notes: string;
    items: LineItemInput[];
  }
) {
  const existing = getAdminQuotation(id);
  if (!existing) return { error: "Quotation not found" };

  const items = buildItems(fields.items);
  const subtotal = items.reduce((s, it) => s + it.amount, 0);
  const tax = subtotal * 0.16;
  const total = subtotal + tax;

  setAdminQuotation(id, {
    ...existing,
    client: fields.client,
    clientEmail: fields.clientEmail,
    clientOrg: fields.clientOrg,
    country: fields.country,
    validUntil: fields.validUntil,
    status: fields.status,
    notes: fields.notes,
    items,
    subtotal,
    tax,
    total,
  });

  revalidatePath(`/admin/quotations/${id}`);
  revalidatePath("/admin/quotations");
  return { success: true };
}
