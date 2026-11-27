import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CaseStudiesCTA from "@/components/sections/CaseStudiesCTA";
import ServiceAccordion from "@/components/sections/ServiceAccordion";
import capabilities from "@/content/capabilities.json";
import { serviceSlug } from "@/lib/services";

export function generateStaticParams() {
  return capabilities.items.map((item) => ({ slug: serviceSlug(item.title) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = capabilities.items.find((item) => serviceSlug(item.title) === slug);

  if (!service) {
    return { title: "Service Not Found" };
  }

  const title = service.title;
  const description = service.description;
  const url = `/services/${slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      images: [{ url: service.image }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [service.image],
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = capabilities.items.find((item) => serviceSlug(item.title) === slug);

  if (!service) {
    notFound();
  }

  return (
    <>
      <section className="service-page bg-dark-grey px-6 pt-40 pb-16 md:px-12 lg:px-20">
        <div className="mx-auto max-w-4xl">
          <p className="mb-4 text-xs uppercase tracking-[0.2em] text-bt-red">
            Our Services
          </p>

          <h1 className="bebas mb-6 text-5xl uppercase text-white sm:text-6xl md:text-7xl">
            {service.title}
          </h1>

          <p className="max-w-2xl text-lg leading-relaxed text-light-grey">
            {service.description}
          </p>
        </div>
      </section>

      <section className="bg-dark-grey px-6 pb-24 md:px-12 lg:px-20">
        <div className="mx-auto max-w-4xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={service.image}
            alt={service.title}
            width={1390}
            height={1080}
            className="w-full object-cover"
          />
        </div>
      </section>

      <section className="bg-off-grey px-6 py-24 md:px-12 lg:px-20">
        <div className="mx-auto max-w-4xl">
          <p
            className="glitch-hover mb-4 text-xs uppercase tracking-[0.2em] text-bt-red"
            data-text="What We Do"
          >
            What We Do
          </p>

          <h2 className="bebas mb-6 text-4xl uppercase text-white sm:text-5xl">
            What&apos;s Included
          </h2>

          <ServiceAccordion items={service.subServices} />
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
