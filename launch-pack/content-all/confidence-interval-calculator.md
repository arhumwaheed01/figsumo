---
url: /confidence-interval-calculator
title: "Confidence Interval Calculator for a Mean or Proportion | FigSumo"
description: "Calculate a confidence interval from sample mean, standard deviation and size, or from a proportion, at 90%, 95%, 99% or a custom level."
h1: "Confidence Interval Calculator"
country: global
status: keep
body_words: 664 (minimum 600)
verify_flags: 0
updated: 2026-10-15
source: FigSumo-All-Page-Content.docx
---

H1: Confidence Interval Calculator
A confidence interval gives a range of plausible values for a population mean, based on a sample. Instead of reporting only the sample average, it shows how precise that estimate is. Enter the sample mean, standard deviation, sample size and confidence level, and this calculator returns the interval, the margin of error and the critical value used.
How to use this calculator
1. Sample mean (x̄): the average of your sample.
2. Sample std. dev. (s): the standard deviation of your sample. The standard deviation calculator can work it out from raw data.
3. Sample size (n): the number of observations.
4. Confidence level: 90%, 95% or 99%.
Results: confidence interval (lower to upper), margin of error (±) and z critical value.
The formula
Standard error  SE = s ÷ √n
Margin of error ME = z* × SE
Interval        x̄ − ME  to  x̄ + ME
Critical values (z*) used:
Confidence
z*
90%
1.6449
95%
1.9600
99%
2.5758
The calculator uses the normal (z) distribution. That's appropriate for large samples or when the population standard deviation is known. For small samples with an estimated SD, a t critical value is more accurate (see below).
Worked examples
Example 1: mean 50, SD 10, n = 30
SE = 10 ÷ √30 = 1.8257
90%: ME = 1.6449 × 1.8257 = 3.0031 → 46.9969 to 53.0031
95%: ME = 3.5784 → 46.4216 to 53.5784
99%: ME = 4.7028 → 45.2972 to 54.7028
Higher confidence means a wider interval.
Example 2: a quality check
A sample of 100 parts has a mean length of 4.8 cm and an SD of 1.2 cm. At 95%:
SE = 1.2 ÷ 10 = 0.12; ME = 1.96 × 0.12 = 0.235
Interval: 4.565 to 5.035 cm
Small samples: z vs t
With n = 30, the t critical value for 95% (29 degrees of freedom) is about 2.045 instead of 1.96, giving a margin of 3.7336 rather than 3.5784. The difference shrinks as n grows; below about 30 observations, use a t-based interval from statistics software or tables.
Understanding your results
Interpretation: if you repeated the sampling many times, about 95% of the 95% intervals built this way would contain the true population mean. It doesn't mean there's a 95% probability the true mean lies in this particular interval.
Margin of error halves when the sample size quadruples, because SE depends on √n.
Assumptions: a random sample, independent observations, and a roughly normal sampling distribution (true for large n by the central limit theorem).
Bias isn't fixed by a bigger sample. A poorly chosen sample gives a precise but wrong interval.
Confidence intervals for proportions
Polls report a margin of error for a percentage. For a proportion p̂ from n responses: ME = z* × √(p̂(1 − p̂) ÷ n). A poll of 1,000 people with 54% support has a 95% margin of about ±3.1%. This calculator handles means; use the formula above for proportions, or plan a survey with the sample size calculator.
Tips and common mistakes
Using the population SD formula on sample data; use the sample SD (divide by n − 1).
Confusing SD with SE. The interval uses SE = s ÷ √n.
Reading overlapping intervals as "no difference". Overlap doesn't prove two means are equal; use a test (see the p-value calculator).
Picking the confidence level after seeing the data.
Frequently asked questions
What does a 95% confidence interval mean?
The method captures the true mean in about 95% of repeated samples.
How do I make the interval narrower?
Increase the sample size, accept a lower confidence level, or reduce variability.
What is the z value for 95%?
About 1.96.
When should I use t instead of z?
When the sample is small and the population SD is unknown.
What is the margin of error?
Half the width of the interval: z* × s ÷ √n.
Can the interval include negative values?
Yes, if the data allow it; for quantities that can't be negative, consider a transformation.
Related calculators
Sample Size Calculator
Standard Deviation Calculator
Z-Score Calculator
P-Value Calculator
Statistics Calculator
Mean, Median, Mode & Range Calculator
Sources
1. NIST/SEMATECH e-Handbook of Statistical Methods: "Confidence limits for the mean" (accessed 14 Oct 2026). https://www.itl.nist.gov/div898/handbook/eda/section3/eda352.htm
2. Penn State STAT 500: "Confidence intervals" (accessed 14 Oct 2026). https://online.stat.psu.edu/stat500/lesson/5
3. FigSumo methodology.
