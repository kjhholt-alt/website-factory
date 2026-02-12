import { getConfig } from "@/lib/config";
import { Card, CardContent } from "@/components/ui/card";

export function Testimonials() {
  const config = getConfig();
  const testimonials = config.content.testimonials;

  return (
    <section className="bg-muted py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            What Parents Say
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Hear from the families who have made us part of their journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <span className="block text-6xl text-primary/20 font-serif leading-none mb-2">
                  &ldquo;
                </span>
                <p className="italic text-foreground/80 mb-4">
                  {testimonial.quote}
                </p>
                <div>
                  <p className="font-bold text-foreground">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.detail}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
