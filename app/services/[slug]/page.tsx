import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import capabilities from "@/content/capabilities.json";

export function generateStaticParams() {
  return capabilities.items.map((item) => ({ slug: item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = capabilities.items.find((item) => item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') === slug);

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
  const service = capabilities.items.find((item) => item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') === slug);

  if (!service) {
    notFound();
  }

  return (
    <>
      <section className="bg-dark-grey px-6 pt-40 pb-16 md:px-12 lg:px-20">
        <div className="mx-auto max-w-4xl">
          <p
            className="glitch-hover mb-4 text-xs uppercase tracking-[0.2em]"
            data-text="Our Services"
            style={{ color: service.accent }}
          >
            Our Services
          </p>

          <h1 className="bebas mb-6 text-5xl uppercase text-white sm:text-6xl md:text-7xl">
            {service.title}
          </h1>

          <p className="mb-12 max-w-2xl text-lg leading-relaxed text-light-grey">
            {service.description}
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            {service.items.map((item: string) => (
              <div
                key={item}
                className="flex items-center gap-3 border border-grey-1 bg-off-grey px-5 py-4 text-sm text-white"
              >
                <span
                  className="h-2 w-2 shrink-0 rounded-full"
                  style={{ background: service.accent }}
                />
                {item}
              </div>
            ))}
          </div>
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
            className="mb-12 w-full object-cover"
          />

          <div className="flex flex-wrap gap-4">
            <Link
              href="/services"
              className="border border-grey-1 px-6 py-3 text-sm text-white transition-colors hover:bg-off-grey"
            >
              ← All Services
            </Link>
            <Link
              href="/contact"
              className="bg-bt-red px-6 py-3 text-sm text-white"
            >
              Work With Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
