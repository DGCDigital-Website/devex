import type { Metadata } from "next";
import Link from "next/link";
import { Target, Eye, Heart, Globe, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | Devex Global Consult",
  description:
    "Devex Global Consult is a leading African consulting firm delivering powerful insights and proven results across 22+ countries.",
};

const STATS = [
  { value: "480+", label: "Evaluations Completed" },
  { value: "130+", label: "Consultancies Delivered" },
  { value: "30+",  label: "Years of Experience"   },
  { value: "22",   label: "African Countries"      },
  { value: "98%",  label: "Client Satisfaction"    },
];

const VALUES = [
  {
    Icon: Target,
    title: "Evidence-Based",
    description:
      "Every recommendation is grounded in rigorous data collection, analysis, and contextual interpretation.",
  },
  {
    Icon: Heart,
    title: "People-Centred",
    description:
      "We place communities and beneficiaries at the heart of every engagement, ensuring their voices shape outcomes.",
  },
  {
    Icon: Globe,
    title: "Contextually Rooted",
    description:
      "Our teams bring deep knowledge of African development contexts, political economies, and local realities.",
  },
  {
    Icon: Eye,
    title: "Transparent & Accountable",
    description:
      "We hold ourselves to the highest standards of integrity, transparency, and professional accountability.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">

      {/* Hero */}
      <section className="pt-28 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-dgc-dark-blue-1/8 via-blue-50/50 to-white" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_20%_50%,rgba(61,157,217,0.06),transparent)]" />
        <div className="relative max-w-5xl mx-auto px-6 sm:px-10">
          <p className="text-dgc-blue-1 text-xs font-semibold tracking-[0.18em] uppercase mb-4">About DGC</p>
          <h1 className="leading-tight mb-6" style={{ fontSize: "clamp(2.5rem,5vw,4rem)" }}>
            <span className="title-thin">Powerful Insights. Proven </span>
            <span className="title-highlight">Delivery.</span>
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed mb-8 max-w-2xl">
            Devex Global Consult is an African-led international development consulting firm headquartered in Nairobi,
            Kenya. We partner with governments, NGOs, UN agencies, and private sector organisations to deliver
            evidence-based solutions that drive lasting change.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-dgc-blue-1 hover:bg-dgc-blue-2 text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm"
          >
            Work with DGC <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="py-14 bg-gray-50 border-y border-gray-100">
        <div className="max-w-5xl mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl sm:text-4xl font-extrabold text-dgc-blue-1 tracking-tight">{s.value}</div>
                <div className="text-gray-500 text-xs mt-1 leading-snug">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6 sm:px-10">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-8 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                <Target className="w-5 h-5 text-dgc-blue-1" />
              </div>
              <h2 className="text-2xl sm:text-3xl leading-tight"><span className="title-thin">Our </span><span className="title-highlight">Mission</span></h2>
              <p className="text-gray-600 leading-relaxed">
                To empower organisations and communities through strategic guidance, advanced technical support,
                and robust project management — delivering measurable impact across Africa and beyond.
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                <Eye className="w-5 h-5 text-dgc-blue-1" />
              </div>
              <h2 className="text-2xl sm:text-3xl leading-tight"><span className="title-thin">Our </span><span className="title-highlight">Vision</span></h2>
              <p className="text-gray-600 leading-relaxed">
                To be the foremost leader in innovative and sustainable consulting across Africa, empowering
                organisations to maximise their impact and achieve their development objectives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-gray-50 border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-6 sm:px-10">
          <div className="text-center mb-12">
            <p className="text-dgc-blue-1 text-xs font-semibold tracking-[0.18em] uppercase mb-3">Our Values</p>
            <h2 className="text-3xl sm:text-4xl leading-tight">
              <span className="title-thin">What Drives </span><span className="title-highlight">Everything We Do</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {VALUES.map(({ Icon, title, description }) => (
              <div key={title} className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-dgc-blue-1" />
                </div>
                <h3 className="text-gray-900 font-semibold">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-6 sm:px-10 text-center space-y-5">
          <h2 className="text-3xl sm:text-4xl leading-tight"><span className="title-thin">Ready to Work </span><span className="title-highlight">Together?</span></h2>
          <p className="text-gray-500 text-base max-w-xl mx-auto">
            Tell us about your challenge. We&apos;ll design a solution that delivers.
          </p>
          <div className="flex flex-wrap gap-4 justify-center pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-dgc-blue-1 hover:bg-dgc-blue-2 text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm"
            >
              Get in Touch <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 border border-dgc-blue-1/50 hover:border-dgc-blue-1 text-gray-700 hover:text-dgc-blue-1 font-semibold px-6 py-3 rounded-xl transition-colors text-sm"
            >
              View Portfolio
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
