import { notFound } from "next/navigation";
import { requireBeaconAuth } from "@/utils/supabase/beacon";
import Link from "next/link";
import Image from "next/image";
import BeaconShell from "@/components/beacon/beacon-shell";
import { ArrowLeft, Pencil, Globe, FileText, Clock, Tag, Calendar } from "lucide-react";

export const dynamic = "force-dynamic";

function formatDate(iso: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

export default async function BlogPreviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { db, user } = await requireBeaconAuth();

  const { data: post } = await db
    .from("blog_posts")
    .select("*")
    .eq("id", id)
    .single();

  if (!post) notFound();

  const beaconUser = { email: user.email ?? "", id: user.id };

  return (
    <BeaconShell
      user={beaconUser}
      title="Blog Post Preview"
      subtitle={post.title}
      actions={
        <Link
          href={`/beacon/blog/${id}/edit`}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white shadow-[0_2px_8px_rgba(61,157,217,0.3)] hover:shadow-[0_4px_16px_rgba(61,157,217,0.4)] hover:-translate-y-px transition-all"
          style={{ background: "linear-gradient(135deg,#3D9DD9,#177DA6)" }}
        >
          <Pencil className="w-4 h-4" /> Edit Post
        </Link>
      }
    >
      <Link href="/beacon/blog" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors mb-6">
        <ArrowLeft className="w-4 h-4" /> Back to Blog Posts
      </Link>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Preview (article-style) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200/80 shadow-[0_1px_4px_rgba(0,0,0,0.06)] overflow-hidden">
          {post.cover_image && (
            <div className="relative h-56 w-full">
              <Image src={post.cover_image} alt={post.title} fill className="object-cover" />
            </div>
          )}
          <div className="p-7">
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold capitalize ${
                post.status === "published"
                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                  : "bg-gray-100 text-gray-600 border border-gray-200"
              }`}>
                {post.status === "published" ? <Globe className="w-3 h-3" /> : <FileText className="w-3 h-3" />}
                {post.status}
              </span>
              <span className="text-gray-400 text-xs">{post.category}</span>
              <span className="text-gray-400 text-xs flex items-center gap-1">
                <Clock className="w-3 h-3" /> {post.reading_time ?? 5} min read
              </span>
            </div>
            <h1 className="text-gray-900 font-bold text-2xl leading-snug mb-4">{post.title}</h1>
            {post.excerpt && (
              <p className="text-gray-500 text-base leading-relaxed mb-6 border-l-4 border-dgc-blue-1/30 pl-4 italic">
                {post.excerpt}
              </p>
            )}
            <div className="prose prose-sm max-w-none text-gray-700">
              {(post.content ?? post.excerpt ?? "No content yet.").split("\n\n").map((p, i) => (
                <p key={i} className="leading-[1.85] mb-4">{p}</p>
              ))}
            </div>
            {post.tags && post.tags.length > 0 && (
              <div className="mt-8 pt-6 border-t border-gray-100 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="inline-flex items-center gap-1 bg-gray-50 text-gray-500 text-xs font-medium px-3 py-1 rounded-full border border-gray-200">
                    <Tag className="w-3 h-3" />{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Metadata sidebar */}
        <div className="space-y-5">
          <div className="bg-white rounded-2xl border border-gray-200/80 shadow-[0_1px_4px_rgba(0,0,0,0.06)] p-5 space-y-4">
            <h3 className="text-gray-900 font-semibold text-sm">Post Details</h3>
            {[
              { label: "Author",       value: post.author,                     Icon: null },
              { label: "Category",     value: post.category,                   Icon: Tag  },
              { label: "Reading time", value: `${post.reading_time ?? 5} min`, Icon: Clock },
              { label: "Status",       value: post.status,                     Icon: post.status === "published" ? Globe : FileText },
              { label: "Published",    value: formatDate(post.published_at),   Icon: Calendar },
              { label: "Created",      value: formatDate(post.created_at),     Icon: Calendar },
              { label: "Updated",      value: formatDate(post.updated_at),     Icon: Calendar },
            ].map(({ label, value, Icon }) => (
              <div key={label} className="flex items-start gap-3 py-2.5 border-b border-gray-50 last:border-0">
                <div className="w-7 h-7 rounded-lg bg-dgc-blue-1/8 flex items-center justify-center shrink-0 mt-0.5">
                  {Icon ? <Icon className="w-3.5 h-3.5 text-dgc-blue-1/70" /> : <span className="text-dgc-blue-1/70 text-[10px] font-bold">A</span>}
                </div>
                <div>
                  <p className="text-gray-400 text-[11px] font-medium uppercase tracking-wide">{label}</p>
                  <p className="text-gray-800 text-sm font-medium mt-0.5 capitalize">{value || "—"}</p>
                </div>
              </div>
            ))}
          </div>

          {post.status === "published" && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4">
              <p className="text-emerald-700 text-sm font-semibold mb-1">Live on the website</p>
              <p className="text-emerald-600 text-xs mb-3">This post is publicly visible at:</p>
              <a
                href={`/blog/${post.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-dgc-blue-1 text-xs font-mono hover:underline break-all"
              >
                /blog/{post.slug}
              </a>
            </div>
          )}
        </div>
      </div>
    </BeaconShell>
  );
}
