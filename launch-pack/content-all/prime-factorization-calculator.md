---
url: /prime-factorization-calculator
title: "Prime Factorization Calculator with Factor Tree | FigSumo"
description: "Break a whole number into its prime factors, shown as a factor tree and in exponent form. Also tells you if the number is prime."
h1: "Prime Factorization Calculator"
country: global
status: keep
body_words: 603 (minimum 600)
verify_flags: 0
updated: 2026-10-15
source: FigSumo-All-Page-Content.docx
---

H1: Prime Factorization Calculator
Every whole number greater than 1 is either prime or can be written as a product of primes in exactly one way (apart from the order). This is the fundamental theorem of arithmetic. This calculator finds that product for any integer of 2 or more, as a list of prime factors and in exponent form.
How to use this calculator
1. Integer n (> 1): the number to factorise.
Results: prime factors (listed with repeats, smallest first) and factorization (exponent form, such as 2^3 × 3^2 × 5).
How it works: trial division
The calculator divides n by 2 as many times as possible, then 3, then 4 (which never divides by then), 5, and so on, recording each successful division. It stops once the divisor squared exceeds what's left; anything remaining above 1 is itself prime.
d = 2
while d × d ≤ n:
    while n mod d = 0: record d; n = n ÷ d
    d = d + 1
if n > 1: record n
Worked examples
Example 1: 360
Step
Divide
Remaining
1
360 ÷ 2
180
2
180 ÷ 2
90
3
90 ÷ 2
45
4
45 ÷ 3
15
5
15 ÷ 3
5
6
5 is prime
—
360 = 2 × 2 × 2 × 3 × 3 × 5 = 2³ × 3² × 5
Example 2: 97
No prime up to √97 ≈ 9.8 (2, 3, 5, 7) divides 97, so 97 is prime.
Example 3: 1,001
1,001 = 7 × 11 × 13. That's why multiplying a three-digit number by 1,001 repeats it (123 × 1,001 = 123,123).
Example 4: a factor tree
Split 84 into any two factors and keep splitting: 84 → 4 × 21 → (2 × 2) × (3 × 7). The leaves give 84 = 2² × 3 × 7, the same result whichever split you start with.
What prime factorisation tells you
Number of divisors: add 1 to each exponent and multiply. 360 has (3 + 1)(2 + 1)(1 + 1) = 24 divisors; see the factor calculator.
GCF and LCM: GCF uses the lowest power of each shared prime; LCM uses the highest power of every prime. See the GCF calculator and LCM calculator.
Perfect squares: every exponent is even. 324 = 2² × 3⁴, so √324 = 2 × 3² = 18.
Simplifying roots: √72 = √(2³ × 3²) = 6√2.
Primes to remember
The primes below 50: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47. Two is the only even prime. One isn't prime: allowing it would break the uniqueness of factorisations.
Why it matters beyond homework
Multiplying two large primes is easy, but factoring their product is extremely hard. RSA encryption relies on this: its public keys are products of two primes hundreds of digits long. This calculator is meant for everyday sizes; trial division becomes slow for numbers with very large prime factors.
Tips and common mistakes
Stopping at a composite factor (writing 360 = 2³ × 45). Keep going until every factor is prime.
Listing 1 as a prime factor.
Missing repeated factors (360 has three 2s).
Checking divisors beyond √n unnecessarily.
Frequently asked questions
What is the prime factorization of 360?
2³ × 3² × 5.
Is 1 a prime number?
No.
How do I know a number is prime?
If no prime up to its square root divides it. The calculator then returns the number itself.
Is the factorisation unique?
Yes, apart from order (fundamental theorem of arithmetic).
What's the difference between factors and prime factors?
Factors are all divisors; prime factors are the primes that multiply to give the number.
How big a number can I enter?
Up to about 9 quadrillion (2⁵³) for exact results.
Related calculators
Factor Calculator
GCF Calculator
LCM Calculator
Common Factor Calculator
Root Calculator
Big Number Calculator
Sources
1. NIST Dictionary of Algorithms and Data Structures: "Prime number" (accessed 14 Oct 2026). https://xlinux.nist.gov/dads/HTML/primeNumber.html
2. Khan Academy: "Prime factorization" (accessed 14 Oct 2026). https://www.khanacademy.org/math/pre-algebra/pre-algebra-factors-multiples/pre-algebra-prime-factorization-prealg/v/prime-factorization
3. FigSumo methodology.
