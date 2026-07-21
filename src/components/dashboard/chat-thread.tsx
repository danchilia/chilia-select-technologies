"use client";

import { useEffect, useRef, useState } from "react";
import { Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Message = {
  id: string;
  senderRole: "client" | "admin";
  body: string;
  createdAt: string;
};

const POLL_INTERVAL_MS = 10_000;

export function ChatThread({
  currentRole,
  threadUserId,
}: {
  currentRole: "client" | "admin";
  /** Required when currentRole is "admin": the client whose thread this is. */
  threadUserId?: string;
}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const query = currentRole === "admin" && threadUserId ? `?userId=${threadUserId}` : "";
  const disabled = currentRole === "admin" && !threadUserId;

  useEffect(() => {
    if (disabled) return;

    let cancelled = false;

    async function load() {
      try {
        const res = await fetch(`/api/messages${query}`, { cache: "no-store" });
        const result = await res.json();
        if (!cancelled && result.ok) {
          setMessages(result.messages);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
      fetch(`/api/messages${query}`, { method: "PATCH" }).catch(() => {});
    }

    load();
    const interval = setInterval(load, POLL_INTERVAL_MS);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [query, disabled]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    const text = draft.trim();
    if (!text || disabled) return;

    setSending(true);
    setError(null);
    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body: text, userId: threadUserId }),
      });
      const result = await res.json();
      if (!res.ok || !result.ok) throw new Error(result.error || "Failed to send message.");
      setMessages((prev) => [...prev, result.message]);
      setDraft("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send message.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="flex h-[32rem] flex-col rounded-2xl border border-border bg-surface">
      <div className="flex-1 overflow-y-auto p-5">
        {loading ? (
          <div className="flex h-full items-center justify-center text-text-light">
            <Loader2 className="h-5 w-5 animate-spin" />
          </div>
        ) : disabled ? (
          <p className="text-center text-sm text-text-light">Select a client to view messages.</p>
        ) : messages.length === 0 ? (
          <p className="text-center text-sm text-text-light">No messages yet. Say hello.</p>
        ) : (
          <div className="flex flex-col gap-3">
            {messages.map((m) => {
              const isMine = m.senderRole === currentRole;
              return (
                <div
                  key={m.id}
                  className={cn("flex flex-col", isMine ? "items-end" : "items-start")}
                >
                  <div
                    className={cn(
                      "max-w-[80%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-sm",
                      isMine
                        ? "bg-accent text-white"
                        : "border border-border bg-background text-text"
                    )}
                  >
                    {m.body}
                  </div>
                  <span className="mt-1 text-xs text-text-light">
                    {new Date(m.createdAt).toLocaleString([], {
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              );
            })}
            <div ref={bottomRef} />
          </div>
        )}
      </div>

      <form onSubmit={handleSend} className="flex items-center gap-2 border-t border-border p-3">
        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          disabled={disabled || sending}
          placeholder={disabled ? "Select a client first" : "Type a message..."}
          className="h-11 flex-1 rounded-xl border border-border bg-background px-4 text-sm text-text placeholder:text-text-light focus:border-accent focus:outline-none disabled:opacity-50"
        />
        <Button type="submit" size="sm" disabled={disabled || sending || !draft.trim()}>
          {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        </Button>
      </form>
      {error ? <p className="px-5 pb-3 text-xs font-medium text-red-500">{error}</p> : null}
    </div>
  );
}
