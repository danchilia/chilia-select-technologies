"use client";

import { useEffect, useState } from "react";
import { Loader2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ProjectStatusBadge } from "@/components/dashboard/status-badge";

type Project = {
  id: string;
  title: string;
  status: string;
  notes: string | null;
  createdAt: string;
};

const STATUSES = [
  { value: "pending", label: "Pending" },
  { value: "in_progress", label: "In Progress" },
  { value: "in_review", label: "In Review" },
  { value: "delivered", label: "Delivered" },
];

export function AdminProjectsPanel({ clientId }: { clientId: string }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    const res = await fetch(`/api/projects?userId=${clientId}`, { cache: "no-store" });
    const result = await res.json();
    return result.ok ? (result.projects as Project[]) : null;
  }

  useEffect(() => {
    let cancelled = false;
    load().then((data) => {
      if (cancelled) return;
      if (data) setProjects(data);
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientId]);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: clientId, title, notes }),
      });
      const result = await res.json();
      if (!res.ok || !result.ok) throw new Error(result.error || "Failed to create project.");
      setProjects((prev) => [result.project, ...prev]);
      setTitle("");
      setNotes("");
      setShowForm(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create project.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleStatusChange(projectId: string, status: string) {
    setProjects((prev) => prev.map((p) => (p.id === projectId ? { ...p, status } : p)));
    await fetch(`/api/projects/${projectId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-text">Projects</h3>
        <Button size="sm" variant="outline" onClick={() => setShowForm((v) => !v)}>
          <Plus className="h-4 w-4" />
          New project
        </Button>
      </div>

      {showForm ? (
        <Card className="hover:translate-y-0">
          <form onSubmit={handleCreate} className="flex flex-col gap-3">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Project title"
              required
              className="h-11 rounded-xl border border-border bg-background px-4 text-sm text-text placeholder:text-text-light focus:border-accent focus:outline-none"
            />
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Notes for the client (optional)"
              rows={3}
              className="rounded-xl border border-border bg-background px-4 py-3 text-sm text-text placeholder:text-text-light focus:border-accent focus:outline-none"
            />
            {error ? <p className="text-xs font-medium text-red-500">{error}</p> : null}
            <div className="flex justify-end gap-2">
              <Button type="button" variant="ghost" size="sm" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
              <Button type="submit" size="sm" disabled={submitting}>
                {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Create"}
              </Button>
            </div>
          </form>
        </Card>
      ) : null}

      {loading ? (
        <div className="flex justify-center py-6 text-text-light">
          <Loader2 className="h-5 w-5 animate-spin" />
        </div>
      ) : projects.length === 0 ? (
        <p className="text-sm text-text-light">No projects yet.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {projects.map((project) => (
            <Card key={project.id} className="hover:translate-y-0">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-medium text-text">{project.title}</p>
                  <p className="text-xs text-text-light">
                    Started {new Date(project.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <ProjectStatusBadge status={project.status} />
                  <select
                    value={project.status}
                    onChange={(e) => handleStatusChange(project.id, e.target.value)}
                    className="h-9 rounded-lg border border-border bg-background px-2 text-xs text-text focus:border-accent focus:outline-none"
                  >
                    {STATUSES.map((s) => (
                      <option key={s.value} value={s.value}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              {project.notes ? (
                <p className="mt-3 whitespace-pre-wrap text-sm text-text-light">{project.notes}</p>
              ) : null}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
