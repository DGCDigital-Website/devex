import { notFound } from "next/navigation";
import { requireBeaconAuth } from "@/utils/supabase/beacon";
import EditInvoiceForm from "./edit-invoice-form";

export const dynamic = "force-dynamic";

export default async function EditInvoicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { db: supabase, user } = await requireBeaconAuth();

  const { data: invoice } = await supabase
    .from("invoices").select("*").eq("id", id).single();
  if (!invoice) notFound();

  return (
    <EditInvoiceForm
      user={{ email: user.email ?? "", id: user.id }}
      invoice={invoice as Parameters<typeof EditInvoiceForm>[0]["invoice"]}
    />
  );
}
