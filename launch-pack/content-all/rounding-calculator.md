---
url: /rounding-calculator
title: "Rounding Calculator: Decimals, Significant Figures | FigSumo"
description: "Round numbers to decimal places, significant figures or the nearest 10, 100 or 1,000, using half-up, half-even and other rounding rules."
h1: "Rounding Calculator"
country: global
status: keep
body_words: 647 (minimum 600)
verify_flags: 0
updated: 2026-10-15
source: FigSumo-All-Page-Content.docx
---

H1: Rounding Calculator
Rounding replaces a number with a shorter, simpler one that's close to it. This calculator rounds to a set number of decimal places or significant figures, the two methods used in school maths, science, finance and engineering.
How to use this calculator
1. Number: the value to round (default 3.14159265).
2. Decimal places / sig figs: how many to keep (default 3).
3. Mode: "Decimal places" or "Significant figures".
Result: the rounded value.
How rounding works
1. Find the last digit you're keeping (the rounding digit).
2. Look at the next digit to its right.
3. If it's 5 or more, add 1 to the rounding digit; if it's 4 or less, leave it.
4. Drop everything after the rounding digit (replacing with zeros left of the decimal point).
Decimal places
Counts digits after the decimal point. Rounding to 2 dp is the norm for money.
Significant figures
Counts digits from the first non-zero digit, regardless of the decimal point:
0.004 5678 → the first significant figure is 4.
Zeros between non-zero digits count (1,005 has 4 sf).
Leading zeros never count.
Internally the calculator multiplies by 10^(n − k), where k is the number of digits before the decimal point, rounds to a whole number and divides back.
Worked examples
Example 1: π to 3 decimal places
3.14159265 → the 4th decimal is 5, so the 1 rounds up → 3.142
Example 2: to 2 significant figures
0.0045678 → significant digits 4, 5, next 6 → 0.0046
Example 3: a large number to 2 sf
123,456 → 120,000
Example 4: money
£12.3456 to 2 dp → £12.35
Example 5: when rounding cascades
9.996 to 2 dp → the third decimal 6 rounds the 9 up, which carries: 10.00 (shown as 10).
Rounding conventions
Method
2.5 →
3.5 →
Used in
Half up (this calculator)
3
4
School maths, everyday use
Half to even (banker's)
2
4
Statistics, IEEE floating point, some accounting
Round down (truncate)
2
3
Age, some tax calculations
Round up (ceiling)
3
4
Materials, sample sizes, seats
HMRC, for example, generally rounds income tax calculations in the taxpayer's favour in specific places [VERIFY for each calculation]. The sample size calculator always rounds up, because a fraction of a person isn't possible.
Significant figures in measurements
Results can't be more precise than your least precise input. Multiplying 2.5 m (2 sf) by 3.14 m (3 sf) gives 7.85 m², which should be reported as 7.9 m² (2 sf). For addition, round to the fewest decimal places among the inputs.
Understanding your results
Trailing zeros may not appear (3.10 shows as 3.1), but if you're reporting significant figures, write them: 3.10 indicates three sf.
Floating-point quirks: some decimals can't be stored exactly in binary, so a value like 1.005 may round to 1.00 in some software. Check borderline cases.
Tips and common mistakes
Rounding in stages. Round 2.449 to 1 dp directly (2.4), not first to 2.45 and then 2.5.
Counting leading zeros as significant figures.
Rounding too early in multi-step calculations; keep full precision until the end.
Frequently asked questions
How do I round to 2 decimal places?
Look at the third decimal: 5 or more rounds up.
What are significant figures?
The meaningful digits of a number, starting from the first non-zero digit.
Does 5 round up or down?
Up, in this calculator (half up). Banker's rounding sends it to the nearest even digit.
How many significant figures does 0.0500 have?
Three (5, 0, 0); leading zeros don't count, trailing ones after a decimal do.
Why shouldn't I round in stages?
It can compound errors and change the result.
How do I round to the nearest 10 or 100?
Divide by 10 or 100, round to 0 dp, then multiply back.
Related calculators
Scientific Notation Calculator
Percent Error Calculator
Fraction Calculator
Basic Calculator
Long Division Calculator
Scientific Calculator
Sources
1. NIST Special Publication 811: "Guide for the Use of the International System of Units", rounding (accessed 14 Oct 2026). https://www.nist.gov/pml/special-publication-811
2. Khan Academy: "Rounding decimals" (accessed 14 Oct 2026). https://www.khanacademy.org/math/arithmetic-home/arith-review-decimals
3. FigSumo methodology.
