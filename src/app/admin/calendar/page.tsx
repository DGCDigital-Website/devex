"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Plus, MapPin, CalendarDays } from "lucide-react";
import { ADMIN_EVENTS, CalendarEvent } from "@/lib/admin-data";

const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const CATEGORY_LABELS: Record<CalendarEvent["category"], string> = {
  project: "Project",
  deadline: "Deadline",
  meeting: "Meeting",
  training: "Training",
  conference: "Conference",
  internal: "Internal",
};

function formatDateLabel(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

function isSameDay(dateStr: string, year: number, month: number, day: number) {
  const d = new Date(dateStr);
  return d.getFullYear() === year && d.getMonth() === month && d.getDate() === day;
}

function getEventsForDay(events: CalendarEvent[], year: number, month: number, day: number) {
  return events.filter((evt) => {
    const start = new Date(evt.startDate);
    const end = new Date(evt.endDate);
    const check = new Date(year, month, day);
    return check >= start && check <= end;
  });
}

export default function CalendarPage() {
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  const goToToday = () => {
    setCurrentMonth(today.getMonth());
    setCurrentYear(today.getFullYear());
  };

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);

  // Build calendar grid (6 weeks max)
  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);

  // Upcoming events (sorted by start date)
  const upcomingEvents = [...ADMIN_EVENTS]
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());

  // All unique categories for legend
  const categories = Array.from(new Set(ADMIN_EVENTS.map((e) => e.category)));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Calendar</h1>
          <p className="text-sm text-gray-500 mt-1">Project milestones, events, and deadlines.</p>
        </div>
        <button className="inline-flex items-center gap-2 bg-[#3D9DD9] hover:bg-[#177DA6] text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors shadow-sm">
          <Plus size={16} />
          Add Event
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Calendar grid */}
        <div className="xl:col-span-3 bg-white rounded-xl border border-gray-200 overflow-hidden">
          {/* Month nav */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <button
              onClick={prevMonth}
              className="p-2 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="flex items-center gap-3">
              <h2 className="text-base font-bold text-gray-900">
                {MONTH_NAMES[currentMonth]} {currentYear}
              </h2>
              <button
                onClick={goToToday}
                className="text-xs text-[#3D9DD9] hover:text-[#177DA6] font-medium border border-[#3D9DD9]/30 px-2.5 py-1 rounded-full transition-colors"
              >
                Today
              </button>
            </div>
            <button
              onClick={nextMonth}
              className="p-2 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 border-b border-gray-100">
            {DAYS_OF_WEEK.map((day) => (
              <div key={day} className="py-2 text-center text-xs font-semibold text-gray-400 uppercase tracking-wide">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar cells */}
          <div className="grid grid-cols-7 divide-x divide-gray-50">
            {cells.map((day, idx) => {
              const isToday =
                day !== null &&
                day === today.getDate() &&
                currentMonth === today.getMonth() &&
                currentYear === today.getFullYear();

              const dayEvents = day ? getEventsForDay(ADMIN_EVENTS, currentYear, currentMonth, day) : [];

              const isLastRow = idx >= cells.length - 7;

              return (
                <div
                  key={idx}
                  className={`min-h-[88px] p-1.5 ${
                    day === null ? "bg-gray-50/50" : "hover:bg-gray-50/70"
                  } ${!isLastRow ? "border-b border-gray-50" : ""} transition-colors`}
                >
                  {day !== null && (
                    <>
                      <span
                        className={`w-7 h-7 flex items-center justify-center text-xs font-semibold rounded-full mb-1 ${
                          isToday
                            ? "bg-[#3D9DD9] text-white"
                            : "text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        {day}
                      </span>
                      <div className="space-y-0.5">
                        {dayEvents.slice(0, 2).map((evt) => (
                          <div
                            key={evt.id}
                            className="text-[10px] font-medium px-1.5 py-0.5 rounded truncate leading-tight"
                            style={{
                              backgroundColor: evt.color + "20",
                              color: evt.color,
                              borderLeft: `2px solid ${evt.color}`,
                            }}
                            title={evt.title}
                          >
                            {evt.title}
                          </div>
                        ))}
                        {dayEvents.length > 2 && (
                          <div className="text-[10px] text-gray-400 px-1">
                            +{dayEvents.length - 2} more
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Legend */}
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-3">Categories</h3>
            <div className="space-y-2">
              {categories.map((cat) => {
                const evt = ADMIN_EVENTS.find((e) => e.category === cat);
                return (
                  <div key={cat} className="flex items-center gap-2">
                    <span
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: evt?.color ?? "#888" }}
                    />
                    <span className="text-xs text-gray-600 capitalize">{CATEGORY_LABELS[cat]}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Upcoming events */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100">
              <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-wide">All Events</h3>
            </div>
            <div className="divide-y divide-gray-50 max-h-[480px] overflow-y-auto">
              {upcomingEvents.map((evt) => (
                <div key={evt.id} className="px-4 py-3 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start gap-2.5">
                    <span
                      className="w-2.5 h-2.5 rounded-full mt-1 flex-shrink-0"
                      style={{ backgroundColor: evt.color }}
                    />
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-gray-800 leading-tight">{evt.title}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <CalendarDays size={10} className="text-gray-300" />
                        <p className="text-[10px] text-gray-400">
                          {formatDateLabel(evt.startDate)}
                          {evt.endDate !== evt.startDate && ` – ${formatDateLabel(evt.endDate)}`}
                        </p>
                      </div>
                      {evt.location && (
                        <div className="flex items-center gap-1 mt-0.5">
                          <MapPin size={10} className="text-gray-300" />
                          <p className="text-[10px] text-gray-400 truncate">{evt.location}</p>
                        </div>
                      )}
                      <span
                        className="mt-1.5 inline-block text-[10px] font-medium px-1.5 py-0.5 rounded-full capitalize"
                        style={{
                          backgroundColor: evt.color + "15",
                          color: evt.color,
                        }}
                      >
                        {CATEGORY_LABELS[evt.category]}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
