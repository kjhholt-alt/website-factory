import Link from "next/link";
import { getConfig } from "@/lib/config";
import { Button } from "@/components/ui/button";
import { CalendarDays } from "lucide-react";

export default function SchedulePage() {
  const config = getConfig();

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

      {/* Empty State */}
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
    </div>
  );
}
