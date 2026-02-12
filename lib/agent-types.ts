export type AgentStatus = "active" | "idle" | "needs-input" | "completed" | "error";

export interface Agent {
  id: string;
  name: string;
  project: string;
  directory: string;
  status: AgentStatus;
  hourlyRate: number;
}

export interface Task {
  id: string;
  text: string;
  done: boolean;
}

export interface Session {
  id: string;
  agentId: string;
  startTime: string;
  endTime?: string;
  notes: string[];
  tasks: Task[];
  tokenEstimate?: number;
}

export interface Alert {
  id: string;
  agentId: string;
  type: "idle" | "long-session" | "needs-input" | "completed";
  message: string;
  timestamp: string;
  dismissed: boolean;
}

export interface AlertThresholds {
  idleMinutes: number;
  longSessionMinutes: number;
}
