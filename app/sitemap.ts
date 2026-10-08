import type { MetadataRoute } from "next";
import { CALCULATORS, SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/about", "/privacy", "/contact"];

  return [
    ...staticRoutes.map((path) => ({
      url: `${SITE_URL}${path}`,
      lastModified: new Date("2026-10-08"),
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.6,
    })),
    ...CALCULATORS.map((c) => ({
      url: `${SITE_URL}/${c.slug}`,
      lastModified: new Date("2026-10-08"),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
  ];
}
