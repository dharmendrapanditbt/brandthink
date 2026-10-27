import type { Metadata } from "next";
import {
  BarChart3,
  Workflow,
  Users,
  Megaphone,
  Sparkles,
  Palette,
  type LucideIcon,
} from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import CaseStudiesCTA from "@/components/sections/CaseStudiesCTA";
import content from "@/content/techStack.json";

export const metadata: Metadata = {
  title: "Tech Stack",
  description:
    "The tools and platforms BrandThink uses to build growth infrastructure — analytics, automation, creative, and AI tooling.",
  alternates: { canonical: "/tech-stack" },
  openGraph: {
    title: "Tech Stack | BrandThink",
    description:
      "The tools and platforms BrandThink uses to build growth infrastructure — analytics, automation, creative, and AI tooling.",
    url: "/tech-stack",
  },
};

const ICONS: Record<string, LucideIcon> = {
  BarChart3,
  Workflow,
  Users,
  Megaphone,
  Sparkles,
  Palette,
};

export default function TechStack() {
  return (
    <>
      <section className="bg-dark-grey pb-12 pt-40">
        <div className="mx-auto px-6 md:px-12 lg:px-20">
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

          <p className="mb-16 max-w-2xl text-base text-light-grey sm:text-lg">
            {content.description}
          </p>

          <div className="grid gap-px bg-grey-1 sm:grid-cols-2 lg:grid-cols-3">
            {content.categories.map((category, index) => {
              const Icon = ICONS[category.icon] ?? Sparkles;

              return (
                <Reveal
                  key={category.title}
                  delay={index * 0.08}
                  className="scan-hover bg-grey-2 transition-colors duration-300 ease-in-out hover:bg-off-grey"
                >
                  <div className={`h-1 ${category.color}`} />

                  <div className="p-6">
                    <Icon
                      size={28}
                      strokeWidth={1.5}
                      className="mb-4 text-bt-red"
                    />

                    <h3 className="mb-3 text-xl bebas text-white sm:text-2xl">
                      {category.title}
                    </h3>

                    <p className="mb-4 text-sm leading-relaxed text-light-grey">
                      {category.description}
                    </p>

                    <div className="h-px bg-grey-1 mb-4" />

                    <ul className="space-y-2 text-sm text-light-grey">
                      {category.tools.map((tool) => (
                        <li key={tool}>
                          <span className="text-bt-red font-bold">
                            -&nbsp;&nbsp;
                          </span>
                          {tool}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
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
