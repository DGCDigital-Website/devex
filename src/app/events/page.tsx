import type { Metadata } from "next";
import { CalendarDays, MapPin, Clock, ArrowRight } from "lucide-react";
import { createClient } from "@/utils/supabase/server";

export const metadata: Metadata = {
  title: "Events | Devex Global Consult",
  description: "Upcoming events, workshops, and engagements from Devex Global Consult across Africa.",
};

const CATEGORY_COLORS: Record<string, { bg: string; text: string; dot: string }> = {
  work:     { bg: "bg-blue-50",    text: "text-dgc-blue-1",   dot: "bg-dgc-blue-1"   },
  personal: { bg: "bg-violet-50",  text: "text-violet-600",   dot: "bg-violet-500"   },
  holiday:  { bg: "bg-emerald-50", text: "text-emerald-600",  dot: "bg-emerald-500"  },
  default:  { bg: "bg-gray-100",   text: "text-gray-600",     dot: "bg-gray-400"     },
};

function getColors(category: string | null) {
  return CATEGORY_COLORS[category ?? "default"] ?? CATEGORY_COLORS.default;
}

function formatEventDate(start: string, end: string, allDay: boolean) {
  const s = new Date(start);
  const e = new Date(end);
  const opts: Intl.DateTimeFormatOptions = { day: "numeric", month: "long", year: "numeric" };

  if (allDay || s.toDateString() === e.toDateString()) {
    return new Date(start).toLocaleDateString("en-GB", opts);
  }
  return `${s.toLocaleDateString("en-GB", opts)} – ${e.toLocaleDateString("en-GB", opts)}`;
}

function formatTime(iso: string, allDay: boolean) {
  if (allDay) return "All day";
  return new Date(iso).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
}

type CalEvent = {
  id: string;
  title: string;
  start_at: string;
  end_at: string;
  all_day: boolean;
  calendar: string | null;
  description: string | null;
  url: string | null;
};

export default async function EventsPage() {
  let events: CalEvent[] = [];

  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("calendar_events")
      .select("id, title, start_at, end_at, all_day, calendar, description, url")
      .gte("end_at", new Date().toISOString())
      .order("start_at", { ascending: true })
      .limit(24);
    events = (data ?? []) as CalEvent[];
  } catch {
    // Fall back to empty — page still renders gracefully
  }

  const upcoming = events.filter((e) => new Date(e.start_at) >= new Date());
  const thisMonth = events.filter((e) => {
    const d = new Date(e.start_at);
    const now = new Date();
    return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
  });

  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Hero */}
      <section className="pt-28 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-dgc-dark-blue-1/8 via-blue-50/40 to-white" />
        <div className="relative max-w-5xl mx-auto px-6 sm:px-10">
          <p className="text-dgc-blue-1 text-xs font-semibold tracking-[0.18em] uppercase mb-4">
            Calendar
          </p>
          <h1
            className="font-extrabold text-gray-900 leading-tight mb-4"
            style={{ fontSize: "clamp(2rem,5vw,3.5rem)" }}
          >
            Upcoming <span className="text-dgc-blue-1">Events</span>
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed max-w-2xl">
            Workshops, field visits, consultations, and learning events from Devex Global Consult across Africa and beyond.
          </p>
          {upcoming.length > 0 && (
            <div className="mt-6 flex items-center gap-2 text-sm text-gray-500">
              <CalendarDays className="w-4 h-4 text-dgc-blue-1" />
              <span><strong className="text-gray-700">{upcoming.length}</strong> upcoming event{upcoming.length !== 1 ? "s" : ""}</span>
              {thisMonth.length > 0 && (
                <span className="text-gray-400">·  <strong className="text-gray-600">{thisMonth.length}</strong> this month</span>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Events list */}
      <section className="pb-24">
        <div className="max-w-5xl mx-auto px-6 sm:px-10">
          {events.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <CalendarDays className="w-12 h-12 mx-auto mb-4 opacity-20" />
              <p className="text-lg font-medium">No upcoming events scheduled.</p>
              <p className="text-sm mt-2">Check back soon or <a href="mailto:info@devexglobal.com" className="text-dgc-blue-1 hover:underline">contact us</a> to discuss engagements.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {events.map((evt) => {
                const colors = getColors(evt.calendar);
                const isMultiDay = evt.start_at.slice(0, 10) !== evt.end_at.slice(0, 10);
                return (
                  <div
                    key={evt.id}
                    className="group bg-white border border-gray-200 rounded-2xl p-6 hover:border-dgc-blue-1/30 hover:shadow-sm transition-all duration-200 flex flex-col sm:flex-row gap-5"
                  >
                    {/* Date badge */}
                    <div className="shrink-0 flex flex-row sm:flex-col items-center sm:items-center gap-3 sm:gap-0 sm:w-14 sm:text-center">
                      <div className="w-14 h-14 rounded-2xl border border-gray-100 bg-gray-50 flex flex-col items-center justify-center shrink-0">
                        <span className="text-dgc-blue-1 text-xs font-bold uppercase tracking-wide leading-none">
                          {new Date(evt.start_at).toLocaleDateString("en-GB", { month: "short" })}
                        </span>
                        <span className="text-gray-900 text-2xl font-extrabold leading-tight">
                          {new Date(evt.start_at).getDate()}
                        </span>
                      </div>
                      {isMultiDay && (
                        <span className="text-gray-400 text-[10px] font-medium hidden sm:block mt-1">multi-day</span>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                        <h2 className="text-gray-900 font-bold text-base leading-snug">{evt.title}</h2>
                        <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full capitalize ${colors.bg} ${colors.text}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${colors.dot}`} />
                          {evt.calendar ?? "event"}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-3">
                        <span className="flex items-center gap-1.5">
                          <CalendarDays className="w-3.5 h-3.5 text-dgc-blue-1/70" />
                          {formatEventDate(evt.start_at, evt.end_at, evt.all_day)}
                        </span>
                        {!evt.all_day && (
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-dgc-blue-1/70" />
                            {formatTime(evt.start_at, evt.all_day)}
                          </span>
                        )}
                      </div>

                      {evt.description && (
                        <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">{evt.description}</p>
                      )}

                      {evt.url && (
                        <a href={evt.url} target="_blank" rel="noopener noreferrer"
                          className="mt-3 inline-flex items-center gap-1.5 text-dgc-blue-1 text-sm font-medium hover:underline">
                          Learn more <ArrowRight className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* CTA */}
          <div className="mt-12 p-8 rounded-2xl bg-blue-50/50 border border-dgc-blue-1/15 text-center">
            <h3 className="text-gray-900 font-semibold text-lg mb-2">Want to collaborate on an event?</h3>
            <p className="text-gray-500 text-sm mb-5">Reach out to discuss workshops, learning events, or field engagements.</p>
            <a href="mailto:info@devexglobal.com"
              className="inline-flex items-center gap-2 border border-dgc-blue-1/50 hover:border-dgc-blue-1 hover:bg-blue-50 text-gray-700 hover:text-dgc-blue-1 font-semibold px-6 py-3 rounded-xl transition-colors text-sm">
              Get in touch <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
