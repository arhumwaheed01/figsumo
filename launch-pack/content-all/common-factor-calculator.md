---
url: /common-factor-calculator
title: "Common Factor Calculator | FigSumo"
description: "List all factors shared by two or more whole numbers and highlight the greatest one. Shows each number's full factor list."
h1: "Common Factor Calculator"
country: global
status: keep
body_words: 607 (minimum 600)
verify_flags: 0
updated: 2026-10-15
source: FigSumo-All-Page-Content.docx
---

H1: Common Factor Calculator
A common factor is a whole number that divides two or more numbers with no remainder. The largest one is the greatest common factor (GCF), also called the greatest common divisor (GCD) or highest common factor (HCF). Enter a list of integers and the calculator returns their greatest common factor. Every other common factor is a divisor of the GCF, so you can list them all from that one result.
How to use this calculator
1. Integers (comma-separated): two or more whole numbers, such as 24, 36, 60. Negative numbers are treated by their size.
Result: greatest common factor.
How it works
The calculator uses the Euclidean algorithm, which is fast even for large numbers:
gcd(a, b) = gcd(b, a mod b), repeated until the remainder is 0
gcd(a, b, c) = gcd(gcd(a, b), c)
For 36 and 24: 36 mod 24 = 12; 24 mod 12 = 0, so gcd = 12. Then gcd(12, 60) = 12.
All common factors = all divisors of the GCF.
Worked examples
Example 1: 24, 36 and 60
Factors of 24: 1, 2, 3, 4, 6, 8, 12, 24
Factors of 36: 1, 2, 3, 4, 6, 9, 12, 18, 36
Factors of 60: 1, 2, 3, 4, 5, 6, 10, 12, 15, 20, 30, 60
Greatest common factor: 12
All common factors (the divisors of 12): 1, 2, 3, 4, 6, 12
Example 2: 84 and 126
Euclid: 126 mod 84 = 42; 84 mod 42 = 0 → GCF = 42
Common factors: 1, 2, 3, 6, 7, 14, 21, 42 (8 in total)
Example 3: 35 and 48
GCF = 1. The numbers share no factor other than 1, so they're coprime (relatively prime), even though neither is prime.
Using prime factorisation
Write each number as a product of primes and multiply the primes they share, using the lowest power of each:
24 = 2³ × 3
36 = 2² × 3²
60 = 2² × 3 × 5
Shared: 2² × 3 = 12
See the prime factorization calculator.
Why common factors matter
Simplifying fractions: divide top and bottom by the GCF. 36/60 ÷ 12 = 3/5. See the fraction calculator.
Simplifying ratios: 24:36 becomes 2:3.
Equal grouping: 24 apples and 36 oranges can be split into at most 12 identical bags (2 apples and 3 oranges each).
Tiling: the largest square tile that exactly fits a 84 cm × 126 cm area without cutting is 42 cm.
Understanding your results
GCF of 1 means the numbers are coprime.
The GCF can't exceed the smallest number in the list.
Zero: gcd(a, 0) = a, because every number divides 0.
Related: the least common multiple (LCM) satisfies GCF × LCM = a × b for two numbers; see the LCM calculator.
Tips and common mistakes
Confusing GCF with LCM. The GCF is at most the smallest number; the LCM is at least the largest.
Missing factor pairs when listing by hand. Check up to the square root and record both numbers in each pair.
Using decimals. Factors are defined for whole numbers.
Frequently asked questions
What is a common factor?
A number that divides each number in the set exactly.
How do I find all common factors?
Find the GCF, then list all of its divisors.
What is the GCF of 24 and 36?
12.
What does coprime mean?
Two numbers whose only common factor is 1.
Is 1 always a common factor?
Yes, 1 divides every integer.
How is this different from the GCF calculator?
Both return the greatest common factor; this page also explains how to list every common factor from it.
Related calculators
GCF Calculator
LCM Calculator
Factor Calculator
Prime Factorization Calculator
Fraction Calculator
Ratio Calculator
Sources
1. NIST Dictionary of Algorithms and Data Structures: "Euclid's algorithm" (accessed 14 Oct 2026). https://xlinux.nist.gov/dads/HTML/euclidalgo.html
2. Khan Academy: "Greatest common factor review" (accessed 14 Oct 2026). https://www.khanacademy.org/math/cc-sixth-grade-math/cc-6th-factors-and-multiples/cc-6th-gcf/a/greatest-common-factor-review
3. FigSumo methodology.
