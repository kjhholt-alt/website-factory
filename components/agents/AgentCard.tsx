"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Bot, FolderOpen, Pause, Play, CheckCircle, StickyNote } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/agents/StatusBadge";
import { SessionTimer } from "@/components/agents/SessionTimer";
import { Agent, Session, AgentStatus } from "@/lib/agent-types";

interface AgentCardProps {
  agent: Agent;
  session?: Session;
  index: number;
  onStatusChange: (id: string, status: AgentStatus) => void;
  onAddNote: (sessionId: string, note: string) => void;
}

export function AgentCard({ agent, session, index, onStatusChange, onAddNote }: AgentCardProps) {
  const [showQuickNote, setShowQuickNote] = useState(false);
  const [noteText, setNoteText] = useState("");
  const isRunning = session && !session.endTime;
  const tasksDone = session ? session.tasks.filter((t) => t.done).length : 0;
  const tasksTotal = session ? session.tasks.length : 0;

  const handleAddNote = () => {
    if (noteText.trim() && session) {
      onAddNote(session.id, noteText.trim());
      setNoteText("");
      setShowQuickNote(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.06, duration: 0.3 }}>
      <Card className="bg-card border hover:border-primary/20 transition-all duration-200">
        <CardHeader className="pb-3">
          <Link href={`/admin/agents/${agent.id}`}>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="p-1.5 rounded-md bg-primary/10 border border-primary/20 shrink-0">
                  <Bot className="w-4 h-4 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold truncate hover:text-primary transition-colors">{agent.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{agent.project}</p>
                </div>
              </div>
              <StatusBadge status={agent.status} />
            </div>
          </Link>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <FolderOpen className="w-3 h-3 shrink-0" />
            <span className="truncate font-mono">{agent.directory}</span>
          </div>
          {isRunning && (
            <div className="flex items-center justify-between">
              <SessionTimer startTime={session.startTime} className="text-xs text-green-600 dark:text-green-400" />
              {tasksTotal > 0 && <span className="text-xs text-muted-foreground">{tasksDone}/{tasksTotal} tasks</span>}
            </div>
          )}
          {!isRunning && session?.endTime && (
            <p className="text-xs text-muted-foreground">Last session ended {new Date(session.endTime).toLocaleTimeString()}</p>
          )}
          <div className="flex items-center gap-1.5 pt-1 border-t">
            {agent.status === "active" ? (
              <Button size="sm" variant="ghost" className="h-7 text-xs px-2" onClick={() => onStatusChange(agent.id, "idle")}>
                <Pause className="w-3 h-3 mr-1" /> Pause
              </Button>
            ) : agent.status !== "completed" ? (
              <Button size="sm" variant="ghost" className="h-7 text-xs px-2" onClick={() => onStatusChange(agent.id, "active")}>
                <Play className="w-3 h-3 mr-1" /> Resume
              </Button>
            ) : null}
            <Button size="sm" variant="ghost" className="h-7 text-xs px-2" onClick={() => onStatusChange(agent.id, "completed")}>
              <CheckCircle className="w-3 h-3 mr-1" /> Done
            </Button>
            <Button size="sm" variant="ghost" className="h-7 text-xs px-2" onClick={() => setShowQuickNote(!showQuickNote)}>
              <StickyNote className="w-3 h-3 mr-1" /> Note
            </Button>
          </div>
          {showQuickNote && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="flex gap-1.5">
              <input type="text" value={noteText} onChange={(e) => setNoteText(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleAddNote()} placeholder="Add a note..." className="flex-1 h-7 px-2 text-xs rounded-md bg-muted border focus:outline-none focus:ring-1 focus:ring-primary" autoFocus />
              <Button size="sm" variant="secondary" className="h-7 text-xs px-2" onClick={handleAddNote}>Add</Button>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
