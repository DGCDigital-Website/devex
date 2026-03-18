import Image from "next/image";
import Link from "next/link";
import { CheckCircle, XCircle, Download, ExternalLink } from "lucide-react";

const COLORS = [
  {
    name: "DGC Dark Blue",
    hex: "#0B2D59",
    role: "Primary brand color – headers, dark backgrounds",
    textClass: "text-white",
  },
  {
    name: "DGC Blue (Primary)",
    hex: "#3D9DD9",
    role: "Accent & interactive elements – buttons, links",
    textClass: "text-white",
  },
  {
    name: "DGC Blue (Secondary)",
    hex: "#177DA6",
    role: "Hover states, secondary actions",
    textClass: "text-white",
  },
  {
    name: "DGC Light Blue",
    hex: "#50D4F2",
    role: "Highlights, decorative accents",
    textClass: "text-[#0B2D59]",
  },
  {
    name: "DGC Black",
    hex: "#0D0D0D",
    role: "Body text and high-contrast elements",
    textClass: "text-white",
  },
  {
    name: "White",
    hex: "#FFFFFF",
    role: "Backgrounds, reversed text on dark",
    textClass: "text-gray-800",
    border: true,
  },
];

const TYPOGRAPHY = [
  {
    family: "Neometric",
    usage: "Headlines, hero text, display type",
    weights: ["Regular", "Medium", "Bold", "ExtraBold", "Black"],
    example: "Transforming Ideas into Impact",
    style: "font-neometric font-bold text-2xl text-[#0B2D59]",
  },
  {
    family: "Inter",
    usage: "Body copy, UI text, captions",
    weights: ["Regular (400)", "Medium (500)", "SemiBold (600)", "Bold (700)"],
    example: "DGC delivers evidence-based solutions across Africa.",
    style: "font-sans text-base text-gray-700",
  },
];

const DOS = [
  "Always use the approved DGC logo files (SVG preferred).",
  "Maintain clear space around the logo equal to the height of the 'D' in DGC.",
  "Use DGC Dark Blue (#0B2D59) for formal documents and presentations.",
  "Ensure text on coloured backgrounds meets WCAG 2.1 AA contrast ratio.",
  "Use Neometric for all headlines and Inter for all body copy.",
  "Resize logos proportionally, never stretch or distort.",
];

const DONTS = [
  "Do not recolour the logo outside of approved brand colours.",
  "Do not place the logo on visually busy or low-contrast backgrounds.",
  "Do not use unofficial fonts or typefaces for branded materials.",
  "Do not add drop shadows, outlines, or effects to the logo.",
  "Do not use the logo smaller than 80px wide in digital contexts.",
  "Do not alter the logo proportions or rearrange its elements.",
];

export default function BrandManualPage() {
  return (
    <div className="space-y-10 max-w-5xl">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Brand Manual</h1>
        <p className="text-sm text-gray-500 mt-1">
          DGC visual identity guidelines — logos, colours, typography and usage rules.
        </p>
      </div>

      {/* Logo section */}
      <section className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-800">Logo</h2>
          <p className="text-xs text-gray-400 mt-0.5">Use the correct logo variant for each background context.</p>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Light logo */}
          <div className="rounded-xl border border-gray-100 bg-gray-50 p-8 flex flex-col items-center gap-4">
            <Image src="/logo.svg" alt="DGC Logo (Primary)" width={200} height={60} className="h-14 w-auto" />
            <div className="text-center">
              <p className="text-xs font-semibold text-gray-700">Primary Logo</p>
              <p className="text-xs text-gray-400 mt-0.5">Use on white or light backgrounds</p>
              <code className="text-xs bg-white border border-gray-200 px-2 py-0.5 rounded mt-1 inline-block text-gray-500">
                /logo.svg
              </code>
            </div>
          </div>
          {/* Dark logo */}
          <div className="rounded-xl bg-[#0B2D59] p-8 flex flex-col items-center gap-4">
            <Image src="/logo-dark.svg" alt="DGC Logo (Dark)" width={200} height={60} className="h-14 w-auto" />
            <div className="text-center">
              <p className="text-xs font-semibold text-white">Reversed Logo</p>
              <p className="text-xs text-white/60 mt-0.5">Use on dark or DGC Dark Blue backgrounds</p>
              <code className="text-xs bg-white/10 text-white/80 px-2 py-0.5 rounded mt-1 inline-block">
                /logo-dark.svg
              </code>
            </div>
          </div>
        </div>
        <div className="px-6 pb-6">
          <div className="bg-[#3D9DD9]/5 border border-[#3D9DD9]/20 rounded-lg px-4 py-3 text-xs text-[#177DA6]">
            <strong>Note:</strong> Always use SVG format for digital use and vector EPS for print. Minimum digital
            size: 80px wide. Always maintain proportional scaling.
          </div>
        </div>
      </section>

      {/* Colour palette */}
      <section className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-800">Colour Palette</h2>
          <p className="text-xs text-gray-400 mt-0.5">The official DGC brand colours and their intended usage.</p>
        </div>
        <div className="p-6 grid grid-cols-2 md:grid-cols-3 gap-4">
          {COLORS.map((color) => (
            <div
              key={color.hex}
              className="rounded-xl overflow-hidden border border-gray-100 shadow-sm"
            >
              <div
                className="h-24 w-full"
                style={{ backgroundColor: color.hex, border: color.border ? "1px solid #e5e7eb" : "none" }}
              />
              <div className="bg-white px-3 py-3">
                <p className="text-xs font-semibold text-gray-800">{color.name}</p>
                <div className="flex items-center gap-2 mt-1">
                  <code className="text-xs font-mono text-gray-500 bg-gray-50 border border-gray-100 px-1.5 py-0.5 rounded">
                    {color.hex}
                  </code>
                </div>
                <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">{color.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Typography */}
      <section className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-800">Typography</h2>
          <p className="text-xs text-gray-400 mt-0.5">Typefaces used across all DGC communications.</p>
        </div>
        <div className="p-6 space-y-5">
          {TYPOGRAPHY.map((font) => (
            <div key={font.family} className="border border-gray-100 rounded-xl p-5">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <p className="text-sm font-bold text-gray-800">{font.family}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{font.usage}</p>
                </div>
                <div className="flex flex-wrap gap-1">
                  {font.weights.map((w) => (
                    <span
                      key={w}
                      className="text-xs bg-gray-50 border border-gray-100 text-gray-500 px-2 py-0.5 rounded"
                    >
                      {w}
                    </span>
                  ))}
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg px-4 py-4">
                <p className={font.style}>{font.example}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Do's and Don'ts */}
      <section className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-800">Brand Guidelines</h2>
          <p className="text-xs text-gray-400 mt-0.5">Follow these rules to maintain brand consistency.</p>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Do */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle size={16} className="text-green-600" />
              <span className="text-sm font-semibold text-green-700">Do</span>
            </div>
            <ul className="space-y-2">
              {DOS.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs text-gray-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          {/* Don't */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <XCircle size={16} className="text-red-500" />
              <span className="text-sm font-semibold text-red-600">Don&apos;t</span>
            </div>
            <ul className="space-y-2">
              {DONTS.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs text-gray-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Download / Request section */}
      <section className="bg-[#0B2D59] rounded-xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h2 className="text-lg font-bold text-white">Need Brand Assets?</h2>
          <p className="text-sm text-white/60 mt-1 max-w-md">
            Request the full DGC brand asset pack including logo files (SVG, EPS, PNG), official templates, and
            extended typography guidelines.
          </p>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold bg-[#3D9DD9] hover:bg-[#177DA6] text-white rounded-lg transition-colors"
          >
            <Download size={15} />
            Request Assets
          </Link>
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors border border-white/20"
          >
            <ExternalLink size={15} />
            View Website
          </Link>
        </div>
      </section>
    </div>
  );
}
