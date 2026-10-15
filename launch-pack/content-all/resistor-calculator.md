---
url: /resistor-calculator
title: "Resistor Color Code Calculator (4, 5 and 6 Band) | FigSumo"
description: "Decode resistor colour bands into resistance and tolerance, or find the bands for a value. Covers 4, 5 and 6-band resistors."
h1: "Resistor Color Code Calculator"
country: global
status: keep
body_words: 622 (minimum 600)
verify_flags: 0
updated: 2026-10-15
source: FigSumo-All-Page-Content.docx
---

H1: Resistor Color Code Calculator
Resistors combine in two basic ways. In series, current flows through one after another and the resistances add. In parallel, current splits between them and the combined resistance is lower than the smallest one. Enter two resistor values and choose a configuration to get the equivalent resistance.
How to use this calculator
1. R1 (Ω) and R2 (Ω): default 100 and 220.
2. Configuration: "Parallel (R1 ∥ R2)" or "Series (R1 + R2)".
Result: equivalent resistance in ohms.
The formulas
Series:
R = R1 + R2 + …
Parallel:
1 ÷ R = 1 ÷ R1 + 1 ÷ R2 + …
For two resistors: R = (R1 × R2) ÷ (R1 + R2)
Worked examples
Example 1: parallel (the default)
(100 × 220) ÷ (100 + 220) = 22,000 ÷ 320 = 68.75 Ω
Example 2: series
100 + 220 = 320 Ω
Example 3: three in parallel
Add a 470 Ω: 1 ÷ (1/100 + 1/220 + 1/470) = 59.98 Ω. For more than two, combine two at a time with the calculator: first 100 ∥ 220 = 68.75, then 68.75 ∥ 470.
Example 4: equal resistors
Two 1 kΩ in parallel = 500 Ω (half of one). n equal resistors in parallel give R ÷ n.
Example 5: a voltage divider
1 kΩ and 2.2 kΩ in series across 9 V: the voltage across the 2.2 kΩ is 9 × 2,200 ÷ 3,200 = 6.188 V. See the Ohm's law calculator for current and power.
Why use series or parallel?
Series: to make a value you don't have (100 + 220 = 320), or to share a high voltage across several resistors.
Parallel: to make a lower value, or to share power dissipation so each resistor runs cooler.
Resistor colour codes (4-band)
Colour
Digit
Multiplier
Black
0
×1
Brown
1
×10
Red
2
×100
Orange
3
×1k
Yellow
4
×10k
Green
5
×100k
Blue
6
×1M
Violet
7
×10M
Grey
8
—
White
9
—
Gold
—
×0.1 (±5% tolerance as 4th band)
Silver
—
×0.01 (±10%)
Example: yellow-violet-orange-gold = 4, 7, ×1,000 = 47 kΩ ±5% (47,000 Ω). A colour-code decoder is planned for this page.
Standard values
Resistors come in preferred series. E12 (±10%): 10, 12, 15, 18, 22, 27, 33, 39, 47, 56, 68, 82 and their multiples of ten. E24 (±5%) adds values in between. Choose the nearest standard value, or combine two.
Understanding your results
Tolerance adds up: two ±5% resistors in series give a total that's still within ±5%.
Parallel results are always below the smallest resistor.
Power: check each resistor's share of the power (P = I²R) against its rating.
Tips and common mistakes
Adding parallel resistors directly.
Forgetting the reciprocal at the end of the parallel formula.
Mixing kΩ and Ω in the inputs (4.7 kΩ = 4,700).
Notes for US, Canada and UK users
US and Canadian electronics texts write "color code" and UK texts "colour code", but the bands are an international standard (IEC 60062) and the values are the same. UK schools and some datasheets use the "R" notation, where 4R7 means 4.7 Ω and 2K2 means 2.2 kΩ, because a printed decimal point is easily lost.
Check: 2.2 kΩ and 4.7 kΩ in parallel give 2.2 × 4.7 ÷ (2.2 + 4.7) = 1.499 kΩ.
Frequently asked questions
How do I calculate resistors in series?
Add the values.
How do I calculate resistors in parallel?
1 ÷ (1/R1 + 1/R2), or (R1 × R2) ÷ (R1 + R2) for two.
Is parallel resistance always lower?
Yes, lower than the smallest resistor.
What is 100 Ω in parallel with 220 Ω?
68.75 Ω.
How do I read a resistor colour code?
First two bands are digits, the third is the multiplier, the fourth is tolerance.
Can I calculate more than two resistors?
Combine them two at a time.
Related calculators
Ohm's Law Calculator
Voltage Drop Calculator
Electricity Cost Calculator
Scientific Notation Calculator
Unit Converter
Fraction Calculator
Sources
1. IEC 60062: "Marking codes for resistors and capacitors" (accessed 14 Oct 2026). https://webstore.iec.ch/publication/23826
2. IEC 60063: "Preferred number series for resistors and capacitors" (accessed 14 Oct 2026). https://webstore.iec.ch/publication/24
3. OpenStax University Physics Vol. 2: "Resistors in series and parallel" (accessed 14 Oct 2026). https://openstax.org/books/university-physics-volume-2/pages/10-2-resistors-in-series-and-parallel
4. FigSumo methodology.
