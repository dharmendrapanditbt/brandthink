"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "@/components/ui/Reveal";
import DecryptText from "@/components/ui/DecryptText";
import HoverFlipText from "@/components/ui/HoverFlipText";
import CaseStudiesCTA from "@/components/sections/CaseStudiesCTA";
import content from "@/content/blog.json";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ─────────────────────────── Hero ─────────────────────────── */

export function BlogHero() {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!headingRef.current) return;
    const chars = headingRef.current.querySelectorAll(".hero-char");

    gsap.fromTo(
      chars,
      { y: 80, opacity: 0, rotateX: -90 },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        stagger: 0.025,
        duration: 0.8,
        ease: "power3.out",
        delay: 1.2,
      }
    );
  }, []);

  const renderChars = (text: string) =>
    text.split("").map((char, i) => (
      <span
        key={i}
        className="hero-char inline-block"
        style={{ display: char === " " ? "inline" : undefined }}
      >
        {char === " " ? "\u00A0" : char}
      </span>
    ));

  return (
    <section className="bg-dark-grey pb-16 pt-40">
      <div className="mx-auto flex flex-col items-center px-6 text-center md:px-12 lg:px-20">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.0 }}
          data-text={content.eyebrow}
          className="glitch-hover mb-4 text-sm uppercase tracking-[0.3em] text-bt-red"
        >
          {content.eyebrow}
        </motion.p>

        <h1
          ref={headingRef}
          className="bebas mb-8 max-w-4xl text-4xl uppercase text-white sm:text-5xl md:text-6xl lg:text-7xl"
          style={{ perspective: "600px" }}
        >
          {renderChars(content.heading.line1)}
          <span className="block text-bt-red">
            {renderChars(content.heading.highlight)}
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.5 }}
          className="max-w-2xl text-base text-light-grey sm:text-lg"
        >
          {content.intro}
        </motion.p>
      </div>
    </section>
  );
}

/* ───────────────────── Featured Post ──────────────────────── */

export function BlogFeatured() {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;
    gsap.fromTo(
      cardRef.current,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 85%",
          once: true,
        },
      }
    );
  }, []);

  const { featured } = content;

  return (
    <section className="bg-dark-grey pb-20">
      <div className="mx-auto px-6 md:px-12 lg:px-20">
        <div
          ref={cardRef}
          className="glow-border scan-hover grid overflow-hidden border border-grey-1 bg-grey-2 lg:grid-cols-2"
        >
          {/* Image side */}
          <Link href={`/blog/${featured.slug}`} className="relative aspect-[16/10] overflow-hidden block lg:aspect-auto">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={featured.image}
              alt={featured.title}
              className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 lg:hidden">
              <span
                className="inline-block rounded-sm px-3 py-1 text-xs font-bold uppercase tracking-wider text-white"
                style={{ backgroundColor: featured.categoryColor }}
              >
                {featured.category}
              </span>
            </div>
          </Link>

          {/* Text side */}
          <div className="flex flex-col justify-center p-8 lg:p-12">
            <div className="mb-4 hidden items-center gap-3 lg:flex">
              <span
                className="inline-block rounded-sm px-3 py-1 text-xs font-bold uppercase tracking-wider text-white"
                style={{ backgroundColor: featured.categoryColor }}
              >
                {featured.category}
              </span>
              <span className="text-xs text-light-grey">
                {featured.readTime}
              </span>
            </div>

            <Link href={`/blog/${featured.slug}`} className="group">
              <h2 className="bebas mb-4 text-2xl uppercase text-white transition-colors group-hover:text-bt-red sm:text-3xl lg:text-4xl">
                {featured.title}
              </h2>
            </Link>

            <p className="mb-6 text-sm leading-relaxed text-light-grey lg:text-base">
              {featured.excerpt}
            </p>

            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-light-grey">
                {featured.date}
              </span>
              <Link
                href={`/blog/${featured.slug}`}
                className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-bt-red transition-colors hover:text-white"
              >
                <HoverFlipText text="Read Article" />
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────── Category Pills / Cards ──────────────────── */

export function BlogCategories() {
  return (
    <section className="bg-dark-grey pb-16">
      <div className="mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {content.categories.map((cat, i) => (
            <Reveal key={cat.slug} delay={i * 0.06}>
              <div
                className="group relative overflow-hidden border border-grey-1 bg-grey-2 p-6 text-center transition-colors hover:border-grey-1 hover:bg-off-grey"
              >
                {/* Top color accent bar */}
                <div
                  className="absolute inset-x-0 top-0 h-1 transition-all group-hover:h-1.5"
                  style={{ backgroundColor: cat.color }}
                />
                <p
                  className="bebas text-lg uppercase sm:text-xl"
                  style={{ color: cat.color }}
                >
                  {cat.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────── Blog Cards Grid ────────────────────── */

export function BlogGrid() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll(".blog-card");
    if (cards.length === 0) return;

    gsap.fromTo(
      cards,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 80%",
          once: true,
        },
      }
    );
  }, []);

  return (
    <section className="bg-dark-grey pb-24">
      <div className="mx-auto px-6 md:px-12 lg:px-20">
        <div
          ref={gridRef}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {content.posts.map((post, index) => (
            <div
              key={post.slug}
              className="blog-card glow-border scan-hover flex flex-col border border-grey-1 bg-grey-2 transition-colors hover:border-grey-1 hover:bg-off-grey"
              style={
                {
                  "--border-delay": `-${(index * 2.3) % 7}s`,
                } as React.CSSProperties
              }
            >
              {/* Card Image */}
              <Link href={`/blog/${post.slug}`} className="relative aspect-[16/10] overflow-hidden block">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
                {/* Category badge overlay */}
                <div className="absolute left-0 top-0 p-4">
                  <span
                    className="inline-block rounded-sm px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white"
                    style={{ backgroundColor: post.categoryColor }}
                  >
                    {post.category}
                  </span>
                </div>
              </Link>

              {/* Card Body */}
              <div className="flex flex-1 flex-col p-6 lg:p-8">
                <div className="mb-3 flex items-center gap-3">
                  <span
                    className="text-xs uppercase tracking-[0.2em]"
                    style={{ color: post.categoryColor }}
                  >
                    {post.category}
                  </span>
                  <span className="text-[10px] text-light-grey">•</span>
                  <span className="text-[10px] text-light-grey">
                    {post.readTime}
                  </span>
                </div>

                <Link href={`/blog/${post.slug}`} className="group">
                  <h3 className="bebas mb-3 text-xl uppercase text-white transition-colors group-hover:text-bt-red sm:text-2xl">
                    {post.title}
                  </h3>
                </Link>

                <p className="mb-6 flex-1 text-sm leading-relaxed text-light-grey">
                  {post.excerpt}
                </p>

                <div className="mt-auto flex items-center justify-between border-t border-grey-1 pt-4">
                  <span className="font-mono text-[11px] text-light-grey">
                    {post.date}
                  </span>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-light-grey transition-colors hover:text-bt-red"
                  >
                    Read
                    <span className="transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────── CTA Section ─────────────────────── */

export function BlogCTA() {
  return (
    <section className="bg-off-grey py-24">
      <div className="mx-auto px-6 text-center md:px-12 lg:px-20">
        <Reveal>
          <h2 className="bebas mb-6 text-3xl uppercase text-white sm:text-4xl md:text-5xl">
            {content.cta.heading.line1}
            <DecryptText
              text={content.cta.heading.highlight}
              className="block text-bt-red"
            />
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mx-auto mb-10 max-w-xl text-light-grey">
            {content.cta.paragraph}
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <CaseStudiesCTA label={content.cta.buttonLabel} />
        </Reveal>
      </div>
    </section>
  );
}
