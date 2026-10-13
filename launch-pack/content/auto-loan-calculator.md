---
url: /auto-loan-calculator
h1: Auto Loan Calculator
title: "Auto Loan Calculator with Sales Tax, Trade-In & Fees | FigSumo"
description: "Estimate your car payment including sales tax, fees, down payment and trade-in, and compare loan terms or a cash rebate against low-APR financing."
updated: 2026-10-14
country: global (US default; CAD/GBP via locale)
calculatorRequirements: "DEV-TASKS T-407 (price, incentives, down payment, trade-in value and amount owed, sales tax %, fees, 'include tax/fees in loan' toggle, term comparison, rebate vs APR mode)"
related: [/auto-lease-calculator, /loan-calculator, /fuel-economy-calculator, /debt-to-income-calculator]
---

The sticker price is only the starting point. Sales tax, dealer and registration fees, your trade-in and any money still owed on it all change the amount you finance. This calculator works out the amount financed first, then the monthly payment and total interest. It can also show whether a cash rebate or a low promotional APR saves more.

## How to use this calculator

1. **Vehicle price:** the negotiated price, not the MSRP.
2. **Cash incentives/rebate:** money the manufacturer takes off the price.
3. **Down payment:** the cash you put in.
4. **Trade-in value and amount owed:** if you owe more than the trade-in is worth (negative equity), the difference is added to the loan.
5. **Sales tax rate and fees:** enter your combined state and local rate, plus title, registration and documentation fees. Choose whether they are paid upfront or financed.
6. **Interest rate (APR) and term:** usually 36–84 months.

## The formula

**Amount financed.** When tax and fees are financed:

```
Amount financed = Price − Rebate − Down payment − (Trade-in value − Amount owed) + Sales tax + Fees
```

**Sales tax.** States differ on what is taxed:

```
Sales tax = Tax rate × taxable amount
```

In many states, the taxable amount is the price minus the trade-in value. Some states tax the full price, and some states treat rebates differently. The calculator lets you pick the rule; check your state's revenue department.

**Monthly payment:**

```
PMT = A × r / (1 − (1 + r)^−n)
```

- **A**: amount financed
- **r**: APR ÷ 12
- **n**: term in months

Total interest = PMT × n − A.

## Worked examples

**Example 1: choosing a term.**
Price $35,000, sales tax 6% on the full price ($2,100), $5,000 down, no trade-in, no fees, APR 6.9%.
- Amount financed: 35,000 + 2,100 − 5,000 = **$32,100**
- 60 months: r = 0.00575 → **$634.11 a month**, total interest **$5,946.30**
- 72 months: **$545.73 a month**, total interest **$7,192.78**

The 72-month loan lowers the payment by $88.38 but costs $1,246.48 more interest. It also keeps you in debt a year longer, during the period when the car is losing value fastest. In the first month of the 60-month loan, $184.58 of the payment is interest.

**Example 2: $2,000 rebate or 0.9% APR?**
Same car and down payment, 60 months. The dealer offers either a $2,000 cash rebate with your 6.9% bank loan, or 0.9% manufacturer financing with no rebate. Tax is assumed on the full $35,000 in both cases.
- Rebate: financed $30,100 at 6.9% → **$594.60 a month**, $35,675.82 in total payments
- 0.9% APR: financed $32,100 at 0.9% → **$547.33 a month**, $32,839.70 in total payments

The low APR wins by about $2,836 over the loan. With a smaller rate gap, or a larger rebate, the answer can flip, which is why the comparison mode runs both options with your numbers.

## Dealer financing, bank loans or cash?

- **Dealer-arranged financing** is convenient and sometimes carries manufacturer promotions, such as Example 2's 0.9% APR. The dealer may also be able to mark up the rate it obtains from the lender.
- **Direct loans** from a bank or credit union let you shop for a rate before you visit the dealer, and give you something to compare the dealer's offer with.
- **Paying cash** avoids interest entirely but ties up savings. Compare the interest cost shown here with what that cash would earn, and keep an emergency fund.

Whichever you choose, negotiate the vehicle price separately from the financing and the trade-in, so that a low payment doesn't hide a higher total cost.

## Understanding your results

- **Amount financed** is the real loan size. If it is larger than the car's value (because of negative equity, financed fees or tax), you start the loan "upside down".
- **Monthly payment** covers principal and interest only. Insurance, fuel and maintenance are extra.
- **Total cost** = down payment + all payments + any tax and fees paid upfront.
- **Term comparison table:** the same loan at 36, 48, 60, 72 and 84 months, so you can see the trade-off between payment and interest at a glance.

## Country notes

- **United States:** sales tax rules and rates are set by states and localities. Dealers must give you a Truth in Lending disclosure showing the APR, the finance charge and the amount financed. Compare it with this estimate.
- **Canada:** GST/HST and provincial sales tax apply to vehicle purchases, and the rules differ by province. Enter your combined rate.
- **UK:** car finance is often hire purchase (HP) or personal contract purchase (PCP) rather than a simple loan. PCP has a large final "balloon" payment, so this calculator only models HP or a personal loan.

## Frequently asked questions

### Is it better to finance sales tax and fees or pay them upfront?
Paying upfront avoids interest on them. Financing them keeps more cash in hand but raises the amount financed and the interest. On a 6.9%, 60-month loan, every $1,000 financed adds about $185 of interest.

### How does a trade-in affect the payment?
Positive equity (the trade-in is worth more than you owe) works like a down payment. Negative equity is added to the new loan. In many states, the trade-in value also lowers the taxable price.

### What loan term should I choose?
Shorter terms cost less interest and build equity faster. Longer terms lower the payment but increase total interest and the risk of owing more than the car is worth. The comparison table shows the cost of each option.

### Why is the dealer's payment higher than this?
Check whether the dealer added fees, an extended warranty, GAP insurance or other products to the amount financed. Ask for an itemised breakdown and compare it with the amount financed here.

### Does my credit score matter?
Yes. Lenders set the APR based on credit and other factors. Get a pre-approval from a bank or credit union so you have a rate to compare with the dealer's offer.

### Rebate or low APR: which is better?
It depends on the size of the rebate, the rate gap and the term. Run both options in comparison mode. Example 2 shows one case where the low APR wins.

## Sources
1. Consumer Financial Protection Bureau, "Auto loans" consumer tools. https://www.consumerfinance.gov/consumer-tools/auto-loans/ (accessed 14 Oct 2026)

## Disclaimer
Estimates are for planning only. They are not a credit offer or financial advice. Tax treatment of rebates and trade-ins varies by state and province, so confirm with the dealer's written disclosure and your local tax authority.
