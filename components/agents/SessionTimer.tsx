"use client";

import { useEffect, useState } from "react";
import { Timer } from "lucide-react";
import { intervalToDuration } from "date-fns";

interface SessionTimerProps {
  startTime: string;
  endTime?: string;
  className?: string;
  showIcon?: boolean;
  compact?: boolean;
}

function formatElapsed(start: Date, end: Date): string {
  const duration = intervalToDuration({ start, end });
  const hours = duration.hours ?? 0;
  const minutes = duration.minutes ?? 0;
  const seconds = duration.seconds ?? 0;
  if (hours > 0) {
    return `${hours}h ${String(minutes).padStart(2, "0")}m ${String(seconds).padStart(2, "0")}s`;
  }
  return `${minutes}m ${String(seconds).padStart(2, "0")}s`;
}

function formatElapsedCompact(start: Date, end: Date): string {
  const duration = intervalToDuration({ start, end });
  const hours = duration.hours ?? 0;
  const minutes = duration.minutes ?? 0;
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
}

export function SessionTimer({ startTime, endTime, className = "", showIcon = true, compact = false }: SessionTimerProps) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    if (endTime) return;
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, [endTime]);

  const start = new Date(startTime);
  const end = endTime ? new Date(endTime) : now;
  const fmt = compact ? formatElapsedCompact : formatElapsed;

  return (
    <span className={`inline-flex items-center gap-1 font-mono tabular-nums ${className}`}>
      {showIcon && <Timer className="w-3 h-3" />}
      {fmt(start, end)}
    </span>
  );
}
