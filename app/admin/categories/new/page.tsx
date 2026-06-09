import Link from "next/link";
import CategoryForm from "../CategoryForm";
import { getCategories } from "@/lib/data/categories";

export const metadata = { title: "新增商品分類 | 金閃閃後台" };

export default async function NewCategoryPage() {
  // 父分類選項 = 全部現有頂層分類 (parent_slug=null 的)
  const all = await getCategories();
  const topLevel = all
    .filter((c) => !c.parent_slug)
    .map((c) => ({ slug: c.slug, name_zh: c.name_zh }));

  return (
    <div className="p-4 sm:p-8 md:p-12 max-w-2xl">
      <header className="mb-5 sm:mb-10">
        <Link
          href="/admin/categories"
          className="text-xs sm:text-sm text-ink-500 hover:text-ink-950 mb-2 sm:mb-3 inline-block"
        >
          ← 回分類列表
        </Link>
        <h1 className="font-display text-xl sm:text-4xl text-ink-950">新增商品分類</h1>
      </header>
      <CategoryForm parentOptions={topLevel} />
    </div>
  );
}
