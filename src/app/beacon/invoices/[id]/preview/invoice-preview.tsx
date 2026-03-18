"use client";

import Link from "next/link";
import Image from "next/image";
import BeaconShell from "@/components/beacon/beacon-shell";
import StatusBadge from "@/components/beacon/status-badge";
import type { BeaconUser, InvoiceRow } from "@/lib/beacon/types";
import { ArrowLeft, Pencil, Printer, Phone, Mail, MapPin } from "lucide-react";

function fmtKES(n: number | null) {
  if (n == null) return "—";
  return new Intl.NumberFormat("en-KE",{style:"currency",currency:"KES",minimumFractionDigits:0}).format(n);
}

function formatDate(s: string) {
  if (!s) return "—";
  try { return new Date(s).toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric"}); } catch { return s; }
}

export default function InvoicePreview({ user, invoice }: { user: BeaconUser; invoice: InvoiceRow }) {
  const lineItems = invoice.line_items ?? [];

  return (
    <BeaconShell user={user} title={`Invoice ${invoice.id}`}>
      {/* Actions bar */}
      <div className="flex items-center justify-between mb-6">
        <Link href="/beacon/invoices" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors">
          <ArrowLeft className="w-4 h-4"/>Back to Invoices
        </Link>
        <div className="flex items-center gap-2">
          <button onClick={()=>window.print()} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 transition-colors">
            <Printer className="w-4 h-4"/>Print / PDF
          </button>
          <Link href={`/beacon/invoices/${invoice.id}/edit`} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white shadow-[0_2px_8px_rgba(61,157,217,0.3)] hover:-translate-y-px transition-all" style={{background:"linear-gradient(135deg,#3D9DD9,#177DA6)"}}>
            <Pencil className="w-4 h-4"/>Edit
          </Link>
        </div>
      </div>

      {/* Invoice document */}
      <div id="invoice-doc" className="bg-white rounded-2xl border border-gray-200/80 shadow-[0_1px_4px_rgba(0,0,0,0.06)] overflow-hidden max-w-3xl">
        {/* Header band */}
        <div className="px-10 py-8" style={{background:"linear-gradient(135deg,#0B2D59 0%,#177DA6 100%)"}}>
          <div className="flex items-start justify-between">
            <div>
              <Image src="/logo.svg" alt="DGC" width={140} height={40} className="h-10 w-auto brightness-0 invert mb-4"/>
              <p className="text-white/60 text-xs leading-relaxed">
                The Mint Hub, Westlands<br/>
                Nairobi, Kenya<br/>
                info@devexglobal.com · +254 752 889 900
              </p>
            </div>
            <div className="text-right">
              <p className="text-white/50 text-xs font-medium uppercase tracking-widest mb-1">Invoice</p>
              <p className="text-white text-2xl font-bold font-mono">{invoice.id}</p>
              <div className="mt-3">
                <StatusBadge status={invoice.invoice_status} size="sm"/>
              </div>
            </div>
          </div>
        </div>

        {/* Dates + client */}
        <div className="px-10 py-8 grid grid-cols-2 gap-8 border-b border-gray-100">
          <div>
            <p className="text-gray-400 text-[11px] font-semibold uppercase tracking-widest mb-3">Billed To</p>
            <p className="text-gray-900 font-semibold text-sm">{invoice.name}</p>
            <p className="text-gray-600 text-sm">{invoice.company}</p>
            {invoice.address && <p className="text-gray-500 text-sm flex items-start gap-1.5 mt-1"><MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0"/>{invoice.address}, {invoice.country}</p>}
            <p className="text-gray-500 text-sm flex items-center gap-1.5 mt-1"><Mail className="w-3.5 h-3.5 shrink-0"/>{invoice.company_email}</p>
            <p className="text-gray-500 text-sm flex items-center gap-1.5 mt-1"><Phone className="w-3.5 h-3.5 shrink-0"/>{invoice.contact}</p>
          </div>
          <div className="text-right">
            <p className="text-gray-400 text-[11px] font-semibold uppercase tracking-widest mb-3">Invoice Details</p>
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between gap-8">
                <span className="text-gray-400">Issue Date</span>
                <span className="text-gray-700 font-medium">{formatDate(invoice.issued_date)}</span>
              </div>
              <div className="flex justify-between gap-8">
                <span className="text-gray-400">Due Date</span>
                <span className="text-gray-700 font-medium">{formatDate(invoice.due_date)}</span>
              </div>
              <div className="flex justify-between gap-8">
                <span className="text-gray-400">Service</span>
                <span className="text-gray-700 font-medium text-right">{invoice.service}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Line items */}
        <div className="px-10 py-6">
          <table className="w-full text-sm mb-8">
            <thead>
              <tr className="border-b-2 border-gray-100">
                <th className="text-left text-gray-400 font-semibold text-xs uppercase tracking-wider pb-3 w-1/2">Description</th>
                <th className="text-right text-gray-400 font-semibold text-xs uppercase tracking-wider pb-3">Rate</th>
                <th className="text-right text-gray-400 font-semibold text-xs uppercase tracking-wider pb-3">Qty</th>
                <th className="text-right text-gray-400 font-semibold text-xs uppercase tracking-wider pb-3">Amount</th>
              </tr>
            </thead>
            <tbody>
              {lineItems.length > 0 ? lineItems.map((li, i) => (
                <tr key={i} className="border-b border-gray-50">
                  <td className="py-3">
                    <p className="text-gray-800 font-medium">{li.item || invoice.service}</p>
                    {li.description && <p className="text-gray-400 text-xs mt-0.5">{li.description}</p>}
                  </td>
                  <td className="py-3 text-right tabular-nums text-gray-600">{fmtKES(li.cost)}</td>
                  <td className="py-3 text-right tabular-nums text-gray-600">{li.qty}</td>
                  <td className="py-3 text-right tabular-nums text-gray-800 font-medium">{fmtKES(li.cost*li.qty)}</td>
                </tr>
              )) : (
                <tr className="border-b border-gray-50">
                  <td className="py-3 text-gray-800 font-medium">{invoice.service}</td>
                  <td className="py-3 text-right tabular-nums text-gray-600">{fmtKES(invoice.subtotal ?? invoice.total)}</td>
                  <td className="py-3 text-right tabular-nums text-gray-600">1</td>
                  <td className="py-3 text-right tabular-nums text-gray-800 font-medium">{fmtKES(invoice.subtotal ?? invoice.total)}</td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Totals */}
          <div className="ml-auto max-w-xs space-y-2 border-t border-gray-100 pt-4">
            <div className="flex justify-between text-sm text-gray-500"><span>Subtotal</span><span className="tabular-nums">{fmtKES(invoice.subtotal)}</span></div>
            {(invoice.discount_amount ?? 0) > 0 && (
              <div className="flex justify-between text-sm text-gray-500">
                <span>Discount ({invoice.discount_percent}%)</span>
                <span className="tabular-nums text-red-500">-{fmtKES(invoice.discount_amount)}</span>
              </div>
            )}
            <div className="flex justify-between text-sm text-gray-500"><span>VAT (16%)</span><span className="tabular-nums">{fmtKES(invoice.tax_amount)}</span></div>
            <div className="flex justify-between text-base font-bold text-gray-900 border-t-2 border-gray-900 pt-2 mt-2">
              <span>Total Due</span>
              <span className="tabular-nums text-dgc-blue-1">{fmtKES(invoice.total)}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-10 py-6 bg-gray-50/60 border-t border-gray-100">
          <p className="text-gray-400 text-xs text-center leading-relaxed">
            Payment due by <strong className="text-gray-600">{formatDate(invoice.due_date)}</strong> · Devex Global Consult · The Mint Hub, Westlands, Nairobi, Kenya<br/>
            Bank: <strong className="text-gray-600">Equity Bank Kenya</strong> · A/C: 0123456789 · Swift: EQBLKENA
          </p>
        </div>
      </div>
    </BeaconShell>
  );
}
