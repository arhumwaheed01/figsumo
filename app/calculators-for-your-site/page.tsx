import { CategoryIndex } from "@/components/CategoryIndex";
import { getCategoryById } from "@/lib/calculators";
import { createPageMetadata } from "@/lib/seo";

const category = getCategoryById("for-your-site")!;

export const metadata = createPageMetadata({
  title: category.title,
  description: category.description,
  path: category.path,
});

export default function CalculatorsForYourSitePage() {
  return <CategoryIndex category={category} />;
}
