"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import BeaconShell from "@/components/beacon/beacon-shell";
import type { BeaconUser, BlogPostRow } from "@/lib/beacon/types";
import { BLOG_CATEGORIES } from "@/lib/beacon/types";
import { addBlogPost, updateBlogPost } from "@/lib/beacon/actions";
import { ArrowLeft, Save, Globe, FileText } from "lucide-react";

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function BlogForm({
  user,
  post,
}: {
  user: BeaconUser;
  post?: BlogPostRow;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState("");

  const isEdit = Boolean(post);

  const [form, setForm] = useState({
    id:           post?.id            ?? `blog-${Date.now()}`,
    title:        post?.title         ?? "",
    slug:         post?.slug          ?? "",
    excerpt:      post?.excerpt       ?? "",
    content:      post?.content       ?? "",
    cover_image:  post?.cover_image   ?? "",
    category:     post?.category      ?? "General",
    tags:         (post?.tags ?? []).join(", "),
    author:       post?.author        ?? "DGC Team",
    status:       post?.status        ?? "draft",
    reading_time: String(post?.reading_time ?? 5),
    published_at: post?.published_at  ?? "",
  });

  const update = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const handleTitleChange = (v: string) => {
    setForm((f) => ({
      ...f,
      title: v,
      slug: isEdit ? f.slug : slugify(v),
    }));
  };

  const handleSubmit = (status: "draft" | "published") => {
    if (!form.title.trim() || !form.slug.trim()) {
      setError("Title and slug are required.");
      return;
    }
    setError("");

    const payload = {
      id:           form.id,
      title:        form.title.trim(),
      slug:         form.slug.trim(),
      excerpt:      form.excerpt.trim() || null,
      content:      form.content.trim() || null,
      cover_image:  form.cover_image.trim() || null,
      category:     form.category,
      tags:         form.tags.split(",").map((t) => t.trim()).filter(Boolean),
      author:       form.author.trim() || "DGC Team",
      status,
      reading_time: parseInt(form.reading_time, 10) || 5,
      published_at: status === "published" ? (form.published_at || new Date().toISOString()) : null,
    };

    startTransition(async () => {
      const res = isEdit
        ? await updateBlogPost(post!.id, payload)
        : await addBlogPost(payload);

      if (res.error) {
        setError(res.error);
      } else {
        router.push("/beacon/blog");
      }
    });
  };

  const inputCls = "w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-dgc-blue-1/30 focus:border-dgc-blue-1/50 transition-all";
  const labelCls = "block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide";

  return (
    <BeaconShell
      user={user}
      title={isEdit ? "Edit Post" : "New Blog Post"}
      subtitle={isEdit ? post!.title : "Write and publish a new article to the DGC website"}
    >
      <Link
        href="/beacon/blog"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Blog Posts
      </Link>

      <div className="grid lg:grid-cols-[1fr_280px] gap-6">
        {/* Main editor */}
        <div className="space-y-5">
          <div className="bg-white rounded-2xl border border-gray-200/80 shadow-[0_1px_4px_rgba(0,0,0,0.06)] p-6 space-y-5">
            <div>
              <label className={labelCls}>Title *</label>
              <input
                value={form.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="e.g. Strengthening M&E in Fragile Contexts"
                className={inputCls}
              />
            </div>
            <div>
              <label className={labelCls}>Slug (URL) *</label>
              <input
                value={form.slug}
                onChange={(e) => update("slug", slugify(e.target.value))}
                placeholder="auto-generated from title"
                className={inputCls}
              />
              <p className="text-gray-400 text-xs mt-1">
                Will appear at: <span className="font-mono">/blog/{form.slug || "your-slug"}</span>
              </p>
            </div>
            <div>
              <label className={labelCls}>Excerpt (summary)</label>
              <textarea
                value={form.excerpt}
                onChange={(e) => update("excerpt", e.target.value)}
                placeholder="A 1–2 sentence summary shown on the blog listing page…"
                rows={3}
                className={`${inputCls} resize-y`}
              />
            </div>
            <div>
              <label className={labelCls}>Article Body</label>
              <textarea
                value={form.content}
                onChange={(e) => update("content", e.target.value)}
                placeholder="Write the full article here. Separate paragraphs with blank lines…"
                rows={16}
                className={`${inputCls} resize-y font-mono text-xs leading-relaxed`}
              />
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          {/* Publish actions */}
          <div className="bg-white rounded-2xl border border-gray-200/80 shadow-[0_1px_4px_rgba(0,0,0,0.06)] p-5 space-y-3">
            <h3 className="text-gray-900 font-semibold text-sm">Publish</h3>
            {error && (
              <p className="text-red-500 text-xs bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</p>
            )}
            <button
              onClick={() => handleSubmit("published")}
              disabled={pending}
              className="w-full inline-flex justify-center items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white shadow-[0_2px_8px_rgba(61,157,217,0.3)] hover:shadow-[0_4px_16px_rgba(61,157,217,0.4)] hover:-translate-y-px transition-all disabled:opacity-40"
              style={{ background: "linear-gradient(135deg,#3D9DD9,#177DA6)" }}
            >
              <Globe className="w-4 h-4" />
              {pending ? "Saving…" : "Publish Now"}
            </button>
            <button
              onClick={() => handleSubmit("draft")}
              disabled={pending}
              className="w-full inline-flex justify-center items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border border-gray-200 text-gray-600 bg-white hover:bg-gray-50 transition-colors disabled:opacity-40"
            >
              <Save className="w-4 h-4" />
              Save as Draft
            </button>
            <div className="flex items-center gap-2 text-xs">
              <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full font-semibold ${
                form.status === "published"
                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                  : "bg-gray-100 text-gray-600 border border-gray-200"
              }`}>
                {form.status === "published" ? <Globe className="w-3 h-3" /> : <FileText className="w-3 h-3" />}
                {form.status}
              </span>
            </div>
          </div>

          {/* Metadata */}
          <div className="bg-white rounded-2xl border border-gray-200/80 shadow-[0_1px_4px_rgba(0,0,0,0.06)] p-5 space-y-4">
            <h3 className="text-gray-900 font-semibold text-sm">Details</h3>
            <div>
              <label className={labelCls}>Category</label>
              <select value={form.category} onChange={(e) => update("category", e.target.value)} className={inputCls}>
                {BLOG_CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className={labelCls}>Author</label>
              <input value={form.author} onChange={(e) => update("author", e.target.value)} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Reading Time (min)</label>
              <input type="number" min={1} max={60} value={form.reading_time} onChange={(e) => update("reading_time", e.target.value)} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Tags (comma-separated)</label>
              <input value={form.tags} onChange={(e) => update("tags", e.target.value)} placeholder="M&E, Research, Policy" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Cover Image URL</label>
              <input value={form.cover_image} onChange={(e) => update("cover_image", e.target.value)} placeholder="/images/blog/filename.jpg" className={inputCls} />
            </div>
          </div>
        </div>
      </div>
    </BeaconShell>
  );
}
