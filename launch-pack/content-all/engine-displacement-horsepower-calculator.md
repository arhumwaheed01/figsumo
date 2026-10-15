---
url: /engine-displacement-horsepower-calculator
title: "Engine Displacement and Horsepower Estimator | FigSumo"
description: "Calculate engine displacement from bore, stroke and cylinders, and estimate airflow-based horsepower at a given RPM and volumetric efficiency."
h1: "Engine Displacement & Horsepower Estimator"
country: global
status: rename (301)
body_words: 632 (minimum 600)
verify_flags: 0
updated: 2026-10-15
source: FigSumo-All-Page-Content.docx
---

H1: Engine Displacement & Horsepower Estimator
An engine's displacement is the total volume its pistons sweep in one revolution of the crankshaft. Together with engine speed and how efficiently the engine fills and burns that volume, it sets how much power is possible. This calculator works out displacement from bore, stroke and number of cylinders, and estimates horsepower.
How to use this calculator
1. Bore (in): cylinder diameter (default 3.5).
2. Stroke (in): distance the piston travels (default 3.2).
3. Cylinders: default 4.
4. RPM: engine speed for the power estimate (default 6,000).
5. Volumetric efficiency (%): how fully the cylinders fill with air (default 85).
Results: estimated horsepower and displacement (L).
Displacement formula
displacement (in³) = π ÷ 4 × bore² × stroke × cylinders
litres = in³ × 0.016387
cc = in³ × 16.387
For metric dimensions in millimetres, displacement (cc) = π ÷ 4 × bore² × stroke × cylinders ÷ 1,000.
Horsepower from displacement
Power depends on how much pressure combustion produces on average over each cycle, the brake mean effective pressure (BMEP):
hp = BMEP (psi) × displacement (in³) × RPM ÷ 792,000      (four-stroke)
The 792,000 combines 33,000 ft·lbf/min per hp, 12 in per ft and two revolutions per power stroke. Typical BMEP for a naturally aspirated petrol engine at peak power is around 130–190 psi; turbocharged engines reach 250 psi or more [VERIFY typical ranges].
Airflow: volumetric efficiency feeds the air demand: CFM = in³ × RPM × VE ÷ 3,456.
Worked examples
Example 1: the default four-cylinder
One cylinder: π ÷ 4 × 3.5² × 3.2 = 30.79 in³
× 4 = 123.2 in³ = 2.02 L (2,018 cc)
At 6,000 rpm with BMEP 150 psi: 150 × 123.2 × 6,000 ÷ 792,000 ≈ 140 hp
With a high-performance BMEP of 190 psi: about 177 hp
Airflow at 85% VE: about 182 CFM
Example 2: a classic V8
Bore 4.00 in, stroke 3.48 in, 8 cylinders → 349.8 in³ (5.73 L): the well-known "350" small-block.
Example 3: metric "square" engine
Bore and stroke both 86 mm, 4 cylinders: π ÷ 4 × 8.6² × 8.6 × 4 = 1,998 cc (about 2.0 L).
Bore, stroke and character
Oversquare (bore > stroke): revs higher, common in performance engines.
Undersquare (stroke > bore): more low-down torque, common in diesels.
Square: bore equals stroke.
Understanding your results
Displacement is exact from the dimensions; horsepower is an estimate that depends heavily on BMEP.
Crank vs wheel horsepower: manufacturers quote crank (brake) power; drivetrain losses of roughly 10–20% reduce power at the wheels.
Torque and horsepower are linked: hp = torque (lb·ft) × RPM ÷ 5,252. See the horsepower calculator.
Gross vs net: US ratings before 1972 were often gross (without accessories), inflating figures compared with today's SAE net ratings.
Tips and common mistakes
Mixing inches and millimetres.
Using the radius for bore.
Counting a V8 as 4 cylinders per bank without multiplying.
Assuming peak power at redline. Peak often comes a little below it.
Notes for US, Canada and UK users
US enthusiasts still describe classic V8s by cubic inches, while current US, Canadian and UK brochures give litres or cubic centimetres. In the UK, engine size has a direct cost for older cars: vehicle excise duty for cars registered before 1 March 2001 is charged by engine size, with a lower rate for engines up to 1,549 cc.
Frequently asked questions
How do I calculate engine displacement?
π/4 × bore² × stroke × number of cylinders.
How many cc is a 2.0 L engine?
About 2,000 cc.
How many cubic inches is 5.7 L?
About 350 in³ (5.7 ÷ 0.016387).
Can you calculate horsepower from displacement alone?
Not exactly; you also need RPM and BMEP (or a dyno test).
What is volumetric efficiency?
How much air the cylinders actually take in compared with their swept volume.
What is BMEP?
The average effective pressure on the piston over a cycle, a measure of how hard the engine works.
Related calculators
Horsepower Calculator
Fuel Economy Calculator
Tire Size Calculator
Unit Converter
Speed Calculator
Volume Calculator
Sources
1. SAE International: "J1349 Engine Power Test Code" (accessed 14 Oct 2026). https://www.sae.org/standards/content/j1349_201109/
2. Heywood, J. B., "Internal Combustion Engine Fundamentals", 2nd ed. (McGraw-Hill, 2018), chapter 2.
3. FigSumo methodology.
