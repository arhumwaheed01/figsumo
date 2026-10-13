import type { Metadata } from "next";
import { absoluteUrl, siteConfig, type ToolPage } from "@/lib/site";

type PageSeoInput = {
  title: string;
  description: string;
  path?: string;
  noIndex?: boolean;
  /** Skip the root title template (use for the homepage). */
  absoluteTitle?: boolean;
};

export function createPageMetadata({
  title,
  description,
  path = "/",
  noIndex = false,
  absoluteTitle = false,
}: PageSeoInput): Metadata {
  const url = absoluteUrl(path);
  const fullTitle = absoluteTitle
    ? title
    : title === siteConfig.name
      ? title
      : `${title} | ${siteConfig.name}`;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      url,
      siteName: siteConfig.name,
      title: fullTitle,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}

export function createToolMetadata(tool: ToolPage): Metadata {
  return createPageMetadata({
    title: tool.title,
    description: tool.description,
    path: tool.path,
  });
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: absoluteUrl("/"),
    description: siteConfig.description,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${absoluteUrl("/")}?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function webAppJsonLd(tool: ToolPage) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: `${tool.title} — ${siteConfig.name}`,
    url: absoluteUrl(tool.path),
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description: tool.description,
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: absoluteUrl("/"),
    },
  };
}
