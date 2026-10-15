---
url: /gcf-calculator
title: "Greatest Common Factor (GCF) Calculator | FigSumo"
description: "Find the greatest common factor of two or more numbers using prime factorization and the Euclidean algorithm, with every step shown."
h1: "GCF Calculator"
country: global
status: rename (301)
body_words: 642 (minimum 600)
verify_flags: 0
updated: 2026-10-15
source: FigSumo-All-Page-Content.docx
---

H1: GCF Calculator
The greatest common factor (GCF) of two integers is the largest whole number that divides both without a remainder. It's also called the greatest common divisor (GCD) or highest common factor (HCF). Enter two integers and the calculator returns their GCF.
How to use this calculator
1. First integer.
2. Second integer.
Result: GCF (GCD). Negative inputs are treated by their absolute value. If one number is 0, the GCF is the other number.
Method 1: the Euclidean algorithm (what the calculator uses)
Replace the larger number with the remainder of dividing it by the smaller, and repeat until the remainder is 0. The last non-zero remainder is the GCF.
Example 1: gcd(48, 18)
Step
Division
Remainder
1
48 ÷ 18 = 2
12
2
18 ÷ 12 = 1
6
3
12 ÷ 6 = 2
0
GCF = 6.
Example 2: gcd(1071, 462)
1071 = 2 × 462 + 147
462 = 3 × 147 + 21
147 = 7 × 21 + 0
GCF = 21
The algorithm is over 2,000 years old (it appears in Euclid's Elements) and is still how computers find the GCD, because it needs only a handful of steps even for huge numbers.
Method 2: prime factorisation
Write both numbers as products of primes and multiply the shared primes, each to the lower power.
48 = 2⁴ × 3
18 = 2 × 3²
Shared: 2¹ × 3¹ = 6
Method 3: listing factors
Factors of 48: 1, 2, 3, 4, 6, 8, 12, 16, 24, 48
Factors of 18: 1, 2, 3, 6, 9, 18
Largest in both: 6
Listing works for small numbers; Euclid is better for large ones. To see all common factors, use the common factor calculator.
GCF and LCM
For two positive integers:
GCF(a, b) × LCM(a, b) = a × b
So LCM(48, 18) = 48 × 18 ÷ 6 = 144. See the LCM calculator.
Uses of the GCF
Reducing fractions: 18/48 ÷ 6 = 3/8.
Simplifying ratios: 48:18 = 8:3.
Dividing into equal groups: 48 red and 18 blue beads make at most 6 identical bracelets (8 red and 3 blue each).
Cutting material: the largest square tiles that exactly cover a 48 × 18 rectangle are 6 × 6.
Cryptography: RSA key generation checks that numbers are coprime (GCD = 1).
Understanding your results
GCF = 1: the numbers are coprime.
GCF = the smaller number: it divides the larger one exactly.
The GCF is never larger than the smaller input (unless one input is 0).
Tips and common mistakes
Mixing up GCF and LCM.
Stopping Euclid one step early. The GCF is the last non-zero remainder.
Using the higher power of shared primes (that gives the LCM).
Notes for US, Canada and UK readers
The same idea goes by several names: greatest common factor (GCF) is most common in US schools, greatest common divisor (GCD) in university maths and programming, and highest common factor (HCF) in the UK and some Canadian textbooks. All give the same answer.
Practice problems
1. GCF(48, 180) = 12. Check: 48 = 12 × 4 and 180 = 12 × 15, and 4 and 15 share no factor.
2. GCF(84, 126) = 42.
3. GCF(17, 51) = 17, because 17 is prime and divides 51.
Frequently asked questions
What is the GCF of 48 and 18?
6.
What's the difference between GCF, GCD and HCF?
Nothing; they're different names for the same thing.
What is the GCF of two prime numbers?
1, if they're different primes.
What's the GCF of a number and 0?
The number itself.
Can I find the GCF of three numbers?
Find the GCF of two, then of that result and the third. The common factor calculator accepts a list.
Why does the Euclidean algorithm work?
Any number dividing both a and b also divides a − b, and so the remainder; the common divisors never change as the numbers shrink.
Related calculators
LCM Calculator
Common Factor Calculator
Factor Calculator
Prime Factorization Calculator
Fraction Calculator
Ratio Calculator
Sources
1. NIST Dictionary of Algorithms and Data Structures: "Euclid's algorithm" (accessed 14 Oct 2026). https://xlinux.nist.gov/dads/HTML/euclidalgo.html
2. Khan Academy: "The Euclidean algorithm" (accessed 14 Oct 2026). https://www.khanacademy.org/computing/computer-science/cryptography/modarithmetic/a/the-euclidean-algorithm
3. FigSumo methodology.
