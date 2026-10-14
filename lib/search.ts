import {
  allCalculators,
  calculatorCategories,
  type CalculatorCategory,
  type CalculatorEntry,
} from "@/lib/calculators";

export type SearchHit = {
  tool: CalculatorEntry;
  category: CalculatorCategory;
  score: number;
};

function normalize(value: string): string {
  return value
    .toLowerCase()
    .replace(/calculator/g, " ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");
}

function tokens(value: string): string[] {
  return normalize(value).split(" ").filter(Boolean);
}

/**
 * Rank calculators for a free-text query. Empty/whitespace query → [].
 */
export function searchCalculators(query: string, limit = 40): SearchHit[] {
  const q = normalize(query);
  if (!q) return [];

  const qTokens = tokens(q);
  const categoryBySlug = new Map<string, CalculatorCategory>();
  for (const category of calculatorCategories) {
    for (const item of category.items) {
      categoryBySlug.set(item.slug, category);
    }
  }

  const hits: SearchHit[] = [];

  for (const tool of allCalculators) {
    const category = categoryBySlug.get(tool.slug);
    if (!category) continue;

    const title = normalize(tool.title);
    const slug = normalize(tool.slug.replace(/-/g, " "));
    const description = normalize(tool.description);
    const categoryTitle = normalize(category.title);
    const haystack = `${title} ${slug} ${description} ${categoryTitle}`;

    let score = 0;
    if (title === q || slug === q) score += 100;
    if (title.startsWith(q)) score += 50;
    if (slug.startsWith(q)) score += 40;
    if (title.includes(q)) score += 30;
    if (slug.includes(q)) score += 24;
    if (categoryTitle.includes(q)) score += 16;
    if (description.includes(q)) score += 10;

    let tokenHits = 0;
    for (const token of qTokens) {
      if (haystack.includes(token)) tokenHits += 1;
    }
    if (qTokens.length > 0 && tokenHits === qTokens.length) {
      score += 20 + tokenHits * 4;
    } else if (tokenHits > 0) {
      score += tokenHits * 3;
    }

    if (score > 0) {
      hits.push({ tool, category, score });
    }
  }

  return hits
    .sort(
      (a, b) =>
        b.score - a.score || a.tool.title.localeCompare(b.tool.title),
    )
    .slice(0, limit);
}
