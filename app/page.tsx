import { Hero } from "@/components/home/Hero";
import { StatsBar } from "@/components/home/StatsBar";
import { ProgramCards } from "@/components/home/ProgramCards";
import { Testimonials } from "@/components/home/Testimonials";
import { CallToAction } from "@/components/home/CallToAction";

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsBar />
      <ProgramCards />
      <Testimonials />
      <CallToAction />
    </>
  );
}
