import { requireBeaconAuth } from "@/utils/supabase/beacon";
import ContactsView from "./contacts-view";

export const dynamic = "force-dynamic";

export default async function ContactsPage() {
  const { db: supabase, user } = await requireBeaconAuth();

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
