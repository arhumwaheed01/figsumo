---
url: /loan-calculator
h1: Loan Calculator
title: "Loan Calculator: Monthly Payment, Interest & Schedule | FigSumo"
description: "Find the monthly payment, total interest and payoff schedule for any fixed-rate loan, and see how term, rate and fees change the true cost."
updated: 2026-10-14
country: global (currency follows locale: USD/CAD/GBP)
calculatorRequirements: "DEV-TASKS T-213, T-412 (solve for payment/amount/term/rate, optional upfront fee → APR, compounding/payment frequency, schedule; merge /repayment-calculator)"
related: [/personal-loan-calculator, /auto-loan-calculator, /amortization-calculator, /apr-calculator, /interest-calculator, /debt-consolidation-calculator]
---

Use this calculator for personal loans, car loans, student loans and any other fixed-rate loan that you repay in equal instalments. Enter the amount, rate and term to get the regular payment and the total interest. It works backwards too: give it a payment you can afford, and it finds the loan amount or the time needed to pay it off.

## How to use this calculator

1. **Choose what to solve for:** payment, loan amount, term or interest rate.
2. **Loan amount:** the amount you borrow, before any fee.
3. **Interest rate:** the nominal annual rate in your loan agreement.
4. **Term:** years and/or months.
5. **Upfront fee (optional):** an origination or arrangement fee. If it is deducted from the money you receive, the calculator shows the resulting APR as well as the payment.
6. **Payment frequency:** monthly by default; bi-weekly and weekly are also available.

The currency follows your country setting. The maths is the same in every country.

## The formula

For a loan repaid in equal instalments (an amortizing loan):

```
PMT = P × r / (1 − (1 + r)^−n)
```

- **PMT**: payment per period
- **P**: principal (amount borrowed)
- **r**: interest rate per period = annual rate ÷ payments per year
- **n**: total number of payments

Total interest = PMT × n − P.

To solve for the **term**:

```
n = −ln(1 − P × r / PMT) / ln(1 + r)
```

This only works when PMT is larger than the first period's interest, P × r. Otherwise the loan never shrinks.

To solve for the **rate** or the **APR**, there is no closed-form answer. The calculator searches numerically for the rate that makes the payments' present value equal to the amount you actually received.

## Worked examples

**Example 1: personal loan.**
$15,000 at 9% for 4 years, monthly.
- r = 0.09 / 12 = 0.0075; n = 48
- PMT = 15,000 × 0.0075 / (1 − 1.0075^−48) = **$373.28 a month**
- Total paid: $17,917.23 · **total interest: $2,917.23**
- First payment: $112.50 interest (15,000 × 0.0075) and $260.78 principal

Shortening the term to 3 years (36 payments) raises the payment to **$477.00** and lowers total interest to **$2,171.86**, a saving of $745.37.

**Example 2: an upfront fee changes the real rate.**
The same loan, with a 3% origination fee ($450) taken out of the loan proceeds. You receive $14,550 but still repay $373.28 a month for 48 months on $15,000. Solving for the rate that links $14,550 to those payments gives an **APR of about 10.61%**, compared with the 9% headline rate. This is why comparing APRs is fairer than comparing headline rates.

## Other loan structures

Not every loan is repaid in equal instalments. Two other common structures:

- **Deferred-payment (lump-sum) loan:** nothing is paid until maturity, when principal and all accrued interest are due together: FV = P × (1 + r)^n. For example, $10,000 at 6% compounded monthly for 5 years means $13,488.50 is due at the end.
- **Zero-coupon bond (borrower's view):** you receive less than face value today and repay the face value at maturity. The amount received is PV = FV ÷ (1 + r)^n. A $10,000 face value due in 10 years at 5% compounded annually raises $6,139.13 today.

Both are available as modes in the calculator (DEV-TASKS T-412). Compounding frequency can be set separately from payment frequency.

## Understanding your results

- **Payment** is the fixed instalment. The last payment can differ by a few cents because of rounding.
- **Total interest** is the cost of borrowing. Two loans with the same payment can have very different total costs if their terms differ.
- **Amortization schedule:** shows each payment split into interest and principal, and the remaining balance. Interest falls over time because it is charged on a shrinking balance.
- **APR (when a fee is entered):** an estimate of the yearly cost including the fee. Lenders calculate the legally disclosed APR under their own country's rules, so use their figure for official comparisons.

## Country notes

- **United States:** lenders must disclose the APR and finance charge under the Truth in Lending Act. Federal student loans and mortgages have dedicated calculators on FigSumo.
- **Canada:** federally regulated lenders must tell you the loan amount, the interest rate, the term, the payment and any fees. The FCAC also notes that lenders may not charge more than 35% a year, counting all interest, fees and costs. Mortgages are different: they use semi-annual compounding, so use the [Canadian mortgage calculator](/ca/mortgage-calculator).
- **UK:** consumer credit offers quote a representative APR. Not every borrower gets that rate, so enter the rate you are actually offered.

## Frequently asked questions

### What is the difference between interest rate and APR?
The interest rate is what's charged on the balance. The APR adds certain fees and expresses the total as a yearly rate, so you can compare loans with different fee structures.

### Does paying extra reduce my interest?
Yes, for a standard amortizing loan, because extra money reduces the principal that interest is charged on. Check your agreement for prepayment penalties first. Use the [amortization calculator](/amortization-calculator) to model extra payments.

### Why is a longer term cheaper per month but more expensive overall?
Interest is charged on the outstanding balance, and a longer term keeps the balance higher for longer. In Example 1, four years costs $745.37 more interest than three.

### Can I use this for an interest-only or balloon loan?
No. This page models fully amortizing loans, where the balance reaches zero with the last regular payment. Interest-only and balloon structures leave part of the principal to be repaid at the end. Ask your lender for their schedule.

### How is a daily-interest loan different?
Some loans charge interest daily on the balance. The total is very close to the monthly result if you pay on time, but paying early or late changes the interest slightly.

### What payment frequency should I choose?
Use whatever your lender's schedule is. Bi-weekly payments on a loan that charges interest by period will reduce total interest slightly compared with monthly.

## Sources
1. Consumer Financial Protection Bureau, "What is the difference between a mortgage interest rate and an APR?" (the same principle applies to other loans) https://www.consumerfinance.gov/ask-cfpb/what-is-the-difference-between-a-mortgage-interest-rate-and-an-apr-en-135/ (accessed 14 Oct 2026)
2. Financial Consumer Agency of Canada, "Personal loans." https://www.canada.ca/en/financial-consumer-agency/services/loans/personal-loans.html (accessed 14 Oct 2026)
3. Financial Conduct Authority, Consumer Credit sourcebook (CONC) App 1, APR calculation. https://www.handbook.fca.org.uk/handbook/CONC/App/1/ (accessed 14 Oct 2026)

## Disclaimer
Results are estimates for planning and comparison. They are not a credit offer or financial advice. The figures in your loan agreement take precedence.
