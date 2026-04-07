import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/supabase";

/**
 * Service-role Supabase client for server-side admin operations.
 *
 * Uses SUPABASE_SERVICE_ROLE_KEY which bypasses Row Level Security entirely.
 * NEVER expose this client or its key to the browser.
 *
 * Safe to use in server actions because:
 *  1. All /beacon/* routes are protected by middleware (session check)
 *  2. Every server action calls requireAuth() before any DB write
 */
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY. " +
        "Add SUPABASE_SERVICE_ROLE_KEY to your .env.local file. " +
        "Find it in: Supabase Dashboard → Project Settings → API → service_role key."
    );
  }

  return createClient<Database>(url, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
