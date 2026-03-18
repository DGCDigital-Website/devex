import Link from "next/link";
import { Container } from "@/components/ui/container";

const SERVICES = [
  {
    href: "/services/organizational-strengthening",
    title: "Organizational Strengthening",
    description: "Building resilient institutions and effective governance.",
  },
  {
    href: "/services/capacity-strengthening",
    title: "Capacity Strengthening",
    description: "Empowering people and teams to deliver at scale.",
  },
  {
    href: "/services/system-strengthening",
    title: "System Strengthening",
    description: "Designing systems that support programme delivery.",
  },
  {
    href: "/services/safety-security",
    title: "Safety & Security",
    description: "Protecting people and operations in complex environments.",
  },
] as const;

export default function ServicesPage() {
  return (
    <main className="py-10 sm:py-14">
      <Container>
        <div className="max-w-3xl">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Services
          </h1>
          <p className="mt-4 text-gray-600 leading-relaxed">
            Explore our consultancy service areas. Each page can be expanded with
            approach, methods, case studies, and deliverables.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SERVICES.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="rounded-2xl border border-gray-200 bg-white p-5 hover:border-dgc-blue-1/40 hover:shadow-lg transition-all"
            >
              <div className="text-lg font-semibold text-gray-900">{s.title}</div>
              <div className="mt-2 text-sm text-gray-600">{s.description}</div>
              <div className="mt-4 text-sm font-semibold text-dgc-blue-2">
                Learn more →
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </main>
  );
}

