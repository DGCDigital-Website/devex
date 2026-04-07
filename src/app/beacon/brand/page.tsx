import { requireBeaconAuth } from "@/utils/supabase/beacon";
import BrandView from "./brand-view";

export const dynamic = "force-dynamic";

export default async function BrandPage() {
  const { user } = await requireBeaconAuth();
  return <BrandView user={{ email: user.email ?? "", id: user.id }} />;
}
