import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { projects, projectStatusEnum, projectStatusEvents } from "@/db/schema";
import { getCurrentUser } from "@/lib/current-user";

const VALID_STATUSES = projectStatusEnum.enumValues;

export async function PATCH(request: Request, ctx: RouteContext<"/api/projects/[id]">) {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    return NextResponse.json({ ok: false, error: "Forbidden." }, { status: 403 });
  }

  const { id } = await ctx.params;
  const body = await request.json();
  const { status, notes, title } = body;

  if (status !== undefined && !VALID_STATUSES.includes(status)) {
    return NextResponse.json({ ok: false, error: "Invalid status." }, { status: 400 });
  }

  const [existing] = await db.select().from(projects).where(eq(projects.id, id)).limit(1);
  if (!existing) return NextResponse.json({ ok: false, error: "Project not found." }, { status: 404 });

  const [project] = await db
    .update(projects)
    .set({
      ...(status !== undefined ? { status } : {}),
      ...(notes !== undefined ? { notes } : {}),
      ...(title !== undefined ? { title } : {}),
      updatedAt: new Date(),
    })
    .where(eq(projects.id, id))
    .returning();

  if (status !== undefined && status !== existing.status) {
    await db.insert(projectStatusEvents).values({ projectId: id, status });
  }

  return NextResponse.json({ ok: true, project });
}
