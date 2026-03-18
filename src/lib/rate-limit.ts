// Simple in-memory rate limiter for Next.js API routes.
// State is per-process; on Vercel each serverless function instance
// has its own memory, so this is a best-effort throttle rather than
// a strict global limit. It is still effective against casual abuse
// and programmatic form spam.

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const store = new Map<string, RateLimitEntry>();

// Remove expired entries every 5 minutes to prevent unbounded growth.
setInterval(() => {
  const now = Date.now();
  store.forEach((entry, key) => {
    if (entry.resetAt <= now) store.delete(key);
  });
}, 5 * 60 * 1000);

/**
 * Returns true when the caller is within limits, false when they are over.
 *
 * @param key      Unique identifier for the caller (e.g. IP address).
 * @param limit    Max requests allowed in the window (default: 5).
 * @param windowMs Window duration in milliseconds (default: 15 minutes).
 */
export function rateLimit(
  key: string,
  limit = 5,
  windowMs = 15 * 60 * 1000
): boolean {
  const now = Date.now();
  const entry = store.get(key);

  if (!entry || entry.resetAt <= now) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (entry.count >= limit) return false;

  entry.count += 1;
  return true;
}

/**
 * Extract the real client IP from a Next.js request, falling back to
 * a placeholder so rate limiting still applies.
 */
export function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  return request.headers.get('x-real-ip') ?? 'unknown';
}
