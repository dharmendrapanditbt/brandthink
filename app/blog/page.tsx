import type { Metadata } from "next";
import {
  BlogHero,
  BlogFeatured,
  BlogGrid,
  BlogCTA,
} from "@/components/sections/BlogSections";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "The marketing landscape keeps moving. Here, we explore the thinking, technology and changing behaviours that are rewriting the rules of modern marketing.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog | BrandThink",
    description:
      "The marketing landscape keeps moving. Here, we explore the thinking, technology and changing behaviours that are rewriting the rules of modern marketing.",
    url: "/blog",
  },
};

export default function BlogPage() {
  return (
    <>
      <BlogHero />
      <BlogFeatured />
      <BlogGrid />
      <BlogCTA />
    </>
  );
}
