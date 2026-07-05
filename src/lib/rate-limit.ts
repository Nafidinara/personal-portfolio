import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

/**
 * Per-IP rate limiting for the public chat endpoint.
 *
 * On Vercel serverless, in-memory counters don't survive across invocations, so
 * we use Upstash (sliding window). If the Upstash env vars are absent (local dev
 * without an account), the limiter is a no-op that always allows — so `pnpm dev`
 * works without setup. Production MUST set the env vars.
 *
 * The real spend backstop is the credit ceiling on the LLM provider key; this
 * limiter just stops a flood from burning it in minutes.
 */

export type LimitResult = {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
};

let limiter: Ratelimit | null = null;
let initialized = false;

function getLimiter(): Ratelimit | null {
  if (initialized) return limiter;
  initialized = true;

  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) {
    // No-op limiter for local dev.
    limiter = null;
    return null;
  }

  limiter = new Ratelimit({
    redis: new Redis({ url, token }),
    // 5 requests per minute per IP. Sliding window is atomic across invocations.
    limiter: Ratelimit.slidingWindow(5, "60 s"),
    prefix: "askalfara",
    analytics: false,
  });
  return limiter;
}

export async function checkRateLimit(ip: string): Promise<LimitResult> {
  const l = getLimiter();
  if (!l) {
    return { success: true, limit: 0, remaining: 0, reset: 0 };
  }
  const result = await l.limit(ip);
  return {
    success: result.success,
    limit: result.limit,
    remaining: result.remaining,
    reset: result.reset,
  };
}

/** Test hook: clear the memoized limiter so env changes take effect. */
export function resetRateLimitForTest() {
  initialized = false;
  limiter = null;
}
