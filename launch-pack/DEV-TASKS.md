# FigSumo — Developer Tasks (priority order)

Prepared 14 Oct 2026 (PKT) from the 13 Oct staging review plus fresh checks of https://figsumo.vercel.app/ on 14 Oct 2026.

**About file paths.** I had no access to the repository. Paths below follow Next.js App Router conventions and are confirmed only where the live site shows them:
- `x-matched-path: /[slug]` on every calculator URL, so there is a dynamic route at `app/[slug]/page.tsx`.
- The RSC payload renders one calculator component that takes `{"slug":"mortgage-calculator"}`, so there is a slug-keyed calculator registry. Below it is called `lib/calculators/registry.ts`; rename to match the real one.
- Turbopack chunk names point to a recent Next.js version.

Wherever this file says "e.g. `lib/...`", adjust it to the real structure.

**How each task is written.** What to change, **Files**, **Acceptance criteria (AC)**, **Test**. "VERIFY" means a value that could not be confirmed from an authoritative source while this pack was being prepared. Do not ship a VERIFY value until someone has checked it against the linked source.

---

## Priority summary

| Order | ID | Task | Why now |
|---|---|---|---|
| 1 | T-001 | Noindex everything that isn't production (meta + header + robots) | Staging is fully indexable today |
| 2 | T-002 | Site URL from env (`NEXT_PUBLIC_SITE_URL`) | Canonicals and the sitemap point at a domain nobody owns yet |
| 3 | T-003 | Buy figsumo.com, attach it in Vercel, redirect the hosts | Prerequisite for launch |
| 4 | T-004 | Unknown URLs must return HTTP 404 (soft-404 bug) | `/anything` returns 200 today |
| 5 | T-005 | Sitemap with a real lastmod, no changefreq/priority, embeds excluded | lastmod changes on every request |
| 6 | T-201–T-213 | Chart-unit bug, empty defaults, z-score, UK mortgage £ bug, cloned calculators | Visible errors |
| 7 | T-301–T-310 | Tax-year data module, 2024→2026 US fixes, paycheck bug | Wrong numbers on YMYL pages |
| 8 | T-101–T-110 | Metadata, JSON-LD, breadcrumbs, related links, content rendering, taxonomy and 301s | SEO foundation |
| 9 | T-401–T-421 | Feature upgrades for the top-30 pages (T-412–T-421 added from the competitor comparison; see end of file) | Needed so the content in `content/` is accurate |
| 10 | T-701–T-706 | Trust pages, bylines, methodology, contact | E-E-A-T and AdSense readiness |
| 11 | T-601–T-610 | Core Web Vitals, accessibility, mobile | Quality and UX |
| 12 | T-220–T-229 | Calculator UX: live results, URL state, units, currency, country | Better than the competitor |
| 13 | T-801–T-805 | Consent (UK/EEA), ads.txt, analytics | Before you apply to AdSense |
| 14 | T-501–T-512 | New country calculators (CA/UK pay and tax, stamp duty, RRSP, TFSA, ISA) | Growth |

---

## P0 — Indexing, domain, status codes

### T-001 Noindex every non-production deployment (three layers)
Staging returns `<meta name="robots" content="index, follow">` on all 218 pages, sends no `X-Robots-Tag`, and `robots.txt` says `Allow: /`.

Add one helper and use it in all three places:

```ts
// lib/site.ts
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000').replace(/\/$/, '');
// Production means: Vercel production env AND the public URL is the real domain.
export const IS_PRODUCTION_SITE =
  process.env.VERCEL_ENV === 'production' &&
  !!process.env.NEXT_PUBLIC_SITE_URL &&
  !process.env.NEXT_PUBLIC_SITE_URL.includes('vercel.app');
```

1. **Meta tag.** In `app/layout.tsx`, set the root `metadata`:
```ts
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  robots: IS_PRODUCTION_SITE ? { index: true, follow: true } : { index: false, follow: false, nocache: true },
};
```
   Remove any per-page `robots: 'index, follow'` that would override this. Today every page prints it explicitly.

2. **Header.** In `middleware.ts` (new file, or add to the existing one), check the host, because `*.vercel.app` aliases of a production deployment still have `VERCEL_ENV=production`:
```ts
import { NextResponse, type NextRequest } from 'next/server';
export function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const host = req.headers.get('host') ?? '';
  const prodHost = new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://x').host;
  if (process.env.VERCEL_ENV !== 'production' || host !== prodHost) {
    res.headers.set('X-Robots-Tag', 'noindex, nofollow');
  }
  return res;
}
export const config = { matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'] };
```
   This header also covers non-HTML files (sitemap.xml, images, PDFs).

3. **robots.txt.** Replace the static robots file (if there is one in `public/`) with `app/robots.ts`:
```ts
import type { MetadataRoute } from 'next';
import { SITE_URL, IS_PRODUCTION_SITE } from '@/lib/site';
export default function robots(): MetadataRoute.Robots {
  if (!IS_PRODUCTION_SITE) return { rules: [{ userAgent: '*', disallow: '/' }] };
  return { rules: [{ userAgent: '*', allow: '/', disallow: ['/api/', '/embed/'] }], sitemap: `${SITE_URL}/sitemap.xml` };
}
```
   Robots `Disallow` stops crawling, which means Google cannot see the noindex. Keep layers 1 and 2 as the real de-indexing signal; layer 3 cuts crawl load.

4. **Vercel env vars:** Production `NEXT_PUBLIC_SITE_URL=https://figsumo.com`. Preview and Development: `NEXT_PUBLIC_SITE_URL=https://figsumo.vercel.app` (or leave it unset).

**AC:** On figsumo.vercel.app and every preview URL, all HTML pages carry `<meta name="robots" content="noindex, nofollow">`, every response has `X-Robots-Tag: noindex, nofollow`, and `/robots.txt` is `Disallow: /` with no Sitemap line. On https://figsumo.com, none of the three noindex signals are present.
**Test:**
```bash
curl -sI https://figsumo.vercel.app/mortgage-calculator | grep -i x-robots-tag   # expect noindex, nofollow
curl -s  https://figsumo.vercel.app/mortgage-calculator | grep -o '<meta name="robots"[^>]*>'
curl -s  https://figsumo.vercel.app/robots.txt                                   # expect Disallow: /
```
After launch, run the same commands against figsumo.com and expect the opposite. Also run `site:figsumo.vercel.app` in Google. If URLs are already indexed, use Search Console's Removals tool on a verified vercel.app property, or wait for the noindex to be recrawled.

### T-002 Every absolute URL comes from `NEXT_PUBLIC_SITE_URL`
Today canonicals, `og:url`, JSON-LD `url` and the sitemap all hard-code `https://figsumo.com`.
- Search the repo for `figsumo.com` and replace each hit with `SITE_URL` from `lib/site.ts`. The canonical goes through `alternates: { canonical: path }` together with `metadataBase`.
- Until the domain is bought, the production canonical should not point at an unowned domain. Either buy the domain first (T-003) or keep the site noindexed (T-001 does this automatically while `NEXT_PUBLIC_SITE_URL` contains `vercel.app`).
- The contact page lists `hello@figsumo.com`, which cannot receive mail yet. Hide it behind `IS_PRODUCTION_SITE`, or use the contact form from T-706.

**AC:** Searching `app`, `lib` and `components` for "figsumo.com" returns only comments or config docs. On staging, the canonical reads `https://figsumo.vercel.app/...`. In production it reads `https://figsumo.com/...`.
**Test:** `curl -s https://figsumo.vercel.app/bmi-calculator | grep -o 'rel="canonical" href="[^"]*"'`

### T-003 Domain purchase and host redirects
1. Buy **figsumo.com**. Also consider defensive registrations (`figsumo.co.uk`, `figsumo.ca`), but only redirect them; do not serve duplicate content on them.
2. In Vercel → Project → Domains: add `figsumo.com` as the primary domain, and `www.figsumo.com` as a **308/301 redirect to the apex** (or the reverse, but pick one and keep it).
3. Redirect `figsumo.vercel.app` → `https://figsumo.com` *after* launch, and only for the production alias (Vercel Domains → Edit → Redirect to). Preview URLs stay noindexed.
4. Set up email for the domain (Google Workspace, Zoho or similar) before you publish any address. Add SPF, DKIM and DMARC records.

**AC:** `curl -sI https://www.figsumo.com/` gives a 301/308 to `https://figsumo.com/`. `curl -sI http://figsumo.com/` redirects to https. Mail sent to the contact address arrives.
**Test:** the curl commands above, then send a test email.

### T-004 Real 404s (soft-404 bug)
`https://figsumo.vercel.app/this-does-not-exist-xyz` returns **HTTP 200** with the homepage title (`x-matched-path: /[slug]`, meta robots noindex). Google treats this as a soft 404, and any URL produces a 200 "page". Re-checked on 14 Oct 2026 at 01:25 PKT: the **first** request to a new unknown slug returns 200, and later requests return a cached 404 (`x-vercel-cache: HIT`). That is ISR fallback behaviour, so crawlers that hit a fresh URL still get a soft 404. Always test with a fresh random path. `/terms` and `/ads.txt` returned 404 in that re-check (no page exists yet; see T-701 and T-802).
- In `app/[slug]/page.tsx`:
```ts
import { notFound } from 'next/navigation';
export const dynamicParams = false;                       // only slugs from generateStaticParams exist
export function generateStaticParams() { return registry.map(c => ({ slug: c.slug })); }
export default function Page({ params }) { const calc = getCalc(params.slug); if (!calc) notFound(); /* ... */ }
```
   Apply the same guard in `generateMetadata`.
- Add `app/not-found.tsx` with: an H1 "Page not found", a site search box, links to the four hubs and the six most-used calculators, and no ads.

**AC:** Any unknown path returns status **404**, shows the custom page, and carries `noindex`. Known slugs still return 200.
**Test:** `curl -s -o /dev/null -w "%{http_code}" https://figsumo.vercel.app/xyz-not-real` → `404`.

### T-005 Sitemap with real lastmod
Today every `<lastmod>` is the request time, every entry has `changefreq weekly` and a `priority`, and all URLs use the hard-coded domain.
- Add `updated: 'YYYY-MM-DD'` to each registry entry (and to each content file's front matter; see `content/`). Bump it only when the calculator logic or page content really changes.
- `app/sitemap.ts`:
```ts
export default function sitemap(): MetadataRoute.Sitemap {
  if (!IS_PRODUCTION_SITE) return [];
  return [...staticPages, ...registry.filter(c => c.indexable)].map(p => ({
    url: `${SITE_URL}${p.path}`, lastModified: new Date(p.updated),
  }));
}
```
- Do not output `changeFrequency` or `priority`. Google ignores both.
- Leave out `/embed/*` widget pages and any page marked `noindex`.
- If the sitemap grows past about 1,000 URLs, split it with `generateSitemaps`.

**AC:** Two fetches a minute apart return byte-identical sitemaps. Each `lastmod` equals the page's `updated` date. There are no `changefreq` or `priority` tags. Every URL in the sitemap returns 200, is self-canonical and is indexable.
**Test:** `diff <(curl -s $URL/sitemap.xml) <(sleep 60; curl -s $URL/sitemap.xml)`, followed by a script that requests every `<loc>` and checks for status 200 and a self-referencing canonical.

### T-006 Search Console and Bing at launch
Verify the domain property (DNS TXT), submit the sitemap, and add Bing Webmaster Tools by importing from GSC. **AC:** sitemap status "Success". **Test:** check in GSC 48 hours after submitting.

---

## P1 — Visible bugs

### T-201 "Payment breakdown" chart shows `$` on non-money values
The shared breakdown chart always formats values as USD and always uses the label "Payment breakdown". The bug is visible on: BMR ("$1,648.75" kcal), body-fat ("Total $100.00 · Body fat 16% · $16.15"), concrete, tile, mulch, gravel and roofing (ft³/ft² shown in $), percentage, interest, interest-rate and tip.
- Change the chart component (e.g. `components/BreakdownChart.tsx`) to take `{ title: string; unit: UnitSpec; items: {label, value}[] }`, where:
```ts
type UnitSpec = { kind: 'currency'; currency: 'USD'|'CAD'|'GBP'|'EUR' } | { kind: 'number'; suffix?: string; decimals?: number } | { kind: 'percent' };
```
  Format with `Intl.NumberFormat(locale, kind==='currency' ? {style:'currency', currency} : {...})`.
- Each registry entry declares its chart title and unit. Examples: BMR → "Calories by activity level", `{kind:'number', suffix:' kcal/day', decimals:0}`. Body fat → "Body composition", percent. Do not render a chart where it adds nothing (e.g. tip with a single value).
- Body fat: do not invent a $100 total. Show percent only, or add an optional weight input and show fat mass and lean mass in kg/lb.

**AC:** No `$`, `£` or `C$` appears on any non-money calculator. The chart title describes the data. A snapshot test covers each calculator that uses the chart.
**Test:** in Playwright, load each affected slug, compute, and assert that the chart region text does not match `/[$£€]/` unless the calculator's unit is currency.

### T-202 Same chart, currency pages: the symbol follows locale/country (see T-224)

### T-210 Sensible defaults on every calculator
These 32 pages ship at least one empty input (crawl on 13–14 Oct). Most show "Enter a valid …" on first Calculate:
`anorexic-bmi, bac, bmi, bmr, body-surface-area, body-type, calorie, calories-burned, carbohydrate, conception, due-date, fat-intake, healthy-weight, ideal-weight, lean-body-mass, macro, ohms-law, one-rep-max, overweight, ovulation, pace, percent-error, period, pregnancy, pregnancy-conception, pregnancy-weight-gain, protein, target-heart-rate, tdee, triangle, weight-watcher-points, z-score`.
- Default values (they match the worked examples in `content/`, so users see the same numbers as the text):
  - BMI: 82 kg, 178 cm (imperial: 180 lb, 5 ft 10 in)
  - BMR: male, 40 y, 85 kg, 180 cm
  - Calorie and TDEE: female, 35 y, 65 kg, 165 cm, moderate activity
  - Body fat: already has defaults. Keep them, or align with content (male 178/39/90 cm).
  - Due date, ovulation, period, conception and pregnancy week: LMP = today − 70 days, computed on the client at render time (see the note below). Cycle length 28.
  - Ohm's law and triangle are "solve for the missing value" tools. Pre-fill two values and leave the target field empty but clearly labelled "leave blank to solve".
  - Z-score: x = 85, μ = 70, σ = 10. Percent error: experimental 9.6, true 9.81.
  - Pace: 5 km in 25:00. One-rep max: 100 kg × 5. Target HR: age 40. Protein: 70 kg, 1.0 g/kg.
- **Date defaults** must be computed on the client after hydration, or the prerendered HTML holds a stale date. Render an empty field plus a skeleton on the server, then set it in `useEffect`. Alternatively keep the date in the URL (T-221).
- Remove the line "defaults are editable examples" anywhere a default doesn't exist.

**AC:** Every calculator shows a valid result on first load, without the user pressing anything (see T-220), and no page shows a validation error before the user has typed.
**Test:** Playwright across all slugs: load, wait 500 ms, assert the results region is visible and has no "Enter a valid" text.

### T-211 Z-score calculator rejects valid input
The 13 Oct review got "Enter valid numbers" after filling x, mean and std. Check:
1. The state binding: field `id="std"` versus the key the compute function reads (e.g. `sigma`).
2. Parsing: `parseFloat` on an empty `type=number` value, or a locale decimal comma.
3. A `σ > 0` check that uses the wrong operator.

Add a percentile output, Φ(z), using a standard normal CDF with an accurate erf implementation (error < 1e-7).
**AC:** x = 85, μ = 70, σ = 10 → z = 1.5, percentile 93.32%. Negative x and decimal σ work. σ ≤ 0 shows "Standard deviation must be greater than 0".
**Test:** unit test plus a Playwright fill-and-check.

### T-212 UK mortgage page is the US calculator with `$`
`/mortgage-calculator-uk` shows "Monthly payment $2,528.27". That is the same output as the US page (400,000 at 6.5% over 30 years). See T-402 for the rebuild. **Quick fix today:** use the GBP formatter and UK defaults (£250,000 at 4.5% over 25 years).

### T-213 Several calculators are clones of the generic loan form
`refinance`, `fha-loan`, `va-mortgage`, `student-loan` and `payment` take the same four inputs (amount, rate, years, months) and produce the same output as `loan-calculator`. `amortization` and `mortgage-amortization` are the same tool too. This counts as duplicate content and a broken promise to the user. Fix them in T-404/T-405, or merge and 301 them (GAP-ANALYSIS §5).

---

## P1 — Tax-year data and correctness (YMYL)

### T-301 One versioned tax-data module with sources
Create `lib/tax/` with one file per jurisdiction and tax year. Each table carries its source:
```ts
// lib/tax/us/2026.ts
export const US_2026 = {
  taxYear: 2026, verified: '2026-10-14',
  source: 'https://www.irs.gov/newsroom/irs-releases-tax-inflation-adjustments-for-tax-year-2026-including-amendments-from-the-one-big-beautiful-bill',
  standardDeduction: { single: 16100, mfj: 32200, hoh: 24150 },
  brackets: { single: [[12400,.10],[50400,.12],[105700,.22],[201775,.24],[256225,.32],[640600,.35],[Infinity,.37]],
              mfj:    [[24800,.10],[100800,.12],[211400,.22],[403550,.24],[512450,.32],[768700,.35],[Infinity,.37]] },
  fica: { ssRate: .062, ssWageBase: 184500, medicareRate: .0145, addlMedicareRate: .009,
          addlMedicareThreshold: { single: 200000, mfj: 250000 } },   // SSA cbb.html; IRS Topic 560
  retirement: { k401Deferral: 24500, k401CatchUp50: 8000, k401CatchUp60to63: 11250, annualAdditions415c: 72000,
                ira: 7500, iraCatchUp50: 1100, rothPhaseOut: { single: [153000,168000], mfj: [242000,252000] } }, // IR-2025-111; Notice 2025-67
  estateBasicExclusion: 15000000,
};
```
Write the same structure for `ca/2026.ts` and `uk/2026-27.ts`. The values are in the appendix at the end of this file, and each value has its URL there.
- The UI shows **"Tax year 2026 · rates verified 14 Oct 2026 · source"** next to every tax result.
- When the IRS publishes the 2027 revenue procedure (the IRS 2026–2027 Priority Guidance Plan lists it for October 2026: https://www.irs.gov/pub/irs-counsel/2026-2027-initial-pgp.pdf), add `us/2027.ts` and a tax-year selector. **Do not use projections** from private publishers.

**AC:** No tax constant lives outside `lib/tax/**`. Each exported table has `taxYear`, `verified` and `source`. Unit tests reproduce every worked example in `content/*income-tax*` and `content/*take-home*`/`*paycheck*` to the cent.
**Test:** `npm test -- tax`. Also search `components` and `app` for literals like `0.0765`, `12400` and `16100`; expect zero hits.

### T-302 US income tax calculator uses **2024** brackets (unlabelled)
At $75,000 single, staging shows $11,553.00. That is exactly the 2024 schedule (10% to $11,600, 12% to $47,150, 22% above). The 2026 figure for $75,000 of **taxable** income is $11,212.00 (1,240 + 4,560 + 22% × 24,600 = 5,412). Switch to `US_2026` and label the tax year.
**AC:** $75,000 single taxable income → $11,212.00. $90,000 wages, single, standard deduction → $10,970.00 (content example).

### T-303 Paycheck calculator ignores the standard deduction (overstates tax)
Defaults: $5,000/month gross, $300 pre-tax, single. Staging shows federal tax $621.75/month. That figure is the 2024 brackets applied to $56,400/yr with **no standard deduction**. Under 2026 rules it is $4,808/yr ($400.67/month): taxable = 56,400 − 16,100 = 40,300 → 1,240 + 12% × 27,900.

FICA of 7.65% × $5,000 = $382.50 is right for 401(k)-type deferrals. Section 125 cafeteria-plan deductions (health premiums, FSA, HSA via payroll) also reduce FICA wages, so add a "pre-tax type" option: 401(k)/403(b) (reduces income tax only) or cafeteria plan (reduces income tax and FICA).
**AC:** The defaults give $400.67 federal tax per month on the annualized method. Label: "annualized estimate; your employer's W-4/Pub 15-T withholding can differ". Link to the IRS Tax Withholding Estimator (https://www.irs.gov/individuals/tax-withholding-estimator).

### T-304 Estate tax default exemption is the 2024 figure
The default "Federal exemption" is **$13,610,000** (2024). For 2026 it is **$15,000,000** (IR-2025-103). Read it from `US_2026.estateBasicExclusion`.

### T-305 IRA/Roth defaults are 2025 limits
Roth and IRA default contributions are $7,000. The 2026 limit is **$7,500**, plus $1,100 catch-up at 50+. Warn when an input exceeds the limit. 401(k): show the $24,500 deferral limit and the catch-ups, and warn when salary × % is above it.

### T-306 Compounding and timing conventions differ between calculators and aren't shown
From matching staging outputs: 401(k) and Roth compound **annually** with **end-of-year** contributions (80k/6%/50% match to 6%/25y/7%/25k start → $591,078.89 reproduces exactly with annual compounding). Retirement, investment and compound interest compound **monthly**. Each is fine on its own, but the convention must be stated and match the page text.
- Add `assumptions: string[]` to each registry entry and render it under the result (e.g. "Monthly compounding; contributions at the end of each month").
- Recommended: let users choose the contribution timing (start/end) and the compounding period on investment-type calculators.

**AC:** Every growth calculator lists its compounding and timing under the result. The golden tests from `content/` pass.

### T-307 Marriage tax calculator
Confirm the tax year it uses (probably 2024, as in T-302) and move it to `US_2026`.

### T-308 GFR calculator: confirm the equation
Confirm it implements the race-free CKD-EPI 2021 creatinine equation (Inker et al., N Engl J Med 2021) and show the equation's name on the page. **VERIFY** in code. If it uses an older race-based equation, replace it.

### T-309 Army body fat: confirm the method
The Army changed its body-fat assessment in 2023 (one-site abdominal tape; AR 600-9 / Army Directive 2023-08 — **VERIFY** both). The current page uses neck, abdomen and hip. Either label it "multi-site circumference method (pre-2023)" or implement the current method after reading the regulation.

### T-310 Formula golden tests
Add `tests/golden/*.test.ts`. For each calculator with a file in `content/`, assert the worked-example numbers in that file (all double-checked in Python while this pack was prepared; see the AC lines in T-4xx/T-5xx). Run them in CI on every PR.

---

## P2 — SEO infrastructure

### T-101 Per-page metadata from the registry
- Add `seo: { title, description, h1 }` to every registry entry, loaded from `on-page-seo.csv` (convert it once into `lib/calculators/seo.json`).
- In `app/[slug]/page.tsx`:
```ts
export async function generateMetadata({ params }): Promise<Metadata> {
  const c = getCalc(params.slug); if (!c) return {};
  return { title: { absolute: c.seo.title }, description: c.seo.description,
           alternates: { canonical: c.path, languages: c.hreflang /* T-108 */ },
           openGraph: { title: c.seo.title, description: c.seo.description, url: c.path, type: 'website', locale: c.ogLocale },
           twitter: { card: 'summary_large_image' } };
}
```
- Remove the "Free online X calculator." template description everywhere.
- **Brand casing:** the site uses "Figsumo" and the brief uses "FigSumo". Choose one and use it in titles, the logo, schema and legal pages. This pack uses **FigSumo** (VERIFY with Arhum).
- Homepage: H1 "Free calculators for money, health and everyday maths". Meta: "Free, fast calculators for mortgages, loans, tax and take-home pay in the US, Canada and UK, plus health and maths tools, with formulas and worked examples."

**AC:** Every indexable page has a unique title of 30–70 characters and a unique description of 110–160 characters (the CSV meets this), and the H1 matches the CSV.
**Test:** a script crawls the sitemap, checks lengths and uniqueness, and diffs against the CSV.

### T-102 JSON-LD
Output one `<script type="application/ld+json">` holding an `@graph` per page. Examples are in ONPAGE-SEO.md §5.
- **All pages:** `Organization` (only `name`, `url`, `logo`, and `sameAs` once real profiles exist; no invented address or phone) and `WebSite`. Keep the homepage `SearchAction` **only if** `/search?q=` returns real result pages. VERIFY: I found no search results route on staging.
- **Calculator pages:** `WebApplication` with `applicationCategory` set to `FinanceApplication` / `HealthApplication` / `EducationalApplication` / `UtilitiesApplication`, `operatingSystem: "Any"` and `offers.price "0"`, plus `BreadcrumbList`, plus `FAQPage` **only when the same Q&A text is visible on the page**.
  - Google shows FAQ rich results only for well-known authoritative government and health sites, so do not expect FAQ snippets. The markup is still valid.
  - No `aggregateRating` (there are no real reviews). No `HowTo` (Google has removed HowTo rich results).
- **Hub pages:** `CollectionPage` + `ItemList` of their calculators + `BreadcrumbList`.
- **About:** `AboutPage`. **Contact:** `ContactPage`.
- `author` / `reviewedBy` as `Person` only for real, named people (T-705).

**AC:** Google Rich Results Test and validator.schema.org show 0 errors on: home, one hub, mortgage, BMI, about.
**Test:** run both validators. Staging works for validation even with noindex.

### T-103 Breadcrumb UI
The current breadcrumb ("Figsumo / Financial") is a `<p>`.
- Change it to `<nav aria-label="Breadcrumb"><ol>…</ol></nav>` with `aria-current="page"` on the last item.
- Path: Home › Hub › Page, e.g. `Home › Money › UK Mortgage Calculator`, using the new taxonomy (T-106).
- Generate the UI and the `BreadcrumbList` JSON-LD from the same data.

**AC:** Every non-home page has the nav, and its JSON-LD items match the visible text and URLs.
**Test:** axe shows no landmark issues, and the Rich Results Test detects the breadcrumb.

### T-104 Internal linking: related calculators
The sidebar currently shows the same 15 financial links on every financial page.
- Add `related: string[]` (4–8 slugs, hand-picked) to each registry entry. Example: mortgage → down-payment, house-affordability, refinance, amortization, us/pmi, rent-vs-buy. Fall back to the same hub.
- The content files in `content/` already contain in-text links using the **new** URLs. Render them through Next `<Link>`.
- Country cross-links: "Also available for: Canada · UK".
- Rules: ONPAGE-SEO.md §4.

**AC:** Every calculator page links to ≥4 related calculators and to its hub. Every new page has ≥3 inbound internal links. A crawl finds no orphans.

### T-105 Render the long-form content
- Store the files in `content/` as MDX (or Markdown + front matter) and render them below the calculator inside `<article>`. Order: intro (1–2 sentences, above the calculator) → calculator → "Understanding your result" → How to use → Formula → Worked examples → Country notes → FAQ → Sources → Disclaimer → byline / updated date.
- The **front matter** (`title`, `description`, `h1`, `url`, `updated`, `taxYear`, `calculatorRequirements`) is the source of truth for that page's metadata.
- Formulas: render with KaTeX at build time, or as preformatted text. No client-side MathJax.
- Tables: `<caption>`, wrapped in a horizontally scrollable `div` that has `tabindex="0"`, `role="region"` and an `aria-label`.

**AC:** The 30 pages in `content/` render every section, and their FAQs drive the FAQPage JSON-LD (T-102). Rendered unique text is ≥900 words on each of them.

### T-106 Taxonomy, hubs and 301s (stop mirroring calculator.net)
Apply the URL changes in `on-page-seo.csv` (columns `new_url`, `redirect_301`, `status`) and GAP-ANALYSIS §5.
- In `next.config.js`, `async redirects()`: one entry per row with `redirect_301`, `permanent: true`. Next sends 308, which Google treats like 301. Include the old hubs:
  - `/financial-calculators → /money`
  - `/fitness-health-calculators → /health`
  - `/math-calculators → /math`
  - `/other-calculators → /everyday`
  - `/calculators-for-your-site → /embed`
- Country routes: `app/[country]/[slug]/page.tsx` with `country ∈ {us, ca, uk}` and `dynamicParams = false` (or three static folders).
- Hubs get an original intro (100–200 words), grouped sections and ItemList schema.

**AC:** Every old URL returns exactly one 301/308 hop to its new URL (no chains). Every new URL returns 200. The sitemap holds only new URLs. Internal links point at final URLs (no internal redirects).
**Test:** a script reads the CSV, requests every `current_url`, asserts `Location == new_url`, then requests the new URL and expects 200.

### T-107 Country URL strategy (decision)
**Recommendation: country sub-folders for country-specific tools; one global URL for universal tools.**
- Country-specific: `/us/income-tax-calculator`, `/ca/income-tax-calculator`, `/uk/income-tax-calculator`, and the same for take-home pay, mortgages (CA, UK), stamp duty, RRSP, TFSA, ISA, 401(k) and so on. The rules, inputs and sources really differ, so each is its own document with its own content, tax year and disclaimer.
- Universal tools (loan, compound interest, BMI, percentage, …): **one URL**, with currency and units set by a toggle that defaults from the browser locale (T-223/T-224). No country copies; they would be near-duplicates.
- **Why not a single page with a country selector for tax and pay:** people search per country ("uk take home pay calculator", "ontario income tax calculator"). A selector puts three different documents behind one URL, so Google can index only one title and one body of text. It also mixes three sets of sources. Instead, each country page has a selector that *navigates* to its sibling URL (T-225).
- **Why not ccTLDs or subdomains:** they split authority across hosts and add cost, with no benefit at this size.
- Keep the US mortgage at `/mortgage-calculator` (largest market, head term), and put the CA and UK versions under `/ca/` and `/uk/`.

### T-108 hreflang (only between real equivalents)
Add hreflang **only** within clusters of pages that answer the same question for different countries:

| Cluster | en-US | en-CA | en-GB | x-default |
|---|---|---|---|---|
| Income tax | /us/income-tax-calculator | /ca/income-tax-calculator | /uk/income-tax-calculator | /us/income-tax-calculator |
| Take-home pay | /us/paycheck-calculator | /ca/take-home-pay-calculator | /uk/take-home-pay-calculator | /us/paycheck-calculator |
| Mortgage | /mortgage-calculator | /ca/mortgage-calculator | /uk/mortgage-calculator | /mortgage-calculator |
| Capital gains (when built) | /us/capital-gains-tax-calculator | /ca/capital-gains-tax-calculator | /uk/capital-gains-tax-calculator | /us/… |

Each page in a cluster lists every member, including itself, with absolute URLs from `SITE_URL`. In Next metadata: `alternates.languages = { 'en-US': …, 'en-CA': …, 'en-GB': …, 'x-default': … }`.
Do **not** add hreflang to universal pages, or between pages that aren't equivalents (an RRSP page is not the Canadian version of a 401(k) page).

**AC:** Cluster pages carry reciprocal tags that include themselves, and every target returns 200 and is self-canonical.
**Test:** an hreflang checker on each cluster after launch.

### T-109 Open Graph images
Add `app/[slug]/opengraph-image.tsx` with `ImageResponse`: calculator name, one-line value proposition, brand, 1200×630.
**AC:** every page has an `og:image` that returns 200 `image/png`.

### T-110 Homepage
Today the H1 is "Figsumo" and the description only covers the scientific calculator. Rebuild it with: H1 + intro, a search box, a country quick-switch (US / CA / UK money tools), popular calculators by hub, and "Updated for tax year 2026 (US, Canada) and 2026/27 (UK)".

---

## P2 — Calculator UX (live results, state, units, currency)

### T-220 Live results
Compute on input change (debounced about 150 ms) as well as on the button. Keep the Calculate button for keyboard and screen-reader users and for heavy work (360-row schedules).
- The results container gets `aria-live="polite"` and `aria-atomic="true"`. Announce only the primary result, not tables.
- Do not move focus when results update.

**AC:** Typing updates the result within 300 ms on a mid-range phone, and a screen reader announces the new primary value once.
**Test:** a Playwright `fill()` with no click shows the updated value.

### T-221 Shareable result URLs (query params)
- Sync inputs ↔ query string, e.g. `?price=400000&down=20&rate=6.5&years=30`, using `useSearchParams` + `router.replace` (no history spam). Each registry field declares its short key.
- Validate and clamp params on load, and ignore unknown keys. Never put personal data in the URL.
- **The canonical stays the clean path** (no params).
- Add "Copy link to these results" and "Print". The `@media print` CSS hides the nav and ads, and shows inputs, results and the date.

**AC:** A copied URL opened in a fresh browser shows identical results. The canonical has no query string. `rate=abc` falls back to the default and shows a notice.

### T-222 Input validation
- Every field has `min`, `max`, `step` and `required` in the registry.
- Errors appear inline, linked with `aria-describedby`, and the field gets `aria-invalid="true"`.
- Money fields accept thousands separators and a leading currency symbol ("320,000", "£250,000"). They are reformatted on blur and parsed locale-aware.
- Reject negatives where they make no sense. Implausible adult health inputs (e.g. height < 100 cm or > 250 cm) get a gentle warning.

**AC:** The UI never shows `NaN`, `Infinity` or a blank result. Every error names the field and the allowed range.

### T-223 Unit toggles (imperial ↔ metric)
- One `UnitSystem` context (`metric | imperial`) for health, construction, fuel, speed and temperature tools.
- Default from locale: en-US → imperial; en-CA → metric; en-GB → metric, but offer stones/lb for body weight.
- Persist the choice in `localStorage` (functional storage; listed in the Privacy page).
- Switching converts the current values (82 kg ↔ 180.8 lb; 178 cm ↔ 5 ft 10.1 in) instead of clearing them.
- Today both the cm and the ft/in fields are in the HTML. The inactive set must be `hidden`/`inert`, not only visually hidden.
- Exact factors: 1 lb = 0.45359237 kg and 1 in = 2.54 cm (exact by definition; NIST SP 811, https://www.nist.gov/pml/special-publication-811).

**AC:** Toggling either way keeps BMI identical to one decimal place.
**Test:** unit tests on the conversion helpers.

### T-224 Currency by locale (USD, CAD, GBP)
- Universal money calculators: a currency selector (USD / CAD / GBP / EUR), defaulting from `navigator.language` (en-US → USD, en-CA → CAD, en-GB → GBP, otherwise USD). Format with `Intl.NumberFormat`.
- Country pages force their currency (`/us/` USD, `/ca/` CAD, `/uk/` GBP) and show no selector.
- Do **not** choose currency on the server by geo-IP: pages stay static and identical for Googlebot. The client may switch after hydration, so reserve the width to avoid layout shift.

**AC:** With an en-GB browser, `/loan-calculator` shows £ in results, charts and tables alike. One page never mixes currency symbols.

### T-225 Country selector where relevant
- Cluster pages (T-108): a segmented control "US · Canada · UK" that **navigates** to the sibling URL and carries comparable inputs (e.g. salary) in the query string.
- Canadian pay/tax pages: a province selector.
- UK pay/tax pages: "England, Wales & NI" vs "Scotland".

### T-226 Results explanation
- Each result shows the primary figure, 2–4 secondary figures, and one plain-language sentence built from the user's numbers. Example: "Over 30 years you would pay $408,142 in interest, about 1.28 times the amount borrowed."
- No advice wording ("you should …").
- Show the assumptions (T-306).

### T-227 Schedules and tables
- Monthly and yearly views. Real `<table>` markup with `<th scope>`.
- For long schedules, show the yearly view by default and expand on demand, or virtualise the list.
- CSV download, generated in the browser.

### T-228 Currency converter: replace the fixed rate
Today it uses 1 USD = 0.92 with no date. Options:
- ECB euro reference rates (https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/index.en.html), or
- Bank of Canada daily rates for CAD pairs (https://www.bankofcanada.ca/rates/exchange/daily-exchange-rates/).

Fetch at build, or with ISR every 24 h, and show "Reference rate from [source], [date]". Check each provider's reuse terms first (VERIFY). State that banks and card issuers add their own margin.
**AC:** Every result shows the rate, its date and its source. The rate is never older than 4 calendar days.

### T-229 Keep calculations in the browser
Inputs are never sent to a server. The Privacy page states this, so add a test that no `fetch`/XHR fires on input change (except T-228 rate loading).

---

## P2 — Feature upgrades the top-30 content depends on
Each file in `content/` has a `calculatorRequirements` block in its front matter. These tasks make the calculators match the text. The numbers in each AC were computed independently in Python.

### T-401 US mortgage calculator
**Inputs:**
- home price
- down payment ($ or %)
- term (10/15/20/30 or custom)
- rate
- start month
- property tax ($/yr or % of price)
- homeowners insurance ($/yr)
- PMI, applied automatically when the down payment is under 20%: an annual % of the loan, default 0.5% and editable, labelled "illustrative; your lender's quote will differ"
- HOA ($/mo)
- extra monthly / yearly / one-time payments

**Outputs:**
- monthly principal and interest (P&I), tax, insurance, PMI and HOA, plus their total
- total interest and payoff date
- the month PMI can be cancelled on request (scheduled balance ≤ 80% of original value) and the month it ends automatically (78%), per CFPB
- the full schedule

**AC:**
- $400,000 home, 20% down, 6.5%, 30 y, tax 1.1%/yr, insurance $1,800/yr → P&I **$2,022.62**, monthly total **$2,539.28**, total interest **$408,142.36**.
- 10% down, PMI 0.5% → P&I **$2,275.44**, PMI **$150.00**, total **$2,942.11**. 80% of original value reached at **payment 95**, 78% at **payment 109**.

### T-402 UK mortgage calculator (`/uk/mortgage-calculator`)
- GBP throughout.
- Inputs: property price, deposit (£ or %) with LTV shown, term up to 40 years, rate, repayment or interest-only, optional "initial fixed period" (years) plus an assumed "follow-on rate", and monthly overpayment.

**AC:**
- £250,000, 4.5%, 25 y repayment → **£1,389.58**/month (total interest £166,874.36).
- Interest-only → **£937.50**.
- 2-year fix then 6.5% → balance after 24 payments **£238,669.02**, new payment **£1,668.45**.

### T-403 Canadian mortgage calculator (`/ca/mortgage-calculator`)
- Keep the correct semi-annual compounding conversion (400k / 5% / 25 y → $2,326.42 ✔ on staging).
- Rename the confusing "Interest rate 4.949%" output to "Equivalent rate, compounded monthly", or hide it.
- Add purchase price and down payment, with a minimum down payment check (FCAC): 5% of the first $500,000; 10% of the portion from $500,000 to $1.5M; 20% at $1.5M or more.
- Add the CMHC premium by LTV, added to the loan: 4.00% (90.01–95%), 3.10% (85.01–90%), 2.80% (80.01–85%). No insurance at a price of $1.5M or more.
- Payment frequency: monthly, semi-monthly, bi-weekly, weekly, accelerated bi-weekly, accelerated weekly.
- Amortization: 25 years; 30 years if insured and the buyer is a first-time buyer or the home is a new build (CMHC premium calculator page). VERIFY current eligibility wording with FCAC before launch.
- Note that provincial sales tax applies to the premium in some provinces (ON, QC, SK) and is paid at closing. **VERIFY** with provincial sources before stating it.

**AC:**
- $500,000 price, 10% down, 5.00%, 25 y → premium **$13,950.00**, mortgage **$463,950.00**, monthly **$2,698.36**, total interest $345,556.90.
- Accelerated bi-weekly ($1,349.18) → **559** payments (about 21.5 years), total interest **$289,478.47**.
- 30-year amortization → $2,476.06/month.

### T-404 Refinance calculator (rebuild)
- Inputs: current balance, current rate, remaining term (years + months), new rate, new term, closing costs (paid or financed), points, cash-out.
- Outputs: current vs new payment, monthly change, break-even months (= costs ÷ monthly saving), remaining interest on the current loan vs the new one, and a warning when a longer new term raises lifetime cost.

**AC:** $300,000 at 7.0% with 27 y left → **$2,063.44**. New 30 y at 6.0% → **$1,798.65**, saving **$264.79**/month. $6,000 costs → break-even **22.66 months** (shown as 23). Remaining interest **$368,556.11** vs **$347,514.57**. A 25-year new term gives **$1,932.90**/month and **$279,871.26** interest.

### T-405 FHA, VA, student loan, payment calculators (de-clone or merge)
- **FHA:** upfront and annual MIP by LTV and term. **VERIFY the current HUD Mortgagee Letter rates** (find the current Mortgagee Letter on hud.gov; the old fha_info URL returned 404 on 14 Oct 2026). Without verified rates, don't present the page as an FHA calculator.
- **VA:** funding fee by down payment and first vs subsequent use, plus exemptions. **VERIFY** at https://www.va.gov/housing-assistance/home-loans/funding-fee-and-closing-costs/.
- **Student loan:** add extra payments and a payoff date. Federal repayment plans changed under the 2025 law, so **VERIFY** before modelling any income-driven plan, or state clearly that the page doesn't model them.
- **Payment calculator:** add solve-for-term, n = −ln(1 − r·P/A) / ln(1 + r), so it is a different tool from the loan calculator.

### T-406 Currency converter → see T-228

### T-407 Auto loan
- Inputs: vehicle price, cash rebate, down payment, trade-in value, amount owed on the trade-in, sales tax rate, a toggle for whether tax is charged on the price before or after the trade-in credit (state rules differ — VERIFY per state), title/registration/doc fees, "include taxes and fees in the loan", APR and term (36–84 months).
- Side-by-side comparison of 48 / 60 / 72 months.

**AC:** $35,000 price, 6% tax on the full price, $5,000 down, no fees, tax financed → amount financed **$32,100.00**. At 6.9% for 60 months → **$634.11**/month, interest **$5,946.30**. For 72 months → **$545.73**, interest **$7,192.78**.

### T-408 Credit card payoff
- Multi-card: up to 10 cards (balance, APR, minimum payment) plus a monthly budget, with avalanche (highest APR first) or snowball (smallest balance first) order.
- Monthly interest = balance × APR/12. Explain that card issuers usually apply a daily rate to the average daily balance, so statements differ slightly.
- If the payment is at or below the first month's interest, show "this payment never clears the balance".
- Rename `/credit-cards-payoff-calculator` → `/credit-card-payoff-calculator` (301).

**AC:** One card, $6,000, 22.99%, $200/month → **46 months**, interest **$3,011.78**. At $300/month → **26 months**, **$1,638.69**.

### T-409 Savings: add a "deposit needed by a date" mode
**AC:** Goal $25,000, current $5,000, $400/month, 4.0% compounded monthly → **45 months** (balance $25,193.06). The deposit needed to reach the goal in 36 months is **$507.15**.

### T-410 House affordability
- Add a back-end DTI (all monthly debts) next to the front-end ratio. Both are user-adjustable.
- Put property tax, insurance and HOA inside the housing budget.
- Label the 28%/36% defaults "a common rule of thumb, not a legal limit". CFPB notes that "different loan products and lenders will have different DTI limits".

**AC:** Income $100,000, debts $500/month, 28/36, tax + insurance $400/month, 6.5%, 30 y → housing budget $2,333.33, P&I budget $1,933.33, maximum loan **$305,874.25**, price at 20% down **$382,342.81**.

### T-411 Retirement: real (inflation-adjusted) value
Add an inflation input and an output in today's money.
**AC:** Age 40 → 67, $80,000 saved, $800/month, 6% compounded monthly → **$1,047,856.25** nominal. At 2.5% inflation → **$537,969.11** in today's money.

---

## P3 — Core Web Vitals, accessibility, mobile

### T-601 Measure first
Run PageSpeed Insights (mobile) on the home page, mortgage, BMI and one hub, and record LCP, INP, CLS and TBT in `docs/perf-baseline.md`. Targets (Google "good" at the 75th percentile, https://web.dev/articles/vitals): **LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1**. These were not measured in the 13 Oct review.

### T-602 JavaScript weight
Each calculator ships only its own logic: `next/dynamic` per calculator, keyed from the registry. Check with `@next/bundle-analyzer`.
**AC:** first-load JS on `/bmi-calculator` within a budget you set from the T-601 baseline. Suggested: 130 kB gzipped or less (VERIFY against the baseline).

### T-603 Fonts
The site already preloads a woff2 through `next/font`. Keep `display: 'swap'` and the default `adjustFontFallback`, which keeps font-swap CLS low. Use 2 weights at most.

### T-604 Images
`next/image` with explicit width/height for every raster image, SVG for icons, AVIF/WebP through Next image optimisation.

### T-605 CLS sources to pre-empt
- Reserve height for the results panel (min-height before the first result), charts (a fixed aspect-ratio box), the consent banner (overlay, not push-down) and future ad slots (fixed min-height, T-803).
- Currency/unit switching after hydration must not change widths. Use `font-variant-numeric: tabular-nums`.

### T-606 Accessibility (WCAG 2.2 AA)
- Inputs already have `<label for>`. Keep them, and put units in the label text ("Interest rate (%)") as well as in the visual suffix.
- Group related inputs with `<fieldset><legend>` (height ft + in, sex, units).
- Errors use `aria-describedby` + `aria-invalid` (T-222). The results region uses `aria-live="polite"` (T-220).
- Charts get `role="img"` with a text summary in `aria-label`, plus the data table. No legend may rely on colour alone.
- Text contrast ≥ 4.5:1. Check the `text-ink/40` and `text-ink/45` placeholder classes, which look likely to fail (VERIFY with a contrast checker).
- A visible focus ring on every control (`focus:ring-2` exists; keep it and use `:focus-visible`).
- Keyboard: tab order follows visual order, and Enter in a field computes. "Clear" asks for confirmation or can be undone.
- Skip link: "Skip to calculator".
- `lang="en"` exists. Set `en-US`, `en-CA` or `en-GB` on country pages.
- Target size ≥ 24×24 CSS px (SC 2.5.8).

**AC:** axe-core finds 0 serious/critical issues on the 30 content pages and the hubs. Manual keyboard and screen-reader passes (NVDA or VoiceOver) on mortgage, BMI, UK take-home and due date.

### T-607 Mobile layout
- At 360 px wide: full-width inputs, `inputmode="decimal"` on numeric fields, results directly under the form, and the related-calculators sidebar below the content.
- Tables scroll inside their own container (T-105). The page body never scrolls sideways.

**AC:** Lighthouse mobile shows no "content wider than screen" warning.
**Test:** Playwright screenshots at 360×740 and 768×1024 for the 30 pages.

### T-608 Stay static
Pages are prerendered today (`x-nextjs-prerender: 1`). Don't call `cookies()` or `headers()` in calculator pages, because that would make them dynamic. The middleware in T-001 only adds a header.

### T-609 Error monitoring
A client error reporter (Sentry or similar) with PII scrubbing, and **no input values** in payloads (privacy promise).

### T-610 Print stylesheet (see T-221)

---

## P2 — Trust pages, authorship, methodology

### T-701 Publish the site pages
- Publish `content/site/*.md` as `/about`, `/contact`, `/privacy`, `/terms`, `/disclaimer` and `/methodology`.
- `/terms` currently returns the homepage with status 200 (the soft-404 route); T-004 plus this task fix it.
- Footer links to all six on every page.

**AC:** All six return 200 with unique titles and are in the sitemap. Every `[PLACEHOLDER]` is replaced before launch.

### T-702 "Updated" and "Reviewed" dates
Show front-matter `updated` under the H1 as "Updated 14 Oct 2026" in a `<time datetime>` element. Add "Reviewed" only if a named reviewer exists. It must equal the sitemap lastmod (T-005).

### T-703 Tax-year banner
On every tax and pay page: "Tax year 2026 (US/Canada) · 2026/27 (UK: 6 April 2026 to 5 April 2027) · rates checked 14 Oct 2026", with links to the sources.

### T-704 Sources block
Render the content file's sources as a numbered list (publisher, title, URL, date accessed).

### T-705 Bylines
- "Built by Arhum Waheed, developer", linking to `/about`. **Do not present Arhum as a financial or medical reviewer** unless he holds the qualification.
- For YMYL pages, say honestly "Formulas checked against the official sources listed; not reviewed by a licensed tax, financial or medical professional". Alternatively, engage a qualified reviewer (e.g. a CPA or Enrolled Agent; a CPA in Canada; a UK chartered accountant or tax adviser; a registered dietitian or physician) and show their name, credential and review date.
- `Person` schema only for real people.

### T-706 Contact form
- Fields: name, email, message, with the page URL filled in automatically. Add a honeypot field and rate limiting, and deliver via a transactional email provider.
- No mailto link until the domain's mail works (T-003).
- Add "Report an error on this page" on every calculator, with the slug pre-filled.

---

## P3 — Consent, ads, analytics (before applying to AdSense)

### T-801 Consent banner for UK/EEA/Switzerland
- Use a **Google-certified CMP that implements the IAB TCF v2.2**. Google requires one when serving ads to users in the EEA, the UK and Switzerland. VERIFY the current AdSense help article before launch: https://support.google.com/adsense/answer/13554116.
- Implement **Google Consent Mode v2**. In EEA/UK/CH, `ad_storage`, `ad_user_data`, `ad_personalization` and `analytics_storage` default to `denied` until the user consents. Set the consent defaults before any Google tag loads.
- "Reject all" must be as easy to use as "Accept all" (UK ICO cookie guidance: https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guide-to-pecr/cookies-and-similar-technologies/).
- A "Cookie settings" link in the footer reopens the dialog.
- The unit/currency preference in `localStorage` is functional storage. List it in the Privacy page.
- US state privacy laws (e.g. California opt-out of sale/sharing, Global Privacy Control) and Quebec Law 25: **VERIFY** the obligations before monetising, and choose a CMP that supports them.

**AC:** In a UK/EEA session (via VPN), no Google advertising or analytics cookies are set before consent, Reject works, and the choice is remembered.
**Test:** DevTools → Application → Cookies, plus Tag Assistant's consent view.

### T-802 ads.txt placeholder
`/ads.txt` returned the homepage HTML with status 200 in the 13 Oct review, and 404 on 14 Oct 2026 at 01:25 PKT. Either way the file is missing. Add `public/ads.txt`:
```
# FigSumo ads.txt
# After AdSense approval, replace the line below with the exact line shown in your AdSense account (Sites > ads.txt), then uncomment it.
# google.com, pub-0000000000000000, DIRECT, f08c47fec0942fa0
```
The `f08c47fec0942fa0` certification ID is the one Google shows in its ads.txt guidance. Copy the exact line from your account (VERIFY).
**AC:** `curl -sI https://figsumo.com/ads.txt` → 200 with `content-type: text/plain`.

### T-803 Ad slots (later)
Fixed-size containers in three places: under the result, after the FAQ, and an optional desktop sidebar. Never between an input and its label, never above the calculator on mobile, and never inside result tables. Reserve their heights to avoid CLS.

### T-804 Analytics
- Pick one: GA4 under Consent Mode, or a cookieless tool (Vercel Web Analytics or Plausible both say they don't use cookies; VERIFY in their current docs).
- Events: `calculate` (slug only), `share_link`, `print`, `unit_toggle`, `currency_change`. **Never send input values or results.**

**AC:** No analytics request contains input values (check the network tab).

### T-805 AdSense readiness gate
Apply only when all of these are true:
- the domain is live (T-003)
- trust pages are published (T-701)
- the top 30 pages carry their content
- there are no soft 404s
- consent works

Recommendation: keep calculators that still have only the boilerplate text **noindex** until their content batch ships. Thin template pages risk a low-value-content rejection.

---

## P4 — New calculators (specs)
Each ships with its content file (the eight in the top 30 are already written) and golden tests. The data is in the appendix.

### T-501 `/ca/take-home-pay-calculator` · T-502 `/ca/income-tax-calculator` (2026)
**Inputs:**
- annual employment income (or a per-period amount + frequency)
- province/territory
- RRSP deduction (optional)
- other income (optional)
- age 65+ (phase 2)

**Annual method:**
1. CPP: base 4.95% + first additional 1.00% on (min(income, $74,600) − $3,500); total 5.95%, max $4,230.45. CPP2: 4% on (min(income, $85,000) − $74,600), max $416.
2. EI: 1.63% × min(income, $68,900), max $1,123.07 (outside Quebec).
3. Taxable income = income − first-additional CPP − CPP2 − RRSP.
4. Federal tax = brackets(taxable) − 14% × (BPA + CPP base + EI + Canada employment amount up to $1,501).
   - BPA is $16,452, reduced to $14,829 between net income of $181,440 and $258,482. The reduction is linear across that range (VERIFY the formula in the T4032).
5. Ontario tax = ON brackets − 5.05% × (ON BPA $12,989 + CPP base + EI), then add surtax and the Ontario Health Premium.
   - Ontario's low-income tax reduction is not modelled in v1 (VERIFY the amounts in the T4032-ON). Show a note for incomes under about $25,000.

**Provinces:**
- **Ontario: all values verified** (appendix).
- **Other provinces:** brackets are verified. BPA, surtax, low-income reductions and health premiums are **VERIFY**. Take them from each province's T4032 (https://www.canada.ca/en/revenue-agency/services/forms-publications/payroll/t4032-payroll-deductions-tables.html).
- **Quebec** is out of scope for v1. Show "Quebec uses QPP, QPIP and its own provincial return, which this calculator does not yet support" and link to Revenu Québec.

**AC (Ontario):**
- $75,000 → CPP $4,230.45, CPP2 $16.00, EI $1,123.07, federal tax $8,258.60, Ontario $4,446.06 (incl. OHP $750), net **$56,925.83** a year (**$4,743.82** a month).
- $120,000 → federal $17,502.14, Ontario $9,385.57 (surtax $635.74, OHP $750), net **$87,342.77**.

### T-503 `/uk/take-home-pay-calculator` · T-504 `/uk/income-tax-calculator` (2026/27)
**Inputs:**
- gross pay (annual / monthly / hourly)
- region: England, Wales & NI, or Scotland
- student loan plan(s): 1, 2, 4, 5, PGL
- pension % and method: net pay / relief at source / salary sacrifice
- tax code (default 1257L)

**Rules:**
- Personal Allowance £12,570, reduced by £1 for every £2 of income over £100,000 (zero from £125,140).
- England, Wales & NI bands on taxable income: 20% to £37,700; 40% to £125,140; 45% above.
- Scotland: 19% to £3,967; 20% to £16,956; 21% to £31,092; 42% to £62,430; 45% to £125,140; 48% above.
- Employee NI, category A: 8% on £12,570–£50,270, 2% above.
- Student loans: 9% above £26,900 / £29,385 / £33,795 / £25,000 (Plans 1 / 2 / 4 / 5); 6% above £21,000 (PGL).
- The calculation is annual. Say that payslips can differ slightly: payroll works per pay period, and student loan deductions are rounded down to whole pounds each period (gov.uk examples).

**Pension methods:**
- Net pay: reduces Income Tax only.
- Relief at source: changes nothing on the payslip; the provider adds basic-rate relief, and higher-rate relief is claimed separately.
- Salary sacrifice: reduces Income Tax, NI and student loan. A cap on NI-free salary sacrifice was announced for 2029 (VERIFY before mentioning it).

**AC:**
- £40,000, England, Plan 2, no pension → tax £5,486.00, NI £2,194.40, student loan £955.35, net **£31,364.25** (£2,613.69 a month).
- Same in Scotland → tax £5,551.07, net **£31,299.18**.
- £60,000 England → tax £11,432.00, NI £3,210.60.
- £110,000 England → PA £7,570, tax £33,432.00, NI £4,210.60.
- £40,000, Plan 2, 5% net-pay pension (£2,000) → tax £5,086.00, net **£29,764.25**.

### T-505 `/uk/stamp-duty-calculator` (England & Northern Ireland)
- Standard rates: 0% to £125,000; 2% to £250,000; 5% to £925,000; 10% to £1.5m; 12% above.
- First-time buyers: 0% to £300,000, 5% from £300,001 to £500,000; no relief if the price is over £500,000.
- Additional property: +5% on every band.
- Non-UK resident: +2%.
- Notices: Scotland uses LBTT and Wales uses LTT (link both). Thresholds and exemptions for the higher rates (e.g. purchases under £40,000; VERIFY on the gov.uk higher-rates page). Linked transactions, mixed-use and leasehold rent NPV are not modelled.

**AC:**
- £295,000 standard → **£4,750** (matches the gov.uk example).
- £350,000 → standard **£7,500**; first-time buyer **£2,500**; additional property **£25,000**.
- £500,000 first-time buyer → **£10,000** (gov.uk example).
- £1,000,000 standard → **£43,750**.

### T-506 `/ca/rrsp-calculator`
- Inputs: contribution, marginal tax rate (from T-502 or typed in), expected return, years.
- Show the 2026 RRSP dollar limit of $33,810. Contribution room is 18% of the previous year's earned income up to that limit, minus pension adjustments, plus unused room.
- Over-contributions: 1% per month on the excess above $2,000 (VERIFY on CRA's over-contribution page).

**AC:** $10,000 at a 29.65% combined marginal rate → estimated refund **$2,965**. $10,000 a year for 25 years at 6% (annual) → **$548,645.12**.

### T-507 `/ca/tfsa-calculator`
- Room starts in the later of the year the user turned 18 and 2009, for years resident in Canada.
- Uses CRA's annual limits for 2009–2026 (appendix). Room = sum of limits − contributions + withdrawals (withdrawals are added back the next calendar year).

**AC:** Someone eligible since 2009 who has never contributed has **$109,000** of room in 2026. $7,000 a year for 20 years at 5% (annual) → **$231,461.68**.

### T-508 `/uk/isa-calculator`
- Annual allowance £20,000 for 2026/27.
- Lifetime ISA: up to £4,000 a year, counted in the £20,000, with a 25% government bonus up to £1,000. Open before 40; contributions until 50.
- Upcoming change: from 6 April 2027 the cash ISA limit is £12,000 for under-65s, within the £20,000 overall limit.

**AC:** £20,000 a year for 10 years at 5% (annual) → **£251,557.85**. A £4,000 LISA payment → **£5,000** with the bonus.

### T-509–T-512 (phase 2)
- US state income tax: every state's values are VERIFY against that state's revenue department.
- Canada land transfer tax: VERIFY per province, plus the Toronto municipal tax.
- CMHC premium calculator: table verified.
- UK student loan repayment: thresholds verified.

The full list is in GAP-ANALYSIS §3.

---

## Appendix — verified data (all accessed 14 Oct 2026)

### United States — tax year 2026 (returns filed in 2027)
| Item | Value | Source |
|---|---|---|
| Standard deduction | Single/MFS $16,100 · MFJ $32,200 · HoH $24,150 | IRS IR-2025-103, 9 Oct 2025: https://www.irs.gov/newsroom/irs-releases-tax-inflation-adjustments-for-tax-year-2026-including-amendments-from-the-one-big-beautiful-bill |
| Brackets, single | 10% to $12,400 · 12% to $50,400 · 22% to $105,700 · 24% to $201,775 · 32% to $256,225 · 35% to $640,600 · 37% above | same |
| Brackets, MFJ | 10% to $24,800 · 12% to $100,800 · 22% to $211,400 · 24% to $403,550 · 32% to $512,450 · 35% to $768,700 · 37% above | same |
| Estate basic exclusion | $15,000,000 | same |
| Social Security | 6.2% employee on wages up to $184,500 | SSA: https://www.ssa.gov/oact/cola/cbb.html |
| Medicare | 1.45% employee, no wage cap | SSA (same page) |
| Additional Medicare Tax | 0.9%; thresholds $200,000 single / $250,000 MFJ | IRS Topic 560: https://www.irs.gov/taxtopics/tc560 (page returned 200; threshold wording VERIFY on the page) |
| 401(k)/403(b)/457/TSP | Deferral $24,500 · catch-up 50+ $8,000 · ages 60–63 $11,250 | IRS IR-2025-111: https://www.irs.gov/newsroom/401k-limit-increases-to-24500-for-2026-ira-limit-increases-to-7500 |
| §415(c) annual additions | $72,000 | IRS Notice 2025-67: https://www.irs.gov/pub/irs-drop/n-25-67.pdf |
| IRA | $7,500 · catch-up 50+ $1,100 | IR-2025-111 |
| Roth IRA phase-out | Single/HoH $153,000–$168,000 · MFJ $242,000–$252,000 | IR-2025-111 |
| New deductions 2025–2028 | Seniors 65+: extra $6,000 (phase-out above MAGI $75,000 / $150,000 joint) · qualified tips up to $25,000 · qualified overtime premium up to $12,500 ($25,000 joint) | IRS: https://www.irs.gov/newsroom/one-big-beautiful-bill-provisions-individuals-and-workers |
| 2027 values | **Not yet published.** The IRS Priority Guidance Plan lists the revenue procedure for October 2026. Only the 2027 HSA limits are out ($4,500 / $9,000, Rev. Proc. 2026-24) | https://www.irs.gov/pub/irs-counsel/2026-2027-initial-pgp.pdf · https://www.irs.gov/pub/irs-drop/rp-26-24.pdf |
| PMI cancellation | Ask at 80% of original value; automatic at 78%, or at the loan midpoint (most loans closed on/after 29 Jul 1999) | CFPB: https://www.consumerfinance.gov/ask-cfpb/when-can-i-remove-private-mortgage-insurance-pmi-from-my-loan-en-202/ |
| DTI definition | All monthly debt payments ÷ gross monthly income; "different loan products and lenders will have different DTI limits" | CFPB: https://www.consumerfinance.gov/ask-cfpb/what-is-a-debt-to-income-ratio-en-1791/ |

### Canada — tax year 2026
| Item | Value | Source |
|---|---|---|
| Federal brackets | 14% to $58,523 · 20.5% to $117,045 · 26% to $181,440 · 29% to $258,482 · 33% above | CRA: https://www.canada.ca/en/revenue-agency/services/tax/individuals/tax-rates-brackets/current-year.html |
| AB | 8% to $61,200 · 10% to $154,259 · 12% to $185,111 · 13% to $246,813 · 14% to $370,220 · 15% above | same |
| BC | 5.6% to $50,363 · 7.7% to $100,728 · 10.5% to $115,648 · 12.29% to $140,430 · 14.7% to $190,405 · 16.8% to $265,545 · 20.5% above | same |
| MB | 10.8% to $47,564 · 12.75% to $101,200 · 17.4% above | same |
| NB | 9.4% to $52,333 · 14% to $104,666 · 16% to $193,861 · 19.5% above | same |
| NL | 8.7% to $44,678 · 14.5% to $89,354 · 15.8% to $159,528 · 17.8% to $223,340 · 19.8% to $285,319 · 20.8% to $570,638 · 21.3% to $1,141,275 · 21.8% above | same |
| NT | 5.9% to $53,003 · 8.6% to $106,009 · 12.2% to $172,346 · 14.05% above | same |
| NS | 8.79% to $30,995 · 14.95% to $61,991 · 16.67% to $97,417 · 17.5% to $157,124 · 21% above | same |
| NU | 4% to $55,801 · 7% to $111,602 · 9% to $181,439 · 11.5% above | same |
| ON | 5.05% to $53,891 · 9.15% to $107,785 · 11.16% to $150,000 · 12.16% to $220,000 · 13.16% above | same |
| PE | 9.5% to $33,928 · 13.47% to $65,820 · 16.6% to $106,890 · 17.62% to $142,520 · 19% to $200,000 · 20% above | same |
| SK | 10.5% to $54,532 · 12.5% to $155,805 · 14.5% above | same |
| YT | 6.4% to $58,523 · 9% to $117,045 · 10.9% to $181,440 · 12.8% to $500,000 · 15% above | same |
| QC | Not on the CRA page; see Revenu Québec | — |
| Federal BPA | $16,452 maximum; $14,829 minimum at net income ≥ $258,482 | CRA T4032-ON (Jan 2026): https://www.canada.ca/en/revenue-agency/services/forms-publications/payroll/t4032-payroll-deductions-tables/t4032on-jan/t4032on-january-general-information.html |
| Canada employment amount | $1,501 | same |
| Ontario BPA | $12,989 | same |
| Ontario surtax | 20% of basic Ontario tax over $5,818, plus 36% of basic Ontario tax over $7,446 | same |
| Ontario Health Premium | $0 up to $20,000 taxable income, rising in steps to $300 / $450 / $600 / $750 / $900 (full schedule in T-501 code and in content) | same |
| CPP | YMPE $74,600 · basic exemption $3,500 · 5.95% (4.95% base + 1% first additional) · max $4,230.45 | CRA: https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/payroll/payroll-deductions-contributions/canada-pension-plan-cpp/cpp-contribution-rates-maximums-exemptions.html |
| CPP2 | YAMPE $85,000 · 4% · max $416 | CRA: https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/payroll/calculating-deductions/making-deductions/second-additional-cpp-contribution-rates-maximums.html |
| EI (outside Quebec) | Maximum insurable earnings $68,900 · 1.63% · max $1,123.07 (2027: $70,800 and 1.64%) | CRA: https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/payroll/payroll-deductions-contributions/employment-insurance-ei/ei-premium-rates-maximums.html |
| RRSP dollar limit | 2026 $33,810 · 2027 $35,390 | CRA: https://www.canada.ca/en/revenue-agency/services/tax/registered-plans-administrators/pspa/mp-rrsp-dpsp-tfsa-limits-ympe.html |
| TFSA annual limits | 2009–12 $5,000 · 2013–14 $5,500 · 2015 $10,000 · 2016–18 $5,500 · 2019–22 $6,000 · 2023 $6,500 · 2024–26 $7,000 (total $109,000) | same |
| Minimum down payment | ≤ $500,000: 5% · $500,000 to under $1.5M: 5% of the first $500,000 + 10% of the rest · $1.5M or more: 20% | FCAC: https://www.canada.ca/en/financial-consumer-agency/services/mortgages/down-payment.html |
| CMHC premiums (homeowner) | LTV ≤65% 0.60% · ≤75% 1.70% · ≤80% 2.40% · ≤85% 2.80% · ≤90% 3.10% · ≤95% 4.00% · 90.01–95% with non-traditional down payment 4.50% | CMHC: https://www.cmhc-schl.gc.ca/professionals/project-funding-and-mortgage-financing/mortgage-loan-insurance/mortgage-loan-insurance-homeownership-programs/premium-information-for-homeowner-and-small-rental-loans |
| Mortgage rate disclosure | The mortgage must state the rate "calculated yearly or half-yearly, not in advance" | Interest Act s.6: https://laws-lois.justice.gc.ca/eng/acts/I-15/page-1.html |

### United Kingdom — tax year 2026/27 (6 April 2026 to 5 April 2027)
| Item | Value | Source |
|---|---|---|
| Personal Allowance | £12,570, reduced by £1 for every £2 over £100,000 | HMRC: https://www.gov.uk/government/publications/rates-and-allowances-income-tax/income-tax-rates-and-allowances-current-and-past |
| England, Wales, NI | 20% on taxable income to £37,700 · 40% £37,701–£125,140 · 45% above | same; HMRC employer rates: https://www.gov.uk/guidance/rates-and-thresholds-for-employers-2026-to-2027 |
| Scotland | 19% to £3,967 · 20% to £16,956 · 21% to £31,092 · 42% to £62,430 · 45% to £125,140 · 48% above | same pages |
| Dividends | £500 allowance · 10.75% / 35.75% / 39.35% | income tax rates page |
| Employee NI (category A) | 8% on £12,570–£50,270 · 2% above | employer rates page |
| Employer NI | 15% above £5,000 secondary threshold | employer rates page |
| Student loans | Plan 1 £26,900 · Plan 2 £29,385 · Plan 4 £33,795 · Plan 5 £25,000 (all 9%) · Postgraduate £21,000 (6%) | employer rates page; https://www.gov.uk/repaying-your-student-loan/what-you-pay |
| SDLT (England & NI) | 0% to £125k · 2% to £250k · 5% to £925k · 10% to £1.5m · 12% above · first-time buyers 0% to £300k, 5% to £500k (no relief above £500k) · +5% additional property · +2% non-resident | https://www.gov.uk/stamp-duty-land-tax/residential-property-rates |
| ISA | £20,000 · Lifetime ISA £4,000 + 25% bonus (max £1,000) · cash ISA £12,000 for under-65s from 6 April 2027 | https://www.gov.uk/individual-savings-accounts · https://www.gov.uk/lifetime-isa · https://www.gov.uk/government/publications/reduction-in-the-cash-individual-savings-account-isa-limit/cash-individual-savings-account-isa-limit-reduction |
| Pension annual allowance | £60,000; tapered if threshold income > £200,000 and adjusted income > £260,000 | https://www.gov.uk/tax-on-your-private-pension/annual-allowance |
| Auto-enrolment | Earnings trigger £10,000 · qualifying earnings £6,240–£50,270 | The Pensions Regulator: https://www.thepensionsregulator.gov.uk/employers/new-employers/im-an-employer-who-has-to-provide-a-pension/declare-your-compliance/ongoing-duties-for-employers/earnings-thresholds |
| National Living Wage (21+) | £12.71/hour from 1 April 2026 | employer rates page |

### US 2026: additional items verified in the full text of Rev. Proc. 2025-32 (https://www.irs.gov/pub/irs-drop/rp-25-32.pdf)
| Item | Value |
|---|---|
| Head of household brackets | 10% to $17,700 · 12% to $67,450 · 22% to $105,700 · 24% to $201,750 · 32% to $256,200 · 35% to $640,600 · 37% above |
| Married filing separately | Same as single up to $256,225 · 35% to $384,350 · 37% above |
| Standard deduction, MFS | $16,100 |
| Additional standard deduction (aged or blind) | $1,650 each; $2,050 if unmarried and not a surviving spouse |
| Long-term capital gains: 0% rate up to / 15% rate up to (taxable income) | MFJ $98,900 / $613,700 · HoH $66,200 / $579,600 · single $49,450 / $545,500 · MFS $49,450 / $306,850 |
| Child Tax Credit | $2,200 per child, of which up to $1,700 is refundable |
| Health FSA salary-reduction limit | $3,400 (carryover $680) |

---

## P1 (added after the competitor comparison): feature gaps the content pages depend on

These tasks came out of `content/COMPETITOR-COMPARISON.md`. Each one closes a gap where calculator.net offers an input or mode we don't, or where our written content describes behaviour the calculator must actually have. A content page must not be published until the task it lists in its `calculatorRequirements` front matter is done. A page that describes features the tool lacks is a false claim.

### T-412 Loan calculator: solve-for modes and fees → APR
- Modes: payment (default), loan amount, term, rate. Add an optional upfront fee with a "deducted from proceeds" toggle → output an estimated APR (bisection solver, tolerance 1e-10).
- Payment frequency: monthly, bi-weekly, weekly. Merge `/repayment-calculator` here (301 via T-106).
- **AC:** $15,000, 9%, 48 months → $373.28, interest $2,917.23. With a $450 fee deducted → APR ≈ 10.61%. Solving for term with a $373.28 payment returns 48 months.
- **Test:** add these cases to the T-310 golden tests.

### T-413 Amortization: start date, extra payments, export
- First-payment date; extra monthly, extra yearly (month chosen) and one-time (month chosen) payments; monthly/yearly toggle; CSV download; balance chart in currency (T-201).
- **AC:** $250,000, 6%, 30 years → $1,498.88. Rows 1–3 interest: 1,250.00 / 1,248.76 / 1,247.51. Extra $200 a month → 267 payments, interest $203,362.51.

### T-414 Compound interest / investment / savings shared engine
- Compounding: annual, semi-annual, quarterly, monthly, daily (365), continuous. Contribution frequency is separate from compounding (convert using the effective rate). Contribution timing: start or end. Annual fee %. Inflation → real value. Solve-for: end balance, contribution, return, start amount, years. Scenario band (base ±2 pts). APY/AER ↔ nominal rate converter. Optional annual % increase in contributions, and an optional tax rate on interest each year (a single flat rate typed in by the user, labelled as a simplification).
- **AC:**
  - $10,000, 5% monthly, $250 a month at end, 15 years → $87,959.28
  - Lump sum alone: annual compounding $20,789.28, monthly $21,137.04, daily $21,168.91
  - $5,000 + $300 a month at 7% for 25 years → $271,648.60 (start-of-month timing $273,066.22). With a 1% fee → $230,223.04.
  - Savings goal $25,000 from $5,000 at $400 a month, 4% → 45 months; deposit needed for 36 months → $507.15
- Write T-306 conventions into the UI ("compounded monthly, deposits at end of month").

### T-415 Retirement: drawdown tab
- Tabs: "How much will I have", "How long will it last", "What can I withdraw". Pension income input. Real and nominal results.
- **AC:** $80,000 + $800 a month at 6% for 27 years → $1,047,856.25 (real at 2.5%: $537,969.11). Withdrawing $5,000 a month at 4% → lasts 361 months.

### T-416 401(k) and Roth IRA: limits by age and income
- 401(k): cap deferrals at $24,500 (2026), catch-up +$8,000 at 50+, +$11,250 instead at ages 60–63; cap total additions excluding catch-up at $72,000. Two-tier match formula. "Match left on the table" output. Per-paycheck mode.
- Roth: limit $7,500 / $8,600 (50+), capped at compensation. MAGI phase-out per filing status using the Pub 590-A worksheet (round up to next $10; $200 floor).
- **AC:** 401(k) Example 1 → $497,017.59; without match $319,920.28. Roth: single, MAGI $160,000 → $4,000; MAGI $168,000 → $0; 25 years × $7,500 at 7% → $474,367.78.
- Roth catch-up: if prior-year (2025) FICA wages from the employer exceeded **$150,000**, 2026 catch-ups must be Roth. Notice 2025-67 (https://www.irs.gov/pub/irs-drop/n-25-67.pdf) raised this threshold from $145,000; show it as a note, not a hard block.

### T-417 BMI: children and NHS thresholds
- Ages 2–19: BMI-for-age percentile from the CDC 2000 growth charts (LMS tables; VERIFY the data file and its licence) → CDC child categories. Adults 20+: CDC categories. Optional NHS lower thresholds (23 / 27.5) toggle. Healthy-weight range for height.
- **AC:** 82 kg / 178 cm → 25.88; 180 lb / 70 in → 25.82; range at 1.78 m: 58.6–78.9 kg. The CDC example (5 ft 9 in) gives a healthy range of 125–168 lb.

### T-418 Calorie and BMR: three equations, kJ
- Mifflin-St Jeor (default), revised Harris-Benedict (Roza & Shizgal 1984), Katch-McArdle (needs body fat %). kcal/kJ toggle (×4.184). Activity table. Show a warning, not a target, for very low intakes; link to the NIDDK Body Weight Planner.
- **AC:**
  - Female 35 y, 65 kg, 165 cm → BMR 1,345.25; ×1.55 → 2,085
  - Male 40 y, 85 kg, 180 cm → Mifflin 1,780; Harris-Benedict 1,863.8; Katch-McArdle at 19.5% body fat ≈ 1,847
- **VERIFY:** a primary citation for the activity factors and for Katch-McArdle.

### T-419 Body fat: inch-based Navy equations
- Convert cm to inches and apply the Hodgdon–Beckett inch equations in both unit modes, so the result doesn't change when units are toggled. Fat and lean mass when weight is given. Measurement guide with SVG diagrams. Reject waist ≤ neck.
- **AC:** male 178/39/90 cm → 19.54%; female 165/33/76/100 cm → 30.24%. Switching units must not change the result.

### T-420 Due date: all dating methods
- LMP + cycle length; conception date (+266); IVF transfer (+266 − embryo age: day 3/5/6); ultrasound-provided EDD. Gestational age today; milestones at 12/20/28/37/40/42 weeks. Locale date format. Process dates in the browser only (T-229).
- **AC:** LMP 2 Mar 2026 → 7 Dec 2026; 32-day cycle → 11 Dec 2026; conception 16 Mar 2026 → 7 Dec 2026; day-5 transfer on 20 Mar 2026 → 6 Dec 2026.

### T-421 US paycheck rebuild
- Inputs: filing status, pay frequency, salary or hourly, pre-tax 401(k)/403(b), Section 125 deductions, HSA, W-4 extra withholding. Social Security capped at $184,500; Additional Medicare withheld on wages over $200,000 regardless of filing status. Annual ÷ periods display, with a note pointing to Pub 15-T.
- **AC:** $75,000, single, 5% 401(k), bi-weekly → net $58,667.50 a year, $2,256.44 per paycheck. $210,000, single → net $156,292; SS $11,439; Additional Medicare $90.
