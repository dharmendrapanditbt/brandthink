"use client";

import { useLayoutEffect, useRef } from "react";
import {
  Palette,
  Megaphone,
  Microscope,
  Camera,
  Cpu,
  type LucideIcon,
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "@/components/ui/Reveal";
import content from "@/content/capabilities.json";

gsap.registerPlugin(ScrollTrigger);

const ICONS: Record<string, LucideIcon> = {
  Palette,
  Megaphone,
  Microscope,
  Camera,
  Cpu,
};

export default function ServicesShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const flipperRef = useRef<HTMLDivElement>(null);
  const faceARef = useRef<HTMLImageElement>(null);
  const faceBRef = useRef<HTMLImageElement>(null);

  // Keep each text row's min-height in sync with the sticky image card's
  // rendered height so the two columns line up.
  useLayoutEffect(() => {
    const section = sectionRef.current;
    const imageWrapper = imageWrapperRef.current;
    if (!section || !imageWrapper) return;

    const updateHeight = () => {
      section.style.setProperty("--card-h", `${imageWrapper.offsetHeight}px`);
    };

    updateHeight();
    const ro = new ResizeObserver(updateHeight);
    ro.observe(imageWrapper);
    return () => ro.disconnect();
  }, []);

  useLayoutEffect(() => {
    const flipper = flipperRef.current;
    const faceA = faceARef.current;
    const faceB = faceBRef.current;
    if (!flipper || !faceA || !faceB) return;

    faceA.src = content.items[0].image;
    faceB.src = content.items[1]?.image ?? content.items[0].image;

    // Mobile skips the flip-card entirely (each row shows its own plain
    // image header instead), so the scroll-driven flip only ever runs on
    // desktop.
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !isDesktop) {
      return;
    }

    const ctx = gsap.context(() => {
      rowRefs.current.forEach((row, index) => {
        if (!row || index === 0) return;

        const flipTo = (rotation: number, imageIndex: number) => {
          const revealingFace = rotation % 360 === 180 ? faceB : faceA;
          revealingFace.src = content.items[imageIndex].image;

          gsap.fromTo(
            flipper,
            { rotateY: gsap.getProperty(flipper, "rotateY") as number },
            { rotateY: rotation, duration: 1, ease: "power2.inOut" }
          );
        };

        ScrollTrigger.create({
          trigger: row,
          start: "top 70%",
          onEnter: () => flipTo(index * 180, index),
          onLeaveBack: () => flipTo((index - 1) * 180, index - 1),
        });
      });
    }, sectionRef.current!);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="mx-auto mt-16 grid w-full gap-12 px-6 md:px-12 lg:grid-cols-2 lg:gap-16 lg:px-20"
    >
      <div className="hidden lg:sticky lg:top-35 lg:block lg:h-fit">
        <div
          ref={imageWrapperRef}
          className="relative aspect-[4/3] w-full"
          style={{ perspective: "1600px" }}
        >
          <div
            ref={flipperRef}
            className="absolute inset-0"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={faceARef}
              alt=""
              width={1390}
              height={1080}
              className="absolute inset-0 h-full w-full  object-cover"
              style={{ backfaceVisibility: "hidden" }}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={faceBRef}
              alt=""
              width={1390}
              height={1080}
              className="absolute inset-0 h-full w-full  object-cover"
              style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
            />
          </div>
        </div>
      </div>

      <div>
        {content.items.map((item, index) => {
          const Icon = ICONS[item.icon] ?? Palette;

          return (
            <div
              key={item.title}
              ref={(el) => {
                rowRefs.current[index] = el;
              }}
              className="border-t border-grey-1 py-16 first:border-t-0 first:pt-0 lg:flex lg:min-h-[var(--card-h)] lg:flex-col lg:justify-center"
            >
              {/* Mobile: each row gets its own plain image header instead
                  of sharing the desktop flip-card. */}
              <div className="mb-6 aspect-[4/3] w-full overflow-hidden lg:hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt=""
                  width={1390}
                  height={1080}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>

              <Reveal>
                <div className="mb-4 flex items-center gap-4">
                  <Icon
                    size={32}
                    strokeWidth={1.5}
                    style={{ color: item.accent }}
                  />
                  <span className="bebas text-sm text-grey-1">
                    0{index + 1}
                  </span>
                </div>

                <h2 className="bebas mb-4 text-3xl uppercase text-white sm:text-4xl">
                  {item.title}
                </h2>

                <p className="mb-6 leading-relaxed text-light-grey">
                  {item.description}
                </p>

                <div className="grid gap-3 sm:grid-cols-2">
                  {item.items.map((service) => (
                    <div
                      key={service}
                      className="flex items-center gap-3 border border-grey-1 bg-off-grey px-4 py-2.5 text-sm text-white"
                    >
                      <span
                        className="h-1.5 w-1.5 shrink-0 rounded-full"
                        style={{ background: item.accent }}
                      />
                      {service}
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          );
        })}
      </div>
    </div>
  );
}
