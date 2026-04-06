import type { Metadata } from "next";
import { User } from "lucide-react";
import { TEAM_MEMBERS } from "@/lib/data";

export const metadata: Metadata = {
  title: "Our Team | Devex Global Consult",
  description:
    "Meet the DGC team — a multidisciplinary group of development professionals with deep expertise across Africa and beyond.",
};

export default function TeamPage() {
  const featured = TEAM_MEMBERS.filter((m) => m.featured);
  const rest = TEAM_MEMBERS.filter((m) => !m.featured);

  return (
    <main className="min-h-screen bg-white text-gray-900">

      {/* Hero */}
      <section className="pt-28 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-dgc-dark-blue-1/8 via-blue-50/50 to-white" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_50%_0%,rgba(61,157,217,0.06),transparent)]" />
        <div className="relative max-w-5xl mx-auto px-6 sm:px-10 text-center">
          <p className="text-dgc-blue-1 text-xs font-semibold tracking-[0.18em] uppercase mb-4">Our Team</p>
          <h1 className="leading-tight mb-4" style={{ fontSize: "clamp(2rem,5vw,3.5rem)" }}>
            <span className="title-thin">The Experts Behind </span><span className="title-highlight">DGC</span>
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto">
            Our multidisciplinary team brings decades of combined experience across evaluation, organisational
            development, gender, health systems, and safety & security.
          </p>
        </div>
      </section>

      {/* Senior Team */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6 sm:px-10">
          <div className="mb-10">
            <p className="text-dgc-blue-1 text-[11px] font-semibold tracking-[0.18em] uppercase mb-1">Leadership</p>
            <h2 className="text-2xl sm:text-3xl leading-tight"><span className="title-thin">Senior </span><span className="title-highlight">Team</span></h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featured.map((member) => (
              <div
                key={member.id}
                className="group rounded-2xl bg-white border border-gray-200 shadow-sm overflow-hidden hover:border-dgc-blue-1/30 transition-all duration-300"
              >
                <div className="h-44 bg-blue-50 flex items-center justify-center relative">
                  <div className="w-20 h-20 rounded-full bg-blue-50 border border-dgc-blue-1/20 flex items-center justify-center">
                    <User className="w-10 h-10 text-dgc-blue-1/40" />
                  </div>
                  {member.id === "albino-luciani" && (
                    <div className="absolute top-3 right-3">
                      <span className="bg-blue-50 text-dgc-blue-1 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-dgc-blue-1/30">
                        CEO
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-5 space-y-3">
                  <div>
                    <h3 className="text-gray-900 font-bold text-base">
                      {member.name}
                      {member.credentials && (
                        <span className="text-dgc-blue-1 text-sm ml-1">({member.credentials})</span>
                      )}
                    </h3>
                    <p className="text-gray-500 text-sm">{member.role}</p>
                    {member.countriesCount && (
                      <p className="text-dgc-blue-1 text-xs font-medium mt-0.5">
                        {member.countriesCount}+ countries
                      </p>
                    )}
                  </div>
                  <p className="text-gray-500 text-xs leading-relaxed">{member.bio}</p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {member.expertise.map((e) => (
                      <span
                        key={e}
                        className="bg-blue-50 text-dgc-blue-1 text-[10px] font-medium px-2 py-0.5 rounded-full"
                      >
                        {e}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Full Team */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6 sm:px-10">
          <div className="mb-10">
            <p className="text-dgc-blue-1 text-[11px] font-semibold tracking-[0.18em] uppercase mb-1">
              Consultants & Staff
            </p>
            <h2 className="text-2xl sm:text-3xl leading-tight"><span className="title-thin">Full </span><span className="title-highlight">Team</span></h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {rest.map((member) => (
              <div
                key={member.id}
                className="rounded-2xl bg-white border border-gray-200 shadow-sm p-5 flex items-start gap-4 hover:border-dgc-blue-1/20 transition-colors"
              >
                <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                  <User className="w-7 h-7 text-dgc-blue-1/40" />
                </div>
                <div className="space-y-1 min-w-0">
                  <h3 className="text-gray-900 font-semibold text-sm truncate">{member.name}</h3>
                  <p className="text-gray-500 text-xs">{member.role}</p>
                  <div className="flex flex-wrap gap-1 pt-1">
                    {member.expertise.slice(0, 2).map((e) => (
                      <span
                        key={e}
                        className="bg-blue-50 text-dgc-blue-1 text-[10px] font-medium px-2 py-0.5 rounded-full"
                      >
                        {e}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
