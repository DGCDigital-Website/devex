"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import BeaconShell from "@/components/beacon/beacon-shell";
import type { BeaconUser, BlogPostRow } from "@/lib/beacon/types";
import { deleteBlogPost, publishBlogPost, unpublishBlogPost } from "@/lib/beacon/actions";
import {
  Plus, Eye, Pencil, Trash2, Globe, FileText, Search,
  BookOpen, Clock, Tag, Filter,
} from "lucide-react";

const STATUS_STYLE: Record<string, string> = {
  published: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  draft:     "bg-gray-100 text-gray-600 border border-gray-200",
};

const PAGE_SIZE = 10;

export default function BlogView({
  user,
  initialPosts,
}: {
  user: BeaconUser;
  initialPosts: BlogPostRow[];
}) {
  const [posts, setPosts]       = useState<BlogPostRow[]>(initialPosts);
  const [search, setSearch]     = useState("");
  const [statusFilter, setStatus] = useState("all");
  const [page, setPage]         = useState(1);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const filtered = posts.filter((p) => {
    const matchSearch =
      !search ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase()) ||
      p.author.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || p.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated  = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleDelete = (id: string) => {
    startTransition(async () => {
      const res = await deleteBlogPost(id);
      if (!res.error) {
        setPosts((prev) => prev.filter((p) => p.id !== id));
      }
      setDeleteId(null);
    });
  };

  const handlePublish = (id: string, currentStatus: string) => {
    startTransition(async () => {
      const action = currentStatus === "published" ? unpublishBlogPost : publishBlogPost;
      const res = await action(id);
      if (!res.error) {
        setPosts((prev) =>
          prev.map((p) =>
            p.id === id
              ? { ...p, status: currentStatus === "published" ? "draft" : "published" }
              : p
          )
        );
      }
    });
  };

  return (
    <BeaconShell
      user={user}
      title="Blog Posts"
      subtitle="Create and publish articles to the DGC website"
      actions={
        <Link
          href="/beacon/blog/add"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white shadow-[0_2px_8px_rgba(61,157,217,0.3)] hover:shadow-[0_4px_16px_rgba(61,157,217,0.4)] hover:-translate-y-px transition-all"
          style={{ background: "linear-gradient(135deg,#3D9DD9,#177DA6)" }}
        >
          <Plus className="w-4 h-4" /> New Post
        </Link>
      }
    >
      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: "Total Posts",    value: posts.length,                                    color: "text-dgc-blue-1",  bg: "bg-dgc-blue-1/10", Icon: BookOpen },
          { label: "Published",      value: posts.filter((p) => p.status === "published").length, color: "text-emerald-600", bg: "bg-emerald-50",    Icon: Globe    },
          { label: "Drafts",         value: posts.filter((p) => p.status === "draft").length,     color: "text-amber-600",  bg: "bg-amber-50",      Icon: FileText },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-gray-200/80 p-4 shadow-[0_1px_4px_rgba(0,0,0,0.06)] flex items-center gap-3">
            <div className={`${s.bg} ${s.color} w-9 h-9 rounded-xl flex items-center justify-center shrink-0`}>
              <s.Icon className="w-4 h-4" />
            </div>
            <div>
              <p className="text-gray-400 text-[11px] font-medium">{s.label}</p>
              <p className={`${s.color} text-xl font-extrabold leading-none mt-0.5`}>{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-[0_1px_4px_rgba(0,0,0,0.06)] overflow-hidden">
        <div className="px-5 py-3.5 border-b border-gray-100 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search posts…"
              className="w-full pl-9 pr-4 py-2 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-dgc-blue-1/30 focus:border-dgc-blue-1/50 bg-gray-50"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-400 shrink-0" />
            {["all", "published", "draft"].map((s) => (
              <button
                key={s}
                onClick={() => { setStatus(s); setPage(1); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-colors ${
                  statusFilter === s
                    ? "bg-dgc-blue-1 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {paginated.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
              <BookOpen className="w-6 h-6 text-gray-300" />
            </div>
            <p className="text-gray-500 font-medium text-sm">No posts found</p>
            <p className="text-gray-400 text-xs mt-1">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {paginated.map((post) => (
              <div key={post.id} className="group flex items-start gap-4 px-5 py-4 hover:bg-gray-50/60 transition-colors">
                {/* Cover thumbnail */}
                <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-gray-100">
                  {post.cover_image ? (
                    <Image
                      src={post.cover_image}
                      alt={post.title}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-gray-300" />
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-semibold text-gray-900 text-sm leading-snug truncate">{post.title}</p>
                      <div className="flex items-center gap-3 mt-1 flex-wrap">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold capitalize ${STATUS_STYLE[post.status] ?? "bg-gray-100 text-gray-600"}`}>
                          {post.status === "published" ? <Globe className="w-3 h-3" /> : <FileText className="w-3 h-3" />}
                          {post.status}
                        </span>
                        <span className="text-gray-400 text-xs flex items-center gap-1">
                          <Tag className="w-3 h-3" />{post.category}
                        </span>
                        <span className="text-gray-400 text-xs flex items-center gap-1">
                          <Clock className="w-3 h-3" />{post.reading_time ?? 5} min
                        </span>
                      </div>
                      {post.excerpt && (
                        <p className="text-gray-400 text-xs mt-1 line-clamp-1">{post.excerpt}</p>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                      <Link
                        href={`/beacon/blog/${post.id}/preview`}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-dgc-blue-1 hover:bg-dgc-blue-1/10 transition-colors"
                        title="Preview"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </Link>
                      <Link
                        href={`/beacon/blog/${post.id}/edit`}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-dgc-blue-1 hover:bg-dgc-blue-1/10 transition-colors"
                        title="Edit"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </Link>
                      <button
                        onClick={() => handlePublish(post.id, post.status)}
                        disabled={pending}
                        className={`p-1.5 rounded-lg transition-colors ${
                          post.status === "published"
                            ? "text-gray-400 hover:text-amber-500 hover:bg-amber-50"
                            : "text-gray-400 hover:text-emerald-600 hover:bg-emerald-50"
                        }`}
                        title={post.status === "published" ? "Unpublish" : "Publish"}
                      >
                        <Globe className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setDeleteId(post.id)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-5 py-3.5 border-t border-gray-100 flex items-center justify-between">
            <p className="text-gray-400 text-xs">
              Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length}
            </p>
            <div className="flex gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-7 h-7 rounded-lg text-xs font-semibold transition-colors ${
                    p === page ? "bg-dgc-blue-1 text-white" : "text-gray-500 hover:bg-gray-100"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Delete modal */}
      {deleteId && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6">
            <h3 className="text-gray-900 font-bold text-base mb-2">Delete Post?</h3>
            <p className="text-gray-500 text-sm mb-6">
              This will permanently remove the post from Supabase and the visitor site.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 rounded-xl text-sm font-medium border border-gray-200 text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteId)}
                disabled={pending}
                className="px-4 py-2 rounded-xl text-sm font-semibold bg-red-500 text-white hover:bg-red-600 disabled:opacity-40"
              >
                {pending ? "Deleting…" : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </BeaconShell>
  );
}
