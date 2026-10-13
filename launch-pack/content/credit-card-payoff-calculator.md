---
url: /credit-card-payoff-calculator
h1: Credit Card Payoff Calculator
title: "Credit Card Payoff Calculator: Avalanche vs Snowball | FigSumo"
description: "See how long credit card debt takes to pay off and the interest cost, compare fixed and minimum payments, and plan several cards with avalanche or snowball."
updated: 2026-10-14
country: global (US default)
calculatorRequirements: "DEV-TASKS T-408 (single-card mode: balance, APR, payment or target months; multi-card mode up to 20 cards with min payments, avalanche/snowball/custom order; minimum-payment comparison with editable formula; month-by-month table; replaces /credit-cards-payoff-calculator slug)"
related: [/debt-payoff-calculator, /debt-consolidation-calculator, /credit-card-calculator, /loan-calculator]
---

Credit card interest is charged on whatever balance is left each month, so the payment you choose decides both how long the debt lasts and how much it costs. This calculator shows the payoff date and the total interest for a fixed monthly payment. It compares that with paying only the minimum, and for several cards it shows which order of repayment saves the most.

## How to use this calculator

1. **Single card:** enter the balance, the APR and either the monthly payment you can afford or the number of months you want to be debt-free in.
2. **Several cards:** add each card's balance, APR and minimum payment. Then enter your total monthly budget for all cards.
3. **Strategy** for several cards: *avalanche* (highest APR first), *snowball* (smallest balance first) or a custom order.
4. Stop adding new purchases to the card while you use the plan, or include them as a monthly charge.

## The formula

Most cards calculate interest daily on the average daily balance. A close monthly approximation is:

```
Interest_month = Balance × APR ÷ 12
New balance    = Balance + Interest_month − Payment
```

Repeat until the balance reaches zero. Total interest is the sum of every month's interest.

With a **fixed payment** *P*, the number of months has a closed form:

```
n = −ln(1 − B × r / P) / ln(1 + r),   r = APR ÷ 12
```

This only works if *P* is more than the first month's interest, B × r. If it isn't, the debt never shrinks.

**Minimum payments** are set by your card agreement. A common structure is "1% of the balance plus that month's interest, or $25 if higher". You can edit this in the calculator.

## Worked examples

**Example 1: one card, two payment levels.**
Balance $6,000, APR 22.99%, no new spending. First month's interest is 6,000 × 0.2299 ÷ 12 = $114.95.

| Monthly payment | Months to pay off | Total interest |
|---|---|---|
| $200 | 46 | $3,011.78 |
| $300 | 26 | $1,638.69 |
| Minimum (1% + interest, $25 floor) | 250 (about 21 years) | $10,404.74 |

Adding $100 a month cuts 20 months off the plan and saves $1,373.09. Paying only the illustrative minimum starts at $174.95 and shrinks as the balance falls. The debt would last over 20 years and cost more in interest than the original balance.

**Example 2: avalanche vs snowball.**
Card A: $4,000 at 24.99%, minimum $80. Card B: $1,500 at 17.99%, minimum $35. Budget $300 a month in total. Minimums are paid on both cards, and the extra goes to the target card.

| Strategy | Months | Total interest |
|---|---|---|
| Avalanche (Card A first) | 23 | $1,281.63 |
| Snowball (Card B first) | 24 | $1,444.18 |

Avalanche saves $162.55 here. Snowball clears one card sooner, which some people find motivating. Both are far better than paying minimums.

## Understanding your results

- **Payoff date and total interest:** assumes the APR doesn't change and you add no new charges.
- **Monthly table:** interest, payment, and the balance on each card.
- **Interest vs principal chart:** shows how much of your money is going to interest at each stage.
- **Promotional rates:** if a card has a 0% balance-transfer period, enter it with its end date. The calculator switches to the standard APR afterwards. Balance-transfer fees are entered separately.

## Country notes

- **United States:** card statements must show how long it would take to repay the balance making only minimum payments, and the monthly payment needed to repay it in 36 months. Compare those figures with this plan.
- **Canada:** minimum payments and interest-free grace periods are set by the issuer within federal rules. Check your statement.
- **UK:** card providers must take action if you are in persistent debt (paying more in interest and charges than principal over 18 months). Free debt advice is available from MoneyHelper.

## Frequently asked questions

### Is avalanche or snowball better?
Avalanche always costs the same or less interest, because it targets the highest rate first. Snowball can help motivation by clearing small balances quickly. The calculator shows the cost difference for your cards.

### Why does paying only the minimum take so long?
Because the minimum falls as the balance falls, and much of it goes to interest. In Example 1, the first minimum payment of $174.95 includes $114.95 of interest.

### Should I consolidate or do a balance transfer?
A lower rate can reduce the cost if the fees and the rate after any promotion still beat your current APR, and if you don't add new debt. Use the [debt consolidation calculator](/debt-consolidation-calculator) to compare.

### Does the calculator use daily interest?
It uses a monthly approximation (APR ÷ 12). Daily-balance interest gives very similar totals for steady payments. Your statement is the exact figure.

### What payment do I need to be debt-free in two years?
Choose "target months", enter 24, and the calculator returns the required payment. For the $6,000 card at 22.99%, it is about $314.21 a month.

### Will paying off cards help my credit score?
Lower balances relative to your limits are generally viewed favourably by credit scoring models, but scoring formulas are proprietary and depend on many factors.

## Sources
1. Consumer Financial Protection Bureau, "Credit cards" consumer tools. https://www.consumerfinance.gov/consumer-tools/credit-cards/ (accessed 14 Oct 2026)
2. CFPB, Regulation Z §1026.7(b)(12): repayment disclosures on periodic statements. https://www.consumerfinance.gov/rules-policy/regulations/1026/7/ (accessed 14 Oct 2026)
3. Financial Conduct Authority, CONC 6.7, including the persistent debt rules. https://www.handbook.fca.org.uk/handbook/CONC/6/7.html (accessed 14 Oct 2026)
4. MoneyHelper, free debt advice. https://www.moneyhelper.org.uk/en/money-troubles/dealing-with-debt (accessed 14 Oct 2026)

## Disclaimer
Estimates assume a constant APR and no new charges. They are not financial advice. Contact your card issuer for exact payoff amounts. If you are struggling with debt, free, confidential advice is available from non-profit services in your country.
