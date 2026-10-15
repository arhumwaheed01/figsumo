---
url: /probability-calculator
title: "Probability Calculator: Two Events, Series & Normal | FigSumo"
description: "Find probabilities of A and B, A or B, not A, a series of repeated trials and normal-distribution ranges, with each formula shown."
h1: "Probability Calculator"
country: global
status: keep
body_words: 677 (minimum 600)
verify_flags: 0
updated: 2026-10-15
source: FigSumo-All-Page-Content.docx
---

H1: Probability Calculator
Probability measures how likely an event is, on a scale from 0 (impossible) to 1 (certain). This calculator covers three common cases: the binomial probability of exactly k successes in n trials, the chance that two independent events both happen, and the chance that one of two mutually exclusive events happens.
How to use this calculator
1. Mode:
Binomial: P(X = k) — uses n trials, k successes and the success probability p.
Independent: P(A and B) = p₁ × p₂ — uses p and p₂.
Mutually exclusive: P(A or B) = p₁ + p₂ — uses p and p₂.
2. Enter probabilities as decimals between 0 and 1 (25% = 0.25).
Result: the probability, to eight decimal places.
The formulas
Binomial (fixed number of independent trials, each with the same success probability):
P(X = k) = nCk × pᵏ × (1 − p)ⁿ⁻ᵏ
Independent events, both happen: P(A and B) = P(A) × P(B)
Mutually exclusive events (can't both happen), either happens: P(A or B) = P(A) + P(B)
Other rules you'll need:
Complement: P(not A) = 1 − P(A)
General "or": P(A or B) = P(A) + P(B) − P(A and B)
At least one success in n trials: 1 − (1 − p)ⁿ
Worked examples
Example 1: exactly 3 heads in 10 coin flips
10C3 × 0.5³ × 0.5⁷ = 120 ÷ 1,024 = 0.1171875
Example 2: exactly two sixes in five dice rolls
5C2 × (1/6)² × (5/6)³ = 0.16075103 (about 16%)
Example 3: independent events
The chance of rain tomorrow is 0.5 and your train being late is 0.4, independently. Both: 0.5 × 0.4 = 0.2. Either (general rule): 0.5 + 0.4 − 0.2 = 0.70.
Example 4: mutually exclusive events
Drawing one card, P(king) = 4/52 and P(queen) = 4/52. P(king or queen) = 8/52 ≈ 0.1538.
Example 5: at least one six in four rolls
1 − (5/6)⁴ = 0.517747: slightly better than even, the basis of a famous 17th-century gambling problem.
Example 6: 8 or more heads in 10 flips
Add P(8) + P(9) + P(10) = 0.05468750. The calculator gives each term; add them for "at least" questions.
Understanding your results
Independent ≠ mutually exclusive. Mutually exclusive events can't happen together, so they're dependent: knowing one happened tells you the other didn't.
"Or" sums can't exceed 1. If p₁ + p₂ > 1, the events can't be mutually exclusive; use the general rule.
Binomial assumptions: fixed n, independent trials, constant p, two outcomes. Drawing cards without replacement breaks independence (use the hypergeometric distribution).
Converting: multiply by 100 for a percentage; odds of a to b correspond to a probability of a ÷ (a + b).
Tips and common mistakes
Gambler's fallacy: past coin flips don't change the next flip's 0.5 chance.
Adding probabilities of independent events to get "both".
Forgetting the nCk term in binomial calculations.
Entering percentages as whole numbers (use 0.3, not 30).
Notes for US, Canada and UK readers
UK GCSE questions often ask for probabilities as fractions, such as 1/6 or 25/216, and tree diagrams are a standard method there. US and Canadian courses use decimals and percentages more often. The calculator gives decimals; for a fraction, multiply by the denominator you expect and check it's a whole number. For instance, 0.1157 × 216 ≈ 25, so the chance of exactly one six in three rolls is 25/216 (0.3472).
"Odds" and "probability" are not the same. A probability of 0.2 equals odds of 1 to 4 (one success for every four failures). UK bookmakers usually quote fractional odds such as 4/1, and US sportsbooks quote moneyline odds such as +400; both mean the same 20% implied probability.
Frequently asked questions
What is the probability of 3 heads in 10 flips?
About 0.117 (11.7%).
How do I find the probability of both events?
Multiply, if they're independent.
How do I find the probability of either event?
Add and subtract the overlap: P(A) + P(B) − P(A and B).
What does mutually exclusive mean?
The events can't happen at the same time.
What is a binomial distribution?
The distribution of the number of successes in n independent yes/no trials with the same p.
How do I calculate "at least one"?
1 minus the probability of none.
Related calculators
Permutation and Combination Calculator
Dice Roller
Random Number Generator
P-Value Calculator
Z-Score Calculator
Statistics Calculator
Sources
1. NIST/SEMATECH e-Handbook of Statistical Methods: "Binomial distribution" (accessed 14 Oct 2026). https://www.itl.nist.gov/div898/handbook/eda/section3/eda366i.htm
2. Khan Academy: "Probability" (accessed 14 Oct 2026). https://www.khanacademy.org/math/statistics-probability/probability-library
3. FigSumo methodology.
