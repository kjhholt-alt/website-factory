"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  Agent,
  AgentStatus,
  Session,
  Alert,
  AlertThresholds,
} from "@/lib/agent-types";

function uid(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

interface AgentStore {
  agents: Agent[];
  addAgent: (agent: Omit<Agent, "id">) => void;
  updateAgent: (id: string, updates: Partial<Agent>) => void;
  removeAgent: (id: string) => void;
  setAgentStatus: (id: string, status: AgentStatus) => void;

  sessions: Session[];
  startSession: (agentId: string) => string;
  endSession: (sessionId: string) => void;
  addSessionNote: (sessionId: string, note: string) => void;
  addSessionTask: (sessionId: string, text: string) => void;
  toggleSessionTask: (sessionId: string, taskId: string) => void;
  removeSessionTask: (sessionId: string, taskId: string) => void;
  setTokenEstimate: (sessionId: string, tokens: number) => void;

  alerts: Alert[];
  addAlert: (alert: Omit<Alert, "id" | "timestamp" | "dismissed">) => void;
  dismissAlert: (id: string) => void;
  clearAlerts: () => void;

  thresholds: AlertThresholds;
  setThresholds: (thresholds: Partial<AlertThresholds>) => void;
}

export const useAgentStore = create<AgentStore>()(
  persist(
    (set) => ({
      agents: [],
      addAgent: (agent) =>
        set((s) => ({ agents: [...s.agents, { ...agent, id: uid() }] })),
      updateAgent: (id, updates) =>
        set((s) => ({
          agents: s.agents.map((a) => (a.id === id ? { ...a, ...updates } : a)),
        })),
      removeAgent: (id) =>
        set((s) => ({ agents: s.agents.filter((a) => a.id !== id) })),
      setAgentStatus: (id, status) =>
        set((s) => ({
          agents: s.agents.map((a) => (a.id === id ? { ...a, status } : a)),
        })),

      sessions: [],
      startSession: (agentId) => {
        const id = uid();
        set((s) => ({
          sessions: [
            ...s.sessions,
            { id, agentId, startTime: new Date().toISOString(), notes: [], tasks: [] },
          ],
        }));
        return id;
      },
      endSession: (sessionId) =>
        set((s) => ({
          sessions: s.sessions.map((ses) =>
            ses.id === sessionId ? { ...ses, endTime: new Date().toISOString() } : ses
          ),
        })),
      addSessionNote: (sessionId, note) =>
        set((s) => ({
          sessions: s.sessions.map((ses) =>
            ses.id === sessionId ? { ...ses, notes: [...ses.notes, note] } : ses
          ),
        })),
      addSessionTask: (sessionId, text) =>
        set((s) => ({
          sessions: s.sessions.map((ses) =>
            ses.id === sessionId
              ? { ...ses, tasks: [...ses.tasks, { id: uid(), text, done: false }] }
              : ses
          ),
        })),
      toggleSessionTask: (sessionId, taskId) =>
        set((s) => ({
          sessions: s.sessions.map((ses) =>
            ses.id === sessionId
              ? { ...ses, tasks: ses.tasks.map((t) => (t.id === taskId ? { ...t, done: !t.done } : t)) }
              : ses
          ),
        })),
      removeSessionTask: (sessionId, taskId) =>
        set((s) => ({
          sessions: s.sessions.map((ses) =>
            ses.id === sessionId
              ? { ...ses, tasks: ses.tasks.filter((t) => t.id !== taskId) }
              : ses
          ),
        })),
      setTokenEstimate: (sessionId, tokens) =>
        set((s) => ({
          sessions: s.sessions.map((ses) =>
            ses.id === sessionId ? { ...ses, tokenEstimate: tokens } : ses
          ),
        })),

      alerts: [],
      addAlert: (alert) =>
        set((s) => ({
          alerts: [
            { ...alert, id: uid(), timestamp: new Date().toISOString(), dismissed: false },
            ...s.alerts,
          ].slice(0, 200),
        })),
      dismissAlert: (id) =>
        set((s) => ({
          alerts: s.alerts.map((a) => (a.id === id ? { ...a, dismissed: true } : a)),
        })),
      clearAlerts: () => set({ alerts: [] }),

      thresholds: { idleMinutes: 10, longSessionMinutes: 120 },
      setThresholds: (updates) =>
        set((s) => ({ thresholds: { ...s.thresholds, ...updates } })),
    }),
    { name: "agent-mission-control" }
  )
);
