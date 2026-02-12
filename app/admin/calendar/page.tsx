"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getPrograms, type Program } from "@/lib/config";
import {
  Plus,
  CalendarDays,
  MapPin,
  Clock,
  Users,
  Trash2,
  ChevronDown,
  ChevronUp,
  Loader2,
  X,
} from "lucide-react";

interface CalendarEvent {
  id: string;
  title: string;
  description: string | null;
  date: string;
  startTime: string;
  endTime: string;
  location: string | null;
  programId: string | null;
  spotsTotal: number | null;
  spotsTaken: number;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
}

const programs: Program[] = getPrograms();

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatTimeRange(start: string, end: string): string {
  return `${start} - ${end}`;
}

function getProgramName(programId: string | null): string | null {
  if (!programId) return null;
  const program = programs.find((p) => p.id === programId);
  return program ? program.name : null;
}

export default function AdminCalendarPage() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [showPastEvents, setShowPastEvents] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [location, setLocation] = useState("");
  const [programId, setProgramId] = useState("");
  const [spotsTotal, setSpotsTotal] = useState("");
  const [isPublic, setIsPublic] = useState(true);

  async function fetchEvents() {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("/api/admin/events");
      if (!res.ok) throw new Error("Failed to fetch events");
      const data = await res.json();
      setEvents(data.events);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch events");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchEvents();
  }, []);

  function resetForm() {
    setTitle("");
    setDescription("");
    setDate("");
    setStartTime("");
    setEndTime("");
    setLocation("");
    setProgramId("");
    setSpotsTotal("");
    setIsPublic(true);
    setFormError(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setFormError(null);

    try {
      const body: Record<string, unknown> = {
        title,
        date,
        startTime,
        endTime,
        isPublic,
      };
      if (description) body.description = description;
      if (location) body.location = location;
      if (programId && programId !== "none") body.programId = programId;
      if (spotsTotal) body.spotsTotal = parseInt(spotsTotal, 10);

      const res = await fetch("/api/admin/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to create event");
      }

      resetForm();
      setShowForm(false);
      await fetchEvents();
    } catch (err) {
      setFormError(
        err instanceof Error ? err.message : "Failed to create event"
      );
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this event?")) return;

    setDeletingId(id);
    try {
      const res = await fetch("/api/admin/events", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to delete event");
      }

      await fetchEvents();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to delete event"
      );
    } finally {
      setDeletingId(null);
    }
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingEvents = events.filter(
    (event) => new Date(event.date) >= today
  );
  const pastEvents = events.filter((event) => new Date(event.date) < today);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Event Calendar</h1>
          <p className="text-muted-foreground mt-1">
            Manage your scheduled events and sessions.
          </p>
        </div>
        <Button
          className="gap-2"
          onClick={() => {
            setShowForm(!showForm);
            if (showForm) resetForm();
          }}
        >
          {showForm ? (
            <>
              <X className="h-4 w-4" />
              Cancel
            </>
          ) : (
            <>
              <Plus className="h-4 w-4" />
              Add Event
            </>
          )}
        </Button>
      </div>

      {/* Add Event Form */}
      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">New Event</CardTitle>
            <CardDescription>
              Fill in the details to create a new event.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    placeholder="Event title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder="Event location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="date">Date *</Label>
                  <Input
                    id="date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="startTime">Start Time *</Label>
                  <Input
                    id="startTime"
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endTime">End Time *</Label>
                  <Input
                    id="endTime"
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe this event..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="program">Program</Label>
                  <Select value={programId} onValueChange={setProgramId}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select program" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No program</SelectItem>
                      {programs.map((program) => (
                        <SelectItem key={program.id} value={program.id}>
                          {program.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="spotsTotal">Total Spots</Label>
                  <Input
                    id="spotsTotal"
                    type="number"
                    placeholder="Unlimited"
                    min={1}
                    value={spotsTotal}
                    onChange={(e) => setSpotsTotal(e.target.value)}
                  />
                </div>
                <div className="flex items-end space-x-2 pb-1">
                  <input
                    type="checkbox"
                    id="isPublic"
                    checked={isPublic}
                    onChange={(e) => setIsPublic(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300"
                  />
                  <Label htmlFor="isPublic" className="cursor-pointer">
                    Public event
                  </Label>
                </div>
              </div>

              {formError && (
                <p className="text-sm text-red-500">{formError}</p>
              )}

              <div className="flex gap-2">
                <Button type="submit" disabled={submitting}>
                  {submitting && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Create Event
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowForm(false);
                    resetForm();
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Error State */}
      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <p className="text-sm text-red-600">{error}</p>
            <Button
              variant="outline"
              size="sm"
              className="mt-2"
              onClick={fetchEvents}
            >
              Retry
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Loading State */}
      {loading && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-center gap-2 py-8">
              <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Loading events...</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Upcoming Events */}
      {!loading && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold tracking-tight">
            Upcoming Events
            {upcomingEvents.length > 0 && (
              <span className="ml-2 text-sm font-normal text-muted-foreground">
                ({upcomingEvents.length})
              </span>
            )}
          </h2>

          {upcomingEvents.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
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
          ) : (
            <div className="grid gap-4">
              {upcomingEvents.map((event) => {
                const programName = getProgramName(event.programId);
                return (
                  <Card key={event.id}>
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="font-semibold text-lg">
                              {event.title}
                            </h3>
                            <Badge
                              variant={event.isPublic ? "default" : "secondary"}
                            >
                              {event.isPublic ? "Public" : "Private"}
                            </Badge>
                            {programName && (
                              <Badge variant="outline">{programName}</Badge>
                            )}
                          </div>

                          {event.description && (
                            <p className="text-sm text-muted-foreground">
                              {event.description}
                            </p>
                          )}

                          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <CalendarDays className="h-4 w-4" />
                              {formatDate(event.date)}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {formatTimeRange(event.startTime, event.endTime)}
                            </span>
                            {event.location && (
                              <span className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                {event.location}
                              </span>
                            )}
                            {event.spotsTotal !== null && (
                              <span className="flex items-center gap-1">
                                <Users className="h-4 w-4" />
                                {event.spotsTaken}/{event.spotsTotal} spots taken
                              </span>
                            )}
                          </div>
                        </div>

                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 shrink-0"
                          onClick={() => handleDelete(event.id)}
                          disabled={deletingId === event.id}
                        >
                          {deletingId === event.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Trash2 className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Past Events */}
      {!loading && pastEvents.length > 0 && (
        <div className="space-y-4">
          <Separator />
          <button
            onClick={() => setShowPastEvents(!showPastEvents)}
            className="flex items-center gap-2 text-xl font-semibold tracking-tight hover:text-muted-foreground transition-colors"
          >
            Past Events
            <span className="text-sm font-normal text-muted-foreground">
              ({pastEvents.length})
            </span>
            {showPastEvents ? (
              <ChevronUp className="h-5 w-5" />
            ) : (
              <ChevronDown className="h-5 w-5" />
            )}
          </button>

          {showPastEvents && (
            <div className="grid gap-3">
              {pastEvents.map((event) => {
                const programName = getProgramName(event.programId);
                return (
                  <Card key={event.id} className="opacity-70">
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="font-medium">{event.title}</h3>
                            <Badge
                              variant={event.isPublic ? "default" : "secondary"}
                            >
                              {event.isPublic ? "Public" : "Private"}
                            </Badge>
                            {programName && (
                              <Badge variant="outline">{programName}</Badge>
                            )}
                          </div>
                          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <CalendarDays className="h-3.5 w-3.5" />
                              {formatDate(event.date)}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3.5 w-3.5" />
                              {formatTimeRange(event.startTime, event.endTime)}
                            </span>
                            {event.location && (
                              <span className="flex items-center gap-1">
                                <MapPin className="h-3.5 w-3.5" />
                                {event.location}
                              </span>
                            )}
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 shrink-0"
                          onClick={() => handleDelete(event.id)}
                          disabled={deletingId === event.id}
                        >
                          {deletingId === event.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Trash2 className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
