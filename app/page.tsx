import { Suspense } from "react";
import { BasicCalculator } from "@/components/BasicCalculator";
import { HomeDirectory } from "@/components/HomeDirectory";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Free online calculators - Figsumo",
  description:
    "Free online calculators for concrete, paint, tile, overtime, tip, age, GPA, and postage. No signup.",
  path: "/",
});

export default function HomePage() {
  return (
    <div className="mx-auto w-full max-w-[640px] px-4 py-8">
      <h1 className="text-2xl font-semibold tracking-tight text-[#18181b]">
        Free online calculators.
      </h1>
      <p className="mt-2 text-[15px] text-[#71717a]">
        Use the basic calculator, or pick a tool below. All math runs in your
        browser.
      </p>

      <div className="mt-6">
        <Suspense fallback={<div className="border border-[#e4e4e7] p-4">Loading…</div>}>
          <BasicCalculator />
        </Suspense>
      </div>

      <div className="mt-10">
        <Suspense fallback={null}>
          <HomeDirectory />
        </Suspense>
      </div>
    </div>
  );
}
