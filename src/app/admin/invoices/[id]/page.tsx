import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import type { Invoice } from "@/lib/admin-data";
import { getAdminInvoice } from "@/lib/admin-store";
import InvoiceActions from "./invoice-actions";

const PRINT_CSS = `
@page { size: A4 portrait; margin: 10mm; }
@media print {
  html, body { margin: 0; padding: 0; background: white; }
  body * { visibility: hidden !important; }
  #admin-print-doc, #admin-print-doc * { visibility: visible !important; }
  #admin-print-doc {
    position: fixed !important;
    inset: 0 !important;
    width: 210mm !important;
    max-width: 210mm !important;
    margin: 0 auto !important;
    border: none !important;
    border-radius: 0 !important;
    box-shadow: none !important;
    overflow: visible !important;
  }
}
`;

function statusBadge(status: Invoice["status"]) {
  const map: Record<Invoice["status"], string> = {
    paid: "bg-green-50 text-green-700 border border-green-200",
    unpaid: "bg-yellow-50 text-yellow-700 border border-yellow-200",
    overdue: "bg-red-50 text-red-700 border border-red-200",
    draft: "bg-gray-100 text-gray-500 border border-gray-200",
  };
  return map[status];
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount);
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

interface Props {
  params: Promise<{ id: string }>;
}

export default async function InvoiceDetailPage({ params }: Props) {
  const { id } = await params;
  const invoice = getAdminInvoice(id);
  if (!invoice) notFound();

  return (
    <div className="space-y-5">
      <style dangerouslySetInnerHTML={{ __html: PRINT_CSS }} />

      {/* Toolbar — hidden when printing */}
      <div className="flex items-center justify-between print:hidden">
        <Link
          href="/admin/invoices"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Invoices
        </Link>
        <InvoiceActions id={id} />
      </div>

      {/* Invoice document */}
      <div id="admin-print-doc" className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {/* Letterhead */}
        <div className="bg-[#0B2D59] px-10 py-8 flex items-start justify-between">
          <div>
            <Image src="/logo-dark.svg" alt="DGC Logo" width={160} height={48} className="h-12 w-auto mb-3" />
            <div className="text-white/70 text-xs space-y-0.5 mt-2">
              <p>Devex Global Consult Ltd</p>
              <p>Westlands, Nairobi, Kenya</p>
              <p>+254 700 000 000 · info@devexglobal.com</p>
              <p>www.devexglobal.com</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-white/50 text-xs uppercase tracking-widest mb-1">Invoice</p>
            <p className="text-white text-2xl font-bold">{invoice.invoiceNo}</p>
            <div className="mt-3">
              <span
                className={`text-xs font-semibold px-3 py-1.5 rounded-full capitalize ${statusBadge(
                  invoice.status
                )}`}
              >
                {invoice.status}
              </span>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="px-10 py-8 space-y-8">
          {/* Meta row */}
          <div className="grid grid-cols-3 gap-6 pb-6 border-b border-gray-100">
            <div>
              <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-1">Bill To</p>
              <p className="font-semibold text-gray-800">{invoice.client}</p>
              <p className="text-sm text-gray-500">{invoice.clientOrg}</p>
              <p className="text-sm text-gray-500">{invoice.country}</p>
              <p className="text-sm text-[#3D9DD9]">{invoice.clientEmail}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-1">Issue Date</p>
              <p className="text-sm font-medium text-gray-700">{formatDate(invoice.issueDate)}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-1">Due Date</p>
              <p className="text-sm font-medium text-gray-700">{formatDate(invoice.dueDate)}</p>
            </div>
          </div>

          {/* Line items */}
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 rounded-lg">
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-4 py-3">
                  Description
                </th>
                <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wide px-4 py-3 w-20">
                  Qty
                </th>
                <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wide px-4 py-3 w-32">
                  Rate
                </th>
                <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wide px-4 py-3 w-32">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {invoice.items.map((item, i) => (
                <tr key={i}>
                  <td className="px-4 py-3 text-gray-700">{item.description}</td>
                  <td className="px-4 py-3 text-right text-gray-500">{item.quantity}</td>
                  <td className="px-4 py-3 text-right text-gray-500">{formatCurrency(item.rate)}</td>
                  <td className="px-4 py-3 text-right font-semibold text-gray-800">
                    {formatCurrency(item.amount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Totals */}
          <div className="flex justify-end">
            <div className="w-72 space-y-2 text-sm">
              <div className="flex justify-between text-gray-500">
                <span>Subtotal</span>
                <span>{formatCurrency(invoice.subtotal)}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Tax (16%)</span>
                <span>{formatCurrency(invoice.tax)}</span>
              </div>
              <div className="flex justify-between text-[#0B2D59] font-bold text-lg border-t border-gray-200 pt-3 mt-2">
                <span>Total Due</span>
                <span>{formatCurrency(invoice.total)}</span>
              </div>
            </div>
          </div>

          {/* Notes */}
          {invoice.notes && (
            <div className="bg-gray-50 border border-gray-100 rounded-xl p-5">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Notes</p>
              <p className="text-sm text-gray-600">{invoice.notes}</p>
            </div>
          )}

          {/* Footer */}
          <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
            <p className="text-xs text-gray-400">
              Thank you for your partnership. Payment is due by {formatDate(invoice.dueDate)}.
            </p>
            <p className="text-xs text-gray-300">Devex Global Consult Ltd · {invoice.invoiceNo}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
