import { notFound } from "next/navigation";
import { getAdminQuotation } from "@/lib/admin-store";
import EditQuotationForm from "./edit-quotation-form";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditQuotationPage({ params }: Props) {
  const { id } = await params;
  const quotation = getAdminQuotation(id);
  if (!quotation) notFound();
  return <EditQuotationForm quotation={quotation} />;
}
