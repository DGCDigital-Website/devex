import { notFound } from "next/navigation";
import { getAdminInvoice } from "@/lib/admin-store";
import EditInvoiceForm from "./edit-invoice-form";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditInvoicePage({ params }: Props) {
  const { id } = await params;
  const invoice = getAdminInvoice(id);
  if (!invoice) notFound();
  return <EditInvoiceForm invoice={invoice} />;
}
