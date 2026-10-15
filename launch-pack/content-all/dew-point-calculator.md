---
url: /dew-point-calculator
title: "Dew Point Calculator from Temperature & Humidity | FigSumo"
description: "Calculate dew point from air temperature and relative humidity, or humidity from dew point, using the Magnus approximation."
h1: "Dew Point Calculator"
country: global
status: keep
body_words: 658 (minimum 600)
verify_flags: 0
updated: 2026-10-15
source: FigSumo-All-Page-Content.docx
---

H1: Dew Point Calculator
The dew point is the temperature air must cool to before water vapour starts condensing into dew, fog or condensation on a window. Unlike relative humidity, which changes as the air warms and cools during the day, the dew point tracks the actual amount of moisture in the air, which makes it the better guide to how muggy it feels. Enter the air temperature and relative humidity to find it.
How to use this calculator
1. Air temperature (°F): default 75.
2. Relative humidity (%): between 1 and 100 (default 55).
Result: the dew point in °F, to one decimal place.
The formula
The calculator uses the Magnus approximation, accurate to a few tenths of a degree for everyday temperatures:
γ = (a × T) ÷ (b + T) + ln(RH ÷ 100)
Td = (b × γ) ÷ (a − γ)
T: air temperature in °C (the calculator converts from °F first)
RH: relative humidity in %
a = 17.27, b = 237.7 °C: Magnus constants
Td: dew point in °C, converted back to °F
Worked examples
Example 1: the default
75 °F with 55% humidity → dew point 57.7 °F: comfortable.
Example 2: in Celsius, step by step
24 °C at 60% RH:
(17.27 × 24) ÷ (237.7 + 24) = 1.5838
ln(0.60) = −0.5108, so γ = 1.0730
Td = 237.7 × 1.0730 ÷ (17.27 − 1.0730) = 15.7 °C
Example 3: a sticky summer day
90 °F at 70% → 78.9 °F: oppressive.
Example 4: dry indoor air
68 °F at 40% → 42.8 °F. A window colder than that will fog up.
Example 5: saturated air
At 100% humidity, the dew point equals the air temperature (60 °F → 60.0 °F), which is when fog forms.
How dew point feels
Dew point (°F)
Dew point (°C)
Comfort
Below 50
Below 10
Dry, comfortable
50–60
10–16
Comfortable
60–65
16–18
Noticeably humid
65–70
18–21
Muggy, uncomfortable
Above 70
Above 21
Oppressive
These bands are widely used by US forecasters; perceptions vary by climate [VERIFY regional guidance].
Why it matters
Condensation and mould: surfaces colder than the dew point get wet. Keeping indoor humidity at roughly 30–50% (US EPA guidance) limits condensation on windows and walls.
Frost: when the dew point is below freezing, moisture forms frost instead of dew.
Painting and coatings: many paints shouldn't be applied unless the surface is several degrees above the dew point (often 5 °F / 3 °C); check the product sheet.
Weather forecasting: fog, cloud base and thunderstorm potential depend on dew point.
Heat stress: a high dew point stops sweat from evaporating; see the heat index calculator.
Understanding your results
The dew point can't be higher than the air temperature.
Relative humidity alone can mislead: 90% at 40 °F is dry air in absolute terms, while 50% at 95 °F is very humid.
Magnus constants vary slightly by source; results can differ by a few tenths from other tools.
Tips and common mistakes
Entering humidity as a decimal (use 55, not 0.55).
Entering °C in the °F box; convert first with the unit converter.
Confusing dew point with wet-bulb temperature, which lies between the dew point and the air temperature.
Frequently asked questions
What is a comfortable dew point?
Below about 60 °F (16 °C).
Can dew point be higher than temperature?
No. At 100% humidity they're equal.
What's the difference between dew point and humidity?
Dew point measures actual moisture; relative humidity is moisture relative to the maximum the air can hold at that temperature.
Why do my windows get condensation?
The glass is colder than the room's dew point.
What dew point causes fog?
Fog forms when air cools to its dew point.
Can I use Celsius?
Not yet; convert to °F first, or use the formula with °C directly.
Related calculators
Heat Index Calculator
Wind Chill Calculator
BTU Calculator
Unit Converter
Density Calculator
Electricity Cost Calculator
Sources
1. National Weather Service: "Dew point vs humidity" (accessed 14 Oct 2026). https://www.weather.gov/arx/why_dewpoint_vs_humidity
2. US EPA: "A brief guide to mold, moisture and your home" (accessed 14 Oct 2026). https://www.epa.gov/mold/brief-guide-mold-moisture-and-your-home
3. Alduchov, O. A. and Eskridge, R. E. (1996): "Improved Magnus form approximation of saturation vapor pressure", Journal of Applied Meteorology (accessed 14 Oct 2026). https://doi.org/10.1175/1520-0450(1996)035<0601:IMFAOS>2.0.CO;2
4. FigSumo methodology.
