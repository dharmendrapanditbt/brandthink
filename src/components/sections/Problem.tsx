"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Copy,
  TrendingDown,
  TrendingUp,
  Network,
  Unplug,
  type LucideIcon,
} from "lucide-react";
import DecryptText from "@/components/ui/DecryptText";
import HoverFlipText from "@/components/ui/HoverFlipText";
import content from "@/content/problem.json";

gsap.registerPlugin(ScrollTrigger);

const ICONS: LucideIcon[] = [Copy, TrendingDown, TrendingUp, Network, Unplug];

// Each card's fully-scattered offset/rotation — how far it drifts once the
// section's center is outside the dead zone around the viewport's center.
const SCATTER_TO = [
  { x: -520, y: -260, rotation: -110 },
  { x: 540, y: 220, rotation: 95 },
  { x: -460, y: 320, rotation: 130 },
  { x: 480, y: -300, rotation: -140 },
  { x: 0, y: 460, rotation: 160 },
];

// Cards sit fully in place while the section's center is within this many
// pixels of the viewport's center, then scatter out over the next
// SCATTER_FALLOFF_PX as it drifts further away in either direction.
const DEAD_ZONE_PX = 200;
const SCATTER_FALLOFF_PX = 420;

export default function Problem() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const cards = cardRefs.current.filter((c): c is HTMLDivElement => !!c);
    if (!section || cards.length === 0) return;

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !window.matchMedia("(min-width: 1024px)").matches
    ) {
      gsap.set(cards, { clearProps: "all" });
      gsap.set(panelRefs.current.filter(Boolean), { clearProps: "all" });
      return;
    }

    const ctx = gsap.context(() => {
      function applyScatterForCurrentScroll() {
        const rect = section!.getBoundingClientRect();
        const sectionCenter = rect.top + rect.height / 2;
        const viewportCenter = window.innerHeight / 2;
        const distance = Math.abs(sectionCenter - viewportCenter);

        const scatter = gsap.utils.clamp(
          0,
          1,
          (distance - DEAD_ZONE_PX) / SCATTER_FALLOFF_PX
        );
        const settle = 1 - scatter;

        cards.forEach((card, i) => {
          const to = SCATTER_TO[i % SCATTER_TO.length];
          const panel = panelRefs.current[i];

          gsap.set(card, {
            x: to.x * scatter,
            y: to.y * scatter,
            rotation: to.rotation * scatter,
            scale: gsap.utils.interpolate(0.2, 1, settle),
            opacity: settle,
          });

          if (panel) gsap.set(panel, { opacity: settle });
        });
      }

      const trigger = ScrollTrigger.create({
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        onUpdate: applyScatterForCurrentScroll,
      });

      trigger.refresh();
      applyScatterForCurrentScroll();
    }, section);

    return () => ctx.revert();
  }, []);

  function handleCardEnter(index: number) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const card = cardRefs.current[index];
    if (!card) return;

    gsap
      .timeline()
      .to(card, { x: "-=5", duration: 0.045 })
      .to(card, { x: "+=10", duration: 0.045 })
      .to(card, { x: "-=8", rotation: "-=1", duration: 0.045 })
      .to(card, { x: "+=6", rotation: "+=2", duration: 0.045 })
      .to(card, { x: "-=3", rotation: "-=1", duration: 0.05 });
  }

  return (
    <section ref={sectionRef} className="overflow-hidden bg-dark-grey py-32">
      <div className="mx-auto px-6 md:px-12 lg:px-20">
        <div className="mb-16 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p
              data-text={content.eyebrow}
              className="glitch-hover mb-4 text-sm uppercase tracking-[0.3em] text-bt-red"
            >
              {content.eyebrow}
            </p>

            <h2 className="bebas text-4xl font-bold uppercase text-white sm:text-5xl md:text-6xl lg:text-7xl">
              {content.heading.line1}
              <DecryptText
                text={content.heading.highlight}
                className="block text-bt-red"
              />
            </h2>
          </div>

          <div className="shrink-0">
            <Link
              href="/services"
              className="btn-brand inline-block bg-bt-red text-white"
            >
              <HoverFlipText text="Go to Our Services" />
            </Link>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {content.items.map((item, index) => {
            const Icon = ICONS[index % ICONS.length];

            return (
              <div
                key={item.number}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                onMouseEnter={() => handleCardEnter(index)}
                className="scan-hover relative aspect-[3/4] overflow-hidden border-y-3 border-bt-red bg-black"
              >
                <div
                  ref={(el) => {
                    panelRefs.current[index] = el;
                  }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  {item.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.image}
                      alt={item.title}
                      width={360}
                      height={450}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  ) : (
                    <>
                      <div className="scanlines" aria-hidden="true" />
                      <Icon
                        size={96}
                        strokeWidth={1}
                        className="absolute text-bt-red/20"
                      />
                    </>
                  )}
                </div>

                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent"
                />

                <div className="relative z-10 flex h-full flex-col justify-end p-6">
                  <div className="bebas mb-2 text-4xl text-white/70 sm:text-5xl">
                    {item.number}
                  </div>

                  <h3 className="text-lg font-semibold text-white">
                    {item.title}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
