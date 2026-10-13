---
url: /bmr-calculator
h1: BMR Calculator
title: "BMR Calculator: Basal Metabolic Rate (Mifflin-St Jeor) | FigSumo"
description: "Calculate your basal metabolic rate with Mifflin-St Jeor, revised Harris-Benedict or Katch-McArdle, in kcal or kJ, and see how activity changes daily needs."
updated: 2026-10-14
country: global
calculatorRequirements: "DEV-TASKS T-210 (defaults), T-418 (3 equations side by side, kcal/kJ, metric/imperial with exact conversion 1 lb = 0.45359237 kg, 1 in = 2.54 cm; activity table)"
related: [/calorie-calculator, /tdee-calculator, /body-fat-calculator, /lean-body-mass-calculator, /bmi-calculator]
---

Your basal metabolic rate (BMR) is the energy your body would use in a day at complete rest, just to keep you alive: breathing, circulation and keeping your organs working. For most people it is the largest part of daily calorie use. BMR can't be measured at home, so this calculator estimates it with published equations based on your size, age and sex. It shows three equations side by side so you can see how much they differ.

## How to use this calculator

1. Choose **metric** or **imperial**. Imperial inputs are converted exactly (1 lb = 0.45359237 kg; 1 in = 2.54 cm).
2. Enter **age**, **sex**, **height** and **weight**.
3. **Optional:** enter a **body-fat percentage** to add the Katch-McArdle estimate, which uses lean mass instead of sex and age.
4. Choose **kcal** or **kJ** for the output.
5. Below the result, a table multiplies your BMR by standard activity factors to give daily needs.

## The formula

**Mifflin-St Jeor (1990)**, the default:

```
Men:   BMR = 10W + 6.25H − 5A + 5
Women: BMR = 10W + 6.25H − 5A − 161
```

**Revised Harris-Benedict (Roza & Shizgal, 1984):**

```
Men:   BMR = 88.362 + 13.397W + 4.799H − 5.677A
Women: BMR = 447.593 + 9.247W + 3.098H − 4.330A
```

**Katch-McArdle** (needs body-fat %):

```
BMR = 370 + 21.6 × LBM,   LBM = W × (1 − body fat % ÷ 100)
```

- **W**: weight in kg
- **H**: height in cm
- **A**: age in years
- **LBM**: lean body mass in kg

**Daily needs:** BMR × 1.2 (sedentary) up to 1.9 (extra active).

## Worked examples

**Example 1: man, 40, 180 cm, 85 kg.**
- Mifflin-St Jeor: 10 × 85 + 6.25 × 180 − 5 × 40 + 5 = 850 + 1,125 − 200 + 5 = **1,780 kcal/day** (7,448 kJ)
- Revised Harris-Benedict: 88.362 + 1,138.745 + 863.82 − 227.08 = **1,863.8 kcal/day**
- If his body fat is 19.5%: LBM = 85 × 0.805 = 68.4 kg, and Katch-McArdle gives 370 + 21.6 × 68.4 ≈ **1,847 kcal/day**

The three estimates span about 84 kcal, under 5%.

Daily needs from the Mifflin BMR:
- Sedentary: 1,780 × 1.2 = **2,136 kcal**
- Very active: 1,780 × 1.725 = **3,070.5 kcal**

**Example 2: the same man in imperial units.**
187 lb and 5 ft 11 in convert to 84.82 kg and 180.34 cm. Mifflin gives **1,780.3 kcal/day**. The tiny difference from Example 1 is only because 187 lb and 5 ft 11 in are not exactly 85 kg and 180 cm.

## Understanding your results

- **BMR is an estimate.** Predictive equations are accurate on average, not for every person. Roza and Shizgal reported a precision of about ±14% for the revised Harris-Benedict equations. An individual's measured value can differ noticeably from any formula.
- **What raises or lowers BMR:** more lean mass raises it. Age tends to lower it, mostly through loss of muscle. Illness, fever, some medications and thyroid function can change it significantly.
- **BMR vs RMR:** "resting metabolic rate" is measured under less strict conditions and is usually a little higher. The equations here are often used interchangeably for both.
- **Using the number:** BMR by itself is not a daily calorie target. Multiply by your activity level, or use the [calorie calculator](/calorie-calculator).

## Country notes

- Units: US users typically enter pounds and feet/inches; UK users may use stone. The imperial mode accepts stone + lb (VERIFY: add stone input in T-223). Canada mostly uses metric. Energy appears as kcal on US and Canadian labels, and as kJ and kcal on UK and EU labels.
- The equations are not country-specific. They were developed mainly in North American adult populations, so accuracy may differ in other groups.

## Frequently asked questions

### What is a normal BMR?
There's no single normal value. BMR scales with body size and lean mass, and it differs by sex and age. That's why the calculator asks for all four. Compare your result with your own measured weight trend rather than with someone else's number.

### Which BMR formula should I use?
Mifflin-St Jeor is widely used for healthy adults. Use Katch-McArdle if you have a reliable body-fat measurement. Showing all three gives you a sense of the uncertainty.

### Does muscle increase BMR?
Lean tissue uses more energy at rest than fat tissue, so more muscle generally means a higher BMR. This is why Katch-McArdle uses lean mass.

### Why does BMR fall with age?
Partly because of changes in body composition, mainly less muscle, and partly because of changes in organ metabolism. The equations include an age term to reflect this on average.

### Can I eat my BMR calories to lose weight?
BMR is the energy for rest only. Eating far below your total needs can be hard to sustain and isn't appropriate for everyone. Speak to a healthcare professional before starting a restrictive diet.

### Is BMR the same as metabolism?
BMR is one part of metabolism. Total daily energy also includes the energy used to digest food and all physical activity.

## Sources
1. Mifflin MD, St Jeor ST, et al. *Am J Clin Nutr* 1990;51(2):241–247. PMID 2305711. https://pubmed.ncbi.nlm.nih.gov/2305711/ (accessed 14 Oct 2026)
2. Roza AM, Shizgal HM. *Am J Clin Nutr* 1984;40(1):168–182. https://ajcn.nutrition.org/article/S0002-9165(23)24359-2/abstract (accessed 14 Oct 2026)
3. NIDDK (NIH), "Body Weight Planner." https://www.niddk.nih.gov/bwp (accessed 14 Oct 2026)
4. Katch-McArdle equation and activity factors: VERIFY a primary citation before publishing.

## Disclaimer
BMR estimates are for general information and education. They are not medical or nutritional advice. Consult a healthcare professional for personalised guidance.
