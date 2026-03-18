import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import BrandView from "./brand-view";

export const dynamic = "force-dynamic";

export default async function BrandPage() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) redirect("/beacon/login");
  return <BrandView user={{ email: user.email ?? "", id: user.id }} />;
}
