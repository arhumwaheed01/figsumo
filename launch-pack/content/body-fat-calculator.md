---
url: /body-fat-calculator
h1: Body Fat Calculator
title: "Body Fat Calculator: U.S. Navy Tape-Measure Method | FigSumo"
description: "Estimate body fat percentage from height, neck, waist and (for women) hip measurements using the U.S. Navy circumference method, plus fat mass and lean mass."
updated: 2026-10-14
country: global (cm/in)
calculatorRequirements: "DEV-TASKS T-210 (defaults), T-309, T-419 (inch-based Hodgdon–Beckett equations as primary; metric inputs converted to inches; show fat mass/lean mass when weight given; measurement guide with diagrams; flag implausible inputs e.g. waist ≤ neck); Army method page = VERIFY (2023 change)"
related: [/bmi-calculator, /lean-body-mass-calculator, /ideal-weight-calculator, /calorie-calculator, /bmr-calculator]
---

Body fat percentage is the share of your weight that is fat tissue. It tells you something BMI can't: two people with the same BMI can have very different amounts of fat and muscle. The most accurate measurements need lab equipment such as DXA scans. This calculator uses the U.S. Navy circumference method, a published equation that estimates body fat from a few tape-measure readings.

## How to use this calculator

1. Choose **cm** or **inches**.
2. Enter **sex** and **height**.
3. Measure and enter, to the nearest 0.5 cm or ¼ inch:
   - **Neck:** just below the larynx (Adam's apple), with the tape sloping slightly down to the front.
   - **Waist:** for men, horizontally at the navel. For women, at the narrowest point of the abdomen.
   - **Hips (women only):** at the widest point of the buttocks.
4. **Optional:** enter your weight to see fat mass and lean mass in kg or lb.
5. Measure on bare skin with the tape snug but not compressing. Take the average of two or three readings.

## The formula

The Navy method comes from Hodgdon and Beckett (Naval Health Research Center, 1984). With all measurements in **inches**:

```
Men:   %BF = 86.010 × log10(waist − neck) − 70.041 × log10(height) + 36.76
Women: %BF = 163.205 × log10(waist + hip − neck) − 97.684 × log10(height) − 78.387
```

- **log10**: base-10 logarithm
- **waist, neck, hip, height**: circumferences and height in inches

If you enter centimetres, the calculator converts them to inches (÷ 2.54) and then applies the same equations.

*A note on the metric version.* Many websites use a different, density-based metric form of these equations. It gives results about 0.1–0.3 percentage points different from the inch version (see the examples). We use the inch version for both unit systems so that the result doesn't change when you switch units.

**Fat and lean mass** (if weight is given):

```
Fat mass  = weight × %BF ÷ 100
Lean mass = weight − fat mass
```

## Worked examples

**Example 1: man.**
Height 178 cm (70.08 in), neck 39 cm (15.35 in), waist 90 cm (35.43 in).
- waist − neck = 20.08 in → log10 = 1.3027
- log10(70.08) = 1.8456
- %BF = 86.010 × 1.3027 − 70.041 × 1.8456 + 36.76 = **19.5%** (19.54)
- The density-based metric form gives 19.43%
- At 85 kg: fat mass ≈ **16.6 kg**, lean mass ≈ **68.4 kg**

**Example 2: woman.**
Height 165 cm, neck 33 cm, waist 76 cm, hips 100 cm.
- waist + hip − neck = 143 cm = 56.30 in
- %BF = 163.205 × log10(56.30) − 97.684 × log10(64.96) − 78.387 = **30.2%** (30.24)
- The density-based metric form gives 29.93%
- At 68 kg: fat mass ≈ **20.6 kg**, lean mass ≈ **47.4 kg**

## Understanding your results

- **It's an estimate.** Circumference equations are fitted to population data. Your own value from a lab method could be several points higher or lower, especially if your fat distribution is unusual for your sex.
- **Consistency matters more than precision.** If you track changes, measure the same way, at the same time of day, each time. A trend over weeks is more meaningful than a single reading.
- **There's no single universal healthy range.** Different organisations publish different reference ranges by sex and age. If you want to know what your number means for your health, ask a healthcare professional.
- **Implausible inputs:** if the waist measurement is not larger than the neck (or, for women, waist + hip is not larger than the neck), the equations can't be applied, and the calculator will ask you to check your measurements.

## Country notes

- **U.S. military:** service standards and approved methods have changed over time, and the Army introduced a different method in recent years. This page uses the original Navy equations. Service members should follow their branch's current instructions (VERIFY current DoD/Army method before adding a military mode).
- **UK/Canada:** the method is the same anywhere. Use cm or inches as you prefer.

## Frequently asked questions

### How accurate is the Navy body fat method?
It's reasonable for tracking trends and for population screening. It is less accurate for an individual than DXA, hydrostatic weighing or air-displacement methods.

### Why do men and women use different formulas?
Fat is distributed differently on average. The women's equation includes hip circumference to account for that.

### Why does my result differ from another website's?
Usually because the other site uses the density-based metric form, or measures at a different place. Our examples show the size of the difference between the two forms.

### Can I use this if I'm very muscular?
Yes. That is one advantage over BMI. Very large neck measurements, though, can lower the estimate, so compare it with other methods if possible.

### Does body fat percentage replace BMI?
They answer different questions. BMI relates weight to height; body fat estimates composition. Using both, along with waist measurement, gives a fuller picture.

### How often should I measure?
Every few weeks is plenty for tracking. Day-to-day changes are mostly measurement noise.

## Sources
1. Hodgdon JA, Beckett MB. "Prediction of percent body fat for U.S. Navy men from body circumferences and height." Naval Health Research Center Report No. 84-11, 1984. DTIC ADA143890. https://apps.dtic.mil/sti/citations/ADA143890 (DTIC blocked automated access on 14 Oct 2026; VERIFY link in a browser)
2. Hodgdon JA, Beckett MB. "Prediction of percent body fat for U.S. Navy women from body circumferences and height." Naval Health Research Center Report No. 84-29, 1984 (VERIFY report number and DTIC accession).
3. CDC, "Adult BMI Categories" (BMI as a screening measure). https://www.cdc.gov/bmi/adult-calculator/bmi-categories.html (accessed 14 Oct 2026)

## Disclaimer
This calculator gives an estimate for general information only. It is not medical advice or a diagnosis. For a clinical assessment of body composition, consult a healthcare professional.
