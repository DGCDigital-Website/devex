import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import CalendarView from "./calendar-view";

export const dynamic = "force-dynamic";

export default async function CalendarPage() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) redirect("/beacon/login");

  const { data: events } = await supabase
    .from("calendar_events")
    .select("*")
    .order("start_at", { ascending: true });

  return (
    <CalendarView
      user={{ email: user.email ?? "", id: user.id }}
      initialEvents={events ?? []}
    />
  );
}
