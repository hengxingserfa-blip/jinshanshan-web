import Link from "next/link";
import { notFound } from "next/navigation";
import CategoryForm from "../CategoryForm";
import { getCategoryById } from "@/lib/data/categories";

export const metadata = { title: "編輯分類 | 金閃閃後台" };

export default async function EditCategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const cat = await getCategoryById(id);
  if (!cat) return notFound();

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
        </h1>
      </header>
      <CategoryForm defaults={cat} />
    </div>
  );
}
