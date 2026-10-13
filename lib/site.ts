import { liveCalculators } from "@/lib/calculators";

export const siteConfig = {
  name: "Figsumo",
  shortName: "Figsumo",
  description:
    "Free online calculators. Start with a full scientific calculator — trigonometry, logs, powers, roots, and memory — right in your browser.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://figsumo.com",
  locale: "en_US",
  email: "hello@figsumo.com",
} as const;

export type ToolPage = {
  slug: string;
  path: string;
  title: string;
  shortTitle: string;
  description: string;
};

/** Live tool pages ready for indexing. */
export const tools: ToolPage[] = liveCalculators.map((c) => ({
  slug: c.slug,
  path: c.path,
  title: c.title,
  shortTitle: c.title.replace(/ Calculator$/, ""),
  description: c.description,
}));

export function absoluteUrl(path = "/") {
  const base = siteConfig.url.replace(/\/$/, "");
  if (!path || path === "/") return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
