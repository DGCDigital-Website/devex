import { requireBeaconAuth } from "@/utils/supabase/beacon";
import BlogView from "./blog-view";

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const { db, user } = await requireBeaconAuth();

  const { data: posts } = await db
    .from("blog_posts")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <BlogView
      user={{ email: user.email ?? "", id: user.id }}
      initialPosts={posts ?? []}
    />
  );
}
