---
url: /ca/tfsa-calculator
h1: TFSA Calculator: Contribution Room & Growth (2026)
title: "TFSA Calculator 2026: Contribution Room & Growth | FigSumo"
description: "Work out your TFSA contribution room for 2026 from the year you turned 18, including withdrawals, and project tax-free growth of your savings."
updated: 2026-10-14
country: CA
taxYear: "2026 (annual dollar limit $7,000; cumulative since 2009 $109,000)"
calculatorRequirements: "DEV-TASKS T-507 (room calculator: year turned 18 / became resident, contributions & withdrawals by year, re-add withdrawals next 1 Jan; over-contribution warning; growth projection; TFSA vs RRSP compare)"
related: [/ca/rrsp-calculator, /ca/income-tax-calculator, /savings-calculator, /investment-calculator, /us/roth-ira-calculator, /uk/isa-calculator]
---

A Tax-Free Savings Account (TFSA) lets Canadian residents aged 18 and older save or invest without paying tax on interest, dividends or capital gains, and withdrawals are tax-free too. The most common mistake is over-contributing, because room is personal and depends on your age, your residency and your past withdrawals. This calculator works out your 2026 room using the CRA rules, then projects how your TFSA could grow.

## How to use this calculator

1. **The year you turned 18** (or the year you became a Canadian resident, if later). Room starts accumulating from that year, but not before 2009.
2. **Total contributions** you have made in past years, and **total withdrawals** made before 2026.
3. **Contributions and withdrawals so far in 2026.**
4. **Growth inputs:** current TFSA balance, yearly contribution, expected return and years.

For the most accurate figure, compare the result with your CRA account. It is updated after financial institutions report each year's transactions.

## The formula

```
Room in 2026 = Σ annual dollar limits for each year you were 18+ and resident (from 2009)
             − all contributions before 2026
             + all withdrawals before 2026
             − contributions already made in 2026
```

Withdrawals made in 2026 are added back on 1 January 2027, not straight away.

**Annual TFSA dollar limits (CRA):**

| Years | Limit each year |
|---|---|
| 2009–2012 | $5,000 |
| 2013–2014 | $5,500 |
| 2015 | $10,000 |
| 2016–2018 | $5,500 |
| 2019–2022 | $6,000 |
| 2023 | $6,500 |
| 2024–2026 | $7,000 |

The sum from 2009 to 2026 is **$109,000**. The limit is indexed to inflation and rounded to the nearest $500.

**Growth** (annual contributions at year-end): FV = B × (1 + r)^n + C × ((1 + r)^n − 1) / r

## Worked examples

**Example 1: someone who turned 18 in 2020 and has never contributed.**
- 2020–2022: 3 × $6,000 = $18,000
- 2023: $6,500
- 2024–2026: 3 × $7,000 = $21,000
- **Room in 2026: $45,500**

If this person contributes $10,000 in March 2026 and withdraws $4,000 in August 2026, their remaining 2026 room is $35,500. The $4,000 comes back as room on 1 January 2027, on top of the 2027 limit.

**Example 2: long-term growth.**
$7,000 a year for 20 years at 5% a year, starting from $0:
- FV = 7,000 × (1.05^20 − 1) / 0.05 = **$231,461.68**
- Contributions: $140,000
- **Tax-free growth: $91,461.68**

For someone who was 18 or older and resident in Canada in 2009 and has never contributed, the full **$109,000** of room is available in 2026.

## Understanding your results

- **Available room:** the maximum you can contribute in 2026 without penalty. If you have several TFSAs, this room is shared across all of them.
- **Over-contribution warning:** any amount above your room is taxed at 1% a month for as long as it stays in the account.
- **Projected balance:** fully tax-free when withdrawn. Withdrawals are not included in your income.
- **Investment losses don't restore room,** and gains don't use it up. Room depends only on contributions and withdrawals.

## TFSA vs RRSP, side by side

Take $1,000 of pre-tax income, a 30% marginal tax rate today, and 6% a year for 25 years (growth factor 4.2919):
- **RRSP:** contribute the full $1,000 (the deduction offsets the tax). It grows to $4,291.87. Withdrawn at 30%, you keep **$3,004.31**. Withdrawn at 20%, you keep **$3,433.50**.
- **TFSA:** pay tax first, leaving $700. It grows to **$3,004.31**, tax-free.

With equal tax rates the result is identical. The RRSP wins only if your rate at withdrawal is lower, and only if you invest the full pre-tax amount, including the refund.

## Country notes

- **Residency:** you only accumulate the annual limit for years you are a resident aged 18 or older. Contributions made while you're a non-resident are taxed at 1% a month.
- **US citizens in Canada:** US tax rules may not treat a TFSA as tax-free. Get cross-border tax advice before opening one.
- Comparable accounts: the [Roth IRA](/us/roth-ira-calculator) (US) and the [ISA](/uk/isa-calculator) (UK).

## Frequently asked questions

### What is the TFSA limit for 2026?
The annual dollar limit is $7,000. If you were 18 or older and resident in Canada in 2009 and have never contributed, your total room in 2026 is $109,000.

### When do withdrawals get added back?
On 1 January of the following year. If you re-contribute in the same calendar year without enough unused room, it counts as an over-contribution.

### What is the penalty for over-contributing?
A tax of 1% per month on the highest excess amount in each month it remains in the account.

### Should I use a TFSA or an RRSP?
A TFSA is flexible, and withdrawals are not taxed. An RRSP gives a deduction now but is taxed on withdrawal. If your tax rate will be lower in retirement, the RRSP often comes out ahead; if not, the TFSA usually does. Compare with the [RRSP calculator](/ca/rrsp-calculator).

### What can I hold in a TFSA?
Cash, GICs, bonds, mutual funds and securities listed on a designated stock exchange, along with certain other qualified investments. Non-qualified or prohibited investments are taxed.

### Does growth in my TFSA reduce my contribution room?
No. Investment earnings and losses don't change your room. Only contributions and withdrawals do.

## Sources
1. CRA, "Before you contribute to a TFSA" (room accumulation, annual dollar limits, withdrawals, 1% per month over-contribution tax). https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/tax-free-savings-account/contributing/before.html (accessed 14 Oct 2026)
2. CRA, "Calculate your TFSA contribution room." https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/tax-free-savings-account/contributing/calculate-room.html (accessed 14 Oct 2026)
3. CRA, "MP, DB, RRSP, DPSP, ALDA, TFSA limits, YMPE and the YAMPE." https://www.canada.ca/en/revenue-agency/services/tax/registered-plans-administrators/pspa/mp-rrsp-dpsp-tfsa-limits-ympe.html (accessed 14 Oct 2026)

## Disclaimer
Room calculations are estimates based on the information you enter. They are not tax advice. Your CRA account is the authoritative record; confirm before contributing.
