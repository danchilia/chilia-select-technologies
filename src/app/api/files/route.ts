import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { files, users } from "@/db/schema";
import { getCurrentUser } from "@/lib/current-user";

const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25MB

export async function GET(request: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ ok: false, error: "Not authenticated." }, { status: 401 });

  if (user.role === "admin") {
    const targetUserId = new URL(request.url).searchParams.get("userId");
    const list = targetUserId
      ? await db
          .select()
          .from(files)
          .where(eq(files.userId, targetUserId))
          .orderBy(desc(files.createdAt))
      : await db.select().from(files).orderBy(desc(files.createdAt));
    return NextResponse.json({ ok: true, files: list });
  }

  const list = await db
    .select()
    .from(files)
    .where(eq(files.userId, user.id))
    .orderBy(desc(files.createdAt));
  return NextResponse.json({ ok: true, files: list });
}

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ ok: false, error: "Not authenticated." }, { status: 401 });

  const formData = await request.formData();
  const file = formData.get("file");
  const projectId = formData.get("projectId");
  const bodyUserId = formData.get("userId");

  if (!(file instanceof File)) {
    return NextResponse.json({ ok: false, error: "No file provided." }, { status: 400 });
  }
  if (file.size > MAX_FILE_SIZE) {
    return NextResponse.json({ ok: false, error: "File is too large (25MB max)." }, { status: 400 });
  }

  const ownerId = user.role === "admin" ? String(bodyUserId || "") : user.id;
  if (!ownerId) {
    return NextResponse.json({ ok: false, error: "A client must be specified." }, { status: 400 });
  }
  if (user.role === "admin") {
    const [client] = await db.select().from(users).where(eq(users.id, ownerId)).limit(1);
    if (!client) return NextResponse.json({ ok: false, error: "Client not found." }, { status: 404 });
  }

  const blob = await put(`clients/${ownerId}/${Date.now()}-${file.name}`, file, {
    access: "public",
  });

  const [record] = await db
    .insert(files)
    .values({
      userId: ownerId,
      projectId: projectId ? String(projectId) : null,
      name: file.name,
      url: blob.url,
      uploadedByRole: user.role,
    })
    .returning();

  return NextResponse.json({ ok: true, file: record });
}
