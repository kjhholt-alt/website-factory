import Link from "next/link";
import { getConfig, getPrograms } from "@/lib/config";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Clock, Users } from "lucide-react";

export default function ProgramsPage() {
  const config = getConfig();
  const programs = getPrograms();

  return (
    <div>
      {/* Page Header Banner */}
      <section className="gradient-primary py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Our Programs
          </h1>
          <p className="mt-4 text-lg text-white/80">
            Find the right fit for your child at {config.business.name}. We
            offer programs for every age and skill level.
          </p>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2">
            {programs.map((program) => (
              <Card
                key={program.id}
                className="relative flex flex-col overflow-hidden"
              >
                {/* Popular badge */}
                {program.featured && (
                  <div className="absolute right-4 top-4">
                    <Badge variant="secondary">Popular</Badge>
                  </div>
                )}

                <CardHeader>
                  <CardTitle>{program.name}</CardTitle>
                  <CardDescription className="text-base">
                    {program.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex-1 space-y-4">
                  {/* Price */}
                  <div>
                    <span className="text-3xl font-bold">${program.price}</span>
                    <span className="ml-1 text-muted-foreground">
                      / {program.priceUnit}
                    </span>
                  </div>

                  {/* Details */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">
                        Ages {program.ageRange}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CalendarDays className="h-4 w-4 shrink-0" />
                      <span>{program.schedule}</span>
                    </div>

                    {program.spotsTotal !== null && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Users className="h-4 w-4 shrink-0" />
                        <span>{program.spotsTotal} spots available</span>
                      </div>
                    )}
                  </div>
                </CardContent>

                <CardFooter>
                  <Button asChild className="w-full" size="lg">
                    <Link href="/register">Register for This Program</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
