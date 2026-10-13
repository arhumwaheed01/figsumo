# GAP-ANALYSIS: FigSumo vs calculator.net

Prepared 14 Oct 2026 (PKT). Sources: staging crawl of https://figsumo.vercel.app/ (209 calculator pages) and a fetch of calculator.net on 14 Oct 2026, 00:27 PKT (sitemap list plus every page that matches one of ours). Per-page numbers are in `on-page-seo.csv` (columns `cnet_*`) and `content/COMPETITOR-COMPARISON.md`.

Internal planning document. Not for publication.

## 1. Summary

- **Coverage: no calculator gap.** calculator.net's sitemap lists 216 URLs. 209 of them are calculators, and all 209 match a FigSumo staging page one-to-one. The other 7 are hub/about pages: `about-us`, `sitemap`, `financial-calculator`, `fitness-and-health-calculator`, `math-calculator`, `other-calculator` and `calculators-for-your-site`.
- **The problem is that we mirror them.** Today FigSumo copies their slugs, their hub structure and in places their form layout. A site that duplicates a stronger, older domain page for page gives Google no reason to rank it. The plan below moves us away from a 1:1 mirror:
  1. Fix the calculators that are broken or thin (DEV-TASKS T-201–T-213).
  2. Close the feature gaps where their tool does more (§2, T-401–T-421).
  3. Win where they are weak: Canada and UK country tools, dated tax figures, cited sources, worked examples and FAQs (§3–§4).
  4. Clean up the URL taxonomy before launch (§5). This is cheap now because figsumo.com has never been live and no URL has backlinks or rankings yet.
- We do **not** try to match their word counts. Several of their pages run 2,000–4,600 words including forms and tables, and the brief caps ours at 1,500. We aim to be more useful per word.

## 2. Features they have that we lack

The source for every row is the per-page comparison in `content/COMPETITOR-COMPARISON.md`. "Task" points to the DEV-TASKS entry that closes the gap.

| Page (ours) | Their feature we lack on staging | Task | Note |
|---|---|---|---|
| /mortgage-calculator | Annual increase for tax/insurance/HOA; extra monthly, yearly and one-time payments; bi-weekly; start date; schedule + chart | T-401 | Also fixes the chart units bug (T-201) |
| /ca/mortgage-calculator | Semi-annual compounding (ours compounds monthly); CMHC premium; accelerated bi-weekly | T-403 | Monthly compounding overstates the payment (worked example in content) |
| /uk/mortgage-calculator | £ formatting (staging shows $); interest-only vs repayment | T-212, T-402 | |
| /loan-calculator | Deferred lump-sum and bond (zero-coupon) modes; compounding and payback frequency | T-412 | We also add solve-for and fee→APR, which they don't have. `/repayment-calculator` merges here |
| /auto-loan-calculator | Incentives/rebate, trade-in, amount owed on trade-in, sales tax, fees, "include in loan" toggle | T-407 | We use a user-entered tax rate; state tables are phase 2 (VERIFY per state) |
| /amortization-calculator | Extra payments, start date, monthly/annual schedule, chart | T-413 | Plus CSV export, which they don't offer |
| /refinance-calculator | Current-loan inputs, points, closing costs, cash-out | T-404 | The staging page is a clone of the loan form |
| /house-affordability-calculator | Budget-based mode; DTI presets | T-410 | FHA/VA presets are VERIFY (program ratios not confirmed from HUD/VA) |
| /us/paycheck-calculator | Filing status, pre-tax deductions, state income tax | T-421, T-509 | State tax figures are VERIFY per state |
| /us/income-tax-calculator | Credits, itemized deductions, other income types | T-301–T-305 | AMT, EITC and education credits: phase 2 |
| /compound-interest-calculator, /savings-calculator, /investment-calculator | Rate converter across compounding frequencies, incl. continuous (compound); annual contribution increase % and tax on interest (savings); solve-for target and start/end contribution timing (investment) | T-414 | One shared engine for all three pages |
| /retirement-calculator | Several modes (amount needed, savings at retirement, how long it lasts, withdrawal), income needs and other income after retirement | T-415 | |
| /credit-card-payoff-calculator | Several cards (they allow up to 20) paid from one monthly budget | T-408 | Ours: up to 10 cards, with an avalanche or snowball order |
| /us/401k-calculator, /us/roth-ira-calculator | Limits that depend on age and income | T-416 | Roth catch-up wage threshold $150,000 (2025 FICA wages) verified in IRS Notice 2025-67 |
| /bmi-calculator | Child/teen BMI-for-age (percentiles) | T-417 | CDC LMS data licence: VERIFY. They also show BMI Prime and ponderal index; see the not-copying list below |
| /calorie-calculator, /bmr-calculator | Three equations; kJ output | T-418 | Food and exercise tables are deliberately left out (no cited dataset) |
| /body-fat-calculator | Unit-consistent Navy method; fat/lean mass | T-419 | |
| /due-date-calculator | Conception, IVF (day 3/5/6) and ultrasound methods | T-420 | |
| All 209 pages | Embeddable widgets ("for your site") | T-106 (`/embed`) | Kept under `/embed/` |

calculator.net features we are **not** copying, and why:
- Food/exercise calorie tables, meal plans, zig-zag diets: these need a cited dataset and risk going beyond appropriate health guidance.
- History and encyclopaedia sections: little calculation value. Short original versions can come later if Search Console shows demand.
- BMI Prime and ponderal index: neither CDC nor NHS uses them. Add them only once a primary source has been found (VERIFY).
- Their state sales-tax dropdowns: only once each state's rate is verified from the state's own revenue site.

The long-tail pages beyond the top 30 are covered in the lighter comparison (`content/COMPETITOR-COMPARISON.md`, last section). It lists, for every other CSV row, their input count, tables, chart flag and section topics. That list is the minimum feature target for later content batches.

## 3. New US / Canada / UK calculators (prioritized)

calculator.net has no Canadian or UK pay, tax, property-tax or savings-wrapper tools; its pay and tax pages are US-only. That is the biggest opening for a site whose core markets are the US, Canada and the UK.

All 38 new pages are rows in `on-page-seo.csv` with `status = new`. Priority is set by three factors:
- fit with the US/CA/UK focus
- how often the result is needed (pay, tax and home buying come first)
- how much verified data the page needs (lower data risk ships first)

Search volume and CPC were **not measured** for this pack. Before final ordering, VERIFY demand in Google Keyword Planner or Search Console. "Verified" below means the figures are already in the DEV-TASKS appendix with a source URL.

### Priority 1: build now (content already written in `content/`)
| # | URL | Task | Data status |
|---|---|---|---|
| 1 | /ca/take-home-pay-calculator | T-501 | Verified: CRA 2026 brackets, CPP/CPP2/EI. Quebec VERIFY (Revenu Québec, QPP, QPIP) |
| 2 | /uk/take-home-pay-calculator | T-503 | Verified: HMRC 2026/27 bands, NI, student loans |
| 3 | /ca/income-tax-calculator | T-502 | Verified except Quebec, and the provincial credits/reductions marked VERIFY in DEV-TASKS |
| 4 | /uk/income-tax-calculator | T-504 | Verified (incl. Scotland, PA taper, dividends) |
| 5 | /uk/stamp-duty-calculator | T-505 | Verified (England & NI, FTB relief, +5% / +2%) |
| 6 | /ca/rrsp-calculator | T-506 | Verified 2026 limit $33,810 |
| 7 | /ca/tfsa-calculator | T-507 | Verified annual limits 2009–2026 |
| 8 | /uk/isa-calculator | T-508 | Verified £20,000, LISA rules, 2027 cash ISA change |

### Priority 2: next batch (phase 2 tasks already raised)
| # | URL | Task | Data needed |
|---|---|---|---|
| 9 | /us/state-income-tax-calculator | T-509 | 2026 brackets and deductions for every state from that state's revenue department: **VERIFY all** |
| 10 | /ca/land-transfer-tax-calculator | T-510 | Provincial rates, Toronto municipal LTT and first-time buyer rebates: **VERIFY per province** |
| 11 | /ca/cmhc-insurance-calculator | T-511 | CMHC premium table verified. Which provinces charge PST on the premium: VERIFY |
| 12 | /uk/student-loan-repayment-calculator | T-512 | Thresholds verified. Interest rates by plan: VERIFY on GOV.UK when building |

### Priority 3: backlog (task to be raised; sorted by fit and data risk)
| # | URL | Why | Data needed (all VERIFY unless stated) |
|---|---|---|---|
| 13 | /ca/mortgage-affordability-calculator | Canada home-buying cluster; reuses T-403 + OSFI stress test | OSFI MQR verified; GDS/TDS guideline ratios VERIFY (CMHC) |
| 14 | /ca/fhsa-calculator | New account type with no strong calculator coverage on calculator.net | Annual and lifetime limits, carry-forward: VERIFY (CRA) |
| 15 | /uk/capital-gains-tax-calculator | No UK CGT tool on calculator.net | 2026/27 rates and annual exempt amount: VERIFY (GOV.UK) |
| 16 | /us/capital-gains-tax-calculator | High-intent US tax query | LTCG thresholds verified (Rev. Proc. 2025-32); NIIT 3.8% and thresholds VERIFY |
| 17 | /ca/capital-gains-tax-calculator | Completes the capital-gains hreflang cluster | Inclusion rate stays one-half: the proposed rise to two-thirds was cancelled on 21 Mar 2025 (verified: https://www.pm.gc.ca/en/news/news-releases/2025/03/21/prime-minister-mark-carney-cancels-proposed-capital-gains-tax-increase). Provincial rates via T-502 |
| 18 | /uk/dividend-tax-calculator | Directors and investors; rates already verified | Rates verified (10.75 / 35.75 / 39.35%, £500 allowance) |
| 19 | /us/self-employment-tax-calculator | Freelancers; pairs with /freelance-rate-calculator | SE tax rate and 92.35% base: VERIFY (IRS Topic 554 / Schedule SE) |
| 20 | /uk/salary-sacrifice-calculator | Pairs with UK take-home | Mechanics verified via NI rates; the announced 2029 NI cap on pension salary sacrifice: VERIFY |
| 21 | /uk/workplace-pension-calculator | Auto-enrolment is universal in UK pay | Trigger £10,000 and qualifying band verified; minimum 8% total contribution: VERIFY (TPR) |
| 22 | /ca/cpp-calculator | Contributions only (not benefit estimates) | Verified 2026 CPP/CPP2 |
| 23 | /ca/gst-hst-calculator | Everyday Canadian need | GST/HST rates by province: VERIFY (CRA) |
| 24 | /us/w4-withholding-calculator | Strong need around tax season | 2026 Pub 15-T percentage method: VERIFY. High complexity; ship after T-421 |
| 25 | /us/pmi-calculator | Mortgage cluster | Removal rules verified (CFPB); premium rate is a user input (no official rate) |
| 26 | /us/closing-cost-calculator | Mortgage cluster | No official national figures; itemised user inputs only, no default % |
| 27 | /us/property-tax-calculator | Mortgage cluster | User-entered rate; any state/county defaults VERIFY |
| 28 | /us/hsa-calculator | Pairs with 401(k)/paycheck | 2026 limits VERIFY (2027 limits $4,500 / $9,000 verified, Rev. Proc. 2026-24) |
| 29 | /uk/lbtt-calculator | Scotland property | Revenue Scotland bands and ADS: VERIFY |
| 30 | /uk/ltt-calculator | Wales property | Welsh Revenue Authority bands and higher rates: VERIFY |
| 31 | /uk/buy-to-let-mortgage-calculator | Landlords; high-value finance topic | Lender rental-cover ratios vary (user input); mortgage interest tax credit rule: VERIFY (GOV.UK) |
| 32 | /us/life-insurance-calculator | Needs-based (income replacement + debts − assets); no rate quotes | Method only; no regulatory figures. Wording must avoid advice (see disclaimer) |
| 33 | /loan-comparison-calculator | Side-by-side of two or three loans; reuses T-412 | None beyond T-412 |
| 34 | /markup-calculator | Small business; pure maths | None |
| 35 | /break-even-calculator | Small business; pure maths | None |
| 36 | /freelance-rate-calculator | Global; pure maths with user inputs | None |
| 37 | /calorie-deficit-calculator | Health cluster; reuses T-418 | Safe-minimum wording: NIDDK/NHS guidance VERIFY |
| 38 | /waist-to-height-ratio-calculator | NHS uses it alongside BMI | NHS 0.5 guidance verified (see bmi content sources) |

**Candidate not yet in the CSV:** `/rule-of-72-calculator` (doubling time = 72 ÷ rate, plus the exact value ln 2 ÷ ln(1 + r)). The compound-interest page already carries a Rule-of-72 table, so this would be a small, cheap page. Add it to the CSV if Keyword Planner shows standalone demand.

## 4. Where FigSumo can beat calculator.net
1. **Country tools and URLs.** `/us/`, `/ca/` and `/uk/` versions where the rules differ: pay, tax, mortgage, property tax, savings wrappers. Each uses local terms (paycheque/payslip, AER, LTV, CMHC) and the right currency.
2. **Dated figures with sources.** Every tax value shows its tax year and links its primary source (IRS, CRA, HMRC, CMHC, FCAC, CFPB). calculator.net pages cite few or no primary sources.
3. **Worked examples recomputed in code.** Every number in `content/` was produced by a script (`/workspace/figsumo/examples.py`, `ex2.py`), and the same numbers are the DEV-TASKS acceptance tests. Page and tool can't disagree.
4. **FAQs.** 6–7 per page; calculator.net pages have none.
5. **Correct country maths.** Examples: Canadian semi-annual compounding, the UK Personal Allowance taper, Scottish bands, the CPP2 tier. These are the exact areas where a US-built tool goes wrong.
6. **Speed and UX.** No 2010-era form layouts. Results update live and stay readable on mobile. Core Web Vitals targets are in T-601–T-610 (not yet measured: VERIFY on staging).
7. **Trust pages.** Methodology, editorial policy, corrections and named reviewer placeholders (T-701–T-706, `content/site/`).
8. **Clean taxonomy.** Short, consistent slugs and four topic hubs instead of mirrored legacy URLs (§5).

## 5. Slug changes and 301 map

Why now: figsumo.com has not been bought and nothing has been indexed, so there are no backlinks or rankings to lose. Even so, ship every redirect so that old staging links, bookmarks and any early shares resolve. DEV-TASKS T-106 implements this in `next.config.js` (`permanent: true`, which Next.js serves as 308; Google treats 308 like 301). Rules:
- One hop only: never redirect to a URL that itself redirects.
- Internal links, canonicals and the sitemap use only the new URL.
- 166 existing pages keep their slug. The changes below cover the other 43.

### 5a. Hub pages
| Old (staging) | New | Reason |
|---|---|---|
| /financial-calculators | /money | Short hub names; stop mirroring calculator.net's hub slugs |
| /fitness-health-calculators | /health | Short hub names; stop mirroring calculator.net's hub slugs |
| /math-calculators | /math | Short hub names; stop mirroring calculator.net's hub slugs |
| /other-calculators | /everyday | Short hub names; stop mirroring calculator.net's hub slugs |
| /calculators-for-your-site | /embed | Short hub names; stop mirroring calculator.net's hub slugs |

Old hub slugs were confirmed from the staging homepage navigation links on 14 Oct 2026.

### 5b. Calculator pages
| # | Old URL | New URL | Type | Reason |
|---|---|---|---|---|
| 1 | /401k-calculator | /us/401k-calculator | rename | Country-specific rules: moved into the country folder |
| 2 | /canadian-mortgage-calculator | /ca/mortgage-calculator | rename | Country-specific rules: moved into the country folder |
| 3 | /cash-back-or-low-interest-calculator | /cash-back-vs-low-apr-calculator | rename | Shorter or more accurate slug that matches what the tool does |
| 4 | /credit-cards-payoff-calculator | /credit-card-payoff-calculator | rename | Shorter or more accurate slug that matches what the tool does |
| 5 | /currency-calculator | /currency-converter | rename | It converts units, so "converter" is the accurate name |
| 6 | /debt-to-income-ratio-calculator | /debt-to-income-calculator | rename | Shorter or more accurate slug that matches what the tool does |
| 7 | /estate-tax-calculator | /us/estate-tax-calculator | rename | Country-specific rules: moved into the country folder |
| 8 | /fha-loan-calculator | /us/fha-loan-calculator | rename | Country-specific rules: moved into the country folder |
| 9 | /finance-calculator | /time-value-of-money-calculator | rename | Shorter or more accurate slug that matches what the tool does |
| 10 | /income-tax-calculator | /us/income-tax-calculator | rename | Country-specific rules: moved into the country folder |
| 11 | /ira-calculator | /us/ira-calculator | rename | Country-specific rules: moved into the country folder |
| 12 | /marriage-tax-calculator | /us/marriage-tax-calculator | rename | Country-specific rules: moved into the country folder |
| 13 | /mortgage-calculator-uk | /uk/mortgage-calculator | rename | Country-specific rules: moved into the country folder |
| 14 | /percent-off-calculator | /discount-calculator | merge | Near-duplicate intent; merged into the stronger page |
| 15 | /real-estate-calculator | /cap-rate-calculator | rename | Shorter or more accurate slug that matches what the tool does |
| 16 | /repayment-calculator | /loan-calculator | merge | Near-duplicate intent; merged into the stronger page |
| 17 | /rmd-calculator | /us/rmd-calculator | rename | Country-specific rules: moved into the country folder |
| 18 | /roth-ira-calculator | /us/roth-ira-calculator | rename | Country-specific rules: moved into the country folder |
| 19 | /sales-tax-calculator | /us/sales-tax-calculator | rename | Country-specific rules: moved into the country folder |
| 20 | /social-security-calculator | /us/social-security-calculator | rename | Country-specific rules: moved into the country folder |
| 21 | /take-home-paycheck-calculator | /us/paycheck-calculator | rename | Country-specific rules: moved into the country folder |
| 22 | /va-mortgage-calculator | /us/va-loan-calculator | rename | Country-specific rules: moved into the country folder |
| 23 | /anorexic-bmi-calculator | /bmi-calculator | remove | Sensitive framing; the BMI page covers underweight with NHS/CDC guidance |
| 24 | /overweight-calculator | /bmi-calculator | merge | Near-duplicate intent; merged into the stronger page |
| 25 | /pregnancy-calculator | /pregnancy-week-calculator | rename | Shorter or more accurate slug that matches what the tool does |
| 26 | /pregnancy-conception-calculator | /conception-calculator | merge | Near-duplicate intent; merged into the stronger page |
| 27 | /weight-watcher-points-calculator | /calorie-calculator | remove | Trademarked third-party points system; cannot be verified or licensed |
| 28 | /distance-calculator | /distance-between-points-calculator | rename | Shorter or more accurate slug that matches what the tool does |
| 29 | /greatest-common-factor-calculator | /gcf-calculator | rename | Shorter or more accurate slug that matches what the tool does |
| 30 | /least-common-multiple-calculator | /lcm-calculator | rename | Shorter or more accurate slug that matches what the tool does |
| 31 | /bandwidth-calculator | /download-time-calculator | rename | Shorter or more accurate slug that matches what the tool does |
| 32 | /conversion-calculator | /unit-converter | rename | It converts units, so "converter" is the accurate name |
| 33 | /engine-horsepower-calculator | /engine-displacement-horsepower-calculator | rename | Shorter or more accurate slug that matches what the tool does |
| 34 | /gas-mileage-calculator | /fuel-economy-calculator | rename | Shorter or more accurate slug that matches what the tool does |
| 35 | /height-calculator | /height-converter | rename | It converts units, so "converter" is the accurate name |
| 36 | /mileage-calculator | /mileage-reimbursement-calculator | rename | Shorter or more accurate slug that matches what the tool does |
| 37 | /shoe-size-conversion | /shoe-size-converter | rename | It converts units, so "converter" is the accurate name |
| 38 | /weight-calculator | /weight-converter | rename | It converts units, so "converter" is the accurate name |
| 39 | /concrete-calculator-for-your-site | /embed/concrete-calculator | rename | Embeddable widgets move under one /embed hub |
| 40 | /love-calculator-for-your-site | /embed/love-calculator | rename | Embeddable widgets move under one /embed hub |
| 41 | /math-calculator-for-your-site | /embed/basic-calculator | rename | Embeddable widgets move under one /embed hub |
| 42 | /mortgage-calculator-for-your-site | /embed/mortgage-calculator | rename | Embeddable widgets move under one /embed hub |
| 43 | /scientific-calculator-for-your-site | /embed/scientific-calculator | rename | Embeddable widgets move under one /embed hub |

Totals: 37 renames, 4 merges, 2 removals (each 301s to the closest useful page) = 43 redirects, plus 5 hub redirects.

### 5c. next.config.js snippet (generated from the CSV)
```js
// next.config.js (excerpt). Generate this from on-page-seo.csv; do not hand-edit
module.exports = {
  async redirects() {
    return [
      { source: '/financial-calculators', destination: '/money', permanent: true },
      { source: '/401k-calculator', destination: '/us/401k-calculator', permanent: true },
      { source: '/canadian-mortgage-calculator', destination: '/ca/mortgage-calculator', permanent: true },
      { source: '/cash-back-or-low-interest-calculator', destination: '/cash-back-vs-low-apr-calculator', permanent: true },
      { source: '/credit-cards-payoff-calculator', destination: '/credit-card-payoff-calculator', permanent: true },
      { source: '/currency-calculator', destination: '/currency-converter', permanent: true },
      { source: '/debt-to-income-ratio-calculator', destination: '/debt-to-income-calculator', permanent: true },
      { source: '/estate-tax-calculator', destination: '/us/estate-tax-calculator', permanent: true },
      { source: '/fha-loan-calculator', destination: '/us/fha-loan-calculator', permanent: true },
      { source: '/finance-calculator', destination: '/time-value-of-money-calculator', permanent: true },
      { source: '/income-tax-calculator', destination: '/us/income-tax-calculator', permanent: true },
      { source: '/ira-calculator', destination: '/us/ira-calculator', permanent: true },
      { source: '/marriage-tax-calculator', destination: '/us/marriage-tax-calculator', permanent: true },
      { source: '/mortgage-calculator-uk', destination: '/uk/mortgage-calculator', permanent: true },
      { source: '/percent-off-calculator', destination: '/discount-calculator', permanent: true },
      { source: '/real-estate-calculator', destination: '/cap-rate-calculator', permanent: true },
      { source: '/repayment-calculator', destination: '/loan-calculator', permanent: true },
      { source: '/rmd-calculator', destination: '/us/rmd-calculator', permanent: true },
      { source: '/roth-ira-calculator', destination: '/us/roth-ira-calculator', permanent: true },
      { source: '/sales-tax-calculator', destination: '/us/sales-tax-calculator', permanent: true },
      { source: '/social-security-calculator', destination: '/us/social-security-calculator', permanent: true },
      { source: '/take-home-paycheck-calculator', destination: '/us/paycheck-calculator', permanent: true },
      { source: '/va-mortgage-calculator', destination: '/us/va-loan-calculator', permanent: true },
      { source: '/anorexic-bmi-calculator', destination: '/bmi-calculator', permanent: true },
      { source: '/overweight-calculator', destination: '/bmi-calculator', permanent: true },
      { source: '/pregnancy-calculator', destination: '/pregnancy-week-calculator', permanent: true },
      { source: '/pregnancy-conception-calculator', destination: '/conception-calculator', permanent: true },
      { source: '/weight-watcher-points-calculator', destination: '/calorie-calculator', permanent: true },
      { source: '/distance-calculator', destination: '/distance-between-points-calculator', permanent: true },
      { source: '/greatest-common-factor-calculator', destination: '/gcf-calculator', permanent: true },
      { source: '/least-common-multiple-calculator', destination: '/lcm-calculator', permanent: true },
      { source: '/bandwidth-calculator', destination: '/download-time-calculator', permanent: true },
      { source: '/conversion-calculator', destination: '/unit-converter', permanent: true },
      { source: '/engine-horsepower-calculator', destination: '/engine-displacement-horsepower-calculator', permanent: true },
      { source: '/gas-mileage-calculator', destination: '/fuel-economy-calculator', permanent: true },
      { source: '/height-calculator', destination: '/height-converter', permanent: true },
      { source: '/mileage-calculator', destination: '/mileage-reimbursement-calculator', permanent: true },
      { source: '/shoe-size-conversion', destination: '/shoe-size-converter', permanent: true },
      { source: '/weight-calculator', destination: '/weight-converter', permanent: true },
      { source: '/concrete-calculator-for-your-site', destination: '/embed/concrete-calculator', permanent: true },
      { source: '/love-calculator-for-your-site', destination: '/embed/love-calculator', permanent: true },
      { source: '/math-calculator-for-your-site', destination: '/embed/basic-calculator', permanent: true },
      { source: '/mortgage-calculator-for-your-site', destination: '/embed/mortgage-calculator', permanent: true },
      { source: '/scientific-calculator-for-your-site', destination: '/embed/scientific-calculator', permanent: true },
      { source: '/fitness-health-calculators', destination: '/health', permanent: true },
      { source: '/math-calculators', destination: '/math', permanent: true },
      { source: '/other-calculators', destination: '/everyday', permanent: true },
      { source: '/calculators-for-your-site', destination: '/embed', permanent: true },
    ];
  },
};
```

**Check:** QA-CHECKLIST §3 requests every old URL and asserts exactly one hop to the new URL with a 200 status.
