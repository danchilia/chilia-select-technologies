"use client";

import { useEffect, useState } from "react";
import { FileText, Upload, Loader2, Download } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type FileRecord = {
  id: string;
  name: string;
  url: string;
  uploadedByRole: "client" | "admin";
  createdAt: string;
};

export function FileManager({
  currentRole,
  threadUserId,
  projectId,
}: {
  currentRole: "client" | "admin";
  /** Required when currentRole is "admin": the client whose files these are. */
  threadUserId?: string;
  /** Scopes the list (and uploads) to a single project instead of every file the client has. */
  projectId?: string;
}) {
  const [files, setFiles] = useState<FileRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const params = new URLSearchParams();
  if (currentRole === "admin" && threadUserId) params.set("userId", threadUserId);
  if (projectId) params.set("projectId", projectId);
  const query = params.toString() ? `?${params.toString()}` : "";
  const disabled = currentRole === "admin" && !threadUserId;

  async function load() {
    if (disabled) return;
    try {
      const res = await fetch(`/api/files${query}`, { cache: "no-store" });
      const result = await res.json();
      if (result.ok) setFiles(result.files);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, disabled]);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file || disabled) return;

    setUploading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("file", file);
      if (threadUserId) formData.append("userId", threadUserId);
      if (projectId) formData.append("projectId", projectId);

      const res = await fetch("/api/files", { method: "POST", body: formData });
      const result = await res.json();
      if (!res.ok || !result.ok) throw new Error(result.error || "Upload failed.");
      setFiles((prev) => [result.file, ...prev]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="rounded-md border border-border bg-surface p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-semibold text-text">Files</h3>
        <label
          className={cn(
            buttonVariants({ variant: "outline", size: "sm" }),
            "cursor-pointer",
            (disabled || uploading) && "pointer-events-none opacity-50"
          )}
        >
          {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
          Upload
          <input type="file" className="hidden" onChange={handleUpload} disabled={disabled || uploading} />
        </label>
      </div>

      {error ? <p className="mb-3 text-xs font-medium text-red-500">{error}</p> : null}

      {loading ? (
        <div className="flex justify-center py-6 text-text-light">
          <Loader2 className="h-5 w-5 animate-spin" />
        </div>
      ) : disabled ? (
        <p className="text-sm text-text-light">Select a client to view files.</p>
      ) : files.length === 0 ? (
        <p className="text-sm text-text-light">No files yet.</p>
      ) : (
        <ul className="flex flex-col divide-y divide-border">
          {files.map((file) => (
            <li key={file.id} className="flex items-center justify-between gap-3 py-3">
              <div className="flex min-w-0 items-center gap-3">
                <FileText className="h-4 w-4 shrink-0 text-text-light" />
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-text">{file.name}</p>
                  <p className="text-xs text-text-light">
                    Uploaded by {file.uploadedByRole} &middot;{" "}
                    {new Date(file.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <a
                href={file.url}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 rounded-md p-2 text-text-light transition-colors hover:bg-background hover:text-accent"
                aria-label={`Download ${file.name}`}
              >
                <Download className="h-4 w-4" />
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
