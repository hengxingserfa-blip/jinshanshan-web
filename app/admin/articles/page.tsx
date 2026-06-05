import Link from "next/link";
import { getArticles } from "@/lib/data/articles";
import { isSupabaseConfigured } from "@/lib/supabase/server";

export default async function ArticlesAdmin() {
  const articles = await getArticles();
  const configured = isSupabaseConfigured();

  return (
    <div className="p-4 sm:p-8 md:p-12 max-w-6xl">
      <header className="mb-10 flex items-end justify-between gap-6 flex-wrap">
        <div>
          <p className="font-sans tracking-[0.3em] text-[10px] text-gold-600 uppercase mb-2 font-medium">
            Articles · 文章
          </p>
          <h1 className="font-display text-4xl text-ink-950">文章管理</h1>
          <p className="text-sm text-ink-700 mt-2">
            共 <strong>{articles.length}</strong> 篇已發布
          </p>
        </div>
        <Link
          href="/admin/articles/new"
          className="inline-flex items-center gap-2 bg-ink-950 hover:bg-gold-500 hover:text-ink-950 text-ivory-50 px-5 py-3 font-sans font-medium tracking-wider text-xs uppercase transition-colors"
        >
          + 新增文章
        </Link>
      </header>

      {!configured && (
        <div className="mb-8 bg-amber-50 border border-amber-300 text-amber-900 px-5 py-4 text-xs">
          顯示中的文章是 fallback 示意資料。接好 Supabase 後會切到後台真實文章。
        </div>
      )}

      <div className="bg-white border border-ink-950/10 divide-y divide-ink-950/8">
        {articles.map((a) => (
          <div
            key={a.id}
            className="px-5 py-5 flex items-start justify-between gap-6 hover:bg-ivory-50/50"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-[10px] uppercase tracking-wider text-gold-600 font-medium">
                  {a.category_en} · {a.category}
                </span>
                <span className="text-ink-300">/</span>
                <span className="text-[11px] text-ink-400 font-mono">
                  {a.published_at?.slice(0, 10) ?? "—"}
                </span>
                {a.published && (
                  <span className="text-[10px] uppercase tracking-wider text-emerald-700 font-medium">
                    已發布
                  </span>
                )}
              </div>
              <p className="font-display text-lg text-ink-950 mb-1">{a.title_zh}</p>
              {a.excerpt_zh && (
                <p className="text-xs text-ink-700 font-light line-clamp-2">
                  {a.excerpt_zh}
                </p>
              )}
            </div>
            <Link
              href={`/admin/articles/${a.id}`}
              className="text-xs text-gold-700 hover:underline shrink-0"
            >
              編輯 →
            </Link>
          </div>
        ))}
      </div>

      <p className="mt-8 text-[11px] text-ink-400">
        ※ 新增/編輯(Markdown 編輯器)將在 Phase 4.5 補上。
      </p>
    </div>
  );
}
