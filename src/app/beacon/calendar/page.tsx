import { requireBeaconAuth } from "@/utils/supabase/beacon";
import CalendarView from "./calendar-view";

export const dynamic = "force-dynamic";

export default async function CalendarPage() {
  const { db: supabase, user } = await requireBeaconAuth();

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
