import type { Metadata } from "next";
import Link from "next/link";
import caseStudies from "@/content/caseStudies.json";
import CaseStudiesCTA from "@/components/sections/CaseStudiesCTA";
import CaseStudyVisual from "@/components/sections/CaseStudyVisual";
import Reveal from "@/components/ui/Reveal";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Real growth systems, real outcomes. See how BrandThink helped brands fix rising CAC, weak pipelines, and stalled growth.",
  alternates: { canonical: "/case-studies" },
  openGraph: {
    title: "Case Studies | BrandThink",
    description:
      "Real growth systems, real outcomes. See how BrandThink helped brands fix rising CAC, weak pipelines, and stalled growth.",
    url: "/case-studies",
  },
};

export default function CaseStudiesPage() {
  return (
    <>
      <section className="bg-dark-grey pb-24 pt-40">
        <div className="mx-auto flex flex-col items-center px-6 text-center md:px-12 lg:px-20">
          <p
            data-text="Case Studies — Proof of System"
            className="glitch-hover mb-4 text-sm uppercase tracking-[0.3em] text-bt-red"
          >
            Case Studies — Proof of System
          </p>

          <h1 className="bebas mb-8 text-4xl uppercase text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Outcomes,
            <span className="block text-bt-red">Not Outputs.</span>
          </h1>

          <p className="max-w-2xl text-base text-light-grey sm:text-lg">
            Every engagement starts with a broken system, not a
            content gap. Here's what happens when we fix the system
            instead.
          </p>
        </div>
      </section>

      <section className="bg-dark-grey pb-12">
        <div className="mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {caseStudies.map((study, index) => (
              <Reveal key={study.slug} delay={index * 0.06}>
              <Link
                href={`/case-studies/${study.slug}`}
                className="glow-border scan-hover flex h-full flex-col border border-grey-1 bg-grey-2 transition-colors hover:border-grey-1 hover:bg-off-grey"
              >
                <CaseStudyVisual
                  icon={study.icon}
                  color={study.color}
                  image={study.image}
                  alt={study.title}
                  clientName={study.project.replace(/^Project /, "")}
                />

                <div className="flex flex-1 flex-col p-8">
                  <p
                    className="mb-3 text-xs uppercase tracking-[0.2em]"
                    style={{ color: study.color }}
                  >
                    {study.project} — {study.industry}
                  </p>

                  <h2 className="bebas mb-4 text-2xl uppercase text-white sm:text-3xl">
                    {study.title}
                  </h2>

                  <p className="mb-6 text-sm leading-relaxed text-light-grey">
                    {study.solution}
                  </p>

                  <div className="mt-auto border-t border-grey-1 pt-6">
                    <div className="flex flex-wrap gap-6">
                      {study.stats.map((stat) => (
                        <div key={stat.label}>
                          <div
                            className="bebas text-xl sm:text-2xl"
                            style={{ color: study.color }}
                          >
                            <AnimatedCounter value={stat.value} />
                          </div>

                          <div className="text-[11px] text-light-grey">
                            {stat.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-off-grey py-24">
        <div className="mx-auto px-6 text-center md:px-12 lg:px-20">
          <h2 className="bebas mb-6 text-3xl uppercase text-white sm:text-4xl md:text-5xl">
            Ready To Become
            <span className="block text-bt-red">
              The Next Case Study?
            </span>
          </h2>

          <p className="mx-auto mb-10 max-w-xl text-light-grey">
            No pitches. Just a diagnostic of your current growth
            system and a clear path forward.
          </p>

          <CaseStudiesCTA />
        </div>
      </section>
    </>
  );
}
