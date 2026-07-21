import { eq } from "drizzle-orm";
import { getSession } from "@/lib/auth";
import { db } from "@/db";
import { users } from "@/db/schema";

export type CurrentUser = {
  id: string;
  name: string;
  email: string;
  role: "client" | "admin";
};

export async function getCurrentUser(): Promise<CurrentUser | null> {
  const session = await getSession();
  if (!session) return null;

  const [user] = await db
    .select({ id: users.id, name: users.name, email: users.email, role: users.role })
    .from(users)
    .where(eq(users.id, session.userId))
    .limit(1);

  return user ?? null;
}
