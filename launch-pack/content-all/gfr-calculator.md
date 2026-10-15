---
url: /gfr-calculator
title: "eGFR Calculator (CKD-EPI 2021) | FigSumo"
description: "Estimate kidney filtration rate (eGFR) from serum creatinine, age and sex with the race-free CKD-EPI 2021 equation. Discuss any result with a clinician."
h1: "eGFR Calculator"
country: global
status: keep
body_words: 1,091 (minimum 1,000)
verify_flags: 1
updated: 2026-10-15
source: FigSumo-All-Page-Content.docx
---

H1: eGFR Calculator
Glomerular filtration rate (GFR) measures how well your kidneys filter blood. It's hard to measure directly, so labs estimate it (eGFR) from a blood test for creatinine, a waste product from muscle, along with your age and sex. This calculator uses the CKD-EPI 2021 creatinine equation, the race-free equation recommended in the US, to estimate eGFR and show the corresponding GFR category.
How to use this calculator
1. Age: 18 or older (the equation is for adults).
2. Sex: the equation uses different constants for men and women.
3. Serum creatinine: from your blood test, in mg/dL. If your lab reports µmol/L (common in Canada and the UK), divide by 88.4 to convert.
Results: eGFR in mL/min/1.73 m², the GFR category (G1 to G5), and a reminder that this isn't a diagnosis.
The formula (CKD-EPI 2021, creatinine)
eGFR = 142 × min(Scr/κ, 1)^α × max(Scr/κ, 1)^−1.200 × 0.9938^Age × 1.012 [if female]
Scr: serum creatinine (mg/dL)
κ: 0.7 for women, 0.9 for men
α: −0.241 for women, −0.302 for men
The result is standardised to a body surface area of 1.73 m². The 2021 equation removed the race coefficient used in earlier versions.
Worked examples
Example 1: man aged 45, creatinine 1.0 mg/dL
Scr/κ = 1.0 ÷ 0.9 = 1.111, so the min term is 1 and the max term is 1.111^−1.200
eGFR ≈ 95 mL/min/1.73 m² → G1 (normal or high)
The same creatinine at age 65 gives about 84: eGFR falls gradually with age.
Example 2: woman aged 60, creatinine 0.9 mg/dL
eGFR ≈ 73 → G2 (mildly decreased) (counts as CKD only with other signs of kidney damage)
Example 3: man aged 70, creatinine 1.6 mg/dL
eGFR ≈ 46 → G3a (mildly to moderately decreased); if this persists for more than three months, it meets the definition of CKD
Converting µmol/L
A creatinine of 80 µmol/L is 80 ÷ 88.4 = 0.90 mg/dL. For a woman aged 52, that gives an eGFR of about 76.
GFR categories (KDIGO)
Category
eGFR (mL/min/1.73 m²)
Description
G1
90 or more
Normal or high
G2
60–89
Mildly decreased
G3a
45–59
Mildly to moderately decreased
G3b
30–44
Moderately to severely decreased
G4
15–29
Severely decreased
G5
under 15
Kidney failure
Chronic kidney disease (CKD) is diagnosed when eGFR is below 60, or there are markers of kidney damage (such as albumin in the urine), for more than three months. A single eGFR of 60 to 89 without other signs isn't CKD.
eGFR at age 50 for different creatinine levels
Creatinine
Man
Woman
0.6 mg/dL (53 µmol/L)
118
109
0.8 mg/dL (71 µmol/L)
108
90
1.0 mg/dL (88 µmol/L)
92
69
1.2 mg/dL (106 µmol/L)
74
55
1.5 mg/dL (133 µmol/L)
56
42
2.0 mg/dL (177 µmol/L)
40
30
3.0 mg/dL (265 µmol/L)
25
18
The same creatinine gives a lower eGFR for a woman because women, on average, have less muscle and so produce less creatinine. Small rises in creatinine at the upper end make large differences: doubling from 1.5 to 3.0 mg/dL in a 50-year-old man takes eGFR from about 56 to 25.
Example 4: a lab report in µmol/L
A 35-year-old woman's result is 62 µmol/L. That's 62 ÷ 88.4 = 0.70 mg/dL, and the equation gives an eGFR of about 115 (G1). Many UK and Canadian lab reports show eGFR above 90 simply as "&gt;90".
Understanding your results
It's an estimate. Creatinine depends on muscle mass, diet (especially recent meat intake), hydration and some medicines. Very muscular people may show a falsely low eGFR; people with low muscle mass may show a falsely high one.
Cystatin C: a second blood marker that doesn't depend on muscle. Combining it with creatinine gives a more accurate estimate in many people.
Not for acute changes. eGFR equations assume stable kidney function; they're unreliable in acute kidney injury.
Medication dosing may use eGFR or creatinine clearance (Cockcroft-Gault); your clinician or pharmacist decides which.
Ask about urine albumin. The urine albumin-to-creatinine ratio (uACR) is the other half of CKD assessment.
eGFR and creatinine clearance
Some drug labels and dosing charts use creatinine clearance from the Cockcroft-Gault equation rather than eGFR:
CrCl (mL/min) = (140 − age) × weight (kg) ÷ (72 × Scr) [× 0.85 if female]
For a man aged 70, weighing 80 kg, with a creatinine of 1.2 mg/dL: (140 − 70) × 80 ÷ (72 × 1.2) = 64.8 mL/min. The calculator doesn't compute this, and it isn't interchangeable with eGFR, because it depends on body weight and isn't scaled to 1.73 m². Pharmacists choose which one applies to a given medicine.
Country notes
United States: the National Kidney Foundation and American Society of Nephrology recommended adopting CKD-EPI 2021 in 2021; most US labs report it.
Canada: most labs report creatinine in µmol/L; many have adopted CKD-EPI 2021 [VERIFY by province].
United Kingdom: NICE guidance (NG203) recommends the CKD-EPI creatinine equation; NICE advises not adjusting for ethnicity. Some UK labs still report the 2009 version [VERIFY].
Tips and common mistakes
Mixing units. Entering µmol/L as mg/dL gives a meaningless result.
Testing after a heavy meat meal or intense exercise, which can raise creatinine temporarily.
Reading one result in isolation. Trends over months matter more.
Frequently asked questions
What is a normal eGFR?
90 or above is normal in most adults; it declines slowly with age.
What eGFR indicates kidney disease?
Below 60 for more than three months, or any level with signs of kidney damage.
Why did the eGFR equation change in 2021?
To remove the race coefficient, which was considered inappropriate and could delay care.
Can I improve my eGFR?
Managing blood pressure, blood sugar, avoiding unnecessary NSAIDs and following medical advice can help preserve kidney function.
What's the difference between eGFR and creatinine clearance?
eGFR estimates filtration standardised to body size; creatinine clearance (Cockcroft-Gault) estimates clearance in mL/min and is sometimes used for drug dosing.
Does high protein intake affect eGFR?
A large protein meal can raise creatinine briefly, lowering eGFR on that test.
Related calculators
Body Surface Area Calculator
BMI Calculator
Healthy Weight Calculator
Ideal Weight Calculator
Lean Body Mass Calculator
Blood Alcohol (BAC) Calculator
Sources
1. Inker LA, et al. "New Creatinine- and Cystatin C–Based Equations to Estimate GFR without Race." N Engl J Med 2021;385:1737–1749 (accessed 14 Oct 2026). https://www.nejm.org/doi/full/10.1056/NEJMoa2102953
2. National Kidney Foundation: "eGFR calculator and CKD-EPI 2021" (accessed 14 Oct 2026). https://www.kidney.org/professionals/gfr_calculator
3. National Institute of Diabetes and Digestive and Kidney Diseases: "Estimating glomerular filtration rate" (accessed 14 Oct 2026). https://www.niddk.nih.gov/research-funding/research-programs/kidney-clinical-research-epidemiology/laboratory/glomerular-filtration-rate-equations
4. NICE: "Chronic kidney disease: assessment and management" (NG203) (accessed 14 Oct 2026). https://www.nice.org.uk/guidance/ng203
5. KDIGO: "2024 Clinical Practice Guideline for the Evaluation and Management of CKD" (accessed 14 Oct 2026). https://kdigo.org/guidelines/ckd-evaluation-and-management/
6. FigSumo methodology.
Disclaimer
This GFR calculator is for general information and education. It is not a diagnosis or medical advice. Interpret blood test results with your doctor, who will consider your full clinical picture.
