import Link from "next/link";
import { getConfig } from "@/lib/config";
import { Button } from "@/components/ui/button";

export function Hero() {
  const config = getConfig();

  return (
    <section className="gradient-hero py-24 md:py-32">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
          {config.content.heroHeadline}
        </h1>
        <p className="text-lg md:text-xl text-white/90 font-light max-w-2xl mx-auto mb-10">
          {config.content.heroSubheadline}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild variant="secondary" size="lg">
            <Link href="/register">Register Now</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-white text-white hover:bg-white/10 hover:text-white"
          >
            <Link href="/programs">View Programs</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
