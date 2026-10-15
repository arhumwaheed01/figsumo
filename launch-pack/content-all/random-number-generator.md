---
url: /random-number-generator
title: "Random Number Generator: Range, Count, No Repeats | FigSumo"
description: "Generate random integers or decimals within a range, choose how many, and allow or block duplicates. Uses the browser's secure random source."
h1: "Random Number Generator"
country: global
status: keep
body_words: 623 (minimum 600)
verify_flags: 0
updated: 2026-10-15
source: FigSumo-All-Page-Content.docx
---

H1: Random Number Generator
This tool picks random whole numbers between a minimum and maximum you choose. Use it for raffles, classroom picks, games, sampling or anything that needs an impartial choice. You can generate up to 500 numbers at once.
How to use this generator
1. Minimum (integer): the smallest number that can appear (default 1).
2. Maximum (integer): the largest number that can appear (default 100). It can't be less than the minimum.
3. How many numbers: from 1 to 500 (default 5).
4. Press Calculate. Each press gives a fresh set.
Negative numbers work: a range of −10 to 10 gives 21 possible values.
Repeats are possible. Each number is drawn independently, so the same value can appear more than once in a set, as with rolling dice. For a raffle where each ticket may win only once, discard repeats and draw again, or use a range only slightly larger than you need.
How it works
Each number is calculated as:
value = floor(random × (max − min + 1)) + min
where random is a uniformly distributed value from 0 up to (but not including) 1, supplied by your browser's built-in pseudo-random generator. Multiplying by the size of the range and rounding down maps it evenly onto the whole numbers from min to max, so each has an equal 1 ÷ (max − min + 1) chance.
Worked examples
Example 1: a classroom pick
Thirty students are numbered 1–30. Set min 1, max 30, count 1. Each student has a 1 in 30 (about 3.3%) chance.
Example 2: how often do repeats happen?
Drawing 5 numbers from 1–100 with repeats allowed, the chance that at least two match is 1 − (100 × 99 × 98 × 97 × 96) ÷ 100⁵ = 0.0965 (about 1 in 10). Repeats become likely faster than people expect, the same effect behind the birthday problem.
Example 3: simulating dice
Min 1, max 6, count 10 simulates ten rolls of a die. For multiple dice with totals, use the dice roller.
Example 4: expected average
Over many draws from 1 to 100, the average settles near (1 + 100) ÷ 2 = 50.5.
Is it truly random?
Computers generate pseudo-random numbers: long sequences produced by an algorithm that pass statistical tests for randomness. They're fine for games, picks and simulations. They aren't suitable for:
Passwords, keys or security tokens: use the password generator, which needs a cryptographic source.
Regulated lotteries and prize draws: these often require certified generators or witnessed physical draws; check your local rules [VERIFY for your jurisdiction].
Uses for random numbers
Random sampling: number your population and pick IDs to survey. See the sample size calculator for how many to pick.
Assigning groups in experiments to avoid selection bias.
Games and decisions: who goes first, which question to answer.
Shuffling: generate positions, though a proper shuffle draws without replacement.
Tips and common mistakes
Forgetting the range is inclusive. 1–10 includes both 1 and 10.
Assuming no repeats. Check the list if uniqueness matters.
Expecting "random-looking" patterns. Runs like 7, 7, 8 are normal in random data.
Entering decimals in the range: the tool needs integers.
Frequently asked questions
Can the same number appear twice?
Yes. Each draw is independent.
Are the minimum and maximum included?
Yes, both can be drawn.
How many numbers can I generate?
Up to 500 per press.
Can I use negative numbers?
Yes, as long as the minimum isn't above the maximum.
Is this random enough for a raffle?
For informal raffles, yes. Formal or regulated draws may need a certified method.
Can I generate decimals?
Not yet. Generate integers and divide (for example, 1–1000 ÷ 100 gives two-decimal values from 0.01 to 10).
Related calculators
Dice Roller
Probability Calculator
Password Generator
Permutation and Combination Calculator
Statistics Calculator
Sample Size Calculator
Sources
1. NIST: "Random Bit Generation" project (accessed 14 Oct 2026). https://csrc.nist.gov/projects/random-bit-generation
2. MDN Web Docs: "Math.random()" (accessed 14 Oct 2026). https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
3. FigSumo methodology.
