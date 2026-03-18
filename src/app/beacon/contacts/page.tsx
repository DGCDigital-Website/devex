import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import ContactsView from "./contacts-view";

export const dynamic = "force-dynamic";

export default async function ContactsPage() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error || !user) redirect("/beacon/login");

  const { data: contacts } = await supabase
    .from("contacts")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <ContactsView
      user={{ email: user.email ?? "", id: user.id }}
      contacts={contacts ?? []}
    />
  );
}
