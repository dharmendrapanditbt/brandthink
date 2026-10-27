import type { Metadata } from "next";
import Link from "next/link";
import CaseStudiesCTA from "@/components/sections/CaseStudiesCTA";
import ServicesShowcase from "@/components/sections/ServicesShowcase";
import SplashCursor from "@/components/ui/LazySplashCursor";
import HoverFlipText from "@/components/ui/HoverFlipText";
import content from "@/content/capabilities.json";

export const metadata: Metadata = {
  title: "Services",
  description:
    "MarTech, Brand, Media, Research, and Production — the five connected capabilities BrandThink uses to build growth infrastructure.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Services | BrandThink",
    description:
      "MarTech, Brand, Media, Research, and Production — the five connected capabilities BrandThink uses to build growth infrastructure.",
    url: "/services",
  },
};

export default function ServicesPage() {
  return (
    <>
      <SplashCursor />

      <section className="bg-dark-grey pb-12 pt-40">
        <div className="mx-auto flex flex-col gap-8 px-6 md:px-12 lg:flex-row lg:items-end lg:justify-between lg:px-20">
          <div>
            <p
              data-text={content.eyebrow}
              className="glitch-hover mb-4 text-sm uppercase tracking-[0.3em] text-bt-red"
            >
              {content.eyebrow}
            </p>

            <h1 className="bebas mb-8 max-w-3xl text-4xl uppercase text-white sm:text-5xl md:text-6xl lg:text-7xl">
              {content.heading.line1}
              <span className="block text-bt-red">
                {content.heading.highlight}
              </span>
            </h1>

            <p className="max-w-2xl text-base text-light-grey sm:text-lg">
              {content.intro}
            </p>
          </div>

          <div className="shrink-0">
            <Link
              href="/case-studies"
              className="btn-brand bg-bt-red text-white"
            >
              <HoverFlipText text="View Case Studies" />
            </Link>
          </div>
        </div>

        <ServicesShowcase />
      </section>

      <section className="bg-off-grey py-24">
        <div className="mx-auto px-6 text-center md:px-12 lg:px-20">
          <h2 className="bebas mb-6 text-3xl uppercase text-white sm:text-4xl md:text-5xl">
            {content.cta.heading.line1}
            <span className="block text-bt-red">
              {content.cta.heading.highlight}
            </span>
          </h2>

          <p className="mx-auto mb-10 max-w-xl text-light-grey">
            {content.cta.paragraph}
          </p>

          <CaseStudiesCTA />
        </div>
      </section>
    </>
  );
}
