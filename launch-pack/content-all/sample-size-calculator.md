---
url: /sample-size-calculator
title: "Sample Size Calculator for Surveys | FigSumo"
description: "Work out how many responses a survey needs for a chosen confidence level and margin of error, with finite population correction."
h1: "Sample Size Calculator"
country: global
status: keep
body_words: 639 (minimum 600)
verify_flags: 0
updated: 2026-10-15
source: FigSumo-All-Page-Content.docx
---

H1: Sample Size Calculator
Before running a survey or poll, you need to know how many responses are enough. This calculator works out the minimum sample size to estimate a proportion (such as the percentage of customers who'd recommend you) within a chosen margin of error at a chosen confidence level.
How to use this calculator
1. Margin of error (±%): how close you want the estimate to be to the true value (default 5).
2. Estimated proportion p (0–1): your best guess at the answer. If you don't know, use 0.5: it gives the largest, safest sample.
3. Confidence level: 90%, 95% or 99%. Note that the calculator currently opens on 90%; choose 95% for the usual standard.
Results: required sample size (rounded up) and the z critical value used.
The formula
n = z² × p × (1 − p) ÷ E²
z: critical value for the confidence level (1.6449 for 90%, 1.9600 for 95%, 2.5758 for 99%)
p: expected proportion
E: margin of error as a decimal (5% = 0.05)
The result is rounded up to a whole respondent.
Worked examples
Example 1: the classic 95% / ±5% survey
n = 1.96² × 0.5 × 0.5 ÷ 0.05² = 384.15 → 385 respondents
Example 2: other settings (p = 0.5)
Confidence
Margin
Sample size
90%
±5%
271
95%
±5%
385
99%
±5%
664
95%
±3%
1,068
Halving the margin roughly quadruples the sample, which is why national polls of about 1,000 people report margins near ±3%.
Example 3: a less uncertain proportion
If past data suggest about 20% will say yes (p = 0.2), the 95% / ±5% sample drops to 246.
Example 4: a small population
For a company of 2,000 employees, apply the finite population correction n ÷ (1 + (n − 1) ÷ N): 323 responses are enough. The calculator doesn't yet do this step, so its result is conservative for small groups.
Example 5: margin from a sample you already have
Rearranging, E = z × √(p(1 − p) ÷ n). With 1,000 responses at 95% and p = 0.5, the margin is ±3.1%.
Understanding your results
Confidence level: at 95%, if you repeated the survey many times, about 95% of the intervals would contain the true value.
The sample size is for completed responses. If you expect a 20% response rate, invite five times as many people.
Subgroups need their own sample sizes: 385 total gives only about 77 in a 20% subgroup, with a much wider margin.
Random selection matters more than size. A large biased sample (for example, only people who opt in online) can be badly wrong.
Tips and common mistakes
Leaving the confidence at 90% when your report will claim 95%.
Using a percentage for p (enter 0.5, not 50).
Ignoring non-response bias.
Applying this to averages. For a mean, use n = (z × σ ÷ E)², with σ the expected standard deviation.
Notes for US, Canada and UK readers
Most national opinion polls in the US, Canada and the UK interview roughly 1,000 to 2,000 adults, which gives a margin of error of about ±2 to ±3 points at 95% confidence. Larger national surveys run by statistics agencies use far bigger samples, so that results can be broken down by region.
Frequently asked questions
What sample size do I need for a 95% confidence, 5% margin survey?
385 for a large population.
Why use p = 0.5?
p(1 − p) is largest at 0.5, giving the most conservative sample size.
Does population size matter?
Only when the sample is a sizeable fraction (over about 5%) of the population.
What z-score is used for 95% confidence?
1.96.
How do I reduce the sample size I need?
Accept a wider margin or lower confidence.
Is a bigger sample always better?
It narrows the margin, but with diminishing returns and no protection against bias.
Related calculators
Confidence Interval Calculator
Standard Deviation Calculator
Z-Score Calculator
P-Value Calculator
Statistics Calculator
Random Number Generator
Sources
1. NIST/SEMATECH e-Handbook of Statistical Methods: "Sample sizes required" (accessed 14 Oct 2026). https://www.itl.nist.gov/div898/handbook/prc/section2/prc222.htm
2. Pew Research Center: "Margin of error" explainer (accessed 14 Oct 2026). https://www.pewresearch.org/short-reads/2016/09/08/understanding-the-margin-of-error-in-election-polls/
3. FigSumo methodology.
