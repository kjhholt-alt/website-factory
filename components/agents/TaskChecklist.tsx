"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, CheckSquare, Square, ListTodo } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Task } from "@/lib/agent-types";

interface TaskChecklistProps {
  tasks: Task[];
  onAdd: (text: string) => void;
  onToggle: (taskId: string) => void;
  onRemove: (taskId: string) => void;
  title?: string;
}

export function TaskChecklist({ tasks, onAdd, onToggle, onRemove, title = "Tasks" }: TaskChecklistProps) {
  const [newTask, setNewTask] = useState("");
  const doneCount = tasks.filter((t) => t.done).length;
  const progress = tasks.length > 0 ? (doneCount / tasks.length) * 100 : 0;

  const handleAdd = () => { if (newTask.trim()) { onAdd(newTask.trim()); setNewTask(""); } };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <ListTodo className="w-4 h-4 text-primary" /> {title}
          </CardTitle>
          <span className="text-xs text-muted-foreground">{doneCount}/{tasks.length}</span>
        </div>
        {tasks.length > 0 && (
          <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
            <motion.div className="h-full bg-green-500 rounded-full" initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 0.3 }} />
          </div>
        )}
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex gap-1.5">
          <input type="text" value={newTask} onChange={(e) => setNewTask(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleAdd()} placeholder="Add a task..." className="flex-1 h-8 px-3 text-xs rounded-md bg-muted border focus:outline-none focus:ring-1 focus:ring-primary" />
          <Button size="sm" variant="secondary" className="h-8 px-2" onClick={handleAdd} disabled={!newTask.trim()}>
            <Plus className="w-3 h-3" />
          </Button>
        </div>
        <div className="space-y-1">
          <AnimatePresence>
            {tasks.map((task) => (
              <motion.div key={task.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="flex items-center gap-2 group py-1 px-1 rounded hover:bg-muted">
                <button onClick={() => onToggle(task.id)} className="shrink-0 text-muted-foreground hover:text-foreground transition-colors">
                  {task.done ? <CheckSquare className="w-4 h-4 text-green-500" /> : <Square className="w-4 h-4" />}
                </button>
                <span className={`flex-1 text-xs ${task.done ? "line-through text-muted-foreground" : ""}`}>{task.text}</span>
                <button onClick={() => onRemove(task.id)} className="shrink-0 opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-all">
                  <X className="w-3 h-3" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        {tasks.length === 0 && <p className="text-xs text-muted-foreground text-center py-3">No tasks yet</p>}
      </CardContent>
    </Card>
  );
}
