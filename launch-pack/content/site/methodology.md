---
url: /methodology
title: "How FigSumo Calculators Are Built and Checked | Methodology"
description: "Our sources, review process, rounding rules and update schedule for tax, finance and health calculators."
updated: 2026-10-14
---

# How we build and check our calculators

This page explains where our numbers come from, how we test them and when we update them.

## 1. Sources we use

We take rules, rates and thresholds from primary sources wherever possible:

- **United States:** Internal Revenue Service (irs.gov), including revenue procedures, notices and publications; Social Security Administration (ssa.gov); Consumer Financial Protection Bureau (consumerfinance.gov); U.S. SEC's Investor.gov.
- **Canada:** Canada Revenue Agency (canada.ca), including the T4032 payroll tables; Financial Consumer Agency of Canada; CMHC; OSFI; federal statutes (laws-lois.justice.gc.ca).
- **United Kingdom:** HMRC and GOV.UK; the Financial Conduct Authority; MoneyHelper; FSCS.
- **Health:** CDC, NIH (NHLBI, NIDDK), NHS, WHO, ACOG, and the original peer-reviewed papers for each equation (for example Mifflin-St Jeor 1990).

Every calculator page lists the specific documents it relies on, with the date we accessed them.

## 2. Tax years and dates

- Tax figures are labelled with their tax year: calendar years for the US and Canada, 6 April – 5 April for the UK.
- When a government publishes new figures, we add them as a new year version rather than overwriting the old one. You can still calculate the previous year.
- Each page shows **Last updated** (any content or figure change) and **Figures checked** (the date we last confirmed the figures against the source). **[Requires DEV-TASKS T-702.]**

## 3. Testing

- Each formula has automated "golden" tests: fixed inputs with expected outputs worked out independently, including the worked examples printed on the page. A release cannot go live if any test fails. **[CONFIRM this is true once DEV-TASKS T-310 is in CI; until then, remove this sentence.]**
- Tax calculators are checked against the worked examples published by the tax authority where one exists (for example GOV.UK's stamp duty example).
- **[REVIEWER NAME AND CREDENTIAL, e.g. "Tax pages reviewed by [NAME], [CPA/CPA (Canada)/ACCA]". Only add this once a qualified reviewer has actually reviewed the pages. Until then, delete this line.]**

## 4. Rounding and assumptions

- Money is calculated at full precision and rounded to the cent or penny only for display. Totals may differ by a cent from the sum of rounded parts.
- Each calculator states its own assumptions next to the result, for example "interest compounded monthly, deposits at the end of each month".
- Where official rules include cases we don't model (for example Quebec provincial tax, US state tax, or the alternative minimum tax), the page says so.

## 5. Health calculators

Health calculators use published equations and category definitions. They don't diagnose conditions or recommend treatment. We describe each equation's known limitations on its page.

## 6. Privacy by design

Calculations run in your browser. The numbers you type are not sent to our servers. **[CONFIRM after DEV-TASKS T-229 and an analytics review: no inputs in URLs sent to analytics, no server-side logging of inputs.]** See the [Privacy Policy](/privacy).

## 7. Corrections and update log

Found an error? Use the [Contact](/contact) page. Significant corrections are noted at the bottom of the affected page with the date.

**[OPTIONAL: link to a public changelog page once it exists]**
