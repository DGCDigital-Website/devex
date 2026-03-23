import { getAdminQuotations } from "@/lib/admin-store";
import QuotationsTable from "./quotations-table";

export default function QuotationsPage() {
  const quotations = getAdminQuotations();
  return <QuotationsTable quotations={quotations} />;
}
