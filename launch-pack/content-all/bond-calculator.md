---
url: /bond-calculator
title: "Bond Price & Yield Calculator | FigSumo"
description: "Price a bond from face value, coupon rate, yield and years to maturity, or solve for yield to maturity. Shows coupon cash flows and current yield."
h1: "Bond Calculator"
country: global
status: keep
body_words: 1,072 (minimum 1,000)
verify_flags: 0
updated: 2026-10-15
source: FigSumo-All-Page-Content.docx
---

H1: Bond Calculator
This calculator prices a fixed-rate bond: it tells you what a bond is worth today given its face value, coupon rate, years to maturity and the yield the market demands. It also shows the yearly coupon in dollars and the current yield. Use it to check a quote from a broker, to see why bond prices fall when rates rise, or to compare a bond with a CD or savings account.
How to use this calculator
1. Face value: the amount repaid at maturity, also called par or principal. Most bonds have a face value of $1,000 (or £100 for UK gilts).
2. Annual coupon rate: the interest the bond pays each year as a percentage of face value, as stated in the bond's terms.
3. Years to maturity: whole years until the bond repays its face value.
4. Yield to maturity: the annual return the market requires on a bond like this one. Take it from a broker's quote screen or a published yield for similar bonds.
Results: estimated bond price, annual coupon payment and current yield.
The formula
A bond's price is the present value of every payment it will make, discounted at the yield to maturity:
Price = Σ (C ÷ (1 + y)^t) for t = 1 … N  +  F ÷ (1 + y)^N
C = F × coupon rate
Current yield = C ÷ Price
F: face value
C: annual coupon payment
y: yield to maturity as a decimal
N: years to maturity
t: year number of each coupon
The calculator assumes one coupon per year, paid at the end of each year, and prices the bond on a coupon date, so there is no accrued interest. Years are treated as whole numbers.
Worked examples
Example 1: 4% coupon, 10 years, market yield 5%
C = 4% × 1,000 = $40.00 a year
Present value of the ten coupons: $308.87
Present value of the $1,000 repayment: 1,000 ÷ 1.05^10 = $613.91
Price = $922.78
Current yield = 40 ÷ $922.78 = 4.33%
The bond sells below par (at a discount) because its 4% coupon is less than the 5% the market wants. The buyer makes up the difference by receiving $1,000 at maturity for less than $1,000 today.
Example 2: 6% coupon, 5 years, how price moves with yield
At a 4.5% yield: $1,065.85 (a premium, because the coupon beats the market rate); current yield 5.63%
At 3.5%: $1,112.88
At 5.5%: $1,021.35
As yields go up, the price goes down, and vice versa.
Understanding your results
Price above face value (premium): coupon rate > yield.
Price below face value (discount): coupon rate < yield.
Price equal to face value (par): coupon rate = yield.
Current yield is only the coupon income relative to price. It ignores the gain or loss as the price moves back to par at maturity, so yield to maturity is the fuller measure.
Interest-rate risk
The longer the maturity, the more the price moves when yields change. A 4% bond moving from a 5% to a 6% yield drops from $922.78 to $852.80 (-7.6%) with 10 years left, but from $846.28 to $724.70 (-14.4%) with 30 years left. This sensitivity is measured by duration.
Semi-annual coupons
Most US Treasury notes and bonds, many corporate bonds and UK gilts pay coupons twice a year. To price those, halve the coupon and the yield and double the number of periods. The Example 1 bond priced with semi-annual payments is $922.05, slightly different from the annual-coupon figure. The calculator currently uses annual coupons, so treat its result as an approximation for semi-annual bonds.
Clean and dirty price
Between coupon dates, the seller is owed interest that has built up since the last coupon (accrued interest). The clean price is the quoted price without it; the dirty price is what you actually pay, including it. This calculator prices on a coupon date, so clean and dirty are the same.
Country notes
United States: Treasury securities are bought through TreasuryDirect or a broker. Interest on Treasuries is exempt from state and local income tax but taxable federally; municipal bond interest is often exempt from federal tax.
Canada: Government of Canada bonds pay semi-annual coupons. Interest is fully taxable as income outside registered accounts such as an RRSP or TFSA.
United Kingdom: gilts are quoted per £100 nominal and pay semi-annually. Gains on gilts are exempt from Capital Gains Tax, though coupons are taxable income outside an ISA or pension.
Tips and common mistakes
Mixing up coupon and yield. The coupon is fixed by the bond; the yield is set by the market.
Using a percentage of par as the face value. Enter dollars (1,000), not 100, unless you want the price per 100 of face.
Forgetting credit risk. A high yield often means a higher chance of default. Ratings and spreads matter.
Ignoring call features. Callable bonds may be repaid early, so yield to call can matter more than yield to maturity.
Frequently asked questions
Why does a bond's price fall when interest rates rise?
Its coupon is fixed. When new bonds pay more, investors will only buy the old bond at a lower price that gives them the market yield.
What is the difference between coupon rate and yield to maturity?
The coupon rate sets the cash interest as a percentage of face value. Yield to maturity is the total annual return if you buy at today's price and hold to maturity, including the move back to par.
What is current yield?
Annual coupon ÷ current price. It is a quick income measure that ignores the gain or loss at maturity.
Does the calculator handle zero-coupon bonds?
Yes. Set the coupon rate to 0 and the price is the face value discounted at the yield.
Can I find the yield if I know the price?
Not directly yet. Try different yields until the price matches; the yield that gives your price is the YTM.
Is the price the same as the amount I'd pay?
Close, but brokers add commissions or spreads, and between coupon dates you also pay accrued interest.
Related calculators
Present Value Calculator
Interest Rate Calculator
CD Calculator
Average Return Calculator
Time Value of Money Calculator
Investment Calculator
Sources
1. U.S. Securities and Exchange Commission, Investor.gov: "Bonds" (accessed 14 Oct 2026). https://www.investor.gov/introduction-investing/investing-basics/investment-products/bonds-or-fixed-income-products/bonds
2. TreasuryDirect: "Treasury Notes" (accessed 14 Oct 2026). https://www.treasurydirect.gov/marketable-securities/treasury-notes/
3. UK Debt Management Office: "About gilts" (accessed 14 Oct 2026). https://www.dmo.gov.uk/responsibilities/gilt-market/about-gilts/
4. FINRA: "Bonds" investor insights (accessed 14 Oct 2026). https://www.finra.org/investors/investing/investment-products/bonds
5. FigSumo methodology.
Disclaimer
This bond calculator gives an estimated price from the inputs you provide. It is not investment advice or a quote. Actual prices depend on accrued interest, coupon frequency, dealer spreads and credit risk.
