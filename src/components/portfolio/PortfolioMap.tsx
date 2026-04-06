"use client";

import { useRef, useState } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type { Project, CountryPoint } from "@/lib/types";

// ── Service colour registry ────────────────────────────────────────────────────
const SERVICE_META: Record<string, { label: string; color: string; border: string }> = {
  "organizational-strengthening": { label: "Org. Strengthening",   color: "#3D9DD9", border: "#177DA6" },
  "capacity-strengthening":       { label: "Capacity Strengthening", color: "#177DA6", border: "#0B5C7A" },
  "system-strengthening":         { label: "System Strengthening",   color: "#50D4F2", border: "#29AABB" },
  "safety-security":              { label: "Safety & Security",       color: "#0B2D59", border: "#061A35" },
};

// ── Helpers ───────────────────────────────────────────────────────────────────
function groupByCountry(projects: Project[]): Record<string, Project[]> {
  return projects.reduce((acc, p) => {
    const isos = p.isoList ?? [p.iso];
    for (const iso of isos) {
      if (!acc[iso]) acc[iso] = [];
      acc[iso].push(p);
    }
    return acc;
  }, {} as Record<string, Project[]>);
}

function getDominantService(projects: Project[]): string {
  const counts: Record<string, number> = {};
  for (const p of projects) counts[p.service] = (counts[p.service] ?? 0) + 1;
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "";
}

function markerRadius(count: number) {
  return Math.min(7 + count * 1.8, 20);
}

// ── Custom Controls (must live inside <MapContainer>) ─────────────────────────
function ZoomControls() {
  const map = useMap();
  const btnBase: React.CSSProperties = {
    width: 36, height: 36,
    background: "#ffffff",
    border: "1.5px solid #e2e8f0",
    borderRadius: 8,
    cursor: "pointer",
    fontSize: 20,
    fontWeight: 700,
    color: "#0B2D59",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 2px 10px rgba(11,45,89,0.13)",
    transition: "background 0.15s, color 0.15s, box-shadow 0.15s",
    lineHeight: 1,
  };
  const hover = (e: React.MouseEvent<HTMLButtonElement>, on: boolean) => {
    const el = e.currentTarget;
    el.style.background = on ? "#3D9DD9" : "#fff";
    el.style.color = on ? "#fff" : "#0B2D59";
    el.style.boxShadow = on ? "0 4px 16px rgba(61,157,217,0.35)" : "0 2px 10px rgba(11,45,89,0.13)";
  };
  return (
    <div style={{ position: "absolute", top: 16, right: 16, zIndex: 1000, display: "flex", flexDirection: "column", gap: 4 }}>
      {([
        { lbl: "+", fn: () => map.zoomIn() },
        { lbl: "−", fn: () => map.zoomOut() },
      ] as const).map(({ lbl, fn }) => (
        <button key={lbl} onClick={fn} style={btnBase}
          onMouseEnter={(e) => hover(e, true)}
          onMouseLeave={(e) => hover(e, false)}
        >{lbl}</button>
      ))}
      {/* Reset view */}
      <div style={{ marginTop: 4 }}>
        <button
          onClick={() => map.setView([5, 25], 3, { animate: true })}
          style={{ ...btnBase, fontSize: 15 }}
          title="Reset view"
          onMouseEnter={(e) => hover(e, true)}
          onMouseLeave={(e) => hover(e, false)}
        >⌖</button>
      </div>
    </div>
  );
}

// ── Props ──────────────────────────────────────────────────────────────────────
interface PortfolioMapProps {
  projects: Project[];
  countries: CountryPoint[];
}

// ── Main component ─────────────────────────────────────────────────────────────
export default function PortfolioMap({ projects, countries }: PortfolioMapProps) {
  const grouped = groupByCountry(projects);
  const activeCountries = countries.filter((c) => (grouped[c.iso] ?? []).length > 0);

  // Stats for the overlay
  const totalProjects = projects.length;
  const countriesWithProjects = activeCountries.length;

  return (
    <div style={{ position: "relative", width: "100%", height: "860px" }}>
      {/* ── Stats overlay — top-left ─────────────────────────────────── */}
      <div style={{
        position: "absolute", top: 16, left: 16, zIndex: 1000,
        background: "rgba(255,255,255,0.95)",
        backdropFilter: "blur(8px)",
        borderRadius: 12,
        padding: "10px 14px",
        boxShadow: "0 4px 24px rgba(11,45,89,0.12)",
        border: "1px solid rgba(61,157,217,0.18)",
        display: "flex",
        gap: 20,
        alignItems: "center",
      }}>
        {[
          { val: `${totalProjects}`, lbl: "Projects" },
          { val: `${countriesWithProjects}`, lbl: "Countries" },
        ].map(({ val, lbl }) => (
          <div key={lbl} style={{ textAlign: "center" }}>
            <div style={{ fontSize: 18, fontWeight: 800, color: "#3D9DD9", lineHeight: 1.1 }}>{val}</div>
            <div style={{ fontSize: 10, color: "#64748b", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", marginTop: 2 }}>{lbl}</div>
          </div>
        ))}
      </div>

      {/* ── Legend — bottom-left ─────────────────────────────────────── */}
      <div style={{
        position: "absolute", bottom: 32, left: 16, zIndex: 1000,
        background: "rgba(255,255,255,0.97)",
        backdropFilter: "blur(8px)",
        borderRadius: 12,
        padding: "12px 16px",
        boxShadow: "0 4px 24px rgba(11,45,89,0.12)",
        border: "1px solid rgba(61,157,217,0.18)",
        minWidth: 200,
      }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>
          Service Areas
        </div>
        {Object.entries(SERVICE_META).map(([, { label, color }]) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 7 }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: color, flexShrink: 0, boxShadow: `0 0 0 2px ${color}30` }} />
            <span style={{ fontSize: 12, color: "#374151", fontWeight: 500 }}>{label}</span>
          </div>
        ))}
        <div style={{ borderTop: "1px solid #f1f5f9", marginTop: 8, paddingTop: 8, display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#cbd5e1", flexShrink: 0 }} />
          <span style={{ fontSize: 12, color: "#94a3b8", fontWeight: 500 }}>Country of operation</span>
        </div>
        {/* Size key */}
        <div style={{ borderTop: "1px solid #f1f5f9", marginTop: 8, paddingTop: 8 }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>Marker size</div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 10 }}>
            {[1, 4, 8].map((n) => (
              <div key={n} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                <div style={{
                  width: markerRadius(n) * 2,
                  height: markerRadius(n) * 2,
                  borderRadius: "50%",
                  background: "#3D9DD9",
                  opacity: 0.8,
                }} />
                <span style={{ fontSize: 9, color: "#94a3b8", fontWeight: 600 }}>{n === 8 ? "8+" : n}</span>
              </div>
            ))}
            <span style={{ fontSize: 10, color: "#94a3b8", marginBottom: 2 }}>projects</span>
          </div>
        </div>
      </div>

      {/* ── Leaflet Map ───────────────────────────────────────────────── */}
      <MapContainer
        center={[5, 25]}
        zoom={3}
        style={{ height: "100%", width: "100%", background: "#f8fafc" }}
        zoomControl={false}
        scrollWheelZoom={false}
        attributionControl={true}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://carto.com">CARTO</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />

        <ZoomControls />

        {countries.map((country) => {
          const countryProjects = grouped[country.iso] ?? [];
          const hasProjects = countryProjects.length > 0;
          const dominant = getDominantService(countryProjects);
          const meta = SERVICE_META[dominant];
          const fillColor = hasProjects ? (meta?.color ?? "#3D9DD9") : "#94a3b8";
          const strokeColor = hasProjects ? (meta?.border ?? "#177DA6") : "#cbd5e1";
          const radius = hasProjects ? markerRadius(countryProjects.length) : 4;

          // Group projects by service for popup
          const byService: Record<string, Project[]> = {};
          for (const p of countryProjects) {
            if (!byService[p.service]) byService[p.service] = [];
            byService[p.service].push(p);
          }

          return (
            <CircleMarker
              key={country.iso}
              center={[country.lat, country.lng]}
              radius={radius}
              pathOptions={{
                fillColor,
                fillOpacity: hasProjects ? 0.88 : 0.28,
                color: strokeColor,
                weight: hasProjects ? 1.5 : 0.8,
                opacity: hasProjects ? 1 : 0.4,
              }}
              eventHandlers={{
                mouseover: (e) => {
                  if (hasProjects) e.target.setStyle({ fillOpacity: 1, weight: 2.5 });
                },
                mouseout: (e) => {
                  if (hasProjects) e.target.setStyle({ fillOpacity: 0.88, weight: 1.5 });
                },
              }}
            >
              {hasProjects && (
                <Popup maxWidth={380} minWidth={320} autoPan>
                  <div style={{ fontFamily: "inherit", padding: 0, margin: 0 }}>
                    {/* Header */}
                    <div style={{
                      background: `linear-gradient(135deg, ${fillColor}, ${strokeColor})`,
                      borderRadius: "8px 8px 0 0",
                      padding: "12px 16px",
                      marginBottom: 0,
                    }}>
                      <div style={{ color: "#fff", fontWeight: 800, fontSize: 15, lineHeight: 1.2 }}>
                        {country.name}
                      </div>
                      <div style={{ color: "rgba(255,255,255,0.8)", fontSize: 11, marginTop: 2, fontWeight: 500 }}>
                        {countryProjects.length} project{countryProjects.length !== 1 ? "s" : ""} across {Object.keys(byService).length} service area{Object.keys(byService).length !== 1 ? "s" : ""}
                      </div>
                    </div>

                    {/* Project list grouped by service */}
                    <div style={{ maxHeight: 320, overflowY: "auto", padding: "10px 14px" }}>
                      {Object.entries(byService).map(([svc, svcProjects]) => {
                        const svcMeta = SERVICE_META[svc];
                        return (
                          <div key={svc} style={{ marginBottom: 12 }}>
                            {/* Service header */}
                            <div style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 6,
                              marginBottom: 6,
                              paddingBottom: 4,
                              borderBottom: `1.5px solid ${svcMeta?.color ?? "#3D9DD9"}30`,
                            }}>
                              <div style={{ width: 8, height: 8, borderRadius: "50%", background: svcMeta?.color ?? "#3D9DD9", flexShrink: 0 }} />
                              <span style={{ fontSize: 10, fontWeight: 700, color: svcMeta?.color ?? "#3D9DD9", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                                {svcMeta?.label ?? svc}
                              </span>
                            </div>
                            {/* Projects */}
                            {svcProjects.map((p) => (
                              <div key={p.id} style={{
                                padding: "6px 0 6px 12px",
                                borderLeft: `2.5px solid ${svcMeta?.color ?? "#3D9DD9"}`,
                                marginBottom: 6,
                              }}>
                                <div style={{ fontSize: 12, fontWeight: 600, color: "#1e293b", lineHeight: 1.4, marginBottom: 2 }}>
                                  {p.title}
                                </div>
                                <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                                  <span style={{ fontSize: 10, color: "#94a3b8", fontWeight: 600 }}>{p.client}</span>
                                  <span style={{
                                    fontSize: 9.5,
                                    background: `${svcMeta?.color ?? "#3D9DD9"}18`,
                                    color: svcMeta?.color ?? "#3D9DD9",
                                    fontWeight: 700,
                                    padding: "1px 6px",
                                    borderRadius: 999,
                                    border: `1px solid ${svcMeta?.color ?? "#3D9DD9"}30`,
                                  }}>{p.year}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </Popup>
              )}
              {!hasProjects && (
                <Popup maxWidth={220} autoPan>
                  <div style={{ fontFamily: "inherit", padding: "10px 14px" }}>
                    <div style={{ fontWeight: 700, fontSize: 13, color: "#0B2D59", marginBottom: 4 }}>{country.name}</div>
                    <div style={{ fontSize: 11, color: "#94a3b8" }}>Country of operation</div>
                  </div>
                </Popup>
              )}
            </CircleMarker>
          );
        })}
      </MapContainer>
    </div>
  );
}
