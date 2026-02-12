import Link from "next/link";
import { getConfig } from "@/lib/config";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Trophy, Heart, Users, Smile, User } from "lucide-react";

const valueIcons = [Trophy, Heart, Users, Smile];

export default function AboutPage() {
  const config = getConfig();
  const { business, content } = config;
  const { about } = content;

  return (
    <div>
      {/* Page Header Banner */}
      <section className="gradient-primary py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            About {business.name}
          </h1>
          <p className="mt-4 text-lg text-white/80">
            Get to know our story, our mission, and what drives us every day.
          </p>
        </div>
      </section>

      {/* Coach Bio Section */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Photo Placeholder */}
            <div className="flex justify-center lg:justify-start">
              <div className="flex h-80 w-80 items-center justify-center rounded-2xl bg-muted">
                <User className="h-24 w-24 text-muted-foreground" />
              </div>
            </div>

            {/* Bio Content */}
            <div className="space-y-6">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-primary">
                  Meet Your Coach
                </p>
                <h2 className="mt-2 text-3xl font-bold">{business.owner}</h2>
              </div>
              <p className="text-lg leading-relaxed text-muted-foreground">
                {about.coachBio}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement Section */}
      <section className="bg-muted py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-primary">
            Our Mission
          </h2>
          <p className="mt-6 text-xl leading-relaxed text-foreground lg:text-2xl">
            {about.mission}
          </p>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold">Our Core Values</h2>
            <p className="mt-3 text-muted-foreground">
              The principles that guide everything we do.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {about.values.map((value, index) => {
              const Icon = valueIcons[index % valueIcons.length];
              return (
                <Card key={value.title} className="text-center">
                  <CardHeader>
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                      <Icon className="h-7 w-7 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-muted py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold">Ready to get started?</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Join {business.name} today and see the difference expert coaching
            can make.
          </p>
          <div className="mt-8">
            <Button asChild size="xl">
              <Link href="/register">Register Now</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
