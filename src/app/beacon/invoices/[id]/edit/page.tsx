import { redirect, notFound } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import EditInvoiceForm from "./edit-invoice-form";

export const dynamic = "force-dynamic";

export default async function EditInvoicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) redirect("/beacon/login");

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
