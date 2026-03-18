import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { getDashboardStats } from "@/lib/beacon/actions";
import BeaconDashboard from "./beacon-dashboard";

export const dynamic = "force-dynamic";

export default async function BeaconPage() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) redirect("/beacon/login");

  const stats = await getDashboardStats();

  return (
    <BeaconDashboard
      user={{ email: user.email ?? "", id: user.id }}
      stats={stats}
    />
  );
}
