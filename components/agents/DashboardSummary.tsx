"use client";

import { motion } from "framer-motion";
import { Bot, Zap, Clock, AlertTriangle, DollarSign } from "lucide-react";
import { Agent, Session } from "@/lib/agent-types";

interface DashboardSummaryProps { agents: Agent[]; sessions: Session[]; alertCount: number; }

function formatTotalTime(sessions: Session[]): string {
  const now = new Date();
  let totalMs = 0;
  for (const s of sessions) {
    const start = new Date(s.startTime);
    const end = s.endTime ? new Date(s.endTime) : now;
    totalMs += end.getTime() - start.getTime();
  }
  const hours = Math.floor(totalMs / 3600000);
  const mins = Math.floor((totalMs % 3600000) / 60000);
  return `${hours}h ${mins}m`;
}

function calcTotalValue(agents: Agent[], sessions: Session[]): string {
  const now = new Date();
  let totalValue = 0;
  for (const s of sessions) {
    const agent = agents.find((a) => a.id === s.agentId);
    if (!agent) continue;
    const start = new Date(s.startTime);
    const end = s.endTime ? new Date(s.endTime) : now;
    const hours = (end.getTime() - start.getTime()) / 3600000;
    totalValue += hours * agent.hourlyRate;
  }
  return totalValue.toFixed(0);
}

export function DashboardSummary({ agents, sessions, alertCount }: DashboardSummaryProps) {
  const activeCount = agents.filter((a) => a.status === "active").length;
  const activeSessions = sessions.filter((s) => !s.endTime);
  const stats = [
    { label: "Total Agents", value: agents.length, icon: <Bot className="w-4 h-4" />, color: "text-primary" },
    { label: "Active", value: activeCount, icon: <Zap className="w-4 h-4" />, color: "text-green-500" },
    { label: "Session Time", value: formatTotalTime(activeSessions), icon: <Clock className="w-4 h-4" />, color: "text-cyan-500" },
    { label: "Alerts", value: alertCount, icon: <AlertTriangle className="w-4 h-4" />, color: alertCount > 0 ? "text-yellow-500" : "text-muted-foreground" },
    { label: "Est. Value", value: `$${calcTotalValue(agents, activeSessions)}`, icon: <DollarSign className="w-4 h-4" />, color: "text-emerald-500" },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
      {stats.map((stat, i) => (
        <motion.div key={stat.label} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.04 }} className="p-3 rounded-lg bg-card border">
          <div className="flex items-center gap-1.5 mb-1">
            <span className={stat.color}>{stat.icon}</span>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{stat.label}</p>
          </div>
          <p className={`text-xl font-bold ${stat.color}`}>{stat.value}</p>
        </motion.div>
      ))}
    </div>
  );
}
