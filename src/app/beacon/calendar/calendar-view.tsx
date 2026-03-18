"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import BeaconShell from "@/components/beacon/beacon-shell";
import ConfirmDialog from "@/components/beacon/confirm-dialog";
import { createCalendarEvent, updateCalendarEvent, deleteCalendarEvent } from "@/lib/beacon/actions";
import { CALENDAR_CATEGORIES, CATEGORY_COLORS } from "@/lib/beacon/types";
import type { BeaconUser, CalendarEventRow } from "@/lib/beacon/types";
import {
  ChevronLeft, ChevronRight, Plus, X as XIcon,
  CalendarDays, Loader2, AlertCircle, Trash2,
} from "lucide-react";

// ── Helpers ───────────────────────────────────────────────────────────────────

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DAYS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

function isoDate(d: Date) {
  return d.toISOString().split("T")[0];
}

function genId() {
  return `EVT-${Date.now().toString(36).toUpperCase()}`;
}

function formatTime(iso: string) {
  try {
    return new Date(iso).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
  } catch { return ""; }
}

function formatDateLabel(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" });
  } catch { return iso; }
}

// ── Types ─────────────────────────────────────────────────────────────────────

type CalEvent = CalendarEventRow;

type ModalState =
  | { mode: "closed" }
  | { mode: "create"; date: string }
  | { mode: "edit"; event: CalEvent }
  | { mode: "view"; event: CalEvent };

type Props = { user: BeaconUser; initialEvents: CalEvent[] };

// ── Component ─────────────────────────────────────────────────────────────────

export default function CalendarView({ user, initialEvents }: Props) {
  const router = useRouter();
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [events, setEvents] = useState<CalEvent[]>(initialEvents);
  const [modal, setModal] = useState<ModalState>({ mode: "closed" });
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);

  // Form state
  const [form, setForm] = useState<{
    title: string;
    start_at: string;
    end_at: string;
    all_day: boolean;
    calendar: string;
    description: string;
    url: string;
  }>({
    title: "",
    start_at: "",
    end_at: "",
    all_day: false,
    calendar: CALENDAR_CATEGORIES[0],
    description: "",
    url: "",
  });

  // Calendar grid
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = Array.from({ length: firstDay + daysInMonth }, (_, i) =>
    i < firstDay ? null : i - firstDay + 1
  );

  function prevMonth() { if (month === 0) { setMonth(11); setYear(y => y - 1); } else setMonth(m => m - 1); }
  function nextMonth() { if (month === 11) { setMonth(0); setYear(y => y + 1); } else setMonth(m => m + 1); }

  function eventsForDay(day: number) {
    const d = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return events.filter(e => {
      const start = e.start_at.split("T")[0];
      return start === d && (!categoryFilter || e.calendar === categoryFilter);
    });
  }

  function openCreate(day: number) {
    const d = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    setForm({ title: "", start_at: `${d}T09:00`, end_at: `${d}T10:00`, all_day: false, calendar: CALENDAR_CATEGORIES[0], description: "", url: "" });
    setFormError(null);
    setModal({ mode: "create", date: d });
  }

  function openEdit(e: CalEvent) {
    setForm({ title: e.title, start_at: e.start_at.slice(0, 16), end_at: e.end_at.slice(0, 16), all_day: e.all_day, calendar: e.calendar ?? CALENDAR_CATEGORIES[0], description: e.description ?? "", url: e.url ?? "" });
    setFormError(null);
    setModal({ mode: "edit", event: e });
  }

  function openView(e: CalEvent) { setModal({ mode: "view", event: e }); }

  const upd = useCallback((field: string, value: string | boolean) => {
    setForm(f => ({ ...f, [field]: value }));
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title.trim()) { setFormError("Title is required."); return; }
    setSubmitting(true); setFormError(null);

    if (modal.mode === "create") {
      const payload = {
        id: genId(),
        title: form.title,
        start_at: form.all_day ? `${form.start_at.split("T")[0]}T00:00:00` : `${form.start_at}:00`,
        end_at: form.all_day ? `${form.end_at.split("T")[0]}T23:59:59` : `${form.end_at}:00`,
        all_day: form.all_day,
        calendar: form.calendar,
        description: form.description || null,
        url: form.url || null,
      };
      const result = await createCalendarEvent(payload);
      if (result.error) { setFormError(result.error); setSubmitting(false); return; }
      setEvents(ev => [...ev, { ...payload, created_at: new Date().toISOString() }]);
    } else if (modal.mode === "edit") {
      const id = (modal as { mode: "edit"; event: CalEvent }).event.id;
      const payload = {
        title: form.title,
        start_at: form.all_day ? `${form.start_at.split("T")[0]}T00:00:00` : `${form.start_at}:00`,
        end_at: form.all_day ? `${form.end_at.split("T")[0]}T23:59:59` : `${form.end_at}:00`,
        all_day: form.all_day,
        calendar: form.calendar,
        description: form.description || null,
        url: form.url || null,
      };
      const result = await updateCalendarEvent(id, payload);
      if (result.error) { setFormError(result.error); setSubmitting(false); return; }
      setEvents(ev => ev.map(e => e.id === id ? { ...e, ...payload } : e));
    }
    setSubmitting(false);
    setModal({ mode: "closed" });
    router.refresh();
  }

  async function handleDelete() {
    if (!deleteId) return;
    setDeleting(true);
    const result = await deleteCalendarEvent(deleteId);
    setDeleting(false);
    if (result.error) return;
    setEvents(ev => ev.filter(e => e.id !== deleteId));
    setDeleteId(null);
    setModal({ mode: "closed" });
    router.refresh();
  }

  const isToday = (day: number) =>
    day === today.getDate() && month === today.getMonth() && year === today.getFullYear();

  const filteredEvents = events.filter(e => !categoryFilter || e.calendar === categoryFilter);
  const upcomingEvents = filteredEvents
    .filter(e => new Date(e.start_at) >= today)
    .slice(0, 5);

  const INPUT_CLS = "w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-dgc-blue-1/20 focus:border-dgc-blue-1 transition-all";

  return (
    <BeaconShell
      user={user}
      title="Calendar"
      subtitle="Schedule and track DGC events, workshops, and engagements"
      actions={
        <button
          onClick={() => { setForm({ title: "", start_at: `${isoDate(today)}T09:00`, end_at: `${isoDate(today)}T10:00`, all_day: false, calendar: CALENDAR_CATEGORIES[0], description: "", url: "" }); setFormError(null); setModal({ mode: "create", date: isoDate(today) }); }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white shadow-[0_2px_8px_rgba(61,157,217,0.3)] hover:shadow-[0_4px_16px_rgba(61,157,217,0.4)] hover:-translate-y-px transition-all"
          style={{ background: "linear-gradient(135deg,#3D9DD9,#177DA6)" }}
        >
          <Plus className="w-4 h-4" /> Add Event
        </button>
      }
    >
      <div className="grid lg:grid-cols-[1fr_280px] gap-6">
        {/* Calendar grid */}
        <div className="bg-white rounded-2xl border border-gray-200/80 shadow-[0_1px_4px_rgba(0,0,0,0.06)] overflow-hidden">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-gray-900 font-bold text-lg">{MONTHS[month]} {year}</h2>
            <div className="flex items-center gap-2">
              <button onClick={prevMonth} className="p-2 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"><ChevronLeft className="w-4 h-4" /></button>
              <button onClick={() => { setMonth(today.getMonth()); setYear(today.getFullYear()); }} className="px-3 py-1.5 rounded-xl text-xs font-medium text-gray-600 hover:bg-gray-100 transition-colors">Today</button>
              <button onClick={nextMonth} className="p-2 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"><ChevronRight className="w-4 h-4" /></button>
            </div>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 border-b border-gray-100">
            {DAYS.map(d => (
              <div key={d} className="py-2.5 text-center text-[11px] font-semibold text-gray-400 uppercase tracking-wider">{d}</div>
            ))}
          </div>

          {/* Cells */}
          <div className="grid grid-cols-7">
            {cells.map((day, i) => {
              const dayEvents = day ? eventsForDay(day) : [];
              return (
                <div
                  key={i}
                  onClick={() => day && openCreate(day)}
                  className={`min-h-[90px] border-b border-r border-gray-50 p-1.5 cursor-pointer transition-colors ${day ? "hover:bg-gray-50/70" : "bg-gray-50/30 cursor-default"} ${isToday(day!) ? "bg-dgc-blue-1/5" : ""}`}
                >
                  {day && (
                    <>
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold mb-1 ${isToday(day) ? "bg-dgc-blue-1 text-white" : "text-gray-500"}`}>
                        {day}
                      </div>
                      <div className="space-y-0.5">
                        {dayEvents.slice(0, 3).map(ev => (
                          <div
                            key={ev.id}
                            onClick={e => { e.stopPropagation(); openView(ev); }}
                            className="text-[10px] font-medium px-1.5 py-0.5 rounded-md truncate text-white cursor-pointer hover:opacity-80 transition-opacity"
                            style={{ backgroundColor: CATEGORY_COLORS[ev.calendar ?? "Other"] ?? "#6b7280" }}
                          >
                            {ev.title}
                          </div>
                        ))}
                        {dayEvents.length > 3 && (
                          <div className="text-[10px] text-gray-400 px-1">+{dayEvents.length - 3} more</div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>

          {/* Category filter */}
          <div className="px-5 py-3.5 border-t border-gray-100 flex items-center gap-2 flex-wrap">
            <button onClick={() => setCategoryFilter(null)} className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors ${!categoryFilter ? "bg-gray-800 text-white" : "text-gray-500 hover:bg-gray-100"}`}>All</button>
            {CALENDAR_CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(categoryFilter === cat ? null : cat)}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors ${categoryFilter === cat ? "text-white" : "text-gray-600 hover:bg-gray-100"}`}
                style={categoryFilter === cat ? { backgroundColor: CATEGORY_COLORS[cat] } : {}}
              >
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: CATEGORY_COLORS[cat] }} />
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Sidebar: upcoming */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-gray-200/80 shadow-[0_1px_4px_rgba(0,0,0,0.06)] overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100">
              <h3 className="text-gray-800 font-semibold text-sm">Upcoming Events</h3>
            </div>
            {upcomingEvents.length === 0 ? (
              <div className="flex flex-col items-center py-8 text-center px-4">
                <CalendarDays className="w-8 h-8 text-gray-200 mb-2" />
                <p className="text-gray-400 text-xs">No upcoming events</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-50">
                {upcomingEvents.map(ev => (
                  <div
                    key={ev.id}
                    onClick={() => openView(ev)}
                    className="px-5 py-3.5 hover:bg-gray-50/70 transition-colors cursor-pointer group"
                  >
                    <div className="flex items-start gap-2.5">
                      <div className="w-2.5 h-2.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: CATEGORY_COLORS[ev.calendar ?? "Other"] ?? "#6b7280" }} />
                      <div className="min-w-0">
                        <p className="text-gray-800 text-sm font-medium truncate group-hover:text-dgc-blue-1 transition-colors">{ev.title}</p>
                        <p className="text-gray-400 text-xs mt-0.5">{formatDateLabel(ev.start_at)}</p>
                        {!ev.all_day && <p className="text-gray-400 text-xs">{formatTime(ev.start_at)} – {formatTime(ev.end_at)}</p>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Total count */}
          <div className="bg-white rounded-2xl border border-gray-200/80 shadow-[0_1px_4px_rgba(0,0,0,0.06)] p-5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-dgc-blue-1/10 flex items-center justify-center"><CalendarDays className="w-4.5 h-4.5 text-dgc-blue-1" /></div>
              <div>
                <p className="text-gray-400 text-xs font-medium">Total Events</p>
                <p className="text-2xl font-extrabold text-dgc-blue-1">{events.length}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Event Modal (create/edit) ── */}
      {(modal.mode === "create" || modal.mode === "edit") && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setModal({ mode: "closed" })} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md z-10">
            <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-gray-900 font-semibold">{modal.mode === "create" ? "Add Event" : "Edit Event"}</h2>
              <button onClick={() => setModal({ mode: "closed" })} className="text-gray-400 hover:text-gray-600 transition-colors"><XIcon className="w-4 h-4" /></button>
            </div>
            <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
              <div className="space-y-1.5">
                <label className="block text-gray-700 text-sm font-medium">Title <span className="text-red-400">*</span></label>
                <input type="text" required value={form.title} onChange={e => upd("title", e.target.value)} placeholder="Event title…" className={INPUT_CLS} />
              </div>
              <div className="space-y-1.5">
                <label className="block text-gray-700 text-sm font-medium">Category</label>
                <select value={form.calendar} onChange={e => upd("calendar", e.target.value)} className={INPUT_CLS}>
                  {CALENDAR_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="flex items-center gap-2.5">
                <input type="checkbox" id="all_day" checked={form.all_day} onChange={e => upd("all_day", e.target.checked)} className="w-4 h-4 rounded accent-dgc-blue-1" />
                <label htmlFor="all_day" className="text-gray-700 text-sm font-medium">All-day event</label>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="block text-gray-700 text-sm font-medium">Start</label>
                  <input type={form.all_day ? "date" : "datetime-local"} value={form.start_at} onChange={e => upd("start_at", e.target.value)} className={INPUT_CLS} required />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-gray-700 text-sm font-medium">End</label>
                  <input type={form.all_day ? "date" : "datetime-local"} value={form.end_at} onChange={e => upd("end_at", e.target.value)} className={INPUT_CLS} required />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="block text-gray-700 text-sm font-medium">Description</label>
                <textarea rows={2} value={form.description} onChange={e => upd("description", e.target.value)} placeholder="Optional notes…" className={`${INPUT_CLS} resize-none`} />
              </div>
              {formError && (
                <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-3.5 py-2.5">
                  <AlertCircle className="w-3.5 h-3.5 text-red-500 shrink-0" />
                  <p className="text-red-600 text-sm">{formError}</p>
                </div>
              )}
              <div className="flex items-center gap-2.5 pt-1">
                <button type="submit" disabled={submitting} className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white flex items-center justify-center gap-2 shadow-[0_2px_8px_rgba(61,157,217,0.3)] disabled:opacity-60 disabled:shadow-none transition-all" style={{ background: "linear-gradient(135deg,#3D9DD9,#177DA6)" }}>
                  {submitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving…</> : modal.mode === "create" ? "Add Event" : "Save Changes"}
                </button>
                {modal.mode === "edit" && (
                  <button type="button" onClick={() => { setDeleteId((modal as { mode: "edit"; event: CalEvent }).event.id); }} className="px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 bg-red-50 hover:bg-red-100 transition-colors flex items-center gap-1.5">
                    <Trash2 className="w-3.5 h-3.5" /> Delete
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── View Modal ── */}
      {modal.mode === "view" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setModal({ mode: "closed" })} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm z-10">
            <div
              className="px-6 py-4 rounded-t-2xl flex items-center justify-between"
              style={{ backgroundColor: CATEGORY_COLORS[(modal as { mode: "view"; event: CalEvent }).event.calendar ?? "Other"] }}
            >
              <div>
                <span className="text-white/70 text-xs font-medium">{(modal as { mode: "view"; event: CalEvent }).event.calendar}</span>
                <h2 className="text-white font-bold text-base mt-0.5">{(modal as { mode: "view"; event: CalEvent }).event.title}</h2>
              </div>
              <button onClick={() => setModal({ mode: "closed" })} className="text-white/70 hover:text-white transition-colors"><XIcon className="w-4 h-4" /></button>
            </div>
            <div className="px-6 py-5 space-y-3">
              <div className="text-sm text-gray-700">
                <p className="font-medium">{formatDateLabel((modal as { mode: "view"; event: CalEvent }).event.start_at)}</p>
                {!(modal as { mode: "view"; event: CalEvent }).event.all_day && (
                  <p className="text-gray-400 text-xs mt-0.5">{formatTime((modal as { mode: "view"; event: CalEvent }).event.start_at)} – {formatTime((modal as { mode: "view"; event: CalEvent }).event.end_at)}</p>
                )}
              </div>
              {(modal as { mode: "view"; event: CalEvent }).event.description && (
                <p className="text-gray-600 text-sm">{(modal as { mode: "view"; event: CalEvent }).event.description}</p>
              )}
              <div className="flex gap-2 pt-1">
                <button onClick={() => openEdit((modal as { mode: "view"; event: CalEvent }).event)} className="flex-1 py-2 rounded-xl text-sm font-medium text-dgc-blue-1 bg-dgc-blue-1/10 hover:bg-dgc-blue-1/20 transition-colors">Edit</button>
                <button onClick={() => { setDeleteId((modal as { mode: "view"; event: CalEvent }).event.id); }} className="px-4 py-2 rounded-xl text-sm font-medium text-red-500 bg-red-50 hover:bg-red-100 transition-colors flex items-center gap-1.5"><Trash2 className="w-3.5 h-3.5" />Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <ConfirmDialog
        isOpen={deleteId !== null}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        loading={deleting}
        title="Delete event?"
        description="This calendar event will be permanently removed."
      />
    </BeaconShell>
  );
}
