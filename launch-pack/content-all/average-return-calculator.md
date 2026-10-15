---
url: /average-return-calculator
title: "Average Return Calculator: Arithmetic vs CAGR | FigSumo"
description: "Calculate the average annual return of an investment from yearly returns or start and end values. Shows arithmetic mean and compound annual growth rate."
h1: "Average Return Calculator"
country: global
status: keep
body_words: 1,045 (minimum 1,000)
verify_flags: 0
updated: 2026-10-15
source: FigSumo-All-Page-Content.docx
---

H1: Average Return Calculator
This calculator takes a series of yearly returns and gives you two averages: the geometric average (also called the compound annual growth rate, or CAGR) and the simple arithmetic average. The geometric figure is the one that tells you how fast your money actually grew. Enter each year's return as a percentage, separated by commas.
How to use this calculator
1. Annual returns (comma-separated %): type each period's return in order, for example 10, -5, 8, 12, 6. Use a minus sign for losses. Your fund factsheet, brokerage statement or pension annual statement lists calendar-year returns.
The tool ignores anything that is not a number, so a stray space is fine. It returns the geometric average (CAGR), the arithmetic average and the number of periods it read.
The periods don't have to be years. If you enter monthly returns, the result is an average monthly return.
The formula
Each return is turned into a growth factor (1 + r). The factors are multiplied together and the n-th root is taken:
Geometric average = ((1 + r1) × (1 + r2) × … × (1 + rn))^(1/n) − 1
Arithmetic average = (r1 + r2 + … + rn) ÷ n
Cumulative return  = (1 + r1) × … × (1 + rn) − 1
r1 … rn: the returns for each period, as decimals (10% = 0.10)
n: the number of periods
The geometric average is the constant yearly rate that would have produced the same end value. The arithmetic average is just the mean of the numbers, which ignores compounding.
Worked examples
Example 1: five years of returns
Returns: 10%, −5%, 8%, 12%, 6%.
Product of growth factors: 1.10 × 0.95 × 1.08 × 1.12 × 1.06 = 1.340 (cumulative return 33.99%)
Geometric average = 1.340^(1/5) − 1 = 6.03%
Arithmetic average = (10 − 5 + 8 + 12 + 6) ÷ 5 = 6.20%
$10,000 invested would have grown to $13,398.74. Growing at the geometric average for five years gives the same figure ($13,398.74). Growing at the arithmetic average would overstate it.
Example 2: why the two averages can disagree sharply
Returns: +50% then −50%.
Arithmetic average: 0.00%
Geometric average: -13.40%
$100 becomes $150, then $75. You lost a quarter of your money, yet the arithmetic average says you broke even. Only the geometric average reflects that.
A more volatile five-year run (25%, −20%, 30%, −15%, 18%) gives an arithmetic average of 7.60% but a geometric average of only 5.45%. The gap of 2.15 percentage points is the cost of volatility.
Understanding your results
Geometric average (CAGR) is the right figure for "what did I actually earn per year?" and for projecting a lump sum forward with the compound interest calculator.
Arithmetic average is always equal to or higher than the geometric average. It is the better estimate of a single typical year's expected return, which is why some statistical models use it, but it overstates long-run growth.
The bigger the swings, the bigger the gap. A rough rule: geometric ≈ arithmetic − (variance ÷ 2).
These are time-weighted returns. They measure the investment's performance, not your personal result if you added or withdrew money along the way. For that, use a money-weighted return, such as the IRR calculator.
Common uses
Comparing funds. Fund factsheets usually show annualized (geometric) returns over 1, 3, 5 and 10 years. Enter the calendar-year returns here to check them.
Checking a sales claim. An "average return of 10%" may be arithmetic. Ask which average is meant.
Real returns. Subtract inflation year by year first (or use (1 + nominal) ÷ (1 + inflation) − 1) to get a real geometric average. The inflation calculator helps with the inflation figures.
Annualizing a total return
If you only know the total return over several years, you can still get the yearly figure. A fund that turned $10,000 into $14,000 over 6 years has a cumulative return of 40%. Its annualized return is 1.40^(1/6) − 1 = about 5.77% a year. To check a single figure in this calculator, enter that rate six times; the geometric average will match.
Country notes
The maths is the same everywhere. In the US, SEC rules require mutual fund advertisements that quote performance to show standardized average annual total returns over 1, 5 and 10 years. In the UK, FCA rules require past performance to cover up to the previous five complete 12-month periods and to carry a warning that it is not a reliable guide to future returns [VERIFY exact COBS 4.6 wording]. Canadian fund facts documents show year-by-year returns and an average return figure.
Tips and common mistakes
Enter percentages, not decimals. Type 8 for 8%, not 0.08.
Keep periods consistent. Don't mix monthly and annual returns in one list.
Include fees. Use returns after fund charges if you want the return you actually received.
Order doesn't matter for the averages, but it matters a great deal if you are adding or withdrawing money.
A −100% year wipes out the investment; the geometric average then shows −100%.
Frequently asked questions
What is the difference between geometric and arithmetic average return?
The geometric average accounts for compounding and gives the steady rate that produces the same final value. The arithmetic average is a plain mean that ignores compounding, so it overstates growth when returns vary.
Is CAGR the same as the geometric average?
Yes, when each period is one year. CAGR is the geometric average annual growth rate.
Can I enter monthly returns?
Yes. The result is then an average monthly return. To annualize it, use (1 + monthly)^12 − 1.
Why is my fund's "average return" different from my own return?
The fund's figure is time-weighted. If you invested more before a bad year or less before a good year, your money-weighted return differs.
How many years of data should I use?
As many as you have, ideally covering a full market cycle. Short periods are dominated by one or two years.
What does a negative geometric average mean?
That the investment lost value overall across the periods entered.
Related calculators
Investment Calculator
ROI Calculator
IRR Calculator
Compound Interest Calculator
Inflation Calculator
Mutual Fund Calculator
Sources
1. U.S. Securities and Exchange Commission, Investor.gov: "Compound Interest" and performance glossary (accessed 14 Oct 2026). https://www.investor.gov/financial-tools-calculators/calculators/compound-interest-calculator
2. SEC Form N-1A instructions, Item 26 (average annual total return) (accessed 14 Oct 2026). https://www.sec.gov/about/forms/formn-1a.pdf
3. FCA Handbook COBS 4.6, Past, simulated past and future performance (accessed 14 Oct 2026). https://www.handbook.fca.org.uk/handbook/COBS/4/6.html
4. FigSumo methodology.
Disclaimer
This average return calculator describes past figures you enter; it does not predict future returns. It is not investment advice. Past performance is not a reliable guide to future results.
