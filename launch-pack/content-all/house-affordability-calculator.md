---
url: /house-affordability-calculator
title: "How Much House Can I Afford? Affordability Calculator | FigSumo"
description: "Estimate an affordable home price from your income, debts, down payment and rate using debt-to-income ratios, or work backwards from a monthly budget."
h1: "House Affordability Calculator"
country: US default; CA/UK notes (locale switches currency)
status: keep
body_words: 1,037 (minimum 1,000)
verify_flags: 0
updated: 2026-10-15
source: FigSumo-All-Page-Content.docx
---

H1: House Affordability Calculator
Lenders decide how much to lend mainly from your income, your other debts and the payment the new loan would need. This calculator recreates that logic. It finds the largest monthly housing payment that fits a chosen debt-to-income (DTI) limit, turns that payment into a loan amount, and adds your down payment to get a price. You can change the limits, and a budget mode starts from the payment you are comfortable with instead.
How to use this calculator
1. Gross annual income: household income before tax.
2. Monthly debt payments: car, student loan, credit card minimums, child support and similar. Leave out rent and utilities.
3. Down payment and interest rate / term.
4. Property tax, insurance and HOA: monthly estimates. These use up part of the budget before principal and interest.
5. DTI limits: the defaults are 28% (front-end, housing only) and 36% (back-end, all debts). This is a common rule of thumb, not a legal limit. Lenders and loan programs set their own limits, so change these to match your lender's.
The formula
Gross monthly income   G = annual income ÷ 12
Front-end cap          F = G × front-end limit
Back-end cap           K = G × back-end limit − other monthly debts
Housing budget         H = min(F, K)
P&I budget             M = H − property tax − insurance − HOA − PMI
Maximum loan           L = M × (1 − (1 + r)^−n) / r
Affordable price       = L + down payment
r: annual rate ÷ 12
n: term × 12
When the down payment is under 20%, PMI is estimated and subtracted from the budget. Each extra dollar of PMI lowers the maximum loan, so the calculator solves for the price iteratively.
Worked examples
Example 1: income-based. Income $100,000; other debts $500/month; tax + insurance $400/month; 6.5% for 30 years; 20% down; limits 28/36.
G = $8,333.33
Front-end cap: 0.28 × 8,333.33 = $2,333.33
Back-end cap: 0.36 × 8,333.33 − 500 = $2,500.00
Housing budget = the lower of the two = $2,333.33 (front-end binds)
P&I budget: 2,333.33 − 400 = $1,933.33
Maximum loan at 6.5%, 360 months: $305,874.25
With a 20% down payment, the price = loan ÷ 0.8 = $382,342.81, so the down payment needed is about $76,469
Example 2: debts change the answer. Raise other debts to $1,000/month and keep everything else the same. The back-end cap falls to 3,000 − 1,000 = $2,000.00. That is now lower than the front-end cap, so the housing budget drops to $2,000. P&I = $1,600, and the maximum loan falls by about 17%. Paying off a $500-a-month car loan can matter as much as a pay rise.
How income changes the answer
Same assumptions as Example 1 (other debts $500/month, tax and insurance $400/month, 6.5% over 30 years, 20% down, 28/36):
Gross income
Housing budget
Limiting ratio
Max loan
Price with 20% down
$60,000
$1,300.00
Back-end
$142,389.74
$177,987.17
$100,000
$2,333.33
Front-end
$305,874.25
$382,342.81
$150,000
$3,500.00
Front-end
$490,453.54
$613,066.93
At $60,000, the $500 of other debt matters most: the back-end cap ($1,800 − $500) is lower than the front-end cap ($1,400). In practice, property tax and insurance also rise with price, so treat higher-price rows as optimistic.
Understanding your results
Affordable price: what the ratios allow, not a recommendation. Many people choose to borrow less to leave room for saving, childcare or repairs.
Which limit binds: the result says whether the front-end or back-end ratio limited you. If it is the back-end ratio, reducing other debt raises your budget.
Payment breakdown: principal and interest, tax, insurance, HOA and PMI, so you can check the total against your own monthly budget.
Budget mode: enter the monthly payment you want, and the calculator returns the price instead.
Country notes
United States: the CFPB says different loan products and lenders have different DTI limits. Loans that meet the federal Qualified Mortgage definition have their own underwriting rules. FHA and VA programs use their own ratios (VERIFY current program limits before adding presets).
Canada: lenders use gross debt service (GDS) and total debt service (TDS) ratios and must test you at a stress-test rate. Use the Canadian mortgage calculator to check payments. A Canada-specific affordability mode is planned; see GAP-ANALYSIS.
UK: lenders use an affordability assessment based on income and outgoings, with stress-tested rates. Treat this US-style DTI result as a rough guide only.
Tips and common mistakes
Borrowing the maximum you're approved for. Leave room for repairs, savings and changes in income.
Leaving out property tax, insurance and HOA fees. They can add hundreds a month to the payment.
Forgetting closing costs. Budget 2% to 5% of the price on top of the down payment in the US.
Counting on future pay rises. Base the budget on income you have now.
Draining your emergency fund for the down payment. Keep a cushion for the first months of ownership.
Frequently asked questions
What is the 28/36 rule?
It's a rule of thumb: keep housing costs to 28% of gross monthly income, and all debt payments to 36%. Lenders may allow higher ratios, and loan programs differ, so you can change both numbers.
Does this use gross or take-home income?
Gross, because that is what lenders use in DTI ratios. To check comfort against take-home pay, use the paycheck calculator, then budget mode.
Why does a higher interest rate reduce what I can afford?
More of the same monthly budget goes to interest, so the same payment supports a smaller loan. At 6.5%, every $100 of monthly P&I supports about $15,800 of loan over 30 years.
Are property taxes included?
Yes, when you enter them. They come out of the housing budget before the loan size is calculated, so higher-tax areas support a lower price for the same income.
Should I count my partner's income?
Only if they will be on the loan. Lenders count the income and debts of everyone applying.
Is this a pre-approval?
No. A lender's pre-approval checks your credit, income documents and assets. This is an estimate to help you plan before you apply.
Related calculators
Mortgage Calculator
Debt-to-Income Ratio Calculator
Down Payment Calculator
Rent Affordability Calculator
Canadian Mortgage Calculator
UK Mortgage Calculator
Sources
1. Consumer Financial Protection Bureau, "What is a debt-to-income ratio?" https://www.consumerfinance.gov/ask-cfpb/what-is-a-debt-to-income-ratio-en-1791/ (accessed 14 Oct 2026)
2. Consumer Financial Protection Bureau, "Buying a house" resources. https://www.consumerfinance.gov/owning-a-home/ (accessed 14 Oct 2026)
3. OSFI, "Minimum qualifying rate for uninsured mortgages." https://www.osfi-bsif.gc.ca/en/supervision/financial-institutions/banks/minimum-qualifying-rate-uninsured-mortgages (accessed 14 Oct 2026)
Disclaimer
This tool gives estimates for education only. It is not a loan approval or financial advice. Your lender decides what you can borrow based on your full application.
