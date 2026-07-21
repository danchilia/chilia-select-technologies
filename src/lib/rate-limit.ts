import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const redisUrl = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;

const redis = redisUrl && redisToken ? new Redis({ url: redisUrl, token: redisToken }) : null;

if (!redis) {
  console.warn(
    "Rate limiting is disabled: no Upstash Redis env vars found (UPSTASH_REDIS_REST_URL/TOKEN or KV_REST_API_URL/TOKEN)."
  );
}

function makeLimiter(requests: number, window: `${number} ${"s" | "m" | "h"}`, prefix: string) {
  if (!redis) return null;
  return new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(requests, window),
    prefix: `ratelimit:${prefix}`,
    analytics: false,
  });
}

export const loginIpLimiter = makeLimiter(10, "1 m", "login-ip");
export const loginEmailLimiter = makeLimiter(5, "1 m", "login-email");
export const signupIpLimiter = makeLimiter(5, "1 h", "signup-ip");

export function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

/** Returns null if the request is allowed, or a Response to return immediately if blocked. */
export async function checkRateLimit(
  limiter: Ratelimit | null,
  key: string
): Promise<{ ok: false; retryAfterSeconds: number } | { ok: true }> {
  if (!limiter) return { ok: true };

  const result = await limiter.limit(key);
  if (result.success) return { ok: true };

  const retryAfterSeconds = Math.max(1, Math.ceil((result.reset - Date.now()) / 1000));
  return { ok: false, retryAfterSeconds };
}
