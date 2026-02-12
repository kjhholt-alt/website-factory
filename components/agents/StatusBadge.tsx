"use client";

import { motion } from "framer-motion";
import { Zap, CircleDot, AlertCircle, CheckCircle2, MessageCircleQuestion } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { AgentStatus } from "@/lib/agent-types";

const statusConfig: Record<AgentStatus, { label: string; color: string; dotColor: string; icon: React.ReactNode }> = {
  active: { label: "Active", color: "bg-green-500/20 text-green-400 border-green-500/30", dotColor: "bg-green-500", icon: <Zap className="w-3 h-3" /> },
  idle: { label: "Idle", color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30", dotColor: "bg-yellow-500", icon: <CircleDot className="w-3 h-3" /> },
  "needs-input": { label: "Needs Input", color: "bg-blue-500/20 text-blue-400 border-blue-500/30", dotColor: "bg-blue-500", icon: <MessageCircleQuestion className="w-3 h-3" /> },
  completed: { label: "Completed", color: "bg-gray-500/20 text-gray-400 border-gray-500/30", dotColor: "bg-gray-500", icon: <CheckCircle2 className="w-3 h-3" /> },
  error: { label: "Error", color: "bg-red-500/20 text-red-400 border-red-500/30", dotColor: "bg-red-500", icon: <AlertCircle className="w-3 h-3" /> },
};

interface StatusBadgeProps { status: AgentStatus; pulse?: boolean; }

export function StatusBadge({ status, pulse = true }: StatusBadgeProps) {
  const config = statusConfig[status] || statusConfig.idle;
  const shouldPulse = pulse && (status === "active" || status === "needs-input");
  return (
    <Badge variant="outline" className={`text-xs ${config.color} flex items-center gap-1.5`}>
      {shouldPulse ? (
        <span className="relative flex h-2 w-2">
          <motion.span className={`absolute inline-flex h-full w-full rounded-full ${config.dotColor} opacity-75`} animate={{ scale: [1, 1.8, 1], opacity: [0.75, 0, 0.75] }} transition={{ duration: 1.5, repeat: Infinity }} />
          <span className={`relative inline-flex rounded-full h-2 w-2 ${config.dotColor}`} />
        </span>
      ) : config.icon}
      {config.label}
    </Badge>
  );
}
