import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import { BLOG_POSTS } from "@/lib/data";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: `${post.title} | DGC Blog`,
    description: post.excerpt,
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric", month: "long", year: "numeric",
  });
}

export default function BlogPostPage({ params }: Props) {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);
  if (!post) notFound();

  return (
    <main className="min-h-screen bg-white text-gray-900">

      {/* Hero */}
      <section className="pt-28 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-dgc-dark-blue-1/8 via-blue-50/50 to-white" />
        <div className="relative max-w-3xl mx-auto px-6 sm:px-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 text-sm mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>

          <span className="inline-block bg-blue-50 text-dgc-blue-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full border border-dgc-blue-1/30 mb-4">
            {post.category}
          </span>

          <h1 className="font-extrabold text-gray-900 leading-tight mb-6" style={{ fontSize: "clamp(1.75rem,4vw,3rem)" }}>
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-gray-500 text-sm">
            <span className="font-medium text-gray-700">{post.author}</span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-dgc-blue-1" />
              {formatDate(post.publishedAt)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-dgc-blue-1" />
              {post.readingTime} min read
            </span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="max-w-3xl mx-auto px-6 sm:px-10">
          <div className="prose prose-lg max-w-none">
            {(post.content ?? post.excerpt).split("\n\n").map((para, i) => (
              <p key={i} className="text-gray-700 leading-relaxed mb-6">
                {para}
              </p>
            ))}
          </div>

          {/* Tags */}
          <div className="mt-10 pt-8 border-t border-gray-200 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="bg-blue-50 text-dgc-blue-1 text-xs font-medium px-3 py-1 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-10 p-6 rounded-2xl bg-gray-50 border border-dgc-blue-1/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-gray-900 font-semibold">Engage DGC for your next assignment</p>
              <p className="text-gray-500 text-sm mt-0.5">
                Let&apos;s design a solution tailored to your context.
              </p>
            </div>
            <Link
              href="/contact"
              className="shrink-0 inline-flex items-center gap-2 bg-dgc-blue-1 hover:bg-dgc-blue-2 text-white font-semibold px-5 py-2.5 rounded-xl transition-colors text-sm"
            >
              Get in Touch <ArrowLeft className="w-4 h-4 rotate-180" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
