import Link from "next/link";
import { getConfig } from "@/lib/config";
import { Button } from "@/components/ui/button";

export function CallToAction() {
  const config = getConfig();

  return (
    <section className="gradient-primary py-20 md:py-28">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Ready to Join {config.business.name}?
        </h2>
        <p className="text-white/90 max-w-xl mx-auto mb-8 text-lg">
          Give your child the training, confidence, and love of the game they
          deserve. Spots fill up fast — secure your place today.
        </p>
        <Button asChild variant="secondary" size="lg">
          <Link href="/register">Register Today</Link>
        </Button>
      </div>
    </section>
  );
}
