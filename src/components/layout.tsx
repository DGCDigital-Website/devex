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

  // Admin pages supply their own header via the admin layout — skip the main site chrome
  if (isAdmin) return <>{children}</>;

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
