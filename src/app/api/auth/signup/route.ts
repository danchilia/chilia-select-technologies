import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { users } from "@/db/schema";
import { hashPassword, createSessionToken, setSessionCookie } from "@/lib/auth";
import { signupSchema } from "@/lib/auth-schemas";
import { checkRateLimit, getClientIp, signupIpLimiter } from "@/lib/rate-limit";

const GENERIC_SIGNUP_ERROR =
  "We couldn't create an account with these details. If you already have an account, try logging in instead.";

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const ipCheck = await checkRateLimit(signupIpLimiter, ip);
  if (!ipCheck.ok) {
    return NextResponse.json(
      { ok: false, error: "Too many signup attempts. Please try again later." },
      { status: 429, headers: { "Retry-After": String(ipCheck.retryAfterSeconds) } }
    );
  }

  const body = await request.json();
  const parsed = signupSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid input." },
      { status: 400 }
    );
  }
  const { name, email: normalizedEmail, password } = parsed.data;

  const existing = await db.select().from(users).where(eq(users.email, normalizedEmail)).limit(1);
  if (existing.length > 0) {
    // Deliberately generic: don't confirm whether this email is already registered.
    return NextResponse.json({ ok: false, error: GENERIC_SIGNUP_ERROR }, { status: 409 });
  }

  const passwordHash = await hashPassword(password);
  const [user] = await db
    .insert(users)
    .values({ name, email: normalizedEmail, passwordHash, role: "client" })
    .returning();

  const token = await createSessionToken({ userId: user.id, role: user.role });
  await setSessionCookie(token);

  return NextResponse.json({ ok: true });
}
