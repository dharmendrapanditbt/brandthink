import type { Metadata } from "next";
import CaseStudiesCTA from "@/components/sections/CaseStudiesCTA";
import TeamDice from "@/components/sections/TeamDice";
import aboutContent from "@/content/about-page.json";
import content from "@/content/team.json";

export const metadata: Metadata = {
  title: "About",
  description:
    "BrandThink is a growth infrastructure partner for ambitious brands — meet the team behind the work.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About | BrandThink",
    description:
      "BrandThink is a growth infrastructure partner for ambitious brands — meet the team behind the work.",
    url: "/about",
  },
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-dark-grey pb-16 pt-40">
        <div className="mx-auto flex flex-col items-center border-b border-grey-1 px-6 pb-8 text-center md:px-12 lg:px-20">
          <p
            data-text={aboutContent.eyebrow}
            className="glitch-hover mb-4 text-sm uppercase tracking-[0.3em] text-bt-red"
          >
            {aboutContent.eyebrow}
          </p>

          <h1 className="bebas mb-8 max-w-3xl text-4xl uppercase text-white sm:text-5xl md:text-6xl lg:text-7xl">
            {aboutContent.heading.line1}
            <span className="block text-bt-red">{aboutContent.heading.highlight}</span>
          </h1>

          <p className="max-w-2xl text-base text-light-grey sm:text-lg">
            {aboutContent.description}
          </p>
        </div>
      </section>

      <section className="bg-dark-grey pb-16">
        <div className="mx-auto flex flex-col items-center px-6 text-center md:px-12 lg:px-20">
          <p
            data-text={content.eyebrow}
            className="glitch-hover mb-4 text-sm uppercase tracking-[0.3em] text-bt-red"
          >
            {content.eyebrow}
          </p>

          <h2 className="bebas mb-8 max-w-3xl text-3xl uppercase text-white sm:text-4xl md:text-5xl">
            {content.heading.line1}{" "}
            <span className="text-bt-red">{content.heading.highlight}</span>
          </h2>

          <p className="max-w-2xl text-base text-light-grey sm:text-lg">
            {content.intro}
          </p>
        </div>
      </section>

      <TeamDice members={content.members} />

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
