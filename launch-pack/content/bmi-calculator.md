---
url: /bmi-calculator
h1: BMI Calculator
title: "BMI Calculator for Adults & Children (Metric/Imperial) | FigSumo"
description: "Calculate your Body Mass Index in kg/cm or lb/ft-in, see the adult category, the healthy weight range for your height and child BMI-for-age guidance."
updated: 2026-10-14
country: global (US CDC categories default; NHS ethnicity thresholds shown for UK users)
calculatorRequirements: "DEV-TASKS T-210 (sensible defaults, no empty result), T-223 unit toggle, T-417 (adult categories + healthy-weight range for height; under-20 route to BMI-for-age percentile using CDC 2000 growth chart LMS data — VERIFY data licence/format; NHS lower thresholds option); merges /overweight-calculator, removes /anorexic-bmi-calculator (301)"
related: [/healthy-weight-calculator, /ideal-weight-calculator, /body-fat-calculator, /calorie-calculator, /bmr-calculator]
---

Body Mass Index (BMI) compares your weight with your height. It's quick to calculate and widely used to screen for weight categories that may be linked to health risks. It doesn't measure body fat directly, and it doesn't diagnose anything. This calculator gives your BMI in metric or imperial units, the adult category, the weight range that corresponds to a healthy BMI for your height, and separate guidance for children and teens.

## How to use this calculator

1. Choose **metric** (kg, cm) or **imperial** (lb, ft and in).
2. Enter your **height** and **weight**.
3. Enter **age**, and **sex** for under-20s. Children's BMI is interpreted with sex- and age-specific percentiles, not adult cut-offs.
4. **Optional (UK users):** tick the box if you are from a South Asian, Chinese, other Asian, Middle Eastern, Black African or African-Caribbean background, to see the NHS's lower thresholds.

## The formula

```
Metric:   BMI = weight (kg) ÷ height (m)²
Imperial: BMI = 703 × weight (lb) ÷ height (in)²
```

The 703 converts pounds and inches to the same units as kg/m². The two formulas agree to within rounding.

**Healthy weight range for your height** (adults): weight = BMI × height², calculated at BMI 18.5 and just under 25.

**Adult categories (CDC, ages 20+):**

| BMI (kg/m²) | Category |
|---|---|
| below 18.5 | Underweight |
| 18.5 to under 25 | Healthy weight |
| 25 to under 30 | Overweight |
| 30 to under 35 | Obesity class 1 |
| 35 to under 40 | Obesity class 2 |
| 40 or more | Obesity class 3 (severe obesity) |

For some ethnic groups, the NHS notes that health risks start at a lower BMI. It treats 23 to 27.4 as overweight and 27.5 or above as obese.

**Ages 2–19:** the CDC uses BMI-for-age percentiles. Below the 5th percentile is underweight; 5th to under the 85th is healthy weight; 85th to under the 95th is overweight; the 95th or above is obesity.

## Worked examples

**Example 1: metric.**
Height 178 cm (1.78 m), weight 82 kg.
- 1.78² = 3.1684
- BMI = 82 ÷ 3.1684 = **25.88**, in the *overweight* category (25 to under 30)
- Healthy-weight range at 1.78 m: 18.5 × 3.1684 = **58.6 kg** up to about 24.9 × 3.1684 = **78.9 kg**

**Example 2: imperial.**
Height 5 ft 10 in (70 in), weight 180 lb.
- 70² = 4,900
- BMI = 703 × 180 ÷ 4,900 = **25.82**, also *overweight*
- Healthy-weight range at 5 ft 10 in: about **129 lb to 173 lb**

As a cross-check, the CDC's own example for an adult who is 5 ft 9 in gives a healthy weight range of 125 to 168 lb. One inch taller moves both ends up by a few pounds, which matches our figures.

## BMI weight ranges by height (adults)

| Height | Healthy weight (BMI 18.5 to under 25) | Overweight (BMI 25 to under 30) |
|---|---|---|
| 160 cm | 47.4–64.0 kg | 64.0–76.8 kg |
| 170 cm | 53.5–72.2 kg | 72.2–86.7 kg |
| 180 cm | 59.9–81.0 kg | 81.0–97.2 kg |
| 190 cm | 66.8–90.2 kg | 90.2–108.3 kg |
| 5 ft 2 in | 101–137 lb | 137–164 lb |
| 5 ft 6 in | 115–155 lb | 155–186 lb |
| 5 ft 10 in | 129–174 lb | 174–209 lb |
| 6 ft 2 in | 144–195 lb | 195–234 lb |

Each range runs up to, but not including, the next category's starting weight. Values are rounded. Use the calculator for your exact height.

## Understanding your results

- **BMI is a screening measure.** The CDC says it should be considered with other factors when assessing someone's health. Waist size, blood pressure, blood tests, activity and family history all matter.
- **Muscle and frame:** muscular people can have a high BMI without excess fat. Older adults can have a "healthy" BMI while carrying more fat and less muscle.
- **Not for pregnancy:** BMI categories don't apply during pregnancy.
- **Children:** a single BMI number means different things at different ages. The calculator shows the percentile and category, and a doctor should interpret growth over time.
- If your result concerns you, talk to a healthcare professional. This calculator doesn't diagnose conditions or recommend treatment.

## Country notes

- **US:** categories follow the CDC definitions for adults 20 and older.
- **UK:** the NHS uses the same adult bands, with lower thresholds for the ethnic groups listed above. NHS guidance also uses waist-to-height ratio alongside BMI.
- **Canada:** Health Canada's adult BMI classification uses the same cut-offs (VERIFY citation before publishing).
- **Worldwide:** the WHO defines adult overweight as BMI ≥ 25 and obesity as BMI ≥ 30.

## Frequently asked questions

### What is a healthy BMI?
For most adults, 18.5 to under 25. For people from certain ethnic backgrounds, the NHS suggests risk rises from 23.

### Is BMI accurate?
It is a useful population screening tool, but it doesn't distinguish fat from muscle or show where fat is stored. Measures such as waist circumference or a [body fat estimate](/body-fat-calculator) add context.

### Why does the calculator ask my age?
Because under-20s are assessed with age- and sex-specific percentiles. Adult categories only apply from age 20 in the CDC system.

### What's the BMI formula in pounds and inches?
BMI = 703 × weight in pounds ÷ (height in inches)². For 180 lb at 70 inches: 703 × 180 ÷ 4,900 = 25.82.

### Can I use BMI during pregnancy?
No. Pregnancy changes weight in ways BMI isn't designed to interpret. Pre-pregnancy BMI is sometimes used to guide weight-gain advice; ask your midwife or doctor.

### My BMI is in the overweight range but I exercise a lot. Should I worry?
Not necessarily. BMI can't tell muscle from fat. Discuss your overall health with a professional rather than relying on one number.

## Sources
1. CDC, "Adult BMI Categories" (19 Mar 2024). https://www.cdc.gov/bmi/adult-calculator/bmi-categories.html (accessed 14 Oct 2026)
2. CDC, "Child and Teen BMI Categories" (28 Jun 2024). https://www.cdc.gov/bmi/child-teen-calculator/bmi-categories.html (accessed 14 Oct 2026)
3. NHS, "Obesity" (BMI ranges, including lower thresholds for some ethnic groups). https://www.nhs.uk/conditions/obesity/ (accessed 14 Oct 2026)
4. World Health Organization, "Obesity and overweight" fact sheet. https://www.who.int/news-room/fact-sheets/detail/obesity-and-overweight (accessed 14 Oct 2026)
5. NHLBI (NIH), "Calculate Your BMI." https://www.nhlbi.nih.gov/health/educational/lose_wt/BMI/bmicalc.htm (accessed 14 Oct 2026)

## Disclaimer
This calculator is for general information only. It is not medical advice and does not diagnose any condition. Talk to a qualified healthcare professional about your weight and health.
