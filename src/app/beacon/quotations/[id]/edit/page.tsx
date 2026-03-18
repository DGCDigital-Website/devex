import { redirect, notFound } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import EditQuotationForm from "./edit-quotation-form";

export const dynamic = "force-dynamic";

export default async function EditQuotationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) redirect("/beacon/login");
  const { data: quotation } = await supabase.from("quotations").select("*").eq("id", id).single();
  if (!quotation) notFound();
  return <EditQuotationForm user={{ email: user.email ?? "", id: user.id }} quotation={quotation as Parameters<typeof EditQuotationForm>[0]["quotation"]} />;
}
