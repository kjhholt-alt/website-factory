"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Bot,
  FolderOpen,
  Play,
  Pause,
  CheckCircle,
  Square,
  CheckSquare,
  Clock,
  DollarSign,
  Coins,
  X,
  CircleDot,
  Zap,
  AlertCircle,
  MessageCircleQuestion,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatusBadge } from "@/components/agents/StatusBadge";
import { SessionTimer } from "@/components/agents/SessionTimer";
import { TaskChecklist } from "@/components/agents/TaskChecklist";
import { NoteInput } from "@/components/agents/NoteInput";
import { useAgentStore } from "@/lib/agent-store";
import { mockAgents, mockSessions, mockAlerts } from "@/lib/agent-mock-data";
import { AgentStatus, Session } from "@/lib/agent-types";
import { format } from "date-fns";

function getSessionDurationMs(session: Session): number {
  const start = new Date(session.startTime);
  const end = session.endTime ? new Date(session.endTime) : new Date();
  return end.getTime() - start.getTime();
}

function formatMs(ms: number): string {
  const hours = Math.floor(ms / 3600000);
  const mins = Math.floor((ms % 3600000) / 60000);
  if (hours > 0) return `${hours}h ${mins}m`;
  return `${mins}m`;
}

const statusActions: Record<
  AgentStatus,
  { label: string; next: AgentStatus; icon: React.ReactNode; color: string }[]
> = {
  active: [
    { label: "Pause", next: "idle", icon: <Pause className="w-3.5 h-3.5" />, color: "text-yellow-500 hover:text-yellow-600" },
    { label: "Needs Input", next: "needs-input", icon: <MessageCircleQuestion className="w-3.5 h-3.5" />, color: "text-blue-500 hover:text-blue-600" },
    { label: "Complete", next: "completed", icon: <CheckCircle className="w-3.5 h-3.5" />, color: "text-muted-foreground" },
  ],
  idle: [
    { label: "Resume", next: "active", icon: <Play className="w-3.5 h-3.5" />, color: "text-green-500 hover:text-green-600" },
    { label: "Complete", next: "completed", icon: <CheckCircle className="w-3.5 h-3.5" />, color: "text-muted-foreground" },
  ],
  "needs-input": [
    { label: "Resume", next: "active", icon: <Play className="w-3.5 h-3.5" />, color: "text-green-500 hover:text-green-600" },
    { label: "Pause", next: "idle", icon: <Pause className="w-3.5 h-3.5" />, color: "text-yellow-500 hover:text-yellow-600" },
  ],
  completed: [
    { label: "Reopen", next: "active", icon: <RotateCcw className="w-3.5 h-3.5" />, color: "text-green-500 hover:text-green-600" },
  ],
  error: [
    { label: "Retry", next: "active", icon: <RotateCcw className="w-3.5 h-3.5" />, color: "text-green-500 hover:text-green-600" },
    { label: "Complete", next: "completed", icon: <CheckCircle className="w-3.5 h-3.5" />, color: "text-muted-foreground" },
  ],
};

export default function AgentDetailPage() {
  const params = useParams();
  const agentId = params.id as string;

  const {
    agents,
    sessions,
    alerts,
    setAgentStatus,
    startSession,
    endSession,
    addSessionNote,
    addSessionTask,
    toggleSessionTask,
    removeSessionTask,
    setTokenEstimate,
    dismissAlert,
  } = useAgentStore();

  // Seed mock data if empty
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

  const agent = agents.find((a) => a.id === agentId);
  const agentSessions = useMemo(
    () =>
      sessions
        .filter((s) => s.agentId === agentId)
        .sort(
          (a, b) =>
            new Date(b.startTime).getTime() - new Date(a.startTime).getTime()
        ),
    [sessions, agentId]
  );
  const activeSession = agentSessions.find((s) => !s.endTime);
  const pastSessions = agentSessions.filter((s) => s.endTime);
  const agentAlerts = alerts.filter(
    (a) => a.agentId === agentId && !a.dismissed
  );

  // Totals
  const totalMs = agentSessions.reduce(
    (acc, s) => acc + getSessionDurationMs(s),
    0
  );
  const totalValue = agent ? (totalMs / 3600000) * agent.hourlyRate : 0;
  const totalTokens = agentSessions.reduce(
    (acc, s) => acc + (s.tokenEstimate || 0),
    0
  );

  // Token input state
  const [tokenInput, setTokenInput] = useState("");

  if (!agent) {
    return (
      <div className="text-center py-16">
        <p className="text-destructive mb-4">Agent not found</p>
        <Link href="/admin/agents">
          <Button variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Agents
          </Button>
        </Link>
      </div>
    );
  }

  const actions = statusActions[agent.status] || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link href="/admin/agents">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div className="flex-1">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 flex-wrap"
          >
            <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
              <Bot className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold">{agent.name}</h1>
              <p className="text-sm text-muted-foreground">{agent.project}</p>
            </div>
            <StatusBadge status={agent.status} />
          </motion.div>
        </div>
      </div>

      {/* Info bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-wrap gap-4 text-xs text-muted-foreground"
      >
        <span className="flex items-center gap-1">
          <FolderOpen className="w-3 h-3" />
          <span className="font-mono">{agent.directory}</span>
        </span>
        <span className="flex items-center gap-1">
          <DollarSign className="w-3 h-3" />${agent.hourlyRate}/hr
        </span>
      </motion.div>

      {/* Status controls */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="flex flex-wrap items-center gap-2"
      >
        {actions.map((action) => (
          <Button
            key={action.next}
            size="sm"
            variant="outline"
            className={`h-8 text-xs ${action.color}`}
            onClick={() => setAgentStatus(agent.id, action.next)}
          >
            {action.icon}
            <span className="ml-1.5">{action.label}</span>
          </Button>
        ))}
        {!activeSession && (
          <Button
            size="sm"
            variant="outline"
            className="h-8 text-xs text-cyan-500 hover:text-cyan-600"
            onClick={() => {
              startSession(agent.id);
              setAgentStatus(agent.id, "active");
            }}
          >
            <Play className="w-3.5 h-3.5 mr-1.5" />
            New Session
          </Button>
        )}
        {activeSession && (
          <Button
            size="sm"
            variant="outline"
            className="h-8 text-xs text-destructive"
            onClick={() => endSession(activeSession.id)}
          >
            <CircleDot className="w-3.5 h-3.5 mr-1.5" />
            End Session
          </Button>
        )}
      </motion.div>

      {/* Alerts banner */}
      {agentAlerts.length > 0 && (
        <div className="space-y-1.5">
          {agentAlerts.map((alert) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center justify-between p-2.5 rounded-lg bg-yellow-500/10 border border-yellow-500/20"
            >
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-yellow-500 shrink-0" />
                <span className="text-xs text-yellow-600 dark:text-yellow-300">
                  {alert.message}
                </span>
              </div>
              <button
                onClick={() => dismissAlert(alert.id)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="w-3 h-3" />
              </button>
            </motion.div>
          ))}
        </div>
      )}

      {/* Stats cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatCard
          label="Total Time"
          value={formatMs(totalMs)}
          icon={<Clock className="w-4 h-4" />}
          color="text-cyan-500"
        />
        <StatCard
          label="Est. Revenue"
          value={`$${totalValue.toFixed(0)}`}
          icon={<DollarSign className="w-4 h-4" />}
          color="text-emerald-500"
        />
        <StatCard
          label="Sessions"
          value={agentSessions.length.toString()}
          icon={<Zap className="w-4 h-4" />}
          color="text-blue-500"
        />
        <StatCard
          label="Est. Tokens"
          value={totalTokens > 0 ? `~${(totalTokens / 1000).toFixed(0)}k` : "N/A"}
          icon={<Coins className="w-4 h-4" />}
          color="text-purple-500"
        />
      </div>

      {/* Active session highlight */}
      {activeSession && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="bg-green-500/5 border-green-500/20">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
                  </span>
                  Active Session
                </CardTitle>
                <SessionTimer
                  startTime={activeSession.startTime}
                  className="text-sm text-green-600 dark:text-green-400 font-semibold"
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                <span>Started {format(new Date(activeSession.startTime), "h:mm a")}</span>
                {activeSession.tasks.length > 0 && (
                  <span>
                    {activeSession.tasks.filter((t) => t.done).length}/{activeSession.tasks.length} tasks done
                  </span>
                )}
                {activeSession.notes.length > 0 && (
                  <span>{activeSession.notes.length} notes</span>
                )}
                {activeSession.tokenEstimate && (
                  <span>~{(activeSession.tokenEstimate / 1000).toFixed(0)}k tokens</span>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Tabs */}
      <Tabs defaultValue={activeSession ? "tasks" : "timeline"} className="space-y-4">
        <TabsList>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
          <TabsTrigger value="timeline">Session Timeline</TabsTrigger>
          <TabsTrigger value="tokens">Token Usage</TabsTrigger>
        </TabsList>

        {/* Tasks tab */}
        <TabsContent value="tasks" className="space-y-4">
          {activeSession ? (
            <TaskChecklist
              tasks={activeSession.tasks}
              onAdd={(text) => addSessionTask(activeSession.id, text)}
              onToggle={(taskId) => toggleSessionTask(activeSession.id, taskId)}
              onRemove={(taskId) => removeSessionTask(activeSession.id, taskId)}
              title="Active Session Tasks"
            />
          ) : (
            <Card>
              <CardContent className="py-8 text-center text-sm text-muted-foreground">
                No active session. Start a new session to add tasks.
              </CardContent>
            </Card>
          )}

          {pastSessions.some((s) => s.tasks.length > 0) && (
            <div className="space-y-3">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Past Session Tasks
              </h3>
              {pastSessions
                .filter((s) => s.tasks.length > 0)
                .slice(0, 5)
                .map((session) => (
                  <Card key={session.id}>
                    <CardHeader className="pb-2">
                      <p className="text-xs text-muted-foreground">
                        {format(new Date(session.startTime), "MMM d, h:mm a")}
                        {" - "}
                        {session.endTime && format(new Date(session.endTime), "h:mm a")}
                      </p>
                    </CardHeader>
                    <CardContent className="space-y-1">
                      {session.tasks.map((task) => (
                        <div key={task.id} className="flex items-center gap-2 py-0.5">
                          {task.done ? (
                            <CheckSquare className="w-3.5 h-3.5 text-green-500 shrink-0" />
                          ) : (
                            <Square className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                          )}
                          <span className={`text-xs ${task.done ? "line-through text-muted-foreground" : ""}`}>
                            {task.text}
                          </span>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                ))}
            </div>
          )}
        </TabsContent>

        {/* Notes tab */}
        <TabsContent value="notes" className="space-y-4">
          {activeSession ? (
            <NoteInput
              notes={activeSession.notes}
              onAdd={(note) => addSessionNote(activeSession.id, note)}
              onRemove={() => {}}
              title="Active Session Notes"
            />
          ) : (
            <Card>
              <CardContent className="py-8 text-center text-sm text-muted-foreground">
                No active session. Start a new session to add notes.
              </CardContent>
            </Card>
          )}

          {pastSessions.some((s) => s.notes.length > 0) && (
            <div className="space-y-3">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Past Session Notes
              </h3>
              {pastSessions
                .filter((s) => s.notes.length > 0)
                .slice(0, 5)
                .map((session) => (
                  <Card key={session.id}>
                    <CardHeader className="pb-2">
                      <p className="text-xs text-muted-foreground">
                        {format(new Date(session.startTime), "MMM d, h:mm a")}
                      </p>
                    </CardHeader>
                    <CardContent className="space-y-1.5">
                      {session.notes.map((note, i) => (
                        <p key={i} className="text-xs text-muted-foreground pl-2 border-l-2 border-primary/30">
                          {note}
                        </p>
                      ))}
                    </CardContent>
                  </Card>
                ))}
            </div>
          )}
        </TabsContent>

        {/* Timeline tab */}
        <TabsContent value="timeline" className="space-y-3">
          {agentSessions.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center text-sm text-muted-foreground">
                No sessions recorded yet.
              </CardContent>
            </Card>
          ) : (
            agentSessions.map((session, i) => {
              const dur = getSessionDurationMs(session);
              const value = (dur / 3600000) * agent.hourlyRate;
              const isActive = !session.endTime;
              const tasksDone = session.tasks.filter((t) => t.done).length;

              return (
                <motion.div
                  key={session.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className={`relative pl-6 pb-4 ${
                    i < agentSessions.length - 1
                      ? "border-l-2 border-border ml-2"
                      : "ml-2"
                  }`}
                >
                  <div
                    className={`absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full border-2 ${
                      isActive
                        ? "bg-green-500 border-green-400"
                        : "bg-card border-border"
                    }`}
                  />

                  <div
                    className={`p-3 rounded-lg border ${
                      isActive
                        ? "bg-green-500/5 border-green-500/20"
                        : "bg-card"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className={`text-[10px] ${
                            isActive
                              ? "text-green-500 border-green-500/30"
                              : "text-muted-foreground"
                          }`}
                        >
                          {isActive ? "Active" : "Ended"}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {format(new Date(session.startTime), "MMM d, h:mm a")}
                          {session.endTime &&
                            ` - ${format(new Date(session.endTime), "h:mm a")}`}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <SessionTimer
                          startTime={session.startTime}
                          endTime={session.endTime}
                          className="text-xs text-cyan-500"
                          compact
                        />
                        <span className="text-xs text-emerald-500 font-mono">
                          ${value.toFixed(0)}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3 text-[10px] text-muted-foreground">
                      {session.tasks.length > 0 && (
                        <span>{tasksDone}/{session.tasks.length} tasks</span>
                      )}
                      {session.notes.length > 0 && (
                        <span>{session.notes.length} notes</span>
                      )}
                      {session.tokenEstimate && (
                        <span>~{(session.tokenEstimate / 1000).toFixed(0)}k tokens</span>
                      )}
                    </div>

                    {session.notes.length > 0 && (
                      <p className="text-xs text-muted-foreground mt-1.5 truncate">
                        &ldquo;{session.notes[session.notes.length - 1]}&rdquo;
                      </p>
                    )}
                  </div>
                </motion.div>
              );
            })
          )}
        </TabsContent>

        {/* Token usage tab */}
        <TabsContent value="tokens" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Coins className="w-4 h-4 text-purple-500" />
                Token Usage Tracking
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {activeSession && (
                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground">
                    Set token estimate for current session
                  </p>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={tokenInput}
                      onChange={(e) => setTokenInput(e.target.value)}
                      placeholder="e.g. 50000"
                      className="flex-1 h-8 px-3 text-xs rounded-md bg-muted border focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                    <Button
                      size="sm"
                      variant="secondary"
                      className="h-8 text-xs"
                      onClick={() => {
                        const val = parseInt(tokenInput, 10);
                        if (val > 0) {
                          setTokenEstimate(activeSession.id, val);
                          setTokenInput("");
                        }
                      }}
                      disabled={!tokenInput || parseInt(tokenInput, 10) <= 0}
                    >
                      Set
                    </Button>
                  </div>
                  {activeSession.tokenEstimate && (
                    <p className="text-xs text-purple-500">
                      Current estimate: ~{activeSession.tokenEstimate.toLocaleString()} tokens
                    </p>
                  )}
                </div>
              )}

              <div className="pt-3 border-t space-y-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  All Sessions
                </p>
                {agentSessions.map((session) => (
                  <div key={session.id} className="flex items-center justify-between py-1 text-xs">
                    <span className="text-muted-foreground">
                      {format(new Date(session.startTime), "MMM d, h:mm a")}
                      {!session.endTime && (
                        <Badge variant="outline" className="text-[9px] ml-1.5 text-green-500 border-green-500/30 py-0">
                          active
                        </Badge>
                      )}
                    </span>
                    <span className="font-mono text-purple-500">
                      {session.tokenEstimate
                        ? `~${(session.tokenEstimate / 1000).toFixed(0)}k`
                        : "\u2014"}
                    </span>
                  </div>
                ))}
                <div className="flex items-center justify-between pt-2 border-t text-xs font-semibold">
                  <span>Total</span>
                  <span className="text-purple-500 font-mono">
                    {totalTokens > 0
                      ? `~${(totalTokens / 1000).toFixed(0)}k tokens`
                      : "No estimates"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon,
  color,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  color: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="p-3 rounded-lg bg-card border"
    >
      <div className="flex items-center gap-1.5 mb-1">
        <span className={color}>{icon}</span>
        <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
          {label}
        </p>
      </div>
      <p className={`text-xl font-bold ${color}`}>{value}</p>
    </motion.div>
  );
}
