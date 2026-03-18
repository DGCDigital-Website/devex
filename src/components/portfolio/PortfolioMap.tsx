"use client";

import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type { Project, CountryPoint } from "@/lib/types";

interface PortfolioMapProps {
  projects: Project[];
  countries: CountryPoint[];
}

function groupByCountry(projects: Project[]): Record<string, Project[]> {
  return projects.reduce(
    (acc, p) => {
      if (!acc[p.iso]) acc[p.iso] = [];
      acc[p.iso].push(p);
      return acc;
    },
    {} as Record<string, Project[]>,
  );
}

export default function PortfolioMap({ projects, countries }: PortfolioMapProps) {
  const grouped = groupByCountry(projects);

  return (
    <MapContainer
      center={[5, 25]}
      zoom={3}
      style={{ height: "500px", width: "100%", background: "#0B2D59" }}
      zoomControl
      scrollWheelZoom={false}
      attributionControl
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://carto.com">CARTO</a>'
      />

      {countries.map((country) => {
        const countryProjects = grouped[country.iso] || [];
        const hasProjects = countryProjects.length > 0;
        return (
          <CircleMarker
            key={country.iso}
            center={[country.lat, country.lng]}
            radius={hasProjects ? Math.min(6 + countryProjects.length * 2, 14) : 5}
            pathOptions={{
              fillColor: hasProjects ? "#50D4F2" : "#3D9DD9",
              fillOpacity: hasProjects ? 0.9 : 0.4,
              color: hasProjects ? "#50D4F2" : "#3D9DD9",
              weight: 1,
              opacity: 0.6,
            }}
          >
            <Popup>
              <div
                style={{
                  minWidth: "180px",
                  background: "#0B2D59",
                  border: "1px solid rgba(61,157,217,0.3)",
                  borderRadius: "8px",
                  padding: "10px 12px",
                }}
              >
                <strong style={{ color: "#50D4F2", fontSize: "13px", display: "block", marginBottom: "6px" }}>
                  {country.name}
                </strong>
                {countryProjects.length > 0 ? (
                  <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                    {countryProjects.map((p) => (
                      <li
                        key={p.id}
                        style={{
                          fontSize: "11px",
                          color: "rgba(255,255,255,0.7)",
                          marginBottom: "5px",
                          paddingLeft: "8px",
                          borderLeft: "2px solid #3D9DD9",
                          lineHeight: "1.4",
                        }}
                      >
                        {p.title} <span style={{ color: "#3D9DD9" }}>({p.year})</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", margin: 0 }}>
                    Country of operation
                  </p>
                )}
              </div>
            </Popup>
          </CircleMarker>
        );
      })}
    </MapContainer>
  );
}
