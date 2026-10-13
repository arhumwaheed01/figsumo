# QA-CHECKLIST: pass/fail checks before every push

Run these against **staging** (`https://figsumo.vercel.app`) before you push to production. Run §15 once on launch day against `https://figsumo.com`.
- Mark each line **PASS** or **FAIL**. Any FAIL in a **P0** section blocks the push.
- The expected values come from the DEV-TASKS acceptance criteria (AC); the same numbers appear in `content/`.

Setup:
```bash
export S=https://figsumo.vercel.app        # staging
export P=https://figsumo.com               # production (after the domain is bought)
cd launch-pack                             # folder that holds on-page-seo.csv and scripts/
```
In the raw Markdown, pipes inside table commands are written `\|`. Drop the backslash when you paste a command into a terminal.

**Staging baseline from the run on 14 Oct 2026, 01:22 PKT.** It shows what fails today:
- Real pages send `<meta name="robots" content="index, follow">`. `/robots.txt` says `Allow: /` and lists `Sitemap: https://figsumo.com/sitemap.xml`.
- The first request to a new unknown path returns 200 (soft 404); repeats return a cached 404.
- 0 of 43 redirects exist.
- `/ads.txt` returns 404.
- Titles and descriptions don't yet match the CSV (190 title FAILs from `scripts/qa_crawl.py --only meta`).

All of these are expected until T-001–T-006, T-101 and T-106 ship.

---

## 1. Staging must not be indexable (P0, T-001)
| # | Check | Command | Expected | P/F |
|---|---|---|---|---|
| 1.1 | Header on HTML | `curl -sI $S/mortgage-calculator \| grep -i x-robots-tag` | `X-Robots-Tag: noindex, nofollow` | |
| 1.2 | Header on a non-HTML file | `curl -sI $S/robots.txt \| grep -i x-robots-tag` | same | |
| 1.3 | Meta tag | `curl -s $S/bmi-calculator \| grep -o '<meta name="robots"[^>]*>'` | `content="noindex, nofollow"` (never `index, follow`) | |
| 1.4 | robots.txt | `curl -s $S/robots.txt` | `User-Agent: *` + `Disallow: /`, **no** `Sitemap:` line | |
| 1.5 | Preview deploys | Repeat 1.1–1.4 on the latest `*.vercel.app` preview URL | same | |
| 1.6 | Whole site | `python3 scripts/qa_crawl.py --base $S --csv on-page-seo.csv --only meta --mode staging \| grep noindex \| grep -c FAIL` | `0` | |

## 2. Status codes and 404s (P0, T-004)
| # | Check | Command | Expected | P/F |
|---|---|---|---|---|
| 2.1 | Unknown path (use a **fresh** random path each run: the first hit is the one that soft-404s) | `curl -s -o /dev/null -w '%{http_code}\n' $S/qa-$RANDOM$RANDOM` | `404` on the first request | |
| 2.2 | Custom 404 is noindex | `curl -s $S/this-does-not-exist-xyz \| grep -o '<meta name="robots"[^>]*>'` | contains `noindex` | |
| 2.3 | Every live URL in the CSV | `qa_crawl.py --only meta` → `grep -c "FAIL status"` | `0` | |
| 2.4 | Site pages exist | `for p in about methodology privacy terms disclaimer contact; do curl -s -o /dev/null -w "$p %{http_code}\n" $S/$p; done` | all `200`, each with its own `<title>` | |
| 2.5 | No server errors | Vercel → Logs, filter by status 5xx, last 24 h | none | |

## 3. Redirects (P0, T-106; map in GAP-ANALYSIS §5)
| # | Check | Command | Expected | P/F |
|---|---|---|---|---|
| 3.1 | All 43 page redirects | `python3 scripts/qa_crawl.py --base $S --csv on-page-seo.csv --only redirects` | `0 FAIL(s)`: one 301/308 hop, target 200 | |
| 3.2 | 5 hub redirects | `for h in financial-calculators fitness-health-calculators math-calculators other-calculators calculators-for-your-site; do curl -sI $S/$h \| grep -iE '^(HTTP\|location)'; done` | 308 → `/money`, `/health`, `/math`, `/everyday`, `/embed` | |
| 3.3 | No chains | for 3 random rows: `curl -sIL $S/<old> \| grep -ci '^HTTP'` | `2` (one redirect + final 200) | |
| 3.4 | No internal links to redirects | Screaming Frog (or similar) crawl of `$S` → Response Codes → Redirection (3xx) → Inlinks | 0 internal inlinks | |

## 4. Metadata, canonicals and headings (P0, T-005, T-101)
| # | Check | Command | Expected | P/F |
|---|---|---|---|---|
| 4.1 | Title/description/H1 = CSV | `qa_crawl.py --only meta` → `grep -cE "FAIL (title\|description\|h1)"` | `0` | |
| 4.2 | Self canonical | same output → `grep -c "FAIL canonical"` | `0`; on staging the canonical host is `figsumo.vercel.app` (T-002) | |
| 4.3 | One H1 per page | `curl -s $S/uk/mortgage-calculator \| grep -o '<h1' \| wc -l` | `1` | |
| 4.4 | Canonical has no query string | `curl -s "$S/loan-calculator?amount=5000" \| grep -o '<link rel="canonical"[^>]*>'` | `href` ends `/loan-calculator` | |
| 4.5 | Open Graph image | `curl -s $S/bmi-calculator \| grep -o 'og:image" content="[^"]*'`, then `curl -sI` that URL | 200, `image/png` | |
| 4.6 | No hardcoded prod domain | `grep -rn "figsumo.com" app lib components` | only comments or config | |

## 5. Sitemap and robots (P0, T-005)
| # | Check | Command | Expected | P/F |
|---|---|---|---|---|
| 5.1 | Stable | `curl -s $S/sitemap.xml \| md5sum`; wait 60 s; repeat | same hash | |
| 5.2 | lastmod = page `updated` | `curl -s $S/sitemap.xml \| grep -A1 '/mortgage-calculator<'` | `<lastmod>2026-10-14</lastmod>` (or the latest `updated`) | |
| 5.3 | Only final URLs | count `<loc>` = 241 + home + hubs + site pages; no old URL from GAP-ANALYSIS §5 | match | |
| 5.4 | No changefreq/priority | `curl -s $S/sitemap.xml \| grep -cE 'changefreq\|priority'` | `0` | |
| 5.5 | Staging robots has no sitemap line | see 1.4 | — | |

## 6. Structured data (P1, T-102; examples in ONPAGE-SEO §5)
| # | Check | How | Expected | P/F |
|---|---|---|---|---|
| 6.1 | Valid JSON-LD | https://validator.schema.org on home, `/money`, `/mortgage-calculator`, `/bmi-calculator`, `/about` | 0 errors | |
| 6.2 | Google parse | https://search.google.com/test/rich-results on the same 5 | 0 errors; Breadcrumb detected | |
| 6.3 | FAQ text = visible FAQ | compare JSON-LD `Question.name` list with the page's FAQ `###` headings on 3 pages | identical, same count | |
| 6.4 | No forbidden types | `curl -s $S/mortgage-calculator \| grep -cE 'aggregateRating\|"HowTo"'` | `0` | |
| 6.5 | Organization has no invented facts | read the JSON-LD | only name, url, logo (sameAs only if real) | |

## 7. hreflang (P1, T-108)
| # | Check | Command | Expected | P/F |
|---|---|---|---|---|
| 7.1 | Cluster tags | `curl -s $S/uk/take-home-pay-calculator \| grep -o '<link rel="alternate" hreflang[^>]*>'` | en-US, en-CA, en-GB (self), x-default, as in ONPAGE-SEO §6 | |
| 7.2 | Reciprocal | repeat 7.1 for every member of the income-tax, take-home-pay and mortgage clusters | each lists all members | |
| 7.3 | None on universal pages | `curl -s $S/bmi-calculator \| grep -c hreflang` | `0` | |

## 8. Content pages (P0 for any page being published; T-105)
Batch 1 is the 30 files in `content/`. A content page may go live **only** when its `calculatorRequirements` task (front matter, mirrored in the CSV `dev_dependency`) has passed its golden tests in §9. Otherwise the text would describe features the tool doesn't have.

| # | Check | How | Expected | P/F |
|---|---|---|---|---|
| 8.1 | Dependency gate | For each page you publish, find its T-ID in front matter → §9 row | §9 row PASS | |
| 8.2 | All sections render | Open the page and check: intro, How to use, Formula, Worked examples, Understanding results, Country notes, FAQ, Sources, Disclaimer, updated date | all present | |
| 8.3 | Word count | in the browser console: `document.querySelector('article').innerText.split(/\s+/).length` | ≥ 900 | |
| 8.4 | No unresolved markers | `curl -s $S/<page> \| grep -cE 'VERIFY\|\[PLACEHOLDER\|CONFIRM'` | `0` | |
| 8.5 | Source links work | on each page, every Sources URL opens (200, right document) | all OK | |
| 8.6 | Internal links | every in-text link → 200, no redirect | all OK | |
| 8.7 | Formulas render | KaTeX/pre blocks, no raw `$$` or broken symbols | OK | |
| 8.8 | Tables | scroll horizontally on 360 px width, have a caption | OK | |
| 8.9 | Tax-year label | country pay/tax pages show "2026" (US/CA) or "2026/27" (UK) in H1/title and result panel | OK | |
| 8.10 | Originality | paste 3 random sentences per page into a search engine in quotes | no matches on other sites | |

## 9. Calculator golden tests (P0 per page; numbers from DEV-TASKS AC)
Enter the inputs and compare the outputs to the cent. Automated versions belong in the T-310 test suite. Run them by hand here as a final check.

| # | Page / task | Inputs | Expected | P/F |
|---|---|---|---|---|
| 9.1 | /mortgage-calculator T-401 | $400,000, 20% down, 6.5%, 30 y, tax 1.1%/yr, ins. $1,800/yr | P&I $2,022.62; total $2,539.28; interest $408,142.36 | |
| 9.2 | same | 10% down, PMI 0.5% | P&I $2,275.44; PMI $150.00; total $2,942.11; 80% at payment 95; 78% at payment 109 | |
| 9.3 | /uk/mortgage-calculator T-402 | £250,000, 4.5%, 25 y | £1,389.58/month; interest £166,874.36; interest-only £937.50; shows **£**, never $ | |
| 9.4 | same | 2-y fix then 6.5% | balance after 24 payments £238,669.02; new payment £1,668.45 | |
| 9.5 | /ca/mortgage-calculator T-403 | $400,000, 5%, 25 y | $2,326.42 (semi-annual compounding) | |
| 9.6 | same | $500,000 price, 10% down, 5.00%, 25 y | premium $13,950.00; mortgage $463,950.00; $2,698.36/month; accelerated bi-weekly $1,349.18 → 559 payments | |
| 9.7 | /refinance-calculator T-404 | $300,000 at 7.0%, 27 y left → new 30 y at 6.0%, $6,000 costs | $2,063.44 → $1,798.65; saves $264.79; break-even 23 months | |
| 9.8 | /auto-loan-calculator T-407 | $35,000, 6% tax, $5,000 down, 6.9%, 60 mo | financed $32,100.00; $634.11/month; interest $5,946.30 | |
| 9.9 | /credit-card-payoff-calculator T-408 | $6,000, 22.99%, $200/month | 46 months; interest $3,011.78 | |
| 9.10 | /savings-calculator T-409 | goal $25,000, have $5,000, $400/month, 4% | 45 months; deposit for 36 months $507.15 | |
| 9.11 | /house-affordability-calculator T-410 | $100,000 income, $500 debts, 28/36, $400 tax+ins., 6.5%, 30 y | max loan $305,874.25; price at 20% down $382,342.81 | |
| 9.12 | /loan-calculator T-412 | $15,000, 9%, 48 months | $373.28; interest $2,917.23; $450 fee deducted → APR ≈ 10.61% | |
| 9.13 | /amortization-calculator T-413 | $250,000, 6%, 30 y | $1,498.88; month 1–3 interest 1,250.00 / 1,248.76 / 1,247.51; +$200/month → 267 payments | |
| 9.14 | /compound-interest-calculator T-414 | $10,000, 5% monthly, $250/month at end, 15 y | $87,959.28 | |
| 9.15 | /investment-calculator T-414 | $5,000 + $300/month, 7%, 25 y | $271,648.60; 1% fee → $230,223.04 | |
| 9.16 | /retirement-calculator T-415 | $80,000 + $800/month, 6%, 27 y | $1,047,856.25; real (2.5%) $537,969.11 | |
| 9.17 | /us/401k-calculator T-416 | content Example 1 | $497,017.59 (no match: $319,920.28); deferral capped at $24,500 (2026) | |
| 9.18 | /us/roth-ira-calculator T-416 | single, MAGI $160,000 | limit $4,000; MAGI $168,000 → $0 | |
| 9.19 | /bmi-calculator T-417 | 82 kg, 178 cm / 180 lb, 70 in | 25.88 / 25.82; healthy range at 1.78 m 58.6–78.9 kg; unit toggle keeps BMI | |
| 9.20 | /calorie-calculator, /bmr-calculator T-418 | F 35 y, 65 kg, 165 cm, ×1.55 | BMR 1,345.25; TDEE 2,085 | |
| 9.21 | same | M 40 y, 85 kg, 180 cm | Mifflin 1,780; Harris-Benedict 1,863.8 | |
| 9.22 | /body-fat-calculator T-419 | M 178/39/90 cm; F 165/33/76/100 cm | 19.54%; 30.24%; same in inches | |
| 9.23 | /due-date-calculator T-420 | LMP 2 Mar 2026; 32-day cycle; conception 16 Mar 2026; day-5 transfer 20 Mar 2026 | 7 Dec 2026; 11 Dec 2026; 7 Dec 2026; 6 Dec 2026 | |
| 9.24 | /us/paycheck-calculator T-421 | $75,000 single, 5% 401(k), bi-weekly | net $58,667.50/yr; $2,256.44 per paycheck | |
| 9.25 | same | $210,000 single | SS $11,439; Additional Medicare $90; net $156,292 | |
| 9.26 | /us/income-tax-calculator T-302 | $75,000 single taxable | $11,212.00; $90,000 wages single std. ded. → $10,970.00 | |
| 9.27 | /ca/take-home-pay-calculator T-501 | $75,000 Ontario | CPP $4,230.45; CPP2 $16.00; EI $1,123.07; fed $8,258.60; ON $4,446.06; net $56,925.83 | |
| 9.28 | /ca/income-tax-calculator T-502 | $120,000 Ontario | federal $17,502.14; Ontario $9,385.57; net $87,342.77 | |
| 9.29 | /uk/take-home-pay-calculator T-503 | £40,000 England, Plan 2 | tax £5,486.00; NI £2,194.40; SL £955.35; net £31,364.25 | |
| 9.30 | /uk/income-tax-calculator T-504 | £40,000 Scotland; £110,000 England | tax £5,551.07; PA £7,570, tax £33,432.00 | |
| 9.31 | /uk/stamp-duty-calculator T-505 | £295,000; £350,000 FTB; £500,000 FTB; £1,000,000 | £4,750; £2,500; £10,000; £43,750 | |
| 9.32 | /ca/rrsp-calculator T-506 | $10,000 at 29.65% marginal | refund $2,965; $10,000/yr 25 y at 6% → $548,645.12 | |
| 9.33 | /ca/tfsa-calculator T-507 | eligible since 2009, never contributed | room $109,000 (2026) | |
| 9.34 | /uk/isa-calculator T-508 | £20,000/yr, 10 y, 5% | £251,557.85; LISA £4,000 → £5,000 | |
| 9.35 | /z-score-calculator T-211 | x 85, μ 70, σ 10 | z 1.5; 93.32%; σ ≤ 0 shows error | |

## 10. Currency, units and locale (P0 on money pages; T-201, T-202, T-212, T-223, T-224)
| # | Check | How | Expected | P/F |
|---|---|---|---|---|
| 10.1 | UK pages use £ | open every `/uk/*` page, run a calculation; `curl -s $S/uk/mortgage-calculator \| grep -c '\$[0-9]'` | 0 dollar amounts; results, tables and charts in £ | |
| 10.2 | CA pages use $ with CA wording | open every `/ca/*` page | "$" (or C$) consistently; "paycheque" spelling on CA pay pages | |
| 10.3 | Universal pages follow locale | set browser language en-GB, open `/loan-calculator` | £ everywhere on the page; switch to en-US → $ | |
| 10.4 | No currency on non-money tools | BMI, body fat, due date, percentage, concrete | no $ / £ symbols, chart titles describe the data | |
| 10.5 | Unit toggles | BMI 82 kg / 178 cm ↔ imperial | BMI unchanged to 1 decimal | |
| 10.6 | No NaN | type letters, blanks, 0 and negatives into 5 calculators | named field error, never `NaN`, `Infinity` or blank | |
| 10.7 | Valid result on first load | open 10 random calculators | a default result shows without pressing a button, no premature errors | |
| 10.8 | Share link | copy link, open in private window | same inputs and result; canonical has no query | |
| 10.9 | Currency converter | `/currency-converter` | rate shows its date and source, ≤ 4 days old; no fixed 0.92 rate | |

## 11. Accessibility and mobile (P1; T-606, T-607)
| # | Check | How | Expected | P/F |
|---|---|---|---|---|
| 11.1 | axe | axe DevTools on the 30 content pages + 4 hubs | 0 serious / critical | |
| 11.2 | Keyboard | tab through mortgage, BMI, UK take-home, due date | every control reachable, visible focus, no trap | |
| 11.3 | Screen reader | NVDA or VoiceOver on the same 4 | labels read, the result announced once (`aria-live="polite"`) | |
| 11.4 | Contrast | check light grey text (e.g. `text-ink/40`) with a contrast checker | ≥ 4.5:1 body text, ≥ 3:1 large text | |
| 11.5 | 360 px width | Chrome DevTools, iPhone SE / Galaxy S8 | no horizontal page scroll; tables scroll inside their box; tap targets ≥ 24 px | |
| 11.6 | Zoom 200% | browser zoom | no clipped content | |
| 11.7 | Breadcrumb | inspect | `<nav aria-label="Breadcrumb"><ol>` with `aria-current="page"` | |

## 12. Performance (P1; T-601–T-610)
Core Web Vitals have **not** been measured for this pack (the PageSpeed Insights API was over its daily quota on 14 Oct 2026). Record a baseline first (T-601), then hold it.
| # | Check | How | Expected | P/F |
|---|---|---|---|---|
| 12.1 | Lighthouse mobile | https://pagespeed.web.dev on home, mortgage, BMI, UK take-home | LCP ≤ 2.5 s, CLS ≤ 0.1, TBT low; write the numbers here | |
| 12.2 | INP | Vercel Speed Insights / CrUX once there is traffic | INP ≤ 200 ms at p75 | |
| 12.3 | JS budget | Network tab, first load `/bmi-calculator` | within the budget set in T-602 (suggested ≤ 130 kB gzip, VERIFY against baseline) | |
| 12.4 | Static | `curl -sI $S/mortgage-calculator \| grep -i x-vercel-cache` | `HIT` or `PRERENDER` (not dynamic on every request) | |
| 12.5 | Print | print preview on mortgage | inputs and results print; nav and ads hidden | |

## 13. Consent, ads, analytics and privacy (P0 before any ad/analytics tag; T-801–T-805)
| # | Check | How | Expected | P/F |
|---|---|---|---|---|
| 13.1 | CMP present | UK or EEA VPN, fresh profile | Google-certified CMP banner (IAB TCF v2.2) with equally prominent **Accept all** and **Reject all** | |
| 13.2 | No cookies before consent | DevTools → Application → Cookies before clicking | no `_ga`, `_gid`, `__gads`, `__gpi`, IDE or similar | |
| 13.3 | Consent Mode v2 defaults | Tag Assistant → consent tab | `ad_storage`, `ad_user_data`, `ad_personalization`, `analytics_storage` = denied by default (EEA/UK/CH) | |
| 13.4 | Reject works and persists | reject, reload | no ad/analytics cookies; banner not shown again; footer "Cookie settings" reopens it | |
| 13.5 | US visitors | US VPN | CMP behaviour matches the US state-law decision in T-801 (VERIFY obligations first) | |
| 13.6 | No inputs in analytics | Network tab while calculating | events carry the slug only, never amounts, weights, dates or results | |
| 13.7 | ads.txt | `curl -sI $S/ads.txt` (prod: `$P/ads.txt`) | 200, `content-type: text/plain`; publisher line only after AdSense approval | |
| 13.8 | Privacy page matches reality | read `/privacy` against the tags actually loaded | every cookie / vendor listed; no vendor listed that isn't used | |
| 13.9 | Ad placement (later) | after ads go live | never between label and input, never above the calculator on mobile, height reserved (no CLS) | |

## 14. Trust and site pages (P0 for AdSense application; T-701–T-706)
| # | Check | How | Expected | P/F |
|---|---|---|---|---|
| 14.1 | Six pages live | About, Methodology, Privacy, Terms, Disclaimer, Contact | 200, unique titles, in sitemap, linked from the footer | |
| 14.2 | Placeholders replaced | `for p in about methodology privacy terms disclaimer contact; do curl -s $S/$p \| grep -cE '\[[A-Z_ ]+\]\|VERIFY\|CONFIRM'; done` | all `0` | |
| 14.3 | No invented facts | read About/Contact | no made-up team, address, phone, awards or user counts | |
| 14.4 | Contact works | send a test message | arrives at the real inbox; spam protection on | |
| 14.5 | Dates | every calculator | "Updated" date = front matter `updated`; tax pages show the tax-year banner | |
| 14.6 | Disclaimers | finance and health pages | page-specific disclaimer present at the end of the content | |

## 15. Launch day on production (P0; run once, after T-003)
| # | Check | Command | Expected | P/F |
|---|---|---|---|---|
| 15.1 | Indexable | `curl -sI $P/ \| grep -i x-robots-tag`; `curl -s $P/ \| grep -o '<meta name="robots"[^>]*>'` | no `noindex` anywhere | |
| 15.2 | robots.txt | `curl -s $P/robots.txt` | `Allow: /` (or no Disallow for pages) + `Sitemap: https://figsumo.com/sitemap.xml` | |
| 15.3 | Host redirects | `curl -sI https://www.figsumo.com/`; `curl -sI http://figsumo.com/` | one 301/308 hop each, to `https://figsumo.com/` | |
| 15.4 | Canonicals on prod host | `python3 scripts/qa_crawl.py --base $P --csv on-page-seo.csv --mode production` | `0 FAIL(s)` | |
| 15.5 | Staging still hidden | repeat §1 on `$S` | still noindex | |
| 15.6 | Search Console | add the domain property, submit the sitemap | sitemap "Success"; no coverage errors after 48 h | |
| 15.7 | Bing Webmaster Tools | import from Search Console | sitemap accepted | |

---
**Sign-off:** date ______ · commit ______ · run by ______ · P0 FAILs: ______ (must be 0)
