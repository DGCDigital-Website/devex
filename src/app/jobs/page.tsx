import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, Calendar, ArrowRight } from "lucide-react";
import { createClient } from "@/utils/supabase/server";
import { JOB_POSTINGS } from "@/lib/data";

export const metadata: Metadata = {
  title: "Careers | Devex Global Consult",
  description:
    "Join the DGC team. We hire passionate development professionals across East Africa and beyond.",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

type JobRow = {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string | null;
  deadline: string | null;
  requirements: string[] | null;
  thematic: string | null;
};

export default async function JobsPage() {
  let jobs: JobRow[] = [];

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("jobs")
      .select("id, title, department, location, type, description, deadline, requirements, thematic")
      .order("created_at", { ascending: false });

    if (!error && data && data.length > 0) {
      jobs = data as JobRow[];
    } else {
      // Fall back to static data when Supabase is empty or unreachable
      jobs = JOB_POSTINGS.map((j) => ({
        id: j.id,
        title: j.title,
        department: "General",
        location: j.location,
        type: j.type,
        description: j.description,
        deadline: j.deadline,
        requirements: j.requirements,
        thematic: j.thematic ?? null,
      }));
    }
  } catch {
    jobs = JOB_POSTINGS.map((j) => ({
      id: j.id,
      title: j.title,
      department: "General",
      location: j.location,
      type: j.type,
      description: j.description,
      deadline: j.deadline,
      requirements: j.requirements,
      thematic: j.thematic ?? null,
    }));
  }

  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Hero */}
      <section className="pt-28 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-dgc-dark-blue-1/8 via-blue-50/50 to-white" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_10%_50%,rgba(61,157,217,0.06),transparent)]" />
        <div className="relative max-w-5xl mx-auto px-6 sm:px-10">
          <p className="text-dgc-blue-1 text-xs font-semibold tracking-[0.18em] uppercase mb-4">
            Careers
          </p>
          <h1
            className="leading-tight mb-4"
            style={{ fontSize: "clamp(2rem,5vw,3.5rem)" }}
          >
            <span className="title-thin">Join </span><span className="title-highlight">Our Team</span>
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed max-w-2xl">
            We&apos;re always looking for passionate, experienced development
            professionals to join DGC&apos;s growing team across East Africa and
            beyond.
          </p>
        </div>
      </section>

      {/* Listings */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6 sm:px-10">
          <div className="mb-10">
            <p className="text-dgc-blue-1 text-[11px] font-semibold tracking-[0.18em] uppercase mb-1">
              Open Positions
            </p>
            <h2 className="text-2xl sm:text-3xl leading-tight">
              <span className="title-thin">{jobs.length} Open </span><span className="title-highlight">Role{jobs.length !== 1 ? "s" : ""}</span>
            </h2>
          </div>

          {jobs.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <p className="text-lg font-medium">
                No open positions at the moment.
              </p>
              <p className="text-sm mt-2">
                Check back soon or send your CV to{" "}
                <a
                  href="mailto:info@devexglobal.com"
                  className="text-dgc-blue-1 hover:underline"
                >
                  info@devexglobal.com
                </a>
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              {jobs.map((job) => (
                <div
                  key={job.id}
                  id={job.id}
                  className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm hover:border-dgc-blue-1/30 transition-all duration-300"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
                    <div className="space-y-3">
                      <div className="flex flex-wrap items-center gap-3">
                        <h2 className="text-gray-900 font-bold text-lg">
                          {job.title}
                        </h2>
                        <span className="bg-blue-50 text-dgc-blue-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full border border-dgc-blue-1/30">
                          {job.type}
                        </span>
                        {job.department && job.department !== "General" && (
                          <span className="bg-gray-50 text-gray-500 text-[11px] font-medium px-2.5 py-0.5 rounded-full border border-gray-200">
                            {job.department}
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-gray-500 text-sm">
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-dgc-blue-1" />
                          {job.location}
                        </span>
                        {job.deadline && (
                          <span className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-dgc-blue-1" />
                            Deadline: {formatDate(job.deadline)}
                          </span>
                        )}
                      </div>
                      {job.description && (
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {job.description}
                        </p>
                      )}
                      {job.requirements && job.requirements.length > 0 && (
                        <div className="pt-1">
                          <p className="text-gray-400 text-xs mb-2 font-medium">
                            Requirements:
                          </p>
                          <ul className="space-y-1.5">
                            {job.requirements.map((req) => (
                              <li
                                key={req}
                                className="text-gray-500 text-sm flex items-start gap-2"
                              >
                                <span className="w-1 h-1 rounded-full bg-dgc-blue-1 shrink-0 mt-2" />
                                {req}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                    <Link
                      href="/contact"
                      className="shrink-0 inline-flex items-center gap-2 border border-dgc-blue-1/50 hover:border-dgc-blue-1 hover:bg-blue-50 text-gray-700 hover:text-dgc-blue-1 font-semibold px-5 py-2.5 rounded-xl transition-all text-sm"
                    >
                      Apply Now <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Spontaneous */}
          <div className="mt-10 p-8 rounded-2xl bg-blue-50/50 border border-dgc-blue-1/15 text-center">
            <h3 className="text-gray-900 font-semibold text-lg mb-2">
              Don&apos;t see a suitable opening?
            </h3>
            <p className="text-gray-500 text-sm mb-5">
              We welcome spontaneous applications from experienced development
              professionals. Send your CV and a short cover note.
            </p>
            <a
              href="mailto:info@devexglobal.com"
              className="inline-flex items-center gap-2 border border-dgc-blue-1/50 hover:border-dgc-blue-1 hover:bg-blue-50 text-gray-700 hover:text-dgc-blue-1 font-semibold px-6 py-3 rounded-xl transition-colors text-sm"
            >
              Send a Spontaneous Application
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
