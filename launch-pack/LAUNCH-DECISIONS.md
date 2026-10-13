# Launch decisions (T-001–T-006)

Recorded 14 Oct 2026 while implementing P0 indexing tasks.

## Brand spelling
**FigSumo** (capital S). Use this in UI, titles, metadata and legal pages. Do not use "Figsumo".

## Canonical host
**Apex:** `https://figsumo.com`  
`https://www.figsumo.com` → 308 to apex (middleware, once the domain is attached in Vercel).

## Env vars (Vercel)
| Environment | `NEXT_PUBLIC_SITE_URL` |
|---|---|
| Development | `http://localhost:3000` (or unset) |
| Preview / staging | `https://figsumo.vercel.app` |
| Production | `https://figsumo.com` |

Optional: `NEXT_PUBLIC_LEGAL_NAME`, `NEXT_PUBLIC_BUSINESS_LOCATION`, `NEXT_PUBLIC_POSTAL_ADDRESS`.

## Business details shipped now
| Field | Value |
|---|---|
| Legal / controller name | Arhum Waheed, trading as FigSumo (override with `NEXT_PUBLIC_LEGAL_NAME`) |
| Location | Remote (override with `NEXT_PUBLIC_BUSINESS_LOCATION`) |
| Postal address | empty until you choose to publish one |
| Contact / privacy email | `hello@figsumo.com` / `privacy@figsumo.com` — **only rendered when `IS_PRODUCTION_SITE`** |
| Advertising | none |
| Analytics | none |
| Hosting | Vercel Inc. |
| Response SLA | 5 business days |
| Privacy effective date | 2026-10-14 |

## Manual (cannot be done in the repo)
### T-003
1. Buy `figsumo.com` (optional: `.co.uk` / `.ca` as redirects only).
2. Vercel → Domains: primary `figsumo.com`; `www.figsumo.com` redirect to apex.
3. After launch, redirect `figsumo.vercel.app` → `https://figsumo.com`.
4. Set up mailbox + SPF/DKIM/DMARC before publishing email on the live site.

### T-006
1. Google Search Console: domain property (DNS TXT), submit `https://figsumo.com/sitemap.xml`.
2. Bing Webmaster Tools: import from GSC.

## VERIFY items (do not ship until confirmed)
See `DEV-TASKS.md` — mainly Quebec / provincial tax, US state tax, and selected health sources. Nothing marked VERIFY was published as a number in this pass.
