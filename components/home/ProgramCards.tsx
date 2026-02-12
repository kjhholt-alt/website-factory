import Link from "next/link";
import { getFeaturedPrograms } from "@/lib/config";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function ProgramCards() {
  const programs = getFeaturedPrograms();

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Our Programs
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Explore our professionally designed training programs for every age
            and skill level.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {programs.map((program) => (
            <Card key={program.id} className="flex flex-col">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <CardTitle>{program.name}</CardTitle>
                  <Badge variant="secondary">Ages {program.ageRange}</Badge>
                </div>
              </CardHeader>
              <CardContent className="flex-1 space-y-4">
                <p className="text-muted-foreground">{program.description}</p>
                <div className="space-y-1 text-sm">
                  <p className="text-muted-foreground">{program.schedule}</p>
                </div>
                <p className="text-2xl font-bold text-primary">
                  ${program.price}
                  <span className="text-sm font-normal text-muted-foreground">
                    /{program.priceUnit}
                  </span>
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href="/programs">Learn More</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-10">
          <Button asChild variant="link" size="lg">
            <Link href="/programs">View All Programs &rarr;</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
