---
url: /investment-calculator
h1: Investment Calculator
title: "Investment Calculator: Growth, Contributions & Returns | FigSumo"
description: "Project investment growth from a starting amount, regular contributions and an expected return, or solve for the return, contribution or time you need."
updated: 2026-10-14
country: global
calculatorRequirements: "DEV-TASKS T-306, T-414 (solve-for: end balance / contribution / return / starting amount / years; contribution timing start/end; annual fee %; inflation; scenario band low/base/high; table + chart)"
related: [/compound-interest-calculator, /retirement-calculator, /us/401k-calculator, /us/roth-ira-calculator, /ca/rrsp-calculator, /uk/isa-calculator, /average-return-calculator]
---

This calculator projects what an investment could grow to if it earned a steady average return. You can also run it backwards to find the contribution, return or time needed for a target. Because real markets don't deliver a steady return, it shows a low, base and high scenario side by side, and lets you subtract fees and inflation, the two things that most often make projections look better than reality.

## How to use this calculator

1. **Solve for:** end balance (default), monthly contribution, required return, starting amount or number of years.
2. **Starting amount** and **regular contribution**, with frequency and timing (start or end of each period).
3. **Expected annual return:** a long-run average before fees. Try a range of values rather than a single number.
4. **Annual fees (optional):** fund expense ratios plus any platform or advisory fee.
5. **Inflation (optional):** shows the result in today's money.
6. **Years** to invest.

## The formula

Using a monthly rate *i* derived from the annual return net of fees:

```
FV = P × (1 + i)^n + C × ((1 + i)^n − 1) / i        (contributions at end of month)
FV_start = FV + C × ((1 + i)^n − 1)                 (contributions at start of month: each earns one extra month)
Real value = FV ÷ (1 + inflation)^years
```

- **P**: starting amount
- **C**: monthly contribution
- **i**: (annual return − annual fee) ÷ 12, matching a nominal rate compounded monthly
- **n**: months

*Solve for return* has no closed-form answer, so the calculator finds *i* numerically (bisection) until FV matches your target to the cent.

## Worked examples

**Example 1: 25 years of steady investing.**
$5,000 to start, $300 a month (end of month), 7% a year, no fees, 25 years.
- i = 0.07 / 12; n = 300
- **End balance: $271,648.60**
- Contributions: 5,000 + 300 × 300 = **$95,000**
- **Investment growth: $176,648.60**, nearly twice what you put in
- With contributions at the start of each month: **$273,066.22**

**Scenario band (same inputs):**

| Return | End balance |
|---|---|
| 5% | $196,059.36 |
| 7% | $271,648.60 |
| 9% | $383,378.65 |

Two percentage points either way changes the result by roughly $75,000 to $112,000. That is why a single projection should never be treated as a forecast.

**Example 2: fees and inflation.**
- **Fees:** with a 1% annual fee, the 7% gross return becomes 6% net, and the end balance falls to **$230,223.04**. The fee costs **$41,425.56** over 25 years.
- **Inflation:** at 2.5% a year, the $271,648.60 is worth about **$146,524.70** in today's money.

## Lump sum or regular investing?

Example 1 invests $95,000 in total over 25 years and ends with $271,648.60. If the whole $95,000 had been invested on day one at the same steady 7%, it would grow to $543,914.73, because every dollar has longer to compound. Most people invest from income as it arrives, so this isn't a like-for-like choice. With real (volatile) returns, investing gradually also changes the risk you take, and a constant-rate calculator can't capture that.

## Understanding your results

- **End balance:** nominal value at the end, assuming every contribution is made and the return is the same every year.
- **Contributions vs growth:** the chart shows when growth starts to outpace your contributions. In Example 1, cumulative growth overtakes total contributions in year 17.
- **Real value:** use this when comparing with today's prices or goals.
- **Sequence of returns:** real portfolios rise and fall. Two investors with the same average return can end with different balances, depending on when the good and bad years arrived. This calculator does not simulate volatility.
- **Taxes:** not deducted. Using tax-advantaged accounts can change the after-tax result substantially.

## Country notes

- **US:** see the [401(k)](/us/401k-calculator) and [Roth IRA](/us/roth-ira-calculator) calculators for 2026 contribution limits and tax treatment.
- **Canada:** see the [RRSP](/ca/rrsp-calculator) and [TFSA](/ca/tfsa-calculator) calculators.
- **UK:** see the [ISA calculator](/uk/isa-calculator). Stocks and shares ISAs shelter growth and dividends from UK tax.

## Frequently asked questions

### What return should I assume?
There is no guaranteed figure. Historical averages depend heavily on the asset mix, the period and the country, and past returns don't predict future ones. Use a range (the scenario band) and consider a conservative base case.

### Why do fees matter so much?
They are taken every year from the whole balance, so they compound against you. In Example 1, a 1% fee reduces the end balance by about 15%.

### Should contributions be at the start or end of the month?
Use whichever matches when you invest. Contributions at the start earn one extra month of growth each time, which slightly increases the result.

### What does "solve for return" tell me?
It shows the average annual return needed to reach a goal with your contributions and time frame. If the required return is very high, you may need to contribute more, invest for longer or adjust the goal.

### Does this account for dividends?
Yes, if your expected return is a total return, meaning dividends are reinvested. If you use a price-only return, the projection will understate growth for income-paying investments.

### Is this investment advice?
No. It's a mathematical projection. Investments can lose value. For personal recommendations, consult a licensed adviser.

## Sources
1. Investor.gov (U.S. SEC), "Compound Interest Calculator." https://www.investor.gov/financial-tools-calculators/calculators/compound-interest-calculator (accessed 14 Oct 2026)
2. Investor.gov, "Understanding Fees." https://www.investor.gov/introduction-investing/getting-started/understanding-fees (accessed 14 Oct 2026)
3. U.S. Bureau of Labor Statistics, Consumer Price Index. https://www.bls.gov/cpi/ (accessed 14 Oct 2026)

## Disclaimer
Projections are hypothetical and assume constant returns. They are not a guarantee, a forecast or investment advice. The value of investments can go down as well as up.
