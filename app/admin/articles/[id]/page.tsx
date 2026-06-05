import Link from "next/link";
import { notFound } from "next/navigation";
import ArticleForm from "../ArticleForm";
import { getServerSupabase, isSupabaseConfigured } from "@/lib/supabase/server";
import { getArticles } from "@/lib/data/articles";
import type { Article } from "@/lib/supabase/types";

export const metadata = { title: "編輯文章 | 金閃閃後台" };

export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let article: Article | null = null;

  if (isSupabaseConfigured()) {
    const supabase = await getServerSupabase();
    if (supabase) {
      const { data } = await supabase.from("articles").select("*").eq("id", id).maybeSingle();
      article = (data as Article | null) ?? null;
    }
  }

  if (!article) {
    const all = await getArticles();
    article = all.find((a) => a.id === id) ?? null;
  }

  if (!article) return notFound();

  return (
    <div className="p-4 sm:p-8 md:p-12 max-w-3xl">
      <header className="mb-10">
        <p className="font-sans tracking-[0.3em] text-[10px] text-gold-600 uppercase mb-2 font-medium">
          Edit Article · 編輯文章
        </p>
        <h1 className="font-display text-4xl text-ink-950">{article.title_zh}</h1>
        <Link href="/admin/articles" className="text-sm text-ink-400 hover:text-ink-950 mt-3 inline-block">
          ← 回文章列表
        </Link>
      </header>

      {!isSupabaseConfigured() && (
        <div className="mb-8 bg-amber-50 border border-amber-300 text-amber-900 px-5 py-4 text-xs">
          目前看到的是 fallback 示意資料. 接好 Supabase 後才能真的儲存編輯.
        </div>
      )}

      <ArticleForm defaults={article} />
    </div>
  );
}
