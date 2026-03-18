"use client";

import dynamic from "next/dynamic";
import { useState, useMemo } from "react";
import { Filter, X, Globe } from "lucide-react";
import { PROJECTS, COUNTRIES, SERVICES } from "@/lib/data";

// Leaflet must not run on the server
const PortfolioMap = dynamic(
  () => import("@/components/portfolio/PortfolioMap"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[500px] rounded-2xl bg-gray-100 animate-pulse flex items-center justify-center">
        <Globe className="w-10 h-10 text-gray-300 animate-spin" style={{ animationDuration: "3s" }} />
      </div>
    ),
  },
);

const allCountries = [...COUNTRIES.africa, ...COUNTRIES.asia];

const SERVICE_FILTERS = [
  { value: "", label: "All Services" },
  ...SERVICES.map((s) => ({ value: s.id, label: s.shortTitle })),
];

export default function PortfolioPage() {
  const [serviceFilter, setServiceFilter] = useState("");
  const [regionFilter, setRegionFilter] = useState("");

  const regions = useMemo(() => {
    return Array.from(new Set(PROJECTS.map((p) => p.region)));
  }, []);

  const filtered = useMemo(() => {
    return PROJECTS.filter((p) => {
      if (serviceFilter && p.service !== serviceFilter) return false;
      if (regionFilter && p.region !== regionFilter) return false;
      return true;
    });
  }, [serviceFilter, regionFilter]);

  const hasFilter = serviceFilter || regionFilter;

  return (
    <main className="min-h-screen bg-white text-gray-900">

      {/* Hero */}
      <section className="pt-28 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-dgc-dark-blue-1/8 via-blue-50/50 to-white" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_10%_50%,rgba(61,157,217,0.06),transparent)]" />
        <div className="relative max-w-5xl mx-auto px-6 sm:px-10">
          <p className="text-dgc-blue-1 text-xs font-semibold tracking-[0.18em] uppercase mb-4">
            Digital Footprint
          </p>
          <h1
            className="font-extrabold text-gray-900 leading-tight mb-4"
            style={{ fontSize: "clamp(2rem,5vw,3.5rem)" }}
          >
            Our Portfolio &{" "}
            <span className="text-dgc-blue-1">Global Footprint</span>
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed max-w-2xl">
            DGC has delivered 480+ evaluations, assessments, and consultancies across 22 African and 4 Asian
            countries. Explore our project portfolio and digital footprint below.
          </p>
        </div>
      </section>

      {/* Interactive Map */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6 sm:px-10">
          <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
            <PortfolioMap projects={PROJECTS} countries={allCountries} />
          </div>
          <p className="text-gray-400 text-xs text-center mt-3">
            Click a country marker to see project details. Larger circles = more projects in that country.
          </p>
        </div>
      </section>

      {/* Filters + Cards */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6 sm:px-10">

          {/* Filter bar */}
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <Filter className="w-4 h-4 text-gray-400 shrink-0" />

            {/* Service filters */}
            <div className="flex flex-wrap gap-2">
              {SERVICE_FILTERS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setServiceFilter(opt.value)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 ${
                    serviceFilter === opt.value
                      ? "bg-dgc-blue-1 border-dgc-blue-1 text-white"
                      : "border-gray-200 text-gray-500 hover:text-gray-900 hover:border-dgc-blue-1/40"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            {/* Region filters */}
            <div className="flex flex-wrap gap-2 border-l border-gray-200 pl-3">
              {regions.map((region) => (
                <button
                  key={region}
                  onClick={() => setRegionFilter(regionFilter === region ? "" : region)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 ${
                    regionFilter === region
                      ? "bg-dgc-blue-2 border-dgc-blue-2 text-white"
                      : "border-gray-200 text-gray-500 hover:text-gray-900 hover:border-dgc-blue-2/40"
                  }`}
                >
                  {region}
                </button>
              ))}
            </div>

            {hasFilter && (
              <button
                onClick={() => { setServiceFilter(""); setRegionFilter(""); }}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs text-gray-400 hover:text-gray-700 border border-gray-200 hover:border-gray-300 transition-colors"
              >
                <X className="w-3 h-3" /> Clear
              </button>
            )}
          </div>

          <p className="text-gray-400 text-xs mb-5">
            Showing {filtered.length} of {PROJECTS.length} projects
          </p>

          {/* Project cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((project) => {
              const service = SERVICES.find((s) => s.id === project.service);
              return (
                <div
                  key={project.id}
                  className="group p-5 rounded-2xl bg-white border border-gray-200 shadow-sm hover:border-dgc-blue-1/30 hover:shadow-md transition-all duration-300 h-full flex flex-col"
                  style={{ borderTopColor: service?.color ?? "#3D9DD9", borderTopWidth: "2px" }}
                >
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="flex flex-wrap gap-1.5">
                      {service && (
                        <span
                          className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full"
                          style={{
                            background: `${service.color}20`,
                            color: service.color,
                            border: `1px solid ${service.color}40`,
                          }}
                        >
                          {service.shortTitle}
                        </span>
                      )}
                      <span className="bg-gray-100 text-gray-500 text-[10px] font-medium px-2.5 py-0.5 rounded-full">
                        {project.year}
                      </span>
                    </div>
                    <span className="text-gray-400 text-xs shrink-0">{project.country}</span>
                  </div>

                  <h3 className="text-gray-900 font-semibold text-sm leading-snug flex-1 mb-3">
                    {project.title}
                  </h3>

                  <p className="text-gray-500 text-xs leading-relaxed mb-4">{project.description}</p>

                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <span className="text-dgc-blue-1 text-xs font-medium">{project.client}</span>
                    {project.donor && (
                      <span className="text-gray-400 text-xs">Funded by {project.donor}</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16 text-gray-400">
              <p>No projects match the selected filters.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
