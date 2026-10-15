---
url: /time-value-of-money-calculator
title: "Time Value of Money Calculator: PV, PMT, FV | FigSumo"
description: "Solve for any one of number of periods, interest rate, present value, payment or future value, like a financial calculator. Shows the equation used."
h1: "Time Value of Money Calculator"
country: global
status: rename (301)
body_words: 1,066 (minimum 1,000)
verify_flags: 0
updated: 2026-10-15
source: FigSumo-All-Page-Content.docx
---

H1: Time Value of Money Calculator
The time value of money is the idea that a dollar today is worth more than a dollar later, because today's dollar can earn interest. Every loan, savings plan, annuity and investment calculation rests on one equation that links five values: number of periods, interest rate, present value, payment and future value. This page explains that equation and gives you a quick tool for two of its most common uses: the monthly payment on a loan and the future value of regular monthly savings, at the same annual rate.
How to use this calculator
1. Loan balance: the amount borrowed (present value of the loan).
2. Annual rate: the yearly interest rate, used for both the loan and the savings.
3. Years: the period for both the loan term and the savings plan.
4. Monthly savings: a regular amount you save each month.
Results:
Loan payment (monthly): the fixed payment that repays the loan balance over the years entered.
Savings future value: what the monthly savings grow to by the end, with monthly compounding and deposits at the end of each month.
Net monthly (save − payment): monthly savings minus the loan payment. A negative figure means the loan payment is larger than your savings amount.
A typical use: "If I borrow this sum instead of saving for it, what would the payment be, and what would the same money grow to if I saved it instead?"
The formula
The general time-value-of-money equation, with payments at the end of each period, is:
PV × (1 + i)^n + PMT × ((1 + i)^n − 1) / i + FV = 0
n: number of periods
i: interest rate per period (annual rate ÷ periods per year)
PV: present value (money now)
PMT: regular payment each period
FV: future value (money at the end)
Cash you receive is positive and cash you pay out is negative. Given any four values, the fifth can be found. Solving for n or the payment has a closed form; solving for the rate needs a numerical method.
This tool uses two special cases:
Loan payment:  PMT = PV × i / (1 − (1 + i)^−n)            (FV = 0)
Savings FV:    FV  = PMT × ((1 + i)^n − 1) / i             (PV = 0)
with i = annual rate ÷ 12 and n = years × 12.
Worked examples
Example 1: $15,000 at 7% over 4 years, and $250 a month saved
Loan payment = 15,000 × (0.07 ÷ 12) ÷ (1 − (1 + 0.07 ÷ 12)^−48) = $359.19
Savings future value = 250 × ((1 + 0.07 ÷ 12)^48 − 1) ÷ (0.07 ÷ 12) = $13,802.31
Net monthly = 250 − $359.19 = −$109.19
Over four years you'd pay $17,241.30 on the loan, while $12,000.00 of savings would grow to $13,802.31. Borrowing now costs the interest; saving first earns it, but you wait four years.
Example 2: the other TVM questions, by hand
Present value: to have $50,000 in 8 years at 5% compounded monthly, you need $33,543.87 today: PV = 50,000 ÷ (1 + 0.05 ÷ 12)^96. The present value calculator does this directly.
Payment to reach a goal: to build $50,000 in 8 years from nothing at 5%, save $424.66 a month: PMT = FV × i ÷ ((1 + i)^n − 1).
Lump sum plus payments: $10,000 now plus $200 a month for 10 years at 6% grows to $50,969.84. The future value calculator handles the lump-sum part.
Understanding your results
Loan payment includes principal and interest only.
Savings future value assumes the rate is earned every month and deposits are made at the end of each month. Deposits at the start of each month would add one extra month of interest to each deposit.
One rate for both. In real life, borrowing rates are usually higher than savings rates. To compare realistically, run the calculator twice with each rate and read the relevant output from each run.
Key ideas
Compounding: interest earns interest. The more often it compounds, the faster money grows at the same nominal rate.
Discounting: the reverse of compounding; it converts future money into today's value.
Opportunity cost: the return you give up by using money one way rather than another. The discount rate you choose should reflect it.
Inflation: a separate effect that reduces buying power. Use a real rate (return minus inflation) to express results in today's money; see the inflation calculator.
Country notes
The maths is the same everywhere. Conventions differ: US and UK loans usually compound monthly, while Canadian fixed-rate mortgages are, by law, quoted with interest calculated yearly or half-yearly, not in advance (Interest Act, s.6), so monthly mortgage payments use an equivalent monthly rate. The Canadian mortgage calculator applies that rule.
Tips and common mistakes
Mismatched periods. Use a monthly rate with monthly periods.
Sign errors on financial calculators. Money paid out and money received need opposite signs, or the calculator returns an error.
Begin vs end mode. Leases and rent are usually paid at the start of a period; loans and most savings at the end.
Nominal vs effective rate. A 6% rate compounded monthly is an effective 6.17% a year.
Frequently asked questions
What is the time value of money?
The principle that money available now is worth more than the same amount in the future, because it can earn interest or returns in the meantime.
What are the five TVM variables?
Number of periods (N), interest rate per period (I/Y), present value (PV), payment (PMT) and future value (FV).
Why does the calculator use one rate for the loan and the savings?
It is a simple side-by-side view. For different rates, run it twice.
Is this the same as a financial calculator?
It uses the same equation. A full solver that finds any of the five values is planned; until then, the examples above show the other formulas.
How do I find the interest rate from a payment?
There is no closed formula, so it needs trial and error or a numerical solver. Use the interest rate calculator.
What discount rate should I use?
For personal decisions, the return you could reasonably earn elsewhere at similar risk, or your borrowing rate if you would otherwise borrow.
Related calculators
Present Value Calculator
Future Value Calculator
Loan Calculator
Annuity Calculator
Interest Rate Calculator
IRR Calculator
Sources
1. U.S. Securities and Exchange Commission, Investor.gov: "Compound Interest Calculator" and explanation (accessed 14 Oct 2026). https://www.investor.gov/financial-tools-calculators/calculators/compound-interest-calculator
2. Interest Act (Canada), R.S.C. 1985, c. I-15, s. 6 (accessed 14 Oct 2026). https://laws-lois.justice.gc.ca/eng/acts/I-15/page-1.html
3. Consumer Financial Protection Bureau: "What is amortization?" (accessed 14 Oct 2026). https://www.consumerfinance.gov/ask-cfpb/what-is-amortization-and-how-could-it-affect-my-auto-loan-en-873/
4. FigSumo methodology.
Disclaimer
This time value of money calculator is for estimates and learning. It is not financial advice. Actual loans and investments have fees, variable rates and terms that change the results.
