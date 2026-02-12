"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Bell, X, Clock, MessageCircleQuestion, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert } from "@/lib/agent-types";
import { formatDistanceToNow } from "date-fns";

const alertTypeConfig: Record<Alert["type"], { icon: React.ReactNode; color: string }> = {
  idle: { icon: <Clock className="w-3.5 h-3.5" />, color: "text-yellow-500" },
  "long-session": { icon: <AlertTriangle className="w-3.5 h-3.5" />, color: "text-orange-500" },
  "needs-input": { icon: <MessageCircleQuestion className="w-3.5 h-3.5" />, color: "text-blue-500" },
  completed: { icon: <CheckCircle2 className="w-3.5 h-3.5" />, color: "text-green-500" },
};

interface AlertPanelProps { alerts: Alert[]; onDismiss: (id: string) => void; onClear: () => void; }

export function AlertPanel({ alerts, onDismiss, onClear }: AlertPanelProps) {
  const activeAlerts = alerts.filter((a) => !a.dismissed);
  const recentAlerts = alerts.slice(0, 20);
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <Bell className="w-4 h-4 text-yellow-500" /> Alerts
          </CardTitle>
          <div className="flex items-center gap-2">
            {activeAlerts.length > 0 && <Badge variant="destructive" className="text-[10px] px-1.5 py-0">{activeAlerts.length}</Badge>}
            {alerts.length > 0 && <Button size="sm" variant="ghost" className="h-6 text-[10px] px-2 text-muted-foreground" onClick={onClear}>Clear all</Button>}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-1.5 max-h-[300px] overflow-y-auto">
        <AnimatePresence>
          {recentAlerts.map((alert) => {
            const config = alertTypeConfig[alert.type];
            return (
              <motion.div key={alert.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: alert.dismissed ? 0.5 : 1, x: 0 }} exit={{ opacity: 0, height: 0 }} className={`flex items-start gap-2 p-2 rounded-md border ${alert.dismissed ? "opacity-50" : ""}`}>
                <span className={`shrink-0 mt-0.5 ${config.color}`}>{config.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs">{alert.message}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{formatDistanceToNow(new Date(alert.timestamp), { addSuffix: true })}</p>
                </div>
                {!alert.dismissed && <button onClick={() => onDismiss(alert.id)} className="shrink-0 text-muted-foreground hover:text-foreground transition-colors"><X className="w-3 h-3" /></button>}
              </motion.div>
            );
          })}
        </AnimatePresence>
        {alerts.length === 0 && <p className="text-xs text-muted-foreground text-center py-4">No alerts</p>}
      </CardContent>
    </Card>
  );
}
