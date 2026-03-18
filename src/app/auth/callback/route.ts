import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";

/** Validate the `next` param is a safe same-origin path (no open redirect). */
function safePath(raw: string | null): string {
  if (!raw) return "/beacon";
  try {
    // Reject anything that looks like an absolute URL or protocol-relative URL
    if (/^https?:\/\//i.test(raw) || raw.startsWith("//")) return "/beacon";
    // Must start with a slash and contain only safe characters
    if (!/^\/[a-zA-Z0-9\-._~!$&'()*+,;=:@/%?#]*$/.test(raw)) return "/beacon";
    return raw;
  } catch {
    return "/beacon";
  }
}

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = safePath(searchParams.get("next"));

  if (code) {
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          },
        },
      }
    );

    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  return NextResponse.redirect(`${origin}/beacon/login?error=auth_callback_failed`);
}
