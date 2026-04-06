/**
 * DGC Main Page — server component (no 'use client')
 *
 * Individual sections are client components where needed.
 * Dynamic imports create separate JS chunks for below-the-fold
 * sections, keeping the initial bundle lean (LCP / TTI gains).
 * `ssr: false` is intentionally omitted — it is only valid inside
 * Client Components in the App Router.
 */
import dynamic from "next/dynamic";
import Hero from "./hero";
import { AboutUs } from "@/components";

const Services             = dynamic(() => import("@/components/services"));
const Testimonials         = dynamic(() => import("@/components/testimonials"));
const ClientLogosCarousel  = dynamic(() =>
  import("@/components/client-logos-carousel").then((m) => ({ default: m.ClientLogosCarousel }))
);

export default function DGCHomePage() {
  return (
    <div className="section is-relative">
      <Hero />
      <div className="h-8" />

      <AboutUs />
      <div className="h-8" />

      <Services />
      <div className="h-8" />

      <Testimonials />
      <div className="h-8" />

      <ClientLogosCarousel />
      <div className="h-8" />
    </div>
  );
}
