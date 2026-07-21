import { Suspense } from "react";
import Link from "next/link";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { projects } from "@/db/schema";
import { getCurrentUser } from "@/lib/current-user";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { OnboardingForm } from "@/components/onboarding/onboarding-form";

export default async function DashboardOnboardingPage() {
  const user = await getCurrentUser();
  if (!user) return null;

  const existingProjects = await db.select().from(projects).where(eq(projects.userId, user.id));

  if (existingProjects.length > 0) {
    return (
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="font-display text-3xl font-semibold text-text">Project Onboarding</h1>
          <p className="mt-1 text-text-light">You&apos;ve already submitted your project details.</p>
        </div>
        <Card className="hover:translate-y-0">
          <p className="text-sm text-text-light">
            We already have a project on file for your account. Head to your overview to check
            status, or message us if you need to start a new project.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button asChild size="sm">
              <Link href="/dashboard">Go to Overview</Link>
            </Button>
            <Button asChild size="sm" variant="outline">
              <Link href="/dashboard/messages">Message Us</Link>
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-3xl font-semibold text-text">Project Onboarding</h1>
        <p className="mt-1 text-text-light">
          Share your business details so we can begin building your website or software.
        </p>
      </div>
      <Suspense fallback={null}>
        <OnboardingForm defaultName={user.name} defaultEmail={user.email} />
      </Suspense>
    </div>
  );
}
