---
url: /interest-rate-calculator
title: "Interest Rate Calculator: Find the Rate on a Loan | FigSumo"
description: "Work out the interest rate implied by a loan amount, monthly payment and term. Useful for checking a dealer or lender quote."
h1: "Interest Rate Calculator"
country: global
status: keep
body_words: 1,006 (minimum 1,000)
verify_flags: 0
updated: 2026-10-15
source: FigSumo-All-Page-Content.docx
---

H1: Interest Rate Calculator
If you know how much you're borrowing, the monthly payment and the term, this calculator finds the interest rate the lender is charging. It is the quickest way to check a quote that gives only a payment, such as "just $465 a month for 60 months", and to compare it with other offers.
How to use this calculator
1. Loan amount: the amount you will actually borrow (the amount financed).
2. Loan term (years) and Loan term (months): the repayment period. For 5 years, enter 5 and 0; for 42 months, enter 3 and 6.
3. Monthly payment: the payment you have been quoted, excluding any insurance or add-ons billed separately.
Results: the interest rate, the total of monthly payments, the total interest paid and an amortization chart.
The formula
The rate is the value of r that makes the standard payment formula match your payment:
PMT = P × r / (1 − (1 + r)^−n)
Annual rate = r × 12
P: loan amount
n: number of monthly payments
r: monthly rate (unknown)
There is no algebraic way to isolate r, so the calculator searches numerically (bisection) until the payment from the formula equals your payment, then reports r × 12 to three decimals. If the payments add up to no more than the loan amount, there is no positive rate and the calculator says so.
Worked examples
Example 1: $32,000 over 3 years at $960 a month
36 payments of $960 = $34,560.00
Total interest = $2,560.00
Interest rate = 5.065%
Example 2: checking a car dealer's quote
A dealer quotes $465 a month for 60 months on $24,000 financed.
Implied rate: 6.091%
Total paid $27,900.00; interest $3,900.00
Check: a $24,000 loan at 6.091% over 60 months gives a payment of $465.00.
If a credit union offers the same loan at a payment of $445, that payment implies 4.277%; the $20 difference each month is worth $1,200 over the loan.
How payment and rate move together
For $24,000 over 60 months, each percentage point on the rate adds roughly $11 to the monthly payment:
Rate
Monthly payment
Total interest
4%
$442.00
$2,519.79
6%
$463.99
$3,839.23
8%
$486.63
$5,198.01
10%
$509.93
$6,595.74
Small-looking payment differences add up to large differences in interest over a five-year loan.
Understanding your results
Interest rate is the nominal annual rate (monthly rate × 12) that matches the payment. It is the right figure to compare with quotes that state a rate.
It is not the APR if fees are involved. If fees were added to the loan or deducted from what you receive, enter the amount you actually receive to see the APR-style rate. The APR calculator handles fees directly.
Total interest assumes you make every payment for the full term.
Rounding: quoted payments are rounded to the cent, so the implied rate can differ from the lender's stated rate in the third decimal place.
When the rate looks wrong
Very high rate: the payment may include optional products (warranties, insurance) rolled into it, or the loan amount may be smaller than you think.
Rate near zero or an error: the payments barely exceed the loan amount; check you entered the right term.
Different from the advertised rate: promotions often apply to shorter terms or top credit tiers only.
Country notes
United States: lenders must disclose the APR and finance charge under the Truth in Lending Act before you sign. Use this tool to check the numbers line up.
Canada: lenders must disclose the annual percentage rate and total cost of borrowing. Provincial consumer protection laws cover dealer financing.
United Kingdom: credit agreements must state the APR and total amount payable under the Consumer Credit Act. Car finance often uses PCP with a final balloon payment, which this calculator does not model.
Tips and common mistakes
Using the vehicle price instead of the amount financed. Subtract the down payment and trade-in.
Leaving out the months field. A 42-month loan entered as 3 years gives the wrong rate.
Comparing payments on different terms. Compare the rate and total cost.
Ignoring balloons. If the deal has a large final payment, this tool will understate the rate.
Quick check
Check that the term you enter matches the payment frequency.
Frequently asked questions
How do I find the interest rate on a loan?
Enter the loan amount, term and monthly payment. The calculator solves for the rate that matches.
Why is there no simple formula for the rate?
Because the rate appears in both the numerator and an exponent in the payment equation. It has to be found by trial and improvement, which the calculator does instantly.
Is the result an APR?
It is the nominal rate implied by the amount and payment. It equals the APR when there are no fees.
Can I use this for a mortgage?
Yes, for a fixed-rate loan with equal monthly payments. Exclude escrow amounts (tax and insurance) from the payment.
What if my loan has weekly or bi-weekly payments?
Convert to a monthly equivalent only for a rough check; for an exact answer you need a calculator that uses the actual payment frequency.
Does it work for savings?
No. For savings growth, use the compound interest calculator.
Can a lower payment hide a higher rate?
Yes. Stretching the term lowers the payment even at a higher rate. Always compare the rate (or APR) and the total interest, not the payment alone.
What rate is "good" for my loan?
It depends on the loan type, term, your credit and current market rates. Get two or three quotes for the same amount and term and compare the implied rates here.
Related calculators
APR Calculator
Loan Calculator
Auto Loan Calculator
Personal Loan Calculator
IRR Calculator
Loan Comparison Calculator
Sources
1. Consumer Financial Protection Bureau: "What is the difference between a loan interest rate and the APR?" (accessed 14 Oct 2026). https://www.consumerfinance.gov/ask-cfpb/what-is-the-difference-between-a-loan-interest-rate-and-the-apr-en-733/
2. Federal Trade Commission: "Understanding Vehicle Financing" (accessed 14 Oct 2026). https://consumer.ftc.gov/articles/understanding-vehicle-financing
3. Financial Consumer Agency of Canada: "Understanding your loan agreement" (accessed 14 Oct 2026). https://www.canada.ca/en/financial-consumer-agency/services/loans.html
4. FigSumo methodology.
Disclaimer
This interest rate calculator estimates the rate implied by your figures. It is not financial advice. Your credit agreement states the official rate and APR.
