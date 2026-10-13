# Competitor comparison: FigSumo content vs calculator.net

Prepared 14 Oct 2026 (PKT). Every calculator.net page below was fetched on 14 Oct 2026 (00:27 PKT crawl; raw HTML in `/workspace/figsumo/cnet/`, parsed into `cnet.json`, not included in the zip). **Internal planning document: do not publish.**

**How to read the numbers**
- *Their words* = all visible text including form labels and tables / *prose* = article text only (forms, tables and scripts removed).
- *Formula* = the page shows a formula. *Examples* = how many times "example" appears (approximate). *FAQ* = a dedicated FAQ section. None of their pages has one.
- *Ours* = body words excluding front matter, the number of worked examples (each fully calculated), FAQs, Markdown tables and cited sources.
- The brief caps our pages at 1,500 words, so we don't try to match their word counts. We aim to match or beat them on **usefulness**: correct country rules, worked arithmetic, current dated figures and sources.
- No text was copied. Their pages were used only to list topics and features. All wording and examples in `content/` are original.

## Summary table (top 30)

| Our page | calculator.net match | Their words / prose | Formula | Examples | FAQ | Tables / charts | Ours: words | Formula | Worked examples | FAQs | Tables | Sources | Verdict |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| /mortgage-calculator | mortgage-calculator | 4646 / 2215 | no | 3 | no | 7 / 2 | 1445 | yes | 2+ | 7 | 0 | 3 | Beats (content); matches features after T-401 |
| /ca/mortgage-calculator | canadian-mortgage-calculator | 2304 / 444 | no | 0 | no | 4 / 2 | 1226 | yes | 2+ | 7 | 1 | 4 | Beats |
| /uk/mortgage-calculator | mortgage-calculator-uk | 2499 / 638 | no | 0 | no | 5 / 2 | 1216 | yes | 2+ | 7 | 0 | 3 | Beats (after T-212/T-402) |
| /loan-calculator | loan-calculator | 1539 / 1339 | no | 2 | no | 7 / 3 | 1115 | yes | 2+ | 6 | 0 | 3 | Beats content; matches features after T-412 |
| /auto-loan-calculator | auto-loan-calculator | 2634 / 2189 | no | 4 | no | 4 / 2 | 1109 | yes | 2+ | 6 | 0 | 1 | Beats content; matches after T-407 |
| /amortization-calculator | amortization-calculator | 2092 / 982 | no | 4 | no | 7 / 2 | 974 | yes | 2+ | 6 | 2 | 2 | Beats content; matches after T-413 |
| /refinance-calculator | refinance-calculator | 2225 / 2170 | no | 3 | no | 4 / 0 | 1031 | yes | 2+ | 6 | 0 | 3 | Beats (after T-404) |
| /house-affordability-calculator | house-affordability-calculator | 1487 / 1337 | no | 0 | no | 7 / 0 | 1051 | yes | 2+ | 6 | 1 | 3 | Matches (FHA/VA presets pending VERIFY) |
| /us/paycheck-calculator | take-home-pay-calculator | 3559 / 2313 | no | 0 | no | 25 / 0 | 1154 | yes | 2+ | 7 | 1 | 5 | Beats content; behind on state tax until T-509 |
| /ca/take-home-pay-calculator | take-home-pay-calculator (nearest) | 3559 / 2313 | no | 0 | no | 25 / 0 | 1109 | yes | 2+ | 6 | 0 | 5 | Beats (no competitor tool) |
| /uk/take-home-pay-calculator | take-home-pay-calculator (nearest) | 3559 / 2313 | no | 0 | no | 25 / 0 | 1245 | yes | 2+ | 7 | 1 | 8 | Beats (no competitor tool) |
| /us/income-tax-calculator | tax-calculator | 3260 / 3010 | no | 11 | no | 7 / 0 | 1074 | yes | 2+ | 6 | 1 | 3 | Matches for W-2 filers; behind on complex returns |
| /ca/income-tax-calculator | tax-calculator (nearest) | 3260 / 3010 | no | 11 | no | 7 / 0 | 1184 | yes | 2+ | 6 | 1 | 3 | Beats (no competitor tool) |
| /uk/income-tax-calculator | tax-calculator (nearest) | 3260 / 3010 | no | 11 | no | 7 / 0 | 1012 | yes | 2+ | 6 | 0 | 6 | Beats (no competitor tool) |
| /uk/stamp-duty-calculator | mortgage-calculator-uk (nearest) | 2499 / 638 | no | 0 | no | 5 / 2 | 914 | yes | 2+ | 6 | 1 | 4 | Beats (no competitor tool) |
| /compound-interest-calculator | compound-interest-calculator | 1571 / 1472 | no | 10 | no | 4 / 0 | 1002 | yes | 2+ | 6 | 2 | 2 | Beats content; matches after T-414 |
| /savings-calculator | savings-calculator | 1741 / 1133 | no | 1 | no | 4 / 2 | 927 | yes | 2+ | 6 | 0 | 5 | Beats |
| /investment-calculator | investment-calculator | 2378 / 1731 | no | 4 | no | 10 / 2 | 955 | yes | 2+ | 6 | 1 | 3 | Matches features after T-414; beats on fees/inflation |
| /retirement-calculator | retirement-calculator | 2660 / 2551 | no | 4 | no | 4 / 0 | 1095 | yes | 2+ | 6 | 0 | 4 | Matches after T-415; beats on country notes |
| /credit-card-payoff-calculator | credit-card-payoff-calculator | 1388 / 1340 | no | 2 | no | 3 / 0 | 985 | yes | 2+ | 6 | 2 | 4 | Matches after T-408; beats content |
| /us/401k-calculator | 401k-calculator | 3336 / 3342 | no | 2 | no | 4 / 1 | 1043 | yes | 2+ | 6 | 0 | 4 | Beats (2026 limits, withdrawal cost, RMD) |
| /us/roth-ira-calculator | roth-ira-calculator | 2757 / 2564 | no | 0 | no | 3 / 1 | 1006 | yes | 2+ | 6 | 1 | 3 | Beats |
| /ca/rrsp-calculator | ira-calculator (nearest) | 3309 / 3119 | no | 0 | no | 3 / 1 | 964 | yes | 2+ | 6 | 0 | 3 | Beats (no competitor tool) |
| /ca/tfsa-calculator | roth-ira-calculator (nearest) | 2757 / 2564 | no | 0 | no | 3 / 1 | 977 | yes | 2+ | 6 | 1 | 3 | Beats (no competitor tool) |
| /uk/isa-calculator | savings-calculator (nearest) | 1741 / 1133 | no | 1 | no | 4 / 2 | 918 | yes | 2+ | 6 | 0 | 4 | Beats (no competitor tool) |
| /bmi-calculator | bmi-calculator | 1692 / 1487 | no | 3 | no | 25 / 9 | 1102 | yes | 2+ | 6 | 2 | 5 | Matches after T-417; beats on sources |
| /calorie-calculator | calorie-calculator | 4152 / 3503 | no | 6 | no | 11 / 0 | 1095 | yes | 2+ | 6 | 1 | 7 | Matches on calculation; behind on food tables (deliberate) |
| /bmr-calculator | bmr-calculator | 1228 / 1128 | no | 0 | no | 6 / 0 | 941 | yes | 2+ | 6 | 0 | 4 | Beats |
| /body-fat-calculator | body-fat-calculator | 1476 / 1269 | no | 0 | no | 18 / 0 | 982 | yes | 2+ | 6 | 0 | 3 | Matches; beats on transparency |
| /due-date-calculator | due-date-calculator | 814 / 726 | no | 1 | no | 6 / 0 | 1007 | yes | 2+ | 7 | 0 | 2 | Beats |

Charts: our charts are specified in the DEV tasks (balance/breakdown charts, with T-201 fixing units), not in the Markdown.

## Page-by-page detail

### /mortgage-calculator  ↔  calculator.net/mortgage-calculator.html
- **Their unique features:** Taxes, insurance, PMI, HOA, other costs; annual cost increases; extra monthly/yearly/one-time payments; bi-weekly; start date; amortization chart and schedule; history-of-mortgages section
- **What they have that we lacked → action taken:** Annual cost-increase inputs; one-time/yearly extra payments; schedule start date → all in T-401. Bi-weekly → added content section + T-401. History section: not added (doesn't help with the calculation).
- **Verdict:** Beats on content (PMI removal month worked from CFPB rules, rate-sensitivity and term comparison, 7 FAQs, cited sources; they cite none). Matches on features once T-401 ships.

### /ca/mortgage-calculator  ↔  calculator.net/canadian-mortgage-calculator.html
- **Their unique features:** Price, down payment, term, rate, property tax, insurance, mortgage insurance, condo fee; schedule; chart
- **What they have that we lacked → action taken:** Nothing they have is missing. Our page adds the semi-annual compounding formula, FCAC minimum down payment, CMHC table, accelerated bi-weekly and the stress test.
- **Verdict:** Beats: their prose is about 444 words with no formula or worked example; our page shows why US-style monthly compounding is wrong for Canada ($13.85/month). Depends on T-403.

### /uk/mortgage-calculator  ↔  calculator.net/mortgage-calculator-uk.html
- **Their unique features:** Interest-only vs repayment results; taxes/insurance; tracker, flexible mortgage and stamp duty sections
- **What they have that we lacked → action taken:** Mortgage-types explainer → added (fixed, tracker, discount, SVR, offset). Stamp duty → linked to our dedicated calculator.
- **Verdict:** Beats: fix-end payment shock, overpayment saving, LTV, FCA risk warning. Depends on T-212 (£ bug) and T-402.

### /loan-calculator  ↔  calculator.net/loan-calculator.html
- **Their unique features:** Three modes: amortized, deferred lump-sum, bond (zero-coupon); compounding frequency; payback frequency; schedule
- **What they have that we lacked → action taken:** Deferred and bond modes → added a content section with original examples + T-412. Compounding frequency → T-412.
- **Verdict:** Matches on features once T-412 ships. Beats on content (fee→APR example, solve-for-term formula, country disclosure rules).

### /auto-loan-calculator  ↔  calculator.net/auto-loan-calculator.html
- **Their unique features:** Price, incentives, down payment, trade-in, amount owed, state sales tax, fees, include-in-loan toggle; sections on dealer vs direct, rebates, fees, cash
- **What they have that we lacked → action taken:** Dealer vs bank vs cash → added section. All inputs → T-407. Their state dropdown pre-fills tax rates: not copied; our approach is user-entered rate (state data = VERIFY per state, phase 2).
- **Verdict:** Matches on inputs (T-407); beats with the rebate-vs-low-APR comparison and the term trade-off example.

### /amortization-calculator  ↔  calculator.net/amortization-calculator.html
- **Their unique features:** Extra monthly/yearly/one-time payments; start date; monthly/annual schedule; chart
- **What they have that we lacked → action taken:** All in T-413. Added a 15-vs-30-year comparison table (their page has none).
- **Verdict:** Matches on features (T-413); beats on explanation (first-year split, month principal overtakes interest, extra-payment savings).

### /refinance-calculator  ↔  calculator.net/refinance-calculator.html
- **Their unique features:** Current loan (balance, rate, remaining term), new loan, points, costs, cash-out; sections on refinancing student/car/credit-card/personal loans
- **What they have that we lacked → action taken:** Refinancing other debts → added a short section. Points and cash-out → T-404.
- **Verdict:** Beats: break-even month and lifetime cost including costs (their result has no break-even explanation in prose). Depends on T-404 (staging page is a loan-form clone).

### /house-affordability-calculator  ↔  calculator.net/house-affordability-calculator.html
- **Their unique features:** Income-based and budget-based modes; DTI presets for conventional 28/36, FHA, VA, custom; property tax, HOA, insurance
- **What they have that we lacked → action taken:** Budget mode → T-410. FHA/VA presets: VERIFY program ratios before adding. Added an income-sensitivity table.
- **Verdict:** Matches once T-410 ships (FHA/VA presets pending VERIFY); beats on explanation of which ratio binds.

### /us/paycheck-calculator  ↔  calculator.net/take-home-pay-calculator.html
- **Their unique features:** Many W-4 inputs (dependents, other income, itemized, multiple jobs), state/city tax rate, 65+, OBBBA tips/overtime/car-loan interest, self-employed; bracket tables 2017–2026
- **What they have that we lacked → action taken:** State/local tax → phase 2 (T-509, VERIFY per state). W-4 detail → T-421. Historical bracket tables: 2026 is shown; 2025 will come via the T-301 year selector. Older years not added (low value).
- **Verdict:** Content beats (two fully worked examples incl. SS wage cap and Additional Medicare; they have 0 examples). Features: behind until T-421; state tax is a known gap.

### /ca/take-home-pay-calculator  ↔  calculator.net/take-home-pay-calculator.html
- **Their unique features:** No Canadian equivalent; nearest is their US take-home pay page
- **What they have that we lacked → action taken:** N/A: calculator.net has no CPP/EI/provincial calculator.
- **Verdict:** Beats (no competitor page). Depends on T-501.

### /uk/take-home-pay-calculator  ↔  calculator.net/take-home-pay-calculator.html
- **Their unique features:** No UK equivalent; nearest is their US take-home pay page
- **What they have that we lacked → action taken:** N/A: no PAYE/NI/student loan tool on calculator.net.
- **Verdict:** Beats (no competitor page). Depends on T-503.

### /us/income-tax-calculator  ↔  calculator.net/tax-calculator.html
- **Their unique features:** Very detailed W-2 fields, interest/dividends, capital gains, deductions, credits (child, education, EITC…), AMT; 2026 and 2025
- **What they have that we lacked → action taken:** Credits beyond CTC, AMT, self-employment tax: flagged as 'not included' on the page; candidate T-301 phase 2. 2025 year → T-301 selector.
- **Verdict:** Content beats on clarity (bracket walk-through, marginal vs effective, verified 2026 tables incl. HoH/MFS, LTCG thresholds). Features: they lead on breadth until phase 2. Verdict: matches for the typical W-2 filer, behind for complex returns.

### /ca/income-tax-calculator  ↔  calculator.net/tax-calculator.html
- **Their unique features:** No Canadian equivalent; nearest is their US tax calculator
- **What they have that we lacked → action taken:** N/A.
- **Verdict:** Beats (no competitor page; all 13 jurisdictions' 2026 brackets from CRA). Depends on T-502.

### /uk/income-tax-calculator  ↔  calculator.net/tax-calculator.html
- **Their unique features:** No UK equivalent; nearest is their US tax calculator
- **What they have that we lacked → action taken:** N/A.
- **Verdict:** Beats (no competitor page; savings/dividend ordering, taper, Scotland). Depends on T-504.

### /uk/stamp-duty-calculator  ↔  calculator.net/mortgage-calculator-uk.html
- **Their unique features:** No stamp duty calculator; their UK mortgage page has a short stamp duty section
- **What they have that we lacked → action taken:** N/A.
- **Verdict:** Beats (no competitor tool; matches GOV.UK's own £295,000 example). Depends on T-505.

### /compound-interest-calculator  ↔  calculator.net/compound-interest-calculator.html
- **Their unique features:** Rate converter between compounding frequencies; formulas; history section
- **What they have that we lacked → action taken:** Rate converter → T-414. Added a Rule-of-72 vs exact table and compounding-on-debt section. History not added.
- **Verdict:** Matches on features (T-414); beats with contributions, frequency comparison table and APY/AER country notes.

### /savings-calculator  ↔  calculator.net/savings-calculator.html
- **Their unique features:** Initial deposit, annual and monthly contributions with yearly increase, interest rate, compounding, tax rate; schedule
- **What they have that we lacked → action taken:** All in T-409/T-414 (deposit increase, tax rate).
- **Verdict:** Beats: time-to-goal and required-deposit modes with worked examples; deposit-protection limits for US/CA/UK (FDIC/CDIC/FSCS £120,000).

### /investment-calculator  ↔  calculator.net/investment-calculator.html
- **Their unique features:** Solve for end amount, contribution, return, starting amount or length; contribution at start/end; schedule; sections on asset types
- **What they have that we lacked → action taken:** All solve-for modes → T-414. Asset-type encyclopaedia not added (low calculation value; could add later). Added lump-sum vs regular comparison and fee drag example.
- **Verdict:** Matches on features (T-414); beats on fees, inflation and scenario band.

### /retirement-calculator  ↔  calculator.net/retirement-calculator.html
- **Their unique features:** Four sub-calculators: how much needed, how to save, how much to withdraw, how long money lasts; 10%/80%/4% rules; Social Security sections
- **What they have that we lacked → action taken:** Drawdown tabs → T-415. Rules of thumb → added section (labelled as non-official).
- **Verdict:** Matches on features (T-415); beats with country pension notes (SSA FRA 67, CPP 60–70 adjustment, UK SPA) and the real-value figure.

### /credit-card-payoff-calculator  ↔  calculator.net/credit-card-payoff-calculator.html
- **Their unique features:** Up to 20 cards, avalanche/snowball comparison
- **What they have that we lacked → action taken:** Multi-card mode → T-408.
- **Verdict:** Matches on features (T-408); beats with the minimum-payment trap example and US/UK regulatory notes.

### /us/401k-calculator  ↔  calculator.net/401k-calculator.html
- **Their unique features:** Main calculator plus early-withdrawal cost calculator and match maximiser; sections on RMDs, Roth 401(k), distributions
- **What they have that we lacked → action taken:** Early-withdrawal cost and RMDs → added sections (IRS-cited). Match maximiser → T-416 'match left on the table'.
- **Verdict:** Matches; beats on accuracy (2026 limits incl. age 60–63 catch-up and §415(c) $72,000).

### /us/roth-ira-calculator  ↔  calculator.net/roth-ira-calculator.html
- **Their unique features:** Balance, contribution, return, maximise-contributions toggle, marginal tax rate (vs taxable); conversion section
- **What they have that we lacked → action taken:** Conversion → added section. Taxable comparison → in calculator spec (T-416).
- **Verdict:** Beats: 2026 limit with MAGI phase-out worksheet example (staging default is still $7,000, see T-305).

### /ca/rrsp-calculator  ↔  calculator.net/ira-calculator.html
- **Their unique features:** No RRSP tool; nearest is their US IRA calculator
- **What they have that we lacked → action taken:** N/A.
- **Verdict:** Beats (no competitor page). Depends on T-506.

### /ca/tfsa-calculator  ↔  calculator.net/roth-ira-calculator.html
- **Their unique features:** No TFSA tool; nearest is their Roth IRA calculator
- **What they have that we lacked → action taken:** N/A. Added a numeric TFSA-vs-RRSP comparison.
- **Verdict:** Beats (no competitor page; full CRA limit table and room calculation). Depends on T-507.

### /uk/isa-calculator  ↔  calculator.net/savings-calculator.html
- **Their unique features:** No ISA tool; nearest is their savings calculator
- **What they have that we lacked → action taken:** N/A.
- **Verdict:** Beats (no competitor page; LISA bonus and withdrawal-charge example, 2027 cash ISA change). Depends on T-508.

### /bmi-calculator  ↔  calculator.net/bmi-calculator.html
- **Their unique features:** Adults and children 2–20 with charts and tables, BMI Prime, Ponderal Index, risk sections
- **What they have that we lacked → action taken:** Children's percentiles → T-417. Added a BMI weight-range table by height. BMI Prime/Ponderal Index: not added (no authoritative clinical source; could add as maths-only extras later).
- **Verdict:** Matches once T-417 ships; beats with CDC/NHS-sourced categories and the NHS ethnicity thresholds.

### /calorie-calculator  ↔  calculator.net/calorie-calculator.html
- **Their unique features:** kcal/kJ, three equations, zigzag cycling, sample meal plans, food calorie tables, exercise tables
- **What they have that we lacked → action taken:** Equations and kJ → T-418. Food/exercise tables: not added. They need a cited dataset (e.g. USDA FoodData Central); candidate phase 2. Meal plans/zigzag: not added (diet advice beyond appropriate scope).
- **Verdict:** Matches on calculation; behind on reference tables (deliberate, until sourced data exists); beats on safety wording and sources.

### /bmr-calculator  ↔  calculator.net/bmr-calculator.html
- **Their unique features:** Three equations, activity table
- **What they have that we lacked → action taken:** All in T-418.
- **Verdict:** Beats: three equations compared on one worked example, imperial conversion example, cited primary papers.

### /body-fat-calculator  ↔  calculator.net/body-fat-calculator.html
- **Their unique features:** Navy method, BMI-based estimate, reference tables, fat categories
- **What they have that we lacked → action taken:** Category tables (theirs come from a fitness organisation): not added. No authoritative clinical cut-offs; the page says so. Fat/lean mass → T-419.
- **Verdict:** Matches; beats on transparency (inch vs metric equation difference shown, unit-stable results).

### /due-date-calculator  ↔  calculator.net/due-date-calculator.html
- **Their unique features:** LMP, cycle length, conception, ultrasound, IVF (day 3/5/6)
- **What they have that we lacked → action taken:** All methods → T-420.
- **Verdict:** Beats: their prose is about 726 words; ours has ACOG/NHS sources, milestones and consistent cross-method examples.

## Cross-cutting advantages we have on all 30 pages
- Country-specific URLs and rules for the US, Canada and the UK. calculator.net has US-centric tax/pay tools and no CA/UK pay, tax, stamp duty, RRSP, TFSA or ISA tools.
- A dated tax-year label and an authoritative source list on every page. Their pages cite few or no primary sources.
- 6–7 FAQs per page (they have none), each answering a real follow-up question.
- Worked examples whose arithmetic was recomputed in code (`/workspace/figsumo/examples.py`, `ex2.py`).

## Where we are deliberately behind (and why)
- Food and exercise calorie tables, meal plans, zig-zag dieting: these need a cited dataset and go beyond appropriate health guidance. Phase 2 at most.
- US state income tax, city tax and the full 1040 (AMT, education credits, EITC): phase 2, with each state's figures VERIFIED.
- History/encyclopaedia sections (history of mortgages, compound interest history, asset-class primers): low calculation value. We may add short original versions later if Search Console shows demand.

## Lighter comparison: all other pages in on-page-seo.csv (targets for later batches)

For every page not in the top 30, this table records calculator.net's equivalent (fetched 14 Oct 2026): total words, number of inputs, tables, a chart flag and the topics of its main sections (their H2 headings, listed as topics only; never copy their wording). The **target** column is the minimum our page must reach.

Standard target for every row: our CONTENT-TEMPLATE (ONPAGE-SEO.md §3), meaning 900–1,500 words, a formula with variables, 2 worked examples recomputed in code, 5–8 FAQs and primary sources, **plus** every input/mode listed under their features unless the 'Notes' column says otherwise.

| Our URL | Status | calculator.net page | Their words | Inputs | Tables | Chart | Their key sections (topics) | Notes / extra target |
|---|---|---|---|---|---|---|---|---|
| /annuity-calculator | keep | annuity-calculator.html | 3470 | 5 | 4 | yes | Accumulation Schedule; General Annuity Information; Quick Pros and Cons of Annuities; Fixed vs. Variable Annuities; Immediate vs. Deferred Annuities; Surrendering an Annuity; Annui |  |
| /annuity-payout-calculator | keep | annuity-payout-calculator.html | 2398 | 5 | 3 | yes | Annuity Balances; Qualified vs. Non-Qualified Annuities; Early Withdrawals; Phases of an Annuity; Payout Options |  |
| /apr-calculator | keep | apr-calculator.html | 1181 | 15 | 9 | yes | General APR Calculator; Real APR: 6.563%; Mortgage APR Calculator; Real APR: 6.367%; Limitations of the APR; Types of APRs; APR vs. APY |  |
| /auto-lease-calculator | keep | auto-lease-calculator.html | 2334 | 9 | 2 | yes | Auto Leases; Why Lease?; Getting out of a Car Lease Early; Explanation of How the Calculator Computes Monthly Leases |  |
| /average-return-calculator | keep | average-return-calculator.html | 676 | 282 | 5 | yes | Average Return Based on Cash Flow; Average and Cumulative Return; Average Return; Average Rate of Return; Cumulative Return |  |
| /boat-loan-calculator | keep | boat-loan-calculator.html | 1376 | 10 | 4 | yes | Amortization schedule; Boat Loan; Fees Associated with Buying a Boat; Ongoing Costs of Boat Ownership |  |
| /bond-calculator | keep | bond-calculator.html | 1862 | 12 | 3 | yes | Bond pricing calculator; What is a bond?; Bond structure; How to calculate the bond price?; Clean price and dirty price |  |
| /budget-calculator | keep | budget-calculator.html | 2541 | 83 | 1 | yes | What is a Budget?; How to Budget; Budget Template; Incomes; Expenses |  |
| /business-loan-calculator | keep | business-loan-calculator.html | 1122 | 9 | 2 | yes | SBA Loans; SBA Loan Types; Other Loan Types; Business Loan Fees |  |
| /cash-back-vs-low-apr-calculator | rename (301) | cash-back-or-low-interest-calculator.html | 1655 | 10 | 3 | yes | Cash Rebate; Low-Interest Financing; Which One to Choose?; Considerations |  |
| /cd-calculator | keep | cd-calculator.html | 2285 | 6 | 4 | yes | Accumulation Schedule; What is a Certificate of Deposit?; FDIC-Backed; Where and How to Purchase CDs; History of CDs; How to Use CDs; Withdrawing from a CD; CD Ladder; APY vs. APR; |  |
| /college-cost-calculator | keep | college-cost-calculator.html | 2615 | 9 | 2 | yes | How Much Does College Cost?; Reference:; College-Specific Net Price Calculators; Higher Education in the U.S.; How Much Does College Cost?; Financial Aid; The 529 Savings Plan; 529 |  |
| /commission-calculator | keep | commission-calculator.html | 1034 | 32 | 5 | yes | Tiered Commission Calculator; What is a commission?; Different commission structures |  |
| /credit-card-calculator | keep | credit-card-calculator.html | 3170 | 5 | 10 | yes | Credit Cards; Advantages; Disadvantages; Types of Credit Cards; How to Calculate Interest Charges on Credit Cards |  |
| /currency-converter | rename (301) | currency-calculator.html | 1912 | 5 | 2 | yes | With Live Exchange Rate; Customized Currency Exchange Rate; Market Exchange Rates Table; Important Key Terms; What is Currency?; Forex and Exchange Rates; Factors that Influence Ex | T-406 fixed 0.92 rate; add dated reference rates |
| /debt-consolidation-calculator | keep | debt-consolidation-calculator.html | 821 | 86 | 4 | yes | Debt Consolidation; Considerations; Fix the Real Problem First |  |
| /debt-payoff-calculator | keep | debt-payoff-calculator.html | 1612 | 84 | 4 | yes | Pay off Debts Early; How to Pay Off Debts Early?; Alternative Methods of Managing Mounting Debt |  |
| /debt-to-income-calculator | rename (301) | debt-ratio-calculator.html | 938 | 26 | 1 | yes | What is a Debt-to-Income Ratio?; House Affordability; Financial Health; How to Lower Debt-to-Income Ratio |  |
| /depreciation-calculator | keep | depreciation-calculator.html | 884 | 8 | 11 | yes | Depreciation; Methods of Depreciation; Straight-Line Depreciation Method; Declining Balance Depreciation Method; Sum of the Years' Digits Depreciation Method; Units of Production D |  |
| /discount-calculator | keep | discount-calculator.html | 283 | 4 | 2 | yes | — |  |
| /down-payment-calculator | keep | down-payment-calculator.html | 1617 | 18 | 6 | yes | Use the Upfront Cash Available; Home Price: $434,783; Use the Home Price; Cash Needed: $115,000; Use the Home Price and Upfront Cash Available; Down Payment: 17.0%; What is a Down  |  |
| /us/estate-tax-calculator | rename (301) | estate-tax-calculator.html | 2477 | 12 | 2 | yes | U.S. Estate and Gift Tax Exemptions and Tax Rates; Estate Tax; Inheritance Tax; Determining Taxable Value of an Estate; Reducing Estate Tax; Estate Planning | T-302 default exemption $13.61M is the 2024 figure; 2026 is $15M |
| /us/fha-loan-calculator | rename (301) | fha-loan-calculator.html | 3611 | 28 | 7 | yes | Amortization schedule; Mortgage Insurance Premiums; 2026 FHA Annual MIP Rates; Pros and Cons of FHA Loans; Home Affordability; Prepayment; FHA 203K Loans | T-405 generic loan form; add UFMIP/annual MIP (VERIFY HUD rates) |
| /time-value-of-money-calculator | rename (301) | finance-calculator.html | 1377 | 7 | 11 | yes | Schedule; The Time Value of Money (TVM); PMT; Finance Class; The Importance of the Finance Calculator |  |
| /future-value-calculator | keep | future-value-calculator.html | 538 | 4 | 3 | yes | Schedule; Future Value; The Time Value of Money |  |
| /heloc-calculator | keep | heloc-calculator.html | 2426 | 10 | 6 | yes | Amortization schedule; The amount of line of credit you can borrow; What is a HELOC?; Costs associated with a HELOC; Usage and alternatives to HELOC |  |
| /home-equity-loan-calculator | keep | home-equity-loan-calculator.html | 2044 | 8 | 6 | yes | Monthly pay:   $1,433.48; Amortization schedule; The loan amount you can borrow; What is a home equity loan?; Costs associated with a home equity loan; Usage and alternatives to ho |  |
| /inflation-calculator | keep | inflation-calculator.html | 2503 | 11 | 8 | yes | Inflation Calculator with U.S. CPI Data; Forward Flat Rate Inflation Calculator; Backward Flat Rate Inflation Calculator; Historical Inflation Rate for the U.S.; What is Inflation? | phase 2 CPI data |
| /interest-calculator | keep | interest-calculator.html | 1675 | 9 | 8 | yes | Accumulation Schedule; Simple Interest; Compound Interest; The Rule of 72; Fixed vs. Floating Interest Rate; Contributions; Tax Rate; Inflation Rate |  |
| /interest-rate-calculator | keep | interest-rate-calculator.html | 1749 | 4 | 3 | yes | What is Interest Rate?; Uncontrollable Economic Factors that Affect Interest Rate; Controllable Factors that Determine Interest Rate; Real Interest Rate |  |
| /us/ira-calculator | rename (301) | ira-calculator.html | 3309 | 7 | 3 | yes | Annual Schedule; Traditional IRA; Roth IRA; SEP IRA; SIMPLE IRA; IRA Rollovers; Comparison to 401(k)s; Investments Options in an IRA; Self-Directed IRA | T-303 default 7000 -> 7500 (2026) |
| /irr-calculator | keep | irr-calculator.html | 1562 | 58 | 4 | yes | IRR based on fixed cash flow; IRR based on irregular cash flow; What is the internal rate of return?; How is IRR calculated?; What is the use of IRR?; Limitations of IRR |  |
| /lease-calculator | keep | lease-calculator.html | 2022 | 6 | 5 | yes | What is a Lease?; Residual Value; Leasing a Car; Business Leasing; Leasing Real Estate |  |
| /margin-calculator | keep | margin-calculator.html | 1118 | 10 | 4 | yes | Profit Margin Calculator; Stock Trading Margin Calculator; Currency Exchange Margin Calculator; Profit Margin; Margin Trading; Currency Exchange Margin |  |
| /us/marriage-tax-calculator | rename (301) | marriage-calculator.html | 700 | 22 | 1 | yes | Benefits of Filing Jointly as Married Spouses; Married Filing Separately; The Marriage Penalty | T-301 confirm brackets year (likely 2024) |
| /mortgage-amortization-calculator | keep | mortgage-amortization-calculator.html | 3225 | 11 | 5 | yes | Amortization schedule; What Is Amortization?; Amortizing a Mortgage Faster and Saving Money; Drawbacks of Amortizing a Mortgage Faster |  |
| /mortgage-payoff-calculator | keep | mortgage-payoff-calculator.html | 1758 | 14 | 6 | yes | If you know the remaining loan term; Payoff in 17 years and 3 months; If you don't know the remaining loan term; Payoff in 14 years and 4 months; Principal and Interest of a Mortga |  |
| /mutual-fund-calculator | keep | mutual-fund-calculator.html | 1055 | 9 | 2 | yes | Mutual fund fees and expenses; Transaction Fees; Periodic Fees |  |
| /payback-period-calculator | keep | payback-period-calculator.html | 1306 | 108 | 19 | yes | Fixed Cash Flow; Irregular Cash Flow Each Year; Cash Flow; Discounted Cash Flow; Discount Rate; Payback Period; Discounted Payback Period |  |
| /payment-calculator | keep | payment-calculator.html | 2062 | 4 | 8 | yes | Amortization schedule; Fixed Term; Fixed Monthly Payment Amount; Interest Rate (APR); Variable vs. Fixed; Variable Rate Information | T-405 identical to loan calc; add solve-for-term |
| /pension-calculator | keep | pension-calculator.html | 2281 | 19 | 3 | yes | Lump sum payout or monthly pension income?; Single-life or joint-and-survivor pension payout?; Should you work longer for a better pension?; Pensions; Defined-Benefit Plan; Defined | none |
| /discount-calculator | merge (301) | percent-off-calculator.html | 318 | 5 | 2 | yes | — | Merged/removed: 301 only, no content needed. merge |
| /personal-loan-calculator | keep | personal-loan-calculator.html | 2304 | 9 | 5 | yes | Monthly pay:   $424.94; Amortization schedule; What are Personal Loans?; Why Use Personal Loans?; Personal Loans and Creditworthiness; Personal Loan Application; Personal Loan Fees |  |
| /present-value-calculator | keep | present-value-calculator.html | 562 | 6 | 4 | yes | Present Value of Future Money; Present Value of Periodical Deposits; Present Value; Net Present Value; The Time Value of Money |  |
| /cap-rate-calculator | rename (301) | real-estate-calculator.html | 352 | 0 | 0 | yes | Financial; Other |  |
| /rent-calculator | keep | rent-calculator.html | 1732 | 3 | 1 | yes | How Much Rent Can I Afford?; What is Rent?; The Renting Process; Rent vs. Buy; Important Considerations When Renting; Ways to Reduce the Amount Spent on Rent; Practical Renting Poi |  |
| /rent-vs-buy-calculator | keep | rent-vs-buy-calculator.html | 2392 | 22 | 4 | yes | What to Expect When Buying a Home; What to Know When Renting; Should I Consider Buying or Renting? |  |
| /rental-property-calculator | keep | rental-property-calculator.html | 1381 | 27 | 6 | yes | Rental Property Investments; General Guidelines; Internal Rate of Return; Capitalization Rate; Cash Flow Return on Investment; Things to Keep in Mind; Other Types of Real Estate In |  |
| /loan-calculator | merge (301) | repayment-calculator.html | 971 | 7 | 4 | yes | Fixed Loan Term; Fixed Installments; Mortgages; Auto Loan; Student Loans; Credit Cards; How to Repay Loans Faster | Merged/removed: 301 only, no content needed. merge |
| /us/rmd-calculator | rename (301) | rmd-calculator.html | 2537 | 5 | 4 | yes | RMDs: Required Minimum Distributions; Important Dates for Taking RMDs; How RMDs are Calculated; What Retirement Accounts do RMDs Apply to?; Do I Have to Calculate My RMD for Every  |  |
| /roi-calculator | keep | roi-calculator.html | 749 | 3 | 10 | yes | Difficulty in Usage; Annualized ROI |  |
| /salary-calculator | keep | salary-calculator.html | 2960 | 6 | 4 | yes | Salary; Wage; Miscellaneous Employee Benefits; Self-employed Contractors; How Unadjusted and Adjusted Salaries are calculated?; Different Pay Frequencies; U.S. Salary Information;  |  |
| /us/sales-tax-calculator | rename (301) | sales-tax-calculator.html | 1464 | 3 | 3 | yes | What is Sales Tax?; U.S. Sales Tax; U.S. History of Sales Tax; How to Deduct Sales Tax in the U.S.?; Value-Added Tax (VAT) | state/local rate lookup optional |
| /simple-interest-calculator | keep | simple-interest-calculator.html | 1313 | 6 | 10 | yes | Schedule; What is Simple Interest?; Simple Interest Formula; What Financial Instruments Use Simple Interest?; Simple Interest Versus Compound Interest; Compound Interest Formula; W |  |
| /us/social-security-calculator | rename (301) | social-security-calculator.html | 3168 | 10 | 2 | yes | Determine the ideal application age; Compare two application ages; Social Security in the U.S.; Cost-of-Living Adjustment; Social Security Tax; Social Security for Retirement; Soci |  |
| /student-loan-calculator | keep | student-loan-calculator.html | 1802 | 16 | 9 | yes | Simple Student Loan Calculator; Student Loan Repayment Calculator; Pay off in 6 years and 2 months; Student Loan Projection Calculator; Federal Student Loan; State Student Loan; Pr | T-405 generic loan form; add extra payments |
| /us/va-loan-calculator | rename (301) | va-mortgage-calculator.html | 3083 | 25 | 7 | yes | Amortization schedule; VA Funding Fee; Other Common Fees Paid at Closing; Pros and Cons of VA Loans; Prepayment; House Affordability | T-405 generic loan form; add VA funding fee (VERIFY VA table) |
| /vat-calculator | keep | vat-calculator.html | 995 | 4 | 2 | yes | What is VAT?; Simplified Example of the Process of VAT; VAT vs. Sales Tax |  |
| /bmi-calculator | remove (301) | anorexic-bmi-calculator.html | 367 | 6 | 5 | yes | Reference | Merged/removed: 301 only, no content needed. remove |
| /army-body-fat-calculator | keep | army-body-fat-calculator.html | 509 | 4 | 4 | yes | Reference | VERIFY current Army method (one-site tape since 2023?) |
| /bac-calculator | keep | bac-calculator.html | 935 | 17 | 4 | yes | Alcohol and health; Effects by blood alcohol concentration |  |
| /body-surface-area-calculator | keep | body-surface-area-calculator.html | 736 | 5 | 4 | yes | Table of average BSAs |  |
| /body-type-calculator | keep | body-type-calculator.html | 1117 | 8 | 1 | yes | Female body shapes in the fashion industry; What is my body shape?; Waist-hip ratio |  |
| /calories-burned-calculator | keep | calories-burned-calculator.html | 2204 | 12 | 15 | yes | Calorie Burned by Distance Calculator; Factors affecting calories burned; Calculating calories burned |  |
| /carbohydrate-calculator | keep | carbohydrate-calculator.html | 1124 | 8 | 5 | yes | What are Carbohydrates?; Types of Carbohydrates; How Many Carbs Should I Eat? |  |
| /conception-calculator | keep | conception-calculator.html | 1086 | 1 | 1 | yes | The Fertile Window; Love and Childbearing; Making the Fertility Window Work for You; Follow Your Feelings |  |
| /fat-intake-calculator | keep | fat-intake-calculator.html | 857 | 8 | 6 | yes | Different Types of Fat; Unhealthy Dietary Fat; Healthier Dietary Fat; Daily Fat Intake |  |
| /gfr-calculator | keep | gfr-calculator.html | 881 | 7 | 6 | yes | GFR Calculator for Adults; GFR Calculator for Children; What is Glomerular filtration rate (GFR)?; Population Mean Estimated GFR; Chronic Kidney Disease Stages; Measuring GFR | VERIFY which equation is implemented |
| /healthy-weight-calculator | keep | healthy-weight-calculator.html | 1014 | 3 | 5 | yes | What is a Healthy Weight?; Effects of Being Underweight, Overweight, and Obese; Maintaining a Healthy Weight |  |
| /ideal-weight-calculator | keep | ideal-weight-calculator.html | 1445 | 4 | 10 | yes | How Much Should I Weigh?; Formulas for Finding the Ideal Weight; Limitations of our IBW calculator |  |
| /lean-body-mass-calculator | keep | lean-body-mass-calculator.html | 657 | 5 | 14 | yes | Lean Body Mass Formulas for Adults; Lean Body Mass Formula for Children; Lean Body Mass vs. Fat Free Mass |  |
| /macro-calculator | keep | macro-calculator.html | 1387 | 9 | 6 | yes | What are Macronutrients (Macros)?; Daily Calorie Needs; Macronutrients in Common Foods |  |
| /one-rep-max-calculator | keep | one-rep-max-calculator.html | 2955 | 3 | 2 | yes | How to use this calculator to save (and improve) your 1RM; Why one rep max is important; How to measure one rep max; How to directly measure one rep max; How to estimate one rep ma |  |
| /bmi-calculator | merge (301) | overweight-calculator.html | 749 | 6 | 5 | yes | What Is Being Overweight and Obesity?; Genetics Matter, But Don't Tell the Whole Story; Physical Activity Makes the Difference; It Helps to Never Gain Too Much Weight | Merged/removed: 301 only, no content needed. merge |
| /ovulation-calculator | keep | ovulation-calculator.html | 693 | 1 | 1 | yes | Ovulation and Conception; Ovulation Prediction |  |
| /pace-calculator | keep | pace-calculator.html | 1610 | 51 | 8 | yes | Multipoint Pace Calculator; Pace Converter; Finish Time Calculator; Typical Races and World Record Paces; Training Through Pace and Heart Rate; Measuring and Estimating Heart Rate  |  |
| /period-calculator | keep | period-calculator.html | 480 | 2 | 1 | yes | Menstrual cycle |  |
| /pregnancy-week-calculator | rename (301) | pregnancy-calculator.html | 1163 | 4 | 7 | yes | Pregnancy Term & Due Date; Pregnancy Detection; Pregnancy Management |  |
| /conception-calculator | merge (301) | pregnancy-conception-calculator.html | 767 | 4 | 5 | yes | When Did I Conceive?; Fertilization, Conception, and Pregnancy | Merged/removed: 301 only, no content needed. merge |
| /pregnancy-weight-gain-calculator | keep | pregnancy-weight-gain-calculator.html | 1563 | 8 | 7 | yes | Recommended weight gain during pregnancy; Potential complications of suboptimal weight gain; What to eat during pregnancy? |  |
| /protein-calculator | keep | protein-calculator.html | 1234 | 8 | 8 | yes | What are proteins?; How much protein do I need?; Foods high in protein |  |
| /target-heart-rate-calculator | keep | target-heart-rate-calculator.html | 1978 | 3 | 5 | yes | What is heart rate; Resting heart rate; Heart rate reserve; Target heart rate zones; Methods for measuring intensity |  |
| /tdee-calculator | keep | tdee-calculator.html | 544 | 8 | 5 | yes | What is TDEE?; How is TDEE calculated? |  |
| /calorie-calculator | remove (301) | weight-watchers-points-calculator.html | 631 | 28 | 4 | yes | Latest Calculator; Old Points Calculator (U.S.); Old Points Calculator; Old Daily Target Calculator | Merged/removed: 301 only, no content needed. remove |
| /area-calculator | keep | area-calculator.html | 3254 | 30 | 28 | yes | Rectangle; Triangle; Trapezoid; Circle; Sector; Ellipse; Parallelogram; Rectangle; Triangle; Trapezoid; Circle; Sector; Ellipse; Parallelogram; Common Area Units |  |
| /average-calculator | keep | average-calculator.html | 171 | 0 | 6 | yes | What is an average? |  |
| /basic-calculator | keep | basic-calculator.html | 40 | 0 | 1 | yes | — |  |
| /big-number-calculator | keep | big-number-calculator.html | 358 | 1 | 3 | yes | — |  |
| /binary-calculator | keep | binary-calculator.html | 1530 | 5 | 12 | yes | Binary Calculation—Add, Subtract, Multiply, or Divide; Convert Binary Value to Decimal Value; Convert Decimal Value to Binary Value; Binary Addition; Binary Subtraction; Binary Mul |  |
| /circle-calculator | keep | circle-calculator.html | 585 | 4 | 2 | yes | Parts of a circle; The constant π; Circle formulas |  |
| /common-factor-calculator | keep | common-factor-calculator.html | 274 | 0 | 1 | yes | What is a factor?; What is a common factor? |  |
| /confidence-interval-calculator | keep | confidence-interval-calculator.html | 618 | 4 | 4 | yes | What is the confidence interval? |  |
| /distance-between-points-calculator | rename (301) | distance-calculator.html | 1111 | 30 | 13 | yes | 2D Distance Calculator; 3D Distance Calculator; Distance Based on Latitude and Longitude; Distance on Map; Distance in a coordinate system; Distance between two points on Earth's s |  |
| /exponent-calculator | keep | exponent-calculator.html | 799 | 3 | 30 | yes | What is an exponent?; Basic exponent laws and rules |  |
| /factor-calculator | keep | factor-calculator.html | 297 | 1 | 2 | yes | What is a factor? |  |
| /fraction-calculator | keep | fraction-calculator.html | 1230 | 19 | 7 | yes | Mixed Numbers Calculator; Simplify Fractions Calculator; Decimal to Fraction Calculator; Fraction to Decimal Calculator; Big Number Fraction Calculator; Addition:; Subtraction:; Mu |  |
| /gcf-calculator | rename (301) | gcf-calculator.html | 526 | 0 | 4 | yes | What is the Greatest Common Factor (GCF)?; Prime Factorization Method; Euclidean Algorithm |  |
| /half-life-calculator | keep | half-life-calculator.html | 384 | 7 | 4 | yes | Half-Life Calculator; Half-Life, Mean Lifetime, and Decay Constant Conversion; Definition and Formula; Derivation of the Relationship Between Half-Life Constants |  |
| /hex-calculator | keep | hex-calculator.html | 1976 | 5 | 13 | yes | Hexadecimal Calculation—Add, Subtract, Multiply, or Divide; Convert Hexadecimal Value to Decimal Value; Convert Decimal Value to Hexadecimal Value; Hex Addition; Hex Subtraction; H |  |
| /lcm-calculator | rename (301) | lcm-calculator.html | 499 | 0 | 8 | yes | What is the Least Common Multiple (LCM)?; Brute Force Method; Prime Factorization Method; Greatest Common Divisor Method |  |
| /log-calculator | keep | log-calculator.html | 436 | 3 | 9 | yes | What is Log?; Basic Log Rules |  |
| /long-division-calculator | keep | long-division-calculator.html | 821 | 2 | 12 | yes | Components of division; How to perform long division? |  |
| /matrix-calculator | keep | matrix-calculator.html | 3061 | 8 | 161 | yes | Matrix addition; Matrix subtraction; Matrix multiplication; Power of a matrix; Transpose of a matrix; Determinant of a matrix; Inverse of a matrix |  |
| /mean-median-mode-range-calculator | keep | mean-median-mode-range-calculator.html | 1217 | 0 | 4 | yes | Mean; Median; Mode; Range |  |
| /number-sequence-calculator | keep | number-sequence-calculator.html | 1004 | 7 | 16 | yes | Arithmetic Sequence Calculator; Geometric Sequence Calculator; Fibonacci Sequence Calculator; Arithmetic Sequence; Geometric Sequence; Fibonacci Sequence |  |
| /p-value-calculator | keep | p-value-calculator.html | 243 | 6 | 1 | yes | — |  |
| /percent-error-calculator | keep | percent-error-calculator.html | 601 | 2 | 11 | yes | Percentage Error; Computing percentage error; Negative percentage error |  |
| /percentage-calculator | keep | percent-calculator.html | 604 | 15 | 13 | yes | Percentage Calculator in Common Phrases; Percentage Difference Calculator; Percentage Change Calculator; What is a percentage?; Percentage formula; Percentage difference formula; P |  |
| /permutation-and-combination-calculator | keep | permutation-and-combination-calculator.html | 1008 | 2 | 18 | yes | Permutations; Combinations |  |
| /prime-factorization-calculator | keep | prime-factorization-calculator.html | 1812 | 1 | 2 | yes | What is a prime number?; What is prime factorization?; Prime factorization of common numbers |  |
| /probability-calculator | keep | probability-calculator.html | 2520 | 18 | 15 | yes | Probability of Two Events; Probability Solver for Two Events; Probability of a Series of Independent Events; Probability of a Normal Distribution; Probability of Two Events; Comple |  |
| /pythagorean-theorem-calculator | keep | pythagorean-theorem-calculator.html | 678 | 6 | 11 | yes | Pythagorean Theorem |  |
| /quadratic-formula-calculator | keep | quadratic-formula-calculator.html | 416 | 3 | 26 | yes | Derivation of the Quadratic Formula |  |
| /random-number-generator | keep | random-number-generator.html | 377 | 6 | 5 | yes | Comprehensive Version |  |
| /ratio-calculator | keep | ratio-calculator.html | 562 | 8 | 3 | yes | Ratio Scaling Calculator; What is Ratio?; Typical Aspect Ratios and Sizes of Screens and Videos |  |
| /right-triangle-calculator | keep | right-triangle-calculator.html | 674 | 10 | 13 | yes | Right triangle; Special Right Triangles |  |
| /root-calculator | keep | root-calculator.html | 406 | 4 | 5 | yes | Square Root Calculator; Cube Root Calculator; General Root Calculator; Estimating a Root; Estimating an nth Root |  |
| /rounding-calculator | keep | rounding-calculator.html | 924 | 4 | 19 | yes | Rounding Methods; Rounding to fractions |  |
| /sample-size-calculator | keep | sample-size-calculator.html | 1405 | 8 | 5 | yes | Find Out The Sample Size; Find Out the Margin of Error; Statistics of a Random Sample; Confidence Level; Confidence Interval; Sample Size Calculation |  |
| /scientific-calculator | keep | scientific-calculator.html | 93 | 0 | 1 | yes | — |  |
| /scientific-notation-calculator | keep | scientific-notation-calculator.html | 796 | 6 | 7 | yes | Scientific Notation Converter; Scientific Notation Calculator; Scientific notation; Calculations with scientific notation; Engineering notation; E-notation |  |
| /slope-calculator | keep | slope-calculator.html | 670 | 9 | 15 | yes | If the 2 Points are Known; If 1 Point and the Slope are Known |  |
| /standard-deviation-calculator | keep | standard-deviation-calculator.html | 1181 | 0 | 3 | yes | Population Standard Deviation; Sample Standard Deviation; Applications of Standard Deviation |  |
| /statistics-calculator | keep | statistics-calculator.html | 526 | 0 | 2 | yes | or Provide Values Separated by Comma Below; Geometric Mean |  |
| /surface-area-calculator | keep | surface-area-calculator.html | 2194 | 44 | 21 | yes | Ball Surface Area; Cone Surface Area; Cube Surface Area; Cylindrical Tank Surface Area; Rectangular Tank Surface Area; Capsule Surface Area; Cap Surface Area; Conical Frustum Surfa |  |
| /triangle-calculator | keep | triangle-calculator.html | 1679 | 7 | 38 | yes | Triangle facts, theorems, and laws; Area of a Triangle; Median, inradius, and circumradius |  |
| /volume-calculator | keep | volume-calculator.html | 3147 | 50 | 46 | yes | Sphere Volume Calculator; Cone Volume Calculator; Cube Volume Calculator; Cylinder Volume Calculator; Rectangular Tank Volume Calculator; Capsule Volume Calculator; Spherical Cap V |  |
| /z-score-calculator | keep | z-score-calculator.html | 1012 | 11 | 6 | yes | Z-score and Probability Converter; Probability between Two Z-scores; What is z-score?; Z-table | T-211 input binding bug + defaults |
| /age-calculator | keep | age-calculator.html | 360 | 0 | 1 | yes | — |  |
| /download-time-calculator | rename (301) | bandwidth-calculator.html | 726 | 15 | 6 | yes | Data Unit Converter; Download/Upload Time Calculator; Website Bandwidth Calculator; Hosting Bandwidth Converter; Common Internet Connection Bandwidth; Mobile Broadband Connection B |  |
| /base64-encode-decode | keep | base64-encode-decode.html | 1048 | 5 | 6 | yes | Base64 Encode / Decode an Image or File |  |
| /bra-size-calculator | keep | bra-size-calculator.html | 592 | 7 | 6 | yes | Bra Size Converter; Incorrect bra fit; Bra size |  |
| /btu-calculator | keep | btu-calculator.html | 1390 | 18 | 3 | yes | AC BTU Calculator; General Purpose AC or Heating BTU Calculator; What is a BTU?; Size and Ceiling Height; Insulation Condition; Desired Temperature Increase or Decrease; Other Fact |  |
| /concrete-calculator | keep | concrete-calculator.html | 467 | 39 | 10 | yes | Slabs, Square Footings, or Walls; Hole, Column, or Round Footings; Circular Slab or Tube; Curb and Gutter Barrier; Stairs |  |
| /unit-converter | rename (301) | conversion-calculator.html | 1247 | 4 | 1 | yes | Different Systems of Units; History of the Pound; Brief History of the Metric System |  |
| /date-calculator | keep | date-calculator.html | 3026 | 125 | 12 | yes | Days Between Two Dates; Add to or Subtract from a Date; History of the Gregorian Calendar; Holidays |  |
| /day-counter | keep | day-counter.html | 3319 | 122 | 13 | yes | Count Days from a Date; How to use the day counter; Counting days from a date; Day of the week; Doomsdays; Anchor day; The Doomsday rule |  |
| /day-of-the-week-calculator | keep | day-of-the-week-calculator.html | 1019 | 0 | 1 | yes | ISO 8601; Gregorian Calendar; Where do Their Names Come From?; Trivia About Each Day |  |
| /density-calculator | keep | density-calculator.html | 444 | 6 | 8 | yes | Common Density Units; Density of Common Materials |  |
| /dew-point-calculator | keep | dew-point-calculator.html | 736 | 5 | 2 | yes | What is humidity?; What is dew point? |  |
| /dice-roller | keep | dice-roller.html | 654 | 3 | 2 | yes | Non-Conventional Dice Roller; Dice shapes; How random is a dice? |  |
| /electricity-calculator | keep | electricity-calculator.html | 1295 | 7 | 3 | yes | Units of electricity:; Amount of energy used by common appliances:; Energy saving tips: |  |
| /engine-displacement-horsepower-calculator | rename (301) | engine-horsepower-calculator.html | 1175 | 8 | 4 | yes | The Elapsed Time (ET) Method; The Trap-Speed Method; Precautions; What Is Horsepower?; Measuring Horsepower; Gross or Net Horsepower; Horsepower Versus Torque; Horsepower and Perfo |  |
| /fuel-cost-calculator | keep | fuel-cost-calculator.html | 1231 | 6 | 1 | yes | Use public transportation; Carpool; Use a more fuel efficient vehicle; Tune the engine; Adjust tires; Use the correct motor oil; Plan trips carefully; Factors that determine the fu |  |
| /fuel-economy-calculator | rename (301) | gas-mileage-calculator.html | 898 | 8 | 3 | yes | How to Improve Gas Mileage? |  |
| /gdp-calculator | keep | gdp-calculator.html | 1279 | 13 | 6 | yes | Expenditure Approach; Resource Cost-Income Approach; Gross Domestic Product; Measuring GDP; Expenditure Approach:; Resource Cost-Income approach:; Gross domestic product as a compa |  |
| /golf-handicap-calculator | keep | golf-handicap-calculator.html | 852 | 104 | 2 | yes | Handicap of Course Calculator; Index of Handicap Calculator; Rating of course, rating of slope, and handicap of course; Playing condition adjustment | VERIFY WHS rules |
| /gpa-calculator | keep | gpa-calculator.html | 1337 | 20 | 12 | yes | GPA Planning Calculator; Letter grade and the numerical equivalents used for this calculator; Guidelines for raising GPA; Actively attending classes:; Planning: |  |
| /grade-calculator | keep | grade-calculator.html | 944 | 11 | 14 | yes | Final Grade Calculator; Brief history of different grading systems; An alternative to the letter grading system |  |
| /gravel-calculator | keep | gravel-calculator.html | 1747 | 17 | 3 | yes | How much gravel do I need?; What is gravel used for?; Types of gravel |  |
| /heat-index-calculator | keep | heat-index-calculator.html | 700 | 7 | 5 | yes | Use Relative Humidity; Use Dew Point Temperature; What is Heat Index?; How to Calculate Heat Index?; Potential effects of heat index |  |
| /height-converter | rename (301) | height-calculator.html | 1282 | 21 | 16 | yes | Predicting Based on the Parents' Heights Only; Height Converter; How tall will I be?; Predicting a child's adult height; How to get taller? |  |
| /horsepower-calculator | keep | horsepower-calculator.html | 574 | 9 | 4 | yes | Horsepower Calculation Based on Definition; Horsepower Converter; Horsepower; Watt; BTU; Different Horsepowers |  |
| /hours-calculator | keep | hours-calculator.html | 401 | 8 | 3 | yes | Hours Between Two Dates |  |
| /ip-subnet-calculator | keep | ip-subnet-calculator.html | 621 | 4 | 3 | yes | IPv4 Subnet Calculator; IPv6 Subnet Calculator |  |
| /love-calculator | keep | love-calculator.html | 669 | 2 | 2 | yes | How accurate is this love calculator? see the examples:; Definitions of Love; Approaching Love |  |
| /mass-calculator | keep | mass-calculator.html | 782 | 4 | 3 | yes | What is mass?; Mass vs. Weight |  |
| /mileage-reimbursement-calculator | rename (301) | mileage-calculator.html | 49 | 2 | 1 | yes | — | repurpose: currently odometer subtraction only |
| /molarity-calculator | keep | molarity-calculator.html | 1068 | 8 | 2 | yes | Measuring molarity using molecular weight; Disambiguation of terminology |  |
| /molecular-weight-calculator | keep | molecular-weight-calculator.html | 2033 | 2 | 3 | yes | Term Definitions; Atomic Weight; Molecular Weight (relative molecular mass); Molar Mass; Molecular Mass; Calculate Molecular Weight and Molar Mass; Table of abridged standard atomi |  |
| /mulch-calculator | keep | mulch-calculator.html | 2166 | 42 | 3 | yes | How much mulch do I need?; The benefits of mulch; Mulch regulates soil temperature and protects against weather; Mulch can increase moisture retention; Mulch reduces weed growth an |  |
| /ohms-law-calculator | keep | ohms-law-calculator.html | 373 | 8 | 7 | yes | Ohm's Law; Electrical Power; Ohm's Law Formula Wheel |  |
| /password-generator | keep | password-generator.html | 1144 | 1 | 3 | yes | Password strength; How to create a secure password; How to protect your password |  |
| /resistor-calculator | keep | resistor-calculator.html | 1096 | 7 | 14 | yes | Resistor color code calculator; Parallel resistor calculator; Resistors in series calculator; Resistance of a Conductor; Resistor Color Code; Resistors in parallel:; Resistors in s |  |
| /roman-numeral-converter | keep | roman-numeral-converter.html | 1364 | 2 | 6 | yes | Roman Numeral Date Converter; How to read and write Roman numerals; Large numbers; How to convert between Roman and Arabic numerals; Dates in Roman numeral form |  |
| /roofing-calculator | keep | roofing-calculator.html | 696 | 10 | 6 | yes | Roofing Area Calculator; Roofing Material Calculator; Roof Pitch |  |
| /shoe-size-converter | rename (301) | shoe-size-conversion.html | 2174 | 8 | 6 | yes | Shoe Size Calculation Formulas; Shoe Size Chart; Foot measurement systems |  |
| /sleep-calculator | keep | sleep-calculator.html | 1034 | 10 | 5 | yes | Sleep Cycle Calculator; Sleep Length Calculator; Sleep cycles; REM and non-REM sleep; Sleep quality; How much sleep do I need? |  |
| /speed-calculator | keep | speed-calculator.html | 758 | 10 | 10 | yes | Speed Converter; Speed, distance, and time |  |
| /square-footage-calculator | keep | square-footage-calculator.html | 1370 | 67 | 18 | yes | Rectangle; Rectangle Border; Circle; Ring; Triangle with Edge Lengths; Triangle with Base & Height; Trapezoid; Sector; Parallelogram; Reference:; Calculating Cost Per Square Foot;  |  |
| /stair-calculator | keep | stair-calculator.html | 1005 | 23 | 11 | yes | Basic Version; Comprehensive Version; Stair terminology and common building codes; Fraction to Decimal Conversion |  |
| /tile-calculator | keep | tile-calculator.html | 702 | 15 | 3 | yes | Gap Size; Tile Installation Options |  |
| /time-calculator | keep | time-calculator.html | 2116 | 20 | 6 | yes | Add or Subtract Time from a Date; Time Calculator in Expression; Concepts of Time:; How we measure time:; Development of the second, minute, and concept of a 24-hour day:; Early ti |  |
| /time-card-calculator | keep | time-card-calculator.html | 1444 | 36 | 2 | yes | Wages and Overtime; Exempt vs. non-exempt employees; Brief history of time cards/clocks |  |
| /time-duration-calculator | keep | time-duration-calculator.html | 381 | 16 | 8 | yes | Time Between Two Dates; Calculate the duration between two times |  |
| /time-zone-calculator | keep | time-zone-calculator.html | 1224 | 3 | 1 | yes | What is Time Zone; World Time Zone Map; U.S. Time Zone Map; Daylight Saving Time |  |
| /tip-calculator | keep | tip-calculator.html | 503 | 4 | 6 | yes | Shared Bill Tip Calculator |  |
| /tire-size-calculator | keep | tire-size-calculator.html | 1704 | 10 | 4 | yes | Tire Size Comparison Calculator; Tire code; How is tire size calculated?; What to consider when changing tire/wheel size? |  |
| /url-encode-decode | keep | url-encode-decode.html | 379 | 0 | 1 | yes | — |  |
| /voltage-drop-calculator | keep | voltage-drop-calculator.html | 1603 | 14 | 6 | yes | Voltage drop calculation; Typical AWG wire sizes |  |
| /weight-converter | rename (301) | weight-calculator.html | 844 | 3 | 3 | yes | Common Weight; Why We Have Different Ways to Measure Weight? |  |
| /wind-chill-calculator | keep | wind-chill-calculator.html | 1246 | 4 | 2 | yes | What is wind chill?; How to calculate wind chill; Frostbite; Hypothermia; Dress Warmly for Winter |  |
| /embed/concrete-calculator | rename (301) | concrete-calculator-for-your-site.html | 326 | 38 | 6 | yes | Slabs, Square Footings, or Walls; Hole, Column, or Round Footings; Circular Slab or Tube; Installation Instructions; Slabs, Square Footings, or Walls; Hole, Column, or Round Footin |  |
| /embed/love-calculator | rename (301) | love-calculator-for-your-site.html | 196 | 4 | 2 | yes | Installation Instructions |  |
| /embed/basic-calculator | rename (301) | math-calculator-for-your-site.html | 232 | 0 | 2 | yes | Installation Instructions |  |
| /embed/mortgage-calculator | rename (301) | mortgage-calculator-for-your-site.html | 214 | 12 | 6 | yes | Installation Instructions |  |
| /embed/scientific-calculator | rename (301) | scientific-calculator-for-your-site.html | 302 | 0 | 2 | yes | Installation Instructions |  |
| /us/state-income-tax-calculator | new | — | — | — | — | — | (no calculator.net equivalent) | New page, no calculator.net equivalent. Use primary sources only. build new calculator (see DEV-TASKS T-5xx) |
| /ca/land-transfer-tax-calculator | new | — | — | — | — | — | (no calculator.net equivalent) | New page, no calculator.net equivalent. Use primary sources only. build new calculator (see DEV-TASKS T-5xx) |
| /ca/cmhc-insurance-calculator | new | — | — | — | — | — | (no calculator.net equivalent) | New page, no calculator.net equivalent. Use primary sources only. build new calculator (see DEV-TASKS T-5xx) |
| /ca/mortgage-affordability-calculator | new | — | — | — | — | — | (no calculator.net equivalent) | New page, no calculator.net equivalent. Use primary sources only. build new calculator (see DEV-TASKS T-5xx) |
| /ca/fhsa-calculator | new | — | — | — | — | — | (no calculator.net equivalent) | New page, no calculator.net equivalent. Use primary sources only. build new calculator (see DEV-TASKS T-5xx) |
| /ca/capital-gains-tax-calculator | new | — | — | — | — | — | (no calculator.net equivalent) | New page, no calculator.net equivalent. Use primary sources only. build new calculator (see DEV-TASKS T-5xx) |
| /ca/gst-hst-calculator | new | — | — | — | — | — | (no calculator.net equivalent) | New page, no calculator.net equivalent. Use primary sources only. build new calculator (see DEV-TASKS T-5xx) |
| /ca/cpp-calculator | new | — | — | — | — | — | (no calculator.net equivalent) | New page, no calculator.net equivalent. Use primary sources only. build new calculator (see DEV-TASKS T-5xx) |
| /uk/student-loan-repayment-calculator | new | — | — | — | — | — | (no calculator.net equivalent) | New page, no calculator.net equivalent. Use primary sources only. build new calculator (see DEV-TASKS T-5xx) |
| /uk/salary-sacrifice-calculator | new | — | — | — | — | — | (no calculator.net equivalent) | New page, no calculator.net equivalent. Use primary sources only. build new calculator (see DEV-TASKS T-5xx) |
| /uk/workplace-pension-calculator | new | — | — | — | — | — | (no calculator.net equivalent) | New page, no calculator.net equivalent. Use primary sources only. build new calculator (see DEV-TASKS T-5xx) |
| /uk/capital-gains-tax-calculator | new | — | — | — | — | — | (no calculator.net equivalent) | New page, no calculator.net equivalent. Use primary sources only. build new calculator (see DEV-TASKS T-5xx) |
| /uk/dividend-tax-calculator | new | — | — | — | — | — | (no calculator.net equivalent) | New page, no calculator.net equivalent. Use primary sources only. build new calculator (see DEV-TASKS T-5xx) |
| /uk/lbtt-calculator | new | — | — | — | — | — | (no calculator.net equivalent) | New page, no calculator.net equivalent. Use primary sources only. build new calculator (see DEV-TASKS T-5xx) |
| /uk/ltt-calculator | new | — | — | — | — | — | (no calculator.net equivalent) | New page, no calculator.net equivalent. Use primary sources only. build new calculator (see DEV-TASKS T-5xx) |
| /uk/buy-to-let-mortgage-calculator | new | — | — | — | — | — | (no calculator.net equivalent) | New page, no calculator.net equivalent. Use primary sources only. build new calculator (see DEV-TASKS T-5xx) |
| /us/self-employment-tax-calculator | new | — | — | — | — | — | (no calculator.net equivalent) | New page, no calculator.net equivalent. Use primary sources only. build new calculator (see DEV-TASKS T-5xx) |
| /us/capital-gains-tax-calculator | new | — | — | — | — | — | (no calculator.net equivalent) | New page, no calculator.net equivalent. Use primary sources only. build new calculator (see DEV-TASKS T-5xx) |
| /us/pmi-calculator | new | — | — | — | — | — | (no calculator.net equivalent) | New page, no calculator.net equivalent. Use primary sources only. build new calculator (see DEV-TASKS T-5xx) |
| /us/closing-cost-calculator | new | — | — | — | — | — | (no calculator.net equivalent) | New page, no calculator.net equivalent. Use primary sources only. build new calculator (see DEV-TASKS T-5xx) |
| /us/property-tax-calculator | new | — | — | — | — | — | (no calculator.net equivalent) | New page, no calculator.net equivalent. Use primary sources only. build new calculator (see DEV-TASKS T-5xx) |
| /us/hsa-calculator | new | — | — | — | — | — | (no calculator.net equivalent) | New page, no calculator.net equivalent. Use primary sources only. build new calculator (see DEV-TASKS T-5xx) |
| /us/life-insurance-calculator | new | — | — | — | — | — | (no calculator.net equivalent) | New page, no calculator.net equivalent. Use primary sources only. build new calculator (see DEV-TASKS T-5xx) |
| /us/w4-withholding-calculator | new | — | — | — | — | — | (no calculator.net equivalent) | New page, no calculator.net equivalent. Use primary sources only. build new calculator (see DEV-TASKS T-5xx) |
| /loan-comparison-calculator | new | — | — | — | — | — | (no calculator.net equivalent) | New page, no calculator.net equivalent. Use primary sources only. build new calculator (see DEV-TASKS T-5xx) |
| /markup-calculator | new | — | — | — | — | — | (no calculator.net equivalent) | New page, no calculator.net equivalent. Use primary sources only. build new calculator (see DEV-TASKS T-5xx) |
| /break-even-calculator | new | — | — | — | — | — | (no calculator.net equivalent) | New page, no calculator.net equivalent. Use primary sources only. build new calculator (see DEV-TASKS T-5xx) |
| /calorie-deficit-calculator | new | — | — | — | — | — | (no calculator.net equivalent) | New page, no calculator.net equivalent. Use primary sources only. build new calculator (see DEV-TASKS T-5xx) |
| /waist-to-height-ratio-calculator | new | — | — | — | — | — | (no calculator.net equivalent) | New page, no calculator.net equivalent. Use primary sources only. build new calculator (see DEV-TASKS T-5xx) |
| /freelance-rate-calculator | new | — | — | — | — | — | (no calculator.net equivalent) | New page, no calculator.net equivalent. Use primary sources only. build new calculator (see DEV-TASKS T-5xx) |
