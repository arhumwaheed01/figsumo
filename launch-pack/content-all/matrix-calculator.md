---
url: /matrix-calculator
title: "Matrix Calculator: Multiply, Inverse, Determinant | FigSumo"
description: "Add, multiply, transpose and invert matrices and find determinants and rank for matrices up to 6x6, with results as fractions or decimals."
h1: "Matrix Calculator"
country: global
status: keep
body_words: 606 (minimum 600)
verify_flags: 0
updated: 2026-10-15
source: FigSumo-All-Page-Content.docx
---

H1: Matrix Calculator
A matrix is a rectangular grid of numbers arranged in rows and columns. Matrices are used to solve systems of equations, transform shapes in computer graphics, and organise data. This calculator works with 2×2 and 3×3 matrices: it finds the determinant of matrix A, or adds matrices A and B.
How to use this calculator
1. Matrix size: 2×2 or 3×3.
2. Operation: determinant of A, or A + B.
3. Matrix A rows: type each row as comma-separated numbers (for example, 1, 2). The row 3 field is used only for 3×3.
4. Matrix B rows: needed only for addition.
Result: det(A) or the matrix A + B, shown row by row separated by "|".
Determinant formulas
2×2:
|a b|
|c d|  = ad − bc
3×3 (cofactor expansion along the first row):
det = a(ei − fh) − b(di − fg) + c(dh − eg)
for rows (a, b, c), (d, e, f), (g, h, i)
Worked examples
Example 1: determinant of [[1, 2], [3, 4]]
det = 1 × 4 − 2 × 3 = −2
Example 2: adding two 2×2 matrices
[1 2]   [5 6]   [ 6  8]
[3 4] + [7 8] = [10 12]
Add entries in the same position. The calculator shows 6, 8 | 10, 12. Both matrices must be the same size.
Example 3: a 3×3 determinant
Rows (2, 0, 1), (1, 3, 2), (1, 1, 1):
2 × (3 × 1 − 2 × 1) − 0 × (1 × 1 − 2 × 1) + 1 × (1 × 1 − 3 × 1)
= 2 × 1 − 0 + 1 × (−2) = 0
A determinant of 0 means the matrix is singular: it has no inverse, and the rows are linearly dependent (here, row 1 = 3 × row 3 − row 2).
The calculator's default 3×3 A, rows (1, 2, 0), (3, 4, 0), (0, 0, 1), has determinant -2.
What the determinant tells you
Non-zero: the matrix is invertible, and a system of equations with this coefficient matrix has exactly one solution.
Zero: no unique solution (none or infinitely many).
Geometry: |det| is the factor by which the matrix scales area (2×2) or volume (3×3); a negative sign means orientation is flipped.
Other operations (by hand)
Subtraction: subtract matching entries.
Scalar multiplication: multiply every entry by the number.
Matrix multiplication: entry (i, j) of AB is row i of A dotted with column j of B. For the 2×2 examples, AB = [[1×5 + 2×7, 1×6 + 2×8], [3×5 + 4×7, 3×6 + 4×8]] = [[19, 22], [43, 50]]. Order matters: AB usually isn't BA.
Transpose: swap rows and columns.
2×2 inverse: (1 ÷ det) × [[d, −b], [−c, a]]. For [[1, 2], [3, 4]]: (1 ÷ −2) × [[4, −2], [−3, 1]] = [[−2, 1], [1.5, −0.5]].
Solving equations with determinants (Cramer's rule)
For x + 2y = 5 and 3x + 4y = 6: det = −2. Replace the x column with (5, 6): det = 5 × 4 − 2 × 6 = 8, so x = 8 ÷ −2 = −4. Replace the y column: det = 1 × 6 − 5 × 3 = −9, so y = 4.5. Check: −4 + 9 = 5 ✓.
Tips and common mistakes
Sign pattern in 3×3 expansion: +, −, + along the first row.
Adding matrices of different sizes isn't defined.
Multiplying entry by entry isn't standard matrix multiplication.
Typing rows with missing entries. Each row needs exactly 2 or 3 numbers.
Frequently asked questions
How do I find the determinant of a 2×2 matrix?
ad − bc.
What does a determinant of zero mean?
The matrix has no inverse.
Can this calculator multiply matrices?
Not yet; use the row-by-column rule above.
Can I use decimals or negatives?
Yes.
What sizes are supported?
2×2 and 3×3.
Is A + B the same as B + A?
Yes, addition is commutative (multiplication isn't).
Related calculators
Scientific Calculator
Quadratic Formula Calculator
Statistics Calculator
Distance Between Two Points Calculator
Fraction Calculator
Exponent Calculator
Sources
1. MIT OpenCourseWare: 18.06 Linear Algebra, "Properties of determinants" (accessed 14 Oct 2026). https://ocw.mit.edu/courses/18-06sc-linear-algebra-fall-2011/
2. Khan Academy: "Matrices" (accessed 14 Oct 2026). https://www.khanacademy.org/math/precalculus/x9e81a4f98389efdf:matrices
3. FigSumo methodology.
