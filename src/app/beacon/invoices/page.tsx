import { requireBeaconAuth } from "@/utils/supabase/beacon";
import InvoicesView from "./invoices-view";

export const dynamic = "force-dynamic";

export default async function InvoicesPage() {
  const { db: supabase, user } = await requireBeaconAuth();

  const { data: invoices } = await supabase
    .from("invoices")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <InvoicesView
      user={{ email: user.email ?? "", id: user.id }}
      invoices={(invoices ?? []) as Parameters<typeof InvoicesView>[0]["invoices"]}
    />
  );
}
