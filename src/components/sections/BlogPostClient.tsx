"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useSpring } from "framer-motion";
import Reveal from "@/components/ui/Reveal";
import DecryptText from "@/components/ui/DecryptText";
import HoverFlipText from "@/components/ui/HoverFlipText";
import CaseStudiesCTA from "@/components/sections/CaseStudiesCTA";

interface Author {
  name: string;
  role: string;
  avatar: string;
}

interface Section {
  type: string;
  text?: string;
  title?: string;
  author?: string;
  items?: string[];
  headers?: string[];
  rows?: string[][];
}

export interface BlogPostData {
  category: string;
  categoryColor: string;
  readTime: string;
  title: string;
  metaTitle?: string;
  metaDescription?: string;
  excerpt: string;
  date: string;
  slug: string;
  image: string;
  author?: Author;
  sections?: Section[];
}

interface BlogPostClientProps {
  post: BlogPostData;
  relatedPosts: BlogPostData[];
}

function renderFormattedText(text?: string) {
  if (!text) return null;
  // Splits by **bold** or <strong>...</strong> or <b>...</b>
  const parts = text.split(/(\*\*.*?\*\*|<strong>.*?<\/strong>|<b>.*?<\/b>)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-bold text-white">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("<strong>") && part.endsWith("</strong>")) {
      return (
        <strong key={i} className="font-bold text-white">
          {part.slice(8, -9)}
        </strong>
      );
    }
    if (part.startsWith("<b>") && part.endsWith("</b>")) {
      return (
        <strong key={i} className="font-bold text-white">
          {part.slice(3, -4)}
        </strong>
      );
    }
    return part;
  });
}

export default function BlogPostClient({ post, relatedPosts }: BlogPostClientProps) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <article className="min-h-screen bg-dark-grey text-white">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-bt-red z-50 origin-left"
        style={{ scaleX }}
      />

      {/* Header Section */}
      <motion.header
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1.1 }}
        className="pb-12 pt-36 px-6 md:px-12 lg:px-20 max-w-5xl mx-auto"
      >
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-xs uppercase tracking-widest text-light-grey">
          <Link href="/blog" className="hover:text-bt-red transition-colors">
            Blog
          </Link>
          <span>/</span>
          <span style={{ color: post.categoryColor }}>{post.category}</span>
        </div>

        {/* Category & Read Time */}
        <div className="mb-4 flex items-center gap-3">
          <span
            className="inline-block rounded-sm px-3 py-1 text-xs font-bold uppercase tracking-wider text-white"
            style={{ backgroundColor: post.categoryColor }}
          >
            {post.category}
          </span>
          <span className="text-xs font-mono text-light-grey">•</span>
          <span className="text-xs font-mono text-light-grey">{post.readTime}</span>
        </div>

        {/* Title */}
        <h1 className="bebas mb-8 text-3xl uppercase text-white sm:text-5xl md:text-6xl leading-[1.05]">
          {post.title}
        </h1>

        {/* Company & Date Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-y border-grey-1 py-4 text-xs">
          <div>
            <p className="font-semibold text-white tracking-wider uppercase">BrandThink</p>
            <p className="text-[11px] text-light-grey">Growth Field Notes</p>
          </div>

          <div className="flex items-center gap-6">
            <span className="font-mono text-light-grey">{post.date}</span>
            <button
              onClick={handleShare}
              className="group inline-flex items-center gap-2 text-xs uppercase tracking-wider text-bt-red transition-colors hover:text-white"
            >
              {copied ? "Link Copied!" : "Share Post"}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Featured Header Image */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.35 }}
        className="max-w-5xl mx-auto px-6 md:px-12 lg:px-20 mb-16"
      >
        <div className="glow-border relative aspect-[16/9] overflow-hidden border border-grey-1 bg-grey-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.image}
            alt={post.title}
            className="h-full w-full object-cover"
          />
        </div>
      </motion.div>

      {/* Article Content */}
      <main className="max-w-3xl mx-auto px-6 md:px-8 pb-20">
        <div className="space-y-8 text-base sm:text-lg leading-relaxed text-light-grey">
          {post.sections && post.sections.length > 0 ? (
            post.sections.map((section, idx) => {
              if (section.type === "heading") {
                return (
                  <h2
                    key={idx}
                    className="bebas mt-12 mb-4 text-2xl uppercase text-white sm:text-3xl lg:text-4xl"
                  >
                    {section.text}
                  </h2>
                );
              }
              if (section.type === "subheading") {
                return (
                  <h3
                    key={idx}
                    className="mt-8 mb-3 text-xl font-bold text-white sm:text-2xl"
                  >
                    {renderFormattedText(section.text)}
                  </h3>
                );
              }
              if (section.type === "quote") {
                return (
                  <blockquote
                    key={idx}
                    className="my-8 border-l-4 border-bt-red bg-grey-2 p-6 sm:p-8 text-white italic"
                  >
                    <p className="mb-2 text-lg sm:text-xl">&ldquo;{section.text}&rdquo;</p>
                    {section.author && (
                      <cite className="not-italic text-xs font-mono uppercase tracking-widest text-bt-red">
                        — {section.author}
                      </cite>
                    )}
                  </blockquote>
                );
              }
              if (section.type === "callout") {
                return (
                  <div
                    key={idx}
                    className="my-8 border border-grey-1 bg-off-grey p-6 sm:p-8"
                  >
                    {section.title && (
                      <h4 className="bebas mb-2 text-xl uppercase tracking-wider text-bt-red">
                        {section.title}
                      </h4>
                    )}
                    <p className="text-sm sm:text-base text-white">{section.text}</p>
                  </div>
                );
              }
              if (section.type === "list" && section.items) {
                return (
                  <ul key={idx} className="my-6 space-y-3 list-none pl-0">
                    {section.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-start gap-3">
                        <span className="text-bt-red font-mono font-bold mt-1">→</span>
                        <span>{renderFormattedText(item)}</span>
                      </li>
                    ))}
                  </ul>
                );
              }
              if (section.type === "table" && section.rows) {
                return (
                  <div key={idx} className="my-8 overflow-x-auto border border-grey-1 bg-grey-2">
                    <table className="w-full text-left text-sm text-light-grey">
                      {section.headers && (
                        <thead className="border-b border-grey-1 bg-off-grey text-xs uppercase text-white font-mono">
                          <tr>
                            {section.headers.map((h, hIdx) => (
                              <th key={hIdx} className="px-6 py-4">{h}</th>
                            ))}
                          </tr>
                        </thead>
                      )}
                      <tbody className="divide-y divide-grey-1">
                        {section.rows.map((row, rIdx) => (
                          <tr key={rIdx} className="hover:bg-off-grey/50 transition-colors">
                            {row.map((cell, cIdx) => (
                              <td key={cIdx} className="px-6 py-4">{renderFormattedText(cell)}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                );
              }
              // Default paragraph
              return <p key={idx}>{renderFormattedText(section.text)}</p>;
            })
          ) : (
            <p>{renderFormattedText(post.excerpt)}</p>
          )}
        </div>

        {/* Footer Navigation within Article */}
        <div className="mt-16 border-t border-grey-1 pt-8 flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-bt-red transition-colors hover:text-white"
          >
            ← <HoverFlipText text="Back to All Articles" />
          </Link>
          <button
            onClick={handleShare}
            className="text-xs uppercase tracking-wider text-light-grey hover:text-white transition-colors"
          >
            {copied ? "Copied to Clipboard!" : "Copy Post URL"}
          </button>
        </div>
      </main>

      {/* Related Posts Section */}
      {relatedPosts.length > 0 && (
        <section className="border-t border-grey-1 bg-off-grey py-20 px-6 md:px-12 lg:px-20">
          <div className="max-w-6xl mx-auto">
            <h3 className="bebas mb-10 text-2xl uppercase text-white sm:text-3xl">
              Related Insights
            </h3>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((relPost) => (
                <div
                  key={relPost.slug}
                  className="glow-border scan-hover flex flex-col border border-grey-1 bg-grey-2"
                >
                  <Link href={`/blog/${relPost.slug}`} className="relative aspect-[16/10] overflow-hidden block">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={relPost.image}
                      alt={relPost.title}
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute left-0 top-0 p-3">
                      <span
                        className="inline-block rounded-sm px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white"
                        style={{ backgroundColor: relPost.categoryColor }}
                      >
                        {relPost.category}
                      </span>
                    </div>
                  </Link>

                  <div className="flex flex-1 flex-col p-6">
                    <Link href={`/blog/${relPost.slug}`} className="group">
                      <h4 className="bebas mb-2 text-lg uppercase text-white transition-colors group-hover:text-bt-red sm:text-xl">
                        {relPost.title}
                      </h4>
                    </Link>
                    <p className="mb-4 text-xs text-light-grey line-clamp-2">
                      {relPost.excerpt}
                    </p>
                    <div className="mt-auto flex items-center justify-between border-t border-grey-1 pt-3">
                      <span className="font-mono text-[10px] text-light-grey">{relPost.date}</span>
                      <Link
                        href={`/blog/${relPost.slug}`}
                        className="text-[11px] font-semibold uppercase tracking-wider text-bt-red hover:text-white"
                      >
                        Read →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="bg-dark-grey py-20 text-center px-6">
        <Reveal>
          <h2 className="bebas mb-6 text-3xl uppercase text-white sm:text-4xl md:text-5xl">
            Ready To Make{" "}
            <DecryptText
              text="Your Stack Work Together?"
              className="block text-bt-red"
            />
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mx-auto mb-10 max-w-xl text-sm sm:text-base text-light-grey leading-relaxed">
            Bring us the complexity. We&apos;ll help turn disconnected platforms, data and workflows into a MarTech system built around your business.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <CaseStudiesCTA label="Book Your Strategy Call →" />
        </Reveal>
      </section>
    </article>
  );
}
