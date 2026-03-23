"use client";

import Link from "next/link";
import { Printer, Pencil } from "lucide-react";

export default function InvoiceActions({ id }: { id: string }) {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => window.print()}
        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors print:hidden"
      >
        <Printer size={15} />
        Print
      </button>
      <Link
        href={`/admin/invoices/${id}/edit`}
        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-[#3D9DD9] hover:bg-[#177DA6] rounded-lg transition-colors print:hidden"
      >
        <Pencil size={15} />
        Edit
      </Link>
    </div>
  );
}
