"use client";

import { useRef, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import Link from "next/link";
import {
  Users,
  Briefcase,
  CalendarDays,
  FileText,
  ClipboardList,
  Palette,
  LogOut,
  Menu,
  X,
  ChevronDown,
  ArrowUpRight,
  LayoutDashboard,
  HelpCircle,
  BookOpen,
} from "lucide-react";
import type { BeaconUser } from "@/lib/beacon/types";

// ── App items shown in the "Apps" dropdown ─────────────────────────────────────

const APPS = [
  { href: "/beacon/contacts",   label: "Contacts",     description: "Manage enquiries & stakeholder records",    Icon: Users        },
  { href: "/beacon/jobs",       label: "Jobs",         description: "Post and manage job listings",              Icon: Briefcase    },
  { href: "/beacon/blog",       label: "Blog Posts",   description: "Write, edit & publish articles",            Icon: BookOpen     },
  { href: "/beacon/calendar",   label: "Calendar",     description: "Schedule and track events",                 Icon: CalendarDays },
  { href: "/beacon/invoices",   label: "Invoices",     description: "Create and send client invoices",           Icon: FileText     },
  { href: "/beacon/quotations", label: "Quotations",   description: "Generate and track quotations",             Icon: ClipboardList},
  { href: "/beacon/brand",      label: "Brand Manual", description: "DGC brand guidelines & assets",             Icon: Palette      },
] as const;

// ── Types ──────────────────────────────────────────────────────────────────────

type Props = {
  user: BeaconUser;
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
};

// ── Component ──────────────────────────────────────────────────────────────────

export default function BeaconShell({
  user,
  title,
  subtitle,
  actions,
  children,
}: Props) {
  const router   = useRouter();
  const pathname = usePathname();
  const [appsOpen,    setAppsOpen]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const [loggingOut,  setLoggingOut]  = useState(false);
  const appsRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (appsRef.current && !appsRef.current.contains(e.target as Node)) {
        setAppsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = async () => {
    setLoggingOut(true);
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  const closeAll = () => {
    setAppsOpen(false);
    setMobileOpen(false);
  };

  const isFaq = pathname === "/beacon/faq";

  /* ─── render ─────────────────────────────────────────────────────────────── */
  return (
    <div className="min-h-screen bg-[#f0f3f8] font-neometric antialiased flex flex-col">

      {/* ══════════════════ HEADER ══════════════════ */}
      <header className="sticky top-0 z-[60] w-full bg-white/95 backdrop-blur-[18px]">

        {/* Row 1 — logo + user/CTA ────────────────────────────────────────── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between gap-4">

            {/* Logo */}
            <Link href="/beacon" onClick={closeAll} className="flex items-center gap-3 shrink-0">
              <Image src="/logo.svg" alt="Devex Global Consult" width={140} height={44} className="h-11 w-auto" />
              <div className="hidden sm:flex items-center gap-2">
                <div className="h-5 w-px bg-black/10" />
                <div>
                  <p className="text-[10px] font-bold tracking-[0.14em] uppercase text-dgc-blue-1 leading-none">Beacon</p>
                  <p className="text-[9px] text-black/40 leading-none mt-0.5">Admin Portal</p>
                </div>
              </div>
            </Link>

            {/* Right — desktop: user pill only */}
            <div className="hidden lg:flex items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/5 border border-black/8 text-sm">
                <div className="w-5 h-5 rounded-full bg-dgc-blue-1/20 flex items-center justify-center shrink-0">
                  <span className="text-dgc-blue-1 text-[10px] font-bold">
                    {user.email[0]?.toUpperCase()}
                  </span>
                </div>
                <span className="text-black/60 font-medium max-w-[160px] truncate text-xs">
                  {user.email}
                </span>
              </div>
            </div>

            {/* Hamburger — mobile/tablet */}
            <button
              type="button"
              className="lg:hidden p-2 rounded-lg text-black/70 hover:text-black hover:bg-black/5 transition-colors"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Luminous blue divider ───────────────────────────────────────────── */}
        <div className="hidden lg:block max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-px bg-gradient-to-r from-transparent via-dgc-blue-1 to-transparent opacity-90 shadow-[0_0_14px_rgba(61,157,217,0.35)]" />
        </div>

        {/* Row 2 — nav + right CTA ─────────────────────────────────────────── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <div className="relative flex items-center justify-center">

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1 relative mx-auto pr-36">

              {/* Dashboard */}
              <Link
                href="/beacon"
                onClick={closeAll}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  pathname === "/beacon" ? "text-dgc-blue-1 bg-dgc-blue-1/8" : "text-black/70 hover:text-black hover:bg-black/5"
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </Link>

              {/* Apps dropdown */}
              <div
                ref={appsRef}
                className="relative"
                onMouseEnter={() => setAppsOpen(true)}
                onMouseLeave={() => setAppsOpen(false)}
              >
                <button
                  type="button"
                  onClick={() => setAppsOpen((v) => !v)}
                  className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-semibold text-black/70 hover:text-black hover:bg-black/5 transition-colors"
                  aria-expanded={appsOpen}
                  aria-haspopup="menu"
                >
                  Apps
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${appsOpen ? "rotate-180" : ""}`} />
                </button>

                {/* Dropdown panel */}
                <div
                  className={`absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50 transition-all duration-200 origin-top
                    ${appsOpen ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"}`}
                  role="menu"
                  aria-label="Apps menu"
                >
                  <div className="w-[680px] rounded-2xl bg-white border border-black/10 shadow-2xl shadow-black/10">
                    <div className="p-4 grid grid-cols-2 gap-2">
                      {APPS.map((app) => {
                        const Icon = app.Icon;
                        const active = pathname.startsWith(app.href);
                        return (
                          <Link
                            key={app.href}
                            href={app.href}
                            onClick={closeAll}
                            className={`flex items-start gap-3 p-3 rounded-xl transition-colors group ${
                              active ? "bg-dgc-blue-1/8" : "hover:bg-gray-50"
                            }`}
                            role="menuitem"
                          >
                            <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                              active ? "bg-dgc-blue-1/15" : "bg-gray-100 group-hover:bg-gray-200"
                            }`}>
                              <Icon className={`w-4 h-4 ${active ? "text-dgc-blue-1" : "text-dgc-blue-2"}`} />
                            </div>
                            <div className="min-w-0">
                              <p className={`text-sm font-semibold leading-snug ${active ? "text-dgc-blue-1" : "text-gray-900 group-hover:text-dgc-dark-blue-2"} transition-colors`}>
                                {app.label}
                              </p>
                              <p className="text-xs text-gray-500 mt-0.5 truncate">{app.description}</p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                    <div className="border-t border-black/5 px-4 py-3">
                      <Link
                        href="/beacon"
                        onClick={closeAll}
                        className="text-xs text-dgc-blue-2 hover:text-dgc-blue-1 font-medium transition-colors"
                      >
                        Go to Dashboard overview →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQs */}
              <Link
                href="/beacon/faq"
                onClick={closeAll}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  isFaq ? "text-dgc-blue-1 bg-dgc-blue-1/8" : "text-black/70 hover:text-black hover:bg-black/5"
                }`}
              >
                <HelpCircle className="w-4 h-4" />
                FAQs
              </Link>
            </nav>

            {/* Right: sign out + back to site ─────────────────────────────── */}
            <div className="hidden lg:flex items-center gap-1.5 absolute right-0">
              <button
                onClick={handleLogout}
                disabled={loggingOut}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium text-black/60 hover:text-black hover:bg-black/5 transition-colors disabled:opacity-40"
              >
                <LogOut className="w-4 h-4" />
                {loggingOut ? "Signing out…" : "Sign out"}
              </button>
              <Link
                href="/"
                onClick={closeAll}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-black/15 text-sm font-semibold text-black/80 hover:text-black hover:bg-black/5 transition-colors"
              >
                Back to site
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Mobile / tablet drawer ──────────────────────────────────────── */}
          {mobileOpen && (
            <div className="lg:hidden mt-3 rounded-2xl bg-white border border-black/10 shadow-xl overflow-hidden">
              <nav className="p-2 space-y-0.5">
                {/* Apps accordion */}
                <div>
                  <button
                    type="button"
                    onClick={() => setAppsOpen((v) => !v)}
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold text-black/80 hover:bg-black/5 transition-colors"
                  >
                    <span>Apps</span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${appsOpen ? "rotate-180" : ""}`} />
                  </button>
                  {appsOpen && (
                    <div className="mt-0.5 ml-3 pl-3 border-l border-black/10 space-y-0.5">
                      {APPS.map((app) => {
                        const Icon = app.Icon;
                        return (
                          <Link
                            key={app.href}
                            href={app.href}
                            onClick={closeAll}
                            className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-black/70 hover:bg-black/5 transition-colors"
                          >
                            <Icon className="w-4 h-4 text-dgc-blue-2 shrink-0" />
                            {app.label}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* FAQs */}
                <Link
                  href="/beacon/faq"
                  onClick={closeAll}
                  className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-semibold text-black/80 hover:bg-black/5 transition-colors"
                >
                  <HelpCircle className="w-4 h-4 text-dgc-blue-2" />
                  FAQs
                </Link>

                {/* User info */}
                <div className="px-3 py-2 text-xs text-black/40 font-medium border-t border-black/5 mt-1 pt-3">
                  Signed in as <span className="text-black/60">{user.email}</span>
                </div>

                {/* CTA buttons */}
                <div className="pt-1 pb-1 px-1 space-y-1.5">
                  <Link
                    href="/beacon"
                    onClick={closeAll}
                    className="w-full inline-flex justify-center items-center gap-2 px-4 py-3 rounded-xl bg-dgc-dark-blue-1 text-white text-sm font-semibold hover:bg-dgc-dark-blue-2 transition-colors"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    disabled={loggingOut}
                    className="w-full inline-flex justify-center items-center gap-2 px-4 py-3 rounded-xl border border-black/10 text-sm font-medium text-black/70 hover:bg-black/5 transition-colors disabled:opacity-40"
                  >
                    <LogOut className="w-4 h-4" />
                    {loggingOut ? "Signing out…" : "Sign out"}
                  </button>
                  <Link
                    href="/"
                    onClick={closeAll}
                    className="w-full inline-flex justify-center items-center gap-2 px-4 py-3 rounded-xl border border-black/10 text-sm font-medium text-black/70 hover:bg-black/5 transition-colors"
                  >
                    Back to site
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </nav>
            </div>
          )}
        </div>

        {/* Bottom luminous divider ─────────────────────────────────────────── */}
        <div className="hidden lg:block max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-px bg-gradient-to-r from-transparent via-dgc-blue-1 to-transparent opacity-90 shadow-[0_0_14px_rgba(61,157,217,0.35)]" />
        </div>
      </header>

      {/* ══════════════════ PAGE CONTENT ══════════════════ */}
      <main className="flex-1 flex flex-col px-4 sm:px-8 lg:px-10 py-8 max-w-[1280px] w-full mx-auto">
        <div className="flex items-start justify-between gap-4 mb-7">
          <div>
            <h1 className="text-gray-900 text-[1.375rem] font-bold tracking-tight leading-tight">{title}</h1>
            {subtitle && <p className="text-gray-500 text-sm mt-1">{subtitle}</p>}
          </div>
          {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
        </div>
        {children}
      </main>

      {/* ══════════════════ FOOTER ══════════════════ */}
      <footer className="mt-auto bg-white border-t border-gray-200/80">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-10 py-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">

            {/* Brand */}
            <div className="flex items-center gap-3 shrink-0">
              <Image src="/logo.svg" alt="DGC" width={100} height={32} className="h-8 w-auto opacity-70" />
              <div className="h-5 w-px bg-gray-200" />
              <div>
                <p className="text-[10px] font-bold tracking-[0.14em] uppercase text-dgc-blue-1 leading-none">Beacon</p>
                <p className="text-[9px] text-gray-400 leading-none mt-0.5">Admin Portal · Internal use only</p>
              </div>
            </div>

            {/* Quick links */}
            <nav className="flex flex-wrap items-center gap-x-5 gap-y-2">
              {[
                { href: "/beacon",            label: "Dashboard"  },
                { href: "/beacon/contacts",   label: "Contacts"   },
                { href: "/beacon/jobs",       label: "Jobs"       },
                { href: "/beacon/blog",       label: "Blog Posts" },
                { href: "/beacon/calendar",   label: "Calendar"   },
                { href: "/beacon/invoices",   label: "Invoices"   },
                { href: "/beacon/quotations", label: "Quotations" },
                { href: "/beacon/faq",        label: "Help & FAQs"},
              ].map((l) => (
                <Link key={l.href} href={l.href} className="text-gray-400 text-xs hover:text-dgc-blue-1 transition-colors font-medium">
                  {l.label}
                </Link>
              ))}
            </nav>

            {/* Copyright */}
            <p className="text-gray-400 text-xs shrink-0">
              © {new Date().getFullYear()} Devex Global Consult
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
