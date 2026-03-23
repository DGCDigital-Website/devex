import type { Metadata } from "next";
import Link from "next/link";
import { CalendarDays, Clock, ArrowRight, ExternalLink } from "lucide-react";
import { createClient } from "@/utils/supabase/server";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Events | Devex Global Consult",
  description:
    "Upcoming workshops, training programmes, conferences, and events hosted by Devex Global Consult across Africa and beyond.",
};

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

/* category → brand-consistent styling */
const CAT_STYLES: Record<string, { bg: string; text: string; accent: string }> = {
  Workshops:        { bg: "bg-blue-50",    text: "text-dgc-blue-1",   accent: "#3D9DD9" },
  Certification:    { bg: "bg-sky-50",     text: "text-sky-600",      accent: "#177DA6" },
  "Client Meeting": { bg: "bg-indigo-50",  text: "text-indigo-600",   accent: "#0B2D59" },
  "Field Work":     { bg: "bg-teal-50",    text: "text-teal-600",     accent: "#50D4F2" },
  Other:            { bg: "bg-gray-100",   text: "text-gray-600",     accent: "#6b7280" },
};
const DEFAULT_STYLE = CAT_STYLES.Other;

function catStyle(cat: string | null) {
  return CAT_STYLES[cat ?? "Other"] ?? DEFAULT_STYLE;
}

function formatEventDate(start: string, end: string, allDay: boolean) {
  const s = new Date(start);
  const e = new Date(end);
  const opts: Intl.DateTimeFormatOptions = { day: "numeric", month: "long", year: "numeric" };
  const tOpts: Intl.DateTimeFormatOptions = { hour: "2-digit", minute: "2-digit", hour12: false };
  const sameDay = s.toDateString() === e.toDateString();
  if (allDay) {
    return sameDay
      ? s.toLocaleDateString("en-GB", opts)
      : `${s.toLocaleDateString("en-GB", opts)} – ${e.toLocaleDateString("en-GB", opts)}`;
  }
  return sameDay
    ? `${s.toLocaleDateString("en-GB", opts)},  ${s.toLocaleTimeString("en-GB", tOpts)} – ${e.toLocaleTimeString("en-GB", tOpts)}`
    : `${s.toLocaleDateString("en-GB", opts)} – ${e.toLocaleDateString("en-GB", opts)}`;
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
}

function getDuration(start: string, end: string, allDay: boolean) {
  const diffMs = new Date(end).getTime() - new Date(start).getTime();
  const days = Math.ceil(diffMs / 86_400_000);
  if (allDay || days > 1) return `${days} day${days !== 1 ? "s" : ""}`;
  const hrs = Math.round(diffMs / 3_600_000);
  return `${hrs} hr${hrs !== 1 ? "s" : ""}`;
}

export default async function EventsPage() {
  let events: CalEvent[] = [];

  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("calendar_events")
      .select("id, title, start_at, end_at, all_day, calendar, description, url")
      .not("calendar", "eq", "Internal")      /* hide internal events */
      .order("start_at", { ascending: true });
    events = (data ?? []) as CalEvent[];
  } catch {
    // page still renders with empty list
  }

  const now = new Date();
  const upcoming = events.filter((e) => new Date(e.start_at) >= now);
  const past     = events.filter((e) => new Date(e.start_at) <  now);

  return (
    <main className="min-h-screen bg-white text-gray-900">

      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="pt-28 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-dgc-dark-blue-1/8 via-blue-50/40 to-white" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_10%_50%,rgba(61,157,217,0.06),transparent)]" />
        <div className="relative max-w-5xl mx-auto px-6 sm:px-10">
          <p className="text-dgc-blue-1 text-xs font-semibold tracking-[0.18em] uppercase mb-4">Resources</p>
          <h1 className="font-extrabold text-gray-900 leading-tight mb-4"
            style={{ fontSize: "clamp(2rem,5vw,3.5rem)" }}>
            Events &amp; <span className="text-dgc-blue-1">Programmes</span>
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed max-w-2xl">
            Workshops, training programmes, conferences, and forums — join DGC to learn,
            connect, and strengthen development practice across Africa.
          </p>
          {upcoming.length > 0 && (
            <div className="mt-6 inline-flex items-center gap-2 bg-dgc-blue-1/10 border border-dgc-blue-1/20 rounded-full px-4 py-2">
              <span className="w-2 h-2 rounded-full bg-dgc-blue-1 animate-pulse" />
              <span className="text-dgc-blue-1 text-sm font-semibold">
                {upcoming.length} upcoming event{upcoming.length !== 1 ? "s" : ""}
              </span>
            </div>
          )}
        </div>
      </section>

      {/* ── Upcoming ──────────────────────────────────────────────── */}
      <section className="pb-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6 sm:px-10">
          <div className="mb-8 pt-16">
            <p className="text-dgc-blue-1 text-[11px] font-semibold tracking-[0.18em] uppercase mb-1">Upcoming</p>
            <h2 className="text-gray-900 font-bold text-2xl">
              {upcoming.length > 0
                ? `${upcoming.length} Upcoming Event${upcoming.length !== 1 ? "s" : ""}`
                : "No Upcoming Events"}
            </h2>
          </div>

          {upcoming.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-gray-200 text-gray-400">
              <CalendarDays className="w-10 h-10 mx-auto mb-4 opacity-30" />
              <p className="font-medium text-gray-500">No upcoming events at the moment.</p>
              <p className="text-sm mt-2">
                Check back soon or{" "}
                <a href="mailto:info@devexglobal.com" className="text-dgc-blue-1 hover:underline">contact us</a>{" "}
                to enquire about upcoming programmes.
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              {upcoming.map((evt) => {
                const s = catStyle(evt.calendar);
                const isMultiDay = evt.start_at.slice(0, 10) !== evt.end_at.slice(0, 10);
                const duration = getDuration(evt.start_at, evt.end_at, evt.all_day);
                return (
                  <article key={evt.id}
                    className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:border-dgc-blue-1/30 hover:shadow-md transition-all duration-300 flex overflow-hidden">
                    {/* Date column */}
                    <div className="hidden sm:flex flex-col items-center justify-center w-20 shrink-0 border-r border-gray-100 bg-gray-50/70 text-center px-2 py-6">
                      <span className="text-dgc-blue-1 text-[10px] font-extrabold uppercase tracking-widest leading-none">
                        {new Date(evt.start_at).toLocaleDateString("en-GB", { month: "short" })}
                      </span>
                      <span className="text-gray-900 text-3xl font-extrabold leading-tight mt-0.5">
                        {new Date(evt.start_at).getDate()}
                      </span>
                      {isMultiDay && (
                        <span className="text-gray-400 text-[9px] font-medium mt-1 leading-tight text-center">
                          multi-day
                        </span>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-6">
                      <div className="flex flex-col sm:flex-row sm:items-start gap-4 justify-between">
                        <div className="space-y-2.5 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className={`text-[10.5px] font-bold px-2.5 py-1 rounded-full ${s.bg} ${s.text}`}>
                              {evt.calendar ?? "Event"}
                            </span>
                            <span className="flex items-center gap-1 text-gray-400 text-xs">
                              <Clock className="w-3 h-3" /> {duration}
                            </span>
                          </div>
                          <h3 className="text-gray-900 font-bold text-lg leading-snug">{evt.title}</h3>
                          <p className="flex items-center gap-1.5 text-sm font-medium" style={{ color: s.accent }}>
                            <CalendarDays className="w-3.5 h-3.5 shrink-0" />
                            {formatEventDate(evt.start_at, evt.end_at, evt.all_day)}
                            {!evt.all_day && !isMultiDay && (
                              <span className="text-gray-400 font-normal">· starts {formatTime(evt.start_at)}</span>
                            )}
                          </p>
                          {evt.description && (
                            <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">
                              {evt.description}
                            </p>
                          )}
                        </div>
                        <div className="shrink-0">
                          {evt.url ? (
                            <a href={evt.url} target="_blank" rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 border border-dgc-blue-1/50 hover:border-dgc-blue-1 hover:bg-blue-50 text-gray-700 hover:text-dgc-blue-1 font-semibold px-5 py-2.5 rounded-xl transition-all text-sm">
                              Register <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          ) : (
                            <Link href="/contact"
                              className="inline-flex items-center gap-2 border border-dgc-blue-1/50 hover:border-dgc-blue-1 hover:bg-blue-50 text-gray-700 hover:text-dgc-blue-1 font-semibold px-5 py-2.5 rounded-xl transition-all text-sm">
                              Enquire <ArrowRight className="w-4 h-4" />
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ── Past events ───────────────────────────────────────────── */}
      {past.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-5xl mx-auto px-6 sm:px-10">
            <div className="mb-8">
              <p className="text-gray-400 text-[11px] font-semibold tracking-[0.18em] uppercase mb-1">Archive</p>
              <h2 className="text-gray-900 font-bold text-xl">Past Events</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {past.map((evt) => {
                const s = catStyle(evt.calendar);
                return (
                  <div key={evt.id}
                    className="p-5 rounded-2xl border border-gray-100 bg-gray-50/60 hover:bg-gray-50 transition-colors">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${s.bg} ${s.text} mb-2 inline-block`}>
                      {evt.calendar ?? "Event"}
                    </span>
                    <h3 className="text-gray-700 font-semibold text-sm leading-snug mb-1.5">{evt.title}</h3>
                    <p className="text-gray-400 text-xs flex items-center gap-1">
                      <CalendarDays className="w-3 h-3" />
                      {formatEventDate(evt.start_at, evt.end_at, evt.all_day)}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ───────────────────────────────────────────────────── */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6 sm:px-10">
          <div className="p-8 rounded-2xl bg-blue-50/50 border border-dgc-blue-1/15 text-center">
            <h3 className="text-gray-900 font-semibold text-lg mb-2">Want to host a DGC workshop?</h3>
            <p className="text-gray-500 text-sm mb-5 max-w-md mx-auto">
              We deliver bespoke training programmes and facilitation services.
              Get in touch to co-design an event for your organisation.
            </p>
            <Link href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:-translate-y-0.5"
              style={{ background: "linear-gradient(135deg,#3D9DD9,#177DA6)", boxShadow: "0 4px 16px rgba(61,157,217,0.3)" }}>
              Get in touch <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
