/**
 * DGC Layout Component
 *
 * Features:
 * - Main layout wrapper
 * - LogoHeader integration
 * - Responsive design
 */

"use client";

import React from "react";
import { usePathname } from "next/navigation";
import LogoHeader from "./logo-header";
import { Footer } from "@/components/footer";
import { BackToTop } from "@/components/back-to-top";

export function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");
  const isBeacon = pathname.startsWith("/beacon");
  const isAuth = pathname.startsWith("/auth");

  // Admin / Beacon / Auth pages supply their own chrome — skip the main site layout
  if (isAdmin || isBeacon || isAuth) return <>{children}</>;

  return (
    <>
      <LogoHeader />
      {children}
      <Footer />
      <BackToTop />
    </>
  );
}

export default Layout;
