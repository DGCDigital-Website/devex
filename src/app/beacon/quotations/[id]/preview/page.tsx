import { notFound } from "next/navigation";
import { requireBeaconAuth } from "@/utils/supabase/beacon";
import QuotationPreview from "./quotation-preview";

export const dynamic = "force-dynamic";

export default async function QuotationPreviewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { db: supabase, user } = await requireBeaconAuth();
  const { data: quotation } = await supabase.from("quotations").select("*").eq("id", id).single();
  if (!quotation) notFound();
  return <QuotationPreview user={{ email: user.email ?? "", id: user.id }} quotation={quotation as Parameters<typeof QuotationPreview>[0]["quotation"]} />;
}
