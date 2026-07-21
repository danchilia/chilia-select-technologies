import { SignJWT, jwtVerify } from "jose";

export const SESSION_COOKIE_NAME = "session";

const secret = new TextEncoder().encode(process.env.AUTH_SECRET);

export type SessionPayload = {
  userId: string;
  role: "client" | "admin";
};

export async function createSessionToken(payload: SessionPayload): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(secret);
}

export async function verifySessionToken(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as unknown as SessionPayload;
  } catch {
    return null;
  }
}
