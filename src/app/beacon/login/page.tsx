"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import { Eye, EyeOff, AlertCircle, Lock, ShieldCheck, CheckCircle2 } from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") ?? "/beacon";

  const [email, setEmail]             = useState("");
  const [password, setPassword]       = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading]         = useState(false);
  const [error, setError]             = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    router.push(redirectTo);
    router.refresh();
  };

  return (
    <div className="min-h-screen flex font-neometric antialiased">

      {/* ── Left brand panel ── */}
      <div
        className="hidden lg:flex lg:w-[44%] xl:w-[42%] flex-col relative overflow-hidden"
        style={{ background: "linear-gradient(160deg, #0B2D59 0%, #0C2C65 55%, #091e3e 100%)" }}
      >
        {/* Fine grid texture */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(61,157,217,1) 1px, transparent 1px), linear-gradient(90deg, rgba(61,157,217,1) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />

        {/* Ambient glow — top-left */}
        <div
          className="absolute -top-40 -left-40 w-[480px] h-[480px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(61,157,217,0.22) 0%, transparent 70%)" }}
        />
        {/* Ambient glow — bottom-right */}
        <div
          className="absolute -bottom-28 -right-28 w-[360px] h-[360px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(80,212,242,0.14) 0%, transparent 70%)" }}
        />

        {/* Logo */}
        <div className="relative z-10 p-10 xl:p-12">
          <Image src="/logo.svg" alt="Devex Global Consult" width={148} height={44} className="h-10 w-auto brightness-0 invert" />
        </div>

        {/* Centre content */}
        <div className="relative z-10 flex-1 flex flex-col justify-center px-10 xl:px-14">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-8 w-fit">
            <div className="w-7 h-7 rounded-lg bg-dgc-blue-1/20 border border-dgc-blue-1/30 flex items-center justify-center">
              <ShieldCheck className="w-3.5 h-3.5 text-dgc-blue-1" />
            </div>
            <span className="text-dgc-blue-1 text-xs font-semibold tracking-[0.15em] uppercase">
              Restricted Access
            </span>
          </div>

          <h1 className="text-white text-[2.6rem] xl:text-5xl font-bold leading-[1.1] tracking-tight mb-5">
            DGC Beacon
            <span className="block text-dgc-light font-light mt-1.5">Admin Console</span>
          </h1>

          <p className="text-white/50 text-[0.9375rem] leading-relaxed max-w-[340px] mb-10">
            Centralised intelligence hub for Devex Global Consult operations, contacts, and programme delivery.
          </p>

          {/* Feature list */}
          <div className="space-y-3.5">
            {[
              "Live website submission monitoring",
              "Contact & enquiry management",
              "Job postings & careers control",
            ].map((feat) => (
              <div key={feat} className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-dgc-blue-1/70 shrink-0" />
                <span className="text-white/55 text-sm">{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 px-10 xl:px-14 py-8">
          <p className="text-white/20 text-xs leading-relaxed">
            © {new Date().getFullYear()} Devex Global Consult · Beacon v1
            <br />
            Authorised personnel only. All access is logged.
          </p>
        </div>
      </div>

      {/* ── Right form panel ── */}
      <div className="flex-1 flex flex-col bg-[#f7f8fc]">
        {/* Mobile logo strip */}
        <div
          className="lg:hidden flex items-center px-6 h-16 shrink-0"
          style={{ background: "linear-gradient(135deg, #0B2D59, #0C2C65)" }}
        >
          <Image src="/logo.svg" alt="DGC" width={120} height={36} className="h-8 w-auto" />
        </div>

        {/* Form centred */}
        <div className="flex-1 flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-[400px]">

            {/* Heading */}
            <div className="mb-9">
              <h2 className="text-gray-900 text-[1.625rem] font-bold tracking-tight leading-tight">
                Welcome back
              </h2>
              <p className="text-gray-500 text-sm mt-1.5">
                Sign in to access the Beacon console
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">

              {/* Email */}
              <div className="space-y-1.5">
                <label htmlFor="email" className="text-gray-700 text-sm font-medium block">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-dgc-blue-1/25 focus:border-dgc-blue-1 transition-all duration-150 shadow-[0_1px_3px_rgba(0,0,0,0.06)]"
                  placeholder="you@devexglobal.com"
                />
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label htmlFor="password" className="text-gray-700 text-sm font-medium block">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 pr-11 text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-dgc-blue-1/25 focus:border-dgc-blue-1 transition-all duration-150 shadow-[0_1px_3px_rgba(0,0,0,0.06)]"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    tabIndex={-1}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="flex items-start gap-2.5 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                  <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                  <p className="text-red-600 text-sm leading-relaxed">{error}</p>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-[0.8125rem] rounded-xl font-semibold text-sm text-white transition-all duration-150 shadow-[0_2px_8px_rgba(61,157,217,0.35)] disabled:opacity-60 disabled:cursor-not-allowed disabled:shadow-none flex items-center justify-center gap-2 mt-1"
                style={{
                  background: loading
                    ? "#177DA6"
                    : "linear-gradient(135deg, #3D9DD9 0%, #177DA6 100%)",
                }}
              >
                {loading ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Signing in…
                  </>
                ) : (
                  "Sign in"
                )}
              </button>
            </form>

            {/* Security notice */}
            <div className="mt-8 flex items-start gap-2 text-gray-400">
              <Lock className="w-3.5 h-3.5 shrink-0 mt-0.5" />
              <p className="text-xs leading-relaxed">
                This area is restricted to authorised DGC personnel only. Unauthorised access attempts are logged.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BeaconLoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
