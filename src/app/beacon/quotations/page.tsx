import { requireBeaconAuth } from "@/utils/supabase/beacon";
import QuotationsView from "./quotations-view";

export const dynamic = "force-dynamic";

export default async function QuotationsPage() {
  const { db: supabase, user } = await requireBeaconAuth();

  const { data: quotations } = await supabase
    .from("quotations")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <QuotationsView
      user={{ email: user.email ?? "", id: user.id }}
      quotations={(quotations ?? []) as Parameters<typeof QuotationsView>[0]["quotations"]}
    />
  );
}
