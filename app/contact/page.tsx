import type { Metadata } from "next";
import ContactForm from "@/components/sections/ContactForm";
import siteInfo from "@/content/siteInfo.json";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with BrandThink. Tell us about your growth goals and we'll get back to you with a clear path forward.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Us | BrandThink",
    description:
      "Get in touch with BrandThink. Tell us about your growth goals and we'll get back to you with a clear path forward.",
    url: "/contact",
  },
};

const { contactDetails } = siteInfo;

const nextSteps = [
  {
    number: "01",
    title: "We review your inquiry",
    description: "Our team looks at your goals and current growth setup.",
  },
  {
    number: "02",
    title: "We schedule a call",
    description: "A short, no-pitch conversation to map the opportunity.",
  },
  {
    number: "03",
    title: "We build your system",
    description: "A clear proposal and roadmap for your growth engine.",
  },
];

export default function Contact() {
  return (
    <section className="bg-dark-grey pb-32 pt-40">
      <div className="mx-auto px-6 md:px-12 lg:px-20">
        <p className="mb-4 text-sm uppercase tracking-[0.3em] text-bt-red">
          Get In Touch
        </p>

        <h1 className="bebas mb-8 text-4xl uppercase text-white sm:text-5xl md:text-6xl lg:text-7xl">
          Let's Build Your
          <span className="block text-bt-red">
            Growth Engine.
          </span>
        </h1>

        <p className="mb-16 max-w-2xl text-base text-light-grey sm:text-lg">
          Tell us about your brand and where you're stuck. No pitches —
          just a straight conversation about what a real growth system
          would look like for you.
        </p>

        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ContactForm />
          </div>

          <div className="flex flex-col gap-8">
            <div className="border border-grey-1 bg-grey-2 p-8">
              <p className="mb-4 text-xs uppercase tracking-[0.2em] text-bt-red">
                Contact Details
              </p>

              <ul className="space-y-2">
                {contactDetails.map((item) =>
                  item.href ? (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        className="text-light-grey transition-colors hover:text-white"
                      >
                        → {item.label}
                      </a>
                    </li>
                  ) : (
                    <li key={item.label} className="text-light-grey">
                      → {item.label}
                    </li>
                  )
                )}
              </ul>
            </div>

            <div className="border border-grey-1 bg-grey-2 p-8">
              <p className="mb-6 text-xs uppercase tracking-[0.2em] text-bt-red">
                What Happens Next
              </p>

              <div className="space-y-6">
                {nextSteps.map((step) => (
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
          </div>
        </div>
      </div>
    </section>
  );
}
