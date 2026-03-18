import { redirect, notFound } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import EditJobForm from "./edit-job-form";

export const dynamic = "force-dynamic";

export default async function EditJobPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error || !user) redirect("/beacon/login");

  const { data: job } = await supabase
    .from("jobs")
    .select("*")
    .eq("id", id)
    .single();

  if (!job) notFound();

  return (
    <EditJobForm
      user={{ email: user.email ?? "", id: user.id }}
      job={job}
    />
  );
}
