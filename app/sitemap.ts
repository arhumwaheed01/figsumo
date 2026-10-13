import type { MetadataRoute } from "next";
import { calculatorCategories } from "@/lib/calculators";
import { absoluteUrl, tools } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ["/", "/about", "/privacy", "/contact"] as const;
  const now = new Date();

  return [
    ...staticPaths.map((path) => ({
      url: absoluteUrl(path),
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: path === "/" ? 1 : 0.5,
    })),
    ...calculatorCategories.map((category) => ({
      url: absoluteUrl(category.path),
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...tools.map((tool) => ({
      url: absoluteUrl(tool.path),
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
  ];
}
