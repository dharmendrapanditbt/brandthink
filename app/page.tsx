import type { Metadata } from "next";
import HeroSection from "@/components/sections/HeroSection";
import Problem from "@/components/sections/Problem";
import Technology from "@/components/sections/Technology";
import Methodology from "@/components/sections/Methodology";
import CaseStudies from "@/components/sections/CaseStudies";
import CTA from "@/components/sections/CTA";
import Clients from "@/src/components/sections/Clients";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <main>
      <HeroSection />
      <Clients />
      {/* <ShowReel /> */}
      <Problem />
      <CaseStudies />
      <Technology />
      <Methodology />
      {/* <AboutTimeline /> */}
      <CTA />
    </main>
  );
}