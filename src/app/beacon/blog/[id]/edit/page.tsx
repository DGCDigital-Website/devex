import { notFound } from "next/navigation";
import { requireBeaconAuth } from "@/utils/supabase/beacon";
import BlogForm from "../../blog-form";

export const dynamic = "force-dynamic";

export default async function EditBlogPage({
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

  return (
    <BlogForm
      user={{ email: user.email ?? "", id: user.id }}
      post={{ ...post, tags: post.tags ?? [] }}
    />
  );
}
