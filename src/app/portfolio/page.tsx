"use client";

import dynamic from "next/dynamic";
import { useState, useMemo, useEffect } from "react";
import { Filter, X, Globe, MapPin, ChevronDown } from "lucide-react";
import { PROJECTS, COUNTRIES, SERVICES } from "@/lib/data";

const PortfolioMap = dynamic(
  () => import("@/components/portfolio/PortfolioMap"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[860px] rounded-2xl bg-gray-100 animate-pulse flex items-center justify-center">
        <Globe className="w-10 h-10 text-gray-300 animate-spin" style={{ animationDuration: "3s" }} />
      </div>
    ),
  },
);

const PAGE_SIZE = 10;
const allCountries = [...COUNTRIES.africa, ...COUNTRIES.asia];

const SERVICE_FILTERS = [
  { value: "", label: "All Services" },
  ...SERVICES.map((s) => ({ value: s.id, label: s.shortTitle, color: s.color })),
];

export default function PortfolioPage() {
  const [serviceFilter, setServiceFilter] = useState("");
  const [regionFilter, setRegionFilter] = useState("");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const regions = useMemo(() => Array.from(new Set(PROJECTS.map((p) => p.region))), []);

  const filtered = useMemo(() => {
    return PROJECTS.filter((p) => {
      if (serviceFilter && p.service !== serviceFilter) return false;
      if (regionFilter && p.region !== regionFilter) return false;
      return true;
    });
  }, [serviceFilter, regionFilter]);

  // Reset pagination whenever filters change
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [serviceFilter, regionFilter]);

  const visible = filtered.slice(0, visibleCount);
  const remaining = filtered.length - visibleCount;
  const hasFilter = serviceFilter || regionFilter;

  return (
    <main className="min-h-screen bg-white text-gray-900">

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="pt-28 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-dgc-dark-blue-1/8 via-blue-50/50 to-white" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_10%_50%,rgba(61,157,217,0.06),transparent)]" />
        <div className="relative max-w-6xl mx-auto px-6 sm:px-10">
          <p className="text-dgc-blue-1 text-xs font-semibold tracking-[0.18em] uppercase mb-4">
            Digital Footprint
          </p>
          <h1
            className="leading-tight mb-4"
            style={{ fontSize: "clamp(2rem,5vw,3.5rem)" }}
          >
            <span className="title-thin">Our Portfolio & </span><span className="title-highlight">Global Footprint</span>
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed max-w-2xl">
            DGC has delivered 480+ evaluations, assessments, and consultancies across 22 African
            and 4 Asian countries. Explore our project portfolio and digital footprint below.
          </p>

          {/* Stat chips */}
          <div className="flex flex-wrap gap-3 mt-8">
            {[
              { label: "Total Projects", value: `${PROJECTS.length}` },
              { label: "Countries", value: "26+" },
              { label: "Clients", value: "30+" },
              { label: "Years of delivery", value: "18+" },
            ].map((s) => (
              <div
                key={s.label}
                className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-white border border-gray-200 shadow-sm"
              >
                <span className="text-dgc-blue-1 font-bold text-sm">{s.value}</span>
                <span className="text-gray-500 text-xs">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Map ──────────────────────────────────────────────────────── */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-lg">
            <PortfolioMap projects={PROJECTS} countries={allCountries} />
          </div>
        </div>
      </section>

      {/* ── Filters + Cards ──────────────────────────────────────────── */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6 sm:px-10">

          {/* Section heading */}
          <div className="flex items-end justify-between mb-8 gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl leading-tight mb-1"><span className="title-thin">Project </span><span className="title-highlight">Catalogue</span></h2>
              <p className="text-gray-400 text-sm">
                {hasFilter
                  ? `${filtered.length} of ${PROJECTS.length} projects match your filters`
                  : `${PROJECTS.length} projects across all service areas`}
              </p>
            </div>
            {hasFilter && (
              <button
                onClick={() => { setServiceFilter(""); setRegionFilter(""); }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-gray-500 hover:text-gray-800 border border-gray-200 hover:border-gray-300 bg-white transition-colors shrink-0"
              >
                <X className="w-3 h-3" /> Clear filters
              </button>
            )}
          </div>

          {/* Filter bar */}
          <div className="flex flex-wrap items-center gap-2 mb-10 p-3 rounded-2xl bg-gray-50 border border-gray-100">
            <Filter className="w-3.5 h-3.5 text-gray-400 shrink-0 ml-1" />

            {/* Service */}
            <div className="flex flex-wrap gap-1.5">
              {SERVICE_FILTERS.map((opt) => {
                const count = opt.value
                  ? PROJECTS.filter((p) => p.service === opt.value).length
                  : PROJECTS.length;
                return (
                  <button
                    key={opt.value}
                    onClick={() => setServiceFilter(opt.value)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-150 ${
                      serviceFilter === opt.value
                        ? "bg-dgc-blue-1 border-dgc-blue-1 text-white shadow-sm"
                        : "bg-white border-gray-200 text-gray-600 hover:border-dgc-blue-1/50 hover:text-gray-900"
                    }`}
                  >
                    {opt.label}
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold ${
                        serviceFilter === opt.value
                          ? "bg-white/20 text-white"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="w-px h-5 bg-gray-200 mx-1 shrink-0" />

            {/* Region */}
            <div className="flex flex-wrap gap-1.5">
              {regions.map((region) => (
                <button
                  key={region}
                  onClick={() => setRegionFilter(regionFilter === region ? "" : region)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-150 ${
                    regionFilter === region
                      ? "bg-dgc-dark-blue-1 border-dgc-dark-blue-1 text-white shadow-sm"
                      : "bg-white border-gray-200 text-gray-600 hover:border-dgc-dark-blue-1/40 hover:text-gray-900"
                  }`}
                >
                  {region}
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          {filtered.length === 0 ? (
            <div className="text-center py-24 text-gray-400">
              <Globe className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p className="font-medium">No projects match the selected filters.</p>
            </div>
          ) : (
            <>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {visible.map((project) => {
                  const service = SERVICES.find((s) => s.id === project.service);
                  const accentColor = service?.color ?? "#3D9DD9";
                  return (
                    <article
                      key={project.id}
                      className="group relative flex flex-col bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 overflow-hidden"
                    >
                      {/* Colored top bar */}
                      <div className="h-1 w-full" style={{ background: accentColor }} />

                      <div className="flex flex-col flex-1 p-5">
                        {/* Top row */}
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            {service && (
                              <span
                                className="text-[10px] font-semibold px-2 py-0.5 rounded-full tracking-wide"
                                style={{
                                  background: `${accentColor}15`,
                                  color: accentColor,
                                  border: `1px solid ${accentColor}30`,
                                }}
                              >
                                {service.shortTitle}
                              </span>
                            )}
                            <span className="text-[10px] font-semibold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                              {project.year}
                            </span>
                          </div>
                          <span className="flex items-center gap-0.5 text-[10px] text-gray-400 shrink-0">
                            <MapPin className="w-2.5 h-2.5" />
                            {project.country}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-gray-900 font-semibold text-sm leading-snug mb-2.5 line-clamp-2 group-hover:text-dgc-blue-2 transition-colors duration-150">
                          {project.title}
                        </h3>

                        {/* Description */}
                        <p className="text-gray-500 text-xs leading-relaxed line-clamp-3 flex-1 mb-4">
                          {project.description}
                        </p>

                        {/* Tags */}
                        {project.tags && project.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-4">
                            {project.tags.slice(0, 3).map((tag) => (
                              <span
                                key={tag}
                                className="text-[10px] text-gray-500 bg-gray-50 border border-gray-100 px-2 py-0.5 rounded-full"
                              >
                                {tag}
                              </span>
                            ))}
                            {project.tags.length > 3 && (
                              <span className="text-[10px] text-gray-400 px-1.5">
                                +{project.tags.length - 3}
                              </span>
                            )}
                          </div>
                        )}

                        {/* Footer */}
                        <div className="flex items-center justify-between pt-3 border-t border-gray-100 gap-2">
                          <span
                            className="text-xs font-semibold truncate"
                            style={{ color: accentColor }}
                          >
                            {project.client}
                          </span>
                          {project.donor && project.donor !== project.client && (
                            <span className="text-[10px] text-gray-400 shrink-0 truncate max-w-[120px]">
                              via {project.donor}
                            </span>
                          )}
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>

              {/* Load More */}
              {remaining > 0 && (
                <div className="mt-14 flex flex-col items-center gap-5">
                  {/* Progress bar */}
                  <div className="flex flex-col items-center gap-2 w-full max-w-xs">
                    <div className="flex justify-between w-full text-xs text-gray-400 font-medium">
                      <span>{visibleCount} shown</span>
                      <span>{filtered.length} total</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-dgc-blue-2 to-dgc-blue-1 rounded-full transition-all duration-500"
                        style={{ width: `${(visibleCount / filtered.length) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Button between two rules */}
                  <div className="flex items-center gap-4 w-full max-w-sm">
                    <div className="flex-1 h-px bg-gray-200" />
                    <button
                      onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                      className="group flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-200 bg-white text-sm font-medium text-gray-600 shadow-sm hover:border-dgc-blue-1 hover:text-dgc-blue-1 hover:shadow-md active:scale-[0.97] transition-all duration-150 whitespace-nowrap"
                    >
                      Load {Math.min(remaining, PAGE_SIZE)} more
                      <ChevronDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform duration-150" />
                    </button>
                    <div className="flex-1 h-px bg-gray-200" />
                  </div>

                  <p className="text-xs text-gray-400">
                    {remaining} project{remaining !== 1 ? "s" : ""} remaining
                  </p>
                </div>
              )}

              {/* All loaded */}
              {remaining <= 0 && filtered.length > PAGE_SIZE && (
                <div className="mt-10 flex items-center justify-center gap-3 text-xs text-gray-400">
                  <div className="h-px flex-1 max-w-[80px] bg-gray-200" />
                  All {filtered.length} projects displayed
                  <div className="h-px flex-1 max-w-[80px] bg-gray-200" />
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </main>
  );
}
