"use client";

/**
 * ClientLogosCarousel
 *
 * Single-row infinite marquee that pauses on hover.
 * Pure CSS animation, zero extra dependencies.
 */

import Image from "next/image";
import { CLIENT_LOGOS } from "@/lib/data";

export function ClientLogosCarousel() {
  // Triple the list so the loop is always seamless regardless of viewport width
  const items = [...CLIENT_LOGOS, ...CLIENT_LOGOS, ...CLIENT_LOGOS];

  return (
    <section className="py-16 sm:py-20 bg-gray-50/60 border-y border-gray-100 overflow-hidden">
      {/* Section header */}
      <div className="max-w-5xl mx-auto px-6 sm:px-10 mb-12 text-center">
        <p className="text-dgc-blue-1 text-xs font-semibold tracking-[0.18em] uppercase mb-3">
          Trusted By
        </p>
        <h2 className="text-gray-900 leading-tight" style={{ fontSize: "clamp(1.5rem,3.5vw,2.5rem)" }}>
          <span className="title-thin">Organisations we&apos;ve </span>
          <span className="title-highlight">worked with</span>
        </h2>
        <p className="mt-3 text-gray-500 text-base max-w-xl mx-auto leading-relaxed">
          From UN agencies to international NGOs and bilateral donors — a selection of the partners
          DGC has served across Africa and beyond.
        </p>
      </div>

      {/* Single-row marquee — clipped to the site's max content width */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)] rounded-2xl">
        <div className="flex gap-8 w-max animate-marquee hover:[animation-play-state:paused]">
          {items.map((logo, i) => (
            <div
              key={`${logo.id}-${i}`}
              className="
                flex-shrink-0 h-20 w-44
                flex items-center justify-center
                rounded-2xl
                bg-white
                border border-gray-100
                shadow-sm
                px-5 py-3
                grayscale hover:grayscale-0
                opacity-55 hover:opacity-100
                transition-all duration-300
              "
              title={logo.name}
            >
              <Image
                src={logo.logo}
                alt={logo.name}
                width={136}
                height={52}
                className="object-contain max-h-12 w-auto"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
