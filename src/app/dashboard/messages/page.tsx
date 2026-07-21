import { ChatThread } from "@/components/dashboard/chat-thread";

export default function DashboardMessagesPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-3xl font-semibold text-text">Messages</h1>
        <p className="mt-1 text-text-light">Chat directly with the Chilia Select team.</p>
      </div>
      <ChatThread currentRole="client" />
    </div>
  );
}
