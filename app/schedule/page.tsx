import Link from "next/link";
import { getConfig } from "@/lib/config";
import { prisma } from "@/lib/db";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CalendarDays, Clock, MapPin, Users } from "lucide-react";

export default async function SchedulePage() {
  const config = getConfig();

  const events = await prisma.calendarEvent.findMany({
    where: {
      isPublic: true,
      date: { gte: new Date() },
    },
    orderBy: { date: "asc" },
  });

  function formatDate(date: Date): string {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  return (
    <div>
      {/* Page Header Banner */}
      <section className="gradient-primary py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Schedule &amp; Calendar
          </h1>
          <p className="mt-4 text-lg text-white/80">
            Stay up to date with upcoming events and sessions at{" "}
            {config.business.name}.
          </p>
        </div>
      </section>

      {events.length > 0 ? (
        <section className="py-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6">
              {events.map((event) => (
                <Card key={event.id}>
                  <CardHeader>
                    <CardTitle className="text-xl">{event.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <CalendarDays className="h-4 w-4" />
                        {formatDate(event.date)}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-4 w-4" />
                        {event.startTime} - {event.endTime}
                      </span>
                      {event.location && (
                        <span className="flex items-center gap-1.5">
                          <MapPin className="h-4 w-4" />
                          {event.location}
                        </span>
                      )}
                      {event.spotsTotal !== null && (
                        <span className="flex items-center gap-1.5">
                          <Users className="h-4 w-4" />
                          {event.spotsTaken > 0
                            ? `${event.spotsTaken}/${event.spotsTotal} spots taken`
                            : `${event.spotsTotal} spots available`}
                        </span>
                      )}
                    </div>
                    {event.description && (
                      <p className="text-muted-foreground">
                        {event.description}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      ) : (
        /* Empty State */
        <section className="py-24">
          <div className="mx-auto max-w-lg px-4 sm:px-6 lg:px-8 text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-muted">
              <CalendarDays className="h-10 w-10 text-muted-foreground" />
            </div>
            <h2 className="mt-6 text-2xl font-semibold">
              No upcoming events scheduled
            </h2>
            <p className="mt-3 text-muted-foreground">
              Check back soon or contact us for more information about our
              upcoming programs and events.
            </p>
            <div className="mt-8">
              <Button asChild variant="outline" size="lg">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
