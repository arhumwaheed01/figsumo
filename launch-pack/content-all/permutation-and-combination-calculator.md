---
url: /permutation-and-combination-calculator
title: "Permutation and Combination Calculator (nPr, nCr) | FigSumo"
description: "Calculate permutations and combinations with or without repetition, and see which one your problem needs with plain-language examples."
h1: "Permutation and Combination Calculator"
country: global
status: keep
body_words: 701 (minimum 600)
verify_flags: 1
updated: 2026-10-15
source: FigSumo-All-Page-Content.docx
---

H1: Permutation and Combination Calculator
Permutations and combinations count the ways to choose items from a set. The difference is whether order matters: a permutation counts different orders separately; a combination doesn't. Enter the total number of items (n) and the number chosen (r) to get both.
How to use this calculator
1. n (total items): how many distinct items you choose from.
2. r (chosen items): how many you pick, from 0 to n.
Results: permutations nPr and combinations nCr (no item used more than once).
The formulas
nPr = n! ÷ (n − r)!
nCr = n! ÷ (r! × (n − r)!) = nPr ÷ r!
n! (n factorial) = n × (n − 1) × … × 1, with 0! = 1. For example, 10! = 3,628,800.
With repetition allowed (not yet in the calculator):
Ordered: nʳ
Unordered: (n + r − 1)Cr
Worked examples
Example 1: n = 10, r = 3
nPr = 10 × 9 × 8 = 720
nCr = 720 ÷ 3! = 720 ÷ 6 = 120
Each group of 3 can be arranged in 6 orders, which is why permutations are 6 times the combinations here.
Example 2: race podium (order matters)
Eight runners; how many ways can gold, silver and bronze be awarded? 8P3 = 336.
Example 3: choosing a team (order doesn't matter)
Pick 5 players from 12: 12C5 = 792.
Example 4: lotteries
A 6-from-49 lottery has 49C6 = 13,983,816 possible tickets, so one ticket's chance of the jackpot is about 0.0000072%.
Powerball draws 5 of 69 white balls and 1 of 26 red: 69C5 × 26 = 292,201,338 combinations.
Example 5: poker hands
There are 52C5 = 2,598,960 different five-card hands.
Repetition examples
A 4-digit PIN (digits can repeat, order matters): 10⁴ = 10,000.
3 scoops from 10 ice-cream flavours, repeats allowed, order irrelevant: (10 + 3 − 1)C3 = 220.
Which do I need?
Question
Use
Does swapping the order give a different outcome? (rankings, passwords, seating)
Permutation
Is it just which items are chosen? (committees, hands of cards, lottery numbers)
Combination
Can the same item be picked more than once?
Repetition formulas
Understanding your results
nCr = nC(n − r): choosing 3 to include is the same as choosing 7 to leave out (10C3 = 10C7 = 120).
nC0 = nCn = 1; nP0 = 1.
Very large results may be shown rounded because standard numbers hold about 15 significant digits; for exact large values, use the big number calculator.
Probability: divide favourable outcomes by total outcomes; see the probability calculator.
Tips and common mistakes
Using permutations for committees or lottery tickets.
Forgetting that r can't exceed n without repetition.
Ignoring identical items. Arrangements of letters in "BOOK" are 4! ÷ 2! = 12, because the two Os are interchangeable.
Notes for US, Canada and UK readers
The maths is identical everywhere, but the notation varies. US textbooks usually write P(n, r) and C(n, r); UK A-level papers more often use ⁿPᵣ and ⁿCᵣ or the bracket form (n r) read as "n choose r". Canadian provincial courses use both.
Lottery odds are a common real-world check:
Game
Rule
Combinations
UK National Lottery Lotto
6 from 59
45,057,474
EuroMillions (UK)
5 from 50, plus 2 from 12
139,838,160
Lotto Max (Canada)
7 from 50
99,884,400
Each figure is the number of equally likely tickets, so the jackpot chance for one ticket is 1 in that number. Game rules change from time to time, so check the operator's current rules before quoting odds [VERIFY].
Practice problems
1. A club of 12 elects a president, secretary and treasurer. Order matters: 12P3 = 1,320.
2. The same club picks a 3-person committee. Order doesn't matter: 12C3 = 220.
3. How many ways can 8 runners finish a race? 8! = 40,320.
4. A pizza shop offers 9 toppings and you choose 4 different ones: 9C4 = 126.
Check each answer by entering n and r above: the permutation result divided by r! always equals the combination result.
Frequently asked questions
What's the difference between a permutation and a combination?
Order matters for permutations, not for combinations.
What is 10C3?
120.
What is 0!?
1, by definition.
How many combinations does a 6/49 lottery have?
13,983,816.
Can r be larger than n?
Not without repetition.
How do I count with repetition?
Ordered: nʳ. Unordered: (n + r − 1)Cr.
Related calculators
Probability Calculator
Factor Calculator
Big Number Calculator
Dice Roller
Random Number Generator
Statistics Calculator
Sources
1. NIST Digital Library of Mathematical Functions: "Binomial coefficients" (accessed 14 Oct 2026). https://dlmf.nist.gov/26.3
2. Khan Academy: "Permutations and combinations" (accessed 14 Oct 2026). https://www.khanacademy.org/math/statistics-probability/counting-permutations-and-combinations
3. FigSumo methodology.
