import Image from "next/image";
import Link from "next/link";
import { CheckCircle, XCircle, Download, ExternalLink, ArrowRight } from "lucide-react";

/* ── Data ──────────────────────────────────────────────────────────────────── */

const COLORS = [
  { name: "DGC Dark Blue", token: "dgc-dark-blue-1", hex: "#0B2D59", pantone: "Pantone 281 C", cmyk: "100 / 60 / 0 / 60", role: "Hero & footer backgrounds, formal documents", light: false },
  { name: "DGC Blue", token: "dgc-blue-1", hex: "#3D9DD9", pantone: "Pantone 299 C", cmyk: "72 / 21 / 0 / 15", role: "Primary CTAs, interactive elements, highlights", light: false },
  { name: "DGC Blue Secondary", token: "dgc-blue-2", hex: "#177DA6", pantone: "Pantone 7690 C", cmyk: "86 / 26 / 0 / 35", role: "Hover states, secondary actions, links", light: false },
  { name: "DGC Light Blue", token: "dgc-light", hex: "#50D4F2", pantone: "Pantone 298 C", cmyk: "67 / 2 / 0 / 5", role: "Decorative accents, active indicators", light: true },
  { name: "Near Black", token: "dgc-black", hex: "#0D0D0D", pantone: "Pantone Black C", cmyk: "0 / 0 / 0 / 95", role: "Body text, maximum contrast elements", light: false },
  { name: "White", token: "—", hex: "#FFFFFF", pantone: "—", cmyk: "0 / 0 / 0 / 0", role: "Page backgrounds, reversed text on dark", light: true, border: true },
];

const FONTS = [
  { name: "Neometric", category: "Display / Headlines", specimen: "Aa", desc: "Transforming Africa's Development Landscape", weights: ["Light 300", "Regular 400", "Medium 500", "SemiBold 600", "Bold 700", "ExtraBold 800"], use: "All headlines, hero copy, pull-quotes, display numbers", style: "font-neometric font-bold", files: "woff, woff2, ttf" },
  { name: "Inter", category: "Body / UI", specimen: "Aa", desc: "Evidence-based consulting across 22 African countries.", weights: ["Regular 400", "Medium 500", "SemiBold 600", "Bold 700"], use: "Body copy, UI labels, captions, navigation items", style: "font-sans font-normal", files: "Google Fonts CDN" },
];

const PILLARS = [
  { no: "01", title: "Mission-Driven", body: "We exist to deliver evidence-based, high-quality consulting that strengthens organisations and communities across Africa." },
  { no: "02", title: "African Excellence", body: "Every communication should reflect our deep expertise in the African context — professional, precise, and culturally grounded." },
  { no: "03", title: "Clarity & Credibility", body: "Our voice is authoritative without being cold. We communicate complex findings simply, with confidence and purpose." },
  { no: "04", title: "Partnership", body: "We speak with, not at, our clients. Collaborative language that positions DGC as a long-term partner, not a vendor." },
];

const METRICS = [
  { value: "480+", label: "Evaluations Delivered" },
  { value: "130+", label: "Consultancies" },
  { value: "22", label: "African Countries" },
  { value: "98%", label: "Client Satisfaction" },
];

const DOS = [
  "Always use approved DGC logo files — SVG for digital, vector EPS for print.",
  "Maintain clear space equal to the height of the 'D' in DGC around the mark.",
  "Use DGC Dark Blue (#0B2D59) for formal documents and presentations.",
  "Use Neometric for all headlines and Inter for all body copy.",
  "Ensure all text on coloured backgrounds meets WCAG 2.1 AA contrast ratio.",
  "Resize logos proportionally — never stretch or distort.",
];

const DONTS = [
  "Do not recolour the logo outside the approved brand palette.",
  "Do not place the logo on visually busy or low-contrast backgrounds.",
  "Do not use the logo smaller than 80 px wide in digital contexts.",
  "Do not add drop shadows, outlines, glows, or any effects to the logo.",
  "Do not use unofficial typefaces on any branded material.",
  "Do not alter letter-spacing, proportions, or rearrange logo elements.",
];

/* ── Component ──────────────────────────────────────────────────────────────── */

export default function BrandManualPage() {
  return (
    <div className="space-y-0 max-w-5xl">

      {/* ── COVER ──────────────────────────────────────────────────────────── */}
      <section className="relative rounded-2xl overflow-hidden bg-[#0B2D59] mb-8">
        {/* gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0C2C65] via-[#0B2D59] to-[#0a1f3f]" />
        {/* decorative circles */}
        <div className="absolute -right-16 -top-16 w-72 h-72 rounded-full bg-[#3D9DD9]/10" />
        <div className="absolute -right-4 -bottom-20 w-48 h-48 rounded-full bg-[#50D4F2]/8" />
        <div className="absolute left-1/2 bottom-0 w-32 h-32 rounded-full bg-[#177DA6]/15" />

        <div className="relative px-10 pt-12 pb-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#3D9DD9]/20 border border-[#3D9DD9]/30 rounded-full px-3 py-1 mb-6">
                <div className="w-1.5 h-1.5 rounded-full bg-[#50D4F2]" />
                <span className="text-xs font-semibold text-[#50D4F2] uppercase tracking-widest">Brand Identity Guidelines</span>
              </div>
              <h1 className="font-neometric font-black text-white leading-none" style={{ fontSize: "clamp(2.5rem,5vw,4rem)" }}>
                Devex<br />
                <span className="text-[#3D9DD9]">Global</span><br />
                Consult
              </h1>
              <p className="text-white/50 font-light mt-4 text-sm tracking-[0.2em] uppercase">
                Powerful Insights&nbsp;&nbsp;|&nbsp;&nbsp;Proven Delivery
              </p>
            </div>
            <div className="flex flex-col gap-3 md:items-end">
              <Image src="/logo-dark.svg" alt="DGC" width={160} height={48} className="h-12 w-auto" />
              <p className="text-white/40 text-xs">Version 1.0 · 2025</p>
            </div>
          </div>

          {/* metrics strip */}
          <div className="grid grid-cols-4 gap-4 mt-10 pt-8 border-t border-white/10">
            {METRICS.map((m) => (
              <div key={m.label}>
                <p className="font-neometric font-black text-[#3D9DD9]" style={{ fontSize: "clamp(1.5rem,3vw,2rem)" }}>{m.value}</p>
                <p className="text-white/50 text-xs mt-0.5">{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BRAND FOUNDATION ──────────────────────────────────────────────── */}
      <section className="mb-8">
        <SectionLabel number="01" title="Brand Foundation" subtitle="The mission, purpose, and pillars that define how DGC shows up in the world." />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
          {/* Mission */}
          <div className="bg-[#0B2D59] rounded-2xl p-7 flex flex-col gap-3">
            <span className="text-xs font-bold text-[#50D4F2] uppercase tracking-widest">Mission</span>
            <p className="font-neometric font-bold text-white text-lg leading-snug">
              Delivering evidence-based insights that strengthen organisations and transform communities across Africa.
            </p>
          </div>
          {/* Vision */}
          <div className="bg-[#3D9DD9] rounded-2xl p-7 flex flex-col gap-3">
            <span className="text-xs font-bold text-white/70 uppercase tracking-widest">Vision</span>
            <p className="font-neometric font-bold text-white text-lg leading-snug">
              An Africa where every development initiative is guided by rigorous evidence, empowering lasting change.
            </p>
          </div>
          {/* Pillars */}
          {PILLARS.map((p) => (
            <div key={p.no} className="bg-white rounded-2xl border border-gray-100 p-6 flex gap-4">
              <span className="font-neometric font-black text-[#3D9DD9]/30 text-3xl leading-none flex-shrink-0">{p.no}</span>
              <div>
                <p className="font-bold text-gray-900 text-sm">{p.title}</p>
                <p className="text-gray-500 text-xs mt-1.5 leading-relaxed">{p.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── COLOUR PALETTE ────────────────────────────────────────────────── */}
      <section className="mb-8">
        <SectionLabel number="02" title="Colour Palette" subtitle="The official DGC brand colours. Use only these values — no off-brand tints or unsanctioned shades." />

        <div className="mt-5 grid grid-cols-2 md:grid-cols-3 gap-4">
          {COLORS.map((c) => (
            <div key={c.hex} className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm group">
              <div
                className="h-28 w-full flex items-end px-4 pb-3"
                style={{ backgroundColor: c.hex, border: c.border ? "1px solid #e5e7eb" : "none" }}
              >
                <span
                  className="font-neometric font-black text-2xl leading-none opacity-30"
                  style={{ color: c.light ? "#0B2D59" : "#ffffff" }}
                >
                  {c.token}
                </span>
              </div>
              <div className="bg-white px-4 py-4">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-bold text-gray-900">{c.name}</p>
                  <code className="text-xs font-mono bg-gray-50 border border-gray-100 px-2 py-0.5 rounded text-gray-500">{c.hex}</code>
                </div>
                <p className="text-xs text-[#3D9DD9] font-medium">{c.pantone}</p>
                <p className="text-xs text-gray-400 mt-0.5">CMYK: {c.cmyk}</p>
                <p className="text-xs text-gray-400 mt-2 leading-relaxed">{c.role}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Gradient strip */}
        <div className="mt-4 rounded-2xl overflow-hidden h-14 flex">
          {["#0B2D59","#177DA6","#3D9DD9","#50D4F2"].map((hex) => (
            <div key={hex} className="flex-1 flex items-center justify-center" style={{ backgroundColor: hex }}>
              <span className="text-white/60 font-mono text-xs">{hex}</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-400 mt-2 text-center">Official DGC gradient sequence — dark to light, left to right</p>
      </section>

      {/* ── TYPOGRAPHY ────────────────────────────────────────────────────── */}
      <section className="mb-8">
        <SectionLabel number="03" title="Typography" subtitle="Two typefaces define DGC's visual voice. Neometric for impact. Inter for clarity." />

        <div className="mt-5 space-y-4">
          {FONTS.map((font, i) => (
            <div key={font.name} className={`rounded-2xl overflow-hidden border border-gray-100 ${i === 0 ? "bg-[#0B2D59]" : "bg-white"}`}>
              <div className="flex flex-col md:flex-row">
                {/* Specimen */}
                <div className={`flex items-center justify-center px-10 py-8 min-w-[180px] ${i === 0 ? "bg-[#3D9DD9]/20" : "bg-gray-50"} border-b md:border-b-0 md:border-r ${i === 0 ? "border-white/10" : "border-gray-100"}`}>
                  <span
                    className={`font-black leading-none ${font.style}`}
                    style={{ fontSize: "5rem", color: i === 0 ? "#ffffff" : "#0B2D59" }}
                  >
                    {font.specimen}
                  </span>
                </div>
                {/* Details */}
                <div className="p-6 flex-1">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div>
                      <p className={`text-xl font-bold ${i === 0 ? "text-white" : "text-gray-900"} ${font.style}`}>{font.name}</p>
                      <p className={`text-xs mt-0.5 ${i === 0 ? "text-[#50D4F2]" : "text-[#3D9DD9]"}`}>{font.category} · {font.files}</p>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {font.weights.map((w) => (
                        <span key={w} className={`text-xs px-2 py-0.5 rounded ${i === 0 ? "bg-white/10 text-white/70" : "bg-gray-50 border border-gray-100 text-gray-500"}`}>{w}</span>
                      ))}
                    </div>
                  </div>
                  <p className={`mt-4 text-sm leading-relaxed ${font.style} ${i === 0 ? "text-white/80" : "text-gray-600"}`}>{font.desc}</p>
                  <p className={`mt-3 text-xs ${i === 0 ? "text-white/40" : "text-gray-400"}`}>Used for: {font.use}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Type scale */}
        <div className="mt-4 bg-white rounded-2xl border border-gray-100 p-6 space-y-3">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">Type Scale</p>
          {[
            { label: "Display", size: "text-5xl", tag: "font-neometric font-black text-[#0B2D59]", ex: "DGC" },
            { label: "H1", size: "text-3xl", tag: "font-neometric font-bold text-[#0B2D59]", ex: "Organisational Strengthening" },
            { label: "H2", size: "text-xl", tag: "font-neometric font-semibold text-gray-800", ex: "Capacity & Systems" },
            { label: "Body", size: "text-base", tag: "font-sans text-gray-600", ex: "Evidence-based solutions across 22 African countries, delivered with precision." },
            { label: "Caption", size: "text-xs", tag: "font-sans text-gray-400", ex: "30+ years of expertise · 480+ evaluations · 98% client satisfaction" },
          ].map((row) => (
            <div key={row.label} className="flex items-baseline gap-5">
              <span className="text-xs text-gray-400 w-12 flex-shrink-0">{row.label}</span>
              <span className={`${row.size} ${row.tag} leading-tight`}>{row.ex}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── LOGO GUIDELINES ───────────────────────────────────────────────── */}
      <section className="mb-8">
        <SectionLabel number="04" title="Logo Guidelines" subtitle="Use only approved logo files. Never alter the mark's proportions, colours, or elements." />

        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Primary */}
          <div className="bg-white rounded-2xl border border-gray-100 p-8 flex flex-col items-center gap-5">
            <Image src="/logo.svg" alt="DGC Logo (Primary)" width={200} height={56} className="h-14 w-auto" />
            <div className="text-center">
              <p className="text-sm font-bold text-gray-800">Primary Mark</p>
              <p className="text-xs text-gray-400 mt-1">Light / White backgrounds</p>
              <code className="text-xs bg-gray-50 border border-gray-100 text-gray-500 px-2.5 py-1 rounded-md mt-2 inline-block">/logo.svg</code>
            </div>
          </div>
          {/* Reversed */}
          <div className="bg-[#0B2D59] rounded-2xl p-8 flex flex-col items-center gap-5">
            <Image src="/logo-dark.svg" alt="DGC Logo (Reversed)" width={200} height={56} className="h-14 w-auto" />
            <div className="text-center">
              <p className="text-sm font-bold text-white">Reversed Mark</p>
              <p className="text-xs text-white/50 mt-1">Dark Blue / dark backgrounds</p>
              <code className="text-xs bg-white/10 text-white/70 px-2.5 py-1 rounded-md mt-2 inline-block">/logo-dark.svg</code>
            </div>
          </div>
        </div>

        {/* Clear space & minimum size */}
        <div className="mt-4 bg-white rounded-2xl border border-gray-100 p-6">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">Clear Space &amp; Minimum Size</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-[#3D9DD9] mt-1.5 flex-shrink-0" />
                <p><strong className="text-gray-800">Clear space rule:</strong> Maintain empty space equal to the cap-height of the letter "D" in DGC on all four sides of the logo mark.</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-[#3D9DD9] mt-1.5 flex-shrink-0" />
                <p><strong className="text-gray-800">Minimum digital size:</strong> 80 px wide at 72 dpi.</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-[#3D9DD9] mt-1.5 flex-shrink-0" />
                <p><strong className="text-gray-800">Minimum print size:</strong> 20 mm wide at 300 dpi.</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-[#3D9DD9] mt-1.5 flex-shrink-0" />
                <p><strong className="text-gray-800">File formats:</strong> SVG for all digital use. Vector EPS/PDF for professional print production.</p>
              </div>
            </div>
          </div>
          <div className="mt-4 bg-[#3D9DD9]/5 border border-[#3D9DD9]/20 rounded-xl px-4 py-3 text-xs text-[#177DA6]">
            <strong>Important:</strong> The DGC logo is a protected trademark. Only approved colour variants (primary and reversed) may be used. The logo must never appear in any other colour combination.
          </div>
        </div>
      </section>

      {/* ── MESSAGING PILLARS ─────────────────────────────────────────────── */}
      <section className="mb-8">
        <SectionLabel number="05" title="Messaging Pillars" subtitle="The four core messages that anchor every DGC communication — internal and external." />

        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { title: "Evidence-Based Impact", body: "Every recommendation is grounded in data. We let findings drive conclusions — not assumptions.", accent: "#3D9DD9" },
            { title: "African Expertise", body: "Over three decades working across 22 African nations. Our context is not assumed — it is earned.", accent: "#177DA6" },
            { title: "Proven Delivery", body: "480+ evaluations and 130+ consultancies completed. We don't just advise — we deliver.", accent: "#50D4F2" },
            { title: "Partnership Approach", body: "We co-create solutions with clients, building lasting institutional capacity beyond the engagement.", accent: "#0B2D59" },
          ].map((p) => (
            <div key={p.title} className="bg-white rounded-2xl border border-gray-100 p-6 flex gap-4 group hover:shadow-md transition-shadow">
              <div className="w-1 rounded-full flex-shrink-0" style={{ backgroundColor: p.accent }} />
              <div>
                <p className="font-bold text-gray-900 text-sm">{p.title}</p>
                <p className="text-gray-500 text-xs mt-2 leading-relaxed">{p.body}</p>
                <div className="flex items-center gap-1 mt-3 text-xs font-medium" style={{ color: p.accent }}>
                  <span>Use in proposals, reports &amp; presentations</span>
                  <ArrowRight size={12} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── BRAND VOICE ───────────────────────────────────────────────────── */}
      <section className="mb-8">
        <SectionLabel number="06" title="Brand Voice &amp; Tone" subtitle="DGC sounds authoritative, empathetic, and precise. Never corporate-cold or casual." />

        <div className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { word: "Expert", desc: "We know our field deeply. Every word earns trust." },
            { word: "Direct", desc: "Clear language. No unnecessary jargon or filler." },
            { word: "Warm", desc: "Professional but human. We care about outcomes." },
            { word: "Purposeful", desc: "Every message serves the mission. No noise." },
          ].map((v) => (
            <div key={v.word} className="bg-[#0B2D59] rounded-2xl p-5">
              <p className="font-neometric font-black text-[#3D9DD9] text-2xl">{v.word}</p>
              <p className="text-white/60 text-xs mt-2 leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>

        {/* Tone examples */}
        <div className="mt-4 bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Tone in Practice</p>
          {[
            { label: "✓ Do say", text: "Our evaluation of the USAID nutrition programme identified four systemic gaps that — when addressed — could improve reach by 40%.", style: "text-green-700 bg-green-50 border-green-200" },
            { label: "✗ Don't say", text: "We looked at a USAID thing and found some stuff that could help them get better results. It was pretty interesting!", style: "text-red-600 bg-red-50 border-red-200" },
          ].map((ex) => (
            <div key={ex.label} className={`rounded-xl border px-4 py-3 ${ex.style}`}>
              <p className="text-xs font-bold mb-1.5">{ex.label}</p>
              <p className="text-sm italic">&ldquo;{ex.text}&rdquo;</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── DO'S & DON'TS ─────────────────────────────────────────────────── */}
      <section className="mb-8">
        <SectionLabel number="07" title="Do's &amp; Don'ts" subtitle="Follow these rules consistently to protect brand integrity across all touchpoints." />

        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="flex items-center gap-2.5 px-6 py-4 border-b border-gray-100 bg-green-50">
              <CheckCircle size={16} className="text-green-600" />
              <span className="text-sm font-bold text-green-700">Do</span>
            </div>
            <ul className="p-6 space-y-3">
              {DOS.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-xs text-gray-600">
                  <span className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0 font-bold text-xs">{i + 1}</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="flex items-center gap-2.5 px-6 py-4 border-b border-gray-100 bg-red-50">
              <XCircle size={16} className="text-red-500" />
              <span className="text-sm font-bold text-red-600">Don&apos;t</span>
            </div>
            <ul className="p-6 space-y-3">
              {DONTS.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-xs text-gray-600">
                  <span className="w-5 h-5 rounded-full bg-red-100 text-red-500 flex items-center justify-center flex-shrink-0 font-bold text-xs">{i + 1}</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── CONTACT / ASSETS ──────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-[#0B2D59] to-[#0C2C65] rounded-2xl p-8 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 rounded-full bg-[#3D9DD9]/10 -translate-y-1/2 translate-x-1/2" />
        <div className="absolute left-1/3 bottom-0 w-32 h-32 rounded-full bg-[#50D4F2]/10 translate-y-1/2" />
        <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="text-xs font-bold text-[#50D4F2] uppercase tracking-widest mb-2">Brand Assets</p>
            <h2 className="font-neometric font-black text-white text-2xl">Need the full asset pack?</h2>
            <p className="text-white/60 text-sm mt-2 max-w-md">
              Request the complete DGC brand toolkit — logo files (SVG, EPS, PNG, PDF), official presentation templates, typography files, and extended usage guidelines.
            </p>
            <div className="flex flex-wrap gap-3 mt-5">
              <Link href="/admin/contacts" className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold bg-[#3D9DD9] hover:bg-[#177DA6] text-white rounded-xl transition-colors">
                <Download size={15} /> Request Assets
              </Link>
              <Link href="/" target="_blank" className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors border border-white/20">
                <ExternalLink size={15} /> View Live Site
              </Link>
            </div>
          </div>
          <div className="hidden md:flex flex-col gap-2 text-right flex-shrink-0">
            <p className="text-xs text-white/40">Brand contact</p>
            <p className="text-white font-medium text-sm">info@devexglobal.com</p>
            <p className="text-white/50 text-xs mt-2">Version 1.0 · 2025<br />Devex Global Consult</p>
          </div>
        </div>
      </section>

    </div>
  );
}

/* ── Section label helper ───────────────────────────────────────────────────── */
function SectionLabel({ number, title, subtitle }: { number: string; title: string; subtitle: string }) {
  return (
    <div className="flex items-start gap-4">
      <span className="font-neometric font-black text-4xl text-[#3D9DD9]/25 leading-none mt-1 flex-shrink-0">{number}</span>
      <div>
        <h2 className="font-neometric font-bold text-xl text-gray-900" dangerouslySetInnerHTML={{ __html: title }} />
        <p className="text-sm text-gray-400 mt-0.5">{subtitle}</p>
      </div>
    </div>
  );
}
