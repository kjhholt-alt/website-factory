import { Users, Clock, Star } from "lucide-react";
import { getConfig } from "@/lib/config";

export function StatsBar() {
  const config = getConfig();
  const { kidsTrained, yearsExperience, rating } = config.content.stats;

  const stats = [
    {
      icon: Users,
      value: kidsTrained,
      label: "Kids Trained",
    },
    {
      icon: Clock,
      value: yearsExperience,
      label: "Years Experience",
    },
    {
      icon: Star,
      value: rating,
      label: "Parent Rating",
    },
  ];

  return (
    <section className="bg-muted py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center text-center"
            >
              <stat.icon className="h-8 w-8 text-primary mb-3" />
              <span className="text-3xl md:text-4xl font-bold text-primary">
                {stat.value}
              </span>
              <span className="text-sm text-muted-foreground mt-1">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
