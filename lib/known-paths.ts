import { allCalculators, calculatorCategories } from "@/lib/calculators";

/** Single-segment paths that are real App Router pages (not [slug]). */
const STATIC_SEGMENTS = new Set([
  "about",
  "privacy",
  "contact",
  "scientific-calculator",
  ...calculatorCategories.map((c) => c.path.replace(/^\//, "")),
]);

const CALCULATOR_SLUGS = new Set(
  allCalculators.map((tool) => tool.slug),
);

/**
 * True when a pathname should be handled by app/[slug] or another known page.
 * Unknown single-segment paths are soft-404 risks under cacheComponents
 * (dynamicParams=false is incompatible), so middleware rejects them early.
 */
export function isKnownAppPath(pathname: string): boolean {
  const path = pathname.replace(/\/+$/, "") || "/";
  if (path === "/") return true;

  // Multi-segment routes (future /us/..., /embed/..., etc.) are not gated here.
  const parts = path.slice(1).split("/");
  if (parts.length !== 1) return true;

  const segment = parts[0];
  if (!segment || segment.includes(".")) return true;

  return STATIC_SEGMENTS.has(segment) || CALCULATOR_SLUGS.has(segment);
}
