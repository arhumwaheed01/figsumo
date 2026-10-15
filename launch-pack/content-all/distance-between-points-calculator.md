---
url: /distance-between-points-calculator
title: "Distance Between Two Points Calculator (2D & 3D) | FigSumo"
description: "Find the straight-line distance between two points in 2D or 3D coordinates with the distance formula worked through step by step."
h1: "Distance Between Two Points Calculator"
country: global
status: rename (301)
body_words: 648 (minimum 600)
verify_flags: 0
updated: 2026-10-15
source: FigSumo-All-Page-Content.docx
---

H1: Distance Between Two Points Calculator
This calculator finds the straight-line (Euclidean) distance between two points on a plane or in three-dimensional space. Enter the coordinates and choose 2D or 3D; the result is shown to six decimal places.
How to use this calculator
1. Dimensions: 2D for points (x, y) or 3D for points (x, y, z).
2. x₁, y₁ (and z₁): the first point.
3. x₂, y₂ (and z₂): the second point. The z fields are ignored in 2D mode.
Result: distance, in the same units as the coordinates.
The formulas
2D:
d = √((x₂ − x₁)² + (y₂ − y₁)²)
3D:
d = √((x₂ − x₁)² + (y₂ − y₁)² + (z₂ − z₁)²)
This is the Pythagorean theorem: the horizontal and vertical differences are the two legs of a right triangle, and the distance is the hypotenuse. In 3D the theorem is applied twice. See the Pythagorean theorem calculator.
Worked examples
Example 1: (0, 0) to (3, 4)
Differences: 3 and 4
d = √(9 + 16) = √25 = 5
Example 2: (−2, 1) to (5, −3)
Δx = 5 − (−2) = 7; Δy = −3 − 1 = −4
d = √(49 + 16) = √65 = 8.062258
Squaring removes the signs, so the order of the points doesn't matter.
Example 3: 3D, (1, 2, 3) to (4, 6, 15)
Δx = 3, Δy = 4, Δz = 12
d = √(9 + 16 + 144) = √169 = 13 (the calculator shows 13.000000)
Related measurements
Midpoint: ((x₁ + x₂) ÷ 2, (y₁ + y₂) ÷ 2). For Example 2: (1.5, −1).
Slope: (y₂ − y₁) ÷ (x₂ − x₁). For Example 2: −4 ÷ 7. See the slope calculator.
Manhattan (taxicab) distance: |Δx| + |Δy|, the distance along a grid of streets: 11 for Example 2.
Distance on the Earth's surface
Coordinates in latitude and longitude lie on a sphere, so the flat formula doesn't apply. The haversine formula gives the great-circle distance:
a = sin²(Δφ/2) + cos φ₁ × cos φ₂ × sin²(Δλ/2)
d = 2R × arcsin(√a)
where φ is latitude, λ is longitude (in radians) and R is the Earth's mean radius (about 6,371 km). London (51.5074° N, 0.1278° W) to New York (40.7128° N, 74.0060° W) comes out at about 5,570 km (3,461 miles). This calculator doesn't yet accept latitude and longitude; the formula above lets you do it by hand.
Understanding your results
Units: the distance is in whatever unit the coordinates use (metres, feet, grid squares).
Straight line only. Real travel routes are longer.
Six decimal places let you keep precision for chained calculations; round for reporting.
Uses
Geometry and coordinate homework.
Computer graphics and games (collision detection, nearest object).
Data science (k-nearest neighbours, clustering) where each feature is a dimension.
Mapping and CAD measurements on a projected (flat) grid.
Tips and common mistakes
Forgetting to square negative differences. (−4)² = 16.
Adding before squaring. Square each difference first, then add.
Using degrees of latitude and longitude as x and y for long distances.
Mixing units between axes.
Notes for US, Canada and UK readers
The distance formula is taught as part of coordinate geometry in US Algebra and Geometry, Canadian Grade 10 math and UK GCSE Higher. UK papers often ask for an answer "in surd form", such as √52 = 2√13, rather than a decimal. Map distances need care: this formula is for a flat grid. For latitude and longitude, the curvature of the Earth matters over long distances.
Check: (−2, 5) to (4, −3) is √(6² + 8²) = 10 units, with midpoint (1, 1).
Frequently asked questions
What is the distance formula?
d = √((x₂ − x₁)² + (y₂ − y₁)²).
Does the order of points matter?
No; the differences are squared.
How do I find 3D distance?
Add the squared z difference inside the square root.
Can this calculate distance between cities?
Not directly; use the haversine formula with latitude and longitude.
What's the distance from the origin to (x, y)?
√(x² + y²).
Why are there six decimals?
To avoid rounding errors in follow-up calculations.
Sources
1. Khan Academy: "Distance formula" (accessed 14 Oct 2026). https://www.khanacademy.org/math/geometry/hs-geo-analytic-geometry/hs-geo-distance-and-midpoints/a/distance-formula
2. NOAA National Geodetic Survey: "Inverse and forward geodetic computations" (accessed 14 Oct 2026). https://geodesy.noaa.gov/TOOLS/Inv_Fwd/Inv_Fwd.html
3. FigSumo methodology.
