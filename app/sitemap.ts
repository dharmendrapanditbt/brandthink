import type { MetadataRoute } from "next";
import caseStudies from "@/content/caseStudies.json";
import capabilities from "@/content/capabilities.json";
import blog from "@/content/blog.json";
import { formatIsoDate } from "@/lib/utils";

export const dynamic = "force-static";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://thebrandthink.com";

export default function sitemap(): MetadataRoute.Sitemap {
  // Core static site pages
  const staticRoutes = [
    { path: "/", priority: 1.0, changeFrequency: "weekly" as const },
    { path: "/services/", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/case-studies/", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/blog/", priority: 0.9, changeFrequency: "daily" as const },
    { path: "/about/", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/technology/", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/tech-stack/", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/contact/", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/careers/", priority: 0.7, changeFrequency: "monthly" as const },
    // Localized landing pages
    { path: "/performance-marketing-agency-in-india/", priority: 0.85, changeFrequency: "weekly" as const },
    { path: "/performance-marketing-agency-in-mumbai/", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/performance-marketing-agency-in-bangalore/", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/performance-marketing-agency-in-gurugram/", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/performance-marketing-agency-in-hyderabad/", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/performace-marketing-agency-in-pune/", priority: 0.8, changeFrequency: "monthly" as const },
  ].map((item) => ({
    url: `${SITE_URL}${item.path}`,
    lastModified: new Date(),
    changeFrequency: item.changeFrequency,
    priority: item.priority,
  }));

  // Dynamic Case Studies
  const caseStudyRoutes = caseStudies.map((study) => ({
    url: `${SITE_URL}/case-studies/${study.slug}/`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  // Dynamic Services
  const serviceRoutes = capabilities.items.map((item) => {
    const slug = item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    return {
      url: `${SITE_URL}/services/${slug}/`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    };
  });

  // Dynamic Blog Posts
  const allBlogPosts = [blog.featured, ...blog.posts];
  const blogRoutes = allBlogPosts.map((post) => {
    const isoDate = formatIsoDate(post.updatedDate ?? post.date);
    return {
      url: `${SITE_URL}/blog/${post.slug}/`,
      lastModified: isoDate ? new Date(isoDate) : new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.75,
    };
  });

  return [
    ...staticRoutes,
    ...serviceRoutes,
    ...caseStudyRoutes,
    ...blogRoutes,
  ];
}
