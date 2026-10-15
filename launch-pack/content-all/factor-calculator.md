---
url: /factor-calculator
title: "Factor Calculator: All Factors of a Number | FigSumo"
description: "List every factor and factor pair of a whole number, see whether it is prime, and get the prime factorization. Works for large integers too."
h1: "Factor Calculator"
country: global
status: keep
body_words: 621 (minimum 600)
verify_flags: 0
updated: 2026-10-15
source: FigSumo-All-Page-Content.docx
---

H1: Factor Calculator
A factor (or divisor) of a whole number divides it exactly, leaving no remainder. This calculator lists every positive factor of an integer in order and counts them.
How to use this calculator
1. Integer n: any non-zero whole number. For negative numbers, the calculator lists the positive factors of the absolute value (each also has a negative counterpart).
Results: factors (sorted) and count.
How it works
Factors come in pairs that multiply to n. The calculator tests every whole number d from 1 up to √n; whenever d divides n, both d and n ÷ d are factors. Stopping at the square root makes it fast: for a number near one million, only about 1,000 checks are needed.
for d = 1, 2, … while d × d ≤ n:
    if n mod d = 0: record d and n ÷ d
Worked examples
Example 1: 36
Pair
1 × 36
2 × 18
3 × 12
4 × 9
6 × 6
(the square root, counted once)
Factors: 1, 2, 3, 4, 6, 9, 12, 18, 36 (9 factors). A number has an odd number of factors only when it's a perfect square.
Example 2: 97
The only factors are 1, 97, so 97 is prime.
Example 3: 360
24 factors: 1, 2, 3, 4, 5, 6, 8, 9, 10, 12, 15, 18, 20, 24, 30, 36, 40, 45, 60, 72, 90, 120, 180, 360.
360 = 2³ × 3² × 5, and the number of factors is (3 + 1)(2 + 1)(1 + 1) = 24. Ancient astronomers chose 360 degrees in a circle partly because it divides so many ways.
Counting factors from the prime factorisation
If n = p₁^a × p₂^b × p₃^c …, then the number of factors is (a + 1)(b + 1)(c + 1)…. For 100 = 2² × 5², that's 3 × 3 = 9: 1, 2, 4, 5, 10, 20, 25, 50, 100. See the prime factorization calculator.
Types of numbers defined by factors
Prime: exactly two factors (1 and itself): 2, 3, 5, 7, 11, …
Composite: more than two factors.
1: has only one factor and is neither prime nor composite.
Perfect number: equals the sum of its factors other than itself. 28: 1 + 2 + 4 + 7 + 14 = 28.
Perfect square: has an odd number of factors.
Why factors are useful
Simplifying fractions and ratios (divide by a common factor; see the GCF calculator).
Arranging items in equal rows: 36 chairs can be set out as 1×36, 2×18, 3×12, 4×9 or 6×6.
Finding common denominators with the LCM calculator.
Number puzzles and divisibility rules.
Quick divisibility rules
2: last digit even.
3: digit sum divisible by 3.
4: last two digits divisible by 4.
5: last digit 0 or 5.
9: digit sum divisible by 9.
10: last digit 0.
Tips and common mistakes
Forgetting 1 and the number itself.
Counting the square root twice for perfect squares.
Confusing factors with multiples. Factors of 12 are 1, 2, 3, 4, 6, 12; multiples are 12, 24, 36, ….
Entering decimals. Factors are defined for integers.
Frequently asked questions
What are the factors of 36?
1, 2, 3, 4, 6, 9, 12, 18 and 36.
How do I know if a number is prime?
If its only factors are 1 and itself; the calculator will show exactly two factors.
Can factors be negative?
Yes; every positive factor d also gives −d. The calculator lists positive factors.
What number has the most factors under 1,000?
840, with 32 factors.
Is 0 allowed?
No; every non-zero integer divides 0, so it has infinitely many factors.
How is this different from prime factorisation?
Prime factorisation writes n as a product of primes; this lists every divisor.
Related calculators
Prime Factorization Calculator
GCF Calculator
Common Factor Calculator
LCM Calculator
Fraction Calculator
Root Calculator
Sources
1. NIST Dictionary of Algorithms and Data Structures: "Divisor" (accessed 14 Oct 2026). https://xlinux.nist.gov/dads/HTML/divisor.html
2. Khan Academy: "Factors and multiples" (accessed 14 Oct 2026). https://www.khanacademy.org/math/cc-fourth-grade-math/imp-factors-multiples-and-patterns
3. FigSumo methodology.
