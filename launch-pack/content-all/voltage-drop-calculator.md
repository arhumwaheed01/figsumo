---
url: /voltage-drop-calculator
title: "Voltage Drop Calculator for Copper and Aluminium Wire | FigSumo"
description: "Estimate voltage drop from wire size, length, current and material, for single-phase and three-phase circuits. Confirm against local electrical code."
h1: "Voltage Drop Calculator"
country: global
status: keep
body_words: 718 (minimum 600)
verify_flags: 0
updated: 2026-10-15
source: FigSumo-All-Page-Content.docx
---

H1: Voltage Drop Calculator
Every wire has some resistance, so the voltage at the far end of a cable is a little lower than at the panel or battery. Too much drop makes motors run hot, lights dim and electronics misbehave. This calculator estimates the voltage drop on a two-wire circuit from the current, cable length, wire resistance and system voltage.
How to use this calculator
1. Current (A): the load current (default 15).
2. One-way wire length (ft): distance from source to load, not the round trip (default 100).
3. Wire resistance (Ω / 1,000 ft): from a wire table for your conductor size and material (default 1.02, roughly 10 AWG copper at 20 °C).
4. System voltage (V): default 120.
Results: voltage drop, drop percentage and voltage at load.
The formula
voltage drop = 2 × length × (resistance per 1,000 ft ÷ 1,000) × current
drop % = voltage drop ÷ system voltage × 100
The factor 2 accounts for current flowing out and back. For balanced three-phase circuits, use √3 (1.732) instead of 2.
Worked examples
Example 1: the default
2 × 100 × 0.00102 × 15 = 3.06 V, 2.55%, leaving 116.94 V at the load.
Example 2: a smaller wire
Same run with 12 AWG copper (about 1.588 Ω/1,000 ft at 20 °C): 4.76 V (3.97%), over the 3% guideline.
Example 3: a 240 V run
30 A over 150 ft with 1.02 Ω/1,000 ft at 240 V: 9.18 V (3.82%).
Example 4: a 12 V DC system
A 10 A load 20 ft from a battery on wire of 1.0 Ω/1,000 ft drops 0.40 V, or 3.33%. Low-voltage systems need much thicker wire for the same percentage drop.
Example 5: the UK (mV/A/m)
UK cable tables give voltage drop in millivolts per amp per metre (for the circuit, both conductors). 2.5 mm² twin and earth is about 18 mV/A/m [VERIFY in BS 7671 Appendix 4]. At 16 A over 25 m: 18 × 16 × 25 ÷ 1,000 = 7.2 V (3.13%) of 230 V.
Example 6: maximum resistance for 3%
For 15 A over 100 ft at 120 V and a 3% limit, the wire's resistance must be at most 0.03 × 120 ÷ (2 × 0.1 × 15) = 1.200 Ω per 1,000 ft.
Wire resistance (copper, approx. at 20 °C)
AWG
Ω per 1,000 ft
14
2.525
12
1.588
10
0.999
8
0.628
6
0.395
Resistance rises about 0.4% per °C, so wire at 75 °C has about 20% more resistance. The NEC's Chapter 9, Table 8 lists values at 75 °C. Aluminium has about 1.6 times the resistance of copper of the same size.
Recommended limits
US (NEC): informational notes recommend no more than 3% on a branch circuit and 5% total for feeder plus branch. These are recommendations, not mandatory rules, though local codes may adopt them.
Canada (CEC): sets voltage drop limits, generally 3% for branch circuits and 5% overall [VERIFY current edition].
UK (BS 7671): 3% for lighting and 5% for other uses on circuits supplied from the public network.
Understanding your results
Use the one-way distance; the calculator doubles it.
AC reactance in large cables adds a little to the drop; this simple method uses resistance only.
Continuous loads and motor starting currents can cause larger momentary drops.
Safety
Voltage drop is one design check; conductor ampacity, overcurrent protection and installation method also decide wire size. Mains wiring should be designed and installed by a qualified electrician to the NEC, CEC or BS 7671.
Tips and common mistakes
Entering the round-trip length (doubles the result).
Using resistance per foot instead of per 1,000 ft.
Ignoring temperature on long, heavily loaded runs.
Frequently asked questions
What is an acceptable voltage drop?
3% on a branch circuit and 5% total are common guidelines.
How do I reduce voltage drop?
Use thicker wire, shorten the run or raise the system voltage.
Why multiply by 2?
Current flows out on one conductor and back on the other.
What about three-phase?
Use 1.732 in place of 2.
Where do I find wire resistance?
Manufacturer data or NEC Chapter 9, Table 8.
Does it work for DC?
Yes, for two-wire DC circuits.
Related calculators
Ohm's Law Calculator
Resistor Color Code Calculator
Electricity Cost Calculator
Unit Converter
Percentage Calculator
Horsepower Calculator
Sources
1. NFPA 70: "National Electrical Code", 210.19 and Chapter 9 Table 8 (accessed 14 Oct 2026). https://www.nfpa.org/codes-and-standards/nfpa-70-standard-development/70
2. IET: "BS 7671 Requirements for Electrical Installations" (accessed 14 Oct 2026). https://electrical.theiet.org/bs-7671/
3. CSA Group: "Canadian Electrical Code, Part I" (accessed 14 Oct 2026). https://www.csagroup.org/
4. FigSumo methodology.
