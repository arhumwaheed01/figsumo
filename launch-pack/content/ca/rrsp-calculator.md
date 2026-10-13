---
url: /ca/rrsp-calculator
h1: RRSP Calculator (2026)
title: "RRSP Calculator 2026: Tax Refund, Limit & Growth | FigSumo"
description: "Estimate your RRSP tax refund, check your deduction limit against the 2026 maximum of $33,810 and project tax-deferred growth to retirement."
updated: 2026-10-14
country: CA
taxYear: "2026 (contributions up to 60 days after 31 Dec 2026 can be deducted on the 2026 return)"
calculatorRequirements: "DEV-TASKS T-506 (refund estimate using province + income from CA tax module — marginal rate across brackets; deduction limit helper 18% × prior earned income capped at $33,810 − PA + carry-forward; growth projection; RRSP vs TFSA compare)"
related: [/ca/tfsa-calculator, /ca/income-tax-calculator, /ca/take-home-pay-calculator, /retirement-calculator, /investment-calculator]
---

A Registered Retirement Savings Plan (RRSP) gives you a tax deduction when you contribute, and the investments grow tax-deferred until you withdraw them. This calculator estimates the refund a contribution could create for your province and income, checks the 2026 contribution limit, and projects the account's growth. It also helps you compare it with a TFSA.

## How to use this calculator

1. **Province** and **taxable income** before the contribution. The calculator works out the tax saved across your brackets.
2. **Contribution amount** for the 2026 tax year.
3. **Deduction limit (optional):** enter the figure from your latest notice of assessment, or let the helper estimate it from last year's earned income and any pension adjustment.
4. **Growth inputs:** current RRSP balance, yearly contribution, expected return and years to retirement.
5. Optionally **reinvest the refund** to see how much that adds over time.

## The formula

**Deduction limit for 2026** (simplified CRA method):

```
Limit = unused room carried forward
      + min(18% × 2025 earned income, $33,810)
      − 2025 pension adjustment (PA)
      (+ PAR − net PSPA where applicable)
```

**Refund estimate:**

```
Tax saved = Tax(taxable income) − Tax(taxable income − contribution)
```

This uses the federal and provincial 2026 brackets. If the contribution moves you down a bracket, the saving is spread across more than one rate.

**Growth:**

```
FV = B × (1 + r)^n + C × ((1 + r)^n − 1) / r
```

## Worked examples

**Example 1: refund on a $10,000 contribution.**
An Ontario employee with $75,000 salary (taxable income $74,273 after enhanced CPP and CPP2) contributes $10,000.
- Taxable income falls to $64,273. That is still above the federal $58,523 and Ontario $53,891 thresholds, so the whole $10,000 is deducted at 20.5% federal + 9.15% Ontario = **29.65%**
- **Estimated tax saving: $2,965**
- Ontario surtax and the Health Premium are unchanged at this income, so they don't add to the saving

The 2026 limit check: 18% × $75,000 of 2025 earned income = $13,500, below the $33,810 cap, so this person has $13,500 of new room before any pension adjustment.

**Example 2: long-term growth.**
$10,000 a year for 25 years at 6% a year, from $0:
- FV = 10,000 × (1.06^25 − 1) / 0.06 = **$548,645.12**
- Contributions: $250,000
- Growth: $298,645.12, tax-deferred until withdrawal

Withdrawals are taxable income. The benefit is largest if your tax rate in retirement is lower than when you contributed.

## Understanding your results

- **Tax saving:** an estimate of the reduction in income tax for 2026. The refund you actually receive depends on what was withheld from your pay.
- **Room after contribution:** your remaining deduction limit. Over-contributions of more than $2,000 above your limit are taxed at 1% a month.
- **Projected balance:** in nominal dollars, before tax on withdrawal.
- **RRSP vs TFSA:** with the same pre-tax money, the two give equal after-tax results when your tax rate is the same at contribution and withdrawal. The RRSP wins if your rate falls in retirement; the TFSA wins if it rises.

## Country notes

- **Deadline:** contributions made in the first 60 days of 2027 can be deducted on your 2026 return. The CRA publishes the exact dates each year.
- **Age:** you can contribute to your own RRSP until 31 December of the year you turn 71, when it must be converted (usually to a RRIF or an annuity).
- **Quebec:** the deduction applies, but provincial tax savings are calculated under Quebec's system (not yet supported).
- **Home Buyers' Plan (HBP):** first-time buyers who meet the conditions can withdraw up to $60,000 from their RRSPs to buy or build a qualifying home, and repay it over a 15-year period.
- For the US equivalent, see the [401(k) calculator](/us/401k-calculator); for the UK, the [ISA calculator](/uk/isa-calculator) and workplace pensions.

## Frequently asked questions

### What is the RRSP limit for 2026?
The dollar maximum for 2026 is $33,810. Your personal limit is 18% of your 2025 earned income, up to that maximum, minus any pension adjustment, plus unused room from earlier years. It is shown on your notice of assessment.

### How much will my RRSP refund be?
About your marginal tax rate times your contribution, assuming the whole amount falls in one bracket. In Example 1, it is 29.65% of $10,000, or $2,965. If the contribution crosses a bracket, the calculator splits it across the rates.

### What happens if I over-contribute?
You can be up to $2,000 over your limit without penalty. Beyond that, the excess is taxed at 1% per month until it's removed or absorbed by new room.

### When is the RRSP deadline for the 2026 tax year?
Contributions made from 3 March 2026 (the day after the 2025-year deadline of 2 March 2026) to the 60th day of 2027 count for the 2026 return. Check the CRA’s published dates.

### Should I use an RRSP or a TFSA?
It depends mostly on your tax rate now compared with later, and on whether you'll need the money before retirement. The comparison tab shows both outcomes for your numbers. See also the [TFSA calculator](/ca/tfsa-calculator).

### Is the refund free money?
It's tax deferred, not tax avoided. You will pay tax when you withdraw. Investing the refund makes the RRSP's advantage much larger.

## Sources
1. CRA, "MP, DB, RRSP, DPSP, ALDA, TFSA limits, YMPE and the YAMPE." https://www.canada.ca/en/revenue-agency/services/tax/registered-plans-administrators/pspa/mp-rrsp-dpsp-tfsa-limits-ympe.html (accessed 14 Oct 2026)
2. CRA, "How contributions affect your RRSP deduction limit." https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/rrsps-related-plans/contributing-a-rrsp-prpp/contributions-affect-your-rrsp-prpp-deduction-limit.html (accessed 14 Oct 2026)
3. CRA, "Tax rates and income brackets for individuals: current year." https://www.canada.ca/en/revenue-agency/services/tax/individuals/tax-rates-brackets/current-year.html (accessed 14 Oct 2026)
4. CRA, "How to participate in the Home Buyers' Plan." https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/rrsps-related-plans/what-home-buyers-plan/participate-home-buyers-plan.html (accessed 14 Oct 2026)

## Disclaimer
Estimates use 2026 CRA rates and assumed returns. They are not tax or investment advice. Your notice of assessment and the CRA's rules are definitive.
