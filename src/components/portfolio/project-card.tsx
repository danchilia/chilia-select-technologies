import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { Badge } from "@/components/ui/badge";
import { SiteMockup } from "@/components/portfolio/site-mockup";
import type { Project } from "@/lib/data/portfolio";

export function ProjectCard({
  project,
  delay = 0,
  priority = false,
}: {
  project: Project;
  delay?: number;
  priority?: boolean;
}) {
  return (
    <Reveal delay={delay}>
      <Link href={`/portfolio#${project.slug}`} className="group block">
        <div className="relative">
          <SiteMockup project={project} priority={priority} />
          <span className="absolute right-3 top-11 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.technologies.slice(0, 3).map((tech) => (
            <Badge key={tech}>{tech}</Badge>
          ))}
        </div>
      </Link>
    </Reveal>
  );
}
