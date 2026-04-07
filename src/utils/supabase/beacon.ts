import { redirect } from "next/navigation";
import { createClient as createSessionClient } from "./server";
import { createAdminClient } from "./admin";

/**
 * Use in every /beacon page and action.
 *
 *  const { db, user } = await requireBeaconAuth();
 *
 * - Verifies the logged-in session (redirects to /beacon/login if not)
 * - Returns a Supabase client `db` for DB queries.
 *   Prefers the service-role (admin) client which bypasses RLS entirely.
 *   Falls back to the session-based client if SUPABASE_SERVICE_ROLE_KEY is
 *   not yet configured (requires RLS policies to permit authenticated users).
 */
export async function requireBeaconAuth() {
  const session = await createSessionClient();
  const {
    data: { user },
    error,
  } = await session.auth.getUser();

  if (error || !user) redirect("/beacon/login");

  // Prefer admin client (no RLS); fall back to session client gracefully
  let db: Awaited<ReturnType<typeof createSessionClient>>;
  try {
    db = createAdminClient() as unknown as Awaited<ReturnType<typeof createSessionClient>>;
  } catch {
    db = session;
  }

  return { db, user };
}
