---
url: /amortization-calculator
title: "Amortization Calculator & Schedule with Extra Payments | FigSumo"
description: "Generate a full amortization schedule for any fixed-rate loan, see interest vs principal each month and test how extra payments shorten the loan."
h1: "Amortization Calculator"
country: global
status: keep
body_words: 1,053 (minimum 1,000)
verify_flags: 0
updated: 2026-10-15
source: FigSumo-All-Page-Content.docx
---

H1: Amortization Calculator
An amortization schedule shows, payment by payment, how much of what you pay is interest, how much reduces the balance, and what is still owed. It explains why early payments do so little to shrink a long loan, and why extra payments made early save so much. Enter your loan details to see the full schedule, a yearly summary and the effect of paying extra.
How to use this calculator
1. Loan amount, interest rate and term: take these from your loan agreement.
2. Start date: the month of your first payment, so the schedule shows real dates.
3. Extra payments (optional): a fixed extra amount each month, an extra amount once a year, or a one-time lump sum in a chosen month.
4. Switch between the monthly schedule, the yearly summary and the balance chart. You can download the schedule as a CSV.
The formula
The regular payment is:
PMT = P × r / (1 − (1 + r)^−n)
Then, for each period k:
Interest_k  = Balance_(k−1) × r
Principal_k = PMT − Interest_k (+ any extra payment)
Balance_k   = Balance_(k−1) − Principal_k
P: original loan amount
r: periodic rate (annual rate ÷ 12 for monthly payments)
n: number of payments
The last payment is reduced so the balance ends at exactly zero. Extra payments go straight to principal. This lowers every later interest charge, so the loan ends early, while the scheduled payment stays the same.
Worked examples
Example 1: the first three months of a mortgage. $250,000 at 6% for 30 years. r = 0.005, n = 360, payment $1,498.88.
Month
Interest
Principal
Balance
1
$1,250.00
$248.88
$249,751.12
2
$1,248.76
$250.12
$249,501.00
3
$1,247.51
$251.37
$249,249.63
Month 1 interest is 250,000 × 0.005 = $1,250.00. The rest of the payment, $248.88, reduces the balance. Each month, interest falls a little and principal rises by the same amount.
First-year totals: $14,916.49 of interest, balance $246,929.97. Only about $3,070 of the $17,987 paid in year 1 went to principal.
Principal first exceeds interest in month 223 (year 19).
Total interest over 30 years: $289,595.47.
Example 2: adding $200 a month. The same loan with an extra $200 every month from the start:
Paid off in 267 months instead of 360 (7 years 9 months sooner)
Total interest $203,362.51, a saving of $86,232.96
That saving comes from $53,400 of extra payments (267 × $200). Each dollar paid early saves interest for the rest of the loan.
Term comparison: 15 vs 30 years
The same $250,000 at 6%:
Term
Monthly payment
Total interest
30 years
$1,498.88
$289,595.47
15 years
$2,109.64
$129,735.57
The 15-year schedule costs $610.76 more a month and saves $159,859.90 in interest. Its first payment is still mostly interest ($1,250.00 interest, $859.64 principal), but principal overtakes interest in month 43, compared with month 223 on the 30-year loan. Use the comparison toggle to place two schedules side by side.
Balance over time ($250,000 at 6% over 30 years)
After year
Remaining balance
Interest paid so far
1
$246,929.97
$14,916.49
5
$232,635.89
$72,568.47
10
$209,214.31
$139,079.47
15
$177,622.11
$197,419.85
20
$135,008.97
$244,739.28
25
$77,530.22
$277,193.11
Half the original balance is still owed after roughly 20 years, because early payments are mostly interest.
Example 3: a $30,000 car loan at 6% over 5 years. The payment is $579.98 a month. In the first year, about $1,655.71 of the $6,959.81 paid is interest; in the final year, only about $221.01. Shorter loans shift to principal far faster than mortgages.
Understanding your results
Schedule table: each row is one payment. The interest column falls, the principal column rises, and the balance reaches zero at the end.
Yearly summary: totals for each year. Useful for planning, and in the US for estimating how much mortgage interest you might report if you itemize deductions. Your lender's Form 1098 gives the official figure.
Chart: the balance over time, with cumulative interest and principal. The vertical axis is in your currency; it is not a percentage.
With extra payments: the new payoff date, the interest saved, and the total extra paid.
Country notes
United States: most fixed-rate mortgages and auto loans amortize monthly, as shown here.
Canada: fixed-rate mortgages use semi-annual compounding. The Canadian mortgage calculator produces the correct schedule.
UK: repayment mortgages amortize the same way. Many fixed-rate deals limit penalty-free overpayments, so check your offer before modelling large extra payments.
Tips and common mistakes
Assuming extra payments go to principal automatically. Tell your lender to apply them to principal, and check the next statement.
Comparing loans by payment alone. Look at total interest across the whole schedule.
Forgetting escrow. The schedule covers principal and interest; taxes and insurance are added on top.
Using a rounded rate. 6.49% and 6.5% give slightly different schedules; use the exact note rate.
Frequently asked questions
Why is most of my early payment interest?
Interest is charged on the outstanding balance, which is largest at the start. As the balance falls, less of each payment is needed for interest and more goes to principal.
Do extra payments lower my monthly payment?
Usually not. Most lenders keep the payment the same and end the loan earlier. Some offer a "recast" that lowers the payment after a large lump sum, usually for a fee.
Is it better to pay extra monthly or once a year?
For the same total amount, paying earlier saves slightly more interest because it reduces the balance sooner. Either option saves far more than not paying extra.
Does the schedule match my lender's exactly?
It should be within cents if your lender charges interest monthly. Lenders that charge daily interest, or that apply payments on specific dates, may show small differences.
Can I see the schedule for a loan I've already started?
Yes. Enter the current balance, the remaining term and your rate, and set the start date to your next payment.
What does "negative amortization" mean?
It means the payment is smaller than the interest due, so the balance grows. Standard fixed-rate loans don't do this. The calculator warns you if your inputs would cause it.
Related calculators
Mortgage Calculator
Loan Calculator
Refinance Calculator
Interest Calculator
Sources
1. Consumer Financial Protection Bureau, "What is amortization and how could it affect my auto loan?" https://www.consumerfinance.gov/ask-cfpb/what-is-amortization-and-how-could-it-affect-my-auto-loan-en-771/ (accessed 14 Oct 2026)
2. Consumer Financial Protection Bureau, "What is negative amortization?" https://www.consumerfinance.gov/ask-cfpb/what-is-negative-amortization-en-103/ (accessed 14 Oct 2026)
Disclaimer
This schedule is an estimate for education and planning. It does not replace your lender's statements, and it is not financial or tax advice.
