"use client";

import Link from "next/link";
import { useState } from "react";
import { Plus, Search, Mail, Phone, Globe } from "lucide-react";
import { ADMIN_CONTACTS, AdminContact } from "@/lib/admin-data";

type TypeFilter = "all" | "client" | "donor" | "partner" | "government";

const TYPE_COLORS: Record<AdminContact["type"], string> = {
  client: "bg-[#3D9DD9]/10 text-[#3D9DD9] border border-[#3D9DD9]/30",
  donor: "bg-purple-50 text-purple-700 border border-purple-200",
  partner: "bg-green-50 text-green-700 border border-green-200",
  government: "bg-[#0B2D59]/10 text-[#0B2D59] border border-[#0B2D59]/20",
};

const AVATAR_COLORS = [
  "bg-[#3D9DD9]",
  "bg-[#177DA6]",
  "bg-[#0B2D59]",
  "bg-purple-600",
  "bg-green-600",
  "bg-rose-500",
  "bg-amber-600",
  "bg-teal-600",
];

function getInitials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

function getAvatarColor(name: string) {
  const idx = name.charCodeAt(0) % AVATAR_COLORS.length;
  return AVATAR_COLORS[idx];
}

export default function ContactsPage() {
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");
  const [search, setSearch] = useState("");

  const filtered = ADMIN_CONTACTS.filter((c) => {
    const matchType = typeFilter === "all" || c.type === typeFilter;
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      c.name.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q) ||
      c.organisation.toLowerCase().includes(q) ||
      c.country.toLowerCase().includes(q);
    return matchType && matchSearch;
  });

  const tabs: { key: TypeFilter; label: string }[] = [
    { key: "all", label: "All" },
    { key: "client", label: "Clients" },
    { key: "donor", label: "Donors" },
    { key: "partner", label: "Partners" },
    { key: "government", label: "Government" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Contacts</h1>
          <p className="text-sm text-gray-500 mt-1">Directory of DGC clients, donors, and partners.</p>
        </div>
        <Link
          href="/admin/contacts/new"
          className="inline-flex items-center gap-2 bg-[#3D9DD9] hover:bg-[#177DA6] text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors shadow-sm"
        >
          <Plus size={16} />
          Add Contact
        </Link>
      </div>

      {/* Search + Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, organisation..."
            className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3D9DD9]/30 focus:border-[#3D9DD9] bg-white transition-colors"
          />
        </div>
        <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-lg p-1">
          {tabs.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setTypeFilter(key)}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                typeFilter === key
                  ? "bg-[#3D9DD9] text-white shadow-sm"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Count */}
      <p className="text-xs text-gray-400">
        Showing {filtered.length} of {ADMIN_CONTACTS.length} contacts
      </p>

      {/* Cards grid */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <p className="text-gray-400 text-sm">No contacts match your search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((contact) => (
            <div
              key={contact.id}
              className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md hover:border-[#3D9DD9]/30 transition-all"
            >
              {/* Avatar + Name */}
              <div className="flex items-start gap-3 mb-4">
                <div
                  className={`w-11 h-11 rounded-full ${getAvatarColor(contact.name)} flex items-center justify-center flex-shrink-0`}
                >
                  <span className="text-white text-sm font-bold">{getInitials(contact.name)}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-semibold text-gray-800 text-sm leading-tight">{contact.name}</p>
                    <span
                      className={`text-xs font-medium px-2 py-0.5 rounded-full capitalize flex-shrink-0 ${TYPE_COLORS[contact.type]}`}
                    >
                      {contact.type}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">{contact.role}</p>
                </div>
              </div>

              {/* Org */}
              <div className="mb-3 pb-3 border-b border-gray-50">
                <p className="text-sm text-gray-700 font-medium truncate">{contact.organisation}</p>
              </div>

              {/* Contact details */}
              <div className="space-y-1.5">
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-center gap-2 text-xs text-gray-500 hover:text-[#3D9DD9] transition-colors group"
                >
                  <Mail size={13} className="text-gray-300 group-hover:text-[#3D9DD9] flex-shrink-0" />
                  <span className="truncate">{contact.email}</span>
                </a>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Phone size={13} className="text-gray-300 flex-shrink-0" />
                  <span>{contact.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Globe size={13} className="text-gray-300 flex-shrink-0" />
                  <span>{contact.country}</span>
                </div>
              </div>

              {/* Status */}
              <div className="mt-4 flex items-center justify-between">
                <span
                  className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    contact.status === "active"
                      ? "bg-green-50 text-green-600 border border-green-200"
                      : "bg-gray-100 text-gray-400 border border-gray-200"
                  }`}
                >
                  {contact.status}
                </span>
                <span className="text-xs text-gray-300">
                  Added {new Date(contact.addedDate).toLocaleDateString("en-GB", { month: "short", year: "numeric" })}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
