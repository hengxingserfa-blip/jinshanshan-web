import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import CtaBlock from "@/components/CtaBlock";
import ArticlesGrid from "@/components/ArticlesGrid";
import { getArticles } from "@/lib/data/articles";

export const metadata: Metadata = {
  title: "金飾知識・文章",
  description:
    "黃金回收、舊金換新、金飾保養、傳家智慧 —— 金閃閃銀樓的金飾知識專欄。",
};

export default async function ArticlesPage() {
  const articles = await getArticles();

  return (
    <>
      <PageHero page="journal" />

      <section className="bg-ivory-50 py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 sm:px-10">
          <ArticlesGrid articles={articles} />

          <p className="mt-24 text-center text-[10px] tracking-[0.3em] uppercase text-ink-400 font-display max-w-md mx-auto">
            完整內文閱讀與更多文章將於後台上線後啟用
          </p>
        </div>
      </section>

      <CtaBlock />
    </>
  );
}
