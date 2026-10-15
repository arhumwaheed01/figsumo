---
url: /standard-deviation-calculator
title: "Standard Deviation Calculator (Sample & Population) | FigSumo"
description: "Calculate sample and population standard deviation and variance for a data set, with the mean and each squared deviation shown."
h1: "Standard Deviation Calculator"
country: global
status: keep
body_words: 620 (minimum 600)
verify_flags: 0
updated: 2026-10-15
source: FigSumo-All-Page-Content.docx
---

H1: Standard Deviation Calculator
Standard deviation measures how spread out numbers are around their average. A small value means the data cluster tightly around the mean; a large one means they're widely scattered. Paste your numbers and this calculator returns both the sample and population standard deviation, with the mean, median, minimum, maximum and range.
How to use this calculator
1. Numbers (comma-separated): for example 2, 4, 4, 4, 5, 5, 7, 9. At least two values.
Results: sample std. dev. (n − 1), population std. dev. (n), mean and count, plus a summary table with median, min, max and range.
Sample or population?
Population (divide by n): your data include every member of the group you care about, such as the final marks of all 30 students in a class.
Sample (divide by n − 1): your data are a subset used to estimate a larger group, such as 30 students surveyed out of a school of 1,000. This is usually the right choice.
Dividing by n − 1 (Bessel's correction) offsets the fact that a sample's spread around its own mean tends to understate the population's spread.
The formulas
mean x̄ = Σx ÷ n
population σ = √( Σ(x − x̄)² ÷ n )
sample s    = √( Σ(x − x̄)² ÷ (n − 1) )
Variance is the square of the standard deviation (before the square root).
Worked example: 2, 4, 4, 4, 5, 5, 7, 9
x
x − 5
(x − 5)²
2
−3
9
4
−1
1
4
−1
1
4
−1
1
5
0
0
5
0
0
7
2
4
9
4
16
Sum
32
Mean = 40 ÷ 8 = 5
Population: √(32 ÷ 8) = √4 = 2
Sample: √(32 ÷ 7) = 2.13809 (sample variance 4.571429)
Example 2: same average, different spread
Two classes' test scores:
Class A: 68, 72, 75, 71, 74 → mean 72.0, sample SD 2.74
Class B: 50, 95, 70, 62, 85 → mean 72.4, sample SD 17.92
Both averages are close, but Class B's results are far less consistent.
Interpreting standard deviation
For roughly bell-shaped (normal) data:
Within
Share of data
±1 SD of the mean
about 68%
±2 SD
about 95%
±3 SD
about 99.7%
So if adult heights average 170 cm with an SD of 7 cm, about 95% fall between 156 and 184 cm. A value's distance from the mean in SDs is its z-score; see the z-score calculator.
Understanding your results
SD is in the same units as your data (variance is in squared units).
Outliers inflate SD heavily because deviations are squared. Check the min and max in the summary table.
Comparing spreads across different scales? Use the coefficient of variation: SD ÷ mean.
Tips and common mistakes
Choosing population when you have a sample.
Forgetting the square root (reporting variance).
Typos in pasted data, like a missing comma turning 4 and 5 into 45.
Assuming the 68-95-99.7 rule for skewed data such as incomes.
Notes for US, Canada and UK readers
UK papers write σ for population and s for sample, as do US and Canadian texts.
Frequently asked questions
What does standard deviation tell you?
How far, typically, values are from the mean.
When do I use n − 1?
When your data are a sample from a larger population.
What's the difference between variance and standard deviation?
SD is the square root of variance, in the original units.
Can standard deviation be negative?
No. It's zero only when all values are equal.
What is a "high" standard deviation?
It depends on context; compare it with the mean or with other groups.
Why are there two answers?
The calculator shows both sample and population versions so you can pick the right one.
Related calculators
Statistics Calculator
Mean, Median, Mode & Range Calculator
Z-Score Calculator
Confidence Interval Calculator
Sample Size Calculator
Average Calculator
Sources
1. NIST/SEMATECH e-Handbook of Statistical Methods: "Measures of scale" (accessed 14 Oct 2026). https://www.itl.nist.gov/div898/handbook/eda/section3/eda356.htm
2. Khan Academy: "Variance and standard deviation" (accessed 14 Oct 2026). https://www.khanacademy.org/math/statistics-probability/summarizing-quantitative-data/variance-standard-deviation-population
3. FigSumo methodology.
