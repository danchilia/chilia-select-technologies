import { and, eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { db } from "@/db";
import { projects, projectStatusEvents } from "@/db/schema";
import { getCurrentUser } from "@/lib/current-user";
import { Card } from "@/components/ui/card";
import { ProjectStatusBadge } from "@/components/dashboard/status-badge";
import { ProjectStatusTimeline } from "@/components/dashboard/status-timeline";
import { FileManager } from "@/components/dashboard/file-manager";

export default async function ProjectDetailPage({ params }: PageProps<"/dashboard/projects/[id]">) {
  const { id } = await params;
  const user = await getCurrentUser();
  if (!user) return null;

  const [project] = await db
    .select()
    .from(projects)
    .where(and(eq(projects.id, id), eq(projects.userId, user.id)))
    .limit(1);

  if (!project) notFound();

  const statusEvents = await db
    .select()
    .from(projectStatusEvents)
    .where(eq(projectStatusEvents.projectId, project.id));

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-semibold text-text">{project.title}</h1>
          <p className="mt-1 text-text-light">
            Started {new Date(project.createdAt).toLocaleDateString()}
          </p>
        </div>
        <ProjectStatusBadge status={project.status} />
      </div>

      {project.notes ? (
        <Card className="hover:translate-y-0">
          <h3 className="mb-2 font-semibold text-text">Notes from the team</h3>
          <p className="whitespace-pre-wrap text-sm text-text-light">{project.notes}</p>
        </Card>
      ) : null}

      <ProjectStatusTimeline events={statusEvents} />

      <FileManager currentRole="client" projectId={project.id} />
    </div>
  );
}
