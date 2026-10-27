import type { Metadata } from "next";
import CareersForm from "@/components/sections/CareersForm";
import content from "@/content/careers.json";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join BrandThink. We're hiring strategists, creatives, and growth marketers who want to build systems that turn attention into revenue.",
  alternates: { canonical: "/careers" },
  openGraph: {
    title: "Careers | BrandThink",
    description:
      "Join BrandThink. We're hiring strategists, creatives, and growth marketers who want to build systems that turn attention into revenue.",
    url: "/careers",
  },
};

export default function Careers() {
  return (
    <section className="bg-dark-grey pb-32 pt-40">
      <div className="mx-auto px-6 md:px-12 lg:px-20">
        <p
          data-text={content.eyebrow}
          className="glitch-hover mb-4 text-sm uppercase tracking-[0.3em] text-bt-red"
        >
          {content.eyebrow}
        </p>

        <h1 className="bebas mb-8 text-4xl uppercase text-white sm:text-5xl md:text-6xl lg:text-7xl">
          {content.heading.line1}
          <span className="block text-bt-red">
            {content.heading.highlight}
          </span>
        </h1>

        <p className="mb-16 max-w-2xl text-base text-light-grey sm:text-lg">
          {content.description}
        </p>

        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <CareersForm />
          </div>

          <div className="flex flex-col gap-8">
            <div className="border border-grey-1 bg-grey-2 p-8">
              <p className="mb-6 text-xs uppercase tracking-[0.2em] text-bt-red">
                How We Hire
              </p>

              <div className="space-y-6">
                {content.hiringProcess.map((step) => (
                  <div key={step.number} className="flex gap-4">
                    <div className="bebas shrink-0 text-2xl text-bt-red opacity-40 sm:text-3xl">
                      {step.number}
                    </div>

                    <div>
                      <h3 className="mb-1 text-sm font-semibold text-white">
                        {step.title}
                      </h3>

                      <p className="text-xs leading-relaxed text-light-grey">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-grey-1 bg-grey-2 p-8">
              <p className="mb-4 text-xs uppercase tracking-[0.2em] text-bt-red">
                {content.questionsLabel}
              </p>

              <a
                href={`mailto:${content.questionsEmail}`}
                className="text-light-grey transition-colors hover:text-white"
              >
                → {content.questionsEmail}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
