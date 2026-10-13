---
url: /us/income-tax-calculator
h1: US Federal Income Tax Calculator (2026)
title: "Federal Income Tax Calculator 2026: Brackets & Rates | FigSumo"
description: "Estimate your 2026 federal income tax from income, filing status and deductions, with your marginal and effective rate and a bracket-by-bracket breakdown."
updated: 2026-10-14
country: US
taxYear: "2026 (returns filed in 2027). 2025 values available via a year selector (T-301)."
hreflang_cluster: income-tax
calculatorRequirements: "DEV-TASKS T-301 (replace 2024 brackets with versioned 2025/2026 tables), T-310 golden tests; filing statuses single/MFJ/MFS/HoH; standard vs itemized; age-65 add-on; child tax credit; LTCG 0/15/20 thresholds"
related: [/us/paycheck-calculator, /us/capital-gains-tax-calculator, /us/marriage-tax-calculator, /ca/income-tax-calculator, /uk/income-tax-calculator]
---

US federal income tax is progressive. Your income is split into slices, and each slice is taxed at its own rate. Your top bracket only applies to the dollars inside it. This calculator applies the 2026 brackets and standard deductions published by the IRS. It shows the tax due on each slice, the total tax, and your marginal and effective rates.

## How to use this calculator

1. **Tax year:** 2026 is the default. Choose 2025 if you are preparing last year's return.
2. **Filing status:** single, married filing jointly, married filing separately or head of household.
3. **Income:** wages, self-employment profit, interest and other ordinary income. Enter long-term capital gains and qualified dividends separately, because they use different rates.
4. **Adjustments:** pre-tax contributions such as traditional 401(k) or deductible IRA contributions, if they aren't already removed from your W-2 wages.
5. **Deductions:** the standard deduction is applied automatically. Switch to itemized if your total is higher. Tick 65+ or blind for the additional standard deduction.
6. **Credits:** number of qualifying children for the child tax credit.

## The formula

```
Taxable income  T = gross income − adjustments − (standard or itemized deduction)
Tax on T        = Σ  rate_i × (portion of T within bracket i)
Tax after credits = Tax on T − credits (not below zero for non-refundable credits)
Effective rate  = tax after credits ÷ gross income
Marginal rate   = rate of the bracket containing the last dollar of T
```

**2026 brackets** (Rev. Proc. 2025-32):

| Rate | Single | Married filing jointly | Head of household |
|---|---|---|---|
| 10% | up to $12,400 | up to $24,800 | up to $17,700 |
| 12% | $12,400–$50,400 | $24,800–$100,800 | $17,700–$67,450 |
| 22% | $50,400–$105,700 | $100,800–$211,400 | $67,450–$105,700 |
| 24% | $105,700–$201,775 | $211,400–$403,550 | $105,700–$201,750 |
| 32% | $201,775–$256,225 | $403,550–$512,450 | $201,750–$256,200 |
| 35% | $256,225–$640,600 | $512,450–$768,700 | $256,200–$640,600 |
| 37% | over $640,600 | over $768,700 | over $640,600 |

Married filing separately uses the single thresholds up to $256,225, then 35% to $384,350 and 37% above that.

**2026 standard deduction:** $16,100 single or MFS · $32,200 MFJ · $24,150 HoH. The additional amount for age 65+ or blindness is $1,650 per qualifying condition, or $2,050 if you are unmarried.

**Long-term capital gains and qualified dividends** are taxed at 0%, 15% or 20%. The 0% rate applies while total taxable income is up to $49,450 (single) or $98,900 (MFJ). The 15% rate applies up to $545,500 (single) or $613,700 (MFJ).

## Worked examples

**Example 1: single, $90,000 salary, standard deduction.**
- Taxable income: 90,000 − 16,100 = **$73,900**
- 10% × 12,400 = $1,240.00
- 12% × (50,400 − 12,400) = $4,560.00
- 22% × (73,900 − 50,400) = $5,170.00
- **Total tax: $10,970**
- Marginal rate: **22%**. Effective rate: 10,970 ÷ 90,000 = **12.19%**

Only $23,500 of the income is taxed at 22%, and the first $16,100 is not taxed at all.

**Example 2: married filing jointly, $150,000, two qualifying children.**
- Taxable income: 150,000 − 32,200 = **$117,800**
- 10% × 24,800 = $2,480 · 12% × 76,000 = $9,120 · 22% × 17,000 = $3,740
- **Tax before credits: $15,340** (effective 10.23%)
- Child tax credit: 2 × $2,200 = $4,400
- **Tax after credits: $10,940**, an effective rate of 7.29%

## Understanding your results

- **Total federal income tax:** your estimated liability for the year. Compare it with the federal tax withheld on your paystubs to see whether you can expect a refund or a balance due.
- **Bracket table:** how much of your income falls in each bracket and the tax on it.
- **Marginal rate:** use it to estimate the effect of a raise or a deduction. A $1,000 deduction at a 22% marginal rate saves about $220.
- **Effective rate:** total tax ÷ income, which is always lower than the marginal rate.
- **Not included:** state income tax, self-employment tax, the alternative minimum tax, net investment income tax and most credits other than the child tax credit. These are listed beside the result so you know they are missing.

## Country notes

- **Canada:** federal and provincial tax are calculated separately, and most credits are non-refundable credits at the lowest rate. See the [Canadian income tax calculator](/ca/income-tax-calculator).
- **UK:** tax is based on the 6 April–5 April tax year, and the Personal Allowance is withdrawn above £100,000. See the [UK income tax calculator](/uk/income-tax-calculator).

## Frequently asked questions

### Does moving into a higher bracket reduce my take-home pay?
Not because of the brackets. Only the dollars above a threshold are taxed at the higher rate, so the brackets alone never make a raise cost you money. Some credits and benefits shrink as income rises, and a few have hard income cut-offs, so check those separately.

### What's the difference between marginal and effective tax rate?
The marginal rate applies to your next dollar of taxable income. The effective rate is your total tax divided by your income. In Example 1 they are 22% and 12.19%.

### Should I itemize or take the standard deduction?
Itemize only if your allowable itemized deductions (for example mortgage interest, state and local taxes up to the cap, and charitable gifts) add up to more than your standard deduction. The calculator compares the two.

### When are the 2027 brackets published?
The IRS normally announces the next year's inflation adjustments in the autumn. This page will add 2027 values once they are officially published.

### How much is the 2026 child tax credit?
Up to $2,200 per qualifying child, of which up to $1,700 can be refundable. Income limits and eligibility rules apply.

### Are capital gains taxed at these rates?
Short-term gains (assets held one year or less) are taxed as ordinary income. Long-term gains and qualified dividends use the 0%, 15% and 20% rates. Their thresholds are listed above.

## Sources
1. IRS, Revenue Procedure 2025-32 (2026 inflation adjustments). https://www.irs.gov/pub/irs-drop/rp-25-32.pdf (accessed 14 Oct 2026)
2. IRS, IR-2025-103, "IRS releases tax inflation adjustments for tax year 2026." https://www.irs.gov/newsroom/irs-releases-tax-inflation-adjustments-for-tax-year-2026-including-amendments-from-the-one-big-beautiful-bill (accessed 14 Oct 2026)
3. IRS, "Federal income tax rates and brackets." https://www.irs.gov/filing/federal-income-tax-rates-and-brackets (accessed 14 Oct 2026)

## Disclaimer
This calculator estimates federal income tax for the 2026 tax year using IRS-published figures. It is not tax advice and it does not cover every situation. Confirm with IRS guidance or a qualified tax professional before you file.
