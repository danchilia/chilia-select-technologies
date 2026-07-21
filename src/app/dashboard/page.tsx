import Link from "next/link";
import { and, desc, eq, isNull } from "drizzle-orm";
import { ArrowRight, FolderKanban } from "lucide-react";
import { db } from "@/db";
import { projects, invoices, messages } from "@/db/schema";
import { getCurrentUser } from "@/lib/current-user";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProjectStatusBadge } from "@/components/dashboard/status-badge";

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) return null;

  const [projectList, unpaidInvoices, unreadMessages] = await Promise.all([
    db.select().from(projects).where(eq(projects.userId, user.id)).orderBy(desc(projects.createdAt)),
    db.select().from(invoices).where(and(eq(invoices.userId, user.id), eq(invoices.status, "unpaid"))),
    db
      .select()
      .from(messages)
      .where(and(eq(messages.userId, user.id), eq(messages.senderRole, "admin"), isNull(messages.readAt))),
  ]);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-display text-3xl font-semibold text-text">Welcome back, {user.name.split(" ")[0]}</h1>
        <p className="mt-1 text-text-light">Here&apos;s where things stand on your projects.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="hover:translate-y-0">
          <p className="text-sm text-text-light">Active projects</p>
          <p className="mt-1 text-3xl font-semibold text-text">{projectList.length}</p>
        </Card>
        <Link href="/dashboard/invoices">
          <Card>
            <p className="text-sm text-text-light">Unpaid invoices</p>
            <p className="mt-1 text-3xl font-semibold text-text">{unpaidInvoices.length}</p>
          </Card>
        </Link>
        <Link href="/dashboard/messages">
          <Card>
            <p className="text-sm text-text-light">Unread messages</p>
            <p className="mt-1 text-3xl font-semibold text-text">{unreadMessages.length}</p>
          </Card>
        </Link>
      </div>

      <div>
        <h2 className="mb-4 text-lg font-semibold text-text">Your projects</h2>
        {projectList.length === 0 ? (
          <Card className="hover:translate-y-0">
            <p className="text-sm text-text-light">
              You haven&apos;t submitted your project details yet.
            </p>
            <Button asChild size="sm" className="mt-4">
              <Link href="/dashboard/onboarding">Start Onboarding</Link>
            </Button>
          </Card>
        ) : (
          <div className="flex flex-col gap-3">
            {projectList.map((project) => (
              <Link key={project.id} href={`/dashboard/projects/${project.id}`}>
                <Card className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <FolderKanban className="h-5 w-5 shrink-0 text-text-light" />
                    <div>
                      <p className="font-medium text-text">{project.title}</p>
                      <p className="text-xs text-text-light">
                        Started {new Date(project.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <ProjectStatusBadge status={project.status} />
                    <ArrowRight className="h-4 w-4 text-text-light" />
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
