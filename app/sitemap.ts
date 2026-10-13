import type { MetadataRoute } from "next";
import { calculatorCategories } from "@/lib/calculators";
import {
  CONTENT_UPDATED,
  IS_PRODUCTION_SITE,
  SITE_URL,
  tools,
} from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!IS_PRODUCTION_SITE) return [];

  const staticPages: { path: string; updated: string }[] = [
    { path: "/", updated: CONTENT_UPDATED },
    { path: "/about", updated: CONTENT_UPDATED },
    { path: "/privacy", updated: CONTENT_UPDATED },
    { path: "/contact", updated: CONTENT_UPDATED },
  ];

  return [
    ...staticPages.map((page) => ({
      url: `${SITE_URL}${page.path === "/" ? "" : page.path}`,
      lastModified: new Date(page.updated),
    })),
    ...calculatorCategories.map((category) => ({
      url: `${SITE_URL}${category.path}`,
      lastModified: new Date(CONTENT_UPDATED),
    })),
    // Embed widgets stay out of the sitemap (noindex / Disallow).
    ...tools
      .filter((tool) => !tool.path.includes("for-your-site") && !tool.slug.includes("for-your-site"))
      .map((tool) => ({
        url: `${SITE_URL}${tool.path}`,
        lastModified: new Date(tool.updated),
      })),
  ];
}
