import { ChevronDown } from "lucide-react";
import faqContent from "@/content/faq.json";

export default function FAQ() {

  // Structured Data Schema for Search Engines (AEO / FAQ rich snippets)
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqContent.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: `${item.answer} ${item.detail}`,
      },
    })),
  };

  return (
    <section id="faq" className="relative bg-dark-grey py-24 md:py-32 border-t border-grey-1">
      {/* FAQ Schema for Crawlers */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <div className="mx-auto px-6 md:px-12 lg:px-20 max-w-6xl">
        {/* Eyebrow */}
        <p
          data-text={faqContent.eyebrow}
          className="glitch-hover mb-4 text-xs uppercase tracking-[0.3em] text-bt-red"
        >
          {faqContent.eyebrow}
        </p>

        {/* Section Heading */}
        <h2 className="bebas mb-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl uppercase text-white font-bold leading-[0.95]">
          {faqContent.heading.line1}{" "}
          <span className="text-bt-red">{faqContent.heading.highlight}</span>
        </h2>

        <p className="mb-14 max-w-2xl text-base text-light-grey sm:text-lg">
          {faqContent.subtitle}
        </p>

        {/* Questions & Answers List */}
        <div className="divide-y divide-grey-1 border-y border-grey-1">
          {faqContent.items.map((item, index) => {
            return (
              <details
                key={item.question}
                open={index === 0}
                className="group py-6 md:py-8 transition-colors"
              >
                <summary className="flex w-full items-start justify-between text-left gap-4 list-none cursor-pointer focus:outline-none">
                  <h3 className="text-lg sm:text-xl font-medium text-white transition-colors group-hover:text-bt-red pr-4">
                    {item.question}
                  </h3>
                  <span className="shrink-0 mt-1 flex h-7 w-7 items-center justify-center rounded-full border border-grey-1 bg-grey-2 text-light-grey transition-transform duration-300 group-open:rotate-180 group-open:border-bt-red group-open:text-bt-red group-hover:border-bt-red">
                    <ChevronDown size={16} />
                  </span>
                </summary>

                {/* Answer content (immediately indexable by crawlers) */}
                <div className="mt-4 pt-2">
                  <p className="text-base text-white/90 font-medium leading-relaxed mb-2">
                    {item.answer}
                  </p>
                  <p className="text-sm text-light-grey leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              </details>
            );
          })}
        </div>
      </div>
    </section>
  );
}
