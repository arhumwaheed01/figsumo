---
url: /compound-interest-calculator
h1: Compound Interest Calculator
title: "Compound Interest Calculator with Monthly Contributions | FigSumo"
description: "See how money grows with compound interest: choose the compounding frequency, add regular deposits and compare the results with a year-by-year table and chart."
updated: 2026-10-14
country: global (currency follows locale)
calculatorRequirements: "DEV-TASKS T-306, T-414 (principal, rate, compounding frequency incl. continuous, contribution amount + frequency + start/end timing, years, year-by-year table, chart in currency units (T-201), EAR output, rate converter)"
related: [/savings-calculator, /investment-calculator, /interest-calculator, /interest-rate-calculator, /simple-interest-calculator, /inflation-calculator]
---

Compound interest is interest earned on interest. Each period, the interest is added to the balance, and the next period's interest is calculated on that larger amount. The effect is small at first and grows over time. This calculator shows the growth year by year and separates your own deposits from the interest. You can also compare compounding frequencies.

## How to use this calculator

1. **Initial deposit:** the amount you start with.
2. **Annual interest rate:** the nominal rate. If your bank quotes an APY or AER, use the rate converter to change it.
3. **Compounding frequency:** annually, quarterly, monthly, daily or continuously.
4. **Regular contribution (optional):** the amount, how often, and whether it is paid at the start or end of each period.
5. **Time:** years, and optionally months.

## The formula

**Lump sum:**

```
A = P × (1 + r/m)^(m × t)
```

**With equal contributions at the end of each compounding period:**

```
A = P × (1 + i)^N + C × ((1 + i)^N − 1) / i
```

- **A**: final balance
- **P**: initial deposit
- **r**: nominal annual rate (5% → 0.05)
- **m**: compounding periods per year
- **t**: years
- **i**: rate per period = r/m
- **N**: total periods = m × t
- **C**: contribution per period

If contributions are made at the start of each period, multiply the contribution term by (1 + i).

**Effective annual rate (EAR / APY / AER):**

```
EAR = (1 + r/m)^m − 1          continuous: EAR = e^r − 1
```

When contributions are made at a different frequency from compounding, the calculator converts the rate to an equivalent rate per contribution period.

## Worked examples

**Example 1: lump sum plus monthly deposits.**
$10,000 initial, 5% compounded monthly, $250 added at the end of each month, for 15 years.
- i = 0.05 / 12 = 0.0041667; N = 180
- Lump sum part: 10,000 × 1.0041667^180 = $21,137.04
- Deposits part: 250 × (1.0041667^180 − 1) / 0.0041667 = $66,822.24
- **Final balance: $87,959.28**
- Your money in: 10,000 + 250 × 180 = **$55,000**
- **Interest earned: $32,959.28**

**Example 2: does compounding frequency matter?**
$10,000 at 5% for 15 years, no deposits:

| Compounding | Final balance |
|---|---|
| Annually | $20,789.28 |
| Monthly | $21,137.04 |
| Daily (365) | $21,168.91 |

Moving from annual to monthly compounding adds $347.76. Moving from monthly to daily adds only $31.87. The rate and the time matter far more than the frequency. 5% compounded monthly is an effective annual rate of 5.116%.

## Doubling time: Rule of 72 vs exact

| Annual rate (compounded annually) | Rule of 72 estimate | Exact years to double |
|---|---|---|
| 2% | 36.0 | 35.00 |
| 4% | 18.0 | 17.67 |
| 6% | 12.0 | 11.90 |
| 8% | 9.0 | 9.01 |
| 10% | 7.2 | 7.27 |

The exact figure is ln 2 ÷ ln(1 + r). The rule works best between about 6% and 10%.

## Compounding works against you on debt

The same maths applies to money you owe. Unpaid credit card interest is added to the balance and then charged interest itself. See the [credit card payoff calculator](/credit-card-payoff-calculator) for how fixed payments break that cycle.

## Understanding your results

- **Final balance:** what you would have if the rate stays constant and every deposit is made on time.
- **Total contributions vs total interest:** the chart separates them, so you can see when interest starts to outweigh deposits.
- **Year-by-year table:** start balance, deposits, interest and end balance for each year. You can download it as CSV.
- **Real terms (optional):** enter an inflation rate to see the result in today's money.
- **Taxes are not deducted.** Interest in a taxable account may be taxed each year, which reduces growth. Tax-advantaged accounts work differently by country.

## Country notes

- **US:** banks must disclose an Annual Percentage Yield (APY) on deposit accounts. It is the same idea as the EAR above.
- **UK:** savings accounts quote an AER (Annual Equivalent Rate), also the same concept.
- **Canada:** GICs and savings accounts usually quote an annual rate with a stated compounding frequency. Enter both.
- Tax-free growth options: [Roth IRA](/us/roth-ira-calculator) (US), [TFSA](/ca/tfsa-calculator) (Canada), [ISA](/uk/isa-calculator) (UK).

## Frequently asked questions

### What is the difference between simple and compound interest?
Simple interest is paid only on the original amount. Compound interest is also paid on interest already earned. Over 15 years at 5%, $10,000 earns $7,500 of simple interest, compared with $11,137.04 compounded monthly.

### How often is interest compounded?
It depends on the account. Many savings accounts compound daily or monthly, and some bonds compound semi-annually. The account terms will say.

### What is the Rule of 72?
It's a quick estimate: 72 ÷ rate gives roughly the years needed to double your money. At 6%, it suggests 12 years; the exact answer with annual compounding is 11.9 years.

### Can I use this for investments like index funds?
You can, but investment returns are not fixed. A steady rate in the calculator is a simplification. Try several rates to see a range, or use the [investment calculator](/investment-calculator).

### Does making deposits at the start of the month help?
Yes, a little. Each deposit earns one extra period of interest. Over long periods, the difference adds up.

### What's continuous compounding?
It is the mathematical limit as compounding becomes infinitely frequent, A = P × e^(rt). It gives a slightly higher result than daily compounding, mainly of theoretical interest.

## Sources
1. U.S. Securities and Exchange Commission, Investor.gov, "Compound Interest Calculator." https://www.investor.gov/financial-tools-calculators/calculators/compound-interest-calculator (accessed 14 Oct 2026)
2. Consumer Financial Protection Bureau, Regulation DD (Truth in Savings), Appendix A: annual percentage yield calculation. https://www.consumerfinance.gov/rules-policy/regulations/1030/a/ (accessed 14 Oct 2026)

## Disclaimer
Results are illustrations based on a constant rate. They are not a forecast or investment advice. Actual returns, fees and taxes will differ.
