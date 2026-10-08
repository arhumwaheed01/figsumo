import { pageMetadata } from "@/lib/seo";
import { SITE_NAME } from "@/lib/site";

export const metadata = pageMetadata({
  title: "About",
  description:
    "Figsumo is a small free calculator site built for common job searches. Results are estimates.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <article className="mx-auto w-full max-w-[640px] px-4 py-8">
      <h1 className="text-2xl font-semibold tracking-tight text-[#18181b]">
        About
      </h1>
      <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-[#3f3f46]">
        <p>
          {SITE_NAME} is a small free calculator site. It was built for common
          searches—paint, concrete, tile, overtime, and a few everyday tools—
          without accounts or clutter.
        </p>
        <p>
          Every tool runs in your browser. There is no login and no database of
          your inputs. Each page shows how the math works and an example.
        </p>
        <p>
          Results are estimates for planning. When accuracy matters, confirm with
          a professional or the official source.
        </p>
      </div>
    </article>
  );
}
