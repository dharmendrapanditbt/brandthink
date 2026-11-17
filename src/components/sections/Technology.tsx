"use client";

import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import HoverFlipText from "@/components/ui/HoverFlipText";
import content from "@/content/technology.json";

export default function Technology() {
  return (
    <section
      id="technology"
      className="bg-dark-grey py-16"
    >
      <div className="mx-auto px-6 md:px-12 lg:px-20">
        <p
          data-text={content.eyebrow}
          className="glitch-hover mb-4 text-sm uppercase tracking-[0.3em] text-bt-red"
        >
          {content.eyebrow}
        </p>

        <Reveal className="flex flex-col gap-8 mb-16 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="bebas text-4xl sm:text-5xl md:text-6xl lg:text-7xl uppercase text-white flex-1">
            {content.heading.line1}
            <span className="block text-bt-red">
              {content.heading.highlight}
            </span>
          </h2>
          <div className="flex-1">
            <p className="text-xs tracking-[0.15em] text-light-grey mb-10">
              {content.paragraph}
            </p>

            <Link
              href="/tech-stack"
              className="btn-brand inline-flex bg-bt-red text-white hover:bg-[#ff2a36] transition-all duration-300 ease-in-out"
            >
              <HoverFlipText text={content.buttonLabel} />
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="overflow-hidden border border-grey-1 bg-off-grey">
          {/* Top Bar */}
          <div className="flex items-center gap-3 border-b border-grey-1 px-6 py-4">
            <div className="h-3 w-3 rounded-full bg-bt-red" />
            <div className="h-3 w-3 rounded-full bg-yellow-500" />
            <div className="h-3 w-3 rounded-full bg-green-500" />

            <span className="ml-3 text-xs font-medium tracking-[0.2em] text-light-grey">
              {content.dashboard.title}
            </span>
          </div>

          {/* Dashboard Body */}
          <div className="p-4 md:p-8 bg-dark-grey">
            {/* Metrics */}
            <div className="mb-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {content.dashboard.metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="scan-hover bg-off-grey p-6 md:p-8 border-l-4 border-bt-red"
                >
                  <p className="mb-3 text-xs tracking-[0.15em] text-light-grey">
                    {metric.label}
                  </p>

                  <div className="bebas text-4xl text-white sm:text-5xl">
                    <AnimatedCounter value={metric.value} />
                  </div>

                  <p className="mt-3 text-sm text-green-500">
                    {metric.delta}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      <div className="mx-auto mt-24 px-6 md:px-12 lg:px-20">
        <Reveal className="mx-auto text-center">
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-bt-red">
            {content.orm.eyebrow}
          </p>

          <h2 className="bebas mb-8 text-4xl uppercase leading-[0.95] text-white sm:text-5xl md:text-6xl lg:text-7xl">
            {content.orm.heading.line1}
            <span className="block text-bt-red">
              {content.orm.heading.highlight}
            </span>
          </h2>

          <p className="mx-auto mb-12 max-w-2xl text-base text-light-grey sm:text-lg">
            {content.orm.brief}
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <ul className="grid gap-4 sm:grid-cols-2">
            {content.orm.features.map((feature) => (
              <li
                key={feature}
                className="scan-hover flex items-start gap-3 border border-grey-1 bg-off-grey p-4 text-sm text-light-grey"
              >
                <span className="mt-0.5 text-bt-red">▹</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}