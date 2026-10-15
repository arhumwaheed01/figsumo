---
url: /heat-index-calculator
title: "Heat Index Calculator (Feels-Like Temperature) | FigSumo"
description: "Calculate the heat index from temperature and relative humidity with the NWS Rothfusz regression, in °F or °C, with risk levels."
h1: "Heat Index Calculator"
country: global
status: keep
body_words: 618 (minimum 600)
verify_flags: 0
updated: 2026-10-15
source: FigSumo-All-Page-Content.docx
---

H1: Heat Index Calculator
The heat index, or "feels like" temperature in hot weather, combines air temperature and humidity to estimate how hot it feels to the human body. When humidity is high, sweat evaporates more slowly, so the body cools less efficiently and heat illness becomes more likely. Enter the temperature and relative humidity to get the heat index.
How to use this calculator
1. Air temperature (°F): measured in the shade (default 92).
2. Relative humidity (%): 0 to 100 (default 65).
Result: the heat index in °F. Below 80 °F the calculator returns the air temperature, because humidity has little effect on how hot it feels at those temperatures.
The formula
The US National Weather Service uses the Rothfusz regression, fitted to Steadman's apparent-temperature tables:
HI = −42.379 + 2.04901523T + 10.14333127R − 0.22475541TR
     − 0.00683783T² − 0.05481717R² + 0.00122874T²R
     + 0.00085282TR² − 0.00000199T²R²
T: air temperature (°F)
R: relative humidity (%)
The NWS applies small corrections at very low or very high humidity; this calculator doesn't yet, so results in those conditions can differ by a degree or two.
Worked examples
Example 1: the default
92 °F at 65% humidity → 108.3 °F (42.4 °C): "Danger" level.
Example 2: a warm, moderate day
85 °F at 50% → 86.5 °F: slightly above the air temperature.
Example 3: dry heat
100 °F at 40% → 109.3 °F.
Example 4: tropical humidity
95 °F at 75% → 128.0 °F: "Extreme danger".
What the numbers mean
NWS risk bands for prolonged exposure or strenuous activity:
Heat index (°F)
Level
Possible effects
80–90
Caution
Fatigue possible
90–103
Extreme caution
Heat cramps and heat exhaustion possible
103–124
Danger
Heat cramps or exhaustion likely; heat stroke possible
125+
Extreme danger
Heat stroke highly likely
The heat index is calculated for shade. Direct sunshine can add up to about 15 °F to the felt temperature.
Canada and the UK
Canada uses the humidex, based on temperature and dew point and reported in °C. A humidex of 40 °C+ is classed as "great discomfort" by Environment and Climate Change Canada.
The UK doesn't use a heat index for public warnings; the UK Health Security Agency and Met Office issue Heat-Health Alerts based on forecast temperatures.
To convert, 33 °C = 91.4 °F; use the unit converter.
Staying safe in heat
Drink water regularly; don't wait until you're thirsty.
Limit strenuous activity during the hottest hours.
Wear light, loose clothing and rest in shade or air conditioning.
Check on older people, young children and people with health conditions, who are most at risk.
Never leave children or pets in parked cars.
Heat stroke (confusion, hot skin, collapse) is a medical emergency: call 911 in the US or Canada, or 999 in the UK.
Tips and common mistakes
Using a sun-exposed thermometer, which reads high.
Entering humidity as a decimal (use 65, not 0.65).
Confusing heat index with dew point. Dew point measures moisture; see the dew point calculator.
Frequently asked questions
What is the heat index?
The apparent temperature combining air temperature and humidity.
When is the heat index dangerous?
From about 103 °F, the NWS "Danger" threshold.
Why does humidity make it feel hotter?
Sweat evaporates less, so the body cools less.
Does the heat index apply in the sun?
It's calculated for shade; sun can add up to about 15 °F.
What is the humidex?
Canada's equivalent, reported in °C.
Why does it show the air temperature below 80 °F?
The formula isn't intended for cooler conditions.
Related calculators
Dew Point Calculator
Wind Chill Calculator
BTU Calculator
Unit Converter
Calorie Calculator
Sleep Calculator
Sources
1. National Weather Service: "Heat index equation" (accessed 14 Oct 2026). https://www.wpc.ncep.noaa.gov/html/heatindex_equation.shtml
2. National Weather Service: "Heat safety: heat index" (accessed 14 Oct 2026). https://www.weather.gov/safety/heat-index
3. Environment and Climate Change Canada: "Humidex" glossary (accessed 14 Oct 2026). https://climate.weather.gc.ca/glossary_e.html
4. UK Health Security Agency: "Heat-Health Alerts" (accessed 14 Oct 2026). https://www.gov.uk/government/publications/heat-health-alert-guidance
5. FigSumo methodology.
