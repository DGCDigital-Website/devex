"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  CalendarDays,
  FileText,
  ClipboardList,
  Palette,
  Globe,
  LogOut,
  Menu,
  X,
  ExternalLink,
  ChevronRight,
} from "lucide-react";
import type { BeaconUser } from "@/lib/beacon/types";

// ── nav config ────────────────────────────────────────────────────────────────

type NavItem = {
  label: string;
  icon: React.ElementType;
  href: string;
  external?: boolean;
};

type NavGroup = {
  label: string;
  items: NavItem[];
};

const NAV_GROUPS: NavGroup[] = [
  {
    label: "Dashboard",
    items: [{ label: "Overview", icon: LayoutDashboard, href: "/beacon" }],
  },
  {
    label: "Operations",
    items: [
      { label: "Contacts", icon: Users, href: "/beacon/contacts" },
      { label: "Jobs", icon: Briefcase, href: "/beacon/jobs" },
      { label: "Calendar", icon: CalendarDays, href: "/beacon/calendar" },
    ],
  },
  {
    label: "Finance",
    items: [
      { label: "Invoices", icon: FileText, href: "/beacon/invoices" },
      { label: "Quotations", icon: ClipboardList, href: "/beacon/quotations" },
    ],
  },
  {
    label: "Brand",
    items: [{ label: "Brand Manual", icon: Palette, href: "/beacon/brand" }],
  },
  {
    label: "External",
    items: [
      { label: "Public Site", icon: Globe, href: "/", external: true },
    ],
  },
];

// ── types ─────────────────────────────────────────────────────────────────────

type Props = {
  user: BeaconUser;
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
};

// ── component ─────────────────────────────────────────────────────────────────

export default function BeaconShell({
  user,
  title,
  subtitle,
  actions,
  children,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  function isActive(item: NavItem) {
    if (item.external) return false;
    if (item.href === "/beacon") return pathname === "/beacon";
    return pathname.startsWith(item.href);
  }

  /* ── sidebar ── */
  const SidebarContent = ({ mobile = false }: { mobile?: boolean }) => (
    <aside
      className={
        mobile
          ? "flex flex-col h-full w-72"
          : "hidden lg:flex flex-col w-60 xl:w-64 shrink-0 h-screen sticky top-0"
      }
      style={{ background: "linear-gradient(180deg, #0B2D59 0%, #091e40 100%)" }}
    >
      {/* Logo */}
      <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <Image
            src="/logo.svg"
            alt="DGC"
            width={120}
            height={36}
            className="h-8 w-auto brightness-0 invert"
          />
          <div className="h-4 w-px bg-white/15" />
          <span className="text-white/50 text-[11px] font-bold tracking-[0.12em] uppercase">
            Beacon
          </span>
        </div>
        {mobile && (
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-white/40 hover:text-white transition-colors p-1"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-4 overflow-y-auto scrollbar-none">
        {NAV_GROUPS.map((group) => (
          <div key={group.label}>
            <p className="px-3 text-[9.5px] font-semibold text-white/20 tracking-[0.14em] uppercase mb-1.5">
              {group.label}
            </p>
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const Icon = item.icon;
                const active = isActive(item);
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.external ? "_blank" : "_self"}
                    rel="noopener noreferrer"
                    onClick={() => mobile && setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-[0.8125rem] font-medium transition-all duration-150 group ${
                      active
                        ? "bg-white/10 text-white"
                        : "text-white/50 hover:bg-white/[0.07] hover:text-white/85"
                    }`}
                  >
                    <Icon
                      className={`w-4 h-4 shrink-0 ${
                        active ? "text-dgc-blue-1" : ""
                      }`}
                    />
                    <span className="flex-1">{item.label}</span>
                    {item.external && (
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-40 transition-opacity" />
                    )}
                    {active && !item.external && (
                      <span className="w-1.5 h-1.5 rounded-full bg-dgc-blue-1 shrink-0" />
                    )}
                  </a>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* User */}
      <div className="px-4 py-4 border-t border-white/10 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-dgc-blue-1/20 border border-dgc-blue-1/25 flex items-center justify-center shrink-0">
            <span className="text-dgc-blue-1 text-xs font-bold">
              {user.email[0]?.toUpperCase()}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white/75 text-xs font-medium truncate">
              {user.email}
            </p>
            <p className="text-white/25 text-[10px] mt-0.5">Administrator</p>
          </div>
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            title="Sign out"
            className="text-white/25 hover:text-white/60 transition-colors disabled:opacity-40 shrink-0 p-1"
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );

  /* ── render ── */
  return (
    <div className="flex min-h-screen bg-[#f4f6fa] font-neometric antialiased">
      {/* Desktop sidebar */}
      <SidebarContent />

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-40 flex">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="relative z-10 h-full">
            <SidebarContent mobile />
          </div>
        </div>
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="sticky top-0 z-30 bg-white/85 backdrop-blur-md border-b border-gray-200/70 shrink-0">
          <div className="h-14 px-5 lg:px-8 flex items-center justify-between gap-4">
            {/* Left */}
            <div className="flex items-center gap-3 min-w-0">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-1.5 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors shrink-0"
              >
                <Menu className="w-5 h-5" />
              </button>
              <nav className="flex items-center gap-1.5 text-sm min-w-0">
                <span className="text-gray-400 shrink-0">Beacon</span>
                <ChevronRight className="w-3.5 h-3.5 text-gray-300 shrink-0" />
                <span className="text-gray-700 font-medium truncate">{title}</span>
              </nav>
            </div>

            {/* Right */}
            <div className="flex items-center gap-2 shrink-0">
              {actions}
              <button
                onClick={handleLogout}
                disabled={loggingOut}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition-all disabled:opacity-50"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">
                  {loggingOut ? "Signing out…" : "Sign out"}
                </span>
              </button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 flex flex-col px-5 lg:px-8 py-7 max-w-[1280px] w-full mx-auto">
          {/* Page header */}
          {(title || subtitle || actions) && (
            <div className="flex items-start justify-between gap-4 mb-7">
              <div>
                <h1 className="text-gray-900 text-[1.375rem] font-bold tracking-tight leading-tight">
                  {title}
                </h1>
                {subtitle && (
                  <p className="text-gray-500 text-sm mt-1">{subtitle}</p>
                )}
              </div>
            </div>
          )}
          {children}
        </main>

        {/* Footer */}
        <footer className="px-5 lg:px-8 py-4 border-t border-gray-200/60 mt-auto">
          <p className="text-gray-400 text-xs">
            © {new Date().getFullYear()} Devex Global Consult · Beacon ·
            Internal use only
          </p>
        </footer>
      </div>
    </div>
  );
}
