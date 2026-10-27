import type { MetadataRoute } from "next";
import caseStudies from "@/content/caseStudies.json";
import blogData from "@/content/blog.json";

export const dynamic = "force-static";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://thebrandthink.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/case-studies",
    "/blog",
    "/services",
    "/technology",
    "/tech-stack",
    "/about",
    "/careers",
    "/contact",
  ].map((path) => ({
    // Trailing slash matches next.config's trailingSlash and the canonical
    // URLs, so crawlers don't hit a redirect for every sitemap entry.
    url: `${SITE_URL}${path}/`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const caseStudyRoutes = caseStudies.map((study) => ({
    url: `${SITE_URL}/case-studies/${study.slug}/`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const blogRoutes = [blogData.featured, ...blogData.posts].map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}/`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...caseStudyRoutes, ...blogRoutes];
}
