import { redirect, notFound } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import InvoicePreview from "./invoice-preview";

export const dynamic = "force-dynamic";

export default async function InvoicePreviewPage({
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
    <InvoicePreview
      user={{ email: user.email ?? "", id: user.id }}
      invoice={invoice as Parameters<typeof InvoicePreview>[0]["invoice"]}
    />
  );
}
