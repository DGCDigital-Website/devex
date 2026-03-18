/**
 * DGC Beacon — Admin Layout
 *
 * Mirrors the main site's logo-header.tsx structure exactly:
 *  - Top banner row: Logo + Beacon badge (left) | System status + Admin avatar dropdown (right)
 *  - Blue gradient divider (desktop only)
 *  - Nav row: Dashboard + Applications dropdown (centred) | ← Main Site CTA (right)
 *  - Bottom blue gradient divider (desktop only)
 *  - Mobile/tablet drawer with accordion for Applications
 */

"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  ChevronDown,
  ClipboardList,
  FileText,
  LayoutDashboard,
  LogOut,
  Menu,
  Users,
  X,
} from "lucide-react";

type DropdownKey = "applications" | null;

const APPLICATIONS = [
  {
    href: "/admin/invoices",
    label: "Invoices",
    description: "Manage client invoices",
    Icon: FileText,
  },
  {
    href: "/admin/quotations",
    label: "Quotations",
    description: "Draft and track quotes",
    Icon: ClipboardList,
  },
  {
    href: "/admin/brand-manual",
    label: "Brand Manual",
    description: "DGC brand guidelines",
    Icon: BookOpen,
  },
  {
    href: "/admin/contacts",
    label: "Contacts",
    description: "Client & partner directory",
    Icon: Users,
  },
  {
    href: "/admin/calendar",
    label: "Events Calendar",
    description: "Schedule and events",
    Icon: Calendar,
  },
] as const;

function AdminHeader() {
  const pathname = usePathname();
  const [activeDropdown, setActiveDropdown] = useState<DropdownKey>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
      if (avatarRef.current && !avatarRef.current.contains(e.target as Node)) {
        setAvatarOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const closeAll = () => {
    setActiveDropdown(null);
    setMobileOpen(false);
    setAvatarOpen(false);
  };

  const appsActive = APPLICATIONS.some((a) => pathname.startsWith(a.href));

  return (
    <header className="sticky top-0 z-[60] w-full bg-white/95 backdrop-blur-[18px]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-3">
        {/* ── Top banner row: logo+badge  |  status + avatar ── */}
        <div className="flex items-center justify-between gap-4">

          {/* Left: Logo + BEACON badge */}
          <Link
            href="/admin/dashboard"
            onClick={closeAll}
            className="flex items-center gap-2.5 shrink-0"
            aria-label="DGC Beacon home"
          >
            <Image
              src="/logo.svg"
              alt="Devex Global Consult Logo"
              width={150}
              height={50}
              className="h-12 w-auto"
            />
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-dgc-dark-blue-1 text-white text-[9px] font-bold tracking-[0.15em] uppercase">
              <span className="w-1 h-1 rounded-full bg-dgc-light" />
              Beacon
            </span>
          </Link>

          {/* Right: status + avatar — desktop only */}
          <div className="hidden lg:flex items-center gap-4">
            {/* All Systems Operational indicator */}
            <div className="flex items-center gap-2 text-[12px] text-black/55">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <span>All Systems Operational</span>
            </div>

            {/* Admin avatar dropdown */}
            <div className="relative" ref={avatarRef}>
              <button
                type="button"
                onClick={() => setAvatarOpen((v) => !v)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-black/10 hover:bg-black/5 transition-colors"
                aria-expanded={avatarOpen}
                aria-haspopup="menu"
              >
                <div className="w-7 h-7 rounded-full bg-dgc-blue-1/20 border border-dgc-blue-1/40 flex items-center justify-center shrink-0">
                  <span className="text-[10px] font-bold text-dgc-blue-1">AU</span>
                </div>
                <span className="text-[12px] text-black/60 font-medium hidden sm:inline">
                  admin@devexglobal.com
                </span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-black/40 transition-transform duration-200 ${
                    avatarOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Avatar dropdown panel */}
              {avatarOpen && (
                <div className="absolute top-full right-0 mt-2 w-52 rounded-xl bg-white border border-black/10 shadow-2xl shadow-black/10 overflow-hidden z-50">
                  <div className="px-4 py-3 border-b border-black/5">
                    <p className="text-xs font-semibold text-gray-900">Admin User</p>
                    <p className="text-[11px] text-gray-500 mt-0.5">admin@devexglobal.com</p>
                  </div>
                  <div className="p-1.5">
                    <Link
                      href="/"
                      onClick={closeAll}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="w-4 h-4 shrink-0" />
                      Log Out
                    </Link>
                  </div>
                </div>
              )}
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

      {/* Blue gradient divider — desktop only */}
      <div className="hidden lg:block max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-px bg-gradient-to-r from-transparent via-dgc-blue-1 to-transparent opacity-90 shadow-[0_0_14px_rgba(61,157,217,0.35)]" />
      </div>

      {/* ── Nav row ── */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="relative flex items-center justify-center">

          {/* Desktop nav (centred) */}
          <nav
            ref={dropdownRef}
            className="hidden lg:flex items-center gap-1 relative mx-auto pr-36"
          >
            {/* Dashboard — direct link */}
            <Link
              href="/admin/dashboard"
              onClick={closeAll}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                pathname === "/admin/dashboard"
                  ? "bg-dgc-blue-1/10 text-dgc-blue-1"
                  : "text-black/70 hover:text-black hover:bg-black/5"
              }`}
            >
              <LayoutDashboard
                className={`w-4 h-4 ${
                  pathname === "/admin/dashboard" ? "text-dgc-blue-1" : "text-black/40"
                }`}
              />
              Dashboard
            </Link>

            {/* Applications — dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown("applications")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                type="button"
                onClick={() =>
                  setActiveDropdown(activeDropdown === "applications" ? null : "applications")
                }
                className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  appsActive
                    ? "bg-dgc-blue-1/10 text-dgc-blue-1"
                    : "text-black/70 hover:text-black hover:bg-black/5"
                }`}
                aria-expanded={activeDropdown === "applications"}
                aria-haspopup="menu"
              >
                Applications
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    activeDropdown === "applications" ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown panel */}
              <div
                className={`absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50 transition-all duration-200 origin-top ${
                  activeDropdown === "applications"
                    ? "opacity-100 scale-100 pointer-events-auto"
                    : "opacity-0 scale-95 pointer-events-none"
                }`}
                role="menu"
                aria-label="Applications menu"
              >
                <div className="w-[560px] rounded-2xl bg-white border border-black/10 shadow-2xl shadow-black/10">
                  <div className="p-4 grid grid-cols-2 gap-2">
                    {APPLICATIONS.map(({ href, label, description, Icon }) => {
                      const isActive = pathname.startsWith(href);
                      return (
                        <Link
                          key={href}
                          href={href}
                          onClick={closeAll}
                          className={`flex items-start gap-3 p-3 rounded-xl transition-colors group ${
                            isActive ? "bg-dgc-blue-1/5" : "hover:bg-gray-50"
                          }`}
                          role="menuitem"
                        >
                          <div
                            className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                              isActive
                                ? "bg-dgc-blue-1/10"
                                : "bg-gray-100 group-hover:bg-gray-200"
                            }`}
                          >
                            <Icon
                              className={`w-4 h-4 ${
                                isActive ? "text-dgc-blue-1" : "text-dgc-blue-2"
                              }`}
                            />
                          </div>
                          <div className="min-w-0">
                            <p
                              className={`text-sm font-semibold leading-snug transition-colors ${
                                isActive
                                  ? "text-dgc-blue-1"
                                  : "text-gray-900 group-hover:text-dgc-dark-blue-2"
                              }`}
                            >
                              {label}
                            </p>
                            <p className="text-xs text-gray-500 mt-1 truncate">{description}</p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </nav>

          {/* ← Main Site CTA (right) */}
          <Link
            href="/"
            onClick={closeAll}
            className="hidden lg:inline-flex absolute right-0 items-center gap-2 px-4 py-2 rounded-xl border border-black/15 text-sm font-semibold text-black/80 hover:text-black hover:bg-black/5 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Main Site
          </Link>
        </div>

        {/* ── Mobile / tablet drawer ── */}
        {mobileOpen && (
          <div className="lg:hidden mt-3 rounded-2xl bg-white border border-black/10 shadow-xl overflow-hidden">
            <nav className="p-2 space-y-0.5">

              {/* Dashboard */}
              <Link
                href="/admin/dashboard"
                onClick={closeAll}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                  pathname === "/admin/dashboard"
                    ? "bg-dgc-blue-1/10 text-dgc-blue-1"
                    : "text-black/80 hover:bg-black/5"
                }`}
              >
                <LayoutDashboard className="w-4 h-4 shrink-0" />
                Dashboard
              </Link>

              {/* Applications — accordion */}
              <div>
                <button
                  type="button"
                  onClick={() =>
                    setActiveDropdown(activeDropdown === "applications" ? null : "applications")
                  }
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold text-black/80 hover:bg-black/5 transition-colors"
                >
                  <span>Applications</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      activeDropdown === "applications" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {activeDropdown === "applications" && (
                  <div className="mt-0.5 ml-3 pl-3 border-l border-black/10 space-y-0.5">
                    {APPLICATIONS.map(({ href, label, Icon }) => (
                      <Link
                        key={href}
                        href={href}
                        onClick={closeAll}
                        className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${
                          pathname.startsWith(href)
                            ? "text-dgc-blue-1 bg-dgc-blue-1/5"
                            : "text-black/70 hover:bg-black/5"
                        }`}
                      >
                        <Icon className="w-4 h-4 shrink-0" />
                        {label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Status row */}
              <div className="flex items-center gap-2 px-3 py-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                <span className="text-xs text-black/55">All Systems Operational</span>
              </div>

              {/* CTAs */}
              <div className="pt-2 pb-1 px-1 space-y-1.5">
                <Link
                  href="/"
                  onClick={closeAll}
                  className="w-full inline-flex justify-center items-center gap-2 px-4 py-3 rounded-xl bg-dgc-dark-blue-1 text-white text-sm font-semibold hover:bg-dgc-dark-blue-2 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Main Site
                </Link>
                <button
                  type="button"
                  className="w-full inline-flex justify-center items-center gap-2 px-4 py-2.5 rounded-xl text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Log Out
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>

      {/* Bottom blue gradient divider — desktop only */}
      <div className="hidden lg:block max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-px bg-gradient-to-r from-transparent via-dgc-blue-1 to-transparent opacity-90 shadow-[0_0_14px_rgba(61,157,217,0.35)]" />
      </div>
    </header>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      <main className="max-w-[1440px] mx-auto px-6 lg:px-10 py-8">
        {children}
      </main>
    </div>
  );
}
