import { liveCalculators } from "@/lib/calculators";

/** Canonical site origin. No trailing slash. Staging should set this to the vercel.app host. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
).replace(/\/$/, "");

/**
 * Production means: Vercel production env AND the public URL is the real domain
 * (not a *.vercel.app preview/staging host).
 */
export const IS_PRODUCTION_SITE =
  process.env.VERCEL_ENV === "production" &&
  !!process.env.NEXT_PUBLIC_SITE_URL &&
  !process.env.NEXT_PUBLIC_SITE_URL.includes("vercel.app");

/** Shared content / registry bump date for sitemap lastmod. */
export const CONTENT_UPDATED = "2026-10-14";

export const siteConfig = {
  /** Public brand spelling — always "FigSumo". */
  name: "FigSumo",
  shortName: "FigSumo",
  description:
    "Free online calculators for money, health, maths and everyday questions. Tools run in your browser — no account required.",
  url: SITE_URL,
  /** Apex host is canonical; www redirects to non-www in production. */
  canonicalHost: "figsumo.com",
  locale: "en_US",
  email: "hello@figsumo.com",
  privacyEmail: "privacy@figsumo.com",
  businessEmail: "hello@figsumo.com",
} as const;

/**
 * Business / legal details shown on About, Privacy and Contact.
 * Override via env when the legal entity is registered.
 */
export const business = {
  /** Operator / controller — override when a company is registered. */
  legalName: process.env.NEXT_PUBLIC_LEGAL_NAME ?? "Arhum Waheed",
  location: process.env.NEXT_PUBLIC_BUSINESS_LOCATION ?? "Remote",
  postalAddress: process.env.NEXT_PUBLIC_POSTAL_ADDRESS ?? "",
  privacyEffectiveDate: "2026-10-14",
  responseBusinessDays: 5,
  /** No ads until AdSense / CMP ships. */
  showsAdvertising: false,
  hostingProvider: "Vercel Inc.",
  analyticsProvider: null as string | null,
} as const;

export type ToolPage = {
  slug: string;
  path: string;
  title: string;
  shortTitle: string;
  description: string;
  updated: string;
};

/** Live tool pages ready for indexing (when the site is production). */
export const tools: ToolPage[] = liveCalculators.map((c) => ({
  slug: c.slug,
  path: c.path,
  title: c.title,
  shortTitle: c.title.replace(/ Calculator$/, ""),
  description: c.description,
  updated: c.updated,
}));

export function absoluteUrl(path = "/") {
  const base = SITE_URL;
  if (!path || path === "/") return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Contact addresses are only published on the real production domain. */
export function publicContactEmail(): string | null {
  return IS_PRODUCTION_SITE ? siteConfig.email : null;
}
