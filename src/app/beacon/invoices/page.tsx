import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import InvoicesView from "./invoices-view";

export const dynamic = "force-dynamic";

export default async function InvoicesPage() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error || !user) redirect("/beacon/login");

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
