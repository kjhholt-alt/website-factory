"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { Bot } from "lucide-react";
import { useAgentStore } from "@/lib/agent-store";
import { mockAgents, mockSessions, mockAlerts } from "@/lib/agent-mock-data";
import { AgentCard } from "@/components/agents/AgentCard";
import { DashboardSummary } from "@/components/agents/DashboardSummary";
import { AlertPanel } from "@/components/agents/AlertPanel";

export default function AgentsPage() {
  const {
    agents,
    sessions,
    alerts,
    setAgentStatus,
    addSessionNote,
    dismissAlert,
    clearAlerts,
  } = useAgentStore();

  // Seed mock data on first load
  useEffect(() => {
    const store = useAgentStore.getState();
    if (store.agents.length === 0) {
      useAgentStore.setState({
        agents: mockAgents,
        sessions: mockSessions,
        alerts: mockAlerts,
      });
    }
  }, []);

  const activeAlerts = alerts.filter((a) => !a.dismissed);

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3"
      >
        <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
          <Bot className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Agent Mission Control</h1>
          <p className="text-sm text-muted-foreground">
            Monitor and manage your Claude Code agents
          </p>
        </div>
      </motion.div>

      {/* Summary stats */}
      <DashboardSummary
        agents={agents}
        sessions={sessions}
        alertCount={activeAlerts.length}
      />

      {/* Alerts */}
      {alerts.length > 0 && (
        <AlertPanel
          alerts={alerts}
          onDismiss={dismissAlert}
          onClear={clearAlerts}
        />
      )}

      {/* Agent cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {agents.map((agent, i) => {
          const agentSessions = sessions
            .filter((s) => s.agentId === agent.id)
            .sort(
              (a, b) =>
                new Date(b.startTime).getTime() -
                new Date(a.startTime).getTime()
            );
          const latestSession = agentSessions[0];

          return (
            <AgentCard
              key={agent.id}
              agent={agent}
              session={latestSession}
              index={i}
              onStatusChange={setAgentStatus}
              onAddNote={addSessionNote}
            />
          );
        })}
      </div>

      {/* Empty state */}
      {agents.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">
          <Bot className="w-12 h-12 mx-auto mb-4 opacity-30" />
          <p className="text-lg font-medium">No agents configured</p>
          <p className="text-sm mt-1">
            Agents will appear here once configured.
          </p>
        </div>
      )}
    </div>
  );
}
