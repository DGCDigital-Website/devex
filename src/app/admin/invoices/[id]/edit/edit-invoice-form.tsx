"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Plus, Trash2, ArrowLeft, CheckCircle } from "lucide-react";
import type { Invoice } from "@/lib/admin-data";
import { updateAdminInvoice } from "@/app/admin/_actions";

interface LineItem {
  description: string;
  quantity: number;
  rate: number;
}

const INP = "w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3D9DD9]/30 focus:border-[#3D9DD9] transition-colors bg-white";

export default function EditInvoiceForm({ invoice }: { invoice: Invoice }) {
  const router = useRouter();

  const [client, setClient] = useState(invoice.client);
  const [email, setEmail] = useState(invoice.clientEmail);
  const [organisation, setOrganisation] = useState(invoice.clientOrg);
  const [country, setCountry] = useState(invoice.country);
  const [dueDate, setDueDate] = useState(invoice.dueDate);
  const [status, setStatus] = useState<Invoice["status"]>(invoice.status);
  const [notes, setNotes] = useState(invoice.notes ?? "");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [items, setItems] = useState<LineItem[]>(
    invoice.items.map((it) => ({ description: it.description, quantity: it.quantity, rate: it.rate }))
  );

  const addItem = () => setItems((p) => [...p, { description: "", quantity: 1, rate: 0 }]);
  const removeItem = (i: number) => setItems((p) => p.filter((_, idx) => idx !== i));
  const updateItem = (index: number, field: keyof LineItem, value: string | number) =>
    setItems((p) => p.map((item, i) => i === index ? { ...item, [field]: field === "description" ? value : Number(value) } : item));

  const subtotal = items.reduce((s, it) => s + it.quantity * it.rate, 0);
  const tax = subtotal * 0.16;
  const total = subtotal + tax;
  const fmt = (n: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 }).format(n);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const result = await updateAdminInvoice(invoice.id, {
      client,
      clientEmail: email,
      clientOrg: organisation,
      country,
      dueDate,
      status,
      notes,
      items,
    });
    setSaving(false);
    if (result.error) return;
    setSaved(true);
    setTimeout(() => { setSaved(false); router.push(`/admin/invoices/${invoice.id}`); }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href={`/admin/invoices/${invoice.id}`} className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors">
          <ArrowLeft size={18} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Edit Invoice</h1>
          <p className="text-sm text-gray-500 mt-0.5">{invoice.invoiceNo}</p>
        </div>
      </div>

      {saved && (
        <div className="flex items-center gap-3 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl">
          <CheckCircle size={18} />
          <span className="text-sm font-medium">Invoice updated. Redirecting…</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Client info */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">Client Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Client Name *</label>
              <input type="text" required value={client} onChange={(e) => setClient(e.target.value)} className={INP} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Email Address *</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={INP} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Organisation *</label>
              <input type="text" required value={organisation} onChange={(e) => setOrganisation(e.target.value)} className={INP} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Country *</label>
              <input type="text" required value={country} onChange={(e) => setCountry(e.target.value)} className={INP} />
            </div>
          </div>
        </div>

        {/* Invoice details */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">Invoice Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Due Date *</label>
              <input type="date" required value={dueDate} onChange={(e) => setDueDate(e.target.value)} className={INP} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Status</label>
              <select value={status} onChange={(e) => setStatus(e.target.value as Invoice["status"])} className={INP}>
                <option value="draft">Draft</option>
                <option value="unpaid">Unpaid</option>
                <option value="paid">Paid</option>
                <option value="overdue">Overdue</option>
              </select>
            </div>
          </div>
        </div>

        {/* Line items */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">Line Items</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left text-xs font-semibold text-gray-500 pb-3 pr-4">Description</th>
                  <th className="text-right text-xs font-semibold text-gray-500 pb-3 pr-4 w-24">Qty</th>
                  <th className="text-right text-xs font-semibold text-gray-500 pb-3 pr-4 w-32">Rate (USD)</th>
                  <th className="text-right text-xs font-semibold text-gray-500 pb-3 w-32">Amount</th>
                  <th className="w-10" />
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {items.map((item, i) => (
                  <tr key={i}>
                    <td className="py-2 pr-4">
                      <input type="text" value={item.description} onChange={(e) => updateItem(i, "description", e.target.value)}
                        placeholder="Service description"
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3D9DD9]/30 focus:border-[#3D9DD9]" />
                    </td>
                    <td className="py-2 pr-4">
                      <input type="number" min={1} value={item.quantity} onChange={(e) => updateItem(i, "quantity", e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3D9DD9]/30 focus:border-[#3D9DD9] text-right" />
                    </td>
                    <td className="py-2 pr-4">
                      <input type="number" min={0} step={0.01} value={item.rate} onChange={(e) => updateItem(i, "rate", e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3D9DD9]/30 focus:border-[#3D9DD9] text-right" />
                    </td>
                    <td className="py-2 text-right font-semibold text-gray-700">{fmt(item.quantity * item.rate)}</td>
                    <td className="py-2 pl-3">
                      <button type="button" onClick={() => removeItem(i)} disabled={items.length === 1}
                        className="p-1.5 rounded-lg text-gray-300 hover:text-red-500 hover:bg-red-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed">
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button type="button" onClick={addItem}
            className="mt-4 inline-flex items-center gap-2 text-sm text-[#3D9DD9] hover:text-[#177DA6] font-medium transition-colors">
            <Plus size={15} /> Add Item
          </button>
          <div className="mt-6 flex justify-end">
            <div className="w-64 space-y-2 text-sm">
              <div className="flex justify-between text-gray-600"><span>Subtotal</span><span className="font-medium">{fmt(subtotal)}</span></div>
              <div className="flex justify-between text-gray-600"><span>Tax (16%)</span><span className="font-medium">{fmt(tax)}</span></div>
              <div className="flex justify-between text-gray-900 font-bold text-base border-t border-gray-200 pt-2 mt-2"><span>Total</span><span>{fmt(total)}</span></div>
            </div>
          </div>
        </div>

        {/* Notes */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">Notes</h2>
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3}
            placeholder="Any additional notes for the client…"
            className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3D9DD9]/30 focus:border-[#3D9DD9] resize-none transition-colors" />
        </div>

        <div className="flex items-center justify-end gap-3">
          <Link href={`/admin/invoices/${invoice.id}`}
            className="px-5 py-2.5 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            Cancel
          </Link>
          <button type="submit" disabled={saving}
            className="px-6 py-2.5 text-sm font-semibold bg-[#3D9DD9] hover:bg-[#177DA6] text-white rounded-lg transition-colors shadow-sm disabled:opacity-60">
            {saving ? "Saving…" : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
