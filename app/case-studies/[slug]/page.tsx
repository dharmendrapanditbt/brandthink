import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import caseStudies from "@/content/caseStudies.json";
import CaseStudiesCTA from "@/components/sections/CaseStudiesCTA";
import CaseStudyVisual from "@/components/sections/CaseStudyVisual";
import Reveal from "@/components/ui/Reveal";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudies.find((item) => item.slug === slug);

  if (!study) {
    return { title: "Case Study Not Found" };
  }

  const title = `${study.title} — ${study.project}`;
  const description = study.solution;
  const url = `/case-studies/${study.slug}`;
  const image = study.heroImage || "/og-image.jpg";

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | BrandThink`,
      description,
      url,
      images: [{ url: image }],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | BrandThink`,
      description,
      images: [image],
    },
  };
}

export default async function CaseStudyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = caseStudies.find((item) => item.slug === slug);

  if (!study) {
    notFound();
  }

  const otherStudies = caseStudies.filter((item) => item.slug !== slug);

  return (
    <>
      {study.heroImage ? (
        <div className="relative w-full overflow-hidden bg-dark-grey pt-20">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={study.heroImage}
            alt={study.title}
            width={study.heroImageWidth}
            height={study.heroImageHeight}
            fetchPriority="high"
            className="block h-auto w-full grayscale-[45%] contrast-110"
          />

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-b from-transparent to-dark-grey" />
        </div>
      ) : null}

      <section
        className={`bg-dark-grey pb-16 ${study.heroImage ? "pt-16" : "pt-40"}`}
      >
        <div className="mx-auto px-6 md:px-12 lg:px-20">
          <Link
            href="/case-studies"
            className="mb-8 inline-block text-xs uppercase tracking-[0.2em] text-light-grey transition-colors hover:text-white"
          >
            ← All Case Studies
          </Link>

          <p
            className="mb-4 text-sm uppercase tracking-[0.3em]"
            style={{ color: study.color }}
          >
            {study.project} — {study.industry}
          </p>

          <h1 className="bebas mb-8 max-w-3xl text-4xl uppercase text-white sm:text-5xl md:text-6xl">
            {study.title}
          </h1>

          <div className="flex flex-wrap gap-8 border-t border-grey-1 pt-8">
            {study.stats.map((stat, index) => (
              <Reveal key={stat.label} delay={index * 0.1} y={12}>
                <div
                  className="bebas text-3xl sm:text-4xl"
                  style={{ color: study.color }}
                >
                  <AnimatedCounter value={stat.value} />
                </div>

                <div className="text-xs text-light-grey">
                  {stat.label}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {!study.heroImage ? (
        <CaseStudyVisual
          icon={study.icon}
          color={study.color}
          image={study.image}
          alt={study.title}
          clientName={study.project.replace(/^Project /, "")}
        />
      ) : null}

      <section className="bg-dark-grey">
        <div className="mx-auto max-w-3xl px-6 pb-12 pt-16 md:px-12 lg:px-20">
          <Reveal className="mb-12">
            <p className="mb-3 text-xs uppercase tracking-[0.2em] text-light-grey">
              The Challenge
            </p>

            <p className="text-base leading-relaxed text-white sm:text-lg">
              {study.challenge}
            </p>
          </Reveal>

          <Reveal className="mb-12" delay={0.1}>
            <p className="mb-3 text-xs uppercase tracking-[0.2em] text-light-grey">
              Our Approach
            </p>

            <p className="text-base leading-relaxed text-white sm:text-lg">
              {study.solution}
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mb-3 text-xs uppercase tracking-[0.2em] text-light-grey">
              The Result
            </p>

            <p className="text-base leading-relaxed text-white sm:text-lg">
              {study.result}
            </p>
          </Reveal>
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

      <section className="bg-dark-grey py-24">
        <div className="mx-auto px-6 md:px-12 lg:px-20">
          <p
            data-text="More Case Studies"
            className="glitch-hover mb-8 text-xs uppercase tracking-[0.2em] text-bt-red"
          >
            More Case Studies
          </p>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {otherStudies.slice(0, 3).map((other, index) => (
              <Reveal key={other.slug} delay={index * 0.08}>
                <Link
                  href={`/case-studies/${other.slug}`}
                  className="glow-border scan-hover block border border-grey-1 bg-grey-2 p-6 transition-colors hover:bg-off-grey"
                >
                  <p
                    className="mb-2 text-xs uppercase tracking-[0.2em]"
                    style={{ color: other.color }}
                  >
                    {other.industry}
                  </p>

                  <h3 className="bebas text-lg uppercase text-white sm:text-xl">
                    {other.title}
                  </h3>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
