import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { users } from "@/db/schema";
import { verifyPassword, createSessionToken, setSessionCookie } from "@/lib/auth";
import { loginSchema } from "@/lib/auth-schemas";
import { checkRateLimit, getClientIp, loginEmailLimiter, loginIpLimiter } from "@/lib/rate-limit";

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const ipCheck = await checkRateLimit(loginIpLimiter, ip);
  if (!ipCheck.ok) {
    return NextResponse.json(
      { ok: false, error: "Too many login attempts. Please try again shortly." },
      { status: 429, headers: { "Retry-After": String(ipCheck.retryAfterSeconds) } }
    );
  }

  const body = await request.json();
  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid input." },
      { status: 400 }
    );
  }
  const { email: normalizedEmail, password } = parsed.data;

  const emailCheck = await checkRateLimit(loginEmailLimiter, normalizedEmail);
  if (!emailCheck.ok) {
    return NextResponse.json(
      { ok: false, error: "Too many login attempts. Please try again shortly." },
      { status: 429, headers: { "Retry-After": String(emailCheck.retryAfterSeconds) } }
    );
  }

  const [user] = await db.select().from(users).where(eq(users.email, normalizedEmail)).limit(1);

  if (!user || !(await verifyPassword(password, user.passwordHash))) {
    return NextResponse.json({ ok: false, error: "Invalid email or password." }, { status: 401 });
  }

  const token = await createSessionToken({ userId: user.id, role: user.role });
  await setSessionCookie(token);

  return NextResponse.json({ ok: true, role: user.role });
}
