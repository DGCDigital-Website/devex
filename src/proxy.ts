import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const BEACON_LOGIN = "/beacon/login";

function redirectToLogin(request: NextRequest): NextResponse {
  const loginUrl = request.nextUrl.clone();
  loginUrl.pathname = BEACON_LOGIN;
  loginUrl.searchParams.set("redirectTo", request.nextUrl.pathname);
  return NextResponse.redirect(loginUrl);
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isBeaconRoute = pathname.startsWith("/beacon");
  const isBeaconLogin = pathname.startsWith(BEACON_LOGIN);

  // Only run auth logic for beacon routes — skip entirely for public pages.
  if (!isBeaconRoute) {
    return NextResponse.next({ request });
  }

  // ── Environment guard ────────────────────────────────────────────────
  // If the Supabase env vars are absent (e.g. Vercel deployment before
  // env vars are configured), block every beacon route immediately.
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!isBeaconLogin && (!supabaseUrl || !supabaseKey)) {
    console.error(
      "[middleware] NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY is not set. " +
        "Add them as environment variables in your Vercel project settings."
    );
    return redirectToLogin(request);
  }

  // ── Build response object ─────────────────────────────────────────────
  let supabaseResponse = NextResponse.next({ request });

  // ── Auth check ────────────────────────────────────────────────────────
  try {
    const supabase = createServerClient(supabaseUrl!, supabaseKey!, {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    });

    // getUser() reaches Supabase to validate the session — never trust a
    // cached token alone (guards against token forgery).
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error && error.message !== "Auth session missing!") {
      console.warn("[middleware] getUser error:", error.message);
    }

    // Protect every /beacon/* route except the login page
    if (!isBeaconLogin) {
      if (!user) return redirectToLogin(request);
    }

    // Redirect already-authenticated users away from the login page
    if (isBeaconLogin && user) {
      const redirectTo =
        request.nextUrl.searchParams.get("redirectTo") ?? "/beacon";
      const dest = request.nextUrl.clone();
      dest.pathname = redirectTo;
      dest.search = "";
      return NextResponse.redirect(dest);
    }
  } catch (err) {
    // If the Supabase call throws for any reason, fail closed — never
    // allow unauthenticated access to beacon routes.
    console.error("[middleware] Supabase auth threw:", err);
    if (!isBeaconLogin) {
      return redirectToLogin(request);
    }
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    /*
     * Run middleware on all paths EXCEPT:
     * - _next/static (built assets)
     * - _next/image  (image optimisation)
     * - Static file extensions (svg, png, jpg, etc.)
     */
    "/((?!_next/static|_next/image|favicon\\.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff2?)$).*)",
  ],
};
