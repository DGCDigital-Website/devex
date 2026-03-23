import { getAdminInvoices } from "@/lib/admin-store";
import InvoicesTable from "./invoices-table";

export default function InvoicesPage() {
  const invoices = getAdminInvoices();
  return <InvoicesTable invoices={invoices} />;
}
