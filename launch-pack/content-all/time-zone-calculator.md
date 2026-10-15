---
url: /time-zone-calculator
title: "Time Zone Converter: Compare Cities | FigSumo"
description: "Convert a time between time zones and cities with daylight saving handled automatically, using the IANA time zone database."
h1: "Time Zone Converter"
country: global
status: keep
body_words: 628 (minimum 600)
verify_flags: 0
updated: 2026-10-15
source: FigSumo-All-Page-Content.docx
---

H1: Time Zone Converter
Scheduling a call between Toronto and London, or checking when a flight lands in Vancouver? This calculator converts a time from one UTC offset to another and shows the equivalent UTC (Coordinated Universal Time).
How to use this calculator
1. Local time (HH:MM): 24-hour format (default 14:00).
2. From UTC offset (hours): the offset of the starting location (default −5).
3. To UTC offset (hours): the offset of the destination (default +1).
Fractional offsets work: enter −3.5 for Newfoundland or 5.5 for India.
Results: converted time and UTC time.
How it works
UTC = local time − from offset
converted time = UTC + to offset
Results wrap around midnight. Check whether the converted time falls on the previous or next day.
Worked examples
Example 1: the default
14:00 at UTC−5 → UTC 19:00 → 20:00 at UTC+1. That's 2 pm in New York (winter) and 8 pm in Paris (winter).
Example 2: crossing midnight backwards
09:00 in Pakistan (UTC+5) → UTC 04:00 → 00:00 in New York during summer time (UTC−4), on the previous day.
Example 3: Toronto to London in summer
09:00 in Toronto (EDT, UTC−4) → UTC 13:00 → 14:00 in London (BST, UTC+1). In winter, enter −5 and 0: the gap is still five hours, except during the weeks when only one side has changed its clocks.
Example 4: half-hour zones
Noon in St John's, Newfoundland (UTC−3:30 standard) → 16:30 in Paris (UTC+1).
Common UTC offsets
Zone
Standard
Daylight (summer)
Pacific (Vancouver, LA)
−8
−7
Mountain (Calgary, Denver)
−7
−6 (Arizona stays −7)
Central (Winnipeg, Chicago)
−6
−5 (most of Saskatchewan stays −6)
Eastern (Toronto, New York)
−5
−4
Atlantic (Halifax)
−4
−3
Newfoundland
−3.5
−2.5
UK (GMT / BST)
0
+1
Central Europe
+1
+2
Pakistan
+5
no DST
India
+5.5
no DST
Daylight saving time
Offsets change during summer time, and countries switch on different dates:
US and Canada: second Sunday in March to first Sunday in November.
UK and EU: last Sunday in March to last Sunday in October.
For a few weeks each spring and autumn, the gap between North America and Europe is an hour shorter than usual. This calculator uses the offsets you enter, so pick the ones in force on the date in question.
UTC vs GMT
UTC is the international time standard, kept by atomic clocks. GMT is a time zone (the UK in winter) that's equal to UTC for everyday purposes. Aviation and IT systems use UTC (sometimes written "Z" or "Zulu").
Understanding your results
Day changes aren't labelled yet. If the converted time is earlier than the original when moving east, or later when moving west, it's on a different day.
For flight durations, convert departure and arrival to the same zone first, then use the time duration calculator.
Tips and common mistakes
Using standard offsets in summer.
Getting the sign wrong: west of Greenwich is negative.
Forgetting half-hour and 45-minute zones (Nepal is +5:45).
Scheduling across a DST changeover week.
Frequently asked questions
How do I convert time zones?
Subtract the source offset to get UTC, then add the destination offset.
What's the UTC offset for Eastern Time?
−5 in winter, −4 in summer.
Is GMT the same as UTC?
Effectively, for everyday use.
Does the calculator handle daylight saving?
Enter the offset in force on the date; it doesn't adjust automatically.
What time is it in London when it's noon in Vancouver?
20:00 in winter (−8 → 0) and 20:00 in summer (−7 → +1).
Can I enter half-hour offsets?
Yes, as decimals such as 5.5.
Related calculators
Time Duration Calculator
Date Calculator
Time Calculator
Day of the Week Calculator
Hours Calculator
Day Counter
Sources
1. NIST: "Time zones and UTC" (accessed 14 Oct 2026). https://www.nist.gov/pml/time-and-frequency-division/popular-links/time-zones
2. US Department of Transportation: "Daylight saving time" (accessed 14 Oct 2026). https://www.transportation.gov/regulations/daylight-saving-time
3. GOV.UK: "When do the clocks change?" (accessed 14 Oct 2026). https://www.gov.uk/when-do-the-clocks-change
4. IANA: "Time Zone Database" (accessed 14 Oct 2026). https://www.iana.org/time-zones
5. FigSumo methodology.
