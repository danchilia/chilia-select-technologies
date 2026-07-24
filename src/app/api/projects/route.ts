import { NextResponse } from "next/server";
import { desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { projects, projectStatusEvents, users } from "@/db/schema";
import { getCurrentUser } from "@/lib/current-user";

export async function GET(request: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ ok: false, error: "Not authenticated." }, { status: 401 });

  if (user.role === "admin") {
    const targetUserId = new URL(request.url).searchParams.get("userId");
    const list = targetUserId
      ? await db
          .select()
          .from(projects)
          .where(eq(projects.userId, targetUserId))
          .orderBy(desc(projects.createdAt))
      : await db.select().from(projects).orderBy(desc(projects.createdAt));
    return NextResponse.json({ ok: true, projects: list });
  }

  const list = await db
    .select()
    .from(projects)
    .where(eq(projects.userId, user.id))
    .orderBy(desc(projects.createdAt));
  return NextResponse.json({ ok: true, projects: list });
}

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    return NextResponse.json({ ok: false, error: "Forbidden." }, { status: 403 });
  }

  const body = await request.json();
  const { userId, title, notes } = body;

  if (!userId || !title) {
    return NextResponse.json({ ok: false, error: "A client and title are required." }, { status: 400 });
  }

  const [client] = await db.select().from(users).where(eq(users.id, userId)).limit(1);
  if (!client) return NextResponse.json({ ok: false, error: "Client not found." }, { status: 404 });

  const [project] = await db
    .insert(projects)
    .values({ userId, title, notes: notes || null })
    .returning();

  await db.insert(projectStatusEvents).values({ projectId: project.id, status: project.status });

  return NextResponse.json({ ok: true, project });
}
