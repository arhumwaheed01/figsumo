---
url: /due-date-calculator
h1: Due Date Calculator
title: "Due Date Calculator: Estimate Your Baby's Due Date | FigSumo"
description: "Estimate your due date from your last period (any cycle length), conception date or IVF transfer date, and see weeks pregnant today and key milestones."
updated: 2026-10-14
country: global (date format follows locale: MM/DD/YYYY US, DD/MM/YYYY UK/CA option)
calculatorRequirements: "DEV-TASKS T-210 (defaults: today − 8 weeks), T-420 (methods: LMP + cycle length, conception date, IVF transfer day 3/5/6, ultrasound-provided date; current gestational age; milestone list 12w/20w/28w/37w/40w/42w; locale date formats; no storage of dates server-side — T-229)"
related: [/pregnancy-week-calculator, /conception-calculator, /ovulation-calculator, /pregnancy-weight-gain-calculator, /period-calculator]
---

This calculator gives an estimated due date (EDD) from the information you have: the first day of your last menstrual period (LMP), a known conception date, or an IVF embryo transfer date. It also shows how many weeks pregnant you are today and the dates of common milestones. A due date is an estimate. Your midwife or doctor may confirm or adjust it after an early ultrasound scan, and that scan date should then take priority.

## How to use this calculator

1. Choose a **method**:
   - **Last period (default):** the first day of your last period, plus your usual cycle length (28 days if you're not sure).
   - **Conception date:** if you know it, for example from ovulation tracking.
   - **IVF transfer:** the transfer date and the embryo's age at transfer (day 3, 5 or 6).
   - **Ultrasound:** if a scan has given you a date, enter it to see your milestones.
2. Results: the estimated due date, your gestational age today (weeks + days), and a milestone timeline.

Dates you enter are processed in your browser and are not sent to our servers.

## The formula

Pregnancy is conventionally counted from the first day of the LMP, and a typical estimate is **280 days (40 weeks)** from that date:

```
EDD (LMP method)        = LMP + 280 days + (cycle length − 28 days)
EDD (conception method) = conception date + 266 days
EDD (IVF)               = transfer date + 266 days − embryo age in days
                          (day-5 embryo: + 261 days; day-3: + 263 days; day-6: + 260 days)
Gestational age today   = today − LMP (or the equivalent LMP for other methods), in weeks and days
```

The cycle adjustment assumes ovulation happens about 14 days before the next period. In a longer cycle, ovulation and conception are later, so the due date moves later by the same number of days.

## Worked examples

**Example 1: last period, 28-day cycle.**
LMP: **2 March 2026**.
- 2 March 2026 + 280 days = **7 December 2026**
- Gestational age on 14 October 2026: 226 days = **32 weeks 2 days**
- Milestones: 12 weeks on 25 May 2026; 28 weeks on 14 September 2026; 37 weeks on 16 November 2026; 42 weeks on 21 December 2026

**Example 2: other methods give consistent results.**
- **Longer cycle:** the same LMP with a 32-day cycle → 280 + 4 = 284 days → **11 December 2026**
- **Conception date:** 16 March 2026 + 266 days → **7 December 2026**, matching Example 1, as you'd expect for conception on day 14 of a 28-day cycle
- **IVF:** a day-5 embryo transferred on 20 March 2026 → 20 March + 261 days → **6 December 2026**

## Understanding your results

- **Estimated, not exact:** the NHS notes that pregnancy normally lasts from 37 to 42 weeks from the first day of the last period. Most babies are born within that window, not on the due date itself.
- **Ultrasound dating:** ACOG states that early ultrasound, in the first trimester, is the most accurate way to establish or confirm gestational age. If your scan date differs from the LMP estimate, your care team will tell you which date to use.
- **Irregular cycles:** if your cycle length varies a lot, an LMP-based estimate is less reliable. A dating scan matters more.
- **Gestational age vs weeks since conception:** gestational age counts from the LMP, about two weeks before conception. This is the standard convention, so "8 weeks pregnant" means about 6 weeks after conception.

## Country notes

- **UK:** the NHS offers a dating scan at around 12 weeks, which can more accurately estimate how far along you are.
- **US:** ACOG Committee Opinion 700 sets out how clinicians estimate and document the due date. A pregnancy without an ultrasound that confirms or revises the date before 22 weeks is considered suboptimally dated.
- **Canada:** follow your provincial prenatal care provider. Most offer an early dating ultrasound (VERIFY a Canadian source, e.g. SOGC, before publishing).
- **Date formats:** US users see MM/DD/YYYY by default; UK and Canadian users can choose DD/MM/YYYY.

## Frequently asked questions

### How is the due date calculated?
Most commonly, by adding 280 days (40 weeks) to the first day of your last menstrual period, adjusted if your cycle is longer or shorter than 28 days.

### How accurate is my due date?
It's an estimate. Pregnancy normally lasts 37 to 42 weeks, so birth within a few weeks either side is normal. An early ultrasound gives a more accurate dating than the LMP alone.

### What if I don't know the date of my last period?
Use the conception date if you know it. Otherwise, your midwife or doctor can date the pregnancy by ultrasound.

### Why does a longer cycle push the due date later?
Ovulation usually occurs about 14 days before the next period. With a 32-day cycle, that's around day 18 instead of day 14, so conception, and the due date, are about four days later.

### How is the due date calculated after IVF?
From the transfer date and the embryo's age. A day-5 embryo is treated as if conception happened 5 days before transfer, so the due date is 261 days after the transfer.

### Can my due date change?
Your care team may revise it once, typically after the first ultrasound, if the measurements differ enough from the LMP estimate. Later changes are uncommon.

### Is this calculator a substitute for prenatal care?
No. If you think you're pregnant, contact your GP, midwife, doctor or local health service for care and advice.

## Sources
1. American College of Obstetricians and Gynecologists, Committee Opinion No. 700, "Methods for Estimating the Due Date" (May 2017). https://www.acog.org/clinical/clinical-guidance/committee-opinion/articles/2017/05/methods-for-estimating-the-due-date (accessed 14 Oct 2026)
2. NHS, "Pregnancy due date calculator." https://www.nhs.uk/pregnancy/finding-out/due-date-calculator/ (accessed 14 Oct 2026)

## Disclaimer
This calculator provides an estimate for general information only. It is not medical advice. Always follow the guidance of your midwife, doctor or healthcare provider about your pregnancy.
