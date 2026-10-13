---
url: /savings-calculator
h1: Savings Calculator
title: "Savings Calculator: Reach a Savings Goal Faster | FigSumo"
description: "Plan a savings goal: see how long it takes at your deposit level or the monthly amount you need, with interest, annual deposit increases and tax on interest."
updated: 2026-10-14
country: global (USD/CAD/GBP)
calculatorRequirements: "DEV-TASKS T-409, T-414 (modes: future value / time to goal / required deposit; deposit increase %/yr; tax rate on interest; inflation; table + chart)"
related: [/compound-interest-calculator, /investment-calculator, /cd-calculator, /us/roth-ira-calculator, /ca/tfsa-calculator, /uk/isa-calculator]
---

Whether you are saving for an emergency fund, a deposit on a home or a car, it helps to know two things: how long the goal will take at the rate you can save, and how much you'd need to put away to reach it by a certain date. This calculator answers both, and includes interest, yearly increases to your deposits and tax on interest.

## How to use this calculator

1. **Choose a mode:** *How much will I have?*, *How long will it take?* or *How much do I need to save each month?*
2. **Starting balance:** what you have saved already.
3. **Regular deposit:** an amount and frequency. You can add an annual increase, for example 3% a year as your pay rises.
4. **Interest rate:** your account's APY/AER. The calculator compounds monthly at the equivalent rate.
5. **Goal and/or time frame**, depending on the mode.
6. **Tax on interest (optional):** if your account is taxable, enter your marginal rate on interest. Leave it at 0% for tax-free accounts.

## The formula

The balance after *n* months, with monthly deposits *D*, is:

```
B_n = B_0 × (1 + i)^n + D × ((1 + i)^n − 1) / i
```

- **B_0**: starting balance
- **i**: monthly rate. For a quoted APY/AER: i = (1 + APY)^(1/12) − 1. For a nominal rate compounded monthly: i = rate ÷ 12
- **n**: number of months

**Required deposit** to reach goal *G* in *n* months:

```
D = (G − B_0 × (1 + i)^n) × i / ((1 + i)^n − 1)
```

**Time to goal:** the calculator steps month by month until the balance reaches *G*. This handles deposit increases and tax correctly.

If tax on interest is entered, each month's interest is multiplied by (1 − tax rate) before it is added.

## Worked examples

**Example 1: how long to save $25,000?**
Starting balance $5,000, $400 deposited each month, 4% nominal annual rate compounded monthly (i = 0.003333), no tax.
- After 44 months the balance is $24,710.69. After **45 months** it is **$25,193.06**, so the goal is reached in 3 years 9 months.
- Your deposits: 5,000 + 45 × 400 = $23,000. **Interest earned: $2,193.06**.

**Example 2: what deposit reaches $25,000 in 3 years?**
Same start and rate, n = 36.
- 5,000 × 1.003333^36 = $5,636.36 of the goal comes from the starting balance plus its interest
- D = (25,000 − 5,636.36) × 0.003333 / (1.003333^36 − 1) = **$507.15 a month**
- Total deposits: $18,257.40 + $5,000 = $23,257.40, so interest covers the remaining $1,742.60

Saving $107.15 more each month brings the goal forward by 9 months.

## Understanding your results

- **Final balance or time to goal:** assumes the rate stays the same. Savings rates change, so recheck every few months.
- **Interest earned:** shown before and after tax if you entered a tax rate.
- **Real value:** with an inflation rate entered, the calculator shows what the goal is worth in today's money. A goal three years away may need to be larger than today's price.
- **Chart:** deposits and interest are stacked, so you can see how much each contributes.

## Country notes

- **United States:** interest in a regular savings account is generally taxable as ordinary income. FDIC insurance covers at least $250,000 per depositor at each FDIC-insured bank (ownership categories apply).
- **Canada:** interest outside registered accounts is fully taxable. A [TFSA](/ca/tfsa-calculator) shelters it. CDIC covers eligible deposits up to $100,000 per insured category at each member institution.
- **UK:** the Personal Savings Allowance lets basic-rate taxpayers earn £1,000 of interest tax-free (£500 for higher-rate). Cash ISAs are tax-free. FSCS protects eligible deposits up to £120,000 per person per authorised firm, from 1 December 2025.

## Frequently asked questions

### How much should I keep in an emergency fund?
There's no single right number. It depends on your income stability, dependants and fixed costs. Many people base it on several months of essential spending. Use the calculator to plan whatever target you choose.

### Is APY the same as the interest rate?
Not quite. The APY (US) or AER (UK) includes the effect of compounding over a year. If your account quotes APY/AER, choose that option, and the calculator converts it to the correct monthly rate.

### Should I include deposit increases?
If you expect to raise your savings as your income rises, yes. Even a small yearly increase noticeably shortens long goals.

### What if my rate changes?
Run the calculator again with the new rate from the current balance. For fixed-term deposits (CDs, GICs, fixed-rate bonds), the rate is locked for the term.

### Does tax really make a difference?
On larger balances, yes. At a 22% tax rate, 4% interest becomes about 3.12% after tax. Tax-free accounts avoid this.

### Can I reach my goal faster by investing instead?
Investments may earn more over long periods but can lose value, so they are generally less suitable for short-term goals. That's a personal decision; this calculator assumes a savings account with a steady rate.

## Sources
1. FDIC, "Deposit Insurance." https://www.fdic.gov/resources/deposit-insurance (accessed 14 Oct 2026)
2. CDIC, "What's covered." https://www.cdic.ca/depositors/whats-covered/ (accessed 14 Oct 2026)
3. FSCS, "Deposit protection limit." https://www.fscs.org.uk/deposit-limit/ (accessed 14 Oct 2026)
4. GOV.UK, "Tax on savings interest." https://www.gov.uk/apply-tax-free-interest-on-savings (accessed 14 Oct 2026)
5. Investor.gov, "Compound Interest Calculator." https://www.investor.gov/financial-tools-calculators/calculators/compound-interest-calculator (accessed 14 Oct 2026)

## Disclaimer
Results are estimates assuming a constant rate. They are not financial advice. Check your account's terms for actual rates, fees and protection limits.
