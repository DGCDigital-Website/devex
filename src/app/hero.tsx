/**
 * DGC Hero Section
 *
 * Layout (Cloudflare-inspired arc pattern):
 *  1. Rounded dark card — DotGrid + gradient background layers
 *  2. Zoom-in entrance animation wrapping the content zone
 *  3. TrueFocus headline (responsive clamp font, focus-blur cycle)
 *  4. Subtitle paragraph
 *  5. 4-column metrics strip (left accent bar) — in normal document flow
 *  6. Globe arc — very large globe, overflow-hidden crops to dome at the bottom
 */

"use client";

import React from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import TrueFocus from "@/components/TrueFocus";
import DotGrid from "@/components/ui/DotGrid";
import { Container } from "@/components/ui/container";

// Globe uses WebGL — load after hydration so it never blocks LCP
const Globe = dynamic(
  () => import("@/components/ui/globe").then((m) => ({ default: m.Globe })),
  { ssr: false },
);

// lineH — line drops from below the label into the globe arc
const METRICS = [
  { value: "480+", label: "evaluations & assessments delivered", lineH: 185 },
  { value: "130+", label: "consultancies across sectors",        lineH: 240 },
  { value: "30+",  label: "years of advisory experience",       lineH: 210 },
  { value: "22",   label: "African countries served",           lineH: 268 },
] as const;

// Staggered Framer Motion variants
const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const itemVariants = {
  hidden: { opacity: 0, scale: 0.94, y: 14 },
  show:   { opacity: 1, scale: 1,    y: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

function Hero() {
  return (
    <section className="w-full pt-4 sm:pt-6">
      <Container>
        {/* Hero card — overflow-hidden clips the globe arc that extends below */}
        <div className="relative overflow-hidden rounded-[2.5rem] shadow-2xl border border-white/10">

          {/* ── Layer 1: base dark-blue gradient ────────────────────────────── */}
          <div className="absolute inset-0 bg-gradient-to-br from-dgc-dark-blue-1 via-dgc-dark-blue-2 to-dgc-black" />

          {/* ── Layer 2: DotGrid — subtle, low opacity ──────────────────────── */}
          <div className="absolute inset-0 opacity-[0.20] pointer-events-none">
            <DotGrid
              dotSize={6}
              gap={20}
              baseColor="#3D9DD9"
              activeColor="#50D4F2"
              proximity={100}
              shockRadius={150}
              shockStrength={2}
              resistance={800}
              returnDuration={1.2}
            />
          </div>

          {/* ── Layer 3: overlay to prevent DotGrid glow from creating haze ── */}
          <div className="absolute inset-0 bg-gradient-to-b from-dgc-dark-blue-1/80 via-dgc-dark-blue-2/40 to-transparent pointer-events-none" />

          {/* ── Content — normal document flow, zoom entrance ──────────────── */}
          <motion.div
            className="relative z-10"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {/* ── Text zone ─────────────────────────────────────────────────── */}
            <motion.div
              variants={itemVariants}
              className="pt-12 sm:pt-14 lg:pt-18 px-6 sm:px-10 max-w-5xl mx-auto text-center"
            >
              <TrueFocus
                sentence="Powerful Insights, Proven Delivery"
                manualMode={false}
                blurAmount={5}
                borderColor="#3D9DD9"
                animationDuration={2}
                pauseBetweenAnimations={1}
              />
              <p className="mt-4 sm:mt-5 text-sm sm:text-base lg:text-lg leading-relaxed text-white/75 max-w-2xl mx-auto">
                Expert consultancy for NGOs, government agencies, and international
                development organisations — strengthening capacity and driving
                lasting impact across Africa and beyond.
              </p>
            </motion.div>

            {/* ── Mobile: 2-col grid above the globe (original layout) ────────── */}
            <motion.div
              variants={itemVariants}
              className="sm:hidden mt-6 px-6 grid grid-cols-2 gap-5"
            >
              {METRICS.map((m) => (
                <div key={m.value} className="relative pl-4">
                  <div className="absolute left-0 top-1 h-9 w-0.5 rounded-full bg-gradient-to-b from-dgc-blue-1 via-dgc-blue-1/60 to-transparent" />
                  <div className="text-2xl font-bold tracking-tight text-dgc-blue-1 drop-shadow-[0_0_10px_rgba(61,157,217,0.35)]">
                    {m.value}
                  </div>
                  <div className="mt-0.5 text-[11px] leading-snug text-white/70">
                    {m.label}
                  </div>
                </div>
              ))}
            </motion.div>

            {/*
              ── Desktop: z-stacked callouts + globe ─────────────────────────
              Three stacking layers share one relative wrapper:
                z-[1]  lines  — behind the globe canvas
                z-[5]  globe  — covers the lower portion of the lines
                z-[10] text   — dot / number / label above everything
            */}
            <motion.div
              variants={itemVariants}
              className="relative hidden sm:block mt-10 lg:mt-12"
            >
              {/* Layer z-[10]: dot · number · label — fixed-width cells keep lines aligned */}
              <div className="flex items-start justify-center gap-6 sm:gap-12 lg:gap-16 px-6 absolute inset-x-0 top-0 pointer-events-none z-[10]">
                {METRICS.map((m) => (
                  <div key={m.value} className="flex flex-col items-center w-[110px] sm:w-[130px] lg:w-[140px]">
                    <div className="w-2 h-2 rounded-full bg-dgc-blue-1 shadow-[0_0_8px_2px_rgba(61,157,217,0.85)] shrink-0" />
                    <div className="mt-2 text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold tracking-tight leading-none text-dgc-blue-1 drop-shadow-[0_0_16px_rgba(61,157,217,0.5)]">
                      {m.value}
                    </div>
                    <p className="mt-1.5 text-[11px] sm:text-xs lg:text-[0.8rem] font-normal text-white/70 text-center leading-snug">
                      {m.label}
                    </p>
                  </div>
                ))}
              </div>

              {/* Spacer — reserves space for the text block in normal flow */}
              <div style={{ height: 128 }} aria-hidden />

              {/* Layer z-[1]: lines — 16 px below the label block, 2 px wide */}
              <div
                className="flex items-start justify-center gap-6 sm:gap-12 lg:gap-16 px-6 absolute inset-x-0 pointer-events-none z-[1]"
                style={{ top: 144 }}
              >
                {METRICS.map((m) => (
                  <div key={m.value} className="flex flex-col items-center w-[110px] sm:w-[130px] lg:w-[140px]">
                    <div
                      className="w-[2px] rounded-full bg-gradient-to-b from-dgc-blue-1 via-dgc-blue-1/50 to-transparent"
                      style={{ height: m.lineH }}
                    />
                  </div>
                ))}
              </div>

              {/* Layer z-[5]: globe — covers the bottom of the lines */}
              <div className="relative z-[5] overflow-hidden h-[280px] sm:h-[300px] lg:h-[360px]">
                <Globe className="max-w-[1500px] sm:max-w-[1700px] lg:max-w-[1950px] opacity-[0.88]" />
                {/* Radial bloom */}
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_50%_at_50%_100%,rgba(61,157,217,0.15),transparent)]" />
                {/* Bottom fade */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-dgc-black/80 to-transparent" />
              </div>
            </motion.div>

            {/* Mobile globe — sits below the 2-col grid */}
            <div className="sm:hidden mt-4 relative overflow-hidden h-[200px]">
              <Globe className="max-w-[900px] opacity-[0.88]" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-dgc-black/80 to-transparent" />
            </div>

          </motion.div>
          {/* end content */}

        </div>
      </Container>
    </section>
  );
}

export default Hero;
