---
url: /retirement-calculator
h1: Retirement Calculator
title: "Retirement Calculator: How Much Will I Have Saved? | FigSumo"
description: "Estimate retirement savings at your chosen age, their value in today's money and how long withdrawals could last, with adjustable return and inflation."
updated: 2026-10-14
country: global (country notes for Social Security, CPP/OAS, State Pension)
calculatorRequirements: "DEV-TASKS T-411, T-415 (accumulation: age, retire age, savings, monthly contribution, contribution growth, return, inflation; drawdown: monthly withdrawal, return in retirement, years funded; tabs: 'how much will I have', 'how much do I need', 'how long will it last')"
related: [/investment-calculator, /us/401k-calculator, /us/roth-ira-calculator, /ca/rrsp-calculator, /uk/isa-calculator, /us/social-security-calculator, /pension-calculator]
---

Retirement planning comes down to three questions. How much will I have when I stop working? What will that be worth in today's money? And how long will it last once I start taking money out? This calculator answers all three from your current savings, monthly contributions, an assumed return and inflation. Government pensions are entered as separate monthly income, so the gap between what they pay and what you need is clear.

## How to use this calculator

1. **Current age** and **retirement age.**
2. **Current retirement savings** across all accounts.
3. **Monthly contribution**, including any employer contribution. Add an annual increase if you expect it to rise with your pay.
4. **Expected return before retirement** and **after retirement.** People often assume a lower return once retired, if they plan to hold more conservative investments.
5. **Inflation**, used to show results in today's money.
6. **Retirement income:** your planned monthly spending and any expected government or workplace pension.

## The formula

**Accumulation** (monthly compounding, contributions at the end of each month):

```
B_ret = S × (1 + i)^n + C × ((1 + i)^n − 1) / i
Real value = B_ret ÷ (1 + π)^years
```

- **S**: current savings
- **C**: monthly contribution
- **i**: annual return ÷ 12
- **n**: months until retirement
- **π**: annual inflation

**Drawdown:** each month the balance earns the post-retirement rate, then the withdrawal *W* is taken out:

```
B_(k+1) = B_k × (1 + j) − W
```

The calculator counts the months until the balance reaches zero. For a fixed number of years *Y*, the sustainable withdrawal is:

```
W = B_ret × j / (1 − (1 + j)^−(12Y))
```

## Worked examples

**Example 1: age 38, retiring at 65.**
$80,000 saved, $800 a month, 6% a year, 2.5% inflation, 27 years to go (324 months).
- Growth of existing savings: 80,000 × 1.005^324 = $402,618.75
- Growth of contributions: 800 × (1.005^324 − 1) / 0.005 = $645,237.50
- **Balance at 65: $1,047,856.25**
- Total contributed: 80,000 + 800 × 324 = **$339,200**
- **In today's money: $537,969.11** (÷ 1.025^27)

**Example 2: how long will it last?**
Starting with the $1,047,856.25 above, withdrawing **$5,000 a month** and earning 4% a year in retirement:
- The money lasts **about 30 years** (361 monthly withdrawals) before it runs out.
- Those withdrawals are fixed in nominal dollars, so their buying power falls with inflation. If you want spending to rise with prices, enter the inflation-adjusted option, and the balance runs down sooner.

**A rule of thumb many people check against:** a first-year withdrawal of 4% of savings. Here that is 4% × $537,969.11 (in today's money) ≈ **$21,519 a year**. The rule comes from historical studies of US markets and is not a guarantee.

## Rules of thumb (and their limits)

Commonly quoted planning shortcuts. None is official guidance:
- **Replace a share of pre-retirement income:** some planners aim for 70–80% of final income. Your real need depends on housing, health and travel plans.
- **Save a fixed share of pay:** for example 10–15% including employer contributions. Starting later usually means saving more.
- **4% initial withdrawal:** discussed in Example 2.

The calculator lets you replace each shortcut with your own numbers, which is more reliable than any rule.

## Understanding your results

- **Balance at retirement (nominal and real):** the real figure is the one to compare with today's spending.
- **Contributions vs growth:** in Example 1, growth makes up about two-thirds of the final balance. That share depends heavily on how long the money is invested.
- **Gap analysis:** planned spending minus pension income gives the monthly amount your savings need to cover. The calculator shows whether your projected balance can fund it to your chosen age.
- **Limitations:** a constant return, no taxes, and no allowance for changing spending or health costs. Run several scenarios.

## Country notes

- **United States:** Social Security retirement benefits can start at 62, with reductions. Full retirement age is 67 for anyone born in 1960 or later, and delaying past that up to 70 increases the benefit. Your personal estimate is available from your my Social Security account. Tax-advantaged accounts: [401(k)](/us/401k-calculator), [IRA/Roth IRA](/us/roth-ira-calculator).
- **Canada:** the standard age to start a CPP retirement pension is 65. You can start it as early as 60, with payments reduced by 0.6% a month, or as late as 70, with an increase of 0.7% a month. Old Age Security is paid separately. Enter your estimates from your My Service Canada Account. Savings options: [RRSP](/ca/rrsp-calculator), [TFSA](/ca/tfsa-calculator).
- **UK:** the State Pension age is set by date of birth and is rising. Check your forecast on GOV.UK. Workplace pensions and [ISAs](/uk/isa-calculator) supplement it.

## Frequently asked questions

### How much do I need to retire?
It depends on the income you want, the government pensions you'll receive, when you retire and how long you live. Start with your expected annual spending in retirement, take off pension income, and use the drawdown tab to see what balance would fund the rest.

### What return should I assume?
Use a long-term average appropriate to your investment mix, net of fees. Then test a lower figure as well. Small changes compound over decades. In Example 1, 1 percentage point either way makes a six-figure difference.

### Why show "today's money"?
Because $1 million in 27 years will buy much less than $1 million today. At 2.5% inflation it has the buying power of about $538,000 today.

### Should I include my employer's contributions?
Yes. Add them to the monthly contribution, or use the [401(k) calculator](/us/401k-calculator) to model the match in detail.

### Is the 4% rule safe?
It's a historical guideline, not a promise. Some people use more flexible strategies that adjust withdrawals after bad years. A licensed financial planner can help you choose.

### Does this include taxes on withdrawals?
No. Withdrawals from traditional 401(k)s, IRAs, RRSPs and most pensions are generally taxable income. Roth IRA, TFSA and ISA withdrawals are generally tax-free if the rules are met.

## Sources
1. Social Security Administration, "Retirement age and benefit reduction." https://www.ssa.gov/benefits/retirement/planner/agereduction.html (accessed 14 Oct 2026)
2. Investor.gov (U.S. SEC), "Compound Interest Calculator." https://www.investor.gov/financial-tools-calculators/calculators/compound-interest-calculator (accessed 14 Oct 2026)
3. Government of Canada, "Canada Pension Plan: when to start." https://www.canada.ca/en/services/benefits/publicpensions/cpp/cpp-benefit/when-start.html (accessed 14 Oct 2026)
4. GOV.UK, "Check your State Pension age." https://www.gov.uk/state-pension-age (accessed 14 Oct 2026)

## Disclaimer
These projections are hypothetical and assume constant returns and inflation. They are not financial advice. Consider speaking with a licensed financial planner before making retirement decisions.
