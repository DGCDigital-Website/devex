import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, Tag } from "lucide-react";
import { createClient } from "@/utils/supabase/server";
import { BLOG_POSTS } from "@/lib/data";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ slug: string }>;
}

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
  content: string | null;
  category: string;
  tags: string[];
  readingTime: number;
  author: string;
  publishedAt: string | null;
  coverImage: string | null;
};

async function findPost(slug: string): Promise<Post | null> {
  // 1. Try Supabase
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("slug", slug)
      .eq("status", "published")
      .single();
    if (data) {
      return {
        slug:        data.slug,
        title:       data.title,
        excerpt:     data.excerpt ?? "",
        content:     data.content ?? null,
        category:    data.category,
        tags:        data.tags ?? [],
        readingTime: data.reading_time ?? 5,
        author:      data.author,
        publishedAt: data.published_at ?? null,
        coverImage:  data.cover_image ?? null,
      };
    }
  } catch {
    // fall through
  }

  // 2. Fallback: static data
  const s = BLOG_POSTS.find((p) => p.slug === slug);
  if (!s) return null;
  return {
    slug:        s.slug,
    title:       s.title,
    excerpt:     s.excerpt,
    content:     s.content ?? null,
    category:    s.category,
    tags:        s.tags,
    readingTime: s.readingTime,
    author:      s.author,
    publishedAt: s.publishedAt,
    coverImage:  s.coverImage ?? null,
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await findPost(slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: `${post.title} | DGC Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.coverImage ? [{ url: post.coverImage }] : [],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await findPost(slug);
  if (!post) notFound();

  const accentColor = CATEGORY_COLORS[post.category] ?? "#3D9DD9";

  // Related posts — also from Supabase if possible
  let related: Post[] = [];
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("blog_posts")
      .select("slug, title, excerpt, category, reading_time, author, published_at, cover_image, tags, content")
      .eq("status", "published")
      .eq("category", post.category)
      .neq("slug", slug)
      .limit(2);
    if (data && data.length > 0) {
      related = data.map((p) => ({
        slug: p.slug, title: p.title, excerpt: p.excerpt ?? "",
        content: p.content ?? null, category: p.category,
        tags: p.tags ?? [], readingTime: p.reading_time ?? 5,
        author: p.author, publishedAt: p.published_at ?? null,
        coverImage: p.cover_image ?? null,
      }));
    }
  } catch { /* ignore */ }

  if (related.length === 0) {
    related = BLOG_POSTS
      .filter((p) => p.slug !== slug && p.category === post.category)
      .slice(0, 2)
      .map((p) => ({
        slug: p.slug, title: p.title, excerpt: p.excerpt,
        content: p.content ?? null, category: p.category,
        tags: p.tags, readingTime: p.readingTime,
        author: p.author, publishedAt: p.publishedAt, coverImage: p.coverImage ?? null,
      }));
  }

  return (
    <main className="min-h-screen bg-white text-gray-900">

      {/* Hero */}
      <section className="pt-28 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-dgc-dark-blue-1/8 via-blue-50/50 to-white" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_0%_0%,rgba(61,157,217,0.07),transparent)]" />
        <div className="relative max-w-3xl mx-auto px-6 sm:px-10">
          <Link href="/blog" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 text-sm mb-8 transition-colors group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            Back to Blog
          </Link>
          <span
            className="inline-block text-[11px] font-semibold px-2.5 py-0.5 rounded-full border mb-4"
            style={{ background: `${accentColor}15`, color: accentColor, borderColor: `${accentColor}40` }}
          >
            {post.category}
          </span>
          <h1 className="font-extrabold text-gray-900 leading-tight mb-6" style={{ fontSize: "clamp(1.75rem,4vw,3rem)" }}>
            {post.title}
          </h1>
          <p className="text-gray-500 text-lg leading-relaxed mb-6">{post.excerpt}</p>
          <div className="flex flex-wrap items-center gap-4 text-gray-500 text-sm">
            <span className="font-semibold text-gray-700">{post.author}</span>
            {post.publishedAt && (
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-dgc-blue-1" />
                {formatDate(post.publishedAt)}
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-dgc-blue-1" />
              {post.readingTime} min read
            </span>
          </div>
        </div>
      </section>

      {/* Cover image */}
      {post.coverImage && (
        <div className="max-w-3xl mx-auto px-6 sm:px-10 mb-10">
          <div className="relative h-64 sm:h-80 w-full rounded-2xl overflow-hidden shadow-lg">
            <Image src={post.coverImage} alt={post.title} fill priority className="object-cover" sizes="(max-width: 768px) 100vw, 768px" />
          </div>
        </div>
      )}

      {/* Article body */}
      <section className="pb-16">
        <div className="max-w-3xl mx-auto px-6 sm:px-10">
          <div className="prose prose-lg max-w-none">
            {(post.content ?? post.excerpt).split("\n\n").map((para, i) => (
              <p key={i} className="text-gray-700 leading-[1.85] mb-6 text-[1.0625rem]">{para}</p>
            ))}
          </div>

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="mt-10 pt-8 border-t border-gray-100 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="inline-flex items-center gap-1 bg-gray-50 text-gray-500 text-xs font-medium px-3 py-1 rounded-full border border-gray-200 hover:border-dgc-blue-1/30 hover:text-dgc-blue-1 transition-colors cursor-default">
                  <Tag className="w-3 h-3" />{tag}
                </span>
              ))}
            </div>
          )}

          {/* Related posts */}
          {related.length > 0 && (
            <div className="mt-10">
              <p className="text-gray-400 text-[11px] font-semibold uppercase tracking-wider mb-4">Related Articles</p>
              <div className="grid sm:grid-cols-2 gap-4">
                {related.map((rp) => (
                  <Link key={rp.slug} href={`/blog/${rp.slug}`} className="group flex gap-3 p-4 rounded-xl border border-gray-200 hover:border-dgc-blue-1/30 hover:shadow-sm bg-white transition-all">
                    {rp.coverImage && (
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0">
                        <Image src={rp.coverImage} alt={rp.title} fill className="object-cover" sizes="64px" />
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="text-gray-900 font-semibold text-sm leading-snug group-hover:text-dgc-blue-1 transition-colors line-clamp-2">{rp.title}</p>
                      <p className="text-gray-400 text-xs mt-1">{rp.readingTime} min read</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="mt-10 p-6 rounded-2xl bg-gray-50 border border-dgc-blue-1/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-gray-900 font-semibold">Engage DGC for your next assignment</p>
              <p className="text-gray-500 text-sm mt-0.5">Let&apos;s design a solution tailored to your context.</p>
            </div>
            <Link href="/contact" className="shrink-0 inline-flex items-center gap-2 bg-dgc-blue-1 hover:bg-dgc-blue-2 text-white font-semibold px-5 py-2.5 rounded-xl transition-colors text-sm">
              Get in Touch
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
