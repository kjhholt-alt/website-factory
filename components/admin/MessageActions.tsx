"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface MessageActionsProps {
  messageId: string;
  isRead: boolean;
}

export function MessageActions({ messageId, isRead }: MessageActionsProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleMarkRead() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/messages", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: messageId }),
      });

      if (!res.ok) {
        throw new Error("Failed to mark as read");
      }

      router.refresh();
    } catch (error) {
      console.error("Error marking message as read:", error);
    } finally {
      setLoading(false);
    }
  }

  if (isRead) {
    return (
      <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
        <Check className="h-3 w-3" />
        Read
      </span>
    );
  }

  return (
    <Button
      variant="outline"
      size="sm"
      className="h-7 px-2 text-xs"
      disabled={loading}
      onClick={handleMarkRead}
    >
      {loading ? "..." : "Mark Read"}
    </Button>
  );
}
