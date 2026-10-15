---
url: /time-card-calculator
title: "Time Card Calculator with Breaks and Overtime | FigSumo"
description: "Total weekly hours from clock-in and clock-out times with unpaid breaks, and calculate regular and overtime pay."
h1: "Time Card Calculator"
country: global
status: keep
body_words: 652 (minimum 600)
verify_flags: 0
updated: 2026-10-15
source: FigSumo-All-Page-Content.docx
---

H1: Time Card Calculator
This calculator turns a clock-in time, a clock-out time and an unpaid break into the hours you actually worked, both as a decimal (for payroll) and in hours and minutes. It handles overnight shifts that finish after midnight.
How to use this calculator
1. Clock in (HH:MM): 24-hour format (default 09:00).
2. Clock out (HH:MM): default 17:30. If it's earlier than clock-in, the shift is treated as ending the next day.
3. Unpaid break (min): default 30.
Results: hours worked (decimal, two places) and time on clock (hours and minutes, after the break).
The formula
minutes worked = clock out − clock in (+ 1,440 if past midnight) − break
decimal hours = minutes worked ÷ 60
Worked examples
Example 1: the default day
09:00 to 17:30 is 8 h 30 min, minus a 30-minute break = 8 h 0 min = 8.00 hours. At $18.50 an hour, that's $148.00.
Example 2: a night shift
22:00 to 06:15 with a 45-minute break: 8 h 15 min − 45 min = 7 h 30 min (7.50 hours).
Example 3: a week with overtime (US)
Daily totals of 8, 8, 8.5, 9.25 and 8.75 hours make 42.50 hours. Under the FLSA, non-exempt employees get time and a half after 40 hours: 2.50 overtime hours. At $20/hour: 40 × $20 + 2.50 × $30 = $875.00. (The calculator handles one shift at a time; add days together for the week.)
Breaks and overtime rules
United States
Federal law (FLSA) doesn't require meal breaks, but short breaks of 5–20 minutes that an employer allows must be paid. Bona fide meal periods (usually 30 minutes or more) where you're fully relieved of duty can be unpaid.
Overtime: 1.5× the regular rate for hours over 40 in a workweek. Some states, including California, also require daily overtime (over 8 hours) and mandate meal and rest breaks.
Canada
Rules are set by each province (and federally for federally regulated industries). Most require a 30-minute break after about 5 hours, often unpaid.
Overtime thresholds are commonly 8 hours a day and/or 40 or 44 hours a week, at 1.5× [VERIFY province].
United Kingdom
Workers over 18 are entitled to a 20-minute rest break if they work more than 6 hours a day; it doesn't have to be paid.
There's no statutory overtime rate, but average pay for all hours must meet the National Minimum Wage / National Living Wage.
Rounding
US employers may round clock times to the nearest 5, 6 or 15 minutes if it averages out over time and doesn't systematically underpay. Record exact times where you can.
Understanding your results
Decimal hours are what payroll multiplies by your rate; 8 h 15 min is 8.25, not 8.15. See the hours calculator.
Gross pay only: for take-home pay after tax, use the US paycheck calculator or the UK take-home pay calculator.
Breaks longer than the shift produce an error.
Tips and common mistakes
Using 12-hour times without am/pm. Enter 17:30, not 5:30.
Deducting paid breaks. Only subtract unpaid time.
Missing overnight shifts on paper timesheets; the calculator adds a day automatically.
Rounding each shift to the nearest hour.
Frequently asked questions
How do I calculate hours worked?
Clock-out minus clock-in, minus unpaid breaks.
How do I calculate an overnight shift?
Enter the times as normal; if clock-out is earlier, the calculator adds 24 hours.
What is 8 hours 15 minutes in decimal?
8.25.
Are breaks paid?
It depends on the jurisdiction and the length of the break.
When does overtime start in the US?
After 40 hours in a workweek under federal law.
Can I calculate a whole week?
Calculate each day and add the decimal hours.
Related calculators
Hours Calculator
Time Duration Calculator
Time Calculator
Salary Calculator
US Paycheck Calculator (2026)
UK Take-Home Pay Calculator (2026/27)
Sources
1. US Department of Labor: "Breaks and meal periods" (accessed 14 Oct 2026). https://www.dol.gov/general/topic/workhours/breaks
2. US Department of Labor: "Overtime pay" (accessed 14 Oct 2026). https://www.dol.gov/agencies/whd/overtime
3. Government of Canada: "Hours of work — Canada Labour Code" (accessed 14 Oct 2026). https://www.canada.ca/en/services/jobs/workplace/federal-labour-standards/work-hours.html
4. GOV.UK: "Rest breaks at work" (accessed 14 Oct 2026). https://www.gov.uk/rest-breaks-work
5. FigSumo methodology.
