"use client";

import Link from "next/link";
import Image from "next/image";
import BeaconShell from "@/components/beacon/beacon-shell";
import StatusBadge from "@/components/beacon/status-badge";
import type { BeaconUser, QuotationRow } from "@/lib/beacon/types";
import { ArrowLeft, Pencil, Printer, Download, Phone, Mail, MapPin } from "lucide-react";

function fmtKES(n: number | null) {
  if (n == null) return "—";
  return new Intl.NumberFormat("en-KE", {
    style: "currency", currency: "KES", minimumFractionDigits: 0,
  }).format(n);
}

function formatDate(s: string) {
  if (!s) return "—";
  try {
    return new Date(s).toLocaleDateString("en-GB", {
      day: "numeric", month: "long", year: "numeric",
    });
  } catch { return s; }
}

export default function QuotationPreview({ user, quotation }: { user: BeaconUser; quotation: QuotationRow }) {
  const lineItems = quotation.line_items ?? [];

  return (
    <BeaconShell user={user} title={`Quotation ${quotation.id}`}>
      {/* Print-isolation CSS */}
      <style>{`
        @media print {
          body * { visibility: hidden !important; }
          #quotation-doc, #quotation-doc * { visibility: visible !important; }
          #quotation-doc {
            position: fixed !important;
            inset: 0 !important;
            width: 100% !important;
            max-width: 100% !important;
            border: none !important;
            box-shadow: none !important;
            border-radius: 0 !important;
          }
        }
      `}</style>

      {/* Action bar */}
      <div className="flex items-center justify-between mb-6 print:hidden">
        <Link
          href="/beacon/quotations"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Quotations
        </Link>
        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <Download className="w-4 h-4" /> Download PDF
          </button>
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <Printer className="w-4 h-4" /> Print
          </button>
          <Link
            href={`/beacon/quotations/${quotation.id}/edit`}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white shadow-[0_2px_8px_rgba(61,157,217,0.3)] hover:-translate-y-px transition-all"
            style={{ background: "linear-gradient(135deg,#3D9DD9,#177DA6)" }}
          >
            <Pencil className="w-4 h-4" /> Edit
          </Link>
        </div>
      </div>

      {/* Quotation document */}
      <div
        id="quotation-doc"
        className="bg-white rounded-2xl border border-gray-200/80 shadow-[0_1px_4px_rgba(0,0,0,0.06)] overflow-hidden max-w-3xl"
      >
        {/* Header band */}
        <div className="px-10 py-8" style={{ background: "linear-gradient(135deg,#0B2D59 0%,#177DA6 100%)" }}>
          <div className="flex items-start justify-between gap-6">
            <div>
              <Image
                src="/logo.svg"
                alt="Devex Global Consult"
                width={160}
                height={48}
                className="h-11 w-auto brightness-0 invert mb-4"
              />
              <p className="text-white/55 text-xs leading-relaxed">
                The Mint Hub, Westlands<br />
                Nairobi, Kenya<br />
                info@devexglobal.com · +254 752 889 900
              </p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.18em] mb-1.5">Quotation</p>
              <p className="text-white text-2xl font-bold font-mono tracking-tight">{quotation.id}</p>
              <div className="mt-3">
                <StatusBadge status={quotation.quotation_status} size="sm" />
              </div>
            </div>
          </div>
        </div>

        {/* Prepared for + details */}
        <div className="px-10 py-8 grid grid-cols-2 gap-10 border-b border-gray-100">
          <div>
            <p className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.18em] mb-3">Prepared For</p>
            <p className="text-gray-900 font-bold text-sm mb-0.5">{quotation.name}</p>
            <p className="text-gray-600 text-sm">{quotation.company}</p>
            {quotation.address && (
              <p className="text-gray-500 text-sm flex items-start gap-1.5 mt-2">
                <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0 text-dgc-blue-1" />
                {quotation.address}, {quotation.country}
              </p>
            )}
            <p className="text-gray-500 text-sm flex items-center gap-1.5 mt-1.5">
              <Mail className="w-3.5 h-3.5 shrink-0 text-dgc-blue-1" /> {quotation.company_email}
            </p>
            <p className="text-gray-500 text-sm flex items-center gap-1.5 mt-1.5">
              <Phone className="w-3.5 h-3.5 shrink-0 text-dgc-blue-1" /> {quotation.contact}
            </p>
          </div>
          <div className="text-right">
            <p className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.18em] mb-3">Quotation Details</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between gap-8">
                <span className="text-gray-400">Issue Date</span>
                <span className="text-gray-700 font-medium">{formatDate(quotation.issued_date)}</span>
              </div>
              <div className="flex justify-between gap-8">
                <span className="text-gray-400">Valid Until</span>
                <span className="text-gray-700 font-medium">{formatDate(quotation.valid_until)}</span>
              </div>
              <div className="flex justify-between gap-8">
                <span className="text-gray-400">Service</span>
                <span className="text-gray-700 font-medium text-right max-w-[160px]">{quotation.service}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Line items */}
        <div className="px-10 py-7">
          <table className="w-full text-sm mb-7">
            <thead>
              <tr className="border-b-2 border-gray-100">
                <th className="text-left text-gray-400 font-semibold text-[10.5px] uppercase tracking-wider pb-3 w-[45%]">Description</th>
                <th className="text-right text-gray-400 font-semibold text-[10.5px] uppercase tracking-wider pb-3 w-[20%]">Rate (KES)</th>
                <th className="text-right text-gray-400 font-semibold text-[10.5px] uppercase tracking-wider pb-3 w-[10%]">Qty</th>
                <th className="text-right text-gray-400 font-semibold text-[10.5px] uppercase tracking-wider pb-3 w-[25%]">Amount (KES)</th>
              </tr>
            </thead>
            <tbody>
              {lineItems.length > 0 ? lineItems.map((li, i) => (
                <tr key={i} className="border-b border-gray-50">
                  <td className="py-3 pr-4">
                    <p className="text-gray-800 font-semibold">{li.item || quotation.service}</p>
                    {li.description && <p className="text-gray-400 text-xs mt-0.5 leading-relaxed">{li.description}</p>}
                  </td>
                  <td className="py-3 text-right tabular-nums text-gray-600">{fmtKES(li.cost)}</td>
                  <td className="py-3 text-right tabular-nums text-gray-600">{li.qty}</td>
                  <td className="py-3 text-right tabular-nums text-gray-800 font-semibold">{fmtKES(li.cost * li.qty)}</td>
                </tr>
              )) : (
                <tr className="border-b border-gray-50">
                  <td className="py-3 text-gray-800 font-semibold">{quotation.service}</td>
                  <td className="py-3 text-right tabular-nums text-gray-600">{fmtKES(quotation.subtotal ?? quotation.total)}</td>
                  <td className="py-3 text-right tabular-nums text-gray-600">1</td>
                  <td className="py-3 text-right tabular-nums text-gray-800 font-semibold">{fmtKES(quotation.subtotal ?? quotation.total)}</td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Totals */}
          <div className="ml-auto max-w-[280px] space-y-2 border-t border-gray-100 pt-4">
            <div className="flex justify-between text-sm text-gray-500">
              <span>Subtotal</span><span className="tabular-nums">{fmtKES(quotation.subtotal)}</span>
            </div>
            {(quotation.discount_amount ?? 0) > 0 && (
              <div className="flex justify-between text-sm text-gray-500">
                <span>Discount ({quotation.discount_percent}%)</span>
                <span className="tabular-nums text-red-500">−{fmtKES(quotation.discount_amount)}</span>
              </div>
            )}
            <div className="flex justify-between text-sm text-gray-500">
              <span>VAT (16%)</span><span className="tabular-nums">{fmtKES(quotation.tax_amount)}</span>
            </div>
            <div className="flex justify-between text-base font-extrabold text-gray-900 border-t-2 border-gray-200 pt-2.5 mt-1">
              <span>Total</span>
              <span className="tabular-nums" style={{ color: "#3D9DD9" }}>{fmtKES(quotation.total)}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-10 py-6 border-t border-gray-100" style={{ background: "linear-gradient(135deg,#f8fafc,#f0f4f8)" }}>
          <p className="text-gray-400 text-xs text-center leading-relaxed">
            This quotation is valid until{" "}
            <strong className="text-gray-600">{formatDate(quotation.valid_until)}</strong>
            {" "}· Devex Global Consult · The Mint Hub, Westlands, Nairobi, Kenya<br />
            To accept, please reply to{" "}
            <strong className="text-gray-600">info@devexglobal.com</strong>
            {" "}or call <strong className="text-gray-600">+254 752 889 900</strong>
          </p>
          <div className="flex items-center justify-center gap-3 mt-3">
            <div className="h-px flex-1 bg-gray-200/60" />
            <Image src="/logo.svg" alt="DGC" width={70} height={20} className="h-5 w-auto opacity-20" />
            <div className="h-px flex-1 bg-gray-200/60" />
          </div>
        </div>
      </div>
    </BeaconShell>
  );
}
