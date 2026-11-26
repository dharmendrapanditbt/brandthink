import capabilities from "@/content/capabilities.json";

/** URL slug for a service, e.g. "MarTech Solutions" -> "martech-solutions". */
export function serviceSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/** One link per service, pointing at that service's own page. */
export const serviceLinks = capabilities.items.map((item) => ({
  label: item.title,
  href: `/services/${serviceSlug(item.title)}`,
}));
