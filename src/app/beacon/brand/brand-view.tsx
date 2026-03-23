"use client";

import Image from "next/image";
import Link from "next/link";
import BeaconShell from "@/components/beacon/beacon-shell";
import type { BeaconUser } from "@/lib/beacon/types";
import { Download, Mail, ExternalLink, Check } from "lucide-react";

type Props = { user: BeaconUser };

const COLORS = [
  { name: "DGC Blue",       hex: "#3D9DD9", label: "Primary · CTA · Highlights", role: "primary" },
  { name: "DGC Blue Deep",  hex: "#177DA6", label: "Secondary · Hover states",    role: "secondary" },
  { name: "Dark Navy",      hex: "#0B2D59", label: "Hero · Sidebar · Footer",     role: "dark" },
  { name: "Dark Navy Alt",  hex: "#0C2C65", label: "Gradient pair",               role: "dark-alt" },
  { name: "DGC Light",      hex: "#50D4F2", label: "Active indicators · Accents", role: "light" },
  { name: "DGC Black",      hex: "#0D0D0D", label: "Text · Dark gradient end",    role: "black" },
];

const TYPOGRAPHY = [
  { weight: "800", label: "ExtraBold", sample: "Powerful Insights." },
  { weight: "700", label: "Bold",      sample: "Proven Delivery." },
  { weight: "600", label: "SemiBold",  sample: "M&E · Capacity · Systems." },
  { weight: "400", label: "Regular",   sample: "Devex Global Consult delivers evidence-based advisory services." },
  { weight: "300", label: "Light",     sample: "Supporting development organisations across Africa." },
];

const BRAND_VALUES = [
  "Evidence-based approach",
  "African context expertise",
  "Collaborative partnerships",
  "Results-oriented delivery",
  "Ethical & transparent practice",
];

export default function BrandView({ user }: Props) {
  return (
    <BeaconShell user={user} title="Brand Manual" subtitle="DGC visual identity, color palette, typography, and brand guidelines">
      <div className="space-y-8 max-w-4xl">

        {/* Hero card */}
        <div
          className="relative rounded-3xl overflow-hidden"
          style={{ background: "linear-gradient(145deg,#040c1a 0%,#071628 25%,#0B2D59 55%,#0f3f7a 75%,#177DA6 100%)" }}
        >
          {/* Fine line-grid texture */}
          <div className="absolute inset-0 opacity-[0.05]"
            style={{ backgroundImage: "linear-gradient(rgba(61,157,217,1) 1px,transparent 1px),linear-gradient(90deg,rgba(61,157,217,1) 1px,transparent 1px)", backgroundSize: "48px 48px" }} />
          {/* Large radial glow — top-right */}
          <div className="absolute -top-32 -right-32 w-[480px] h-[480px] rounded-full opacity-25"
            style={{ background: "radial-gradient(circle at center,#3D9DD9,transparent 65%)" }} />
          {/* Small accent glow — bottom-left */}
          <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full opacity-15"
            style={{ background: "radial-gradient(circle at center,#50D4F2,transparent 65%)" }} />
          {/* Diagonal highlight strip */}
          <div className="absolute inset-0 opacity-[0.04]"
            style={{ background: "linear-gradient(45deg,transparent 30%,rgba(255,255,255,0.8) 50%,transparent 70%)" }} />

          <div className="relative z-10 px-8 sm:px-12 pt-10 pb-10">

            {/* Top bar: badge + logo */}
            <div className="flex items-start justify-between gap-6 mb-10">
              <div className="flex flex-col gap-2">
                <div className="inline-flex items-center gap-2 bg-white/[0.08] border border-white/[0.15] rounded-full px-4 py-1.5 w-fit">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#50D4F2] animate-pulse shrink-0" />
                  <span className="text-white/70 text-[10.5px] font-bold tracking-[0.15em] uppercase">Brand Identity · v2025</span>
                </div>
              </div>
              {/* Logo lockup — glass pill */}
              <div className="shrink-0 bg-white/[0.06] backdrop-blur-sm border border-white/[0.12] rounded-2xl px-6 py-4 flex items-center gap-3">
                <Image src="/logo.svg" alt="DGC Logo" width={150} height={44} className="h-10 w-auto brightness-0 invert" />
              </div>
            </div>

            {/* Headline + tagline */}
            <div className="mb-7">
              <h1 className="text-white font-extrabold leading-[1.05] tracking-tight mb-3"
                style={{ fontSize: "clamp(2rem,4.5vw,3.25rem)" }}>
                Devex Global<br />
                <span style={{ color: "#50D4F2" }}>Consult</span>
              </h1>
              <p className="text-white/60 font-light tracking-[0.06em] text-base mb-4">
                Powerful Insights &nbsp;·&nbsp; Proven Delivery
              </p>
              <p className="text-white/35 text-sm max-w-lg leading-relaxed">
                A pan-African management consultancy delivering evidence-based M&E, capacity strengthening, and systems development services across 22+ countries.
              </p>
            </div>

            {/* Service pills */}
            <div className="flex flex-wrap gap-2 mb-8">
              {["M&E & Learning","Organisational Strengthening","Capacity Building","Systems Development","Safety & Security"].map((s) => (
                <span key={s}
                  className="px-3 py-1.5 rounded-full text-[11px] font-semibold border text-white/65 border-white/[0.12] bg-white/[0.05]">
                  {s}
                </span>
              ))}
            </div>

            {/* Stats row */}
            <div className="flex flex-wrap gap-x-8 gap-y-4 mb-8">
              {[
                { value: "480+", label: "Evaluations" },
                { value: "22+", label: "African countries" },
                { value: "130+", label: "Consultancies" },
                { value: "30+", label: "Years expertise" },
              ].map((s) => (
                <div key={s.label} className="flex items-end gap-2">
                  <p className="text-white text-[1.875rem] font-extrabold leading-none tracking-tight">{s.value}</p>
                  <p className="text-white/35 text-xs pb-1 leading-tight">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="h-px bg-white/10 mb-6" />

            {/* Action row */}
            <div className="flex flex-wrap items-center gap-3">
              <a href="mailto:info@devexglobal.com?subject=DGC Brand Manual"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white border border-white/20 bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-sm">
                <Mail className="w-4 h-4" />
                Request brand files
              </a>
              <a href="/logo.svg" download
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold border transition-all"
                style={{ color: "#50D4F2", borderColor: "rgba(80,212,242,0.3)", background: "rgba(80,212,242,0.08)" }}>
                <Download className="w-4 h-4" />
                Download logo SVG
              </a>
              <a href="/" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white/40 hover:text-white/75 transition-colors">
                <ExternalLink className="w-4 h-4" />
                View live site
              </a>
            </div>
          </div>
        </div>

        {/* Logo section */}
        <div className="bg-white rounded-2xl border border-gray-200/80 shadow-[0_1px_4px_rgba(0,0,0,0.06)] overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100">
            <h2 className="text-gray-900 font-bold text-base">Logo</h2>
            <p className="text-gray-500 text-sm mt-0.5">Primary logo usage across light and dark backgrounds</p>
          </div>
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white border-2 border-dashed border-gray-200 rounded-xl p-8 flex items-center justify-center">
              <Image src="/logo.svg" alt="DGC Logo — Light" width={180} height={54} className="h-12 w-auto" />
            </div>
            <div className="rounded-xl p-8 flex items-center justify-center" style={{ background: "linear-gradient(135deg,#0B2D59,#177DA6)" }}>
              <Image src="/logo.svg" alt="DGC Logo — Dark" width={180} height={54} className="h-12 w-auto brightness-0 invert" />
            </div>
          </div>
          <div className="px-6 py-4 bg-gray-50/60 border-t border-gray-100">
            <div className="flex items-center gap-3">
              <a
                href="/logo.svg"
                download
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                Download SVG
              </a>
              <p className="text-gray-400 text-xs">Use on white or dark backgrounds only. Do not stretch or recolour.</p>
            </div>
          </div>
        </div>

        {/* Color palette */}
        <div className="bg-white rounded-2xl border border-gray-200/80 shadow-[0_1px_4px_rgba(0,0,0,0.06)] overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100">
            <h2 className="text-gray-900 font-bold text-base">Colour Palette</h2>
            <p className="text-gray-500 text-sm mt-0.5">The core DGC colour system defined as Tailwind tokens</p>
          </div>
          <div className="p-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
            {COLORS.map((c) => (
              <div key={c.hex} className="group">
                <div
                  className="h-20 rounded-xl mb-2.5 shadow-sm relative overflow-hidden"
                  style={{ backgroundColor: c.hex }}
                >
                  <button
                    onClick={() => navigator.clipboard.writeText(c.hex)}
                    title="Copy hex"
                    className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/30 backdrop-blur-sm text-white text-[10px] font-mono px-2 py-1 rounded-lg"
                  >
                    {c.hex}
                  </button>
                </div>
                <p className="text-gray-800 text-sm font-semibold">{c.name}</p>
                <p className="text-gray-500 text-xs mt-0.5">{c.label}</p>
                <p className="text-gray-400 text-[11px] font-mono mt-0.5">{c.hex}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Typography */}
        <div className="bg-white rounded-2xl border border-gray-200/80 shadow-[0_1px_4px_rgba(0,0,0,0.06)] overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100">
            <h2 className="text-gray-900 font-bold text-base">Typography</h2>
            <p className="text-gray-500 text-sm mt-0.5">Neometric — primary brand typeface (weights 300–800)</p>
          </div>
          <div className="divide-y divide-gray-50">
            {TYPOGRAPHY.map((t) => (
              <div key={t.weight} className="px-6 py-4 flex items-center justify-between gap-4">
                <div>
                  <p
                    className="text-gray-900 font-neometric leading-tight"
                    style={{ fontWeight: t.weight, fontSize: t.weight === "800" ? "1.5rem" : t.weight === "700" ? "1.25rem" : t.weight === "600" ? "1.1rem" : "0.9rem" }}
                  >
                    {t.sample}
                  </p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-gray-700 text-sm font-semibold">{t.label}</p>
                  <p className="text-gray-400 text-xs font-mono">{t.weight}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Brand values */}
        <div className="bg-white rounded-2xl border border-gray-200/80 shadow-[0_1px_4px_rgba(0,0,0,0.06)] overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100">
            <h2 className="text-gray-900 font-bold text-base">Brand Values</h2>
            <p className="text-gray-500 text-sm mt-0.5">Core principles that guide DGC communication and design</p>
          </div>
          <div className="px-6 py-5 grid sm:grid-cols-2 gap-3">
            {BRAND_VALUES.map((v) => (
              <div key={v} className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-dgc-blue-1/30 hover:bg-dgc-blue-1/5 transition-all">
                <div className="w-6 h-6 rounded-lg bg-dgc-blue-1/10 flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 text-dgc-blue-1" />
                </div>
                <span className="text-gray-700 text-sm font-medium">{v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Contact & social */}
        <div className="bg-white rounded-2xl border border-gray-200/80 shadow-[0_1px_4px_rgba(0,0,0,0.06)] overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100">
            <h2 className="text-gray-900 font-bold text-base">Contact & Social</h2>
          </div>
          <div className="px-6 py-5 grid sm:grid-cols-2 gap-4 text-sm">
            {[
              { label: "Website",  value: "devexglobal.com",     href: "https://devexglobal.com" },
              { label: "Email",    value: "info@devexglobal.com", href: "mailto:info@devexglobal.com" },
              { label: "Phone",    value: "+254 752 889 900",     href: "tel:+254752889900" },
              { label: "Address",  value: "The Mint Hub, Westlands, Nairobi, Kenya", href: null },
              { label: "LinkedIn", value: "linkedin.com/company/devexglobal", href: "https://linkedin.com/company/devexglobal" },
              { label: "Twitter",  value: "@devexglobal", href: "https://twitter.com/devexglobal" },
            ].map(item => (
              <div key={item.label} className="flex items-start gap-2.5">
                <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider mt-0.5 w-16 shrink-0">{item.label}</span>
                {item.href ? (
                  <a href={item.href} target={item.href.startsWith("http") ? "_blank" : "_self"} rel="noopener noreferrer" className="text-dgc-blue-1 hover:underline flex items-center gap-1">
                    {item.value}
                    {item.href.startsWith("http") && <ExternalLink className="w-3 h-3 opacity-50" />}
                  </a>
                ) : (
                  <span className="text-gray-600">{item.value}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Usage guidelines */}
        <div className="bg-white rounded-2xl border border-gray-200/80 shadow-[0_1px_4px_rgba(0,0,0,0.06)] overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100">
            <h2 className="text-gray-900 font-bold text-base">Usage Guidelines</h2>
          </div>
          <div className="px-6 py-5 grid sm:grid-cols-2 gap-4">
            {[
              { title: "Do", items: ["Use the logo on white or dark navy only","Maintain clear space around the logo","Use Neometric as the primary typeface","Adhere to the defined colour palette","Ensure WCAG AA contrast on all text"] },
              { title: "Don't", items: ["Stretch or distort the logo","Use brand colours outside the palette","Mix Neometric with conflicting fonts","Use the logo on busy backgrounds","Apply colour filters to the logo"] },
            ].map(section => (
              <div key={section.title} className={`rounded-xl p-4 ${section.title === "Do" ? "bg-emerald-50 border border-emerald-100" : "bg-red-50 border border-red-100"}`}>
                <p className={`font-bold text-sm mb-3 ${section.title === "Do" ? "text-emerald-700" : "text-red-600"}`}>{section.title}</p>
                <ul className="space-y-2">
                  {section.items.map(item => (
                    <li key={item} className={`flex items-start gap-2 text-sm ${section.title === "Do" ? "text-emerald-700" : "text-red-600"}`}>
                      <span className="mt-1 shrink-0">{section.title === "Do" ? "✓" : "✗"}</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Link to main site */}
        <div className="bg-white rounded-2xl border border-gray-200/80 shadow-[0_1px_4px_rgba(0,0,0,0.06)] p-5 flex items-center justify-between">
          <p className="text-gray-600 text-sm">View the live DGC website to see the brand in context.</p>
          <Link href="/" target="_blank" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white" style={{ background: "linear-gradient(135deg,#3D9DD9,#177DA6)" }}>
            Open Site <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </BeaconShell>
  );
}
