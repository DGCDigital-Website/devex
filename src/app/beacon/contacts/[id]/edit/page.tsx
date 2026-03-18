import { redirect, notFound } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import EditContactForm from "./edit-contact-form";

export const dynamic = "force-dynamic";

export default async function EditContactPage({
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

  const { data: contact } = await supabase
    .from("contacts")
    .select("*")
    .eq("id", Number(id))
    .single();

  if (!contact) notFound();

  return (
    <EditContactForm
      user={{ email: user.email ?? "", id: user.id }}
      contact={contact}
    />
  );
}
