import type { Metadata } from "next";
import SplashCursor from "@/components/ui/LazySplashCursor";
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
      <SplashCursor
        RAINBOW_MODE={false}
        COLOR="#E8000E"
        Z_INDEX={1}
      />
      <BlogHero />
      <BlogFeatured />
      <BlogGrid />
      <BlogCTA />
    </>
  );
}
