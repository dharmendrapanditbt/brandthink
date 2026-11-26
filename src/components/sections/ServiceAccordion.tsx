"use client";

import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";

// Same easing as the Book Call modal, so the motion matches the rest of the site.
const EASE = "ease-[cubic-bezier(0.16,1,0.3,1)]";

type SubService = { title: string; description: string };

/**
 * One-open-at-a-time accordion of a service's sub-services. Collapsed rows are
 * only squeezed to zero height, so every description stays in the HTML for
 * search engines.
 */
export default function ServiceAccordion({ items }: { items: SubService[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const baseId = useId();

  return (
    <div>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const buttonId = `${baseId}-button-${index}`;
        const panelId = `${baseId}-panel-${index}`;

        return (
          <div key={item.title} className="group relative border-b border-grey-1">
            {/* The divider sweeps in from the left on hover and stays while
                the row is open, like the navbar's link underline. */}
            <span
              aria-hidden="true"
              className={`absolute -bottom-px left-0 h-px w-full origin-left bg-bt-red transition-transform duration-700 ${EASE} motion-reduce:transition-none ${
                isOpen ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
              }`}
            />

            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex w-full cursor-pointer items-center justify-between gap-6 py-8 text-left"
              >
                <span
                  className={`text-xl font-semibold text-white transition-transform duration-500 ${EASE} motion-reduce:transition-none sm:text-2xl ${
                    isOpen ? "" : "group-hover:translate-x-2"
                  }`}
                >
                  {item.title}
                </span>
                <ChevronDown
                  size={28}
                  aria-hidden="true"
                  className={`shrink-0 transition-[rotate,color] duration-500 ${EASE} motion-reduce:transition-none ${
                    isOpen ? "rotate-180 text-bt-red" : "text-white"
                  }`}
                />
              </button>
            </h3>

            {/* Animating grid rows 0fr <-> 1fr gives a smooth height
                transition to the content's natural height. */}
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              inert={!isOpen}
              className={`grid transition-[grid-template-rows,opacity] duration-500 ${EASE} motion-reduce:transition-none ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p
                  className={`max-w-3xl pb-10 text-base leading-relaxed text-light-grey transition-transform duration-500 ${EASE} motion-reduce:transition-none sm:text-lg ${
                    isOpen ? "translate-y-0" : "-translate-y-3"
                  }`}
                >
                  {item.description}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
