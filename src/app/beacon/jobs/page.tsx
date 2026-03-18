import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import JobsView from "./jobs-view";

export const dynamic = "force-dynamic";

export default async function JobsPage() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error || !user) redirect("/beacon/login");

  const { data: jobs } = await supabase
    .from("jobs")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <JobsView
      user={{ email: user.email ?? "", id: user.id }}
      jobs={jobs ?? []}
    />
  );
}
