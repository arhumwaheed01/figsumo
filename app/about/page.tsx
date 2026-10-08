import { pageMetadata } from "@/lib/seo";
import { SITE_NAME } from "@/lib/site";

export const metadata = pageMetadata({
  title: "About | Figsumo",
  description:
    "Figsumo is a small free calculator site built for real job searches. Results are estimates—free, no signup.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <article className="mx-auto w-full max-w-[640px] px-4 py-8">
      <h1 className="text-2xl font-semibold tracking-tight text-[#18181b]">
        About {SITE_NAME}
      </h1>
      <div className="mt-6 space-y-4 text-base leading-relaxed text-[#3f3f46]">
        <p>
          {SITE_NAME} is a small free calculator site. It was built to answer
          common searches—paint, concrete, tile, overtime, and a few everyday
          tools—without accounts or clutter.
        </p>
        <p>
          Every tool runs in your browser. There is no login and no database of
          your inputs. Each page shows the formula and an example so you can
          check the math.
        </p>
        <p>
          Results are estimates for planning. Codes, school policies, payroll
          rules, and postage rates vary. When accuracy matters, confirm with a
          professional or the official source.
        </p>
      </div>
    </article>
  );
}
