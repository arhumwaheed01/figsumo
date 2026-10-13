---
url: /ca/mortgage-calculator
h1: Canadian Mortgage Calculator
title: "Canadian Mortgage Calculator with CMHC Insurance | FigSumo"
description: "Calculate Canadian mortgage payments with semi-annual compounding, CMHC insurance, minimum down payment rules and monthly, bi-weekly or accelerated payments."
updated: 2026-10-14
country: CA
hreflang_cluster: mortgage
calculatorRequirements: "DEV-TASKS T-403 (semi-annual compounding, FCAC min down payment, CMHC premium table, payment frequencies, property tax/condo fee, remove '4.949%' label)"
related: [/ca/land-transfer-tax-calculator, /house-affordability-calculator, /ca/fhsa-calculator, /mortgage-calculator]
---

Canadian mortgages follow rules that most US-built calculators ignore. Fixed rates are compounded semi-annually rather than monthly. Down payments under 20% require mortgage default insurance, and the premium is usually added to the loan. Lenders offer accelerated payment schedules that shorten the amortization. This calculator applies all three, so the payment you see is close to what a Canadian lender would quote.

## How to use this calculator

1. **Purchase price and down payment.** The calculator checks your down payment against the federal minimum and warns you if it is too low.
2. **Mortgage default insurance.** If the down payment is under 20%, it looks up the CMHC premium rate for your loan-to-value and adds the premium to the mortgage. You can switch this off to see the uninsured figure.
3. **Interest rate, term and amortization.** The *term* is how long the rate is locked, often 5 years. The *amortization* is the total payoff period, for example 25 or 30 years. The payment is based on amortization.
4. **Payment frequency.** Choose monthly, semi-monthly, bi-weekly, weekly, accelerated bi-weekly or accelerated weekly.
5. **Property tax and condo fees (optional)** give a full monthly housing cost.

## The formula

**Step 1: convert the quoted rate to a periodic rate.** Canada's *Interest Act* requires a blended-payment mortgage to state the rate "calculated yearly or half-yearly, not in advance." For fixed-rate mortgages that is normally half-yearly (semi-annual) compounding. The rate per payment period is:

```
r = (1 + i/2)^(2/k) − 1
```

- **i**: quoted annual rate (5% → 0.05)
- **k**: payments per year (12 monthly, 24 semi-monthly, 26 bi-weekly, 52 weekly)

**Step 2: the standard payment formula.**

```
PMT = L × r / (1 − (1 + r)^−N)
```

- **L**: mortgage amount including any insurance premium
- **N**: amortization years × k

**Accelerated bi-weekly** is the monthly payment ÷ 2, paid every two weeks. Twenty-six half-payments make 13 monthly payments a year instead of 12, so the loan is paid off sooner.

**Minimum down payment (FCAC):**
- Up to $500,000: 5%
- $500,000 to under $1.5 million: 5% of the first $500,000 plus 10% of the rest
- $1.5 million or more: 20%

**CMHC premium**, as a % of the loan, by loan-to-value (LTV):

| LTV | Premium |
|---|---|
| up to 65% | 0.60% |
| 65.01–75% | 1.70% |
| 75.01–80% | 2.40% |
| 80.01–85% | 2.80% |
| 85.01–90% | 3.10% |
| 90.01–95% | 4.00% |
| 90.01–95%, non-traditional down payment | 4.50% |

## Worked examples

**Example 1: $500,000 home, 10% down, 5%, 25 years, monthly.**
- Down payment $50,000. The minimum for $500,000 is 5% = $25,000, so this qualifies.
- Base loan $450,000; LTV 90%, so the premium rate is 3.10%: $450,000 × 0.031 = **$13,950**
- Insured mortgage L = **$463,950**
- r = (1.025)^(1/6) − 1 = 0.0041239
- N = 300
- **Monthly payment: $2,698.36**
- Total interest over 25 years: **$345,556.90**
- First payment: $1,913.29 interest, $785.07 principal

If the same 5% were compounded monthly, as a US calculator would assume, the payment would be $2,712.21. That is $13.85 a month too high. The semi-annual rule is why US mortgage calculators give slightly wrong answers for Canadian mortgages.

**Example 2: frequency and amortization.**
- 30-year amortization on the same mortgage: monthly payment **$2,476.06**. This is lower, but you pay interest for five extra years. Note that 30-year amortization on an insured mortgage is only available to eligible buyers; check your lender's current rules.
- Accelerated bi-weekly on the 25-year mortgage: $2,698.36 ÷ 2 = $1,349.18 every two weeks. The mortgage is paid off in about **559 payments (about 21.5 years)**, with total interest of about **$289,478**, roughly $56,000 less than monthly payments.

**Minimum down payment check:** on a $700,000 home the minimum is 5% × $500,000 + 10% × $200,000 = **$45,000**.

## Understanding your results

- **Payment per period** is principal and interest only, unless you added property tax or condo fees.
- **Insurance premium** is shown separately so you can see how much of the mortgage is insurance. Some provinces charge provincial sales tax on the premium. That tax is paid at closing and can't be added to the mortgage. The calculator flags it for Ontario, Quebec and Saskatchewan (VERIFY current list with each province before launch).
- **Effective annual rate:** 5% compounded semi-annually equals 5.0625% a year.
- **Renewal:** the payment shown assumes the same rate for the whole amortization. In practice your rate resets at each renewal, usually every 1–5 years.

## Country notes

- **Stress test:** federally regulated lenders must check you can afford an uninsured mortgage at the greater of 5.25% or your contract rate plus 2 points. This calculator shows the payment at your rate; your lender may approve a smaller loan.
- **Variable-rate mortgages** may compound monthly. Check your mortgage contract.
- **Land transfer tax** is a separate closing cost. Use the [land transfer tax calculator](/ca/land-transfer-tax-calculator).
- For US loans, use the [US mortgage calculator](/mortgage-calculator); for UK loans, the [UK mortgage calculator](/uk/mortgage-calculator).

## Frequently asked questions

### Why is a Canadian mortgage payment different from a US one at the same rate?
Canadian fixed-rate mortgages compound twice a year, so the monthly rate is a little lower than the quoted rate ÷ 12. On a $463,950 mortgage at 5% over 25 years, the difference is about $14 a month.

### Do I need mortgage insurance?
If your down payment is under 20% of the purchase price, your mortgage must be insured against default. The premium depends on your loan-to-value and is usually added to the mortgage balance.

### What is the minimum down payment in Canada?
5% on the first $500,000, and 10% on any portion from $500,000 up to $1.5 million. Homes priced at $1.5 million or more need 20%.

### What's the difference between term and amortization?
The term is the length of your current contract and rate, for example 5 years. The amortization is the total time to pay off the mortgage, for example 25 years. You will usually renew several times within one amortization.

### Is accelerated bi-weekly worth it?
It adds the equivalent of one extra monthly payment each year. That shortens a 25-year amortization by about three and a half years and cuts total interest, but it costs more each year. Plain bi-weekly payments, without acceleration, barely change the payoff date.

### Is the CMHC premium included in the payment?
Yes, when insurance applies. The calculator adds the premium to the mortgage and calculates the payment on the larger amount.

### Does this include the stress test?
No. It shows the payment at your contract rate. Your lender checks whether you qualify at the minimum qualifying rate.

## Sources
1. Financial Consumer Agency of Canada, "Saving for a down payment" (minimum down payment rules). https://www.canada.ca/en/financial-consumer-agency/services/mortgages/down-payment.html (accessed 14 Oct 2026)
2. CMHC, "Premium information for homeowner and small rental loans." https://www.cmhc-schl.gc.ca/professionals/project-funding-and-mortgage-financing/mortgage-loan-insurance/mortgage-loan-insurance-homeownership-programs/premium-information-for-homeowner-and-small-rental-loans (accessed 14 Oct 2026)
3. *Interest Act* (R.S.C. 1985, c. I-15), s. 6. https://laws-lois.justice.gc.ca/eng/acts/I-15/page-1.html (accessed 14 Oct 2026)
4. OSFI, "Minimum qualifying rate for uninsured mortgages." https://www.osfi-bsif.gc.ca/en/supervision/financial-institutions/banks/minimum-qualifying-rate-uninsured-mortgages (accessed 14 Oct 2026)

## Disclaimer
This tool gives estimates for education and planning. It is not a mortgage offer, and it is not financial advice. Lender rates, rules and insurance terms change; confirm every figure with your lender or mortgage professional.
