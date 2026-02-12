import { Agent, Session, Alert } from "@/lib/agent-types";

const now = Date.now();
const min = 60_000;

export const mockAgents: Agent[] = [
  {
    id: "agent-alpha",
    name: "Alpha",
    project: "Portfolio Site",
    directory: "~/Projects/portfolio-site",
    status: "active",
    hourlyRate: 150,
  },
  {
    id: "agent-bravo",
    name: "Bravo",
    project: "Website Factory",
    directory: "~/Projects/website-factory",
    status: "needs-input",
    hourlyRate: 175,
  },
  {
    id: "agent-charlie",
    name: "Charlie",
    project: "Bottleneck Analyzer",
    directory: "~/Projects/bottleneck-analyzer",
    status: "idle",
    hourlyRate: 150,
  },
];

export const mockSessions: Session[] = [
  {
    id: "ses-alpha-1",
    agentId: "agent-alpha",
    startTime: new Date(now - 45 * min).toISOString(),
    notes: [
      "Started building the hero section with parallax scroll",
      "Switched to Next.js App Router for better SEO",
    ],
    tasks: [
      { id: "t1", text: "Set up Next.js project", done: true },
      { id: "t2", text: "Build hero section", done: true },
      { id: "t3", text: "Create project gallery", done: false },
      { id: "t4", text: "Add contact form", done: false },
    ],
    tokenEstimate: 45000,
  },
  {
    id: "ses-bravo-1",
    agentId: "agent-bravo",
    startTime: new Date(now - 22 * min).toISOString(),
    notes: ["Needs clarification on template engine choice"],
    tasks: [
      { id: "t5", text: "Scaffold project structure", done: true },
      { id: "t6", text: "Build template selector", done: false },
      { id: "t7", text: "Implement build pipeline", done: false },
    ],
    tokenEstimate: 22000,
  },
  {
    id: "ses-charlie-1",
    agentId: "agent-charlie",
    startTime: new Date(now - 67 * min).toISOString(),
    notes: [
      "Idle - waiting for profiling data to finish",
      "First pass analysis complete, need to run stress test next",
    ],
    tasks: [
      { id: "t8", text: "Profile API endpoints", done: true },
      { id: "t9", text: "Analyze database queries", done: true },
      { id: "t10", text: "Generate bottleneck report", done: false },
    ],
    tokenEstimate: 67000,
  },
  {
    id: "ses-alpha-0",
    agentId: "agent-alpha",
    startTime: new Date(now - 6 * 60 * min).toISOString(),
    endTime: new Date(now - 4 * 60 * min).toISOString(),
    notes: ["Initial project setup and planning"],
    tasks: [
      { id: "t11", text: "Research design inspiration", done: true },
      { id: "t12", text: "Set up repo and CI", done: true },
    ],
    tokenEstimate: 120000,
  },
];

export const mockAlerts: Alert[] = [
  {
    id: "alert-1",
    agentId: "agent-charlie",
    type: "idle",
    message: "Agent Charlie has been idle for 15 minutes",
    timestamp: new Date(now - 5 * min).toISOString(),
    dismissed: false,
  },
  {
    id: "alert-2",
    agentId: "agent-bravo",
    type: "needs-input",
    message: "Agent Bravo needs input: template engine selection",
    timestamp: new Date(now - 8 * min).toISOString(),
    dismissed: false,
  },
];
