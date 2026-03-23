import Image from "next/image";
import Link from "next/link";
import { CheckCircle, XCircle, Download, ExternalLink } from "lucide-react";

/* ═══════════════════════════════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════════════════════════════ */

const COLORS = [
  {
    name: "Dark Navy",
    token: "#0B2D59",
    hex: "#0B2D59",
    pantone: "Pantone 281 C",
    cmyk: "100 · 60 · 0 · 60",
    rgb: "11, 45, 89",
    role: "Hero backgrounds, formal documents, footers",
    onDark: false,
  },
  {
    name: "Ocean Blue",
    token: "#3D9DD9",
    hex: "#3D9DD9",
    pantone: "Pantone 299 C",
    cmyk: "72 · 21 · 0 · 15",
    rgb: "61, 157, 217",
    role: "Primary CTAs, interactive highlights, links",
    onDark: false,
  },
  {
    name: "Deep Blue",
    token: "#177DA6",
    hex: "#177DA6",
    pantone: "Pantone 7690 C",
    cmyk: "86 · 26 · 0 · 35",
    rgb: "23, 125, 166",
    role: "Hover states, secondary actions, pressed",
    onDark: false,
  },
  {
    name: "Aqua Tint",
    token: "#50D4F2",
    hex: "#50D4F2",
    pantone: "Pantone 298 C",
    cmyk: "67 · 2 · 0 · 5",
    rgb: "80, 212, 242",
    role: "Decorative accents, active indicators",
    onDark: true,
  },
  {
    name: "Near Black",
    token: "#0D0D0D",
    hex: "#0D0D0D",
    pantone: "Pantone Black C",
    cmyk: "0 · 0 · 0 · 95",
    rgb: "13, 13, 13",
    role: "Body text, maximum-contrast elements",
    onDark: false,
  },
  {
    name: "White",
    token: "#FFFFFF",
    hex: "#FFFFFF",
    pantone: "—",
    cmyk: "0 · 0 · 0 · 0",
    rgb: "255, 255, 255",
    role: "Page backgrounds, reversed text on dark",
    onDark: true,
    bordered: true,
  },
];

const TYPE_SCALE = [
  { label: "Display", sizeClass: "text-[2.5rem]", weight: "font-neometric font-black", color: "text-[#0B2D59]", sample: "Powerful Insights" },
  { label: "H1", sizeClass: "text-[1.75rem]", weight: "font-neometric font-bold", color: "text-[#0B2D59]", sample: "Organisational Strengthening" },
  { label: "H2", sizeClass: "text-[1.25rem]", weight: "font-neometric font-semibold", color: "text-gray-800", sample: "Capacity & Systems" },
  { label: "H3", sizeClass: "text-[1rem]", weight: "font-neometric font-semibold", color: "text-gray-700", sample: "Evidence-Based Evaluation" },
  { label: "Body", sizeClass: "text-[0.9375rem]", weight: "font-sans font-normal", color: "text-gray-600", sample: "We deliver measurable outcomes across 22 African countries, grounded in rigorous evidence and deep contextual knowledge." },
  { label: "Caption", sizeClass: "text-[0.75rem]", weight: "font-sans font-medium", color: "text-gray-400", sample: "30+ years · 480+ evaluations · 98% client satisfaction" },
];

const PILLARS = [
  { label: "Evidence-Based", icon: "⬡", body: "Every recommendation is rooted in data. Findings drive conclusions — not assumptions or precedent." },
  { label: "African Expertise", icon: "◎", body: "Three decades operating across 22 African nations. Our context is earned, not assumed." },
  { label: "Proven Delivery", icon: "◈", body: "480+ evaluations and 130+ consultancies completed. We don't advise — we deliver outcomes." },
  { label: "Partnership", icon: "⬟", body: "Co-creating solutions that build lasting institutional capacity well beyond the engagement." },
];

const DOS = [
  "Use approved DGC logo files only — SVG for digital, vector EPS/PDF for print.",
  "Maintain clear space equal to the cap-height of the 'D' on all four sides of the mark.",
  "Use Dark Navy (#0B2D59) for formal documents and professional presentations.",
  "Apply Neometric for all headlines and Inter for all body copy, captions, and UI text.",
  "Verify WCAG 2.1 AA contrast (≥ 4.5:1) for all text placed on coloured backgrounds.",
  "Scale logos proportionally — lock aspect ratio before resizing.",
];

const DONTS = [
  "Do not recolour the logo outside the six approved brand palette values.",
  "Do not place the logo on visually busy or low-contrast backgrounds.",
  "Do not render the mark below 80 px wide in any digital context.",
  "Do not apply drop shadows, glows, outlines, or any graphic effects to the logo.",
  "Do not typeset brand communications in any font other than Neometric or Inter.",
  "Do not alter, stretch, rotate, or rearrange any element of the logo mark.",
];

const METRICS = [
  { v: "480+", l: "Evaluations" },
  { v: "130+", l: "Consultancies" },
  { v: "22", l: "African Countries" },
  { v: "98%", l: "Satisfaction Rate" },
];

/* ═══════════════════════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════════════════════ */

export default function BrandManualPage() {
  return (
    <div className="w-full space-y-6 pb-4">

      {/* ── 1. HERO COVER ─────────────────────────────────────────────────── */}
      <div className="relative w-full rounded-2xl overflow-hidden bg-[#0B2D59]" style={{ minHeight: 340 }}>
        {/* Layered radial glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 -right-24 w-[480px] h-[480px] rounded-full bg-[#3D9DD9]/15 blur-3xl" />
          <div className="absolute -bottom-16 -left-16 w-[320px] h-[320px] rounded-full bg-[#177DA6]/20 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#0C2C65]/60 blur-3xl" />
        </div>

        {/* Dot grid texture */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{ backgroundImage: "radial-gradient(circle, #3D9DD9 1px, transparent 1px)", backgroundSize: "28px 28px" }}
        />

        <div className="relative z-10 px-8 md:px-12 py-10 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
          {/* Left: wordmark */}
          <div className="flex-1 min-w-0">
            <div className="inline-flex items-center gap-2 bg-[#3D9DD9]/15 border border-[#3D9DD9]/25 rounded-full px-3 py-1 mb-7">
              <span className="w-1.5 h-1.5 rounded-full bg-[#50D4F2] flex-shrink-0" />
              <span className="text-[10px] font-bold text-[#50D4F2] uppercase tracking-[0.18em]">
                Brand Identity Guidelines · v1.0
              </span>
            </div>

            <h1 className="font-neometric font-black text-white leading-[0.9] tracking-tight"
              style={{ fontSize: "clamp(3rem, 6vw, 5rem)" }}>
              Devex<br />
              <span
                style={{ WebkitTextStroke: "1px rgba(61,157,217,0.6)", color: "transparent", display: "block" }}
                className="font-neometric font-black"
              >
                Global
              </span>
              Consult
            </h1>

            <p className="mt-5 text-[#50D4F2]/80 text-sm tracking-[0.22em] uppercase font-light">
              Powerful Insights&nbsp;&nbsp;·&nbsp;&nbsp;Proven Delivery
            </p>
          </div>

          {/* Right: logo + metrics */}
          <div className="flex flex-col gap-8 lg:items-end">
            <Image src="/logo-dark.svg" alt="DGC" width={140} height={40} className="h-10 w-auto" />

            <div className="grid grid-cols-4 gap-6">
              {METRICS.map((m) => (
                <div key={m.l} className="text-center lg:text-right">
                  <p className="font-neometric font-black text-[#3D9DD9] text-xl leading-none">{m.v}</p>
                  <p className="text-white/45 text-[11px] mt-1 font-light leading-tight">{m.l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#3D9DD9]/40 to-transparent" />
      </div>

      {/* ── BODY GRID ─────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_380px] gap-6">

        {/* ── LEFT COLUMN ─────────────────────────────────────────────────── */}
        <div className="space-y-6 min-w-0">

          {/* ── 2. COLOUR PALETTE ───────────────────────────────────────── */}
          <Section label="02" title="Colour Palette" sub="Use only these values. No unsanctioned tints, CMYK approximations, or off-brand shades.">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {COLORS.map((c) => (
                <div key={c.hex}
                  className="group rounded-xl overflow-hidden border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                  {/* Swatch */}
                  <div
                    className="h-[88px] w-full relative"
                    style={{
                      backgroundColor: c.hex,
                      border: c.bordered ? "1px solid #e5e7eb" : undefined,
                    }}
                  >
                    <span
                      className="absolute bottom-2.5 left-3 font-neometric font-black text-[1.4rem] leading-none opacity-20 select-none"
                      style={{ color: c.onDark ? "#0B2D59" : "#ffffff" }}
                    >
                      Aa
                    </span>
                    <code
                      className="absolute top-2.5 right-2.5 text-[10px] font-mono px-1.5 py-0.5 rounded"
                      style={{
                        background: c.onDark ? "rgba(11,45,89,0.15)" : "rgba(255,255,255,0.15)",
                        color: c.onDark ? "#0B2D59" : "#ffffff",
                      }}
                    >
                      {c.hex}
                    </code>
                  </div>
                  {/* Meta */}
                  <div className="bg-white px-3 py-3">
                    <p className="text-[13px] font-bold text-gray-900 leading-snug">{c.name}</p>
                    <p className="text-[11px] text-[#3D9DD9] font-medium mt-0.5">{c.pantone}</p>
                    <p className="text-[10.5px] text-gray-400 mt-0.5">RGB {c.rgb}</p>
                    <p className="text-[10.5px] text-gray-300 mt-0.5">CMYK {c.cmyk}</p>
                    <p className="text-[10.5px] text-gray-500 mt-2 leading-relaxed">{c.role}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Gradient bar */}
            <div className="mt-1 rounded-xl overflow-hidden flex h-10 border border-gray-100">
              {(["#0B2D59", "#177DA6", "#3D9DD9", "#50D4F2"] as const).map((hex) => (
                <div key={hex} className="flex-1 flex items-center justify-center" style={{ backgroundColor: hex }}>
                  <code className="text-[10px] font-mono text-white/60">{hex}</code>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-gray-400 text-center -mt-0.5">
              Brand gradient sequence — dark to light
            </p>
          </Section>

          {/* ── 3. TYPOGRAPHY ───────────────────────────────────────────── */}
          <Section label="03" title="Typography" sub="Two typefaces. Neometric for authority. Inter for clarity. Never mix in a third.">
            {/* Font cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              {/* Neometric */}
              <div className="rounded-xl bg-[#0B2D59] overflow-hidden">
                <div className="px-6 pt-6 pb-4">
                  <p className="font-neometric font-black text-white/20 text-[5rem] leading-none select-none">Aa</p>
                </div>
                <div className="px-6 pb-6 border-t border-white/10 pt-4">
                  <p className="font-neometric font-bold text-white text-base">Neometric</p>
                  <p className="text-[#50D4F2] text-[11px] mt-0.5">Display · Headlines · Pull-quotes</p>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {["Light", "Regular", "Medium", "SemiBold", "Bold", "ExtraBold", "Black"].map((w) => (
                      <span key={w} className="text-[10px] bg-white/10 text-white/60 px-2 py-0.5 rounded">{w}</span>
                    ))}
                  </div>
                  <p className="text-white/40 text-[10px] mt-3">woff · woff2 · ttf — self-hosted</p>
                </div>
              </div>

              {/* Inter */}
              <div className="rounded-xl bg-gray-50 border border-gray-100 overflow-hidden">
                <div className="px-6 pt-6 pb-4">
                  <p className="font-sans font-bold text-gray-200 text-[5rem] leading-none select-none">Aa</p>
                </div>
                <div className="px-6 pb-6 border-t border-gray-100 pt-4">
                  <p className="font-sans font-bold text-gray-900 text-base">Inter</p>
                  <p className="text-[#3D9DD9] text-[11px] mt-0.5">Body · UI labels · Captions</p>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {["Regular 400", "Medium 500", "SemiBold 600", "Bold 700"].map((w) => (
                      <span key={w} className="text-[10px] bg-white border border-gray-200 text-gray-500 px-2 py-0.5 rounded">{w}</span>
                    ))}
                  </div>
                  <p className="text-gray-400 text-[10px] mt-3">Google Fonts CDN — variable font</p>
                </div>
              </div>
            </div>

            {/* Type scale */}
            <div className="rounded-xl border border-gray-100 bg-white overflow-hidden">
              <div className="px-5 py-3 border-b border-gray-50">
                <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest">Type Scale</p>
              </div>
              <div className="divide-y divide-gray-50">
                {TYPE_SCALE.map((row) => (
                  <div key={row.label} className="flex items-baseline gap-5 px-5 py-3 hover:bg-gray-50/60 transition-colors">
                    <span className="text-[10px] font-mono text-gray-300 w-12 flex-shrink-0">{row.label}</span>
                    <span className={`${row.sizeClass} ${row.weight} ${row.color} leading-tight truncate`}>{row.sample}</span>
                  </div>
                ))}
              </div>
            </div>
          </Section>

          {/* ── 4. LOGO GUIDELINES ──────────────────────────────────────── */}
          <Section label="04" title="Logo Guidelines" sub="Never alter the mark's proportions, colours, or elements. SVG only for digital.">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Primary */}
              <div className="rounded-xl border border-gray-100 bg-white p-8 flex flex-col items-center gap-5">
                <Image src="/logo.svg" alt="DGC Logo (Primary)" width={180} height={52} className="h-12 w-auto" />
                <div className="text-center">
                  <p className="text-[13px] font-bold text-gray-800">Primary Mark</p>
                  <p className="text-[11px] text-gray-400 mt-1">Light & white backgrounds</p>
                  <code className="inline-block mt-2 text-[10px] bg-gray-50 border border-gray-100 text-gray-500 px-2.5 py-1 rounded-lg">/logo.svg</code>
                </div>
              </div>
              {/* Reversed */}
              <div className="rounded-xl bg-[#0B2D59] p-8 flex flex-col items-center gap-5">
                <Image src="/logo-dark.svg" alt="DGC Logo (Reversed)" width={180} height={52} className="h-12 w-auto" />
                <div className="text-center">
                  <p className="text-[13px] font-bold text-white">Reversed Mark</p>
                  <p className="text-[11px] text-white/40 mt-1">Dark & navy backgrounds</p>
                  <code className="inline-block mt-2 text-[10px] bg-white/10 text-white/60 px-2.5 py-1 rounded-lg">/logo-dark.svg</code>
                </div>
              </div>
            </div>

            {/* Rules grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { rule: "Clear space", detail: "= cap-height of 'D' on all four sides" },
                { rule: "Digital min", detail: "80 px wide at 72 dpi" },
                { rule: "Print min", detail: "20 mm at 300 dpi" },
                { rule: "Formats", detail: "SVG digital · EPS/PDF print" },
              ].map((r) => (
                <div key={r.rule} className="rounded-xl bg-[#3D9DD9]/5 border border-[#3D9DD9]/12 p-4">
                  <p className="text-[11px] font-bold text-[#177DA6] uppercase tracking-wide">{r.rule}</p>
                  <p className="text-[12px] text-gray-600 mt-1.5 leading-snug">{r.detail}</p>
                </div>
              ))}
            </div>
          </Section>

          {/* ── 5. DO'S & DON'TS ────────────────────────────────────────── */}
          <Section label="05" title="Do's & Don'ts" sub="Follow these rules consistently across every branded touchpoint — internal and external.">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Do */}
              <div className="rounded-xl border border-green-100 bg-green-50/40 overflow-hidden">
                <div className="flex items-center gap-2.5 px-5 py-3.5 border-b border-green-100">
                  <CheckCircle size={14} className="text-green-600 flex-shrink-0" />
                  <span className="text-[13px] font-bold text-green-700">Do</span>
                </div>
                <ul className="p-5 space-y-3">
                  {DOS.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0 text-[10px] font-bold mt-0.5">
                        {i + 1}
                      </span>
                      <p className="text-[12.5px] text-gray-600 leading-relaxed">{item}</p>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Don't */}
              <div className="rounded-xl border border-red-100 bg-red-50/40 overflow-hidden">
                <div className="flex items-center gap-2.5 px-5 py-3.5 border-b border-red-100">
                  <XCircle size={14} className="text-red-500 flex-shrink-0" />
                  <span className="text-[13px] font-bold text-red-600">Don&apos;t</span>
                </div>
                <ul className="p-5 space-y-3">
                  {DONTS.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-red-100 text-red-500 flex items-center justify-center flex-shrink-0 text-[10px] font-bold mt-0.5">
                        {i + 1}
                      </span>
                      <p className="text-[12.5px] text-gray-600 leading-relaxed">{item}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Section>
        </div>

        {/* ── RIGHT COLUMN ────────────────────────────────────────────────── */}
        <div className="space-y-6">

          {/* ── BRAND FOUNDATION ────────────────────────────────────────── */}
          <SideSection label="01" title="Brand Foundation">
            {/* Mission */}
            <div className="rounded-xl bg-[#0B2D59] p-5">
              <p className="text-[10px] font-bold text-[#50D4F2] uppercase tracking-widest mb-3">Mission</p>
              <p className="font-neometric font-bold text-white text-[15px] leading-snug">
                Delivering evidence-based insights that strengthen organisations and transform communities across Africa.
              </p>
            </div>
            {/* Vision */}
            <div className="rounded-xl bg-[#3D9DD9] p-5">
              <p className="text-[10px] font-bold text-white/60 uppercase tracking-widest mb-3">Vision</p>
              <p className="font-neometric font-bold text-white text-[15px] leading-snug">
                An Africa where every development initiative is guided by rigorous evidence, enabling lasting change.
              </p>
            </div>
            {/* Tagline */}
            <div className="rounded-xl border border-gray-100 bg-white p-5">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Official Tagline</p>
              <p className="font-neometric font-black text-[#0B2D59] text-[1.1rem] leading-snug">
                &ldquo;Powerful Insights<br />
                <span className="text-[#3D9DD9]">Proven Delivery&rdquo;</span>
              </p>
            </div>
          </SideSection>

          {/* ── MESSAGING PILLARS ───────────────────────────────────────── */}
          <SideSection label="06" title="Messaging Pillars">
            {PILLARS.map((p, i) => (
              <div key={p.label}
                className="flex gap-3.5 p-4 rounded-xl bg-white border border-gray-100 hover:border-[#3D9DD9]/30 hover:bg-[#3D9DD9]/[0.02] transition-all duration-200 group">
                <div className="w-8 h-8 rounded-lg bg-[#0B2D59] flex items-center justify-center flex-shrink-0">
                  <span className="font-neometric font-black text-[#3D9DD9] text-[11px]">0{i + 1}</span>
                </div>
                <div>
                  <p className="text-[13px] font-bold text-gray-900 group-hover:text-[#0B2D59] transition-colors">{p.label}</p>
                  <p className="text-[12px] text-gray-500 mt-1 leading-relaxed">{p.body}</p>
                </div>
              </div>
            ))}
          </SideSection>

          {/* ── BRAND VOICE ─────────────────────────────────────────────── */}
          <SideSection label="07" title="Brand Voice">
            <div className="grid grid-cols-2 gap-2">
              {[
                { word: "Expert", sub: "Commands authority without condescension" },
                { word: "Direct", sub: "Clear language, no jargon or filler" },
                { word: "Warm", sub: "Professional and human — never cold" },
                { word: "Purposeful", sub: "Every message serves the mission" },
              ].map((v) => (
                <div key={v.word} className="rounded-xl bg-[#0B2D59] p-4">
                  <p className="font-neometric font-black text-[#3D9DD9] text-[1.05rem]">{v.word}</p>
                  <p className="text-white/45 text-[11px] mt-1.5 leading-relaxed">{v.sub}</p>
                </div>
              ))}
            </div>

            {/* Tone examples */}
            <div className="space-y-2">
              <div className="rounded-xl bg-green-50 border border-green-100 px-4 py-3.5">
                <p className="text-[10px] font-bold text-green-600 uppercase tracking-wide mb-1.5">✓ Write like this</p>
                <p className="text-[12.5px] text-gray-700 italic leading-relaxed">
                  &ldquo;Our evaluation of the USAID nutrition programme identified four systemic gaps that — when addressed — could improve reach by 40%.&rdquo;
                </p>
              </div>
              <div className="rounded-xl bg-red-50 border border-red-100 px-4 py-3.5">
                <p className="text-[10px] font-bold text-red-500 uppercase tracking-wide mb-1.5">✗ Not like this</p>
                <p className="text-[12.5px] text-gray-600 italic leading-relaxed">
                  &ldquo;We looked at the USAID project and found some interesting things that could help them get better results!&rdquo;
                </p>
              </div>
            </div>
          </SideSection>

          {/* ── CONTACT + ASSETS CTA ────────────────────────────────────── */}
          <div className="relative rounded-xl bg-[#0B2D59] overflow-hidden">
            <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-[#3D9DD9]/10 blur-2xl pointer-events-none" />
            <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-[#50D4F2]/10 blur-2xl pointer-events-none" />
            <div className="relative p-6">
              <p className="text-[10px] font-bold text-[#50D4F2] uppercase tracking-widest mb-2">Brand Assets</p>
              <h3 className="font-neometric font-bold text-white text-[1.1rem] leading-snug mb-1.5">
                Need the full asset pack?
              </h3>
              <p className="text-white/50 text-[12px] leading-relaxed mb-5">
                Request logos (SVG, EPS, PNG, PDF), presentation templates, typeface files, and extended usage guidelines.
              </p>
              <div className="space-y-2">
                <Link href="/admin/contacts"
                  className="flex items-center justify-center gap-2 w-full py-2.5 bg-[#3D9DD9] hover:bg-[#177DA6] text-white text-[13px] font-semibold rounded-xl transition-colors">
                  <Download size={13} /> Request Assets
                </Link>
                <Link href="/" target="_blank"
                  className="flex items-center justify-center gap-2 w-full py-2.5 bg-white/8 hover:bg-white/14 text-white text-[13px] font-semibold rounded-xl border border-white/15 transition-colors">
                  <ExternalLink size={13} /> View Live Site
                </Link>
              </div>
              <p className="text-white/25 text-[10.5px] mt-4 text-center">
                info@devexglobal.com · v1.0 · 2025
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   LAYOUT HELPERS
═══════════════════════════════════════════════════════════════════════════ */

function Section({
  label,
  title,
  sub,
  children,
}: {
  label: string;
  title: string;
  sub: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-start gap-3">
        <span className="font-neometric font-black text-[2rem] text-[#3D9DD9]/20 leading-none mt-0.5 flex-shrink-0 select-none">
          {label}
        </span>
        <div>
          <h2 className="font-neometric font-bold text-[1.05rem] text-gray-900 leading-tight">{title}</h2>
          <p className="text-[12px] text-gray-400 mt-0.5 leading-snug">{sub}</p>
        </div>
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function SideSection({
  label,
  title,
  children,
}: {
  label: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2.5">
        <span className="font-neometric font-black text-[1.4rem] text-[#3D9DD9]/20 leading-none select-none">{label}</span>
        <h2 className="font-neometric font-bold text-[0.95rem] text-gray-900">{title}</h2>
      </div>
      <div className="space-y-2.5">{children}</div>
    </div>
  );
}
