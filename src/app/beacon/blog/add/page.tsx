import { requireBeaconAuth } from "@/utils/supabase/beacon";
import BlogForm from "../blog-form";

export const dynamic = "force-dynamic";

export default async function AddBlogPage() {
  const { user } = await requireBeaconAuth();
  return <BlogForm user={{ email: user.email ?? "", id: user.id }} />;
}
