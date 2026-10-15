---
url: /irr-calculator
title: "IRR Calculator: Internal Rate of Return | FigSumo"
description: "Find the internal rate of return for a series of cash flows, plus NPV at a chosen discount rate. Handles irregular amounts."
h1: "IRR Calculator"
country: global
status: keep
body_words: 1,007 (minimum 1,000)
verify_flags: 0
updated: 2026-10-15
source: FigSumo-All-Page-Content.docx
---

H1: IRR Calculator
The internal rate of return (IRR) is the yearly rate of return that a series of cash flows earns. Technically, it is the discount rate at which the net present value (NPV) of all the flows equals zero. Enter the cash flows in order, starting with the initial investment as a negative number, and the calculator finds the IRR. It also shows the undiscounted total of the flows.
How to use this calculator
1. Cash flows (comma-separated, t=0 first): type each period's net cash flow, in order, separated by commas.
The first value is time 0, usually the investment, entered as a negative number (money going out).
Each later value is the net cash at the end of period 1, 2, 3 and so on. Use negative numbers for further outlays.
Periods must be evenly spaced. If you enter yearly flows, the IRR is yearly.
Example input: -100000, 25000, 30000, 35000, 40000, 45000.
Results: internal rate of return (IRR) and NPV at 0% discount, which is simply the sum of all the flows.
The formula
IRR is the rate r that solves:
NPV = CF0 + CF1 ÷ (1 + r) + CF2 ÷ (1 + r)^2 + … + CFn ÷ (1 + r)^n = 0
CF0 … CFn: the cash flows at times 0 to n
r: the internal rate of return per period
There's no direct formula for r when there are more than two flows, so the calculator uses Newton's method: it starts at 10% and improves the guess using the slope of the NPV curve until the change is negligible. It reports the IRR to three decimal places.
Worked examples
Example 1: a project costing $100,000
Flows: −100,000, then 25,000, 30,000, 35,000, 40,000 and 45,000 over five years.
IRR = 19.71%
Sum of flows (NPV at 0%): $75,000.00
At an 8% discount rate, NPV = $36,679.88 (positive, so the project beats 8%)
At 20%, NPV = −$704.09 (negative, because 20% is above the IRR)
Example 2: a rental property bought for cash
Buy for $250,000; receive $18,000 a year of net rent for five years; sell at the end of year 5 for $300,000 (net of selling costs).
Flows: −250,000, 18,000, 18,000, 18,000, 18,000, 318,000
IRR = 10.45%
NPV at a 6% required return: $50,000.00
A check: single in, single out
−50,000 now and +80,000 in five years gives an IRR of 9.86%, which equals (80,000 ÷ 50,000)^(1/5) − 1 = 9.86%, the compound annual growth rate.
Monthly flows
A small business owner invests $12,000 and expects $1,100 a month for 12 months. Entering −12000 followed by twelve 1100s gives a monthly IRR of 1.498%. Annualized, that is (1 + monthly IRR)^12 − 1 = 19.53%. Always annualize before comparing with yearly rates.
Understanding your results
IRR above your required return (hurdle rate or cost of capital) means the investment adds value at that rate; below it, it doesn't.
NPV at 0% is the plain profit before considering the time value of money.
IRR is a percentage, not a size. A small project can have a higher IRR than a large one but create less total value. Compare NPVs at your required rate when choosing between projects.
Timing matters. Money received earlier raises the IRR.
Limits of IRR
Multiple answers: if the flows change sign more than once (e.g. −, +, −), there can be more than one IRR, or none. Treat results from such flows with caution and look at NPV instead.
Reinvestment assumption: IRR implicitly assumes interim cash flows can be reinvested at the IRR itself. The modified IRR (MIRR) uses a more realistic reinvestment rate.
Uneven dates: for flows on irregular dates, you need XIRR, which uses actual day counts. This tool assumes equal periods.
Size and duration: IRR alone can favor short, small projects over larger, longer ones that create more wealth.
IRR vs ROI vs CAGR
ROI is total gain ÷ cost, ignoring timing; see the ROI calculator.
CAGR is IRR for the special case of one outlay and one final value.
IRR handles any pattern of flows, including several deposits and withdrawals; it is the money-weighted return.
Country notes
The maths is universal. In practice, US and Canadian private equity and real estate funds report net IRR to investors; UK and other investment platforms often show money-weighted returns, which are IRRs. For tax, the cash flows you enter should be after tax if you want an after-tax IRR.
Tips and common mistakes
Wrong sign on the investment. The initial outlay must be negative.
Missing zero years. If nothing happens in a year, enter 0 so the timing stays right.
Mixing monthly and yearly flows. Keep one period length; a monthly IRR can be annualized as (1 + r)^12 − 1.
Including financing twice. Use either unlevered flows (project only) or levered flows (after loan payments), not a mix.
Quick check
Enter the initial investment as negative.
Frequently asked questions
What is a good IRR?
One that is higher than your required return for the risk. What counts as good depends on the investment type and your alternatives.
How is IRR different from ROI?
ROI ignores when money arrives. IRR accounts for timing, so it's a better measure for multi-year investments.
Why does the calculator say the IRR can't be computed?
The flows may not change sign (for example, all positive), or the method didn't converge. Check the signs and order.
Can I use monthly cash flows?
Yes. The result is a monthly IRR. Annualize it with (1 + monthly IRR)^12 − 1.
What is NPV?
Net present value: the sum of all flows discounted to today at a chosen rate. A positive NPV means the investment beats that rate.
Is IRR the same as yield to maturity?
For a bond, yes in principle: YTM is the IRR of buying the bond and holding it to maturity.
Related calculators
ROI Calculator
Payback Period Calculator
Present Value Calculator
Average Return Calculator
Rental Property Calculator
Time Value of Money Calculator
Sources
1. U.S. Securities and Exchange Commission, Investor.gov: "Glossary: Internal rate of return" (accessed 14 Oct 2026). https://www.investor.gov/introduction-investing/investing-basics/glossary
2. CFA Institute: "Global Investment Performance Standards (GIPS)" money-weighted returns (accessed 14 Oct 2026). https://www.gipsstandards.org/
3. FigSumo methodology.
Disclaimer
This IRR calculator computes returns from the cash flows you enter. It is not investment advice. Projected cash flows are estimates; actual results can differ.
