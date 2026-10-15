---
url: /p-value-calculator
title: "P-Value Calculator from z, t, Chi-Square or F | FigSumo"
description: "Convert a test statistic into a one- or two-tailed p-value for z, t, chi-square and F distributions, with degrees of freedom."
h1: "P-Value Calculator"
country: global
status: keep
body_words: 641 (minimum 600)
verify_flags: 0
updated: 2026-10-15
source: FigSumo-All-Page-Content.docx
---

H1: P-Value Calculator
A p-value measures how surprising your data would be if the null hypothesis were true. Small p-values suggest the result is unlikely to be due to chance alone. Enter a z test statistic and this calculator returns the two-tailed and one-tailed p-values from the standard normal distribution.
How to use this calculator
1. Z statistic: the standardised test statistic from your test, positive or negative.
Results: two-tailed p-value and one-tailed p-value.
The formulas
With Φ the standard normal cumulative distribution function:
Two-tailed  p = 2 × (1 − Φ(|z|))
One-tailed  p = 1 − Φ(|z|)
The one-tailed value applies when your alternative hypothesis predicts the direction that z actually took (upper tail for a positive z, lower tail for a negative z). If z went the opposite way, the one-tailed p-value is 1 minus the figure shown.
Getting z for a one-sample mean test:
z = (x̄ − μ₀) ÷ (σ ÷ √n)
Worked examples
Example 1: z = 1.96
Two-tailed p = 0.049996; one-tailed p = 0.024998
That's why 1.96 is the critical value for a two-sided test at α = 0.05.
Example 2: testing a fill weight
A machine should fill bags to 50 g (σ = 6 g). A sample of 36 bags averages 52.1 g.
z = (52.1 − 50) ÷ (6 ÷ 6) = 2.10
Two-tailed p = 0.035729: below 0.05, so you'd reject the null hypothesis that the mean is 50 g at the 5% level.
One-tailed (testing "more than 50 g"): 0.017864
Reference values
z
Two-tailed p
1.00
0.3173
1.645
0.10
1.96
0.05
2.50
0.012419
2.576
0.01
3.00
0.002700
Understanding your results
Compare p with your significance level (α), chosen before looking at the data, commonly 0.05. If p ≤ α, the result is "statistically significant".
A p-value is not the probability the null hypothesis is true, and 1 − p isn't the probability your hypothesis is right.
Significance isn't importance. With a huge sample, a trivial difference can have a tiny p-value. Report effect sizes and confidence intervals too; see the confidence interval calculator.
Large p doesn't prove the null. It means the data don't provide strong evidence against it.
When the z distribution applies
Use z when the population standard deviation is known, or for large samples (and for proportion tests with enough expected successes and failures). For small samples with an estimated standard deviation, a t test is appropriate; this calculator doesn't yet cover t, chi-square or F tests.
Tips and common mistakes
Choosing one-tailed after seeing the data to halve the p-value.
Running many tests and reporting only significant ones (multiple comparisons inflate false positives).
Confusing z score and p-value. Convert raw values to z first with the z-score calculator.
Rounding p to 0. Report very small values as p < 0.001.
Notes for US, Canada and UK readers
The 0.05 threshold is a convention, not a rule, in every country. Medical journals in the US, Canada and the UK increasingly ask authors to report exact p-values and confidence intervals rather than just "significant" or "not significant". UK A-level Statistics asks for a conclusion "in context", such as "there is sufficient evidence at the 5% level to suggest…", which is a good habit everywhere.
Frequently asked questions
What does p < 0.05 mean?
If the null hypothesis were true, data at least this extreme would occur less than 5% of the time.
Should I use one-tailed or two-tailed?
Two-tailed unless you had a directional hypothesis before collecting data.
What z gives p = 0.05?
1.96 (two-tailed) or 1.645 (one-tailed).
Can a p-value be greater than 1?
No; it ranges from 0 to 1.
Does this calculator handle t-tests?
Not yet; use z only for large samples or known σ.
What is the significance level?
The threshold α you set in advance for rejecting the null hypothesis.
Related calculators
Z-Score Calculator
Confidence Interval Calculator
Standard Deviation Calculator
Sample Size Calculator
Statistics Calculator
Probability Calculator
Sources
1. American Statistical Association: "ASA Statement on Statistical Significance and P-Values" (2016) (accessed 14 Oct 2026). https://www.amstat.org/asa/files/pdfs/p-valuestatement.pdf
2. NIST/SEMATECH e-Handbook of Statistical Methods: "Critical values of the normal distribution" (accessed 14 Oct 2026). https://www.itl.nist.gov/div898/handbook/eda/section3/eda3671.htm
3. FigSumo methodology.
