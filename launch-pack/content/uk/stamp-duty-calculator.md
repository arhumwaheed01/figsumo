---
url: /uk/stamp-duty-calculator
h1: Stamp Duty Calculator (England & Northern Ireland)
title: "Stamp Duty Calculator 2026: SDLT for England & NI | FigSumo"
description: "Work out Stamp Duty Land Tax in England and NI, including first-time buyer relief, the 5% additional property surcharge and the 2% non-UK resident rate."
updated: 2026-10-14
country: UK (England & Northern Ireland)
taxYear: "Residential SDLT rates for completions from 1 April 2025 (current at 14 Oct 2026)"
calculatorRequirements: "DEV-TASKS T-505 (new page: price, buyer type — standard/first-time/additional/non-resident, combined surcharges, band table, effective rate; links to Scotland LBTT / Wales LTT notes)"
related: [/uk/mortgage-calculator, /house-affordability-calculator, /uk/take-home-pay-calculator]
---

Stamp Duty Land Tax (SDLT) is paid when you buy a home in England or Northern Ireland. It works like income tax: the price is split into bands, and each band is charged at its own rate. This calculator applies the current residential rates, first-time buyer relief, the higher rates for additional properties and the surcharge for non-UK residents. It shows the tax on each band and the total.

## How to use this calculator

1. **Purchase price** (the "chargeable consideration").
2. **Buyer type:**
   - **Standard:** moving home, or buying your only property.
   - **First-time buyer:** you and anyone you are buying with have never owned a home anywhere in the world, and you'll live in it as your main home.
   - **Additional property:** after the purchase you'll own more than one residential property worth £40,000 or more, and you are not replacing your main residence.
3. **Non-UK resident:** tick this if the 2% surcharge applies to you.
4. The result shows SDLT due, the band table and the effective rate.

## The formula

```
SDLT = Σ rate_band × (portion of price inside the band)
```

**Standard residential rates (England & NI):**

| Portion of price | Rate |
|---|---|
| up to £125,000 | 0% |
| £125,001 – £250,000 | 2% |
| £250,001 – £925,000 | 5% |
| £925,001 – £1.5 million | 10% |
| above £1.5 million | 12% |

**First-time buyers** (price £500,000 or less): 0% up to £300,000, then 5% from £300,001 to £500,000. Above £500,000, the relief does not apply and standard rates are charged on the whole price.

**Additional properties:** add 5 percentage points to every band (5%, 7%, 10%, 15%, 17%).

**Non-UK residents:** add a further 2 percentage points to every band. This can be combined with the additional property surcharge.

## Worked examples

**Example 1: £350,000 home.**
- *Standard buyer:* 0% × 125,000 + 2% × 125,000 + 5% × 100,000 = £0 + £2,500 + £5,000 = **£7,500** (effective rate 2.14%)
- *First-time buyer:* 0% × 300,000 + 5% × 50,000 = **£2,500**, a saving of £5,000
- *Additional property:* 5% × 125,000 + 7% × 125,000 + 10% × 100,000 = £6,250 + £8,750 + £10,000 = **£25,000**

**Example 2: other prices, standard buyer.**
- **£295,000:** 2% × 125,000 + 5% × 45,000 = £2,500 + £2,250 = **£4,750**. This matches the worked example published on GOV.UK.
- **£1,000,000:** £0 + £2,500 + 5% × 675,000 (£33,750) + 10% × 75,000 (£7,500) = **£43,750**, an effective rate of 4.38%

## Understanding your results

- **SDLT due** is payable to HMRC within 14 days of completion. Your solicitor or conveyancer usually files the return and pays on your behalf.
- **Band table:** shows exactly which part of the price is taxed at each rate.
- **Effective rate:** total SDLT ÷ price. It's useful for comparing properties at different prices.
- **Relief not modelled:** multiple dwellings, shared ownership elections, and properties with mixed residential and non-residential use. These need professional advice.

## Country notes

- **Scotland:** Land and Buildings Transaction Tax (LBTT), administered by Revenue Scotland, with its own bands and an additional dwelling supplement.
- **Wales:** Land Transaction Tax (LTT), administered by the Welsh Revenue Authority.
- **Canada:** most provinces charge a land transfer tax instead; a calculator is planned at /ca/land-transfer-tax-calculator.

## Frequently asked questions

### Who counts as a first-time buyer?
Everyone buying must never have owned a freehold or leasehold interest in a residential property, in the UK or abroad, and must intend to live in the property as their main residence. The price must be £500,000 or less.

### Do I pay stamp duty on a property under £125,000?
Not as a standard buyer or first-time buyer. If the additional property rates apply, 5% is due from the first pound (as long as the property is £40,000 or more).

### Can I get the 5% surcharge back?
If you buy a new main home before selling your previous one, you may be able to claim a refund of the higher rates once the previous main home is sold, within the time limits set by HMRC. Check the conditions on GOV.UK.

### Who pays the 2% non-resident surcharge?
In general, buyers who were not present in the UK for at least 183 days during the 12 months before the purchase. There are specific rules for joint buyers and companies.

### When must stamp duty be paid?
You must file an SDLT return and pay within 14 days of completion. Penalties and interest can apply if you are late.

### Does stamp duty apply to the whole price or only part?
Only the part of the price within each band is charged at that band's rate. First-time buyers buying above £500,000 are the exception: they lose the relief and pay standard rates on the whole price.

## Sources
1. GOV.UK, "Stamp Duty Land Tax: residential property rates." https://www.gov.uk/stamp-duty-land-tax/residential-property-rates (accessed 14 Oct 2026)
2. HMRC, "Stamp Duty Land Tax: buying an additional residential property." https://www.gov.uk/guidance/stamp-duty-land-tax-buying-an-additional-residential-property (accessed 14 Oct 2026)
3. GOV.UK, "Stamp Duty Land Tax" (how and when to pay). https://www.gov.uk/stamp-duty-land-tax (accessed 14 Oct 2026)
4. HMRC, "Rates of Stamp Duty Land Tax for non-UK residents." https://www.gov.uk/guidance/rates-of-stamp-duty-land-tax-for-non-uk-residents (accessed 14 Oct 2026)

## Disclaimer
This calculator estimates SDLT for straightforward residential purchases in England and Northern Ireland. It is not tax or legal advice. Your conveyancer or HMRC's own SDLT calculator should confirm the final amount, especially for complex transactions.
