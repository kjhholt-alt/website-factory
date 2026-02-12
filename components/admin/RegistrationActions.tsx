"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface RegistrationActionsProps {
  registrationId: string;
  currentStatus: string;
}

export function RegistrationActions({
  registrationId,
  currentStatus,
}: RegistrationActionsProps) {
  const router = useRouter();
  const [loadingAction, setLoadingAction] = useState<string | null>(null);

  async function handleStatusChange(newStatus: string) {
    setLoadingAction(newStatus);
    try {
      const res = await fetch("/api/admin/registrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: registrationId, status: newStatus }),
      });

      if (!res.ok) {
        throw new Error("Failed to update status");
      }

      router.refresh();
    } catch (error) {
      console.error("Error updating registration status:", error);
    } finally {
      setLoadingAction(null);
    }
  }

  return (
    <div className="flex items-center gap-1">
      {currentStatus !== "confirmed" && (
        <Button
          variant="outline"
          size="sm"
          className="h-7 px-2 text-xs"
          disabled={loadingAction !== null}
          onClick={() => handleStatusChange("confirmed")}
        >
          {loadingAction === "confirmed" ? "..." : "Confirm"}
        </Button>
      )}
      {currentStatus !== "cancelled" && (
        <Button
          variant="outline"
          size="sm"
          className="h-7 px-2 text-xs text-red-600 hover:text-red-700 hover:bg-red-50"
          disabled={loadingAction !== null}
          onClick={() => handleStatusChange("cancelled")}
        >
          {loadingAction === "cancelled" ? "..." : "Cancel"}
        </Button>
      )}
    </div>
  );
}
