/** @type {import('next').NextConfig} */

// Supabase project URL for CSP
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'https://*.supabase.co';
const supabaseHost = SUPABASE_URL.replace(/^https?:\/\//, '');

/**
 * Content-Security-Policy
 * – 'unsafe-inline' on style-src is required by Tailwind's JIT output and inline styles
 * – 'unsafe-eval' on script-src is required by Next.js dev HMR and cobe/GSAP at runtime
 * – 'wasm-unsafe-eval' is required for @lottiefiles/dotlottie-react WASM renderer
 * – frame-ancestors 'none' replaces X-Frame-Options for modern browsers
 */
const CSP = [
  "default-src 'self'",
  // Scripts: self + Vercel analytics + Google Analytics + WASM eval + Next.js eval
  `script-src 'self' 'unsafe-eval' 'wasm-unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://va.vercel-scripts.com`,
  // Styles: self + inline (Tailwind JIT)
  "style-src 'self' 'unsafe-inline'",
  // Images: self + data URIs + all HTTPS (covers Unsplash, Brevo tracking pixels, etc.)
  "img-src 'self' data: blob: https:",
  // Fonts: self + data URIs
  "font-src 'self' data:",
  // Connect: self + Supabase + Brevo + Google Analytics + Vercel + Lottie (animation + WASM fetch)
  `connect-src 'self' https://${supabaseHost} https://api.brevo.com https://www.google-analytics.com https://analytics.google.com https://vitals.vercel-insights.com https://va.vercel-scripts.com https://lottie.host https://cdn.lottiefiles.com`,
  // Workers: blob URIs needed for Lottie WASM worker threads
  "worker-src 'self' blob:",
  // WASM: allow loading WebAssembly binaries from same origin
  "script-src-elem 'self' 'unsafe-inline' https://www.googletagmanager.com https://va.vercel-scripts.com",
  // Frames: completely blocked
  "frame-src 'none'",
  "frame-ancestors 'none'",
  // Upgrade HTTP requests to HTTPS
  "upgrade-insecure-requests",
].join('; ');

const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "devexglobal.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // Prevent clickjacking (belt + braces with CSP frame-ancestors)
          { key: 'X-Frame-Options', value: 'DENY' },
          // Prevent MIME-type sniffing
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          // Control referrer information
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          // Force HTTPS for 2 years, include subdomains + preload-ready
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          // Restrict browser feature APIs
          {
            key: 'Permissions-Policy',
            value: [
              'camera=()',
              'microphone=()',
              'geolocation=()',
              'payment=()',
              'usb=()',
              'interest-cohort=()',
              'accelerometer=()',
              'gyroscope=()',
              'magnetometer=()',
              'display-capture=()',
            ].join(', '),
          },
          // Full Content-Security-Policy
          { key: 'Content-Security-Policy', value: CSP },
          // Prevent cross-origin data leaks
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
          { key: 'Cross-Origin-Resource-Policy', value: 'same-origin' },
          // Block Flash / PDF cross-domain policies
          { key: 'X-Permitted-Cross-Domain-Policies', value: 'none' },
          // DNS prefetching (performance + minor privacy benefit)
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
        ],
      },
      // Publicly cacheable static assets get relaxed CORP so CDN can serve them
      {
        source: '/_next/static/(.*)',
        headers: [
          { key: 'Cross-Origin-Resource-Policy', value: 'cross-origin' },
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      // Correct MIME type for WebAssembly modules (required for streaming compile)
      {
        source: '/(.*)\\.wasm',
        headers: [
          { key: 'Content-Type', value: 'application/wasm' },
          { key: 'Cross-Origin-Resource-Policy', value: 'cross-origin' },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
