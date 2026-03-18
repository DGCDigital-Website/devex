import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import QuotationsView from "./quotations-view";

export const dynamic = "force-dynamic";

export default async function QuotationsPage() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error || !user) redirect("/beacon/login");

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
