/**
 * DGC LogoHeader Component
 *
 * Features:
 * - Company logo display
 * - Announcement banner with HeroPill
 * - Clean, minimal design
 * - Responsive layout
 */

"use client";

import Image from 'next/image';
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import {
  BookOpen,
  Briefcase,
  ChevronDown,
  LayoutGrid,
  Menu,
  Newspaper,
  ShieldCheck,
  Users,
  ArrowUpRight,
  X,
} from "lucide-react";
import { HeroPill } from "@/components/ui/hero-pill";

type DropdownKey = "services" | "resources" | null;

const SERVICES = [
  {
    id: "org-strengthening",
    label: "Organizational Strengthening",
    description: "Building resilient institutions",
    Icon: Briefcase,
  },
  {
    id: "capacity-strengthening",
    label: "Capacity Strengthening",
    description: "Empowering people to deliver",
    Icon: Users,
  },
  {
    id: "system-strengthening",
    label: "System Strengthening",
    description: "Designing systems that scale",
    Icon: Newspaper,
  },
  {
    id: "safety-security",
    label: "Safety & Security System Strengthening",
    description: "Protecting people and operations",
    Icon: ShieldCheck,
  },
] as const;

const RESOURCES = [
  { href: "/blog", label: "Blog", description: "Insights and analysis", Icon: BookOpen },
  { href: "/jobs", label: "Jobs", description: "Open positions", Icon: Briefcase },
  { href: "/events", label: "Events", description: "Calendar of events", Icon: Newspaper },
  { href: "/portfolio", label: "Portfolio", description: "Case studies and work", Icon: LayoutGrid },
  { href: "/team", label: "Team", description: "Meet our consultants", Icon: Users },
] as const;

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function scrollToService(serviceId: (typeof SERVICES)[number]["id"]) {
  scrollToId("services");
  setTimeout(() => {
    const tabButton = document.querySelector(
      `[data-service-id="${serviceId}"]`
    ) as HTMLButtonElement | null;
    tabButton?.click();
  }, 700);
}

function topNavPlaceholderClick(e: React.MouseEvent, closeAll: () => void) {
  e.preventDefault();
  closeAll();
}

const LogoHeader = () => {
  const [activeDropdown, setActiveDropdown] = useState<DropdownKey>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!dropdownRef.current) return;
      if (!dropdownRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const closeAll = () => {
    setActiveDropdown(null);
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-[60] w-full bg-white/95 backdrop-blur-[18px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        {/* Top banner row: logo + announcement */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center">
            <a
              href="#top"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
                closeAll();
              }}
              className="flex items-center"
              aria-label="Devex Global Consult home"
            >
          <Image
            src="/logo.svg"
            alt="Devex Global Consult Logo"
            width={150}
            height={50}
            className="h-12 w-auto"
          />
            </a>
        </div>

          {/* Banner — desktop only (lg+); replaced by hamburger on smaller screens */}
          <div className="hidden lg:flex items-center">
          <HeroPill
            href="#contact"
            label="Engage a Consultant"
            announcement="🌍 Work with DGC"
              className="bg-black/5 text-black/80 border-black/10 hover:bg-black/10 hover:text-black transition-all duration-300"
            />
          </div>

          {/* Hamburger — visible on all screens below lg (mobile + tablet) */}
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

      {/* Divider — desktop only (hamburger menu replaces nav on mobile/tablet) */}
      <div className="hidden lg:block max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-px bg-gradient-to-r from-transparent via-dgc-blue-1 to-transparent opacity-90 shadow-[0_0_14px_rgba(61,157,217,0.35)]" />
      </div>

      {/* Menu row — desktop nav + mobile/tablet drawer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="relative flex items-center justify-center">
          <nav
            ref={dropdownRef}
            className="hidden lg:flex items-center gap-1 relative mx-auto pr-36"
          >
            <Link
              href="/"
              onClick={() => closeAll()}
              className="px-3 py-2 rounded-lg text-sm font-semibold text-black/70 hover:text-black hover:bg-black/5 transition-colors"
            >
              Home
            </Link>

            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                scrollToId("about");
                closeAll();
              }}
              className="px-3 py-2 rounded-lg text-sm font-semibold text-black/70 hover:text-black hover:bg-black/5 transition-colors"
            >
              About Us
            </a>

            <Link
              href="/portfolio"
              onClick={() => closeAll()}
              className="px-3 py-2 rounded-lg text-sm font-semibold text-black/70 hover:text-black hover:bg-black/5 transition-colors"
            >
              Portfolio
            </Link>

            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown("services")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                type="button"
                onClick={() =>
                  setActiveDropdown(activeDropdown === "services" ? null : "services")
                }
                className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-semibold text-black/70 hover:text-black hover:bg-black/5 transition-colors"
                aria-expanded={activeDropdown === "services"}
                aria-haspopup="menu"
              >
                What We Do
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    activeDropdown === "services" ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50
                  ${
                    activeDropdown === "services"
                      ? "opacity-100 scale-100 pointer-events-auto"
                      : "opacity-0 scale-95 pointer-events-none"
                  }`}
                role="menu"
                aria-label="Services menu"
              >
                <div
                  className="w-[720px] rounded-2xl bg-white border border-black/10 shadow-2xl shadow-black/10 transition-all duration-200 origin-top"
                >
                  <div className="p-4 grid grid-cols-2 gap-2">
                    {SERVICES.map((svc) => {
                      const Icon = svc.Icon;
                      return (
                        <button
                          key={svc.id}
                          type="button"
                          onClick={() => {
                            scrollToService(svc.id);
                            closeAll();
                          }}
                          className="text-left flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
                          role="menuitem"
                        >
                          <div className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center shrink-0 group-hover:bg-gray-200 transition-colors">
                            <Icon className="w-4 h-4 text-dgc-blue-2" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-gray-900 group-hover:text-dgc-dark-blue-2 transition-colors leading-snug">
                              {svc.label}
                            </p>
                            <p className="text-xs text-gray-500 mt-1 truncate">
                              {svc.description}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                  <div className="border-t border-black/5 px-4 py-3">
                    <Link
                      href="/services"
                      onClick={() => closeAll()}
                      className="text-xs text-dgc-blue-2 hover:text-dgc-blue-1 font-medium transition-colors"
                    >
                      View all services →
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown("resources")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                type="button"
                onClick={() =>
                  setActiveDropdown(
                    activeDropdown === "resources" ? null : "resources"
                  )
                }
                className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-semibold text-black/70 hover:text-black hover:bg-black/5 transition-colors"
                aria-expanded={activeDropdown === "resources"}
                aria-haspopup="menu"
              >
                Resources
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    activeDropdown === "resources" ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50
                  ${
                    activeDropdown === "resources"
                      ? "opacity-100 scale-100 pointer-events-auto"
                      : "opacity-0 scale-95 pointer-events-none"
                  }`}
                role="menu"
                aria-label="Resources menu"
              >
                <div className="w-[720px] rounded-2xl bg-white border border-black/10 shadow-2xl shadow-black/10 transition-all duration-200 origin-top">
                  <div className="p-4 grid grid-cols-2 gap-2">
                    {RESOURCES.map((item) => {
                      const Icon = item.Icon;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => closeAll()}
                          className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
                          role="menuitem"
                        >
                          <div className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center shrink-0 group-hover:bg-gray-200 transition-colors">
                            <Icon className="w-4 h-4 text-dgc-blue-2" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-gray-900 group-hover:text-dgc-dark-blue-2 transition-colors leading-snug">
                              {item.label}
                            </p>
                            <p className="text-xs text-gray-500 mt-1 truncate">
                              {item.description}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                  <div className="border-t border-black/5 px-4 py-3">
                    <Link
                      href="/blog"
                      onClick={() => closeAll()}
                      className="text-xs text-dgc-blue-2 hover:text-dgc-blue-1 font-medium transition-colors"
                    >
                      View all resources →
                    </Link>
        </div>
      </div>
    </div>
  </div>

          </nav>

          {/* Contacts button (right) */}
          <Link
            href="/contact"
            onClick={() => closeAll()}
            className="hidden lg:inline-flex absolute right-0 items-center gap-2 px-4 py-2 rounded-xl border border-black/15 text-sm font-semibold text-black/80 hover:text-black hover:bg-black/5 transition-colors"
          >
            Contacts
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Mobile / tablet drawer (visible below lg) */}
        {mobileOpen && (
          <div className="lg:hidden mt-3 rounded-2xl bg-white border border-black/10 shadow-xl overflow-hidden">
            <nav className="p-2 space-y-0.5">
              {/* Top-level links */}
              <Link
                href="/"
                onClick={() => closeAll()}
                className="flex items-center px-3 py-2.5 rounded-lg text-sm font-semibold text-black/80 hover:bg-black/5 transition-colors"
              >
                Home
              </Link>
              <button
                type="button"
                onClick={() => { scrollToId("about"); closeAll(); }}
                className="w-full text-left flex items-center px-3 py-2.5 rounded-lg text-sm font-semibold text-black/80 hover:bg-black/5 transition-colors"
              >
                About Us
              </button>
              <Link
                href="/portfolio"
                onClick={() => closeAll()}
                className="flex items-center px-3 py-2.5 rounded-lg text-sm font-semibold text-black/80 hover:bg-black/5 transition-colors"
              >
                Portfolio
              </Link>

              {/* What We Do — accordion */}
              <div>
                <button
                  type="button"
                  onClick={() => setActiveDropdown(activeDropdown === "services" ? null : "services")}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold text-black/80 hover:bg-black/5 transition-colors"
                >
                  <span>What We Do</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === "services" ? "rotate-180" : ""}`} />
                </button>
                {activeDropdown === "services" && (
                  <div className="mt-0.5 ml-3 pl-3 border-l border-black/10 space-y-0.5">
                    {SERVICES.map((svc) => {
                      const Icon = svc.Icon;
                      return (
                        <button
                          key={svc.id}
                          type="button"
                          onClick={() => { scrollToService(svc.id); closeAll(); }}
                          className="w-full text-left flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-black/70 hover:bg-black/5 transition-colors"
                        >
                          <Icon className="w-4 h-4 text-dgc-blue-2 shrink-0" />
                          {svc.label}
                        </button>
                      );
                    })}
                    <Link
                      href="/services"
                      onClick={() => closeAll()}
                      className="flex items-center gap-1 px-3 py-2 text-xs text-dgc-blue-2 font-medium hover:text-dgc-blue-1 transition-colors"
                    >
                      View all services →
                    </Link>
                  </div>
                )}
              </div>

              {/* Resources — accordion */}
              <div>
                <button
                  type="button"
                  onClick={() => setActiveDropdown(activeDropdown === "resources" ? null : "resources")}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold text-black/80 hover:bg-black/5 transition-colors"
                >
                  <span>Resources</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === "resources" ? "rotate-180" : ""}`} />
                </button>
                {activeDropdown === "resources" && (
                  <div className="mt-0.5 ml-3 pl-3 border-l border-black/10 space-y-0.5">
                    {RESOURCES.map((item) => {
                      const Icon = item.Icon;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => closeAll()}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-black/70 hover:bg-black/5 transition-colors"
                        >
                          <Icon className="w-4 h-4 text-dgc-blue-2 shrink-0" />
                          {item.label}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Contact CTA */}
              <div className="pt-2 pb-1 px-1">
                <Link
                  href="/contact"
                  onClick={() => closeAll()}
                  className="w-full inline-flex justify-center items-center gap-2 px-4 py-3 rounded-xl bg-dgc-dark-blue-1 text-white text-sm font-semibold hover:bg-dgc-dark-blue-2 transition-colors"
                >
                  Contacts
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>

      {/* Bottom divider — desktop only */}
      <div className="hidden lg:block max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-px bg-gradient-to-r from-transparent via-dgc-blue-1 to-transparent opacity-90 shadow-[0_0_14px_rgba(61,157,217,0.35)]" />
      </div>
    </header>
  );
};

export default LogoHeader;
