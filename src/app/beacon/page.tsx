import { requireBeaconAuth } from "@/utils/supabase/beacon";
import { getDashboardStats } from "@/lib/beacon/actions";
import BeaconDashboard from "./beacon-dashboard";

export const dynamic = "force-dynamic";

export default async function BeaconPage() {
  const { user } = await requireBeaconAuth();

  const stats = await getDashboardStats();

  return (
    <BeaconDashboard
      user={{ email: user.email ?? "", id: user.id }}
      stats={stats}
    />
  );
}
