# ONPAGE-SEO: titles, metas, H1s, URLs, template, linking, schema

Prepared 14 Oct 2026 (PKT). Companion data: **`on-page-seo.csv`**, with one row per page and the source of truth for metadata. DEV-TASKS T-101–T-110 implement this document.

## 1. The CSV

`on-page-seo.csv` has 247 rows:
- **209 existing staging pages:** 166 keep their URL, 37 are renamed with a 301, 4 are merged with a 301 and 2 are removed with a 301 to the closest page.
- **38 new pages.**

That makes **241 unique live URLs** with metadata (247 rows minus the 6 merged or removed rows, which have no page of their own).

| Column | Meaning |
|---|---|
| current_url | Staging path (blank for new pages) |
| new_url | Final path at launch |
| redirect_301 | `yes: old -> new` when a redirect is needed |
| status | keep / rename (301) / merge (301) / remove (301) / new |
| hub | /money (109), /everyday (54), /math (44), /health (29), /embed (5) |
| h1, title, title_len, meta_description, meta_len | Metadata. Titles are 33–65 characters and descriptions 110–159; all are unique |
| content_batch | `1 (content/ written)` for the 30 pages in `content/`; `later batch` for the other 211 |
| dev_dependency | DEV-TASKS ID the page needs before its content can go live |
| cnet_url, cnet_words, cnet_inputs, cnet_tables, cnet_sections | Matching calculator.net page and its measured features (fetched 14 Oct 2026) |

Country folders: 21 pages under `/us/`, 12 under `/ca/` and 13 under `/uk/`. The 5 `/embed/` pages are widgets: give them `noindex` if they duplicate the main tool (see §4).

For the 30 batch-1 pages, the front matter in `content/*.md` and the CSV hold identical title, description and H1. If you edit one, edit the other, or generate the CSV from front matter.

## 2. Rules for titles, descriptions, H1s and URLs

**Title (`<title>`)**
- Format: `{Primary keyword}{: or –}{differentiator} | FigSumo`.
- Aim for 65 characters or fewer (the hard limit in T-101 is 70) and keep it unique.
- Put the tax year in country tax and pay titles, e.g. "2026" for the US and Canada, "2026/27" for the UK. Update it every tax year (T-310).
- Lead with what people search, e.g. "Mortgage Calculator", not "Calculate your mortgage".
- No "Free Online … Calculator" boilerplate and no all-caps.
- Brand casing is **FigSumo** throughout this pack. Staging uses "Figsumo" (VERIFY with Arhum).

**Meta description**
- 110–160 characters, unique, and written as one or two plain sentences.
- Say what the tool calculates, its main inputs or modes, and what makes it trustworthy (official rates, tax year, schedule).
- No claims we can't support: no "most accurate", "#1" or "trusted by millions".

**H1**
- The calculator name with the country or tax year where relevant, e.g. "UK Take-Home Pay Calculator (2026/27)".
- Use one H1 per page. It is not identical to the title.

**URL**
- Lowercase and hyphenated, ending in `-calculator` (or `-converter` for unit converters).
- Country-specific tools go under `/us/`, `/ca/` or `/uk/`. Universal tools stay at the root (T-107).
- No dates in URLs: the year goes in the title and content, so the URL survives each tax year.
- No trailing slash, and the canonical URL is self-referencing (T-005).

## 3. CONTENT-TEMPLATE (use for every remaining page)

The 30 pages in `content/` follow this template. Copy the structure, never the text.

```markdown
---
url: /example-calculator
h1: Example Calculator
title: "Example Calculator: What It Solves | FigSumo"          # ≤65 chars
description: "One or two sentences, 110–160 characters."
updated: YYYY-MM-DD
country: global | US | CA | UK
taxYear: "2026" | "2026/27" | n/a                                # tax and pay pages only
hreflang_cluster: income-tax | take-home-pay | mortgage | capital-gains   # only if in a §6 cluster
calculatorRequirements: "DEV-TASKS T-xxx (inputs/modes the text describes)"
related: [/a-calculator, /b-calculator, /c-calculator, /d-calculator]   # 4–8, final URLs only
---
```

The body runs in this order (T-105 renders the calculator after the intro):

| # | Section | Rules |
|---|---|---|
| 1 | Intro (no heading) | 2–4 sentences: what it calculates and for whom. No "In today's world…" |
| 2 | `## How to use this calculator` | Numbered list, one item per input. Say where to find each number (payslip, Loan Estimate, statement) |
| 3 | `## The formula` | Formula in a code block or KaTeX, define every variable, state conventions (compounding, rounding, timing) |
| 4 | `## Worked examples` | 1–2 examples (`### Example 1: …`). Every number recomputed in a script, stored with the page, and added to DEV-TASKS golden tests |
| 5 | `## Understanding your results` | What each output means, its limits, and the most common reason a real-world figure differs |
| 6 | Optional gap-closing section(s) | Only where the competitor comparison shows a real user need (e.g. "Ways to pay off sooner") |
| 7 | `## Country notes` | US / Canada / UK differences, with a link to the country page if one exists. Universal tools: units and currency notes |
| 8 | `## Frequently asked questions` | 5–8 `###` questions, each answered in 2–5 sentences. The same text feeds FAQPage JSON-LD |
| 9 | `## Sources` | Numbered list of primary sources (government, regulator, peer-reviewed, standards body), each with "(accessed DD Mon YYYY)" |
| 10 | `## Disclaimer` | Topic-specific (see `content/site/disclaimer.md`). Finance: "estimate, not financial/tax advice". Health: "not medical advice; talk to a clinician" |

**Quality bar** (QA-CHECKLIST §8 tests it):
- 900–1,500 words of body text.
- No copied or lightly reworded text from any other site.
- Every figure dated and sourced. Anything unverified is marked VERIFY and is not published until resolved.
- Plain words, short sentences, US spelling on global and US pages, Canadian spelling on `/ca/` pages and UK spelling on `/uk/` pages.
- Health pages: describe categories and ranges and never prescribe intake or treatment.
- Finance pages: describe how the maths works and never recommend a product or decision.

**Minimum feature target for each later page:** the `cnet_inputs` / `cnet_sections` columns in the CSV, and the lighter comparison table in `content/COMPETITOR-COMPARISON.md`.

## 4. Internal linking rules

1. **Final URLs only.** Every internal link uses the `new_url` value. No link may hit a 301 (QA-CHECKLIST §3 crawls for this).
2. **Hub ⇄ page.** Every calculator links to its hub through the breadcrumb (T-103), and every hub lists all its calculators, grouped (T-106).
3. **Related block.** 4–8 hand-picked calculators per page, taken from the front matter `related` (batch 1) or the registry. Pick the next step in the user's task, e.g. mortgage → affordability → down payment → PMI → refinance. Don't pick merely "same hub".
4. **In-text links.** 2–6 per page, where the text names a concept another tool calculates. Use descriptive anchors such as "estimate PMI", never "click here" or bare URLs. Link each target at most once per page.
5. **Country siblings.** Pages in an hreflang cluster (§6) show "Also available for: United States · Canada · United Kingdom". Universal tools link to a country tool only where that tool's rules really differ, e.g. loan → UK mortgage.
6. **New pages** must have ≥3 inbound links from existing pages before launch: hub, ≥1 related block, ≥1 in-text link. No orphans.
7. **Trust pages.** Footer links to About, Methodology, Privacy, Terms, Disclaimer and Contact on every page. Every calculator's Sources section links to Methodology.
8. **Embeds.** `/embed/*` pages link back to the full calculator. If an embed renders the same tool and text as the main page, set `noindex, follow` and canonicalise it to the main page.
9. **Outbound links.** Link only to primary sources. Use `rel="noopener"` on new-tab links. No `nofollow` on government or regulator citations, and no affiliate links without `rel="sponsored"` and a disclosure.

## 5. Structured data (JSON-LD) examples

Output a single `@graph` per page (T-102).
- `SITE_URL` below is `https://figsumo.com`. This is a placeholder: the domain is not bought yet, and apex vs www is still to be decided (VERIFY).
- Replace `[LOGO_URL]` once the logo exists.
- Use no invented facts: no address, phone, ratings or founding date.

### 5a. Every page: Organization + WebSite
```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://figsumo.com/#org",
      "name": "FigSumo",
      "url": "https://figsumo.com/",
      "logo": "[LOGO_URL]"
    },
    {
      "@type": "WebSite",
      "@id": "https://figsumo.com/#website",
      "name": "FigSumo",
      "url": "https://figsumo.com/",
      "publisher": { "@id": "https://figsumo.com/#org" },
      "inLanguage": "en"
    }
  ]
}
```
Add `sameAs` only once real social profiles exist. Add a `potentialAction` SearchAction only if `/search?q=` returns real result pages (VERIFY: no search route found on staging).

### 5b. Calculator page: WebApplication + BreadcrumbList + FAQPage
```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "@id": "https://figsumo.com/mortgage-calculator#app",
      "name": "Mortgage Calculator",
      "url": "https://figsumo.com/mortgage-calculator",
      "description": "Estimate your full monthly mortgage payment: principal, interest, property tax, homeowners insurance, PMI and HOA, with an amortization schedule.",
      "applicationCategory": "FinanceApplication",
      "operatingSystem": "Any",
      "isAccessibleForFree": true,
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
      "publisher": { "@id": "https://figsumo.com/#org" },
      "dateModified": "2026-10-14"
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://figsumo.com/" },
        { "@type": "ListItem", "position": 2, "name": "Money", "item": "https://figsumo.com/money" },
        { "@type": "ListItem", "position": 3, "name": "Mortgage Calculator", "item": "https://figsumo.com/mortgage-calculator" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Does the monthly payment include property tax and insurance?",
          "acceptedAnswer": { "@type": "Answer", "text": "Only if you enter them. Many lenders collect them monthly through an escrow account, so including them gives a more realistic monthly cost. The P&I figure on its own is what the loan formula produces." }
        }
      ]
    }
  ]
}
```
Rules:
- `FAQPage` text must match the visible FAQ word for word, and the list must include every visible question (only one is shown above for brevity).
- Google limits FAQ rich results to well-known government and health sites, so do not expect FAQ snippets.
- `applicationCategory` by hub: `/money` → FinanceApplication, `/health` → HealthApplication, `/math` → EducationalApplication, `/everyday` → UtilitiesApplication.
- On country pages, `priceCurrency` follows the country (USD / CAD / GBP).
- Never add `aggregateRating`, `review` or `HowTo`.

### 5c. Hub page: CollectionPage + ItemList
```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": "https://figsumo.com/money#page",
      "name": "Money Calculators",
      "url": "https://figsumo.com/money",
      "isPartOf": { "@id": "https://figsumo.com/#website" },
      "mainEntity": {
        "@type": "ItemList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "url": "https://figsumo.com/mortgage-calculator", "name": "Mortgage Calculator" },
          { "@type": "ListItem", "position": 2, "url": "https://figsumo.com/loan-calculator", "name": "Loan Calculator" }
        ]
      }
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://figsumo.com/" },
        { "@type": "ListItem", "position": 2, "name": "Money", "item": "https://figsumo.com/money" }
      ]
    }
  ]
}
```

### 5d. About / Contact
Use `AboutPage` or `ContactPage`, with `"about": {"@id": "https://figsumo.com/#org"}`. Add `author` / `reviewedBy` as `Person` only for real, named reviewers (T-705); placeholders stay out of schema.

## 6. hreflang clusters

Use hreflang only between true country equivalents (T-108). Each member lists all members plus itself, using absolute URLs.

| Cluster | en-US | en-CA | en-GB | x-default |
|---|---|---|---|---|
| Income tax | /us/income-tax-calculator | /ca/income-tax-calculator | /uk/income-tax-calculator | /us/income-tax-calculator |
| Take-home pay | /us/paycheck-calculator | /ca/take-home-pay-calculator | /uk/take-home-pay-calculator | /us/paycheck-calculator |
| Mortgage | /mortgage-calculator | /ca/mortgage-calculator | /uk/mortgage-calculator | /mortgage-calculator |
| Capital gains (when all three exist) | /us/capital-gains-tax-calculator | /ca/capital-gains-tax-calculator | /uk/capital-gains-tax-calculator | /us/capital-gains-tax-calculator |

Example `<head>` output for `/uk/take-home-pay-calculator`:
```html
<link rel="canonical" href="https://figsumo.com/uk/take-home-pay-calculator">
<link rel="alternate" hreflang="en-US" href="https://figsumo.com/us/paycheck-calculator">
<link rel="alternate" hreflang="en-CA" href="https://figsumo.com/ca/take-home-pay-calculator">
<link rel="alternate" hreflang="en-GB" href="https://figsumo.com/uk/take-home-pay-calculator">
<link rel="alternate" hreflang="x-default" href="https://figsumo.com/us/paycheck-calculator">
```
Leave hreflang off universal tools, and off RRSP/401(k)/ISA, TFSA/Roth, or stamp duty vs land transfer tax. These are different products, not translations.

## 7. Competitor targets for later batches
- Top 30: `content/COMPETITOR-COMPARISON.md`, summary table and page-by-page detail.
- The other 217 CSV rows: the lighter comparison table at the end of that file (their words, inputs, tables, chart and section topics), plus the `cnet_*` columns in the CSV. Topics are listed as headings only. Write every page from scratch.
