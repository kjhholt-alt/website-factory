"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus, CalendarDays } from "lucide-react";

export default function AdminCalendarPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Event Calendar</h1>
          <p className="text-muted-foreground mt-1">
            Manage your scheduled events and sessions.
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Event
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center gap-3 py-8">
              <CalendarDays className="h-10 w-10 text-muted-foreground/50" />
              <div className="text-center">
                <p className="font-medium text-muted-foreground">
                  No upcoming events
                </p>
                <p className="text-xs text-muted-foreground/70 mt-1">
                  Click &quot;Add Event&quot; to schedule your first event.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Calendar View</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center gap-3 py-8">
              <div className="grid grid-cols-7 gap-1 w-full max-w-xs">
                {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                  <div
                    key={day}
                    className="text-center text-xs font-medium text-muted-foreground py-1"
                  >
                    {day}
                  </div>
                ))}
                {Array.from({ length: 35 }, (_, i) => (
                  <div
                    key={i}
                    className="text-center text-xs py-1.5 rounded-md text-muted-foreground/50"
                  >
                    {i < 31 ? i + 1 : ""}
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground/70">
                Full calendar integration coming soon.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Past Events</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            No past events to display.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
