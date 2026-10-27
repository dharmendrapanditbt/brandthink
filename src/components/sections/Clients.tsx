"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import content from "@/content/clients.json";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

type Logo = {
  name: string;
  slug?: string;
  color: string;
  /** Optional path to a real logo image, e.g. "/clients/loom.png". Falls back to a text wordmark when unset. */
  logo?: string;
  width?: number;
  height?: number;
};

function LogoTile({ logo }: { logo: Logo }) {
  const inner = logo.logo ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={logo.logo}
      alt={logo.name}
      width={logo.width}
      height={logo.height}
      className="h-8 w-auto max-w-[140px] shrink-0 object-contain grayscale transition-all group-hover:grayscale-0 sm:h-10"
    />
  ) : (
    <>
      <span
        className="h-2 w-2 shrink-0 rounded-full transition-transform group-hover:scale-125"
        style={{ background: logo.color }}
      />
      <span className="bebas text-2xl uppercase tracking-[0.05em] text-light-grey transition-colors group-hover:text-white sm:text-3xl">
        {logo.name}
      </span>
    </>
  );

  const className =
    "group flex shrink-0 items-center gap-3 border border-grey-1 bg-grey-2 px-6 py-5 transition-colors hover:border-bt-red hover:bg-off-grey sm:px-8 sm:py-6";

  if ("slug" in logo && logo.slug) {
    return (
      <Link href={`/case-studies/${logo.slug}`} className={className}>
        {inner}
      </Link>
    );
  }

  return <div className={className}>{inner}</div>;
}

// Drives each row's horizontal shift off its own measured overflow (track
// width minus the visible container width) instead of a fixed pixel range,
// so the full row actually scrolls into view regardless of screen size —
// a fixed range like "-220px" might reveal everything on a wide desktop
// viewport but leave most logos permanently off-screen on a narrow phone.
function ParallaxRow({
  logos,
  progress,
  reverse = false,
}: {
  logos: Logo[];
  progress: MotionValue<number>;
  reverse?: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    function measure() {
      const container = containerRef.current;
      const track = trackRef.current;
      if (!container || !track) return;
      setDistance(Math.max(0, track.scrollWidth - container.clientWidth));
    }

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const x = useTransform(
    progress,
    [0, 1],
    reverse ? [-distance, 0] : [0, -distance]
  );

  return (
    <div ref={containerRef} className="overflow-hidden">
      <motion.div
        ref={trackRef}
        style={{ x }}
        className="flex w-max items-center justify-center gap-4"
      >
        {[...logos, ...logos, ...logos, ...logos].map((logo, index) => (
          <LogoTile key={`${logo.name}-${index}`} logo={logo} />
        ))}
      </motion.div>
    </div>
  );
}

export default function Clients() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const third = Math.ceil(content.logos.length / 3);
  const rows = [
    content.logos.slice(0, third),
    content.logos.slice(third, third * 2),
    content.logos.slice(third * 2),
  ];
  const reverseRow = [false, true, false];

  return (
    <section
      ref={sectionRef}
      className="overflow-hidden border-t border-grey-1 bg-off-grey py-24 md:py-36"
    >
      <div className="mx-auto px-6 md:px-12 lg:px-20">
        <p className="mb-4 text-center text-xs uppercase tracking-[0.3em] text-bt-red">
          {content.eyebrow}
        </p>

        <h2>
          <span className="flex w-full flex-col items-center justify-center mx-auto text-center gap-1 sm:gap-2 sm:flex-row">
            <span className="bebas text-4xl sm:text-5xl md:text-6xl lg:text-7xl uppercase text-white font-bold">
              {content.heading.line1}
            </span>{" "}
            <span
              className="bebas text-4xl sm:text-5xl md:text-6xl lg:text-7xl uppercase text-bt-red font-bold"
            >
              {content.heading.highlight1}
            </span>
          </span>{" "}
          <span className="flex w-full flex-col items-center justify-center mx-auto text-center gap-1 mb-8 sm:flex-row sm:gap-2">
            <span className="bebas text-4xl sm:text-5xl md:text-6xl lg:text-7xl uppercase text-white font-bold">
              {content.heading.line2}
            </span>{" "}
            <span
              className="bebas text-4xl sm:text-5xl md:text-6xl lg:text-7xl uppercase text-bt-red font-bold"
            >
              {content.heading.highlight2}
            </span>
          </span>
        </h2>
        <div className="flex w-full items-center justify-center mx-auto px-4 text-center gap-4 mb-8">
          <p className="text-sm text-light-grey">
            {content.description}
          </p>
        </div>

        {/* <div className="mx-auto mb-16 grid max-w-2xl grid-cols-3 gap-6 border-y border-grey-1 py-8 text-center">
          {content.stats.map((stat) => (
            <div key={stat.label}>
              <div className="bebas text-4xl text-white sm:text-5xl">
                <AnimatedCounter value={stat.value} />
              </div>
              <div className="mt-1 text-xs uppercase tracking-[0.15em] text-light-grey">
                {stat.label}
              </div>
            </div>
          ))}
        </div> */}
      </div>

      <div className="flex flex-col gap-4 md:gap-5">
        {rows.map((rowLogos, index) => (
          <ParallaxRow
            key={index}
            logos={rowLogos}
            progress={scrollYProgress}
            reverse={reverseRow[index]}
          />
        ))}
      </div>
    </section>
  );
}
