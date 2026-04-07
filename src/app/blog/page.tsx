import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";
import { createClient } from "@/utils/supabase/server";
import { BLOG_POSTS as STATIC_POSTS } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog & Insights | Devex Global Consult",
  description:
    "Thought leadership, sector updates, and insights from the DGC team on evaluation, capacity building, and development practice.",
};

function formatDate(iso: string | null) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric", month: "long", year: "numeric",
  });
}

const CATEGORY_COLORS: Record<string, string> = {
  "Research & Evaluation":              "#3D9DD9",
  "Policy & Advocacy":                  "#177DA6",
  "Technology & Innovation":            "#50D4F2",
  "Climate & Environment":              "#10B981",
  "Governance & Accountability":        "#8B5CF6",
  "Health & Wellbeing":                 "#EF4444",
  "Partnerships & Localisation":        "#F59E0B",
  "Livelihoods & Economic Development": "#059669",
  "Social Protection":                  "#6366F1",
  "Urban Development":                  "#0EA5E9",
  "Protection & Safety":                "#EC4899",
  "Organisation Updates":               "#0B2D59",
  Innovation:                           "#3D9DD9",
  Digital:                              "#50D4F2",
  MEL:                                  "#177DA6",
  "About DGC":                          "#7ED1F2",
};

type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readingTime: number;
  author: string;
  publishedAt: string;
  coverImage: string | null;
};

export default async function BlogPage() {
  // Fetch published posts from Supabase
  let posts: Post[] = [];
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("blog_posts")
      .select("slug, title, excerpt, category, reading_time, author, published_at, cover_image")
      .eq("status", "published")
      .order("published_at", { ascending: false });

    if (data && data.length > 0) {
      posts = data.map((p) => ({
        slug:        p.slug,
        title:       p.title,
        excerpt:     p.excerpt ?? "",
        category:    p.category,
        readingTime: p.reading_time ?? 5,
        author:      p.author,
        publishedAt: p.published_at ?? "",
        coverImage:  p.cover_image ?? null,
      }));
    }
  } catch {
    // Supabase unavailable — fall through to static
  }

  // Fallback to static data if no Supabase posts
  if (posts.length === 0) {
    posts = STATIC_POSTS.map((p) => ({
      slug:        p.slug,
      title:       p.title,
      excerpt:     p.excerpt,
      category:    p.category,
      readingTime: p.readingTime,
      author:      p.author,
      publishedAt: p.publishedAt,
      coverImage:  p.coverImage ?? null,
    }));
  }

  return (
    <main className="min-h-screen bg-white text-gray-900">

      {/* Hero */}
      <section className="pt-28 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-dgc-dark-blue-1/8 via-blue-50/50 to-white" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_10%_50%,rgba(61,157,217,0.06),transparent)]" />
        <div className="relative max-w-5xl mx-auto px-6 sm:px-10">
          <p className="text-dgc-blue-1 text-xs font-semibold tracking-[0.18em] uppercase mb-4">Resources</p>
          <h1 className="leading-tight mb-4" style={{ fontSize: "clamp(2rem,5vw,3.5rem)" }}>
            <span className="title-thin">Blog & </span><span className="title-highlight">Insights</span>
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed max-w-2xl">
            Thought leadership and practical guidance from the DGC team on evaluation, organisational development,
            and development practice across Africa.
          </p>
        </div>
      </section>

      {/* Posts grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6 sm:px-10">
          {posts.length === 0 ? (
            <p className="text-gray-400 text-center py-16">No articles published yet — check back soon.</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {posts.map((post) => {
                const accentColor = CATEGORY_COLORS[post.category] ?? "#3D9DD9";
                return (
                  <Link key={post.slug} href={`/blog/${post.slug}`} className="group block h-full">
                    <article className="rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-md hover:border-dgc-blue-1/30 transition-all duration-300 h-full flex flex-col overflow-hidden">
                      {/* Cover image */}
                      <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                        {post.coverImage ? (
                          <Image
                            src={post.coverImage}
                            alt={post.title}
                            fill
                            className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                        ) : (
                          <div
                            className="h-full w-full flex items-center justify-center"
                            style={{ background: `linear-gradient(135deg, ${accentColor}10, ${accentColor}05)` }}
                          >
                            <span className="text-6xl font-extrabold select-none" style={{ color: `${accentColor}15` }}>
                              {post.category.charAt(0)}
                            </span>
                          </div>
                        )}
                        <span
                          className="absolute top-3 left-3 text-[10px] font-semibold px-2.5 py-0.5 rounded-full backdrop-blur-sm"
                          style={{ background: `${accentColor}dd`, color: "#fff", border: `1px solid ${accentColor}` }}
                        >
                          {post.category}
                        </span>
                      </div>

                      <div className="p-6 space-y-3 flex-1 flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className="text-gray-400 text-xs flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {post.readingTime} min read
                          </span>
                        </div>
                        <h2 className="text-gray-900 font-bold text-lg leading-snug flex-1 group-hover:text-dgc-blue-1 transition-colors">
                          {post.title}
                        </h2>
                        <p className="text-gray-500 text-sm leading-relaxed">{post.excerpt}</p>
                        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                          <div>
                            <p className="text-gray-600 text-xs font-medium">{post.author}</p>
                            {post.publishedAt && (
                              <p className="text-gray-400 text-xs">{formatDate(post.publishedAt)}</p>
                            )}
                          </div>
                          <ArrowRight className="w-4 h-4 text-dgc-blue-1 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </article>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
