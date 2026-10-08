import type { MetadataRoute } from "next";
import { CALCULATORS, SITE_URL } from "@/lib/site";

/** Only figsumo.com URLs: home, eight calculators, about, privacy, contact. */
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    { path: "", priority: 1 },
    ...CALCULATORS.map((c) => ({ path: `/${c.slug}`, priority: 0.9 })),
    { path: "/about", priority: 0.5 },
    { path: "/privacy", priority: 0.4 },
    { path: "/contact", priority: 0.4 },
  ];

  return pages.map(({ path, priority }) => ({
    url: path === "" ? SITE_URL : `${SITE_URL}${path}`,
    lastModified: new Date("2026-10-08"),
    changeFrequency: "monthly" as const,
    priority,
  }));
}
