---
url: /triangle-calculator
title: "Triangle Calculator: Solve Any Triangle | FigSumo"
description: "Enter three known sides or angles to solve a triangle with the laws of sines and cosines. Returns all sides, angles, area and perimeter."
h1: "Triangle Calculator"
country: global
status: keep
body_words: 669 (minimum 600)
verify_flags: 0
updated: 2026-10-15
source: FigSumo-All-Page-Content.docx
---

H1: Triangle Calculator
Know the three side lengths of a triangle? This calculator finds everything else: the area, the perimeter and all three angles. It works for any triangle (acute, right or obtuse) and tells you if the sides can't form a triangle at all.
How to use this calculator
1. Side a, Side b, Side c: enter all three lengths in the same unit. The boxes start empty.
Results: area (square units), perimeter, and angles A, B and C in degrees, where angle A is opposite side a, and so on.
The sides must satisfy the triangle inequality: each side must be shorter than the other two combined. Otherwise you'll see "Sides do not form a valid triangle".
The formulas
Area (Heron's formula):
s = (a + b + c) ÷ 2          (semi-perimeter)
Area = √( s(s − a)(s − b)(s − c) )
Angles (law of cosines):
A = arccos( (b² + c² − a²) ÷ 2bc )
B = arccos( (a² + c² − b²) ÷ 2ac )
C = 180° − A − B
Worked examples
Example 1: 3, 4, 5
s = 6; area = √(6 × 3 × 2 × 1) = 6
Perimeter 12
Angles 36.87°, 53.13°, 90°: a right triangle.
Example 2: 7, 8, 9
s = 12; area = 26.8328
Angles A = 48.19°, B = 58.41°, C = 73.40°: all under 90°, so acute.
Example 3: equilateral, side 6
Area = (√3 ÷ 4) × 6² = 15.5885; each angle 60°.
Example 4: a garden plot
A triangular plot measures 30 m, 40 m and 45 m. Heron's formula gives about 588.1 m², without needing to measure a height.
Example 5: invalid sides
1, 2 and 4 can't form a triangle because 1 + 2 < 4.
Classifying a triangle
By sides: equilateral (all equal), isosceles (two equal), scalene (none equal).
By angles, using the longest side c:
Test
Triangle
a² + b² = c²
Right
a² + b² > c²
Acute
a² + b² < c²
Obtuse
Other area formulas
Base and height: ½ × b × h, when you know a perpendicular height.
Two sides and the included angle: ½ × a × b × sin C.
Coordinates: ½ |x₁(y₂ − y₃) + x₂(y₃ − y₁) + x₃(y₁ − y₂)|.
Understanding your results
Angles sum to 180°. Small rounding may make the displayed values add to 179.99 or 180.01.
Units: area is in your unit squared; angles are always degrees.
Very thin triangles (where two sides nearly equal the third) have tiny areas that are sensitive to measurement error.
Tips and common mistakes
Matching angles to the wrong sides. The largest angle is opposite the longest side.
Mixing units across sides.
Using Heron's formula with a typo that breaks the triangle inequality.
Measuring a slanted side as a "height".
Notes for US, Canada and UK readers
US and Canadian classes usually call the longest side of a right triangle the hypotenuse and the other two "legs"; UK GCSE papers tend to say "the two shorter sides". Isosceles and scalene are used everywhere. Exam questions in all three countries regularly give lengths in centimetres and ask for answers to 3 significant figures (UK) or to the nearest tenth (US). The calculator shows more decimals, so round at the end.
Practice problems
1. Sides 5, 12 and 13: s = 15, area = √(15 × 10 × 3 × 2) = 30, a right triangle because 5² + 12² = 13².
2. Sides 6, 6 and 10: s = 11, area = √(11 × 5 × 5 × 1) = 16.58, isosceles and obtuse because 6² + 6² < 10².
3. Sides 2, 3 and 6: no triangle, because 2 + 3 is less than 6.
Frequently asked questions
How do I find the area from three sides?
Heron's formula: √(s(s − a)(s − b)(s − c)).
How do I find the angles from three sides?
The law of cosines.
What makes three sides a valid triangle?
Each side must be less than the sum of the other two.
How can I tell if a triangle is right-angled?
Check whether a² + b² equals c² for the longest side c.
Can I enter angles instead of sides?
Not yet; the calculator solves side-side-side triangles.
What is the perimeter?
The sum of the three sides.
Related calculators
Right Triangle Calculator
Pythagorean Theorem Calculator
Area Calculator
Distance Between Two Points Calculator
Surface Area Calculator
Roofing Calculator
Sources
1. Khan Academy: "Heron's formula" (accessed 14 Oct 2026). https://www.khanacademy.org/math/geometry/hs-geo-trig/hs-geo-law-of-cosines/a/law-of-cosines-review
2. NIST Digital Library of Mathematical Functions: "Trigonometric functions" (accessed 14 Oct 2026). https://dlmf.nist.gov/4.14
3. FigSumo methodology.
