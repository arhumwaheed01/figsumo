# Figsumo

Free calculators for jobs people actually search. Live at [figsumo.com](https://figsumo.com).

No accounts, no database, no CMS. All math runs in the browser. Each calculator page ships HTML with the formula, example, and FAQ so search engines can read it without JavaScript.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build
npm start
```

## Deploy on Vercel

```bash
npx vercel --prod
```

Or connect the GitHub repo in the Vercel dashboard and deploy on push. Framework preset: Next.js. No environment variables required.

## Add a calculator

1. Add an entry to `CALCULATORS` in `lib/site.ts` (slug, title, description, group, formula, example, whenWrong).
2. Create a client component in `components/calculators/YourCalculator.tsx` with `"use client"`, sensible defaults, and a live result.
3. Create `app/your-slug/page.tsx` that exports metadata via `pageMetadata`, wraps the tool in `CalculatorShell`, and includes three FAQ items.
4. The home page, footer, and `app/sitemap.ts` pick up the new entry from `CALCULATORS` automatically.

Keep the interactive form in a client component. Keep the H1, formula, example, “when this is wrong,” and FAQ in the server-rendered `CalculatorShell` so they appear in the HTML without waiting on JS.

## Stack

- Next.js App Router + TypeScript
- Tailwind CSS v4
- No UI library, no AdSense yet (empty “Ad” slot under each result)

## Calculators

Concrete, paint, tile, overtime, age, GPA, postage, tip.
