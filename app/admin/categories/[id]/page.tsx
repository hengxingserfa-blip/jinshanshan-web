import Link from "next/link";
import { notFound } from "next/navigation";
import CategoryForm from "../CategoryForm";
import { getCategoryById, getCategories } from "@/lib/data/categories";

export const metadata = { title: "編輯分類 | 金閃閃後台" };

export default async function EditCategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const cat = await getCategoryById(id);
  if (!cat) return notFound();

  // 父分類選項 = 全部現有頂層分類 (parent_slug=null), 且排除自己 (避免循環)
  const all = await getCategories();
  const topLevel = all
    .filter((c) => !c.parent_slug && c.slug !== cat.slug)
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
        <h1 className="font-display text-xl sm:text-4xl text-ink-950 leading-tight">
          {cat.name_zh}
          {cat.parent_slug && (
            <span className="block text-sm text-ink-500 font-sans mt-1">
              子分類 (父:{cat.parent_slug})
            </span>
          )}
        </h1>
      </header>
      <CategoryForm defaults={cat} parentOptions={topLevel} />
    </div>
  );
}
