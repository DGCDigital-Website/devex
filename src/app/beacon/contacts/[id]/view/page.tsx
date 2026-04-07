import { notFound } from "next/navigation";
import { requireBeaconAuth } from "@/utils/supabase/beacon";
import Link from "next/link";
import BeaconShell from "@/components/beacon/beacon-shell";
import StatusBadge from "@/components/beacon/status-badge";
import {
  ArrowLeft,
  Pencil,
  Mail,
  Phone,
  Building2,
  MapPin,
  User,
  ShieldCheck,
  Calendar,
} from "lucide-react";

export const dynamic = "force-dynamic";

function formatDate(iso: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string | null | undefined;
}) {
  return (
    <div className="flex items-start gap-3 py-3.5 border-b border-gray-50 last:border-0">
      <div className="w-8 h-8 rounded-lg bg-dgc-blue-1/8 flex items-center justify-center shrink-0 mt-0.5">
        <Icon className="w-4 h-4 text-dgc-blue-1/70" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-gray-400 text-[11px] font-medium uppercase tracking-wide">{label}</p>
        <p className="text-gray-800 text-sm font-medium mt-0.5 break-words">{value || "—"}</p>
      </div>
    </div>
  );
}

const AVATAR_PALETTE = [
  "bg-violet-100 text-violet-700",
  "bg-sky-100 text-sky-700",
  "bg-emerald-100 text-emerald-700",
  "bg-amber-100 text-amber-700",
  "bg-rose-100 text-rose-700",
  "bg-indigo-100 text-indigo-700",
];
function avatarColor(name: string) {
  return AVATAR_PALETTE[name.charCodeAt(0) % AVATAR_PALETTE.length];
}
function initials(name: string) {
  return name.split(" ").slice(0, 2).map((p) => p[0] ?? "").join("").toUpperCase();
}

export default async function ContactViewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { db: supabase, user } = await requireBeaconAuth();

  const { data: contact } = await supabase
    .from("contacts")
    .select("*")
    .eq("id", Number(id))
    .single();

  if (!contact) notFound();

  const beaconUser = { email: user.email ?? "", id: user.id };

  return (
    <BeaconShell
      user={beaconUser}
      title="Contact Details"
      subtitle={contact.full_name}
      actions={
        <Link
          href={`/beacon/contacts/${id}/edit`}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all shadow-[0_2px_8px_rgba(61,157,217,0.3)] hover:shadow-[0_4px_16px_rgba(61,157,217,0.4)] hover:-translate-y-px"
          style={{ background: "linear-gradient(135deg,#3D9DD9,#177DA6)" }}
        >
          <Pencil className="w-4 h-4" />
          Edit Contact
        </Link>
      }
    >
      <Link
        href="/beacon/contacts"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Contacts
      </Link>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Profile card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-gray-200/80 shadow-[0_1px_4px_rgba(0,0,0,0.06)] overflow-hidden">
            <div
              className="h-24 w-full"
              style={{ background: "linear-gradient(135deg,#0B2D59,#177DA6)" }}
            />
            <div className="px-6 pb-6 -mt-10">
              <div
                className={`w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-bold border-4 border-white shadow-md ${avatarColor(contact.full_name)}`}
              >
                {initials(contact.full_name)}
              </div>
              <div className="mt-3 space-y-1">
                <h2 className="text-gray-900 font-bold text-lg leading-tight">{contact.full_name}</h2>
                <p className="text-gray-500 text-sm">{contact.role || "Contact"}</p>
                <div className="pt-1">
                  <StatusBadge status={contact.status} />
                </div>
              </div>
            </div>
          </div>

          {/* Meta */}
          <div className="bg-white rounded-2xl border border-gray-200/80 shadow-[0_1px_4px_rgba(0,0,0,0.06)] p-5 mt-4 space-y-2">
            <p className="text-gray-400 text-[11px] font-semibold uppercase tracking-wider mb-3">Account Info</p>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Plan</span>
              <span className="font-medium text-gray-800 capitalize">{contact.current_plan || "—"}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Billing</span>
              <span className="font-medium text-gray-800">{contact.billing || "—"}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Joined</span>
              <span className="font-medium text-gray-800">{formatDate(contact.created_at)}</span>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="lg:col-span-2 space-y-5">
          <div className="bg-white rounded-2xl border border-gray-200/80 shadow-[0_1px_4px_rgba(0,0,0,0.06)] overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-dgc-blue-1/10 flex items-center justify-center">
                <User className="w-3.5 h-3.5 text-dgc-blue-1" />
              </div>
              <h3 className="text-gray-800 font-semibold text-sm">Contact Information</h3>
            </div>
            <div className="px-6 py-2">
              <InfoRow icon={Mail}     label="Email"    value={contact.email} />
              <InfoRow icon={Phone}    label="Phone"    value={contact.contact} />
              <InfoRow icon={Building2}label="Company"  value={contact.company} />
              <InfoRow icon={MapPin}   label="Country"  value={contact.country} />
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200/80 shadow-[0_1px_4px_rgba(0,0,0,0.06)] overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-emerald-50 flex items-center justify-center">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              </div>
              <h3 className="text-gray-800 font-semibold text-sm">Account Settings</h3>
            </div>
            <div className="px-6 py-2">
              <InfoRow icon={User}     label="Username" value={contact.username} />
              <InfoRow icon={ShieldCheck} label="Role" value={contact.role} />
              <InfoRow icon={Calendar} label="Last Updated" value={formatDate(contact.created_at)} />
            </div>
          </div>
        </div>
      </div>
    </BeaconShell>
  );
}
